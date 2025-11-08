
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useScrollToTop } from "./hooks/useScrollToTop";
import Index from "./pages/Index";
import Provider from "./pages/Provider";
import Patients from "./pages/Patients";
import PatientContact from "./pages/PatientContact";
import BetaAccess from "./pages/BetaAccess";
import ThankYou from "./pages/ThankYou";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import BeyondCareCredit from "./pages/provider/BeyondCareCredit";
import NotBankers from "./pages/provider/NotBankers";
import Scope from "./pages/provider/Scope";
import BrowseProviders from "./pages/BrowseProviders";
import ProviderProfile from "./pages/ProviderProfile";
import NotFound from "./pages/NotFound";
import Patients2 from "./pages/Patients2";

const queryClient = new QueryClient();

const AppContent = () => {
  useScrollToTop();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/provider" element={<Provider />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/patient-financing-application" element={<Patients2 />} />
      <Route path="/patients/contact" element={<PatientContact />} />
      <Route path="/beta-access" element={<BetaAccess />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/provider/beyond-carecredit" element={<BeyondCareCredit />} />
      <Route path="/provider/not-bankers" element={<NotBankers />} />
      <Route path="/provider/scope" element={<Scope />} />
      <Route path="/browse-providers" element={<BrowseProviders />} />
      <Route path="/provider-profile/:id" element={<ProviderProfile />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
