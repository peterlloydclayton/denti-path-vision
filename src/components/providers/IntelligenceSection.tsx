import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Headphones, Target, BarChart3, MessageSquare, CheckCircle } from 'lucide-react';

export const IntelligenceSection = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Intelligence That Amplifies Your Practice
          </h2>
        </div>

        {/* Echo AI Callout */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="bg-navy text-white border-0 shadow-elegant">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Meet Echo</h3>
              <p className="text-lg opacity-90">
                Voice-enabled AI assistant that enhances every patient interaction with intelligent financing insights
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Three Pillars */}
        <Tabs defaultValue="pipeline" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="pipeline">Patient Pipeline</TabsTrigger>
            <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Target className="w-8 h-8 text-navy" />
                  <h3 className="text-2xl font-bold">Patient Pipeline Intelligence</h3>
                </div>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Pre-qualify patients before consultation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Intelligent treatment plan matching</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Automated follow-up sequences</span>
                  </li>
                </ul>
                <div className="bg-primary/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-navy">87%</div>
                  <div className="text-sm text-muted-foreground">Patient confidence improvement</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <BarChart3 className="w-8 h-8 text-navy" />
                  <h3 className="text-2xl font-bold">Practice Analytics Dashboard</h3>
                </div>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Real-time approval rate tracking</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Revenue impact analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Patient acceptance predictions</span>
                  </li>
                </ul>
                <div className="bg-success/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-success">23%</div>
                  <div className="text-sm text-muted-foreground">Average revenue increase</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communications" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <MessageSquare className="w-8 h-8 text-navy" />
                  <h3 className="text-2xl font-bold">Patient Communications</h3>
                </div>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Automated approval notifications</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Treatment plan explanations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Payment reminders and support</span>
                  </li>
                </ul>
                <div className="bg-blue-100 rounded-lg p-4">
                  <div className="text-3xl font-bold text-navy">4.5hrs</div>
                  <div className="text-sm text-muted-foreground">Daily time savings</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};