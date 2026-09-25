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
}

const CHAPTERS: Chapter[] = [
  {
    id: 'electrician',
    nameNe: 'विद्युत & ट्रान्सफर्मर',
    nameEn: 'Electrician on Pole',
    x: '38%',
    y: '44%',
    startTime: 0.0,
    endTime: 1.8,
    icon: Zap,
  },
  {
    id: 'motorcycle',
    nameNe: 'मोटरसाइकल वर्कसप',
    nameEn: 'Motorcycle Workshop',
    x: '20%',
    y: '66%',
    startTime: 2.5,
    endTime: 4.1,
    icon: Bike,
  },
  {
    id: 'plumbing',
    nameNe: 'पानी मोटर & पाइपलाइन',
    nameEn: 'Plumbing & Water Pump',
    x: '50%',
    y: '82%',
    startTime: 4.6,
    endTime: 6.6,
    icon: Wrench,
  },
  {
    id: 'carpentry',
    nameNe: 'सिकर्मी & घर संरचना',
    nameEn: 'Carpenters & Framing',
    x: '62%',
    y: '48%',
    startTime: 7.3,
    endTime: 9.0,
    icon: Hammer,
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

  // Loop current chapter within its exact defined boundaries
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
        {/* Video: stays still until user clicks an icon */}
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

        {/* Top-Left Card: Displays Active Playing Trade Name */}
        <div className="absolute top-3 left-3 flex items-center pointer-events-none z-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-white text-xs font-black shadow-lg">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span>
              {isPlaying
                ? lang === 'ne'
                  ? `बज्दैछ: ${activeChapter.nameNe}`
                  : `Playing: ${activeChapter.nameEn}`
                : lang === 'ne'
                ? 'बीर कार्यशाला (आइकन थिच्नुहोस्)'
                : 'Bir Diorama (Tap icon to play)'}
            </span>
          </div>
        </div>

        {/* Interactive Overlay Trade Icons Positioned Directly on Video (No Text Cards) */}
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
                aria-label={lang === 'ne' ? ch.nameNe : ch.nameEn}
                title={lang === 'ne' ? ch.nameNe : ch.nameEn}
                className={`relative p-2.5 sm:p-3 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 active:scale-95 shadow-xl ${
                  isActive
                    ? 'bg-[#FF6B00] text-white ring-2 ring-white scale-125 shadow-orange-500/60'
                    : 'bg-slate-950/80 hover:bg-slate-900 text-white border border-white/30 hover:scale-115 hover:border-amber-400'
                }`}
              >
                {/* Lottie-style Ping Ring when active */}
                {isActive && (
                  <span className="absolute -inset-1.5 rounded-full border-2 border-orange-400 animate-ping opacity-75 pointer-events-none" />
                )}

                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          );
        })}

        {/* Subtle Bottom Instruction */}
        <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between pointer-events-none">
          <div className="text-left text-white max-w-sm">
            <p className="text-[11px] font-bold text-amber-300 drop-shadow line-clamp-1">
              {lang === 'ne'
                ? '👆 भिडियोमा भएका आइकनहरू थिचेर सम्बन्धित काम हेर्नुहोस्'
                : '👆 Click the icons on the video to inspect each trade'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
