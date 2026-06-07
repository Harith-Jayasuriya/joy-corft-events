"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const projects = [
  { src: "/portfolio/1.jpeg", alt: "Samidhu's 5th Birthday – Spiderman themed balloon arch" },
  { src: "/portfolio/2.jpeg", alt: "Elegant Happy Birthday setup with gold and black balloons" },
  { src: "/portfolio/3.jpeg", alt: "Happy Birthday pink, white and gold balloon arrangement" },
  { src: "/portfolio/4.jpeg", alt: "Blue and white christening balloon display" },
  { src: "/portfolio/5.jpeg", alt: "K. Preesha Sri birthday setup with red and white balloons" },
]

export function RecentProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === "ArrowLeft")
        setLightboxIndex(lightboxIndex === 0 ? projects.length - 1 : lightboxIndex - 1)
      if (e.key === "ArrowRight")
        setLightboxIndex(lightboxIndex === projects.length - 1 ? 0 : lightboxIndex + 1)
      if (e.key === "Escape") setLightboxIndex(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIndex])

  return (
    <section ref={sectionRef} id="recent-projects" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        <div
          className={`text-center mb-10 md:mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">Gallery</p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">Our Recent Projects</h2>
          <div className="mt-6 w-24 h-px bg-primary/50 mx-auto" />
        </div>

        {/* Grid: 3 top + 2 bottom centered */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {projects.slice(0, 3).map((project, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-sm cursor-pointer aspect-[4/3]"
                onClick={() => setLightboxIndex(i)}
              >
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:max-w-[66.66%] sm:mx-auto">
            {projects.slice(3).map((project, i) => (
              <div
                key={i + 3}
                className="group relative overflow-hidden rounded-sm cursor-pointer aspect-[4/3]"
                onClick={() => setLightboxIndex(i + 3)}
              >
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-6 right-6 text-card hover:text-primary transition-colors z-10"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-card hover:text-primary transition-colors z-10 p-2"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex(lightboxIndex === 0 ? projects.length - 1 : lightboxIndex - 1)
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={40} />
          </button>

          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-card hover:text-primary transition-colors z-10 p-2"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex(lightboxIndex === projects.length - 1 ? 0 : lightboxIndex + 1)
            }}
            aria-label="Next"
          >
            <ChevronRight size={40} />
          </button>

          <div
            className="relative w-full max-w-4xl max-h-[85vh] mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={projects[lightboxIndex].src}
              alt={projects[lightboxIndex].alt}
              width={1200}
              height={900}
              className="object-contain w-full max-h-[85vh] rounded-sm"
            />
            <p className="text-center text-card/60 text-sm mt-3">
              {lightboxIndex + 1} / {projects.length}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
