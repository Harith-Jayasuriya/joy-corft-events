import React from "react"
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Joy Corft Events | Wedding & Event Planning',
  description: 'Crafting joy into every celebration. Premium wedding and event planning services for your most cherished moments.',
  icons: {
    icon: '/Logo1_compressed_compressed-no-bg.png',
    apple: '/Logo1_compressed_compressed-no-bg.png',
  },
  openGraph: {
    title: 'Joy Corft Events | Wedding & Event Planning',
    description: 'Crafting joy into every celebration. Premium wedding and event planning services for your most cherished moments.',
    images: ['/Logo1_compressed_compressed-no-bg.png'],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
