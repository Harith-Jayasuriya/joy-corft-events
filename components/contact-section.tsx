"use client"

import React from "react"

import { useEffect, useRef, useState } from "react"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, MessageCircle } from "lucide-react"

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // WhatsApp phone number - replace with your real number (country code + number, no + or spaces)
  const whatsappNumber = "1234567890" // e.g. "94771234567" for +94 77 123 4567
  const whatsappMessage = encodeURIComponent("Hello! I'd like to know more about your event planning services.")
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      date: "",
      message: "",
    })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 md:py-24 bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Get In Touch
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Contact Us
          </h2>
          <div className="mt-6 w-24 h-px bg-primary/50 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {submitted ? (
              <div className="bg-card p-12 rounded-sm border border-border text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-4">
                  Thank You!
                </h3>
                <p className="text-muted-foreground">
                  We&apos;ve received your message and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase rounded-sm hover:bg-primary/90 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm tracking-wider uppercase text-foreground mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-card border border-border rounded-sm focus:border-primary focus:outline-none transition-colors text-foreground"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm tracking-wider uppercase text-foreground mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-card border border-border rounded-sm focus:border-primary focus:outline-none transition-colors text-foreground"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm tracking-wider uppercase text-foreground mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-card border border-border rounded-sm focus:border-primary focus:outline-none transition-colors text-foreground"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="eventType"
                      className="block text-sm tracking-wider uppercase text-foreground mb-2"
                    >
                      Event Type
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-card border border-border rounded-sm focus:border-primary focus:outline-none transition-colors text-foreground"
                    >
                      <option value="">Select an option</option>
                      <option value="wedding">Wedding</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm tracking-wider uppercase text-foreground mb-2"
                  >
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-card border border-border rounded-sm focus:border-primary focus:outline-none transition-colors text-foreground"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm tracking-wider uppercase text-foreground mb-2"
                  >
                    Tell Us About Your Dream Event
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-card border border-border rounded-sm focus:border-primary focus:outline-none transition-colors text-foreground resize-none"
                    placeholder="Share your vision with us..."
                  />
                </div>
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white text-sm tracking-widest uppercase rounded-sm hover:bg-[#20b858] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-card p-8 md:p-12 rounded-sm border border-border h-full">
              <h3 className="font-serif text-2xl text-foreground mb-8">
                Visit Our Studio
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-muted-foreground mt-1">
                      123 Elegance Avenue, Suite 200
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-muted-foreground mt-1">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground mt-1">hello@eternalmoments.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Office Hours</p>
                    <p className="text-muted-foreground mt-1">
                      Monday - Friday: 9am - 6pm
                      <br />
                      Saturday: 10am - 4pm
                      <br />
                      Sunday: By appointment
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                <p className="font-medium text-foreground mb-4">Follow Us</p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-primary" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5 text-primary" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5 text-primary" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
