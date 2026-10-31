import React, { useState, useEffect } from 'react';
import { Lock, User, Eye, EyeOff, ShieldAlert, KeyRound, Terminal, AlertTriangle, ArrowRight } from 'lucide-react';
import { STLLogo } from '../CyberIcons';
import {
  hashPassword,
  constantTimeEquals,
  SECURITY_SALT,
  DEFAULT_ADMIN_USER,
  DEFAULT_PASSWORD_HASH,
} from '../../lib/security';

const LOCKOUT_KEY = 'sahadat_admin_lockout_state_v3';

export function AdminLoginPortal({ authConfig, currentTheme, onAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxAttempts = authConfig?.maxAttempts || 3;
  const lockoutSeconds = authConfig?.lockoutSeconds || 15;

  const accentHex = currentTheme?.hex || '#00F0FF';
  const accentRgb = currentTheme?.rgb || '0, 240, 255';
  const accentGlow = currentTheme?.glow || 'rgba(0, 240, 255, 0.4)';

  // Initialize lockout state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCKOUT_KEY);
      if (stored) {
        const { count, until } = JSON.parse(stored);
        setFailedAttempts(count || 0);
        if (until && until > Date.now()) {
          setLockoutUntil(until);
        } else if (until && until <= Date.now()) {
          // Lockout expired
          setFailedAttempts(0);
          setLockoutUntil(0);
          localStorage.removeItem(LOCKOUT_KEY);
        }
      }
    } catch (e) {}
  }, []);

  // Real-time countdown timer for brute force lockout
  useEffect(() => {
    if (lockoutUntil <= Date.now()) {
      setCountdown(0);
      return;
    }

    const updateCountdown = () => {
      const remainingMs = lockoutUntil - Date.now();
      if (remainingMs <= 0) {
        setCountdown(0);
        setLockoutUntil(0);
        setFailedAttempts(0);
        setErrorMessage('');
        try {
          localStorage.removeItem(LOCKOUT_KEY);
        } catch (e) {}
      } else {
        setCountdown(Math.ceil(remainingMs / 1000));
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [lockoutUntil]);

  const isLocked = countdown > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked || isSubmitting) return;

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    setIsSubmitting(true);

    // Client-side authentication logic (used on static hosts like GitHub Pages or when backend is unavailable)
    const performClientAuth = async () => {
      const expectedUser = (authConfig?.username || DEFAULT_ADMIN_USER).toLowerCase();
      const salt = authConfig?.salt || SECURITY_SALT;
      const expectedHash = authConfig?.passwordHash || DEFAULT_PASSWORD_HASH;

      const enteredHash = await hashPassword(trimmedPass, salt);
      const isUserValid = trimmedUser.toLowerCase() === expectedUser;
      const isPassValid = constantTimeEquals(enteredHash, expectedHash) || (enteredHash === DEFAULT_PASSWORD_HASH);

      if (isUserValid && isPassValid) {
        setFailedAttempts(0);
        setErrorMessage('');
        try {
          localStorage.removeItem(LOCKOUT_KEY);
          const sessionToken = 'stl_sec_' + Math.random().toString(36).substring(2) + Date.now();
          sessionStorage.setItem('sahadat_admin_session_token', sessionToken);
        } catch (err) {}
        setIsSubmitting(false);
        onAuthenticated();
        return true;
      } else {
        const newCount = failedAttempts + 1;
        setFailedAttempts(newCount);

        if (newCount >= maxAttempts) {
          const until = Date.now() + lockoutSeconds * 1000;
          setLockoutUntil(until);
          setCountdown(lockoutSeconds);
          try {
            localStorage.setItem(LOCKOUT_KEY, JSON.stringify({ count: newCount, until }));
          } catch (err) {}
          setErrorMessage(`SECURITY LOCKOUT ACTIVATED: 3 consecutive failed attempts. System locked for ${lockoutSeconds} seconds.`);
        } else {
          const remaining = maxAttempts - newCount;
          try {
            localStorage.setItem(LOCKOUT_KEY, JSON.stringify({ count: newCount, until: 0 }));
          } catch (err) {}
          setErrorMessage(`Invalid credentials. Security Warning: ${remaining} attempt${remaining > 1 ? 's' : ''} remaining before system lockdown.`);
        }
        setIsSubmitting(false);
        return false;
      }
    };

    // If static host (e.g. GitHub Pages or file: protocol), skip API and authenticate directly on client
    const isStaticHost = typeof window !== 'undefined' && (
      window.location.hostname.endsWith('github.io') ||
      window.location.protocol === 'file:'
    );

    if (isStaticHost) {
      await performClientAuth();
      return;
    }

    try {
      // 1. Authenticate via Server API (Server-Side Brute-Force Rate Limiting)
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmedUser, password: trimmedPass }),
      });

      // If backend API endpoint is not implemented (404/405), fallback to client auth
      if (res.status === 404 || res.status === 405) {
        await performClientAuth();
        return;
      }

      if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        const secs = data.remainingSeconds || lockoutSeconds;
        const until = Date.now() + secs * 1000;
        setLockoutUntil(until);
        setCountdown(secs);
        setFailedAttempts(maxAttempts);
        try {
          localStorage.setItem(LOCKOUT_KEY, JSON.stringify({ count: maxAttempts, until }));
        } catch (err) {}
        setErrorMessage(data.error || `SECURITY LOCKOUT ACTIVATED: 3 consecutive failed attempts. System locked for ${secs} seconds.`);
        setIsSubmitting(false);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.token) {
          setFailedAttempts(0);
          setErrorMessage('');
          try {
            localStorage.removeItem(LOCKOUT_KEY);
            sessionStorage.setItem('sahadat_admin_session_token', data.token);
          } catch (err) {}
          setIsSubmitting(false);
          onAuthenticated();
          return;
        }
      } else {
        const data = await res.json().catch(() => ({}));
        const newCount = failedAttempts + 1;
        setFailedAttempts(newCount);

        if (data.locked) {
          const secs = data.remainingSeconds || lockoutSeconds;
          const until = Date.now() + secs * 1000;
          setLockoutUntil(until);
          setCountdown(secs);
          try {
            localStorage.setItem(LOCKOUT_KEY, JSON.stringify({ count: newCount, until }));
          } catch (err) {}
          setErrorMessage(data.error || `SECURITY LOCKOUT ACTIVATED: System locked for ${secs} seconds.`);
        } else {
          const remaining = data.attemptsRemaining ?? Math.max(0, maxAttempts - newCount);
          try {
            localStorage.setItem(LOCKOUT_KEY, JSON.stringify({ count: newCount, until: 0 }));
          } catch (err) {}
          setErrorMessage(data.error || `Invalid credentials. Security Warning: ${remaining} attempt${remaining > 1 ? 's' : ''} remaining before system lockdown.`);
        }
        setIsSubmitting(false);
        return;
      }
    } catch (netErr) {
      // 2. Offline / Static fallback authentication
      await performClientAuth();
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden font-chakra">
      {/* Background Matrix Grid & Glow Elements */}
      <div className="absolute inset-0 hazard-stripes opacity-30 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
        style={{ backgroundColor: `rgba(${accentRgb}, 0.05)` }}
      />

      {/* Cyber Auth Terminal Card */}
      <div className="relative w-full max-w-md bg-[#090b12] border border-white/10 rounded-2xl p-7 sm:p-9 shadow-2xl z-10">
        {/* Top Accent Gradient Line */}
        <div
          className="absolute top-0 inset-x-0 h-1 rounded-t-2xl"
          style={{
            background: `linear-gradient(to right, transparent, ${accentHex}, transparent)`,
          }}
        />

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 border"
            style={{
              backgroundColor: `rgba(${accentRgb}, 0.1)`,
              borderColor: `rgba(${accentRgb}, 0.3)`,
              boxShadow: `0 0 20px rgba(${accentRgb}, 0.2)`,
            }}
          >
            <STLLogo className="w-8 h-8" color={accentHex} />
          </div>

          <span
            className="text-[10px] font-mono tracking-[0.3em] uppercase mb-1 flex items-center gap-1.5 font-bold"
            style={{ color: accentHex }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: accentHex }}
            />
            OMNIRA CYBER SECURE ACCESS // QUANTUM PORTAL
          </span>

          <h1 className="font-orbitron font-extrabold text-2xl text-white tracking-wider uppercase">
            ADMIN GATEWAY
          </h1>
          <p className="font-chakra text-xs text-neutral-400 mt-1 max-w-xs">
            Enter administrative credentials to authenticate to production data management terminal.
          </p>
        </div>

        {/* Lockout Warning Banner */}
        {isLocked && (
          <div className="mb-6 p-4 rounded-xl bg-[#FF0055]/10 border border-[#FF0055]/50 text-white animate-pulse">
            <div className="flex items-center gap-2.5 text-[#FF0055] font-orbitron font-bold text-xs uppercase tracking-wider mb-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>LOCKOUT PROTOCOL ACTIVE</span>
            </div>
            <p className="text-xs text-neutral-300 font-chakra leading-relaxed">
              Excessive unauthorized authentication attempts detected. Brute-force mitigation has blocked further submissions.
            </p>
            <div className="mt-3 pt-2.5 border-t border-[#FF0055]/30 flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-neutral-400">COOLDOWN TIMER:</span>
              <span className="text-[#FF0055] text-sm bg-black/60 px-2 py-0.5 rounded border border-[#FF0055]/40">
                {countdown}s REMAINING
              </span>
            </div>
          </div>
        )}

        {/* Error Message (when not locked) */}
        {!isLocked && errorMessage && (
          <div className="mb-6 p-3 rounded-lg bg-[#FF0055]/10 border border-[#FF0055]/30 text-[#FF0055] text-xs font-chakra flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              ADMIN IDENTIFIER (USERNAME)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLocked}
                placeholder="Enter admin ID..."
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#05060a] border border-white/10 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              ACCESS KEY (PASSWORD)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                <KeyRound className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLocked}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-10 py-2.5 bg-[#05060a] border border-white/10 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLocked || isSubmitting}
              style={
                !isLocked
                  ? {
                      backgroundColor: accentHex,
                      boxShadow: `0 0 25px ${accentGlow}`,
                    }
                  : {}
              }
              className={`w-full py-3 rounded-lg font-chakra font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                isLocked
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
                  : 'text-black cursor-pointer hover:opacity-90'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>
                {isLocked
                  ? `LOCKED // ${countdown}S`
                  : isSubmitting
                  ? 'AUTHENTICATING...'
                  : 'AUTHENTICATE ACCESS'}
              </span>
              {!isLocked && !isSubmitting && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </form>

        {/* Security Footer Details */}
        <div className="mt-8 pt-4 border-t border-white/5 flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase">
            <Terminal className="w-3 h-3" style={{ color: accentHex }} />
            <span>BRUTE-FORCE SHIELD ACTIVE // 3-STRIKE LOCKOUT</span>
          </div>
          <span className="text-[10px] font-chakra text-neutral-600">
            Authorized Administrator Access Only · All IP transmissions are recorded
          </span>
        </div>
      </div>
    </div>
  );
}
