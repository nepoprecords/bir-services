import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Database, Download, Users, Phone, MapPin, CheckCircle2, Shield } from 'lucide-react';
import { getLocalProviders, exportProvidersToCSV, ProviderRecord, isSupabaseConfigured } from '../../lib/supabase';
import { TactileButton } from '../ui/TactileButton';

interface AdminLeadsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayClick: () => void;
}

export const AdminLeadsDrawer: React.FC<AdminLeadsDrawerProps> = ({
  isOpen,
  onClose,
  onPlayClick,
}) => {
  const [leads, setLeads] = useState<ProviderRecord[]>([]);

  useEffect(() => {
    if (isOpen) {
      setLeads(getLocalProviders());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="relative z-10 w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between p-5 text-slate-800 dark:text-slate-100"
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#FF6B00]/15 text-[#FF6B00]">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Registered Birs (Leads DB)
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {isSupabaseConfigured ? '🟢 Supabase Connected + Local Backup' : '💾 Local Storage Database'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Total Applicants: <strong className="text-[#FF6B00]">{leads.length}</strong>
            </span>

            <TactileButton
              variant="outline"
              size="sm"
              onPressSound={onPlayClick}
              onClick={exportProvidersToCSV}
              icon={<Download className="w-3.5 h-3.5 text-[#FF6B00]" />}
            >
              Export to Excel (CSV)
            </TactileButton>
          </div>
        </div>

        {/* Leads List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 py-2 pr-1">
          {leads.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-4 text-slate-400">
              <Users className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-2" />
              <p className="text-xs font-bold">No provider applications yet.</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Complete the "Dai Bannus" flow on the landing page to test.
              </p>
            </div>
          ) : (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {lead.full_name}
                  </h4>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black">
                    {lead.pass_id}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-semibold mb-1">
                  <Phone className="w-3 h-3 text-[#FF6B00]" />
                  <span>+977 {lead.phone}</span>
                  <span className="text-slate-400">•</span>
                  <span className="capitalize text-amber-600 dark:text-amber-400">{lead.trade}</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{lead.hubs.join(', ') || lead.city}</span>
                </div>

                <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex justify-between">
                  <span>{lead.experience_years} yrs exp • {lead.has_tools ? 'Own Tools' : 'Needs Tools'}</span>
                  <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 text-center">
          💡 Supabase schema is ready in <code className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-[10px]">supabase/schema.sql</code>
        </div>
      </motion.div>
    </div>
  );
};
