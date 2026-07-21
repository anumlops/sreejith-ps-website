"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Lang = "en" | "ml"

const LangContext = createContext<[Lang, (l: Lang) => void]>(["en", () => {}])

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null
    if (saved === "ml" || saved === "en") setLang(saved)
    else setLang(navigator.language.startsWith("ml") ? "ml" : "en")
  }, [])
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  return <LangContext.Provider value={[lang, setLang]}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

export function T({ en, ml }: { en: string; ml?: string | null }) {
  const [lang] = useLang()
  return <>{lang === "ml" && ml ? ml : en}</>
}
