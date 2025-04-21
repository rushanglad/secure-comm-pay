
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { registerMatrixUser } from '@/utils/matrix';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const username = email.split('@')[0]; // Initial username from email

    try {
      // 1. Register the user in Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (authError) throw authError;

      // 2. Create Matrix account for the user
      try {
        const matrixRegistration = await registerMatrixUser(username, password);
        
        // 3. Store Matrix credentials in Supabase
        if (authData.user && matrixRegistration) {
          await supabase
            .from('matrix_credentials')
            .insert({
              user_id: authData.user.id,
              matrix_user_id: matrixRegistration.user_id,
              access_token: matrixRegistration.access_token,
              device_id: matrixRegistration.device_id,
              home_server: 'https://matrix.org',
            });
        }
      } catch (matrixError) {
        // Log matrix error but don't fail the signup process
        console.error('Matrix account creation failed:', matrixError);
        // We'll continue even if Matrix registration fails
      }

      toast.success('Account created successfully! Please verify your email.');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
      console.error('Signup error:', error);
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
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default SignUpForm;
