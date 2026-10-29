import React, { useState } from 'react';
import { Palette, Check, Sparkles, RefreshCw, Eye, Sliders } from 'lucide-react';
import { THEME_PRESETS } from '../../context/PortfolioDataContext';

export function TabThemeStudio({
  currentTheme,
  onSelectTheme,
  onRequestSave,
}) {
  const [selectedThemeId, setSelectedThemeId] = useState(currentTheme.id || 'cyber-cyan');
  const [customHex, setCustomHex] = useState(currentTheme.hex || '#00F0FF');

  const handleApplyPreset = (themeId) => {
    setSelectedThemeId(themeId);
    onSelectTheme(themeId);
  };

  const handleCustomHexChange = (e) => {
    const hex = e.target.value;
    setCustomHex(hex);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onRequestSave('Theme & Color Palette Studio', {
      activeThemeId: selectedThemeId,
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase block mb-1">
            SECTION CONFIGURATION // 11
          </span>
          <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
            THEME & COLOR PALETTE STUDIO
          </h2>
          <p className="font-chakra text-xs text-neutral-400 mt-1">
            Switch between 5 authentic cyber color profiles. Changes instantly reflect across both the live portfolio and admin panel.
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Save Theme Preset</span>
        </button>
      </div>

      {/* Preset Swatches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {THEME_PRESETS.map((preset) => {
          const isCurrent = currentTheme.id === preset.id;

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
                  <span
                    className="text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-white text-black"
                  >
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

      {/* Live Cyber Interactive Demo Section */}
      <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-4">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-[#00F0FF]" />
          <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
            LIVE COMPONENT RENDER PREVIEW (INSTANT FEEDBACK)
          </h3>
        </div>
        <p className="font-chakra text-xs text-neutral-400">
          This sample card illustrates how your chosen palette renders across buttons, borders, badges, and typography in the live portfolio.
        </p>

        <div className="p-6 rounded-xl bg-[#05060a] border border-[#00F0FF]/30 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 font-bold uppercase tracking-widest">
              SAMPLE CYBER BADGE // 100% REACTIVE
            </span>
            <span className="text-xs font-mono text-neutral-400">
              HEX: <span className="text-[#00F0FF] font-bold">{currentTheme.hex}</span>
            </span>
          </div>

          <h4 className="font-orbitron font-bold text-lg text-white uppercase tracking-wide">
            ARCHITECTING NEXT-GEN <span className="text-[#00F0FF]">DIGITAL ECOSYSTEMS</span>
          </h4>

          <p className="font-chakra text-xs text-neutral-300 leading-relaxed max-w-lg">
            High-converting mobile apps, autonomous AI tooling swarms, and pixel-precise design craft with sub-140ms performance benchmarks.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              className="px-5 py-2.5 rounded-lg bg-[#00F0FF] text-black font-chakra font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              Primary Action
            </button>
            <button
              type="button"
              className="px-5 py-2.5 rounded-lg bg-transparent text-white border border-[#00F0FF]/50 hover:bg-[#00F0FF]/10 font-chakra font-bold text-xs tracking-wider uppercase transition-colors"
            >
              Outline Button
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
