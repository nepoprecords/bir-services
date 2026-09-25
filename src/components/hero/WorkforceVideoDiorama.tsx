import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, Bike, Wrench, Hammer } from 'lucide-react';
import { Language } from '../../types';

interface WorkforceVideoDioramaProps {
  lang: Language;
  onPlayClick?: () => void;
}

interface Chapter {
  id: string;
  nameNe: string;
  nameEn: string;
  x: string;
  y: string;
  startTime: number;
  endTime: number;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'electrician',
    nameNe: 'विद्युत & ट्रान्सफर्मर',
    nameEn: 'Electrician on Pole',
    x: '38%',
    y: '44%',
    startTime: 0.0,
    endTime: 2.4,
    icon: Zap,
    accentColor: 'text-amber-400 bg-amber-500/20 border-amber-400/40',
  },
  {
    id: 'motorcycle',
    nameNe: 'मोटरसाइकल वर्कसप',
    nameEn: 'Motorcycle Workshop',
    x: '20%',
    y: '66%',
    startTime: 2.5,
    endTime: 4.5,
    icon: Bike,
    accentColor: 'text-rose-400 bg-rose-500/20 border-rose-400/40',
  },
  {
    id: 'plumbing',
    nameNe: 'पानी मोटर & पाइपलाइन',
    nameEn: 'Plumbing & Water Pump',
    x: '50%',
    y: '82%',
    startTime: 4.6, // 0.5 sec earlier for exact match
    endTime: 7.2,
    icon: Wrench,
    accentColor: 'text-cyan-400 bg-cyan-500/20 border-cyan-400/40',
  },
  {
    id: 'carpentry',
    nameNe: 'सिकर्मी & संरचना',
    nameEn: 'Carpenters & Framing',
    x: '62%',
    y: '48%',
    startTime: 7.3,
    endTime: 10.0,
    icon: Hammer,
    accentColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-400/40',
  },
];

export const WorkforceVideoDiorama: React.FC<WorkforceVideoDioramaProps> = ({
  lang,
  onPlayClick,
}) => {
  const [activeChapterId, setActiveChapterId] = useState<string>('electrician');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeChapter = CHAPTERS.find((c) => c.id === activeChapterId) || CHAPTERS[0];

  // Jump to chapter, play segment, and smoothly scroll video into view
  const handleSelectChapter = (chapter: Chapter) => {
    if (onPlayClick) onPlayClick();
    setActiveChapterId(chapter.id);

    // Smooth scroll video into comfortable view
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    if (videoRef.current) {
      videoRef.current.currentTime = chapter.startTime;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  // Loop current chapter within its defined boundary
  const handleTimeUpdate = () => {
    if (!videoRef.current || !isPlaying) return;
    const current = videoRef.current.currentTime;

    if (current >= activeChapter.endTime || current < activeChapter.startTime) {
      videoRef.current.currentTime = activeChapter.startTime;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/10 dark:shadow-black/70 border border-slate-200/90 dark:border-slate-800 bg-slate-950"
    >
      <div className="relative aspect-video w-full overflow-hidden group">
        {/* Video: stays still until user clicks an overlay trade button */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          poster="/assets/bir-diorama-hd.jpg"
          className="w-full h-full object-cover object-center"
        >
          <source src="/assets/bir-workforce-hero.mp4" type="video/mp4" />
          <img
            src="/assets/bir-diorama-hd.jpg"
            alt="Bir Tradesmen Living Diorama"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Ambient Warm Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/40 pointer-events-none" />

        {/* Top Minimal Badge */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-black">
            <span
              className={`w-2 h-2 rounded-full ${
                isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span>
              {isPlaying
                ? lang === 'ne'
                  ? `बज्दैछ: ${activeChapter.nameNe}`
                  : `Playing: ${activeChapter.nameEn}`
                : lang === 'ne'
                ? 'बीर कार्यशाला (क्लिक गरी सुरु गर्नुहोस्)'
                : 'Bir Diorama (Click trade to play)'}
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-[10px] text-slate-300 font-mono border border-white/10">
            <span>{activeChapter.startTime}s</span>
            <span>-</span>
            <span>{activeChapter.endTime}s</span>
          </div>
        </div>

        {/* Interactive Overlay Trade Hotspot Buttons Positioned Directly on Video */}
        {CHAPTERS.map((ch) => {
          const Icon = ch.icon;
          const isActive = ch.id === activeChapterId;

          return (
            <div
              key={ch.id}
              style={{ left: ch.x, top: ch.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-20"
            >
              <button
                onClick={() => handleSelectChapter(ch)}
                className={`group/btn relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 active:scale-95 shadow-xl ${
                  isActive
                    ? 'bg-[#FF6B00] text-white ring-2 ring-white scale-110 shadow-orange-500/50'
                    : 'bg-slate-950/85 hover:bg-slate-900 text-white border border-white/30 hover:scale-105'
                }`}
                title={lang === 'ne' ? ch.nameNe : ch.nameEn}
              >
                {/* Ping ring when active */}
                {isActive && (
                  <span className="absolute -inset-1 rounded-full border-2 border-orange-400 animate-ping opacity-75 pointer-events-none" />
                )}

                <div
                  className={`p-1 rounded-full ${
                    isActive ? 'bg-white text-[#FF6B00]' : 'bg-white/20 text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <span className="text-[11px] font-black tracking-tight whitespace-nowrap pr-0.5">
                  {lang === 'ne' ? ch.nameNe : ch.nameEn}
                </span>
              </button>
            </div>
          );
        })}

        {/* Subtle Bottom Caption */}
        <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between pointer-events-none">
          <div className="text-left text-white max-w-sm">
            <p className="text-[11px] font-bold text-amber-300 drop-shadow line-clamp-1">
              {lang === 'ne'
                ? '👆 कुनै पनि पेशामा ट्याप गर्नुहोस् — सिधै त्यो दृश्य खुल्नेछ'
                : '👆 Tap any trade button above to seek and play that segment'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
