"use client";

const LINKS = [
  { label: "Why Us", href: "#why-cortexia" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Technology", href: "#technology" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scroll = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-[#0C1422] border-t border-white/[0.06] py-14">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/[0.06]">
          <div>
            <span className="font-display font-bold text-xl text-white block mb-1">
              Cortexia <span className="text-[#E8611A]">AI</span>
            </span>
            <p className="text-[#4F617A] text-xs font-light">Engineering Intelligence. Empowering Businesses.</p>
          </div>
          <div className="flex flex-wrap gap-6">
            {LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scroll(l.href)}
                className="text-xs text-[#4F617A] hover:text-white transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#4F617A] font-mono">
            © {new Date().getFullYear()} Cortexia AI. All rights reserved.
          </span>
          <div className="flex gap-5 text-xs text-[#4F617A]">
            <button className="hover:text-white transition-colors">Privacy</button>
            <button className="hover:text-white transition-colors">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
