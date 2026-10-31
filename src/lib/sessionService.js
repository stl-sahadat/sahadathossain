import crypto from 'crypto';
import { SECURITY_SALT, DEFAULT_PASSWORD_HASH, DEFAULT_ADMIN_USER } from './security';

if (!globalThis.__stl_active_sessions) {
  globalThis.__stl_active_sessions = new Map();
}

if (!globalThis.__stl_failed_attempts) {
  globalThis.__stl_failed_attempts = new Map();
}

export const activeSessions = globalThis.__stl_active_sessions;
export const failedAttemptsByIp = globalThis.__stl_failed_attempts;

export function verifySessionToken(token) {
  if (!token) return false;
  const session = activeSessions.get(token);
  if (!session) return false;
  if (session.expires && session.expires < Date.now()) {
    activeSessions.delete(token);
    return false;
  }
  return true;
}

export function createSessionToken(username) {
  const token = 'stl_sec_' + crypto.randomBytes(32).toString('hex') + '_' + Date.now();
  activeSessions.set(token, {
    user: username,
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  });
  return token;
}

export function revokeSessionToken(token) {
  if (token) {
    activeSessions.delete(token);
  }
}

export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || '127.0.0.1';
}
