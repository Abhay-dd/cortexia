"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#process" },
  { label: "Our Work", href: "#work" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
];

// Cortexia AI SVG Logo (extracted from the uploaded image brand mark)
function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Dark C shape */}
      <path
        d="M72 22C65 14 55 9 44 9C23 9 6 26 6 47C6 68 23 85 44 85C55 85 65 80 72 72"
        stroke="#1B2A4A"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      {/* Orange top swoosh */}
      <path
        d="M55 10C62 11 70 16 76 22"
        stroke="#E8611A"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Orange bottom swoosh */}
      <path
        d="M55 84C62 83 70 78 76 72"
        stroke="#E8611A"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scroll = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-[#0C1422]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        )}
      >
        <div className="container flex items-center justify-between h-[72px]">
          {/* Logo */}
          <button onClick={() => scroll("#home")} className="flex items-center gap-3">
            <LogoMark size={36} />
            <span className="font-display font-bold text-lg text-white tracking-tight">
              Cortexia <span className="text-[#E8611A]">AI</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scroll(l.href)}
                className="px-4 py-2 rounded-lg text-sm text-[#8896B0] hover:text-white hover:bg-white/[0.05] transition-all duration-200"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("#contact")}
              className="hidden sm:flex btn-primary text-sm py-2.5 px-5"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-[#8896B0] hover:text-white hover:bg-white/[0.05] transition-all"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#0C1422]/95 backdrop-blur-2xl" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="relative z-10 card m-4 mt-20 rounded-2xl p-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scroll(l.href)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-base text-[#8896B0] hover:text-white hover:bg-white/[0.05] transition-all"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scroll("#contact")}
                className="mt-4 w-full btn-primary justify-center"
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
