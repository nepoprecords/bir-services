import React from 'react';
import { MapPin, CheckCircle } from 'lucide-react';
import { Language } from '../../types';
import { VALLEY_HUBS, translations } from '../../i18n/translations';

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
        <h3 className="text-xl sm:text-2xl font-black text-white">
          {t.onboarding.step3Title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {t.onboarding.step3Subtitle}
        </p>
      </div>

      <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
        {VALLEY_HUBS.map((hub) => {
          const isSelected = selectedHubs.includes(hub);
          return (
            <button
              key={hub}
              type="button"
              onClick={() => {
                onPlayPop();
                onToggleHub(hub);
              }}
              className={`
                w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all
                ${
                  isSelected
                    ? 'bg-[#FF6B00]/20 border-[#FF6B00] text-white shadow-md shadow-orange-950/20'
                    : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl ${
                    isSelected ? 'bg-[#FF6B00] text-white' : 'bg-slate-700/80 text-slate-400'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold">{hub}</span>
              </div>

              {isSelected && <CheckCircle className="w-4 h-4 text-[#FF6B00]" />}
            </button>
          );
        })}
      </div>

      <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-[11px] text-amber-300/90 text-center font-medium">
        💡 {lang === 'ne' ? 'तपाईंले २ वा सोभन्दा बढी एरिया रोज्न सक्नुहुन्छ' : 'You can select 2 or more areas for more jobs'}
      </div>
    </div>
  );
};
