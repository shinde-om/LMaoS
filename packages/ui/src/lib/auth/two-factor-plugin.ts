import { createAuthPlugin } from "@better-auth-ui/core"
import {
  twoFactorPlugin as coreTwoFactorPlugin,
  type TwoFactorPluginOptions
} from "@better-auth-ui/core/plugins/two-factor"

import { TwoFactorChallenge } from "@workspace/ui/components/auth/two-factor/two-factor-challenge"
import { TwoFactorSettings } from "@workspace/ui/components/auth/two-factor/two-factor-settings"

export const twoFactorPlugin = createAuthPlugin(
  coreTwoFactorPlugin.id,
  (options: TwoFactorPluginOptions = {}) => ({
    ...coreTwoFactorPlugin(options),
    securityCards: [TwoFactorSettings],
    views: {
      auth: { twoFactor: TwoFactorChallenge }
    }
  })
)
