import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Sparkles, Zap, Snowflake, Wrench } from 'lucide-react';
import { Language } from '../../types';

interface HeroMascotProps {
  lang: Language;
  onPlayPop: () => void;
  onOpenOnboard: () => void;
}

export const HeroMascot: React.FC<HeroMascotProps> = ({ lang, onPlayPop, onOpenOnboard }) => {
  const [speechIndex, setSpeechIndex] = useState(0);

  const neQuotes = [
    'विराटनगरको गर्मीमा AC बिग्रियो कि मोटर padkiyo? दाई छ नि!',
    'रोडशेष देखि बरगाछी सम्म — दाईको बाइकमा टूलकिट सधैं तयार छ!',
    'दुहबी र रानी भन्सार तिर कामको ओइरो छ, BIR मा जोडिनुस्!',
    'ठेकेदारलाई ३०% कमिसन दिने दिन गए, अब १००% क्यास आफ्नै खल्तीमा!',
    'काम दमदार, कमाई शानदार! आजै विराटनगरको Super-Dai बन्नुस्!',
  ];

  const enQuotes = [
    "Summer heat in Biratnagar got the AC down or water pump broken? Dai is here!",
    "From Roadcess Chowk to Bargachhi — Dai's bike is loaded with tools!",
    "Tons of repair orders rolling in from Duhabi & Rani Border — join BIR!",
    "Say goodbye to 30% middleman cuts — 100% money is yours!",
    "Solid craft, legendary earnings! Become Biratnagar's Super-Dai today!",
  ];

  const currentQuotes = lang === 'ne' ? neQuotes : enQuotes;

  const handleMascotClick = () => {
    onPlayPop();
    setSpeechIndex((prev) => (prev + 1) % currentQuotes.length);
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-sm mx-auto">
      {/* Dynamic Speech Bubble: Crisp and clean */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${lang}-${speechIndex}`}
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
          onClick={handleMascotClick}
          className="relative z-20 cursor-pointer w-full bg-slate-900/95 border-2 border-[#FFB800] rounded-2xl p-3 shadow-xl shadow-orange-950/30 mb-3"
        >
          <div className="flex items-start gap-2">
            <span className="p-1 rounded-lg bg-[#FF6B00]/20 text-[#FFB800] flex-shrink-0 mt-0.5">
              <MessageCircle className="w-3.5 h-3.5" />
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-100 leading-snug">
              "{currentQuotes[speechIndex]}"
            </p>
          </div>
          {/* Arrow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-slate-900 border-r-2 border-b-2 border-[#FFB800] rotate-45" />
        </motion.div>
      </AnimatePresence>

      {/* Mascot Card Stage */}
      <div
        className="relative group cursor-pointer w-full flex items-center justify-center py-2"
        onClick={handleMascotClick}
      >
        {/* Soft background glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B00]/20 via-[#FFB800]/10 to-transparent rounded-full filter blur-2xl pointer-events-none" />

        {/* Mascot Circle */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full p-1 bg-gradient-to-b from-[#FFB800] via-[#FF6B00] to-slate-900 shadow-2xl shadow-orange-950/50"
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 relative">
            <img
              src="/assets/bir-mascot-hero.jpg"
              alt="Bir - Nepali Tradesman Mascot"
              className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-300"
              loading="eager"
            />
            {/* Status indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-emerald-500/50 backdrop-blur-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-black tracking-wider text-emerald-300 uppercase font-mono">
                BIRATNAGAR • LIVE
              </span>
            </div>
          </div>
        </motion.div>

        {/* Floating High-Demand Chips around Bir */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute -left-2 sm:-left-4 top-1/3 z-20 hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-[10px] font-extrabold text-cyan-300 shadow-lg shadow-black/60 backdrop-blur-md"
        >
          <Snowflake className="w-3 h-3 text-cyan-400" />
          <span>AC & कुलर</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute -right-2 sm:-right-4 top-1/2 z-20 hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900/90 border border-amber-500/40 text-[10px] font-extrabold text-amber-300 shadow-lg shadow-black/60 backdrop-blur-md"
        >
          <Zap className="w-3 h-3 text-amber-400" />
          <span>पानी मोटर & बिजुली</span>
        </motion.div>

        {/* Tap Prompt Badge */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF6B00] text-white text-[10px] font-black border border-white/80 shadow-md">
          <Sparkles className="w-3 h-3 text-yellow-200" />
          <span>{lang === 'ne' ? 'बोल्न छुनुहोस् 👆' : 'Tap to Chat 👆'}</span>
        </div>
      </div>
    </div>
  );
};
