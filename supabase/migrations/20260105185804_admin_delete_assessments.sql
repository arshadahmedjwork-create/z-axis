-- Allow admins to delete assessments
CREATE POLICY "Admins can delete assessments" 
ON public.assessments 
FOR DELETE 
USING (public.is_admin(auth.jwt() ->> 'email'));
