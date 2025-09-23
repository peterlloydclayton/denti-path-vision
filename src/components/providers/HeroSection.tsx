import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-primary text-foreground overflow-hidden">
      {/* Abstract AI Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-foreground rounded-full"></div>
        <div className="absolute top-40 right-40 w-24 h-24 border border-foreground rotate-45"></div>
        <div className="absolute bottom-40 left-1/3 w-16 h-16 border border-foreground rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border border-foreground"></div>
      </div>

      <div className="relative container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The Future of Patient Financing
            <span className="block text-4xl md:text-6xl mt-2">Built on AI</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-muted-foreground">
            Transform patient acceptance rates with AI-powered financing that understands dental care. 
            Where traditional financing fails, DentiPay's SCOPE & PATH intelligence delivers.
          </p>

          <Button size="lg" className="bg-navy hover:bg-navy/90 text-white px-12 py-6 text-xl rounded-xl">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};