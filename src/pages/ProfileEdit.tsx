import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProfileSection from "@/components/Profile/ProfileSection";
import DeviceCard from "@/components/Profile/DeviceCard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Header } from "@/components/Layout/Header";
import { SideMenu } from "@/components/Layout/SideMenu";
import { RefreshCw, Check, Heart, Activity, Watch, TrendingUp, Smartphone, Scale, Bike, Apple } from 'lucide-react';

type ProfileData = {
  fullName?: string;
  gender?: string;
  age?: number | null;
  caregiverId?: string;
  doctorId?: string;
  chronicConditions?: string[];
  chronicOther?: string;
  familyHistory?: string;
  weightKg?: number | null;
  heightCm?: number | null;
  bmi?: number | null;
  exercise?: string;
  sleepHours?: number | null;
  waterGoalL?: number | null;
  diet?: string;
  smoking?: string;
  alcohol?: string;
  connectedDevices?: string[];
  lastUpdated?: string;
};

const DEFAULTS: ProfileData = {
  fullName: "",
  gender: "",
  age: null,
  caregiverId: "",
  doctorId: "",
  chronicConditions: [],
  chronicOther: "",
  familyHistory: "",
  weightKg: null,
  heightCm: null,
  bmi: null,
  exercise: "",
  sleepHours: 7,
  waterGoalL: 2,
  diet: "",
  smoking: "",
  alcohol: "",
  connectedDevices: [],
};

// Define available devices
const AVAILABLE_DEVICES = [
  {
    id: 'apple-health',
    name: 'Apple Health',
    description: 'Sync steps, heart rate, sleep, and activity data',
    icon: <Heart className="w-6 h-6 text-red-500" />,
  },
  {
    id: 'google-fit',
    name: 'Google Fit',
    description: 'Import fitness and wellness data from Google',
    icon: <Activity className="w-6 h-6 text-blue-500" />,
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    description: 'Connect your Fitbit tracker or smartwatch',
    icon: <Watch className="w-6 h-6 text-teal-500" />,
  },
  {
    id: 'garmin',
    name: 'Garmin Connect',
    description: 'Sync data from Garmin watches and devices',
    icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
  },
  {
    id: 'samsung-health',
    name: 'Samsung Health',
    description: 'Import health data from Samsung devices',
    icon: <Smartphone className="w-6 h-6 text-purple-500" />,
  },
  {
    id: 'withings',
    name: 'Withings',
    description: 'Connect smart scales and health monitors',
    icon: <Scale className="w-6 h-6 text-gray-600" />,
  },
  {
    id: 'strava',
    name: 'Strava',
    description: 'Sync running and cycling activities',
    icon: <Bike className="w-6 h-6 text-orange-500" />,
  },
  {
    id: 'myfitnesspal',
    name: 'MyFitnessPal',
    description: 'Track nutrition and calorie intake',
    icon: <Apple className="w-6 h-6 text-green-500" />,
  },
];

function loadUser() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Failed to parse user", e);
    return null;
  }
}

function saveUser(user: any) {
  try {
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  } catch (e) {
    console.warn("Failed to save user", e);
    return false;
  }
}

const ProfileEdit: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  
  // Device connection states
  const [connectedDeviceIds, setConnectedDeviceIds] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  const methods = useForm<ProfileData>({ defaultValues: DEFAULTS });
  const { register, handleSubmit, reset, control, getValues, setValue } = methods;

  // Load saved data on mount
  useEffect(() => {
    const stored = loadUser();
    const savedProfile: ProfileData | undefined = stored?.profileData ?? stored?.profile ?? undefined;
    if (savedProfile) {
      // Normalize keys
      const values = { ...DEFAULTS, ...savedProfile };
      reset(values);
    }

    // Load connected devices
    const devices = stored?.profileData?.connectedDevices || [];
    const connectedIds = devices
      .filter((d: any) => d.connected)
      .map((d: any) => d.id);
    setConnectedDeviceIds(connectedIds);

    // Get last sync time
    const lastSync = stored?.profileData?.lastDeviceSync;
    if (lastSync) {
      setLastSyncTime(lastSync);
    }
  }, [reset]);

  const handleSaveSection = async (section: string) => {
    setSavingSection(section);
    const currentUser = loadUser() || {};
    const values = getValues();

    // Merge only relevant fields per section
    const mergedProfile = { ...(currentUser.profileData || {}), ...values };
    mergedProfile.lastUpdated = new Date().toISOString();
    mergedProfile.last_weight_update = mergedProfile.weightKg ? new Date().toISOString() : mergedProfile.last_weight_update;
    mergedProfile.last_height_update = mergedProfile.heightCm ? new Date().toISOString() : mergedProfile.last_height_update;
    mergedProfile.last_conditions_update = (mergedProfile.chronicConditions && mergedProfile.chronicConditions.length) ? new Date().toISOString() : mergedProfile.last_conditions_update;

    currentUser.profileData = mergedProfile;
    currentUser.profileCompleted = true;
    const ok = saveUser(currentUser);
    setTimeout(() => {
      setSavingSection(null);
      if (ok) {
        toast.toast({ title: "Saved", description: `${section} updated successfully` });
      } else {
        toast.toast({ title: "Error", description: "Failed to save profile. Try again." });
      }
    }, 400);
  };

  const handleCancelSection = (section: string) => {
    // revert to stored values
    const stored = loadUser();
    const savedProfile: ProfileData | undefined = stored?.profileData ?? stored?.profile ?? undefined;
    if (savedProfile) reset({ ...DEFAULTS, ...savedProfile });
    toast.toast({ title: "Reverted", description: `${section} reverted` });
  };

  // Check if a device is connected
  const isDeviceConnected = (deviceId: string) => {
    return connectedDeviceIds.includes(deviceId);
  };

  // Handle device connection toggle
  const handleDeviceToggle = (deviceId: string, shouldConnect: boolean) => {
    let updatedDeviceIds: string[];
    
    if (shouldConnect) {
      // Add device to connected list
      updatedDeviceIds = [...connectedDeviceIds, deviceId];
      
      // Save connection data with timestamp
      const userData = loadUser() || {};
      const device = AVAILABLE_DEVICES.find(d => d.id === deviceId);
      
      const deviceData = {
        id: deviceId,
        name: device?.name || '',
        connected: true,
        connectedAt: new Date().toISOString(),
        lastSyncedAt: new Date().toISOString(),
      };
      
      const existingDevices = userData.profileData?.connectedDevices || [];
      const updatedDeviceData = [...existingDevices, deviceData];
      
      userData.profileData = {
        ...userData.profileData,
        connectedDevices: updatedDeviceData,
        lastDeviceSync: new Date().toISOString(),
      };
      
      saveUser(userData);
      setLastSyncTime(new Date().toISOString());
    } else {
      // Remove device from connected list
      updatedDeviceIds = connectedDeviceIds.filter(id => id !== deviceId);
      
      // Update localStorage
      const userData = loadUser() || {};
      const existingDevices = userData.profileData?.connectedDevices || [];
      const updatedDeviceData = existingDevices.filter((d: any) => d.id !== deviceId);
      
      userData.profileData = {
        ...userData.profileData,
        connectedDevices: updatedDeviceData,
      };
      
      saveUser(userData);
    }
    
    setConnectedDeviceIds(updatedDeviceIds);
  };

  // Manual sync all devices
  const handleManualSync = async () => {
    if (connectedDeviceIds.length === 0) {
      toast.toast({ 
        title: "No devices", 
        description: "Connect a device first to sync data" 
      });
      return;
    }

    setIsSyncing(true);

    // Simulate syncing (500ms per device)
    await new Promise((resolve) => setTimeout(resolve, connectedDeviceIds.length * 500));

    // Update last synced time for all devices
    const userData = loadUser() || {};
    const existingDevices = userData.profileData?.connectedDevices || [];
    
    const updatedDevices = existingDevices.map((d: any) => ({
      ...d,
      lastSyncedAt: new Date().toISOString(),
    }));

    userData.profileData = {
      ...userData.profileData,
      connectedDevices: updatedDevices,
      lastDeviceSync: new Date().toISOString(),
    };
    
    saveUser(userData);
    setLastSyncTime(new Date().toISOString());
    
    setIsSyncing(false);
    
    toast.toast({ 
      title: "Sync complete", 
      description: `Successfully synced ${connectedDeviceIds.length} device${connectedDeviceIds.length !== 1 ? 's' : ''}` 
    });
  };

  const getRelativeTime = (timestamp?: string | null) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    const diffHours = Math.floor(diffMs / 3600000);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffMs / 86400000);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onMenuClick={() => setMenuOpen(true)} notificationCount={3} />
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="pt-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>

        <form>
          <ProfileSection
            title="Personal Information"
            description="Name, gender and IDs"
            saving={savingSection === "personal"}
            onSave={() => handleSaveSection("personal")}
            onCancel={() => handleCancelSection("personal")}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" {...register("fullName")} />
              </div>
              <div>
                <Label>Gender</Label>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <select {...field} className="mt-2 block w-full rounded-md border px-3 py-2">
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" {...register("age") as any} />
              </div>
              <div>
                <Label htmlFor="caregiverId">Caregiver ID</Label>
                <Input id="caregiverId" {...register("caregiverId")} />
              </div>
              <div>
                <Label htmlFor="doctorId">Doctor ID</Label>
                <Input id="doctorId" {...register("doctorId")} />
              </div>
            </div>
          </ProfileSection>

          <ProfileSection
            title="Health Information"
            description="Conditions, weight, height and BMI"
            saving={savingSection === "health"}
            onSave={() => handleSaveSection("health")}
            onCancel={() => handleCancelSection("health")}
          >
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Chronic Conditions</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "Diabetes Type 1",
                    "Diabetes Type 2",
                    "Hypertension",
                    "Asthma",
                    "Heart Disease",
                    "None",
                  ].map((c) => (
                    <label key={c} className="flex items-center gap-2">
                      <Checkbox value={c} {...register("chronicConditions")} />
                      <span className="text-sm">{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="familyHistory">Family Health History</Label>
                <Textarea id="familyHistory" {...register("familyHistory")} placeholder="Tell us about any relevant family health conditions..." />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weightKg">Weight (kg)</Label>
                  <Input id="weightKg" type="number" {...register("weightKg") as any} />
                </div>
                <div>
                  <Label htmlFor="heightCm">Height (cm)</Label>
                  <Input id="heightCm" type="number" {...register("heightCm") as any} />
                </div>
              </div>
            </div>
          </ProfileSection>

          <ProfileSection
            title="Daily Habits"
            description="Exercise, sleep, water and diet"
            saving={savingSection === "habits"}
            onSave={() => handleSaveSection("habits")}
            onCancel={() => handleCancelSection("habits")}
          >
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Exercise Frequency</Label>
                <select className="mt-2 block w-full rounded-md border px-3 py-2" {...register("exercise") as any}>
                  <option value="">Select</option>
                  <option>Never</option>
                  <option>1-2 times/week</option>
                  <option>3-4 times/week</option>
                  <option>5+ times/week</option>
                  <option>Daily</option>
                </select>
              </div>

              <div>
                <Label>Average Sleep Hours</Label>
                <Controller
                  name="sleepHours"
                  control={control}
                  defaultValue={7}
                  render={({ field }) => (
                    <div>
                      <Slider value={[field.value || 7]} min={0} max={12} step={1} onValueChange={(v: number[]) => field.onChange(v[0])} />
                      <div className="mt-2 text-sm">{field.value} hours</div>
                    </div>
                  )}
                />
              </div>

              <div>
                <Label>Daily Water Intake Goal</Label>
                <Controller
                  name="waterGoalL"
                  control={control}
                  defaultValue={2}
                  render={({ field }) => (
                    <div>
                      <Slider value={[field.value || 2]} min={0} max={4} step={0.25} onValueChange={(v: number[]) => field.onChange(v[0])} />
                      <div className="mt-2 text-sm">{field.value} L 💧</div>
                    </div>
                  )}
                />
              </div>

              <div>
                <Label>Diet Preference</Label>
                <select {...register("diet") as any} className="mt-2 block w-full rounded-md border px-3 py-2">
                  <option value="">Select</option>
                  <option>Balanced</option>
                  <option>Low-carb</option>
                  <option>High-protein</option>
                  <option>Vegetarian</option>
                  <option>Vegan</option>
                  <option>Keto</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </ProfileSection>

          <ProfileSection
            title="Connected Devices"
            description="Connect your health devices to sync data and improve your experience"
            saving={savingSection === "devices"}
            onSave={() => handleSaveSection("devices")}
            onCancel={() => handleCancelSection("devices")}
          >
            {/* Sync Status Bar */}
            <div className="mb-6 bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isSyncing ? (
                  <>
                    <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                    <span className="text-sm text-gray-700">
                      Syncing data from {connectedDeviceIds.length} device
                      {connectedDeviceIds.length !== 1 ? 's' : ''}...
                    </span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700">
                      {connectedDeviceIds.length > 0
                        ? `All devices synced · Last updated: ${getRelativeTime(lastSyncTime)}`
                        : 'No devices connected yet'}
                    </span>
                  </>
                )}
              </div>
              {connectedDeviceIds.length > 0 && (
                <button
                  type="button"
                  onClick={handleManualSync}
                  disabled={isSyncing}
                  className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  Sync Now
                </button>
              )}
            </div>

            {/* Connected Device Count */}
            {connectedDeviceIds.length > 0 && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">
                    {connectedDeviceIds.length} device{connectedDeviceIds.length !== 1 ? 's' : ''} connected
                  </span>
                </div>
              </div>
            )}

            {/* Device Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AVAILABLE_DEVICES.map((device) => (
                <DeviceCard
                  key={device.id}
                  id={device.id}
                  name={device.name}
                  description={device.description}
                  icon={device.icon}
                  connected={isDeviceConnected(device.id)}
                  onToggle={handleDeviceToggle}
                />
              ))}
            </div>

            {/* Help Text */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Connect your devices once, and your health data will sync automatically. 
                You can disconnect anytime without losing your historical data.
              </p>
            </div>
          </ProfileSection>
        </form>
      </main>
    </div>
  );
};

export default ProfileEdit;
