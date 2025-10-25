import { Bell, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick?: () => void;
  notificationCount?: number;
}

export const Header = ({ onMenuClick, notificationCount = 0 }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary-dark transition-colors"
        >
          <div className="w-8 h-8 bg-gradient-health rounded-lg flex items-center justify-center text-white text-sm font-bold">
            K
          </div>
          <span>Kwanpa</span>
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigate('/notifications')}
            aria-label={`Notifications ${notificationCount > 0 ? `(${notificationCount} unread)` : ''}`}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {notificationCount > 9 ? '9+' : notificationCount}
              </Badge>
            )}
          </Button>

          {/* Profile */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => navigate('/profile')}
            aria-label="Profile"
          >
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
          </Button>

          {/* Menu */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
