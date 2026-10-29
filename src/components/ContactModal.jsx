import React, { useState } from 'react';
import { CornerBadge, ButtonCornerMarks } from './CyberIcons';
import { X, CheckCircle2 } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';

export function ContactModal({ isOpen, onClose }) {
  const { personalInfo } = usePortfolioData();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack Web App',
    budget: '$3k - $5k',
    timeline: '2-4 weeks',
    details: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 700);
  };

  const handleModalClose = () => {
    setFormSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0e111a] border border-white/20 rounded-2xl p-6 sm:p-10 max-w-xl w-full relative shadow-[0_0_60px_rgba(0,0,0,0.95)] my-8">
        
        {/* Close Button */}
        <button
          onClick={handleModalClose}
          className="absolute top-5 right-5 text-neutral-300 hover:text-white transition-colors p-1.5 rounded-lg bg-white/10 border border-white/15 cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {formSubmitted ? (
          <div className="py-10 text-center flex flex-col items-center">
            <CheckCircle2 className="w-14 h-14 text-[#80B82C] mb-4 animate-bounce" />
            <h3 className="font-orbitron font-extrabold text-2xl text-white uppercase tracking-wider">
              THANK YOU
            </h3>
            <p className="font-chakra text-sm text-neutral-300 mt-2 max-w-md leading-relaxed">
              Your inquiry has been received. {personalInfo?.name || 'Md. Sahadat Hossain'} will analyze your requirements and respond within 24 hours.
            </p>
            <button
              onClick={handleModalClose}
              className="group relative mt-6 px-8 py-3 bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] rounded-lg overflow-hidden cursor-pointer"
            >
              <ButtonCornerMarks />
              <span className="relative z-10">CLOSE TRANSMISSION</span>
            </button>
          </div>
        ) : (
          <div>
            <CornerBadge variant="cyan" className="mb-3">
              INQUIRY
            </CornerBadge>
            <h3 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white uppercase mb-2">
              START A PROJECT
            </h3>
            <p className="font-chakra text-xs text-neutral-300 mb-6 leading-relaxed">
              Tell me about your architectural requirements, timeline, and goals. I will get back to you with a structured proposal and roadmap.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-chakra font-bold tracking-wider text-neutral-200 uppercase mb-1">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Jane Smith"
                    className="w-full px-3.5 py-2.5 bg-[#07080d] border border-white/15 focus:border-[#00F0FF] text-xs text-white font-chakra rounded-lg outline-none transition-colors placeholder:text-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-chakra font-bold tracking-wider text-neutral-200 uppercase mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full px-3.5 py-2.5 bg-[#07080d] border border-white/15 focus:border-[#00F0FF] text-xs text-white font-chakra rounded-lg outline-none transition-colors placeholder:text-neutral-500"
                  />
                </div>
              </div>

              {/* 3 Dropdowns matching audit */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-chakra font-bold tracking-wider text-neutral-300 uppercase mb-1">
                    PROJECT TYPE
                  </label>
                  <select
                    value={formState.projectType}
                    onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                    className="w-full px-2.5 py-2 bg-[#07080d] border border-white/15 focus:border-[#00F0FF] text-xs text-white font-chakra rounded-lg outline-none transition-colors cursor-pointer"
                  >
                    <option value="Full-Stack Web App">Full-Stack Web App</option>
                    <option value="Scalable API & Backend">Scalable API & Backend</option>
                    <option value="Database Tuning & Infra">Database Tuning & Infra</option>
                    <option value="UI/UX & Design Systems">UI/UX & Design Systems</option>
                    <option value="DevOps & Docker VPS">DevOps & Docker VPS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-chakra font-bold tracking-wider text-neutral-300 uppercase mb-1">
                    BUDGET RANGE
                  </label>
                  <select
                    value={formState.budget}
                    onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                    className="w-full px-2.5 py-2 bg-[#07080d] border border-white/15 focus:border-[#00F0FF] text-xs text-white font-chakra rounded-lg outline-none transition-colors cursor-pointer"
                  >
                    <option value="$1k - $3K">$1k - $3K</option>
                    <option value="$3k - $5k">$3k - $5k</option>
                    <option value="$5k - $10k">$5k - $10k</option>
                    <option value="$10k+">$10k+</option>
                    <option value="Flexible / Discuss">Flexible / Discuss</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-chakra font-bold tracking-wider text-neutral-300 uppercase mb-1">
                    TIMELINE
                  </label>
                  <select
                    value={formState.timeline}
                    onChange={(e) => setFormState({ ...formState, timeline: e.target.value })}
                    className="w-full px-2.5 py-2 bg-[#07080d] border border-white/15 focus:border-[#00F0FF] text-xs text-white font-chakra rounded-lg outline-none transition-colors cursor-pointer"
                  >
                    <option value="ASAP">ASAP</option>
                    <option value="2 weeks">2 weeks</option>
                    <option value="2-4 weeks">2-4 weeks</option>
                    <option value="1-2 months">1-2 months</option>
                    <option value="3+ months">3+ months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              {/* Details Textarea */}
              <div>
                <label className="block text-[11px] font-chakra font-bold tracking-wider text-neutral-200 uppercase mb-1">
                  PROJECT DETAILS
                </label>
                <textarea
                  rows={3}
                  value={formState.details}
                  onChange={(e) => setFormState({ ...formState, details: e.target.value })}
                  placeholder="Tell me about your architecture requirements, bottlenecks, or goals..."
                  className="w-full px-3.5 py-2.5 bg-[#07080d] border border-white/15 focus:border-[#00F0FF] text-xs text-white font-chakra rounded-lg outline-none transition-colors resize-none placeholder:text-neutral-500 leading-relaxed"
                />
              </div>

              {/* Submit Button with ButtonCornerMarks */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-3.5 bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(0,240,255,0.4)] disabled:opacity-50 rounded-lg overflow-hidden cursor-pointer"
              >
                <ButtonCornerMarks />
                <span className="relative z-10">{isSubmitting ? 'TRANSMITTING REQUEST...' : 'SEND REQUEST'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
