"use client"
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const Background = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Dark gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-700 via-neutral-950 to-purple-900" />
      
      {/* Animated gradient meshes */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_200px,#9333EA,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_80%_500px,#7E22CE,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_20%_400px,#6B21A8,transparent)]" />
      </div>

      {/* Responsive floating orbs */}
      <motion.div
        className="absolute w-[900px] h-[900px] bg-purple-600/20 rounded-full blur-[140px]"
        animate={{
          x: [mousePosition.x * 0.02, mousePosition.x * -0.02],
          y: [mousePosition.y * 0.02, mousePosition.y * -0.02],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute w-[700px] h-[700px] bg-violet-500/20 rounded-full blur-[130px]"
        animate={{
          x: [mousePosition.x * -0.02, mousePosition.x * 0.02],
          y: [mousePosition.y * -0.02, mousePosition.y * 0.02],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Additional purple orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-800/30 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Enhanced grid with fade */}
      <div className="absolute inset-0 mask-radial-faded">
        <div className="h-full w-full bg-grid opacity-15" />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.015]" />

      {/* Gradient borders */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-700/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-600/30 to-transparent" />
      
      {/* Glowing corners */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-700 rounded-full blur-[120px] opacity-20" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-800 rounded-full blur-[120px] opacity-20" />
    </div>
  )
}
