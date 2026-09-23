import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { TactileButton } from '../ui/TactileButton';
import { HeroMascot } from './HeroMascot';
import { FloatingToolsCanvas } from '../3d/FloatingToolsCanvas';

interface HeroSectionProps {
  lang: Language;
  onOpenOnboard: () => void;
  onScrollToCalc: () => void;
  onPlayClick: () => void;
  onPlayPop: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onOpenOnboard,
  onScrollToCalc,
  onPlayClick,
  onPlayPop,
}) => {
  const t = translations[lang];

  return (
    <section className="relative pt-4 pb-12 px-4 overflow-hidden">
      {/* Interactive 3D Canvas Background */}
      <FloatingToolsCanvas />

      {/* Atmospheric radial gradient */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[350px] bg-gradient-to-b from-[#FF6B00]/15 via-[#FFB800]/10 to-transparent rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center text-center">
        {/* Live Opportunities Notification Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-[#FF6B00]/40 shadow-lg shadow-orange-950/20 backdrop-blur-md mb-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B00]" />
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-amber-200 tracking-tight">
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-3"
        >
          {t.hero.titleLine1}{' '}
          <span className="block mt-1 bg-gradient-to-r from-[#FF6B00] via-[#FFB800] to-[#FFE57F] bg-clip-text text-transparent drop-shadow-sm">
            {t.hero.titleHighlight}
          </span>
        </motion.h1>

        {/* Mascot & Dialogue */}
        <HeroMascot
          lang={lang}
          onPlayPop={onPlayPop}
          onOpenOnboard={onOpenOnboard}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed mb-6 font-medium"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Primary & Secondary Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
        >
          <TactileButton
            variant="orange"
            size="lg"
            fullWidth
            className="sm:w-auto text-base sm:text-lg font-black"
            onPressSound={onPlayClick}
            onClick={onOpenOnboard}
            icon={<Zap className="w-5 h-5 text-yellow-300 fill-yellow-300 animate-bounce" />}
          >
            {t.hero.ctaPrimary}
          </TactileButton>

          <TactileButton
            variant="dark"
            size="lg"
            fullWidth
            className="sm:w-auto text-sm sm:text-base font-bold text-slate-300 border border-slate-700/80"
            onPressSound={onPlayClick}
            onClick={onScrollToCalc}
            icon={<ArrowRight className="w-4 h-4 text-[#FFB800]" />}
          >
            {t.hero.ctaSecondary}
          </TactileButton>
        </motion.div>

        {/* Guarantee Pill */}
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-6">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{t.hero.guarantee}</span>
        </div>

        {/* Social Proof Box */}
        <div className="w-full max-w-md p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2 overflow-hidden">
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                RS
              </span>
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 bg-blue-500 text-white font-black text-xs flex items-center justify-center">
                BT
              </span>
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 bg-emerald-500 text-white font-black text-xs flex items-center justify-center">
                SG
              </span>
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 bg-orange-600 text-white font-black text-xs flex items-center justify-center">
                +1K
              </span>
            </div>
            <div className="text-left">
              <div className="flex items-center text-amber-400 text-xs font-bold gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 text-slate-100">{t.hero.statsTrust}</span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1">
                {t.hero.statsCount}
              </p>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-800 text-[#FFB800] flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  );
};
