"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
  id: number
  src: string
  alt: string
  category: string
  category_name?: string
  description: string
  created_at?: string
}

interface LightboxProps {
  image: GalleryImage
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  totalImages: number
  currentIndex: number
}

export function Lightbox({ image, onClose, onNext, onPrevious, totalImages, currentIndex }: LightboxProps) {
  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNext()
      if (e.key === "ArrowLeft") onPrevious()
    },
    [onClose, onNext, onPrevious]
  )

  // Add and remove event listeners for keyboard navigation
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 md:p-8">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white bg-black/20 hover:bg-black/40 rounded-full"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Navigation - Previous */}
      <button
        onClick={onPrevious}
        className="absolute left-4 z-10 p-2 text-white bg-black/20 hover:bg-black/40 rounded-full hidden md:block"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      {/* Navigation - Next */}
      <button
        onClick={onNext}
        className="absolute right-4 z-10 p-2 text-white bg-black/20 hover:bg-black/40 rounded-full hidden md:block"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Image Container */}
      <div className="max-w-6xl w-full max-h-full flex flex-col">
        <div className="relative h-[70vh] md:h-[80vh] w-full">
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>

        {/* Image Info & Navigation at bottom */}
        <div className="bg-black/60 p-4 flex flex-col md:flex-row justify-between items-center text-white mt-2">
          <div className="max-w-2xl mb-4 md:mb-0">
            <h3 className="text-lg md:text-xl font-medium">{image.alt}</h3>
            <p className="text-sm text-gray-300 mt-1">{image.description}</p>
            {image.category_name && (
              <span className="mt-2 inline-block bg-white/20 px-2 py-1 text-xs rounded">
                {image.category_name}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <button
              onClick={onPrevious}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-l-sm md:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="px-3 py-1">
              {currentIndex} / {totalImages}
            </span>
            <button onClick={onNext} className="p-2 bg-white/10 hover:bg-white/20 rounded-r-sm md:hidden">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
