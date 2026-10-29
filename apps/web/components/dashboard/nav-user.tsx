"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "@workspace/ui/lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { authClient } from "@/lib/auth-client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UserOverlay } from "./user-overlay"

const ACCOUNT_MENU_ITEMS = [
  { icon: Sparkles, label: "Upgrade to Pro", section: "billing" as const },
  { icon: BadgeCheck, label: "Account", section: "account" as const },
  { icon: CreditCard, label: "Billing", section: "billing" as const },
  { icon: Bell, label: "Notifications", section: "notifications" as const },
]

function getInitials(name?: string, email?: string): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/)
    const first = parts[0]?.[0]
    const second = parts[1]?.[0]
    if (first && second) {
      return (first + second).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }
  if (email?.trim()) {
    return email.slice(0, 2).toUpperCase()
  }
  return "U"
}

export function NavUser() {
  const [name, setName] = useState("")
  const [avatar, setAvatar] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsOption, setSettingsOption] = useState("")
  const router = useRouter()

  function logOut() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login") // redirect to login page
        },
      },
    })
  }

  useEffect(() => {
    async function setUserInfo() {
      try {
        const session = await authClient.getSession()
        if (session?.data?.user) {
          setName(session.data.user.name || "")
          setAvatar(session.data.user.image || "")
          setEmail(session.data.user.email || "")
        }
      } catch (err) {
        console.error("Failed to load user session", err)
      } finally {
        setIsLoading(false)
      }
    }
    setUserInfo()
  }, [])

  const { isMobile } = useSidebar()

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="pointer-events-none select-none"
            aria-disabled="true"
          >
            <Skeleton className="size-8 rounded-lg shrink-0" />
            <div className="grid flex-1 gap-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
              <Skeleton className="h-3.5 w-24 rounded" />
              <Skeleton className="h-2.5 w-32 rounded" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  const initials = getInitials(name, email)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name || "User"}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{name || "User"}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {ACCOUNT_MENU_ITEMS.slice(1).map(
                ({ icon: Icon, label, section }) => (
                  <DropdownMenuItem
                    key={section}
                    onClick={() => {
                      setSettingsOption(section)
                      setSettingsOpen(true)
                    }}
                  >
                    <Icon />
                    {label}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logOut} variant="destructive">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <UserOverlay
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        path={settingsOption}
      />
    </SidebarMenu>
  )
}
