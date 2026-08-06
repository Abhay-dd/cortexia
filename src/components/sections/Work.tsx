"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ChevronRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  results: string[];
  status: string;
}

const PROJECTS: Project[] = [
  {
    id: "ai-tryon",
    title: "AI Virtual Try-On",
    category: "AI & Computer Vision",
    description: "Real-time computer vision and generative AI platform enabling photorealistic product previews for e-commerce.",
    problem: "Retailers experienced high return rates due to customer uncertainty around garment fit and appearance before purchase.",
    solution: "Engineered real-time body tracking, pose estimation, and neural rendering to generate photorealistic product overlays under 100ms.",
    technologies: ["Python", "TensorFlow", "PyTorch", "React", "WebGL", "AWS"],
    features: ["Real-Time Body Tracking", "Multi-Angle Pose Support", "Mobile-Optimized WebGL Pipeline", "Sub-100ms Rendering"],
    results: ["40% Reduction in Product Returns", "3.2× Conversion Rate Increase", "500k+ Monthly Active Users"],
    status: "Production",
  },
  {
    id: "automation-engine",
    title: "Enterprise Automation Engine",
    category: "Intelligent Automation",
    description: "Centralized workflow automation hub connecting legacy enterprise software with intelligent AI decision routing.",
    problem: "A logistics company wasted 200+ hours weekly manually translating data across 12 fragmented operational systems.",
    solution: "Built a unified automation engine with smart AI routing, multi-channel notification bots, and real-time telemetry dashboards.",
    technologies: ["Node.js", "Python", "PostgreSQL", "Redis", "Docker", "Kafka"],
    features: ["Visual Workflow Builder", "AI Routing Engine", "Real-Time Telemetry", "Multi-System Integration"],
    results: ["85% Manual Task Elimination", "$500K+ Annual Savings", "12 Systems Integrated"],
    status: "Production",
  },
  {
    id: "predictive-analytics",
    title: "Predictive Analytics Platform",
    category: "Software Engineering",
    description: "Executive decision platform combining live streaming analytics with AI-powered predictive insights and anomaly detection.",
    problem: "Global leadership needed unified real-time metrics across 40+ operational teams without manual reporting delays.",
    solution: "Designed a streaming data visualization platform with AI anomaly detection, natural language querying, and automated report generation.",
    technologies: ["Next.js", "TypeScript", "D3.js", "GraphQL", "ClickHouse", "AWS"],
    features: ["Live Streaming Dashboards", "AI Anomaly Detection", "Natural Language Queries", "Automated Executive Reports"],
    results: ["70% Faster Decision Velocity", "10,000+ Daily Active Users", "Zero Manual Reporting"],
    status: "Production",
  },
  {
    id: "real-estate",
    title: "Intelligent Real Estate Platform",
    category: "Software Engineering",
    description: "Property marketplace with automated AI valuation models, 3D interactive virtual tours, and intelligent lead routing.",
    problem: "Property developers faced fragmented listing systems and slow lead qualification with poor visualization tools.",
    solution: "Built an all-in-one property platform integrating automated valuation algorithms, WebGL 3D tours, and AI-powered lead scoring.",
    technologies: ["React", "Node.js", "MongoDB", "Three.js", "TensorFlow", "AWS"],
    features: ["AI Valuation Engine", "WebGL 3D Property Tours", "Automated Lead Scoring", "CRM Integration"],
    results: ["30% More Accurate Valuations", "5× Longer Viewing Sessions", "60% Lead Response Improvement"],
    status: "Production",
  },
];

const CATEGORIES = ["All", "AI & Computer Vision", "Intelligent Automation", "Software Engineering"];

export default function Work() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = category === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === category);

  return (
    <section id="work" className="section bg-[#0C1422]">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <div className="label mb-5">Featured Work</div>
            <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-bold text-white leading-[1.1] mb-3">
              Systems deployed in production.
            </h2>
            <p className="text-[#8896B0] font-light max-w-md">
              Real-world enterprise deployments with measurable outcomes.
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  category === c
                    ? "bg-[#E8611A] text-white shadow-[0_0_16px_rgba(232,97,26,0.4)]"
                    : "bg-[#1B2A4A] text-[#8896B0] hover:text-white hover:bg-[#243356] border border-white/[0.06]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onClick={() => setSelected(p)}
              className="card rounded-2xl p-7 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-mono text-[#E8611A] uppercase tracking-wider">{p.category}</span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono uppercase">{p.status}</span>
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#E8611A] transition-colors">
                {p.title}
              </h3>
              <p className="text-[#8896B0] text-sm font-light leading-relaxed mb-5">{p.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {p.technologies.slice(0, 4).map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-[11px] bg-[#1B2A4A] text-[#8896B0] border border-white/[0.06]">{t}</span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#8896B0] group-hover:text-[#E8611A] transition-colors">
                View Case Study
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#0C1422]/90 backdrop-blur-2xl" onClick={() => setSelected(null)} />
            <motion.div
              className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto card rounded-3xl p-8 border border-white/[0.1]"
              initial={{ scale: 0.93, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 16 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#8896B0] hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-xs font-mono text-[#E8611A] uppercase tracking-wider mb-1">{selected.category}</div>
              <h2 className="font-display text-2xl font-bold text-white mb-6">{selected.title}</h2>

              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-[#111D34] border border-white/[0.06]">
                  <div className="text-xs font-mono text-[#4F617A] uppercase mb-1.5">Challenge</div>
                  <p className="text-sm text-[#8896B0] font-light leading-relaxed">{selected.problem}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#111D34] border border-[#E8611A]/15">
                  <div className="text-xs font-mono text-[#E8611A] uppercase mb-1.5">Solution</div>
                  <p className="text-sm text-[#8896B0] font-light leading-relaxed">{selected.solution}</p>
                </div>

                <div>
                  <div className="text-xs font-mono text-[#4F617A] uppercase mb-3">Technologies</div>
                  <div className="flex flex-wrap gap-2">
                    {selected.technologies.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full text-xs bg-[#1B2A4A] text-[#8896B0] border border-white/[0.06]">{t}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-[#4F617A] uppercase mb-3">Key Features</div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selected.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-[#8896B0]">
                        <ChevronRight className="w-3 h-3 text-[#E8611A] flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-[#4F617A] uppercase mb-3">Verified Results</div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {selected.results.map((r) => (
                      <div key={r} className="p-3 rounded-xl bg-[#111D34] text-center border border-white/[0.06]">
                        <span className="text-xs font-semibold text-white">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
