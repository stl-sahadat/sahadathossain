import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CyberFrame } from './CyberFrame';
import { CornerBadge, OmniraLogo, ButtonCornerMarks } from './CyberIcons';
import { Mail, ArrowRight, MessageCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './SocialIcons';
import { usePortfolioData } from '../context/PortfolioDataContext';

export function Footer({ personalInfo: propPersonalInfo, currentTime, onOpenContact }) {
  const context = usePortfolioData();
  const personalInfo = propPersonalInfo || context.personalInfo;
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="pt-14 sm:pt-20 pb-12">
      {/* Top Monolithic Cyber Frame */}
      <CyberFrame variant="hero" className="bg-[#050608] mb-6" contentClassName="p-7 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading, Bio, Equalizer, Live Clock */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h2 className="font-orbitron font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight mb-3">
                LET'S BUILD <br />
                <span className="text-[#00F0FF]">
                  SOMETHING
                </span>
              </h2>

              <div className="w-16 h-1 bg-[#00F0FF] mb-6" />

              <p className="font-chakra text-sm sm:text-base text-neutral-300 leading-relaxed max-w-lg mb-8">
                I am currently accepting new contracts for scalable full-stack web applications, database architecture, and performance consulting. Let's create an engineering marvel that leaves a lasting impact.
              </p>
            </div>

            {/* Bottom Row: Status Indicator, Equalizer Bars, Local Time */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-chakra pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#80B82C] animate-pulse" />
                <span className="text-neutral-300 tracking-wider">
                  STATUS: <span className="text-[#80B82C] font-semibold">AVAILABLE FOR HIRE</span>
                </span>
              </div>

              {/* Equalizer Hatch Bars with Gentle CSS Animation */}
              <div className="hidden sm:flex items-center gap-1 opacity-70">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-[2px] bg-white transition-all duration-300"
                    style={{
                      height: `${6 + ((i * 3) % 10)}px`,
                      opacity: 0.4 + ((i % 4) * 0.2),
                    }}
                  />
                ))}
              </div>

              {/* Local Time Clock */}
              <div className="text-neutral-300 font-mono tracking-wider ml-auto flex items-center gap-2">
                <span className="text-[10px] text-neutral-400 uppercase font-semibold">LOCAL (DHAKA):</span>
                <span className="text-[#00F0FF] font-bold">{currentTime || '09:50:00 PM'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Inner Chamfered Contact Card */}
          <div className="lg:col-span-5 card-chamfer-tr bg-[#0d0f17] border border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <CornerBadge variant="cyan" className="mb-6">
                DIRECT TRANSMISSION
              </CornerBadge>

              {/* 4 Direct Contact Rows */}
              <div className="space-y-3 mb-8">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 text-xs font-chakra text-neutral-200 hover:text-white transition-colors py-2 border-b border-white/10 group"
                >
                  <Mail className="w-4 h-4 text-[#00F0FF] group-hover:scale-110 transition-transform" />
                  <span>{personalInfo.email}</span>
                </a>

                <a
                  href={personalInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs font-chakra text-neutral-200 hover:text-white transition-colors py-2 border-b border-white/10 group"
                >
                  <MessageCircle className="w-4 h-4 text-[#80B82C] group-hover:scale-110 transition-transform" />
                  <span>WhatsApp: {personalInfo.whatsapp}</span>
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs font-chakra text-neutral-200 hover:text-white transition-colors py-2 border-b border-white/10 group"
                >
                  <GithubIcon className="w-4 h-4 text-neutral-300 group-hover:text-white group-hover:scale-110 transition-all" />
                  <span>{personalInfo.githubDisplay}</span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs font-chakra text-neutral-200 hover:text-white transition-colors py-2 group"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#38BDF8] group-hover:scale-110 transition-transform" />
                  <span>{personalInfo.linkedinDisplay}</span>
                </a>
              </div>
            </div>

            {/* Chamfered Button: START A PROJECT with 4 Corner Reticle Marks */}
            <button
              onClick={onOpenContact ? onOpenContact : () => handleNavClick('/contact')}
              className="group relative w-full py-4 bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)] cursor-pointer overflow-hidden"
            >
              <ButtonCornerMarks />
              <span className="relative z-10 select-none">START A PROJECT</span>
              <span className="relative z-10 inline-flex items-center justify-center max-w-0 opacity-0 -translate-x-2 group-hover:max-w-[20px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-300 ease-out overflow-hidden text-black">
                <svg
                  className="w-3.5 h-3.5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </button>
          </div>

        </div>
      </CyberFrame>

      {/* Bottom Footer Bar (Cyber Frame with Notches) */}
      <CyberFrame variant="footer" className="bg-[#050608]" contentClassName="py-5 px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-chakra">
        {/* Logo - S Cyber Monogram & STL Text */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <OmniraLogo className="w-6 h-6 group-hover:scale-105 transition-transform" color="#00F0FF" />
          <span className="font-orbitron font-bold text-sm tracking-[0.2em] text-white group-hover:text-[#00F0FF] transition-colors">
            STL<span className="text-[#00F0FF]">.</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs text-neutral-400 uppercase tracking-widest flex-wrap justify-center">
          <button onClick={() => handleNavClick('/')} className="hover:text-white transition-colors cursor-pointer">
            HOME
          </button>
          <span className="text-white/20">|</span>
          <button onClick={() => handleNavClick('/about')} className="hover:text-white transition-colors cursor-pointer">
            ABOUT
          </button>
          <span className="text-white/20">|</span>
          <button onClick={() => handleNavClick('/works')} className="hover:text-white transition-colors cursor-pointer">
            WORKS
          </button>
          <span className="text-white/20">|</span>
          <button onClick={() => handleNavClick('/gallery')} className="hover:text-white transition-colors cursor-pointer">
            GALLERY
          </button>
          <span className="text-white/20">|</span>
          <button onClick={() => handleNavClick('/contact')} className="hover:text-white transition-colors cursor-pointer">
            CONTACT
          </button>
        </div>

        {/* Copyright */}
        <div className="text-neutral-500 text-xs tracking-wider">
          {personalInfo.copyright}
        </div>
      </CyberFrame>
    </footer>
  );
}
