"use client";

import { motion } from "framer-motion";

const STACK = [
  { name: "OpenAI", role: "LLMs & Foundation Models", color: "#10a37f" },
  { name: "AWS", role: "Cloud Infrastructure", color: "#FF9900" },
  { name: "Docker", role: "Containerization", color: "#2496ED" },
  { name: "Python", role: "AI & Deep Learning", color: "#3776AB" },
  { name: "Next.js", role: "Full-Stack Web", color: "#ffffff" },
  { name: "MongoDB", role: "High-Performance Data", color: "#47A248" },
];

export default function TechStack() {
  return (
    <section id="technology" className="section bg-[#0C1422]">
      <div className="container">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-14">
          <div>
            <div className="label mb-5">Engineering Stack</div>
            <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-bold text-white leading-[1.1]">
              Battle-tested enterprise technologies.
            </h2>
          </div>
          <div className="flex items-center">
            <p className="text-[#8896B0] font-light leading-relaxed">
              We leverage industry-standard infrastructure, battle-tested frameworks, and state-of-the-art
              AI research tooling to guarantee performance, security, and maintainability.
            </p>
          </div>
        </div>

        {/* Stack Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STACK.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="card rounded-2xl p-6 text-center group"
            >
              <div
                className="font-display text-lg font-bold mb-1 transition-colors duration-300"
                style={{ color: s.color }}
              >
                {s.name}
              </div>
              <div className="text-[10px] text-[#4F617A] font-medium uppercase tracking-wider leading-tight">
                {s.role}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
