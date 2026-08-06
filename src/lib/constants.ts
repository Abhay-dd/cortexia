import {
  Brain,
  Workflow,
  Code,
  Cloud,
  ShieldCheck,
  Zap,
  TrendingUp,
  Lock,
  type LucideIcon,
} from "lucide-react";

// ─── Navigation Links ─────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Why Cortexia", href: "#why-cortexia" },
  { label: "Services", href: "#services" },
  { label: "Featured Work", href: "#work" },
  { label: "Technology", href: "#technology" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
] as const;

// ─── Company Info ─────────────────────────────────────────────
export const COMPANY = {
  name: "Cortexia AI",
  tagline: "Engineering Intelligence. Empowering Businesses.",
  description:
    "Cortexia AI develops intelligent software, autonomous agentic systems, custom web applications, cloud solutions, and enterprise digital platforms.",
  mission:
    "To build reliable, secure, and scalable artificial intelligence that transforms enterprise capabilities and operations.",
  email: "hello@cortexia.ai",
  address: "San Francisco, CA",
} as const;

// ─── Trust Metrics ────────────────────────────────────────────
export const METRICS = [
  { value: 50, suffix: "+", label: "Enterprise Projects" },
  { value: 30, suffix: "+", label: "AI Models Deployed" },
  { value: 99.9, suffix: "%", label: "Uptime SLA" },
  { value: 24, suffix: "/7", label: "Support & Monitoring" },
] as const;

// ─── Why Cortexia AI Pillars ──────────────────────────────────
export const WHY_CORTEXIA_PILLARS = [
  {
    icon: ShieldCheck,
    title: "Enterprise Rigor & Security",
    description:
      "SOC2-compliant architectures, encrypted model pipelines, and deterministic fallbacks designed for zero-risk adoption.",
  },
  {
    icon: Brain,
    title: "Custom AI Architecture",
    description:
      "Domain-specific model tuning, autonomous multi-agent orchestration, and proprietary computer vision algorithms.",
  },
  {
    icon: Zap,
    title: "High-Throughput Performance",
    description:
      "Sub-50ms latency response times, auto-scaling cloud compute, and optimized vector search indexing.",
  },
  {
    icon: TrendingUp,
    title: "Proven Business Outcomes",
    description:
      "Measurable efficiency gains, automated manual processes, and direct bottom-line operational savings.",
  },
] as const;

// ─── Services ─────────────────────────────────────────────────
export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

export const SERVICES: Service[] = [
  {
    id: "ai",
    icon: Brain,
    title: "Artificial Intelligence",
    subtitle: "Custom ML Models & Autonomous Agents",
    description:
      "We design and deploy custom intelligent systems tailored to complex enterprise workflows. From agentic reasoning to computer vision, we engineer precision AI.",
    features: [
      "Autonomous AI Agents",
      "Enterprise Chatbots",
      "Computer Vision & Perception",
      "Machine Learning Engineering",
      "Natural Language Processing",
    ],
  },
  {
    id: "automation",
    icon: Workflow,
    title: "Intelligent Automation",
    subtitle: "End-to-End Workflow Optimization",
    description:
      "Eliminate repetitive manual overhead with intelligent process automation that orchestrates data across your entire software ecosystem.",
    features: [
      "Business Process Automation",
      "Complex Workflow Orchestration",
      "CRM & ERP Automation",
      "WhatsApp & Multi-Channel Bots",
      "Email & Document Automation",
    ],
  },
  {
    id: "software",
    icon: Code,
    title: "Software Engineering",
    subtitle: "Modern Web & Enterprise Platforms",
    description:
      "Robust, high-throughput custom software built with modern frontends, scalable backends, clean architecture, and intuitive user experiences.",
    features: [
      "SaaS Platforms",
      "Enterprise Applications",
      "Executive Dashboards",
      "High-Performance APIs",
    ],
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud & DevOps",
    subtitle: "Resilient Cloud Infrastructure",
    description:
      "Deploy and manage high-availability infrastructure. We architect secure, auto-scaling environments optimized for AI workloads.",
    features: [
      "AWS Architecture",
      "Docker & Kubernetes",
      "Automated CI/CD Pipelines",
      "Cloud Security & Compliance",
      "Infrastructure Monitoring",
    ],
  },
];

// ─── Featured Projects / Case Studies ─────────────────────────
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  results: string[];
  status: string;
}

export const PROJECTS: Project[] = [
  {
    id: "ai-virtual-tryon",
    title: "AI Virtual Try-On",
    category: "Artificial Intelligence",
    description:
      "Computer vision and generative AI platform enabling real-time product preview for e-commerce customers.",
    problem:
      "Retailers suffered high product return rates due to customer uncertainty around garment fit and visualization.",
    solution:
      "Engineered real-time body tracking, pose estimation, and neural rendering to generate photorealistic previews in <100ms.",
    technologies: ["Python", "TensorFlow", "React", "WebGL", "AWS"],
    features: ["Real-Time Body Tracking", "Multi-Angle Pose Support", "Mobile WebGL Pipeline"],
    results: ["40% Reduction in Returns", "3.2x Conversion Increase"],
    status: "Production",
  },
  {
    id: "ai-automation-platform",
    title: "AI Automation Engine",
    category: "Automation",
    description:
      "Enterprise workflow automation platform connecting legacy software with intelligent decision routing.",
    problem:
      "Logistics enterprise wasted 200+ hours weekly on manual data translation across fragmented systems.",
    solution:
      "Built a centralized AI automation hub with smart routing algorithms and multi-channel notification bots.",
    technologies: ["Node.js", "Python", "PostgreSQL", "Redis", "Docker"],
    features: ["Visual Flow Builder", "AI Routing Engine", "Real-Time Telemetry"],
    results: ["85% Manual Task Reduction", "$500K Annual Overhead Savings"],
    status: "Production",
  },
  {
    id: "enterprise-dashboard",
    title: "Predictive Enterprise Analytics",
    category: "Software Development",
    description:
      "Executive decision platform combining live streaming analytics with automated predictive insights.",
    problem:
      "Leadership required unified metrics across global operational teams without manual reporting delays.",
    solution:
      "Designed a real-time data visualization platform with AI anomaly detection and automated report generation.",
    technologies: ["Next.js", "TypeScript", "D3.js", "GraphQL", "AWS"],
    features: ["Streaming Visualizations", "AI Anomaly Detection", "Custom Executive Export"],
    results: ["70% Faster Decision Velocity", "10,000+ Daily Active Users"],
    status: "Production",
  },
  {
    id: "real-estate-platform",
    title: "Intelligent Real Estate Platform",
    category: "Software Development",
    description:
      "Property platform with automated AI valuation models, 3D interactive tours, and lead routing.",
    problem:
      "Property developers faced fragmented listing systems and slow lead qualification turnaround times.",
    solution:
      "Developed an all-in-one platform integrating automated property valuation algorithms and virtual tours.",
    technologies: ["React", "Node.js", "MongoDB", "Three.js", "TensorFlow"],
    features: ["AI Valuation Model", "3D Interactive Tours", "Automated Lead Pipeline"],
    results: ["30% Higher Valuation Accuracy", "5x View Duration"],
    status: "Production",
  },
];

export const PROJECT_CATEGORIES = ["All", "Artificial Intelligence", "Automation", "Software Development"];

// ─── Tech Stack Items ─────────────────────────────────────────
export const TECH_STACK = [
  { name: "OpenAI", role: "LLMs & Foundation Models" },
  { name: "AWS", role: "Scalable Cloud Compute" },
  { name: "Docker", role: "Containerization & K8s" },
  { name: "Python", role: "AI Research & Deep Learning" },
  { name: "Next.js", role: "Enterprise Web Architecture" },
  { name: "MongoDB", role: "High-Performance Data Storage" },
] as const;

// ─── Footer Links ─────────────────────────────────────────────
export const FOOTER_LINKS = {
  quickLinks: [
    { label: "Home", href: "#home" },
    { label: "Why Cortexia", href: "#why-cortexia" },
    { label: "Services", href: "#services" },
    { label: "Featured Work", href: "#work" },
    { label: "Technology", href: "#technology" },
    { label: "Products", href: "#products" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
