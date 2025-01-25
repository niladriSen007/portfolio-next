'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiMessageSquare, FiSend, FiUser } from 'react-icons/fi';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

 /*  const clearForm = () => {
    setFormState({
      name: '',
      email: '',
      message: ''
    })
    setErrors({})
    setSubmitStatus(null)
  } */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('https://formspree.io/f/xzblzgwq', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormState({
          name: '',
          email: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error : unknown) {
      setSubmitStatus(error instanceof Error ? 'error' : 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section
      id="contact"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Simplified background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-blue-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600"
          >
            Let&apos;s Build Something Amazing Together
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Have a project in mind? Let&apos;s discuss how we can help bring your ideas to life.
          </motion.p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          action="https://formspree.io/f/xzblzgwq"
          method="POST"
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto space-y-6 sm:space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <input type="hidden" name="_subject" value="New contact form submission" />
          <input type="hidden" name="_next" value="https://your-website.com/thank-you" />
          
          {/* Name Input */}
          <motion.div>
            <div className="relative group">
              <FiUser className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${errors.name ? 'text-red-500' : 'text-gray-400 group-focus-within:text-blue-500'}`} />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formState.name}
                onChange={(e) => {
                  setFormState(prev => ({ ...prev, name: e.target.value }))
                  if (errors.name) setErrors(prev => ({ ...prev, name: undefined }))
                }}
                className={`w-full px-12 py-4 bg-white/5 rounded-xl border focus:border-blue-500 outline-none transition-colors placeholder:text-gray-500 text-white group-hover:border-white/20 ${
                  errors.name ? 'border-red-500' : 'border-white/10'
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1 absolute -bottom-6 left-0">
                  {errors.name}
                </span>
              )}
            </div>
          </motion.div>

          {/* Email Input */}
          <motion.div>
            <div className="relative group">
              <FiMail className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-500' : 'text-gray-400 group-focus-within:text-blue-500'}`} />
              <input
                type="email"
                name="_replyto"
                placeholder="Your Email"
                value={formState.email}
                onChange={(e) => {
                  setFormState(prev => ({ ...prev, email: e.target.value }))
                  if (errors.email) setErrors(prev => ({ ...prev, email: undefined }))
                }}
                className={`w-full px-12 py-4 bg-white/5 rounded-xl border focus:border-blue-500 outline-none transition-colors placeholder:text-gray-500 text-white group-hover:border-white/20 ${
                  errors.email ? 'border-red-500' : 'border-white/10'
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 absolute -bottom-6 left-0">
                  {errors.email}
                </span>
              )}
            </div>
          </motion.div>

          {/* Message Input */}
          <motion.div>
            <div className="relative group">
              <FiMessageSquare className={`absolute left-3 top-6 transition-colors ${errors.message ? 'text-red-500' : 'text-gray-400 group-focus-within:text-blue-500'}`} />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formState.message}
                onChange={(e) => {
                  setFormState(prev => ({ ...prev, message: e.target.value }))
                  if (errors.message) setErrors(prev => ({ ...prev, message: undefined }))
                }}
                rows={5}
                className={`w-full px-12 py-4 bg-white/5 rounded-xl border focus:border-blue-500 outline-none transition-colors placeholder:text-gray-500 text-white group-hover:border-white/20 resize-none ${
                  errors.message ? 'border-red-500' : 'border-white/10'
                }`}
              />
              {errors.message && (
                <span className="text-red-500 text-sm mt-1 absolute -bottom-6 left-0">
                  {errors.message}
                </span>
              )}
            </div>
          </motion.div>

          {/* Status Message */}
          {submitStatus && (
            <div
              className={`text-center ${submitStatus === 'success' ? 'text-green-500' : 'text-red-500'}`}
            >
              {submitStatus === 'success' 
                ? 'Message sent successfully!' 
                : 'Failed to send message. Please try again.'}
            </div>
          )}

          {/* Submit Button */}
          <motion.div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative group overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </span>
            </button>
          </motion.div>
        </motion.form>
      </div>
    </motion.section>
  )
} 