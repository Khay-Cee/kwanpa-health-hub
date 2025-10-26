import * as React from "react";
import { Check } from "lucide-react";

interface Props {
  steps: string[];
  current: number;
}

const StepIndicator: React.FC<Props> = ({ steps, current }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Step {current} of {steps.length}</div>
        <div className="text-sm font-medium">{steps[current - 1]}</div>
      </div>

      <nav aria-label="Progress" className="mt-4">
        <ol className="flex items-center justify-center">
          {steps.map((label, idx) => {
            const stepNum = idx + 1;
            const completed = stepNum < current;
            const active = stepNum === current;
            return (
              <React.Fragment key={label}>
                <li className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center ${
                      "w-10 h-10 md:w-10 md:h-10 rounded-full"
                    } ${completed ? "bg-green-600 text-white" : active ? "bg-destructive text-white" : "bg-gray-200 text-gray-600"}`}
                    aria-current={active ? "step" : undefined}
                    aria-label={`${label} ${active ? "current step" : completed ? "completed" : "upcoming"}`}
                  >
                    {completed ? <Check className="w-5 h-5" /> : <span className="text-sm font-medium">{stepNum}</span>}
                  </div>
                  <div className="mt-2 text-xs text-center w-24">{label}</div>
                </li>

                {idx < steps.length - 1 && (
                  <li aria-hidden className="flex-1 flex items-center">
                    <div className={`mx-4 md:mx-8 h-1 w-full ${stepNum < current ? "bg-green-400" : "bg-gray-200"}`} />
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default StepIndicator;
