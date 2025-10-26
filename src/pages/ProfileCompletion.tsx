import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Header } from "@/components/Layout/Header";
import { SideMenu } from "@/components/Layout/SideMenu";
import { StepIndicator } from '@/components/Profile/StepIndicator';
import PersonalInfoStep from "@/components/profile/PersonalInfoStep";
import HealthInfoStep from "@/components/profile/HealthInfoStep";
import DailyHabitsStep from "@/components/profile/DailyHabitsStep";
import DeviceLinkingStep from "@/components/profile/DeviceLinkingStep";
import ReviewStep from "@/components/profile/ReviewStep";

type ProfileForm = {
  // Step 1
  fullName?: string;
  gender?: string;
  age?: number;
  caregiverId?: string;
  doctorId?: string;
  // Step 2
  chronic?: string[];
  chronicOther?: string;
  familyHistory?: string;
  weightKg?: number;
  heightCm?: number;
  // Step 3
  exercise?: string;
  sleepHours?: number;
  waterGoalL?: number;
  diet?: string;
  smoking?: string;
  alcohol?: string;
};

const STORAGE_KEY = "profile-completion-progress";

const ProfileCompletion: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const methods = useForm<ProfileForm>({ mode: "onChange" });
  const { handleSubmit, reset, getValues, trigger } = methods;
  const [step, setStep] = useState(1);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMounted = useRef(false);

  // Restore progress from localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        reset(parsed.form || {});
        setStep(parsed.step || 1);
        setConnectedDevices(parsed.connectedDevices || []);
      } catch (e) {
        console.warn("Failed to restore profile progress", e);
      }
    }
    isMounted.current = true;
  }, [reset]);

  // Persist to localStorage on changes
  useEffect(() => {
    if (!isMounted.current) return;
    const data = { form: getValues(), step, connectedDevices };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [step, connectedDevices, getValues]);

  // Warn before unload
  useEffect(() => {
    const onBefore = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      return e.returnValue;
    };
    window.addEventListener("beforeunload", onBefore);
    return () => window.removeEventListener("beforeunload", onBefore);
  }, []);

  const steps = useMemo(
    () => ["Personal Info", "Health Info", "Daily Habits", "Device Linking", "Review"],
    [],
  );

  const goNext = async () => {
    // validate current step fields (best-effort; steps will trigger their own rules)
    const ok = await trigger();
    if (!ok) {
      // trigger will set errors; scroll to first error
      const el = document.querySelector("[aria-invalid='true']");
      if (el) (el as HTMLElement).focus();
      return;
    }
    setStep((s) => Math.min(5, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const saveAndExit = () => {
    // progress is already saved to localStorage. Navigate home.
    toast.toast({ title: "Progress saved", description: "You can continue later from the same device." });
    navigate("/home");
  };

  const onComplete = async (data: ProfileForm) => {
    setLoadingComplete(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Profile complete:", { ...data, connectedDevices });
      // Persist profile to the main `user` object in localStorage so Home and other pages can read it
      try {
        const raw = localStorage.getItem("user");
        const existing = raw ? JSON.parse(raw) : {};
        const updated = {
          ...existing,
          profileCompleted: true,
          profileData: { ...(existing.profileData || {}), ...data, connectedDevices },
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem("user", JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to save profile to localStorage user key", e);
      }

      // Clear transient progress key and finish
      localStorage.removeItem(STORAGE_KEY);
      setLoadingComplete(false);
      toast.toast({ title: "Profile Complete! 🎉", description: "Your health journey starts now" });
      navigate("/home");
    }, 2000);
  };

  return (
    <>
      <Header onMenuClick={() => setMenuOpen(true)} />
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="pt-16 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Complete your profile</h1>
          <p className="text-sm text-muted-foreground">A few quick questions to personalise your experience</p>
        </header>

        <Card className="p-4 md:p-6">
          <StepIndicator steps={steps} current={step} />

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onComplete)}
              className="mt-6 space-y-6"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="min-h-[320px]">
                {step === 1 && <PersonalInfoStep />}
                {step === 2 && <HealthInfoStep />}
                {step === 3 && <DailyHabitsStep />}
                {step === 4 && (
                  <DeviceLinkingStep
                    connectedDevices={connectedDevices}
                    setConnectedDevices={setConnectedDevices}
                  />
                )}
                {step === 5 && <ReviewStep connectedDevices={connectedDevices} goToStep={(n) => setStep(n)} />}
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {step > 1 ? (
                    <Button variant="outline" onClick={goBack} type="button">
                      Back
                    </Button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    className="text-sm text-muted-foreground"
                    onClick={saveAndExit}
                    aria-label="Save and exit"
                  >
                    Save & Exit
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {step < 5 && (
                    <Button variant="destructive" onClick={goNext} type="button">
                      Next
                    </Button>
                  )}

                  {step === 5 && (
                    <Button variant="destructive" type="submit" disabled={loadingComplete}>
                      {loadingComplete ? "Completing..." : "Done"}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>
        </Card>
        </div>
      </main>
    </>
  );
};

export default ProfileCompletion;
