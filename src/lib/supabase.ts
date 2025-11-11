// This file no longer exports the supabase client.
// Import supabase from '@/integrations/supabase/client' instead.
// This file only contains helper functions for provider search.

export interface PublicProviderProfile {
  id: string;
  provider_id?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  title?: string;
  photo_url?: string;
  profile_photo_url?: string;
  bio?: string;
  specialties?: string[];
  practice_name?: string;
  business_location?: string;
  city?: string;
  state?: string;
  address?: string;
  phone?: string;
  contact_phone?: string;
  contact_email?: string;
  location_id?: string;
  location?: {
    city?: string;
    state?: string;
    address?: string;
    zip_code?: string;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Sanitize search input to prevent SQL injection
const sanitizeSearch = (term: string): string => {
  return term.replace(/[%_]/g, '\\$&').slice(0, 100);
};

export const getActiveProviders = async (searchTerm?: string, city?: string) => {
  // Import supabase locally to avoid circular dependencies
  const { supabase } = await import('@/integrations/supabase/client');
  
  let query = supabase
    .from('public_provider_profiles')
    .select(`
      *,
      location:location_id (
        city,
        state,
        zip_code
      )
    `)
    .eq('is_active', true);

  if (searchTerm) {
    const safeTerm = sanitizeSearch(searchTerm);
    query = query.or(`full_name.ilike.%${safeTerm}%,practice_name.ilike.%${safeTerm}%,business_location.ilike.%${safeTerm}%`);
  }

  if (city) {
    const safeCity = sanitizeSearch(city);
    query = query.ilike('location.city', `%${safeCity}%`);
  }

  const { data, error } = await query;
  
  if (error) {
    return [];
  }
  
  return data as PublicProviderProfile[];
};