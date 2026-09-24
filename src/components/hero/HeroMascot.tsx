import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import { Language } from '../../types';

interface HeroMascotProps {
  lang: Language;
  onPlayPop?: () => void;
  onOpenOnboard?: () => void;
}

export const HeroMascot: React.FC<HeroMascotProps> = ({ lang, onPlayPop, onOpenOnboard }) => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-xs mx-auto">
      {/* Clean, Dignified Bir Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 shadow-xl shadow-orange-500/5 dark:shadow-black/50 text-center relative overflow-hidden"
      >
        {/* Subtle top accent gradient */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF6B00] via-[#FFB800] to-emerald-500" />

        {/* Mascot Avatar with Verified Ring */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-3">
          <div className="w-full h-full rounded-2xl overflow-hidden ring-4 ring-[#FF6B00]/20 bg-slate-100 dark:bg-slate-800 shadow-md">
            <img
              src="/assets/bir-mascot-hero.jpg"
              alt="Bir - The Skilled Tradesman"
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
          </div>

          {/* Verified Badge Icon */}
          <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-emerald-500 text-white shadow-md border-2 border-white dark:border-slate-900">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        {/* Mascot Name & Title */}
        <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
          <span>बीर (Bir Dai)</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </h4>

        {/* Quote in Authentic Nepali */}
        <p className="text-xs font-bold text-[#FF6B00] mt-0.5 mb-2 italic">
          {lang === 'ne'
            ? '"चिन्ता नलिनुस् भाइ, दाई छ नि!"'
            : '"No worries brother, Dai is here!"'}
        </p>

        {/* Reassurance Micro-Strip */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>
            {lang === 'ne'
              ? 'विराटनगर सर्टिफाइड • ०% कमिसन'
              : 'Biratnagar Certified • 0% Cut'}
          </span>
        </div>
      </motion.div>
    </div>
  );
};
