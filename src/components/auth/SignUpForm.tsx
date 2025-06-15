
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MatrixPasswordDialog } from './MatrixPasswordDialog';
import { sanitizeEmail, sanitizeUsername, validatePassword, checkRateLimit, recordFailedAttempt } from '@/utils/inputValidation';
import { registerMatrixUser } from '@/utils/matrix';
import { storeEncryptedMatrixCredentials } from '@/utils/encryption';
import { logSecurityEvent, SECURITY_EVENTS } from '@/utils/securityLogger';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showMatrixPassword, setShowMatrixPassword] = useState(false);
  const [pendingUser, setPendingUser] = useState<{
    userId: string;
    email: string;
    username: string;
    matrixCredentials: any;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const rawEmail = formData.get('email') as string;
    const rawUsername = formData.get('username') as string;
    const rawPassword = formData.get('password') as string;

    try {
      // Rate limiting check
      if (!checkRateLimit(rawEmail)) {
        return;
      }

      // Input validation and sanitization
      const email = sanitizeEmail(rawEmail);
      const username = sanitizeUsername(rawUsername);
      const password = validatePassword(rawPassword);

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

      if (authError) {
        recordFailedAttempt(email);
        throw authError;
      }

      if (!authData.user) {
        throw new Error('User registration failed');
      }

      // 2. Create Matrix account for the user (with original username for Matrix)
      try {
        const matrixRegistration = await registerMatrixUser(username, 'temp_matrix_password');
        
        // Store pending user data for Matrix password setup
        setPendingUser({
          userId: authData.user.id,
          email,
          username,
          matrixCredentials: matrixRegistration
        });
        
        // Show Matrix password dialog
        setShowMatrixPassword(true);
        
      } catch (matrixError) {
        console.error('Matrix account creation failed:', matrixError);
        // Continue with Supabase registration even if Matrix fails
        toast.success('Account created successfully! Matrix messaging will be set up later.');
        
        await logSecurityEvent({
          action: SECURITY_EVENTS.LOGIN_SUCCESS,
          resource: 'auth',
          details: { userId: authData.user.id, email, matrixSetup: false }
        });
        
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account';
      toast.error(errorMessage);
      console.error('Signup error:', error);
      
      if (rawEmail) {
        recordFailedAttempt(rawEmail);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMatrixPasswordSet = async (matrixPassword: string) => {
    if (!pendingUser) return;

    try {
      // Store encrypted Matrix credentials
      await storeEncryptedMatrixCredentials(
        pendingUser.userId,
        pendingUser.matrixCredentials.user_id,
        pendingUser.matrixCredentials.access_token,
        pendingUser.matrixCredentials.device_id,
        matrixPassword
      );

      await logSecurityEvent({
        action: SECURITY_EVENTS.LOGIN_SUCCESS,
        resource: 'auth',
        details: { 
          userId: pendingUser.userId, 
          email: pendingUser.email, 
          matrixSetup: true,
          encryptedTokens: true
        }
      });

      toast.success('Account created successfully with secure messaging!');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Matrix password setup failed:', error);
      toast.error('Failed to set up secure messaging. You can configure it later in settings.');
      navigate('/dashboard', { replace: true });
    } finally {
      setPendingUser(null);
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
          <Label htmlFor="username">Username</Label>
          <Input 
            id="username" 
            name="username" 
            type="text" 
            required 
            placeholder="3-20 characters, letters/numbers only"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
          <p className="text-xs text-muted-foreground">
            8+ characters with uppercase, lowercase, and number
          </p>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>

      <MatrixPasswordDialog
        open={showMatrixPassword}
        onClose={() => {
          setShowMatrixPassword(false);
          setPendingUser(null);
          navigate('/dashboard', { replace: true });
        }}
        onPasswordSet={handleMatrixPasswordSet}
        isFirstTime={true}
      />
    </>
  );
};

export default SignUpForm;
