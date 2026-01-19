"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Thompson",
    event: "Wedding",
    quote:
      "Eternal Moments made our wedding day absolutely magical. Every detail was perfect, and we could truly enjoy our special day without any stress. They exceeded all our expectations!",
    image: "/testimonials/sarah.jpg",
  },
  {
    id: 2,
    name: "Michael & Jennifer",
    event: "Anniversary",
    quote:
      "For our 25th anniversary, we wanted something extraordinary. The team delivered beyond our dreams. Our guests are still talking about it months later!",
    image: "/testimonials/michael.jpg",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    event: "Birthday Party",
    quote:
      "My daughter's quinceañera was the event of the year! The attention to cultural details and the elegant execution made it truly memorable for our entire family.",
    image: "/testimonials/emma.jpg",
  },
  {
    id: 4,
    name: "Robert Chen",
    event: "Corporate Event",
    quote:
      "Professional, creative, and incredibly organized. Our company gala was a huge success thanks to their meticulous planning and flawless execution.",
    image: "/testimonials/robert.jpg",
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-20 md:py-24 bg-background"
    >
      <div className="container mx-auto px-6">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Kind Words
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Client Testimonials
          </h2>
          <div className="mt-6 w-24 h-px bg-primary/50 mx-auto" />
        </div>

        <div
          className={`relative max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Quote Icon */}
          <Quote className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 text-primary/20" />

          {/* Testimonial Content */}
          <div className="text-center px-8 md:px-16">
            <div className="overflow-hidden">
              <div
                className="transition-all duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                <div className="flex">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <blockquote className="font-serif text-xl md:text-2xl text-foreground leading-relaxed italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>
                      <div className="mt-10">
                        <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full overflow-hidden">
                          <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-serif text-xl">
                            {testimonial.name.charAt(0)}
                          </div>
                        </div>
                        <p className="font-medium text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {testimonial.event}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={prevSlide}
                className="w-12 h-12 flex items-center justify-center border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-primary w-6"
                        : "bg-border hover:bg-primary/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="w-12 h-12 flex items-center justify-center border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
