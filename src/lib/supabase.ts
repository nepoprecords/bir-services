import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { OnboardingData } from '../types';

// Supabase credentials (can be supplied via Vercel Environment Variables or .env.local)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==========================================
// 1. PROVIDER / DAI DATA TYPES & STORAGE
// ==========================================

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
    city: data.city || 'East Nepal (Morang, Sunsari, Jhapa)',
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

export function exportProvidersToCSV(): void {
  const records = getLocalProviders();
  if (records.length === 0) {
    alert('No provider applications stored yet.');
    return;
  }

  const headers = ['Full Name', 'Phone', 'Trade', 'Experience (Years)', 'Has Tools', 'Vehicle', 'City / Region', 'Hubs', 'Pass ID', 'Registered At'];
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
  link.setAttribute('download', `bir_providers_east_nepal_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ==========================================
// 2. CUSTOMER SERVICE BOOKINGS DATA & STORAGE
// ==========================================

export interface CustomerBookingRecord {
  id: string;
  booking_ref: string;
  customer_name: string;
  phone: string;
  service_id: string;
  service_name: string;
  hub: string;
  urgency: 'urgent' | 'today' | 'tomorrow';
  notes?: string;
  status: 'pending' | 'dispatched' | 'completed';
  created_at: string;
}

const LOCAL_BOOKINGS_KEY = 'bir_customer_bookings_db';

export function getLocalBookings(): CustomerBookingRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_BOOKINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalBooking(record: CustomerBookingRecord): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getLocalBookings();
    list.unshift(record);
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(list));

    // Also cache customer profile for autofill
    localStorage.setItem(
      'bir_customer_profile',
      JSON.stringify({
        customer_name: record.customer_name,
        phone: record.phone,
        hub: record.hub,
      })
    );
  } catch (err) {
    console.error('Failed to save booking to local db', err);
  }
}

export function getSavedCustomerProfile(): { customer_name?: string; phone?: string; hub?: string } {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('bir_customer_profile');
    if (raw) return JSON.parse(raw);

    // Or check if user previously completed provider onboarding
    const provs = getLocalProviders();
    if (provs.length > 0) {
      return {
        customer_name: provs[0].full_name,
        phone: provs[0].phone,
        hub: provs[0].hubs[0] || '',
      };
    }
    return {};
  } catch {
    return {};
  }
}

export async function submitCustomerBooking(
  bookingData: Omit<CustomerBookingRecord, 'id' | 'booking_ref' | 'status' | 'created_at'>
): Promise<{ success: boolean; booking_ref: string; record: CustomerBookingRecord }> {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const bookingRef = `BIR-BK-${randomNum}`;

  const record: CustomerBookingRecord = {
    id: `book_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    booking_ref: bookingRef,
    customer_name: bookingData.customer_name,
    phone: bookingData.phone,
    service_id: bookingData.service_id,
    service_name: bookingData.service_name,
    hub: bookingData.hub,
    urgency: bookingData.urgency,
    notes: bookingData.notes || '',
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  // 1. Always save to local database
  saveLocalBooking(record);

  // 2. Try Supabase cloud if active
  if (supabase) {
    try {
      await supabase.from('bookings').insert([record]);
    } catch (err) {
      console.warn('Supabase booking insert skipped:', err);
    }
  }

  // 3. Optional webhook/API call
  try {
    fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    }).catch(() => {});
  } catch {
    // ignore
  }

  return { success: true, booking_ref: bookingRef, record };
}

export function exportBookingsToCSV(): void {
  const records = getLocalBookings();
  if (records.length === 0) {
    alert('No customer bookings stored yet.');
    return;
  }

  const headers = ['Booking Ref', 'Customer Name', 'Phone', 'Service', 'Area / Hub', 'Urgency', 'Notes', 'Status', 'Date'];
  const rows = records.map((b) => [
    `"${b.booking_ref}"`,
    `"${b.customer_name}"`,
    `"${b.phone}"`,
    `"${b.service_name}"`,
    `"${b.hub}"`,
    `"${b.urgency}"`,
    `"${(b.notes || '').replace(/"/g, '""')}"`,
    `"${b.status}"`,
    `"${b.created_at}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `bir_customer_bookings_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
