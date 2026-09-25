import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  QrCode,
  Download,
  Share2,
  CheckCircle2,
  Sparkles,
  Phone,
  MapPin,
  Award,
} from 'lucide-react';
import { Language, OnboardingData } from '../../types';
import { TRADES_DATA, translations } from '../../i18n/translations';
import { TactileButton } from '../ui/TactileButton';
import { submitProviderApplication } from '../../lib/supabase';

interface BirVerifiedCardProps {
  lang: Language;
  data: OnboardingData;
  onFinish: () => void;
  onPlayFanfare: () => void;
  onPlayClick: () => void;
}

export const BirVerifiedCard: React.FC<BirVerifiedCardProps> = ({
  lang,
  data,
  onFinish,
  onPlayFanfare,
  onPlayClick,
}) => {
  const t = translations[lang];
  const [downloaded, setDownloaded] = useState(false);

  const tradeData = TRADES_DATA.find((tr) => tr.id === data.trade) || TRADES_DATA[0];
  const tradeTitle = lang === 'ne' ? tradeData.titleNe : tradeData.titleEn;
  const hubTitle = data.hubs.length > 0 ? data.hubs[0] : 'पूर्व नेपाल (मोरङ • सुनसरी • झापा)';

  const [savedStatus, setSavedStatus] = useState<'saving' | 'saved' | 'idle'>('idle');

  // Generate a random stable-looking Nepali Dai ID for East Nepal
  const [passId] = useState(() => `BIR-DAI-${Math.floor(1000 + Math.random() * 9000)}-EAST`);

  useEffect(() => {
    // Trigger fanfare audio
    onPlayFanfare();

    // Persist applicant to Supabase & local database buffer
    setSavedStatus('saving');
    submitProviderApplication(data, passId)
      .then(() => {
        setSavedStatus('saved');
        // Persist confirmed active session
        try {
          localStorage.setItem(
            'bir_provider_confirmed',
            JSON.stringify({
              passId,
              fullName: data.fullName,
              phone: data.phone,
              trade: data.trade,
              hubs: data.hubs,
              confirmedAt: new Date().toISOString(),
            })
          );
        } catch {
          // ignore
        }
      })
      .catch(() => setSavedStatus('idle'));

    // Trigger dual cannon celebratory confetti
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#FF6B00', '#FFB800', '#10B981', '#38BDF8', '#E02828'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#FF6B00', '#FFB800', '#10B981', '#38BDF8', '#E02828'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, [onPlayFanfare, data, passId]);

  const handleDownload = () => {
    onPlayClick();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handleShareWhatsApp = () => {
    onPlayClick();
    const shareMessage =
      lang === 'ne'
        ? `म अब BIR को आधिकारिक "पूर्व नेपाल (मोरङ • सुनसरी • झापा) भेरिफाइड दाई" भएँ! AC, कुलर, बिजुली, मोटर वा कुनै सामान मर्मत गर्नु परेमा मलाई सम्झिनुहोस्! पास ID: ${passId}`
        : `I just became an official "Verified Dai" on BIR across East Nepal (Morang • Sunsari • Jhapa)! If you need any AC, electrical, motor, or repair work done, contact me! Pass ID: ${passId}`;
    const url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col items-center text-center space-y-4">
      {/* Celebration Header */}
      <div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="inline-flex p-3 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 mb-2"
        >
          <Sparkles className="w-8 h-8 text-[#FF6B00] dark:text-[#FFB800] animate-spin" />
        </motion.div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          {t.onboarding.celebration.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
          {t.onboarding.celebration.subtitle}
        </p>

        {/* Explicit Sign-Up Confirmed Notification Card */}
        <div className="w-full max-w-sm mx-auto mt-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 p-3 text-left flex items-start gap-2.5 shadow-sm">
          <div className="p-1 rounded-full bg-emerald-500 text-white flex-shrink-0 mt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 block">
              {lang === 'ne' ? 'दर्ता प्रमाणित भयो (Sign-Up Confirmed) ✓' : 'Sign-Up Confirmed & Verified ✓'}
            </span>
            <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium block leading-tight mt-0.5">
              {lang === 'ne'
                ? `+९७७ ${data.phone || '९८XXXXXXXX'} मा स्वागत SMS पुष्टिकरण पठाइयो। मोरङ, सुनसरी र झापाका ग्राहक अर्डरहरू अब तपाईंलाई प्राप्त हुनेछन्।`
                : `Confirmation SMS sent to +977 ${data.phone || '98XXXXXXXX'}. You are now live to receive orders across Morang, Sunsari & Jhapa.`}
            </span>
          </div>
        </div>

        {savedStatus === 'saved' && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[11px] font-bold mt-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{lang === 'ne' ? 'पूर्व नेपाल नेटवर्कमा सुरक्षित दर्ता भयो' : 'Synced to East Nepal verified registry'}</span>
          </div>
        )}
      </div>

      {/* The 3D Holographic ID Badge Card */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="w-full max-w-sm rounded-3xl p-1 bg-gradient-to-br from-[#FFB800] via-[#FF6B00] to-purple-600 shadow-2xl shadow-orange-950/50 relative overflow-hidden select-none"
      >
        {/* Holographic Shimmer Stripe */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-shine pointer-events-none" />

        {/* Card Body */}
        <div className="rounded-[22px] bg-slate-950 p-5 text-left relative overflow-hidden">
          {/* Subtle watermark background pattern */}
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <Award className="w-48 h-48 text-[#FFB800]" />
          </div>

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#FFB800] flex items-center justify-center font-black text-slate-950 text-xs">
                बीर
              </div>
              <div>
                <h4 className="text-xs font-black text-white tracking-wider uppercase">
                  BIR SERVICES
                </h4>
                <span className="text-[9px] text-[#FFB800] font-bold tracking-widest uppercase block">
                  OFFICIAL DAI PASS
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>VERIFIED</span>
            </div>
          </div>

          {/* Photo & Main Details */}
          <div className="flex items-center gap-4 mb-4">
            {/* Mascot / Avatar Frame */}
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#FFB800] shadow-md flex-shrink-0 bg-slate-900">
              <img
                src="/assets/bir-thumbsup.jpg"
                alt="Bir Thumbs Up Mascot"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-0 inset-x-0 bg-[#FF6B00] text-center text-[8px] font-black text-white py-0.5 uppercase">
                DAI #1
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-slate-400 uppercase font-mono">
                {passId}
              </div>
              <h3 className="text-base sm:text-lg font-black text-white truncate leading-tight">
                {data.fullName || 'बीर श्रेष्ठ (Bir Shrestha)'}
              </h3>
              <div className="inline-block mt-1 px-2 py-0.5 rounded-lg bg-[#FF6B00]/20 text-[#FF8A34] text-[11px] font-extrabold truncate max-w-full">
                {tradeTitle}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 truncate">
                <MapPin className="w-3 h-3 text-slate-500 flex-shrink-0" />
                <span className="truncate">{hubTitle}</span>
              </div>
            </div>
          </div>

          {/* QR Code and Security Hologram */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center flex-shrink-0">
                <QrCode className="w-8 h-8 text-slate-950" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-200 block">
                  INSTANT SCAN & PAY
                </span>
                <span className="text-[9px] text-slate-400">
                  eSewa • Khalti • Bank QR
                </span>
              </div>
            </div>

            {/* 3D Gold badge preview thumbnail */}
            <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-500/60 shadow-md">
              <img
                src="/assets/bir-gold-badge.jpg"
                alt="Gold Medal Badge"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons: Download & WhatsApp Share */}
      <div className="w-full max-w-sm space-y-2 pt-2">
        <div className="grid grid-cols-2 gap-2">
          <TactileButton
            variant="outline"
            size="md"
            onPressSound={onPlayClick}
            onClick={handleDownload}
            icon={downloaded ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4 text-amber-400" />}
          >
            {downloaded
              ? lang === 'ne'
                ? 'सेभ भयो!'
                : 'Saved!'
              : t.onboarding.celebration.downloadCard}
          </TactileButton>

          <TactileButton
            variant="green"
            size="md"
            onPressSound={onPlayClick}
            onClick={handleShareWhatsApp}
            icon={<Share2 className="w-4 h-4 text-white" />}
          >
            {t.onboarding.celebration.shareWhatsApp}
          </TactileButton>
        </div>

        <TactileButton
          variant="orange"
          size="lg"
          fullWidth
          onPressSound={onPlayClick}
          onClick={onFinish}
          icon={<ShieldCheck className="w-5 h-5 text-white" />}
        >
          {t.onboarding.celebration.finishBtn}
        </TactileButton>
      </div>
    </div>
  );
};
