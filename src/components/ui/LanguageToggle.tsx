import React from 'react';
import { Language } from '../../types';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLang: Language;
  onToggle: () => void;
  onPlaySound?: () => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onToggle, onPlaySound }) => {
  const handleClick = () => {
    if (onPlaySound) onPlaySound();
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-slate-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs font-bold"
    >
      <Globe className="w-3.5 h-3.5 text-[#FF6B00]" />
      <span>{currentLang === 'ne' ? 'नेपाली' : 'English'}</span>
      <span className="text-[10px] text-slate-400 uppercase bg-slate-700/80 px-1 rounded font-mono">
        {currentLang === 'ne' ? 'EN' : 'ने'}
      </span>
    </button>
  );
};
