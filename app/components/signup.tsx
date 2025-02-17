"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  userType: "user" | "admin"
}

interface FormErrors {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  general?: string
}

const Signup = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "user",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.username) {
      newErrors.username = "Le nom d'utilisateur est requis"
    } else if (formData.username.length < 3) {
      newErrors.username = "Le nom d'utilisateur doit contenir au moins 3 caractères"
    }

    if (!formData.email) {
      newErrors.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide"
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "La confirmation du mot de passe est requise"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    if (!validateForm()) {
      return
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue lors de l'inscription")
      }

      setSuccess(true)

      // Store userType in localStorage on the client side
      localStorage.setItem("userType", data.userType)

      // Redirect after showing success message
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : "Une erreur est survenue lors de l'inscription",
      })
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
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Inscription à Fréquence Médicale</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Entrez votre nom d'utilisateur"
                className={`mt-1 ${errors.username ? "border-red-500" : ""}`}
                disabled={isLoading}
              />
              {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Entrez votre email"
                className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
                disabled={isLoading}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Entrez votre mot de passe"
                className={`mt-1 ${errors.password ? "border-red-500" : ""}`}
                disabled={isLoading}
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmez le mot de passe</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmez votre mot de passe"
                className={`mt-1 ${errors.confirmPassword ? "border-red-500" : ""}`}
                disabled={isLoading}
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            <div>
              <Label>Type d'utilisateur</Label>
              <RadioGroup
                defaultValue="user"
                onValueChange={(value) => setFormData((prev) => ({ ...prev, userType: value as "user" | "admin" }))}
                className="flex space-x-4 mt-1"
                disabled={isLoading}
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

          {errors.general && (
            <div className="flex items-center mt-4 text-red-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              <p className="text-sm">{errors.general}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center mt-4 text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              <p className="text-sm">Inscription réussie ! Redirection vers la page de connexion...</p>
            </div>
          )}

          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Inscription en cours...
              </>
            ) : (
              "S'inscrire"
            )}
          </Button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Vous avez déjà un compte ?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Connectez-vous
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Signup

