import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileCompletionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProfileCompletionModal = ({ open, onOpenChange }: ProfileCompletionModalProps) => {
  const navigate = useNavigate();

  const handleCompleteProfile = () => {
    onOpenChange(false);
    navigate('/profile/complete');
  };

  const handleMaybeLater = () => {
    onOpenChange(false);
    localStorage.setItem('profilePromptDismissed', 'true');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-t-[3px] border-t-primary">
        <DialogHeader className="items-center text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl">Complete Your Profile</DialogTitle>
          <DialogDescription className="text-base">
            Help us personalize your health journey
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button 
            onClick={handleCompleteProfile}
            className="w-full"
            size="lg"
          >
            Complete Profile
          </Button>
          <Button 
            onClick={handleMaybeLater}
            variant="outline"
            className="w-full"
            size="lg"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
