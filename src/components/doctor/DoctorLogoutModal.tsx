import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { logoutDoctor } from '@/lib/doctorAuth';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DoctorLogoutModal: React.FC<Props> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutDoctor();
    onOpenChange(false);
    navigate('/doctor/login');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground my-4">Are you sure you want to logout? Any unsaved notes will be lost.</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleLogout}>Logout</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorLogoutModal;
