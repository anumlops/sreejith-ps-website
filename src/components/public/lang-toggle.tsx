"use client"

import { useLang } from "@lib/lang"

export function LangToggle() {
  const [lang, setLang] = useLang()

  const toggle = () => {
    const next = lang === "en" ? "ml" : "en"
    setLang(next)
    document.documentElement.lang = next
    localStorage.setItem("lang", next)
  }

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center justify-center rounded-md h-8 px-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
      aria-label={lang === "en" ? "Switch to Malayalam" : "ഇംഗ്ലീഷിലേക്ക് മാറുക"}
    >
      {lang === "en" ? "ML" : "EN"}
    </button>
  )
}
