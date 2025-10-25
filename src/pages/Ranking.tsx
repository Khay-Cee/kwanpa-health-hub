import { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { SideMenu } from '@/components/Layout/SideMenu';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Medal } from 'lucide-react';

export default function Ranking() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'daily' | 'weekly' | 'monthly' | 'all-time'>('weekly');

  const topUsers = [
    { id: 'User_1234', score: 95, rank: 1 },
    { id: 'User_5678', score: 92, rank: 2 },
    { id: 'User_9012', score: 89, rank: 3 },
  ];

  const otherUsers = Array.from({ length: 20 }, (_, i) => ({
    id: `User_${Math.floor(Math.random() * 10000)}`,
    score: 85 - i * 2,
    rank: i + 4,
  }));

  const currentUserRank = 47;
  const currentUserScore = 78;

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-gray-300 to-gray-400';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    return 'from-muted to-muted';
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) return <Trophy className="h-5 w-5 text-white" />;
    if (rank <= 10) return <Medal className="h-5 w-5 text-warning" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onMenuClick={() => setMenuOpen(true)} notificationCount={0} />
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="pt-16 px-4 max-w-4xl mx-auto">
        <section className="py-6">
          <h1 className="text-3xl font-bold mb-2">Community Leaderboard</h1>
          <p className="text-muted-foreground">
            See how you compare! (All data is anonymous)
          </p>
        </section>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {(['daily', 'weekly', 'monthly', 'all-time'] as const).map((period) => (
            <Button
              key={period}
              variant={filter === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(period)}
              className="capitalize whitespace-nowrap"
            >
              {period.replace('-', ' ')}
            </Button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <section className="mb-8">
          <div className="grid grid-cols-3 gap-4 items-end">
            {/* 2nd Place */}
            <Card className="p-4 text-center order-1">
              <div className={`w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br ${getRankColor(2)} flex items-center justify-center`}>
                {getRankIcon(2)}
              </div>
              <div className="text-2xl font-bold mb-1">2</div>
              <div className="text-sm font-medium mb-1">{topUsers[1].id}</div>
              <div className="text-lg font-bold text-primary">{topUsers[1].score}</div>
            </Card>

            {/* 1st Place */}
            <Card className="p-6 text-center order-2 shadow-lg">
              <div className={`w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br ${getRankColor(1)} flex items-center justify-center shadow-md`}>
                {getRankIcon(1)}
              </div>
              <div className="text-3xl font-bold mb-1">1</div>
              <div className="text-sm font-medium mb-1">{topUsers[0].id}</div>
              <div className="text-xl font-bold text-primary">{topUsers[0].score}</div>
            </Card>

            {/* 3rd Place */}
            <Card className="p-4 text-center order-3">
              <div className={`w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br ${getRankColor(3)} flex items-center justify-center`}>
                {getRankIcon(3)}
              </div>
              <div className="text-2xl font-bold mb-1">3</div>
              <div className="text-sm font-medium mb-1">{topUsers[2].id}</div>
              <div className="text-lg font-bold text-primary">{topUsers[2].score}</div>
            </Card>
          </div>
        </section>

        {/* Current User */}
        <Card className="p-4 mb-6 bg-primary/5 border-primary">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-primary">#{currentUserRank}</div>
              <div>
                <div className="font-semibold">Your Rank</div>
                <div className="text-sm text-muted-foreground">
                  Climb 3 spots to reach top 50! 💪
                </div>
              </div>
            </div>
            <div className="text-2xl font-bold">{currentUserScore}</div>
          </div>
        </Card>

        {/* Leaderboard List */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Full Rankings</h2>
          <div className="space-y-2">
            {otherUsers.map((user) => (
              <Card key={user.id} className="p-3 hover:bg-accent transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="font-semibold">{user.rank}</span>
                    </div>
                    <div>
                      <div className="font-medium">{user.id}</div>
                    </div>
                    {getRankIcon(user.rank)}
                  </div>
                  <div className="text-lg font-bold">{user.score}</div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
