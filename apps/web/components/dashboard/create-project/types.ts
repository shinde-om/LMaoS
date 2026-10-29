export type VisibilityOption = "public" | "private" | "domain"

export interface LmsFormData {
  name: string
  slug: string
  description: string
  visibility: VisibilityOption
  domainRestriction: string
  allowSelfRegistration: boolean
}

export interface WizardStep {
  id: number
  title: string
  description: string
}

export const initialForm: LmsFormData = {
  name: "",
  slug: "",
  description: "",
  visibility: "public",
  domainRestriction: "",
  allowSelfRegistration: true,
}

export const wizardSteps: WizardStep[] = [
  { id: 1, title: "General", description: "Name & URL" },
  { id: 2, title: "Access", description: "Privacy & Roles" },
]

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
