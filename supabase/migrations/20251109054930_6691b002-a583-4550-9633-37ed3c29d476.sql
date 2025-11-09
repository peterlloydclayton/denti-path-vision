-- Create enum for party type
CREATE TYPE public.party_type AS ENUM ('patient', 'provider', 'other');

-- Create interested_parties table
CREATE TABLE public.interested_parties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  party_type public.party_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  notes TEXT
);

-- Enable RLS
ALTER TABLE public.interested_parties ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for the chat backend to submit leads)
CREATE POLICY "Allow public inserts"
  ON public.interested_parties
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can view the data
CREATE POLICY "Authenticated users can view all"
  ON public.interested_parties
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index on email for faster lookups
CREATE INDEX idx_interested_parties_email ON public.interested_parties(email);

-- Create index on created_at for sorting
CREATE INDEX idx_interested_parties_created_at ON public.interested_parties(created_at DESC);