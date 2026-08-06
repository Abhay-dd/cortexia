"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────
   INTERACTIVE PARTICLE NEURAL MESH (canvas)
   Mouse interaction: attraction/repulsion field
   Brand colors: #E8611A orange + #1B2A4A navy
───────────────────────────────────────────── */
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("mouseleave", onLeave);

    interface Particle {
      x: number; y: number;
      ox: number; oy: number;
      vx: number; vy: number;
      size: number;
      isOrange: boolean;
    }

    let particles: Particle[] = [];
    let W = 0, H = 0;
    let raf: number;

    const init = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      particles = [];
      const count = Math.floor((W * H) / 8500);
      for (let i = 0; i < count; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        particles.push({
          x, y, ox: x, oy: y,
          vx: 0, vy: 0,
          size: Math.random() * 1.6 + 0.4,
          isOrange: Math.random() < 0.12,
        });
      }
    };

    const LINK_DIST = 110;
    const MOUSE_REPEL = 130;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouseRef.current;

      // Update particles
      for (const p of particles) {
        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_REPEL) {
          const force = (MOUSE_REPEL - dist) / MOUSE_REPEL * 0.8;
          p.vx -= (dx / dist) * force * 2.5;
          p.vy -= (dy / dist) * force * 2.5;
        }

        // Spring back to origin
        p.vx += (p.ox - p.x) * 0.04;
        p.vy += (p.oy - p.y) * 0.04;
        // Damping
        p.vx *= 0.88;
        p.vy *= 0.88;

        // Slow drift when idle
        p.ox += Math.sin(Date.now() * 0.0003 + p.x) * 0.08;
        p.oy += Math.cos(Date.now() * 0.0002 + p.y) * 0.08;

        p.x += p.vx;
        p.y += p.vy;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.18;
            const isOrangeLink = particles[i].isOrange || particles[j].isOrange;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isOrangeLink
              ? `rgba(232,97,26,${alpha * 1.6})`
              : `rgba(160,180,220,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.isOrange
          ? `rgba(232,97,26,0.8)`
          : `rgba(160,180,220,0.5)`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    init();
    draw();

    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

/* ─────────────────────────────────────────────
   MAGNETIC CURSOR FOLLOWER
───────────────────────────────────────────── */
function MagneticCursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const cx = useSpring(mx, { stiffness: 200, damping: 28 });
  const cy = useSpring(my, { stiffness: 200, damping: 28 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setIsHovering(!!el.closest("button, a"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [mx, my]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[999] hidden lg:block"
      style={{ x: cx, y: cy, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        className="rounded-full border border-[#E8611A]/60 bg-[#E8611A]/10 backdrop-blur-sm"
        animate={{ width: isHovering ? 48 : 24, height: isHovering ? 48 : 24 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   CHAR SPLIT ANIMATION
───────────────────────────────────────────── */
function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const chars = text.split("");
  return (
    <span className={className} aria-label={text}>
      {chars.map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.028,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number;
    let raf: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1500, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * to * 10) / 10);
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    const t = setTimeout(() => { raf = requestAnimationFrame(animate); }, 800);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [to]);
  return <>{val % 1 !== 0 ? val.toFixed(1) : Math.floor(val)}{suffix}</>;
}

/* ─────────────────────────────────────────────
   MARQUEE STRIP
───────────────────────────────────────────── */
const STACK = ["OpenAI", "AWS", "Docker", "Python", "Next.js", "MongoDB", "TensorFlow", "PostgreSQL", "Redis", "Kubernetes", "PyTorch", "FastAPI"];

function Marquee() {
  const items = [...STACK, ...STACK];
  return (
    <div className="relative overflow-hidden py-4">
      <div className="flex animate-marquee gap-12 whitespace-nowrap w-max">
        {items.map((t, i) => (
          <span key={i} className="text-[13px] font-mono text-[#4F617A] tracking-widest uppercase flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-[#E8611A] inline-block opacity-60" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLOATING STATUS CARDS
───────────────────────────────────────────── */
const CARDS = [
  { label: "AI Engine", value: "Active", color: "#10B981", delay: 0 },
  { label: "Accuracy", value: "99.4%", color: "#E8611A", delay: 0.5 },
  { label: "Latency", value: "< 50ms", color: "#60A5FA", delay: 1 },
];

/* ─────────────────────────────────────────────
   MAIN HERO
───────────────────────────────────────────── */
export default function Hero() {
  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <MagneticCursor />

      <section
        id="home"
        className="relative min-h-screen flex flex-col overflow-hidden bg-[#070E1A]"
      >
        {/* Neural Mesh */}
        <NeuralCanvas />

        {/* Atmospheric glows */}
        <div className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full bg-[#E8611A]/[0.04] blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1B2A4A]/60 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#0C1A2E]/50 blur-[160px] pointer-events-none" />

        {/* MAIN CONTENT */}
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6 pt-20 pb-0"
          style={{ cursor: "none" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E8611A]/30 bg-[#E8611A]/[0.07] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8611A] animate-pulse" />
              <span className="text-[11px] font-mono text-[#E8611A] uppercase tracking-[0.18em]">AI Engineering Company</span>
            </span>
          </motion.div>

          {/* Headline — char split */}
          <div className="font-display font-bold leading-[0.95] mb-6 overflow-hidden">
            <div
              className="text-[clamp(3rem,9vw,7rem)] text-white block overflow-hidden"
              style={{ lineHeight: 1.0 }}
            >
              <AnimatedText text="Engineering" delay={0.1} />
            </div>
            <div
              className="text-[clamp(3rem,9vw,7rem)] block overflow-hidden"
              style={{
                lineHeight: 1.0,
                background: "linear-gradient(135deg, #E8611A 0%, #F5A572 50%, #E8611A 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 3s linear infinite",
              }}
            >
              <AnimatedText text="Intelligence." delay={0.3} />
            </div>
          </div>

          {/* Sub */}
          <motion.p
            className="text-[#8896B0] text-[clamp(1rem,2vw,1.2rem)] font-light max-w-[560px] leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            We build custom AI systems, intelligent automation platforms, and enterprise software 
            that transform how modern businesses operate and scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <button
              onClick={() => scroll("#services")}
              className="group relative overflow-hidden flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8611A] text-white text-sm font-semibold shadow-[0_0_40px_rgba(232,97,26,0.4)] hover:shadow-[0_0_60px_rgba(232,97,26,0.6)] transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Shimmer overlay */}
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              Explore Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scroll("#work")}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.12] text-[#8896B0] text-sm font-semibold hover:border-[#E8611A]/40 hover:text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              View Our Work
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="flex gap-12 sm:gap-20 mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            {[
              { to: 50, suffix: "+", label: "Projects" },
              { to: 99.9, suffix: "%", label: "Uptime SLA" },
              { to: 30, suffix: "+", label: "AI Systems" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-bold text-white mb-1">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="text-[10px] text-[#4F617A] font-mono uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating Cards */}
        {CARDS.map((c, i) => (
          <motion.div
            key={c.label}
            className="hidden lg:block absolute z-20"
            style={{
              left: i === 0 ? "7%" : i === 2 ? "auto" : undefined,
              right: i === 2 ? "7%" : undefined,
              top: "50%",
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -10, 0],
              transition: { delay: 1.4 + c.delay, duration: 0.6, y: { delay: 1.8 + c.delay, duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" } }
            }}
          >
            <div className="card rounded-2xl px-5 py-4 border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl">
              <div className="text-[10px] font-mono text-[#4F617A] uppercase tracking-widest mb-1">{c.label}</div>
              <div className="font-display text-lg font-bold" style={{ color: c.color }}>{c.value}</div>
            </div>
          </motion.div>
        ))}

        {/* Bottom marquee strip */}
        <motion.div
          className="absolute bottom-0 inset-x-0 border-t border-white/[0.06] bg-[#070E1A]/80 backdrop-blur-sm z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <Marquee />
        </motion.div>

        {/* Fade to next section */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0C1422] to-transparent pointer-events-none z-10" />
      </section>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </>
  );
}
