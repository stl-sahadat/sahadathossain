/**
 * High-Security Cryptographic Utilities & Authentication Protocols
 * Md. Sahadat Hossain Portfolio // Omnira Cyber System
 */

export const SECURITY_SALT = 'stl_matrix_secure_salt_2026_bd';
export const DEFAULT_ADMIN_USER = 'admin';
export const DEFAULT_PASSWORD_HASH = '80322ecae2ffabeb41c194961487777e56694e15fcd41e632a7c356ade5b56db'; // salted sha256 of 'sahadat4409'

/**
 * Computes a salted SHA-256 hash using the standard Web Crypto API (supported natively in both browsers and Node.js).
 * 
 * @param {string} password - Raw password input
 * @param {string} [salt=SECURITY_SALT] - Custom or default salt
 * @returns {Promise<string>} 64-char lowercase hexadecimal hash
 */
export async function hashPassword(password, salt = SECURITY_SALT) {
  const combined = (salt || SECURITY_SALT) + (password || '');
  
  if (typeof globalThis !== 'undefined' && globalThis.crypto && globalThis.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(combined);
    const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  return '';
}

/**
 * Constant-time string comparison to prevent timing attack side-channels.
 * 
 * @param {string} a 
 * @param {string} b 
 * @returns {boolean}
 */
export function constantTimeEquals(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
