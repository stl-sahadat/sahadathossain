import React, { useState } from 'react';
import { Layers, Plus, Trash2, Check, RefreshCw, Sparkles, MoveRight } from 'lucide-react';

export function TabServices({
  services = [],
  processPhases = [],
  onRequestSave,
}) {
  const [serviceList, setServiceList] = useState(
    services.length
      ? JSON.parse(JSON.stringify(services))
      : [
          {
            id: 'mobile-apps',
            name: 'MOBILE & CROSS-PLATFORM APPS',
            title: 'MOBILE & CROSS-PLATFORM APPS',
            badge: '01',
            desc: 'Native-feel iOS & Android mobile applications engineered with fluid 60fps micro-interactions.',
            bullets: [
              'iOS & Android Cross-Platform Architecture',
              'Biometric Authentication & Deep Links',
              'Offline-First SQLite Synchronization',
              'Production App Store & Google Play Deployment',
            ],
          },
          {
            id: 'fullstack-saas',
            name: 'FULL-STACK WEB PLATFORMS & SAAS',
            title: 'FULL-STACK WEB PLATFORMS & SAAS',
            badge: '02',
            desc: 'Scalable cloud software, multi-tenant SaaS dashboards, and high-concurrency systems.',
            bullets: [
              'Next.js 15 App Router & React 19',
              'PostgreSQL Schema Tuning & Prisma ORM',
              'Multi-Tenant SaaS Dashboards (RBAC)',
              'Automated Stripe Billing & Subscriptions',
            ],
          },
        ]
  );

  const [phases, setPhases] = useState(
    processPhases.length
      ? JSON.parse(JSON.stringify(processPhases))
      : [
          {
            phase: '01',
            phaseLabel: 'PHASE 01 · GOALS & WIREFRAMING',
            title: 'DISCOVER',
            desc: 'Analyze your product goals, target audience, layout references, and conversion objectives before designing or coding.',
            subtext: 'Goal discovery & structural wireframes',
          },
          {
            phase: '02',
            phaseLabel: 'PHASE 02 · FIGMA UI/UX & PROTOTYPING',
            title: 'DESIGN',
            desc: 'Craft modern, high-fidelity UI/UX layouts in Figma using 1+ year of design craft, cohesive typography, and responsive design tokens.',
            subtext: 'Figma design system & interactive prototype',
          },
          {
            phase: '03',
            phaseLabel: 'PHASE 03 · FULL-STACK & AI VELOCITY',
            title: 'BUILD',
            desc: 'Translate approved designs into production-ready software, fluid micro-interactions, and scalable APIs with 10x AI execution velocity.',
            subtext: 'Production code & 10x velocity',
          },
          {
            phase: '04',
            phaseLabel: 'PHASE 04 · SPEED AUDIT & CLOUD DEPLOY',
            title: 'LAUNCH',
            desc: 'Benchmark 95+ PageSpeed scores, audit 100% mobile responsiveness, connect custom domains, and launch your live digital product.',
            subtext: '95+ PageSpeed audit & production launch',
          },
        ]
  );

  // Service Handlers
  const handleServiceChange = (index, field, value) => {
    setServiceList((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleBulletChange = (sIdx, bIdx, value) => {
    setServiceList((prev) => {
      const copy = [...prev];
      const bullets = [...(copy[sIdx].bullets || [])];
      bullets[bIdx] = value;
      copy[sIdx] = { ...copy[sIdx], bullets };
      return copy;
    });
  };

  const handleAddBullet = (sIdx) => {
    setServiceList((prev) => {
      const copy = [...prev];
      const bullets = [...(copy[sIdx].bullets || []), 'New feature bullet'];
      copy[sIdx] = { ...copy[sIdx], bullets };
      return copy;
    });
  };

  const handleRemoveBullet = (sIdx, bIdx) => {
    setServiceList((prev) => {
      const copy = [...prev];
      const bullets = copy[sIdx].bullets.filter((_, i) => i !== bIdx);
      copy[sIdx] = { ...copy[sIdx], bullets };
      return copy;
    });
  };

  // Phase Handlers
  const handlePhaseChange = (index, field, value) => {
    setPhases((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    onRequestSave('Services & Process Phases', {
      services: serviceList,
      processPhases: phases,
    });
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-8 animate-fadeIn">
      {/* Header with Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase block mb-1">
            SECTION CONFIGURATION // 04 & 05
          </span>
          <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
            SERVICES & DEVELOPMENT PROCESS
          </h2>
          <p className="font-chakra text-xs text-neutral-400 mt-1">
            Configure the 4 core architecture services and 4-phase agile engineering roadmap displayed on the Home Page.
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Save Services & Process</span>
        </button>
      </div>

      {/* Part 1: Process Phases (01-04) */}
      <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-6">
        <div className="flex items-center gap-2.5 text-[#00F0FF]">
          <MoveRight className="w-5 h-5" />
          <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
            4-PHASE AGILE ENGINEERING ROADMAP
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {phases.map((phase, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#05060a] border border-white/10 space-y-3 relative group hover:border-[#00F0FF]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-orbitron font-extrabold text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-1 rounded border border-[#00F0FF]/30">
                  PHASE {phase.phase || `0${idx + 1}`}
                </span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase">
                  STEP 0{idx + 1} OF 04
                </span>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
                  PHASE TITLE (DISCOVER, DESIGN, BUILD, LAUNCH)
                </label>
                <input
                  type="text"
                  value={phase.title}
                  onChange={(e) => handlePhaseChange(idx, 'title', e.target.value)}
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 focus:border-[#00F0FF] rounded text-xs font-bold font-orbitron text-white focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
                  LABEL HEADER
                </label>
                <input
                  type="text"
                  value={phase.phaseLabel}
                  onChange={(e) => handlePhaseChange(idx, 'phaseLabel', e.target.value)}
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 focus:border-[#00F0FF] rounded text-xs font-mono text-neutral-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  value={phase.desc}
                  onChange={(e) => handlePhaseChange(idx, 'desc', e.target.value)}
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 focus:border-[#00F0FF] rounded text-xs font-chakra text-white focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
                  SUBTEXT CHIP
                </label>
                <input
                  type="text"
                  value={phase.subtext}
                  onChange={(e) => handlePhaseChange(idx, 'subtext', e.target.value)}
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 focus:border-[#00F0FF] rounded text-xs font-chakra text-neutral-400 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Services (01-04) */}
      <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-6">
        <div className="flex items-center gap-2.5 text-[#00F0FF]">
          <Layers className="w-5 h-5" />
          <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
            SERVICES ARSENAL & CAPABILITIES (STICKY ACCORDION)
          </h3>
        </div>

        <div className="space-y-5">
          {serviceList.map((svc, sIdx) => (
            <div
              key={svc.id || sIdx}
              className="p-5 rounded-xl bg-[#05060a] border border-white/10 space-y-4 hover:border-[#00F0FF]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-mono font-bold flex items-center justify-center">
                    {svc.badge || `0${sIdx + 1}`}
                  </span>
                  <span className="font-orbitron font-bold text-sm text-white uppercase">
                    {svc.name || `Service 0${sIdx + 1}`}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
                    SERVICE TITLE
                  </label>
                  <input
                    type="text"
                    value={svc.name}
                    onChange={(e) => {
                      handleServiceChange(sIdx, 'name', e.target.value);
                      handleServiceChange(sIdx, 'title', e.target.value);
                    }}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 focus:border-[#00F0FF] rounded text-xs font-bold font-orbitron text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
                    BADGE NUMBER
                  </label>
                  <input
                    type="text"
                    value={svc.badge}
                    onChange={(e) => handleServiceChange(sIdx, 'badge', e.target.value)}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 focus:border-[#00F0FF] rounded text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  value={svc.desc}
                  onChange={(e) => handleServiceChange(sIdx, 'desc', e.target.value)}
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 focus:border-[#00F0FF] rounded text-xs font-chakra text-white focus:outline-none leading-relaxed"
                />
              </div>

              {/* Bullet Points */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                    KEY BULLET DELIVERABLES
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddBullet(sIdx)}
                    className="text-[10px] font-chakra text-[#00F0FF] hover:underline uppercase flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Bullet</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(svc.bullets || []).map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => handleBulletChange(sIdx, bIdx, e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-black/40 border border-white/10 focus:border-[#00F0FF] rounded text-xs font-chakra text-neutral-300 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(sIdx, bIdx)}
                        className="text-neutral-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
