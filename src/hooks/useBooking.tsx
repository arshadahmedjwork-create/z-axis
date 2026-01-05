import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Booking {
  id: string;
  user_id: string;
  service_type: string;
  amount_cents: number;
  currency: string;
  payment_status: string;
  scheduled_at: string | null;
  calendly_event_id: string | null;
  created_at: string;
}

export const useBooking = (serviceType: string) => {
  const { user } = useAuth();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && serviceType) {
      fetchBooking();
    } else {
      setBooking(null);
      setLoading(false);
    }
  }, [user, serviceType]);

  const fetchBooking = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .eq("service_type", serviceType)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setBooking(data);
    } catch (error) {
      console.error("Error fetching booking:", error);
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (amountCents: number, currency: string = "CAD") => {
    if (!user) return { error: new Error("Not authenticated") };

    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          user_id: user.id,
          service_type: serviceType,
          amount_cents: amountCents,
          currency,
          payment_status: "pending", // Default
        })
        .select()
        .single();

      if (error) throw error;
      setBooking(data);
      return { data, error: null };
    } catch (error) {
      console.error("Error creating booking:", error);
      return { data: null, error: error as Error };
    }
  };

  const updateBookingStatus = async (paymentIntentId: string) => {
    if (!booking) return;

    try {
      const { data, error } = await supabase
        .from("bookings")
        .update({ 
          payment_status: "paid",
          payment_intent_id: paymentIntentId,
        })
        .eq("id", booking.id)
        .select()
        .single();

      if (error) throw error;
      setBooking(data);
      return { error: null };
    } catch (error) {
      console.error("Error updating booking:", error);
      return { error: error as Error };
    }
  };

  return {
    booking,
    loading,
    createBooking,
    updateBookingStatus,
    refetch: fetchBooking,
  };
};
