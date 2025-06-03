"use client"

import { useState, FormEvent } from "react"
import { useToast } from "@/components/toast-provider"

interface FormData {
  name: string
  email: string
  phone: string
  event_type: string
  event_date: string
  message: string
}

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    event_type: "andere",
    event_date: "",
    message: ""
  })

  // API URL
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/contact/submit/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Show success message
        toast({
          title: "Nachricht gesendet!",
          description: data.message || "Vielen Dank für Ihre Nachricht. Wir werden uns umgehend bei Ihnen melden.",
          variant: "default",
        })
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          event_type: "andere",
          event_date: "",
          message: ""
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Beim Senden der Nachricht ist ein Fehler aufgetreten.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : "Beim Senden der Nachricht ist ein Fehler aufgetreten.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm text-[#555] mb-1">
          Name*
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-[#e0d5c1] focus:border-[#d4af37] focus:outline-none rounded-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-[#555] mb-1">
          E-Mail*
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-[#e0d5c1] focus:border-[#d4af37] focus:outline-none rounded-sm"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm text-[#555] mb-1">
          Telefon
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-[#e0d5c1] focus:border-[#d4af37] focus:outline-none rounded-sm"
        />
      </div>

      <div>
        <label htmlFor="event_type" className="block text-sm text-[#555] mb-1">
          Art der Veranstaltung*
        </label>
        <select
          id="event_type"
          name="event_type"
          required
          value={formData.event_type}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-[#e0d5c1] focus:border-[#d4af37] focus:outline-none rounded-sm"
        >
          <option value="hochzeit">Hochzeit</option>
          <option value="firmenfeier">Firmenfeier</option>
          <option value="geburtstag">Geburtstag</option>
          <option value="andere">Andere</option>
        </select>
      </div>

      <div>
        <label htmlFor="event_date" className="block text-sm text-[#555] mb-1">
          Datum der Veranstaltung
        </label>
        <input
          id="event_date"
          name="event_date"
          type="date"
          value={formData.event_date}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          className="w-full px-4 py-2 border border-[#e0d5c1] focus:border-[#d4af37] focus:outline-none rounded-sm"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-[#555] mb-1">
          Nachricht*
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-[#e0d5c1] focus:border-[#d4af37] focus:outline-none rounded-sm resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-[#d4af37]/80 hover:bg-[#d4af37] text-white rounded-sm transition-all duration-300 text-sm tracking-wider disabled:opacity-70"
      >
        {isSubmitting ? "Wird gesendet..." : "NACHRICHT SENDEN"}
      </button>
      
      <p className="text-xs text-[#777] text-center mt-4">
        * Pflichtfelder
      </p>
    </form>
  )
}
