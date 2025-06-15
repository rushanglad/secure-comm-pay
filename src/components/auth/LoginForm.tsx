
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MatrixPasswordDialog } from './MatrixPasswordDialog';
import { sanitizeEmail, checkRateLimit, recordFailedAttempt } from '@/utils/inputValidation';
import { getDecryptedMatrixCredentials } from '@/utils/encryption';
import { logSecurityEvent, SECURITY_EVENTS } from '@/utils/securityLogger';

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showMatrixPassword, setShowMatrixPassword] = useState(false);
  const [pendingAuth, setPendingAuth] = useState<{
    userId: string;
    email: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const rawEmail = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // Rate limiting check
      if (!checkRateLimit(rawEmail)) {
        return;
      }

      // Input validation
      const email = sanitizeEmail(rawEmail);

      // 1. Login to Supabase
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        recordFailedAttempt(email);
        throw error;
      }

      if (!authData.user) {
        throw new Error('Login failed');
      }

      // 2. Check if user has Matrix credentials
      const { data: matrixCreds } = await supabase
        .from('matrix_credentials')
        .select('encrypted_access_token, access_token')
        .eq('user_id', authData.user.id)
        .maybeSingle();

      if (matrixCreds?.encrypted_access_token) {
        // User has encrypted Matrix credentials, need Matrix password
        setPendingAuth({
          userId: authData.user.id,
          email
        });
        setShowMatrixPassword(true);
      } else {
        // No encrypted Matrix credentials, proceed normally
        await logSecurityEvent({
          action: SECURITY_EVENTS.LOGIN_SUCCESS,
          resource: 'auth',
          details: { userId: authData.user.id, email, matrixEncrypted: false }
        });

        toast.success('Logged in successfully');
        navigate('/dashboard');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      toast.error(`Login failed: ${errorMessage}`);
      
      if (rawEmail) {
        recordFailedAttempt(rawEmail);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMatrixPasswordEntered = async (matrixPassword: string) => {
    if (!pendingAuth) return;

    try {
      // Try to decrypt Matrix credentials
      const credentials = await getDecryptedMatrixCredentials(
        pendingAuth.userId,
        matrixPassword
      );

      if (credentials) {
        await logSecurityEvent({
          action: SECURITY_EVENTS.LOGIN_SUCCESS,
          resource: 'auth',
          details: { 
            userId: pendingAuth.userId, 
            email: pendingAuth.email, 
            matrixEncrypted: true,
            decryptionSuccess: true
          }
        });

        toast.success('Logged in successfully with secure messaging');
      } else {
        toast.success('Logged in successfully');
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Matrix decryption failed:', error);
      toast.error('Invalid Matrix password. You can reset it in settings later.');
      
      // Log the failed decryption attempt
      await logSecurityEvent({
        action: 'matrix_decryption_failed',
        resource: 'auth',
        details: { 
          userId: pendingAuth.userId,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      });

      navigate('/dashboard');
    } finally {
      setPendingAuth(null);
    }
  };

  return (
    <>
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

      <MatrixPasswordDialog
        open={showMatrixPassword}
        onClose={() => {
          setShowMatrixPassword(false);
          setPendingAuth(null);
          navigate('/dashboard');
        }}
        onPasswordSet={handleMatrixPasswordEntered}
        isFirstTime={false}
      />
    </>
  );
};

export default LoginForm;
