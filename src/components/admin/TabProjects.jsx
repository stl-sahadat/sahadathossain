import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Check,
  X,
  Upload,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Lock,
  Star,
  AlertCircle,
  CheckCircle2,
  Layers,
  HelpCircle,
} from 'lucide-react';

export function TabProjects({ projects = [], onRequestSave }) {
  const [projectList, setProjectList] = useState(projects.length ? [...projects] : []);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [limitWarning, setLimitWarning] = useState(null);

  // Keep projectList in sync if parent projects change
  useEffect(() => {
    if (projects && projects.length) {
      setProjectList(projects);
    }
  }, [projects]);

  // Form State for Add / Edit Modal
  const [currentProject, setCurrentProject] = useState({
    id: '',
    title: '',
    category: 'Full-Stack Web / SaaS',
    categoryFilter: 'websites',
    filters: ['websites'],
    tagline: '',
    domain: 'PROJECT.STL',
    desc: '',
    howItWasBuilt: '',
    tech: ['React.js', 'Node.js', 'Tailwind CSS'],
    techInput: 'React.js, Node.js, Tailwind CSS',
    img: '/assets/img/projects/portfolio-villa-live.png',
    liveUrl: 'https://',
    githubUrl: 'https://github.com/stl-sahadat/',
    featured: false,
    isPrivate: false,
    stats: { latency: '<140ms', stack: 'Full-Stack' },
  });

  // Calculate currently featured projects for Home Page showcase (strictly max 6)
  const featuredProjects = projectList.filter((p) => p.featured);

  // 1-Click Toggle for Home Page (Strictly Max 6 Projects)
  const handleToggleHomeFeatured = (index) => {
    const p = projectList[index];
    const currentlyFeaturedCount = projectList.filter((item) => item.featured).length;

    if (!p.featured && currentlyFeaturedCount >= 6) {
      setLimitWarning(
        'হোমপেজে সর্বোচ্চ ৬টি প্রজেক্ট রাখা যাবে। ইতিমধ্যে ৬টি প্রজেক্ট সিলেক্ট করা আছে। নতুন প্রজেক্ট অ্যাড করতে উপরের স্লট থেকে যেকোনো ১টি প্রজেক্ট "✕ Remove" করুন অথবা নিচের লিস্ট থেকে আনচেক করুন।'
      );
      setTimeout(() => setLimitWarning(null), 8000);
      return;
    }

    setLimitWarning(null);
    const updated = [...projectList];
    updated[index] = {
      ...p,
      featured: !p.featured,
    };
    setProjectList(updated);
  };

  // 1-Click Remove from Top Showcase Slot
  const handleRemoveFeaturedById = (id) => {
    const updated = projectList.map((item) =>
      item.id === id ? { ...item, featured: false } : item
    );
    setProjectList(updated);
    setLimitWarning(null);
  };

  const handleOpenAddModal = () => {
    setEditingIndex(null);
    const currentlyFeaturedCount = projectList.filter((item) => item.featured).length;
    setCurrentProject({
      id: 'proj-' + Date.now(),
      title: '',
      category: 'Full-Stack Web / SaaS',
      categoryFilter: 'websites',
      filters: ['websites'],
      tagline: '',
      domain: 'APP.STL',
      desc: '',
      howItWasBuilt: '',
      tech: ['React.js', 'Tailwind CSS'],
      techInput: 'React.js, Tailwind CSS',
      img: '/assets/img/projects/portfolio-villa-live.png',
      liveUrl: 'https://',
      githubUrl: 'https://github.com/stl-sahadat/',
      featured: currentlyFeaturedCount < 6, // default to true only if slots available
      isPrivate: false,
      stats: { stack: 'Next.js 15' },
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (index) => {
    setEditingIndex(index);
    const p = projectList[index];
    setCurrentProject({
      ...p,
      techInput: Array.isArray(p.tech) ? p.tech.join(', ') : '',
    });
    setIsModalOpen(true);
  };

  const handleSaveModalProject = (e) => {
    e.preventDefault();

    const techArray = currentProject.techInput
      ? currentProject.techInput.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const finalizedProject = {
      ...currentProject,
      tech: techArray,
      filters: [currentProject.categoryFilter || 'websites'],
    };

    let updatedList;
    if (editingIndex !== null) {
      updatedList = [...projectList];
      updatedList[editingIndex] = finalizedProject;
    } else {
      updatedList = [finalizedProject, ...projectList];
    }

    setProjectList(updatedList);
    setIsModalOpen(false);
  };

  const handleDeleteProject = (index) => {
    if (window.confirm('Delete this project from your portfolio?')) {
      const updated = projectList.filter((_, i) => i !== index);
      setProjectList(updated);
    }
  };

  const handleMove = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= projectList.length) return;
    const copy = [...projectList];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    setProjectList(copy);
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
            body: JSON.stringify({ filename: 'project_thumb', dataUrl }),
          });
          if (res.ok) {
            const upData = await res.json();
            if (upData.url) {
              setCurrentProject((prev) => ({ ...prev, img: upData.url }));
              return;
            }
          }
        } catch (err) {}
        setCurrentProject((prev) => ({ ...prev, img: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCommitAll = () => {
    onRequestSave('Works & Projects', {
      projects: projectList,
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase block mb-1">
            SECTION CONFIGURATION // 04
          </span>
          <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
            WORKS & PROJECTS ARCHIVE ({projectList.length})
          </h2>
          <p className="text-xs text-neutral-400 font-chakra mt-0.5">
            Manage all portfolio projects and select exactly 6 featured projects for your Home Page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-chakra font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#00F0FF]" />
            <span>Add New Project</span>
          </button>

          <button
            type="button"
            onClick={handleCommitAll}
            className="px-6 py-2 rounded-lg bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Save All Projects</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          HOMEPAGE 6-PROJECT SHOWCASE SELECTOR (CYBER SLOTS)
          Allows Sahadat vai to clearly see and pick exactly 6 projects
          ======================================================== */}
      <div className="p-5 rounded-2xl bg-[#090d16] border border-[#00F0FF]/30 shadow-[0_0_25px_rgba(0,240,255,0.06)] relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00F0FF]/15 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <Star className="w-4 h-4 fill-[#00F0FF]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="font-orbitron font-bold text-sm sm:text-base text-white tracking-wide">
                  HOMEPAGE SHOWCASE SELECTOR
                </h3>
                <span
                  className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold uppercase tracking-wider ${
                    featuredProjects.length === 6
                      ? 'bg-[#00F0FF]/20 text-[#00F0FF] border-[#00F0FF]/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                      : 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                  }`}
                >
                  {featuredProjects.length} / 6 SLOTS SELECTED
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-chakra mt-1">
                হোমপেজে শুধুমাত্র নিচের এই ৬টি প্রজেক্ট ডিসপ্লে হবে। বাকি সমস্ত প্রজেক্ট <span className="text-[#00F0FF]">/works</span> পেজে ক্যাটাগরি ফিল্টারসহ সংরক্ষিত থাকবে।
              </p>
            </div>
          </div>
        </div>

        {/* Warning Notification if Exceeded */}
        {limitWarning && (
          <div className="mb-4 p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="font-chakra leading-relaxed">{limitWarning}</span>
            </div>
            <button
              onClick={() => setLimitWarning(null)}
              className="text-amber-400 hover:text-white text-xs px-2 py-1 rounded bg-black/40"
            >
              ✕
            </button>
          </div>
        )}

        {/* 6 Visual Slots */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, slotIdx) => {
            const proj = featuredProjects[slotIdx];
            return proj ? (
              <div
                key={proj.id || slotIdx}
                className="relative rounded-xl bg-[#05070d] border border-[#00F0FF]/40 hover:border-[#00F0FF] p-2.5 flex flex-col justify-between group transition-all shadow-[0_0_15px_rgba(0,240,255,0.05)] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono text-[#00F0FF] font-bold px-1.5 py-0.5 rounded bg-[#00F0FF]/10">
                      SLOT #{slotIdx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeaturedById(proj.id)}
                      className="w-4 h-4 rounded-full bg-white/10 hover:bg-red-500 text-neutral-400 hover:text-white flex items-center justify-center text-[10px] transition-colors cursor-pointer"
                      title="Remove from Homepage slot"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="w-full aspect-[16/10] rounded-md overflow-hidden bg-black/60 border border-white/10 mb-2">
                    <img
                      src={proj.img}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '/assets/img/projects/portfolio-villa-live.png';
                      }}
                    />
                  </div>
                  <h4 className="font-orbitron font-bold text-[11px] text-white line-clamp-1 group-hover:text-[#00F0FF] transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-[9px] font-mono text-neutral-400 line-clamp-1 mt-0.5 uppercase">
                    {proj.category}
                  </p>
                </div>
              </div>
            ) : (
              <div
                key={slotIdx}
                className="rounded-xl border border-dashed border-white/20 bg-white/[0.02] hover:bg-white/[0.04] p-3 flex flex-col items-center justify-center text-center aspect-[16/14] transition-colors"
              >
                <span className="text-[9px] font-mono text-neutral-500 uppercase block mb-1">
                  SLOT #{slotIdx + 1}
                </span>
                <span className="text-[11px] font-chakra text-neutral-400 font-bold">
                  + EMPTY SLOT
                </span>
                <span className="text-[9px] font-mono text-neutral-500 mt-1">
                  নিচ থেকে ADD করুন
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Projects List Header */}
      <div className="flex items-center justify-between pt-2">
        <h3 className="font-orbitron font-bold text-xs sm:text-sm text-neutral-300 uppercase tracking-wider flex items-center gap-2">
          <span>ALL REPOSITORY PROJECTS ({projectList.length})</span>
          <span className="text-[10px] font-mono text-neutral-500 lowercase">
            — click 'SHOW ON HOME' to toggle slot
          </span>
        </h3>
      </div>

      {/* Projects List Rows */}
      <div className="space-y-3">
        {projectList.map((project, idx) => {
          const featuredSlotNumber = project.featured
            ? featuredProjects.findIndex((p) => p.id === project.id) + 1
            : null;

          return (
            <div
              key={project.id || idx}
              className={`p-4 sm:p-5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${
                project.featured
                  ? 'bg-[#080d16] border-[#00F0FF]/35 hover:border-[#00F0FF]/60 shadow-[0_0_15px_rgba(0,240,255,0.04)]'
                  : 'bg-[#090b12] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-14 rounded-lg bg-black/60 border border-white/15 overflow-hidden flex-shrink-0 relative">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/img/projects/portfolio-villa-live.png';
                    }}
                  />
                  {project.featured && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-orbitron font-bold text-sm text-white group-hover:text-[#00F0FF] transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400 uppercase">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 uppercase font-bold flex items-center gap-1 shadow-[0_0_8px_rgba(0,240,255,0.25)]">
                        <Star className="w-2.5 h-2.5 fill-[#00F0FF]" />
                        <span>HOME SLOT #{featuredSlotNumber}</span>
                      </span>
                    )}
                  </div>
                  <p className="font-chakra text-xs text-neutral-400 line-clamp-1">
                    {project.tagline || project.desc}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-[11px] font-mono text-neutral-500 flex-wrap">
                    {project.liveUrl && (
                      <span className="text-[#00F0FF]/80 flex items-center gap-1">
                        <span>Live: {project.domain || 'Link'}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                    )}
                    {project.tech && project.tech.length > 0 && (
                      <span>• {project.tech.slice(0, 3).join(', ')}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions & 1-Click Home Toggle */}
              <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
                {/* 1-Click Home Feature Toggle Button */}
                <button
                  type="button"
                  onClick={() => handleToggleHomeFeatured(idx)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    project.featured
                      ? 'bg-[#00F0FF]/15 border border-[#00F0FF] text-[#00F0FF] hover:bg-red-500/15 hover:border-red-500/40 hover:text-red-300 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                      : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-[#00F0FF] hover:border-[#00F0FF]/50'
                  }`}
                  title={project.featured ? 'Click to remove from Home page' : 'Click to feature on Home page (max 6)'}
                >
                  <Star className={`w-3.5 h-3.5 ${project.featured ? 'fill-[#00F0FF]' : ''}`} />
                  <span className="font-bold tracking-wider">
                    {project.featured ? 'HOME: ACTIVE' : 'SHOW ON HOME'}
                  </span>
                </button>

                <div className="flex items-center gap-1 bg-white/[0.03] p-1 rounded-lg border border-white/10">
                  <button
                    type="button"
                    onClick={() => handleMove(idx, -1)}
                    disabled={idx === 0}
                    className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(idx, 1)}
                    disabled={idx === projectList.length - 1}
                    className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenEditModal(idx)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/30 transition-colors flex items-center gap-1 text-xs font-mono"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteProject(idx)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Save Bar */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/10 mt-6">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
          <span>Homepage displays the 6 featured projects. Full repository has {projectList.length} projects.</span>
        </div>
        <button
          type="button"
          onClick={handleCommitAll}
          className="px-6 py-2.5 rounded-lg bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Save Works & Archives</span>
        </button>
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#090b12] border border-[#00F0FF]/40 rounded-xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <h3 className="font-orbitron font-bold text-lg text-white uppercase tracking-wider">
                {editingIndex !== null ? 'EDIT PORTFOLIO PROJECT' : 'ADD NEW PORTFOLIO PROJECT'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModalProject} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    PROJECT TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={currentProject.title}
                    onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                    placeholder="e.g. 3D Cyber Villa Portfolio"
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    DOMAIN LABEL
                  </label>
                  <input
                    type="text"
                    value={currentProject.domain}
                    onChange={(e) => setCurrentProject({ ...currentProject, domain: e.target.value })}
                    placeholder="e.g. VILLA-3D.STL"
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none uppercase font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    CATEGORY DISPLAY LABEL
                  </label>
                  <input
                    type="text"
                    value={currentProject.category}
                    onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                    placeholder="e.g. 3D WebGL Portfolio"
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    CATEGORY FILTER TAB
                  </label>
                  <select
                    value={currentProject.categoryFilter}
                    onChange={(e) => setCurrentProject({ ...currentProject, categoryFilter: e.target.value })}
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
                  >
                    <option value="portfolios">Portfolios (3D / Interactive)</option>
                    <option value="websites">Websites & E-Commerce</option>
                    <option value="automations">Automations & Bots</option>
                    <option value="mobile">Mobile Apps (iOS & Android)</option>
                    <option value="saas">SaaS Platforms & Systems</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                  TAGLINE / SHORT SUBTITLE
                </label>
                <input
                  type="text"
                  value={currentProject.tagline}
                  onChange={(e) => setCurrentProject({ ...currentProject, tagline: e.target.value })}
                  placeholder="e.g. Immersive 3D Architectural Villa & Interactive Visuals"
                  className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  value={currentProject.desc}
                  onChange={(e) => setCurrentProject({ ...currentProject, desc: e.target.value })}
                  placeholder="Overview of the product and business impact..."
                  className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none leading-relaxed font-chakra"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                  HOW IT WAS BUILT (MODAL BREAKDOWN)
                </label>
                <textarea
                  rows={3}
                  value={currentProject.howItWasBuilt}
                  onChange={(e) => setCurrentProject({ ...currentProject, howItWasBuilt: e.target.value })}
                  placeholder="Architecture details, shaders, state management, latency benchmarks..."
                  className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none leading-relaxed font-chakra"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    LIVE URL
                  </label>
                  <input
                    type="url"
                    value={currentProject.liveUrl}
                    onChange={(e) => setCurrentProject({ ...currentProject, liveUrl: e.target.value })}
                    placeholder="https://stl-sahadat.github.io/..."
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    GITHUB REPO URL
                  </label>
                  <input
                    type="url"
                    value={currentProject.githubUrl}
                    onChange={(e) => setCurrentProject({ ...currentProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/stl-sahadat/..."
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                  TECH STACK (COMMA-SEPARATED)
                </label>
                <input
                  type="text"
                  value={currentProject.techInput}
                  onChange={(e) => setCurrentProject({ ...currentProject, techInput: e.target.value })}
                  placeholder="React.js, Three.js, Tailwind CSS, Vite"
                  className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-mono"
                />
              </div>

              {/* Thumbnail Image */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                  THUMBNAIL IMAGE URL OR UPLOAD
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={currentProject.img}
                    onChange={(e) => setCurrentProject({ ...currentProject, img: e.target.value })}
                    placeholder="/assets/img/projects/..."
                    className="flex-1 px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-mono"
                  />
                  <label className="px-3 py-2 rounded bg-white/10 hover:bg-white/20 text-xs font-mono text-white cursor-pointer flex items-center gap-1.5 flex-shrink-0">
                    <Upload className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>Upload...</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={currentProject.featured}
                    onChange={(e) => {
                      const willBeChecked = e.target.checked;
                      const currentFeaturedCount = projectList.filter((item, i) =>
                        i !== editingIndex && item.featured
                      ).length;
                      if (willBeChecked && currentFeaturedCount >= 6) {
                        alert('হোমপেজে সর্বোচ্চ ৬টি প্রজেক্ট রাখা যাবে। ইতিমধ্যে ৬টি সিলেক্ট করা আছে। অনুগ্রহ করে আগে অন্য একটি প্রজেক্ট আনচেক করুন।');
                        return;
                      }
                      setCurrentProject({ ...currentProject, featured: willBeChecked });
                    }}
                    className="w-4 h-4 rounded accent-[#00F0FF]"
                  />
                  <span className="text-xs font-mono text-neutral-300 uppercase flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>Feature on Home Page (Max 6)</span>
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={currentProject.isPrivate}
                    onChange={(e) => setCurrentProject({ ...currentProject, isPrivate: e.target.checked })}
                    className="w-4 h-4 rounded accent-[#00F0FF]"
                  />
                  <span className="text-xs font-mono text-neutral-300 uppercase">
                    Private Repo Badge
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-white/20 text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#00F0FF] text-black font-chakra font-bold text-xs uppercase cursor-pointer"
                >
                  {editingIndex !== null ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
