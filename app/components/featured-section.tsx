"use client"

import { motion } from "framer-motion"
import { Video, BookOpen, Users } from "lucide-react"
import { Card, CardContent } from "./ui/card"

const features = [
  {
    icon: Video,
    title: "Live Streaming",
    description: "Join live sessions with top medical professionals and experts.",
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    icon: BookOpen,
    title: "Exclusive Content",
    description: "Access a library of premium medical videos and resources.",
    color: "from-indigo-500/20 to-indigo-600/20",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with like-minded individuals and share insights.",
    color: "from-sky-500/20 to-sky-600/20",
  },
]

export default function FeaturedSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12"
        >
          What We Offer
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-50`} />
                <CardContent className="relative z-10 p-8 flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-white shadow-md mb-6">
                    <feature.icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

