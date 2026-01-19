import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-16 bg-foreground text-card">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-2xl tracking-wide">
              Joy Corft Events
            </Link>
            <p className="mt-4 text-card/70 max-w-md leading-relaxed">
              Creating unforgettable celebrations since 2010. We transform your dreams into
              reality with elegance, precision, and a touch of magic.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="#services"
                className="text-card/70 hover:text-card transition-colors"
              >
                Services
              </Link>
              <Link
                href="#portfolio"
                className="text-card/70 hover:text-card transition-colors"
              >
                Portfolio
              </Link>
              <Link
                href="#testimonials"
                className="text-card/70 hover:text-card transition-colors"
              >
                Testimonials
              </Link>
              <Link
                href="#contact"
                className="text-card/70 hover:text-card transition-colors"
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
                className="text-card/70 hover:text-card transition-colors"
              >
                Weddings
              </Link>
              <Link
                href="#services"
                className="text-card/70 hover:text-card transition-colors"
              >
                Birthday Parties
              </Link>
              <Link
                href="#services"
                className="text-card/70 hover:text-card transition-colors"
              >
                Corporate Events
              </Link>
              <Link
                href="#services"
                className="text-card/70 hover:text-card transition-colors"
              >
                Anniversaries
              </Link>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-card/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-card/60 text-sm">© {currentYear} Joy Corft Events. All rights reserved.</p>
          <p className="text-card/60 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary" fill="currentColor" /> for your special moments
          </p>
        </div>
      </div>
    </footer>
  )
}
