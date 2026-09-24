import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Zap, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Language } from '../../types';

interface HeroMascotProps {
  lang: Language;
  onPlayPop?: () => void;
  onOpenOnboard?: () => void;
}

export const HeroMascot: React.FC<HeroMascotProps> = ({ lang, onPlayPop, onOpenOnboard }) => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-sm sm:max-w-md mx-auto pointer-events-auto">
      {/* Floating 3D Accent 1: Golden Wrench (like floating sushi in KAI reference) */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 right-6 sm:right-10 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-amber-500/30 shadow-lg shadow-amber-500/10 backdrop-blur-md text-amber-500 text-xs font-black"
      >
        <Wrench className="w-4 h-4 fill-amber-400 text-amber-500" />
        <span className="text-[11px] text-slate-800 dark:text-slate-200">
          {lang === 'ne' ? 'हातहातै मर्मत' : 'Fast Repair'}
        </span>
      </motion.div>

      {/* Floating 3D Accent 2: Spark / Electrical */}
      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-12 -left-2 sm:left-2 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 backdrop-blur-md text-emerald-600 dark:text-emerald-400 text-xs font-black"
      >
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span className="text-[11px]">
          {lang === 'ne' ? '०% कमिसन' : '0% Commission'}
        </span>
      </motion.div>

      {/* Main Cardless Transparent PNG Cutout of Bir Dai */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onPlayPop}
        className="relative z-10 cursor-pointer flex flex-col items-center"
      >
        {/* Transparent Cutout Image with Realistic Drop Shadow - NO CARD BOUNDARY */}
        <div className="relative w-64 h-80 sm:w-72 sm:h-96 flex items-center justify-center">
          <img
            src="/assets/bir-dai-cutout.png"
            alt="Bir Dai - Transparent PNG Cutout"
            className="w-full h-full object-contain filter drop-shadow-[0_22px_32px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_25px_35px_rgba(0,0,0,0.65)]"
            loading="eager"
          />
        </div>

        {/* Floating Natural Pill Directly Under Boots (No box container) */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 shadow-md backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-black text-slate-800 dark:text-white">
            {lang === 'ne' ? 'बीर दाई' : 'Bir Dai'}
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="text-[11px] font-bold text-[#FF6B00] italic">
            {lang === 'ne'
              ? '"चिन्ता नलिनुस्, दाई छ नि!"'
              : '"No worries, Dai is here!"'}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};
