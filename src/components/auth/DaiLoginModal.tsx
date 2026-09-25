import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, KeyRound, ShieldCheck, CheckCircle2, User, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { Language } from '../../types';
import { getLocalProviders, supabase, ProviderRecord } from '../../lib/supabase';
import { TactileButton } from '../ui/TactileButton';

interface DaiLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenSignup: () => void;
  onPlayClick: () => void;
  onPlaySuccess: () => void;
}

export const DaiLoginModal: React.FC<DaiLoginModalProps> = ({
  isOpen,
  onClose,
  lang,
  onOpenSignup,
  onPlayClick,
  onPlaySuccess,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loggedInDai, setLoggedInDai] = useState<ProviderRecord | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const cleaned = identifier.trim();

    if (!cleaned) {
      setErrorMsg(lang === 'ne' ? 'कृपया फोन नम्बर वा पास ID राख्नुहोस्' : 'Please enter your phone or Pass ID');
      return;
    }

    onPlayClick();
    setIsLoading(true);

    try {
      // 1. Check local buffer first
      const locals = getLocalProviders();
      let matched = locals.find(
        (p) =>
          p.phone === cleaned ||
          p.phone.includes(cleaned) ||
          p.pass_id.toLowerCase() === cleaned.toLowerCase() ||
          p.full_name.toLowerCase().includes(cleaned.toLowerCase())
      );

      // 2. Check Supabase if connected and not matched locally
      if (!matched && supabase) {
        try {
          const { data, error } = await supabase
            .from('providers')
            .select('*')
            .or(`phone.eq.${cleaned},pass_id.eq.${cleaned.toUpperCase()}`)
            .limit(1);

          if (!error && data && data.length > 0) {
            matched = data[0] as ProviderRecord;
          }
        } catch (err) {
          console.warn('Supabase login check skipped:', err);
        }
      }

      if (matched) {
        // Successfully found
        onPlaySuccess();
        setLoggedInDai(matched);

        // Store active session in localStorage
        try {
          localStorage.setItem(
            'bir_provider_confirmed',
            JSON.stringify({
              passId: matched.pass_id,
              fullName: matched.full_name,
              phone: matched.phone,
              trade: matched.trade,
              hubs: matched.hubs,
              confirmedAt: new Date().toISOString(),
            })
          );
          window.dispatchEvent(new Event('storage'));
        } catch {
          // ignore
        }
      } else {
        setErrorMsg(
          lang === 'ne'
            ? 'यो नम्बर वा पास ID दर्ता भएको भेटिएन। कृपया पुनः जाँच गर्नुहोस् वा नयाँ दर्ता गर्नुहोस्।'
            : 'No registered Dai found with this Phone or Pass ID. Please check or sign up.'
        );
      }
    } catch (err) {
      setErrorMsg(lang === 'ne' ? 'लगइनमा समस्या भयो। कृपया पुनः प्रयास गर्नुहोस्।' : 'Login error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setLoggedInDai(null);
    setIdentifier('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md rounded-3xl bg-[#FAF9F6] dark:bg-[#0B0F19] border border-stone-200/90 dark:border-stone-800 shadow-2xl p-6 text-slate-800 dark:text-slate-100"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-200/60 dark:hover:bg-stone-800 text-stone-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {loggedInDai ? (
          /* Logged In Confirmation Card */
          <div className="text-center py-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30"
            >
              <CheckCircle2 className="w-9 h-9" />
            </motion.div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-black mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ne' ? 'सफलतापूर्वक लगइन भयो!' : 'Logged In Successfully!'}</span>
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-1">
              {lang === 'ne' ? `स्वागत छ, ${loggedInDai.full_name} दाई!` : `Welcome, ${loggedInDai.full_name}!`}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              {lang === 'ne'
                ? 'तपाईंको पूर्व नेपाल भेरिफाइड दाई प्रोफाइल सक्रिय छ।'
                : 'Your East Nepal Verified Dai profile is active.'}
            </p>

            {/* Profile Brief */}
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-left mb-5 space-y-2 shadow-sm text-xs">
              <div className="flex justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                <span className="text-stone-500 font-bold">Pass ID:</span>
                <span className="font-mono font-black text-[#FF6B00]">{loggedInDai.pass_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">पेशा (Trade):</span>
                <span className="font-bold text-slate-900 dark:text-white capitalize">{loggedInDai.trade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">सम्पर्क:</span>
                <span className="font-mono font-bold">+977 {loggedInDai.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">क्षेत्र:</span>
                <span className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
                  {loggedInDai.hubs.join(', ') || 'East Nepal'}
                </span>
              </div>
            </div>

            <TactileButton
              variant="orange"
              size="lg"
              fullWidth
              onPressSound={onPlayClick}
              onClick={handleCloseSuccess}
            >
              {lang === 'ne' ? 'ड्यासकार्डमा जानुहोस्' : 'Continue to App'}
            </TactileButton>
          </div>
        ) : (
          /* Login Form */
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-2xl bg-[#FF6B00] text-white shadow-md shadow-orange-500/20">
                <KeyRound className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {lang === 'ne' ? 'बीर दाई लगइन (Dai Login)' : 'Bir Dai Login'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'ne'
                    ? 'दर्ता भएको मोबाइल नम्बर वा Pass ID राख्नुहोस्'
                    : 'Enter your registered Mobile Number or Pass ID'}
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  {lang === 'ne' ? 'मोबाइल नम्बर वा Pass ID *' : 'Phone Number or Pass ID *'}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      setErrorMsg(null);
                    }}
                    placeholder="98XXXXXXXX वा BIR-DAI-XXXX-EAST"
                    className="w-full pl-10 pr-3 py-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FF6B00] font-mono tracking-wide"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <TactileButton
                type="submit"
                variant="orange"
                size="lg"
                fullWidth
                disabled={isLoading || !identifier.trim()}
                className="py-3 text-sm font-black shadow-lg shadow-orange-500/25 active:scale-95"
              >
                {isLoading
                  ? lang === 'ne'
                    ? 'खोज्दैछ...'
                    : 'Checking...'
                  : lang === 'ne'
                  ? 'लगइन गर्नुहोस् 🚀'
                  : 'Log In'}
              </TactileButton>

              {/* Not Registered Alternative */}
              <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
                  {lang === 'ne' ? 'अहिलेसम्म दर्ता हुनुभएको छैन?' : "Haven't registered yet?"}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onPlayClick();
                    onClose();
                    onOpenSignup();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#FF6B00] hover:text-[#FF8A34] transition-colors"
                >
                  <span>{lang === 'ne' ? '१ मिनेटमा नयाँ दाई बन्नुहोस्' : 'Become a Dai in 1 Minute'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
