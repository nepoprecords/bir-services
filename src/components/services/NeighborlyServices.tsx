import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Snowflake,
  Zap,
  Wrench,
  Bike,
  Hammer,
  Paintbrush,
  ShieldCheck,
  Clock,
  CheckCircle2,
  PhoneCall,
  Search,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { Language } from '../../types';
import { TactileButton } from '../ui/TactileButton';

interface NeighborlyServicesProps {
  lang: Language;
  onOpenBooking: (serviceId?: string) => void;
  onPlayClick: () => void;
  onPlayPop: () => void;
}

interface ServiceCardData {
  id: string;
  titleNe: string;
  titleEn: string;
  descNe: string;
  descEn: string;
  icon: React.ReactNode;
  estPriceNPR: string;
  timeEstimate: string;
  popularIn: string;
  badge?: string;
  featuresNe: string[];
  featuresEn: string[];
}

export const NeighborlyServices: React.FC<NeighborlyServicesProps> = ({
  lang,
  onOpenBooking,
  onPlayClick,
  onPlayPop,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services: ServiceCardData[] = [
    {
      id: 'ac_cooler',
      titleNe: 'AC, कुलर & फ्रिज मर्मत',
      titleEn: 'AC, Cooler & Refrigerator Care',
      descNe: 'मोरङ, सुनसरी र झापाको चर्को गर्मीमा ग्यास लिक, कुलिङ नहुने वा कम्प्रेशर समस्याको तत्काल समाधान।',
      descEn: 'Instant diagnosis for gas leaks, zero cooling, or compressor failure in the East Nepal summer heat.',
      icon: <Snowflake className="w-5 h-5 text-cyan-500" />,
      estPriceNPR: 'रू ७५० देखि',
      timeEstimate: '१५-२५ मिनेट',
      popularIn: 'विराटनगर, इटहरी, दमक, इनरुवा',
      badge: '🔥 उच्च माग (High Demand)',
      featuresNe: ['ग्यास रिफिल & प्रेसर जाँच', 'कम्प्रेशर & मोटर मर्मत', 'सिजनल सर्भिसिङ'],
      featuresEn: ['Gas Refill & Leak Detection', 'Compressor Diagnostics', 'Full Seasonal Wash'],
    },
    {
      id: 'electrician_motor',
      titleNe: 'पानी मोटर & इन्डस्ट्रियल बिजुली',
      titleEn: 'Water Pump & Electrical Wiring',
      descNe: 'बोरिङ मोटर नचल्ने, रिवाइन्डिङ, इनभर्टर ब्याट्री तथा सट-सर्किट मर्मत।',
      descEn: 'Boring motor breakdown, rewinding, inverter backup & short circuit restoration.',
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      estPriceNPR: 'रू ५०० देखि',
      timeEstimate: '२० मिनेट',
      popularIn: 'धरान, बिर्तामोड, दुहबी, विराटनगर',
      badge: '⚡️ सुपर फास्ट',
      featuresNe: ['मोटर रिवाइन्डिङ', 'MCB ट्रिपिङ & शट फिक्स', 'इनभर्टर जडान'],
      featuresEn: ['Motor Rewinding', 'MCB Tripping Fix', 'Inverter Wiring'],
    },
    {
      id: 'plumbing_leak',
      titleNe: 'प्लम्बिङ, धारा & लिकेज',
      titleEn: 'Plumbing, Boring & Leakage',
      descNe: 'धाराबाट पानी नआउने, पाइप लिक, ट्यांकी सफाइ तथा बाथरुम फिटिङ।',
      descEn: 'Water pipe bursts, underground line diagnosis, overhead tank setup & bathroom repair.',
      icon: <Wrench className="w-5 h-5 text-blue-500" />,
      estPriceNPR: 'रू ४५० देखि',
      timeEstimate: '२५ मिनेट',
      popularIn: 'इटहरी, कञ्चनबारी, भद्रपुर, उर्लाबारी',
      featuresNe: ['पाइप लिकेज सिपिङ चेक', 'ट्यांकी अटो-कट सेन्सर', 'नयाँ सेनेटरी फिटिङ'],
      featuresEn: ['Concealed Leak Test', 'Tank Auto-cut Sensor', 'Sanitary Installations'],
    },
    {
      id: 'roadside_bike',
      titleNe: 'अन-कल बाइक & अटो मेकानिक',
      titleEn: 'On-Call Highway Bike Roadside',
      descNe: 'कोशी राजमार्ग र महेन्द्र हाइवेमा बाटोमै पञ्चर, स्टार्ट नहुने वा ब्रेक जाम समस्या।',
      descEn: 'Rapid mobile mechanic for puncture, chain drop, or dead battery along Koshi & Mahendra Highway.',
      icon: <Bike className="w-5 h-5 text-rose-500" />,
      estPriceNPR: 'रू ३५० देखि',
      timeEstimate: '१५ मिनेट',
      popularIn: 'कोशी हाइवे, महेन्द्र हाइवे (इटहरी-बिर्तामोड)',
      featuresNe: ['ट्यूबलेस पञ्चर तत्काल', 'ब्याट्री जम्प स्टार्ट', 'अन-स्पट क्लच/चेन मर्मत'],
      featuresEn: ['Emergency Tubeless Patch', 'Battery Jump-start', 'On-spot Cable Repair'],
    },
    {
      id: 'carpentry_door',
      titleNe: 'काठ, ढोका & फर्निचर दाई',
      titleEn: 'Carpentry, Locks & Furniture',
      descNe: 'ढोकाको लक बिग्रिएको, काठको दराज, पसलको सटर जाम तथा नयाँ फर्निचर काम।',
      descEn: 'Door lock jammed, customized wardrobes, shop rolling shutter repairs & hinges.',
      icon: <Hammer className="w-5 h-5 text-amber-600" />,
      estPriceNPR: 'रू ५५० देखि',
      timeEstimate: '३० मिनेट',
      popularIn: 'दमक, धरान, बेलबारी, विराटनगर',
      featuresNe: ['सटर लक & कब्जा रिपेयर', 'प्लाईवुड फर्निचर', 'झ्याल ढोका फिटिङ'],
      featuresEn: ['Shutter Alignment', 'Plywood Fixes', 'Precision Window Fitting'],
    },
    {
      id: 'wall_painting',
      titleNe: 'रंगरोगन, पुटिङ & वाटरप्रूफिङ',
      titleEn: 'Painting, Putty & Waterproofing',
      descNe: 'भित्तामा ओस आउने (Dampness), कलर पेन्टिङ र वाटरप्रूफ केमिकल कोटिङ।',
      descEn: 'Wall dampness treatment, weathercoat exterior, interior putty & smooth roll paint.',
      icon: <Paintbrush className="w-5 h-5 text-purple-500" />,
      estPriceNPR: 'रू ८०० देखि',
      timeEstimate: 'आजै सुरु',
      popularIn: 'बिर्तामोड, इटहरी, विराटनगर, धरान',
      featuresNe: ['ओस रोक्ने वाटरप्रूफिङ', 'वाल पुटिङ & फिनिसिङ', 'प्रिमियम कलर रोलिङ'],
      featuresEn: ['Damp Proof Coating', 'Wall Putty Surface Prep', 'Premium Emulsion'],
    },
  ];

  return (
    <section id="services" className="relative py-14 px-4 bg-slate-50/70 dark:bg-slate-950/60 border-t border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto">
        {/* Neighborly / Frontdoor Style Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-black uppercase tracking-wider mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>
              {lang === 'ne'
                ? 'घर & पसल मर्मत सेवा (Neighborly Trust)'
                : 'Home & Shop Repair Care (Neighborly Trust)'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
            {lang === 'ne' ? (
              <>
                पूर्व नेपाल (मोरङ • सुनसरी • झापा) —{' '}
                <span className="text-[#FF6B00]">प्रमाणित सुपर-दाई</span> तपाईंको ढोकामा!
              </>
            ) : (
              <>
                Across East Nepal (Morang • Sunsari • Jhapa) —{' '}
                <span className="text-[#FF6B00]">Certified Super-Dais</span> at your doorstep!
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
            {lang === 'ne'
              ? 'सामान्य मर्मत देखि आपतकालीन सेवा सम्म। निश्चित दर, १५-२५ मिनेटमै मोरङ, सुनसरी र झापाका दक्ष दाइहरू तपाईंको घरमा।'
              : 'From routine maintenance to urgent repairs. Transparent rates, verified technicians arriving in 15-25 mins across Morang, Sunsari & Jhapa.'}
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {services.map((srv) => (
            <motion.div
              key={srv.id}
              whileHover={{ y: -3 }}
              onClick={onPlayPop}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-[#FF6B00]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Card Top Pill */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                    {srv.icon}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <Clock className="w-3 h-3" />
                    <span>{srv.timeEstimate}</span>
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
                  {lang === 'ne' ? srv.titleNe : srv.titleEn}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {lang === 'ne' ? srv.descNe : srv.descEn}
                </p>

                {/* Bullet Features */}
                <div className="space-y-1.5 mb-4">
                  {(lang === 'ne' ? srv.featuresNe : srv.featuresEn).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {lang === 'ne' ? 'अनुमानित दर' : 'Est. Rate'}
                  </span>
                  <span className="text-sm font-black text-slate-900 dark:text-amber-400 font-mono">
                    {srv.estPriceNPR}
                  </span>
                </div>

                <TactileButton
                  variant="orange"
                  size="sm"
                  onPressSound={onPlayClick}
                  onClick={() => onOpenBooking(srv.id)}
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  {lang === 'ne' ? 'दाई बुक गर्नुस्' : 'Book Dai'}
                </TactileButton>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Neighborly "Done Right Promise" Trust Box */}
        <div className="rounded-3xl p-6 bg-gradient-to-r from-amber-500/10 via-[#FF6B00]/10 to-emerald-500/10 border-2 border-[#FF6B00]/30 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FF6B00] text-white flex items-center justify-center font-black shadow-lg shadow-orange-950/20 flex-shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {lang === 'ne' ? 'बीर "काम राम्रो ग्यारेन्टी" (Done-Right Promise)' : 'BIR "Done-Right Promise"'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mt-0.5 font-medium">
                {lang === 'ne'
                  ? 'यदि काम चित्त बुझेन भने २४ घण्टा भित्र पुनः निःशुल्क मर्मत गरिन्छ। कुनै मोलमोलाइ छैन, १००% विश्वास र परिवार जस्तै आफ्ना दाइहरू।'
                  : 'If the repair isn’t done right, we’ll make it right at zero extra charge. Zero bargaining hassle, 100% verified trustworthy local pros.'}
              </p>
            </div>
          </div>

          <TactileButton
            variant="dark"
            size="md"
            onPressSound={onPlayClick}
            onClick={() => onOpenBooking()}
            icon={<PhoneCall className="w-4 h-4 text-emerald-400" />}
          >
            {lang === 'ne' ? 'इमर्जेन्सी कल: +९७७ ९८००००००००' : 'Emergency Helpline'}
          </TactileButton>
        </div>
      </div>
    </section>
  );
};
