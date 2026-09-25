import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Wrench,
  Snowflake,
  Bike,
  Hammer,
  Paintbrush,
  Tv,
  Check,
  Flame,
  Sparkles,
} from 'lucide-react';
import { Language, TradeId } from '../../types';
import { TRADES_DATA, translations } from '../../i18n/translations';

interface StepTradeSelectProps {
  lang: Language;
  selectedTrade: TradeId | null;
  onSelect: (trade: TradeId) => void;
  onPlayPop: () => void;
}

export const StepTradeSelect: React.FC<StepTradeSelectProps> = ({
  lang,
  selectedTrade,
  onSelect,
  onPlayPop,
}) => {
  const t = translations[lang];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-cyan-500" />;
      case 'Snowflake':
        return <Snowflake className="w-5 h-5 text-teal-500" />;
      case 'Bike':
        return <Bike className="w-5 h-5 text-rose-500" />;
      case 'Hammer':
        return <Hammer className="w-5 h-5 text-amber-600" />;
      case 'Paintbrush':
        return <Paintbrush className="w-5 h-5 text-purple-500" />;
      case 'Tv':
        return <Tv className="w-5 h-5 text-emerald-500" />;
      default:
        return <Wrench className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div>
      <div className="text-center mb-5">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          {t.onboarding.step1Title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
          {t.onboarding.step1Subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
        {TRADES_DATA.map((trade) => {
          const isSelected = selectedTrade === trade.id;
          return (
            <motion.button
              key={trade.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onPlayPop();
                onSelect(trade.id);
              }}
              className={`
                relative p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between overflow-hidden
                ${
                  isSelected
                    ? 'bg-orange-500/10 dark:bg-orange-500/20 border-[#FF6B00] ring-2 ring-[#FF6B00]/50 shadow-md shadow-orange-500/10'
                    : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm'
                }
              `}
            >
              {/* Lottie-style Expanding Radiant Ripple on Selection */}
              <AnimatePresence>
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0.85, opacity: 0.9 }}
                    animate={{ scale: 1.35, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-2xl border-2 border-[#FF6B00] pointer-events-none"
                  />
                )}
              </AnimatePresence>

              <div className="flex items-center gap-3 relative z-10">
                <div
                  className={`p-2.5 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-[#FF6B00] text-white shadow-md shadow-orange-500/30'
                      : 'bg-slate-100 dark:bg-slate-700/80'
                  }`}
                >
                  {getIcon(trade.icon)}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {lang === 'ne' ? trade.titleNe : trade.titleEn}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      ~रू {trade.avgJobPayNPR}/काम
                    </span>

                    {/* Zero Emoji Clean SVG Badge */}
                    {trade.demandLevel === 'insane' && (
                      <span className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded bg-orange-500/15 dark:bg-orange-500/25 text-[#FF6B00] font-mono uppercase font-black">
                        <Flame className="w-2.5 h-2.5 text-[#FF6B00]" />
                        <span>HIGH DEMAND</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Lottie-style Spring Animated Checkmark with Scale Pop */}
              <div className="relative z-10 flex-shrink-0">
                {isSelected ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -25 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                    className="w-6 h-6 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-md shadow-orange-500/30"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </motion.div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
