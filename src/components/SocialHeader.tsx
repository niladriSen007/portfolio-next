'use client'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const socialLinks = [
  {
    name: 'GitHub',
    icon: <FaGithub className="w-6 h-6" />,
    url: 'https://github.com/niladriSen007',
    color: 'from-gray-400 to-gray-600'
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedin className="w-6 h-6" />,
    url: 'https://www.linkedin.com/in/niladri-sen',
    color: 'from-blue-400 to-blue-600'
  }
]

export default function SocialHeader() {
  return (
    <motion.div 
      className="fixed top-4 right-4 z-50 flex gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {socialLinks.map((social) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="relative p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 
                     text-white/90 hover:text-white transition-all duration-300
                     hover:border-white/20 hover:bg-white/10"
            whileHover={{
              boxShadow: '0 0 20px rgba(99,102,241,0.3)',
            }}
          >
            {social.icon}
            
            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 
                           text-white text-xs rounded opacity-0 group-hover:opacity-100 
                           transition-opacity whitespace-nowrap">
              {social.name}
            </span>
          </motion.div>
        </motion.a>
      ))}
    </motion.div>
  )
} 