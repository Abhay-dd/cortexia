"use client";

import { motion } from "framer-motion";

const shapes = [
  { size: 60, x: "10%", y: "20%", delay: 0, duration: 7, color: "rgba(37, 99, 235, 0.08)" },
  { size: 40, x: "80%", y: "15%", delay: 1, duration: 9, color: "rgba(6, 182, 212, 0.06)" },
  { size: 80, x: "70%", y: "60%", delay: 2, duration: 8, color: "rgba(37, 99, 235, 0.05)" },
  { size: 50, x: "20%", y: "70%", delay: 0.5, duration: 10, color: "rgba(6, 182, 212, 0.07)" },
  { size: 35, x: "50%", y: "40%", delay: 3, duration: 7, color: "rgba(37, 99, 235, 0.06)" },
  { size: 70, x: "90%", y: "80%", delay: 1.5, duration: 11, color: "rgba(6, 182, 212, 0.04)" },
];

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: shape.color,
            border: `1px solid ${shape.color}`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
