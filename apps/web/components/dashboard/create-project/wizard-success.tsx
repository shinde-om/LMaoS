import * as React from "react"
import { Check } from "@workspace/ui/lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { LmsFormData } from "./types"

interface LmsWizardSuccessProps {
  form: LmsFormData
  onReset: () => void
  onClose: () => void
}

export function LmsWizardSuccess({
  form,
  onReset,
  onClose,
}: LmsWizardSuccessProps) {
  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Check className="size-7" />
      </div>
      <DialogHeader className="items-center">
        <DialogTitle className="text-xl">LMS Successfully Created!</DialogTitle>
        <DialogDescription className="max-w-sm text-center">
          <span className="font-semibold text-foreground">{form.name}</span> is ready with custom URL and access controls.
        </DialogDescription>
      </DialogHeader>

      {/* Summary card */}
      <div className="w-full rounded-lg border bg-muted/40 p-4 text-left text-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">URL Endpoint:</span>
          <Badge variant="outline" className="font-mono text-[11px]">
            https://{form.slug}.lmaos.app
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Access Mode:</span>
          <span className="font-medium capitalize text-foreground">{form.visibility}</span>
        </div>
        {form.visibility === "domain" && form.domainRestriction && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Allowed Domain:</span>
            <span className="font-mono text-foreground">{form.domainRestriction}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Self-registration:</span>
          <span className="text-foreground">{form.allowSelfRegistration ? "Enabled" : "Disabled"}</span>
        </div>
      </div>

      <DialogFooter className="w-full sm:justify-center gap-2">
        <Button variant="outline" onClick={onReset}>
          Create Another
        </Button>
        <Button onClick={onClose}>
          Done
        </Button>
      </DialogFooter>
    </div>
  )
}
