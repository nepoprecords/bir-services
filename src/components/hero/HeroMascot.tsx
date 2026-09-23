import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle } from 'lucide-react';
import { Language } from '../../types';

interface HeroMascotProps {
  lang: Language;
  onPlayPop: () => void;
  onOpenOnboard: () => void;
}

export const HeroMascot: React.FC<HeroMascotProps> = ({ lang, onPlayPop, onOpenOnboard }) => {
  const [speechIndex, setSpeechIndex] = useState(0);
  const [tapCount, setTapCount] = useState(0);

  const neQuotes = [
    'के छ भाइ? काम पाएन कि क्या हो? बीरमा जोडिनुस्!',
    'चिन्ता नलिनुस् भाइ, दाई छ नि! सबै मिलाइदिन्छ!',
    'पल्सरमा टूलकिट बाधेपछि काठमाडौंकै राजा भइयो!',
    'बिजुली गयो कि धारा फुट्यो? फोन आउनासाथ दाई हाजिर!',
    'दलाली ३०% कटाउने जमाना गयो, अब १००% आफ्नै खल्तीमा!',
    'काम दमदार, कमाई शानदार! आजै दाई बन्नुस्!',
  ];

  const enQuotes = [
    "What's up brother? Looking for high-paying gigs? Join Bir!",
    "Don't worry kid, Dai is here! We got your back!",
    "Toolkit strapped to the Pulsar bike — king of Kathmandu streets!",
    "Power cut or water pipe burst? One call and Dai is right there!",
    "Say goodbye to 30% middleman cuts — 100% money is yours!",
    "Solid craft, legendary earnings! Become a Dai today!",
  ];

  const currentQuotes = lang === 'ne' ? neQuotes : enQuotes;

  const handleMascotClick = () => {
    onPlayPop();
    setTapCount((prev) => prev + 1);
    setSpeechIndex((prev) => (prev + 1) % currentQuotes.length);
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-2 select-none">
      {/* Dynamic Speech Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${lang}-${speechIndex}`}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={handleMascotClick}
          className="relative z-20 cursor-pointer max-w-[280px] sm:max-w-xs bg-gradient-to-r from-slate-900/95 to-slate-800/95 border-2 border-[#FFB800] rounded-2xl p-3.5 shadow-xl shadow-orange-950/30 mb-2"
        >
          <div className="flex items-start gap-2">
            <span className="p-1 rounded-lg bg-[#FF6B00]/20 text-[#FFB800] flex-shrink-0 mt-0.5">
              <MessageCircle className="w-3.5 h-3.5" />
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-100 leading-snug">
              "{currentQuotes[speechIndex]}"
            </p>
          </div>

          {/* Speech bubble pointy arrow */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-r-2 border-b-2 border-[#FFB800] rotate-45" />
        </motion.div>
      </AnimatePresence>

      {/* Mascot 3D Image & Frame */}
      <div className="relative group cursor-pointer" onClick={handleMascotClick}>
        {/* Glowing backdrop halo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B00]/30 via-[#FFB800]/20 to-transparent rounded-full filter blur-2xl transform scale-110 group-hover:scale-125 transition-transform duration-500" />

        {/* Circular Mascot Podium */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 rounded-full p-1.5 bg-gradient-to-b from-[#FFB800] via-[#FF6B00] to-slate-900 shadow-2xl shadow-orange-900/50"
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 relative">
            <img
              src="/assets/bir-mascot-hero.jpg"
              alt="Bir - The Heroic Nepali Tradesman Mascot"
              className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-300"
              loading="eager"
            />

            {/* Overlaid subtle badge */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-950/85 border border-[#FFB800]/60 backdrop-blur-md flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-black tracking-wider text-amber-300 uppercase">
                BIR DAI • ONLINE
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tap Prompt Badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00] text-white text-[11px] font-black border-2 border-white shadow-md shadow-orange-900/40"
        >
          <Sparkles className="w-3 h-3 text-yellow-200 animate-spin" />
          <span>{lang === 'ne' ? 'मलाई छुनुहोस् 👆' : 'Tap to Chat 👆'}</span>
          {tapCount > 0 && (
            <span className="ml-1 px-1 bg-white/20 rounded text-[9px] font-mono">
              x{tapCount}
            </span>
          )}
        </motion.div>
      </div>
    </div>
  );
};
