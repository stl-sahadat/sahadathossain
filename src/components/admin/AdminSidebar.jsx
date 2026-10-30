import React from 'react';
import {
  LayoutDashboard,
  User,
  BookOpen,
  Briefcase,
  Video,
  CreditCard,
  MessageSquare,
  HelpCircle,
  Milestone,
  Send,
  Palette,
  ShieldCheck,
  ExternalLink,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Layers,
} from 'lucide-react';
import { STLLogo } from '../CyberIcons';

export const ADMIN_TABS = [
  { id: 'overview', label: 'Overview & Stats', icon: LayoutDashboard, badge: 'LIVE' },
  { id: 'hero', label: 'Profile & 3D Hero', icon: User, badge: '3D SYNC' },
  { id: 'about', label: 'About & Story', icon: BookOpen },
  { id: 'services', label: 'Services & Process', icon: Layers, badge: '4+4' },
  { id: 'projects', label: 'Works & Projects', icon: Briefcase },
  { id: 'videos', label: 'Video Gallery', icon: Video, badge: '16:9 & 9:16' },
  { id: 'pricing', label: 'Pricing & Plans', icon: CreditCard },
  { id: 'reviews', label: 'Client Reviews', icon: MessageSquare, badge: '5★' },
  { id: 'faqs', label: 'FAQ Management', icon: HelpCircle },
  { id: 'timeline', label: 'Experience & Timeline', icon: Milestone, badge: '2024+' },
  { id: 'contact', label: 'Contact & Socials', icon: Send },
  { id: 'theme', label: 'Theme & Cursor Studio', icon: Palette, badge: 'PRESETS & CURSORS' },
  { id: 'security', label: 'Security & Auth', icon: ShieldCheck, badge: 'SECURE' },
];

export function AdminSidebar({
  activeTab,
  onSelectTab,
  onLogout,
  currentTheme,
  mobileOpen,
  setMobileOpen,
}) {
  const accentHex = currentTheme?.hex || '#00F0FF';
  const accentRgb = currentTheme?.rgb || '0, 240, 255';

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#06080e] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div>
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center border"
                style={{
                  backgroundColor: `rgba(${accentRgb}, 0.1)`,
                  borderColor: `rgba(${accentRgb}, 0.3)`,
                }}
              >
                <STLLogo className="w-5 h-5" color={accentHex} />
              </div>
              <div>
                <div className="font-orbitron font-extrabold text-sm tracking-widest text-white leading-tight">
                  STL ADMIN<span style={{ color: accentHex }}>.</span>
                </div>
                <div className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">
                  QUANTUM CMS // V3.0
                </div>
              </div>
            </div>

            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-neutral-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Active Theme Indicator */}
          <div className="px-5 py-2.5 bg-white/[0.02] border-b border-white/5 flex items-center justify-between text-[11px] font-mono">
            <span className="text-neutral-400">ACTIVE ACCENT:</span>
            <div className="flex items-center gap-1.5 font-bold uppercase" style={{ color: accentHex }}>
              <span
                className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px]"
                style={{ backgroundColor: accentHex, boxShadow: `0 0 8px ${accentHex}` }}
              />
              <span>{currentTheme?.name || 'Cyber Cyan'}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)] custom-scrollbar">
            {ADMIN_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onSelectTab(tab.id);
                    setMobileOpen(false);
                  }}
                  style={
                    isActive
                      ? {
                          backgroundColor: `rgba(${accentRgb}, 0.15)`,
                          borderColor: `rgba(${accentRgb}, 0.4)`,
                          color: '#ffffff',
                          boxShadow: `0 0 15px rgba(${accentRgb}, 0.15)`,
                        }
                      : {}
                  }
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-chakra tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'font-bold border'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className="w-4 h-4"
                      style={isActive ? { color: accentHex } : { color: '#737373' }}
                    />
                    <span>{tab.label}</span>
                  </div>

                  {tab.badge && (
                    <span
                      style={
                        isActive
                          ? {
                              backgroundColor: `rgba(${accentRgb}, 0.2)`,
                              borderColor: `rgba(${accentRgb}, 0.3)`,
                              color: accentHex,
                            }
                          : {}
                      }
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase tracking-widest ${
                        isActive
                          ? 'font-bold'
                          : 'bg-white/5 text-neutral-400 border-white/10'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-[#05060b] space-y-2">
          {/* View Live Portfolio */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-chakra tracking-wider uppercase transition-colors"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#00F0FF]" />
          </a>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-chakra tracking-wider uppercase transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Terminal</span>
          </button>
        </div>
      </aside>
    </>
  );
}
