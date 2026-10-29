import React, { useState } from 'react';
import { HelpCircle, Plus, Trash2, Edit2, Check, X, ArrowUp, ArrowDown } from 'lucide-react';

export function TabFaqs({ faqs = [], onRequestSave }) {
  const [faqList, setFaqList] = useState(faqs.length ? JSON.parse(JSON.stringify(faqs)) : []);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentFaq, setCurrentFaq] = useState({
    q: '',
    a: '',
  });

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setCurrentFaq({ q: '', a: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (index) => {
    setEditingIndex(index);
    setCurrentFaq({ ...faqList[index] });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    let updated;
    if (editingIndex !== null) {
      updated = [...faqList];
      updated[editingIndex] = currentFaq;
    } else {
      updated = [...faqList, currentFaq];
    }
    setFaqList(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    if (window.confirm('Delete this FAQ entry?')) {
      setFaqList(faqList.filter((_, i) => i !== index));
    }
  };

  const handleMove = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= faqList.length) return;
    const copy = [...faqList];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    setFaqList(copy);
  };

  const handleCommitAll = () => {
    onRequestSave('FAQ Management', {
      faqs: faqList,
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase block mb-1">
            SECTION CONFIGURATION // 08
          </span>
          <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
            FREQUENTLY ASKED QUESTIONS ({faqList.length})
          </h2>
          <p className="font-chakra text-xs text-neutral-400 mt-1">
            Edit question and answer pairs displayed on the Home and FAQ sections.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-chakra font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#00F0FF]" />
            <span>Add FAQ</span>
          </button>

          <button
            type="button"
            onClick={handleCommitAll}
            className="px-6 py-2 rounded-lg bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Save All FAQs</span>
          </button>
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {faqList.map((faq, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-xl bg-[#090b12] border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 group"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#00F0FF] font-bold">
                  0{idx + 1}.
                </span>
                <h3 className="font-orbitron font-bold text-xs sm:text-sm text-white group-hover:text-[#00F0FF] transition-colors uppercase">
                  {faq.q}
                </h3>
              </div>
              <p className="font-chakra text-xs text-neutral-300 leading-relaxed pl-6 font-normal">
                {faq.a}
              </p>
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
                disabled={idx === faqList.length - 1}
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
                {editingIndex !== null ? 'EDIT FAQ ITEM' : 'ADD NEW FAQ ITEM'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                  QUESTION *
                </label>
                <input
                  type="text"
                  required
                  value={currentFaq.q}
                  onChange={(e) => setCurrentFaq({ ...currentFaq, q: e.target.value })}
                  placeholder="e.g. HOW FAST CAN YOU DELIVER A LANDING PAGE OR WEB APP?"
                  className="w-full px-3 py-2 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none uppercase font-orbitron"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1">
                  ANSWER *
                </label>
                <textarea
                  rows={4}
                  required
                  value={currentFaq.a}
                  onChange={(e) => setCurrentFaq({ ...currentFaq, a: e.target.value })}
                  placeholder="Comprehensive answer explanation..."
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
                  {editingIndex !== null ? 'Save Changes' : 'Add FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
