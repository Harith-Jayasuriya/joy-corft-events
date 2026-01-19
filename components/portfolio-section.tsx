"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const portfolioItems = [
  // Weddings - 8 items
  {
    id: 1,
    category: "Wedding",
    title: "Sarah & James",
    subtitle: "Garden Ceremony",
    image: "/portfolio/wedding-1.jpg",
    description: "A breathtaking outdoor ceremony surrounded by blooming roses",
  },
  {
    id: 2,
    category: "Wedding",
    title: "Maria & David",
    subtitle: "Rustic Barn Reception",
    image: "/portfolio/wedding-2.jpg",
    description: "Intimate celebration with candlelight and wildflowers",
  },
  {
    id: 3,
    category: "Wedding",
    title: "Elena & Michael",
    subtitle: "Beach Sunset Vows",
    image: "/portfolio/wedding-3.jpg",
    description: "Romantic barefoot ceremony as the sun kissed the horizon",
  },
  {
    id: 4,
    category: "Wedding",
    title: "Olivia & Thomas",
    subtitle: "Vineyard Romance",
    image: "/portfolio/wedding-4.jpg",
    description: "Elegant wine country celebration among rolling hills",
  },
  {
    id: 5,
    category: "Wedding",
    title: "Charlotte & William",
    subtitle: "Classic Ballroom",
    image: "/portfolio/wedding-5.jpg",
    description: "Timeless elegance with crystal chandeliers and ivory draping",
  },
  {
    id: 6,
    category: "Wedding",
    title: "Sophia & Alexander",
    subtitle: "Garden Estate",
    image: "/portfolio/wedding-6.jpg",
    description: "Enchanting estate celebration with lush greenery",
  },
  {
    id: 7,
    category: "Wedding",
    title: "Isabella & Benjamin",
    subtitle: "Mountain Retreat",
    image: "/portfolio/wedding-7.jpg",
    description: "Majestic mountain views as the perfect backdrop",
  },
  {
    id: 8,
    category: "Wedding",
    title: "Ava & Sebastian",
    subtitle: "Rooftop City Views",
    image: "/portfolio/wedding-8.jpg",
    description: "Urban sophistication with panoramic city skyline",
  },
  // Birthdays - 6 items
  {
    id: 9,
    category: "Birthday",
    title: "Emma's Sweet 16",
    subtitle: "Pink Paradise",
    image: "/portfolio/birthday-1.jpg",
    description: "A magical pink wonderland celebration",
  },
  {
    id: 10,
    category: "Birthday",
    title: "Lucas First Birthday",
    subtitle: "Teddy Bear Picnic",
    image: "/portfolio/birthday-2.jpg",
    description: "Adorable outdoor picnic theme with plush friends",
  },
  {
    id: 11,
    category: "Birthday",
    title: "Sophie's 30th",
    subtitle: "Gatsby Glamour",
    image: "/portfolio/birthday-3.jpg",
    description: "Roaring twenties elegance and champagne towers",
  },
  {
    id: 12,
    category: "Birthday",
    title: "Noah's 5th",
    subtitle: "Dinosaur Adventure",
    image: "/portfolio/birthday-4.jpg",
    description: "Prehistoric fun with jungle decorations",
  },
  {
    id: 13,
    category: "Birthday",
    title: "Mia's Quinceañera",
    subtitle: "Royal Celebration",
    image: "/portfolio/birthday-5.jpg",
    description: "Traditional elegance with modern flair",
  },
  {
    id: 14,
    category: "Birthday",
    title: "Jack's 40th",
    subtitle: "Whiskey & Cigars",
    image: "/portfolio/birthday-6.jpg",
    description: "Sophisticated gentleman's celebration",
  },
  // Corporate - 5 items
  {
    id: 15,
    category: "Corporate",
    title: "Tech Summit 2024",
    subtitle: "Innovation Gala",
    image: "/portfolio/corporate-1.jpg",
    description: "Cutting-edge technology showcase dinner",
  },
  {
    id: 16,
    category: "Corporate",
    title: "Annual Awards Night",
    subtitle: "Excellence Celebration",
    image: "/portfolio/corporate-2.jpg",
    description: "Recognizing outstanding achievements in style",
  },
  {
    id: 17,
    category: "Corporate",
    title: "Product Launch",
    subtitle: "Grand Reveal",
    image: "/portfolio/corporate-3.jpg",
    description: "Dramatic unveiling with media and VIP guests",
  },
  {
    id: 18,
    category: "Corporate",
    title: "Executive Retreat",
    subtitle: "Team Building",
    image: "/portfolio/corporate-4.jpg",
    description: "Luxury resort gathering for leadership",
  },
  {
    id: 19,
    category: "Corporate",
    title: "Charity Gala",
    subtitle: "Giving Back",
    image: "/portfolio/corporate-5.jpg",
    description: "Elegant fundraising event for a meaningful cause",
  },
  // Anniversary - 5 items
  {
    id: 20,
    category: "Anniversary",
    title: "Golden Anniversary",
    subtitle: "50 Years of Love",
    image: "/portfolio/anniversary-1.jpg",
    description: "Celebrating half a century of devotion",
  },
  {
    id: 21,
    category: "Anniversary",
    title: "Silver Celebration",
    subtitle: "25 Years Together",
    image: "/portfolio/anniversary-2.jpg",
    description: "A quarter century of beautiful memories",
  },
  {
    id: 22,
    category: "Anniversary",
    title: "Ruby Romance",
    subtitle: "40 Years of Joy",
    image: "/portfolio/anniversary-3.jpg",
    description: "Four decades celebrated in red elegance",
  },
  {
    id: 23,
    category: "Anniversary",
    title: "Pearl Anniversary",
    subtitle: "30 Years Strong",
    image: "/portfolio/anniversary-4.jpg",
    description: "Timeless love honored with pearls and lace",
  },
  {
    id: 24,
    category: "Anniversary",
    title: "Diamond Forever",
    subtitle: "60 Years United",
    image: "/portfolio/anniversary-5.jpg",
    description: "A lifetime of love deserves diamonds",
  },
]

const filters = ["All", "Wedding", "Birthday", "Corporate", "Anniversary"]

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [visibleCount, setVisibleCount] = useState(12)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(12)
  }, [activeFilter])

  const filteredItems =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter)

  const displayedItems = filteredItems.slice(0, visibleCount)
  const hasMore = visibleCount < filteredItems.length

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightboxIndex === null) return
    if (direction === "prev") {
      setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1)
    } else {
      setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === "ArrowLeft") navigateLightbox("prev")
      if (e.key === "ArrowRight") navigateLightbox("next")
      if (e.key === "Escape") setLightboxIndex(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIndex, filteredItems.length])

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-20 md:py-24 bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Our Work
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Portfolio Gallery
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Browse through our collection of unforgettable celebrations. Each event is crafted with love, attention to detail, and a commitment to exceeding expectations.
          </p>
          <div className="mt-6 w-24 h-px bg-primary/50 mx-auto" />
        </div>

        {/* Category Stats */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {filters.slice(1).map((category) => {
            const count = portfolioItems.filter((item) => item.category === category).length
            return (
              <div
                key={category}
                className="text-center p-4 bg-card rounded-sm border border-border"
              >
                <p className="font-serif text-2xl text-primary">{count}+</p>
                <p className="text-sm text-muted-foreground tracking-widest uppercase mt-1">
                  {category}s
                </p>
              </div>
            )
          })}
        </div>

        {/* Filters */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {filters.map((filter) => {
            const count =
              filter === "All"
                ? portfolioItems.length
                : portfolioItems.filter((item) => item.category === filter).length
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 text-sm tracking-widest uppercase transition-all rounded-sm flex items-center gap-2 ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-foreground border border-border hover:border-primary"
                }`}
              >
                {filter}
                <span
                  className={`text-xs ${
                    activeFilter === filter ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  ({count})
                </span>
              </button>
            )
          })}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
          {displayedItems.map((item, index) => (
            <div
              key={item.id}
              className={`break-inside-avoid group cursor-pointer transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(index % 8) * 75}ms` }}
              onClick={() => setLightboxIndex(filteredItems.indexOf(item))}
            >
              <div className="relative overflow-hidden rounded-sm shadow-sm hover:shadow-lg transition-shadow">
                <div
                  className={`relative ${
                    index % 5 === 0
                      ? "h-96"
                      : index % 5 === 1
                        ? "h-64"
                        : index % 5 === 2
                          ? "h-80"
                          : index % 5 === 3
                            ? "h-72"
                            : "h-56"
                  } bg-muted`}
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                  <p className="text-xs tracking-widest uppercase text-primary-foreground/80">
                    {item.category}
                  </p>
                  <h3 className="font-serif text-xl text-card mt-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-card/70 mt-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="px-10 py-4 border border-primary text-primary text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-sm"
            >
              Load More ({filteredItems.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Lightbox */}
      {currentLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-card hover:text-primary transition-colors z-10"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Navigation Buttons */}
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-card hover:text-primary transition-colors z-10 p-2"
            onClick={(e) => {
              e.stopPropagation()
              navigateLightbox("prev")
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-card hover:text-primary transition-colors z-10 p-2"
            onClick={(e) => {
              e.stopPropagation()
              navigateLightbox("next")
            }}
            aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>

          {/* Image and Info */}
          <div
            className="flex flex-col md:flex-row max-w-6xl max-h-[90vh] w-full mx-4 gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 h-[50vh] md:h-[80vh]">
              <Image
                src={currentLightboxItem.image || "/placeholder.svg"}
                alt={currentLightboxItem.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="md:w-72 p-6 flex flex-col justify-center text-card">
              <p className="text-sm tracking-widest uppercase text-primary mb-2">
                {currentLightboxItem.category}
              </p>
              <h3 className="font-serif text-3xl mb-2">{currentLightboxItem.title}</h3>
              <p className="text-lg text-card/80 mb-4">{currentLightboxItem.subtitle}</p>
              <p className="text-card/60 leading-relaxed">{currentLightboxItem.description}</p>
              <p className="mt-6 text-sm text-card/50">
                {(lightboxIndex ?? 0) + 1} / {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
