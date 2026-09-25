import React, { useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Bike, Bus, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface StepExperienceProps {
  lang: Language;
  experienceYears: number;
  hasOwnTools: boolean;
  hasVehicle: 'bike' | 'scooter' | 'public_transit' | 'none';
  onChangeYears: (years: number) => void;
  onChangeTools: (hasTools: boolean) => void;
  onChangeVehicle: (vehicle: 'bike' | 'scooter' | 'public_transit' | 'none') => void;
  onPlayClick: () => void;
  onPlayRatchet: () => void;
}

export const StepExperience: React.FC<StepExperienceProps> = ({
  lang,
  experienceYears,
  hasOwnTools,
  hasVehicle,
  onChangeYears,
  onChangeTools,
  onChangeVehicle,
  onPlayClick,
  onPlayRatchet,
}) => {
  const t = translations[lang];
  const expYearsId = useId();

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          {t.onboarding.step2Title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
          {t.onboarding.step2Subtitle}
        </p>
      </div>

      {/* Experience Years Slider */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor={expYearsId} className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {t.onboarding.expYears}
          </label>
          <span className="px-3 py-1 rounded-full bg-orange-500/15 text-[#FF6B00] font-black text-base font-mono">
            {experienceYears} {experienceYears >= 15 ? '15+' : ''} {t.onboarding.years}
          </span>
        </div>
        <input
          id={expYearsId}
          type="range"
          min="1"
          max="15"
          value={experienceYears}
          onChange={(e) => {
            onPlayRatchet();
            onChangeYears(Number(e.target.value));
          }}
          className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
        />
        <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
          <span>१ वर्ष (सिक्दै)</span>
          <span>५ वर्ष (दक्ष)</span>
          <span>१५+ वर्ष (मास्टर)</span>
        </div>
      </div>

      {/* Toolkit Possession Check */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          {t.onboarding.toolsQuestion}
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => {
              onPlayClick();
              onChangeTools(true);
            }}
            className={`relative p-3 rounded-2xl border text-left flex items-center justify-between transition-all overflow-hidden ${
              hasOwnTools
                ? 'bg-orange-500/10 dark:bg-orange-500/20 border-[#FF6B00] ring-2 ring-[#FF6B00]/40 text-slate-900 dark:text-white shadow-sm'
                : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2.5 relative z-10">
              <div className={`p-1.5 rounded-xl ${hasOwnTools ? 'bg-[#FF6B00] text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold">{t.onboarding.toolsYes}</span>
            </div>

            {hasOwnTools && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                className="w-5 h-5 rounded-full bg-[#FF6B00] text-white flex items-center justify-center flex-shrink-0"
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </motion.div>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              onPlayClick();
              onChangeTools(false);
            }}
            className={`relative p-3 rounded-2xl border text-left flex items-center justify-between transition-all overflow-hidden ${
              !hasOwnTools
                ? 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500 ring-2 ring-amber-500/40 text-slate-900 dark:text-white shadow-sm'
                : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2.5 relative z-10">
              <div className={`p-1.5 rounded-xl ${!hasOwnTools ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold">{t.onboarding.toolsNo}</span>
            </div>

            {!hasOwnTools && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0"
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </motion.div>
            )}
          </button>
        </div>
      </div>

      {/* Vehicle Commute Mode */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          {t.onboarding.vehicleQuestion}
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => {
              onPlayClick();
              onChangeVehicle('bike');
            }}
            className={`relative p-3 rounded-2xl border text-left flex items-center justify-between transition-all overflow-hidden ${
              hasVehicle === 'bike' || hasVehicle === 'scooter'
                ? 'bg-orange-500/10 dark:bg-orange-500/20 border-[#FF6B00] ring-2 ring-[#FF6B00]/40 text-slate-900 dark:text-white shadow-sm'
                : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2.5 relative z-10">
              <div className={`p-1.5 rounded-xl ${hasVehicle === 'bike' ? 'bg-[#FF6B00] text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                <Bike className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold">{t.onboarding.vehicleBike}</span>
            </div>

            {(hasVehicle === 'bike' || hasVehicle === 'scooter') && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                className="w-5 h-5 rounded-full bg-[#FF6B00] text-white flex items-center justify-center flex-shrink-0"
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </motion.div>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              onPlayClick();
              onChangeVehicle('public_transit');
            }}
            className={`relative p-3 rounded-2xl border text-left flex items-center justify-between transition-all overflow-hidden ${
              hasVehicle === 'public_transit'
                ? 'bg-orange-500/10 dark:bg-orange-500/20 border-[#FF6B00] ring-2 ring-[#FF6B00]/40 text-slate-900 dark:text-white shadow-sm'
                : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2.5 relative z-10">
              <div className={`p-1.5 rounded-xl ${hasVehicle === 'public_transit' ? 'bg-[#FF6B00] text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                <Bus className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold">{t.onboarding.vehiclePublic}</span>
            </div>

            {hasVehicle === 'public_transit' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                className="w-5 h-5 rounded-full bg-[#FF6B00] text-white flex items-center justify-center flex-shrink-0"
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </motion.div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
