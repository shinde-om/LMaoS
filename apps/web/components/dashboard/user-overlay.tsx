"use client"
import { Dialog, DialogContent } from "@workspace/ui/components/dialog"
import { useState } from "react"

type InputProp = {
  open: boolean
  onOpenChange: (open: boolean) => void
  path: string
}

const NAV_ITEMS = [
  { key: "account", label: "My Account" },
  { key: "security", label: "Password & Security" },
  { key: "sessions", label: "Sessions & Devices" },
  { key: "danger", label: "Danger Zone" },
] as const

export function UserOverlay({ open, onOpenChange, path }: InputProp) {
  const [activePath, setActivePath] = useState(path)


  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent showCloseButton={false} className="max-w-none max-md:w-screen max-md:h-screen min-w-4/5 h-4/5 rounded-md max-sm:rounded-none border-none p-0 gap-0">
    </DialogContent>
  </Dialog>
}
