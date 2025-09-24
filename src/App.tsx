import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { GDPRBanner } from "@/components/layout/GDPRBanner";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Footer } from "@/components/layout/Footer";
import Index from "./pages/Index";
import Providers from "./pages/Providers";
import Providers2 from "./pages/Providers2";
import Patients from "./pages/Patients";
import IntelligentFinancing from "./pages/IntelligentFinancing";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import NotFound from "./pages/NotFound";
import { ProviderSearch } from "./pages/ProviderSearch";
import './i18n/config';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="relative min-h-screen flex flex-col">
          <FloatingNav />
          <GDPRBanner />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/providers" element={<Providers />} />
              <Route path="/providers-2" element={<Providers2 />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/intelligent-financing" element={<IntelligentFinancing />} />
              <Route path="/provider-search" element={<ProviderSearch />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
