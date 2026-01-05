import AppShell from "@/components/layout/AppShell";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { ArrowRight, CheckCircle, Lock, Calendar, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useAssessment } from "@/hooks/useAssessment";
import { useBooking } from "@/hooks/useBooking";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "@/components/payment/CheckoutForm";
import { useEffect, useState } from "react";
import { PopupModal } from "react-calendly";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Initialize Stripe (Replace with your actual Publishable Key)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

// Service pricing data
const serviceData: Record<string, { title: string; price: string; amountCents: number; description: string; calendlyUrl: string }> = {
  "consultation-exploratory": {
    title: "Exploratory Consultation",
    price: "$150",
    amountCents: 15000,
    description: "30-minute initial assessment of your immigration options.",
    calendlyUrl: "https://calendly.com/your-link/exploratory", // Replace
  },
  "consultation-case-specific": {
    title: "Case-Specific Consultation",
    price: "$250",
    amountCents: 25000,
    description: "60-minute detailed analysis of your specific case.",
    calendlyUrl: "https://calendly.com/your-link/case-specific", // Replace
  },
  "full-representation": {
    title: "Full Representation",
    price: "From $2,500",
    amountCents: 250000,
    description: "Complete end-to-end immigration application handling.",
    calendlyUrl: "https://calendly.com/your-link/full-rep", // Replace
  },
  "application-review": {
    title: "Application Review",
    price: "$350",
    amountCents: 35000,
    description: "Expert review of your self-prepared application.",
    calendlyUrl: "https://calendly.com/your-link/review", // Replace
  },
  "documentation-review": {
    title: "Documentation Review",
    price: "$200",
    amountCents: 20000,
    description: "Verification of your supporting documents.",
    calendlyUrl: "https://calendly.com/your-link/doc-review", // Replace
  },
};

const normalizeServiceSlug = (slug: string) => {
  if (serviceData[slug]) return slug;
  if (slug.endsWith("-consultation")) {
    const trimmed = slug.replace(/-consultation$/, "");
    if (serviceData[trimmed]) return trimmed;
  }
  return slug;
};

const Booking = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const rawService = searchParams.get("service") || "consultation-exploratory";
  const service = normalizeServiceSlug(rawService);
  const serviceInfo = serviceData[service] || serviceData["consultation-exploratory"];

  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const { hasAssessment, loading: assessmentLoading } = useAssessment();
  const { booking, loading: bookingLoading, createBooking, updateBookingStatus } = useBooking(service);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [preparingPayment, setPreparingPayment] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  // Check scheduling status
  const isScheduled = booking?.scheduled_at != null;
  const hasPaid = booking?.payment_status === "paid";

  // Prepare payment intent when ready
  const handleStartPayment = async () => {
    if (!user) return;
    setPreparingPayment(true);

    try {
      // 1. Create or get existing booking structure in DB
      let displayBooking = booking;
      if (!displayBooking) {
        const { data, error } = await createBooking(serviceInfo.amountCents);
        if (error) throw error;
        displayBooking = data;
      }

      // 2. Call Edge Function to get PaymentIntent
      const { data: { clientSecret }, error: funcError } = await supabase.functions.invoke("create-payment-intent", {
        body: {
          amount: serviceInfo.amountCents,
          currency: "CAD"
        }
      });

      if (funcError) throw funcError;
      setClientSecret(clientSecret);

    } catch (error) {
      console.error("Payment setup error:", error);
      toast.error("Could not initialize payment. Please try again.");
    } finally {
      setPreparingPayment(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    await updateBookingStatus(paymentIntentId);
    toast.success("Payment successful!");
    setClientSecret(null); // Clear payment form
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      console.error("Google sign in error:", error);
      toast.error("Sign in failed");
    }
  };

  const isLoading = authLoading || assessmentLoading || bookingLoading;

  return (
    <AppShell>
      {/* Hero */}
      <section className="bg-background text-foreground py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Book: {serviceInfo.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {serviceInfo.description}
            </p>
            <div className="text-2xl font-bold text-primary mt-4">
              {serviceInfo.price}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Flow */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${hasAssessment ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary"}`}>
                  <CheckCircle className="h-5 w-5" />
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:inline">Assessment</span>
              </div>
              <div className="flex-1 h-0.5 bg-border mx-4" />
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${user ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  <Lock className="h-5 w-5" />
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:inline">Login</span>
              </div>
              <div className="flex-1 h-0.5 bg-border mx-4" />
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${hasPaid ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  <CreditCard className="h-5 w-5" />
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:inline">Payment</span>
              </div>
              <div className="flex-1 h-0.5 bg-border mx-4" />
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isScheduled ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  <Calendar className="h-5 w-5" />
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:inline">Schedule</span>
              </div>
            </div>

            {isLoading ? (
              <Card className="border-border">
                <CardContent className="p-8 text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                  <p className="mt-4 text-muted-foreground">Loading...</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Gate 1: Login Required FIRST */}
                {!user && (
                  <Card className="border-border">
                    <CardContent className="p-8 text-center">
                      <div className="p-4 bg-primary-soft rounded-full w-fit mx-auto mb-6">
                        <Lock className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">
                        Sign In to Continue
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Please sign in with your Google account to proceed using our secure portal.
                      </p>
                      <Button variant="hero" size="lg" onClick={handleGoogleSignIn}>
                        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Sign in with Google
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Gate 2: Assessment Required */}
                {user && !hasAssessment && (
                  <Card className="border-border">
                    <CardContent className="p-8 text-center">
                      <div className="p-4 bg-primary-soft rounded-full w-fit mx-auto mb-6">
                        <CheckCircle className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">
                        Complete Your Eligibility Assessment
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Before booking, please complete our free eligibility assessment.
                        This helps us understand your profile so we can provide the best advice.
                      </p>
                      <Link
                        to={`/eligibility-assessment?redirect=${encodeURIComponent(
                          location.pathname + location.search
                        )}`}
                      >
                        <Button variant="hero" size="lg">
                          Start Assessment
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}

                {/* Gate 3: Payment Required */}
                {user && hasAssessment && !hasPaid && (
                  <Card className="border-border">
                    <CardContent className="p-8">
                      {!clientSecret ? (
                        <div className="text-center">
                          <div className="p-4 bg-primary-soft rounded-full w-fit mx-auto mb-6">
                            <CreditCard className="h-8 w-8 text-primary" />
                          </div>
                          <h2 className="text-2xl font-bold mb-4">
                            Secure Payment
                          </h2>
                          <p className="text-muted-foreground mb-6">
                            Process your payment to unlock the consultation booking calendar.
                          </p>
                          <div className="text-3xl font-bold text-primary mb-6">
                            {serviceInfo.price}
                          </div>
                          <Button
                            variant="hero"
                            size="lg"
                            onClick={handleStartPayment}
                            disabled={preparingPayment}
                          >
                            {preparingPayment ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading Secure Checkout...
                              </>
                            ) : (
                              <>
                                Pay with Stripe
                                <ArrowRight className="ml-2 h-5 w-5" />
                              </>
                            )}
                          </Button>
                          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Lock className="h-3 w-3" />
                            Encrypted and secured by Stripe
                          </div>
                        </div>
                      ) : (
                        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                          <CheckoutForm
                            amount={serviceInfo.price}
                            onSuccess={handlePaymentSuccess}
                          />
                        </Elements>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Gate 4: Scheduling */}
                {user && hasAssessment && hasPaid && (
                  <Card className="border-border">
                    <CardContent className="p-8 text-center">
                      <div className="p-4 bg-primary-soft rounded-full w-fit mx-auto mb-6">
                        <Calendar className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">
                        Schedule Your Consultation
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Payment successful! Please select a time slot that works best for you.
                      </p>

                      <Button variant="hero" size="lg" onClick={() => setShowCalendly(true)}>
                        Open Calendar
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>

                      <PopupModal
                        url={serviceInfo.calendlyUrl}
                        rootElement={document.getElementById("root")!}
                        open={showCalendly}
                        onModalClose={() => setShowCalendly(false)}
                        prefill={{
                          email: user.email || "",
                          name: user.user_metadata.full_name || "",
                        }}
                      />
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* Additional info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Need help? <Link to="/contact-us" className="text-primary hover:underline">Contact us</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
};

export default Booking;
