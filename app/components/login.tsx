"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"

import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("user")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const token = document.cookie.includes("token=")
    if (token) {
      router.push("/stream")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!emailOrUsername || !password) {
      setError("Tous les champs sont obligatoires.")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailOrUsername,
          password,
          userType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Invalid credentials")
      }

      // The token is automatically set as an HTTP-only cookie by the API
      localStorage.setItem("userType", userType)
      setSuccess(true)

      // Redirect after a brief delay to show success message
      setTimeout(() => {
        router.push(userType === "admin" ? "/espace-admin" : "/stream")
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Connexion à Fréquence Médicale</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
          <div className="space-y-4">
            <div>
              <Label htmlFor="emailOrUsername">Email ou nom d'utilisateur</Label>
              <Input
                id="emailOrUsername"
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="Entrez votre email ou nom d'utilisateur"
                className="mt-1"
                disabled={isLoading || success}
              />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="mt-1"
                disabled={isLoading || success}
              />
            </div>
            <div>
              <Label>Type d'utilisateur</Label>
              <RadioGroup
                defaultValue="user"
                onValueChange={setUserType}
                className="flex space-x-4 mt-1"
                disabled={isLoading || success}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user">Utilisateur</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">Administrateur</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          {error && (
            <div className="flex items-center mt-4 text-red-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="flex items-center mt-4 text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              <p className="text-sm">Connexion réussie ! Redirection en cours...</p>
            </div>
          )}
          <Button type="submit" className="w-full mt-6" disabled={isLoading || success}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connexion en cours...
              </>
            ) : (
              "Connexion"
            )}
          </Button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Vous n'avez pas de compte ?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Inscrivez-vous
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login

