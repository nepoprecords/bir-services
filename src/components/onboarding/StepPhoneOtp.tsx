import React, { useState } from 'react';
import { Phone, User, KeyRound, Sparkles, ShieldCheck } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { TactileButton } from '../ui/TactileButton';

interface StepPhoneOtpProps {
  lang: Language;
  fullName: string;
  phone: string;
  otp: string;
  onChangeName: (name: string) => void;
  onChangePhone: (phone: string) => void;
  onChangeOtp: (otp: string) => void;
  onSubmit: () => void;
  onPlayClick: () => void;
}

export const StepPhoneOtp: React.FC<StepPhoneOtpProps> = ({
  lang,
  fullName,
  phone,
  otp,
  onChangeName,
  onChangePhone,
  onChangeOtp,
  onSubmit,
  onPlayClick,
}) => {
  const t = translations[lang];
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onSubmit();
    }, 700);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-black text-white">
          {t.onboarding.step4Title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {t.onboarding.step4Subtitle}
        </p>
      </div>

      {/* Name Input */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
          {t.onboarding.fullNameLabel}
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder={t.onboarding.fullNamePlaceholder}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm font-semibold focus:outline-none focus:border-[#FF6B00] transition-colors"
          />
        </div>
      </div>

      {/* Phone Input */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
          {t.onboarding.phoneLabel}
        </label>
        <div className="relative flex">
          <div className="px-3 py-3 rounded-l-2xl bg-slate-700/80 border border-r-0 border-slate-700 text-xs font-black text-amber-300 flex items-center gap-1">
            <span>🇳🇵 +977</span>
          </div>
          <input
            type="tel"
            required
            maxLength={10}
            value={phone}
            onChange={(e) => onChangePhone(e.target.value)}
            placeholder="98XXXXXXXX"
            className="w-full px-3 py-3 rounded-r-2xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm font-bold font-mono tracking-wider focus:outline-none focus:border-[#FF6B00] transition-colors"
          />
        </div>
      </div>

      {/* Instant OTP Simulation */}
      <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-dashed border-amber-500/40">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-bold text-amber-300 flex items-center gap-1">
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            {t.onboarding.otpLabel}
          </span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-mono px-2 py-0.5 rounded-full font-bold">
            AUTO-FILLED
          </span>
        </div>
        <input
          type="text"
          value={otp}
          onChange={(e) => onChangeOtp(e.target.value)}
          className="w-full text-center py-2 rounded-xl bg-slate-900 border border-slate-700 font-mono text-lg font-black tracking-widest text-[#FFB800]"
        />
      </div>

      {/* Trust Notice */}
      <div className="flex items-center gap-2 text-[11px] text-slate-400 py-1">
        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span>
          {lang === 'ne'
            ? 'तपाईंको फोन नम्बर सुरक्षित छ र कामको सूचना पाउन मात्र प्रयोग हुनेछ।'
            : 'Your number is 100% private and used only for dispatching customer jobs.'}
        </span>
      </div>

      {/* Verification Submit Button */}
      <div className="pt-2">
        <TactileButton
          type="submit"
          variant="orange"
          size="lg"
          fullWidth
          disabled={!fullName.trim() || phone.length < 8 || isVerifying}
          onPressSound={onPlayClick}
          icon={<Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />}
        >
          {isVerifying
            ? lang === 'ne'
              ? 'सत्यापन हुँदैछ...'
              : 'Verifying...'
            : t.onboarding.verifyBtn}
        </TactileButton>
      </div>
    </form>
  );
};
