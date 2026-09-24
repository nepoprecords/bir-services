import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Sparkles } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { TactileButton } from '../ui/TactileButton';

interface BottomDockProps {
  lang: Language;
  onOpenOnboard: () => void;
  onPlayClick: () => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  lang,
  onOpenOnboard,
  onPlayClick,
}) => {
  const t = translations[lang];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show after user has scrolled past the hero (e.g. > 380px)
      // This prevents competing with the Hero's primary CTA on initial screen load
      if (window.scrollY > 380) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-4 pointer-events-none"
        >
          <div className="max-w-md mx-auto pointer-events-auto">
            <div className="p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-slate-950/95 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-orange-500/15 dark:shadow-black/80 backdrop-blur-2xl flex items-center justify-between gap-3">
              {/* Live Alert text */}
              <div className="flex items-center gap-2 pl-2">
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <div className="text-left">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-bold">
                    LIVE GIGS
                  </span>
                  <span className="text-xs font-black text-slate-900 dark:text-white truncate max-w-[130px] sm:max-w-[170px] block">
                    {t.bottomDock.liveAlert}
                  </span>
                </div>
              </div>

              {/* Action CTA Button */}
              <TactileButton
                variant="orange"
                size="md"
                onPressSound={onPlayClick}
                onClick={onOpenOnboard}
                icon={<Zap className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-bounce" />}
              >
                {t.bottomDock.cta}
              </TactileButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
