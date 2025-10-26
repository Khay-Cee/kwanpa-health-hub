import { useState, useEffect } from 'react';
import { Header } from '@/components/Layout/Header';
import { SideMenu } from '@/components/Layout/SideMenu';
import { ProgressRing } from '@/components/ui/progress-ring';
import { ProfileCompletionModal } from '@/components/Profile/ProfileCompletionModal';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Camera, Plus, Footprints, Moon, Droplets, Flame } from 'lucide-react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);
  // We will use a single, site-provided welcome avatar for all users.
  // Place the image at `public/welcome-avatar.png` so it is served statically.
  const [avatarSrc, setAvatarSrc] = useState<string>('/welcome-avatar.png');

  useEffect(() => {
    // First, check auth user object in localStorage
    try {
      const rawUser = localStorage.getItem('user');
      if (rawUser) {
        const user = JSON.parse(rawUser);
        if (user?.profileCompleted === false) {
          setShowProfileModal(true);
        }

        const fullName = user?.profileData?.fullName || user?.profileData?.fullname || user?.profileData?.name;
  // Ignore per-user avatar and always show the shared welcome avatar.
  // If you'd like to prefer user avatars, remove this override.
  setAvatarSrc('/welcome-avatar.png');
        if (fullName) {
          const firstName = String(fullName).trim().split(' ')[0];
          setDisplayName(firstName || fullName);
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to parse user from storage', e);
    }

    // Backwards-compatible fallback: legacy keys
    const profileComplete = localStorage.getItem('profileComplete');
    const promptDismissed = localStorage.getItem('profilePromptDismissed');
    if (!profileComplete && !promptDismissed) {
      setShowProfileModal(true);
    }

    // Legacy profile key for displayName fallback
    try {
      const raw = localStorage.getItem('profile');
      if (raw) {
        const profile = JSON.parse(raw);
        const fullName = (profile.fullName || profile.fullname || profile.name) as string | undefined;
        if (fullName) {
          const firstName = fullName.trim().split(' ')[0];
          setDisplayName(firstName || fullName);
        }
      }
    } catch (e) {
      console.warn('Failed to parse profile from storage', e);
    }
  }, []);
  const weeklyScore = 78;

  // Mock data
  const healthData = {
    steps: { current: 8432, goal: 10000 },
    sleep: { hours: 7, minutes: 45, bedtime: '10:45 PM', wakeup: '6:30 AM' },
    water: { current: 1.5, goal: 2.5 },
    calories: 420,
  };

  const meals = [
    { name: 'Breakfast', time: '8:00 AM', logged: false },
    { name: 'Lunch', time: '1:00 PM', logged: false },
    { name: 'Dinner', time: '7:00 PM', logged: false },
  ];

  const getScoreMessage = (score: number) => {
    if (score >= 80) return { text: 'Excellent! Keep it up!', emoji: '🎉' };
    if (score >= 60) return { text: 'Good progress! Almost there!', emoji: '💪' };
    if (score >= 40) return { text: "You're doing okay. Let's improve!", emoji: '📈' };
    return { text: "Let's work together on this!", emoji: '💚' };
  };

  const scoreMessage = getScoreMessage(weeklyScore);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onMenuClick={() => setMenuOpen(true)} notificationCount={3} />
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <ProfileCompletionModal 
        open={showProfileModal} 
        onOpenChange={setShowProfileModal} 
      />

      <main className="pt-16 px-4 max-w-7xl mx-auto">
        {/* Greeting */}
        <section className="py-6 animate-fade-slide-up">
          <div className="flex items-center gap-4">
            {/* Left bold avatar */}
            <div>
              {/* Prefer profile avatar if present, otherwise show the provided welcome image from /welcome-avatar.png */}
              {/* Always show the shared welcome avatar with no border */}
              <img
                src={avatarSrc}
                alt={displayName ? `${displayName}'s avatar` : 'Welcome avatar'}
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2">
                {displayName ? `Welcome, ${displayName}! 👋` : 'Welcome, User! 👋'}
              </h1>
              <p className="text-muted-foreground">
                Hope you're doing well today. Check in for your weekly progress.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </section>

        {/* Weekly Progress */}
        <section className="mb-8 animate-fade-slide-up" style={{ animationDelay: '100ms' }}>
          <Card className="p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Weekly Health Score</h2>
            <div className="flex flex-col items-center">
              <ProgressRing progress={weeklyScore} size={160} strokeWidth={12}>
                <div className="text-center">
                  <div className="text-4xl font-bold">{weeklyScore}</div>
                  <div className="text-sm text-muted-foreground">/100</div>
                </div>
              </ProgressRing>
              <p className="mt-4 text-center text-lg">
                {scoreMessage.text} {scoreMessage.emoji}
              </p>
            </div>
          </Card>
        </section>

        {/* Health Snapshot */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Health Snapshot</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Steps Card */}
            <Card className="p-4 shadow-sm hover:shadow-md transition-shadow animate-fade-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Footprints className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Steps Today</h3>
                  <p className="text-2xl font-bold">{healthData.steps.current.toLocaleString()}</p>
                </div>
              </div>
              <Progress 
                value={(healthData.steps.current / healthData.steps.goal) * 100} 
                className="h-2"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Goal: {healthData.steps.goal.toLocaleString()}
              </p>
            </Card>

            {/* Sleep Card */}
            <Card className="p-4 shadow-sm hover:shadow-md transition-shadow animate-fade-slide-up" style={{ animationDelay: '250ms' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <Moon className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold">Sleep Last Night</h3>
                  <p className="text-2xl font-bold">{healthData.sleep.hours}h {healthData.sleep.minutes}m</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Sleep: {healthData.sleep.bedtime} | Wake: {healthData.sleep.wakeup}
              </p>
            </Card>

            {/* Hydration Card */}
            <Card className="p-4 shadow-sm hover:shadow-md transition-shadow animate-fade-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Droplets className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Water Intake</h3>
                  <p className="text-2xl font-bold">{healthData.water.current}L</p>
                </div>
              </div>
              <Progress 
                value={(healthData.water.current / healthData.water.goal) * 100} 
                className="h-2"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Goal: {healthData.water.goal}L
              </p>
            </Card>

            {/* Activity Card */}
            <Card className="p-4 shadow-sm hover:shadow-md transition-shadow animate-fade-slide-up" style={{ animationDelay: '350ms' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                  <Flame className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold">Calories Burned</h3>
                  <p className="text-2xl font-bold">{healthData.calories} cal</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Food Tracking */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Today's Meals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {meals.map((meal, index) => (
              <Card 
                key={meal.name} 
                className="p-4 shadow-sm hover:shadow-md transition-shadow animate-fade-slide-up"
                style={{ animationDelay: `${400 + index * 50}ms` }}
              >
                {!meal.logged ? (
                  <div className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-muted rounded-lg">
                    <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="font-semibold mb-1">{meal.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{meal.time}</p>
                    <Button size="sm" variant="default">
                      <Camera className="h-4 w-4 mr-2" />
                      Add {meal.name}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="aspect-video bg-muted rounded-lg mb-3" />
                    <h3 className="font-semibold">{meal.name}</h3>
                    <Button variant="link" size="sm" className="p-0 h-auto">
                      View Details
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Quick actions"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
