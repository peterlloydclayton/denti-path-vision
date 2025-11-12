-- Create signatures table
CREATE TABLE IF NOT EXISTS public.signatures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID,
  patient_id UUID,
  signer_name TEXT NOT NULL,
  signer_email TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  signature_type TEXT NOT NULL,
  consent_given BOOLEAN NOT NULL DEFAULT false,
  signed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  document_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create signed_documents table
CREATE TABLE IF NOT EXISTS public.signed_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  signature_id UUID NOT NULL REFERENCES public.signatures(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT DEFAULT 'application/pdf',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on signatures table
ALTER TABLE public.signatures ENABLE ROW LEVEL SECURITY;

-- Enable RLS on signed_documents table
ALTER TABLE public.signed_documents ENABLE ROW LEVEL SECURITY;

-- Admins can view all signatures
CREATE POLICY "Admins can view all signatures"
ON public.signatures
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can view all signed documents
CREATE POLICY "Admins can view all signed documents"
ON public.signed_documents
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Service role can insert signatures (for edge function)
CREATE POLICY "Service role can insert signatures"
ON public.signatures
FOR INSERT
WITH CHECK (true);

-- Service role can insert signed documents (for edge function)
CREATE POLICY "Service role can insert signed documents"
ON public.signed_documents
FOR INSERT
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_signatures_patient_id ON public.signatures(patient_id);
CREATE INDEX idx_signatures_signer_email ON public.signatures(signer_email);
CREATE INDEX idx_signed_documents_signature_id ON public.signed_documents(signature_id);