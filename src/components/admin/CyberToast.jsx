import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function CyberToast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const isSuccess = type === 'success';
  const isError = type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div
        className={`flex items-center gap-3.5 px-5 py-3.5 rounded-xl border backdrop-blur-md shadow-2xl transition-all ${
          isSuccess
            ? 'bg-[#0a1017]/95 border-[#00F0FF]/50 shadow-[0_0_25px_rgba(0,240,255,0.25)] text-white'
            : isError
            ? 'bg-[#150a0f]/95 border-[#FF0055]/50 shadow-[0_0_25px_rgba(255,0,85,0.25)] text-white'
            : 'bg-[#0d0f17]/95 border-white/20 text-white'
        }`}
      >
        <div className="flex-shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#00F0FF] animate-bounce" />}
          {isError && <AlertCircle className="w-5 h-5 text-[#FF0055] animate-pulse" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-neutral-400" />}
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
            SYSTEM NOTIFICATION // {type.toUpperCase()}
          </span>
          <span className="text-xs font-chakra font-medium tracking-wide">
            {message}
          </span>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 text-neutral-400 hover:text-white p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
