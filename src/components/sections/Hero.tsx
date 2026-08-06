"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Trail, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles as SparklesIcon, ShieldCheck, Cpu, Zap, Activity } from "lucide-react";

/* ── Mouse Coordinates Hook ──────────────────────────────── */
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

/* ── 3D Liquid & Refractive Glass Core ────────────────────── */
function LiquidGlassOrb() {
  const outerGlassRef = useRef<THREE.Mesh>(null);
  const innerLiquidRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Group>(null);
  const ringRef2 = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outerGlassRef.current) {
      outerGlassRef.current.rotation.y = t * 0.2;
      outerGlassRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
    if (innerLiquidRef.current) {
      innerLiquidRef.current.rotation.y = -t * 0.4;
      innerLiquidRef.current.rotation.z = Math.cos(t * 0.25) * 0.15;
    }
    if (ringRef1.current) ringRef1.current.rotation.z = t * 0.3;
    if (ringRef2.current) ringRef2.current.rotation.x = t * 0.25;
  });

  return (
    <group>
      {/* Inner Volumetric Liquid Blob */}
      <mesh ref={innerLiquidRef}>
        <sphereGeometry args={[1.35, 64, 64]} />
        <MeshDistortMaterial
          color="#00FF9D"
          emissive="#00FF9D"
          emissiveIntensity={0.8}
          distort={0.45}
          speed={3}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Refractive Glass Shell */}
      <mesh ref={outerGlassRef}>
        <sphereGeometry args={[1.85, 64, 64]} />
        <meshPhysicalMaterial
          color="#0B1626"
          emissive="#00E5FF"
          emissiveIntensity={0.15}
          transmission={0.92}
          opacity={1}
          transparent={true}
          roughness={0.05}
          metalness={0.1}
          ior={1.45}
          thickness={1.5}
          specularIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          wireframe={false}
        />
      </mesh>

      {/* Holographic Emerald Ring 1 */}
      <group ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.5, 0.015, 16, 100]} />
          <meshBasicMaterial color="#00FF9D" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Holographic Cyan Ring 2 */}
      <group ref={ringRef2} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[2.9, 0.01, 16, 100]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

/* ── 3D Gravity Particle Swarm ────────────────────────────── */
function GravityParticleSwarm({ count = 220 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = 0.2 + Math.random() * 0.6;
      data.push({ radius, theta, phi, speed, size: 0.02 + Math.random() * 0.03 });
    }
    return data;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    particles.forEach((p, i) => {
      const currentTheta = p.theta + t * p.speed * 0.3;
      const x = p.radius * Math.sin(p.phi) * Math.cos(currentTheta);
      const y = p.radius * Math.cos(p.phi) + Math.sin(t * p.speed + i) * 0.2;
      const z = p.radius * Math.sin(p.phi) * Math.sin(currentTheta);

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(p.size * (1 + Math.sin(t * 2 + i) * 0.3));
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00FF9D" transparent opacity={0.85} />
    </instancedMesh>
  );
}

/* ── Orbiting Laser Commets ──────────────────────────────── */
function LaserComet({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed;
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.8) * 0.5, Math.sin(t) * radius);
  });

  return (
    <Trail width={1.2} length={12} color={color} attenuation={(t) => t * t}>
      <group ref={ref}>
        <mesh>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </Trail>
  );
}

/* ── Interactive Camera & Mouse Controller ───────────────── */
function InteractiveScene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const sceneRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (!sceneRef.current) return;
    sceneRef.current.rotation.y += (mouse.current.x * 0.4 - sceneRef.current.rotation.y) * 0.04;
    sceneRef.current.rotation.x += (-mouse.current.y * 0.25 - sceneRef.current.rotation.x) * 0.04;
    camera.position.z += (7 - camera.position.z) * 0.025;
  });

  return (
    <group ref={sceneRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <LiquidGlassOrb />
        <GravityParticleSwarm count={240} />
        <LaserComet radius={3.2} speed={0.6} color="#00FF9D" />
        <LaserComet radius={3.9} speed={-0.45} color="#00E5FF" />
      </Float>
    </group>
  );
}

export default function Hero() {
  const mouse = useMouse();
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center bg-matrix overflow-hidden pt-24 pb-16">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00FF9D]/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00E5FF]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Headline & CTAs */}
          <div className="lg:col-span-7 text-left">
            
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full card-chrome border-[#00FF9D]/30 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse shadow-[0_0_8px_#00FF9D]" />
              <span className="text-xs font-mono text-[#00FF9D] uppercase tracking-widest font-semibold">
                Autonomous AI Systems · Next-Gen Engineering
              </span>
            </motion.div>

            {/* Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-[clamp(2.8rem,5.5vw,5.2rem)] font-extrabold text-white leading-[1.03] tracking-tight mb-6"
            >
              Engineering <span className="text-gradient-laser">Intelligence.</span>
              <br />
              Empowering <span className="text-gradient-emerald">Businesses.</span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#8FA3BF] text-lg font-light leading-relaxed max-w-xl mb-10"
            >
              Cortexia AI architects custom neural models, autonomous enterprise agents, 
              and scalable cloud infrastructure that automate complex workflows and drive exponential ROI.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <button
                onClick={() => scrollTo("#services")}
                className="btn-emerald text-sm py-4 px-8"
              >
                Explore Capabilities
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
              
              <button
                onClick={() => scrollTo("#work")}
                className="btn-chrome text-sm py-4 px-8"
              >
                View Deployed Work
              </button>
            </motion.div>

            {/* Live Metrics Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-[rgba(0,255,157,0.12)] max-w-lg"
            >
              <div>
                <div className="font-display text-3xl font-extrabold text-white">50+</div>
                <div className="text-[11px] font-mono text-[#00FF9D] uppercase tracking-wider mt-1">Enterprise Systems</div>
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold text-white">99.9%</div>
                <div className="text-[11px] font-mono text-[#00FF9D] uppercase tracking-wider mt-1">Uptime SLA</div>
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold text-white">&lt; 40ms</div>
                <div className="text-[11px] font-mono text-[#00FF9D] uppercase tracking-wider mt-1">Model Latency</div>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Interactive 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative h-[520px] w-full flex items-center justify-center"
          >
            {/* Canvas Container */}
            <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
              <Canvas
                camera={{ position: [0, 0, 7], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00FF9D" />
                <pointLight position={[-10, -10, -5]} intensity={1} color="#00E5FF" />
                <InteractiveScene mouse={mouse} />
              </Canvas>
            </div>

            {/* Floating Live Badge 1 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 left-0 card-chrome rounded-2xl p-4 border-[#00FF9D]/30 backdrop-blur-xl shadow-2xl pointer-events-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#00FF9D]/15 border border-[#00FF9D]/30 flex items-center justify-center text-[#00FF9D]">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Neural Core Active</div>
                  <div className="text-[10px] font-mono text-[#00FF9D]">cortexia-engine v4.2</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Live Badge 2 */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 right-0 card-chrome rounded-2xl p-4 border-[#00FF9D]/30 backdrop-blur-xl shadow-2xl pointer-events-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#00E5FF]/15 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">30+ AI Models</div>
                  <div className="text-[10px] font-mono text-[#00E5FF]">Real-time Telemetry</div>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
