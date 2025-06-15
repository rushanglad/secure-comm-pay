
import { supabase } from '@/integrations/supabase/client';

interface SecurityEventOptions {
  action: string;
  resource?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export const logSecurityEvent = async ({
  action,
  resource,
  details,
  ipAddress,
  userAgent = navigator.userAgent
}: SecurityEventOptions) => {
  try {
    const { error } = await supabase.rpc('log_security_event', {
      p_action: action,
      p_resource: resource || null,
      p_details: details ? JSON.stringify(details) : null,
      p_ip_address: ipAddress || null,
      p_user_agent: userAgent
    });

    if (error) {
      console.error('Failed to log security event:', error);
    }
  } catch (error) {
    console.error('Error logging security event:', error);
  }
};

// Security event types
export const SECURITY_EVENTS = {
  LOGIN_SUCCESS: 'login_success',
  LOGIN_FAILED: 'login_failed',
  LOGOUT: 'logout',
  PASSWORD_CHANGE: 'password_change',
  PROFILE_UPDATE: 'profile_update',
  UNAUTHORIZED_ACCESS: 'unauthorized_access',
  DATA_ACCESS: 'data_access',
  PAYMENT_INITIATED: 'payment_initiated',
  EMAIL_SENT: 'email_sent',
  MESSAGE_SENT: 'message_sent'
} as const;
