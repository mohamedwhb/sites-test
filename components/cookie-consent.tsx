"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CookieSettings } from "./cookie-settings"
import { Button } from "@/components/ui/button"

type CookieConsent = {
  necessary: boolean
  statistics: boolean
  marketing: boolean
  accepted: boolean
}

const defaultConsent: CookieConsent = {
  necessary: true, // Immer aktiv
  statistics: false,
  marketing: false,
  accepted: false,
}

export function CookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(defaultConsent)
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // Beim ersten Rendern prüfen, ob bereits Consent gespeichert ist
  useEffect(() => {
    const storedConsent = localStorage.getItem("cookieConsent")

    if (storedConsent) {
      const parsedConsent = JSON.parse(storedConsent) as CookieConsent
      setConsent(parsedConsent)
      // Banner nicht anzeigen, wenn bereits akzeptiert
      if (parsedConsent.accepted) {
        setShowBanner(false)
      } else {
        setShowBanner(true)
      }
    } else {
      // Wenn kein Consent gespeichert ist, Banner anzeigen
      setShowBanner(true)
    }
  }, [])

  // Consent speichern
  const saveConsent = (newConsent: CookieConsent) => {
    localStorage.setItem("cookieConsent", JSON.stringify(newConsent))
    setConsent(newConsent)
    setShowBanner(false)
  }

  // Alle Cookies akzeptieren
  const acceptAll = () => {
    const fullConsent: CookieConsent = {
      necessary: true,
      statistics: true,
      marketing: true,
      accepted: true,
    }
    saveConsent(fullConsent)
  }

  // Nur ausgewählte Cookies akzeptieren
  const saveSettings = (settings: Omit<CookieConsent, "accepted">) => {
    const newConsent: CookieConsent = {
      ...settings,
      accepted: true,
    }
    saveConsent(newConsent)
    setShowSettings(false)
  }

  // Einstellungen öffnen
  const openSettings = () => {
    setShowSettings(true)
  }

  // Einstellungen schließen
  const closeSettings = () => {
    setShowSettings(false)
  }

  if (!showBanner) {
    return null
  }

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 p-4 bg-white shadow-lg border-t border-[#e0d5c1] transform transition-transform duration-500 ease-in-out ${
          showBanner ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="pr-8 flex-1">
              <p className="text-[#555] text-sm mb-2">
                Diese Website verwendet Cookies, um Ihnen ein optimales Nutzererlebnis zu bieten. Weitere Informationen
                finden Sie in unserer{" "}
                <Link href="/datenschutz" className="text-[#d4af37] hover:underline">
                  Datenschutzerklärung
                </Link>{" "}
                und im{" "}
                <Link href="/impressum" className="text-[#d4af37] hover:underline">
                  Impressum
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button
                onClick={openSettings}
                variant="outline"
                className="border-[#d4af37] text-[#555] hover:bg-[#faf7f2] hover:text-[#333]"
              >
                Einstellungen
              </Button>
              <Button onClick={acceptAll} className="bg-[#d4af37] hover:bg-[#b08d1e] text-white">
                Alle akzeptieren
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showSettings && (
        <CookieSettings
          initialSettings={{
            necessary: consent.necessary,
            statistics: consent.statistics,
            marketing: consent.marketing,
          }}
          onSave={saveSettings}
          onClose={closeSettings}
        />
      )}
    </>
  )
}
