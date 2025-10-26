import React, { useState, useEffect } from 'react';
import { Menu, MenuItem } from '@/components/ui/menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import DoctorLogoutModal from './DoctorLogoutModal';
import { getDoctor } from '@/lib/doctorAuth';

// Minimal dropdown UI using existing Button + simple menu markup
export const DoctorHeader: React.FC = () => {
  const [doctor, setDoctor] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(() => {
    setDoctor(getDoctor());
  }, []);

  const displayName = doctor?.name || 'Doctor';
  const doctorId = doctor?.doctorId || '';

  return (
    <div className="flex items-center gap-3">
      <div className="text-right mr-2 hidden sm:block">
        <div className="font-medium">{displayName}</div>
        {doctorId && <div className="text-xs text-muted-foreground">ID: {doctorId}</div>}
      </div>

      <div className="relative">
        <Button variant="ghost" onClick={() => setOpen(!open)} className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>{(displayName || 'D').split(' ').map((n:any)=>n[0]).slice(0,2).join('')}</AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4" />
        </Button>

        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-popover border rounded shadow-lg p-2 z-50">
            <button className="w-full text-left p-2 hover:bg-accent rounded" onClick={() => { /* view profile placeholder */ setOpen(false); }}>
              View Profile
            </button>
            <button className="w-full text-left p-2 hover:bg-accent rounded text-destructive" onClick={() => { setLogoutOpen(true); setOpen(false); }}>
              Logout
            </button>
          </div>
        )}

        <DoctorLogoutModal open={logoutOpen} onOpenChange={setLogoutOpen} />
      </div>
    </div>
  );
};

export default DoctorHeader;
