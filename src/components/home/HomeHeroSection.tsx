import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Zap, Target, Shield, Users, CreditCard } from 'lucide-react';
import { AnimatedText, SplitText } from '@/components/ui/animated-text';
import { ScrollReveal, MagneticButton, FloatingElements } from '@/components/ui/enhanced-animations';
import { GlowButton, ProgressiveImage } from '@/components/ui/micro-interactions';
import { PulseRipples } from '@/components/ui/pulse-ripples';
import { FloatingIcons } from '@/components/ui/floating-icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PlayIntroButton } from '@/components/PlayIntroButton';

const heroImage = 'https://res.cloudinary.com/drxvhwze4/image/upload/v1759199954/Dentist-female-african_nefprl.png';

interface HomeHeroSectionProps {
  onPlayIntro?: () => void;
}

export const HomeHeroSection = ({ onPlayIntro }: HomeHeroSectionProps) => {
  const { t } = useTranslation('marketing');
  const navigate = useNavigate();

  return (
    <section className="hero-section relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
      
      {/* Floating Icons Background */}
      <FloatingIcons />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-24">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-12rem)]">
          <ScrollReveal className="space-y-6 xl:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 xl:space-y-6"
            >
              <h1 className="text-4xl xl:text-6xl 2xl:text-7xl font-bold leading-tight text-foreground">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl xl:text-2xl 2xl:text-3xl text-primary font-semibold">
                {t('home.hero.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton>
                <GlowButton
                  onClick={() => navigate('/patients')}
                  className="w-full sm:w-auto"
                >
                  {t('home.hero.ctaPatients')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </GlowButton>
              </MagneticButton>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/providers')}
                className="w-full sm:w-auto group hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                {t('home.hero.ctaProviders')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base xl:text-lg text-muted-foreground max-w-2xl leading-relaxed"
            >
              {t('home.hero.description')}
            </motion.p>
          </ScrollReveal>

          <ScrollReveal className="relative h-[85vh]">
            <PulseRipples />
            <ProgressiveImage
              src={heroImage}
              alt="Dental professional"
              className="hero-image w-full h-full object-contain object-center"
            />
          </ScrollReveal>
        </div>

        {/* Tablet Layout */}
        <div className="hidden sm:block lg:hidden">
          <div className="grid grid-cols-1 gap-8 items-center">
            <ScrollReveal className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
                {t('home.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary font-semibold">
                {t('home.hero.subtitle')}
              </p>
            </ScrollReveal>

            <ScrollReveal className="relative h-[52vh] mx-auto w-full max-w-lg">
              <PulseRipples />
              <ProgressiveImage
                src={heroImage}
                alt="Dental professional"
                className="hero-image w-full h-full object-contain object-center"
              />
            </ScrollReveal>

            <ScrollReveal className="space-y-6 text-center max-w-2xl mx-auto">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed px-4">
                {t('home.hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
                <MagneticButton>
                  <GlowButton
                    onClick={() => navigate('/patients')}
                    className="w-full sm:w-auto"
                  >
                    {t('home.hero.ctaPatients')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </GlowButton>
                </MagneticButton>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/providers')}
                  className="w-full sm:w-auto"
                >
                  {t('home.hero.ctaProviders')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Mobile Portrait Layout */}
        <div className="sm:hidden block portrait:block landscape:hidden">
          <div className="flex flex-col gap-6 items-center text-center min-h-[calc(100vh-8rem)]">
            <ScrollReveal className="space-y-3 pt-4">
              <h1 className="text-2xl font-bold leading-tight text-foreground px-4">
                {t('home.hero.title')}
              </h1>
              <p className="text-base text-primary font-semibold px-4">
                {t('home.hero.subtitle')}
              </p>
            </ScrollReveal>

            <ScrollReveal className="relative w-full h-[calc(90vh-20rem)] max-h-[400px]">
              <PulseRipples />
              <ProgressiveImage
                src={heroImage}
                alt="Dental professional"
                className="hero-image w-full h-full object-contain object-center"
              />
            </ScrollReveal>

            <ScrollReveal className="space-y-4 w-full px-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('home.hero.description')}
              </p>

              <div className="flex flex-col gap-3">
                <MagneticButton>
                  <GlowButton
                    onClick={() => navigate('/patients')}
                    className="w-full"
                  >
                    {t('home.hero.ctaPatients')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </GlowButton>
                </MagneticButton>

                <Button
                  variant="outline"
                  size="default"
                  onClick={() => navigate('/providers')}
                  className="w-full"
                >
                  {t('home.hero.ctaProviders')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Mobile Landscape Layout - NEW */}
        <div className="sm:hidden landscape:block portrait:hidden">
          <div className="grid grid-cols-2 gap-4 items-center h-[calc(100vh-6rem)] py-4">
            <ScrollReveal className="space-y-2 pl-2">
              <h1 className="text-lg font-bold leading-tight text-foreground">
                {t('home.hero.title')}
              </h1>
              <p className="text-sm text-primary font-semibold">
                {t('home.hero.subtitle')}
              </p>
              <p className="text-xs text-muted-foreground leading-snug line-clamp-3">
                {t('home.hero.description')}
              </p>
              
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => navigate('/patients')}
                  className="w-full text-xs"
                >
                  {t('home.hero.ctaPatients')}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/providers')}
                  className="w-full text-xs"
                >
                  {t('home.hero.ctaProviders')}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal className="relative h-[75vh] max-h-[300px]">
              <ProgressiveImage
                src={heroImage}
                alt="Dental professional"
                className="w-full h-full object-contain object-center"
              />
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Play Intro Button */}
      {onPlayIntro && <PlayIntroButton onClick={onPlayIntro} />}
    </section>
  );
};