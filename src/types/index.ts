export type Language = 'ne' | 'en';

export type TradeId = 
  | 'electrician'
  | 'plumber'
  | 'ac_repair'
  | 'bike_mechanic'
  | 'carpenter'
  | 'painter'
  | 'electronics';

export interface Trade {
  id: TradeId;
  titleEn: string;
  titleNe: string;
  icon: string;
  avgJobPayNPR: number;
  popularLocations: string[];
  demandLevel: 'high' | 'very_high' | 'insane';
}

export interface OnboardingData {
  trade: TradeId | null;
  experienceYears: number;
  hasOwnTools: boolean;
  hasVehicle: 'bike' | 'scooter' | 'public_transit' | 'none';
  city: string;
  hubs: string[];
  fullName: string;
  phone: string;
  otp: string;
  isVerified: boolean;
}

export interface DaiStory {
  id: string;
  name: string;
  tradeEn: string;
  tradeNe: string;
  location: string;
  monthlyKamaiNPR: number;
  jobsCompleted: number;
  quoteEn: string;
  quoteNe: string;
  badge: string;
  rating: number;
}
