"use client";

import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [position, setPosition] = useState({ x: -400, y: -400 });

  useEffect(() => {
    let animationId: number;
    let targetX = -400;
    let targetY = -400;
    let currentX = -400;
    let currentY = -400;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setPosition({ x: currentX, y: currentY });
      animationId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      className="fixed z-[1] pointer-events-none transition-opacity duration-500"
      style={{
        left: position.x - 300,
        top: position.y - 300,
        width: 600,
        height: 600,
        background:
          "radial-gradient(circle, rgba(59, 130, 246, 0.045) 0%, rgba(6, 182, 212, 0.02) 45%, transparent 70%)",
        borderRadius: "50%",
      }}
      aria-hidden="true"
    />
  );
}
