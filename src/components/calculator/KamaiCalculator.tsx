import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Zap,
  Wrench,
  Snowflake,
  Bike,
  Hammer,
  Paintbrush,
  Tv,
  Coins,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Language, TradeId } from '../../types';
import { TRADES_DATA, translations } from '../../i18n/translations';
import { TactileButton } from '../ui/TactileButton';

interface KamaiCalculatorProps {
  lang: Language;
  onOpenOnboard: () => void;
  onPlayClick: () => void;
  onPlayRatchet: () => void;
}

export const KamaiCalculator: React.FC<KamaiCalculatorProps> = ({
  lang,
  onOpenOnboard,
  onPlayClick,
  onPlayRatchet,
}) => {
  const t = translations[lang];
  const [selectedTrade, setSelectedTrade] = useState<TradeId>('ac_repair');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [jobsPerDay, setJobsPerDay] = useState<number>(3);
  const daysSliderId = useId();
  const jobsSliderId = useId();

  const currentTradeData = TRADES_DATA.find((tr) => tr.id === selectedTrade) || TRADES_DATA[0];

  // Monthly estimate = avgPay * jobsPerDay * daysPerWeek * 4.3 (weeks in month)
  const monthlyKamai = Math.round(
    currentTradeData.avgJobPayNPR * jobsPerDay * daysPerWeek * 4.33
  );

  const localShopSalary = 24000;
  const multiplier = (monthlyKamai / localShopSalary).toFixed(1);

  const getTradeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'Wrench':
        return <Wrench className="w-4 h-4 text-blue-500" />;
      case 'Snowflake':
        return <Snowflake className="w-4 h-4 text-cyan-500" />;
      case 'Bike':
        return <Bike className="w-4 h-4 text-rose-500" />;
      case 'Hammer':
        return <Hammer className="w-4 h-4 text-amber-600" />;
      case 'Paintbrush':
        return <Paintbrush className="w-4 h-4 text-purple-500" />;
      case 'Tv':
        return <Tv className="w-4 h-4 text-emerald-500" />;
      default:
        return <Wrench className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <section id="calculator" className="relative py-14 px-4 scroll-mt-16 bg-white dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/15 border border-[#FFB800]/30 text-amber-600 dark:text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
            <Coins className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.calculator.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.calculator.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto font-medium">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Interactive Calculator Card with Scroll Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="rounded-3xl bg-slate-50/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xl p-5 sm:p-7 relative overflow-hidden backdrop-blur-xl"
        >
          {/* Trade Superpower Selector */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
              {t.calculator.selectSkill}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TRADES_DATA.map((trade) => {
                const isSelected = trade.id === selectedTrade;
                return (
                  <button
                    key={trade.id}
                    onClick={() => {
                      onPlayClick();
                      setSelectedTrade(trade.id);
                    }}
                    className={`
                      flex items-center gap-2 p-2.5 rounded-2xl text-xs font-bold text-left transition-all border
                      ${
                        isSelected
                          ? 'bg-[#FF6B00]/10 dark:bg-orange-500/20 border-[#FF6B00] text-slate-900 dark:text-white shadow-sm ring-1 ring-[#FF6B00]'
                          : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:border-slate-400'
                      }
                    `}
                  >
                    <div
                      className={`p-1.5 rounded-xl ${
                        isSelected ? 'bg-[#FF6B00] text-white' : 'bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {getTradeIcon(trade.icon)}
                    </div>
                    <span className="line-clamp-1 font-bold">
                      {lang === 'ne' ? trade.titleNe : trade.titleEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sliders: Days per week & Jobs per day */}
          <div className="space-y-5 mb-8 bg-white dark:bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm">
            {/* Days Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <label htmlFor={daysSliderId} className="text-slate-700 dark:text-slate-300">{t.calculator.workDays}</label>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] font-black text-sm font-mono">
                  {daysPerWeek} {t.calculator.daysLabel}
                </span>
              </div>
              <input
                id={daysSliderId}
                type="range"
                min="1"
                max="7"
                step="1"
                value={daysPerWeek}
                onChange={(e) => {
                  onPlayRatchet();
                  setDaysPerWeek(Number(e.target.value));
                }}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>1 दिन</span>
                <span>4 दिन</span>
                <span>7 दिन (फुल टाइम)</span>
              </div>
            </div>

            {/* Jobs Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <label htmlFor={jobsSliderId} className="text-slate-700 dark:text-slate-300">{t.calculator.jobsPerDay}</label>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-sm font-mono">
                  {jobsPerDay} {t.calculator.jobsLabel}
                </span>
              </div>
              <input
                id={jobsSliderId}
                type="range"
                min="1"
                max="6"
                step="1"
                value={jobsPerDay}
                onChange={(e) => {
                  onPlayRatchet();
                  setJobsPerDay(Number(e.target.value));
                }}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>१ काम (सजिलो)</span>
                <span>३ काम (सामान्य)</span>
                <span>६ काम (सुपर-दाई)</span>
              </div>
            </div>
          </div>

          {/* Earnings Display Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#FF6B00]/10 via-amber-500/5 to-white dark:from-[#FF6B00]/20 dark:via-slate-800/80 dark:to-slate-900 border-2 border-[#FF6B00]/30 text-center relative overflow-hidden mb-6 shadow-md">
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-widest block mb-1">
              {t.calculator.estimatedMonthly}
            </span>

            {/* Big Rupee Number */}
            <div className="flex items-center justify-center gap-1.5 text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
              <span className="text-[#FF6B00]">{t.calculator.rupees}</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={monthlyKamai}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="font-mono tracking-tight"
                >
                  {monthlyKamai.toLocaleString('en-US')}
                </motion.span>
              </AnimatePresence>
              <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
                {t.calculator.perMonth}
              </span>
            </div>

            {/* Comparison Pill */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                {multiplier}x {lang === 'ne' ? 'स्थानिय पसल तलब भन्दा बढी!' : 'higher than local shop wages!'}
              </span>
            </div>

            {monthlyKamai > 75000 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-2.5 text-xs text-amber-700 dark:text-amber-200 font-bold flex items-center justify-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {lang === 'ne'
                    ? '🔥 बब्बाल कमाई! विराटनगरका बैंक अफिसर भन्दा धेरै!'
                    : '🔥 Outstanding! Out-earning corporate manager salaries!'}
                </span>
              </motion.div>
            )}
          </div>

          {/* Calculator CTA Button */}
          <TactileButton
            variant="orange"
            size="lg"
            fullWidth
            onPressSound={onPlayClick}
            onClick={onOpenOnboard}
            icon={<ArrowRight className="w-5 h-5 text-white" />}
          >
            {t.calculator.calcCta}
          </TactileButton>

          <p className="text-[10px] text-slate-400 text-center mt-3 font-medium">
            {t.calculator.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
