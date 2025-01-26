'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

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

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub className="w-8 h-8" />,
      url: 'https://github.com/niladrix719',
      color: 'from-gray-400 to-gray-600'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin className="w-8 h-8" />,
      url: 'https://www.linkedin.com/in/niladri-adhikary',
      color: 'from-blue-400 to-blue-600'
    }
  ]

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

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-8">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600">
            Let&apos;s Connect
          </span>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="flex gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background */}
              <motion.div
                className={`absolute inset-0 rounded-xl bg-gradient-to-r opacity-20 group-hover:opacity-100 transition-opacity bg-gradient-to-r ${social.color}`}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
                style={{
                  filter: 'blur(8px)',
                }}
              />

              {/* Icon Container */}
              <motion.div
                className="relative p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white/90 hover:text-white transition-colors"
                whileHover={{
                  boxShadow: '0 0 20px rgba(99,102,241,0.3)',
                }}
              >
                {social.icon}
                
                {/* Hover label */}
                <motion.span
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                >
                  {social.name}
                </motion.span>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  )
} 