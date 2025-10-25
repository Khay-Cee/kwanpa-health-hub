import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Layout/Header';
import { SideMenu } from '@/components/Layout/SideMenu';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, AlertTriangle } from 'lucide-react';
import { ProgressRing } from '@/components/ui/progress-ring';

const mockPatients = [
  {
    id: 1,
    name: 'Kofi Mensah',
    age: 42,
    gender: 'M',
    healthScore: 85,
    status: 'stable',
    steps: 8432,
    stepsGoal: 10000,
    sleep: '7h 30m',
    glucose: 95,
    glucoseStatus: 'normal',
    lastUpdated: '2 hours ago',
  },
  {
    id: 2,
    name: 'Ama Osei',
    age: 58,
    gender: 'F',
    healthScore: 45,
    status: 'critical',
    steps: 3200,
    stepsGoal: 10000,
    sleep: '5h 15m',
    glucose: 168,
    glucoseStatus: 'high',
    lastUpdated: '30 mins ago',
  },
  {
    id: 3,
    name: 'Kwame Asante',
    age: 35,
    gender: 'M',
    healthScore: 92,
    status: 'stable',
    steps: 12500,
    stepsGoal: 10000,
    sleep: '8h 0m',
    glucose: 88,
    glucoseStatus: 'normal',
    lastUpdated: '1 hour ago',
  },
];

const CaregiverDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();

  const criticalCount = mockPatients.filter(p => p.status === 'critical').length;

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'border-l-destructive';
      case 'monitor': return 'border-l-warning';
      case 'stable': return 'border-l-success';
      default: return 'border-l-muted';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical': return <Badge variant="destructive">Critical</Badge>;
      case 'monitor': return <Badge className="bg-warning text-warning-foreground">Monitor</Badge>;
      case 'stable': return <Badge className="bg-success text-success-foreground">Stable</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setMenuOpen(true)} />
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="container mx-auto px-4 pt-20 pb-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">🏥 Caregiver Dashboard</h1>
          <p className="text-muted-foreground">Monitor and support your patients</p>
        </div>

        {/* Alert Banner */}
        {criticalCount > 0 && (
          <Card className="mb-6 bg-destructive/10 border-destructive/20">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span className="text-destructive font-medium">
                  {criticalCount} patient{criticalCount > 1 ? 's' : ''} need{criticalCount === 1 ? 's' : ''} attention
                </span>
              </div>
              <Button variant="destructive" size="sm">View Alerts</Button>
            </div>
          </Card>
        )}

        {/* Search and Filter */}
        <Card className="mb-6">
          <div className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients by name or ID"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'stable' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('stable')}
                className={filterStatus === 'stable' ? 'bg-success hover:bg-success/90' : ''}
              >
                Stable
              </Button>
              <Button
                variant={filterStatus === 'monitor' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('monitor')}
                className={filterStatus === 'monitor' ? 'bg-warning hover:bg-warning/90' : ''}
              >
                Monitor
              </Button>
              <Button
                variant={filterStatus === 'critical' ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('critical')}
              >
                Critical
              </Button>
            </div>
          </div>
        </Card>

        {/* Patient Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className={`border-l-4 ${getStatusColor(patient.status)} hover:shadow-lg transition-shadow`}
            >
              <div className="p-6 space-y-4">
                {/* Patient Header */}
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">Age: {patient.age}, {patient.gender}</p>
                  </div>
                </div>

                {/* Health Score */}
                <div className="flex items-center gap-3">
                  <ProgressRing progress={patient.healthScore} size={60} />
                  <div>
                    <p className="text-sm text-muted-foreground">Health Score</p>
                    <p className="text-2xl font-bold">{patient.healthScore}/100</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div>
                  {getStatusBadge(patient.status)}
                </div>

                {/* Key Vitals */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Key Vitals:</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>👟 Steps: {patient.steps.toLocaleString()} / {patient.stepsGoal.toLocaleString()}</p>
                    <p>😴 Sleep: {patient.sleep}</p>
                    <p>🩸 Glucose: {patient.glucose} mg/dL {patient.glucoseStatus === 'normal' ? '✓' : '⚠️'}</p>
                  </div>
                </div>

                {/* Last Updated */}
                <p className="text-xs text-muted-foreground">Last updated: {patient.lastUpdated}</p>

                {/* View Details Button */}
                <Button
                  className="w-full"
                  onClick={() => navigate(`/caregiver/patient/${patient.id}`)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No patients found matching your search.</p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default CaregiverDashboard;
