"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function Products() {
  return (
    <section id="products" className="section bg-matrix relative overflow-hidden" style={{ background: "#060A10" }}>
      {/* Glow Center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-[#00FF9D]/[0.05] rounded-full blur-[140px]" />
      </div>

      <div className="container relative z-10 text-center">
        
        {/* Lock Icon Box */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-[#0B121E] border border-[#00FF9D]/30 flex items-center justify-center shadow-[0_0_40px_rgba(0,255,157,0.2)]"
        >
          <Lock className="w-7 h-7 text-[#00FF9D]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="label-emerald justify-center mb-4"
        >
          Research & Stealth Labs
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold text-white mb-5 max-w-2xl mx-auto leading-[1.08]"
        >
          Proprietary AI Products <br />
          <span className="text-gradient-laser">Currently in Stealth Stage II.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#8FA3BF] text-base font-light max-w-lg mx-auto mb-10 leading-relaxed"
        >
          We are engineering next-generation autonomous AI software products designed to transform enterprise operations at global scale.
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-xs mx-auto"
        >
          <div className="h-1 w-full bg-[#0B121E] rounded-full overflow-hidden mb-3 border border-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00FF9D] to-[#00E5FF] rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "75%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <span className="text-[10px] font-mono text-[#00FF9D] uppercase tracking-widest font-bold">
            Stealth Development · 75% Complete
          </span>
        </motion.div>

      </div>
    </section>
  );
}
