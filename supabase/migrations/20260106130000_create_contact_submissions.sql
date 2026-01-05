-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow any user (anon included) to insert
CREATE POLICY "Allow public insert" ON public.contact_submissions
    FOR INSERT
    WITH CHECK (true);

-- Policy: Allow admins to do everything
CREATE POLICY "Allow admins all" ON public.contact_submissions
    FOR ALL
    USING (public.is_admin(auth.jwt() ->> 'email'));
