import { createClient } from "@workspace/auth/auth-client"

export const authClient = createClient(
  process.env.BETTER_AUTH_URL ?? "http://localhost:4000"
)