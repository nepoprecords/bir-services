import React, { useId } from 'react';
import { Wrench, Bike, Bus, Check, Sparkles } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-black text-white">
          {t.onboarding.step2Title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {t.onboarding.step2Subtitle}
        </p>
      </div>

      {/* Experience Years Slider */}
      <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor={expYearsId} className="text-xs font-bold text-slate-300">
            {t.onboarding.expYears}
          </label>
          <span className="px-3 py-1 rounded-full bg-[#FF6B00]/20 text-[#FF8A34] font-black text-base font-mono">
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
          className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
          <span>१ वर्ष (सिक्दै)</span>
          <span>५ वर्ष (दक्ष)</span>
          <span>१५+ वर्ष (मास्टर)</span>
        </div>
      </div>

      {/* Toolkit Possession Check */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          {t.onboarding.toolsQuestion}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              onPlayClick();
              onChangeTools(true);
            }}
            className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
              hasOwnTools
                ? 'bg-[#FF6B00]/20 border-[#FF6B00] text-white shadow-md shadow-orange-950/30'
                : 'bg-slate-800/60 border-slate-700 text-slate-400'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${hasOwnTools ? 'bg-[#FF6B00]' : 'bg-slate-700'}`}>
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-bold">{t.onboarding.toolsYes}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onPlayClick();
              onChangeTools(false);
            }}
            className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
              !hasOwnTools
                ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                : 'bg-slate-800/60 border-slate-700 text-slate-400'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${!hasOwnTools ? 'bg-amber-500' : 'bg-slate-700'}`}>
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-bold">{t.onboarding.toolsNo}</span>
          </button>
        </div>
      </div>

      {/* Vehicle Commute Mode */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          {t.onboarding.vehicleQuestion}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              onPlayClick();
              onChangeVehicle('bike');
            }}
            className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
              hasVehicle === 'bike' || hasVehicle === 'scooter'
                ? 'bg-[#FF6B00]/20 border-[#FF6B00] text-white shadow-md'
                : 'bg-slate-800/60 border-slate-700 text-slate-400'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${hasVehicle === 'bike' ? 'bg-[#FF6B00]' : 'bg-slate-700'}`}>
              <Bike className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-bold">{t.onboarding.vehicleBike}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onPlayClick();
              onChangeVehicle('public_transit');
            }}
            className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
              hasVehicle === 'public_transit'
                ? 'bg-[#FF6B00]/20 border-[#FF6B00] text-white shadow-md'
                : 'bg-slate-800/60 border-slate-700 text-slate-400'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${hasVehicle === 'public_transit' ? 'bg-[#FF6B00]' : 'bg-slate-700'}`}>
              <Bus className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-bold">{t.onboarding.vehiclePublic}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
