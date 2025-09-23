import { Card, CardContent } from '@/components/ui/card';
import { XCircle } from 'lucide-react';

export const ProblemSection = () => {
  return (
    <section className="py-24 bg-foreground text-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Traditional Financing Wasn't Built for Dental Care
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Pain Points */}
          <div className="space-y-6">
            <Card className="bg-background/10 border-background/20 text-background">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Emergency affordability crisis</h3>
                    <p className="text-sm opacity-90">Patients face unexpected dental costs without proper financing options</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/10 border-background/20 text-background">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Timeline mismatch</h3>
                    <p className="text-sm opacity-90">Traditional approval processes don't align with dental treatment urgency</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/10 border-background/20 text-background">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Low approval rates</h3>
                    <p className="text-sm opacity-90">Generic underwriting fails to understand dental-specific patient needs</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/10 border-background/20 text-background">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Generic understanding</h3>
                    <p className="text-sm opacity-90">Banks don't comprehend the unique value and necessity of dental treatments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Table */}
          <div className="bg-background/10 border border-background/20 rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-6 text-center">Financial Care Gap</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-background/20">
                <span>Traditional Banking</span>
                <span className="text-red-400">20-40% Approval</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-background/20">
                <span>Generic Financing</span>
                <span className="text-red-400">45-60% Approval</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-background/20">
                <span>DentiPay Intelligence</span>
                <span className="text-green-400">94% Approval</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};