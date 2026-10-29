import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { AdminLoginPortal } from '../components/admin/AdminLoginPortal';
import { AdminSidebar, ADMIN_TABS } from '../components/admin/AdminSidebar';
import { SaveConfirmModal } from '../components/admin/SaveConfirmModal';
import { CyberToast } from '../components/admin/CyberToast';

// Tabs
import { TabOverview } from '../components/admin/TabOverview';
import { TabHero } from '../components/admin/TabHero';
import { TabAbout } from '../components/admin/TabAbout';
import { TabServices } from '../components/admin/TabServices';
import { TabProjects } from '../components/admin/TabProjects';
import { TabVideos } from '../components/admin/TabVideos';
import { TabPricing } from '../components/admin/TabPricing';
import { TabReviews } from '../components/admin/TabReviews';
import { TabFaqs } from '../components/admin/TabFaqs';
import { TabTimeline } from '../components/admin/TabTimeline';
import { TabContact } from '../components/admin/TabContact';
import { TabThemeStudio } from '../components/admin/TabThemeStudio';
import { TabSecurity } from '../components/admin/TabSecurity';

import { Menu, ShieldCheck, ExternalLink, LogOut } from 'lucide-react';

export function AdminPage() {
  const {
    data,
    personalInfo,
    heroWords,
    projects,
    videoGallery,
    pricing,
    testimonials,
    faqs,
    timeline,
    currentTheme,
    authConfig,
    updateSection,
    updateMultipleSections,
    setTheme,
    updateAuthConfig,
    resetToDefaults,
    exportBackupJSON,
    importBackupJSON,
  } = usePortfolioData();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!sessionStorage.getItem('sahadat_admin_session_token');
    }
    return false;
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Save Confirmation Modal State
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [pendingCommit, setPendingCommit] = useState({ sectionName: '', data: null });
  const [isSaving, setIsSaving] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Update document title for Admin
  useEffect(() => {
    document.title = 'STL Admin Matrix // Production Control Terminal';
  }, []);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('sahadat_admin_session_token');
    } catch (e) {}
    setIsAuthenticated(false);
  };

  // Called when any tab requests a commit
  const handleRequestSave = (sectionName, updatedData) => {
    setPendingCommit({ sectionName, data: updatedData });
    setConfirmModalOpen(true);
  };

  // Called when user clicks "Confirm & Save" inside the confirmation modal
  const handleConfirmSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      if (pendingCommit.data) {
        if (typeof updateMultipleSections === 'function') {
          updateMultipleSections(pendingCommit.data);
        } else {
          Object.keys(pendingCommit.data).forEach((key) => {
            updateSection(key, pendingCommit.data[key]);
          });
        }
      }

      setIsSaving(false);
      setConfirmModalOpen(false);
      setToast({
        message: `✓ ${pendingCommit.sectionName} synchronized & saved to database successfully!`,
        type: 'success',
      });
      setPendingCommit({ sectionName: '', data: null });

      // Auto dismiss toast
      setTimeout(() => {
        setToast({ message: '', type: 'success' });
      }, 4000);
    }, 400);
  };

  // If not logged in, render the secure authentication portal
  if (!isAuthenticated) {
    return (
      <AdminLoginPortal
        authConfig={authConfig}
        currentTheme={currentTheme}
        onAuthenticated={() => setIsAuthenticated(true)}
      />
    );
  }

  const currentTabObj = ADMIN_TABS.find((t) => t.id === activeTab) || ADMIN_TABS[0];

  return (
    <div className="min-h-screen bg-[#000000] text-white flex font-chakra antialiased selection:bg-[#00F0FF] selection:text-black">
      {/* 1. Left Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onLogout={handleLogout}
        currentTheme={currentTheme}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen bg-[#040508]">
        {/* Top Sticky Navigation Bar */}
        <header className="sticky top-0 z-30 bg-[#06080e]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div
                className="text-[10px] font-mono tracking-widest uppercase font-bold flex items-center gap-1.5"
                style={{ color: currentTheme?.hex || '#00F0FF' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: currentTheme?.hex || '#00F0FF' }}
                />
                <span>TERMINAL // {currentTabObj.id.toUpperCase()}</span>
              </div>
              <h1 className="font-orbitron font-extrabold text-base sm:text-lg text-white uppercase tracking-wide">
                {currentTabObj.label}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Database Sync Status Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#80B82C] animate-pulse" />
              <span>DB: ONLINE</span>
            </div>

            {/* View Live Portfolio */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-chakra tracking-wider uppercase text-neutral-300 hover:text-white transition-colors"
            >
              <span>Preview</span>
              <ExternalLink className="w-3.5 h-3.5" style={{ color: currentTheme?.hex || '#00F0FF' }} />
            </a>

            {/* Logout Icon */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Tab Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">
          {activeTab === 'overview' && (
            <TabOverview
              data={data}
              currentTheme={currentTheme}
              onSelectTab={setActiveTab}
              onExportJSON={exportBackupJSON}
              onImportJSON={importBackupJSON}
              onResetDefaults={resetToDefaults}
              onRequestSave={handleRequestSave}
            />
          )}

          {activeTab === 'hero' && (
            <TabHero
              personalInfo={personalInfo}
              heroWords={heroWords}
              onRequestSave={handleRequestSave}
            />
          )}

          {activeTab === 'about' && (
            <TabAbout
              personalInfo={personalInfo}
              corePillars={data.corePillars}
              aboutCapabilities={data.aboutCapabilities}
              atAGlance={data.atAGlance}
              onRequestSave={handleRequestSave}
            />
          )}

          {activeTab === 'services' && (
            <TabServices
              services={data.services}
              processPhases={data.processPhases}
              onRequestSave={handleRequestSave}
            />
          )}

          {activeTab === 'projects' && (
            <TabProjects
              projects={projects}
              onRequestSave={handleRequestSave}
            />
          )}

          {activeTab === 'videos' && (
            <TabVideos
              videoGallery={videoGallery}
              onRequestSave={handleRequestSave}
            />
          )}

          {activeTab === 'pricing' && (
            <TabPricing
              pricing={pricing}
              onRequestSave={handleRequestSave}
            />
          )}

          {activeTab === 'reviews' && (
            <TabReviews
              testimonials={testimonials}
              onRequestSave={handleRequestSave}
            />
          )}

          {activeTab === 'faqs' && (
            <TabFaqs
              faqs={faqs}
              onRequestSave={handleRequestSave}
            />
          )}

          {activeTab === 'timeline' && (
            <TabTimeline
              timeline={timeline}
              onRequestSave={handleRequestSave}
            />
          )}

          {activeTab === 'contact' && (
            <TabContact
              personalInfo={personalInfo}
              onRequestSave={handleRequestSave}
            />
          )}

          {activeTab === 'theme' && (
            <TabThemeStudio
              currentTheme={currentTheme}
              onSelectTheme={setTheme}
              onRequestSave={handleRequestSave}
            />
          )}

          {activeTab === 'security' && (
            <TabSecurity
              authConfig={authConfig}
              onUpdateAuthConfig={updateAuthConfig}
              onRequestSave={handleRequestSave}
            />
          )}
        </main>
      </div>

      {/* Global Save Confirmation Modal */}
      <SaveConfirmModal
        isOpen={confirmModalOpen}
        sectionName={pendingCommit.sectionName}
        onConfirm={handleConfirmSave}
        onCancel={() => {
          setConfirmModalOpen(false);
          setPendingCommit({ sectionName: '', data: null });
        }}
        isLoading={isSaving}
      />

      {/* Global Toast Alert */}
      <CyberToast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
}
