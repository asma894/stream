"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Mail, Settings, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface User {
  name: string
  email: string
  avatar?: string
  isAdmin: boolean
}

export default function StreamNavbar() {
  const router = useRouter()
  const [user, setUser] = useState<User>({
    name: "Asma Gh",
    email: "asma@example.com",
    avatar: "/placeholder.svg",
    isAdmin: false,
  })

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
    router.push("/login")
  }

  const toggleAdminStatus = () => {
    setUser((prevUser) => ({ ...prevUser, isAdmin: !prevUser.isAdmin }))
    localStorage.setItem("userType", user.isAdmin ? "user" : "admin")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-center">
        <nav className="flex items-center space-x-8 text-sm font-medium">
          <Link href="/stream" className="flex items-center space-x-2">
            <span className="font-bold">Tableau de Bord Admin</span>
          </Link>
          <Link href="/espace-admin" className="transition-colors hover:text-foreground/80">
            Vue d'ensemble
          </Link>
          <Link href="/espace-admin/users" className="transition-colors hover:text-foreground/80">
            Utilisateurs
          </Link>
          <Link href="/espace-admin/content" className="transition-colors hover:text-foreground/80">
            Contenu
          </Link>
          <Link href="/espace-admin/support" className="transition-colors hover:text-foreground/80">
            Support
          </Link>
        </nav>
        <div className="flex items-center space-x-4 ml-auto">
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
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
              <DropdownMenuItem onSelect={toggleAdminStatus}>
                <Settings className="mr-2 h-4 w-4" />
                <span>{user.isAdmin ? "Switch to User View" : "Switch to Admin View"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onSelect={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

