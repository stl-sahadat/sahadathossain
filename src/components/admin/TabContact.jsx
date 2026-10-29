import React, { useState } from 'react';
import { Send, Check, Mail, Phone, MessageCircle, Globe } from 'lucide-react';

export function TabContact({ personalInfo = {}, onRequestSave }) {
  const [formData, setFormData] = useState({
    email: personalInfo.email || '',
    phone: personalInfo.phone || '',
    whatsapp: personalInfo.whatsapp || '',
    whatsappUrl: personalInfo.whatsappUrl || '',
    github: personalInfo.github || '',
    githubDisplay: personalInfo.githubDisplay || '',
    linkedin: personalInfo.linkedin || '',
    linkedinDisplay: personalInfo.linkedinDisplay || '',
    youtube: personalInfo.youtube || '',
    youtubeDisplay: personalInfo.youtubeDisplay || '',
    twitter: personalInfo.twitter || '',
    twitterDisplay: personalInfo.twitterDisplay || '',
    facebook: personalInfo.facebook || '',
    instagram: personalInfo.instagram || '',
    telegram: personalInfo.telegram || '',
    contactStatus: personalInfo.contactStatus || 'STATUS: ACCEPTING NEW CLIENTS',
    location: personalInfo.location || 'Dhaka, Bangladesh · UTC+6',
    basedIn: personalInfo.basedIn || 'Barura, Cumilla, Chattogram, Bangladesh • Available Worldwide',
    timezone: personalInfo.timezone || 'Asia/Dhaka (GMT+6)',
    copyright: personalInfo.copyright || '© 2026 MD. SAHADAT HOSSAIN · STL TECH',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onRequestSave('Contact Information', {
      personalInfo: {
        ...personalInfo,
        ...formData,
      },
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase block mb-1">
            SECTION CONFIGURATION // 10
          </span>
          <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
            CONTACT TRANSMISSION & SOCIAL CHANNELS
          </h2>
          <p className="font-chakra text-xs text-neutral-400 mt-1">
            Configure transmission channels, email addresses, WhatsApp lines, and developer socials.
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Save Contact Changes</span>
        </button>
      </div>

      {/* Direct Transmission Lines */}
      <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-4">
        <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
          DIRECT TRANSMISSION CHANNELS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>DIRECT EMAIL ADDRESS</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="sahadat.info01@gmail.com"
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>PHONE NUMBER</span>
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+880 1944-576159"
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WHATSAPP NUMBER</span>
            </label>
            <input
              type="text"
              value={formData.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              placeholder="+880 1944-576159"
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WHATSAPP DIRECT URL</span>
            </label>
            <input
              type="url"
              value={formData.whatsappUrl}
              onChange={(e) => handleChange('whatsappUrl', e.target.value)}
              placeholder="https://wa.me/8801944576159"
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Social Accounts */}
      <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-4">
        <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
          PUBLIC PROFILES & SOCIAL REPOSITORIES
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              PUBLIC CODE REPO URL
            </label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) => handleChange('github', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              LINKEDIN URL
            </label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              YOUTUBE CHANNEL URL
            </label>
            <input
              type="url"
              value={formData.youtube}
              onChange={(e) => handleChange('youtube', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              X / TWITTER URL
            </label>
            <input
              type="url"
              value={formData.twitter}
              onChange={(e) => handleChange('twitter', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              FACEBOOK URL
            </label>
            <input
              type="url"
              value={formData.facebook}
              onChange={(e) => handleChange('facebook', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              INSTAGRAM URL
            </label>
            <input
              type="url"
              value={formData.instagram}
              onChange={(e) => handleChange('instagram', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              TELEGRAM URL
            </label>
            <input
              type="url"
              value={formData.telegram}
              onChange={(e) => handleChange('telegram', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs font-mono text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Geolocation Details */}
      <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-4">
        <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#00F0FF]" />
          <span>GEOLOCATION & TIMEZONE</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              BASED IN (BARURA / CUMILLA)
            </label>
            <input
              type="text"
              value={formData.basedIn}
              onChange={(e) => handleChange('basedIn', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-chakra"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              LOCATION DISPLAY
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-chakra"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              TIMEZONE (ASIA/DHAKA)
            </label>
            <input
              type="text"
              value={formData.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-300 uppercase tracking-widest mb-1.5">
              FOOTER COPYRIGHT NOTICE
            </label>
            <input
              type="text"
              value={formData.copyright}
              onChange={(e) => handleChange('copyright', e.target.value)}
              placeholder="© 2026 MD. SAHADAT HOSSAIN · STL TECH"
              className="w-full px-3.5 py-2.5 bg-[#05060a] border border-white/10 focus:border-[#00F0FF] rounded-lg text-xs text-white focus:outline-none font-chakra"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
