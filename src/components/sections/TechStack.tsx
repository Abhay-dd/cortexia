"use client";

import { motion } from "framer-motion";

const STACK = [
  { name: "OpenAI", role: "LLMs & Foundation Models", accent: "#10A37F" },
  { name: "AWS", role: "Cloud Infrastructure", accent: "#FF9900" },
  { name: "Docker", role: "Containerization", accent: "#2496ED" },
  { name: "Python", role: "AI & Deep Learning", accent: "#3776AB" },
  { name: "Next.js", role: "Full-Stack Web", accent: "#FFFFFF" },
  { name: "MongoDB", role: "High-Throughput Data", accent: "#47A248" },
];

export default function TechStack() {
  return (
    <section id="technology" className="section bg-matrix" style={{ background: "#060A10" }}>
      <div className="container">

        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <div className="label-emerald mb-4">Infrastructure & Tools</div>
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold text-white leading-[1.08]">
              Engineered with <br />
              <span className="text-gradient-laser">Battle-Tested Tech.</span>
            </h2>
          </div>
          <div>
            <p className="text-[#8FA3BF] text-base font-light leading-relaxed">
              We build using industry-standard enterprise frameworks, zero-trust cloud infrastructure, 
              and state-of-the-art AI tooling to ensure lifetime stability and speed.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STACK.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-chrome rounded-2xl p-6 text-center group"
            >
              <div
                className="font-display text-xl font-bold mb-1 transition-transform group-hover:scale-105"
                style={{ color: item.accent }}
              >
                {item.name}
              </div>
              <div className="text-[10px] font-mono text-[#8FA3BF] uppercase tracking-wider">
                {item.role}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
