"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  gradient = true,
  className = "",
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <h2
        className={cn(
          "font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight",
          gradient && "gradient-text"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <motion.div
        className={cn(
          "mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent",
          align === "center" && "mx-auto"
        )}
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </motion.div>
  );
}
