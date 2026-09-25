import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Zap, Bike, Wrench, Hammer, Video, Copy, Check, Sparkles, RefreshCw } from 'lucide-react';
import { Language } from '../../types';

interface WorkforceVideoDioramaProps {
  lang: Language;
  onPlayClick?: () => void;
}

interface Chapter {
  id: string;
  nameNe: string;
  nameEn: string;
  startTime: number;
  endTime: number;
  toolsNe: string;
  toolsEn: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'electrician',
    nameNe: 'विद्युत & ट्रान्सफर्मर',
    nameEn: 'Electrician & Pole',
    startTime: 0.0,
    endTime: 2.4,
    toolsNe: 'स्पार्क, सेफ्टी हार्नेस, टेस्ट पेन्सिल, तार',
    toolsEn: 'Sparks, safety harness, test pencil, insulated wire',
    icon: Zap,
    accentColor: 'text-amber-500 border-amber-500 bg-amber-500/10',
  },
  {
    id: 'motorcycle',
    nameNe: 'मोटरसाइकल वर्कसप',
    nameEn: 'Motorcycle Garage',
    startTime: 2.5,
    endTime: 5.0,
    toolsNe: 'इन्जिन लिफ्ट, स्प्यानर, टायर लिभर, मोबिल',
    toolsEn: 'Engine lift, spanners, tire levers, engine oil',
    icon: Bike,
    accentColor: 'text-rose-500 border-rose-500 bg-rose-500/10',
  },
  {
    id: 'plumbing',
    nameNe: 'पानी मोटर & पाइपलाइन',
    nameEn: 'Plumbing & Pipes',
    startTime: 5.1,
    endTime: 7.2,
    toolsNe: 'पीभीसी पाइप, पाइप रेन्च, टेफ्लोन टेप, गेट भल्भ',
    toolsEn: 'PVC pipes, pipe wrench, teflon tape, gate valves',
    icon: Wrench,
    accentColor: 'text-cyan-500 border-cyan-500 bg-cyan-500/10',
  },
  {
    id: 'carpentry',
    nameNe: 'सिकर्मी & घर संरचना',
    nameEn: 'Carpenters & Framing',
    startTime: 7.3,
    endTime: 10.0,
    toolsNe: 'काठको आरा, हथौडा, लेभल स्केल, छानाको फ्रेम',
    toolsEn: 'Hand saw, framing hammer, spirit level, roof timber',
    icon: Hammer,
    accentColor: 'text-emerald-500 border-emerald-500 bg-emerald-500/10',
  },
];

export const WorkforceVideoDiorama: React.FC<WorkforceVideoDioramaProps> = ({
  lang,
  onPlayClick,
}) => {
  const [activeChapterId, setActiveChapterId] = useState<string>('electrician');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showPromptModal, setShowPromptModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeChapter = CHAPTERS.find((c) => c.id === activeChapterId) || CHAPTERS[0];

  const veoPrompt = `Cinematic tilt-shift miniature living diorama of skilled Nepali tradesmen at work in a sunlit Himalayan mountain village, 4k resolution, 60fps. Macro photography with shallow depth of field. A blue-overalled electrician works on a wooden electrical utility pole with small electrical sparks. A roadside motorcycle workshop with a classic Enfield on a lift where a mechanic adjusts the engine. Plumbers install white PVC and copper water pipelines along stone irrigation canals. Skilled carpenters construct the timber frame of a red brick Nepali house with hammers and saws. Slow gentle cinematic camera pan from left to right. Soft warm morning sunlight, prayer flags gently fluttering in the mountain breeze, snow-capped Annapurna peaks in the far background. Highly detailed, photorealistic miniature model style, smooth fluid motion.`;

  // Jump to chapter and play segment
  const handleSelectChapter = (chapter: Chapter) => {
    if (onPlayClick) onPlayClick();
    setActiveChapterId(chapter.id);

    if (videoRef.current) {
      videoRef.current.currentTime = chapter.startTime;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleTogglePlay = () => {
    if (onPlayClick) onPlayClick();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Loop current chapter within its boundaries
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;

    if (current >= activeChapter.endTime) {
      videoRef.current.currentTime = activeChapter.startTime;
    }
  };

  const handleCopyPrompt = () => {
    if (onPlayClick) onPlayClick();
    navigator.clipboard.writeText(veoPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/10 dark:shadow-black/70 border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950 p-2 sm:p-3">
      {/* 1. Chapter Tool Selector Tabs (Click to Seek Video Scene) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-2.5">
        {CHAPTERS.map((ch) => {
          const Icon = ch.icon;
          const isActive = ch.id === activeChapterId;
          return (
            <button
              key={ch.id}
              onClick={() => handleSelectChapter(ch)}
              className={`
                p-2 rounded-2xl border text-left flex items-center gap-2 transition-all relative overflow-hidden
                ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                }
              `}
            >
              <div
                className={`p-1.5 rounded-xl ${
                  isActive
                    ? 'bg-[#FF6B00] text-white'
                    : 'bg-white dark:bg-slate-800 text-[#FF6B00]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-black block truncate leading-tight">
                  {lang === 'ne' ? ch.nameNe : ch.nameEn}
                </span>
                <span className="text-[9px] opacity-75 font-mono block">
                  {ch.startTime}s - {ch.endTime}s
                </span>
              </div>

              {isActive && isPlaying && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Video Player with Scene Hotspots & Overlays */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden group bg-black">
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

        {/* Top Control Bar */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-auto">
          {/* Active Chapter Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {lang === 'ne' ? 'अहिले बज्दैछ: ' : 'Now Playing: '}
              <strong className="text-amber-400">
                {lang === 'ne' ? activeChapter.nameNe : activeChapter.nameEn}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Play / Pause Toggle Button */}
            <button
              onClick={handleTogglePlay}
              className="p-1.5 rounded-full bg-slate-950/85 hover:bg-slate-900 border border-white/20 text-white text-xs shadow-md transition-all active:scale-95"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            </button>

            {/* Veo Prompt Modal Trigger */}
            <button
              onClick={() => {
                if (onPlayClick) onPlayClick();
                setShowPromptModal(true);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FF6B00] hover:bg-[#FF8A34] text-white text-[10px] font-bold shadow-md transition-all active:scale-95"
              title="Google Veo Prompt"
            >
              <Video className="w-3 h-3" />
              <span>{lang === 'ne' ? 'Veo प्रम्प्ट' : 'Veo Prompt'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Tools Indicator Pill */}
        <div className="absolute bottom-2.5 inset-x-2.5 flex items-end justify-between pointer-events-none">
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white max-w-sm">
            <span className="text-[9px] uppercase font-bold tracking-wider text-amber-400 block">
              {lang === 'ne' ? '🛠️ दृश्यमा प्रयोग भएका उपकरणहरू:' : '🛠️ Tools Active in Scene:'}
            </span>
            <p className="text-[11px] font-medium text-slate-200 leading-tight">
              {lang === 'ne' ? activeChapter.toolsNe : activeChapter.toolsEn}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-full border border-white/10 font-mono">
            <span>{activeChapter.startTime}s</span>
            <span>-</span>
            <span>{activeChapter.endTime}s</span>
          </div>
        </div>
      </div>

      {/* 3. Modal: Google Veo Video Prompt Generator */}
      <AnimatePresence>
        {showPromptModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 p-6 text-white shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#FF6B00]/20 text-[#FF8A34]">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black">Google Veo Video Prompt</h3>
                    <p className="text-[11px] text-slate-400">
                      Use in Google Veo, VideoFX, Vertex AI, or Runway
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPromptModal(false)}
                  className="text-slate-400 hover:text-white text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono select-all mb-4 max-h-48 overflow-y-auto">
                {veoPrompt}
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] text-slate-400">
                  Save generated video to: <code className="text-[#FFB800]">public/assets/bir-workforce-hero.mp4</code>
                </p>

                <button
                  onClick={handleCopyPrompt}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#FF7A1A] text-white text-xs font-black shadow-md transition-all active:scale-95 flex-shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
