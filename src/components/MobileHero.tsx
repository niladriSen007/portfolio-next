'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function MobileHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      setMousePosition({ x: touch.clientX, y: touch.clientY })
    }

    window.addEventListener('touchmove', handleTouchMove)
    return () => window.removeEventListener('touchmove', handleTouchMove)
  }, [])

  return (
    <div className="md:hidden relative h-[300px] w-full overflow-hidden">
      {/* Floating shapes */}
      <motion.div
        className="absolute w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl"
        animate={{
          x: [0, 10, 0],
          y: [0, -10, 0],
          rotate: [0, 5, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          left: '20%',
          top: '20%',
          filter: 'blur(8px)',
        }}
      />

      <motion.div
        className="absolute w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full"
        animate={{
          x: [0, -15, 0],
          y: [0, 10, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        style={{
          right: '25%',
          top: '30%',
          filter: 'blur(6px)',
        }}
      />

      {/* Interactive glow effect */}
      <motion.div
        className="absolute w-40 h-40 rounded-full"
        animate={{
          x: mousePosition.x - 80,
          y: mousePosition.y - 80,
        }}
        transition={{ type: "spring", damping: 30 }}
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Floating text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600">
          Let@apos;s Connect 
        </div>
      </motion.div>
    </div>
  )
} 