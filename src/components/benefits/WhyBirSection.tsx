import React from 'react';
import { motion } from 'framer-motion';
import { Ban, Clock, ShieldCheck, HeartHandshake, Sparkles, Check } from 'lucide-react';
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
        return <Ban className="w-5 h-5 text-rose-400" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-amber-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#FF6B00]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-emerald-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="benefits" className="relative py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Badge & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/30 text-[#FF8A34] text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>{t.benefits.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
            {t.benefits.title}
          </h2>
        </div>

        {/* 3D Visual Asset Showcase Card */}
        <div className="mb-6 rounded-3xl overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 shadow-2xl relative">
          <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
            <img
              src="/assets/bir-gear-floating.jpg"
              alt="Floating 3D Handyman Tools and Nepali Chiya"
              className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-xs font-black text-amber-300">
                ☕️ {lang === 'ne' ? 'तातो चिया & आफ्नै टूलकिट' : 'Hot Chiya & Your Own Gear'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B00] text-[10px] font-black text-white">
                100% INDEPENDENCE
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              {lang === 'ne'
                ? 'काठमाडौंको सडकमा आफ्नो बाइक गुडाएर, इज्जतका साथ काम गर्ने र पसिनाको पूरा मूल्य आफ्नै हातमा लिने बीर दाईहरूको समूह।'
                : 'A brotherhood of respected craft masters riding their bikes across Nepal, proud of their work and keeping 100% of what they earn.'}
            </p>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {t.benefits.cards.map((card, idx) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -3 }}
              onClick={onPlayPop}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/60 flex-shrink-0">
                  {getBenefitIcon(card.icon)}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
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
