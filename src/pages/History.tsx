import { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { SideMenu } from '@/components/Layout/SideMenu';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, TrendingUp, Flame } from 'lucide-react';

export default function History() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getScoreForDate = (date: Date | null) => {
    if (!date) return 0;
    // Mock score generation
    return Math.floor(Math.random() * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-success text-success-foreground';
    if (score >= 60) return 'bg-warning-light text-warning-foreground';
    if (score >= 40) return 'bg-warning text-warning-foreground';
    if (score > 0) return 'bg-destructive/30 text-foreground';
    return 'bg-muted text-muted-foreground';
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentMonth(newDate);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onMenuClick={() => setMenuOpen(true)} notificationCount={0} />
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="pt-16 px-4 max-w-4xl mx-auto">
        <section className="py-6">
          <h1 className="text-3xl font-bold mb-2">Health History</h1>
          <p className="text-muted-foreground">
            Track your progress over time
          </p>
        </section>

        {/* Monthly Summary */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Summary</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Average Score</div>
              <div className="text-2xl font-bold">82</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Best Day</div>
              <div className="text-2xl font-bold text-success">95</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <Flame className="h-4 w-4 text-warning" />
                Streak
              </div>
              <div className="text-2xl font-bold text-warning">5 days</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-success" />
                Trend
              </div>
              <div className="text-2xl font-bold text-success">+12%</div>
            </div>
          </div>
        </Card>

        {/* Calendar */}
        <Card className="p-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth(-1)}
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">{monthName}</h2>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth(1)}
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {days.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} />;
              }

              const score = getScoreForDate(date);
              const isSelected = selectedDate?.toDateString() === date.toDateString();

              return (
                <button
                  key={date.toDateString()}
                  onClick={() => setSelectedDate(date)}
                  className={`
                    aspect-square p-2 rounded-lg text-sm font-medium transition-all
                    hover:ring-2 hover:ring-primary
                    ${getScoreColor(score)}
                    ${isSelected ? 'ring-2 ring-primary scale-105' : ''}
                  `}
                  title={`${date.toLocaleDateString()}: Score ${score}`}
                >
                  <div>{date.getDate()}</div>
                  {score > 0 && (
                    <div className="text-xs font-bold mt-1">{score}</div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-success" />
              <span>Excellent (80-100)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-warning-light" />
              <span>Good (60-79)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-warning" />
              <span>Fair (40-59)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-destructive/30" />
              <span>Needs Work (0-39)</span>
            </div>
          </div>
        </Card>

        {/* Selected Date Details */}
        {selectedDate && (
          <Card className="p-6 mt-6 animate-fade-slide-up">
            <h3 className="text-xl font-semibold mb-4">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Daily Score</span>
                <span className="text-2xl font-bold">{getScoreForDate(selectedDate)}/100</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Steps</span>
                  <span className="text-sm font-medium">8,432 / 10,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Meals logged</span>
                  <span className="text-sm font-medium">3 / 3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Water</span>
                  <span className="text-sm font-medium">2L / 2.5L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Sleep</span>
                  <span className="text-sm font-medium">7h 30m</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View Full Report
              </Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
