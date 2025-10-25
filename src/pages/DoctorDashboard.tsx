import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, Bell, MessageSquare, User, ChevronDown, 
  AlertTriangle, TrendingUp, Calendar, Activity 
} from 'lucide-react';

const mockPatients = [
  {
    id: 1,
    name: 'Ama Osei',
    age: 58,
    gender: 'Female',
    condition: 'Hypertension',
    score: 45,
    priority: 'critical',
    aiAlert: true,
    alertMessage: 'BP elevated 3 days',
    lastSync: '30 mins ago',
    vitals: { bp: '145/95', hr: '88 bpm' },
  },
  {
    id: 2,
    name: 'Kofi Mensah',
    age: 42,
    gender: 'Male',
    condition: 'Diabetes T2',
    score: 65,
    priority: 'monitor',
    aiAlert: false,
    lastSync: '2 hours ago',
    vitals: { bp: '120/80', hr: '72 bpm' },
  },
  {
    id: 3,
    name: 'Kwame Asante',
    age: 35,
    gender: 'Male',
    condition: 'Asthma',
    score: 85,
    priority: 'stable',
    aiAlert: false,
    lastSync: '1 hour ago',
    vitals: { bp: '118/78', hr: '70 bpm' },
  },
];

const DoctorDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const navigate = useNavigate();

  const criticalCount = mockPatients.filter(p => p.priority === 'critical').length;
  const monitorCount = mockPatients.filter(p => p.priority === 'monitor').length;
  const stableCount = mockPatients.filter(p => p.priority === 'stable').length;

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterPriority === 'all' || patient.priority === filterPriority;
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-destructive';
      case 'monitor': return 'text-warning';
      case 'stable': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge variant="destructive">🔴 Critical</Badge>;
      case 'monitor':
        return <Badge className="bg-warning text-warning-foreground">🟡 Monitor</Badge>;
      case 'stable':
        return <Badge className="bg-success text-success-foreground">🟢 Stable</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Bar */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">🏥 Kwanpa | Doctor Portal</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {criticalCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-xs text-white flex items-center justify-center">
                    {criticalCount}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button variant="ghost" className="gap-2">
                <User className="h-5 w-5" />
                <span className="hidden md:inline">Dr. Mensah</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <Card className="mb-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">Good morning, Dr. Mensah 👋</h2>
            <p className="text-muted-foreground mb-4">
              Here's an overview of your patients today.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{mockPatients.length}</p>
                  <p className="text-sm text-muted-foreground">Active patients</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="text-2xl font-bold">{criticalCount}</p>
                  <p className="text-sm text-muted-foreground">Alerts</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Appointments</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <div>
                  <p className="text-2xl font-bold">78%</p>
                  <p className="text-sm text-muted-foreground">Avg Health</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Priority Indicator Bar */}
        <Card className="mb-6">
          <div className="p-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4">
                <span className="text-sm">
                  🔴 High Priority: <strong>{criticalCount} patients</strong>
                </span>
                <span className="text-sm">
                  🟡 Monitor: <strong>{monitorCount} patients</strong>
                </span>
                <span className="text-sm">
                  🟢 Stable: <strong>{stableCount} patients</strong>
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterPriority === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterPriority('all')}
                >
                  All
                </Button>
                <Button
                  variant={filterPriority === 'critical' ? 'destructive' : 'outline'}
                  size="sm"
                  onClick={() => setFilterPriority('critical')}
                >
                  Critical
                </Button>
                <Button
                  variant={filterPriority === 'monitor' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterPriority('monitor')}
                  className={filterPriority === 'monitor' ? 'bg-warning hover:bg-warning/90' : ''}
                >
                  Monitor
                </Button>
                <Button
                  variant={filterPriority === 'stable' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterPriority('stable')}
                  className={filterPriority === 'stable' ? 'bg-success hover:bg-success/90' : ''}
                >
                  Stable
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Mobile Search */}
        <div className="md:hidden mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Patient Cards - Mobile */}
        <div className="md:hidden space-y-4">
          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className="border-l-4"
              style={{
                borderLeftColor:
                  patient.priority === 'critical'
                    ? 'hsl(var(--destructive))'
                    : patient.priority === 'monitor'
                    ? 'hsl(var(--warning))'
                    : 'hsl(var(--success))',
              }}
            >
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  {getPriorityBadge(patient.priority)}
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Age: {patient.age} | {patient.gender}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Condition: {patient.condition}
                    </p>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-sm">
                    Health Score: <strong className={getPriorityColor(patient.priority)}>{patient.score}/100</strong>
                  </p>
                  {patient.aiAlert && (
                    <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                      <AlertTriangle className="h-3 w-3" />
                      AI Alert: {patient.alertMessage}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Last sync: {patient.lastSync}
                  </p>
                </div>
                <div className="mb-3 text-sm">
                  <p className="font-medium mb-1">Key Vitals:</p>
                  <p>• BP: {patient.vitals.bp} {patient.priority === 'critical' ? '⚠️' : ''}</p>
                  <p>• Heart Rate: {patient.vitals.hr}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                  >
                    View Details
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Patient Table - Desktop */}
        <Card className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Photo</th>
                  <th className="text-left p-4 font-semibold">Name</th>
                  <th className="text-left p-4 font-semibold">Age</th>
                  <th className="text-left p-4 font-semibold">Condition</th>
                  <th className="text-left p-4 font-semibold">Score</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">{patient.gender}</p>
                      </div>
                    </td>
                    <td className="p-4">{patient.age}</td>
                    <td className="p-4">{patient.condition}</td>
                    <td className="p-4">
                      <span className={`font-semibold ${getPriorityColor(patient.priority)}`}>
                        {patient.score}/100
                      </span>
                    </td>
                    <td className="p-4">{getPriorityBadge(patient.priority)}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                        >
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {filteredPatients.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No patients found matching your search.</p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default DoctorDashboard;
