import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Sreejith P.S.</h3>
            <p className="text-sm text-neutral-600">
              Dedicated to community development through agriculture and
              physical education.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <div className="space-y-1">
              {[
                { href: "/about", label: "About" },
                { href: "/activities", label: "Activities" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-sm text-neutral-600 hover:text-neutral-900"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">APEC</h3>
            <p className="text-sm text-neutral-600">
              Agricultural & Physical Education Center
            </p>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} Sreejith P.S. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
