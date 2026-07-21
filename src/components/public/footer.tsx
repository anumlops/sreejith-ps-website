import Link from "next/link"
import { T } from "@lib/lang"

export function Footer() {
  return (
    <footer className="border-t bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Sreejith P.S.</h3>
            <p className="text-sm text-text-muted">
              <T en="Dedicated to community development through agriculture and physical education." ml="കൃഷിയിലൂടെയും ശാരീരിക വിദ്യാഭ്യാസത്തിലൂടെയും കമ്മ്യൂണിറ്റി വികസനത്തിന് സമർപ്പിതർ." />
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2"><T en="Quick Links" ml="ദ്രുത ലിങ്കുകൾ" /></h3>
            <div className="space-y-1">
              {[
                { href: "/about", en: "About", ml: "എന്നെക്കുറിച്ച്" },
                { href: "/activities", en: "Activities", ml: "പ്രവർത്തനങ്ങൾ" },
                { href: "/contact", en: "Contact", ml: "ബന്ധപ്പെടുക" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-sm text-text-muted hover:text-foreground"
                >
                  <T en={l.en} ml={l.ml} />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2"><T en="APEC" ml="APEC" /></h3>
            <p className="text-sm text-text-muted">
              <T en="Agricultural & Physical Education Center" ml="കാർഷിക, ശാരീരിക വിദ്യാഭ്യാസ കേന്ദ്രം" />
            </p>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} <T en="Sreejith P.S. All rights reserved." ml="ശ്രീജിത്ത് പി.എസ്. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം." />
        </div>
      </div>
    </footer>
  )
}
