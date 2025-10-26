import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const PersonalInfoStep: React.FC = () => {
  const { register, formState, control } = useFormContext() as any;
  const { errors } = formState as any;

  return (
    <section aria-labelledby="personal-info" className="space-y-4">
      <h2 id="personal-info" className="text-lg font-medium">Personal Information</h2>

      <div>
        <Label htmlFor="fullName">Full Name *</Label>
        <Input
          id="fullName"
          {...register("fullName", { required: "Full name is required", minLength: { value: 2, message: "Minimum 2 characters" } })}
          aria-invalid={errors?.fullName ? "true" : "false"}
        />
        {errors?.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>}
      </div>

      <div>
        <Label htmlFor="gender">Gender *</Label>
        <Controller
          name="gender"
          control={control}
          rules={{ required: "Please select gender" }}
          render={({ field }) => (
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-6">
              {[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
                { value: "Prefer not to say", label: "Prefer not to say" },
              ].map((opt) => {
                const id = `gender-${opt.value}`;
                return (
                  <div key={opt.value} className="flex items-center gap-2 mr-4">
                    {/* The clickable circle only */}
                    <input
                      id={id}
                      type="radio"
                      name="gender"
                      value={opt.value}
                      checked={field.value === opt.value}
                      onChange={() => field.onChange(opt.value)}
                      aria-labelledby={`gender-label-${id}`}
                      className="w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-destructive checked:border-destructive text-destructive cursor-pointer focus:outline-none"
                    />
                    {/* Label text is not clickable to satisfy requirement */}
                    <span id={`gender-label-${id}`} className="text-sm select-none">
                      {opt.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        />
        {errors?.gender && <p className="text-sm text-destructive mt-1">{errors.gender.message}</p>}
      </div>

      <div>
        <Label htmlFor="age">Age *</Label>
        <Input
          id="age"
          type="number"
          {...register("age", { required: "Age is required", min: { value: 1, message: "Minimum is 1" }, max: { value: 120, message: "Maximum is 120" } })}
          aria-invalid={errors?.age ? "true" : "false"}
        />
        {errors?.age && <p className="text-sm text-destructive mt-1">{errors.age.message}</p>}
      </div>

      <div>
        <Label htmlFor="caregiverId">Caregiver ID</Label>
        <div className="flex items-center gap-2">
          <Input id="caregiverId" {...register("caregiverId")} aria-describedby="caregiver-help" />
          <Tooltip>
            <TooltipTrigger className="p-1">
              <Info className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>Enter your caregiver's ID if you have one assigned</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div>
        <Label htmlFor="doctorId">Doctor ID</Label>
        <div className="flex items-center gap-2">
          <Input id="doctorId" {...register("doctorId")} aria-describedby="doctor-help" />
          <Tooltip>
            <TooltipTrigger className="p-1">
              <Info className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>Enter your doctor's ID if provided by your healthcare facility</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfoStep;
