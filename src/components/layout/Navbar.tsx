"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Capabilities", href: "#services" },
  { label: "Methodology", href: "#process" },
  { label: "Deployed Work", href: "#work" },
  { label: "Technology", href: "#technology" },
  { label: "Products", href: "#products" },
];

function EmeraldLogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FF9D" />
          <stop offset="100%" stopColor="#00E5FF" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Dark Outer C */}
      <path
        d="M74 22C66 14 55 9 43 9C22 9 5 26 5 47C5 68 22 85 43 85C55 85 66 80 74 72"
        stroke="#0B1626"
        strokeWidth="15"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M74 22C66 14 55 9 43 9C22 9 5 26 5 47C5 68 22 85 43 85C55 85 66 80 74 72"
        stroke="rgba(0, 255, 157, 0.3)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      {/* Laser Emerald Arc Top */}
      <path
        d="M54 9C62 10 70 15 76 22"
        stroke="url(#emeraldGrad)"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
        filter="url(#glow)"
      />
      {/* Laser Emerald Arc Bottom */}
      <path
        d="M54 85C62 84 70 79 76 72"
        stroke="url(#emeraldGrad)"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
        filter="url(#glow)"
      />
      {/* Central Core Pulse Dot */}
      <circle cx="43" cy="47" r="5" fill="#00FF9D" filter="url(#glow)" />
    </svg>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scroll = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500 py-4",
          isScrolled
            ? "bg-[#060A10]/85 backdrop-blur-2xl border-b border-[#00FF9D]/15 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3"
            : "bg-transparent"
        )}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scroll("#home")} className="flex items-center gap-3 group">
            <EmeraldLogoMark size={36} />
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-xl text-white tracking-tight flex items-center gap-1">
                CORTEXIA <span className="text-gradient-laser font-extrabold">AI</span>
              </span>
              <span className="text-[9px] font-mono text-[#00FF9D] tracking-widest uppercase opacity-80 -mt-1">
                Intelligence Systems
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0B121E]/60 border border-[rgba(0,255,157,0.12)] p-1.5 rounded-full backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scroll(l.href)}
                className="px-5 py-2 rounded-full text-xs font-semibold text-[#8FA3BF] hover:text-[#00FF9D] hover:bg-[#00FF9D]/10 transition-all duration-300"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("#contact")}
              className="hidden sm:flex btn-emerald text-xs py-2.5 px-5"
            >
              <Sparkles className="w-3.5 h-3.5 text-black animate-pulse" />
              Initiate Project
              <ArrowUpRight className="w-3.5 h-3.5 text-black" />
            </button>
            
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-xl text-[#8FA3BF] hover:text-white bg-[#0B121E] border border-white/10"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#060A10]/95 backdrop-blur-3xl" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="relative z-10 card-chrome m-4 mt-24 rounded-3xl p-6 border border-[#00FF9D]/30"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scroll(l.href)}
                  className="block w-full text-left px-5 py-3.5 rounded-2xl text-sm font-semibold text-[#8FA3BF] hover:text-[#00FF9D] hover:bg-[#00FF9D]/10 transition-all"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scroll("#contact")}
                className="mt-6 w-full btn-emerald justify-center py-3.5 text-sm"
              >
                Initiate Project
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
