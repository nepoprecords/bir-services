import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Quote, Shield, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../../types';
import { DAI_STORIES, translations } from '../../i18n/translations';

interface DaiStoriesSectionProps {
  lang: Language;
  onPlayClick: () => void;
}

export const DaiStoriesSection: React.FC<DaiStoriesSectionProps> = ({
  lang,
  onPlayClick,
}) => {
  const t = translations[lang];
  const [activeIndex, setActiveIndex] = useState(0);

  const currentStory = DAI_STORIES[activeIndex];

  const handleNext = () => {
    onPlayClick();
    setActiveIndex((prev) => (prev + 1) % DAI_STORIES.length);
  };

  const handlePrev = () => {
    onPlayClick();
    setActiveIndex((prev) => (prev - 1 + DAI_STORIES.length) % DAI_STORIES.length);
  };

  return (
    <section id="stories" className="relative py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.stories.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t.stories.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.stories.subtitle}
          </p>
        </div>

        {/* Carousel / Card */}
        <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-xl backdrop-blur-xl">
          {/* Quote Icon */}
          <div className="absolute top-5 right-5 text-slate-800 pointer-events-none">
            <Quote className="w-12 h-12" />
          </div>

          <div className="relative z-10">
            {/* Top Bar with Badge & Rating */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#FF6B00]/20 border border-[#FF6B00]/40 text-[#FF8A34] text-xs font-black flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                {currentStory.badge}
              </span>

              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-400/10 px-2.5 py-1 rounded-full">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{currentStory.rating}</span>
              </div>
            </div>

            {/* Testimonial Quote */}
            <p className="text-sm sm:text-base text-slate-200 font-semibold leading-relaxed mb-6 italic">
              "{lang === 'ne' ? currentStory.quoteNe : currentStory.quoteEn}"
            </p>

            {/* Dai Profile & Stats */}
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
              <div>
                <h4 className="text-sm font-extrabold text-white">
                  {currentStory.name}
                </h4>
                <p className="text-xs text-amber-300 font-medium">
                  {lang === 'ne' ? currentStory.tradeNe : currentStory.tradeEn}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>{currentStory.location}</span>
                </div>
              </div>

              {/* Monthly Stats */}
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  {lang === 'ne' ? 'मासिक आम्दानी' : 'Monthly Income'}
                </span>
                <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">
                  रू {currentStory.monthlyKamaiNPR.toLocaleString('en-US')}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-800/60">
            <div className="flex gap-1.5">
              {DAI_STORIES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onPlayClick();
                    setActiveIndex(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    idx === activeIndex
                      ? 'w-6 bg-[#FF6B00]'
                      : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
