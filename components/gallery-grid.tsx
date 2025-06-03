"use client"

import { useState } from "react"
import Image from "next/image"
import { Lightbox } from "@/components/lightbox"

interface GalleryImage {
  id: number
  src: string
  alt: string
  category: string
  category_name?: string
  description: string
  created_at?: string
}

interface GalleryGridProps {
  images: GalleryImage[]
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isLoading, setIsLoading] = useState<Record<number, boolean>>({})

  const handleImageLoad = (id: number) => {
    setIsLoading((prev) => ({ ...prev, [id]: false }))
  }

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image)
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    // Restore body scrolling
    document.body.style.overflow = "auto"
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative overflow-hidden bg-white p-2 shadow-sm hover:shadow-md transition-all duration-500"
            style={{ opacity: isLoading[image.id] === false ? 1 : 0, transition: "opacity 0.5s ease-in" }}
          >
            <div
              className="relative h-80 w-full cursor-pointer"
              onClick={() => openLightbox(image)}
              onKeyDown={(e) => e.key === "Enter" && openLightbox(image)}
              tabIndex={0}
              role="button"
              aria-label={`Öffne ${image.alt} im Vollbildmodus`}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                onLoad={() => handleImageLoad(image.id)}
                onLoadingComplete={() => handleImageLoad(image.id)}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100">
                <div className="bg-white/90 p-3 max-w-full">
                  <h3 className="text-[#333] text-sm font-medium">{image.alt}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Component */}
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={closeLightbox}
          onNext={() => {
            const currentIndex = images.findIndex((img) => img.id === selectedImage.id)
            const nextIndex = (currentIndex + 1) % images.length
            setSelectedImage(images[nextIndex])
          }}
          onPrevious={() => {
            const currentIndex = images.findIndex((img) => img.id === selectedImage.id)
            const prevIndex = (currentIndex - 1 + images.length) % images.length
            setSelectedImage(images[prevIndex])
          }}
          totalImages={images.length}
          currentIndex={images.findIndex((img) => img.id === selectedImage.id) + 1}
        />
      )}
    </>
  )
}
