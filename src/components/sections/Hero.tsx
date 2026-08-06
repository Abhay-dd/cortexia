"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, Activity, Layers, Globe } from "lucide-react";

/* ── Mouse Listener Hook ──────────────────────────────────── */
function useMouse() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
  return mouse;
}

/* ── 3D AI Research Lab Core & Global Network Mesh ───────── */
function LabToWorldScene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  const nodeCount = 120;
  const { positions, lineGeo } = useMemo(() => {
    const pos: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      pos.push(
        new THREE.Vector3(
          2.5 * Math.sin(phi) * Math.cos(theta),
          2.5 * Math.cos(phi),
          2.5 * Math.sin(phi) * Math.sin(theta)
        )
      );
    }
    const verts: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (pos[i].distanceTo(pos[j]) < 1.3) {
          verts.push(...pos[i].toArray(), ...pos[j].toArray());
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return { positions: pos, lineGeo: g };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouse.current.x * 0.35 - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (-mouse.current.y * 0.2 - groupRef.current.rotation.x) * 0.03;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.25;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Quantum Lab Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.1, 4]} />
        <MeshDistortMaterial
          color="#FF6B00"
          emissive="#FF6B00"
          emissiveIntensity={0.6}
          distort={0.35}
          speed={2}
          roughness={0.1}
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>

      {/* Solid Inner Core */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#FF6B00" transparent opacity={0.8} />
      </mesh>

      {/* Concentric Lab Orbital Rings */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3.2, 0.01, 16, 100]} />
          <meshBasicMaterial color="#FF6B00" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[3.8, 0.008, 16, 100]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.2} />
        </mesh>
      </group>

      {/* Global Network Nodes & Connection Lines */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#FF6B00" transparent opacity={0.2} />
      </lineSegments>

      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color={i % 6 === 0 ? "#FFFFFF" : "#FF6B00"} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export default function Hero() {
  const mouse = useMouse();
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center bg-ambient-mesh pt-24 pb-16 overflow-hidden">
      
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FF6B00]/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story Headline */}
          <div className="lg:col-span-7 text-left">
            
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="badge-minimal mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
              AI Research Lab to Modern Enterprise
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-[clamp(2.8rem,5.8vw,5.5rem)] font-extrabold text-white leading-[1.04] tracking-tight mb-6"
            >
              Engineering <span className="text-gradient-orange">Intelligence.</span>
              <br />
              Empowering <span className="text-gradient-white">Businesses.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#A1A1AA] text-lg font-light leading-relaxed max-w-xl mb-10"
            >
              Cortexia AI bridges deep AI research with production-grade engineering — 
              transforming advanced neural models into autonomous workflows, modern software, 
              and scalable enterprise platforms.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-16"
            >
              <button
                onClick={() => scrollTo("#services")}
                className="btn-primary-orange text-sm py-4 px-8"
              >
                Explore Capabilities
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => scrollTo("#work")}
                className="btn-secondary-glass text-sm py-4 px-8"
              >
                View Deployed Work
              </button>
            </motion.div>

            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 max-w-lg"
            >
              <div>
                <div className="font-display text-3xl font-extrabold text-white">50+</div>
                <div className="text-[11px] font-mono text-[#A1A1AA] uppercase tracking-wider mt-1">Systems Deployed</div>
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold text-white">99.9%</div>
                <div className="text-[11px] font-mono text-[#A1A1AA] uppercase tracking-wider mt-1">Uptime SLA</div>
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold text-white">&lt; 40ms</div>
                <div className="text-[11px] font-mono text-[#A1A1AA] uppercase tracking-wider mt-1">Model Latency</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D AI Lab Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative h-[500px] w-full flex items-center justify-center"
          >
            <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
              <Canvas
                camera={{ position: [0, 0, 7.5], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
              >
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FF6B00" />
                <pointLight position={[-10, -10, -5]} intensity={1} color="#FFFFFF" />
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
                  <LabToWorldScene mouse={mouse} />
                </Float>
              </Canvas>
            </div>

            {/* Floating Live Telemetry Badge 1 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 left-0 card-luxury p-4 shadow-2xl pointer-events-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">AI Research Lab</div>
                  <div className="text-[10px] font-mono text-[#FF6B00]">Neural Core Active</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Live Telemetry Badge 2 */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 right-0 card-luxury p-4 shadow-2xl pointer-events-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Enterprise Scale</div>
                  <div className="text-[10px] font-mono text-[#A1A1AA]">Global Deployment</div>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
