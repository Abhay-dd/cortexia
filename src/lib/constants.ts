import {
  Brain,
  Workflow,
  Globe,
  Code,
  Cloud,
  Zap,
  Shield,
  Star,
  Users,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

// ─── Navigation ───────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
] as const;

// ─── Company Info ─────────────────────────────────────────────
export const COMPANY = {
  name: "Cortexia AI",
  tagline: "Engineering Intelligence. Empowering Businesses.",
  description:
    "Cortexia AI is an Artificial Intelligence company focused on developing intelligent software, AI-powered automation, custom web applications, cloud solutions, and innovative digital products.",
  mission:
    "To democratize artificial intelligence by building powerful, accessible, and scalable AI solutions that drive real business outcomes.",
  vision:
    "To become a global leader in applied AI engineering, creating a future where every business can harness the full potential of artificial intelligence.",
  email: "hello@cortexia.ai",
  phone: "+1 (555) 000-0000",
  address: "San Francisco, CA",
} as const;

// ─── Trust Indicators ─────────────────────────────────────────
export const TRUST_INDICATORS = [
  { icon: Brain, label: "AI Development" },
  { icon: Zap, label: "Automation" },
  { icon: Cloud, label: "Cloud" },
  { icon: Globe, label: "Web Applications" },
] as const;

// ─── Statistics ───────────────────────────────────────────────
export const STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "AI Models Deployed" },
  { value: 99.9, suffix: "%", label: "Uptime Guarantee" },
  { value: 24, suffix: "/7", label: "Support Available" },
] as const;

// ─── Values ───────────────────────────────────────────────────
export const VALUES = [
  {
    icon: Zap,
    title: "Innovation",
    description: "Pushing boundaries with cutting-edge AI technologies and novel engineering approaches.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Building trust through transparent practices, ethical AI, and honest communication.",
  },
  {
    icon: Star,
    title: "Quality",
    description: "Delivering enterprise-grade solutions with meticulous attention to detail and performance.",
  },
  {
    icon: TrendingUp,
    title: "Scalability",
    description: "Engineering solutions that grow with your business, from startup to enterprise scale.",
  },
  {
    icon: Users,
    title: "Customer Success",
    description: "Your success is our mission. We partner closely to ensure measurable business impact.",
  },
] as const;

// ─── Timeline ─────────────────────────────────────────────────
export const TIMELINE = [
  {
    year: "2023",
    title: "Foundation",
    description: "Cortexia AI was founded with a vision to make AI accessible to every business.",
  },
  {
    year: "2023",
    title: "First AI Products",
    description: "Launched our first suite of AI-powered automation tools and intelligent chatbots.",
  },
  {
    year: "2024",
    title: "Enterprise Expansion",
    description: "Scaled operations to serve enterprise clients with custom AI solutions and cloud infrastructure.",
  },
  {
    year: "2025",
    title: "Innovation Lab",
    description: "Established our AI research lab, pushing the boundaries of computer vision and NLP.",
  },
] as const;

// ─── Services ─────────────────────────────────────────────────
export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  gradient: string;
}

export const SERVICES: Service[] = [
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description:
      "Build intelligent systems that understand, learn, and adapt. From conversational AI to computer vision, we engineer AI solutions that transform your operations.",
    features: ["AI Chatbots", "AI Agents", "Computer Vision", "Machine Learning", "NLP Solutions"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Workflow,
    title: "Automation",
    description:
      "Eliminate manual processes and accelerate your workflows. Our automation solutions integrate seamlessly with your existing systems for maximum efficiency.",
    features: [
      "Business Automation",
      "Workflow Automation",
      "CRM Automation",
      "WhatsApp Automation",
      "Email Automation",
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Code,
    title: "Software Development",
    description:
      "From concept to deployment, we build robust, scalable software tailored to your business needs. Modern architecture, clean code, exceptional performance.",
    features: ["SaaS Platforms", "Enterprise Applications", "Admin Dashboards", "API Development"],
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "Deploy with confidence on modern cloud infrastructure. We architect, build, and manage cloud environments that are secure, scalable, and cost-effective.",
    features: ["AWS", "Docker", "CI/CD", "Cloud Infrastructure", "Deployment"],
    gradient: "from-emerald-500 to-teal-500",
  },
];

// ─── Projects ─────────────────────────────────────────────────
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
  status: "Live" | "In Development" | "Completed";
  image: string;
}

export const PROJECTS: Project[] = [
  {
    id: "ai-virtual-tryon",
    title: "AI Virtual Try-On",
    category: "Artificial Intelligence",
    description:
      "A cutting-edge virtual try-on platform powered by computer vision and generative AI, enabling customers to visualize products on themselves in real-time.",
    problem:
      "E-commerce fashion retailers faced high return rates due to customers being unable to visualize how clothing would look on them before purchasing.",
    solution:
      "We developed a real-time AI-powered virtual try-on system using advanced pose estimation, body segmentation, and generative adversarial networks to create photorealistic previews.",
    technologies: ["Python", "TensorFlow", "React", "WebGL", "AWS", "Computer Vision"],
    features: [
      "Real-time body tracking",
      "Photorealistic rendering",
      "Multi-angle support",
      "Mobile-optimized",
      "95% accuracy rate",
    ],
    results: ["40% reduction in returns", "3x increase in conversion", "2M+ virtual try-ons processed"],
    status: "Live",
    image: "/images/project-ai-tryon.jpg",
  },
  {
    id: "ai-automation-platform",
    title: "AI Automation Platform",
    category: "Automation",
    description:
      "An enterprise-grade automation platform that orchestrates complex business workflows using AI decision-making and intelligent process automation.",
    problem:
      "A logistics company was spending 200+ hours per week on manual data entry, routing decisions, and customer communication across fragmented systems.",
    solution:
      "We built a centralized AI automation platform that connects all business systems, makes intelligent routing decisions, and automates customer communications through multiple channels.",
    technologies: ["Node.js", "Python", "React", "PostgreSQL", "Redis", "Docker"],
    features: [
      "Smart workflow builder",
      "AI decision engine",
      "Multi-channel messaging",
      "Real-time analytics",
      "Custom integrations",
    ],
    results: ["85% reduction in manual work", "60% faster processing", "$500K annual savings"],
    status: "Live",
    image: "/images/project-automation.jpg",
  },
  {
    id: "enterprise-dashboard",
    title: "Enterprise Dashboard",
    category: "Software Development",
    description:
      "A comprehensive enterprise analytics dashboard with real-time data visualization, AI-powered insights, and customizable reporting for executive decision-making.",
    problem:
      "Enterprise stakeholders needed a unified view of business metrics across multiple departments, with the ability to drill down into specific data points and receive AI-generated insights.",
    solution:
      "We designed and built a modular dashboard platform with real-time data streaming, interactive visualizations, and an AI insights engine that surfaces anomalies and opportunities.",
    technologies: ["Next.js", "TypeScript", "D3.js", "GraphQL", "PostgreSQL", "AWS"],
    features: [
      "Real-time data streaming",
      "AI-powered insights",
      "Custom report builder",
      "Role-based access",
      "White-label ready",
    ],
    results: ["70% faster decision-making", "50+ integrated data sources", "10K+ daily active users"],
    status: "Completed",
    image: "/images/project-dashboard.jpg",
  },
  {
    id: "real-estate-platform",
    title: "Real Estate Platform",
    category: "Software Development",
    description:
      "A modern real estate platform with AI-powered property valuation, virtual tours, smart search, and automated lead management for property developers and agents.",
    problem:
      "Real estate agencies struggled with outdated listing management, inaccurate valuations, and disconnected lead tracking across multiple properties and developments.",
    solution:
      "We created an all-in-one real estate platform with AI valuation models, 3D virtual tours, intelligent search with natural language queries, and a complete CRM for lead management.",
    technologies: ["React", "Node.js", "Python", "MongoDB", "Three.js", "TensorFlow"],
    features: [
      "AI property valuation",
      "3D virtual tours",
      "Smart search & filters",
      "Automated lead management",
      "Market analytics",
    ],
    results: ["30% more accurate valuations", "5x more property views", "200+ properties listed"],
    status: "Live",
    image: "/images/project-realestate.jpg",
  },
  {
    id: "custom-ai-assistant",
    title: "Custom AI Assistant",
    category: "Artificial Intelligence",
    description:
      "An intelligent AI assistant built for a financial services firm, capable of document analysis, regulatory compliance checking, and client communication automation.",
    problem:
      "Financial advisors were spending excessive time on regulatory document review, compliance checking, and routine client communications, limiting their capacity for advisory work.",
    solution:
      "We developed a domain-specific AI assistant trained on financial regulations and firm-specific policies, with capabilities for document analysis, compliance verification, and intelligent client communication drafting.",
    technologies: ["Python", "LangChain", "OpenAI", "React", "FastAPI", "Vector DB"],
    features: [
      "Document analysis",
      "Compliance checking",
      "Smart email drafting",
      "Knowledge base search",
      "Audit trail",
    ],
    results: ["75% time saved on compliance", "99.2% accuracy rate", "500+ documents processed daily"],
    status: "Live",
    image: "/images/project-ai-assistant.jpg",
  },
];

export const PROJECT_CATEGORIES = ["All", ...new Set(PROJECTS.map((p) => p.category))];

// ─── Social Links ─────────────────────────────────────────────
export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/company/cortexia-ai", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/cortexia-ai", icon: "github" },
  { label: "Instagram", href: "https://instagram.com/cortexia.ai", icon: "instagram" },
  { label: "Email", href: "mailto:hello@cortexia.ai", icon: "mail" },
] as const;

// ─── Footer Links ─────────────────────────────────────────────
export const FOOTER_LINKS = {
  quickLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Our Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
  services: [
    { label: "Artificial Intelligence", href: "#services" },
    { label: "Automation", href: "#services" },
    { label: "Software Development", href: "#services" },
    { label: "Cloud & DevOps", href: "#services" },
  ],
} as const;
