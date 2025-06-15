
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { logSecurityEvent, SECURITY_EVENTS } from '@/utils/securityLogger';
import { clearMatrixSession } from '@/utils/matrix';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Log security events
      if (event === 'SIGNED_IN' && session?.user) {
        setTimeout(() => {
          logSecurityEvent({
            action: SECURITY_EVENTS.LOGIN_SUCCESS,
            resource: 'auth',
            details: { userId: session.user.id, email: session.user.email }
          });
        }, 0);
      } else if (event === 'SIGNED_OUT') {
        // Clear Matrix session on logout
        clearMatrixSession();
        
        setTimeout(() => {
          logSecurityEvent({
            action: SECURITY_EVENTS.LOGOUT,
            resource: 'auth'
          });
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    // Clear Matrix session before signing out
    clearMatrixSession();
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
