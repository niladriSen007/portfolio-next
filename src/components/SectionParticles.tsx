'use client'
import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import type { Engine } from "tsparticles-engine"

interface SectionParticlesProps {
  variant: "skills" | "projects" | "contact"
}

export default function SectionParticles({ variant }: SectionParticlesProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  const getParticlesConfig = (variant: string) => {
    const baseConfig = {
      fullScreen: false,
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "grab",
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          grab: {
            distance: 140,
            links: {
              opacity: 0.5,
            },
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.1,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
        },
        size: {
          value: { min: 1, max: 3 },
        },
        opacity: {
          value: { min: 0.1, max: 0.5 },
        },
      },
    }

    const variants = {
      skills: {
        particles: {
          ...baseConfig.particles,
          color: {
            value: ["#6366f1", "#8b5cf6"],
          },
          number: {
            value: 40,
            density: {
              enable: true,
              area: 800,
            },
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
        },
      },
      projects: {
        particles: {
          ...baseConfig.particles,
          color: {
            value: ["#06b6d4", "#3b82f6"],
          },
          number: {
            value: 30,
            density: {
              enable: true,
              area: 800,
            },
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
        },
      },
      contact: {
        particles: {
          ...baseConfig.particles,
          color: {
            value: ["#8b5cf6", "#ec4899"],
          },
          number: {
            value: 20,
            density: {
              enable: true,
              area: 800,
            },
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "out",
            },
          },
          shape: {
            type: "circle",
          },
        },
      },
    }

    return {
      ...baseConfig,
      ...variants[variant as keyof typeof variants],
    }
  }

  return (
    <Particles
      className="absolute inset-0"
      init={particlesInit}
      options={getParticlesConfig(variant)}
    />
  )
} 