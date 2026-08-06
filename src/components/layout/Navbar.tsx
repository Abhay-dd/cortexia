"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Lab to World", href: "#evolution" },
  { label: "Capabilities", href: "#services" },
  { label: "Methodology", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Products", href: "#products" },
];

function LuxuryLogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="44" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="4" />
      <path
        d="M68 28C60 20 48 15 36 15C18 15 4 29 4 47C4 65 18 79 36 79C48 79 60 74 68 66"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M50 15C58 16 66 21 72 28"
        stroke="#FF6B00"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M50 79C58 78 66 73 72 66"
        stroke="#FF6B00"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle cx="36" cy="47" r="5" fill="#FF6B00" />
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
          "fixed top-0 inset-x-0 z-50 transition-all duration-500 py-5",
          isScrolled ? "py-3" : "py-5"
        )}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scroll("#home")} className="flex items-center gap-3 text-left group">
            <LuxuryLogoMark size={34} />
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-white tracking-tight">
                Cortexia <span className="text-[#FF6B00]">AI</span>
              </span>
              <span className="text-[9px] font-mono text-[#A1A1AA] uppercase tracking-widest -mt-1">
                Intelligence Engine
              </span>
            </div>
          </button>

          {/* Desktop Navigation Floating Pill */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#0A0A0F]/70 border border-white/10 backdrop-blur-2xl shadow-2xl">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scroll(l.href)}
                className="px-4 py-2 rounded-full text-xs font-medium text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("#contact")}
              className="hidden sm:flex btn-primary-orange text-xs py-2.5 px-6"
            >
              Get in Touch
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-full bg-white/5 border border-white/10 text-white"
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
            <div className="absolute inset-0 bg-[#030305]/95 backdrop-blur-3xl" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="relative z-10 card-luxury m-4 mt-24 p-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scroll(l.href)}
                  className="block w-full text-left px-5 py-3.5 rounded-2xl text-sm text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-all"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scroll("#contact")}
                className="mt-6 w-full btn-primary-orange justify-center py-3.5"
              >
                Get in Touch
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
