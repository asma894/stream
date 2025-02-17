"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "./ui/button"

export default function Cta() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold mb-6"
          >
            Prêt à commencer ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Rejoignez Fréquence Médicale dès aujourd'hui et découvrez un monde de connaissances médicales et de
            réseautage.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button asChild size="lg" className="rounded-full px-8 text-white font-semibold hover:text-white">
              <Link href="/sign-up">Inscrivez-vous maintenant</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

