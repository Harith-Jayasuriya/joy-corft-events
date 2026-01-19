"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Switch nav style after the hero section (full viewport height) has mostly scrolled out
      const threshold = window.innerHeight - 80 // adjust this offset to taste
      setIsScrolled(window.scrollY >= threshold)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const brandClasses = cn(
    "font-serif text-2xl tracking-wide font-bold transition-colors",
    isScrolled ? "text-foreground" : "text-white drop-shadow-lg"
  )

  const navLinkClasses = cn(
    "text-sm tracking-widest uppercase transition-colors font-medium",
    isScrolled
      ? "text-foreground/80 hover:text-primary"
      : "text-white/90 hover:text-white drop-shadow-md"
  )

  const ctaClasses = cn(
    "ml-4 px-6 py-2.5 text-sm tracking-widest uppercase rounded-sm transition-colors font-semibold shadow-sm border",
    isScrolled
      ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
      : "bg-white/10 text-white border-white/40 hover:bg-white/20 backdrop-blur-sm"
  )

  const mobileMenuClasses = isScrolled
    ? "bg-[#FFF5F7]/98 backdrop-blur-md border-t border-[#FFE4E8]/40"
    : "bg-black/70 backdrop-blur-md border-t border-white/10"

  const mobileLinkClasses = cn(
    "text-sm tracking-widest uppercase transition-colors py-2 font-medium",
    isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
  )

  const mobileCtaClasses = cn(
    "mt-2 px-6 py-2.5 text-sm tracking-widest uppercase rounded-sm transition-colors text-center font-semibold shadow-sm border",
    isScrolled
      ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
      : "bg-white/10 text-white border-white/40 hover:bg-white/20 backdrop-blur-sm"
  )

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-[#FFF5F7]/95 backdrop-blur-md shadow-sm py-4 border-b border-[#FFE4E8]/40"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className={brandClasses}
        >
          Joy Corft Events
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={navLinkClasses}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className={ctaClasses}
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn("md:hidden transition-colors", isScrolled ? "text-foreground" : "text-white")}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className={cn("md:hidden absolute top-full left-0 right-0", mobileMenuClasses)}>
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={mobileLinkClasses}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileCtaClasses}
            >
              Book Now
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
