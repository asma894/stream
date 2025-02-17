"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { cn } from "./lib/utils"
import { Button } from "./ui/button"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          <Link href="/" className="relative w-[180px] h-[48px]">
            <Image
              src="http://localhost/stream/fm.png"
              alt="Fréquence Médicale"

              fill
              className="object-contain"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Accueil

            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              À propos

            </Link>
            <Link href="/services" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Services

            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Connexion</Link>

              </Button>
              <Button asChild>
                <Link href="/signup">S'inscrire</Link>

              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
