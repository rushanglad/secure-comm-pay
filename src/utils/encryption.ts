import { supabase } from '@/integrations/supabase/client';

// Use Web Crypto API for secure encryption
const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;

// Generate a random salt
export const generateSalt = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Derive encryption key from user password and salt
const deriveKey = async (password: string, salt: string): Promise<CryptoKey> => {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const saltBuffer = encoder.encode(salt);
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveKey']
  );
  
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: ALGORITHM, length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
};

// Encrypt access token
export const encryptAccessToken = async (
  accessToken: string,
  password: string,
  salt?: string
): Promise<{ encryptedToken: string; salt: string; iv: string }> => {
  const tokenSalt = salt || generateSalt();
  const key = await deriveKey(password, tokenSalt);
  
  const encoder = new TextEncoder();
  const data = encoder.encode(accessToken);
  
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    key,
    data
  );
  
  return {
    encryptedToken: Array.from(new Uint8Array(encrypted), byte => 
      byte.toString(16).padStart(2, '0')
    ).join(''),
    salt: tokenSalt,
    iv: Array.from(iv, byte => byte.toString(16).padStart(2, '0')).join('')
  };
};

// Decrypt access token
export const decryptAccessToken = async (
  encryptedToken: string,
  password: string,
  salt: string,
  iv: string
): Promise<string> => {
  const key = await deriveKey(password, salt);
  
  const encryptedBuffer = new Uint8Array(
    encryptedToken.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
  );
  const ivBuffer = new Uint8Array(
    iv.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
  );
  
  const decrypted = await crypto.subtle.decrypt(
    { name: ALGORITHM, iv: ivBuffer },
    key,
    encryptedBuffer
  );
  
  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
};

// Store encrypted credentials securely
export const storeEncryptedMatrixCredentials = async (
  userId: string,
  matrixUserId: string,
  accessToken: string,
  deviceId: string,
  matrixPassword: string
) => {
  const salt = generateSalt();
  const { encryptedToken, iv } = await encryptAccessToken(accessToken, matrixPassword, salt);
  
  const { error } = await supabase
    .from('matrix_credentials')
    .upsert({
      user_id: userId,
      matrix_user_id: matrixUserId,
      encrypted_access_token: encryptedToken,
      access_token_salt: salt,
      device_id: deviceId,
      home_server: 'https://matrix.org',
      // Keep legacy field null to indicate we're using encrypted storage
      access_token: null
    });
    
  if (error) throw error;
  
  // Store IV separately for additional security (could be in a different table)
  localStorage.setItem(`matrix_iv_${userId}`, iv);
};

// Retrieve and decrypt credentials
export const getDecryptedMatrixCredentials = async (
  userId: string,
  matrixPassword: string
): Promise<{
  matrix_user_id: string;
  access_token: string;
  device_id: string;
  home_server: string;
} | null> => {
  const { data: credentials, error } = await supabase
    .from('matrix_credentials')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
    
  if (error || !credentials) return null;
  
  // Check if we have encrypted credentials
  if (credentials.encrypted_access_token && credentials.access_token_salt) {
    const iv = localStorage.getItem(`matrix_iv_${userId}`);
    if (!iv) throw new Error('Encryption IV not found');
    
    const decryptedToken = await decryptAccessToken(
      credentials.encrypted_access_token,
      matrixPassword,
      credentials.access_token_salt,
      iv
    );
    
    return {
      matrix_user_id: credentials.matrix_user_id,
      access_token: decryptedToken,
      device_id: credentials.device_id,
      home_server: credentials.home_server
    };
  }
  
  // Fallback to legacy plaintext (with warning)
  if (credentials.access_token) {
    console.warn('[SECURITY] Using legacy plaintext Matrix token. Please re-login to encrypt.');
    return {
      matrix_user_id: credentials.matrix_user_id,
      access_token: credentials.access_token,
      device_id: credentials.device_id,
      home_server: credentials.home_server
    };
  }
  
  return null;
};
