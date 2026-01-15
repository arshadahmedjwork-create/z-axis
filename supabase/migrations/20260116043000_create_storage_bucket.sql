-- Create a new storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true);

-- Policy to allow public access to view images
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'blog-images' );

-- Policy to allow authenticated users (admin) to upload images
CREATE POLICY "Auth Upload" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'blog-images' AND auth.role() = 'authenticated' );

-- Policy to allow authenticated users (admin) to delete images
CREATE POLICY "Auth Delete" 
ON storage.objects FOR DELETE 
USING ( bucket_id = 'blog-images' AND auth.role() = 'authenticated' );

-- Policy to allow authenticated users to update images
CREATE POLICY "Auth Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'blog-images' AND auth.role() = 'authenticated' );
