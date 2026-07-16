import { createAuthClient } from "better-auth/client"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "./auth"

export function createClient(baseURL: string) {
  return createAuthClient({
    baseURL,
    basePath: "/api/auth",
    plugins: [inferAdditionalFields<typeof auth>()],
  })
}