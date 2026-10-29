import React, { useState } from 'react';
import { Milestone, Plus, Trash2, Edit2, Check, X, ArrowUp, ArrowDown } from 'lucide-react';

export function TabTimeline({ timeline = [], onRequestSave }) {
  const [milestones, setMilestones] = useState(
    timeline.length ? JSON.parse(JSON.stringify(timeline)) : []
  );
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentMilestone, setCurrentMilestone] = useState({
    year: '2024',
    title: '',
    desc: '',
    badge: 'FOUNDATION',
  });

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setCurrentMilestone({
      year: '2024',
      title: '',
      desc: '',
      badge: 'EXPERIENCE',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (index) => {
    setEditingIndex(index);
    setCurrentMilestone({ ...milestones[index] });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    let updated;
    if (editingIndex !== null) {
      updated = [...milestones];
      updated[editingIndex] = currentMilestone;
    } else {
      updated = [...milestones, currentMilestone];
    }
    setMilestones(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    if (window.confirm('Delete this timeline milestone?')) {
      setMilestones(milestones.filter((_, i) => i !== index));
    }
  };

  const handleMove = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= milestones.length) return;
    const copy = [...milestones];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    setMilestones(copy);
  };

  const handleCommitAll = () => {
    onRequestSave('Experience & Timeline', {
      timeline: milestones,
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase block mb-1">
            SECTION CONFIGURATION // 09
          </span>
          <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
            EXPERIENCE & TIMELINE MILESTONES ({milestones.length})
          </h2>
          <p className="font-chakra text-xs text-neutral-400 mt-1">
            Manage your career milestones, 2024 architecture records, and tech evolution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-chakra font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#00F0FF]" />
            <span>Add Milestone</span>
          </button>

          <button
            type="button"
            onClick={handleCommitAll}
            className="px-6 py-2 rounded-lg bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Save All Milestones</span>
          </button>
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-3">
        {milestones.map((m, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-xl bg-[#090b12] border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 group"
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="px-3 py-1 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] font-orbitron font-bold text-sm tracking-wider flex-shrink-0">
                {m.year}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-orbitron font-bold text-sm text-white group-hover:text-[#00F0FF] transition-colors">
                    {m.title}
                  </h3>
                  {m.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400 uppercase">
                      {m.badge}
                    </span>
                  )}
                </div>
                <p className="font-chakra text-xs text-neutral-300 leading-relaxed font-normal">
                  {m.desc}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 self-end sm:self-center flex-shrink-0">
              <button
                type="button"
                onClick={() => handleMove(idx, -1)}
                disabled={idx === 0}
                className="p-2 rounded bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleMove(idx, 1)}
                disabled={idx === milestones.length - 1}
                className="p-2 rounded bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleOpenEdit(idx)}
                className="p-2 rounded bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/30 transition-colors flex items-center gap-1 text-xs font-mono"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Edit</span>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(idx)}
                className="p-2 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#090b12] border border-[#00F0FF]/40 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
                {editingIndex !== null ? 'EDIT TIMELINE MILESTONE' : 'ADD TIMELINE MILESTONE'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    YEAR / RANGE *
                  </label>
                  <input
                    type="text"
                    required
                    value={currentMilestone.year}
                    onChange={(e) => setCurrentMilestone({ ...currentMilestone, year: e.target.value })}
                    placeholder="e.g. 2024 or 2024 - 2025"
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-orbitron font-bold text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    BADGE TAG
                  </label>
                  <input
                    type="text"
                    value={currentMilestone.badge}
                    onChange={(e) => setCurrentMilestone({ ...currentMilestone, badge: e.target.value })}
                    placeholder="e.g. FOUNDATION or AI VELOCITY"
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono uppercase text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                  TITLE / FOCUS *
                </label>
                <input
                  type="text"
                  required
                  value={currentMilestone.title}
                  onChange={(e) => setCurrentMilestone({ ...currentMilestone, title: e.target.value })}
                  placeholder="e.g. Scalable Backends, APIs & Database Schemas"
                  className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-chakra font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                  DESCRIPTION *
                </label>
                <textarea
                  rows={4}
                  required
                  value={currentMilestone.desc}
                  onChange={(e) => setCurrentMilestone({ ...currentMilestone, desc: e.target.value })}
                  placeholder="Details of architectures, frameworks, and milestones achieved..."
                  className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-chakra leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-white/20 text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#00F0FF] text-black font-chakra font-bold text-xs uppercase"
                >
                  {editingIndex !== null ? 'Save Changes' : 'Add Milestone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
