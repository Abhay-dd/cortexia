"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ChevronRight, Activity, Layers } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES, type Project } from "@/lib/constants";

export default function Work() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="relative py-32 bg-[#030611] overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Index Marker */}
        <motion.div
          className="flex items-center gap-4 mb-16 text-xs font-mono text-blue-400 tracking-widest uppercase"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span>04</span>
          <span className="w-8 h-px bg-blue-500/40" />
          <span>CASE STUDIES & PRODUCTION SYSTEMS</span>
        </motion.div>

        {/* Section Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Selected Systems in Production.
            </h2>
            <p className="text-slate-400 text-lg font-light max-w-xl">
              Proven deployments delivering measurable scale and operational performance.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-white text-black font-semibold shadow-lg"
                    : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Immersive Case Study Showcase Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer glass-panel rounded-3xl p-8 border border-white/10 hover:border-blue-500/40 transition-all duration-500 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {project.status}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed mb-8">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-[11px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Luxury Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-[#030611]/90 backdrop-blur-2xl"
              onClick={() => setSelectedProject(null)}
            />

            <motion.div
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto glass-panel rounded-3xl p-8 sm:p-12 border border-white/15 shadow-2xl z-10"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">
                  {selectedProject.category} SPECIFICATION
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
                  {selectedProject.title}
                </h2>
              </div>

              <div className="space-y-8 text-slate-300">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <h3 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">The Operational Challenge</h3>
                  <p className="text-sm font-light leading-relaxed">{selectedProject.problem}</p>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <h3 className="font-mono text-xs text-blue-400 uppercase tracking-wider mb-2">Architectural Solution</h3>
                  <p className="text-sm font-light leading-relaxed">{selectedProject.solution}</p>
                </div>

                <div>
                  <h3 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-3">Technologies Employed</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((t) => (
                      <span key={t} className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-3">Key Features</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedProject.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm font-light text-slate-300">
                        <ChevronRight className="w-4 h-4 text-blue-400" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-3">Verified Results</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {selectedProject.results.map((r) => (
                      <div key={r} className="p-4 rounded-2xl bg-white/[0.04] text-center border border-white/10">
                        <span className="font-display text-sm font-semibold text-white">{r}</span>
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
