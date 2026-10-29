import React, { useState } from 'react';
import {
  MessageSquare,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Upload,
  Star,
  ArrowUp,
  ArrowDown,
  ShieldCheck,
} from 'lucide-react';
import { resolveAssetUrl } from '../../lib/assetHelper';

export function TabReviews({ testimonials = [], onRequestSave }) {
  const [reviewsList, setReviewsList] = useState(
    testimonials.length ? JSON.parse(JSON.stringify(testimonials)) : []
  );
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentReview, setCurrentReview] = useState({
    id: '',
    name: '',
    role: 'Founder & CEO',
    company: '',
    avatar: '/assets/img/sahadat-avatar.jpg',
    quote: '',
    rating: 5,
    project: 'Full-Stack SaaS Platform',
    verified: true,
  });

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setCurrentReview({
      id: 'rev-' + Date.now(),
      name: '',
      role: 'Founder / Client',
      company: '',
      avatar: '/assets/img/sahadat-avatar.jpg',
      quote: '',
      rating: 5,
      project: 'Custom Web Application',
      verified: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (index) => {
    setEditingIndex(index);
    setCurrentReview({ ...reviewsList[index] });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    let updated;
    if (editingIndex !== null) {
      updated = [...reviewsList];
      updated[editingIndex] = currentReview;
    } else {
      updated = [currentReview, ...reviewsList];
    }
    setReviewsList(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    if (window.confirm('Delete this client review?')) {
      setReviewsList(reviewsList.filter((_, i) => i !== index));
    }
  };

  const handleMove = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= reviewsList.length) return;
    const copy = [...reviewsList];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    setReviewsList(copy);
  };

  const handleAvatarFileUpload = (e) => {
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
            body: JSON.stringify({ filename: 'client_avatar', dataUrl }),
          });
          if (res.ok) {
            const upData = await res.json();
            if (upData.url) {
              setCurrentReview((prev) => ({ ...prev, avatar: upData.url }));
              return;
            }
          }
        } catch (err) {}
        setCurrentReview((prev) => ({ ...prev, avatar: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCommitAll = () => {
    onRequestSave('Client Reviews & Testimonials', {
      testimonials: reviewsList,
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase block mb-1">
            SECTION CONFIGURATION // 07
          </span>
          <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
            CLIENT REVIEWS & TESTIMONIALS ({reviewsList.length})
          </h2>
          <p className="font-chakra text-xs text-neutral-400 mt-1">
            Add and manage verified client endorsements, company names, feedback quotes, and avatars.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-chakra font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#00F0FF]" />
            <span>Add Review</span>
          </button>

          <button
            type="button"
            onClick={handleCommitAll}
            className="px-6 py-2 rounded-lg bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Save All Reviews</span>
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {reviewsList.length === 0 ? (
          <div className="p-8 rounded-xl bg-[#090b12] border border-dashed border-white/10 text-center">
            <p className="text-neutral-400 font-chakra text-xs">
              No client reviews added yet. Click "Add Review" above to publish your first client feedback.
            </p>
          </div>
        ) : (
          reviewsList.map((rev, idx) => (
            <div
              key={rev.id || idx}
              className="p-4 sm:p-5 rounded-xl bg-[#090b12] border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full border border-white/15 bg-black/60 overflow-hidden flex-shrink-0">
                  <img
                    src={resolveAssetUrl(rev.avatar)}
                    alt={rev.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = resolveAssetUrl('/assets/img/sahadat-avatar.jpg');
                    }}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-orbitron font-bold text-sm text-white group-hover:text-[#00F0FF] transition-colors">
                      {rev.name}
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-400">
                      // {rev.role} {rev.company && `at ${rev.company}`}
                    </span>
                    <div className="flex items-center text-[#FFD700] ml-1">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="font-chakra text-xs text-neutral-300 italic line-clamp-2">
                    "{rev.quote}"
                  </p>
                  {rev.project && (
                    <span className="text-[10px] font-mono text-[#00F0FF]/80 mt-1 inline-block">
                      Project: {rev.project}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 self-end sm:self-center">
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
                  disabled={idx === reviewsList.length - 1}
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
          ))
        )}
      </div>

      {/* Add / Edit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#090b12] border border-[#00F0FF]/40 rounded-xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
              <h3 className="font-orbitron font-bold text-base text-white uppercase tracking-wider">
                {editingIndex !== null ? 'EDIT CLIENT REVIEW' : 'ADD CLIENT REVIEW'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    CLIENT NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={currentReview.name}
                    onChange={(e) => setCurrentReview({ ...currentReview, name: e.target.value })}
                    placeholder="e.g. Johnathan Vance"
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    COMPANY / ORGANIZATION
                  </label>
                  <input
                    type="text"
                    value={currentReview.company}
                    onChange={(e) => setCurrentReview({ ...currentReview, company: e.target.value })}
                    placeholder="e.g. NexusAI Studio"
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    ROLE / DESIGNATION
                  </label>
                  <input
                    type="text"
                    value={currentReview.role}
                    onChange={(e) => setCurrentReview({ ...currentReview, role: e.target.value })}
                    placeholder="e.g. Founder & CTO"
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                    STAR RATING
                  </label>
                  <select
                    value={currentReview.rating}
                    onChange={(e) => setCurrentReview({ ...currentReview, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
                  >
                    <option value={5}>5 Stars (★★★★★)</option>
                    <option value={4}>4 Stars (★★★★☆)</option>
                    <option value={3}>3 Stars (★★★☆☆)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                  DELIVERED PROJECT CONTEXT
                </label>
                <input
                  type="text"
                  value={currentReview.project}
                  onChange={(e) => setCurrentReview({ ...currentReview, project: e.target.value })}
                  placeholder="e.g. Next.js 15 High-Speed SaaS"
                  className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                  CLIENT QUOTE / TESTIMONIAL *
                </label>
                <textarea
                  rows={3}
                  required
                  value={currentReview.quote}
                  onChange={(e) => setCurrentReview({ ...currentReview, quote: e.target.value })}
                  placeholder="The verbatim endorsement from the client..."
                  className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-chakra leading-relaxed"
                />
              </div>

              {/* Avatar Upload */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                  CLIENT AVATAR PHOTO
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={currentReview.avatar}
                    onChange={(e) => setCurrentReview({ ...currentReview, avatar: e.target.value })}
                    placeholder="/assets/img/sahadat-avatar.jpg"
                    className="flex-1 px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-mono"
                  />
                  <label className="px-3 py-2 rounded bg-white/10 hover:bg-white/20 text-xs font-mono text-white cursor-pointer flex items-center gap-1.5 flex-shrink-0">
                    <Upload className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>Upload...</span>
                    <input type="file" accept="image/*" onChange={handleAvatarFileUpload} className="hidden" />
                  </label>
                </div>
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
                  className="px-5 py-2 rounded-lg bg-[#00F0FF] text-black font-chakra font-bold text-xs uppercase"
                >
                  {editingIndex !== null ? 'Save Changes' : 'Add Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
