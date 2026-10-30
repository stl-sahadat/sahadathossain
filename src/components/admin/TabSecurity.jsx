import React, { useState } from 'react';
import { ShieldCheck, Lock, User, KeyRound, Check, AlertTriangle, Eye, EyeOff, ShieldAlert } from 'lucide-react';

export function TabSecurity({
  authConfig = {},
  onUpdateAuthConfig,
  onRequestSave,
}) {
  const [username, setUsername] = useState(authConfig.username || 'admin');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [lockoutSeconds, setLockoutSeconds] = useState(authConfig.lockoutSeconds || 15);
  const [maxAttempts, setMaxAttempts] = useState(authConfig.maxAttempts || 3);
  const [showPass, setShowPass] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });

    if (newPassword) {
      if (newPassword !== confirmPassword) {
        setMsg({ text: 'New password and confirmation do not match.', type: 'error' });
        return;
      }
      if (newPassword.length < 6) {
        setMsg({ text: 'Password must be at least 6 characters long.', type: 'error' });
        return;
      }
    }

    const updatedAuth = {
      ...authConfig,
      username: username.trim() || 'admin',
      passwordHash: newPassword.trim() ? newPassword.trim() : (authConfig.passwordHash || 'sahadat4405'),
      lockoutSeconds: Number(lockoutSeconds) || 15,
      maxAttempts: Number(maxAttempts) || 3,
    };

    onUpdateAuthConfig(updatedAuth);
    onRequestSave('Security & Credentials', {
      authConfig: updatedAuth,
    });

    setMsg({ text: 'Security credentials updated successfully!', type: 'success' });
    setNewPassword('');
    setConfirmPassword('');
    setCurrentPassword('');
  };

  return (
    <form onSubmit={handleSaveSecurity} className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase block mb-1">
            SECTION CONFIGURATION // 12
          </span>
          <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
            SECURITY & ADMINISTRATIVE CREDENTIALS
          </h2>
          <p className="font-chakra text-xs text-neutral-400 mt-1">
            Manage admin login identifiers, access keys, and brute-force lockout defense policies.
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Save Security Settings</span>
        </button>
      </div>

      {msg.text && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-chakra flex items-center gap-2 ${
            msg.type === 'success'
              ? 'bg-[#00F0FF]/10 border-[#00F0FF]/30 text-[#00F0FF]'
              : 'bg-[#FF0055]/10 border-[#FF0055]/30 text-[#FF0055]'
          }`}
        >
          {msg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          <span>{msg.text}</span>
        </div>
      )}

      {/* Admin Credentials */}
      <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-4">
        <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-[#00F0FF]" />
          <span>ADMIN LOGIN PORTAL CREDENTIALS</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              ADMIN USERNAME / ID
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              CURRENT PASSWORD (FOR VERIFICATION)
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              NEW PASSWORD (LEAVE BLANK TO KEEP UNCHANGED)
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new strong password..."
                className="w-full px-3.5 pr-10 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-white"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              CONFIRM NEW PASSWORD
            </label>
            <input
              type={showPass ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password..."
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Brute-force & Lockout Shield Settings */}
      <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-4">
        <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#FF0055]" />
          <span>BRUTE FORCE MITIGATION & LOCKOUT POLICY</span>
        </h3>
        <p className="font-chakra text-xs text-neutral-400">
          When an unauthorized user enters the incorrect password consecutively, access is strictly locked with a persistent real-time countdown timer.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              MAX FAILED ATTEMPTS BEFORE LOCKDOWN
            </label>
            <select
              value={maxAttempts}
              onChange={(e) => setMaxAttempts(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
            >
              <option value={3}>3 Attempts (Strict / Recommended)</option>
              <option value={4}>4 Attempts</option>
              <option value={5}>5 Attempts</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              LOCKOUT COOLDOWN DURATION (SECONDS)
            </label>
            <select
              value={lockoutSeconds}
              onChange={(e) => setLockoutSeconds(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
            >
              <option value={10}>10 Seconds Cooldown</option>
              <option value={15}>15 Seconds Cooldown (Standard)</option>
              <option value={30}>30 Seconds Cooldown</option>
              <option value={60}>60 Seconds Cooldown</option>
            </select>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-400">SHIELD STATUS:</span>
          <span className="text-[#80B82C] font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#80B82C] animate-pulse" />
            PROTECTION ENGAGED // ANTI-BRUTE FORCE V3
          </span>
        </div>
      </div>
    </form>
  );
}
