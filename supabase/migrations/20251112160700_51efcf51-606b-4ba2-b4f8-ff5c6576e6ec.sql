-- Create provider_searches table to track all search queries
CREATE TABLE public.provider_searches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  search_term TEXT,
  location_search TEXT,
  radius_filter INTEGER,
  results_count INTEGER NOT NULL DEFAULT 0,
  user_location JSONB,
  search_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.provider_searches ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for search tracking
CREATE POLICY "Allow public search logging"
ON public.provider_searches
FOR INSERT
WITH CHECK (true);

-- Admins can view all searches
CREATE POLICY "Admins can view all searches"
ON public.provider_searches
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for performance
CREATE INDEX idx_provider_searches_timestamp ON public.provider_searches(search_timestamp DESC);
CREATE INDEX idx_provider_searches_results ON public.provider_searches(results_count);
CREATE INDEX idx_provider_searches_location ON public.provider_searches(location_search);