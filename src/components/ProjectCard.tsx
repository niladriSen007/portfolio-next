'use client'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi'
import { useRef, useState } from 'react'

interface ProjectCardProps {
  project: {
    title: string
    description: string
    image: string
    tags: string[]
    links: {
      github: string
      live: string
    }
    highlights: string[]
  }
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Mouse position for gradient effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  // Shine effect
  const background = useMotionTemplate`
    radial-gradient(
      400px circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.1),
      transparent 80%
    )
  `

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-gradient-to-b from-white/[0.07] to-transparent rounded-2xl overflow-hidden"
    >
      {/* Interactive Gradient Background */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background }}
      />

      {/* Project Image with Parallax Effect */}
      <motion.div 
        className="relative h-40 sm:h-48 overflow-hidden bg-[#1a1a1a]"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Floating Tags on Image */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="px-3 py-1 text-sm rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/10"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative p-4 sm:p-6">
        {/* Title with Animation */}
        <motion.h3 
          className="text-xl sm:text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {project.title}
        </motion.h3>

        {/* Animated Description */}
        <motion.p 
          className="text-sm sm:text-base text-gray-400 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {project.description}
        </motion.p>

        {/* Animated Highlights */}
        <motion.ul className="space-y-2 mb-6">
          {project.highlights.map((highlight, i) => (
            <motion.li
              key={highlight}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
              className="flex items-center text-sm text-gray-400"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"
              />
              {highlight}
            </motion.li>
          ))}
        </motion.ul>

        {/* Interactive Links */}
        <div className="flex gap-4">
          <motion.a
            whileHover={{ y: -2, x: 0 }}
            whileTap={{ scale: 0.95 }}
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <FiGithub className="w-5 h-5" />
            <span>Code</span>
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
            >
              <FiArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.a>
          <motion.a
            whileHover={{ y: -2, x: 0 }}
            whileTap={{ scale: 0.95 }}
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <FiExternalLink className="w-5 h-5" />
            <span>Live Demo</span>
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
            >
              <FiArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.a>
        </div>

        {/* Animated Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 rounded-2xl border-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-[-2px] rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
        </motion.div>
      </div>
    </motion.div>
  )
} 