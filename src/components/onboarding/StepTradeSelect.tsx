import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Wrench, Snowflake, Bike, Hammer, Paintbrush, Tv, CheckCircle } from 'lucide-react';
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
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-cyan-400" />;
      case 'Snowflake':
        return <Snowflake className="w-5 h-5 text-teal-400" />;
      case 'Bike':
        return <Bike className="w-5 h-5 text-rose-400" />;
      case 'Hammer':
        return <Hammer className="w-5 h-5 text-amber-500" />;
      case 'Paintbrush':
        return <Paintbrush className="w-5 h-5 text-purple-400" />;
      case 'Tv':
        return <Tv className="w-5 h-5 text-emerald-400" />;
      default:
        return <Wrench className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-black text-white">
          {t.onboarding.step1Title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {t.onboarding.step1Subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
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
                p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between
                ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-500/25 to-amber-500/20 border-[#FF6B00] shadow-md shadow-orange-950/40 ring-1 ring-[#FF6B00]'
                    : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-xl ${
                    isSelected ? 'bg-[#FF6B00] text-white' : 'bg-slate-700/80'
                  }`}
                >
                  {getIcon(trade.icon)}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">
                    {lang === 'ne' ? trade.titleNe : trade.titleEn}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-emerald-400 font-bold">
                      ~रू {trade.avgJobPayNPR}/काम
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono uppercase font-bold">
                      {trade.demandLevel === 'insane' ? '🔥 HIGH DEMAND' : 'POPULAR'}
                    </span>
                  </div>
                </div>
              </div>

              {isSelected && (
                <CheckCircle className="w-5 h-5 text-[#FF6B00] flex-shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
