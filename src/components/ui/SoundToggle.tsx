import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  muted: boolean;
  onToggle: () => void;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ muted, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
      className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-slate-300 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs font-medium"
      title={muted ? 'Turn sound ON' : 'Turn sound OFF'}
    >
      {muted ? (
        <>
          <VolumeX className="w-4 h-4 text-slate-400" />
          <span className="hidden sm:inline text-slate-400">Muted</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-[#FFB800] animate-pulse" />
          <span className="hidden sm:inline text-amber-300">SFX On</span>
        </>
      )}
    </button>
  );
};
