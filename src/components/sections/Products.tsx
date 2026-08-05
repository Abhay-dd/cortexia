"use client";

import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import GradientOrb from "@/components/effects/GradientOrb";

export default function Products() {
  return (
    <section id="products" className="relative section-padding overflow-hidden">
      <GradientOrb
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        color1="rgba(37,99,235,0.06)"
        color2="rgba(6,182,212,0.04)"
        size={600}
      />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight gradient-text">
              Products
            </h2>
          </motion.div>

          {/* Animated lock icon */}
          <motion.div
            className="mt-12 mb-10 flex justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              {/* Glow rings */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0 0px rgba(37, 99, 235, 0.15), 0 0 0 0px rgba(6, 182, 212, 0.1)",
                    "0 0 0 20px rgba(37, 99, 235, 0), 0 0 0 40px rgba(6, 182, 212, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0 0px rgba(6, 182, 212, 0.1)",
                    "0 0 0 30px rgba(6, 182, 212, 0)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />

              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Lock className="w-10 h-10 text-primary" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-xl sm:text-2xl font-heading font-semibold mb-4">
              Something extraordinary is in development.
            </p>
            <p className="text-muted leading-relaxed">
              We&apos;re building the next generation of AI products designed to transform businesses.
              Stay tuned for something that will redefine what&apos;s possible.
            </p>
          </motion.div>

          {/* Animated progress line */}
          <motion.div
            className="mt-12 mx-auto max-w-xs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="h-1 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary"
                style={{ backgroundSize: "200% 100%" }}
                animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Coming Soon</span>
            </div>
          </motion.div>

          {/* Floating particles around the section */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/40"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${15 + Math.random() * 70}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
