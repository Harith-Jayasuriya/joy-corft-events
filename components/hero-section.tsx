"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Setup scroll animations - pin video and animate text in
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Wait a bit to ensure refs are ready
    const setupAnimations = () => {
      // Check if all refs are available
      if (!subtitleRef.current || !headingRef.current || !descriptionRef.current || !buttonRef.current) {
        setTimeout(setupAnimations, 100)
        return
      }

      // Set initial state - text starts invisible and below
      gsap.set([subtitleRef.current, headingRef.current, descriptionRef.current, buttonRef.current], {
        opacity: 0,
        y: 40,
      })

      // Create timeline for text animations - elegant and smooth
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2000", // Pin for 2000px of scroll
          pin: true,
          scrub: 1,
          markers: false, // Set to true for debugging
        },
      })

      // Animate text in sequentially with elegant timing
      if (subtitleRef.current) {
        tl.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        })
      }

      if (headingRef.current) {
        tl.to(
          headingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.1" // Start slightly before previous animation ends
        )
      }

      if (descriptionRef.current) {
        tl.to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.2"
        )
      }

      if (buttonRef.current) {
        tl.to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.1"
        )
      }

      // Fade out scroll indicator as text appears
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          y: -20,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=500",
            scrub: 1,
          },
        })
      }
    }

    // Start setup
    setupAnimations()

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Handle video loaded
    const handleLoadedData = () => {
      setIsLoaded(true)
      setHasError(false)
    }

    // Handle video can play
    const handleCanPlay = () => {
      setIsLoaded(true)
      setHasError(false)
      // Start playing the video
      video.play().catch((err) => {
        console.error("Error playing video:", err)
      })
    }

    // Handle video loading errors
    const handleError = () => {
      setHasError(true)
      setIsLoaded(true)
      console.error("Failed to load video")
    }

    // Add event listeners
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)

    // Cleanup
    return () => {
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full bg-black">
        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
            <div className="text-center px-6">
              <p className="text-white text-lg font-medium mb-2">
                Video unavailable
              </p>
              <p className="text-white/60 text-sm">
                Please check your connection and try again.
              </p>
            </div>
          </div>
        )}

        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          style={{
            objectFit: "cover",
            width: "100vw",
            height: "100vh",
            display: hasError ? "none" : "block",
          }}
        >
          <source src="/proposal-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10 pointer-events-none" />
      </div>

      {/* Content Overlay */}
      <div ref={contentRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Elegant Subtitle */}
          <div className="space-y-3">
            <p 
              ref={subtitleRef}
              className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/90 font-light letter-spacing-wider"
              style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                letterSpacing: '0.5em',
              }}
            >
              Wedding & Event Planning
            </p>
            {/* Elegant divider line */}
            <div className="w-16 h-px bg-white/60 mx-auto" />
          </div>

          {/* Main Heading - Elegant and Spacious */}
          <h1 
            ref={headingRef}
            className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.1] font-normal tracking-tight"
            style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.7), 0 2px 10px rgba(0,0,0,0.5)',
              fontWeight: 400,
            }}
          >
            <span className="block">Crafting Joy Into</span>
            <span className="block mt-2">Every Celebration</span>
          </h1>

          {/* Elegant Description */}
          <p 
            ref={descriptionRef}
            className="text-base md:text-lg lg:text-xl text-white/95 max-w-2xl mx-auto font-light leading-relaxed mt-6"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.6)',
              lineHeight: '1.8',
            }}
          >
            We transform your dreams into unforgettable celebrations, crafting every detail with love and elegance.
          </p>

          {/* Elegant CTA Button */}
          <div className="pt-4">
            <a
              ref={buttonRef}
              href="#contact"
              className="inline-block px-8 py-3 md:px-10 md:py-4 text-sm md:text-base tracking-[0.2em] uppercase text-white font-light border border-white/80 hover:border-white hover:bg-white/10 transition-all duration-500 rounded-none"
              style={{
                textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                letterSpacing: '0.3em',
              }}
            >
              Plan Your Dream Day
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-6 h-6 text-white/80 drop-shadow-lg" />
        </div>
      </div>
    </section>
  )
}
