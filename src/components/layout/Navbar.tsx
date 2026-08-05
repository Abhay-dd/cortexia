"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "glass shadow-lg shadow-black/10"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container-custom flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 group"
          >
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="font-heading font-bold text-white text-lg">C</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-300" />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight">
              Cortexia<span className="text-primary">&nbsp;AI</span>
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="relative text-sm text-muted hover:text-foreground transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] transition-all duration-300 group"
            >
              Book Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-muted hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              className="absolute top-20 left-4 right-4 glass rounded-2xl p-6"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left px-4 py-3 rounded-xl text-muted hover:text-foreground hover:bg-white/5 transition-all duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-primary to-primary-light text-white"
                >
                  Book Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
