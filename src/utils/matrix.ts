import { MatrixClient, createClient } from "matrix-js-sdk";
import { supabase } from "@/integrations/supabase/client";

interface MatrixCredentials {
  matrix_user_id: string;
  access_token: string;
  device_id: string;
  home_server: string;
}

let matrixClient: MatrixClient | null = null;

export const initializeMatrixClient = async (userId: string): Promise<MatrixClient | null> => {
  try {
    // Fetch Matrix credentials from Supabase
    const { data: credentials, error } = await supabase
      .from('matrix_credentials')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !credentials) {
      console.error('Error fetching Matrix credentials:', error);
      return null;
    }

    // Create Matrix client instance
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

export const registerMatrixUser = async (username: string, password: string) => {
  const homeserver = "https://matrix.org"; // You might want to make this configurable
  const tempClient = createClient({ baseUrl: homeserver });
  
  try {
    // Use the correct register method format according to matrix-js-sdk
    const registration = await tempClient.register(
      username,
      password,
      undefined, // guest access token
      undefined, // initial device display name
      {
        type: "m.login.password",
      }
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
