"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export default function CtaSection() {
  const router = useRouter()

  const handleStreamRedirect = () => {
    const token = localStorage.getItem("token")
    if (token) {
      router.push("/stream")
    } else {
      router.push("/login")
    }
  }

  return (
    <section className="relative py-24 overflow-hidden bg-[#EEF2F6]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Join Fréquence Médicale today and unlock a world of medical knowledge and networking.

          </p>
          <Button
            onClick={handleStreamRedirect}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Sign Up Now
          </Button>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
    </section>
  )
}
