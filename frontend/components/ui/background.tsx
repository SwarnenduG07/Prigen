"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Background = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Dark gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-neutral-900" />

      {/* Animated gradient meshes */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3B82F6,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_80%_500px,#A855F7,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_20%_400px,#EC4899,transparent)]" />
      </div>

      {/* Responsive floating orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px]"
        animate={{
          x: [mousePosition.x * 0.02, mousePosition.x * -0.02],
          y: [mousePosition.y * 0.02, mousePosition.y * -0.02],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"
        animate={{
          x: [mousePosition.x * -0.02, mousePosition.x * 0.02],
          y: [mousePosition.y * -0.02, mousePosition.y * 0.02],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Enhanced grid with fade */}
      <div className="absolute inset-0 mask-radial-faded">
        <div className="h-full w-full bg-grid opacity-20" />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-5" />

      {/* Gradient borders */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* Glowing corners */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[100px]" />
    </div>
  );
};
