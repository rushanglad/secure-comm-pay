
-- Check and drop existing policies if they exist before recreating them
DO $$ 
BEGIN
    -- Drop existing policies for matrix_credentials if they exist
    DROP POLICY IF EXISTS "Users can view their own matrix credentials" ON public.matrix_credentials;
    DROP POLICY IF EXISTS "Users can insert their own matrix credentials" ON public.matrix_credentials;
    DROP POLICY IF EXISTS "Users can update their own matrix credentials" ON public.matrix_credentials;
    DROP POLICY IF EXISTS "Users can delete their own matrix credentials" ON public.matrix_credentials;
    
    -- Drop existing policies for matrix_conversations if they exist
    DROP POLICY IF EXISTS "Users can view their own conversations" ON public.matrix_conversations;
    DROP POLICY IF EXISTS "Users can insert their own conversations" ON public.matrix_conversations;
    DROP POLICY IF EXISTS "Users can update their own conversations" ON public.matrix_conversations;
    DROP POLICY IF EXISTS "Users can delete their own conversations" ON public.matrix_conversations;
    
    -- Drop existing policies for profiles if they exist
    DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
END $$;

-- Enable RLS on all tables
ALTER TABLE public.matrix_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matrix_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for matrix_credentials
CREATE POLICY "Users can view their own matrix credentials" 
  ON public.matrix_credentials 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own matrix credentials" 
  ON public.matrix_credentials 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own matrix credentials" 
  ON public.matrix_credentials 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own matrix credentials" 
  ON public.matrix_credentials 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for matrix_conversations
CREATE POLICY "Users can view their own conversations" 
  ON public.matrix_conversations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own conversations" 
  ON public.matrix_conversations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations" 
  ON public.matrix_conversations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own conversations" 
  ON public.matrix_conversations 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create audit log table for security monitoring (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource TEXT,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Drop and recreate audit log policy
DROP POLICY IF EXISTS "No access to audit logs" ON public.security_audit_log;
CREATE POLICY "No access to audit logs" 
  ON public.security_audit_log 
  FOR ALL 
  USING (false);

-- Create or replace the security logging function
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_action TEXT,
  p_resource TEXT DEFAULT NULL,
  p_details JSONB DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    user_id,
    action,
    resource,
    details,
    ip_address,
    user_agent
  ) VALUES (
    auth.uid(),
    p_action,
    p_resource,
    p_details,
    p_ip_address,
    p_user_agent
  );
END;
$$;
