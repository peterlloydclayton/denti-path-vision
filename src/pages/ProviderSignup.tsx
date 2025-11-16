import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function ProviderSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    practiceName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you! We will contact you shortly to complete your registration.');
    setTimeout(() => navigate('/providers'), 2000);
  };

  const benefits = [
    'Increase case acceptance by 40% with AI-powered patient financing',
    'Automate your entire financing workflow with Echo AI assistance',
    'Join a trusted network that strengthens your brand and patient trust',
    'Get instant approvals for 94% of patients',
    'Zero setup fees or monthly minimums'
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join DentiPay Today</h1>
          <p className="text-xl text-muted-foreground">Transform your practice with intelligent financing</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Why Choose DentiPay?</CardTitle>
                <CardDescription>Join hundreds of practices already growing with us</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{benefit}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>Fill out the form below and we'll contact you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="practiceName">Practice Name *</Label>
                    <Input
                      id="practiceName"
                      required
                      value={formData.practiceName}
                      onChange={(e) => setFormData({ ...formData, practiceName: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
