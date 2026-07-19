import type { Metadata } from "next"
import { Header } from "@components/public/header"
import { Footer } from "@components/public/footer"
import { Toaster } from "sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Sreejith P.S. | Agricultural & Physical Education Center",
    template: "%s | Sreejith P.S.",
  },
  description:
    "Inspiring change through action — community development through agriculture and physical education.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
