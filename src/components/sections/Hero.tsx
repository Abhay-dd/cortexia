"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Trail } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

/* ── Mouse tracker ── */
function useMouse() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return mouse;
}

/* ── Neural brain sphere ── */
function NeuralSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const nodeCount = 150;

  const { positions, lineGeo } = useMemo(() => {
    const pos: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      pos.push(new THREE.Vector3(
        2.6 * Math.sin(phi) * Math.cos(theta),
        2.6 * Math.cos(phi),
        2.6 * Math.sin(phi) * Math.sin(theta)
      ));
    }
    const verts: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (pos[i].distanceTo(pos[j]) < 1.4) {
          verts.push(...pos[i].toArray(), ...pos[j].toArray());
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return { positions: pos, lineGeo: g };
  }, []);

  useFrame((_, d) => {
    if (groupRef.current) groupRef.current.rotation.y += d * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Core pulsing orb */}
      <mesh>
        <icosahedronGeometry args={[1.0, 4]} />
        <MeshDistortMaterial
          color="#E8611A" emissive="#E8611A" emissiveIntensity={0.7}
          distort={0.4} speed={2.5} transparent opacity={0.12} wireframe
        />
      </mesh>

      {/* Inner solid glow */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#E8611A" emissive="#E8611A" emissiveIntensity={1.5}
          transparent opacity={0.08}
        />
      </mesh>

      {/* Connection lines */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#E8611A" transparent opacity={0.14} />
      </lineSegments>

      {/* Nodes */}
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.022, 6, 6]} />
          <meshBasicMaterial color={i % 8 === 0 ? "#FFB380" : "#E8611A"} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Orbiting rings ── */
function Rings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (r1.current) r1.current.rotation.z += d * 0.12;
    if (r2.current) r2.current.rotation.z -= d * 0.07;
    if (r3.current) r3.current.rotation.z += d * 0.05;
  });
  return (
    <>
      <mesh ref={r1} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[3.4, 0.01, 8, 100]} />
        <meshBasicMaterial color="#E8611A" transparent opacity={0.3} />
      </mesh>
      <mesh ref={r2} rotation={[1.2, 0.3, 0]}>
        <torusGeometry args={[4.0, 0.008, 8, 100]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.2} />
      </mesh>
      <mesh ref={r3} rotation={[0.8, 0.8, 0]}>
        <torusGeometry args={[4.6, 0.006, 8, 100]} />
        <meshBasicMaterial color="#E8611A" transparent opacity={0.15} />
      </mesh>
    </>
  );
}

/* ── Trailing orbiter ── */
function Orbiter({ radius, speed, offset, color }: { radius: number; speed: number; offset: number; color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + offset;
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.5) * 0.6, Math.sin(t) * radius);
  });
  return (
    <Trail width={1} length={10} color={color} attenuation={(t) => t * t * t}>
      <group ref={ref}>
        <mesh><sphereGeometry args={[0.05, 8, 8]} /><meshBasicMaterial color={color} /></mesh>
      </group>
    </Trail>
  );
}

/* ── Stars ── */
function Stars() {
  const geo = useMemo(() => {
    const v = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      v[i * 3] = (Math.random() - 0.5) * 50;
      v[i * 3 + 1] = (Math.random() - 0.5) * 50;
      v[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
    return g;
  }, []);
  return <points geometry={geo}><pointsMaterial size={0.035} color="#8896B0" sizeAttenuation transparent opacity={0.4} /></points>;
}

/* ── Floating shapes ── */
function Accent({ pos, shape }: { pos: [number,number,number]; shape: "oct"|"box"|"tet" }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => { if (ref.current) { ref.current.rotation.x += d*0.3; ref.current.rotation.y += d*0.4; }});
  return (
    <Float speed={1.2} floatIntensity={2}>
      <mesh ref={ref} position={pos}>
        {shape==="oct" && <octahedronGeometry args={[0.22]} />}
        {shape==="box" && <boxGeometry args={[0.22,0.22,0.22]} />}
        {shape==="tet" && <tetrahedronGeometry args={[0.24]} />}
        <meshStandardMaterial color="#E8611A" emissive="#E8611A" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} wireframe />
      </mesh>
    </Float>
  );
}

/* ── Mouse-reactive scene ── */
function Scene({ mouse }: { mouse: React.MutableRefObject<{x:number;y:number}> }) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouse.current.x * 0.25 - groupRef.current.rotation.y) * 0.025;
    groupRef.current.rotation.x += (-mouse.current.y * 0.15 - groupRef.current.rotation.x) * 0.025;
    (camera.position.z as number) += (6.5 - camera.position.z) * 0.02;
  });
  return (
    <group ref={groupRef}>
      <Stars />
      <NeuralSphere />
      <Rings />
      <Orbiter radius={3.4} speed={0.45} offset={0} color="#E8611A" />
      <Orbiter radius={4.0} speed={0.3} offset={2.1} color="#60A5FA" />
      <Orbiter radius={4.6} speed={0.2} offset={4.2} color="#FFB380" />
      <Accent pos={[-5,2,-1]} shape="oct" />
      <Accent pos={[5,-1.5,-2]} shape="box" />
      <Accent pos={[-4,-2.5,1]} shape="tet" />
      <Accent pos={[5.5,2.5,0]} shape="oct" />
    </group>
  );
}

/* ── Typewriter ── */
function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    let timeout: NodeJS.Timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, words]);

  return (
    <span className="text-[#E8611A]">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

/* ── Marquee ── */
const TECH = ["OpenAI GPT-4","AWS","Docker","Python","Next.js","MongoDB","TensorFlow","Kubernetes","PyTorch","FastAPI","Redis","React"];
function Marquee() {
  const items = [...TECH, ...TECH];
  return (
    <div className="overflow-hidden py-3.5">
      <div style={{ display:"flex", gap:"2.5rem", width:"max-content", animation:"marqueeScroll 30s linear infinite" }}>
        {items.map((t,i) => (
          <span key={i} style={{ fontSize:"0.68rem", fontFamily:"monospace", color:"#4F617A", textTransform:"uppercase", letterSpacing:"0.14em", display:"flex", alignItems:"center", gap:"0.5rem" }}>
            <span style={{ width:3, height:3, borderRadius:"50%", background:"#E8611A", opacity:0.6, display:"inline-block" }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const mouse = useMouse();
  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <>
      <section id="home" className="relative w-full h-screen overflow-hidden" style={{ background:"#04080F" }}>

        {/* 3D Canvas */}
        <div className="absolute inset-0">
          <Canvas camera={{ position:[0,0,10], fov:55 }} gl={{ antialias:true, alpha:false }} dpr={[1,1.5]}>
            <color attach="background" args={["#04080F"]} />
            <fog attach="fog" args={["#04080F",15,35]} />
            <ambientLight intensity={0.2} />
            <pointLight position={[0,0,0]} intensity={3} color="#E8611A" distance={10} decay={2} />
            <pointLight position={[6,4,2]} intensity={0.6} color="#3B82F6" />
            <Scene mouse={mouse} />
          </Canvas>
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background:"radial-gradient(ellipse 70% 80% at 50% 50%, transparent 20%, #04080F 90%)" }} />

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">

          {/* Badge */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1, ease:[0.16,1,0.3,1] }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
              style={{ border:"1px solid rgba(232,97,26,0.3)", background:"rgba(232,97,26,0.07)", backdropFilter:"blur(16px)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8611A] animate-pulse" />
              <span style={{ fontSize:"0.62rem", fontFamily:"monospace", color:"#E8611A", letterSpacing:"0.2em", textTransform:"uppercase" }}>
                AI Engineering · Software · Automation
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-1">
            <motion.div
              className="font-display font-bold text-white"
              style={{ fontSize:"clamp(2.8rem,8vw,6.5rem)", lineHeight:1.0, letterSpacing:"-0.03em" }}
              initial={{ y:"110%" }} animate={{ y:"0%" }}
              transition={{ duration:0.8, delay:0.2, ease:[0.16,1,0.3,1] }}
            >
              We Build AI That
            </motion.div>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.div
              className="font-display font-bold"
              style={{ fontSize:"clamp(2.8rem,8vw,6.5rem)", lineHeight:1.0, letterSpacing:"-0.03em" }}
              initial={{ y:"110%" }} animate={{ y:"0%" }}
              transition={{ duration:0.8, delay:0.35, ease:[0.16,1,0.3,1] }}
            >
              <Typewriter words={["Actually Works.", "Saves Hours.", "Scales Globally.", "Earns ROI.", "Changes Everything."]} />
            </motion.div>
          </div>

          <motion.p
            className="text-[#8896B0] font-light max-w-[540px] mb-10 leading-relaxed"
            style={{ fontSize:"clamp(0.95rem,1.7vw,1.1rem)" }}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.6 }}
          >
            Cortexia AI engineers intelligent software, autonomous AI agents, and custom automation
            platforms that give your business an unfair technological advantage.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.75 }}
          >
            <button onClick={() => scroll("#services")}
              className="group relative overflow-hidden flex items-center gap-2 px-8 py-4 rounded-xl text-white text-sm font-semibold"
              style={{ background:"#E8611A", boxShadow:"0 0 50px rgba(232,97,26,0.45)", transition:"all 0.3s" }}>
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                style={{ background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)" }} />
              See What We Build
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => scroll("#contact")}
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold"
              style={{ border:"1px solid rgba(255,255,255,0.1)", color:"#8896B0", backdropFilter:"blur(12px)", transition:"all 0.3s" }}>
              Talk To Our Team
            </button>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.button
          onClick={() => scroll("#services")}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4 }}>
          <span style={{ fontSize:"0.58rem", fontFamily:"monospace", color:"#4F617A", letterSpacing:"0.15em", textTransform:"uppercase" }}>Scroll to explore</span>
          <motion.div animate={{ y:[0,6,0] }} transition={{ duration:1.5, repeat:Infinity, ease:"easeInOut" }}>
            <ChevronDown className="w-4 h-4 text-[#E8611A]" />
          </motion.div>
        </motion.button>

        {/* Tech marquee */}
        <motion.div
          className="absolute bottom-0 inset-x-0 z-20"
          style={{ borderTop:"1px solid rgba(255,255,255,0.05)", background:"rgba(4,8,15,0.85)", backdropFilter:"blur(16px)" }}
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1 }}>
          <Marquee />
        </motion.div>
      </section>

      <style>{`
        @keyframes marqueeScroll { from { transform:translateX(0); } to { transform:translateX(-50%); } }
      `}</style>
    </>
  );
}
