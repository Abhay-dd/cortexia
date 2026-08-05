"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
  hoverLift?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hoverGlow = true,
  hoverLift = true,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 transition-all duration-300",
        hoverGlow && "hover:border-primary/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)]",
        hoverLift && "hover:-translate-y-1",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
