import React from 'react';
import { Sparkles, MapPin, Zap } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { SoundToggle } from '../ui/SoundToggle';
import { LanguageToggle } from '../ui/LanguageToggle';
import { DeviceFrameToggle } from '../ui/DeviceFrameToggle';

interface HeaderProps {
  lang: Language;
  onToggleLanguage: () => void;
  muted: boolean;
  onToggleSound: () => void;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
  onOpenOnboard: () => void;
  onPlayClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLanguage,
  muted,
  onToggleSound,
  isMobileFrame,
  onToggleFrame,
  onOpenOnboard,
  onPlayClick,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F19]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Clean Logo: Just "BIR" with accent dot */}
        <a href="#" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF6B00] via-[#FF8A34] to-[#FFB800] p-0.5 shadow-md shadow-orange-950/40 group-hover:scale-105 transition-transform flex items-center justify-center">
            <span className="font-black text-xs text-slate-950 tracking-tighter">
              BIR
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-black tracking-tight text-white flex items-center">
              BIR
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] ml-0.5 inline-block" />
            </span>
            {/* Subtle City Tag on Desktop */}
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-[10px] font-bold text-amber-300">
              <MapPin className="w-2.5 h-2.5 text-[#FF6B00]" />
              विराटनगर (Biratnagar)
            </span>
          </div>
        </a>

        {/* Center Nav Links (Desktop Only) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-300">
          <a
            href="#calculator"
            className="hover:text-[#FF6B00] transition-colors"
          >
            {t.nav.calculator}
          </a>
          <a
            href="#benefits"
            className="hover:text-[#FF6B00] transition-colors"
          >
            {t.nav.whyBir}
          </a>
          <a
            href="#stories"
            className="hover:text-[#FF6B00] transition-colors"
          >
            {t.nav.stories}
          </a>
        </nav>

        {/* Right Controls: Minimal, uncrowded */}
        <div className="flex items-center gap-2">
          {/* Desktop Frame Switcher (Hidden on Mobile) */}
          <DeviceFrameToggle
            isMobileFrame={isMobileFrame}
            onToggle={onToggleFrame}
            onPlaySound={onPlayClick}
          />

          {/* Sound Toggle (Clean Icon) */}
          <SoundToggle muted={muted} onToggle={onToggleSound} />

          {/* Language Toggle (Clean Pill) */}
          <LanguageToggle
            currentLang={lang}
            onToggle={onToggleLanguage}
            onPlaySound={onPlayClick}
          />

          {/* Desktop Quick CTA */}
          <button
            onClick={() => {
              onPlayClick();
              onOpenOnboard();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF6B00] hover:bg-[#FF7A1A] text-white text-xs font-black shadow-md shadow-orange-950/40 transition-all active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>{t.nav.joinCta}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
