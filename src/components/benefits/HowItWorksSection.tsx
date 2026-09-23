import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { TactileButton } from '../ui/TactileButton';

interface HowItWorksProps {
  lang: Language;
  onOpenOnboard: () => void;
  onPlayClick: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({
  lang,
  onOpenOnboard,
  onPlayClick,
}) => {
  const t = translations[lang];

  return (
    <section className="relative py-12 px-4 bg-slate-950/40">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t.howItWorks.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t.howItWorks.title}
          </h2>
        </div>

        {/* 3 Step Cards */}
        <div className="space-y-3 mb-8">
          {t.howItWorks.steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-4 hover:border-slate-700 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FFB800] text-slate-950 flex items-center justify-center font-black text-base flex-shrink-0 shadow-lg shadow-orange-950/40">
                {step.num}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-0.5">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-snug">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mid-page CTA */}
        <div className="text-center">
          <TactileButton
            variant="orange"
            size="lg"
            fullWidth
            onPressSound={onPlayClick}
            onClick={onOpenOnboard}
            icon={<ArrowRight className="w-5 h-5 text-white" />}
          >
            {t.hero.ctaPrimary}
          </TactileButton>
        </div>
      </div>
    </section>
  );
};
