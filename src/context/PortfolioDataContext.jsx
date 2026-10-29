'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as defaultPortfolioData from '../data/portfolioData';

export const THEME_PRESETS = [
  {
    id: 'cyber-cyan',
    name: 'Cyber Cyan',
    label: 'Cyber Cyan (Default / Original)',
    hex: '#00F0FF',
    rgb: '0, 240, 255',
    glow: 'rgba(0, 240, 255, 0.45)',
    dim: 'rgba(0, 240, 255, 0.1)',
    hover: '#38BDF8',
    description: 'The iconic high-velocity neon cyan cyber aesthetic of Framer Omnira.',
  },
  {
    id: 'neon-gold',
    name: 'Neon Gold',
    label: 'Neon Gold / Amber Cyber',
    hex: '#FFD700',
    rgb: '255, 215, 0',
    glow: 'rgba(255, 215, 0, 0.45)',
    dim: 'rgba(255, 215, 0, 0.1)',
    hover: '#FBBF24',
    description: 'Warm, prestigious golden cyber aesthetic with radiant ambient lighting.',
  },
  {
    id: 'crimson-red',
    name: 'Crimson Red',
    label: 'Crimson Red / Cyberpunk',
    hex: '#FF0055',
    rgb: '255, 0, 85',
    glow: 'rgba(255, 0, 85, 0.45)',
    dim: 'rgba(255, 0, 85, 0.1)',
    hover: '#FB7185',
    description: 'High-contrast aggressive cyberpunk crimson for maximum punch.',
  },
  {
    id: 'matrix-green',
    name: 'Matrix Hacker Green',
    label: 'Matrix Hacker Green (Code Terminal)',
    hex: '#00FF66',
    rgb: '0, 255, 102',
    glow: 'rgba(0, 255, 102, 0.45)',
    dim: 'rgba(0, 255, 102, 0.1)',
    hover: '#4ADE80',
    description: 'Raw terminal green aesthetic inspired by elite coding systems and hackers.',
  },
  {
    id: 'violet-purple',
    name: 'Violet Purple',
    label: 'Synthwave Violet Purple',
    hex: '#A855F7',
    rgb: '168, 85, 247',
    glow: 'rgba(168, 85, 247, 0.45)',
    dim: 'rgba(168, 85, 247, 0.1)',
    hover: '#C084FC',
    description: 'Deep electric purple synthwave aesthetic with ethereal violet glow.',
  },
];

const STORAGE_KEY = 'sahadat_portfolio_master_v3';
const AUTH_KEY = 'sahadat_portfolio_auth_config_v3';

// Default initial testimonials if original is empty
const defaultTestimonials = [
  {
    id: 'rev-1',
    name: 'Tanzim Ahmed',
    role: 'Founder & CEO',
    company: 'NexusAI Global',
    avatar: '/assets/img/sahadat-avatar.jpg',
    quote: 'Sahadat built our multi-tenant SaaS platform in record time with 10x velocity. His pixel precision and system architecture are world class.',
    rating: 5,
    project: 'Next.js 15 Enterprise SaaS',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Alexander Reed',
    role: 'Product Director',
    company: 'OmniVenture Studio',
    avatar: '/assets/img/sahadat-studio-portrait.jpg',
    quote: 'Exceptional full-stack execution. He reverse-engineered our complex legacy app into an ultra-fast modern stack with sub-140ms response times.',
    rating: 5,
    project: 'High-Performance API & System Re-arch',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Elena Rostova',
    role: 'E-Commerce Lead',
    company: 'Artisan Brands Co',
    avatar: '/assets/img/sahadat-about-new.jpg',
    quote: 'A true 10x engineer. The 3D interactions and mobile responsiveness of our storefront exceeded all expectations. 99+ PageSpeed score achieved.',
    rating: 5,
    project: 'Headless E-Commerce & 3D Shaders',
    verified: true,
  },
];

const getDefaultData = () => ({
  personalInfo: {
    ...defaultPortfolioData.personalInfo,
    heroImage: defaultPortfolioData.personalInfo?.portraitHero || '/assets/img/sahadat-hero-transparent.png',
    experienceYears: '1+ year',
    experienceDesignYears: '5+',
    experienceDesignLabel: 'YRS DESIGN',
    experienceDevYears: '1+',
    experienceDevLabel: 'YR WEB DEV',
    experienceProjectsLabel: 'PROJECTS',
    ctaWorksText: 'VIEW SELECTED WORKS',
    ctaProcessText: 'EXPLORE PROCESS',
    ctaExploreAllProjectsText: 'EXPLORE ALL PROJECTS',
  },
  heroWords: defaultPortfolioData.heroWords || ['MOBILE APPS', 'SAAS PLATFORMS', 'E-COMMERCE', 'REVERSE', 'ENGINEERING'],
  atAGlance: defaultPortfolioData.atAGlance || [],
  marqueeItems: defaultPortfolioData.marqueeItems || [],
  impactMetrics: defaultPortfolioData.impactMetrics || [],
  corePillars: defaultPortfolioData.corePillars || [],
  aboutCapabilities: defaultPortfolioData.aboutCapabilities || [],
  processPhases: defaultPortfolioData.processPhases || [],
  services: defaultPortfolioData.services || [],
  projects: defaultPortfolioData.projects || [],
  videoGallery: defaultPortfolioData.videoGallery || [],
  timeline: defaultPortfolioData.timeline || [],
  techStackCategories: defaultPortfolioData.techStackCategories || [],
  terminalData: defaultPortfolioData.terminalData || {},
  testimonials: (defaultPortfolioData.testimonials && defaultPortfolioData.testimonials.length > 0)
    ? defaultPortfolioData.testimonials
    : defaultTestimonials,
  aiModels: defaultPortfolioData.aiModels || [],
  clientLogos: defaultPortfolioData.clientLogos || [],
  pricing: defaultPortfolioData.pricing || [],
  trustBadges: defaultPortfolioData.trustBadges || [],
  faqs: defaultPortfolioData.faqs || [],
  activeThemeId: 'cyber-cyan',
});

const defaultAuthConfig = {
  username: 'admin',
  passwordHash: 'sahadat2026', // Can be changed in Admin Security tab
  maxAttempts: 3,
  lockoutSeconds: 15,
};

// Helper: inject dynamic style rule matching current theme
function injectDynamicThemeStyle(theme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  root.style.setProperty('--accent-color', theme.hex);
  root.style.setProperty('--accent-glow', theme.glow);
  root.style.setProperty('--accent-rgb', theme.rgb);
  root.style.setProperty('--accent-dim', theme.dim);
  root.style.setProperty('--accent-hover', theme.hover);

  let styleTag = document.getElementById('portfolio-dynamic-theme-style');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'portfolio-dynamic-theme-style';
    document.head.appendChild(styleTag);
  }

  styleTag.textContent = `
    :root {
      --accent-color: ${theme.hex} !important;
      --accent-glow: ${theme.glow} !important;
      --accent-rgb: ${theme.rgb} !important;
      --accent-dim: ${theme.dim} !important;
      --accent-hover: ${theme.hover} !important;
    }
    .text-\\[\\#00F0FF\\] { color: ${theme.hex} !important; }
    .text-\\[\\#00F0FF\\]\\/60 { color: rgba(${theme.rgb}, 0.6) !important; }
    .text-\\[\\#00F0FF\\]\\/70 { color: rgba(${theme.rgb}, 0.7) !important; }
    .text-\\[\\#00F0FF\\]\\/80 { color: rgba(${theme.rgb}, 0.8) !important; }
    .text-\\[\\#00F0FF\\]\\/90 { color: rgba(${theme.rgb}, 0.9) !important; }

    .border-\\[\\#00F0FF\\] { border-color: ${theme.hex} !important; }
    .border-\\[\\#00F0FF\\]\\/20 { border-color: rgba(${theme.rgb}, 0.2) !important; }
    .border-\\[\\#00F0FF\\]\\/30 { border-color: rgba(${theme.rgb}, 0.3) !important; }
    .border-\\[\\#00F0FF\\]\\/40 { border-color: rgba(${theme.rgb}, 0.4) !important; }
    .border-\\[\\#00F0FF\\]\\/50 { border-color: rgba(${theme.rgb}, 0.5) !important; }
    .border-\\[\\#00F0FF\\]\\/60 { border-color: rgba(${theme.rgb}, 0.6) !important; }
    .border-\\[\\#00F0FF\\]\\/70 { border-color: rgba(${theme.rgb}, 0.7) !important; }

    .bg-\\[\\#00F0FF\\] { background-color: ${theme.hex} !important; }
    .bg-\\[\\#00F0FF\\]\\/5 { background-color: rgba(${theme.rgb}, 0.05) !important; }
    .bg-\\[\\#00F0FF\\]\\/10 { background-color: rgba(${theme.rgb}, 0.1) !important; }
    .bg-\\[\\#00F0FF\\]\\/15 { background-color: rgba(${theme.rgb}, 0.15) !important; }
    .bg-\\[\\#00F0FF\\]\\/20 { background-color: rgba(${theme.rgb}, 0.2) !important; }
    .bg-\\[\\#00F0FF\\]\\/25 { background-color: rgba(${theme.rgb}, 0.25) !important; }
    .bg-\\[\\#00F0FF\\]\\/30 { background-color: rgba(${theme.rgb}, 0.3) !important; }

    .hover\\:border-\\[\\#00F0FF\\]:hover { border-color: ${theme.hex} !important; }
    .hover\\:border-\\[\\#00F0FF\\]\\/40:hover { border-color: rgba(${theme.rgb}, 0.4) !important; }
    .hover\\:border-\\[\\#00F0FF\\]\\/50:hover { border-color: rgba(${theme.rgb}, 0.5) !important; }
    .hover\\:border-\\[\\#00F0FF\\]\\/70:hover { border-color: rgba(${theme.rgb}, 0.7) !important; }

    .hover\\:text-\\[\\#00F0FF\\]:hover { color: ${theme.hex} !important; }
    .hover\\:bg-\\[\\#00F0FF\\]:hover { background-color: ${theme.hex} !important; }

    .group:hover .group-hover\\:text-\\[\\#00F0FF\\] { color: ${theme.hex} !important; }
    .group:hover .group-hover\\:border-\\[\\#00F0FF\\] { border-color: ${theme.hex} !important; }
    .group:hover .group-hover\\:border-\\[\\#00F0FF\\]\\/50 { border-color: rgba(${theme.rgb}, 0.5) !important; }

    .focus\\:border-\\[\\#00F0FF\\]:focus { border-color: ${theme.hex} !important; }
    .selection\\:bg-\\[\\#00F0FF\\]::selection { background-color: ${theme.hex} !important; }

    .from-\\[\\#00F0FF\\] { --tw-gradient-from: ${theme.hex} var(--tw-gradient-from-position) !important; }
    .to-\\[\\#00F0FF\\] { --tw-gradient-to: ${theme.hex} var(--tw-gradient-to-position) !important; }
    .via-\\[\\#00F0FF\\] { --tw-gradient-via: ${theme.hex} var(--tw-gradient-via-position) !important; }

    .shadow-\\[0_0_30px_rgba\\(0\\,240\\,255\\,0\\.22\\)\\] { box-shadow: 0 0 30px ${theme.glow} !important; }
    .shadow-\\[0_0_25px_rgba\\(0\\,240\\,255\\,0\\.4\\)\\] { box-shadow: 0 0 25px ${theme.glow} !important; }
    .shadow-\\[0_0_20px_rgba\\(0\\,240\\,255\\,0\\.4\\)\\] { box-shadow: 0 0 20px ${theme.glow} !important; }
    .shadow-\\[0_0_15px_rgba\\(0\\,240\\,255\\,0\\.15\\)\\] { box-shadow: 0 0 15px rgba(${theme.rgb}, 0.15) !important; }
    .shadow-\\[0_0_8px_rgba\\(0\\,240\\,255\\,0\\.85\\)\\] { box-shadow: 0 0 8px rgba(${theme.rgb}, 0.85) !important; }
  `;
}

const PortfolioDataContext = createContext(null);

export function PortfolioDataProvider({ children }) {
  const [data, setData] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          return { ...getDefaultData(), ...parsed };
        }
      } catch (e) {
        console.error('Failed reading localStorage', e);
      }
    }
    return getDefaultData();
  });

  const [authConfig, setAuthConfig] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedAuth = localStorage.getItem(AUTH_KEY);
        if (storedAuth) {
          return { ...defaultAuthConfig, ...JSON.parse(storedAuth) };
        }
      } catch (e) {
        console.error('Failed reading authConfig from localStorage', e);
      }
    }
    return defaultAuthConfig;
  });

  // Current theme object
  const currentTheme = THEME_PRESETS.find((t) => t.id === data.activeThemeId) || THEME_PRESETS[0];

  // Apply dynamic theme CSS variables on change
  useEffect(() => {
    injectDynamicThemeStyle(currentTheme);
  }, [currentTheme]);

  // Sync with backend API on mount if available
  useEffect(() => {
    let isCancelled = false;
    const fetchRemoteData = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const remoteJson = await res.json();
          if (remoteJson && !remoteJson.empty && !isCancelled) {
            setData((prev) => {
              const merged = { ...prev, ...remoteJson };
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
              } catch (e) {}
              return merged;
            });
            if (remoteJson.authConfig) {
              setAuthConfig((prev) => {
                const mergedAuth = { ...prev, ...remoteJson.authConfig };
                try {
                  localStorage.setItem(AUTH_KEY, JSON.stringify(mergedAuth));
                } catch (e) {}
                return mergedAuth;
              });
            }
          }
        }
      } catch (e) {
        // Backend API optional, fallback to localStorage
      }
    };
    fetchRemoteData();
    return () => {
      isCancelled = true;
    };
  }, []);

  // Save to persistence (localStorage + API)
  const persistData = useCallback((newData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed saving to localStorage', e);
    }
    // Attempt saving to local disk API with Session Token
    const sessionToken = typeof window !== 'undefined' ? sessionStorage.getItem('sahadat_admin_session_token') : null;
    const headers = { 'Content-Type': 'application/json' };
    if (sessionToken) {
      headers['Authorization'] = `Bearer ${sessionToken}`;
    }
    fetch('/api/portfolio', {
      method: 'POST',
      headers,
      body: JSON.stringify(newData),
    }).catch(() => {
      // API call failed or running in static mode, local storage is active
    });
  }, []);

  // Update a single section
  const updateSection = useCallback((sectionKey, sectionData) => {
    setData((prev) => {
      const updated = {
        ...prev,
        [sectionKey]: sectionData,
      };
      persistData(updated);
      return updated;
    });
  }, [persistData]);

  // Update multiple sections atomically
  const updateMultipleSections = useCallback((sectionsMap) => {
    setData((prev) => {
      const updated = {
        ...prev,
        ...sectionsMap,
      };
      persistData(updated);
      return updated;
    });
  }, [persistData]);

  // Update theme
  const setTheme = useCallback((themeId) => {
    const found = THEME_PRESETS.find((t) => t.id === themeId);
    if (found) {
      updateSection('activeThemeId', themeId);
      injectDynamicThemeStyle(found);
    }
  }, [updateSection]);

  // Update Auth Config
  const updateAuthConfig = useCallback((newAuthConfig) => {
    setAuthConfig((prev) => {
      const merged = { ...prev, ...newAuthConfig };
      try {
        localStorage.setItem(AUTH_KEY, JSON.stringify(merged));
      } catch (e) {}
      return merged;
    });
  }, []);

  // Reset to factory defaults
  const resetToDefaults = useCallback(() => {
    const defaults = getDefaultData();
    persistData(defaults);
    injectDynamicThemeStyle(THEME_PRESETS[0]);
  }, [persistData]);

  // Export as JSON backup file
  const exportBackupJSON = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sahadat-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [data]);

  // Import JSON backup
  const importBackupJSON = useCallback((jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        const merged = { ...getDefaultData(), ...parsed };
        persistData(merged);
        return { success: true };
      }
      return { success: false, error: 'Invalid JSON structure' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }, [persistData]);

  const value = {
    data,
    personalInfo: data.personalInfo,
    heroWords: data.heroWords,
    atAGlance: data.atAGlance,
    marqueeItems: data.marqueeItems,
    impactMetrics: data.impactMetrics,
    corePillars: data.corePillars,
    aboutCapabilities: data.aboutCapabilities,
    processPhases: data.processPhases,
    services: data.services,
    projects: data.projects,
    videoGallery: data.videoGallery,
    timeline: data.timeline,
    techStackCategories: data.techStackCategories,
    terminalData: data.terminalData,
    testimonials: data.testimonials,
    aiModels: data.aiModels,
    clientLogos: data.clientLogos,
    pricing: data.pricing,
    trustBadges: data.trustBadges,
    faqs: data.faqs,
    currentTheme,
    THEME_PRESETS,
    authConfig,
    updateSection,
    updateMultipleSections,
    setTheme,
    updateAuthConfig,
    resetToDefaults,
    exportBackupJSON,
    importBackupJSON,
  };

  return (
    <PortfolioDataContext.Provider value={value}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
}
