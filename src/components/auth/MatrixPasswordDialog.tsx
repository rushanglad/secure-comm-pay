
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { validateMatrixPassword } from '@/utils/inputValidation';
import { AlertTriangle, Shield } from 'lucide-react';

interface MatrixPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onPasswordSet: (password: string) => void;
  isFirstTime?: boolean;
}

export const MatrixPasswordDialog = ({
  open,
  onClose,
  onPasswordSet,
  isFirstTime = false
}: MatrixPasswordDialogProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate passwords
      validateMatrixPassword(password);
      
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      onPasswordSet(password);
      onClose();
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Password validation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            {isFirstTime ? 'Set Matrix Password' : 'Enter Matrix Password'}
          </DialogTitle>
          <DialogDescription>
            {isFirstTime ? (
              <>
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Your Matrix password must be different from your main account password for security.
                  </span>
                </div>
                Set a secure password for your encrypted messaging. This password will encrypt your Matrix access tokens.
              </>
            ) : (
              'Enter your Matrix password to decrypt your messaging credentials.'
            )}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="matrix-password">
              {isFirstTime ? 'New Matrix Password' : 'Matrix Password'}
            </Label>
            <Input
              id="matrix-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a strong password..."
              required
            />
            {isFirstTime && (
              <p className="text-xs text-muted-foreground">
                Must be 12+ characters with uppercase, lowercase, number, and special character
              </p>
            )}
          </div>
          
          {isFirstTime && (
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password..."
                required
              />
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : isFirstTime ? 'Set Password' : 'Decrypt'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
