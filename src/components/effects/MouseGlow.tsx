"use client";

import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed z-[1] pointer-events-none transition-opacity duration-300"
      style={{
        left: position.x - 200,
        top: position.y - 200,
        width: 400,
        height: 400,
        background:
          "radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, rgba(6, 182, 212, 0.03) 40%, transparent 70%)",
        borderRadius: "50%",
      }}
      aria-hidden="true"
    />
  );
}
