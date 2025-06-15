
-- 1. RLS Policy Cleanup

-- Remove duplicates/conflicts, then re-create correct policies for all concerned tables.
DO $$
BEGIN
  -- matrix_credentials
  DROP POLICY IF EXISTS "Users can view their own matrix credentials" ON public.matrix_credentials;
  DROP POLICY IF EXISTS "Users can insert their own matrix credentials" ON public.matrix_credentials;
  DROP POLICY IF EXISTS "Users can update their own matrix credentials" ON public.matrix_credentials;
  DROP POLICY IF EXISTS "Users can delete their own matrix credentials" ON public.matrix_credentials;

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

  -- matrix_conversations
  DROP POLICY IF EXISTS "Users can view their own conversations" ON public.matrix_conversations;
  DROP POLICY IF EXISTS "Users can insert their own conversations" ON public.matrix_conversations;
  DROP POLICY IF EXISTS "Users can update their own conversations" ON public.matrix_conversations;
  DROP POLICY IF EXISTS "Users can delete their own conversations" ON public.matrix_conversations;

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

  -- profiles
  DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

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
END $$;

-- 2. Prepare for Encrypted Storage of Matrix Access Tokens

-- Add a new column for encrypted access token
ALTER TABLE public.matrix_credentials
  ADD COLUMN IF NOT EXISTS encrypted_access_token BYTEA;

-- Optional: add a salt column if not present
ALTER TABLE public.matrix_credentials
  ADD COLUMN IF NOT EXISTS access_token_salt TEXT;

-- (Do not drop old access_token column yet for compatibility; we will migrate data in the code phase.)

-- 3. Basic Input Validation Layer (Optional step for server-side validation, to complement frontend)
-- Example: Create a simple function to sanitize input (for later use in edge functions or triggers)
CREATE OR REPLACE FUNCTION public.basic_sanitize(input TEXT) RETURNS TEXT
LANGUAGE plpgsql IMMUTABLE
AS $func$
BEGIN
  -- Replace angle brackets to prevent HTML injection
  RETURN replace(replace(input, '<', ''), '>', '');
END;
$func$;
