import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  Phone,
  ShieldCheck,
  Zap,
  Snowflake,
  Wrench,
  Bike,
  Hammer,
  Paintbrush,
  Sparkles,
  PhoneCall,
  Check,
} from 'lucide-react';
import { Language } from '../../types';
import {
  submitCustomerBooking,
  getSavedCustomerProfile,
  CustomerBookingRecord,
} from '../../lib/supabase';
import { TactileButton } from '../ui/TactileButton';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialServiceId?: string | null;
  onPlayClick: () => void;
  onPlaySuccess: () => void;
  onPlayPop: () => void;
}

interface ServiceOption {
  id: string;
  nameNe: string;
  nameEn: string;
  icon: React.ComponentType<{ className?: string }>;
  estPrice: string;
}

const SERVICES_LIST: ServiceOption[] = [
  {
    id: 'ac_cooler',
    nameNe: 'AC, कुलर & फ्रिज मर्मत',
    nameEn: 'AC, Cooler & Refrigerator',
    icon: Snowflake,
    estPrice: 'रू ७५० देखि',
  },
  {
    id: 'electrician_motor',
    nameNe: 'पानी मोटर & इन्डस्ट्रियल बिजुली',
    nameEn: 'Water Pump & Electrician',
    icon: Zap,
    estPrice: 'रू ५०० देखि',
  },
  {
    id: 'plumbing_leak',
    nameNe: 'प्लम्बिङ, धारा & लिकेज',
    nameEn: 'Plumbing & Leakage',
    icon: Wrench,
    estPrice: 'रू ४५० देखि',
  },
  {
    id: 'roadside_bike',
    nameNe: 'अन-कल बाइक & अटो मेकानिक',
    nameEn: 'Roadside Bike Mechanic',
    icon: Bike,
    estPrice: 'रू ३५० देखि',
  },
  {
    id: 'carpentry_wood',
    nameNe: 'सिकर्मी & घर संरचना',
    nameEn: 'Carpentry & Woodwork',
    icon: Hammer,
    estPrice: 'रू ६०० देखि',
  },
  {
    id: 'painting_mesh',
    nameNe: 'रङरोगन & जाली फिटिङ',
    nameEn: 'Painting & Mosquito Net',
    icon: Paintbrush,
    estPrice: 'रू ५५० देखि',
  },
];

const EAST_NEPAL_HUBS = [
  // मोरङ (Morang)
  { id: 'brt_roadcess', nameNe: 'विराटनगर - रोडशेष / मेन रोड (Biratnagar, Morang)' },
  { id: 'brt_bargachhi', nameNe: 'विराटनगर - बरगाछी / कञ्चनबारी (Biratnagar, Morang)' },
  { id: 'brt_traffic', nameNe: 'विराटनगर - ट्राफिक चोक / रानी (Biratnagar, Morang)' },
  { id: 'urlabari', nameNe: 'उर्लाबारी बजार (Urlabari, Morang)' },
  { id: 'belbari_pathari', nameNe: 'बेलबारी / पथरी (Belbari / Pathari, Morang)' },
  { id: 'rangeli', nameNe: 'रंगेली / कटहरी (Rangeli / Katahari, Morang)' },

  // सुनसरी (Sunsari)
  { id: 'itahari_main', nameNe: 'इटहरी मेन चोक / तरहरा (Itahari, Sunsari)' },
  { id: 'dharan_bhanu', nameNe: 'धरान - भानुचोक / घोपा क्याम्प (Dharan, Sunsari)' },
  { id: 'dharan_chhata', nameNe: 'धरान - छाता चोक / चतरा लाइन (Dharan, Sunsari)' },
  { id: 'inaruwa', nameNe: 'इनरुवा बजार (Inaruwa, Sunsari)' },
  { id: 'duhabi', nameNe: 'दुहबी औद्योगिक कोरिडोर (Duhabi, Sunsari)' },

  // झापा (Jhapa)
  { id: 'birtamod_mukti', nameNe: 'बिर्तामोड - मुक्ति चोक / चारपाने (Birtamod, Jhapa)' },
  { id: 'damak_chowk', nameNe: 'दमक - मुख्य चोक / बेलडाँगी (Damak, Jhapa)' },
  { id: 'bhadrapur', nameNe: 'भद्रपुर / चन्द्रगढी विमानस्थल (Bhadrapur, Jhapa)' },
  { id: 'kakarbhitta', nameNe: 'काँकडभिट्टा सीमाना / धुलाबारी (Kakarbhitta, Jhapa)' },
  { id: 'surunga', nameNe: 'सुरुङ्गा (Surunga, Jhapa)' },
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialServiceId,
  onPlayClick,
  onPlaySuccess,
  onPlayPop,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('ac_cooler');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [hub, setHub] = useState<string>('bargachhi');
  const [urgency, setUrgency] = useState<'urgent' | 'today' | 'tomorrow'>('urgent');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<CustomerBookingRecord | null>(null);

  // Autofill profile and selected service upon opening
  useEffect(() => {
    if (isOpen) {
      if (initialServiceId) {
        setSelectedServiceId(initialServiceId);
      }
      const profile = getSavedCustomerProfile();
      if (profile.customer_name && !fullName) setFullName(profile.customer_name);
      if (profile.phone && !phone) setPhone(profile.phone);
      if (profile.hub) setHub(profile.hub);
      setConfirmedBooking(null);
    }
  }, [isOpen, initialServiceId]);

  if (!isOpen) return null;

  const currentService =
    SERVICES_LIST.find((s) => s.id === selectedServiceId) || SERVICES_LIST[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 7) {
      alert(lang === 'ne' ? 'कृपया मान्य मोबाइल नम्बर राख्नुहोस्' : 'Please provide a valid phone number');
      return;
    }

    onPlayClick();
    setIsSubmitting(true);

    const result = await submitCustomerBooking({
      customer_name: fullName.trim() || (lang === 'ne' ? 'विराटनगर ग्राहक' : 'Biratnagar Customer'),
      phone: phone.trim(),
      service_id: currentService.id,
      service_name: lang === 'ne' ? currentService.nameNe : currentService.nameEn,
      hub: hub,
      urgency: urgency,
      notes: notes.trim(),
    });

    setIsSubmitting(false);
    onPlaySuccess();
    setConfirmedBooking(result.record);
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="absolute inset-0" onClick={handleResetAndClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FAF9F6] dark:bg-[#0B0F19] border border-stone-200/90 dark:border-stone-800 shadow-2xl p-5 sm:p-6 text-slate-800 dark:text-slate-100"
      >
        {/* Modal Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-200/60 dark:hover:bg-stone-800 text-stone-500 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* View A: Booking Confirmation Receipt */}
        {confirmedBooking ? (
          <div className="py-4 text-center">
            {/* Lottie-style animated success ring */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30"
            >
              <Check className="w-9 h-9 stroke-[3]" />
            </motion.div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-black mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ne' ? 'बुकिंग दर्ता भयो!' : 'Booking Confirmed!'}</span>
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-1">
              {lang === 'ne' ? 'दाइलाई सूचना पठाइयो!' : 'Dai Dispatched!'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto mb-6">
              {lang === 'ne'
                ? `तपाईंको क्षेत्र (${confirmedBooking.hub}) का प्रमाणित बीर दाइले १५-२५ मिनेट भित्र तपाईंलाई कल गर्नुहुनेछ।`
                : `A verified Bir Dai in ${confirmedBooking.hub} will call your phone in 15-25 minutes.`}
            </p>

            {/* Booking Details Card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 text-left mb-6 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                <span className="text-xs text-stone-500 font-bold">
                  {lang === 'ne' ? 'बुकिङ नम्बर' : 'Booking Ref'}:
                </span>
                <span className="text-xs font-black text-[#FF6B00] font-mono">
                  {confirmedBooking.booking_ref}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">
                  {lang === 'ne' ? 'रोजिएको सेवा' : 'Service'}:
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {confirmedBooking.service_name}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">
                  {lang === 'ne' ? 'सम्पर्क नम्बर' : 'Phone'}:
                </span>
                <span className="font-bold font-mono text-slate-900 dark:text-white">
                  {confirmedBooking.phone}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">
                  {lang === 'ne' ? 'स्थान' : 'Area'}:
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {confirmedBooking.hub}
                </span>
              </div>
            </div>

            {/* Direct Helpline Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <a
                href="tel:+9779800000000"
                onClick={onPlayClick}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#FF6B00] hover:bg-[#FF7A1A] text-white text-xs sm:text-sm font-black shadow-lg shadow-orange-500/25 transition-all active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{lang === 'ne' ? 'दाइलाई सिधै कल गर्नुस्' : 'Call Bir Dai Direct'}</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-stone-200/80 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs sm:text-sm font-bold transition-all"
              >
                {lang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          /* View B: Customer Booking Request Form */
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-[#FF6B00] text-white shadow-md shadow-orange-500/20">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {lang === 'ne' ? 'पूर्व नेपाल बीर दाइ बुक गर्नुहोस्' : 'Book an East Nepal Bir Dai'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'ne'
                    ? 'मोरङ • सुनसरी • झापा • ०% बिचौलिया कमिसन • १५-२५ मिनेटमा रेस्पोन्स'
                    : 'Morang • Sunsari • Jhapa • Zero broker markup • 15 min response'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. Select Service Category */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  {lang === 'ne' ? 'कुन सेवा चाहिएको हो?' : 'Select Service Needed:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SERVICES_LIST.map((srv) => {
                    const Icon = srv.icon;
                    const isSel = srv.id === selectedServiceId;
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => {
                          onPlayPop();
                          setSelectedServiceId(srv.id);
                        }}
                        className={`p-2.5 rounded-2xl border text-left flex flex-col justify-between transition-all relative overflow-hidden ${
                          isSel
                            ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500 ring-2 ring-emerald-500 shadow-sm'
                            : 'bg-white dark:bg-stone-900/60 border-stone-200/80 dark:border-stone-800 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div
                            className={`p-1.5 rounded-xl ${
                              isSel
                                ? 'bg-emerald-500 text-white'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          {isSel && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          )}
                        </div>
                        <span className="text-[11px] font-black block leading-tight text-slate-900 dark:text-white truncate">
                          {lang === 'ne' ? srv.nameNe : srv.nameEn}
                        </span>
                        <span className="text-[9px] font-bold text-stone-500 font-mono mt-0.5">
                          {srv.estPrice}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Customer Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {lang === 'ne' ? 'तपाईंको नाम (वैकल्पिक)' : 'Your Name (Optional)'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={lang === 'ne' ? 'उदाहरण: सविन श्रेष्ठ' : 'e.g. Sabin Shrestha'}
                      className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {lang === 'ne' ? 'मोबाइल नम्बर *' : 'Phone Number *'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98XXXXXXXX"
                      className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF6B00] font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Location Hub in East Nepal */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {lang === 'ne' ? 'कुन सहर / क्षेत्रमा सेवा चाहिन्छ? (मोरङ, सुनसरी, झापा)' : 'Select City & Area (Morang, Sunsari, Jhapa):'}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                  <select
                    value={hub}
                    onChange={(e) => setHub(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF6B00] appearance-none"
                  >
                    {EAST_NEPAL_HUBS.map((h) => (
                      <option key={h.id} value={h.nameNe}>
                        {h.nameNe}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 4. Urgency Preference */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  {lang === 'ne' ? 'समयको प्राथमिकता' : 'When is it needed?'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'urgent', labelNe: 'तत्काल (१५-२५ मिनेट)', labelEn: 'Urgent (15-25 min)', icon: Zap },
                    { id: 'today', labelNe: 'आजै (सुविधा अनुसार)', labelEn: 'Today (Flexible)', icon: Clock },
                    { id: 'tomorrow', labelNe: 'भोलिको लागि', labelEn: 'Tomorrow', icon: CheckCircle2 },
                  ].map((p) => {
                    const PIcon = p.icon;
                    const isSel = urgency === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          onPlayPop();
                          setUrgency(p.id as any);
                        }}
                        className={`p-2 rounded-2xl border text-center text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                          isSel
                            ? 'bg-[#FF6B00] text-white border-[#FF6B00] shadow-md shadow-orange-500/20'
                            : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300'
                        }`}
                      >
                        <PIcon className="w-3.5 h-3.5" />
                        <span className="text-[10px] leading-tight block">
                          {lang === 'ne' ? p.labelNe : p.labelEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Problem Notes */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {lang === 'ne' ? 'समस्याको विवरण (वैकल्पिक)' : 'Issue Note (Optional)'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    lang === 'ne'
                      ? 'उदाहरण: धारा लिक भएर पानी बगिरहेको छ, वा मोटर चलेन'
                      : 'e.g. Water pipe leaking heavily or motor not turning on'
                  }
                  className="w-full px-3 py-2 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              {/* Trust Guarantee Note */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-[11px] font-semibold">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>
                  {lang === 'ne'
                    ? 'कुनै अग्रिम शुल्क छैन। काम चित्त बुझेपछि सिधै दाइलाई भुक्तानी गर्नुहोस्।'
                    : 'Zero advance fee. Pay direct to the Dai only after work is done right.'}
                </span>
              </div>

              {/* Submit CTA */}
              <TactileButton
                variant="orange"
                size="lg"
                fullWidth
                disabled={isSubmitting}
                className="text-sm font-black py-3.5 shadow-lg shadow-orange-500/25 active:scale-95"
                icon={<CheckCircle2 className="w-4 h-4" />}
              >
                {isSubmitting
                  ? lang === 'ne'
                    ? 'दर्ता हुँदैछ...'
                    : 'Dispatching...'
                  : lang === 'ne'
                  ? 'दाइ बुक गर्नुस् (तत्काल)'
                  : 'Confirm Booking'}
              </TactileButton>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
