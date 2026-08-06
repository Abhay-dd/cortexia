"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function Products() {
  return (
    <section id="products" className="section bg-ambient-mesh relative overflow-hidden">
      <div className="container relative z-10 text-center">
        
        {/* Lock Icon Box */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 mx-auto mb-8 rounded-full bg-[#0A0A0F] border border-white/10 flex items-center justify-center shadow-2xl"
        >
          <Lock className="w-6 h-6 text-[#FF6B00]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="badge-minimal justify-center mb-4"
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
          <span className="text-gradient-orange">Currently in Stealth Stage II.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#A1A1AA] text-base font-light max-w-lg mx-auto mb-10 leading-relaxed"
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
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-3 border border-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FFA052] rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "75%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-widest font-bold">
            Stealth Development · 75% Complete
          </span>
        </motion.div>

      </div>
    </section>
  );
}
