"use client";

import { COMPANY } from "@/lib/constants";

const LINKS = [
  { label: "Capabilities", href: "#services" },
  { label: "Methodology", href: "#process" },
  { label: "Deployed Work", href: "#work" },
  { label: "Technology", href: "#technology" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scroll = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-[#060A10] border-t border-[rgba(0,255,157,0.12)] py-14">
      <div className="container">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/5">
          <div>
            <span className="font-display font-bold text-2xl text-white block mb-1">
              CORTEXIA <span className="text-gradient-laser">AI</span>
            </span>
            <p className="text-[#8FA3BF] text-xs font-light">
              Engineering Intelligence. Empowering Businesses.
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            {LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scroll(link.href)}
                className="text-xs font-semibold text-[#8FA3BF] hover:text-[#00FF9D] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#4E6178] font-mono">
            © {new Date().getFullYear()} Cortexia AI Inc. All rights reserved.
          </span>
          <div className="flex gap-6 text-xs text-[#4E6178] font-mono">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
            <button className="hover:text-white transition-colors">Security Audit</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
