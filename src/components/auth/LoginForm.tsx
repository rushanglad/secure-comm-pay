import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { loginMatrixUser } from '@/utils/matrix';

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const username = email.split('@')[0]; // Extract username from email

    try {
      // 1. Login to Supabase
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // 2. Try to login to Matrix using the same credentials
      // This is a best-effort approach - we won't fail if Matrix login fails
      try {
        const matrixLogin = await loginMatrixUser(username, password);
        
        // Check if we need to store these credentials
        if (authData.user && matrixLogin) {
          const { data: existingCreds } = await supabase
            .from('matrix_credentials')
            .select('*')
            .eq('user_id', authData.user.id)
            .maybeSingle();
            
          if (!existingCreds) {
            // TODO [SECURITY]: Store ENCRYPTED token after migration complete!
            await supabase
              .from('matrix_credentials')
              .insert({
                user_id: authData.user.id,
                matrix_user_id: matrixLogin.user_id,
                access_token: matrixLogin.access_token, // Temporary plaintext. ENCRYPT this before storing after migration!
                device_id: matrixLogin.device_id,
                home_server: 'https://matrix.org',
                // encrypted_access_token: XXX TODO in the future
                // access_token_salt: XXX TODO in the future
              });
          }
        }
      } catch (matrixError) {
        // Log matrix error but don't fail the login process
        console.error('Matrix login failed:', matrixError);
        // We'll continue even if Matrix login fails
      }

      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};

export default LoginForm;
