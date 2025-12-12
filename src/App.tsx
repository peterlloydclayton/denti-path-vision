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
import { EchoAvatarCompanion } from "@/components/EchoAvatarCompanion";
import { ChatWidget } from "@/components/ChatWidget";
import { CentralVoiceHub } from "@/components/ui/central-voice-hub";
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
import ProviderSignup from "./pages/ProviderSignup";
import Apply from "./pages/Apply";
import './i18n/config';
import { useState, useEffect, useCallback } from "react";
import { initGA, trackPageView } from "./lib/analytics";
import { toast } from "sonner";

const queryClient = new QueryClient();

const SPLASH_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(false);
  const [showEchoCompanion, setShowEchoCompanion] = useState(false);
  const [showTextChat, setShowTextChat] = useState(false);

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

    // Show voice assistant prompt after 5 seconds on home page
    if (location.pathname === '/') {
      setTimeout(() => {
        toast("Would you like to chat with Echo?", {
          description: "Our AI assistant can help you navigate and answer questions.",
          duration: 10000,
          action: {
            label: "Start Chat",
            onClick: () => setShowEchoCompanion(true),
          },
        });
      }, 5000);
    }
  };

  const handlePlayIntro = () => {
    setShowSplash(true);
  };

  // Navigation handler that keeps Echo companion open
  const handleVoiceNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  const handleCloseEchoCompanion = () => {
    setShowEchoCompanion(false);
  };

  const handleCloseTextChat = () => {
    setShowTextChat(false);
  };

  const handleOpenVoiceChat = () => {
    setShowTextChat(false);
    setShowEchoCompanion(true);
  };

  const handleOpenTextChat = () => {
    setShowEchoCompanion(false);
    setShowTextChat(true);
  };

  // Determine if hub should be shown
  const showHub = !showSplash && !showEchoCompanion && !showTextChat;

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      {/* Echo Avatar Companion */}
      <EchoAvatarCompanion 
        isOpen={showEchoCompanion} 
        onClose={handleCloseEchoCompanion}
        onNavigate={handleVoiceNavigate}
        autoStart={true}
      />

      {/* Text Chat Panel */}
      <ChatWidget 
        isOpen={showTextChat} 
        onClose={handleCloseTextChat}
      />

      {/* Central Hub Button - only show when nothing else is open */}
      {showHub && (
        <CentralVoiceHub 
          onVoiceChat={handleOpenVoiceChat}
          onTextChat={handleOpenTextChat}
        />
      )}

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
            <Route path="/provider-signup" element={<ProviderSignup />} />
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
