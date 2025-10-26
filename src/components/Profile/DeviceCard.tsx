import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  id: string;
  name: string;
  icon?: React.ReactNode;
  description?: string;
  connected: boolean;
  onToggle: (id: string, connect: boolean) => void;
}

const DeviceCard: React.FC<Props> = ({ id, name, icon, description, connected, onToggle }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleClick = () => {
    setLoading(true);
    // simulate connect/disconnect
    setTimeout(() => {
      onToggle(id, !connected);
      setLoading(false);
      if (!connected) {
        toast.toast({ title: "Device connected successfully! ✓" });
      }
    }, 1000);
  };

  return (
    <div className="border rounded-md p-4 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className={`text-sm ${connected ? "text-green-600" : "text-gray-500"}`}>{connected ? <span className="inline-flex items-center gap-1"><Check className="w-4 h-4"/> Connected</span> : "Not Connected"}</div>
          <Button variant={connected ? "outline" : "destructive"} onClick={handleClick} size="sm">
            {loading ? "Connecting..." : connected ? "Disconnect" : "Connect"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
