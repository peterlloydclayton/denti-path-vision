-- Create storage bucket for signed documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'signed-documents',
  'signed-documents',
  false,
  5242880, -- 5MB limit
  ARRAY['application/pdf']
);

-- RLS Policies for signed-documents bucket
CREATE POLICY "Users can view their own signed documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'signed-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Service role can insert signed documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'signed-documents');

CREATE POLICY "Service role can update signed documents"
ON storage.objects FOR UPDATE
USING (bucket_id = 'signed-documents');