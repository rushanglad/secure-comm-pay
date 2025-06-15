
import { toast } from 'sonner';

// Input sanitization functions
export const sanitizeString = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

export const sanitizeEmail = (email: string): string => {
  const sanitized = sanitizeString(email);
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitized)) {
    throw new Error('Invalid email format');
  }
  return sanitized;
};

export const sanitizeUsername = (username: string): string => {
  const sanitized = sanitizeString(username);
  // Username should only contain alphanumeric, underscore, dash
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!usernameRegex.test(sanitized)) {
    throw new Error('Username can only contain letters, numbers, underscore, and dash');
  }
  if (sanitized.length < 3 || sanitized.length > 20) {
    throw new Error('Username must be between 3 and 20 characters');
  }
  return sanitized;
};

export const validatePassword = (password: string): string => {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    throw new Error('Password must contain at least one uppercase letter, one lowercase letter, and one number');
  }
  return password;
};

export const validateMatrixPassword = (password: string): string => {
  // Matrix password can be different from main password
  if (password.length < 12) {
    throw new Error('Matrix password must be at least 12 characters long for security');
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password)) {
    throw new Error('Matrix password must contain uppercase, lowercase, number, and special character');
  }
  return password;
};

// Rate limiting for auth attempts
const authAttempts = new Map<string, { count: number; lastAttempt: number }>();

export const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const attempts = authAttempts.get(identifier);
  
  if (!attempts) {
    authAttempts.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Reset after 15 minutes
  if (now - attempts.lastAttempt > 15 * 60 * 1000) {
    authAttempts.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Allow max 5 attempts per 15 minutes
  if (attempts.count >= 5) {
    toast.error('Too many login attempts. Please try again in 15 minutes.');
    return false;
  }
  
  attempts.count++;
  attempts.lastAttempt = now;
  return true;
};

export const recordFailedAttempt = (identifier: string) => {
  const now = Date.now();
  const attempts = authAttempts.get(identifier) || { count: 0, lastAttempt: now };
  attempts.count++;
  attempts.lastAttempt = now;
  authAttempts.set(identifier, attempts);
};

// XSS prevention for user content
export const sanitizeUserContent = (content: string): string => {
  return content
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// SQL injection prevention (for any raw queries)
export const escapeSQL = (input: string): string => {
  return input.replace(/'/g, "''");
};
