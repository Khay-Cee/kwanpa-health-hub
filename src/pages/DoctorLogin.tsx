import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Stethoscope, Eye, EyeOff, Lock } from 'lucide-react';
import { saveDoctor } from '@/lib/doctorAuth';

// Mock doctor credentials for local testing
const DOCTOR_CREDENTIALS = [
  { id: 'DOC-2024-001', password: 'Password123!', name: 'Dr. Sarah Mensah' },
  { id: 'DOC-2024-002', password: 'Password123!', name: 'Dr. Kojo Antwi' },
];

const DoctorLogin = () => {
  const [doctorId, setDoctorId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple, local mock authentication
    const found = DOCTOR_CREDENTIALS.find(
      (d) => d.id.toUpperCase() === doctorId.trim().toUpperCase() && d.password === password
    );

    if (!found) {
      // replace with a nicer UI message if needed
      alert('Invalid Doctor ID or password.');
      return;
    }

    // Persist doctor auth separately from regular user
    const doctorAuth = {
      doctorId: found.id,
      name: found.name,
      authenticated: true,
      loggedInAt: new Date().toISOString(),
    };

    try {
      saveDoctor(doctorAuth);
    } catch (e) {
      console.warn('Failed to save doctor auth', e);
    }

    navigate('/doctor/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2">
        <div className="p-8">
          {/* Medical Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
              <img src="/logoo.jpg" alt="Kwanpa logo" className="w-12 h-12 object-contain" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Kwanpa Healthcare Portal</h1>
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              <Lock className="h-4 w-4" />
              Secure Doctor Access
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="doctorId">Doctor ID</Label>
              <Input
                id="doctorId"
                type="text"
                placeholder="Enter your doctor ID"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot Password?
              </a>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Login
            </Button>
          </form>

          {/* Security Note */}
          <p className="text-center text-xs text-muted-foreground mt-6 flex items-center justify-center gap-1">
            <Lock className="h-3 w-3" />
            Secured with end-to-end encryption
          </p>
        </div>
      </Card>
    </div>
  );
};

export default DoctorLogin;
