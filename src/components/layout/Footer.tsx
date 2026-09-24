import React from 'react';
import { Heart, ShieldCheck, MessageCircle, Phone } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <footer className="pt-10 pb-24 px-4 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 text-slate-600 dark:text-slate-400 text-xs text-center transition-colors">
      <div className="max-w-xl mx-auto space-y-4">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#FF6B00] text-slate-950 font-black text-xs flex items-center justify-center shadow-sm">
            बीर
          </div>
          <span className="font-extrabold text-slate-900 dark:text-white text-sm">
            {t.brand.name} • {t.brand.tagline}
          </span>
        </div>

        {/* Dedication */}
        <p className="text-slate-600 dark:text-slate-400 text-xs flex items-center justify-center gap-1">
          <span>{lang === 'ne' ? 'विराटनगर, दुहबी र इटहरीका मेहनती दाइहरूलाई समर्पित' : 'Dedicated to the hardworking technicians of Biratnagar, Duhabi & Morang'}</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        </p>

        {/* Support Pill */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <MessageCircle className="w-4 h-4" />
            <a
              href="https://wa.me/9779800000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              WhatsApp Support: +977 980-000-0000
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-[11px] text-slate-400 dark:text-slate-600">
          © {new Date().getFullYear()} Bir Services Nepal. All rights reserved. ०% Middleman Cut Guarantee.
        </p>
      </div>
    </footer>
  );
};
