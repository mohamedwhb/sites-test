"use client"

import { useState, useEffect } from "react"
import { TestimonialCard } from "@/components/testimonial-card"

interface Testimonial {
  id: number
  quote: string
  author: string
  event: string
  image: string | null
  created_at: string
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  // API URL
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_URL}/testimonials/`)
        const data = await response.json()
        
        // Transform image URLs to include the API base URL
        const processedTestimonials = data.results.map((testimonial: Testimonial) => ({
          ...testimonial,
          image: testimonial.image 
            ? (testimonial.image.startsWith('http') ? testimonial.image : `${API_URL}${testimonial.image}`)
            : "/placeholder.svg?height=80&width=80&query=elegant portrait"
        }))
        
        setTestimonials(processedTestimonials)
      } catch (error) {
        console.error("Error fetching testimonials:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [API_URL])

  return (
    <section id="referenzen" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-[#333] mb-4 tracking-wide">Was unsere Kunden sagen</h2>
          <div className="w-20 h-[1px] bg-[#d4af37] mx-auto mb-6"></div>
        </div>

        {loading ? (
          // Loading skeletons
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-100 p-8 h-64 animate-pulse rounded-sm"></div>
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          // Testimonials grid
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                quote={testimonial.quote}
                author={testimonial.author}
                event={testimonial.event}
                imageUrl={testimonial.image || "/placeholder.svg?height=80&width=80&query=elegant portrait"}
              />
            ))}
          </div>
        ) : (
          // No testimonials message
          <div className="text-center text-gray-500">
            <p>Noch keine Testimonials vorhanden.</p>
          </div>
        )}
      </div>
    </section>
  )
} 