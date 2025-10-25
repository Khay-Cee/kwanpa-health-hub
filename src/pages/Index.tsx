import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Activity, Users, Smartphone } from 'lucide-react';
import heroImage from '@/assets/hero-health.jpg';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold text-primary">
            <div className="w-8 h-8 bg-gradient-health rounded-lg flex items-center justify-center text-white text-sm font-bold">
              K
            </div>
            <span>Kwanpa</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/login')}>
              Log In
            </Button>
            <Button onClick={() => navigate('/signup')}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-slide-up">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Health,
                <span className="block text-primary">Simplified</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Track your health, connect with caregivers, and stay on top of your wellness journey with Kwanpa's AI-powered health monitoring system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="text-lg px-8" onClick={() => navigate('/signup')}>
                  Start Your Journey
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-slide-up" style={{ animationDelay: '200ms' }}>
              <img 
                src={heroImage} 
                alt="Health monitoring illustration" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Everything You Need for Better Health
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-slide-up">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Tracking</h3>
              <p className="text-muted-foreground">
                Monitor steps, sleep, meals, and vital signs all in one place
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
              <p className="text-muted-foreground">
                Get personalized health tips and early warning alerts
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-warning" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Care Network</h3>
              <p className="text-muted-foreground">
                Connect with caregivers and doctors for better support
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Device Sync</h3>
              <p className="text-muted-foreground">
                Seamlessly connect with your smartwatch and health devices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of users already improving their wellness with Kwanpa
          </p>
          <Button size="lg" className="text-lg px-12" onClick={() => navigate('/signup')}>
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>© 2025 Kwanpa Health. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
