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

// Provider search functionality disabled - table does not exist
// To enable provider search, create the public_provider_profiles table first
export const getActiveProviders = async (searchTerm?: string, city?: string): Promise<PublicProviderProfile[]> => {
  console.warn('Provider search is currently disabled - public_provider_profiles table does not exist');
  return [];
};