"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@lib/utils"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { LangToggle } from "./lang-toggle"
import { T } from "@lib/lang"

const links: { href: string; label: [string, string] }[] = [
  { href: "/", label: ["Home", "ഹോം"] },
  { href: "/about", label: ["About", "എന്നെക്കുറിച്ച്"] },
  { href: "/activities", label: ["Activities", "പ്രവർത്തനങ്ങൾ"] },
  { href: "/gallery", label: ["Gallery", "ഗാലറി"] },
  { href: "/videos", label: ["Videos", "വീഡിയോകൾ"] },
  { href: "/apec-vision", label: ["APEC Vision", "APEC ദർശനം"] },
  { href: "/contact", label: ["Contact", "ബന്ധപ്പെടുക"] },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          Sreejith P.S.
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "text-sm font-normal",
                  pathname === link.href && "bg-muted font-medium"
                )}
              >
                <T en={link.label[0]} ml={link.label[1]} />
              </Button>
            </Link>
          ))}
          <LangToggle />
          <ThemeToggle />
        </nav>
        <div className="flex md:hidden items-center gap-1">
          <LangToggle />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t p-4 bg-background">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname === link.href && "bg-muted"
                )}
              >
                <T en={link.label[0]} ml={link.label[1]} />
              </Button>
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
