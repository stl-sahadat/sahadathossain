import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { STLLogo, ButtonCornerMarks } from './CyberIcons';
import { Menu, X } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';

export function Navbar({ onOpenContact }) {
  const { personalInfo, currentTheme } = usePortfolioData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'WORKS', path: '/works' },
    { label: 'GALLERY', path: '/gallery' },
    { label: 'CONTACT', path: '/contact' },
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path === '/' && location.pathname === '/') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    if (path === '/works' && location.pathname === '/') {
      if (window.__lenis) {
        window.__lenis.scrollTo('#works', { duration: 1.4 });
      } else {
        document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="relative w-full pb-6 mb-4 border-b border-white/[0.06] z-40">
      <div className="flex items-center justify-between">
        {/* Brand Logo - Stylish 'S' Cyber Monogram & 'STL' Text with small User Name */}
        <Link
          to="/"
          onClick={() => {
            if (location.pathname === '/') {
              if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-3 group cursor-pointer select-none"
        >
          <STLLogo className="w-8 h-8 group-hover:scale-105 transition-transform" color={currentTheme?.hex || "#00F0FF"} />
          <div className="flex flex-col">
            <span className="font-orbitron font-extrabold text-lg sm:text-xl tracking-[0.2em] text-white group-hover:text-[#00F0FF] transition-colors leading-tight">
              {personalInfo?.brandName || 'STL'}<span className="text-[#00F0FF]">.</span>
            </span>
            <span className="text-[10px] font-chakra text-neutral-300 tracking-wider uppercase font-semibold">
              {personalInfo?.name || 'Md. Sahadat Hossain'}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-xs font-chakra tracking-[0.2em] font-medium uppercase">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/'
                ? currentPath === '/'
                : currentPath.startsWith(link.path);

            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                className={`relative py-1 transition-colors cursor-pointer ${
                  isActive ? 'text-[#00F0FF] font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#00F0FF] rounded-full shadow-[0_0_8px_rgba(0,240,255,0.85)]" />
                )}
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button: LET'S TALK with 4 Corner Reticle Marks */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenContact ? onOpenContact : () => handleNavClick('/contact')}
            className="group relative px-3 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-chakra font-medium tracking-[0.14em] sm:tracking-[0.18em] uppercase border border-[#00F0FF]/60 text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.2)] cursor-pointer overflow-hidden whitespace-nowrap"
          >
            <ButtonCornerMarks />
            <span className="relative z-10 font-bold">LET'S TALK</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#00F0FF] transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-[#0c0d15] border border-white/15 rounded-xl p-5 flex flex-col gap-3 text-xs font-chakra tracking-widest uppercase animate-fadeIn shadow-2xl">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/'
                ? currentPath === '/'
                : currentPath.startsWith(link.path);

            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                className={`text-left py-2.5 px-3 rounded-lg border transition-all ${
                  isActive
                    ? 'border-[#00F0FF]/50 text-[#00F0FF] bg-[#00F0FF]/10 font-bold shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                    : 'border-transparent text-neutral-200 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <span>DHAKA · AVAILABLE GLOBALLY</span>
            <span className="text-[#80B82C] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#80B82C] inline-block animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
