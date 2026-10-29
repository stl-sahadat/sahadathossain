import React, { useState } from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { CyberFrame } from '../components/CyberFrame';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CornerBadge, ButtonCornerMarks } from '../components/CyberIcons';
import { LinkedinIcon } from '../components/SocialIcons';
import { CyberCard, ScrollReveal } from '../components/ThreeD';
import {
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  CheckCircle2,
  Plus,
  Minus,
  Send,
  Radio,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

export function ContactPage({ onOpenContact, currentTime }) {
  const { personalInfo, faqs, currentTheme } = usePortfolioData();
  // Form State matching Framer Omnira 1:1
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'Design & Development',
    budget: '$3k - $5k',
    timeline: '2-4 weeks',
    details: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // FAQ Accordion State (0 to 7)
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 900);
  };

  // 8 Client-Focused FAQs tailored to Frontend UI/UX & Web Development
  const omniraFaqs = [
    {
      id: '01',
      q: 'HOW FAST CAN YOU DELIVER A LANDING PAGE OR WEB APP?',
      a: 'High-converting landing pages are delivered within 3 to 5 business days. Full multi-page websites or interactive web applications typically take 1 to 2 weeks.',
    },
    {
      id: '02',
      q: 'DO YOU DESIGN IN FIGMA FIRST OR START WITH CODE?',
      a: 'I provide the best of both worlds. With 1+ year of professional design experience, I first create high-fidelity UI/UX wireframes and visual prototypes in Figma for your review and approval, then code them into pixel-perfect responsive software.',
    },
    {
      id: '03',
      q: 'HOW DO YOU USE AI IN YOUR WORKFLOW ("WITH AI")?',
      a: 'I believe in 100% honesty: I leverage modern AI tools (with AI) to accelerate code scaffolding, debug faster, and automate repetitive tasks. This allows me to deliver high-tier agency quality 3x faster without charging agency prices.',
    },
    {
      id: '04',
      q: 'CAN YOU HANDLE FORMS, DATABASE, AND BACKEND INTEGRATIONS?',
      a: 'Yes! While my core focus is UI/UX and frontend, I build clean lightweight backends using Next.js API routes, Node.js, Supabase, Firebase, or MongoDB for forms, contact channels, user auth, and data storage.',
    },
    {
      id: '05',
      q: 'WILL MY WEBSITE BE FAST, SECURE, AND 100% MOBILE RESPONSIVE?',
      a: 'Yes. Every layout is strictly tested across phones, tablets, and ultra-wide screens. I optimize images, minimize bundle size, and benchmark load times to guarantee a 95+ Google PageSpeed score.',
    },
    {
      id: '06',
      q: 'CAN I EASILY UPDATE TEXT, IMAGES, OR CONTENT LATER?',
      a: 'Absolutely. I write clean, well-commented modular code and can integrate a headless CMS or simple configuration files so you or your team can update content effortlessly without touching code.',
    },
    {
      id: '07',
      q: 'DO YOU SUPPORT LAUNCH, DOMAINS, AND HOSTING SETUP?',
      a: 'Yes, full end-to-end launch support is included: custom domain DNS routing, Let’s Encrypt automated SSL, Vercel/VPS configuration, and post-launch verification.',
    },
    {
      id: '08',
      q: 'WHAT IS YOUR PAYMENT AND REVISION PROCESS?',
      a: 'Payment is milestone-based: 50% upfront to initiate the project and 50% upon final review, testing, and launch. All packages include iteration rounds to ensure you are 100% satisfied before final sign-off.',
    },
  ];

  // Dynamically prioritize Admin Panel FAQs if configured
  const activeFaqs = React.useMemo(() => {
    if (faqs && faqs.length > 0) {
      return faqs.map((f, i) => ({
        id: String(i + 1).padStart(2, '0'),
        q: f.q,
        a: f.a,
      }));
    }
    return omniraFaqs;
  }, [faqs]);

  return (
    <div className="w-full">
      {/* ========================================================
          HERO BANNER FRAME: CONTACT CHANNEL / LET'S BUILD SOMETHING
          Matches https://omnira.framer.website/contact 1:1
          ======================================================== */}
      <section className="mb-14 sm:mb-20">
        <CyberFrame
          variant="hero"
          className="bg-[#050507]"
          contentClassName="p-6 sm:p-10 lg:p-12 flex flex-col justify-between"
        >
          {/* Top Navbar */}
          <Navbar onOpenContact={onOpenContact} />

          {/* Main Hero Split Grid */}
          <div className="py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start border-b border-white/[0.08]">
            
            {/* Left Column: Heading, Subtitle, Telemetry, and Direct Channel Pills */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
              <div>
                {/* Pre-Badge: CONTACT CHANNEL */}
                <CornerBadge variant="cyan" className="mb-5 inline-block">
                  CONTACT CHANNEL
                </CornerBadge>

                {/* 2-Line Headline */}
                <h1 className="font-orbitron font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[1.06] mb-6">
                  LET'S BUILD <br />
                  <span className="text-[#00F0FF] drop-shadow-[0_0_25px_rgba(0,240,255,0.45)]">
                    SOMETHING
                  </span>
                </h1>

                {/* Subtitle / Intro Copy */}
                <p className="font-chakra text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed mb-8">
                  Send a few details about your project, and I’ll get back with a clear direction, scope, timeline, and practical next steps for building something sharp, focused, and ready to launch.
                </p>

                {/* Accent Gradient Line */}
                <div className="w-20 h-[2px] bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] mb-8" />
              </div>

              {/* Telemetry Status Indicators */}
              <div className="space-y-3.5 py-4 border-y border-white/10 font-chakra text-xs">
                {/* Status Indicator */}
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#80B82C] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#80B82C]"></span>
                  </span>
                  <span className="text-neutral-300 uppercase tracking-wider font-semibold">
                    STATUS: <span className="text-[#80B82C] font-bold">{personalInfo.contactStatus}</span>
                  </span>
                </div>

                {/* Response Time Indicator */}
                <div className="flex items-center gap-3 text-neutral-300">
                  <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span className="uppercase tracking-wider">
                    RESPONSE <span className="text-[#00F0FF] font-bold">WITHIN 24 HOURS</span>
                  </span>
                </div>

                {/* Signal Strength Indicator */}
                <div className="flex items-center gap-3 text-neutral-300">
                  <Radio className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
                  <span className="uppercase tracking-wider">
                    SIGNAL <span className="text-[#00F0FF] font-bold">STRONG [99.8%]</span>
                  </span>
                </div>
              </div>

              {/* Direct Info Pills matching Omnira */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Email Pill */}
                <div
                  onClick={handleCopyEmail}
                  className="p-4 bg-[#0d0f17] border border-white/15 hover:border-[#00F0FF] rounded-xl flex items-center gap-3.5 cursor-pointer transition-all duration-300 group shadow-md"
                  title="Click to copy email"
                >
                  <div className="w-10 h-10 rounded-lg bg-black/70 border border-white/15 flex items-center justify-center text-[#00F0FF] group-hover:scale-105 transition-transform flex-shrink-0">
                    {copiedEmail ? <Check className="w-4 h-4 text-[#80B82C]" /> : <Mail className="w-4 h-4" />}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-chakra text-neutral-400 uppercase tracking-widest flex items-center gap-1.5 font-semibold">
                      <span>EMAIL</span>
                      {copiedEmail && <span className="text-[#80B82C] font-mono text-[9px] font-bold">COPIED!</span>}
                    </div>
                    <div className="text-xs font-chakra text-white font-medium truncate group-hover:text-[#00F0FF] transition-colors">
                      {personalInfo.email}
                    </div>
                  </div>
                </div>

                {/* Location Pill */}
                <div className="p-4 bg-[#0d0f17] border border-white/15 rounded-xl flex items-center gap-3.5 shadow-md">
                  <div className="w-10 h-10 rounded-lg bg-black/70 border border-white/15 flex items-center justify-center text-[#00F0FF] flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-chakra text-neutral-400 uppercase tracking-widest font-semibold">
                      LOCATION
                    </div>
                    <div className="text-xs font-chakra text-white font-medium">
                      {(personalInfo?.location || 'DHAKA, BANGLADESH').toUpperCase()} · UTC+6
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Chamfered Cyber Transmission Form */}
            <div className="lg:col-span-6 w-full">
              <div className="relative bg-[#0d0f17] border border-white/15 rounded-2xl p-6 sm:p-9 shadow-[0_0_45px_rgba(0,0,0,0.85)]">
                {/* 4 Cyber Corner Accent Brackets */}
                <span className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00F0FF] pointer-events-none" />
                <span className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00F0FF] pointer-events-none" />
                <span className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00F0FF] pointer-events-none" />
                <span className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00F0FF] pointer-events-none" />

                {formSubmitted ? (
                  <div className="py-16 text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#80B82C]/10 border border-[#80B82C]/40 flex items-center justify-center text-[#80B82C] mb-5">
                      <CheckCircle2 className="w-8 h-8 animate-bounce" />
                    </div>
                    <h3 className="font-orbitron font-extrabold text-2xl text-white uppercase tracking-wider mb-2">
                      TRANSMISSION RECEIVED
                    </h3>
                    <p className="font-chakra text-sm text-neutral-200 max-w-sm mb-6 leading-relaxed">
                      Thank you, <span className="text-[#00F0FF] font-semibold">{formState.name}</span>. Your project requirements have been recorded. Md Sahadat Hossain will review your specifications and reply via email within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormState({
                          name: '',
                          email: '',
                          projectType: 'Design & Development',
                          budget: '$3k - $5k',
                          timeline: '2-4 weeks',
                          details: '',
                        });
                      }}
                      className="group relative px-6 py-3 bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.3)] overflow-hidden"
                    >
                      <ButtonCornerMarks />
                      <span className="relative z-10">SEND ANOTHER TRANSMISSION</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* YOUR NAME */}
                    <div>
                      <label className="block text-[11px] font-chakra font-bold tracking-wider text-neutral-200 uppercase mb-2">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 bg-[#07080d] border border-white/15 focus:border-[#00F0FF] text-xs text-white font-chakra rounded-xl outline-none transition-colors placeholder:text-neutral-500"
                      />
                    </div>

                    {/* EMAIL ADDRESS */}
                    <div>
                      <label className="block text-[11px] font-chakra font-bold tracking-wider text-neutral-200 uppercase mb-2">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-[#07080d] border border-white/15 focus:border-[#00F0FF] text-xs text-white font-chakra rounded-xl outline-none transition-colors placeholder:text-neutral-500"
                      />
                    </div>

                    {/* PROJECT TYPE */}
                    <div>
                      <label className="block text-[11px] font-chakra font-bold tracking-wider text-neutral-200 uppercase mb-2">
                        PROJECT TYPE
                      </label>
                      <select
                        value={formState.projectType}
                        onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                        className="w-full px-4 py-3 bg-[#07080d] border border-white/15 focus:border-[#00F0FF] text-xs text-white font-chakra rounded-xl outline-none transition-colors cursor-pointer"
                      >
                        <option value="Design & Development">Design & Development</option>
                        <option value="Full-Stack Web App">Full-Stack Web App</option>
                        <option value="High-Throughput Backend & APIs">High-Throughput Backend & APIs</option>
                        <option value="Visual System & UI/UX">Visual System & UI/UX</option>
                        <option value="AI Agent & Orchestration">AI Agent & Orchestration</option>
                      </select>
                    </div>

                    {/* 2 COLUMNS: BUDGET RANGE & TIMELINE */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-chakra font-bold tracking-wider text-neutral-200 uppercase mb-2">
                          BUDGET RANGE
                        </label>
                        <select
                          value={formState.budget}
                          onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                          className="w-full px-4 py-3 bg-[#07080d] border border-white/15 focus:border-[#00F0FF] text-xs text-white font-chakra rounded-xl outline-none transition-colors cursor-pointer"
                        >
                          <option value="$1k - $3K">$1k - $3K</option>
                          <option value="$3k - $5k">$3k - $5k</option>
                          <option value="$5k - $10k">$5k - $10k</option>
                          <option value="$10k+">$10k+</option>
                          <option value="Not sure yet">Not sure yet</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-chakra font-bold tracking-wider text-neutral-200 uppercase mb-2">
                          TIMELINE
                        </label>
                        <select
                          value={formState.timeline}
                          onChange={(e) => setFormState({ ...formState, timeline: e.target.value })}
                          className="w-full px-4 py-3 bg-[#07080d] border border-white/15 focus:border-[#00F0FF] text-xs text-white font-chakra rounded-xl outline-none transition-colors cursor-pointer"
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

                    {/* PROJECT DETAILS */}
                    <div>
                      <label className="block text-[11px] font-chakra font-bold tracking-wider text-neutral-200 uppercase mb-2">
                        PROJECT DETAILS
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formState.details}
                        onChange={(e) => setFormState({ ...formState, details: e.target.value })}
                        placeholder="Tell me about your project, goals, and any details."
                        className="w-full px-4 py-3 bg-[#07080d] border border-white/15 focus:border-[#00F0FF] text-xs text-white font-chakra rounded-xl outline-none transition-colors resize-none placeholder:text-neutral-500 leading-relaxed"
                      />
                    </div>

                    {/* SEND REQUEST BUTTON WITH BUTTONCORNERMARKS */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full py-4 bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.4)] disabled:opacity-50 flex items-center justify-center cursor-pointer overflow-hidden"
                    >
                      <ButtonCornerMarks />
                      <span className="relative z-10 select-none">{isSubmitting ? 'TRANSMITTING REQUEST...' : 'SEND REQUEST'}</span>
                      <span className="relative z-10 inline-flex items-center justify-center max-w-0 opacity-0 -translate-x-2 group-hover:max-w-[20px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-300 ease-out overflow-hidden text-black">
                        <Send className="w-3.5 h-3.5 flex-shrink-0" />
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </CyberFrame>
      </section>

      {/* ========================================================
          FAQS SECTION: CLEAR ANSWERS / PRE-BUILD
          Matches https://omnira.framer.website/contact FAQs 1:1
          ======================================================== */}
      <section className="py-12 sm:py-20 border-b border-white/[0.08]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Heading, Description, and 'STILL HAVE QUESTIONS?' Card */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              {/* Badge: FAQs */}
              <CornerBadge variant="cyan" className="mb-4 inline-block">
                FAQs
              </CornerBadge>

              {/* Title: CLEAR ANSWERS / PRE-BUILD */}
              <h2 className="font-orbitron font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight mb-2">
                CLEAR ANSWERS <br />
                <span className="text-[#00F0FF] drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">PRE-BUILD</span>
              </h2>

              {/* Accent Line */}
              <div className="w-16 h-[2px] bg-[#00F0FF] mb-6" />

              {/* Subtitle */}
              <p className="font-chakra text-sm text-neutral-300 leading-relaxed">
                Everything you need to know about the process, timeline, architecture setup, and project delivery.
              </p>
            </div>

            {/* STILL HAVE QUESTIONS? Chamfered Cyber Card */}
            <div className="relative bg-[#0d0f17] border border-white/15 rounded-2xl p-6 sm:p-7 shadow-[0_0_35px_rgba(0,0,0,0.7)] group">
              {/* Corner Accent Brackets */}
              <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00F0FF] pointer-events-none" />
              <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00F0FF] pointer-events-none" />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00F0FF] pointer-events-none" />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00F0FF] pointer-events-none" />

              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-black/80 border border-white/15 flex items-center justify-center text-[#00F0FF] flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider mb-1">
                    STILL HAVE QUESTIONS?
                  </h4>
                  <p className="font-chakra text-xs text-neutral-300">
                    Let's talk about your project and map out a tailored architecture roadmap.
                  </p>
                </div>
              </div>

              <a
                href={`mailto:${personalInfo.email}?subject=Project%20Inquiry%20-%20Md%20Sahadat%20Hossain`}
                className="group relative w-full py-3 bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs uppercase tracking-widest rounded-xl border border-[#00F0FF] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.3)] overflow-hidden"
              >
                <ButtonCornerMarks />
                <span className="relative z-10">CONTACT US</span>
                <ArrowUpRight className="w-4 h-4 relative z-10" />
              </a>
            </div>

            {/* Direct Social Channels Quick Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 bg-[#0d0f17] border border-white/15 hover:border-[#80B82C] rounded-xl text-neutral-300 hover:text-white flex items-center justify-center gap-2 transition-all text-xs font-chakra"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#80B82C]" />
                <span>WHATSAPP</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 bg-[#0d0f17] border border-white/15 hover:border-[#38BDF8] rounded-xl text-neutral-300 hover:text-white flex items-center justify-center gap-2 transition-all text-xs font-chakra"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>LINKEDIN</span>
              </a>
            </div>
          </div>

          {/* Right Column: 8 Chamfered Accordion Items (01 - 08) */}
          <div className="lg:col-span-7 space-y-3.5">
            {activeFaqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.id}
                  className={`bg-[#0d0f17] border transition-all duration-300 rounded-xl overflow-hidden ${
                    isOpen
                      ? 'border-[#00F0FF] shadow-[0_0_25px_rgba(0,240,255,0.2)]'
                      : 'border-white/15 hover:border-white/30'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-5 min-w-0">
                      {/* Number: 01 - 08 in Orbitron font */}
                      <span
                        className={`font-orbitron font-bold text-xs sm:text-sm tracking-wider flex-shrink-0 transition-colors ${
                          isOpen ? 'text-[#00F0FF]' : 'text-neutral-400 group-hover:text-white'
                        }`}
                      >
                        {faq.id}
                      </span>

                      {/* Vertical Divider Line */}
                      <span className="w-[1px] h-4 bg-white/15 flex-shrink-0" />

                      {/* Question Text */}
                      <span
                        className={`font-orbitron font-semibold text-xs sm:text-sm uppercase tracking-wide truncate transition-colors ${
                          isOpen ? 'text-white' : 'text-neutral-200 group-hover:text-white'
                        }`}
                      >
                        {faq.q}
                      </span>
                    </div>

                    {/* Toggle Icon: + / - with smooth rotation */}
                    <div
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#00F0FF] border-[#00F0FF] text-black rotate-180 shadow-[0_0_10px_#00F0FF]'
                          : 'bg-white/[0.08] border-white/15 text-neutral-300 group-hover:text-white group-hover:border-white/40'
                      }`}
                    >
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {/* Accordion Expandable Content */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm font-chakra text-neutral-200 leading-relaxed border-t border-white/10 bg-black/40 animate-fadeIn">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
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

export default ContactPage;
