
import { MatrixClient, createClient } from "matrix-js-sdk";
import { supabase } from "@/integrations/supabase/client";
import { getDecryptedMatrixCredentials } from "./encryption";

interface MatrixCredentials {
  matrix_user_id: string;
  access_token: string;
  device_id: string;
  home_server: string;
}

let matrixClient: MatrixClient | null = null;
let cachedMatrixPassword: string | null = null;

// Helper to issue a warning if legacy plaintext access_token is being used
function warnIfPlainTokenInUse(credentials: any) {
  if (credentials.access_token && !credentials.encrypted_access_token) {
    console.warn('[SECURITY] Using PLAINTEXT Matrix access_token. Please re-login to upgrade to encrypted storage!');
  }
}

// Initialize Matrix client with encrypted credentials
export const initializeMatrixClient = async (
  userId: string, 
  matrixPassword?: string
): Promise<MatrixClient | null> => {
  try {
    let credentials: MatrixCredentials | null = null;

    // Try to get decrypted credentials if we have the Matrix password
    if (matrixPassword || cachedMatrixPassword) {
      const password = matrixPassword || cachedMatrixPassword!;
      credentials = await getDecryptedMatrixCredentials(userId, password);
      
      // Cache the password for this session (in memory only)
      if (matrixPassword) {
        cachedMatrixPassword = matrixPassword;
      }
    }

    // Fallback to checking for legacy plaintext credentials
    if (!credentials) {
      const { data: legacyCredentials, error } = await supabase
        .from('matrix_credentials')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error || !legacyCredentials) {
        console.error('Error fetching Matrix credentials:', error);
        return null;
      }

      warnIfPlainTokenInUse(legacyCredentials);

      if (legacyCredentials.access_token) {
        credentials = {
          matrix_user_id: legacyCredentials.matrix_user_id,
          access_token: legacyCredentials.access_token,
          device_id: legacyCredentials.device_id,
          home_server: legacyCredentials.home_server
        };
      }
    }

    if (!credentials) {
      console.log('No Matrix credentials found for user');
      return null;
    }

    matrixClient = createClient({
      baseUrl: credentials.home_server,
      accessToken: credentials.access_token,
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

// Clear cached password on logout
export const clearMatrixSession = () => {
  cachedMatrixPassword = null;
  if (matrixClient) {
    matrixClient.stopClient();
    matrixClient = null;
  }
};

export const registerMatrixUser = async (username: string, password: string) => {
  const homeserver = "https://matrix.org";
  const tempClient = createClient({ baseUrl: homeserver });
  
  try {
    const registration = await tempClient.register(
      username,
      password,
      undefined,
      undefined
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
