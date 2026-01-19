"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Cake, Building2, Gift } from "lucide-react"

const services = [
  {
    icon: Heart,
    title: "Weddings",
    description:
      "From intimate ceremonies to grand celebrations, we craft every detail of your perfect day with love and precision.",
  },
  {
    icon: Cake,
    title: "Birthday Parties",
    description:
      "Celebrate another year of life with unforgettable parties designed to reflect your unique personality and style.",
  },
  {
    icon: Building2,
    title: "Corporate Events",
    description:
      "Elevate your brand with sophisticated corporate gatherings that leave lasting impressions on clients and colleagues.",
  },
  {
    icon: Gift,
    title: "Anniversary Celebrations",
    description:
      "Honor your journey together with romantic anniversary events that rekindle the spark of your love story.",
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-20 md:py-24 bg-background"
    >
      <div className="container mx-auto px-6">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">
            What We Do
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Our Services
          </h2>
          <div className="mt-6 w-24 h-px bg-primary/50 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group p-8 bg-card border border-border rounded-sm hover:border-primary/50 hover:shadow-lg transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 flex items-center justify-center bg-secondary rounded-full mb-6 group-hover:bg-primary/10 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
              <a
                href="#contact"
                className="inline-block mt-6 text-sm tracking-widest uppercase text-primary hover:text-primary/70 transition-colors"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
