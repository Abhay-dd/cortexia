"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Cpu, Rocket, Shield } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    number: "01",
    title: "Discovery & Strategy",
    duration: "Week 1–2",
    description: "We go deep into your business — your processes, your pain points, your goals. We come back with a precise technical blueprint that shows exactly what we'll build and why.",
    deliverable: "Technical Blueprint + ROI Projection",
    color: "#E8611A",
  },
  {
    icon: Cpu,
    number: "02",
    title: "Design & Engineering",
    duration: "Week 3–8",
    description: "Our engineers build your system in iterative sprints. You see progress every week. No black boxes. No surprises. You're involved at every milestone.",
    deliverable: "Working System + Weekly Demos",
    color: "#3B82F6",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Deploy & Launch",
    duration: "Week 8–10",
    description: "We deploy to production on your infrastructure — with zero downtime, full documentation, and team training so your people can actually use what we built.",
    deliverable: "Live System + Team Onboarding",
    color: "#8B5CF6",
  },
  {
    icon: Shield,
    number: "04",
    title: "Monitor & Optimize",
    duration: "Ongoing",
    description: "AI systems improve with data. We monitor performance, retrain models, push updates, and scale infrastructure as your business grows. We don't disappear after launch.",
    deliverable: "Monthly Reports + Continuous Improvement",
    color: "#10B981",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" className="section" style={{ background: "#04080F" }}>
      <div className="container" ref={ref}>

        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="label justify-center mb-5">How We Work</div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-bold text-white leading-[1.1] mb-4">
            From idea to production. <br />
            <span className="text-gradient-orange">In 10 weeks.</span>
          </h2>
          <p className="text-[#8896B0] font-light leading-relaxed">
            We move fast. We move right. No endless meetings.
            No scope creep. Just systems that work.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, rgba(232,97,26,0.5), rgba(59,130,246,0.3), rgba(139,92,246,0.3), rgba(16,185,129,0.3))" }} />

          <div className="space-y-12">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`grid lg:grid-cols-2 gap-8 items-center ${i % 2 === 0 ? "" : "lg:flex-row-reverse"}`}
              >
                {/* Left / Right content based on position */}
                <div className={`${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <div className="card rounded-2xl p-8 relative group" style={{
                    transform: "perspective(1000px)",
                    transition: "all 0.3s",
                  }}>
                    {/* Step glow */}
                    <div className="absolute top-0 left-0 w-full h-0.5 rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }} />

                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                        <step.icon className="w-5 h-5" style={{ color: step.color }} />
                      </div>
                      <div>
                        <div className="text-xs font-mono uppercase tracking-widest mb-0.5" style={{ color: step.color }}>
                          Phase {step.number} · {step.duration}
                        </div>
                        <h3 className="font-display text-lg font-bold text-white">{step.title}</h3>
                      </div>
                    </div>

                    <p className="text-[#8896B0] text-sm font-light leading-relaxed mb-5">{step.description}</p>

                    <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: `${step.color}08`, border: `1px solid ${step.color}20` }}>
                      <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: step.color }}>You Get:</span>
                      <span className="text-xs text-white font-medium">{step.deliverable}</span>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className={`hidden lg:flex items-center justify-center ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm z-10"
                    style={{ background: "#04080F", border: `2px solid ${step.color}`, color: step.color, boxShadow: `0 0 20px ${step.color}40` }}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.15 + 0.2, type: "spring" }}
                  >
                    {step.number}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom trust signals */}
        <motion.div
          className="mt-16 grid sm:grid-cols-3 gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {[
            { value: "10 weeks", label: "Average time to production", note: "Fastest in the industry" },
            { value: "Zero", label: "Failed production deployments", note: "100% delivery rate" },
            { value: "Week 1", label: "When you see first results", note: "Not after 6 months" },
          ].map((m) => (
            <div key={m.label} className="card p-6 rounded-2xl text-center">
              <div className="font-display text-3xl font-bold text-[#E8611A] mb-1">{m.value}</div>
              <div className="text-sm text-white font-medium mb-1">{m.label}</div>
              <div className="text-[10px] font-mono text-[#4F617A] uppercase tracking-wider">{m.note}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
