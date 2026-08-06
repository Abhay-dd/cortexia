"use client";

const LINKS = [
  { label: "Lab to World", href: "#evolution" },
  { label: "Capabilities", href: "#services" },
  { label: "Methodology", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scroll = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-[#030305] border-t border-white/10 py-14">
      <div className="container">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/5">
          <div>
            <span className="font-display font-bold text-2xl text-white block mb-1">
              Cortexia <span className="text-[#FF6B00]">AI</span>
            </span>
            <p className="text-[#A1A1AA] text-xs font-light">
              Engineering Intelligence. Empowering Businesses.
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            {LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scroll(link.href)}
                className="text-xs font-semibold text-[#A1A1AA] hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#52525B] font-mono">
            © {new Date().getFullYear()} Cortexia AI Inc. All rights reserved.
          </span>
          <div className="flex gap-6 text-xs text-[#52525B] font-mono">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
            <button className="hover:text-white transition-colors">Security SLA</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
