import React from "react";
import DeviceCard from "./DeviceCard";

interface Props {
  connectedDevices: string[];
  setConnectedDevices: (ids: string[]) => void;
}

const DEVICES = [
  { id: "watch", name: "Smartwatch / Fitness Tracker", icon: "⌚", description: "Track steps, heart rate, and activity" },
  { id: "bp", name: "Blood Pressure Monitor", icon: "❤️", description: "Monitor blood pressure readings" },
  { id: "glucose", name: "Glucose Monitor", icon: "🩸", description: "Track blood sugar levels" },
  { id: "scale", name: "Smart Scale", icon: "⚖️", description: "Monitor weight and BMI" },
  { id: "googlefit", name: "Google Fit", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z"/></svg>, description: "Sync data from Google Fit" },
  { id: "apple", name: "Apple Health", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16.365 1.43c-.82.95-1.36 2.28-1.15 3.63 1.24.04 2.6-.64 3.43-1.55-.86-.64-1.99-1.01-2.28-2.08zM12.3 4.4c-1.9 0-3.98 1.07-4.98 3.08-1.9 3.51-.5 8.66 1.73 11.49 1.17 1.45 2.57 3.07 4.54 3.05 1.85-.02 2.38-1.18 4.44-1.18 2 0 2.57 1.18 4.43 1.19 1.9.01 3.24-1.45 4.41-2.9-1.98-1.5-3.9-3.77-3.9-6.94 0-4.14 2.67-6.13 5.18-7.24-1.22-3.86-4.83-5-8.1-5z"/></svg>, description: "Sync data from Apple Health" },
];

const DeviceLinkingStep: React.FC<Props> = ({ connectedDevices, setConnectedDevices }) => {
  const toggle = (id: string, connect: boolean) => {
    if (connect) setConnectedDevices(Array.from(new Set([...connectedDevices, id])));
    else setConnectedDevices(connectedDevices.filter((d) => d !== id));
  };

  return (
    <section aria-labelledby="device-linking" className="space-y-4">
      <h2 id="device-linking" className="text-lg font-medium">Link your devices</h2>
      <p className="text-sm text-muted-foreground">Choose devices to connect. You can connect later in Settings.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {DEVICES.map((d) => (
          <DeviceCard
            key={d.id}
            id={d.id}
            name={d.name}
            icon={d.icon}
            description={d.description}
            connected={connectedDevices.includes(d.id)}
            onToggle={toggle}
          />
        ))}
      </div>
    </section>
  );
};

export default DeviceLinkingStep;
