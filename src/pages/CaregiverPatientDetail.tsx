import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Layout/Header';
import { SideMenu } from '@/components/Layout/SideMenu';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Phone, MessageCircle, Calendar, CheckCircle } from 'lucide-react';
import { ProgressRing } from '@/components/ui/progress-ring';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stepsData = [
  { day: 'Mon', steps: 8200 },
  { day: 'Tue', steps: 9100 },
  { day: 'Wed', steps: 7800 },
  { day: 'Thu', steps: 10200 },
  { day: 'Fri', steps: 8432 },
  { day: 'Sat', steps: 6500 },
  { day: 'Sun', steps: 7200 },
];

const sleepData = [
  { day: 'Mon', hours: 7.5 },
  { day: 'Tue', hours: 8.0 },
  { day: 'Wed', hours: 6.5 },
  { day: 'Thu', hours: 7.8 },
  { day: 'Fri', hours: 7.5 },
  { day: 'Sat', hours: 8.2 },
  { day: 'Sun', hours: 7.0 },
];

const hydrationData = [
  { day: 'Mon', liters: 2.1 },
  { day: 'Tue', liters: 2.5 },
  { day: 'Wed', liters: 1.8 },
  { day: 'Thu', liters: 2.3 },
  { day: 'Fri', liters: 1.5 },
  { day: 'Sat', liters: 2.7 },
  { day: 'Sun', liters: 2.2 },
];

const CaregiverPatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Mock patient data
  const patient = {
    name: 'Kofi Mensah',
    age: 42,
    gender: 'Male',
    condition: 'Diabetic Type 2',
    healthScore: 85,
    lastUpdated: '2 hours ago',
  };

  const handleSendMessage = () => {
    // TODO: Implement message sending
    console.log('Sending message:', message);
    setMessage('');
    setMessageOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setMenuOpen(true)} />
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="container mx-auto px-4 pt-20 pb-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/caregiver')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Patients
        </Button>

        {/* Patient Header */}
        <Card className="mb-6">
          <div className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                  KM
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1">{patient.name}</h1>
                <p className="text-muted-foreground">
                  Age: {patient.age} | Gender: {patient.gender}
                </p>
                <p className="text-muted-foreground">
                  Condition: {patient.condition}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Last updated: {patient.lastUpdated}
            </p>
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Contact
            </Button>
          </div>
        </Card>

        {/* Overall Health Score */}
        <Card className="mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Overall Health Score</h2>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <ProgressRing progress={patient.healthScore} size={160} />
                <p className="text-2xl font-bold mt-4">{patient.healthScore}/100</p>
                <p className="text-success font-medium">Great Progress!</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Steps & Activity */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">👟 Steps & Activity</h3>
              <div className="mb-4">
                <p className="text-3xl font-bold mb-1">8,432</p>
                <p className="text-sm text-muted-foreground mb-2">of 10,000 goal</p>
                <Progress value={84} className="h-2" />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={stepsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="steps" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Sleep Quality */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">😴 Sleep Tracking</h3>
              <div className="mb-4">
                <p className="text-3xl font-bold mb-1">7h 30m</p>
                <p className="text-sm text-success">🟢 Regular pattern</p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sleepData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="hsl(var(--success))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Hydration */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">💧 Water Intake</h3>
              <div className="mb-4">
                <p className="text-3xl font-bold mb-1">1.5L / 2.5L</p>
                <p className="text-sm text-muted-foreground mb-2">60% of daily goal</p>
                <Progress value={60} className="h-2" />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={hydrationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="liters" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Meal Log */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">🍽️ Meal Tracking</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                  <div>
                    <p className="font-medium">Breakfast</p>
                    <p className="text-sm text-muted-foreground">8:30 AM</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                  <div>
                    <p className="font-medium">Lunch</p>
                    <p className="text-sm text-muted-foreground">1:15 PM</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                  <div>
                    <p className="font-medium">Dinner</p>
                    <p className="text-sm text-muted-foreground">Not logged</p>
                  </div>
                  <span className="text-warning">⚠️</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Health Vitals */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">❤️ Health Vitals</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Heart Rate</span>
                  <span className="font-medium">72 bpm 🟢</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Blood Pressure</span>
                  <span className="font-medium">120/80 🟢</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Blood Sugar</span>
                  <span className="font-medium">95 mg/dL 🟢</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Body Temp</span>
                  <span className="font-medium">36.8°C 🟢</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">🤖 AI Insights</h2>
            <div className="space-y-3">
              <div className="p-4 bg-warning/10 rounded-lg">
                <p className="text-sm">
                  • Patient's sleep dropped by 20% this week. Consider checking sleep routine.
                </p>
              </div>
              <div className="p-4 bg-success/10 rounded-lg">
                <p className="text-sm">
                  • Blood sugar levels are stable and within target range. Keep it up! 🎉
                </p>
              </div>
              <div className="p-4 bg-success/10 rounded-lg">
                <p className="text-sm">
                  • Hydration has improved by 15% since last week. Excellent progress! 💧
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">💡 Recommendations</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Encourage evening walks to boost steps</li>
              <li>• Set bedtime reminder for better sleep</li>
              <li>• Consider low-sodium meal options</li>
            </ul>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button size="lg">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Check-up
          </Button>
          
          <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message to Patient
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Message to {patient.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Quick templates:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMessage("Great job this week!")}
                    >
                      Great job this week!
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMessage("Please focus on your hydration")}
                    >
                      Focus on hydration
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMessage("Let's review your progress together")}
                    >
                      Review progress
                    </Button>
                  </div>
                </div>
                <Button onClick={handleSendMessage} className="w-full">
                  Send Message
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button size="lg" variant="outline" className="border-success text-success hover:bg-success/10">
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark as Reviewed
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CaregiverPatientDetail;
