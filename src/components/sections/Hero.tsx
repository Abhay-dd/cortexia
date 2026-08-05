"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { TRUST_INDICATORS } from "@/lib/constants";
import GradientOrb from "@/components/effects/GradientOrb";

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient orbs */}
      <GradientOrb className="-top-40 -left-40 z-0" color1="rgba(37,99,235,0.12)" color2="rgba(6,182,212,0.06)" size={600} />
      <GradientOrb className="-bottom-40 -right-40 z-0" color1="rgba(6,182,212,0.1)" color2="rgba(37,99,235,0.05)" size={500} />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-custom relative z-10 pt-32 pb-20 text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/40 backdrop-blur-sm text-xs text-muted mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
          AI-Powered Solutions for Modern Businesses
        </motion.div>

        {/* Headline */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
          {["Engineering", "Intelligence."].map((word, i) => (
            <motion.span
              key={word}
              className={i === 1 ? "gradient-text-animated" : "text-foreground"}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
            >
              {word}{" "}
            </motion.span>
          ))}
          <br className="hidden sm:block" />
          {["Empowering", "Businesses."].map((word, i) => (
            <motion.span
              key={word}
              className={i === 1 ? "gradient-text-animated" : "text-foreground"}
              custom={i + 2}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
            >
              {word}{" "}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          className="mt-6 text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          We build AI solutions, intelligent automation, modern software, and scalable digital
          platforms that help businesses innovate faster.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <button
            onClick={() => handleNavClick("#services")}
            className="group flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all duration-300"
          >
            Explore Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => handleNavClick("#work")}
            className="group flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium border border-border text-muted hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
          >
            View Our Work
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* AI Visualization */}
        <motion.div
          className="mt-20 relative mx-auto max-w-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-8 overflow-hidden">
            {/* Animated neural network visualization */}
            <svg
              viewBox="0 0 800 300"
              className="w-full h-auto"
              aria-hidden="true"
            >
              {/* Connection lines */}
              {[
                [100, 75, 300, 50], [100, 75, 300, 150], [100, 75, 300, 250],
                [100, 150, 300, 50], [100, 150, 300, 150], [100, 150, 300, 250],
                [100, 225, 300, 50], [100, 225, 300, 150], [100, 225, 300, 250],
                [300, 50, 500, 100], [300, 50, 500, 200],
                [300, 150, 500, 100], [300, 150, 500, 200],
                [300, 250, 500, 100], [300, 250, 500, 200],
                [500, 100, 700, 150], [500, 200, 700, 150],
              ].map(([x1, y1, x2, y2], i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.3 + i * 0.05, duration: 0.6 }}
                />
              ))}

              {/* Nodes */}
              {[
                [100, 75], [100, 150], [100, 225],
                [300, 50], [300, 150], [300, 250],
                [500, 100], [500, 200],
                [700, 150],
              ].map(([cx, cy], i) => (
                <motion.circle
                  key={`node-${i}`}
                  cx={cx} cy={cy} r="8"
                  fill="url(#nodeGradient)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.5 + i * 0.08, duration: 0.3 }}
                >
                  <animate attributeName="r" values="8;10;8" dur="3s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                </motion.circle>
              ))}

              {/* Pulse along connections */}
              {[
                [100, 150, 500, 100], [300, 50, 700, 150], [100, 225, 500, 200]
              ].map(([x1, y1, x2, y2], i) => (
                <motion.circle
                  key={`pulse-${i}`}
                  r="3"
                  fill="#06b6d4"
                  opacity="0.8"
                >
                  <animateMotion
                    dur={`${3 + i}s`}
                    repeatCount="indefinite"
                    path={`M${x1},${y1} L${x2},${y2}`}
                  />
                </motion.circle>
              ))}

              {/* Gradients */}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <radialGradient id="nodeGradient">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#2563eb" />
                </radialGradient>
              </defs>
            </svg>

            {/* Labels */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-between px-8 text-[10px] sm:text-xs text-muted">
              <span>Input Layer</span>
              <span>Hidden Layers</span>
              <span>Output</span>
            </div>

            {/* Glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          {TRUST_INDICATORS.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border bg-card/20 hover:border-primary/20 hover:bg-card/40 transition-all duration-300 group"
              whileHover={{ y: -2 }}
            >
              <item.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
              <span className="text-sm text-muted group-hover:text-foreground transition-colors">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}
