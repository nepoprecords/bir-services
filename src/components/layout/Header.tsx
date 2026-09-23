import React from 'react';
import { Sparkles, Shield, User } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#FF6B00] via-[#FF8A34] to-[#FFB800] p-0.5 shadow-md shadow-orange-950/40 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-sm text-[#FFB800]">
              बीर
            </div>
          </div>
          <div>
            <span className="text-base font-black text-white tracking-tight flex items-center gap-1">
              {t.brand.name}
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            </span>
            <span className="text-[10px] text-slate-400 font-bold block -mt-0.5">
              {t.brand.tagline}
            </span>
          </div>
        </a>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Desktop Frame Switcher */}
          <DeviceFrameToggle
            isMobileFrame={isMobileFrame}
            onToggle={onToggleFrame}
            onPlaySound={onPlayClick}
          />

          {/* Sound Toggle */}
          <SoundToggle muted={muted} onToggle={onToggleSound} />

          {/* Language Toggle */}
          <LanguageToggle
            currentLang={lang}
            onToggle={onToggleLanguage}
            onPlaySound={onPlayClick}
          />

          {/* Dai Status Pill / Quick Trigger */}
          <button
            onClick={() => {
              onPlayClick();
              onOpenOnboard();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF6B00]/15 hover:bg-[#FF6B00]/25 border border-[#FF6B00]/40 text-amber-300 text-xs font-bold transition-all active:scale-95"
          >
            <Shield className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>{t.nav.joinCta}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
