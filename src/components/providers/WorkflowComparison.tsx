import { XCircle, CheckCircle } from 'lucide-react';

export const WorkflowComparison = () => {
  const traditionalSteps = [
    'Patient inquiry about financing',
    'Manual credit application',
    'Wait 24-48 hours for response',
    'Often rejected or insufficient amount',
    'Patient seeks alternatives',
    'Treatment delayed or cancelled',
    'Lost revenue and patient trust',
    'Administrative burden continues'
  ];

  const dentipaySteps = [
    'Patient expresses treatment interest',
    'Instant SCOPE intelligence analysis',
    'Real-time approval in <30 seconds',
    'Personalized financing options',
    'Patient accepts treatment',
    'Immediate treatment scheduling',
    'Guaranteed payment to provider',
    'Automated payment management'
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            AI Powered Approvals. Instant Decisions
          </h2>
          <h3 className="text-2xl text-muted-foreground">
            From Consultation to Payment in Minutes
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Traditional Flow */}
          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-8 text-center">Traditional Financing Flow</h3>
            <div className="space-y-4">
              {traditionalSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{step}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DentiPay Flow */}
          <div>
            <h3 className="text-2xl font-bold text-success mb-8 text-center">DentiPay Intelligence Flow</h3>
            <div className="space-y-4">
              {dentipaySteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-success">
                  <div className="w-8 h-8 bg-success text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{step}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};