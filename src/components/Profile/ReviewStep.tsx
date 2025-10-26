import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface Props {
  connectedDevices: string[];
  goToStep?: (n: number) => void;
}

const ReviewStep: React.FC<Props> = ({ connectedDevices, goToStep }) => {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <section aria-labelledby="review" className="space-y-4">
      <h2 id="review" className="text-lg font-medium">Review & Confirm</h2>

      <div className="space-y-3">
        <div className="border rounded p-3">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium">Personal Information</div>
              <div className="text-sm">Name: {values.fullName || "-"}</div>
              <div className="text-sm">Gender: {values.gender || "-"}</div>
              <div className="text-sm">Age: {values.age || "-"}</div>
            </div>
            <div>
              <Button variant="link" size="sm" onClick={() => goToStep?.(1)}>Edit</Button>
            </div>
          </div>
        </div>

        <div className="border rounded p-3">
          <div className="flex justify-between">
            <div>
              <div className="font-medium">Health Information</div>
              <div className="text-sm">Conditions: {(values.chronic || []).join(", ") || "-"}</div>
              <div className="text-sm">Weight: {values.weightKg || "-"} kg</div>
              <div className="text-sm">Height: {values.heightCm || "-"} cm</div>
            </div>
            <div>
              <Button variant="link" size="sm" onClick={() => goToStep?.(2)}>Edit</Button>
            </div>
          </div>
        </div>

        <div className="border rounded p-3">
          <div className="flex justify-between">
            <div>
              <div className="font-medium">Daily Habits</div>
              <div className="text-sm">Exercise: {values.exercise || "-"}</div>
              <div className="text-sm">Sleep: {values.sleepHours || "-"} hours</div>
              <div className="text-sm">Water Goal: {values.waterGoalL || "-"} L</div>
            </div>
            <div>
              <Button variant="link" size="sm" onClick={() => goToStep?.(3)}>Edit</Button>
            </div>
          </div>
        </div>

        <div className="border rounded p-3">
          <div className="flex justify-between">
            <div>
              <div className="font-medium">Connected Devices</div>
              <ul className="ml-4 list-disc mt-2">
                {connectedDevices.length ? connectedDevices.map((d) => <li key={d}>{d}</li>) : <li>None</li>}
              </ul>
            </div>
            <div>
              <Button variant="link" size="sm" onClick={() => goToStep?.(4)}>Edit</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewStep;
