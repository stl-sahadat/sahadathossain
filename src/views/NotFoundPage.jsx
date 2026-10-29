import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { CyberFrame } from '../components/CyberFrame';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CornerBadge } from '../components/CyberIcons';
import { AlertTriangle, ArrowLeft, Send } from 'lucide-react';

export function NotFoundPage({ onOpenContact, currentTime }) {
  const navigate = useNavigate();
  const { personalInfo, currentTheme } = usePortfolioData();

  return (
    <div className="w-full">
      {/* Top Cyber Frame with Navbar */}
      <section className="mb-14 sm:mb-20">
        <CyberFrame
          variant="hero"
          className="bg-[#050507]"
          contentClassName="p-6 sm:p-10 lg:p-12 flex flex-col justify-between"
        >
          {/* Top Navbar */}
          <Navbar onOpenContact={onOpenContact} />

          {/* 404 Body */}
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 font-chakra text-xs tracking-widest uppercase mb-6 animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>SYSTEM ANOMALY // 404 ERROR</span>
            </div>

            <h1 className="font-orbitron font-extrabold text-6xl sm:text-8xl text-white tracking-widest mb-4">
              404<span className="text-[#00F0FF]">.</span>
            </h1>

            <h2 className="font-orbitron font-bold text-xl sm:text-2xl text-white uppercase tracking-wider mb-4">
              COORDINATES NOT FOUND
            </h2>

            <p className="font-chakra text-sm text-neutral-300 max-w-md leading-relaxed mb-8">
              The page or sector you are attempting to access does not exist in this database or has been re-indexed to another dimension.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  navigate('/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-chamfer px-8 py-3.5 bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>RETURN TO BASE [HOME]</span>
              </button>

              <button
                onClick={() => {
                  navigate('/contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-chamfer px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-chakra font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2"
              >
                <span>TRANSMIT INQUIRY</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Telemetry */}
          <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-chakra text-neutral-500">
            <span>ERROR CODE: 0x7F_NOT_FOUND</span>
            <span>SYSTEM: RECOVERY READY</span>
          </div>
        </CyberFrame>
      </section>

      {/* Footer */}
      <Footer
        personalInfo={personalInfo}
        currentTime={currentTime}
        onOpenContact={onOpenContact}
      />
    </div>
  );
}
