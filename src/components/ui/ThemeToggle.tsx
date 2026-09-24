import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../../hooks/useTheme';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  onPlaySound?: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  onPlaySound,
}) => {
  const handleClick = () => {
    if (onPlaySound) onPlaySound();
    onToggle();
  };

  const isDark = theme === 'dark';

  return (
    <button
      onClick={handleClick}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300/80 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs font-bold shadow-sm"
      title={isDark ? 'Switch to Bright Daylight Theme' : 'Switch to Midnight Dark Theme'}
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span className="hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-indigo-600" />
          <span className="hidden sm:inline text-slate-700">Dark</span>
        </>
      )}
    </button>
  );
};
