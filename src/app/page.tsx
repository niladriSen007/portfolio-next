"use client"
import AnimatedBackground from "@/components/AnimatedBackground"
import ContactParticles from "@/components/ContactParticles"
import LightningEffect from "@/components/LightningEffect"
import LoadingState from "@/components/LoadingState"
import ProjectCard from "@/components/ProjectCard"
import SkillCard from "@/components/SkillCard"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import Link from "next/link"
import React, { useCallback, useState, useEffect } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"

// Dynamically import heavy components
const ContactSectionDynamic = dynamic(
  () => import("@/components/ContactSection").then((mod) => mod.default),
  {
    loading: () => <LoadingState />,
    ssr: false,
  }
)

const GlobeDemoDynamic = dynamic(
  () => import("@/components/GlobeDemo").then((mod) => mod.GlobeDemo),
  {
    loading: () => <LoadingState />,
    ssr: false,
  }
)

// Use React.memo for static components
const SkillCardMemo = React.memo(SkillCard)

export default function Home() {
  // Particle background initialization
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine)
  }, [])

  // Animation variants
/*   const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  } */

/*   const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  } */

  const skills = [
    {
      name: "JavaScript",
      icon: "/icons/javascript.svg",
      color: "#F7DF1E",
      level: 90,
      description: "Modern ES6+, async/await, functional programming",
    },
    {
      name: "Java",
      icon: "/icons/java.svg",
      color: "#E32C2E",
      level: 95,
      description: "Core Java, Collections, Multithreading, JVM Optimization",
    },
    {
      name: "Spring Boot",
      icon: "/icons/spring.svg",
      color: "#6DB33F",
      level: 92,
      description: "Microservices, REST APIs, JPA/Hibernate, Spring Cloud",
    },
    {
      name: "Spring Security",
      icon: "/icons/spring-security.svg",
      color: "#6CB52D",
      level: 88,
      description: "OAuth2, JWT, Role-based Auth, Security Best Practices",
    },
    {
      name: "React",
      icon: "/icons/react.svg",
      color: "#61DAFB",
      level: 95,
      description: "Next.js, Redux, React Query, Custom Hooks",
    },
    {
      name: "Node.js",
      icon: "/icons/nodejs.svg",
      color: "#339933",
      level: 85,
      description: "Express, REST APIs, GraphQL, Microservices",
    },
    {
      name: "TypeScript",
      icon: "/icons/typescript.svg",
      color: "#3178C6",
      level: 88,
      description: "Type safety, interfaces, generics, decorators",
    },
    {
      name: "Terraform",
      icon: "/icons/terraform.svg",
      color: "#7B42BC",
      level: 82,
      description: "IaC, AWS/GCP Infrastructure, State Management",
    },
    {
      name: "MongoDB",
      icon: "/icons/mongodb.svg",
      color: "#47A248",
      level: 82,
      description: "Schema design, aggregation, indexing",
    },
    {
      name: "PostgreSQL",
      icon: "/icons/postgresql.svg",
      color: "#4169E1",
      level: 80,
      description: "Complex queries, optimization, migrations",
    },
    {
      name: "Docker",
      icon: "/icons/docker.svg",
      color: "#2496ED",
      level: 75,
      description: "Containerization, Docker Compose, deployment",
    },
    {
      name: "AWS",
      icon: "/icons/aws.svg",
      color: "#FF9900",
      level: 78,
      description: "EC2, S3, Lambda, CloudFormation",
    },
  ]

  const projects = [
    {
      title: "Enterprise Microservices Platform",
      description:
        "A scalable microservices architecture built with Spring Boot and React, handling millions of transactions daily.",
      image: "/projects/microservices.svg",
      tags: ["Spring Boot", "React", "AWS", "Kubernetes"],
      links: {
        github: "https://github.com/yourusername/project1",
        live: "https://project1.com",
      },
      highlights: [
        "Microservices Architecture",
        "Event-Driven Design",
        "CI/CD Pipeline",
        "Cloud Native",
      ],
    },
    {
      title: "AI-Powered Analytics Dashboard",
      description:
        "Real-time analytics platform with machine learning capabilities for predictive insights.",
      image: "/projects/ai-analytics.svg",
      tags: ["TypeScript", "Python", "TensorFlow", "MongoDB"],
      links: {
        github: "https://github.com/yourusername/project2",
        live: "https://project2.com",
      },
      highlights: [
        "Real-time Analytics",
        "Machine Learning",
        "Interactive Visualizations",
        "Scalable Backend",
      ],
    },
    {
      title: "Cloud Infrastructure Automation",
      description:
        "Infrastructure as Code solution for automated cloud resource management and deployment.",
      image: "/projects/cloud-infra.svg",
      tags: ["Terraform", "AWS", "Docker", "Jenkins"],
      links: {
        github: "https://github.com/yourusername/project3",
        live: "https://project3.com",
      },
      highlights: [
        "Infrastructure as Code",
        "Multi-cloud Support",
        "Automated Deployment",
        "Security Best Practices",
      ],
    },
  ]

  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      setIsVisible(scrolled < 1000) // Only show particles in first 1000px
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0A0A0A] enhanced-bg">
      <LightningEffect />
      {isVisible && <AnimatedBackground />}

      {/* Enhanced Particle Background */}
      <Particles
        className="absolute inset-0"
        init={particlesInit}
        options={{
          fullScreen: false,
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#6366f1", "#8b5cf6", "#3b82f6"],
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/50 to-[#0A0A0A] pointer-events-none" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-20 lg:py-0">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative order-2 lg:order-1 col-span-2 lg:col-span-1"
            >
              {/* Floating Elements */}
              <div className="absolute -left-20 -top-20 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-slow" />
              <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-slow animation-delay-2000" />

              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -left-10 -top-10 w-20 h-20"
                >
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-lg animate-pulse-slow" />
                    {/*  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-70 animate-spin-slow" style={{ animationDuration: '10s' }} />  */}
                  </div>
                </motion.div>

                <motion.span
                  className="text-blue-500 text-lg sm:text-xl font-semibold mb-4 block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  👋 Hello, I&apos;m NILADRI
                </motion.span>

                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Building
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 inline-block"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    {" "}
                    Digital Experiences{" "}
                  </motion.span>
                  That Matters
                </motion.h1>

                {/* Interactive CTA Buttons */}
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href="#projects"
                    className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden rounded-full"
                  >
                    <div className="absolute inset-0 w-full h-full transition duration-300 group-hover:scale-105">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="relative text-white group-hover:text-white flex items-center gap-2">
                      View My Work
                      <motion.span
                        initial={{ x: 0 }}
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </Link>

                  <Link
                    href="#contact"
                    className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden rounded-full bg-transparent border-2 border-white/10"
                  >
                    <div className="absolute inset-0 w-0 bg-white/5 transition-all duration-300 group-hover:w-full" />
                    <span className="relative text-white group-hover:text-white">
                      Contact Me
                    </span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Globe Demo - Hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="hidden md:block md:order-2 w-full mx-auto relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl" />
              <GlobeDemoDynamic />
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 relative"
          >
            <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600">
              Skills & Technologies
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              A curated stack of modern technologies I use to build amazing
              digital experiences
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto skill-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <SkillCardMemo skill={skill} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-16 relative overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16 relative"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed">
              Showcasing some of my best work and technical achievements
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Contact Section with enhanced form styling */}
        <section className="py-20 relative overflow-hidden">
          {/* Add the particles component */}
          <div className="absolute inset-0 z-0">
            <ContactParticles />
          </div>

          {/* Add a gradient overlay to soften the particles */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] z-10" />

          {/* Contact section content with higher z-index */}
          <div className="relative z-20">
            <ContactSectionDynamic />
          </div>
        </section>
      </div>
    </main>
  )
}
