"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  label,
  duration = 2,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * value);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isInView, value, duration]);

  const displayValue = value % 1 !== 0 ? count.toFixed(1) : Math.floor(count).toString();

  return (
    <div ref={ref}>
      <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-1">
        {displayValue}
        <span className="text-blue-400 font-mono text-3xl">{suffix}</span>
      </div>
      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}
