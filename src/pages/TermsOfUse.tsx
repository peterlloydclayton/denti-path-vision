import { useEffect } from "react";

const TermsOfUse = () => {
  useEffect(() => {
    document.title = "Terms of Use - DentiPay";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Terms of Use</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using DentiPay's services, you accept and agree to be bound by the terms and provision 
                of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                DentiPay provides AI-powered behavioral credit assessment and financing solutions for dental treatments. 
                Our services include credit evaluation, payment processing, and financing arrangements between patients 
                and dental providers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Eligibility</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>You must be at least 18 years of age</li>
                <li>You must be a legal resident of the United States</li>
                <li>You must provide accurate and complete information</li>
                <li>You must have the legal capacity to enter into binding agreements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Account Information</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Keep your login credentials secure and confidential</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>

                <h3 className="text-xl font-medium mt-6">Payment Obligations</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Make all payments according to the agreed terms</li>
                  <li>Notify us of any changes to your financial situation</li>
                  <li>Pay all applicable fees and charges</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Credit Assessment</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our AI-powered credit assessment process analyzes various factors including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Traditional credit scores and history</li>
                <li>Behavioral patterns and transaction history</li>
                <li>Income verification and employment status</li>
                <li>Other relevant financial indicators</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Credit decisions are subject to our underwriting criteria and may be approved, denied, or approved with conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Fees and Interest</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Interest rates and fees will be disclosed before you accept financing</li>
                <li>Late payment fees may apply for overdue payments</li>
                <li>Prepayment of loans is allowed without penalty</li>
                <li>All fees are subject to applicable state and federal regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                DentiPay shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting 
                from your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Dispute Resolution</h2>
              <p className="text-muted-foreground leading-relaxed">
                Any disputes arising from these terms shall be resolved through binding arbitration in accordance with 
                the rules of the American Arbitration Association. You waive any right to a jury trial or to participate 
                in a class action lawsuit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason 
                whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
                is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Use, please contact us:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-medium">DentiPay Legal Department</p>
                <p className="text-muted-foreground">Email: legal@dentipay.com</p>
                <p className="text-muted-foreground">Phone: 1-800-DENTIPAY</p>
              </div>
            </section>

            <section>
              <p className="text-sm text-muted-foreground">
                Last Updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;