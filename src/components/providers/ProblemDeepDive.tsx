import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, XCircle, CheckCircle } from 'lucide-react';

export const ProblemDeepDive = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'trap',
      title: 'The Trap: A System Built for Banks',
      teaser: 'Traditional financing systems prioritize bank profits over patient care',
      issues: [
        'Patients Rejected: 60-80% denial rates leave patients without care options',
        'Providers Losing Revenue: Practices lose $200K+ annually from failed financing',
        'Banks Profit: Financial institutions profit regardless of patient outcomes'
      ],
      answer: 'Intelligence Revolution: DentiPay\'s AI understands dental care value, not just credit scores'
    },
    {
      id: 'stakes',
      title: 'The Stakes: When Dentistry Loses',
      teaser: 'The cost of inadequate financing extends beyond individual practices',
      issues: [
        '1. No Underwriting Experience: Banks lack dental-specific risk assessment',
        '2. Blind Financing: Generic algorithms miss treatment necessity and value',
        '3. Strained Relationships: Provider-patient trust erodes with financing failures',
        '4. Internal Risk: Practices absorb financial risk without proper tools'
      ],
      answer: '80% Approval • 40% Higher Acceptance • $265K Average Revenue Increase'
    },
    {
      id: 'price',
      title: 'The Price: Paid for Guesswork',
      teaser: 'Traditional financing guesswork costs practices and patients dearly',
      issues: [
        'Lost Treatment Opportunities: Delayed or denied care affects patient health',
        'Administrative Burden: Staff spend hours on failed financing attempts',
        'Competitive Disadvantage: Practices without financing solutions lose patients',
        'Revenue Volatility: Unpredictable financing success impacts cash flow'
      ],
      answer: 'Guesswork Declines. SCOPE Approves. 30+ data points create intelligent decisions'
    }
  ];

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Providers Shouldn't Be Bankers
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((section) => (
            <Collapsible
              key={section.id}
              open={openSection === section.id}
              onOpenChange={() => setOpenSection(openSection === section.id ? null : section.id)}
            >
              <CollapsibleTrigger asChild>
                <Card className="cursor-pointer hover:shadow-elegant transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                        <p className="text-muted-foreground">{section.teaser}</p>
                      </div>
                      <ChevronDown className={`w-6 h-6 transition-transform ${
                        openSection === section.id ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-4">
                <Card className="border-l-4 border-l-dental-blue">
                  <CardContent className="p-6">
                    {/* Issues Section */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold mb-4 text-navy">Issues</h4>
                      <div className="space-y-3">
                        {section.issues.map((issue, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <XCircle className="w-5 h-5 text-navy mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{issue}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="border-t border-border my-6"></div>

                    {/* DentiPay Answer */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-success">DentiPay Answer</h4>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-medium">{section.answer}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};