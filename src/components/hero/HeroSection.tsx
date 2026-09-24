import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Zap, MapPin, CheckCircle2 } from 'lucide-react';
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

  // Smooth scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);
  const heroY = useTransform(scrollYProgress, [0, 0.75], [0, 30]);

  return (
    <section
      ref={sectionRef}
      className="relative pt-6 sm:pt-10 pb-12 sm:pb-20 px-4 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF8F5] to-white dark:from-[#0B0F19] dark:via-[#0E1422] dark:to-[#0B0F19] transition-colors duration-300"
    >
      {/* Calm, Subtle Kinetic Circuit Background Canvas */}
      <div className="opacity-40 dark:opacity-30 pointer-events-none">
        <KineticCircuitCanvas isDark={isDark} />
      </div>

      {/* Atmospheric warm ambient flare */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[450px] h-[300px] bg-gradient-to-b from-[#FF6B00]/10 via-[#FFB800]/5 to-transparent rounded-full filter blur-3xl pointer-events-none" />

      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* 1. Clean Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 dark:bg-orange-500/15 border border-[#FF6B00]/25 text-[#FF6B00] mb-3 text-xs font-black tracking-tight"
            >
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{t.hero.badge}</span>
            </motion.div>

            {/* 2. Headline: Bold, commanding, unambiguous */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.18] mb-3"
            >
              {t.hero.titleLine1}{' '}
              <span className="text-[#FF6B00] block mt-1">
                {t.hero.titleHighlight}
              </span>
            </motion.h1>

            {/* 3. Subtitle: Short, reassuring 1-sentence value prop */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.16 }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed mb-6 font-medium"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* Mascot in Mobile View: Dignified, compact, zero clutter */}
            <div className="w-full lg:hidden mb-6">
              <HeroMascot lang={lang} onOpenOnboard={onOpenOnboard} />
            </div>

            {/* 4. THE PRIMARY CALL TO ACTION (One clear, dominant choice) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.24 }}
              className="w-full sm:w-auto flex flex-col items-center lg:items-start gap-2 mb-4"
            >
              <TactileButton
                variant="orange"
                size="lg"
                fullWidth
                className="sm:w-auto text-base sm:text-lg font-black px-8 py-4 shadow-xl shadow-orange-500/25 active:scale-95"
                onPressSound={onPlayClick}
                onClick={onOpenOnboard}
                icon={<Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />}
              >
                {t.hero.ctaPrimary}
              </TactileButton>

              {/* Reassurance Micro-Copy */}
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {t.hero.ctaSubtext}
              </span>
            </motion.div>

            {/* 5. Subtle Secondary Pathway for Homeowners (No button fight) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.32 }}
              className="mb-6 pt-1"
            >
              <button
                onClick={() => {
                  onPlayClick();
                  onScrollToServices();
                }}
                className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-[#FF6B00] dark:hover:text-[#FF8A34] transition-colors flex items-center gap-1.5 underline underline-offset-4"
              >
                <span>{t.hero.homeownerLink}</span>
              </button>
            </motion.div>

            {/* 6. Clean 1-Line Social Proof (Calm & authentic) */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
              <div className="flex text-amber-500 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>{t.hero.statsTrust}</span>
            </div>
          </div>

          {/* Right Column: Hero Mascot in Desktop View */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center">
            <HeroMascot lang={lang} onOpenOnboard={onOpenOnboard} />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
