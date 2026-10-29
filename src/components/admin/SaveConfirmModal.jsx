import React from 'react';
import { AlertTriangle, Check, X, ShieldAlert } from 'lucide-react';

export function SaveConfirmModal({
  isOpen,
  title = 'CONFIRM PRODUCTION COMMIT',
  sectionName = '',
  description = 'Are you sure you want to commit these changes to the live portfolio database?',
  onConfirm,
  onCancel,
  isLoading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Outer Cyber Modal Container */}
      <div className="relative w-full max-w-lg bg-[#0a0c14] border border-[#00F0FF]/40 rounded-xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden">
        {/* Chamfered top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent" />
        
        {/* Background Subtle Tech Watermark */}
        <div className="absolute -right-8 -bottom-8 pointer-events-none opacity-5 text-white">
          <ShieldAlert className="w-48 h-48" />
        </div>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="p-3 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF]">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#00F0FF] uppercase block mb-1">
              DATABASE COMMIT GATEWAY // VERIFICATION
            </span>
            <h3 className="font-orbitron font-bold text-lg sm:text-xl text-white tracking-wide uppercase">
              {title}
            </h3>
          </div>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="text-neutral-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 mb-6">
          <p className="font-chakra text-sm text-neutral-300 leading-relaxed">
            {description}
          </p>

          {sectionName && (
            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400 uppercase">Target Section:</span>
              <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-wider px-2 py-0.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/20">
                {sectionName}
              </span>
            </div>
          )}

          <div className="text-[11px] font-chakra text-neutral-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#80B82C] animate-ping" />
            <span>Changes will immediately reflect across your live portfolio without rebuild.</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-lg border border-white/20 text-xs font-chakra font-medium tracking-wider uppercase text-neutral-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="relative px-6 py-2.5 rounded-lg bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Committing...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Confirm & Save</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
