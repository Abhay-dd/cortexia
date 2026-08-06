"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Workflow, Code, Cloud, ArrowUpRight } from "lucide-react";

/* ─── AI Chat Demo ─────────────────────────────────────────── */
const CHAT_MESSAGES = [
  { role: "user", text: "Summarize this 200-page contract and flag any risks." },
  { role: "ai", text: "Analyzing document... Found 3 risk clauses in sections 7, 14, and 22. Liability cap is missing. Non-compete extends 5 years. Recommend legal review before signing." },
  { role: "user", text: "Draft a response to the vendor about the liability clause." },
  { role: "ai", text: "Draft ready. Requesting liability cap of $500K, standard 2-year non-compete, and jurisdiction change to Delaware. Tone: professional, firm." },
];

function AIChatDemo() {
  const [messages, setMessages] = useState<typeof CHAT_MESSAGES>([]);
  const [typing, setTyping] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    const run = async () => {
      while (idx.current < CHAT_MESSAGES.length) {
        const msg = CHAT_MESSAGES[idx.current];
        if (msg.role === "ai") { setTyping(true); await new Promise(r => setTimeout(r, 900)); setTyping(false); }
        setMessages(prev => [...prev, msg]);
        idx.current++;
        await new Promise(r => setTimeout(r, msg.role === "user" ? 600 : 1200));
      }
      await new Promise(r => setTimeout(r, 2000));
      setMessages([]); idx.current = 0;
      run();
    };
    run();
  }, []);

  return (
    <div className="rounded-xl overflow-hidden" style={{ background:"#0B1525", border:"1px solid rgba(255,255,255,0.06)", height:220 }}>
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.05]">
        <span className="w-2 h-2 rounded-full bg-[#E8611A]" />
        <span className="text-[10px] font-mono text-[#4F617A] uppercase tracking-wider">Cortexia AI Agent · Active</span>
      </div>
      <div className="p-4 space-y-3 overflow-hidden" style={{ height:180 }}>
        <AnimatePresence>
          {messages.slice(-4).map((m, i) => (
            <motion.div key={i} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} className={`flex ${m.role==="user"?"justify-end":""}`}>
              <div className="max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed"
                style={{
                  background: m.role==="user" ? "rgba(232,97,26,0.15)" : "rgba(27,42,74,0.6)",
                  color: m.role==="user" ? "#FFB380" : "#8896B0",
                  border: `1px solid ${m.role==="user" ? "rgba(232,97,26,0.2)" : "rgba(255,255,255,0.05)"}`,
                }}>
                {m.text}
              </div>
            </motion.div>
          ))}
          {typing && (
            <motion.div key="typing" initial={{ opacity:0 }} animate={{ opacity:1 }}>
              <div className="px-3 py-2 rounded-xl inline-flex gap-1.5" style={{ background:"rgba(27,42,74,0.6)", border:"1px solid rgba(255,255,255,0.05)" }}>
                {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#E8611A]" style={{ animation:`bounce 0.8s ${i*0.15}s infinite` }} />)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Automation Flow Demo ──────────────────────────────────── */
const FLOW_NODES = [
  { label:"Email", x:8, y:50 },
  { label:"AI Router", x:30, y:50 },
  { label:"CRM", x:58, y:20 },
  { label:"Slack", x:58, y:50 },
  { label:"Notion", x:58, y:80 },
  { label:"Report", x:82, y:50 },
];
const FLOW_EDGES = [[0,1],[1,2],[1,3],[1,4],[2,5],[3,5],[4,5]];

function AutomationDemo() {
  const [activeEdge, setActiveEdge] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveEdge(p => (p+1) % FLOW_EDGES.length), 700);
    return () => clearInterval(t);
  },[]);

  return (
    <div className="rounded-xl overflow-hidden relative" style={{ background:"#0B1525", border:"1px solid rgba(255,255,255,0.06)", height:220 }}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.05]">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-mono text-[#4F617A] uppercase tracking-wider">Automation Engine · Running</span>
      </div>
      <svg className="w-full" style={{ height:175, padding:"0 16px" }} viewBox="0 0 100 100" preserveAspectRatio="none">
        {FLOW_EDGES.map(([a,b],i) => {
          const from = FLOW_NODES[a], to = FLOW_NODES[b];
          const active = activeEdge === i;
          return (
            <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke={active?"#E8611A":"rgba(255,255,255,0.1)"} strokeWidth={active?0.8:0.5}
              style={{ transition:"all 0.3s" }} />
          );
        })}
        {FLOW_NODES.map((n,i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={4.5} fill="#0B1525" stroke="rgba(255,255,255,0.1)" strokeWidth={0.5} />
            <circle cx={n.x} cy={n.y} r={4.5} fill="rgba(232,97,26,0.0)"
              stroke={FLOW_EDGES[activeEdge]?.includes(i)?"#E8611A":"transparent"} strokeWidth={0.8}
              style={{ transition:"all 0.3s" }} />
            <text x={n.x} y={n.y+0.8} textAnchor="middle" fontSize={3.2} fill="#8896B0" fontFamily="monospace">{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ─── Terminal Code Demo ────────────────────────────────────── */
const CODE_LINES = [
  { text:"# Cortexia AI — Building your product", color:"#4F617A" },
  { text:"", color:"" },
  { text:"from cortexia import AIAgent, deploy", color:"#8896B0" },
  { text:"", color:"" },
  { text:'agent = AIAgent(model="cortexia-pro-v3",', color:"#8896B0" },
  { text:'              domain="customer_support")', color:"#8896B0" },
  { text:"", color:"" },
  { text:"agent.train(your_data)", color:"#E8611A" },
  { text:"agent.test(accuracy_threshold=0.98)", color:"#E8611A" },
  { text:'deploy(agent, env="production")', color:"#E8611A" },
  { text:"", color:"" },
  { text:'# ✓ Deployed. 99.4% accuracy. < 50ms latency.', color:"#4ade80" },
];

function CodeDemo() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setVisible(p => p < CODE_LINES.length ? p+1 : 0), 250);
    return () => clearInterval(t);
  },[]);

  return (
    <div className="rounded-xl overflow-hidden" style={{ background:"#050C18", border:"1px solid rgba(255,255,255,0.06)", height:220 }}>
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.05]">
        {["#FF5F57","#FEBC2E","#28C840"].map(c => <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background:c }} />)}
        <span className="ml-2 text-[10px] font-mono text-[#4F617A] uppercase tracking-wider">cortexia_build.py</span>
      </div>
      <div className="p-4 font-mono text-[11px] space-y-0.5 overflow-hidden" style={{ height:175 }}>
        <AnimatePresence>
          {CODE_LINES.slice(0, visible).map((l,i) => (
            <motion.div key={i} initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.2 }}
              style={{ color:l.color || "transparent", lineHeight:1.7, whiteSpace:"pre" }}>
              {l.text || " "}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Cloud Scale Demo ──────────────────────────────────────── */
function CloudDemo() {
  const [load, setLoad] = useState(20);
  const [servers, setServers] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setLoad(p => {
        const next = p < 95 ? p + 8 : 5;
        setServers(next > 70 ? 4 : next > 40 ? 2 : 1);
        return next;
      });
    }, 800);
    return () => clearInterval(t);
  },[]);

  return (
    <div className="rounded-xl overflow-hidden" style={{ background:"#0B1525", border:"1px solid rgba(255,255,255,0.06)", height:220 }}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.05]">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-[10px] font-mono text-[#4F617A] uppercase tracking-wider">AWS Auto-Scaling · {servers} Instance{servers>1?"s":""} Active</span>
      </div>
      <div className="p-5 space-y-4">
        <div>
          <div className="flex justify-between text-[10px] font-mono text-[#4F617A] mb-1.5">
            <span>Traffic Load</span><span style={{ color: load>70?"#E8611A":"#4ade80" }}>{load}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background:"rgba(255,255,255,0.06)" }}>
            <motion.div className="h-full rounded-full" animate={{ width:`${load}%` }} transition={{ duration:0.6 }}
              style={{ background: load>70?"#E8611A":load>40?"#FBBF24":"#4ade80" }} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="text-center">
              <motion.div
                className="w-full rounded-lg mb-1 flex items-center justify-center"
                style={{ height:60, background: i<=servers?"rgba(232,97,26,0.12)":"rgba(255,255,255,0.03)", border:`1px solid ${i<=servers?"rgba(232,97,26,0.3)":"rgba(255,255,255,0.05)"}` }}
                animate={{ opacity: i<=servers?1:0.3 }}
                transition={{ duration:0.4 }}
              >
                <span className="text-[10px] font-mono" style={{ color: i<=servers?"#E8611A":"#4F617A" }}>
                  {i<=servers?"●":"○"}
                </span>
              </motion.div>
              <span className="text-[9px] font-mono text-[#4F617A]">srv-0{i}</span>
            </div>
          ))}
        </div>
        <div className="text-[9px] font-mono text-[#4F617A] text-center">
          {servers > 1 ? `⬆ Auto-scaled to ${servers} instances` : "Running on minimum capacity"}
        </div>
      </div>
    </div>
  );
}

/* ─── 3D Tilt wrapper ───────────────────────────────────────── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [tilt, setTilt] = useState({ x:0, y:0 });
  const [glare, setGlare] = useState({ x:50, y:50 });
  const [hovered, setHovered] = useState(false);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x:-(( e.clientY-r.top)/r.height-0.5)*12, y:((e.clientX-r.left)/r.width-0.5)*12 });
    setGlare({ x:(e.clientX-r.left)/r.width*100, y:(e.clientY-r.top)/r.height*100 });
  };
  return (
    <div className={className}
      style={{ transform:`perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered?1.02:1})`, transition:"transform 0.15s ease", position:"relative", overflow:"hidden" }}
      onMouseMove={onMove} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setTilt({x:0,y:0}); setHovered(false); }}>
      {hovered && <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:5, background:`radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(232,97,26,0.14) 0%, transparent 60%)` }} />}
      {children}
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────────────── */
const SERVICES = [
  { icon:Brain, id:"ai", label:"AI & Machine Learning", tag:"The Brain", demo:<AIChatDemo />, description:"Custom AI agents, fine-tuned LLMs, computer vision, and NLP systems that work exactly the way your business operates.", highlights:["Autonomous AI Agents","LLM Fine-Tuning","Computer Vision","Chatbots & Copilots"] },
  { icon:Workflow, id:"auto", label:"Intelligent Automation", tag:"The Engine", demo:<AutomationDemo />, description:"Workflow automation that connects every tool in your stack and makes decisions intelligently — without anyone touching a keyboard.", highlights:["Process Automation","Multi-System Integration","AI Decision Routing","24/7 Operation"] },
  { icon:Code, id:"software", label:"Software Engineering", tag:"The Product", demo:<CodeDemo />, description:"Custom software built from scratch — SaaS platforms, enterprise dashboards, APIs, and mobile apps that are fast, scalable, and beautiful.", highlights:["SaaS Development","Enterprise Platforms","API Architecture","Web & Mobile Apps"] },
  { icon:Cloud, id:"cloud", label:"Cloud & DevOps", tag:"The Foundation", demo:<CloudDemo />, description:"Auto-scaling cloud infrastructure that grows with your usage, with zero-downtime deployments and continuous monitoring.", highlights:["AWS Architecture","Auto-Scaling Infra","CI/CD Pipelines","99.9% Uptime SLA"] },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="section" style={{ background:"#070E1A" }}>
      <div className="container">

        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="label justify-center mb-5">What We Build</div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-bold text-white leading-[1.1] mb-4">
            Four capabilities. One team. Infinite outcomes.
          </h2>
          <p className="text-[#8896B0] font-light leading-relaxed">
            We don&apos;t specialize in one thing. We build the full stack of intelligence that modern businesses need to win.
          </p>
        </div>

        {/* Service tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SERVICES.map((s, i) => (
            <button key={s.id} onClick={() => setActive(i)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: active===i ? "#E8611A" : "rgba(27,42,74,0.5)",
                color: active===i ? "#fff" : "#8896B0",
                border: `1px solid ${active===i ? "rgba(232,97,26,0.5)" : "rgba(255,255,255,0.06)"}`,
                boxShadow: active===i ? "0 0 30px rgba(232,97,26,0.35)" : "none",
              }}>
              <s.icon className="w-3.5 h-3.5" />
              {s.label}
            </button>
          ))}
        </div>

        {/* Active service display */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }} transition={{ duration:0.3 }}>
            <div className="grid lg:grid-cols-2 gap-8 items-center">

              {/* Live demo */}
              <TiltCard className="card rounded-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-mono text-[#E8611A] uppercase tracking-wider">{SERVICES[active].tag}</span>
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-mono" style={{ background:"rgba(74,222,128,0.1)", color:"#4ade80", border:"1px solid rgba(74,222,128,0.2)" }}>Live Demo</span>
                  </div>
                  {SERVICES[active].demo}
                </div>
              </TiltCard>

              {/* Description */}
              <div>
                <div className="text-xs font-mono text-[#4F617A] uppercase tracking-widest mb-3">
                  Capability 0{active + 1} / 04
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">{SERVICES[active].label}</h3>
                <p className="text-[#8896B0] font-light leading-relaxed mb-7">{SERVICES[active].description}</p>

                <div className="grid grid-cols-2 gap-2 mb-8">
                  {SERVICES[active].highlights.map(h => (
                    <div key={h} className="flex items-center gap-2.5 p-3 rounded-xl" style={{ background:"rgba(232,97,26,0.05)", border:"1px solid rgba(232,97,26,0.12)" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8611A] flex-shrink-0" />
                      <span className="text-xs text-white font-medium">{h}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" })}
                  className="btn-primary text-sm py-3 px-6">
                  Build This For My Business
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-4px)} }
      `}</style>
    </section>
  );
}
