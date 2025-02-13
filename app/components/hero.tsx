"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export default function Hero() {
  const router = useRouter()

  const handleStreamAccess = () => {
    const token = localStorage.getItem("token")
    if (token) {
      router.push("/stream")
    } else {
      router.push("/login")
    }
  }

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Welcome to Medical Frequency
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            The ultimate platform for healthcare professionals and medical enthusiasts.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button onClick={handleStreamAccess} size="lg" className="rounded-full px-8">
              Access the Streaming Room
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

