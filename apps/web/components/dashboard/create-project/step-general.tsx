import * as React from "react"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { Textarea } from "@workspace/ui/components/textarea"
import { LmsFormData } from "./types"

interface LmsStepGeneralProps {
  form: LmsFormData
  errors: Record<string, string>
  onNameChange: (name: string) => void
  onSlugChange: (slug: string) => void
  onDescriptionChange: (description: string) => void
}

export function LmsStepGeneral({
  form,
  errors,
  onNameChange,
  onSlugChange,
  onDescriptionChange,
}: LmsStepGeneralProps) {
  return (
    <FieldSet className="gap-4">
      <Field>
        <FieldLabel htmlFor="lms-name">LMS Name</FieldLabel>
        <Input
          id="lms-name"
          autoFocus
          placeholder="e.g. Acme Academy"
          value={form.name}
          onChange={(e) => onNameChange(e.target.value)}
          aria-invalid={!!errors.name}
        />
        {errors.name && <FieldError>{errors.name}</FieldError>}
      </Field>

      <Field>
        <FieldLabel htmlFor="lms-slug">LMS Subdomain / URL</FieldLabel>
        <InputGroup>
          <InputGroupAddon align="inline-start">https://</InputGroupAddon>
          <InputGroupInput
            id="lms-slug"
            placeholder="acme-academy"
            value={form.slug}
            onChange={(e) => onSlugChange(e.target.value)}
            aria-invalid={!!errors.slug}
          />
          <InputGroupAddon align="inline-end">.lmaos.app</InputGroupAddon>
        </InputGroup>
        <FieldDescription>
          URL to be used for accesssing your portal.
        </FieldDescription>
        {errors.slug && <FieldError>{errors.slug}</FieldError>}
      </Field>

      <Field>
        <FieldLabel htmlFor="lms-description">
          Description <span className="text-muted-foreground font-normal">(optional)</span>
        </FieldLabel>
        <Textarea
          id="lms-description"
          placeholder="Briefly describe who this LMS is for and what will be taught..."
          value={form.description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={3}
        />
      </Field>
    </FieldSet>
  )
}
