'use client'
import { motion } from 'framer-motion'

export default function SectionTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl -z-10" />
      <div className="absolute inset-0 backdrop-blur-sm rounded-3xl -z-10" />
      {children}
    </motion.div>
  )
} 