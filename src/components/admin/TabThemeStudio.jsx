import React, { useState, useEffect, useRef } from 'react';
import { Palette, Check, Sparkles, Eye, MousePointer, Crosshair, Target, CircleDot, Zap } from 'lucide-react';
import { THEME_PRESETS, CURSOR_STYLES } from '../../context/PortfolioDataContext';

export function TabThemeStudio({
  currentTheme,
  onSelectTheme,
  activeCursorStyle = 'cyber-dot',
  onSelectCursorStyle,
  onRequestSave,
}) {
  const [selectedThemeId, setSelectedThemeId] = useState(currentTheme?.id || 'cyber-cyan');
  const [selectedCursorStyle, setSelectedCursorStyle] = useState(activeCursorStyle || 'cyber-dot');

  // Synchronize state when external portfolio data loads or updates
  useEffect(() => {
    if (activeCursorStyle) {
      setSelectedCursorStyle(activeCursorStyle);
    }
  }, [activeCursorStyle]);

  useEffect(() => {
    if (currentTheme?.id) {
      setSelectedThemeId(currentTheme.id);
    }
  }, [currentTheme?.id]);

  const handleApplyPreset = (themeId) => {
    setSelectedThemeId(themeId);
    if (typeof onSelectTheme === 'function') {
      onSelectTheme(themeId);
    }
  };

  const handleApplyCursor = (cursorId) => {
    setSelectedCursorStyle(cursorId);
    if (typeof onSelectCursorStyle === 'function') {
      onSelectCursorStyle(cursorId);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    onRequestSave('Theme & Cursor Style Studio', {
      activeThemeId: selectedThemeId,
      activeCursorStyle: selectedCursorStyle,
    });
  };

  const accentColor = currentTheme?.hex || '#00F0FF';
  const accentGlow = currentTheme?.glow || 'rgba(0, 240, 255, 0.45)';

  return (
    <form onSubmit={handleSave} className="space-y-10 animate-fadeIn">
      {/* ========================================================================
          PAGE HEADER & SAVE ACTION
          ======================================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase block mb-1">
            SECTION CONFIGURATION // 11
          </span>
          <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
            THEME & CURSOR STYLE STUDIO
          </h2>
          <p className="font-chakra text-xs text-neutral-400 mt-1">
            কালার প্যালেট এবং মাউস কার্সরের স্টাইল পরিবর্তন করুন। অ্যাডমিন প্যানেলে যা সিলেক্ট করবেন, তা সাথে সাথে পুরো পোর্টফোলিওতে কার্যকর হবে।
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Save Changes // সংরক্ষণ করুন</span>
        </button>
      </div>

      {/* ========================================================================
          1. COLOR PALETTE PRESETS
          ======================================================================== */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Palette className="w-5 h-5 text-[#00F0FF]" />
          <h3 className="font-orbitron font-bold text-sm sm:text-base text-white uppercase tracking-wider">
            1. CYBER COLOR PALETTE // কালার থিম নির্বাচন
          </h3>
        </div>
        <p className="font-chakra text-xs text-neutral-400">
          Switch between 5 authentic cyber color profiles. Changes instantly reflect across both the live portfolio and admin panel.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {THEME_PRESETS.map((preset) => {
            const isCurrent = (currentTheme?.id || selectedThemeId) === preset.id;

            return (
              <div
                key={preset.id}
                onClick={() => handleApplyPreset(preset.id)}
                className={`p-6 rounded-2xl bg-[#090b12] border transition-all cursor-pointer relative overflow-hidden group ${
                  isCurrent
                    ? 'border-white/80 shadow-[0_0_30px_rgba(255,255,255,0.15)] ring-1 ring-white/40'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                {/* Top Accent Swatch Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: preset.hex }}
                />

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl border border-white/20 shadow-lg flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: preset.hex,
                        boxShadow: `0 0 20px ${preset.glow}`,
                      }}
                    >
                      {isCurrent && <Check className="w-5 h-5 text-black stroke-[3]" />}
                    </div>

                    <div>
                      <h3 className="font-orbitron font-bold text-sm text-white uppercase">
                        {preset.name}
                      </h3>
                      <span className="text-[10px] font-mono font-bold" style={{ color: preset.hex }}>
                        {preset.hex}
                      </span>
                    </div>
                  </div>

                  {isCurrent && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-white text-black">
                      ACTIVE
                    </span>
                  )}
                </div>

                <p className="font-chakra text-xs text-neutral-400 leading-relaxed mb-4">
                  {preset.description}
                </p>

                {/* Live Preview Elements inside Card */}
                <div className="p-3 rounded-lg bg-black/50 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-neutral-500 uppercase">Button Glow:</span>
                    <span
                      className="px-2 py-0.5 rounded font-bold text-black"
                      style={{ backgroundColor: preset.hex }}
                    >
                      PREVIEW
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-neutral-500 uppercase">Text Accent:</span>
                    <span className="font-bold uppercase tracking-wider" style={{ color: preset.hex }}>
                      10X VELOCITY
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApplyPreset(preset.id);
                  }}
                  className={`mt-4 w-full py-2 rounded-lg text-xs font-chakra font-bold tracking-wider uppercase transition-all ${
                    isCurrent
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white'
                  }`}
                >
                  {isCurrent ? 'Current Active Theme' : 'Select This Palette'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================
          2. CURSOR STYLE STUDIO (5-6 Options + Default OS Pointer)
          ======================================================================== */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <MousePointer className="w-5 h-5 text-[#00F0FF]" />
            <h3 className="font-orbitron font-bold text-sm sm:text-base text-white uppercase tracking-wider">
              2. CURSOR STYLE STUDIO // মাউস কার্সর স্টাইল সিলেক্টর
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20 uppercase tracking-widest w-fit">
            ACTIVE CURSOR: {selectedCursorStyle.toUpperCase()}
          </span>
        </div>

        <p className="font-chakra text-xs text-neutral-400">
          আপনার পছন্দের মাউস কার্সর স্টাইল বেছে নিন। Sahadat vai-এর নির্দেশনা অনুযায়ী মাউসের অতিরিক্ত ভারী ট্রেইলিং রিং রিমুভ করা হয়েছে এবং কার্সরটি সরাসরি মাউস পয়েন্টার বরাবর দ্রুত রেসপন্স করে। 'Default OS Pointer' সিলেক্ট করলে ব্রাউজারের স্বাভাবিক মাউস তীর দেখা যাবে।
        </p>

        {/* Cursor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CURSOR_STYLES.map((cursor) => {
            const isCurrentCursor = selectedCursorStyle === cursor.id;

            return (
              <div
                key={cursor.id}
                data-cursor-id={cursor.id}
                onClick={() => handleApplyCursor(cursor.id)}
                className={`p-6 rounded-2xl bg-[#090b12] border transition-all cursor-pointer relative overflow-hidden group flex flex-col justify-between ${
                  isCurrentCursor
                    ? 'border-white/80 shadow-[0_0_30px_rgba(255,255,255,0.18)] ring-1 ring-white/50'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                {/* Top Accent Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-200"
                  style={{
                    backgroundColor: isCurrentCursor ? accentColor : 'transparent',
                  }}
                />

                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center border transition-transform group-hover:scale-105"
                        style={{
                          backgroundColor: isCurrentCursor ? `${accentColor}20` : 'rgba(255,255,255,0.05)',
                          borderColor: isCurrentCursor ? accentColor : 'rgba(255,255,255,0.1)',
                        }}
                      >
                        {cursor.iconType === 'os-pointer' && <MousePointer className="w-4 h-4 text-white" />}
                        {cursor.iconType === 'dot' && <CircleDot className="w-4 h-4 text-[#00F0FF]" style={{ color: accentColor }} />}
                        {cursor.iconType === 'crosshair' && <Crosshair className="w-4 h-4 text-[#00F0FF]" style={{ color: accentColor }} />}
                        {cursor.iconType === 'arrow' && <Zap className="w-4 h-4 text-[#00F0FF]" style={{ color: accentColor }} />}
                        {cursor.iconType === 'diamond' && <Sparkles className="w-4 h-4 text-[#00F0FF]" style={{ color: accentColor }} />}
                        {cursor.iconType === 'ring' && <Target className="w-4 h-4 text-[#00F0FF]" style={{ color: accentColor }} />}
                        {cursor.iconType === 'brackets' && <Crosshair className="w-4 h-4 text-[#00F0FF]" style={{ color: accentColor }} />}
                      </div>

                      <div>
                        <h4 className="font-orbitron font-bold text-sm text-white uppercase">
                          {cursor.name}
                        </h4>
                        <span className="text-[11px] font-chakra font-medium block" style={{ color: accentColor }}>
                          {cursor.bengaliName}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300 font-bold uppercase tracking-wider">
                        {cursor.badge}
                      </span>
                      {isCurrentCursor && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-white text-black flex items-center gap-1">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                          ACTIVE
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="font-chakra text-xs text-neutral-400 leading-relaxed mb-4 min-h-[36px]">
                    {cursor.description}
                  </p>

                  {/* Visual Interactive Preview Box */}
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col items-center justify-center gap-3 relative overflow-hidden group/box min-h-[105px]">
                    {/* Background Subtle Grid Accent */}
                    <div className="absolute inset-0 hazard-stripes opacity-30 pointer-events-none" />

                    {/* Preview 1: Default OS Pointer */}
                    {cursor.id === 'default' && (
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="drop-shadow-lg transition-transform group-hover/box:scale-110"
                        >
                          <path
                            d="M4 2 L4 20 L9.5 15 L14.5 23 L17.5 21 L12.5 13 L19.5 13 Z"
                            fill="white"
                            stroke="#111827"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[10px] font-mono text-neutral-400">
                          স্বাভাবিক সিস্টেম মাউস তীর
                        </span>
                        <div className="force-os-cursor-pointer px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] font-mono transition-colors">
                          Hover to test OS pointer
                        </div>
                      </div>
                    )}

                    {/* Preview 2: Minimal Cyber Dot */}
                    {cursor.id === 'cyber-dot' && (
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="relative flex items-center justify-center py-2">
                          <div
                            className="w-6 h-6 rounded-full animate-ping absolute opacity-25"
                            style={{ backgroundColor: accentColor }}
                          />
                          <div
                            className="w-3 h-3 rounded-full transition-transform group-hover/box:scale-150 duration-200"
                            style={{
                              backgroundColor: accentColor,
                              boxShadow: `0 0 14px ${accentColor}, 0 0 24px ${accentGlow}`,
                            }}
                          />
                        </div>
                        <span className="text-[10px] font-mono" style={{ color: accentColor }}>
                          উজ্জ্বল নিয়ন বিন্দু (Zero Lag Core)
                        </span>
                      </div>
                    )}

                    {/* Preview 3: Precision Reticle / Crosshair */}
                    {cursor.id === 'crosshair' && (
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="relative w-8 h-8 flex items-center justify-center transition-transform group-hover/box:rotate-45 duration-300">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
                          />
                          <span className="absolute -top-1 w-0.5 h-2" style={{ backgroundColor: accentColor }} />
                          <span className="absolute -bottom-1 w-0.5 h-2" style={{ backgroundColor: accentColor }} />
                          <span className="absolute -left-1 h-0.5 w-2" style={{ backgroundColor: accentColor }} />
                          <span className="absolute -right-1 h-0.5 w-2" style={{ backgroundColor: accentColor }} />
                        </div>
                        <span className="text-[10px] font-mono" style={{ color: accentColor }}>
                          সায়েন্স-ফিকশন ট্যাকটিক্যাল র্যাটিকেল (+ / ×)
                        </span>
                      </div>
                    )}

                    {/* Preview 4: Cyber Stealth Arrow */}
                    {cursor.id === 'futuristic-arrow' && (
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="transition-transform group-hover/box:scale-115 duration-200">
                          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                            <polygon
                              points="2,2 21,9.5 13.5,13.5 9.5,21"
                              fill="rgba(5, 7, 12, 0.95)"
                              stroke={accentColor}
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <line
                              x1="2.5"
                              y1="2.5"
                              x2="13"
                              y2="13"
                              stroke="#FFFFFF"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                            <circle cx="2" cy="2" r="1.5" fill="#FFFFFF" />
                          </svg>
                        </div>
                        <span className="text-[10px] font-mono" style={{ color: accentColor }}>
                          শার্প ভবিষ্যৎমুখী পলিগন অ্যারো
                        </span>
                      </div>
                    )}

                    {/* Preview 5: Diamond Prism */}
                    {cursor.id === 'diamond' && (
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="relative w-7 h-7 flex items-center justify-center transition-transform group-hover/box:rotate-90 duration-300">
                          <div
                            className="w-4 h-4 border-2 rotate-45 transition-colors"
                            style={{
                              borderColor: accentColor,
                              backgroundColor: 'rgba(255,255,255,0.05)',
                              boxShadow: `0 0 10px ${accentColor}`,
                            }}
                          />
                          <div
                            className="absolute w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: accentColor }}
                          />
                        </div>
                        <span className="text-[10px] font-mono" style={{ color: accentColor }}>
                          রোটেটেড ক্রিস্টাল প্রিজম
                        </span>
                      </div>
                    )}

                    {/* Preview 6: Precision Micro Ring */}
                    {cursor.id === 'hollow-circle' && (
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="relative w-7 h-7 flex items-center justify-center transition-transform group-hover/box:scale-125 duration-200">
                          <div
                            className="w-5 h-5 rounded-full border-2 transition-colors"
                            style={{
                              borderColor: accentColor,
                              backgroundColor: 'rgba(255,255,255,0.05)',
                              boxShadow: `0 0 10px ${accentColor}`,
                            }}
                          />
                          <div
                            className="absolute w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: accentColor }}
                          />
                        </div>
                        <span className="text-[10px] font-mono" style={{ color: accentColor }}>
                          মসৃণ মাইক্রো রিং (জিরো ল্যাগ)
                        </span>
                      </div>
                    )}

                    {/* Preview 7: Tactical HUD Brackets */}
                    {cursor.id === 'tactical-brackets' && (
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="relative w-8 h-8 flex items-center justify-center transition-transform group-hover/box:rotate-90 duration-300">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
                          />
                          <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2" style={{ borderColor: accentColor }} />
                          <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2" style={{ borderColor: accentColor }} />
                          <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2" style={{ borderColor: accentColor }} />
                          <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2" style={{ borderColor: accentColor }} />
                        </div>
                        <span className="text-[10px] font-mono" style={{ color: accentColor }}>
                          ৪-কোণার সাই-ফাই টার্গেট লক
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Selection Button */}
                <button
                  type="button"
                  data-cursor-select={cursor.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApplyCursor(cursor.id);
                  }}
                  className={`mt-4 w-full py-2 rounded-lg text-xs font-chakra font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 ${
                    isCurrentCursor
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white'
                  }`}
                >
                  {isCurrentCursor ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Current Active Cursor // নির্বাচিত</span>
                    </>
                  ) : (
                    <span>Select This Cursor // কার্সর নির্বাচন করুন</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Cursor Test Playground */}
        <div className="p-6 rounded-2xl bg-[#07090e] border border-white/10 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00F0FF]" style={{ color: accentColor }} />
              <h4 className="font-orbitron font-bold text-xs uppercase tracking-wider text-white">
                LIVE INTERACTIVE CURSOR PLAYGROUND // লাইভ কার্সর টেস্টিং প্যাড
              </h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400">
              ACTIVE SELECTION: <span className="font-bold uppercase" style={{ color: accentColor }}>{selectedCursorStyle}</span>
            </span>
          </div>

          <p className="font-chakra text-xs text-neutral-400">
            নিচে আপনার নির্বাচিত কার্সরের ইন্টারঅ্যাক্টিভ আচরণ পরীক্ষা করুন। বাটন ও ইনপুটে হোভার করলে সাইবার কার্সরের স্কেলিং ও অ্যানিমেশন সরাসরি দেখতে পাবেন।
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div
              className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-white/30 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
            >
              <span className="text-xs font-chakra font-bold text-white group-hover:text-[#00F0FF] transition-colors" style={{ color: undefined }}>
                Hover Me // বাটন টেস্ট
              </span>
              <span className="text-[10px] font-mono text-neutral-500">Scale + Glow Expand</span>
            </div>

            <div
              className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-white/30 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
            >
              <span className="text-xs font-chakra font-bold text-white">
                Click Me // ক্লিক টেস্ট
              </span>
              <span className="text-[10px] font-mono text-neutral-500">Tactile Recoil & Ripple</span>
            </div>

            <div
              className="p-4 rounded-xl bg-black/50 border border-white/10 flex flex-col items-center justify-center text-center gap-1.5"
            >
              <input
                type="text"
                placeholder="Type here // টেক্সট টেস্ট..."
                className="w-full px-3 py-1.5 rounded-lg bg-black/70 border border-white/10 text-xs font-chakra text-white focus:outline-none focus:border-[#00F0FF] placeholder:text-neutral-600 text-center"
              />
              <span className="text-[9px] font-mono text-neutral-500">Cyber I-Beam Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================
          3. LIVE COMPONENT RENDER PREVIEW
          ======================================================================== */}
      <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-4">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-[#00F0FF]" style={{ color: accentColor }} />
          <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
            LIVE COMPONENT RENDER PREVIEW (INSTANT FEEDBACK)
          </h3>
        </div>
        <p className="font-chakra text-xs text-neutral-400">
          This sample card illustrates how your chosen palette and cursor render across buttons, borders, badges, and typography in the live portfolio.
        </p>

        <div
          className="p-6 rounded-xl bg-[#05060a] border space-y-4"
          style={{ borderColor: `${accentColor}50` }}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-widest border"
              style={{
                backgroundColor: `${accentColor}25`,
                color: accentColor,
                borderColor: `${accentColor}50`,
              }}
            >
              SAMPLE CYBER BADGE // 100% REACTIVE
            </span>
            <span className="text-xs font-mono text-neutral-400">
              PALETTE: <span className="font-bold" style={{ color: accentColor }}>{accentColor}</span>
              {' · '}
              CURSOR: <span className="font-bold text-white">{selectedCursorStyle.toUpperCase()}</span>
            </span>
          </div>

          <h4 className="font-orbitron font-bold text-lg text-white uppercase tracking-wide">
            ARCHITECTING NEXT-GEN <span style={{ color: accentColor }}>DIGITAL ECOSYSTEMS</span>
          </h4>

          <p className="font-chakra text-xs text-neutral-300 leading-relaxed max-w-lg">
            High-converting mobile apps, autonomous AI tooling swarms, and pixel-precise design craft with sub-140ms performance benchmarks.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              className="px-5 py-2.5 rounded-lg text-black font-chakra font-bold text-xs tracking-wider uppercase transition-all"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 0 20px ${accentGlow}`,
              }}
            >
              Primary Action
            </button>
            <button
              type="button"
              className="px-5 py-2.5 rounded-lg bg-transparent text-white border font-chakra font-bold text-xs tracking-wider uppercase transition-colors"
              style={{
                borderColor: `${accentColor}70`,
              }}
            >
              Outline Button
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
