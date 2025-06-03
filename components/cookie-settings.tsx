"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

type CookieSettings = {
  necessary: boolean
  statistics: boolean
  marketing: boolean
}

interface CookieSettingsProps {
  initialSettings: CookieSettings
  onSave: (settings: CookieSettings) => void
  onClose: () => void
}

export function CookieSettings({ initialSettings, onSave, onClose }: CookieSettingsProps) {
  const [settings, setSettings] = useState<CookieSettings>(initialSettings)

  const handleChange = (key: keyof CookieSettings) => (checked: boolean) => {
    if (key === "necessary") return // Notwendige Cookies können nicht deaktiviert werden
    setSettings((prev) => ({ ...prev, [key]: checked }))
  }

  const handleSave = () => {
    onSave(settings)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="bg-white rounded-sm shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#e0d5c1]">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-light text-[#333]">Cookie-Einstellungen</h2>
            <button
              onClick={onClose}
              className="text-[#777] hover:text-[#333] transition-colors"
              aria-label="Schließen"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <p className="text-[#555] mb-6">
            Hier können Sie einstellen, welche Cookies Sie zulassen möchten. Bitte beachten Sie, dass einige Cookies
            notwendig sind, damit unsere Website ordnungsgemäß funktioniert und nicht deaktiviert werden können.
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Checkbox id="necessary" checked={settings.necessary} disabled className="mt-1" />
              <div>
                <label htmlFor="necessary" className="text-[#333] font-medium block mb-1">
                  Notwendige Cookies
                </label>
                <p className="text-sm text-[#555]">
                  Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert
                  werden.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Checkbox
                id="statistics"
                checked={settings.statistics}
                onCheckedChange={(checked) => handleChange("statistics")(!!checked)}
                className="mt-1"
              />
              <div>
                <label htmlFor="statistics" className="text-[#333] font-medium block mb-1">
                  Statistik-Cookies
                </label>
                <p className="text-sm text-[#555]">
                  Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie
                  Informationen anonym sammeln und melden.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Checkbox
                id="marketing"
                checked={settings.marketing}
                onCheckedChange={(checked) => handleChange("marketing")(!!checked)}
                className="mt-1"
              />
              <div>
                <label htmlFor="marketing" className="text-[#333] font-medium block mb-1">
                  Marketing-Cookies
                </label>
                <p className="text-sm text-[#555]">
                  Diese Cookies werden verwendet, um Besuchern auf Websites relevante Werbung zu zeigen und die
                  Effektivität von Marketingkampagnen zu messen.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-[#e0d5c1] flex justify-end space-x-4">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-[#d4af37] text-[#555] hover:bg-[#faf7f2] hover:text-[#333]"
          >
            Abbrechen
          </Button>
          <Button onClick={handleSave} className="bg-[#d4af37] hover:bg-[#b08d1e] text-white">
            Einstellungen speichern
          </Button>
        </div>
      </div>
    </div>
  )
}
