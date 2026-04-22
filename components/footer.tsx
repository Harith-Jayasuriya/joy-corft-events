import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white py-10 md:py-12 text-foreground">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 md:gap-10 mb-8 md:mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="max-w-md">
              <Link
                href="/"
                className="flex w-full justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                <Image
                  src="/Logo1_compressed_compressed.webp"
                  alt="Joy Craft Events"
                  width={520}
                  height={170}
                  className="h-24 w-auto object-contain md:h-28 lg:h-32"
                />
              </Link>
              <p className="mt-4 text-foreground/70 leading-relaxed">
                Creating unforgettable celebrations since 2010. We transform your dreams into
                reality with elegance, precision, and a touch of magic.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="#services"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Services
              </Link>
              <Link
                href="#portfolio"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Portfolio
              </Link>
              <Link
                href="#testimonials"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Testimonials
              </Link>
              <Link
                href="#contact"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg mb-6">Services</h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="#services"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Weddings
              </Link>
              <Link
                href="#services"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Birthday Parties
              </Link>
              <Link
                href="#services"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Corporate Events
              </Link>
              <Link
                href="#services"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Anniversaries
              </Link>
            </nav>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/60 text-sm">
            © {currentYear} Joy Craft Events. All rights reserved.
          </p>
          <p className="text-foreground/60 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary" fill="currentColor" /> for your special moments
          </p>
        </div>
      </div>
    </footer>
  )
}
