import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Video, Copy, Check, Eye, Maximize2 } from 'lucide-react';
import { Language } from '../../types';

interface WorkforceVideoDioramaProps {
  lang: Language;
  onPlayClick?: () => void;
}

export const WorkforceVideoDiorama: React.FC<WorkforceVideoDioramaProps> = ({
  lang,
  onPlayClick,
}) => {
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const veoPrompt = `Cinematic tilt-shift miniature living diorama of skilled Nepali tradesmen at work in a sunlit Himalayan mountain village, 4k resolution, 60fps. Macro photography with shallow depth of field. A blue-overalled electrician works on a wooden electrical utility pole with small electrical sparks. A roadside motorcycle workshop with a classic Enfield on a lift where a mechanic adjusts the engine. Plumbers install white PVC and copper water pipelines along stone irrigation canals. Skilled carpenters construct the timber frame of a red brick Nepali house with hammers and saws. Slow gentle cinematic camera pan from left to right. Soft warm morning sunlight, prayer flags gently fluttering in the mountain breeze, snow-capped Annapurna peaks in the far background. Highly detailed, photorealistic miniature model style, smooth fluid motion.`;

  const handleCopyPrompt = () => {
    if (onPlayClick) onPlayClick();
    navigator.clipboard.writeText(veoPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const hotspots = [
    {
      id: 'electrician',
      x: '38%',
      y: '48%',
      titleNe: 'बिजुली & ट्रान्सफर्मर',
      titleEn: 'Electrician on Utility Pole',
      icon: '⚡️',
    },
    {
      id: 'garage',
      x: '20%',
      y: '68%',
      titleNe: 'मोटरसाइकल वर्कसप',
      titleEn: 'Motorcycle Garage Repair',
      icon: '🏍️',
    },
    {
      id: 'carpentry',
      x: '55%',
      y: '50%',
      titleNe: 'सिकर्मी & घर संरचना',
      titleEn: 'Carpenters & Framing',
      icon: '🪚',
    },
    {
      id: 'plumbing',
      x: '52%',
      y: '85%',
      titleNe: 'पानी मोटर & पाइपलाइन',
      titleEn: 'Plumbing & Water Lines',
      icon: '💧',
    },
  ];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/10 dark:shadow-black/70 border border-slate-200/90 dark:border-slate-800 bg-slate-950">
      {/* Diorama Video / Image Container */}
      <div className="relative aspect-video w-full overflow-hidden group">
        {/* Video tag with image fallback */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/bir-diorama-hd.jpg"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        >
          <source src="/assets/bir-workforce-hero.mp4" type="video/mp4" />
          <img
            src="/assets/bir-diorama-hd.jpg"
            alt="Bir Tradesmen Living Diorama"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Ambient Warm Vignette & Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-black">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{lang === 'ne' ? 'बीर कार्यशाला (Living Diorama)' : 'Bir Living Diorama'}</span>
          </div>

          <button
            onClick={() => {
              if (onPlayClick) onPlayClick();
              setShowPromptModal(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00] hover:bg-[#FF8A34] text-white text-[11px] font-black shadow-md transition-all active:scale-95"
            title="Google Veo / Video Prompt"
          >
            <Video className="w-3.5 h-3.5" />
            <span>{lang === 'ne' ? 'Veo भिडियो प्रम्प्ट' : 'Google Veo Prompt'}</span>
          </button>
        </div>

        {/* Interactive Diorama Hotspots */}
        {hotspots.map((hs) => (
          <div
            key={hs.id}
            style={{ left: hs.x, top: hs.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-20"
          >
            <button
              onClick={() => {
                if (onPlayClick) onPlayClick();
                setActiveHotspot(activeHotspot === hs.id ? null : hs.id);
              }}
              className="relative p-1.5 rounded-full bg-amber-400/90 text-slate-950 text-xs shadow-lg hover:scale-125 transition-transform flex items-center justify-center animate-bounce"
            >
              <span className="text-xs">{hs.icon}</span>
              <span className="absolute -inset-1 rounded-full border border-amber-300 animate-ping opacity-60 pointer-events-none" />
            </button>

            {/* Hotspot Tooltip */}
            {activeHotspot === hs.id && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap px-3 py-1 rounded-xl bg-slate-900/95 border border-amber-500/40 text-amber-300 text-[11px] font-bold shadow-xl backdrop-blur-md"
              >
                {lang === 'ne' ? hs.titleNe : hs.titleEn}
              </motion.div>
            )}
          </div>
        ))}

        {/* Bottom Caption Overlay */}
        <div className="absolute bottom-3 inset-x-3 flex items-end justify-between pointer-events-none">
          <div className="text-left text-white max-w-xs">
            <h5 className="text-xs sm:text-sm font-black text-amber-300 drop-shadow">
              {lang === 'ne' ? 'नेपालका वीर कामदारहरू' : 'The Skilled Workforce of Nepal'}
            </h5>
            <p className="text-[10px] sm:text-[11px] text-slate-300 drop-shadow line-clamp-1">
              {lang === 'ne'
                ? 'विद्युत, वर्कसप, प्लम्बिङ र निर्माण — एउटै डिजिटल नेटवर्कमा'
                : 'Electrical, mechanics, plumbing & carpentry on one network'}
            </p>
          </div>
        </div>
      </div>

      {/* Modal: Google Veo / Video Prompt Generator */}
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
