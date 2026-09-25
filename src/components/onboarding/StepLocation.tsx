import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Check, Info } from 'lucide-react';
import { Language } from '../../types';
import { BIRATNAGAR_HUBS, translations } from '../../i18n/translations';

interface StepLocationProps {
  lang: Language;
  selectedHubs: string[];
  onToggleHub: (hub: string) => void;
  onPlayPop: () => void;
}

export const StepLocation: React.FC<StepLocationProps> = ({
  lang,
  selectedHubs,
  onToggleHub,
  onPlayPop,
}) => {
  const t = translations[lang];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          {t.onboarding.step3Title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
          {t.onboarding.step3Subtitle}
        </p>
      </div>

      <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
        {BIRATNAGAR_HUBS.map((hub) => {
          const isSelected = selectedHubs.includes(hub);
          return (
            <motion.button
              key={hub}
              type="button"
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                onPlayPop();
                onToggleHub(hub);
              }}
              className={`
                relative w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all overflow-hidden
                ${
                  isSelected
                    ? 'bg-orange-500/10 dark:bg-orange-500/20 border-[#FF6B00] ring-2 ring-[#FF6B00]/40 text-slate-900 dark:text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }
              `}
            >
              {/* Lottie-style Expanding Radiant Ripple on Selection */}
              <AnimatePresence>
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0.9, opacity: 0.8 }}
                    animate={{ scale: 1.25, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-2xl border-2 border-[#FF6B00] pointer-events-none"
                  />
                )}
              </AnimatePresence>

              <div className="flex items-center gap-3 relative z-10">
                <div
                  className={`p-2 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-[#FF6B00] text-white shadow-md shadow-orange-500/20'
                      : 'bg-slate-100 dark:bg-slate-700/80 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold">{hub}</span>
              </div>

              {/* Lottie-style Spring Animated Checkmark */}
              <div className="relative z-10 flex-shrink-0">
                {isSelected ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -25 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                    className="w-5 h-5 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </motion.div>
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Tip Box with Clean SVG Icon (Zero Emoji) */}
      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-700 dark:text-amber-300 font-semibold flex items-center justify-center gap-2">
        <Info className="w-4 h-4 text-amber-500 flex-shrink-0" />
        <span>
          {lang === 'ne'
            ? 'तपाईंले २ वा सोभन्दा बढी एरिया रोज्न सक्नुहुन्छ'
            : 'You can select 2 or more areas for more job dispatches'}
        </span>
      </div>
    </div>
  );
};
