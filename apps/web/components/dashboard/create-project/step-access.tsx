import * as React from "react"
import { Building, Globe, Lock } from "@workspace/ui/lucide-react"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group"
import { Switch } from "@workspace/ui/components/switch"
import { LmsFormData, VisibilityOption } from "./types"

interface LmsStepAccessProps {
  form: LmsFormData
  errors: Record<string, string>
  onVisibilityChange: (visibility: VisibilityOption) => void
  onDomainRestrictionChange: (domain: string) => void
  onSelfRegistrationChange: (allowed: boolean) => void
}

export function LmsStepAccess({
  form,
  errors,
  onVisibilityChange,
  onDomainRestrictionChange,
  onSelfRegistrationChange,
}: LmsStepAccessProps) {
  return (
    <FieldSet className="gap-4">
      <FieldGroup>
        <FieldTitle>Access & Visibility</FieldTitle>
        <RadioGroup
          value={form.visibility}
          onValueChange={(val) => onVisibilityChange(val as VisibilityOption)}
          className="grid gap-2.5"
        >
          <label
            htmlFor="vis-public"
            className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
              form.visibility === "public"
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-muted/50"
            }`}
          >
            <RadioGroupItem value="public" id="vis-public" className="mt-0.5" />
            <div className="flex-1 space-y-0.5">
              <div className="flex items-center gap-1.5 font-medium text-xs">
                <Globe className="size-3.5 text-primary" />
                <span>Public Academy</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Anyone on the web can browse and discover public courses.
              </p>
            </div>
          </label>

          <label
            htmlFor="vis-private"
            className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
              form.visibility === "private"
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-muted/50"
            }`}
          >
            <RadioGroupItem value="private" id="vis-private" className="mt-0.5" />
            <div className="flex-1 space-y-0.5">
              <div className="flex items-center gap-1.5 font-medium text-xs">
                <Lock className="size-3.5 text-primary" />
                <span>Private / Invite-Only</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Only explicitly invited learners and teachers can sign in.
              </p>
            </div>
          </label>

          <label
            htmlFor="vis-domain"
            className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
              form.visibility === "domain"
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-muted/50"
            }`}
          >
            <RadioGroupItem value="domain" id="vis-domain" className="mt-0.5" />
            <div className="flex-1 space-y-0.5">
              <div className="flex items-center gap-1.5 font-medium text-xs">
                <Building className="size-3.5 text-primary" />
                <span>Restricted Email Domain</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Automatic access granted for users with a specific corporate domain.
              </p>
            </div>
          </label>
        </RadioGroup>
      </FieldGroup>

      {form.visibility === "domain" && (
        <Field>
          <FieldLabel htmlFor="lms-domain">Allowed Domain</FieldLabel>
          <Input
            id="lms-domain"
            placeholder="your.domain"
            value={form.domainRestriction}
            onChange={(e) => onDomainRestrictionChange(e.target.value)}
            aria-invalid={!!errors.domainRestriction}
          />
          {errors.domainRestriction && (
            <FieldError>{errors.domainRestriction}</FieldError>
          )}
        </Field>
      )}

      <div className="rounded-lg border p-3 flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          <FieldLabel htmlFor="self-reg" className="text-xs font-medium cursor-pointer">
            Learner Self-Registration
          </FieldLabel>
          <FieldDescription>
            Allow visitors to create accounts independently without an administrator invite.
          </FieldDescription>
        </div>
        <Switch
          id="self-reg"
          checked={form.allowSelfRegistration}
          onCheckedChange={onSelfRegistrationChange}
        />
      </div>
    </FieldSet>
  )
}
