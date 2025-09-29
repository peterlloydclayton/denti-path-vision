import { AnimatedText } from '@/components/ui/animated-text';

export const HeroSection = () => {
  return (
    <section className="py-24 bg-gradient-hero text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedText>
            <h1 className="text-hero-mobile md:text-hero font-bold mb-6 text-black">
              Transforming Dental Finance{' '}
              <span className="bg-gradient-to-r from-dental-peach to-dental-lavender bg-clip-text text-transparent">
                Through Intelligence
              </span>
            </h1>
          </AnimatedText>
          
          <AnimatedText delay={0.2}>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed text-black">
              DentiPay is pioneering a new category of healthcare finance — 
              where artificial intelligence meets human compassion to make 
              dental care accessible to everyone
            </p>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
};