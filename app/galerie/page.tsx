"use client"

import Image from "next/image"
import Link from "next/link"
import { GalleryGrid } from "@/components/gallery-grid"
import { Instagram, Facebook, Mail, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"

// Types for our data
interface Category {
  id: string
  name: string
}

interface GalleryImage {
  id: number
  src: string
  alt: string
  category: string
  category_name: string
  description: string
  created_at: string
}

export default function GalleryPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")

  // API URL
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch(`${API_URL}/categories/`)
        const categoriesData = await categoriesResponse.json()
        
        // Add "All" category if it doesn't exist in the API response
        const allCategoriesIncluded = categoriesData.results.some((cat: Category) => cat.id === "all")
        let allCategories = categoriesData.results
        
        if (!allCategoriesIncluded) {
          allCategories = [{ id: "all", name: "Alle" }, ...categoriesData.results]
        }
        
        setCategories(allCategories)

        // Fetch gallery images
        const imagesResponse = await fetch(`${API_URL}/images/`)
        const imagesData = await imagesResponse.json()
        
        // Transform image URLs to include the API base URL for the src property
        const processedImages = imagesData.results.map((image: GalleryImage) => ({
          ...image,
          src: image.src.startsWith('http') ? image.src : `${API_URL}${image.src}`
        }))
        
        setGalleryImages(processedImages)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [API_URL])

  // Filter images by category
  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(image => image.category === activeCategory)

  return (
    <main className="min-h-screen bg-[#faf7f2]">
      {/* Header mit Zurück-Button */}
      <header className="px-4 lg:px-6 h-20 flex items-center border-b border-[#e0d5c1]">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center text-[#555] hover:text-[#d4af37] transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="text-sm">Zurück zur Startseite</span>
          </Link>
          <Link href="/" className="flex items-center justify-center">
            <Image src="/sisters_logo.png" alt="Sisters Deko Logo" width={120} height={48} />
          </Link>
          <div className="w-[120px]"></div> {/* Platzhalter für Ausrichtung */}
        </div>
      </header>

      {/* Galerie-Hauptbereich */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-light text-[#333] mb-4 tracking-wide">Unsere Galerie</h1>
            <div className="w-20 h-[1px] bg-[#d4af37] mx-auto mb-6"></div>
            <p className="text-lg text-[#555] max-w-2xl mx-auto">
              Entdecken Sie unsere exquisiten Dekorationen und lassen Sie sich von unseren Arbeiten inspirieren. Jedes
              Detail erzählt eine Geschichte und schafft unvergessliche Momente.
            </p>
          </div>

          {/* Kategorie-Filter */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {loading ? (
              // Loading skeletons for categories
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="w-24 h-10 bg-gray-200 animate-pulse rounded-sm"></div>
              ))
            ) : (
              // Actual categories
              categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 text-sm ${
                    activeCategory === category.id 
                      ? "text-[#d4af37] border-[#d4af37]/30" 
                      : "text-[#555] hover:text-[#d4af37] border-transparent hover:border-[#d4af37]/30"
                  } border rounded-sm transition-all duration-300`}
                >
                  {category.name}
                </button>
              ))
            )}
          </div>

          {/* Galerie-Grid mit Lightbox */}
          {loading ? (
            // Loading skeleton for gallery
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(9).fill(0).map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-gray-200 animate-pulse rounded-sm"></div>
              ))}
            </div>
          ) : (
            <GalleryGrid images={filteredImages} />
          )}
        </div>
      </section>

      {/* Kontakt-CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-[#333] mb-4">Lassen Sie uns Ihren Traum verwirklichen</h2>
          <p className="text-[#555] max-w-2xl mx-auto mb-8">
            Haben Sie Fragen zu unseren Dekorationskonzepten oder möchten Sie ein individuelles Angebot erhalten? Wir
            freuen uns darauf, von Ihnen zu hören.
          </p>
          <Link
            href="/#kontakt"
            className="inline-block px-8 py-3 bg-[#d4af37]/80 hover:bg-[#d4af37] text-white rounded-sm transition-all duration-300 text-sm tracking-wider"
          >
            KONTAKT AUFNEHMEN
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image src="/sisters_logo.png" alt="Sisters Deko Logo" width={150} height={60} />
            </div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-[#d4af37] hover:text-[#b08d1e] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#d4af37] hover:text-[#b08d1e] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:info@sistersdeko.de" className="text-[#d4af37] hover:text-[#b08d1e] transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <div className="text-sm text-[#777]">
              © {new Date().getFullYear()} Sisters Deko GmbH. Alle Rechte vorbehalten.
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
