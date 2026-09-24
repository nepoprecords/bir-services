import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { OnboardingData } from '../types';

// Supabase credentials (can be supplied via Vercel Environment Variables or .env.local)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface ProviderRecord {
  id: string;
  full_name: string;
  phone: string;
  trade: string;
  experience_years: number;
  has_tools: boolean;
  has_vehicle: string;
  city: string;
  hubs: string[];
  pass_id: string;
  status: 'pending' | 'verified' | 'active';
  created_at: string;
}

// Local Storage Buffer key for instant offline & zero-config persistence
const LOCAL_PROVIDERS_KEY = 'bir_providers_db';

export function getLocalProviders(): ProviderRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_PROVIDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalProvider(record: ProviderRecord): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getLocalProviders();
    list.unshift(record);
    localStorage.setItem(LOCAL_PROVIDERS_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save to local providers db', err);
  }
}

// Unified save function: attempts Supabase first, always backups to Local DB
export async function submitProviderApplication(
  data: OnboardingData,
  passId: string
): Promise<{ success: boolean; id: string; source: 'supabase' | 'local' }> {
  const record: ProviderRecord = {
    id: `prov_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    full_name: data.fullName,
    phone: data.phone,
    trade: data.trade || 'general',
    experience_years: data.experienceYears,
    has_tools: data.hasOwnTools,
    has_vehicle: data.hasVehicle,
    city: data.city || 'Biratnagar',
    hubs: data.hubs,
    pass_id: passId,
    status: 'verified',
    created_at: new Date().toISOString(),
  };

  // Always save locally so the lead is never lost
  saveLocalProvider(record);

  // If Supabase is configured, push to Supabase cloud
  if (supabase) {
    try {
      const { data: inserted, error } = await supabase
        .from('providers')
        .insert([record])
        .select();

      if (!error && inserted && inserted.length > 0) {
        return { success: true, id: inserted[0].id, source: 'supabase' };
      }
    } catch (err) {
      console.warn('Supabase push skipped, fallback to local buffer:', err);
    }
  }

  // Also POST to Vercel Serverless Function `/api/signup` if available
  try {
    fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    }).catch(() => {});
  } catch {
    // Ignore serverless network error
  }

  return { success: true, id: record.id, source: 'local' };
}

// Export stored providers to CSV for instant download
export function exportProvidersToCSV(): void {
  const records = getLocalProviders();
  if (records.length === 0) {
    alert('No applications stored yet.');
    return;
  }

  const headers = ['Full Name', 'Phone', 'Trade', 'Experience (Years)', 'Has Tools', 'Vehicle', 'City', 'Hubs', 'Pass ID', 'Registered At'];
  const rows = records.map((r) => [
    `"${r.full_name}"`,
    `"${r.phone}"`,
    `"${r.trade}"`,
    r.experience_years,
    r.has_tools ? 'Yes' : 'No',
    `"${r.has_vehicle}"`,
    `"${r.city}"`,
    `"${r.hubs.join('; ')}"`,
    `"${r.pass_id}"`,
    `"${r.created_at}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `bir_providers_biratnagar_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
