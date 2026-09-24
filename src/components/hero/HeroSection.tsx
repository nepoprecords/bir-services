import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, ShieldCheck, ArrowRight, Zap, CheckCircle2, Wrench } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { TactileButton } from '../ui/TactileButton';
import { HeroMascot } from './HeroMascot';
import { KineticCircuitCanvas } from '../3d/KineticCircuitCanvas';

interface HeroSectionProps {
  lang: Language;
  isDark?: boolean;
  onOpenOnboard: () => void;
  onScrollToCalc: () => void;
  onScrollToServices: () => void;
  onPlayClick: () => void;
  onPlayPop: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  isDark = false,
  onOpenOnboard,
  onScrollToCalc,
  onScrollToServices,
  onPlayClick,
  onPlayPop,
}) => {
  const t = translations[lang];
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll animations for smooth flow into section 2
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.15]);
  const heroScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 0.75], [0, 40]);

  return (
    <section
      ref={sectionRef}
      className="relative pt-6 pb-14 sm:pb-20 px-4 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF8F5] to-white dark:from-[#0B0F19] dark:via-[#0E1422] dark:to-[#0B0F19] transition-colors duration-300"
    >
      {/* Creative Kinetic Circuit Background Canvas */}
      <KineticCircuitCanvas isDark={isDark} />

      {/* Atmospheric warm ambient flare */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-gradient-to-b from-[#FF6B00]/10 via-[#FFB800]/5 to-transparent rounded-full filter blur-3xl pointer-events-none" />

      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography, Value Proposition & Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Live Opportunity Badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-[#FF6B00]/30 shadow-sm backdrop-blur-md mb-4"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF6B00]" />
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-amber-200 tracking-tight">
                {t.hero.badge}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4"
            >
              {t.hero.titleLine1}{' '}
              <span className="block mt-1 bg-gradient-to-r from-[#FF6B00] via-[#FF8A34] to-[#FFB800] bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed mb-6 font-medium"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* Mascot in Mobile View */}
            <div className="w-full lg:hidden my-2">
              <HeroMascot
                lang={lang}
                onPlayPop={onPlayPop}
                onOpenOnboard={onOpenOnboard}
              />
            </div>

            {/* Dual Actions: Join as Dai OR Book a Service */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3 mb-4"
            >
              <TactileButton
                variant="orange"
                size="lg"
                fullWidth
                className="sm:w-auto text-base font-black px-7"
                onPressSound={onPlayClick}
                onClick={onOpenOnboard}
                icon={<Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />}
              >
                {t.hero.ctaPrimary}
              </TactileButton>

              <TactileButton
                variant="outline"
                size="lg"
                fullWidth
                className="sm:w-auto text-sm font-bold text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 px-6 bg-white/80 dark:bg-slate-900/80"
                onPressSound={onPlayClick}
                onClick={onScrollToServices}
                icon={<Wrench className="w-4 h-4 text-[#FF6B00]" />}
              >
                {lang === 'ne' ? 'मर्मत सेवा खोज्नुहोस्' : 'Explore Home Services'}
              </TactileButton>
            </motion.div>

            {/* Guarantee Pill */}
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-6">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{t.hero.guarantee}</span>
            </div>

            {/* Social Proof Box */}
            <div className="w-full max-w-md p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2 overflow-hidden">
                  <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                    SC
                  </span>
                  <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-blue-500 text-white font-black text-xs flex items-center justify-center">
                    DM
                  </span>
                  <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-emerald-500 text-white font-black text-xs flex items-center justify-center">
                    SS
                  </span>
                  <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-[#FF6B00] text-white font-black text-xs flex items-center justify-center">
                    +850
                  </span>
                </div>
                <div className="text-left">
                  <div className="flex items-center text-amber-500 text-xs font-bold gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-1 text-slate-800 dark:text-slate-100">{t.hero.statsTrust}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {t.hero.statsCount}
                  </p>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-orange-50 dark:bg-slate-800 text-[#FF6B00] flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Right Column: Hero Mascot in Desktop View */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center">
            <HeroMascot
              lang={lang}
              onPlayPop={onPlayPop}
              onOpenOnboard={onOpenOnboard}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
