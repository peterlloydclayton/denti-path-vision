import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { GDPRBanner } from "@/components/layout/GDPRBanner";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Footer } from "@/components/layout/Footer";
import { SplashScreen } from "@/components/SplashScreen";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Providers from "./pages/Providers";
import Providers2 from "./pages/Providers2";
import Patients from "./pages/Patients";
import Patients2 from "./pages/Patients2";
import IntelligentFinancing from "./pages/IntelligentFinancing";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import NotFound from "./pages/NotFound";
import { ProviderSearch } from "./pages/ProviderSearch";
import ProviderScheduling from "./pages/ProviderScheduling";
import Apply from "./pages/Apply";
import './i18n/config';
import { useState, useEffect } from "react";
import { initGA, trackPageView } from "./lib/analytics";
import { mountDentipayChatWidget } from "./lib/widget/dentipay-chat-widget.es.js";

const queryClient = new QueryClient();

const SPLASH_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // Check for explicit intro request
    const params = new URLSearchParams(location.search);
    if (params.get('intro') === 'true') {
      setShowSplash(true);
      return;
    }

    // Check if we're on the home page
    if (location.pathname !== '/') {
      return;
    }

    // Check session storage (prevents showing multiple times per session)
    const splashShownThisSession = sessionStorage.getItem('splashShown');
    if (splashShownThisSession) {
      return;
    }

    // Check last visit timestamp
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (!lastVisit || now - parseInt(lastVisit) > SPLASH_TIMEOUT_MS) {
      setShowSplash(true);
    }
  }, [location]);

  // Initialize GA if consent was previously given
  useEffect(() => {
    const consent = localStorage.getItem('gdpr-accepted');
    if (consent === 'true') {
      initGA(true);
    }
  }, []);

  // Track page views
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('splashShown', 'true');
    localStorage.setItem('lastVisit', Date.now().toString());
    
    // Remove intro query param if present
    const params = new URLSearchParams(location.search);
    if (params.get('intro') === 'true') {
      params.delete('intro');
      navigate({ search: params.toString() }, { replace: true });
    }
  };

  const handlePlayIntro = () => {
    setShowSplash(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      <ScrollToTop />
      <div className="relative min-h-screen flex flex-col">
        <FloatingNav />
        <GDPRBanner />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index onPlayIntro={!showSplash ? handlePlayIntro : undefined} />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/providers-2" element={<Providers2 />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patient-financing-application" element={<Apply />} />
            <Route path="/intelligent-financing" element={<IntelligentFinancing />} />
            <Route path="/provider-search" element={<ProviderSearch />} />
            <Route path="/provider-scheduling" element={<ProviderScheduling />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

const App = () => {
  // Mount chat widget
  useEffect(() => {
    const { unmount } = mountDentipayChatWidget({ initiallyOpen: false });
    return () => unmount();
  }, []);

  return (
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
};

export default App;
