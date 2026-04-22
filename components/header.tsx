"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinksLeft = [
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
  ]

  const navLinksRight = [
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ]

  const navLinkClassName =
    "whitespace-nowrap text-sm tracking-wide uppercase text-foreground/80 hover:text-primary transition-colors font-medium"

  const bookNowClassName =
    "whitespace-nowrap px-6 py-2.5 bg-primary text-primary-foreground text-sm tracking-wide uppercase rounded-sm hover:bg-primary/90 transition-colors font-semibold shadow-sm"

  const desktopNavGap = "gap-x-6 lg:gap-x-8 xl:gap-x-10"

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-[#FFF5F7]/95 backdrop-blur-md shadow-sm border-b border-[#FFE4E8]/40"
          : "bg-[#FFF5F7]/80 backdrop-blur-sm"
      )}
    >
      <div
        className={cn(
          "container mx-auto px-6",
          isScrolled ? "h-16 md:h-[5rem]" : "h-[5rem] md:h-[5.75rem]"
        )}
      >
        {/* Mobile: menu — centered logo — spacer */}
        <div className="relative flex h-full items-stretch md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="z-10 flex size-11 shrink-0 items-center justify-start text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 flex h-full min-h-0 max-w-[min(72vw,16rem)] -translate-x-1/2 -translate-y-1/2 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
          >
            <Image
              src="/Logo1_compressed_compressed-no-bg.png"
              alt="Joy Craft Events"
              width={280}
              height={92}
              className="h-full w-auto min-h-0 object-contain object-center"
              priority
            />
          </Link>
          <div className="size-11 shrink-0" aria-hidden />
        </div>

        {/* Desktop: equal halves so spacing mirrors; logo centered in the strip */}
        <div className="hidden h-full min-w-0 items-stretch md:flex">
          <nav
            className={cn(
              "flex min-h-0 min-w-0 flex-1 basis-0 items-center justify-end",
              desktopNavGap
            )}
          >
            {navLinksLeft.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClassName}>
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="relative flex h-full min-h-0 w-[clamp(7rem,18vw,14rem)] shrink-0 items-center justify-center px-4 lg:px-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
          >
            <Image
              src="/Logo1_compressed_compressed-no-bg.png"
              alt="Joy Craft Events"
              width={280}
              height={92}
              className="h-full w-full min-h-0 object-contain object-center"
            />
          </Link>

          <nav
            className={cn(
              "flex min-h-0 min-w-0 flex-1 basis-0 items-center justify-start",
              desktopNavGap
            )}
          >
            {navLinksRight.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClassName}>
                {link.label}
              </Link>
            ))}
            <Link href="#contact" className={bookNowClassName}>
              Book Now
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-[#FFF5F7]/98 backdrop-blur-md border-t border-[#FFE4E8]/40">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {[...navLinksLeft, ...navLinksRight].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(navLinkClassName, "py-2")}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(bookNowClassName, "mt-2 text-center")}
            >
              Book Now
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
