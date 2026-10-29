import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { resolveAssetUrl } from '../lib/assetHelper';
import { CyberFrame } from '../components/CyberFrame';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CornerBadge, ButtonCornerMarks } from '../components/CyberIcons';
import { CyberCard, ScrollReveal } from '../components/ThreeD';
import {
  Play,
  ExternalLink,
  Tv,
  X,
  Clock,
  Radio,
  Video,
  Smartphone,
  Layers,
} from 'lucide-react';

export function GalleryPage({ onOpenContact, currentTime }) {
  const { personalInfo, videoGallery, currentTheme } = usePortfolioData();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Keyboard navigation: Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // YouTube Widescreen Sessions (Post Videos)
  const youtubeVideos = videoGallery.filter(
    (v) => (v.platformFilter || v.platform || '').toLowerCase() === 'youtube' || v.format === 'widescreen'
  );
  // Facebook Vertical Reels (Reels Videos)
  const facebookReels = videoGallery.filter(
    (v) => (v.platformFilter || v.platform || '').toLowerCase() === 'facebook' || v.format === 'reel' || v.format === 'vertical'
  );

  // Filter tabs for Video Gallery: Exactly 3 options as requested by Sahadat vai
  const filterTabs = [
    {
      id: 'all',
      label: 'All Video',
      count: videoGallery.length,
      icon: <Layers className="w-3.5 h-3.5" />,
    },
    {
      id: 'post',
      label: 'Post Video',
      count: youtubeVideos.length,
      icon: <Tv className="w-3.5 h-3.5" />,
    },
    {
      id: 'reels',
      label: 'Reels Video',
      count: facebookReels.length,
      icon: <Smartphone className="w-3.5 h-3.5" />,
    },
  ];

  const showPostVideos = activeFilter === 'all' || activeFilter === 'post';
  const showReelsVideos = activeFilter === 'all' || activeFilter === 'reels';

  return (
    <div className="w-full">
      {/* ========================================================
          HERO BANNER FRAME: VIDEO ARCHIVE & MEDIA DEMOS
          Matches Framer Omnira Cyber Noir standards
          ======================================================== */}
      <section className="mb-10 sm:mb-16">
        <CyberFrame
          variant="hero"
          className="bg-[#050507]"
          contentClassName="p-6 sm:p-10 lg:p-12 flex flex-col justify-between"
        >
          {/* Top Navbar */}
          <Navbar onOpenContact={onOpenContact} />

          {/* Page Banner Header - Split Layout */}
          <div className="py-6 sm:py-10 border-b border-white/[0.08]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
              {/* Left Column: Pre-Badge & Headline */}
              <div className="lg:col-span-7">
                <CornerBadge variant="cyan" className="mb-3 inline-block">
                  VIDEO ARCHIVE & MEDIA GALLERY
                </CornerBadge>

                <h1 className="font-orbitron font-extrabold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.08]">
                  ENGINEERED <br />
                  <span className="text-[#00F0FF] drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                    IN MOTION
                  </span>
                </h1>
              </div>

              {/* Right Column: Description & Live Channel Indicator */}
              <div className="lg:col-span-5 pb-1">
                <p className="font-chakra text-xs sm:text-sm text-neutral-300 leading-relaxed mb-3">
                  Recorded architectural breakdowns, AI agent pipeline walk-throughs, full-stack live builds, and autonomous bot telemetry streamed across YouTube, LinkedIn, and Facebook.
                </p>
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-300">
                  <span className="flex items-center gap-1.5 text-[#00F0FF]">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    <span>BROADCAST FEED ACTIVE</span>
                  </span>
                  <span className="text-white/20">|</span>
                  <a
                    href={personalInfo.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-300 hover:text-white underline decoration-[#00F0FF]/50 transition-colors flex items-center gap-1"
                  >
                    <span>{personalInfo.youtubeDisplay}</span>
                    <ExternalLink className="w-3 h-3 text-[#00F0FF]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Bar with Platform Tabs (Exactly 3 Options: All Video, Post Video, Reels Video) */}
          <div className="pt-6 flex flex-wrap items-center gap-3 text-xs">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-5 py-2.5 rounded-lg font-orbitron font-bold tracking-wider text-xs uppercase transition-all duration-300 cursor-pointer flex items-center gap-2.5 ${
                    isActive
                      ? 'bg-[#00F0FF] text-black shadow-[0_0_20px_rgba(0,240,255,0.45)] scale-[1.02]'
                      : 'bg-white/[0.04] hover:bg-white/[0.09] text-neutral-300 hover:text-white border border-white/10 hover:border-[#00F0FF]/50'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      isActive ? 'bg-black/25 text-black' : 'bg-white/10 text-[#00F0FF]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </CyberFrame>
      </section>

      {/* ========================================================
          SECTION A: POST VIDEOS (16:9 WIDESCREEN MASTERCLASSES)
          ======================================================== */}
      {showPostVideos && (
        <section className="py-6 sm:py-10 border-b border-white/[0.08]">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-6 border-b border-white/[0.08] gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#00F0FF] uppercase">
                  POST VIDEOS ARCHIVE · 16:9 WIDESCREEN
                </span>
              </div>
              <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
                SYSTEMS & ARCHITECTURAL MASTERCLASSES
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="text-[#00F0FF] font-bold">{youtubeVideos.length}</span> VIDEOS
              <span className="text-white/20">|</span>
              <a
                href={personalInfo.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white underline decoration-red-500/50 flex items-center gap-1 transition-colors"
              >
                <span>{personalInfo.youtubeDisplay}</span>
                <ExternalLink className="w-3 h-3 text-[#FF4444]" />
              </a>
            </div>
          </div>

          {/* YouTube Video Cards Grid (16:9 Compact Uniform Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {youtubeVideos.map((video, idx) => (
              <ScrollReveal key={video.id} delay={idx * 0.04} className="h-full">
                <CyberCard className="h-full rounded-xl">
                  <div
                    onClick={() => setSelectedVideo(video)}
                    className="group bg-[#0d0f17] border border-white/15 hover:border-[#00F0FF] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.22)] flex flex-col justify-between h-full relative cursor-pointer"
                  >
                    {/* 16:9 Widescreen Thumbnail Frame */}
                    <div className="relative aspect-video w-full overflow-hidden bg-black/90 group/thumb">
                      {/* Reticle Corner Brackets */}
                      <span className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00F0FF] z-20 pointer-events-none" />
                      <span className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00F0FF] z-20 pointer-events-none" />
                      <span className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00F0FF] z-20 pointer-events-none" />
                      <span className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00F0FF] z-20 pointer-events-none" />

                      <img
                        src={resolveAssetUrl(video.thumb)}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] filter brightness-95 group-hover:brightness-105"
                      />

                      {/* Only OUR Blue/Cyan Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-all z-10">
                        <div className="w-10 h-10 rounded-full bg-[#00F0FF] text-black flex items-center justify-center shadow-[0_0_20px_#00F0FF] group-hover:scale-110 transition-transform">
                          <Play className="w-4 h-4 fill-black ml-0.5" />
                        </div>
                      </div>

                      {/* Platform Tag */}
                      <div className="absolute top-2 left-2 bg-black/90 backdrop-blur-md border border-[#00F0FF]/50 px-2 py-0.5 rounded text-[8.5px] font-chakra font-bold tracking-wider text-[#00F0FF] uppercase z-20 shadow-md">
                        {video.platform}
                      </div>

                      {/* Duration Pill */}
                      <div className="absolute bottom-2 right-2 bg-black/90 backdrop-blur-md border border-white/20 px-1.5 py-0.5 rounded text-[8.5px] font-mono text-neutral-300 z-20 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-[#00F0FF]" />
                        <span>{video.duration}</span>
                      </div>

                      {/* Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-transparent to-transparent opacity-50 pointer-events-none" />
                    </div>

                    {/* Card Footer: Minimal Clean Title & Channel (Uniform Size) */}
                    <div className="p-3 bg-[#0b0d14] border-t border-white/10 flex flex-col justify-between flex-grow">
                      <div className="mb-2">
                        <span className="inline-block text-[8.5px] font-mono font-semibold text-[#00F0FF] uppercase tracking-wider mb-1 truncate max-w-full">
                          {video.badge}
                        </span>
                        <h3 className="font-orbitron font-bold text-xs text-white group-hover:text-[#00F0FF] transition-colors line-clamp-2 leading-snug h-[2rem]">
                          {video.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between text-[9.5px] font-mono text-neutral-400 pt-2 border-t border-white/5">
                        <span className="truncate max-w-[130px]">{video.channel}</span>
                        <span className="text-[#00F0FF] flex items-center gap-1 flex-shrink-0 group-hover:underline font-bold">
                          <span>PLAY</span>
                          <Play className="w-2 h-2 fill-[#00F0FF]" />
                        </span>
                      </div>
                    </div>
                  </div>
                </CyberCard>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================
          SECTION B: REELS VIDEOS & QUICK DEV HACKS
          9:15 Compact Portrait Grid for Vertical Reels
          ======================================================== */}
      {showReelsVideos && (
        <section className="py-6 sm:py-10 border-b border-white/[0.08]">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-6 border-b border-white/[0.08] gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#00F0FF] uppercase">
                  FACEBOOK REELS ARCHIVE · 9:16
                </span>
              </div>
              <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
                QUICK DEV HACKS & ARCHITECTURAL REELS
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="text-[#00F0FF] font-bold">{facebookReels.length}</span> REELS
              <span className="text-white/20">|</span>
              <a
                href={personalInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white underline decoration-[#00F0FF]/50 flex items-center gap-1 transition-colors"
              >
                <span>{personalInfo.facebook.replace('https://facebook.com/', 'fb.com/')}</span>
                <ExternalLink className="w-3 h-3 text-[#00F0FF]" />
              </a>
            </div>
          </div>

          {/* Facebook Reel Cards Grid (Compact 6-Column 2/3 Scaled Portrait Grid) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5">
            {facebookReels.map((video, idx) => (
              <ScrollReveal key={video.id} delay={idx * 0.04} className="h-full">
                <CyberCard className="h-full rounded-xl">
                  <div
                    onClick={() => setSelectedVideo(video)}
                    className="group bg-[#0d0f17] border border-white/15 hover:border-[#00F0FF] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] flex flex-col justify-between h-full relative cursor-pointer"
                  >
                    {/* Compact Portrait Frame (9:15 scaled down ~1/3 for sleek vertical reels) */}
                    <div className="relative aspect-[9/15] w-full overflow-hidden bg-black/90 group/thumb">
                      {/* Reticle Corner Brackets */}
                      <span className="absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 border-[#00F0FF] z-20 pointer-events-none" />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 border-[#00F0FF] z-20 pointer-events-none" />
                      <span className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 border-[#00F0FF] z-20 pointer-events-none" />
                      <span className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 border-[#00F0FF] z-20 pointer-events-none" />

                      <img
                        src={resolveAssetUrl(video.thumb)}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] filter brightness-95 group-hover:brightness-105"
                      />

                      {/* Compact Blue/Cyan Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-all z-10">
                        <div className="w-8 h-8 rounded-full bg-[#00F0FF] text-black flex items-center justify-center shadow-[0_0_16px_#00F0FF] group-hover:scale-110 transition-transform">
                          <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
                        </div>
                      </div>

                      {/* Platform Tag */}
                      <div className="absolute top-1.5 left-1.5 bg-black/90 backdrop-blur-md border border-[#00F0FF]/60 px-1.5 py-0.5 rounded text-[7.5px] font-chakra font-bold tracking-wider text-[#00F0FF] uppercase z-20 shadow-md">
                        {video.platform}
                      </div>

                      {/* Duration Pill */}
                      <div className="absolute bottom-1.5 right-1.5 bg-black/90 backdrop-blur-md border border-white/20 px-1.5 py-0.5 rounded text-[7.5px] font-mono text-neutral-300 z-20 flex items-center gap-1">
                        <Clock className="w-2 h-2 text-[#00F0FF]" />
                        <span>{video.duration}</span>
                      </div>

                      {/* Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-transparent to-transparent opacity-50 pointer-events-none" />
                    </div>

                    {/* Card Footer: Minimal Clean Title & Channel (Uniform Compact Size) */}
                    <div className="p-2 sm:p-2.5 bg-[#0b0d14] border-t border-white/10 flex flex-col justify-between flex-grow">
                      <div className="mb-1.5">
                        <span className="inline-block text-[8px] font-mono font-semibold text-[#00F0FF] uppercase tracking-wider mb-0.5 truncate max-w-full">
                          {video.badge}
                        </span>
                        <h3 className="font-orbitron font-bold text-[11px] text-white group-hover:text-[#00F0FF] transition-colors line-clamp-2 leading-snug h-[1.85rem]">
                          {video.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between text-[8.5px] font-mono text-neutral-400 pt-1.5 border-t border-white/5">
                        <span className="truncate max-w-[85px] sm:max-w-[100px]">{video.channel}</span>
                        <span className="text-[#00F0FF] flex items-center gap-0.5 flex-shrink-0 group-hover:underline font-bold">
                          <span>PLAY</span>
                          <Play className="w-2 h-2 fill-[#00F0FF]" />
                        </span>
                      </div>
                    </div>
                  </div>
                </CyberCard>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================
          VIDEO LIGHTBOX PLAYER MODAL
          Streams video directly over network (YouTube & Facebook)
          ======================================================== */}
      {selectedVideo && (
        <div
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0b0d14] border border-[#00F0FF]/40 rounded-2xl p-5 sm:p-7 max-w-4xl w-full relative shadow-[0_0_80px_rgba(0,240,255,0.25)] my-6"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2 h-2 rounded-full animate-pulse shadow-lg ${
                    selectedVideo.platform === 'YouTube'
                      ? 'bg-[#FF0000] shadow-[0_0_10px_#FF0000]'
                      : 'bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]'
                  }`}
                />
                <span className="font-orbitron font-bold text-xs uppercase tracking-widest text-white">
                  NETWORK VIDEO FEED · {selectedVideo.platform} TRANSMISSION
                </span>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-neutral-300 hover:text-white transition-colors p-1.5 rounded-lg bg-white/10 border border-white/15 cursor-pointer"
                aria-label="Close Player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body - Facebook Reel Layout vs YouTube Widescreen */}
            {selectedVideo.platform === 'Facebook' ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left: Responsive Facebook Reel Embedded Player */}
                <div className="md:col-span-5 flex justify-center">
                  <div className="relative w-[280px] sm:w-[320px] h-[500px] sm:h-[570px] rounded-xl overflow-hidden bg-black border border-[#00F0FF]/40 shadow-[0_0_35px_rgba(0,240,255,0.25)] flex items-center justify-center">
                    <iframe
                      src={selectedVideo.embedUrl}
                      title={selectedVideo.title}
                      width="100%"
                      height="100%"
                      style={{ border: 'none', overflow: 'hidden' }}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Right: Telemetry & Controls */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 uppercase">
                        {selectedVideo.badge}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {selectedVideo.platform} · {selectedVideo.duration}
                      </span>
                    </div>

                    <h3 className="font-orbitron font-bold text-base sm:text-xl text-white mb-3 leading-snug">
                      {selectedVideo.title}
                    </h3>

                    <p className="font-chakra text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                      {selectedVideo.desc}
                    </p>

                    {selectedVideo.topics && (
                      <div className="mb-4">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1.5">
                          KEY ARCHITECTURAL CONCEPTS:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedVideo.topics.map((topic, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#00F0FF]"
                            >
                              #{topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-neutral-300 flex items-start gap-2.5">
                      <Radio className="w-4 h-4 text-[#00F0FF] flex-shrink-0 mt-0.5 animate-pulse" />
                      <span>
                        ভিডিওটি সরাসরি আমাদের সাইটের প্লেয়ারেই প্লে হচ্ছে। ফেসবুক পোস্ট ও কমেন্ট সেকশন ভিজিট করতে চাইলে নিচের বাটনে ক্লিক করুন।
                      </span>
                    </div>
                  </div>

                  {/* Action Link Button (Direct to Facebook) */}
                  <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={selectedVideo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer transition-all group"
                    >
                      <span>WATCH ON FACEBOOK</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <button
                      onClick={() => setSelectedVideo(null)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-chakra font-bold text-xs uppercase tracking-wider border border-white/15 rounded-lg cursor-pointer"
                    >
                      CLOSE PLAYER
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* YouTube Widescreen Player */
              <div>
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/15 shadow-2xl mb-5">
                  <iframe
                    src={selectedVideo.embedUrl}
                    title={selectedVideo.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                {/* Video Meta Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-white/10">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FF0000]/20 text-[#FF4444] border border-[#FF0000]/40 uppercase">
                        {selectedVideo.badge}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {selectedVideo.channel} · {selectedVideo.duration}
                      </span>
                    </div>
                    <h3 className="font-orbitron font-bold text-base sm:text-lg text-white mb-1.5 leading-snug">
                      {selectedVideo.title}
                    </h3>
                    <p className="font-chakra text-xs text-neutral-300 leading-relaxed">
                      {selectedVideo.desc}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-shrink-0">
                    <a
                      href={selectedVideo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-[#FF0000] hover:bg-[#CC0000] text-white font-chakra font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 rounded-lg shadow-[0_0_20px_rgba(255,0,0,0.4)] cursor-pointer transition-all"
                    >
                      <span>WATCH ON YOUTUBE</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setSelectedVideo(null)}
                      className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-chakra font-bold text-xs uppercase tracking-wider border border-white/15 rounded-lg cursor-pointer text-center"
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        personalInfo={personalInfo}
        currentTime={currentTime}
        onOpenContact={onOpenContact}
      />
    </div>
  );
}

export default GalleryPage;
