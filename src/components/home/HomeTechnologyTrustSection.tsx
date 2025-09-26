import { AnimatedText } from '@/components/ui/animated-text';
import { ScrollReveal } from '@/components/ui/enhanced-animations';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { 
  Lock, 
  Shield, 
  Award, 
  CreditCard, 
  Zap, 
  TrendingUp, 
  Target, 
  Users 
} from 'lucide-react';

export const HomeTechnologyTrustSection = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'Bank-Level Encryption',
      description: 'Advanced security protocols and data protection'
    },
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'Full healthcare data privacy compliance'
    },
    {
      icon: Award,
      title: 'SOC 2 Type II Certified',
      description: 'Independently audited security controls'
    },
    {
      icon: CreditCard,
      title: 'PCI DSS Compliant',
      description: 'Secure payment processing standards'
    }
  ];

  const integrationFeatures = [
    {
      icon: Zap,
      title: 'Seamless API Connections',
      description: 'Major practice management system integrations'
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Data Sync',
      description: 'Live synchronization with your existing workflows'
    },
    {
      icon: Target,
      title: 'Custom Workflow Automation',
      description: 'Tailored processes for your practice needs'
    },
    {
      icon: Users,
      title: 'White-Label Partnership',
      description: 'Custom branding and partnership options'
    }
  ];

  return (
    <ParallaxSection className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <AnimatedText>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Built for Healthcare, Secured for Trust
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Enterprise-grade security and seamless integration capabilities
            </p>
          </AnimatedText>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          <ScrollReveal>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">Security & Compliance</h3>
              <div className="space-y-4">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <feature.icon className="h-6 w-6 text-accent-blue mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">Integration Features</h3>
              <div className="space-y-4">
                {integrationFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <feature.icon className="h-6 w-6 text-accent-green mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </ParallaxSection>
  );
};