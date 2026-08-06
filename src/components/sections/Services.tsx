"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Workflow, Code, Cloud, ArrowUpRight, Check, Sparkles, Terminal } from "lucide-react";

/* ─── 1. AI Chat Agent Interactive Demo ─────────────────────── */
const CHAT_LOGS = [
  { role: "user", text: "Analyze 5,000 patient records for clinical trial eligibility." },
  { role: "ai", text: "Processing neural dataset... Identified 412 matching candidates with 98.6% confidence. Exporting compliance audit report." },
  { role: "user", text: "Deploy automated notification bot for candidate onboarding." },
  { role: "ai", text: "Agent active. Workflow initiated via encrypted API. Real-time patient telemetry monitoring online." }
];

function AIChatDemo() {
  const [messages, setMessages] = useState<typeof CHAT_LOGS>([]);
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    let isMounted = true;
    const runAnimation = async () => {
      while (isMounted) {
        if (indexRef.current < CHAT_LOGS.length) {
          const currentMsg = CHAT_LOGS[indexRef.current];
          if (currentMsg.role === "ai") {
            setIsTyping(true);
            await new Promise((r) => setTimeout(r, 700));
            if (!isMounted) return;
            setIsTyping(false);
          }
          setMessages((prev) => [...prev, currentMsg]);
          indexRef.current++;
          await new Promise((r) => setTimeout(r, currentMsg.role === "user" ? 500 : 1300));
        } else {
          await new Promise((r) => setTimeout(r, 2200));
          if (!isMounted) return;
          setMessages([]);
          indexRef.current = 0;
        }
      }
    };
    runAnimation();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden card-chrome border-[#00FF9D]/20 h-[240px] flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-[#0B121E] border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse shadow-[0_0_8px_#00FF9D]" />
          <span className="text-[10px] font-mono text-[#00FF9D] uppercase tracking-wider">cortexia-agent // neural_v4</span>
        </div>
        <span className="text-[9px] font-mono text-[#8FA3BF] bg-[#00FF9D]/10 px-2 py-0.5 rounded-full border border-[#00FF9D]/20">Active</span>
      </div>
      <div className="p-4 space-y-3 overflow-y-auto flex-1 font-mono text-xs">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[88%] p-3 rounded-xl leading-relaxed ${
                  m.role === "user"
                    ? "bg-[#00FF9D]/15 text-[#00FF9D] border border-[#00FF9D]/30"
                    : "bg-[#111A2C] text-[#F0FDF4] border border-white/10"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="p-2.5 rounded-xl bg-[#111A2C] border border-white/10 flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── 2. Automation Interactive Graph Demo ─────────────────── */
const NODES = [
  { label: "Trigger", x: 12, y: 50 },
  { label: "AI Parser", x: 38, y: 50 },
  { label: "CRM Sync", x: 68, y: 22 },
  { label: "Slack Bot", x: 68, y: 50 },
  { label: "DB Store", x: 68, y: 78 },
  { label: "Output", x: 90, y: 50 },
];
const EDGES = [[0, 1], [1, 2], [1, 3], [1, 4], [2, 5], [3, 5], [4, 5]];

function AutomationDemo() {
  const [activeEdge, setActiveEdge] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveEdge((p) => (p + 1) % EDGES.length), 650);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden card-chrome border-[#00FF9D]/20 h-[240px] flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-[#0B121E] border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]" />
          <span className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-wider">Workflow Engine // Graph Matrix</span>
        </div>
        <span className="text-[9px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded-full border border-[#00E5FF]/20">Executing</span>
      </div>
      <div className="flex-1 p-3 relative flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {EDGES.map(([a, b], i) => {
            const from = NODES[a];
            const to = NODES[b];
            const isActive = activeEdge === i;
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isActive ? "#00FF9D" : "rgba(255, 255, 255, 0.12)"}
                strokeWidth={isActive ? 1.2 : 0.6}
                className="transition-all duration-300"
              />
            );
          })}
          {NODES.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r={5} fill="#060A10" stroke={EDGES[activeEdge]?.includes(i) ? "#00FF9D" : "rgba(255,255,255,0.2)"} strokeWidth={1} />
              <text x={n.x} y={n.y + 1} textAnchor="middle" fontSize={3.2} fill="#F0FDF4" fontFamily="monospace" fontWeight="bold">
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ─── 3. Code Engineering Terminal Demo ─────────────────────── */
const CODE_SNIPPETS = [
  { text: "# Deploying Enterprise AI Architecture", color: "#4E6178" },
  { text: "import { CortexiaNeuralEngine } from '@cortexia/ai';", color: "#00FF9D" },
  { text: "const engine = new CortexiaNeuralEngine({", color: "#F0FDF4" },
  { text: "  model: 'cortexia-ultra-v4',", color: "#00E5FF" },
  { text: "  sla: '99.99%',", color: "#00E5FF" },
  { text: "  security: 'SOC2_TYPE_II'", color: "#00E5FF" },
  { text: "});", color: "#F0FDF4" },
  { text: "await engine.deployToProduction();", color: "#00FF9D" },
  { text: "// ✓ System Live. Sub-40ms latency guaranteed.", color: "#34D399" },
];

function CodeDemo() {
  const [lineCount, setLineCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setLineCount((p) => (p < CODE_SNIPPETS.length ? p + 1 : 0)), 280);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden card-chrome border-[#00FF9D]/20 h-[240px] flex flex-col font-mono text-xs">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0B121E] border-b border-white/5">
        <Terminal className="w-3.5 h-3.5 text-[#00FF9D]" />
        <span className="text-[10px] text-[#8FA3BF] uppercase tracking-wider">deploy_cortexia.ts</span>
      </div>
      <div className="p-4 space-y-1 overflow-hidden flex-1 bg-[#04070D]">
        {CODE_SNIPPETS.slice(0, lineCount).map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} style={{ color: l.color }}>
            {l.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── 4. Cloud Auto-Scale Demo ─────────────────────────────── */
function CloudDemo() {
  const [load, setLoad] = useState(30);
  useEffect(() => {
    const t = setInterval(() => setLoad((p) => (p < 90 ? p + 15 : 20)), 700);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden card-chrome border-[#00FF9D]/20 h-[240px] flex flex-col p-5 space-y-5">
      <div className="flex justify-between items-center text-xs font-mono">
        <span className="text-[#8FA3BF]">AWS Auto-Scale Cluster</span>
        <span className="text-[#00FF9D] font-bold">{load}% Load</span>
      </div>
      
      <div className="w-full h-2 rounded-full bg-[#060A10] overflow-hidden border border-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-[#00FF9D] to-[#00E5FF] rounded-full"
          animate={{ width: `${load}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="grid grid-cols-4 gap-3 pt-2">
        {[1, 2, 3, 4].map((i) => {
          const isActive = load > i * 20;
          return (
            <div key={i} className={`p-3 rounded-xl border text-center transition-all ${isActive ? "bg-[#00FF9D]/10 border-[#00FF9D]/40 text-[#00FF9D]" : "bg-[#060A10] border-white/5 text-[#4E6178]"}`}>
              <div className="font-mono text-xs font-bold">Node 0{i}</div>
              <div className="text-[10px] font-mono mt-1">{isActive ? "ONLINE" : "IDLE"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main Services Component ─────────────────────────────── */
const SERVICES = [
  {
    id: "ai",
    icon: Brain,
    title: "Artificial Intelligence",
    subtitle: "Custom Neural Models & Autonomous Agents",
    description: "Domain-specific LLMs, autonomous agent swarms, computer vision pipelines, and multi-modal intelligence engineered for high-security enterprise adoption.",
    features: ["Autonomous AI Agents", "Custom Model Fine-Tuning", "Computer Vision & Perception", "Enterprise NLP Systems"],
    demo: <AIChatDemo />,
  },
  {
    id: "auto",
    icon: Workflow,
    title: "Intelligent Automation",
    subtitle: "Autonomous Workflow Orchestration",
    description: "Connect your enterprise CRM, ERP, and databases with AI decision routing engines that eliminate manual overhead and execute tasks 24/7.",
    features: ["End-to-End Workflow Sync", "AI Decision Routing", "API Orchestration", "Real-Time Telemetry"],
    demo: <AutomationDemo />,
  },
  {
    id: "software",
    icon: Code,
    title: "Software Engineering",
    subtitle: "High-Performance SaaS & Web Apps",
    description: "Robust full-stack enterprise applications built with modern architectures — lightning-fast APIs, sleek glass interfaces, and scalable backends.",
    features: ["SaaS Product Engineering", "Executive Dashboards", "REST & GraphQL APIs", "Microservices Architecture"],
    demo: <CodeDemo />,
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud & DevOps",
    subtitle: "Auto-Scaling AI Infrastructure",
    description: "Resilient, SOC2-compliant cloud environments engineered specifically for AI compute workloads with zero-downtime CI/CD and 99.99% SLAs.",
    features: ["AWS Architecture & Migration", "Kubernetes & Docker", "Automated CI/CD Pipelines", "24/7 Threat Monitoring"],
    demo: <CloudDemo />,
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="services" className="section bg-matrix" style={{ background: "#060A10" }}>
      <div className="container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="label-emerald justify-center mb-4">Core Capabilities</div>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold text-white leading-[1.08] mb-5">
            Four Core Pillars of <br />
            <span className="text-gradient-laser">Enterprise Intelligence.</span>
          </h2>
          <p className="text-[#8FA3BF] text-base font-light leading-relaxed">
            We build end-to-end intelligent systems tailored specifically to your operational ecosystem.
          </p>
        </div>

        {/* Capability Nav Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const isActive = activeTab === i;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#00FF9D] to-[#00E5FF] text-black shadow-[0_0_25px_rgba(0,255,157,0.4)]"
                    : "card-chrome text-[#8FA3BF] hover:text-white hover:border-[#00FF9D]/30"
                }`}
              >
                <Icon className="w-4 h-4" />
                {s.title}
              </button>
            );
          })}
        </div>

        {/* Active Stage Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left: Live Interactive Demo Box */}
            <div className="lg:col-span-6">
              {SERVICES[activeTab].demo}
            </div>

            {/* Right: Capability Specification Details */}
            <div className="lg:col-span-6 text-left">
              <div className="text-xs font-mono text-[#00FF9D] uppercase tracking-widest mb-2 font-bold">
                Capability Module 0{activeTab + 1}
              </div>
              <h3 className="font-display text-3xl font-extrabold text-white mb-3">
                {SERVICES[activeTab].title}
              </h3>
              <p className="text-[#8FA3BF] text-base font-light leading-relaxed mb-8">
                {SERVICES[activeTab].description}
              </p>

              {/* Module Highlights Grid */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {SERVICES[activeTab].features.map((f) => (
                  <div key={f} className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0B121E] border border-[rgba(0,255,157,0.12)]">
                    <div className="w-5 h-5 rounded-full bg-[#00FF9D]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#00FF9D]" />
                    </div>
                    <span className="text-xs text-white font-medium">{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-emerald text-xs py-3.5 px-7"
              >
                Discuss This Capability
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
