import { MatrixClient, createClient } from "matrix-js-sdk";
import { supabase } from "@/integrations/supabase/client";

interface MatrixCredentials {
  matrix_user_id: string;
  access_token: string;
  device_id: string;
  home_server: string;
}

interface MatrixCredentialsSecure {
  matrix_user_id: string;
  access_token?: string; // Only if legacy/plain still needed
  encrypted_access_token?: Uint8Array | string; // New encrypted token
  access_token_salt?: string | null;
  device_id: string;
  home_server: string;
}

let matrixClient: MatrixClient | null = null;

// Helper to issue a warning if legacy plaintext access_token is being used
function warnIfPlainTokenInUse(credentials: any) {
  if (credentials.access_token && !credentials.encrypted_access_token) {
    console.warn('[SECURITY] Using PLAINTEXT Matrix access_token. Upgrade to encrypted_access_token ASAP!');
  }
}

// UPDATE this function once you are ready to use encrypted tokens only
export const initializeMatrixClient = async (userId: string): Promise<MatrixClient | null> => {
  try {
    // Fetch secure matrix credentials from Supabase
    const { data: credentials, error } = await supabase
      .from('matrix_credentials')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !credentials) {
      console.error('Error fetching Matrix credentials:', error);
      return null;
    }

    warnIfPlainTokenInUse(credentials);

    // TODO: Future: decrypt and use credentials.encrypted_access_token after migration is complete.
    // For now, fallback to legacy access_token for compatibility.
    // If encrypted_access_token is present, prefer it (implementation of decryption needed).

    matrixClient = createClient({
      baseUrl: credentials.home_server,
      accessToken: credentials.access_token, // TODO: Switch to decrypted token
      userId: credentials.matrix_user_id,
      deviceId: credentials.device_id,
    });

    await matrixClient.startClient();
    return matrixClient;
  } catch (error) {
    console.error('Error initializing Matrix client:', error);
    return null;
  }
};

export const getCurrentMatrixClient = (): MatrixClient | null => {
  return matrixClient;
};

export const registerMatrixUser = async (username: string, password: string) => {
  const homeserver = "https://matrix.org"; // You might want to make this configurable
  const tempClient = createClient({ baseUrl: homeserver });
  
  try {
    // Use the correct register method format according to matrix-js-sdk
    const registration = await tempClient.register(
      username,
      password,
      undefined, // guest access token
      undefined // initial device display name
    );

    return registration;
  } catch (error) {
    console.error('Error registering Matrix user:', error);
    throw error;
  }
};

export const loginMatrixUser = async (username: string, password: string) => {
  const homeserver = "https://matrix.org";
  const tempClient = createClient({ baseUrl: homeserver });
  
  try {
    const login = await tempClient.loginWithPassword(username, password);
    return login;
  } catch (error) {
    console.error('Error logging in Matrix user:', error);
    throw error;
  }
};

// NOTE: All functions will need to be updated to use end-to-end encrypted access tokens only once your migration & encryption layer is ready.
// See the Supabase migration notes and Team TODOs above.
