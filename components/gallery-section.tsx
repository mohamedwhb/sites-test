"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface SectionContent {
  title: string
  subtitle: string
}

interface GalleryImage {
  id: number
  src: string
  alt: string
  width: number
  height: number
  span: string
  description: string
}

export function GallerySection() {
  const [sectionContent, setSectionContent] = useState<SectionContent>({
    title: "Unsere Arbeiten",
    subtitle: "Entdecken Sie eine Auswahl unserer schönsten Dekorationen und lassen Sie sich inspirieren."
  })
  
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch section content
        const sectionResponse = await fetch('http://127.0.0.1:8000/api/sections/?section_id=gallery')
        const sectionData = await sectionResponse.json()
        
        if (sectionData.results && sectionData.results.length > 0) {
          setSectionContent({
            title: sectionData.results[0].title,
            subtitle: sectionData.results[0].subtitle
          })
        }

        // Fetch featured gallery images
        const imagesResponse = await fetch('http://127.0.0.1:8000/api/images/?featured=true')
        const imagesData = await imagesResponse.json()
        
        if (imagesData.results && imagesData.results.length > 0) {
          const processedImages = imagesData.results.map((image: any) => ({
            id: image.id,
            src: image.src, // Use the URL directly as returned by the API
            alt: image.alt,
            width: image.width,
            height: image.height,
            span: image.span,
            description: image.description
          }))
          console.log("Processed images:", processedImages)
          setGalleryImages(processedImages)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Fallback gallery images if API fails
  const fallbackImages = [
    {
      id: 1,
      src: "/floral-candlelit-centerpiece.png",
      alt: "Elegante Hochzeitsdekoration",
      width: 800,
      height: 600,
      span: "col-span-1 md:col-span-2",
      description: "Elegante Hochzeitsdekoration mit Blumen und Kerzen.",
    },
    {
      id: 2,
      src: "/opulent-dinner.png",
      alt: "Luxuriöse Tischdekoration",
      width: 400,
      height: 600,
      span: "col-span-1",
      description: "Luxuriöse Tischdekoration für ein exklusives Dinner.",
    },
    {
      id: 3,
      src: "/minimalist-corporate-gathering.png",
      alt: "Firmenevent Dekoration",
      width: 600,
      height: 400,
      span: "col-span-1",
      description: "Minimalistische Dekoration für Firmenevents und Geschäftstreffen.",
    },
    {
      id: 4,
      src: "/elegant-floral-birthday.png",
      alt: "Geburtstagsfeier Dekoration",
      width: 400,
      height: 600,
      span: "col-span-1",
      description: "Elegante Blumendekoration für Geburtstagsfeiern.",
    },
    {
      id: 5,
      src: "/white-wedding-arch.png",
      alt: "Hochzeitsbogen",
      width: 800,
      height: 400,
      span: "col-span-1 md:col-span-2",
      description: "Weißer Hochzeitsbogen für eine traumhafte Zeremonie.",
    },
  ]

  // Use the API data if available, otherwise use fallback
  const displayImages = galleryImages.length > 0 ? galleryImages : fallbackImages
  console.log("Display images:", displayImages)

  return (
    <section id="galerie" className="py-24 bg-[#f5f0e8]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-[#333] mb-4 tracking-wide">
            {sectionContent.title}
          </h2>
          <div className="w-20 h-[1px] bg-[#d4af37] mx-auto mb-6"></div>
          <p className="text-lg text-[#555] max-w-2xl mx-auto">
            {sectionContent.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {displayImages.map((image) => (
            <div key={image.id} className={`${image.span} overflow-hidden group`}>
              <div className="relative h-80 w-full">
                {image.src.startsWith('http') ? (
                  // External image from Django backend
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${image.src})` }}
                  />
                ) : (
                  // Local image
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-white text-lg font-light tracking-wide">{image.alt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/galerie"
            className="inline-block px-8 py-3 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-all duration-300 text-sm tracking-wider"
          >
            MEHR ANSEHEN
          </Link>
        </div>
      </div>
    </section>
  )
}
