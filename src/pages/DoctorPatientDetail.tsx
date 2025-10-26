import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  ArrowLeft, Phone, MessageCircle, Calendar, FileText, 
  Pill, TestTube, AlertTriangle, TrendingUp 
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const heartRateData = [
  { day: 'Mon', bpm: 72 },
  { day: 'Tue', bpm: 75 },
  { day: 'Wed', bpm: 88 },
  { day: 'Thu', bpm: 85 },
  { day: 'Fri', bpm: 88 },
  { day: 'Sat', bpm: 82 },
  { day: 'Sun', bpm: 78 },
];

const bloodPressureData = [
  { day: 'Mon', systolic: 138, diastolic: 88 },
  { day: 'Tue', systolic: 142, diastolic: 90 },
  { day: 'Wed', systolic: 145, diastolic: 95 },
  { day: 'Thu', systolic: 148, diastolic: 96 },
  { day: 'Fri', systolic: 145, diastolic: 95 },
  { day: 'Sat', systolic: 140, diastolic: 88 },
  { day: 'Sun', systolic: 138, diastolic: 86 },
];

const glucoseData = [
  { time: '8am', value: 95 },
  { time: '10am', value: 110 },
  { time: '12pm', value: 145 },
  { time: '2pm', value: 120 },
  { time: '4pm', value: 100 },
  { time: '6pm', value: 140 },
  { time: '8pm', value: 115 },
];

const DoctorPatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState('');

  const patient = {
    name: 'Ama Osei',
    age: 58,
    gender: 'Female',
    mrn: '2024-12345',
    condition: 'Hypertension',
    caregiver: 'Sarah Osei',
    lastUpdated: '30 minutes ago',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16 gap-3">
              <img src="/logoo.jpg" alt="logo" className="w-6 h-6 object-contain" />
              <Button variant="ghost" onClick={() => navigate('/doctor/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Patients
              </Button>
            </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Patient Header */}
        <Card className="mb-6">
          <div className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                  AO
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1">{patient.name}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span>Age: {patient.age}</span>
                  <span>Gender: {patient.gender}</span>
                  <span>MRN: {patient.mrn}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Primary: {patient.condition}
                </p>
                <p className="text-sm text-muted-foreground">
                  Assigned Caregiver: {patient.caregiver}
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Emergency Contact
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Last updated: {patient.lastUpdated}
            </p>
          </div>
        </Card>

        {/* Alert Banner */}
        <Card className="mb-6 bg-destructive/10 border-destructive/20">
          <div className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-destructive mb-1">
                  ⚠️ AI ALERT: Irregular blood pressure detected
                </p>
                <p className="text-sm text-muted-foreground">
                  Last concerning reading: 4 hours ago (148/96)
                </p>
              </div>
              <Button variant="destructive" size="sm">
                View Detailed Analysis
              </Button>
            </div>
          </div>
        </Card>

        {/* Vital Signs Dashboard */}
        <h2 className="text-xl font-semibold mb-4">Vital Signs Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Heart Rate */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">❤️ Heart Rate</h3>
                <div className="text-right">
                  <p className="text-2xl font-bold">88 bpm</p>
                  <Badge className="bg-success text-success-foreground">Normal</Badge>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={heartRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <ReferenceLine y={60} stroke="hsl(var(--success))" strokeDasharray="3 3" />
                  <ReferenceLine y={100} stroke="hsl(var(--success))" strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="bpm" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-sm text-muted-foreground mt-2">7-day average: 81 bpm</p>
            </div>
          </Card>

          {/* Blood Pressure */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">🩸 Blood Pressure</h3>
                <div className="text-right">
                  <p className="text-2xl font-bold text-warning">145/95</p>
                  <Badge variant="destructive">Above Normal</Badge>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={bloodPressureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[70, 160]} />
                  <Tooltip />
                  <ReferenceLine y={120} stroke="hsl(var(--success))" strokeDasharray="3 3" label="Systolic Normal" />
                  <ReferenceLine y={80} stroke="hsl(var(--success))" strokeDasharray="3 3" label="Diastolic Normal" />
                  <Line type="monotone" dataKey="systolic" stroke="hsl(var(--destructive))" strokeWidth={2} />
                  <Line type="monotone" dataKey="diastolic" stroke="hsl(var(--warning))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  Systolic
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  Diastolic
                </span>
              </div>
              <p className="text-sm mt-2">
                <TrendingUp className="inline h-4 w-4 text-destructive" /> Rising trend
              </p>
            </div>
          </Card>

          {/* Blood Glucose */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">💉 Blood Glucose</h3>
                <div className="text-right">
                  <p className="text-2xl font-bold">95 mg/dL</p>
                  <Badge className="bg-success text-success-foreground">Normal</Badge>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={glucoseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[70, 160]} />
                  <Tooltip />
                  <ReferenceLine y={100} stroke="hsl(var(--success))" strokeDasharray="3 3" />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
              <p className="text-sm text-muted-foreground mt-2">Target range: 70-140 mg/dL</p>
            </div>
          </Card>

          {/* Activity Level */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">👟 Activity Level</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={heartRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bpm" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-sm text-muted-foreground mt-2">Weekly average: 7,500 steps</p>
            </div>
          </Card>
        </div>

        {/* AI Insights Panel */}
        <Card className="mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">🤖 AI Analysis & Insights</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Detected Patterns:</h3>
                <div className="p-4 bg-warning/10 rounded-lg space-y-2">
                  <p className="text-sm">
                    • Blood pressure elevated on 6 of last 7 days
                  </p>
                  <p className="text-xs text-muted-foreground">Confidence: 95%</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Risk Predictions:</h3>
                <div className="p-4 bg-destructive/10 rounded-lg">
                  <p className="text-sm">
                    • Moderate risk of hypertensive event if pattern continues. Recommend medication review.
                  </p>
                  <Badge variant="destructive" className="mt-2">Risk Level: Medium ⚠️</Badge>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Recommended Actions:</h3>
                <div className="space-y-2">
                  <p className="text-sm flex items-center gap-2">
                    <span className="text-success">✓</span> Schedule in-person consultation
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <span className="text-success">✓</span> Review current BP medication dosage
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <span className="text-success">✓</span> Discuss stress management strategies
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <span className="text-success">✓</span> Order comprehensive metabolic panel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Clinical Notes */}
        <Card className="mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">📋 Clinical Notes & History</h2>
              <Dialog open={noteOpen} onOpenChange={setNoteOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Add New Note
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Clinical Note</DialogTitle>
                  </DialogHeader>
                  <Textarea
                    placeholder="Enter clinical note..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={8}
                  />
                  <Button onClick={() => setNoteOpen(false)}>Save Note</Button>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium">Oct 20, 2025 - Dr. Mensah</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Patient reports dizziness. BP: 140/90. Adjusted medication dosage. Follow-up in 2 weeks.
                </p>
              </div>
              <div className="border-l-2 border-muted pl-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium">Oct 5, 2025 - Dr. Mensah</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Follow-up visit. BP improving with current medication. Continue monitoring.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Medications */}
        <Card className="mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">💊 Current Medications</h2>
              <Button size="sm" variant="outline">
                <Pill className="h-4 w-4 mr-2" />
                Prescribe New
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Lisinopril 10mg</p>
                  <p className="text-sm text-muted-foreground">Once daily</p>
                </div>
                <p className="text-xs text-muted-foreground">Started: Jan 2025</p>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Metformin 500mg</p>
                  <p className="text-sm text-muted-foreground">Twice daily</p>
                </div>
                <p className="text-xs text-muted-foreground">Started: Mar 2024</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Communication */}
        <Card className="mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">💬 Patient Communication</h2>
            <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
              <DialogTrigger asChild>
                <Button>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Compose New Message
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Message to {patient.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Quick Templates:</p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMessage("Please schedule an appointment at your earliest convenience.")}
                      >
                        Schedule appointment
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMessage("Reminder to take your medication as prescribed.")}
                      >
                        Medication reminder
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMessage("Your lab results are ready for review.")}
                      >
                        Lab results ready
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                  />
                  <Button onClick={() => setMessageOpen(false)} className="w-full">
                    Send Message
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-background border-t py-4">
          <div className="flex flex-wrap gap-3">
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
            <Button variant="outline">
              <Pill className="h-4 w-4 mr-2" />
              Prescribe Medication
            </Button>
            <Button variant="outline">
              <TestTube className="h-4 w-4 mr-2" />
              Request Lab Tests
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorPatientDetail;
