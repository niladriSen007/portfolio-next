'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LightningEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Main glow effect that follows cursor */}
      <motion.div
        className="glow-effect"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Lightning bolts */}
      <div className="lightning-container">
        <div className="lightning lightning-1" />
        <div className="lightning lightning-2" />
        <div className="lightning lightning-3" />
      </div>

      {/* Ambient glow spots */}
      <div className="fixed-glow glow-1" />
      <div className="fixed-glow glow-2" />
      <div className="fixed-glow glow-3" />
    </>
  )
} 