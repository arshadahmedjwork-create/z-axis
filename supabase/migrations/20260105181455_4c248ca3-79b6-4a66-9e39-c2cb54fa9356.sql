-- Create admin_emails table to whitelist admin users
CREATE TABLE public.admin_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;

-- Only allow admins to view the admin emails list (bootstrap with service role)
CREATE POLICY "Admins can view admin emails" 
ON public.admin_emails 
FOR SELECT 
USING (
  auth.jwt() ->> 'email' IN (SELECT email FROM public.admin_emails)
);

-- Function to check if user is admin (avoids recursion)
CREATE OR REPLACE FUNCTION public.is_admin(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_emails WHERE email = user_email
  )
$$;

-- Add admin policy to assessments for admin viewing
CREATE POLICY "Admins can view all assessments" 
ON public.assessments 
FOR SELECT 
USING (public.is_admin(auth.jwt() ->> 'email'));

-- Add admin policy to profiles for admin viewing
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.is_admin(auth.jwt() ->> 'email'));

-- Create bookings table for tracking consultation bookings
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES public.assessments(id),
  service_type TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'CAD',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_intent_id TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  calendly_event_id TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Users can view their own bookings
CREATE POLICY "Users can view their own bookings" 
ON public.bookings 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can create their own bookings
CREATE POLICY "Users can create their own bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Admins can view all bookings
CREATE POLICY "Admins can view all bookings" 
ON public.bookings 
FOR SELECT 
USING (public.is_admin(auth.jwt() ->> 'email'));

-- Admins can update any booking
CREATE POLICY "Admins can update any booking" 
ON public.bookings 
FOR UPDATE 
USING (public.is_admin(auth.jwt() ->> 'email'));

-- Trigger for bookings updated_at
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();