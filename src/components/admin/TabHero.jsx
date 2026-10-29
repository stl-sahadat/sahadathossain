import React, { useState } from 'react';
import { User, Image as ImageIcon, Sparkles, Plus, Trash2, Check, RefreshCw, Upload } from 'lucide-react';

export function TabHero({ personalInfo = {}, heroWords = [], onRequestSave }) {
  const [formData, setFormData] = useState({
    name: personalInfo.name || '',
    shortName: personalInfo.shortName || '',
    brandName: personalInfo.brandName || '',
    logoText: personalInfo.logoText || '',
    title: personalInfo.title || '',
    badge: personalInfo.badge || '',
    heroHeading: personalInfo.heroHeading || '',
    heroBio: personalInfo.heroBio || '',
    heroStatus: personalInfo.heroStatus || '',
    ctaWorksText: personalInfo.ctaWorksText || 'VIEW SELECTED WORKS',
    ctaProcessText: personalInfo.ctaProcessText || 'EXPLORE PROCESS',
    ctaExploreAllProjectsText: personalInfo.ctaExploreAllProjectsText || 'EXPLORE ALL PROJECTS',
    experienceYears: personalInfo.experienceYears || '1+ year',
    experienceDesignYears: personalInfo.experienceDesignYears || '5+',
    experienceDesignLabel: personalInfo.experienceDesignLabel || 'YRS DESIGN',
    experienceDevYears: personalInfo.experienceDevYears || '1+',
    experienceDevLabel: personalInfo.experienceDevLabel || 'YR WEB DEV',
    experienceProjectsLabel: personalInfo.experienceProjectsLabel || 'PROJECTS',
    heroImage: personalInfo.heroImage || personalInfo.avatar || '/assets/img/sahadat-hero-transparent.png',
  });

  const [words, setWords] = useState(heroWords.length ? [...heroWords] : ['MOBILE APPS', 'SAAS PLATFORMS', 'E-COMMERCE', 'REVERSE', 'ENGINEERING']);
  const [newWord, setNewWord] = useState('');

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddWord = () => {
    if (newWord.trim()) {
      setWords((prev) => [...prev, newWord.trim().toUpperCase()]);
      setNewWord('');
    }
  };

  const handleRemoveWord = (index) => {
    setWords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: 'hero_photo', dataUrl }),
          });
          if (res.ok) {
            const upData = await res.json();
            if (upData.url) {
              handleChange('heroImage', upData.url);
              return;
            }
          }
        } catch (err) {}
        handleChange('heroImage', dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    onRequestSave('Hero & Profile', {
      personalInfo: {
        ...personalInfo,
        ...formData,
      },
      heroWords: words,
    });
  };

  return (
    <form onSubmit={handleSaveClick} className="space-y-8 animate-fadeIn">
      {/* Header with Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase block mb-1">
            SECTION CONFIGURATION // 02
          </span>
          <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
            HERO, IDENTITY & 3D AVATAR SYNC
          </h2>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Save Hero Changes</span>
        </button>
      </div>

      {/* 3D Hero Avatar Photo Synchronizer */}
      <div className="p-6 rounded-2xl bg-[#090b12] border border-[#00F0FF]/30 relative overflow-hidden">
        <div className="flex items-center gap-2.5 text-[#00F0FF] mb-2 font-orbitron font-bold text-sm uppercase tracking-wider">
          <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>HERO PHOTO & 3D HALFTONE MATRIX SYNC</span>
        </div>
        <p className="font-chakra text-xs text-neutral-300 leading-relaxed mb-6 max-w-2xl">
          Uploading or changing the photo below will instantly update the Home Page underlay image AND recompute the 3D Halftone Interactive Particle Matrix Canvas in real time!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Photo Preview Card */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div className="w-44 h-44 rounded-2xl border-2 border-[#00F0FF]/50 bg-black/60 p-2 relative overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.2)] flex items-center justify-center">
              <img
                src={formData.heroImage}
                alt="Sahadat Vai Hero Preview"
                className="w-full h-full object-contain object-bottom filter contrast-125"
                onError={(e) => {
                  e.currentTarget.src = '/assets/img/sahadat-hero-transparent.png';
                }}
              />
              <span className="absolute bottom-2 left-2 right-2 py-0.5 bg-black/80 backdrop-blur-md rounded text-[9px] font-mono text-center text-[#00F0FF] uppercase border border-[#00F0FF]/30">
                ⚡ 3D LIVE SYNCED
              </span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400 mt-2 uppercase">Current Hero Photo</span>
          </div>

          {/* Photo Controls */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
                IMAGE URL OR RELATIVE PATH
              </label>
              <input
                type="text"
                value={formData.heroImage}
                onChange={(e) => handleChange('heroImage', e.target.value)}
                placeholder="/assets/img/sahadat-hero-transparent.png"
                className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white placeholder-neutral-600 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
                OR UPLOAD NEW PHOTO FILE (JPG/PNG/WEBP)
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-chakra tracking-wider uppercase text-white cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-[#00F0FF]" />
                  <span>Choose Image File...</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => handleChange('heroImage', '/assets/img/sahadat-hero-transparent.png')}
                  className="px-3 py-2.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Text Content */}
      <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-6">
        <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
          PRIMARY HERO COPY & HEADLINES
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              FULL NAME
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              BRAND / LOGO NAME (STL)
            </label>
            <input
              type="text"
              value={formData.brandName}
              onChange={(e) => {
                handleChange('brandName', e.target.value);
                handleChange('logoText', e.target.value);
              }}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              HERO MAIN HEADING (H1 PREFIX)
            </label>
            <input
              type="text"
              value={formData.heroHeading}
              onChange={(e) => handleChange('heroHeading', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              TOP BADGE CHIP
            </label>
            <input
              type="text"
              value={formData.badge}
              onChange={(e) => handleChange('badge', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
            HERO BIO & VALUE PROPOSITION
          </label>
          <textarea
            rows={3}
            value={formData.heroBio}
            onChange={(e) => handleChange('heroBio', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none leading-relaxed font-chakra"
          />
        </div>

        {/* Buttons & Experience Text Settings */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
                PRIMARY CTA BUTTON LABEL
              </label>
              <input
                type="text"
                value={formData.ctaWorksText}
                onChange={(e) => handleChange('ctaWorksText', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-[#00F0FF] focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
                SECONDARY CTA BUTTON LABEL
              </label>
              <input
                type="text"
                value={formData.ctaProcessText}
                onChange={(e) => handleChange('ctaProcessText', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
                EXPLORE ALL PROJECTS BUTTON LABEL
              </label>
              <input
                type="text"
                value={formData.ctaExploreAllProjectsText}
                onChange={(e) => handleChange('ctaExploreAllProjectsText', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
                DESIGN EXPERIENCE (NUMBER + LABEL)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.experienceDesignYears}
                  onChange={(e) => handleChange('experienceDesignYears', e.target.value)}
                  placeholder="5+"
                  className="w-20 px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-[#00F0FF] focus:outline-none font-bold"
                />
                <input
                  type="text"
                  value={formData.experienceDesignLabel}
                  onChange={(e) => handleChange('experienceDesignLabel', e.target.value)}
                  placeholder="YRS DESIGN"
                  className="flex-1 px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
                DEV EXPERIENCE (NUMBER + LABEL)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.experienceDevYears}
                  onChange={(e) => handleChange('experienceDevYears', e.target.value)}
                  placeholder="1+"
                  className="w-20 px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-[#00F0FF] focus:outline-none font-bold"
                />
                <input
                  type="text"
                  value={formData.experienceDevLabel}
                  onChange={(e) => handleChange('experienceDevLabel', e.target.value)}
                  placeholder="YR WEB DEV"
                  className="flex-1 px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
                PROJECTS METRIC LABEL
              </label>
              <input
                type="text"
                value={formData.experienceProjectsLabel}
                onChange={(e) => handleChange('experienceProjectsLabel', e.target.value)}
                placeholder="PROJECTS"
                className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none font-bold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3D Rotating Prism Words */}
      <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
              3D ROTATING PRISM CUBE PHRASES
            </h3>
            <p className="font-chakra text-xs text-neutral-400">
              Words rotated continuously on the 4-sided 3D prism cube next to the hero heading.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {words.map((word, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-white text-xs font-orbitron font-bold"
            >
              <span>{word}</span>
              <button
                type="button"
                onClick={() => handleRemoveWord(idx)}
                className="text-neutral-400 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2 max-w-md">
          <input
            type="text"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            placeholder="Add new 3D rotating term..."
            className="flex-1 px-3.5 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none uppercase"
          />
          <button
            type="button"
            onClick={handleAddWord}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-[#00F0FF] hover:text-black text-white text-xs font-chakra font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </form>
  );
}
