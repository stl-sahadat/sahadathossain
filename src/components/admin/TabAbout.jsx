import React, { useState } from 'react';
import { BookOpen, Check, Upload, RefreshCw, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { resolveAssetUrl } from '../../lib/assetHelper';

export function TabAbout({
  personalInfo = {},
  corePillars = [],
  aboutCapabilities = [],
  atAGlance = [],
  onRequestSave,
}) {
  const [formData, setFormData] = useState({
    aboutRole: personalInfo.aboutRole || '',
    aboutStatus: personalInfo.aboutStatus || '',
    aboutBio: personalInfo.aboutBio || '',
    storyParagraph1: personalInfo.storyParagraph1 || '',
    storyParagraph2: personalInfo.storyParagraph2 || '',
    storyParagraph3: personalInfo.storyParagraph3 || '',
    focus: personalInfo.focus || 'Autonomous AI Agents · FastMCP · Full-Stack Web · Cloud Infra',
    tools: personalInfo.tools || 'Figma, Framer, GSAP, Spline, Three.js, React, Next.js, Node.js',
    signatureText: personalInfo.signatureText || personalInfo.name || 'MD. SAHADAT HOSSAIN',
    signatureSubtext: personalInfo.signatureSubtext || 'Engineered for bold, scalable software products.',
    portraitAbout: personalInfo.portraitAbout || '/assets/img/sahadat-about-new.jpg',
  });

  const [pillars, setPillars] = useState(
    corePillars.length
      ? [...corePillars]
      : [
          { label: 'CLARITY', desc: 'Clean abstractions and unambiguous system design' },
          { label: 'STRUCTURE', desc: 'Rigorous schema architecture and modular monoliths' },
          { label: 'PERFORMANCE', desc: 'Sub-200ms API response and high-throughput Redis queues' },
          { label: 'IMPACT', desc: 'Pixel-perfect interfaces delivering measurable business growth' },
        ]
  );

  const [capabilities, setCapabilities] = useState(
    aboutCapabilities.length
      ? [...aboutCapabilities]
      : [
          { number: '01', title: 'AUTONOMOUS AI AGENTS & MCP', desc: 'Multi-agent orchestration, FastMCP servers, CrewAI swarms, tool-calling & RAG knowledge retrieval.' },
          { number: '02', title: 'FULL-STACK WEB PLATFORMS', desc: 'High-performance Next.js 15, React 19, TypeScript, state management & fluid responsive interfaces.' },
          { number: '03', title: 'SCALABLE BACKEND & APIS', desc: 'Node.js microservices, WebSockets, Redis Pub/Sub, low-latency REST endpoints & message queues.' },
          { number: '04', title: 'DATABASE & CLOUD INFRA', desc: 'PostgreSQL schema tuning, Prisma ORM, MongoDB, Docker containerization & Linux VPS automation.' },
        ]
  );

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePillarChange = (index, field, value) => {
    setPillars((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleCapabilityChange = (index, field, value) => {
    setCapabilities((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
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
            body: JSON.stringify({ filename: 'about_portrait', dataUrl }),
          });
          if (res.ok) {
            const upData = await res.json();
            if (upData.url) {
              handleChange('portraitAbout', upData.url);
              return;
            }
          }
        } catch (err) {}
        handleChange('portraitAbout', dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    onRequestSave('About & Philosophy', {
      personalInfo: {
        ...personalInfo,
        ...formData,
      },
      corePillars: pillars,
      aboutCapabilities: capabilities,
    });
  };

  return (
    <form onSubmit={handleSaveClick} className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase block mb-1">
            SECTION CONFIGURATION // 03
          </span>
          <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
            ABOUT, STORY & PHILOSOPHY PILLARS
          </h2>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Save About Changes</span>
        </button>
      </div>

      {/* About Portrait Image Changer */}
      <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10">
        <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#00F0FF]" />
          <span>ABOUT PAGE PORTRAIT IMAGE</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 flex flex-col items-center">
            <div className="w-44 h-52 rounded-xl border border-white/20 bg-black/50 p-2 overflow-hidden shadow-lg flex items-center justify-center">
              <img
                src={resolveAssetUrl(formData.portraitAbout)}
                alt="About Portrait Preview"
                className="w-full h-full object-cover rounded-lg filter contrast-110"
                onError={(e) => {
                  e.currentTarget.src = resolveAssetUrl('/assets/img/sahadat-about-new.jpg');
                }}
              />
            </div>
            <span className="text-[10px] font-mono text-neutral-400 mt-2 uppercase">About Page Portrait</span>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
                IMAGE URL / RELATIVE PATH
              </label>
              <input
                type="text"
                value={formData.portraitAbout}
                onChange={(e) => handleChange('portraitAbout', e.target.value)}
                placeholder="/assets/img/sahadat-about-new.jpg"
                className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
                OR UPLOAD NEW ABOUT IMAGE
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
                  onClick={() => handleChange('portraitAbout', '/assets/img/sahadat-about-new.jpg')}
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

      {/* Narrative & Bio Texts */}
      <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-5">
        <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
          BIOGRAPHY & NARRATIVE STORY
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              ABOUT ROLE TITLE
            </label>
            <input
              type="text"
              value={formData.aboutRole}
              onChange={(e) => handleChange('aboutRole', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              STATUS TAG
            </label>
            <input
              type="text"
              value={formData.aboutStatus}
              onChange={(e) => handleChange('aboutStatus', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
            SHORT BIO SUMMARY
          </label>
          <textarea
            rows={2}
            value={formData.aboutBio}
            onChange={(e) => handleChange('aboutBio', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-chakra"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
            STORY PARAGRAPH 01 (ORIGIN & EVOLUTION)
          </label>
          <textarea
            rows={3}
            value={formData.storyParagraph1}
            onChange={(e) => handleChange('storyParagraph1', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none leading-relaxed font-chakra"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
            STORY PARAGRAPH 02 (THE AI FORCE MULTIPLIER)
          </label>
          <textarea
            rows={3}
            value={formData.storyParagraph2}
            onChange={(e) => handleChange('storyParagraph2', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none leading-relaxed font-chakra"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
            STORY PARAGRAPH 03 (CLARITY, STRUCTURE & CRAFT)
          </label>
          <textarea
            rows={3}
            value={formData.storyParagraph3}
            onChange={(e) => handleChange('storyParagraph3', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none leading-relaxed font-chakra"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              PRIMARY FOCUS (HUD & ABOUT CARD)
            </label>
            <input
              type="text"
              value={formData.focus}
              onChange={(e) => handleChange('focus', e.target.value)}
              placeholder="Autonomous AI Agents · FastMCP · Full-Stack Web"
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              CORE TOOLS LIST (COMMA-SEPARATED)
            </label>
            <input
              type="text"
              value={formData.tools}
              onChange={(e) => handleChange('tools', e.target.value)}
              placeholder="Figma, Framer, React, Next.js, Node.js"
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              SIGNATURE NAME (ABOUT CARD BOTTOM)
            </label>
            <input
              type="text"
              value={formData.signatureText}
              onChange={(e) => handleChange('signatureText', e.target.value)}
              placeholder="MD. SAHADAT HOSSAIN"
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none uppercase font-orbitron"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              SIGNATURE SUBTEXT (ABOUT CARD BOTTOM)
            </label>
            <input
              type="text"
              value={formData.signatureSubtext}
              onChange={(e) => handleChange('signatureSubtext', e.target.value)}
              placeholder="Engineered for bold, scalable software products."
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-chakra"
            />
          </div>
        </div>
      </div>

      {/* Core Philosophy Pillars (4 items) */}
      <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-4">
        <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
          CORE PHILOSOPHY PILLARS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#05060a] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-[#00F0FF] uppercase font-bold">
                PILLAR 0{idx + 1}
              </span>
              <input
                type="text"
                value={pillar.label}
                onChange={(e) => handlePillarChange(idx, 'label', e.target.value)}
                placeholder="Pillar Label"
                className="w-full px-2.5 py-1.5 bg-black/40 border border-white/10 focus:border-[#00F0FF] rounded text-xs font-bold text-white uppercase focus:outline-none font-orbitron"
              />
              <textarea
                rows={2}
                value={pillar.desc}
                onChange={(e) => handlePillarChange(idx, 'desc', e.target.value)}
                placeholder="Pillar Description"
                className="w-full px-2.5 py-1.5 bg-black/40 border border-white/10 focus:border-[#00F0FF] rounded text-xs text-neutral-300 focus:outline-none font-chakra"
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
