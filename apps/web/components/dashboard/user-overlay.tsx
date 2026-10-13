"use client"

import { Settings as AuthSettings } from "@workspace/ui/components/auth/settings/settings"
import { ChangeEmail } from "@workspace/ui/components/auth/settings/account/change-email"
import { SecuritySettings } from "@workspace/ui/components/auth/settings/security/security-settings"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import {
  BadgeCheck,
  Bell,
  CreditCard,
  Shield,
} from "@workspace/ui/lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { useEffect, useState } from "react"

type SettingsSection = "account" | "security" | "billing" | "notifications"

type InputProp = {
  open: boolean
  onOpenChange: (open: boolean) => void
  path: string
}

const SETTINGS_ITEMS: Array<{
  key: SettingsSection
  label: string
  icon: typeof BadgeCheck
}> = [
  {
    key: "account",
    label: "Account",
    icon: BadgeCheck,
  },
  {
    key: "security",
    label: "Security",
    icon: Shield,
  },
  {
    key: "billing",
    label: "Billing",
    icon: CreditCard,
  },
  {
    key: "notifications",
    label: "Notifications",
    icon: Bell,
  },
]

function BillingPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Billing plans and subscription management will be available once a
        billing provider is configured.
      </CardContent>
    </Card>
  )
}

function NotificationsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Notification preferences are not available yet.
      </CardContent>
    </Card>
  )
}

export function UserOverlay({ open, onOpenChange, path }: InputProp) {
  const [activePath, setActivePath] = useState<SettingsSection>("account")

  useEffect(() => {
    const nextPath = SETTINGS_ITEMS.some((item) => item.key === path)
      ? (path as SettingsSection)
      : "account"
    setActivePath(nextPath)
  }, [path, open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="h-[min(720px,calc(100vh-2rem))] max-w-none min-w-4/5 gap-0 overflow-hidden rounded-md border-none p-0 max-md:h-screen max-md:w-screen max-sm:rounded-none"
      >
        <DialogTitle className="sr-only">User settings</DialogTitle>
        <div className="flex h-full min-h-0 flex-col md:flex-row">
          <nav className="border-b bg-muted/30 p-2 md:w-48 md:shrink-0 md:border-r md:border-b-0 md:p-3">
            <div className="mb-2 px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Settings
            </div>
            <div className="flex gap-1 overflow-x-auto md:flex-col">
              {SETTINGS_ITEMS.map(({ key, label, icon: Icon }) => (
                <Button
                  key={key}
                  type="button"
                  variant="ghost"
                  onClick={() => setActivePath(key)}
                  className={cn(
                    "h-auto min-w-max justify-start gap-2 px-2.5 py-1.5 text-left text-sm md:w-full",
                    activePath === key && "bg-accent text-accent-foreground"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{label}</span>
                </Button>
              ))}
            </div>
          </nav>
          <main className="min-h-0 flex-1 overflow-y-auto p-4 md:p-8">
            {activePath === "account" && (
              <AuthSettings view="account" hideNav />
            )}
            {activePath === "security" && (
              <div className="flex w-full flex-col gap-6">
                <ChangeEmail />
                <SecuritySettings />
              </div>
            )}
            {activePath === "billing" && <BillingPanel />}
            {activePath === "notifications" && <NotificationsPanel />}
          </main>
        </div>
      </DialogContent>
    </Dialog>
  )
}
