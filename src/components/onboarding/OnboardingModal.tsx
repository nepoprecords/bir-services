import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Language, OnboardingData, TradeId } from '../../types';
import { translations } from '../../i18n/translations';
import { StepTradeSelect } from './StepTradeSelect';
import { StepExperience } from './StepExperience';
import { StepLocation } from './StepLocation';
import { StepPhoneOtp } from './StepPhoneOtp';
import { BirVerifiedCard } from './BirVerifiedCard';
import { TactileButton } from '../ui/TactileButton';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onPlayClick: () => void;
  onPlayPop: () => void;
  onPlayRatchet: () => void;
  onPlaySuccess: () => void;
  onPlayFanfare: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  lang,
  onPlayClick,
  onPlayPop,
  onPlayRatchet,
  onPlaySuccess,
  onPlayFanfare,
}) => {
  const t = translations[lang];

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<OnboardingData>({
    trade: 'ac_repair',
    experienceYears: 4,
    hasOwnTools: true,
    hasVehicle: 'bike',
    city: 'Biratnagar',
    hubs: ['रोडशेष चोक / मेन रोड (Roadcess / Main Road)'],
    fullName: '',
    phone: '',
    otp: '8848',
    isVerified: false,
  });

  if (!isOpen) return null;

  const handleNextStep = () => {
    onPlaySuccess();
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => {
    onPlayClick();
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinish = () => {
    onPlayClick();
    onClose();
    // Reset to step 1 for future runs
    setTimeout(() => setStep(1), 400);
  };

  // Progress percentage
  const progressPercent = step === 5 ? 100 : Math.round(((step - 1) / 4) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-hidden">
      {/* Modal Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Sheet */}
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 350 }}
        className="relative z-10 w-full max-w-lg bg-slate-900 border-t sm:border border-slate-800 rounded-t-[32px] sm:rounded-3xl shadow-2xl p-5 sm:p-7 max-h-[92vh] flex flex-col justify-between overflow-hidden"
      >
        {/* Top Drag Pill for Mobile */}
        <div className="w-12 h-1.5 bg-slate-700/80 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Modal Top Nav & Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            {step > 1 && step < 5 ? (
              <button
                onClick={handlePrevStep}
                className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t.onboarding.backBtn}</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-ping" />
                <span className="text-xs font-black uppercase tracking-wider text-[#FFB800]">
                  {step === 5 ? 'COMPLETED' : `STEP 0${step} OF 04`}
                </span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Gamified Duolingo Progress Bar */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5">
            <motion.div
              initial={false}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="h-full bg-gradient-to-r from-[#FF6B00] via-[#FFB800] to-emerald-400 rounded-full"
            />
          </div>
        </div>

        {/* Step Body */}
        <div className="flex-1 overflow-y-auto py-2">
          {step === 1 && (
            <StepTradeSelect
              lang={lang}
              selectedTrade={formData.trade}
              onSelect={(trade: TradeId) => setFormData((prev) => ({ ...prev, trade }))}
              onPlayPop={onPlayPop}
            />
          )}

          {step === 2 && (
            <StepExperience
              lang={lang}
              experienceYears={formData.experienceYears}
              hasOwnTools={formData.hasOwnTools}
              hasVehicle={formData.hasVehicle}
              onChangeYears={(years) =>
                setFormData((prev) => ({ ...prev, experienceYears: years }))
              }
              onChangeTools={(hasTools) =>
                setFormData((prev) => ({ ...prev, hasOwnTools: hasTools }))
              }
              onChangeVehicle={(vehicle) =>
                setFormData((prev) => ({ ...prev, hasVehicle: vehicle }))
              }
              onPlayClick={onPlayClick}
              onPlayRatchet={onPlayRatchet}
            />
          )}

          {step === 3 && (
            <StepLocation
              lang={lang}
              selectedHubs={formData.hubs}
              onToggleHub={(hub) => {
                setFormData((prev) => {
                  const exists = prev.hubs.includes(hub);
                  if (exists && prev.hubs.length === 1) return prev; // keep at least 1
                  return {
                    ...prev,
                    hubs: exists ? prev.hubs.filter((h) => h !== hub) : [...prev.hubs, hub],
                  };
                });
              }}
              onPlayPop={onPlayPop}
            />
          )}

          {step === 4 && (
            <StepPhoneOtp
              lang={lang}
              fullName={formData.fullName}
              phone={formData.phone}
              otp={formData.otp}
              onChangeName={(fullName) => setFormData((prev) => ({ ...prev, fullName }))}
              onChangePhone={(phone) => setFormData((prev) => ({ ...prev, phone }))}
              onChangeOtp={(otp) => setFormData((prev) => ({ ...prev, otp }))}
              onSubmit={handleNextStep}
              onPlayClick={onPlayClick}
            />
          )}

          {step === 5 && (
            <BirVerifiedCard
              lang={lang}
              data={formData}
              onFinish={handleFinish}
              onPlayFanfare={onPlayFanfare}
              onPlayClick={onPlayClick}
            />
          )}
        </div>

        {/* Modal Bottom Action Controls (for Steps 1, 2, 3) */}
        {step < 4 && (
          <div className="pt-4 border-t border-slate-800">
            <TactileButton
              variant="orange"
              size="lg"
              fullWidth
              onPressSound={onPlayClick}
              onClick={handleNextStep}
              disabled={step === 1 && !formData.trade}
              icon={<ArrowRight className="w-5 h-5 text-white" />}
            >
              {t.onboarding.nextBtn}
            </TactileButton>
          </div>
        )}
      </motion.div>
    </div>
  );
};
