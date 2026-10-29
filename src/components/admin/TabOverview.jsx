import React, { useRef } from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  Video,
  MessageSquare,
  HelpCircle,
  Download,
  Upload,
  RefreshCcw,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Palette,
} from 'lucide-react';

export function TabOverview({
  data,
  currentTheme,
  onSelectTab,
  onExportJSON,
  onImportJSON,
  onResetDefaults,
  onRequestSave,
}) {
  const fileInputRef = useRef(null);

  const totalProjects = data.projects?.length || 0;
  const totalVideos = data.videoGallery?.length || 0;
  const totalReviews = data.testimonials?.length || 0;
  const totalFaqs = data.faqs?.length || 0;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        const res = onImportJSON(text);
        if (res.success) {
          alert('✓ Portfolio database imported and synchronized successfully!');
        } else {
          alert('⚠️ Failed importing backup: ' + res.error);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#00F0FF]/10 via-[#0a0f1d] to-[#06080e] border border-[#00F0FF]/30 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#00F0FF] uppercase block mb-1 font-bold">
            CENTRAL CONTROL MATRIX // PRODUCTION TERMINAL
          </span>
          <h2 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
            WELCOME, {data.personalInfo?.name || 'SAHADAT VAI'}
          </h2>
          <p className="font-chakra text-sm text-neutral-300 max-w-2xl leading-relaxed">
            All modifications performed inside this administrative suite dynamically synchronize across your live portfolio, 3D halftone rendering matrix, project archives, client testimonials, and persistent storage.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div
          onClick={() => onSelectTab('projects')}
          className="p-5 rounded-xl bg-[#090b12] border border-white/10 hover:border-[#00F0FF]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono text-neutral-400 uppercase">PROJECT ARCHIVES</span>
            <FolderGit2 className="w-5 h-5 text-[#00F0FF] group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
            {totalProjects}
          </div>
          <span className="text-[10px] font-chakra text-[#00F0FF] mt-1 inline-block">
            Click to manage projects →
          </span>
        </div>

        <div
          onClick={() => onSelectTab('videos')}
          className="p-5 rounded-xl bg-[#090b12] border border-white/10 hover:border-[#00F0FF]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono text-neutral-400 uppercase">VIDEO REELS</span>
            <Video className="w-5 h-5 text-[#00F0FF] group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
            {totalVideos}
          </div>
          <span className="text-[10px] font-chakra text-[#00F0FF] mt-1 inline-block">
            YouTube & FB Reels →
          </span>
        </div>

        <div
          onClick={() => onSelectTab('reviews')}
          className="p-5 rounded-xl bg-[#090b12] border border-white/10 hover:border-[#00F0FF]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono text-neutral-400 uppercase">CLIENT REVIEWS</span>
            <MessageSquare className="w-5 h-5 text-[#00F0FF] group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
            {totalReviews}
          </div>
          <span className="text-[10px] font-chakra text-[#00F0FF] mt-1 inline-block">
            Manage testimonials →
          </span>
        </div>

        <div
          onClick={() => onSelectTab('theme')}
          className="p-5 rounded-xl bg-[#090b12] border border-white/10 hover:border-[#00F0FF]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono text-neutral-400 uppercase">COLOR THEME</span>
            <Palette className="w-5 h-5" style={{ color: currentTheme?.hex || '#00F0FF' }} />
          </div>
          <div className="font-orbitron font-extrabold text-lg sm:text-xl text-white truncate" style={{ color: currentTheme?.hex || '#00F0FF' }}>
            {currentTheme?.name || 'Cyber Cyan'}
          </div>
          <span className="text-[10px] font-chakra text-neutral-400 mt-1 inline-block">
            5 live themes available →
          </span>
        </div>
      </div>

      {/* Database Persistence & Backup Management */}
      <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-[#80B82C]" />
              <h3 className="font-orbitron font-bold text-base text-white uppercase tracking-wider">
                PERSISTENT DATA ENGINE & BACKUP
              </h3>
            </div>
            <p className="font-chakra text-xs text-neutral-400">
              Complete local disk store + browser storage synchronization. Export full backups or restore previous snapshots anytime.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#80B82C] animate-pulse" />
            <span className="text-xs font-mono text-[#80B82C] font-bold uppercase">
              STATUS: OPERATIONAL
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Export JSON */}
          <button
            onClick={onExportJSON}
            className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-chakra text-xs tracking-wider uppercase transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#00F0FF]" />
            <span>Export JSON Backup</span>
          </button>

          {/* Import JSON */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-chakra text-xs tracking-wider uppercase transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4 text-[#FFD700]" />
              <span>Import JSON Backup</span>
            </button>
          </div>

          {/* Factory Reset */}
          <button
            onClick={() => {
              if (window.confirm('⚠️ Are you sure you want to revert all data back to original default settings?')) {
                onResetDefaults();
              }
            }}
            className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-chakra text-xs tracking-wider uppercase transition-all cursor-pointer"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Reset to Factory Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
}
