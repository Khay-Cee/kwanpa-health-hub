import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Activity, Users, Smartphone, Building2, GraduationCap } from 'lucide-react';
import heroImage from '@/assets/hero-health.jpg';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold text-primary">
            <img src="/favicon.svg" alt="Kwanpa logo" className="w-8 h-8 rounded-lg object-contain" />
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

      {/* Hero Section - Glassmorphism Design */}
      <section className="relative pt-24 pb-16 px-4 min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(3px) brightness(0.7)',
          }}
        />
        
        {/* Glassmorphic Content Card */}
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="max-w-3xl mx-auto">
            <div 
              className="backdrop-blur-xl bg-white/15 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl"
              style={{
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              }}
            >
              <div className="text-center animate-fade-slide-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
                  Build Habits That,
                  <span className="block text-primary">Heal</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-800 mb-8 max-w-2xl mx-auto font-medium">
                  Kwanpa empowers individuals in the early stages of chronic conditions to take control of their health. By combining AI insights, connected devices, and daily encouragement, we help you build lasting habits that prevent complications and improve your quality of life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 bg-primary hover:bg-primary/90" 
                    onClick={() => navigate('/signup')}
                  >
                    Start Your Journey
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 bg-white/80 hover:bg-white border-2" 
                    onClick={() => navigate('/login')}
                  >
                    Sign In
                  </Button>
                </div>
              </div>
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

      {/* Partners Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Partners</h2>
            <p className="text-xl text-muted-foreground">
              Building a healthier future together
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {/* Ashesi University */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Ashesi University</h3>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3">
                  Research Partner
                </span>
                <p className="text-sm text-muted-foreground mb-4">
                  Collaborating on AI health research and student innovation projects
                </p>
                <p className="text-xs text-gray-500">Academic & Innovation</p>
              </div>
            </div>

            {/* Hack54 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Activity className="h-10 w-10 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Hack54</h3>
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full mb-3">
                  Tech Partner
                </span>
                <p className="text-sm text-muted-foreground mb-4">
                  Providing technical mentorship and startup acceleration support
                </p>
                <p className="text-xs text-gray-500">Development & Acceleration</p>
              </div>
            </div>

            {/* Ghana Health Service - Placeholder */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Ghana Health Service</h3>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-3">
                  Healthcare Partner
                </span>
                <p className="text-sm text-muted-foreground mb-4">
                  Integrating with national health services for doctor verification
                </p>
                <p className="text-xs text-gray-500 italic">In Discussions</p>
              </div>
            </div>

            {/* Device Partners - Placeholder */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Smartphone className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Device Partners</h3>
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-3">
                  Technology
                </span>
                <p className="text-sm text-muted-foreground mb-4">
                  Supporting integration with major fitness and health device manufacturers
                </p>
                <p className="text-xs text-gray-500 italic">API Integration</p>
              </div>
            </div>
          </div>

          {/* Partnership CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold mb-3">Interested in partnering with Kwanpa?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for collaborators in healthcare, technology, and research to improve health outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" onClick={() => window.location.href = 'mailto:partnerships@kwanpa.com'}>
                Become a Partner
              </Button>
              <p className="text-sm text-muted-foreground">
                Email: <a href="mailto:partnerships@kwanpa.com" className="text-primary hover:underline">partnerships@kwanpa.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/50">
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
      <footer className="border-t border-border py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 text-xl font-bold text-primary mb-4">
                <img src="/favicon.svg" alt="Kwanpa logo" className="w-8 h-8 rounded-lg object-contain" />
                <span>Kwanpa</span>
              </div>
              <p className="text-muted-foreground mb-4">
                AI-powered health monitoring for early-stage chronic conditions. 
                Building habits that heal.
              </p>
              <p className="text-sm text-muted-foreground">
                © 2025 Kwanpa Health. All rights reserved.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <button onClick={() => navigate('/signup')} className="hover:text-primary transition-colors">
                    Get Started
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/login')} className="hover:text-primary transition-colors">
                    Sign In
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/doctor/login')} className="hover:text-primary transition-colors">
                    Doctor Portal
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <button onClick={() => navigate('/terms')} className="hover:text-primary transition-colors">
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/privacy')} className="hover:text-primary transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <a href="mailto:support@kwanpa.com" className="hover:text-primary transition-colors">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>Made by Team Kwanpa in Ghana ❤️  • Empowering healthier lives through technology</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;