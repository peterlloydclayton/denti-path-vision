import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, CheckCircle } from 'lucide-react';
import approvalMobileImage from '@/assets/approval-mobile-hand-jane-smith.png';
import chartImprovingImage from '@/assets/chart-improving.jpg';
import dentistOperatingImage from '@/assets/dentist-operating-on-patient.jpg';

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
      answer: 'Intelligence Revolution: DentiPay\'s AI understands dental care value, not just credit scores',
      image: dentistOperatingImage,
      imagePosition: 'right' as const,
      mobileImagePosition: 'bottom' as const
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
      answer: '80% Approval • 40% Higher Acceptance • $265K Average Revenue Increase',
      image: approvalMobileImage,
      imagePosition: 'right' as const,
      mobileImagePosition: 'bottom' as const
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
      answer: 'Guesswork Declines. SCOPE Approves. 30+ data points create intelligent decisions',
      image: chartImprovingImage,
      imagePosition: 'right' as const,
      mobileImagePosition: 'bottom' as const
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
          {sections.map((section, index) => (
            <div key={section.id}>
              <Collapsible
                open={openSection === section.id}
                onOpenChange={() => setOpenSection(openSection === section.id ? null : section.id)}
              >
              <CollapsibleTrigger asChild>
                <div className="cursor-pointer md:hover:shadow-elegant transition-shadow">
                  <Card className="hidden md:block">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold mb-1 uppercase">{section.title}</h3>
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
                        <h3 className="text-2xl font-bold mb-1 uppercase">{section.title}</h3>
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

              <CollapsibleContent className="mt-4 animate-fade-in">
                <Card className="shadow-elegant bg-card/80 backdrop-blur-sm rounded-xl">
                  <CardContent className="p-0">
                    {/* Issues Section */}
                    <div className="p-6">
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
                                <CollapsibleContent className="animate-fade-in">
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
                    <div className="border-t border-border"></div>

                    {/* DentiPay Answer */}
                    {section.image ? (
                      <div className="grid lg:grid-cols-[3fr_2fr] min-h-[400px] rounded-b-xl overflow-hidden">
                        {/* Image Side */}
                        <div className={`relative ${
                          section.mobileImagePosition === 'bottom' ? 'order-2' : 'order-1'
                        } ${
                          section.imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'
                        }`}>
                           <img 
                             src={section.image} 
                             alt="DentiPay Solution"
                             className="w-full h-full object-cover rounded-lg"
                           />
                          <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-transparent to-black/20" />
                        </div>
                        
                         {/* Text Content Side */}
                          <div className={`flex flex-col justify-center p-6 lg:p-8 bg-gradient-to-br from-success/10 via-transparent to-success/20 ${
                            section.mobileImagePosition === 'bottom' ? 'order-1' : 'order-2'
                          } ${
                            section.imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'
                          }`}>
                            <div>
                              <h4 className="text-lg lg:text-2xl font-semibold mb-4 lg:mb-6 text-success">DentiPay ANSWER</h4>
                              <div className="flex items-start gap-3 lg:gap-4">
                                <CheckCircle className="w-5 h-5 lg:w-7 lg:h-7 text-success mt-0.5 flex-shrink-0" />
                                <span className="text-base lg:text-xl font-medium leading-relaxed">{section.answer}</span>
                              </div>
                            </div>
                          </div>
                      </div>
                      ) : (
                        <div className="p-6 rounded-xl">
                          <h4 className="text-lg lg:text-2xl font-semibold mb-4 lg:mb-6 text-success">DentiPay ANSWER</h4>
                          <div className="flex items-start gap-3 lg:gap-4">
                            <CheckCircle className="w-5 h-5 lg:w-7 lg:h-7 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-base lg:text-xl font-medium leading-relaxed">{section.answer}</span>
                          </div>
                        </div>
                      )}
                  </CardContent>
                </Card>
              </CollapsibleContent>
              
              {/* Add Get Started button below The Price card */}
              {(() => {
                console.log('Section:', section.id, 'OpenSection:', openSection, 'Match:', section.id === 'price' && openSection === section.id);
                return section.id === 'price' && openSection === section.id;
              })() && (
                <div className="flex justify-center mt-6">
                  <Button className="bg-black text-white hover:bg-black/90 rounded-full px-8 py-3 text-base font-medium">
                    Get Started
                  </Button>
                </div>
              )}
            </Collapsible>
            
            {/* Add separator between sections, but not after the last one */}
            {index < sections.length - 1 && (
              <hr className="my-8 border-t-2 border-border" />
            )}
          </div>
          ))}
        </div>
      </div>
    </section>
  );
};