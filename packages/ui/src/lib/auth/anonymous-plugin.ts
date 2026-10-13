import { createAuthPlugin } from "@better-auth-ui/core"
import {
  type AnonymousPluginOptions,
  anonymousPlugin as coreAnonymousPlugin
} from "@better-auth-ui/core/plugins/anonymous"

import { AnonymousButton } from "@workspace/ui/components/auth/anonymous/anonymous-button"

export const anonymousPlugin = createAuthPlugin(
  coreAnonymousPlugin.id,
  (options: AnonymousPluginOptions = {}) => ({
    ...coreAnonymousPlugin(options),
    authButtons: [AnonymousButton]
  })
)
