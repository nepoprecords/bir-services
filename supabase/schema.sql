-- Bir Services (BIR) Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create Providers Table
CREATE TABLE IF NOT EXISTS public.providers (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    trade TEXT NOT NULL,
    experience_years INTEGER DEFAULT 1,
    has_tools BOOLEAN DEFAULT TRUE,
    has_vehicle TEXT DEFAULT 'bike',
    city TEXT DEFAULT 'Biratnagar',
    hubs TEXT[] DEFAULT ARRAY[]::TEXT[],
    pass_id TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'verified',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Service Requests Table (for Customer bookings - Neighborly / Taskrabbit style)
CREATE TABLE IF NOT EXISTS public.service_requests (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    category TEXT NOT NULL,
    problem_description TEXT,
    hub_location TEXT NOT NULL,
    urgency TEXT DEFAULT 'routine', -- 'routine' or 'emergency'
    status TEXT DEFAULT 'pending',
    assigned_provider_id TEXT REFERENCES public.providers(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies (Allow anonymous public insert from landing page)
CREATE POLICY "Allow public insert to providers" 
ON public.providers FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Allow public select of verified providers" 
ON public.providers FOR SELECT 
TO anon 
USING (status = 'verified');

CREATE POLICY "Allow public insert to service_requests" 
ON public.service_requests FOR INSERT 
TO anon 
WITH CHECK (true);
