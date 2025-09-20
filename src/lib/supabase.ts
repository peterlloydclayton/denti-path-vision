import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://epkypzawqtpokmatjuzo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwa3lwemF3cXRwb2ttYXRqdXpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODc4MTgsImV4cCI6MjA3MTQ2MzgxOH0.QYx4QwYhBRHhMdfgmuHUHpWN2R1q7CetLCAS69w3yJU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PublicProviderProfile {
  id: string;
  first_name: string;
  last_name: string;
  profile_photo_url?: string;
  bio?: string;
  specialties?: string[];
  practice_name?: string;
  city?: string;
  state?: string;
  address?: string;
  phone?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const getActiveProviders = async (searchTerm?: string, city?: string) => {
  let query = supabase
    .from('public_provider_profiles')
    .select('*')
    .eq('is_active', true);

  if (searchTerm) {
    query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,practice_name.ilike.%${searchTerm}%`);
  }

  if (city) {
    query = query.ilike('city', `%${city}%`);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching providers:', error);
    return [];
  }
  
  return data as PublicProviderProfile[];
};