import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <div className="relative min-h-screen flex flex-col">
        <FloatingNav />
        <GDPRBanner />
        <main className="flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
              <Route path="/providers" element={<PageWrapper><Providers /></PageWrapper>} />
              <Route path="/providers-2" element={<PageWrapper><Providers2 /></PageWrapper>} />
              <Route path="/patients" element={<PageWrapper><Patients /></PageWrapper>} />
              <Route path="/intelligent-financing" element={<PageWrapper><IntelligentFinancing /></PageWrapper>} />
              <Route path="/provider-search" element={<PageWrapper><ProviderSearch /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
              <Route path="/terms-of-use" element={<PageWrapper><TermsOfUse /></PageWrapper>} />
              <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
            </Routes>
          </AnimatePresence>

          {/* Page transition curtain */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname + '-curtain'}
              className="fixed inset-0 z-[100] bg-dental-blue pointer-events-none"
              initial={{ x: '100%' }}
              animate={{ x: '-100%' }}
              transition={{ 
                duration: 1.2, 
                ease: [0.65, 0, 0.35, 1],
                delay: 0.1
              }}
            />
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  );
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
  >
    {children}
  </motion.div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
