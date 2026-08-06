"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Trail } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ── Mouse tracker hook ── */
function useMouse() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return mouse;
}

/* ── Animated particle nodes on a sphere surface ── */
function NeuralNodes({ count = 120 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#E8611A" }), []);
  const geo = useMemo(() => new THREE.SphereGeometry(0.025, 6, 6), []);

  const positions = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      arr.push(
        new THREE.Vector3(
          2.4 * Math.sin(phi) * Math.cos(theta),
          2.4 * Math.cos(phi),
          2.4 * Math.sin(phi) * Math.sin(theta)
        )
      );
    }
    return arr;
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    positions.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  return <instancedMesh ref={meshRef} args={[geo, mat, count]} />;
}

/* ── Neural connection lines ── */
function NeuralLines({ count = 60 }: { count?: number }) {
  const nodeCount = 120;
  const positions = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      pts.push(
        new THREE.Vector3(
          2.4 * Math.sin(phi) * Math.cos(theta),
          2.4 * Math.cos(phi),
          2.4 * Math.sin(phi) * Math.sin(theta)
        )
      );
    }
    return pts;
  }, []);

  const geo = useMemo(() => {
    const verts: number[] = [];
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * nodeCount);
      const b = Math.floor(Math.random() * nodeCount);
      verts.push(...positions[a].toArray(), ...positions[b].toArray());
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return g;
  }, [positions, count]);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#E8611A" transparent opacity={0.18} />
    </lineSegments>
  );
}

/* ── Central glowing orb ── */
function CoreOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (meshRef.current) meshRef.current.rotation.y += d * 0.3;
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.9, 4]} />
      <MeshDistortMaterial
        color="#E8611A"
        emissive="#E8611A"
        emissiveIntensity={0.6}
        distort={0.35}
        speed={2}
        transparent
        opacity={0.15}
        wireframe
      />
    </mesh>
  );
}

/* ── Orbiting rings ── */
function OrbitRing({ radius, speed, tilt, color }: { radius: number; speed: number; tilt: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.z += d * speed; });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 8, 80]} />
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </mesh>
  );
}

/* ── Orbiting particle balls ── */
function OrbiterDot({ radius, speed, offset, color }: { radius: number; speed: number; offset: number; color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + offset;
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.4) * 0.3, Math.sin(t) * radius);
  });
  return (
    <Trail width={0.6} length={8} color={color} attenuation={(t) => t * t}>
      <group ref={ref}>
        <mesh>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </Trail>
  );
}

/* ── Background star field ── */
function StarField() {
  const geo = useMemo(() => {
    const verts = new Float32Array(4000 * 3);
    for (let i = 0; i < 4000; i++) {
      verts[i * 3] = (Math.random() - 0.5) * 40;
      verts[i * 3 + 1] = (Math.random() - 0.5) * 40;
      verts[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return g;
  }, []);
  return (
    <points geometry={geo}>
      <pointsMaterial size={0.04} color="#8896B0" sizeAttenuation transparent opacity={0.5} />
    </points>
  );
}

/* ── Floating geometric accent pieces ── */
function FloatingGeo({ pos, shape }: { pos: [number, number, number]; shape: "box" | "octahedron" | "tetra" }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.x += d * 0.3;
    ref.current.rotation.y += d * 0.4;
  });
  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={1.5} floatingRange={[-0.15, 0.15]}>
      <mesh ref={ref} position={pos}>
        {shape === "box" && <boxGeometry args={[0.2, 0.2, 0.2]} />}
        {shape === "octahedron" && <octahedronGeometry args={[0.18]} />}
        {shape === "tetra" && <tetrahedronGeometry args={[0.2]} />}
        <meshStandardMaterial
          color="#E8611A"
          emissive="#E8611A"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

/* ── Main scene group that follows mouse ── */
function Scene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouse.current.x * 0.3 - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x += (-mouse.current.y * 0.2 - groupRef.current.rotation.x) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <StarField />
      <CoreOrb />
      <NeuralNodes count={120} />
      <NeuralLines count={60} />

      <OrbitRing radius={3.2} speed={0.12} tilt={0.4} color="#E8611A" />
      <OrbitRing radius={3.8} speed={-0.07} tilt={1.2} color="#1B5FAA" />
      <OrbitRing radius={4.4} speed={0.05} tilt={0.8} color="#E8611A" />

      <OrbiterDot radius={3.2} speed={0.5} offset={0} color="#E8611A" />
      <OrbiterDot radius={3.8} speed={0.35} offset={2} color="#60A5FA" />
      <OrbiterDot radius={4.4} speed={0.25} offset={4} color="#E8611A" />

      <FloatingGeo pos={[-4, 1.5, -1]} shape="octahedron" />
      <FloatingGeo pos={[4, -1, -2]} shape="box" />
      <FloatingGeo pos={[-3, -2, 0]} shape="tetra" />
      <FloatingGeo pos={[4.5, 2, 1]} shape="octahedron" />
    </group>
  );
}

/* ── Camera controller ── */
function CameraRig() {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.z += (6 - camera.position.z) * 0.02;
  });
  return null;
}

/* ── Counter ── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number;
    let raf: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1600, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setVal(p < 1 ? ease * to : to);
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    const timer = setTimeout(() => { raf = requestAnimationFrame(animate); }, 700);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [to]);
  return <>{to % 1 !== 0 ? val.toFixed(1) : Math.floor(val)}{suffix}</>;
}

/* ── Marquee ── */
const TECH = ["OpenAI", "AWS", "Docker", "Python", "Next.js", "MongoDB", "TensorFlow", "Kubernetes", "PyTorch", "FastAPI", "Redis", "GraphQL"];

function Marquee() {
  const items = [...TECH, ...TECH];
  return (
    <div className="overflow-hidden py-3">
      <div style={{ display: "flex", gap: "3rem", width: "max-content", animation: "marquee 30s linear infinite" }}>
        {items.map((t, i) => (
          <span key={i} style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "#4F617A", textTransform: "uppercase", letterSpacing: "0.15em", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#E8611A", opacity: 0.7, display: "inline-block" }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── MAIN HERO ── */
export default function Hero() {
  const mouse = useMouse();
  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <section id="home" className="relative w-full h-screen overflow-hidden bg-[#04080F]">

        {/* 3D Canvas — full screen */}
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 55 }}
            gl={{ antialias: true, alpha: false }}
            dpr={[1, 2]}
          >
            <color attach="background" args={["#04080F"]} />
            <fog attach="fog" args={["#04080F", 12, 30]} />
            <ambientLight intensity={0.3} />
            <pointLight position={[0, 0, 0]} intensity={2} color="#E8611A" distance={8} decay={2} />
            <pointLight position={[5, 3, 2]} intensity={0.5} color="#1B5FAA" />
            <CameraRig />
            <Scene mouse={mouse} />
          </Canvas>
        </div>

        {/* Radial vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 30%, #04080F 100%)" }}
        />

        {/* CENTER TEXT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center pointer-events-none">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 pointer-events-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border"
              style={{ borderColor: "rgba(232,97,26,0.35)", background: "rgba(232,97,26,0.08)", backdropFilter: "blur(12px)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8611A] animate-pulse" />
              <span style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "#E8611A", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                Cortexia AI · Intelligence Engine Active
              </span>
            </span>
          </motion.div>

          {/* HERO TEXT */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              className="font-display font-bold text-white"
              style={{ fontSize: "clamp(3.2rem, 9vw, 7.5rem)", lineHeight: 0.95, letterSpacing: "-0.025em" }}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Engineering
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="font-display font-bold"
              style={{
                fontSize: "clamp(3.2rem, 9vw, 7.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                background: "linear-gradient(90deg, #E8611A 0%, #FFB380 45%, #E8611A 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 3s linear infinite",
              }}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Intelligence.
            </motion.h1>
          </div>

          <motion.p
            className="text-[#8896B0] font-light max-w-lg mb-10"
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", lineHeight: 1.7 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            We build AI systems, automation platforms, and enterprise software that 
            transform how modern businesses operate and scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-12 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <button
              onClick={() => scroll("#services")}
              className="group relative overflow-hidden flex items-center gap-2 px-8 py-4 rounded-xl text-white text-sm font-semibold"
              style={{ background: "#E8611A", boxShadow: "0 0 50px rgba(232,97,26,0.5)", transition: "all 0.3s" }}
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }} />
              Explore Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scroll("#work")}
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#8896B0", backdropFilter: "blur(12px)", transition: "all 0.3s" }}
            >
              View Our Work
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {[{ to: 50, suffix: "+", label: "Projects" }, { to: 99.9, suffix: "%", label: "Uptime" }, { to: 30, suffix: "+", label: "AI Systems" }].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl font-bold text-white">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: "0.65rem", color: "#4F617A", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.15em", marginTop: 2 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span style={{ fontSize: "0.6rem", fontFamily: "monospace", color: "#4F617A", textTransform: "uppercase", letterSpacing: "0.15em" }}>Scroll</span>
          <motion.div
            className="w-px bg-[#E8611A]"
            style={{ height: 30, originY: 0 }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Bottom tech marquee */}
        <motion.div
          className="absolute bottom-0 inset-x-0 z-20"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(4,8,15,0.7)", backdropFilter: "blur(12px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Marquee />
        </motion.div>
      </section>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}
