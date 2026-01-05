import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import AdminFloatingButton from "@/components/AdminFloatingButton";
import Index from "./pages/Index";
import WhatWeDo from "./pages/WhatWeDo";
import Migrate from "./pages/services/Migrate";
import Study from "./pages/services/Study";
import ServicePage from "./pages/services/ServicePage";
import PlansPricing from "./pages/PlansPricing";
import ContactUs from "./pages/ContactUs";
import BookConsultation from "./pages/BookConsultation";
import EligibilityAssessment from "./pages/EligibilityAssessment";
import ClientPortal from "./pages/ClientPortal";
import Booking from "./pages/Booking";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAssessments from "./pages/admin/AdminAssessments";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminContactSubmissions from "./pages/admin/AdminContactSubmissions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/what-we-do/migrate" element={<Migrate />} />
            <Route path="/what-we-do/study" element={<Study />} />
            <Route path="/what-we-do/:service" element={<ServicePage />} />
            <Route path="/plans-pricing" element={<PlansPricing />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/book-consultation" element={<BookConsultation />} />
            <Route path="/eligibility-assessment" element={<EligibilityAssessment />} />
            <Route path="/client-portal" element={<ClientPortal />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<Navigate to="/admin/assessments" replace />} />
              <Route path="assessments" element={<AdminAssessments />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="contacts" element={<AdminContactSubmissions />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <AdminFloatingButton />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
