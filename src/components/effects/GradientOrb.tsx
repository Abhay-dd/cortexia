"use client";

import { motion } from "framer-motion";

interface GradientOrbProps {
  className?: string;
  color1?: string;
  color2?: string;
  size?: number;
}

export default function GradientOrb({
  className = "",
  color1 = "rgba(37, 99, 235, 0.15)",
  color2 = "rgba(6, 182, 212, 0.1)",
  size = 500,
}: GradientOrbProps) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[100px] pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color1} 0%, ${color2} 50%, transparent 70%)`,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    />
  );
}
