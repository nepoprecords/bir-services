import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { useLanguage } from './hooks/useLanguage';
import { useSoundEffects } from './hooks/useSoundEffects';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/hero/HeroSection';
import { NeighborlyServices } from './components/services/NeighborlyServices';
import { KamaiCalculator } from './components/calculator/KamaiCalculator';
import { WhyBirSection } from './components/benefits/WhyBirSection';
import { HowItWorksSection } from './components/benefits/HowItWorksSection';
import { DaiStoriesSection } from './components/stories/DaiStoriesSection';
import { Footer } from './components/layout/Footer';
import { BottomDock } from './components/layout/BottomDock';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { AdminLeadsDrawer } from './components/admin/AdminLeadsDrawer';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export function App() {
  const { lang, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const {
    muted,
    toggleMute,
    playClick,
    playPop,
    playRatchet,
    playSuccess,
    playFanfare,
  } = useSoundEffects();

  const [isOnboardOpen, setIsOnboardOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  // Smooth inertial scrolling with Lenis
  useEffect(() => {
    if (isMobileFrame) return; // Use native scroll inside mockup container

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isMobileFrame]);

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenOnboard = () => {
    playPop();
    setIsOnboardOpen(true);
  };

  const handleCloseOnboard = () => {
    setIsOnboardOpen(false);
  };

  const appContent = (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0B0F19] text-slate-900 dark:text-white flex flex-col relative transition-colors duration-300 selection:bg-[#FF6B00] selection:text-white">
      {/* Header */}
      <Header
        lang={lang}
        onToggleLanguage={toggleLanguage}
        muted={muted}
        onToggleSound={toggleMute}
        theme={theme}
        onToggleTheme={toggleTheme}
        isMobileFrame={isMobileFrame}
        onToggleFrame={() => setIsMobileFrame((prev) => !prev)}
        onOpenOnboard={handleOpenOnboard}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onPlayClick={playClick}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          lang={lang}
          isDark={theme === 'dark'}
          onOpenOnboard={handleOpenOnboard}
          onScrollToCalc={scrollToCalculator}
          onScrollToServices={scrollToServices}
          onPlayClick={playClick}
          onPlayPop={playPop}
        />

        {/* 2. Neighborly / Frontdoor Home Services */}
        <NeighborlyServices
          lang={lang}
          onOpenOnboard={handleOpenOnboard}
          onPlayClick={playClick}
          onPlayPop={playPop}
        />

        {/* 3. Dai Kamai Meter (Calculator) */}
        <KamaiCalculator
          lang={lang}
          onOpenOnboard={handleOpenOnboard}
          onPlayClick={playClick}
          onPlayRatchet={playRatchet}
        />

        {/* 4. Why Bir? (Dignity & 0% Commission) */}
        <WhyBirSection lang={lang} onPlayPop={playPop} />

        {/* 5. How It Works (3 Steps) */}
        <HowItWorksSection
          lang={lang}
          onOpenOnboard={handleOpenOnboard}
          onPlayClick={playClick}
        />

        {/* 6. Dai Stories (Voices of the Birs) */}
        <DaiStoriesSection lang={lang} onPlayClick={playClick} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Sticky Native Mobile Bottom Action Dock */}
      <BottomDock
        lang={lang}
        onOpenOnboard={handleOpenOnboard}
        onPlayClick={playClick}
      />

      {/* 4-Step Gamified Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardOpen}
        onClose={handleCloseOnboard}
        lang={lang}
        onPlayClick={playClick}
        onPlayPop={playPop}
        onPlayRatchet={playRatchet}
        onPlaySuccess={playSuccess}
        onPlayFanfare={playFanfare}
      />

      {/* Admin Leads Drawer for viewing registered providers & CSV export */}
      <AdminLeadsDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onPlayClick={playClick}
      />
    </div>
  );

  // If mobile frame is activated on large screen, wrap inside realistic iPhone frame
  if (isMobileFrame) {
    return (
      <div className="min-h-screen bg-slate-950 py-8 px-4 flex flex-col items-center justify-center">
        {/* Frame Toggle Controls Header */}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400">
            📱 iPhone 16 Pro Viewport Simulation
          </span>
          <button
            onClick={() => setIsMobileFrame(false)}
            className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
          >
            Switch to Fullscreen
          </button>
        </div>

        {/* Device Frame */}
        <div className="w-[414px] h-[860px] rounded-[52px] border-[12px] border-slate-800 bg-[#0B0F19] shadow-2xl shadow-black relative overflow-hidden flex flex-col ring-1 ring-slate-700">
          {/* Status Bar */}
          <div className="h-10 w-full bg-[#0B0F19] flex items-center justify-between px-7 pt-2 select-none z-50">
            <span className="text-xs font-bold text-white tracking-wider">9:41</span>
            
            {/* Dynamic Island */}
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1" />
              <span className="text-[9px] font-mono text-[#FFB800] font-black">BIR DAI</span>
            </div>

            <div className="flex items-center gap-1.5 text-white">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <BatteryMedium className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* App Scrollable Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
            {appContent}
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="h-4 w-full bg-transparent flex items-center justify-center pb-1 pointer-events-none z-50">
            <div className="w-32 h-1 bg-slate-600 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return appContent;
}

export default App;
