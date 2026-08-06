"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({ value, suffix = "", label, duration = 2 }: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start: number;
    let raf: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * value);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, duration]);

  const display = value % 1 !== 0 ? count.toFixed(1) : Math.floor(count).toString();

  return (
    <div ref={ref}>
      <div className="font-display text-3xl font-bold text-[#E8611A] mb-1">
        {display}<span>{suffix}</span>
      </div>
      <div className="text-[10px] text-[#4F617A] font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
}
