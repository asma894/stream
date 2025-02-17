"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

import { Bell, Mail, Settings, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "./button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu"
import { cn } from "../lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

interface User {
  name: string
  email: string
  avatar?: string
}

export default function SharedNavbar() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [isOnline] = useState(true)

  // This should come from your auth context/state
  const user: User = {
    name: "Asma Gh",
    email: "asma@example.com",
    avatar: "/placeholder.svg",
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent",
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

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/stream" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Stream
            </Link>
            <Link href="/news" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              News
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 cursor-pointer" onSelect={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
