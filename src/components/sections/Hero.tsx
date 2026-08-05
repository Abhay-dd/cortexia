"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Activity, Cpu, Sparkles, Database, Layers, Server } from "lucide-react";
import GradientOrb from "@/components/effects/GradientOrb";

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const TRUSTED_TECHS = [
  { name: "OpenAI", category: "LLM & AI Models" },
  { name: "AWS", category: "Cloud Infrastructure" },
  { name: "Docker", category: "Containerization" },
  { name: "Python", category: "AI & Data Science" },
  { name: "Next.js", category: "Full-Stack Web" },
  { name: "MongoDB", category: "Scalable Data" },
];

export default function Hero() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-16"
    >
      {/* Ambient Gradient Orbs */}
      <GradientOrb className="-top-40 -left-40 z-0" color1="rgba(37,99,235,0.15)" color2="rgba(6,182,212,0.08)" size={650} />
      <GradientOrb className="top-1/3 -right-40 z-0" color1="rgba(6,182,212,0.12)" color2="rgba(37,99,235,0.06)" size={550} />

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-custom relative z-10 my-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Copy & CTAs */}
          <div className="lg:col-span-7 text-left">
            {/* Small Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md text-xs font-medium text-accent mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              AI-Powered Enterprise Solutions
            </motion.div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
              {["Engineering", "Intelligence."].map((word, i) => (
                <motion.span
                  key={word}
                  className={i === 1 ? "gradient-text-animated block sm:inline" : "text-foreground"}
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
                  className={i === 1 ? "gradient-text-animated block sm:inline" : "text-foreground"}
                  custom={i + 2}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </h1>

            {/* Beautiful Paragraph */}
            <motion.p
              className="text-muted text-lg md:text-xl max-w-xl leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              We build custom AI solutions, intelligent automation engines, modern cloud software, 
              and enterprise digital platforms that help businesses innovate faster and scale effortlessly.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <button
                onClick={() => handleNavClick("#services")}
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold bg-gradient-to-r from-primary to-primary-light text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] hover:scale-[1.02] transition-all duration-300"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleNavClick("#work")}
                className="group flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-border bg-card/40 backdrop-blur-md text-foreground hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
              >
                View Our Work
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Animated AI Brain / Dashboard */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div
              className="relative mx-auto max-w-md lg:max-w-none"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            >
              {/* Outer Card Glass Container */}
              <div className="relative rounded-3xl border border-border bg-card/50 backdrop-blur-xl p-6 shadow-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 group">
                
                {/* Header of AI Dashboard Card */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-xs font-mono text-muted">cortexia-core-engine.v2.4</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                </div>

                {/* Interactive AI Brain SVG Visualization */}
                <div className="relative h-64 sm:h-72 w-full flex items-center justify-center">
                  <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
                    {/* Background Grid Lines */}
                    <path d="M 50 150 Q 200 50 350 150 Q 200 250 50 150 Z" fill="none" stroke="rgba(37,99,235,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="200" cy="150" r="90" fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="1" />
                    <circle cx="200" cy="150" r="50" fill="none" stroke="rgba(37,99,235,0.2)" strokeWidth="1" />

                    {/* Animated Neural Connections */}
                    {[
                      [200, 60, 130, 110], [200, 60, 270, 110], [130, 110, 150, 190],
                      [270, 110, 250, 190], [150, 190, 200, 240], [250, 190, 200, 240],
                      [130, 110, 270, 110], [150, 190, 250, 190], [200, 60, 200, 240]
                    ].map(([x1, y1, x2, y2], i) => (
                      <motion.line
                        key={`brain-line-${i}`}
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="url(#brainGradient)"
                        strokeWidth="1.5"
                        strokeOpacity="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.6 + i * 0.05, duration: 0.8 }}
                      />
                    ))}

                    {/* Floating Brain Nodes */}
                    {[
                      [200, 60], [130, 110], [270, 110],
                      [200, 150], [150, 190], [250, 190], [200, 240]
                    ].map(([cx, cy], i) => (
                      <g key={`brain-node-${i}`}>
                        <circle cx={cx} cy={cy} r="6" fill="#06b6d4" opacity="0.9">
                          <animate attributeName="r" values="5;7;5" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                        </circle>
                        <circle cx={cx} cy={cy} r="12" fill="none" stroke="#2563eb" strokeWidth="1" opacity="0.4">
                          <animate attributeName="r" values="10;16;10" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                        </circle>
                      </g>
                    ))}

                    {/* Data Pulses Travelling */}
                    {[
                      "M 200 60 L 130 110 L 150 190 L 200 240",
                      "M 200 60 L 270 110 L 250 190 L 200 240",
                      "M 130 110 L 270 110 L 250 190 L 150 190 Z"
                    ].map((path, i) => (
                      <circle key={`pulse-${i}`} r="3" fill="#ffffff">
                        <animateMotion dur={`${2.5 + i}s`} repeatCount="indefinite" path={path} />
                      </circle>
                    ))}

                    <defs>
                      <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Floating Metric Badges */}
                  <motion.div
                    className="absolute top-2 left-2 glass rounded-xl p-2.5 border border-white/10 flex items-center gap-2 shadow-lg"
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-muted">Model Latency</div>
                      <div className="text-xs font-mono font-bold text-foreground">12ms (99.9%)</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-2 right-2 glass rounded-xl p-2.5 border border-white/10 flex items-center gap-2 shadow-lg"
                    animate={{ y: [4, -4, 4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <div className="w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-muted">Active AI Agents</div>
                      <div className="text-xs font-mono font-bold text-accent">24 Workflows</div>
                    </div>
                  </motion.div>
                </div>

                {/* Footer Metrics Row */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/60 text-center">
                  <div className="bg-background/40 rounded-xl p-2 border border-border/40">
                    <div className="text-[10px] text-muted font-mono">Accuracy</div>
                    <div className="text-sm font-bold text-foreground">99.4%</div>
                  </div>
                  <div className="bg-background/40 rounded-xl p-2 border border-border/40">
                    <div className="text-[10px] text-muted font-mono">Tokens/sec</div>
                    <div className="text-sm font-bold text-accent">14.2k</div>
                  </div>
                  <div className="bg-background/40 rounded-xl p-2 border border-border/40">
                    <div className="text-[10px] text-muted font-mono">Uptime</div>
                    <div className="text-sm font-bold text-emerald-400">99.99%</div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>

        {/* BOTTOM SECTION: Trusted Technologies */}
        <motion.div
          className="mt-20 pt-10 border-t border-border/60 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <p className="text-xs font-mono uppercase tracking-widest text-muted mb-8">
            Engineered with Modern Technologies
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {TRUSTED_TECHS.map((tech) => (
              <motion.div
                key={tech.name}
                className="group relative flex flex-col items-center justify-center p-3.5 rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-card/60 transition-all duration-300"
                whileHover={{ y: -3 }}
              >
                <span className="font-heading font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
                <span className="text-[10px] text-muted font-mono mt-0.5">
                  {tech.category}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
