
import { createClient } from '@supabase/supabase-js';

// Supabase initialization
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase environment variables are properly configured
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase environment variables are missing. Please make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment."
  );
}

// Create a dummy client if we're in development and missing credentials
// This prevents the app from crashing during development
const dummySupabaseUrl = 'https://placeholder-project.supabase.co';
const dummySupabaseKey = 'placeholder-key';

// Use actual values or fallbacks
export const supabase = createClient(
  supabaseUrl || dummySupabaseUrl, 
  supabaseAnonKey || dummySupabaseKey
);

