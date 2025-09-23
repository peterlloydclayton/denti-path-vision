import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Phone, Shield, Lock, TrendingUp, Award } from 'lucide-react';

export const FinalCTASection = () => {
  return (
    <section className="py-24 bg-navy text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            See DentiPay Intelligence in Your Practice
          </h2>
        </div>

        {/* Three Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          <Card className="bg-white/10 border-white/20 text-white text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-white text-navy rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Schedule Demo</h3>
              <p className="text-sm opacity-90">See DentiPay intelligence in action</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 text-white text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-white text-navy rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Free Trial</h3>
              <p className="text-sm opacity-90">Test with your actual patients</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 text-white text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-white text-navy rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Success Support</h3>
              <p className="text-sm opacity-90">Ongoing training and optimization</p>
            </CardContent>
          </Card>
        </div>

        {/* Everything You Need */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Everything You Need to Succeed</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Complete SCOPE & PATH integration</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Echo AI voice assistant</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Analytics dashboard</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Patient communication tools</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Dedicated success manager</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Staff training program</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Marketing support materials</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No setup or monthly fees</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-white text-navy hover:bg-white/90 px-8">
            Schedule Your Demo
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy px-8">
            Start Free Trial
          </Button>
          <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 px-8">
            Download Playbook
          </Button>
        </div>

        {/* Contact Information */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Phone className="w-5 h-5" />
            <span className="text-lg font-semibold">(555) 123-4567</span>
          </div>
          <div className="text-sm opacity-90">www.dentipay.com</div>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <Shield className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm font-semibold">Bank-Level Security</div>
          </div>
          <div className="text-center">
            <Lock className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm font-semibold">HIPAA Compliant</div>
          </div>
          <div className="text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm font-semibold">99.9% Uptime</div>
          </div>
          <div className="text-center">
            <Award className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm font-semibold">Seamless Integration</div>
          </div>
        </div>
      </div>
    </section>
  );
};