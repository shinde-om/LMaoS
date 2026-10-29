"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight, Plus } from "@workspace/ui/lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"

import {
  initialForm,
  LmsFormData,
  slugify,
  VisibilityOption,
} from "./create-project/types"
import { LmsWizardStepper } from "./create-project/wizard-stepper"
import { LmsStepGeneral } from "./create-project/step-general"
import { LmsStepAccess } from "./create-project/step-access"
import { LmsWizardSuccess } from "./create-project/wizard-success"

type NewLmsDialogProps = {
  trigger: React.ReactElement
}

export function NewLmsDialog({ trigger }: NewLmsDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [step, setStep] = React.useState<number>(1)
  const [form, setForm] = React.useState<LmsFormData>(initialForm)
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  function resetForm() {
    setForm(initialForm)
    setStep(1)
    setIsSlugManuallyEdited(false)
    setErrors({})
    setIsSubmitted(false)
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) {
      resetForm()
    }
  }

  function handleNameChange(value: string) {
    setForm((prev) => {
      const next = { ...prev, name: value }
      if (!isSlugManuallyEdited) {
        next.slug = slugify(value)
      }
      return next
    })
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: "" }))
    }
  }

  function handleSlugChange(value: string) {
    setIsSlugManuallyEdited(true)
    setForm((prev) => ({ ...prev, slug: slugify(value) }))
    if (errors.slug) {
      setErrors((prev) => ({ ...prev, slug: "" }))
    }
  }

  function validateStep(currentStep: number): boolean {
    const nextErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!form.name.trim()) {
        nextErrors.name = "Enter a name for your LMS."
      }
      if (!form.slug.trim()) {
        nextErrors.slug = "Provide a URL slug for your learning space."
      }
    }

    if (currentStep === 2) {
      if (form.visibility === "domain" && !form.domainRestriction.trim()) {
        nextErrors.domainRestriction = "Specify the allowed email domain (e.g. acme.com)."
      }
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleNext() {
    if (!validateStep(step)) return
    if (step < 2) {
      setStep((s) => s + 1)
    } else {
      setIsSubmitted(true)
    }
  }

  function handleBack() {
    if (step > 1) {
      setStep((s) => s - 1)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        {isSubmitted ? (
          <LmsWizardSuccess
            form={form}
            onReset={resetForm}
            onClose={() => setOpen(false)}
          />
        ) : (
          <div className="flex flex-col gap-5">
            <DialogHeader>
              <DialogTitle>Create a New LMS</DialogTitle>
              <DialogDescription>
                Configure your new learning space in two simple steps.
              </DialogDescription>
            </DialogHeader>

            <LmsWizardStepper currentStep={step} />

            {step === 1 && (
              <LmsStepGeneral
                form={form}
                errors={errors}
                onNameChange={handleNameChange}
                onSlugChange={handleSlugChange}
                onDescriptionChange={(desc) =>
                  setForm((prev) => ({ ...prev, description: desc }))
                }
              />
            )}

            {step === 2 && (
              <LmsStepAccess
                form={form}
                errors={errors}
                onVisibilityChange={(vis: VisibilityOption) =>
                  setForm((prev) => ({ ...prev, visibility: vis }))
                }
                onDomainRestrictionChange={(domain: string) =>
                  setForm((prev) => ({ ...prev, domainRestriction: domain }))
                }
                onSelfRegistrationChange={(allowed: boolean) =>
                  setForm((prev) => ({ ...prev, allowSelfRegistration: allowed }))
                }
              />
            )}

            <DialogFooter className="flex-row justify-between sm:justify-between items-center pt-2">
              <div>
                {step > 1 ? (
                  <Button type="button" variant="outline" size="sm" onClick={handleBack}>
                    <ArrowLeft data-icon="inline-start" className="size-3.5" />
                    Back
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button type="button" size="sm" onClick={handleNext}>
                  {step === 2 ? (
                    <>
                      <Plus data-icon="inline-start" className="size-3.5" />
                      Create LMS
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight data-icon="inline-end" className="size-3.5" />
                    </>
                  )}
                </Button>
              </div>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
