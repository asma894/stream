"use client"

import { motion } from "framer-motion"
import { Video, BookOpen, Users } from "lucide-react"

const features = [
  {
    icon: Video,
    title: "Streaming en direct",
    description: "Participez à des sessions en direct avec les meilleurs professionnels et experts médicaux.",
  },
  {
    icon: BookOpen,
    title: "Contenu exclusif",
    description: "Accédez à une bibliothèque de vidéos et ressources médicales premium.",
  },
  {
    icon: Users,
    title: "Communauté",
    description: "Connectez-vous avec des personnes partageant les mêmes idées et partagez vos connaissances.",
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Ce que nous proposons
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-blue-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
