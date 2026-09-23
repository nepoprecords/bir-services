import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface DeviceFrameToggleProps {
  isMobileFrame: boolean;
  onToggle: () => void;
  onPlaySound?: () => void;
}

export const DeviceFrameToggle: React.FC<DeviceFrameToggleProps> = ({
  isMobileFrame,
  onToggle,
  onPlaySound,
}) => {
  const handleClick = () => {
    if (onPlaySound) onPlaySound();
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle device frame preview"
      className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 transition-all shadow-md"
      title={isMobileFrame ? 'Switch to Full Screen View' : 'Preview in iPhone Mobile View'}
    >
      {isMobileFrame ? (
        <>
          <Monitor className="w-3.5 h-3.5 text-blue-400" />
          <span>Full Screen</span>
        </>
      ) : (
        <>
          <Smartphone className="w-3.5 h-3.5 text-[#FFB800]" />
          <span>iPhone View</span>
        </>
      )}
    </button>
  );
};
