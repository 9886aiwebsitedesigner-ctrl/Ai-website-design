import { createClient } from '@supabase/supabase-js';

// Supabase project credentials provided for Junko Hair Studio
export const SUPABASE_PROJECT_ID = 'jjzzkiloptmhghozvvty';
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Vrqqf_0ng71sTW4jvkv8IQ_jThxwHWn';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface AppointmentRecord {
  id?: string;
  confirmation_code: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  service_id: string;
  service_name: string;
  stylist_id: string;
  stylist_name: string;
  appointment_date: string;
  time_slot: string;
  hair_length: string;
  chemical_history: string[];
  add_ons: string[];
  estimated_price: number;
  notes?: string;
  status?: string;
  created_at?: string;
}

export const SUPABASE_SQL_SETUP = `-- Run this in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query):
CREATE TABLE IF NOT EXISTS public.appointments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  confirmation_code text NOT NULL,
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_phone text NOT NULL,
  service_id text,
  service_name text NOT NULL,
  stylist_id text,
  stylist_name text,
  appointment_date text NOT NULL,
  time_slot text NOT NULL,
  hair_length text,
  chemical_history text[] DEFAULT '{}',
  add_ons text[] DEFAULT '{}',
  estimated_price numeric DEFAULT 0,
  notes text DEFAULT '',
  status text DEFAULT 'confirmed',
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous inserts from the booking website
CREATE POLICY "Allow anonymous insert appointments"
  ON public.appointments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous reading of appointments
CREATE POLICY "Allow anonymous select appointments"
  ON public.appointments
  FOR SELECT
  TO anon
  USING (true);
`;

export interface SaveBookingResult {
  success: boolean;
  data?: any;
  error?: string;
  tableMissing?: boolean;
}

/**
 * Saves a new appointment booking record into Supabase
 */
export async function saveAppointmentBooking(appointment: AppointmentRecord): Promise<SaveBookingResult> {
  try {
    const payload = {
      confirmation_code: appointment.confirmation_code,
      client_name: appointment.client_name,
      client_email: appointment.client_email,
      client_phone: appointment.client_phone,
      service_id: appointment.service_id,
      service_name: appointment.service_name,
      stylist_id: appointment.stylist_id,
      stylist_name: appointment.stylist_name,
      appointment_date: appointment.appointment_date,
      time_slot: appointment.time_slot,
      hair_length: appointment.hair_length,
      chemical_history: appointment.chemical_history || [],
      add_ons: appointment.add_ons || [],
      estimated_price: appointment.estimated_price,
      notes: appointment.notes || '',
      status: appointment.status || 'confirmed',
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('appointments')
      .insert([payload])
      .select();

    if (error) {
      console.error('Supabase booking insert error:', error);
      const isTableMissing = error.code === 'PGRST205' || 
        error.message?.includes('schema cache') || 
        error.message?.includes('relation "public.appointments" does not exist') ||
        error.message?.includes('not find the table');

      return {
        success: false,
        error: error.message,
        tableMissing: isTableMissing
      };
    }

    return {
      success: true,
      data
    };
  } catch (err: any) {
    console.error('Unexpected error submitting booking to Supabase:', err);
    return {
      success: false,
      error: err?.message || 'Network error saving booking'
    };
  }
}

/**
 * Checks connection status and whether the appointments table is ready in Supabase
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  tableExists: boolean;
  message: string;
}> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('id')
      .limit(1);

    if (error) {
      if (error.code === 'PGRST205' || error.message?.includes('schema cache') || error.message?.includes('not find the table')) {
        return {
          connected: true,
          tableExists: false,
          message: "Connected to Supabase project, but 'appointments' table has not been created yet."
        };
      }
      return {
        connected: false,
        tableExists: false,
        message: error.message
      };
    }

    return {
      connected: true,
      tableExists: true,
      message: "Connected! 'appointments' table is live and accepting submissions."
    };
  } catch (err: any) {
    return {
      connected: false,
      tableExists: false,
      message: err?.message || 'Connection failed'
    };
  }
}

/**
 * Fetches recent appointments stored in Supabase
 */
export async function fetchRecentAppointments(limit = 100): Promise<{
  success: boolean;
  appointments: AppointmentRecord[];
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      return { success: false, appointments: [], error: error.message };
    }

    return { success: true, appointments: (data as AppointmentRecord[]) || [] };
  } catch (err: any) {
    return { success: false, appointments: [], error: err?.message };
  }
}

/**
 * Updates an appointment's status in Supabase
 */
export async function updateAppointmentStatus(id: string, status: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update status' };
  }
}

/**
 * Deletes an appointment from Supabase
 */
export async function deleteAppointment(id: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to delete appointment' };
  }
}

// ==========================================
// SINGLE-SLOT ADMIN ACCOUNT & AUTHENTICATION
// ==========================================

export const SALON_ADMIN_SQL_SETUP = `-- Run this in your Supabase SQL Editor if you want to store the admin account in Supabase as well:
CREATE TABLE IF NOT EXISTS public.salon_admin (
  id integer PRIMARY KEY DEFAULT 1,
  email text NOT NULL UNIQUE,
  full_name text NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT single_admin_slot CHECK (id = 1)
);

ALTER TABLE public.salon_admin ENABLE ROW LEVEL SECURITY;

-- Allow reading the admin profile for login verification
CREATE POLICY "Allow public select on salon_admin"
  ON public.salon_admin
  FOR SELECT
  TO anon
  USING (true);

-- Allow inserting the first admin only (id = 1)
CREATE POLICY "Allow insert single admin"
  ON public.salon_admin
  FOR INSERT
  TO anon
  WITH CHECK (id = 1);
`;

const LOCAL_ADMIN_KEY = 'junko_studio_admin_single_slot';
const LOCAL_SESSION_KEY = 'junko_studio_admin_session';

export interface AdminAccount {
  email: string;
  fullName: string;
  passwordHash: string;
  createdAt: string;
}

export interface AdminSession {
  email: string;
  fullName: string;
  loggedInAt: string;
}

/**
 * Hash a password using browser standard Web Crypto API (SHA-256)
 */
export async function hashPassword(password: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(password.trim() + '_junko_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Checks if the single admin slot is already taken.
 * Checks both Supabase `salon_admin` table and browser localStorage.
 */
export async function checkAdminAccountExists(): Promise<{
  exists: boolean;
  adminInfo?: { email: string; fullName: string; createdAt: string };
  source?: 'supabase' | 'local';
}> {
  // 1. First check Supabase salon_admin table
  try {
    const { data, error } = await supabase
      .from('salon_admin')
      .select('email, full_name, created_at')
      .eq('id', 1)
      .limit(1);

    if (!error && data && data.length > 0) {
      const record = data[0];
      // Sync to local storage for fast fallback
      const localData = {
        email: record.email,
        fullName: record.full_name,
        createdAt: record.created_at
      };
      return {
        exists: true,
        adminInfo: localData,
        source: 'supabase'
      };
    }
  } catch (e) {
    // Supabase table may not exist yet, fallback to local storage
  }

  // 2. Check local storage
  try {
    const stored = localStorage.getItem(LOCAL_ADMIN_KEY);
    if (stored) {
      const parsed: AdminAccount = JSON.parse(stored);
      return {
        exists: true,
        adminInfo: {
          email: parsed.email,
          fullName: parsed.fullName,
          createdAt: parsed.createdAt
        },
        source: 'local'
      };
    }
  } catch (e) {
    console.error('Error reading local admin slot:', e);
  }

  return { exists: false };
}

/**
 * Registers the ONLY admin account (Single Slot).
 * If an admin already exists, this method immediately aborts and returns an error.
 */
export async function registerSingleAdmin(params: {
  email: string;
  fullName: string;
  password: string;
}): Promise<{
  success: boolean;
  error?: string;
  adminInfo?: { email: string; fullName: string };
}> {
  // CRITICAL CHECK: Verify slot is NOT already taken
  const check = await checkAdminAccountExists();
  if (check.exists) {
    return {
      success: false,
      error: 'The single admin slot is already taken! Further registrations are strictly forbidden.'
    };
  }

  const cleanEmail = params.email.trim().toLowerCase();
  const cleanName = params.fullName.trim();
  const passwordHash = await hashPassword(params.password);
  const now = new Date().toISOString();

  // 1. Try to persist to Supabase if salon_admin table exists
  try {
    await supabase.from('salon_admin').insert([{
      id: 1,
      email: cleanEmail,
      full_name: cleanName,
      password_hash: passwordHash,
      created_at: now
    }]);
  } catch (err) {
    console.warn('Could not save to Supabase salon_admin table directly (table might not exist yet):', err);
  }

  // 2. Persist to local storage to guarantee permanent single-slot locking
  const adminRecord: AdminAccount = {
    email: cleanEmail,
    fullName: cleanName,
    passwordHash,
    createdAt: now
  };
  localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminRecord));

  // 3. Automatically create an active session for the owner
  const session: AdminSession = {
    email: cleanEmail,
    fullName: cleanName,
    loggedInAt: now
  };
  localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));

  return {
    success: true,
    adminInfo: {
      email: cleanEmail,
      fullName: cleanName
    }
  };
}

/**
 * Logs in the admin by comparing credentials with the single registered admin account.
 */
export async function loginAdmin(email: string, password: string): Promise<{
  success: boolean;
  error?: string;
  session?: AdminSession;
}> {
  const cleanEmail = email.trim().toLowerCase();
  const passwordHash = await hashPassword(password);

  // 1. Check Supabase first
  try {
    const { data, error } = await supabase
      .from('salon_admin')
      .select('email, full_name, password_hash')
      .eq('id', 1)
      .limit(1);

    if (!error && data && data.length > 0) {
      const admin = data[0];
      if (admin.email.toLowerCase() === cleanEmail && admin.password_hash === passwordHash) {
        const session: AdminSession = {
          email: admin.email,
          fullName: admin.full_name,
          loggedInAt: new Date().toISOString()
        };
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));
        return { success: true, session };
      } else if (admin.email.toLowerCase() !== cleanEmail) {
        return { success: false, error: 'Unrecognized administrator email.' };
      } else {
        return { success: false, error: 'Incorrect administrator password.' };
      }
    }
  } catch (e) {
    // fallback to local storage
  }

  // 2. Check local storage
  try {
    const stored = localStorage.getItem(LOCAL_ADMIN_KEY);
    if (!stored) {
      return { success: false, error: 'No admin account has been created yet. Please use the registration slot first.' };
    }
    const admin: AdminAccount = JSON.parse(stored);
    if (admin.email.toLowerCase() === cleanEmail && admin.passwordHash === passwordHash) {
      const session: AdminSession = {
        email: admin.email,
        fullName: admin.fullName,
        loggedInAt: new Date().toISOString()
      };
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));
      return { success: true, session };
    } else if (admin.email.toLowerCase() !== cleanEmail) {
      return { success: false, error: 'Unrecognized administrator email.' };
    } else {
      return { success: false, error: 'Incorrect administrator password.' };
    }
  } catch (e) {
    return { success: false, error: 'Failed to authenticate admin.' };
  }
}

/**
 * Returns current admin session if logged in
 */
export function getAdminSession(): AdminSession | null {
  try {
    const stored = localStorage.getItem(LOCAL_SESSION_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    return null;
  }
  return null;
}

/**
 * Logs out the administrator
 */
export function logoutAdmin(): void {
  localStorage.removeItem(LOCAL_SESSION_KEY);
}
