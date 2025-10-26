import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const DailyHabitsStep: React.FC = () => {
  const { register, control } = useFormContext();

  return (
    <section aria-labelledby="daily-habits" className="space-y-4">
      <h2 id="daily-habits" className="text-lg font-medium">Daily Habits</h2>

      <div>
        <Label>Exercise Frequency</Label>
        <select {...register("exercise")} className="mt-2 block w-full rounded-md border px-3 py-2">
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
        <div className="mt-2">
          <Controller
            name="sleepHours"
            control={control}
            defaultValue={7}
            render={({ field }) => (
              <div>
                <Slider value={[field.value]} min={0} max={12} step={1} onValueChange={(v: number[]) => field.onChange(v[0])} />
                <div className="mt-2 text-sm">{field.value} hours</div>
              </div>
            )}
          />
        </div>
      </div>

      <div>
        <Label>Daily Water Intake Goal</Label>
        <div className="mt-2">
          <Controller
            name="waterGoalL"
            control={control}
            defaultValue={2}
            render={({ field }) => (
              <div>
                <Slider value={[field.value]} min={0} max={4} step={0.25} onValueChange={(v: number[]) => field.onChange(v[0])} />
                <div className="mt-2 text-sm">{field.value} L 💧</div>
              </div>
            )}
          />
        </div>
      </div>

      <div>
        <Label>Diet Preference</Label>
        <select {...register("diet")} className="mt-2 block w-full rounded-md border px-3 py-2">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Smoking Status</Label>
          <div className="mt-2 flex gap-3">
            <label className="flex items-center gap-2"><input type="radio" {...register("smoking")} value="Never" /> Never</label>
            <label className="flex items-center gap-2"><input type="radio" {...register("smoking")} value="Former" /> Former</label>
            <label className="flex items-center gap-2"><input type="radio" {...register("smoking")} value="Current" /> Current</label>
          </div>
        </div>

        <div>
          <Label>Alcohol Consumption</Label>
          <div className="mt-2 flex gap-3">
            <label className="flex items-center gap-2"><input type="radio" {...register("alcohol")} value="Never" /> Never</label>
            <label className="flex items-center gap-2"><input type="radio" {...register("alcohol")} value="Occasionally" /> Occasionally</label>
            <label className="flex items-center gap-2"><input type="radio" {...register("alcohol")} value="Regularly" /> Regularly</label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyHabitsStep;
