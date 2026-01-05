import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface AssessmentData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  homeCountry: string;
  isCitizen: string;
  yearsOfExperience: string;
  hasJobOffer: string;
  educationLevel: string;
  englishLevel: string;
  preferredCountry: string;
  immigrationGoal: string;
  timeline: string;
  additionalInfo: string;
  urgency?: string;
  recommendedService?: string;
}

export interface SavedAssessment {
  id: string;
  urgency: string;
  recommended_service: string;
  created_at: string;
}

export const useAssessment = () => {
  const { user } = useAuth();
  const [savedAssessment, setSavedAssessment] = useState<SavedAssessment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAssessment();
    } else {
      setSavedAssessment(null);
      setLoading(false);
    }
  }, [user]);

  const fetchAssessment = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("assessments")
        .select("id, urgency, recommended_service, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setSavedAssessment(data);
    } catch (error) {
      console.error("Error fetching assessment:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveAssessment = async (data: AssessmentData, urgency: string, recommendedService: string) => {
    if (!user) return { error: new Error("Not authenticated") };

    try {
      const { data: result, error } = await supabase
        .from("assessments")
        .insert({
          user_id: user.id,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone || null,
          date_of_birth: data.dateOfBirth || null,
          home_country: data.homeCountry || null,
          is_citizen: data.isCitizen === "yes",
          years_of_experience: data.yearsOfExperience ? parseInt(data.yearsOfExperience) : null,
          has_job_offer: data.hasJobOffer === "yes",
          education_level: data.educationLevel || null,
          english_level: data.englishLevel || null,
          preferred_country: data.preferredCountry || "Canada",
          immigration_goal: data.immigrationGoal || null,
          timeline: data.timeline || null,
          additional_info: data.additionalInfo || null,
          urgency,
          recommended_service: recommendedService,
        })
        .select()
        .single();

      if (error) throw error;
      
      setSavedAssessment({
        id: result.id,
        urgency: result.urgency,
        recommended_service: result.recommended_service,
        created_at: result.created_at,
      });

      return { error: null };
    } catch (error) {
      console.error("Error saving assessment:", error);
      return { error: error as Error };
    }
  };

  return {
    savedAssessment,
    loading,
    saveAssessment,
    refetch: fetchAssessment,
    hasAssessment: !!savedAssessment,
  };
};
