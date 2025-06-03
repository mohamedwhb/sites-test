"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ParallaxProps {
  children: ReactNode
  className?: string
}

export function Parallax({ children, className = "" }: ParallaxProps) {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return

      const scrollPosition = window.scrollY
      const parallaxElement = parallaxRef.current

      // Apply the parallax effect
      parallaxElement.style.transform = `translateY(${scrollPosition * 0.4}px)`
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className={`${className}`}>
      <div ref={parallaxRef} className="absolute inset-0 z-0">
        {children}
      </div>
    </div>
  )
}
