"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@lib/utils"
import { Button } from "@components/ui/button"
import {
  LayoutDashboard,
  ListOrdered,
  Video,
  Settings,
  LogOut,
} from "lucide-react"
import { signOut } from "next-auth/react"

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/activities", label: "Activities", icon: ListOrdered },
  { href: "/admin/videos", label: "Videos", icon: Video },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-white min-h-screen p-4 flex flex-col shrink-0">
      <div className="mb-8">
        <h2 className="font-semibold text-lg">Admin Panel</h2>
        <p className="text-sm text-neutral-500">Sreejith P.S.</p>
      </div>
      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          const isActive =
            pathname === link.href || pathname.startsWith(link.href + "/")
          return (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3",
                  isActive && "bg-neutral-100 font-medium"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Button>
            </Link>
          )
        })}
      </nav>
      <Button
        variant="ghost"
        className="justify-start gap-3 text-red-500"
        onClick={() => signOut()}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </aside>
  )
}
