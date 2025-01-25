'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SkillCardProps {
  skill: {
    name: string;
    icon: string;
    color: string;
    description?: string;
    level?: number;
  }
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <motion.div
      className="group relative p-8 rounded-2xl glass-card hover:glass-card-active"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {/* Background Glow Effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ 
          background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)`,
          filter: 'blur(20px)'
        }}
      />

      {/* Icon Container */}
      <div className="relative h-16 w-16 mb-8 mx-auto transform group-hover:scale-110 transition-transform duration-300">
        <div 
          className="absolute inset-0 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"
          style={{ backgroundColor: skill.color }}
        />
        <div className="relative z-10 w-full h-full">
          <Image
            src={skill.icon}
            alt={skill.name}
            fill
            className="object-contain drop-shadow-2xl transform group-hover:rotate-12 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Skill Name */}
      <h3 className="text-xl font-bold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
        {skill.name}
      </h3>

      {/* Progress Bar (if level is provided) */}
      {skill.level && (
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full rounded-full"
            style={{ 
              backgroundColor: skill.color,
              width: `${skill.level}%` 
            }}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      )}

      {/* Description */}
      {skill.description && (
        <p className="text-sm text-gray-400 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {skill.description}
        </p>
      )}

      {/* Bottom Gradient Line */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity" 
        style={{ '--tw-gradient-via-color': skill.color } as React.CSSProperties}
      />
    </motion.div>
  )
} 