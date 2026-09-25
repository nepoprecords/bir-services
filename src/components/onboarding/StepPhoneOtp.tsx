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
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          {t.onboarding.step4Title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
          {t.onboarding.step4Subtitle}
        </p>
      </div>

      {/* Name Input */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
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
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-semibold focus:outline-none focus:border-[#FF6B00] shadow-sm transition-colors"
          />
        </div>
      </div>

      {/* Phone Input */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
          {t.onboarding.phoneLabel}
        </label>
        <div className="relative flex shadow-sm">
          {/* Nepal Code Pill with Clean SVG (Zero Emoji) */}
          <div className="px-3 py-3 rounded-l-2xl bg-slate-100 dark:bg-slate-700/80 border border-r-0 border-slate-200 dark:border-slate-700 text-xs font-black text-slate-800 dark:text-amber-300 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-rose-600" viewBox="0 0 20 20" fill="none">
              <path d="M4 2v16M4 2l10 5.5-6.5 1.5 6.5 6H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2" />
            </svg>
            <span>+977</span>
          </div>
          <input
            type="tel"
            required
            maxLength={10}
            value={phone}
            onChange={(e) => onChangePhone(e.target.value.replace(/\D/g, ''))}
            placeholder="98XXXXXXXX"
            className="w-full px-3 py-3 rounded-r-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-bold font-mono tracking-wider focus:outline-none focus:border-[#FF6B00] transition-colors"
          />
        </div>
        {phone.length >= 2 && !/^(98|97|96)/.test(phone) && (
          <span className="text-[11px] font-bold text-rose-500 mt-1 block">
            {lang === 'ne'
              ? 'नेपाली मोबाइल नम्बर ९८, ९७ वा ९६ बाट सुरु हुनुपर्छ।'
              : 'Nepali mobile must start with 98, 97, or 96.'}
          </span>
        )}
      </div>

      {/* Instant OTP Simulation */}
      <div className="p-3.5 rounded-2xl bg-amber-500/5 dark:bg-slate-800/60 border border-dashed border-amber-500/40">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-bold text-amber-600 dark:text-amber-300 flex items-center gap-1">
            <KeyRound className="w-3.5 h-3.5 text-amber-500" />
            {t.onboarding.otpLabel}
          </span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono px-2 py-0.5 rounded-full font-bold">
            AUTO-FILLED
          </span>
        </div>
        <input
          type="text"
          value={otp}
          onChange={(e) => onChangeOtp(e.target.value)}
          className="w-full text-center py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-lg font-black tracking-widest text-[#FF6B00] dark:text-[#FFB800] shadow-inner"
        />
      </div>

      {/* Trust Notice */}
      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 py-1 font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
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
          disabled={!fullName.trim() || !/^(98|97|96)\d{8}$/.test(phone) || isVerifying}
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
