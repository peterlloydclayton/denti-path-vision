import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, CheckCircle } from 'lucide-react';

export const ProblemDeepDive = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [expandedIssues, setExpandedIssues] = useState<Record<string, boolean>>({});

  const toggleIssue = (sectionId: string, issueIndex: number) => {
    const key = `${sectionId}-${issueIndex}`;
    setExpandedIssues(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const sections = [
    {
      id: 'trap',
      title: 'The Trap',
      subtitle: 'A System Built for Banks',
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
      title: 'The Stakes',
      subtitle: 'When Dentistry Loses',
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
      title: 'The Price',
      subtitle: 'Paid for Guesswork',
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
                <div className="cursor-pointer md:hover:shadow-elegant transition-shadow">
                  <Card className="hidden md:block">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{section.title}</h3>
                          <h4 className="text-lg font-medium text-muted-foreground mb-2">{section.subtitle}</h4>
                          <p className="text-muted-foreground">{section.teaser}</p>
                        </div>
                        <ChevronDown className={`w-6 h-6 transition-transform ${
                          openSection === section.id ? 'rotate-180' : ''
                        }`} />
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Mobile version without card */}
                  <div className="md:hidden p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{section.title}</h3>
                        <h4 className="text-lg font-medium text-muted-foreground mb-2">{section.subtitle}</h4>
                        <p className="text-muted-foreground">{section.teaser}</p>
                      </div>
                      <ChevronDown className={`w-6 h-6 transition-transform ${
                        openSection === section.id ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-4">
                <Card className="shadow-elegant">
                  <CardContent className="p-6">
                    {/* Issues Section */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold mb-6">ISSUES</h4>
                      <div className="space-y-4">
                        {section.issues.map((issue, index) => {
                          const [title, description] = issue.split(':');
                          const isExpanded = expandedIssues[`${section.id}-${index}`];
                          return (
                            <div key={index}>
                              <button
                                onClick={() => toggleIssue(section.id, index)}
                                className="flex items-center gap-3 w-full text-left hover:opacity-80 transition-opacity"
                              >
                                <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform ${
                                  isExpanded ? 'rotate-90' : ''
                                }`} />
                                <span className="text-xl font-semibold">{title.trim()}</span>
                              </button>
                              
                              <Collapsible open={isExpanded}>
                                <CollapsibleContent>
                                  <div className="ml-8 mt-2 pb-2">
                                    <p className="text-muted-foreground">{description?.trim()}</p>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="border-t border-border my-6"></div>

                    {/* DentiPay Answer */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-green-700">DentiPay ANSWER</h4>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-700 mt-0.5 flex-shrink-0" />
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