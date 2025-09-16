import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedText } from '@/components/ui/animated-text';
import { financialTools } from '@/data/patientsData';

export const FinancialToolsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tools to Help You Plan
          </h2>
        </AnimatedText>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {financialTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <AnimatedText key={index} delay={index * 0.2}>
                <Card className="text-center hover:shadow-soft transition-smooth hover:-translate-y-1 h-full">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-2xl bg-intelligence/10 flex items-center justify-center mx-auto mb-4">
                      <Icon size={32} className="text-intelligence" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{tool.title}</h3>
                    <p className="text-muted-foreground mb-2">{tool.description}</p>
                    <p className="text-sm text-dental-blue font-medium mb-4">{tool.benefit}</p>
                    <Button variant="outline" className="w-full">
                      {tool.cta}
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedText>
            );
          })}
        </div>
      </div>
    </section>
  );
};