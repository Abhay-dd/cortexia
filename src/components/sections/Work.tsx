"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileText, X, ChevronRight } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES, type Project } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientOrb from "@/components/effects/GradientOrb";

export default function Work() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="relative section-padding overflow-hidden">
      <GradientOrb
        className="-top-40 -right-60 z-0"
        color1="rgba(37,99,235,0.06)"
        color2="rgba(6,182,212,0.04)"
        size={500}
      />

      <div className="container-custom relative z-10">
        <SectionHeading
          title="Our Work"
          subtitle="Real projects. Real results. Explore our portfolio of AI-powered solutions and enterprise software."
        />

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                  : "border border-border text-muted hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl border border-border bg-card/40 overflow-hidden cursor-pointer hover:-translate-y-1 hover:border-primary/25 transition-all duration-300"
                onClick={() => setSelectedProject(project)}
              >
                {/* Preview Image Area */}
                <div className="relative h-48 bg-gradient-to-br from-card to-background overflow-hidden">
                  {/* Abstract pattern as preview */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
                      <svg className="w-full h-full opacity-20" viewBox="0 0 400 200">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <circle
                            key={i}
                            cx={60 + i * 65}
                            cy={100}
                            r={20 + Math.random() * 15}
                            fill="none"
                            stroke={i % 2 === 0 ? "#2563eb" : "#06b6d4"}
                            strokeWidth="1"
                            opacity={0.4 + Math.random() * 0.4}
                          />
                        ))}
                        {Array.from({ length: 4 }).map((_, i) => (
                          <line
                            key={`l-${i}`}
                            x1={60 + i * 65}
                            y1={100}
                            x2={125 + i * 65}
                            y2={100}
                            stroke="#2563eb"
                            strokeWidth="0.5"
                            opacity="0.3"
                          />
                        ))}
                      </svg>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                        project.status === "Live"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : project.status === "In Development"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm text-sm font-medium text-foreground border border-border">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <span className="text-xs text-primary font-mono">{project.category}</span>
                  <h3 className="font-heading text-lg font-bold mt-1 mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[10px] bg-white/5 text-muted border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] bg-white/5 text-muted border border-border">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 border border-border text-muted hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="relative h-48 sm:h-56 bg-gradient-to-br from-primary/15 to-accent/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute bottom-6 left-6 right-16">
                  <span className="text-xs text-primary font-mono">{selectedProject.category}</span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold mt-1">
                    {selectedProject.title}
                  </h2>
                  <span
                    className={`inline-flex mt-2 px-2.5 py-1 rounded-full text-[10px] font-medium ${
                      selectedProject.status === "Live"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {selectedProject.status}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-8">
                {/* Problem */}
                <div>
                  <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary mb-3">
                    The Problem
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{selectedProject.problem}</p>
                </div>

                {/* Solution */}
                <div>
                  <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-accent mb-3">
                    Our Solution
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{selectedProject.solution}</p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted mb-3">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg text-xs bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted mb-3">
                    Key Features
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {selectedProject.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted">
                        <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Results */}
                <div>
                  <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted mb-3">
                    Results
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {selectedProject.results.map((r) => (
                      <div
                        key={r}
                        className="text-center p-4 rounded-xl border border-border bg-background/50"
                      >
                        <span className="text-sm font-semibold gradient-text">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                  <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </button>
                  <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium border border-border text-muted hover:text-foreground hover:border-primary/30 transition-all duration-300">
                    <FileText className="w-4 h-4" />
                    Case Study
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
