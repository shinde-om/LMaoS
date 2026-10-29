import * as React from "react"
import { Check } from "@workspace/ui/lucide-react"
import { wizardSteps } from "./types"

interface LmsWizardStepperProps {
  currentStep: number
}

export function LmsWizardStepper({ currentStep }: LmsWizardStepperProps) {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      {wizardSteps.map((item, idx) => {
        const isCurrent = currentStep === item.id
        const isCompleted = currentStep > item.id
        return (
          <React.Fragment key={item.id}>
            <div className="flex items-center gap-2">
              <div
                className={`flex size-6 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                      ? "border-2 border-primary text-primary"
                      : "border border-muted-foreground/30 text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check className="size-3.5" /> : item.id}
              </div>
              <div className="hidden sm:flex sm:flex-col text-left">
                <span
                  className={`text-xs font-medium ${
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.title}
                </span>
                <span className="text-[10px] text-muted-foreground leading-none">
                  {item.description}
                </span>
              </div>
            </div>
            {idx < wizardSteps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 transition-colors ${
                  currentStep > item.id ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
