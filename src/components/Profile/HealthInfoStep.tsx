import React from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const CONDITIONS = [
  "Diabetes Type 1",
  "Diabetes Type 2",
  "Hypertension",
  "Asthma",
  "Heart Disease",
  "None",
  "Other",
];

const HealthInfoStep: React.FC = () => {
  const { register, watch, formState } = useFormContext();
  const { errors } = formState as any;
  const weight = Number(watch("weightKg") || 0);
  const height = Number(watch("heightCm") || 0);

  const bmi = React.useMemo(() => {
    if (!weight || !height) return undefined;
    const h = height / 100;
    return +(weight / (h * h)).toFixed(1);
  }, [weight, height]);

  const bmiBadge = (value?: number) => {
    if (!value) return null;
    if (value < 18.5) return <span className="px-2 py-1 rounded text-yellow-800 bg-yellow-100">Underweight</span>;
    if (value < 25) return <span className="px-2 py-1 rounded text-green-800 bg-green-100">Normal</span>;
    if (value < 30) return <span className="px-2 py-1 rounded text-yellow-800 bg-yellow-100">Overweight</span>;
    return <span className="px-2 py-1 rounded text-red-800 bg-red-100">Obese</span>;
  };

  return (
    <section aria-labelledby="health-info" className="space-y-4">
      <h2 id="health-info" className="text-lg font-medium">Health Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Chronic Conditions</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {CONDITIONS.map((c) => (
              <label key={c} className="flex items-center gap-2">
                <Checkbox {...register("chronic", { required: false })} value={c} />
                <span className="text-sm">{c}</span>
              </label>
            ))}
          </div>
          <div className="mt-2">
            <Label htmlFor="chronicOther">If other, please specify</Label>
            <Input id="chronicOther" {...register("chronicOther")} />
          </div>
        </div>

        <div>
          <Label htmlFor="familyHistory">Family Health History</Label>
          <Textarea id="familyHistory" {...register("familyHistory")} placeholder="Tell us about any relevant family health conditions..." />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="weightKg">Weight (kg) *</Label>
          <Input id="weightKg" type="number" {...register("weightKg", { required: "Weight is required", min: { value: 20, message: "Minimum 20kg" }, max: { value: 300, message: "Maximum 300kg" } })} aria-invalid={errors?.weightKg ? "true" : "false"} />
          {errors?.weightKg && <p className="text-sm text-destructive mt-1">{errors.weightKg.message}</p>}
        </div>

        <div>
          <Label htmlFor="heightCm">Height (cm) *</Label>
          <Input id="heightCm" type="number" {...register("heightCm", { required: "Height is required", min: { value: 50, message: "Minimum 50cm" }, max: { value: 250, message: "Maximum 250cm" } })} aria-invalid={errors?.heightCm ? "true" : "false"} />
          {errors?.heightCm && <p className="text-sm text-destructive mt-1">{errors.heightCm.message}</p>}
        </div>
      </div>

      <div>
        <Label>BMI</Label>
        <div className="mt-2">{bmi ? <div className="inline-flex items-center gap-2"> <span className="text-lg font-semibold">{bmi}</span> {bmiBadge(bmi)}</div> : <span className="text-sm text-muted-foreground">Enter weight and height to calculate BMI</span>}</div>
      </div>
    </section>
  );
};

export default HealthInfoStep;
