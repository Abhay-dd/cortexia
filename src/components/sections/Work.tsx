"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ChevronRight, Activity, ShieldCheck, Zap } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  features: string[];
  results: string[];
  status: string;
}

const PROJECTS: Project[] = [
  {
    id: "ai-tryon",
    title: "Real-Time Neural Vision Engine",
    category: "AI & Computer Vision",
    description: "Sub-100ms computer vision and neural rendering pipeline for instant photorealistic product synthesis.",
    challenge: "High customer return rates due to uncertainty around product fit and appearance prior to purchase.",
    solution: "Engineered real-time body tracking, neural mesh distortion, and GPU-accelerated rendering under 80ms.",
    technologies: ["PyTorch", "TensorFlow", "WebGL", "Next.js", "AWS CUDA"],
    features: ["Sub-80ms Neural Rendering", "Real-Time Body Pose Estimation", "Mobile GPU Optimization", "WebGL Pipeline"],
    results: ["40% Reduction in Return Rates", "3.2× Conversion Multiplier", "500k+ Monthly Active Users"],
    status: "Production Live",
  },
  {
    id: "automation-engine",
    title: "Autonomous Enterprise Workflow Engine",
    category: "Intelligent Automation",
    description: "Centralized multi-agent orchestration hub connecting 12 legacy enterprise systems with autonomous decision routing.",
    challenge: "Over 200 hours wasted weekly manually extracting, transforming, and transferring data between disconnected systems.",
    solution: "Architected a unified AI orchestration engine with automated exception handling, SLA monitoring, and Slack bots.",
    technologies: ["Node.js", "Python", "Redis", "Kafka", "PostgreSQL", "Docker"],
    features: ["Multi-Agent Orchestration", "AI Decision Routing", "Real-Time Telemetry Dashboard", "Zero-Downtime Pipeline"],
    results: ["85% Manual Task Elimination", "$500K+ Annual Cost Savings", "12 Systems Integrated"],
    status: "Production Live",
  },
  {
    id: "predictive-analytics",
    title: "Executive Predictive Analytics Platform",
    category: "Software Engineering",
    description: "Streaming telemetry analytics platform combining real-time data visualizers with AI anomaly detection.",
    challenge: "Leadership lacked real-time visibility across 40+ operational teams, relying on delayed manual weekly reports.",
    solution: "Built a streaming data engine with ClickHouse and Next.js, featuring automated AI anomaly alerts and natural language querying.",
    technologies: ["Next.js", "TypeScript", "ClickHouse", "GraphQL", "D3.js", "AWS"],
    features: ["Streaming Real-Time Dashboards", "AI Anomaly Detection", "Natural Language Data Querying", "Automated Executive Briefings"],
    results: ["70% Faster Executive Decisions", "10,000+ Daily Active Users", "Zero Manual Reporting"],
    status: "Production Live",
  },
  {
    id: "real-estate",
    title: "Intelligent Property Valuation Engine",
    category: "Software Engineering",
    description: "Automated real estate platform with AI valuation algorithms, WebGL 3D property tours, and automated lead routing.",
    challenge: "Fragmented property listings and slow manual lead qualification leading to poor conversion rates.",
    solution: "Deployed ML valuation algorithms, 3D WebGL tour renders, and intelligent AI lead scoring pipelines.",
    technologies: ["React", "Three.js", "Node.js", "MongoDB", "TensorFlow", "AWS"],
    features: ["AI Valuation Algorithms", "WebGL 3D Interactive Tours", "Automated Lead Scoring", "CRM Auto-Sync"],
    results: ["30% Higher Valuation Accuracy", "5× Session Duration Increase", "60% Lead Velocity Boost"],
    status: "Production Live",
  },
];

const CATEGORIES = ["All Systems", "AI & Computer Vision", "Intelligent Automation", "Software Engineering"];

export default function Work() {
  const [selectedCategory, setSelectedCategory] = useState("All Systems");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filtered = selectedCategory === "All Systems"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="work" className="section bg-matrix" style={{ background: "#060A10" }}>
      <div className="container">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="label-emerald mb-4">Case Studies</div>
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold text-white leading-[1.08]">
              Deployed Enterprise <br />
              <span className="text-gradient-laser">Proven Outcomes.</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#00FF9D] text-black shadow-[0_0_20px_rgba(0,255,157,0.4)]"
                    : "card-chrome text-[#8FA3BF] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setActiveProject(project)}
              className="card-chrome rounded-3xl p-8 cursor-pointer group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#00FF9D] uppercase tracking-wider font-bold">
                  {project.category}
                </span>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D]/30 uppercase font-semibold">
                  {project.status}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-[#00FF9D] transition-colors">
                {project.title}
              </h3>

              <p className="text-[#8FA3BF] text-sm font-light leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full text-[11px] font-mono bg-[#060A10] text-[#8FA3BF] border border-white/10">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-[#00FF9D] group-hover:translate-x-1 transition-transform">
                Read Deep Dive Case Study
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Case Study Detailed Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#060A10]/90 backdrop-blur-3xl" onClick={() => setActiveProject(null)} />
            
            <motion.div
              className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto card-chrome rounded-3xl p-8 border-[#00FF9D]/30"
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
            >
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#8FA3BF] hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-xs font-mono text-[#00FF9D] uppercase tracking-wider mb-1 font-bold">
                {activeProject.category}
              </div>
              <h2 className="font-display text-3xl font-extrabold text-white mb-6">
                {activeProject.title}
              </h2>

              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-[#060A10] border border-white/10">
                  <div className="text-xs font-mono text-[#8FA3BF] uppercase tracking-wider mb-2">Challenge</div>
                  <p className="text-sm text-[#8FA3BF] font-light leading-relaxed">{activeProject.challenge}</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#00FF9D]/5 border border-[#00FF9D]/20">
                  <div className="text-xs font-mono text-[#00FF9D] uppercase tracking-wider mb-2 font-bold">Architectural Solution</div>
                  <p className="text-sm text-white font-medium leading-relaxed">{activeProject.solution}</p>
                </div>

                <div>
                  <div className="text-xs font-mono text-[#8FA3BF] uppercase tracking-wider mb-3">Technologies Leveraged</div>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((t) => (
                      <span key={t} className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-[#0B121E] text-[#00FF9D] border border-[#00FF9D]/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-[#8FA3BF] uppercase tracking-wider mb-3">Verified Results</div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {activeProject.results.map((res) => (
                      <div key={res} className="p-4 rounded-2xl bg-[#0B121E] text-center border border-[rgba(0,255,157,0.15)]">
                        <span className="text-xs font-bold text-white leading-tight block">{res}</span>
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
