import React from 'react';
import { motion } from 'framer-motion';
import { Ban, Clock, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface WhyBirSectionProps {
  lang: Language;
  onPlayPop: () => void;
}

export const WhyBirSection: React.FC<WhyBirSectionProps> = ({ lang, onPlayPop }) => {
  const t = translations[lang];

  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ban':
        return <Ban className="w-5 h-5 text-rose-500" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#FF6B00]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-emerald-500" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <section id="benefits" className="relative py-14 px-4 bg-slate-50/50 dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-xl mx-auto">
        {/* Badge & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>{t.benefits.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
            {t.benefits.title}
          </h2>
        </div>

        {/* 3D Visual Asset Showcase Card */}
        <div className="mb-6 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md relative">
          <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
            <img
              src="/assets/bir-gear-floating.jpg"
              alt="Floating 3D Handyman Tools and Nepali Chiya"
              className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-black text-amber-300">
                ☕️ {lang === 'ne' ? 'तातो चिया & आफ्नै टूलकिट' : 'Hot Chiya & Your Own Gear'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B00] text-[10px] font-black text-white">
                100% INDEPENDENCE
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {lang === 'ne'
                ? 'विराटनगरको सडकमा आफ्नो बाइक गुडाएर, इज्जतका साथ काम गर्ने र पसिनाको पूरा मूल्य १००% आफ्नै हातमा लिने बीर दाईहरूको सञ्जाल।'
                : 'A brotherhood of respected craft masters riding their bikes across Biratnagar, proud of their work and keeping 100% of their earnings.'}
            </p>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {t.benefits.cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -2 }}
              onClick={onPlayPop}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#FF6B00]/40 transition-all flex flex-col justify-between cursor-pointer shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 flex-shrink-0">
                  {getBenefitIcon(card.icon)}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
