"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check } from "lucide-react";

const PAINS = [
  "Spending 40+ hours/week on tasks that should be automated",
  "Your team manually copying data between systems all day",
  "Customer service overwhelmed, response times too slow",
  "Competitors are moving faster with AI — you're falling behind",
  "You know AI could help, but don't know where to start",
  "Hired developers, but the software never quite works right",
];

const GAINS = [
  "AI handles repetitive work autonomously, 24/7",
  "All your systems talk to each other intelligently",
  "Instant AI-powered customer responses, any scale",
  "You lead your market with a proprietary AI advantage",
  "We build the exact AI system your business needs",
  "Production software, built right. Delivered. Maintained.",
];

function FlipCard({ pain, gain, index }: { pain: string; gain: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Pain */}
      <div
        className="p-5 rounded-2xl border flex items-start gap-3"
        style={{
          background: "rgba(255,60,60,0.04)",
          borderColor: "rgba(255,60,60,0.12)",
        }}
      >
        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
          <X className="w-2.5 h-2.5 text-red-400" />
        </div>
        <p className="text-[#8896B0] text-sm font-light leading-relaxed">{pain}</p>
      </div>

      {/* Arrow */}
      <div className="flex items-center justify-center py-2">
        <motion.div
          className="w-px bg-gradient-to-b from-red-500/30 to-[#E8611A]/50"
          style={{ height: 20 }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.08 + 0.3 }}
        />
      </div>

      {/* Gain */}
      <div
        className="p-5 rounded-2xl border flex items-start gap-3"
        style={{
          background: "rgba(232,97,26,0.05)",
          borderColor: "rgba(232,97,26,0.2)",
        }}
      >
        <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
          style={{ background: "rgba(232,97,26,0.2)" }}>
          <Check className="w-2.5 h-2.5 text-[#E8611A]" />
        </div>
        <p className="text-white text-sm font-medium leading-relaxed">{gain}</p>
      </div>
    </motion.div>
  );
}

export default function Problem() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true });

  return (
    <section id="problem" className="section" style={{ background: "#070E1A" }}>
      <div className="container">

        {/* Header */}
        <div ref={headRef} className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            className="label justify-center mb-5"
            initial={{ opacity: 0 }} animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            The Transformation
          </motion.div>
          <motion.h2
            className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-white leading-[1.1] mb-4"
            initial={{ opacity: 0, y: 20 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            You have a problem. <br />
            <span className="text-gradient-orange">We have a solution.</span>
          </motion.h2>
          <motion.p
            className="text-[#8896B0] font-light leading-relaxed text-base"
            initial={{ opacity: 0, y: 16 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Every business we&apos;ve worked with had these exact frustrations before working with us.
            Here&apos;s what we turn them into.
          </motion.p>
        </div>

        {/* Column headers */}
        <div className="grid lg:grid-cols-6 gap-6 mb-4">
          <div className="lg:col-span-6 grid grid-cols-1 gap-2">
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="flex items-center gap-2 px-2">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-xs font-mono text-[#4F617A] uppercase tracking-wider">Before Cortexia AI</span>
              </div>
              <div className="flex items-center gap-2 px-2">
                <div className="w-2 h-2 rounded-full bg-[#E8611A]" />
                <span className="text-xs font-mono text-[#E8611A] uppercase tracking-wider">After Cortexia AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pain → Gain grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAINS.map((p, i) => (
            <FlipCard key={i} pain={p} gain={GAINS[i]} index={i} />
          ))}
        </div>

        {/* Bottom CTA bar */}
        <motion.div
          className="mt-14 p-8 rounded-3xl text-center"
          style={{ background: "linear-gradient(135deg, rgba(232,97,26,0.08) 0%, rgba(27,42,74,0.3) 100%)", border: "1px solid rgba(232,97,26,0.2)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs font-mono text-[#E8611A] uppercase tracking-widest mb-3">The Cortexia Guarantee</div>
          <h3 className="font-display text-xl font-bold text-white mb-2">
            If we can&apos;t solve your problem with AI, we&apos;ll tell you upfront.
          </h3>
          <p className="text-[#8896B0] text-sm font-light">
            We do a free technical discovery session before any engagement. No pressure. No wasted time.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
