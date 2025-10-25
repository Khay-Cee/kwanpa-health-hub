import { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { SideMenu } from '@/components/Layout/SideMenu';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, User, Stethoscope, X, Check } from 'lucide-react';

interface Notification {
  id: string;
  type: 'system' | 'caregiver' | 'doctor';
  sender: string;
  message: string;
  time: string;
  read: boolean;
}

export default function Notifications() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'system' | 'caregiver' | 'doctor'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'system',
      sender: 'Kwanpa',
      message: "Your weekly report is ready! 📊",
      time: '2h ago',
      read: false,
    },
    {
      id: '2',
      type: 'caregiver',
      sender: 'Sarah (Caregiver)',
      message: 'Great job on your water intake today! Keep it up! 💧',
      time: '3h ago',
      read: false,
    },
    {
      id: '3',
      type: 'doctor',
      sender: 'Dr. Mensah',
      message: 'Your blood pressure readings look good. Keep monitoring.',
      time: '5h ago',
      read: true,
    },
    {
      id: '4',
      type: 'system',
      sender: 'Kwanpa',
      message: "You've reached a 7-day streak! 🔥",
      time: '1d ago',
      read: true,
    },
    {
      id: '5',
      type: 'caregiver',
      sender: 'John (Caregiver)',
      message: "I noticed your sleep has been irregular. Let's work on a better routine.",
      time: '1d ago',
      read: true,
    },
  ]);

  const filteredNotifications = notifications.filter(
    (n) => filter === 'all' || n.type === filter
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'caregiver':
        return <User className="h-5 w-5 text-primary" />;
      case 'doctor':
        return <Stethoscope className="h-5 w-5 text-success" />;
      default:
        return <Bell className="h-5 w-5 text-warning" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onMenuClick={() => setMenuOpen(true)} notificationCount={unreadCount} />
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="pt-16 px-4 max-w-4xl mx-auto">
        <section className="py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-muted-foreground mt-1">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          </div>
        </section>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {(['all', 'system', 'caregiver', 'doctor'] as const).map((tab) => (
            <Button
              key={tab}
              variant={filter === tab ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(tab)}
              className="capitalize whitespace-nowrap"
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <Card className="p-12 text-center">
              <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
              <p className="text-muted-foreground">No new notifications.</p>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 transition-all hover:shadow-md ${
                  !notification.read ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{notification.sender}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">
                      {notification.message}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => markAsRead(notification.id)}
                        aria-label="Mark as read"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => deleteNotification(notification.id)}
                      aria-label="Delete notification"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
