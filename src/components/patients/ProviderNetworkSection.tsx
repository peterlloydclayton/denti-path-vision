import { AnimatedText } from '@/components/ui/animated-text';
import { AnimatedPhraseCloud } from './AnimatedPhraseCloud';

export const ProviderNetworkSection = () => {
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Trusted Providers in Your Area
          </h2>
        </AnimatedText>

        <div className="relative">
          <AnimatedPhraseCloud />
        </div>
      </div>
    </section>
  );
};