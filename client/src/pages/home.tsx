import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Brain, HeartPulse, Atom, Video, Target, Globe, Shield, Cpu,
  ChevronDown, ArrowRight, Check, Zap, Lock, TrendingUp,
  BarChart3, Layers, Network, X, ExternalLink, Eye, Scale, Search,
  Play, Pause, DollarSign, Rocket, Crown, Quote, Building2,
  Download, Mic, Grid3X3, ChevronRight, Sparkles, MessageSquare,
  Users, MapPin, FileText, Mail, Calendar, Clock, Award,
  Hexagon, Star, Activity, Database, Code, Landmark, Pill,
  FlaskConical, Briefcase, LineChart, PieChart, Gauge, Trophy,
  CheckCircle2, XCircle, AlertCircle, Infinity, Heart, Lightbulb,
  BookOpen, Globe2, RefreshCw, Layers2, CircleDot, Wifi,
  Megaphone, Gamepad2
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
  LineChart as ReLineChart, Line, AreaChart, Area, CartesianGrid,
  PieChart as RePieChart, Pie, Legend
} from "recharts";
import TermSheet from "@/components/TermSheet";
import MarketResearch from "@/components/MarketResearch";
import StateOfDisruption from "@/components/StateOfDisruption";
import C1Assistant from "@/components/C1Assistant";
import DeltaDoctrine from "@/components/DeltaDoctrine";
import FortressMoat from "@/components/FortressMoat";
import InvasionPlan from "@/components/InvasionPlan";
import TheAsk from "@/components/TheAsk";

/* ══════════════════════════════════════════════════════════════════
   UTILITY HOOKS
   ══════════════════════════════════════════════════════════════════ */

function useCountUp(target: number, duration: number = 2000, inView: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, inView]);
  return count;
}

/* ══════════════════════════════════════════════════════════════════
   QUANTUM PARTICLE CANVAS
   ══════════════════════════════════════════════════════════════════ */

function QuantumCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string; opacity: number }[] = [];
    const PARTICLE_COUNT = 80;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        color: Math.random() > 0.5 ? "#00e6d3" : "#00a7ff",
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />;
}

/* ══════════════════════════════════════════════════════════════════
   SECTION WRAPPER
   ══════════════════════════════════════════════════════════════════ */

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative py-24 px-4 md:px-8 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-px bg-[#00e6d3]" />
      <span className="text-[#00e6d3] text-xs font-semibold tracking-[0.2em] uppercase font-['Satoshi']">{children}</span>
      <div className="w-6 h-px bg-[#00e6d3]" />
    </div>
  );
}

function RevealDiv({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════ */

const NAV_SECTIONS = [
  { id: "hero", label: "Overview" },
  { id: "quantum", label: "Vision" },
  { id: "company", label: "Company" },
  { id: "matrix", label: "25/25" },
  { id: "products", label: "Products" },
  { id: "doctrine", label: "Doctrine" },
  { id: "moat", label: "Moat" },
  { id: "fortress", label: "Fortress" },
  { id: "market", label: "Market" },
  { id: "gtm", label: "GTM" },
  { id: "invasion", label: "Invasion" },
  { id: "revenue", label: "Revenue" },
  { id: "financials", label: "Financials" },
  { id: "valuation", label: "Valuation" },
  { id: "investment", label: "Investment" },
  { id: "ask", label: "The Ask" },
  { id: "disruption", label: "Disruption" },
  { id: "ethics", label: "Ethics" },
  { id: "gaps", label: "Gaps" },
];

const PRODUCTS = [
  {
    name: "ATOM Enterprise AI",
    slug: "enterprise-ai",
    tagline: "The Governance Backbone",
    icon: Shield,
    color: "#00e6d3",
    maturity: "SHIPPING",
    description: "5-layer enterprise intelligence framework with SOC2, HIPAA, post-quantum cryptography, VPC deployment. The infrastructure Fortune 500 CISOs require.",
    cost: "$5M–$8M",
    comparable: "Sierra AI — $635M raised",
    url: "https://www.nirmataholdings.com/enterprise-ai",
  },
  {
    name: "ATOM Voice Agent",
    slug: "voice-agents",
    tagline: "Empathic Voice Intelligence",
    icon: Mic,
    color: "#00e6d3",
    maturity: "SHIPPING",
    description: "Hume EVI empathic voice, OpenAI Realtime, ElevenLabs multi-provider. Real-time sentiment analysis with human-level nuance across enterprise workflows.",
    cost: "$1.5M–$2.5M",
    comparable: "ElevenLabs — $500M at $11B",
    url: "https://www.nirmataholdings.com/voice-agent-demo",
  },
  {
    name: "ATOM Agentic (AgenticIQ)",
    slug: "agentic-ai",
    tagline: "Autonomous Digital Workers",
    icon: Cpu,
    color: "#E040FB",
    maturity: "LIMITED BETA",
    description: "Brain-Spine-Digital Worker framework. HIPAA-ready autonomous agents executing multi-step enterprise workflows end-to-end without human intervention.",
    cost: "$2M–$3.5M",
    comparable: "Hippocratic AI — $370M raised",
    url: "https://www.nirmataholdings.com/agentic-ai",
  },
  {
    name: "ATOM IntentIQ",
    slug: "atom-intentiq",
    tagline: "6-Step Intent Discovery",
    icon: Search,
    color: "#7B61FF",
    maturity: "SHIPPING",
    description: "Buyer intent scoring and behavioral prediction. 6-Step Discovery Framework that understands what customers need before they articulate it.",
    cost: "$1M–$1.5M",
    comparable: "Gong — $7.2B valuation",
    url: "https://www.nirmataholdings.com/atom-intentiq",
  },
  {
    name: "ATOM GIS / Infrastructure Atlas",
    slug: "data-center-map",
    tagline: "Global Infrastructure Intelligence",
    icon: MapPin,
    color: "#00D4FF",
    maturity: "LIMITED BETA",
    description: "Global data center intelligence using PeeringDB, TeleGeography, Wikidata. Bridges virtual AI with physical space optimization.",
    cost: "$0.8M–$1.2M",
    comparable: "Nearmap — $1.1B acquisition",
    url: "https://www.nirmataholdings.com/data-center-map",
  },
  {
    name: "ATOM Browser",
    slug: "atom/search",
    tagline: "AI-Native Quantum Browser",
    icon: Globe,
    color: "#00D4FF",
    maturity: "R&D",
    description: "AI-native, quantum-forward browser with post-quantum cryptography. Not a browser with AI bolted on — AI that happens to render the web.",
    cost: "$3M–$5M",
    comparable: "Arc Browser — $550M pre-revenue",
    url: "",
    ctaLabel: "Get Early Access",
  },
  {
    name: "ATOM Dynamic Matrices",
    slug: "",
    tagline: "Interactive Vendor Intelligence",
    icon: Grid3X3,
    color: "#FFD700",
    maturity: "SHIPPING",
    description: "Dynamic interactive vendor comparison engine that powers transparent, verifiable competitive intelligence at enterprise scale.",
    cost: "$0.3M–$0.5M",
    comparable: "Gartner — Proprietary data moat",
    url: "https://www.nirmataholdings.com/resources/vendor-matrix",
  },
  {
    name: "ClinixAI Healthcare",
    slug: "clinix",
    tagline: "Ambient Scribe + Full RCM",
    icon: HeartPulse,
    color: "#FF6B9D",
    maturity: "SHIPPING",
    description: "Billing Agent AI + Ambient Scribe. 78% documentation time reduction. Full X12 RCM claims processing. $4M+ pipeline in 180 days. HIPAA-native with ML denial prediction.",
    cost: "$3.5M–$5.5M",
    comparable: "Abridge — $758M raised; Ambience — $313M",
    url: "https://www.clinixagent.com",
  },
  {
    name: "MoleculeAI / Antiquant",
    slug: "molecule",
    tagline: "Quantum Drug Discovery",
    icon: FlaskConical,
    color: "#A855F7",
    maturity: "R&D",
    description: "Quantum-classical hybrid drug discovery using SMILES notation, XGBoost, and VQE. TAM: $85B+. Democratizing pharmaceutical R&D.",
    cost: "$2.5M–$4M",
    comparable: "XtalPi — $1.6B; Xaira — $1.0B",
    url: "https://antiquant.vercel.app/",
  },
  {
    name: "Vidzee",
    slug: "vidzee",
    tagline: "AI Real Estate Intelligence",
    icon: Video,
    color: "#F59E0B",
    maturity: "LIMITED BETA",
    description: "AI-powered real estate intelligence tool designed to facilitate fast property sales through intelligent matching, visual AI analysis, and automated workflows.",
    cost: "$0.5M–$1M",
    comparable: "Matterport — $1.6B acquisition",
    url: "https://www.vidzee.ai",
  },
  {
    name: "ATOM Red Team",
    slug: "atom-red-team",
    tagline: "Automated AI security & adversarial testing",
    icon: Shield,
    color: "#ff6b8b",
    maturity: "SHIPPING",
    description: "Continuous AI red teaming: prompt injection resistance, model hallucination detection, jailbreak resistance, OWASP LLM Top 10 compliance. Built for the EU AI Act (Aug 2026) and NIST AI RMF. Cisco acquired comparable Robust Intelligence for ~$350-400M.",
    cost: "$3M–$5M",
    comparable: "Robust Intelligence (Cisco $350M), HiddenLayer $50M Series A",
    url: "https://atom-red-team-investor-pitch-zp6c.vercel.app",
    marketSize: "$1.75B (2025) → $6.17B (2030)",
    growthRate: "28.5% CAGR",
  },
  {
    name: "ΔTOM Sales Dominator",
    slug: "sales-dominator",
    tagline: "Voice-first AI sales acceleration",
    icon: Megaphone,
    color: "#00e6d3",
    maturity: "SHIPPING",
    description: "Voice-first AI sales platform that runs on Akamai Inference Cloud + NVIDIA Blackwell GPUs. Real-time call coaching, intent detection, conversation intelligence, and autonomous outbound at human speed. Combined TAM $25–30B in 2026 → $100B+ by 2033.",
    cost: "$8M–$12M",
    comparable: "Gong $4.5B, Outreach $4.4B, Apollo.io $1.6B",
    url: "https://atom-sales-dominator-ai.vercel.app",
    marketSize: "$30B TAM (sales engagement + AI sales + RevOps)",
    growthRate: "23.7% CAGR through 2035",
  },
  {
    name: "PhysioPS / HumanOS",
    slug: "physiops-humanos",
    tagline: "Clinical-grade ANS intelligence",
    icon: Activity,
    color: "#72f2a1",
    maturity: "SHIPPING",
    description: "Wearable + clinical platform measuring real-time ANS health via HRV, photoplethysmography, and 5-minute diagnostic protocols. Used by elite F1 teams, professional athletes, and physiologists. Comps: Oura ($11B, Oct 2025), WHOOP ($10.1B, Mar 2026), Welltory.",
    cost: "$6M–$10M",
    comparable: "Oura $11B, WHOOP $10.1B, Welltory",
    url: "https://humanos-ans-diagnostic.vercel.app",
    marketSize: "RPM $16.65B (2026) → $47.34B (2033)",
    growthRate: "16.1% CAGR",
  },
  {
    name: "ΔTOM Game Console",
    slug: "atom-game-console",
    tagline: "AI-native edge gaming console",
    icon: Gamepad2,
    color: "#74c0fc",
    maturity: "LIMITED BETA",
    description: "Hardware: $799/$899/$1099 SKUs with RTX 5070 (~22 TFLOPs), Zen 4 8C/16T, 32GB DDR5, 2TB NVMe Gen 5. Subscriptions $9.99–$19.99/mo. AI-native NPCs, generative gameplay, edge-streamed compute via Akamai Blackwell GPU backbone. Outperforms PS5 Pro and Xbox Series X.",
    cost: "$25M–$50M",
    comparable: "Inworld AI $500M, Playground (Series B)",
    url: "#",
    marketSize: "AI Gaming $4.4B (2025) → $51-67B (2033)",
    growthRate: "32–36% CAGR",
  },
];

const VENDOR_CAPS = [
  "Customer Owns IP",
  "Generative UI (GenUI)",
  "Full Hybrid Deploy",
  "Model-Agnostic BYO",
  "Voice+GenUI+Tool in VPC",
  "On-Prem Deploy",
  "Edge Deploy",
  "Zero-Training Guarantee",
];

type VendorStatus = "yes" | "no" | "partial";
const VENDOR_DATA: Record<string, VendorStatus[]> = {
  "ATOM":       ["yes","yes","yes","yes","yes","yes","yes","yes"],
  "Sierra":     ["no","no","no","partial","partial","no","no","no"],
  "Microsoft":  ["no","no","partial","no","partial","no","no","no"],
  "Google":     ["no","no","partial","no","partial","no","partial","no"],
  "Cognigy":    ["no","no","partial","partial","partial","no","no","no"],
  "Amazon":     ["no","no","partial","no","partial","no","partial","no"],
  "Kore.ai":    ["partial","no","partial","partial","partial","no","no","no"],
};

const VENDOR_SCORES: Record<string, number> = {
  "ATOM": 25, "Sierra": 19, "Microsoft": 17, "Google": 16, "Cognigy": 16, "Amazon": 15, "Kore.ai": 14,
};

const MOAT_LAYERS = [
  { name: "Technical IP", level: "Very High", time: "18–36 months", icon: Code, color: "#00e6d3", desc: "Full coverage on our 25-point enterprise framework, GenUI exclusivity, quantum drug discovery, post-quantum cryptography stack." },
  { name: "Data Network Effects", level: "High", time: "12–24 months", icon: Database, color: "#00e6d3", desc: "Customer deployments enrich agent performance. More data → smarter agents → more customers." },
  { name: "Switching Costs", level: "Very High", time: "6–12 months", icon: Lock, color: "#00e6d3", desc: "Deep integrations, custom configurations, trained domain models, and workflow dependencies." },
  { name: "Partnership Lock-in", level: "High", time: "12–18 months", icon: Briefcase, color: "#00e6d3", desc: "Akamai, Stedi, Hume AI, Perplexity (Sonar), arXiv (Research) exclusive channels." },
  { name: "Talent Density", level: "Moderate-High", time: "Ongoing", icon: Brain, color: "#00e6d3", desc: "100+ years combined enterprise AI experience. Knowledge that cannot be easily replicated." },
];

const TAM_MARKETS = [
  { name: "AI Sales Automation", now: 19.6, future: 100, cagr: "23.7%", product: "ΔTOM Sales Dominator", color: "#00e6d3" },
  { name: "Gaming Console Hardware", now: 34.07, future: 51.15, cagr: "7.6%", product: "ΔTOM Game Console (HW)", color: "#74c0fc" },
  { name: "AI in Gaming", now: 4.4, future: 66.84, cagr: "34%", product: "ΔTOM Game Console (AI)", color: "#b987ff" },
  { name: "Healthcare RCM", now: 72.9, future: 195.9, cagr: "11.6%", product: "ClinixAI", color: "#FF6B9D" },
  { name: "AI Red Teaming", now: 1.75, future: 18.6, cagr: "28.5%", product: "ΔTOM Red Team", color: "#ff6b8b" },
  { name: "Remote Patient Monitoring", now: 16.65, future: 47.34, cagr: "16.1%", product: "PhysioPS / HumanOS", color: "#72f2a1" },
  { name: "Digital Health & Wellness", now: 352, future: 720, cagr: "15.5%", product: "PhysioPS / HumanOS", color: "#00a89e" },
  { name: "Stem Cell Therapy", now: 22.89, future: 97.50, cagr: "~17%", product: "RRG.bio", color: "#ffd166" },
  { name: "Agentic AI", now: 9.87, future: 52.6, cagr: "46.3%", product: "ΔTOM Enterprise + Agentic", color: "#00e6d3" },
  { name: "Enterprise AI Platforms", now: 31.5, future: 175, cagr: "37.6%", product: "ΔTOM Framework", color: "#00a7ff" },
  { name: "Drug Discovery AI", now: 2.5, future: 12.0, cagr: "~30%", product: "MoleculeAI", color: "#A855F7" },
  { name: "Conversational AI", now: 12.06, future: 49.9, cagr: "32.7%", product: "ΔTOM Voice Agent", color: "#74c0fc" },
  { name: "Cybersecurity (Quantum)", now: 240, future: 500, cagr: "~13%", product: "ΔTOM Quantum Layer", color: "#ff6b8b" },
];

const ATOM_TIERS = [
  { name: "Atom Starter", price: "$5K–$10K/mo", annual: "$60K–$120K/yr", gm: "~83% GM", desc: "Mid-market entry · Up to 3 agents · 100K interactions/mo · Cloud deploy", color: "#00e6d3" },
  { name: "Atom Professional", price: "$25K/mo", annual: "$300K/yr", gm: "~83% GM", desc: "POV ENTRY POINT · 10 agents · 500K interactions/mo · 90-day POV start", color: "#00a7ff", featured: true },
  { name: "Atom Enterprise", price: "$65K/mo", annual: "$780K/yr", gm: "~80% GM", desc: "Full platform · Unlimited agents · VPC + on-prem · Zero upfront", color: "#b987ff" },
  { name: "Atom Custom", price: "Custom/mo", annual: "Negotiated annually", gm: "~75% GM", desc: "Multi-tenant white-label · Revenue share · Partner ecosystem", color: "#ffd166" },
];

const CLINIX_TIERS = [
  { name: "Scribe", price: "$800–$1,500/mo", gm: "Target ~85–90%", desc: "Solo/small practice, per provider", color: "#FF6B9D" },
  { name: "Practice", price: "$3K–$6K/mo", gm: "Target ~80–85%", desc: "Group practice, 5–20 providers", color: "#00e6d3" },
  { name: "Enterprise", price: "$10K–$20K/mo", gm: "Target ~78–82%", desc: "Multi-location, full X12 RCM", color: "#00e6d3" },
  { name: "Health System", price: "$30K–$60K/mo", gm: "Target ~75–80%", desc: "Hospital system, ML denial prediction", color: "#A855F7" },
];

const FINANCIAL_PROJECTIONS = [
  { year: "Y1 (2026)", revLow: 25, revHigh: 45, ebitdaNote: "Approaching breakeven", gmRange: "65–72%" },
  { year: "Y2 (2027)", revLow: 75, revHigh: 130, ebitdaNote: "10–18% margin", gmRange: "68–75%" },
  { year: "Y3 (2028)", revLow: 175, revHigh: 290, ebitdaNote: "22–30% margin", gmRange: "70–78%" },
  { year: "Y4 (2029)", revLow: 320, revHigh: 520, ebitdaNote: "30–38% margin", gmRange: "73–80%" },
  { year: "Y5 (2030)", revLow: 550, revHigh: 850, ebitdaNote: "35–42% margin", gmRange: "75–82%" },
];

const RADAR_DATA = [
  { subject: "IP Ownership", ATOM: 100, Competitors: 20 },
  { subject: "GenUI", ATOM: 100, Competitors: 0 },
  { subject: "Hybrid Deploy", ATOM: 100, Competitors: 35 },
  { subject: "Model-Agnostic", ATOM: 100, Competitors: 40 },
  { subject: "Post-Quantum", ATOM: 100, Competitors: 0 },
  { subject: "HIPAA+SOC2", ATOM: 100, Competitors: 55 },
  { subject: "Agentic", ATOM: 100, Competitors: 45 },
];

const COMP_TABLE = [
  { company: "Sierra AI", raised: "$635M", valuation: "$10B", products: "1 product (CX)" },
  { company: "Harvey AI", raised: "$3B", valuation: "$11B", products: "1 product (legal AI)" },
  { company: "Distyl AI", raised: "$175M", valuation: "$1.8B", products: "Multi-product AI" },
  { company: "Gong", raised: "$580M", valuation: "$4.5B", products: "1 product (revenue intelligence)" },
  { company: "Oura", raised: "$400M+", valuation: "$11B", products: "1 product (wearable)" },
  { company: "WHOOP", raised: "$575M+", valuation: "$10.1B", products: "1 product (wearable)" },
  { company: "Nirmata Holdings", raised: "$3.2M (just closed)", valuation: "$150M–$250M ask", products: "15 products (ΔTOM platform)" },
];

const FUNDS_ALLOCATION = [
  { name: "Engineering", value: 35, amount: "$14M", color: "#00e6d3" },
  { name: "Sales/GTM", value: 30, amount: "$12M", color: "#00e6d3" },
  { name: "Infrastructure", value: 15, amount: "$6M", color: "#00D4FF" },
  { name: "Customer Success", value: 10, amount: "$4M", color: "#FFD700" },
  { name: "G&A/Reserve", value: 10, amount: "$4M", color: "#A855F7" },
];

const MILESTONES = [
  { month: "Q1 2026 (NOW)", target: "Just closed $3.2M. 2 deals at $25K/mo ATOM Professional closing. Hundreds of deals in pipeline.", icon: Rocket, color: "#00e6d3" },
  { month: "Q2–Q3 2026", target: "Series A close $25M–$50M. 50–100 ATOM Professional/Enterprise deals on 36-mo terms. ARR exits Y1 at $25M–$45M.", icon: TrendingUp, color: "#00e6d3" },
  { month: "Year 2 (2027)", target: "Cross-sell flywheel hits — Sales Dominator + Red Team + Game Console + ClinixAI converging. ARR $75M–$130M.", icon: Crown, color: "#00D4FF" },
  { month: "Year 3 (2028)", target: "Unicorn threshold crossed. ARR $175M–$290M. Series B at $1B+ pre-money. International expansion (APAC, EU).", icon: Star, color: "#FFD700" },
  { month: "Year 5 (2030)", target: "$550M–$850M ARR. EBITDA-positive at 35–42% margin. IPO/strategic exit at $14B–$21B valuation.", icon: Trophy, color: "#A855F7" },
];

const ETHICS_PILLARS = [
  { title: "Customer Owns All IP", desc: "Contractual guarantee. Your data, your models, your intellectual property. Zero ambiguity.", icon: Lock },
  { title: "Zero-Training Guarantee", desc: "We never train on customer data. Your competitive advantage stays competitive.", icon: Shield },
  { title: "Human-in-the-Loop", desc: "All agentic systems include human governance checkpoints. AI augments, never replaces judgment.", icon: Users },
  { title: "Transparent Vendor Matrix", desc: "Every claim is verifiable. We publish the 25-dimension framework for transparency and welcome head-to-head comparison.", icon: Eye },
  { title: "Data Sovereignty", desc: "Customer controls where data lives — cloud, VPC, on-prem, or air-gapped.", icon: Globe },
  { title: "Compliance-Native", desc: "HIPAA, SOC2, FedRAMP built into architecture. Not bolted on afterward.", icon: CheckCircle2 },
  { title: "Emotional AI Intelligence", desc: "Hume EVI empathic voice. AI that understands human emotional context.", icon: Heart },
  { title: "Technosocialism Over Feudalism", desc: "Technology as democratic equalizer. AI for everyone, not just the powerful.", icon: Lightbulb },
];

const GTM_PHASES = [
  {
    phase: "Phase 1",
    name: "Forward Deployed Engineering (FDE)",
    icon: Code,
    color: "#00e6d3",
    desc: "Embed directly with enterprise clients. Deep technical integration that creates immediate value and deep switching costs.",
    channels: ["Direct Enterprise — 60%", "Partner/SI — 25%", "Cloud Marketplace — 10%", "Community/PLG — 5%"],
  },
  {
    phase: "Phase 2",
    name: "Proof of Value (Palantir Model)",
    icon: Activity,
    color: "#00e6d3",
    desc: "Outcome-based deployment. Measurable ROI within 90 days. Every POV becomes a reference customer and expansion anchor.",
    channels: ["Discovery → $100K–$150K", "Rapid Deploy → $150K–$250K", "MRR → $25K–$65K/mo"],
  },
  {
    phase: "Phase 3",
    name: "Platform Expansion & MRR",
    icon: Rocket,
    color: "#00D4FF",
    desc: "150% NRR target. Land on one product, expand to the full nervous system. Every enterprise customer becomes a multi-product account.",
    channels: ["Expansion → $65K–$150K/mo", "Strategic Partner → $150K+/mo", "Target NRR: 130–150%+"],
  },
];

const PARTNERS = [
  { name: "Akamai / Linode", role: "Infrastructure", icon: Globe },
  { name: "Stedi", role: "Healthcare EDI", icon: FileText },
  { name: "Hume AI", role: "Empathic Voice", icon: Mic },
  { name: "Perplexity", role: "AI Search & Research", icon: Sparkles },
  { name: "F1 Teams", role: "Motorsport AI", icon: Activity },
  { name: "arXiv", role: "Research & Publications", icon: BookOpen },
];

/* ══════════════════════════════════════════════════════════════════
   TYPING ANIMATION
   ══════════════════════════════════════════════════════════════════ */

function TypeWriter({ text, delay = 0, speed = 40 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span>
      {displayed}
      {!done && started && <span className="typing-cursor" />}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════
   STAT COUNTER COMPONENT
   ══════════════════════════════════════════════════════════════════ */

function StatCounter({ value, prefix = "", suffix = "", label }: { value: number; prefix?: string; suffix?: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(value, 2000, inView);
  const isDone = count === value && inView;

  return (
    <div ref={ref} className="text-center">
      <div className={`text-4xl md:text-5xl font-bold text-[#00e6d3] font-['Satoshi'] transition-transform ${isDone ? 'counter-done-pulse' : ''}`}>
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs text-white/50 mt-1.5 font-['Satoshi'] uppercase tracking-widest">{label}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   VENDOR STATUS CELL
   ══════════════════════════════════════════════════════════════════ */

function VendorCell({ status, vendor }: { status: VendorStatus; vendor: string }) {
  if (vendor === "ATOM") {
    return (
      <div className="flex items-center justify-center">
        <span className="inline-flex items-center gap-1 text-[#00e6d3] font-bold text-sm">
          <CheckCircle2 size={14} />Yes
        </span>
      </div>
    );
  }
  if (status === "yes") {
    return (
      <div className="flex items-center justify-center">
        <span className="inline-flex items-center gap-1 text-green-400 text-sm">
          <CheckCircle2 size={14} />Yes
        </span>
      </div>
    );
  }
  if (status === "partial") {
    return (
      <div className="flex items-center justify-center">
        <span className="inline-flex items-center gap-1 text-yellow-400 text-sm">
          <AlertCircle size={14} />Partial
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <span className="inline-flex items-center gap-1 text-red-400 text-sm">
        <XCircle size={14} />No
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
   ══════════════════════════════════════════════════════════════════ */

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

/* ══════════════════════════════════════════════════════════════════
   STICKY NAV
   ══════════════════════════════════════════════════════════════════ */

function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 navbar-glass"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => scrollTo("hero")}
              className="font-['Satoshi'] font-bold text-white text-lg tracking-tight hover:text-[#00e6d3] transition-colors"
            >
              Nirmata <span className="text-[#00e6d3]">Holdings</span>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all font-['Satoshi'] tracking-wide ${
                    active === s.id
                      ? "text-[#00e6d3] bg-[#00e6d3]/10"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <a
              href="mailto:ben@nirmataholdings.com"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00e6d3] via-[#00a7ff] to-[#00a89e] text-white shadow-[0_0_24px_rgba(0,230,211,0.32)] text-xs font-bold rounded-lg hover:shadow-[0_0_32px_rgba(0,230,211,0.45)] transition-colors font-['Satoshi']"
            >
              <Mail size={12} />
              Invest
            </a>

            {/* Mobile menu */}
            <button
              className="lg:hidden text-white/70 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Grid3X3 size={20} />}
            </button>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden border-t border-white/10 bg-black/95 px-4 py-3 grid grid-cols-3 gap-2"
              >
                {NAV_SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className="text-white/70 hover:text-[#00e6d3] text-xs py-2 text-left transition-colors font-['Satoshi']"
                  >
                    {s.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 1: HERO
   ══════════════════════════════════════════════════════════════════ */

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div id="hero" ref={ref} className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Quantum particle background */}
      <QuantumCanvas />

      {/* Animated gradient mesh */}
      <div className="hero-gradient-mesh" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-[#00e6d3]/5 via-transparent to-black/60" style={{ zIndex: 2 }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" style={{ zIndex: 2 }} />

      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#00e6d3]/5" style={{ zIndex: 2 }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-[#00e6d3]/3" style={{ zIndex: 2 }} />

      <motion.div
        style={{ y, zIndex: 3 }}
        className="relative text-center px-4 max-w-6xl mx-auto"
      >
        {/* Confidential badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[#00e6d3]/30 bg-[#00e6d3]/5 text-[#00e6d3] text-xs font-semibold tracking-widest uppercase font-['Satoshi']"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#00e6d3] animate-pulse" />
          Confidential — For Qualified Investors Only
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-['Cabinet_Grotesk'] font-bold text-white leading-none mb-4"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          Nirmata <span className="bg-gradient-to-r from-[#00e6d3] to-[#00a7ff] bg-clip-text text-transparent">Holdings</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-white/70 text-xl md:text-2xl font-['Satoshi'] mb-2"
        >
          <TypeWriter text="ΔTOM platform · 15 products · Series A · $150M–$250M Pre-Money" delay={800} speed={45} />
        </motion.p>

        {/* Raise line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="text-[#00e6d3] text-base md:text-lg font-['Satoshi'] font-semibold mb-10"
        >
          Series A &nbsp;·&nbsp; $25M–$50M Raise &nbsp;·&nbsp; $150M–$250M Pre-Money Valuation
        </motion.p>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="inline-flex flex-wrap items-center justify-center gap-6 md:gap-10 px-6 md:px-12 py-8 rounded-2xl border border-[#00e6d3]/20 bg-black/50 backdrop-blur-md mb-10"
        >
          <StatCounter value={250} prefix="$" suffix="M" label="Pre-Money (Up To)" />
          <div className="w-px h-8 bg-white/10 hidden md:block" />
          <StatCounter value={15} label="Products in Portfolio" />
          <div className="w-px h-8 bg-white/10 hidden md:block" />
          <StatCounter value={99} suffix="+" label="Projects Delivered" />
          <div className="w-px h-8 bg-white/10 hidden md:block" />
          <StatCounter value={25} suffix="/25" label="Vendor Score (Internal)" />
          <div className="w-px h-8 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#00e6d3] font-['Satoshi']">$3.2M</div>
            <div className="text-xs text-white/50 mt-1 font-['Satoshi'] uppercase tracking-widest">Just Closed</div>
          </div>
        </motion.div>

        {/* Meta info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-white/40 text-sm font-['Satoshi'] mb-10"
        >
          Just Closed $3.2M &nbsp;·&nbsp; Active ARR Closing &nbsp;·&nbsp; Mars &nbsp;·&nbsp; May 2026
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById("investment")?.scrollIntoView({ behavior: "smooth" })}
            className="cta-glow-pulse inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#00e6d3] via-[#00a7ff] to-[#00a89e] text-white shadow-[0_0_24px_rgba(0,230,211,0.32)] font-bold rounded-xl hover:shadow-[0_0_32px_rgba(0,230,211,0.45)] transition-all transform hover:scale-105 font-['Satoshi']"
          >
            <Rocket size={16} />
            Review Term Sheet
          </button>
          <button
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="cta-glow-pulse-outline inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white rounded-xl hover:border-[#00e6d3]/50 hover:bg-[#00e6d3]/5 transition-all font-['Satoshi']"
          >
            <Layers size={16} />
            Explore Products
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 3 }}
      >
        <span className="text-white/30 text-xs font-['Satoshi'] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="text-[#00e6d3] animate-bounce-down" size={20} />
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 2: QUANTUM AWAKENING
   ══════════════════════════════════════════════════════════════════ */

function QuantumSection() {
  return (
    <div id="quantum" className="bg-black py-32 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#00e6d3]/3 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <RevealDiv className="text-center mb-16">
          <SectionLabel>The Founder's Vision</SectionLabel>
          <h2 className="font-['Cabinet_Grotesk'] font-bold text-white text-5xl md:text-6xl mb-6">
            Quantum <span className="text-[#00e6d3]">Awakening</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            Nirmata Holdings' founding philosophical foundation for the future of human-AI civilization
          </p>
        </RevealDiv>

        {/* Core mandate */}
        <RevealDiv delay={0.1} className="mb-12">
          <div className="relative p-8 md:p-10 rounded-2xl border border-[#00e6d3]/20 bg-gradient-to-br from-[#00e6d3]/5 to-transparent">
            <Quote className="absolute top-6 left-6 text-[#00e6d3]/20" size={40} />
            <blockquote className="text-white/80 text-lg font-['Satoshi'] leading-relaxed pl-8 md:pl-12 italic mb-4">
              "We see AI through a quantum lens — everything is interconnected and dynamic. Our mandate is simple: align AI with human values, preserve human agency, and ensure the benefits reach the many, not just the few."
            </blockquote>
            <div className="pl-8 md:pl-12">
              <div className="text-[#00e6d3] font-semibold font-['Satoshi']">Nirmata Holdings Founders</div>
            </div>
          </div>
        </RevealDiv>

        {/* Human+AI Symbiosis */}
        <RevealDiv delay={0.15} className="mb-12">
          <div className="p-6 rounded-2xl border border-[#00e6d3]/20 bg-[#00e6d3]/4">
            <div className="flex items-center gap-3 mb-3">
              <Brain size={20} className="text-[#00e6d3]" />
              <h3 className="font-['Satoshi'] font-bold text-white text-lg">Human + AI Symbiosis</h3>
            </div>
            <p className="text-white/60 text-sm font-['Satoshi'] leading-relaxed">
              AI augments human creativity and judgment — it does not replace them. Every agentic system we build includes human governance checkpoints. The fusion of emotional intelligence and machine capability is what makes ATOM different from pure automation plays.
            </p>
          </div>
        </RevealDiv>

        {/* Technosocialism vs Technofeudalism */}
        <RevealDiv delay={0.2} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/3">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="text-red-400" size={20} />
                <span className="font-['Satoshi'] font-bold text-red-400">Technofeudalism</span>
              </div>
              <p className="text-white/50 text-sm font-['Satoshi']">A few companies own the intelligence that runs civilization. Data becomes the new serfdom. AI amplifies inequality.</p>
            </div>
            <div className="p-6 rounded-xl border border-[#00e6d3]/20 bg-[#00e6d3]/3">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="text-[#00e6d3]" size={20} />
                <span className="font-['Satoshi'] font-bold text-[#00e6d3]">Technosocialism</span>
              </div>
              <p className="text-white/50 text-sm font-['Satoshi']">Technology democratically empowers all individuals. Equitable access to AI, guided by transparency, ethics, and collective responsibility.</p>
            </div>
          </div>
        </RevealDiv>

        {/* Concrete implementations */}
        <RevealDiv delay={0.25}>
          <div className="p-6 rounded-2xl border border-[#00e6d3]/20 bg-[#00e6d3]/4">
            <h3 className="font-['Satoshi'] font-bold text-white text-lg mb-4">How This Shows Up In Practice</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Lock, title: "Customer Owns 100% IP", desc: "Contractual guarantee in every agreement. No exceptions, no fine print." },
                { icon: Shield, title: "No Training on Customer Data", desc: "Zero-training guarantee. Your competitive advantage stays yours." },
                { icon: Users, title: "Human-in-the-Loop Governance", desc: "Every agentic system includes human oversight checkpoints by design." },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-xl border border-white/5 bg-white/2">
                  <item.icon size={18} className="text-[#00e6d3] mb-2" />
                  <div className="font-['Satoshi'] font-bold text-white text-sm mb-1">{item.title}</div>
                  <p className="text-white/50 text-xs font-['Satoshi'] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-white/60 text-sm font-['Satoshi'] mt-4 italic">
              This is not marketing language. It is encoded in our contracts, our architecture, and our product roadmap.
            </p>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 3: COMPANY OVERVIEW
   ══════════════════════════════════════════════════════════════════ */

function CompanySection() {
  const team = [
    {
      name: "Ben O'Leary",
      role: "Co-Founder & Chief Quantum Officer",
      subtitle: "Architect of the ΔTOM Platform",
      color: "#00e6d3",
      bg: "from-[#00e6d3]/10 to-transparent",
      initials: "BO",
      bio: "Autistic systems thinker and architect of the ΔTOM platform, the 25-dimension vendor framework, and the ethical AI covenant. Holds founding vision and long-horizon strategy for Nirmata Holdings — the parent company of every product in the portfolio.",
      shipped: ["ΔTOM platform architecture (15 products)", "ClinixAI ($4M+ pipeline in 180 days)", "Ethical AI covenant", "99+ enterprise projects"],
    },
    {
      name: "Joel Bedard",
      role: "Co-Founder & Chief Philosophy & Innovation Officer",
      subtitle: "Agritech · Philosophy · Systems Theory",
      color: "#b987ff",
      bg: "from-[#b987ff]/10 to-transparent",
      initials: "JB",
      bio: "Savant-tier polymath with deep expertise across agritech, philosophy, systems theory, and emergent AI. Joel translates first-principles thinking into tangible product architecture across the Nirmata portfolio — the conceptual conscience and innovation engine of the company.",
      shipped: ["ΔTOM philosophical foundation", "Agritech ML research", "Cross-domain product innovation", "Strategic partnerships"],
    },
    {
      name: "Josh Mellott",
      role: "Co-Founder & Chief Revenue Officer",
      subtitle: "GTM · Enterprise Sales · Revenue Acceleration",
      color: "#ffd166",
      bg: "from-[#ffd166]/10 to-transparent",
      initials: "JM",
      bio: "The von Clausewitz of startup sales and growth. Josh's genius is turning complex anything — physics, AI infrastructure, agentic systems, regulated workflows — into simple, understandable, sellable, high-adoption stories that close. He architects the GTM motion that takes Nirmata from early traction to category-defining inevitability. Where most CROs sell features, Josh sells worldviews. Where most pipelines stall, his accelerate. Mic. Drop.",
      shipped: ["Sub-90-day pipeline acceleration playbook", "Complexity→Clarity narrative engine", "Enterprise category-creation GTM", "Channel & strategic partnerships", "Revenue battle plans for all 15 products"],
    },

  ];

  const clients = ["Lowe's", "Cognizant", "Trimble", "E2open", "Toyota", "OWASP", "Injazat"];

  const coreIdentity = [
    { label: "Founded", value: "July 2024" },
    { label: "Headquarters", value: "Mars" },
    { label: "Funding", value: "$3.2M Just Closed" },
    { label: "Projects Delivered", value: "99+" },
    { label: "Client Satisfaction", value: "99%+" },
    { label: "Active Deals", value: "2 ATOM Pro @ $25K/mo" },
    { label: "Vendor Score", value: "25/25 (Internal Framework)" },
    { label: "Products", value: "15 in Portfolio" },
  ];

  return (
    <div id="company" className="bg-black py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>The Team</SectionLabel>
          <h2 className="font-['Cabinet_Grotesk'] font-bold text-white text-5xl md:text-6xl mb-6">
            Company <span className="text-[#00e6d3]">Overview</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            While GPT, Claude, and Grok are the brains — ATOM is the nervous system and spine.
          </p>
        </RevealDiv>

        {/* Leadership */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {team.map((member, i) => (
            <RevealDiv key={member.name} delay={i * 0.1}>
              <div className={`p-6 rounded-2xl border border-white/10 bg-gradient-to-br ${member.bg} hover:border-opacity-50 transition-all h-full`}
                style={{ borderColor: `${member.color}20` }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 font-bold text-lg font-['Satoshi']"
                  style={{ backgroundColor: `${member.color}20`, color: member.color, border: `1px solid ${member.color}30` }}>
                  {member.initials}
                </div>
                <h3 className="font-['Satoshi'] font-bold text-white text-lg mb-1">{member.name}</h3>
                <p className="text-sm font-semibold mb-1 font-['Satoshi']" style={{ color: member.color }}>{member.role}</p>
                <p className="text-white/40 text-xs mb-3 font-['Satoshi']">{member.subtitle}</p>
                <p className="text-white/60 text-sm font-['Satoshi'] leading-relaxed mb-3">{member.bio}</p>
                {(member as any).shipped && (
                  <div className="mt-2 mb-1">
                    <p className="text-xs font-bold font-['Satoshi'] mb-1.5" style={{ color: member.color }}>What {member.name.split(' ')[0]} shipped:</p>
                    <div className="space-y-1">
                      {((member as any).shipped as string[]).map((item: string) => (
                        <div key={item} className="flex items-start gap-1.5">
                          <Check size={10} className="mt-0.5 flex-shrink-0" style={{ color: member.color }} />
                          <span className="text-white/50 text-xs font-['Satoshi']">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </RevealDiv>
          ))}
        </div>


        {/* Core Identity Table + Confidential Enterprise Clients */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <RevealDiv>
            <h3 className="font-['Satoshi'] font-bold text-white text-2xl mb-6">Core Identity</h3>
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              {coreIdentity.map((item, i) => (
                <div key={item.label} className={`flex justify-between items-center px-6 py-3.5 ${i % 2 === 0 ? "bg-white/3" : "bg-transparent"}`}>
                  <span className="text-white/50 text-sm font-['Satoshi']">{item.label}</span>
                  <span className="text-[#00e6d3] font-semibold text-sm font-['Satoshi']">{item.value}</span>
                </div>
              ))}
            </div>
          </RevealDiv>

          <RevealDiv delay={0.15}>
            <h3 className="font-['Satoshi'] font-bold text-white text-2xl mb-6">Major Enterprise Clients</h3>
            <div className="p-6 rounded-2xl border border-[#00e6d3]/20 bg-gradient-to-br from-[#00e6d3]/5 to-transparent mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#00e6d3]/15 border border-[#00e6d3]/30 flex items-center justify-center">
                  <Lock size={18} className="text-[#00e6d3]" />
                </div>
                <div>
                  <p className="text-[#00e6d3] font-bold text-sm font-['Satoshi'] uppercase tracking-wider">Confidential</p>
                  <p className="text-white/40 text-xs font-['Satoshi']">99+ enterprise projects delivered</p>
                </div>
              </div>
              <p className="text-white/70 text-sm font-['Satoshi'] leading-relaxed">
                Major Fortune 500 enterprise clients spanning retail, manufacturing, telecom, healthcare, public sector, and global IT services. <span className="text-[#00e6d3] font-semibold">Specific names available upon mutual NDA and qualified investor request.</span>
              </p>
              <p className="text-white/50 text-xs font-['Satoshi'] italic mt-3">
                Deployment knowledge, referenceability, and trust — now encoded directly into the ΔTOM platform.
              </p>
            </div>
          </RevealDiv>
        </div>

        {/* Positioning statement */}
        <RevealDiv>
          <div className="text-center p-8 md:p-12 rounded-2xl border border-[#00e6d3]/20 bg-gradient-to-br from-[#00e6d3]/5 to-[#00e6d3]/5">
            <p className="text-white/40 text-sm font-['Satoshi'] uppercase tracking-widest mb-4">Core Positioning</p>
            <p className="font-['Satoshi'] font-bold text-white text-2xl md:text-3xl leading-snug">
              "While GPT, Claude, and Grok are the <span className="text-[#00e6d3]">brains</span> —
              <br />ATOM is the <span className="text-[#00e6d3]">nervous system</span> and spine."
            </p>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 4: 25/25 VENDOR MATRIX
   ══════════════════════════════════════════════════════════════════ */

function VendorMatrixSection() {
  const vendors = Object.keys(VENDOR_DATA);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div id="matrix" className="bg-black py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealDiv className="text-center mb-16">
          <SectionLabel>Competitive Intelligence</SectionLabel>
          <h2 className="font-['Cabinet_Grotesk'] font-bold text-white text-5xl md:text-6xl mb-6">
            The <span className="text-[#00e6d3]">25/25</span> Framework
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            Every critical enterprise AI capability, transparently scored. We developed a 25-dimension framework to evaluate enterprise AI platforms. Atom currently achieves full support across all 25 dimensions. We encourage enterprises to adapt or extend this framework to their own needs.
          </p>
        </RevealDiv>

        {/* Score cards */}
        <div className="grid grid-cols-4 md:grid-cols-7 gap-4 mb-12">
          {vendors.map((v, i) => (
            <RevealDiv key={v} delay={i * 0.07}>
              <div className={`p-4 rounded-xl text-center border ${v === "ATOM" ? "border-[#00e6d3]/40 bg-[#00e6d3]/8" : "border-white/10 bg-white/3"}`}>
                <div className={`text-3xl font-bold font-['Satoshi'] mb-1 ${v === "ATOM" ? "text-[#00e6d3]" : "text-white/60"}`}>
                  {v === "ATOM" && inView ? (
                    <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring" }}>
                      25
                    </motion.span>
                  ) : (
                    VENDOR_SCORES[v]
                  )}
                </div>
                <div className={`text-xs font-['Satoshi'] ${v === "ATOM" ? "text-[#00e6d3]/70" : "text-white/40"}`}>{v}</div>
                <div className={`text-xs font-['Satoshi'] ${v === "ATOM" ? "text-[#00e6d3]" : "text-white/30"}`}>/ 25</div>
              </div>
            </RevealDiv>
          ))}
        </div>

        {/* Matrix table */}
        <div ref={ref}>
        <RevealDiv delay={0.2}>
          <div className="rounded-2xl border border-white/10 overflow-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/3">
                  <th className="text-left px-5 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">Capability</th>
                  {vendors.map((v) => (
                    <th key={v} className={`text-center px-4 py-4 text-xs font-bold font-['Satoshi'] ${v === "ATOM" ? "text-[#00e6d3]" : "text-white/50"}`}>
                      {v}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {VENDOR_CAPS.map((cap, capIdx) => (
                  <motion.tr
                    key={cap}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: capIdx * 0.08 + 0.3 }}
                    className={`border-b border-white/5 ${capIdx % 2 === 0 ? "bg-transparent" : "bg-white/2"} hover:bg-white/4 transition-colors`}
                  >
                    <td className="px-5 py-3.5 text-white/70 text-sm font-['Satoshi']">{cap}</td>
                    {vendors.map((v) => (
                      <td key={v} className="px-4 py-3.5">
                        <VendorCell status={VENDOR_DATA[v][capIdx]} vendor={v} />
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealDiv>
        </div>

        {/* Radar chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-14">
          <RevealDiv delay={0.1}>
            <h3 className="font-['Satoshi'] font-bold text-white text-2xl mb-6 text-center">Capability Radar</h3>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={RADAR_DATA}>
                <PolarGrid stroke="rgba(255,255,255,0.07)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Satoshi" }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="ATOM" dataKey="ATOM" stroke="#00e6d3" fill="#00e6d3" fillOpacity={0.15} strokeWidth={2} />
                <Radar name="Competitors (avg)" dataKey="Competitors" stroke="#00e6d3" fill="#00e6d3" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 4" />
                <Legend formatter={(v) => <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{v}</span>} />
              </RadarChart>
            </ResponsiveContainer>
          </RevealDiv>

          <RevealDiv delay={0.2}>
            <h3 className="font-['Satoshi'] font-bold text-white text-2xl mb-6 text-center">Score Comparison</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={vendors.map(v => ({ name: v, score: VENDOR_SCORES[v] }))} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 25]} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {vendors.map((v) => (
                    <Cell key={v} fill={v === "ATOM" ? "#00e6d3" : "#00e6d3"} fillOpacity={v === "ATOM" ? 1 : 0.5} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </RevealDiv>
        </div>

        {/* Link */}
        <RevealDiv delay={0.3} className="text-center mt-10">
          <a
            href="https://www.nirmataholdings.com/resources/vendor-matrix"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#00e6d3] text-sm font-semibold hover:gap-3 transition-all font-['Satoshi']"
          >
            View full vendor matrix at nirmataholdings.com <ExternalLink size={14} />
          </a>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 5: PRODUCT PORTFOLIO
   ══════════════════════════════════════════════════════════════════ */

function ProductsSection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div id="products" className="bg-black py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>Platform Architecture</SectionLabel>
          <h2 className="font-['Cabinet_Grotesk'] font-bold text-white text-5xl md:text-6xl mb-6">
            Product <span className="text-[#00e6d3]">Portfolio</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            15 products across the Nirmata Holdings portfolio. One integrated ΔTOM nervous system. $95M–$165M total IP replication cost.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {PRODUCTS.map((product, i) => (
            <RevealDiv key={product.name} delay={i * 0.06}>
              <motion.div
                className="gradient-border-card h-full cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => {
                  if (product.url) {
                    window.open(product.url, "_blank", "noopener,noreferrer");
                  } else {
                    setSelected(selected === i ? null : i);
                  }
                }}
              >
                <div className="p-5 rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm h-full flex flex-col transition-all group-hover:border-opacity-50 product-glow-card"
                  style={{ borderColor: `${product.color}20`, ['--glow-color' as any]: `${product.color}20` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${product.color}15`, border: `1px solid ${product.color}30` }}>
                      <product.icon size={18} style={{ color: product.color }} />
                    </div>
                    <span className={`text-[10px] font-['Satoshi'] font-semibold px-2 py-0.5 rounded-full border ${
                      (product as any).maturity === "SHIPPING" ? "border-[#00e6d3]/30 text-[#00e6d3]/80 bg-[#00e6d3]/10" :
                      (product as any).maturity === "LIMITED BETA" ? "border-[#FFD700]/30 text-[#FFD700]/80 bg-[#FFD700]/10" :
                      "border-[#00e6d3]/30 text-[#00e6d3]/80 bg-[#00e6d3]/10"
                    }`}>
                      {(product as any).maturity || "SHIPPING"}
                    </span>
                  </div>

                  <h3 className="font-['Satoshi'] font-bold text-white text-sm mb-1 leading-tight">{product.name}</h3>
                  <p className="text-xs font-semibold mb-3 font-['Satoshi']" style={{ color: product.color }}>{product.tagline}</p>
                  <p className="text-white/55 text-xs font-['Satoshi'] leading-relaxed flex-1 mb-4">{product.description}</p>

                  <AnimatePresence>
                    {selected === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/5 pt-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-white/40 text-xs font-['Satoshi']">Cost to duplicate</span>
                            <span className="text-xs font-bold font-['Satoshi']" style={{ color: product.color }}>{product.cost}</span>
                          </div>
                          <div className="text-xs text-white/40 font-['Satoshi'] leading-tight">{product.comparable}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                    <span className="text-white/30 text-xs font-['Satoshi']">Duplicate: {product.cost}</span>
                    <ChevronRight size={12} className="text-white/20 group-hover:text-[#00e6d3] transition-colors" />
                  </div>
                </div>
              </motion.div>
            </RevealDiv>
          ))}
        </div>

        {/* Total */}
        <RevealDiv delay={0.3} className="mt-12 text-center">
          <div className="inline-flex flex-wrap gap-8 px-10 py-6 rounded-2xl border border-[#00e6d3]/20 bg-[#00e6d3]/4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00e6d3] font-['Satoshi']">$95M–$165M</div>
              <div className="text-white/40 text-xs uppercase tracking-widest font-['Satoshi'] mt-1">Total IP Replication Cost</div>
            </div>
            <div className="w-px bg-white/10 hidden md:block" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00e6d3] font-['Satoshi']">15</div>
              <div className="text-white/40 text-xs uppercase tracking-widest font-['Satoshi'] mt-1">Products in Portfolio</div>
            </div>
            <div className="w-px bg-white/10 hidden md:block" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00D4FF] font-['Satoshi']">13</div>
              <div className="text-white/40 text-xs uppercase tracking-widest font-['Satoshi'] mt-1">In Production Today</div>
            </div>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 6: FIVE LAYERS OF DEFENSIBILITY
   ══════════════════════════════════════════════════════════════════ */

function MoatSection() {
  return (
    <div id="moat" className="bg-black py-32 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#00e6d3]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>Competitive Moat</SectionLabel>
          <h2 className="font-['Cabinet_Grotesk'] font-bold text-white text-5xl md:text-6xl mb-6">
            Five Layers of <span className="text-[#00e6d3]">Defensibility</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            Not one moat. Five reinforcing layers that compound. Total IP replication: $95M–$165M.
          </p>
        </RevealDiv>

        {/* What We Built vs What We Wrap */}
        <RevealDiv delay={0.1} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-[#00e6d3]/20 bg-[#00e6d3]/4">
              <h3 className="font-['Satoshi'] font-bold text-[#00e6d3] text-lg mb-4">Proprietary IP (We Built)</h3>
              <div className="space-y-2">
                {["GenUI engine — AI generates its own interfaces", "5-layer governance fabric (SOC2, HIPAA, FedRAMP)", "Deploy-anywhere runtime (cloud, VPC, on-prem, edge, air-gap)", "Agent orchestration spine (Brain-Spine-Worker)", "ClinixAI clinical stack (ambient scribe + full X12 RCM)", "Post-quantum cryptography layer"].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check className="text-[#00e6d3] mt-0.5 flex-shrink-0" size={14} />
                    <span className="text-white/70 text-sm font-['Satoshi']">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-[#00e6d3]/20 bg-[#00e6d3]/4">
              <h3 className="font-['Satoshi'] font-bold text-[#00e6d3] text-lg mb-4">Ecosystem Leverage (We Wrap)</h3>
              <div className="space-y-2">
                {["Foundation models (GPT, Claude, Gemini, Llama — model-agnostic)", "Voice providers (Hume EVI, OpenAI Realtime, ElevenLabs)", "Cloud infrastructure (AWS, Azure, GCP, Akamai/Linode)"].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CircleDot className="text-[#00e6d3] mt-0.5 flex-shrink-0" size={14} />
                    <span className="text-white/60 text-sm font-['Satoshi']">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#00e6d3] text-sm font-bold font-['Satoshi'] mt-4">Being model-agnostic is the moat, not a weakness.</p>
            </div>
          </div>
        </RevealDiv>

        {/* Visual moat diagram */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
          {MOAT_LAYERS.map((layer, i) => (
            <RevealDiv key={layer.name} delay={i * 0.1}>
              <div
                className="relative p-6 rounded-2xl border h-full flex flex-col transition-all hover:scale-105 cursor-default"
                style={{
                  borderColor: `${layer.color}${30 + i * 8}`,
                  background: `linear-gradient(135deg, ${layer.color}08, transparent)`,
                  marginTop: `${i * 8}px`,
                }}
              >
                {/* Layer number */}
                <div className="absolute -top-3 left-4 px-2 py-0.5 rounded-full text-xs font-bold font-['Satoshi']"
                  style={{ backgroundColor: layer.color, color: "#000" }}>
                  Layer {i + 1}
                </div>

                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 mt-2"
                  style={{ backgroundColor: `${layer.color}15`, border: `1px solid ${layer.color}30` }}>
                  <layer.icon size={18} style={{ color: layer.color }} />
                </div>

                <h3 className="font-['Satoshi'] font-bold text-white text-sm mb-2">{layer.name}</h3>
                <p className="text-white/55 text-xs font-['Satoshi'] leading-relaxed flex-1 mb-4">{layer.desc}</p>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-xs font-['Satoshi']">Barrier</span>
                    <span className="text-xs font-semibold font-['Satoshi']" style={{ color: layer.color }}>{layer.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-xs font-['Satoshi']">Time to copy</span>
                    <span className="text-white/60 text-xs font-['Satoshi']">{layer.time}</span>
                  </div>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>

        {/* Total cost banner */}
        <RevealDiv delay={0.5}>
          <div className="p-8 rounded-2xl border border-[#00e6d3]/20 bg-[#00e6d3]/4 text-center">
            <p className="text-white/40 text-sm font-['Satoshi'] uppercase tracking-widest mb-2">Total IP Replication Cost</p>
            <p className="font-['Satoshi'] font-bold text-[#00e6d3] text-5xl mb-2">$95M – $165M</p>
            <p className="text-white/50 text-sm font-['Satoshi']">Even a well-funded competitor would need 18–36 months and $45M+ to approximate what exists today.</p>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 7: MARKET OPPORTUNITY
   ══════════════════════════════════════════════════════════════════ */

function MarketSection() {
  return (
    <div id="market" className="bg-black py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>Total Addressable Market</SectionLabel>
          <h2 className="font-['Cabinet_Grotesk'] font-bold text-white text-5xl md:text-6xl mb-6">
            Market <span className="text-[#00e6d3]">Opportunity</span>
          </h2>
          <p className="text-white/50 text-lg max-w-3xl mx-auto font-['Satoshi']">
            <span className="text-[#00e6d3] font-bold">$636B+ combined TAM today (2026)</span> across 15 verticals, expanding to <span className="text-[#00e6d3] font-bold">$2T+ by 2030</span>. Sourced from Crunchbase, Grand View Research, InsightAce, Research &amp; Markets, Verdantix &amp; Gartner. We don't have a total addressable market — we have a total addressable civilization.
          </p>
        </RevealDiv>

        {/* Key adoption stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { value: "79%", label: "Orgs Adopting AI Agents" },
            { value: "96%", label: "Plan Expansion in 2026" },
            { value: "171%", label: "Average ROI from AI" },
            { value: "62.7%", label: "Vertical AI CAGR" },
          ].map((stat, i) => (
            <RevealDiv key={stat.label} delay={i * 0.1}>
              <div className="p-5 rounded-xl border border-[#00e6d3]/15 bg-[#00e6d3]/3 text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#00e6d3] font-['Satoshi'] mb-1">{stat.value}</div>
                <div className="text-white/50 text-xs font-['Satoshi'] uppercase tracking-wider">{stat.label}</div>
              </div>
            </RevealDiv>
          ))}
        </div>

        {/* Why winnable now */}
        <RevealDiv delay={0.15} className="mb-16">
          <div className="p-6 rounded-2xl border border-[#00e6d3]/20 bg-[#00e6d3]/4">
            <h3 className="font-['Satoshi'] font-bold text-white text-xl mb-4">Why These Markets Are Winnable Now</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { num: "01", title: "No dominant platform player", desc: "Enterprise AI remains fragmented. No single vendor owns the full-stack integration layer. The window for a platform play is open." },
                { num: "02", title: "AI structurally shifts margin and speed", desc: "AI is not incremental improvement — it fundamentally changes unit economics, enabling 10x faster deployment and dramatically lower marginal cost." },
                { num: "03", title: "Not winner-take-all yet", desc: "Enterprise AI competes on deployment flexibility, compliance, and trust — not network effects. Multiple large players can coexist, and differentiated platforms win specific verticals." },
              ].map((p) => (
                <div key={p.num} className="p-4 rounded-xl border border-white/5 bg-white/2">
                  <span className="text-[#00e6d3] font-bold text-xs font-['Satoshi']">{p.num}</span>
                  <div className="font-['Satoshi'] font-bold text-white text-sm mt-1 mb-2">{p.title}</div>
                  <p className="text-white/50 text-xs font-['Satoshi'] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealDiv>

        {/* Market cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {TAM_MARKETS.map((market, i) => (
            <RevealDiv key={market.name} delay={i * 0.08}>
              <div className="p-6 rounded-2xl border border-white/10 bg-white/2 hover:border-opacity-40 transition-all h-full"
                style={{ borderColor: `${market.color}20` }}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-['Satoshi'] font-bold text-white text-base">{market.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full font-semibold font-['Satoshi']"
                    style={{ backgroundColor: `${market.color}20`, color: market.color }}>
                    {market.cagr} CAGR
                  </span>
                </div>
                <div className="flex items-end gap-3 mb-3">
                  <div>
                    <div className="text-white/40 text-xs font-['Satoshi'] mb-0.5">2025</div>
                    <div className="text-2xl font-bold font-['Satoshi'] text-white/70">${market.now}B</div>
                  </div>
                  <ArrowRight className="text-[#00e6d3] mb-1" size={16} />
                  <div>
                    <div className="text-white/40 text-xs font-['Satoshi'] mb-0.5">2030</div>
                    <div className="text-2xl font-bold font-['Satoshi']" style={{ color: market.color }}>${market.future}B</div>
                  </div>
                </div>
                {/* Growth bar */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: market.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min((market.now / (market.now + market.future)) * 100 * 2, 85)}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
                <p className="text-white/40 text-xs font-['Satoshi']">Product: {market.product}</p>
              </div>
            </RevealDiv>
          ))}
        </div>

        {/* Combined TAM visualization */}
        <RevealDiv delay={0.2}>
          <div className="p-8 md:p-12 rounded-2xl border border-[#00e6d3]/20 bg-gradient-to-br from-[#00e6d3]/5 to-[#00e6d3]/5">
            <div className="text-center mb-8">
              <p className="text-white/40 text-sm font-['Satoshi'] uppercase tracking-widest mb-2">Combined TAM</p>
              <div className="font-['Satoshi'] font-bold text-white">
                <span className="text-5xl text-[#00e6d3]">$124B+</span>
                <span className="text-3xl text-white/30 mx-4">→</span>
                <span className="text-5xl text-[#00e6d3]">$500B+</span>
              </div>
              <div className="flex items-center justify-center gap-4 mt-2">
                <span className="text-white/40 text-sm font-['Satoshi']">Today (2025)</span>
                <ArrowRight className="text-white/20" size={14} />
                <span className="text-white/40 text-sm font-['Satoshi']">By 2030</span>
              </div>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #00e6d3, #00e6d3)" }}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </div>
          </div>
        </RevealDiv>

        {/* Why not winner take all */}
        <RevealDiv delay={0.3} className="mt-12">
          <div className="p-6 rounded-2xl border border-[#00e6d3]/20 bg-[#00e6d3]/5">
            <h3 className="font-['Satoshi'] font-bold text-white text-xl mb-3">Why Not Winner-Take-All?</h3>
            <p className="text-white/60 text-sm font-['Satoshi'] leading-relaxed">
              Enterprise AI does not exhibit the network effects that create winner-take-all dynamics in consumer platforms. Instead, it competes on deployment flexibility, regulatory compliance, and customer trust. This means multiple large players can coexist — and a differentiated, governance-first platform like ATOM can capture meaningful share without needing to defeat Big Tech head-on.
            </p>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 8: GO-TO-MARKET
   ══════════════════════════════════════════════════════════════════ */

function GTMSection() {
  return (
    <div id="gtm" className="bg-black py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>Go-To-Market</SectionLabel>
          <h2 className="font-['Cabinet_Grotesk'] font-bold text-white text-5xl md:text-6xl mb-6">
            Land, Prove, <span className="text-[#00e6d3]">Expand</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            The Sierra / Palantir / Databricks / Snowflake playbook. FDE → Proof of Value → Platform Expansion.
          </p>
        </RevealDiv>

        {/* Three phases */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {GTM_PHASES.map((phase, i) => (
            <RevealDiv key={phase.phase} delay={i * 0.15}>
              <div className="relative p-7 rounded-2xl border h-full transition-all hover:scale-105"
                style={{ borderColor: `${phase.color}25`, background: `linear-gradient(135deg, ${phase.color}06, transparent)` }}>
                <div className="absolute -top-3 left-5 px-3 py-0.5 rounded-full text-xs font-bold font-['Satoshi']"
                  style={{ backgroundColor: phase.color, color: "#000" }}>
                  {phase.phase}
                </div>

                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 mt-2"
                  style={{ backgroundColor: `${phase.color}15`, border: `1px solid ${phase.color}30` }}>
                  <phase.icon size={22} style={{ color: phase.color }} />
                </div>

                <h3 className="font-['Satoshi'] font-bold text-white text-lg mb-3">{phase.name}</h3>
                <p className="text-white/55 text-sm font-['Satoshi'] leading-relaxed mb-5">{phase.desc}</p>

                <div className="space-y-2">
                  {phase.channels.map((ch) => (
                    <div key={ch} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: phase.color }} />
                      <span className="text-white/50 text-xs font-['Satoshi']">{ch}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>

        {/* Traction Signals */}
        <RevealDiv delay={0.15} className="mb-16">
          <div className="p-6 rounded-2xl border border-[#FFD700]/20 bg-[#FFD700]/4">
            <h3 className="font-['Satoshi'] font-bold text-white text-xl mb-4">Traction Signals <span className="text-white/40 text-sm font-['Satoshi'] font-normal">($3.2M Closed · 2 ATOM Pro Deals Live)</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "99+ enterprise projects delivered across Fortune 500 clients",
                "ClinixAI $4M+ qualified pipeline built in just 180 days",
                "GenUI — unique capability no competitor has replicated",
                "25/25 vendor framework being used as a procurement evaluation tool",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 p-3 rounded-lg bg-white/3">
                  <Zap className="text-[#FFD700] mt-0.5 flex-shrink-0" size={14} />
                  <span className="text-white/70 text-sm font-['Satoshi']">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealDiv>

        {/* Customer journey */}
        <RevealDiv delay={0.2}>
          <h3 className="font-['Satoshi'] font-bold text-white text-2xl mb-6">Enterprise Customer Journey</h3>
          <div className="overflow-x-auto">
            <div className="flex items-stretch gap-0 min-w-[700px]">
              {[
                { stage: "Discovery", rev: "$100K–$150K", color: "#00e6d3" },
                { stage: "Rapid Deploy", rev: "$150K–$250K", color: "#00e6d3" },
                { stage: "MRR Begins", rev: "$25K–$65K/mo", color: "#00D4FF" },
                { stage: "Expansion", rev: "$65K–$150K/mo", color: "#FFD700" },
                { stage: "Strategic Partner", rev: "$150K+/mo", color: "#A855F7" },
              ].map((step, i, arr) => (
                <div key={step.stage} className="flex-1 relative">
                  <div className="p-4 rounded-none text-center" style={{ background: `${step.color}10`, borderTop: `2px solid ${step.color}` }}>
                    <div className="text-xs font-bold font-['Satoshi'] mb-1" style={{ color: step.color }}>{step.stage}</div>
                    <div className="text-white/60 text-xs font-['Satoshi']">{step.rev}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                      <ChevronRight className="text-white/20" size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex gap-6 flex-wrap">
            <div className="text-sm font-['Satoshi']"><span className="text-[#00e6d3] font-bold">Blended Gross Margin:</span> <span className="text-white/60">67% (Software trio: 83%)</span></div>
            <div className="text-sm font-['Satoshi']"><span className="text-[#00e6d3] font-bold">3-Year LTV per Enterprise:</span> <span className="text-white/60">$3M–$5M (36-mo terms)</span></div>
            <div className="text-sm font-['Satoshi']"><span className="text-[#00e6d3] font-bold">Target LTV:CAC:</span> <span className="text-white/60">22.5x (Sales Dominator), blended 12–15x</span></div>
            <div className="text-sm font-['Satoshi']"><span className="text-[#00e6d3] font-bold">Target NRR:</span> <span className="text-white/60">130–150%+</span></div>
          </div>
        </RevealDiv>

        {/* Partners */}
        <RevealDiv delay={0.3} className="mt-14">
          <h3 className="font-['Satoshi'] font-bold text-white text-2xl mb-6">Partnership Ecosystem</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PARTNERS.map((p, i) => (
              <div key={p.name} className="p-4 rounded-xl border border-white/10 bg-white/3 text-center hover:border-[#00e6d3]/30 transition-all">
                <p.icon className="mx-auto mb-2 text-[#00e6d3]/60" size={20} />
                <div className="text-white/80 text-sm font-bold font-['Satoshi']">{p.name}</div>
                <div className="text-white/40 text-xs font-['Satoshi']">{p.role}</div>
              </div>
            ))}
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 9: REVENUE MODEL (Rule of 78)
   ══════════════════════════════════════════════════════════════════ */

function RevenueSection() {
  const [scrubMonth, setScrubMonth] = useState(12);

  // 3 flagship products driving the Y1 Rule of 78
  const flywheelProducts = [
    { name: "ΔTOM Sales Dominator", color: "#00e6d3", mrrAdd: 50, badge: "22.5x LTV:CAC • $36K ACV", icon: Megaphone },
    { name: "Red Team ΔTOM", color: "#ff6b8b", mrrAdd: 30, badge: "SOC2 / FedRAMP / EU AI Act", icon: Shield },
    { name: "ΔTOM Game Console", color: "#74c0fc", mrrAdd: 25, badge: "$799-$1099 HW + $19.99/mo AI", icon: Gamepad2 },
  ];

  // Build month-by-month cumulative revenue (in $K) for each product
  // Cumulative recognized revenue at month M = mrrAdd * (M * (M+1) / 2)
  const rule78Stacked = Array.from({ length: 13 }, (_, i) => {
    const m = i; // 0..12
    const triangle = (m * (m + 1)) / 2;
    const sales = flywheelProducts[0].mrrAdd * triangle;
    const red = flywheelProducts[1].mrrAdd * triangle;
    const consoleRev = flywheelProducts[2].mrrAdd * triangle;
    return {
      month: m === 0 ? "M0" : `M${m}`,
      monthNum: m,
      Sales: sales,
      RedTeam: red,
      Console: consoleRev,
      total: sales + red + consoleRev,
    };
  });

  const scrubData = rule78Stacked[scrubMonth];
  const totalAtM12 = rule78Stacked[12].total; // 8190 ($K)

  // Comparison: linear (no compounding) vs Rule-of-78
  const linearVsCompound = Array.from({ length: 13 }, (_, i) => {
    const m = i;
    const totalNewMRR = flywheelProducts.reduce((s, p) => s + p.mrrAdd, 0); // 105K/mo new MRR
    return {
      month: `M${m}`,
      monthNum: m,
      Linear: totalNewMRR * m, // straight-line, no compounding
      RuleOf78: totalNewMRR * ((m * (m + 1)) / 2), // compounding
    };
  });

  return (
    <div id="revenue" className="bg-black py-32 px-4 relative overflow-hidden">
      <div className="absolute left-0 top-1/3 w-96 h-96 bg-[#00e6d3]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>Revenue Architecture</SectionLabel>
          <h2 className="font-['Cabinet_Grotesk'] font-bold text-white text-5xl md:text-6xl mb-6">
            The Rule of <span className="text-[#00e6d3]">78</span> — Across <span className="text-[#00e6d3]">15 Products</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-5xl mx-auto mb-4">
            <div className="p-4 rounded-xl border border-[#00e6d3]/20 bg-[#00e6d3]/5 text-center">
              <p className="text-[#00e6d3] font-bold font-['Satoshi'] text-sm mb-1">ΔTOM Sales Dominator</p>
              <p className="text-white/70 font-['Satoshi'] text-xs">$50K/mo new MRR × 12 = <span className="text-[#00e6d3] font-bold">$3.9M Y1</span> (not $600K)</p>
              <p className="text-white/40 text-[10px] font-['Satoshi'] mt-1 italic">22.5x LTV:CAC • $36K ACV</p>
            </div>
            <div className="p-4 rounded-xl border border-[#ff6b8b]/20 bg-[#ff6b8b]/5 text-center">
              <p className="text-[#ff6b8b] font-bold font-['Satoshi'] text-sm mb-1">Red Team ΔTOM</p>
              <p className="text-white/70 font-['Satoshi'] text-xs">$30K/mo new MRR × 12 = <span className="text-[#ff6b8b] font-bold">$2.34M Y1</span> (not $360K)</p>
              <p className="text-white/40 text-[10px] font-['Satoshi'] mt-1 italic">SOC2 / FedRAMP / EU AI Act</p>
            </div>
            <div className="p-4 rounded-xl border border-[#74c0fc]/20 bg-[#74c0fc]/5 text-center">
              <p className="text-[#74c0fc] font-bold font-['Satoshi'] text-sm mb-1">ΔTOM Game Console</p>
              <p className="text-white/70 font-['Satoshi'] text-xs">$25K/mo new MRR × 12 = <span className="text-[#74c0fc] font-bold">$1.95M Y1</span> (not $300K)</p>
              <p className="text-white/40 text-[10px] font-['Satoshi'] mt-1 italic">$799-$1099 HW + $19.99/mo AI</p>
            </div>
          </div>
          <div className="max-w-3xl mx-auto mb-4 mt-4">
            <div className="p-5 rounded-xl border border-[#00e6d3]/30 bg-gradient-to-r from-[#00e6d3]/10 to-[#00a7ff]/10 text-center">
              <p className="text-white font-bold font-['Satoshi'] text-base mb-1">Combined Y1 Rule-of-78: <span className="text-[#00e6d3]">$8.19M annual recognized revenue</span></p>
              <p className="text-white/50 text-sm font-['Satoshi']">From just 3 of 15 products. The flywheel compounds across the rest.</p>
              <p className="text-white/40 text-[11px] font-['Satoshi'] italic mt-2">Annual figure (Y1 cumulative). Not monthly. $105K of new MRR added each month × 78 MRR-months (1+2+...+12) = $8.19M recognized revenue in Year 1.</p>
            </div>
          </div>
          <p className="text-white/50 text-sm font-['Satoshi'] italic">Illustrating SaaS compounding across the ΔTOM portfolio. $3.2M closed, 2 ATOM Professional deals live at $25K/mo. Real demand is hundreds of deals — the $8.19M is the floor, not the ceiling.</p>
        </RevealDiv>

        {/* Interactive Y1 simulator - 3 product flywheels with month scrubber */}
        <RevealDiv className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#00e6d3] font-['Satoshi'] font-semibold mb-2">Live Simulator</p>
                <h3 className="font-['Cabinet_Grotesk'] font-bold text-white text-2xl md:text-3xl">The 3-Product Flywheel</h3>
                <p className="text-white/50 text-sm font-['Satoshi'] mt-1">Drag to scrub through the year. Watch the Rule of 78 compound in real time.</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-['Satoshi'] mb-1">Recognized at <span className="text-[#00e6d3] font-bold">{scrubData.month}</span></p>
                <motion.p
                  key={scrubData.total}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-['Cabinet_Grotesk'] font-bold text-[#00e6d3]"
                >
                  ${(scrubData.total / 1000).toFixed(2)}M
                </motion.p>
                <p className="text-white/40 text-[10px] font-['Satoshi'] italic">cumulative annual recognized revenue</p>
              </div>
            </div>

            {/* Month scrubber */}
            <div className="mb-6">
              <input
                type="range"
                min={0}
                max={12}
                value={scrubMonth}
                onChange={(e) => setScrubMonth(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-white/10 cursor-pointer accent-[#00e6d3]"
                style={{
                  background: `linear-gradient(to right, #00e6d3 0%, #00e6d3 ${(scrubMonth / 12) * 100}%, rgba(255,255,255,0.08) ${(scrubMonth / 12) * 100}%, rgba(255,255,255,0.08) 100%)`,
                }}
              />
              <div className="flex justify-between text-[10px] text-white/30 font-['Satoshi'] mt-2 px-1">
                {["M0","M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12"].map(l => <span key={l}>{l}</span>)}
              </div>
            </div>

            {/* 3 product cards (live values from scrubber) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              {flywheelProducts.map((p, idx) => {
                const PIcon = p.icon;
                const live = idx === 0 ? scrubData.Sales : idx === 1 ? scrubData.RedTeam : scrubData.Console;
                const annual = idx === 0 ? rule78Stacked[12].Sales : idx === 1 ? rule78Stacked[12].RedTeam : rule78Stacked[12].Console;
                const pct = (live / annual) * 100;
                return (
                  <motion.div
                    key={p.name}
                    className="p-4 rounded-xl border bg-white/[0.02] relative overflow-hidden"
                    style={{ borderColor: `${p.color}33` }}
                    whileHover={{ scale: 1.02, borderColor: `${p.color}66` }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${p.color}15`, border: `1px solid ${p.color}30` }}>
                          <PIcon size={14} style={{ color: p.color }} />
                        </div>
                        <span className="font-['Satoshi'] font-bold text-white text-sm">{p.name}</span>
                      </div>
                      <span className="text-[10px] font-['JetBrains_Mono'] text-white/30">+${p.mrrAdd}K/mo</span>
                    </div>
                    <motion.p
                      key={live}
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: 1 }}
                      className="text-2xl font-['Cabinet_Grotesk'] font-bold mb-1"
                      style={{ color: p.color }}
                    >
                      ${(live / 1000).toFixed(2)}M
                    </motion.p>
                    <p className="text-white/40 text-[10px] font-['Satoshi'] italic mb-3">{p.badge}</p>
                    {/* Progress bar to Y1 target */}
                    <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: p.color }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-[9px] text-white/30 font-['JetBrains_Mono'] mt-1.5">{pct.toFixed(0)}% of ${(annual / 1000).toFixed(2)}M Y1 target</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Stacked area chart - revenue compounding by product */}
            <div className="p-4 rounded-xl border border-white/10 bg-black/30">
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-['Satoshi'] mb-3">Cumulative Recognized Revenue Build (Stacked, $K)</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={rule78Stacked} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00e6d3" stopOpacity={0.85} />
                        <stop offset="100%" stopColor="#00e6d3" stopOpacity={0.15} />
                      </linearGradient>
                      <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff6b8b" stopOpacity={0.85} />
                        <stop offset="100%" stopColor="#ff6b8b" stopOpacity={0.15} />
                      </linearGradient>
                      <linearGradient id="gradConsole" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#74c0fc" stopOpacity={0.85} />
                        <stop offset="100%" stopColor="#74c0fc" stopOpacity={0.15} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(1)}M`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "rgba(10,12,15,0.95)", border: "1px solid rgba(0,230,211,0.3)", borderRadius: 8, fontFamily: "Satoshi" }}
                      labelStyle={{ color: "#00e6d3" }}
                      formatter={(v: any, name: string) => [`$${(Number(v) / 1000).toFixed(2)}M`, name === "Sales" ? "ΔTOM Sales Dominator" : name === "RedTeam" ? "Red Team ΔTOM" : "ΔTOM Game Console"]}
                    />
                    <Area type="monotone" dataKey="Sales" stackId="1" stroke="#00e6d3" strokeWidth={2} fill="url(#gradSales)" />
                    <Area type="monotone" dataKey="RedTeam" stackId="1" stroke="#ff6b8b" strokeWidth={2} fill="url(#gradRed)" />
                    <Area type="monotone" dataKey="Console" stackId="1" stroke="#74c0fc" strokeWidth={2} fill="url(#gradConsole)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </RevealDiv>

        {/* Linear vs Rule-of-78 comparison chart */}
        <RevealDiv delay={0.1} className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl border border-[#00e6d3]/20 bg-gradient-to-br from-[#00e6d3]/4 to-[#00a7ff]/4">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#00e6d3] font-['Satoshi'] font-semibold mb-2">The Compounding Gap</p>
                <h3 className="font-['Cabinet_Grotesk'] font-bold text-white text-2xl md:text-3xl">Why $1.26M Becomes $8.19M</h3>
                <p className="text-white/50 text-sm font-['Satoshi'] mt-1">Same MRR added each month. The Rule of 78 is the multiplier most founders forget.</p>
              </div>
              <div className="flex gap-4 text-right">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-['Satoshi']">Linear (no compounding)</p>
                  <p className="text-xl font-['Cabinet_Grotesk'] font-bold text-white/60">$1.26M</p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#00e6d3] font-['Satoshi']">Rule of 78</p>
                  <p className="text-xl font-['Cabinet_Grotesk'] font-bold text-[#00e6d3]">$8.19M</p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#ffd166] font-['Satoshi']">Multiplier</p>
                  <p className="text-xl font-['Cabinet_Grotesk'] font-bold text-[#ffd166]">6.5x</p>
                </div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={linearVsCompound} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(1)}M`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(10,12,15,0.95)", border: "1px solid rgba(0,230,211,0.3)", borderRadius: 8 }}
                    labelStyle={{ color: "#00e6d3" }}
                    formatter={(v: any) => `$${(Number(v) / 1000).toFixed(2)}M`}
                  />
                  <Legend formatter={(v) => <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: "Satoshi" }}>{v === "Linear" ? "Linear (no compounding)" : "Rule of 78 (compounding)"}</span>} />
                  <Line type="monotone" dataKey="Linear" stroke="#9ca8ad" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  <Line type="monotone" dataKey="RuleOf78" stroke="#00e6d3" strokeWidth={3} dot={{ fill: "#00e6d3", r: 4 }} />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-white/40 text-xs font-['Satoshi'] italic mt-4 text-center">
              Same $105K of new MRR added every month for 12 months. Linear maths says $1.26M. SaaS reality (Rule of 78) says <span className="text-[#00e6d3] font-bold">$8.19M annual recognized revenue</span> — because each dollar of MRR earns from the month it lands.
            </p>
          </div>
        </RevealDiv>

        {/* Rule of 78 explainer */}
        <RevealDiv delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 rounded-2xl border border-[#00e6d3]/20 bg-[#00e6d3]/4">
            <div>
              <h4 className="font-['Satoshi'] font-bold text-white text-xl mb-3">Why Rule of 78?</h4>
              <p className="text-white/60 text-sm font-['Satoshi'] leading-relaxed mb-4">
                In SaaS, if you add $10K in new MRR every month for 12 months, you don't earn $120K — you earn $780K because each dollar compounds from the month it lands. The Rule of 78 is why SaaS businesses with consistent growth become exponentially valuable.
              </p>
              <div className="p-4 rounded-xl border border-[#FFD700]/20 bg-[#FFD700]/5 mb-3">
                <p className="text-[#FFD700] text-xs font-bold font-['Satoshi'] mb-1">Illustrative Example</p>
                <p className="text-white/50 text-xs font-['Satoshi']">$10K/mo new MRR × 12 months = $780K recognized revenue (not $120K)</p>
              </div>
              <p className="text-white/40 text-xs font-['Satoshi'] italic leading-relaxed">
                All Rule-of-78 examples are forward-looking management tools based on hypothetical MRR ramps. They are not commitments or depictions of current revenue performance.
              </p>
            </div>
            <div>
              <h4 className="font-['Satoshi'] font-bold text-white text-xl mb-3 text-center">MRR Compounding Effect</h4>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={[
                  { month: "M1", value: 8.5 },
                  { month: "M2", value: 25.5 },
                  { month: "M3", value: 51 },
                  { month: "M6", value: 153 },
                  { month: "M9", value: 306 },
                  { month: "M12", value: 510 },
                ]}>
                  <defs>
                    <linearGradient id="ruleGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00e6d3" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00e6d3" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }} />
                  <Area type="monotone" dataKey="value" stroke="#00e6d3" strokeWidth={2} fill="url(#ruleGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 10: FINANCIAL PROJECTIONS
   ══════════════════════════════════════════════════════════════════ */

function FinancialsSection() {
  const unitEcon = [
    { label: "Blended Gross Margin", value: "67%", icon: DollarSign, color: "#00e6d3" },
    { label: "Software Trio GM", value: "83%", icon: TrendingUp, color: "#00e6d3" },
    { label: "Target NRR", value: "130–150%+", icon: RefreshCw, color: "#00D4FF" },
    { label: "CAC Payback", value: "6–9 mo", icon: Clock, color: "#FFD700" },
    { label: "Target ACV", value: "$250K–$500K", icon: Target, color: "#FF6B9D" },
    { label: "Target Logo Churn", value: "5–10%", icon: Activity, color: "#A855F7" },
  ];

  return (
    <div id="financials" className="bg-black py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>5-Year Model</SectionLabel>
          <h2 className="font-['Cabinet_Grotesk'] font-bold text-white text-5xl md:text-6xl mb-6">
            Financial <span className="text-[#00e6d3]">Projections</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            Scenario-based financial projections. All figures are forward-looking management scenarios, not commitments.
          </p>
        </RevealDiv>

        {/* Scenario Table */}
        <RevealDiv className="mb-12">
          <h3 className="font-['Satoshi'] font-bold text-white text-2xl mb-6 text-center">5-Year Revenue Scenario Ranges</h3>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/3">
                  <th className="text-left px-6 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">Year</th>
                  <th className="text-right px-4 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">Revenue Range</th>
                  <th className="text-right px-4 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">EBITDA Status</th>
                  <th className="text-right px-6 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">GM Range</th>
                </tr>
              </thead>
              <tbody>
                {FINANCIAL_PROJECTIONS.map((row, i) => (
                  <tr key={row.year} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-transparent" : "bg-white/2"}`}>
                    <td className="px-6 py-4 font-bold text-sm font-['Satoshi'] text-[#00e6d3]">{row.year}</td>
                    <td className="px-4 py-4 text-right text-white/70 text-sm font-['Satoshi']">${row.revLow}M – ${row.revHigh}M</td>
                    <td className="px-4 py-4 text-right text-sm font-['Satoshi']">
                      <span className={row.ebitdaNote === "Negative" ? "text-red-400" : row.ebitdaNote === "~Breakeven" ? "text-[#FFD700]" : "text-[#00e6d3]"}>{row.ebitdaNote}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-white/60 text-sm font-['Satoshi']">{row.gmRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/30 text-xs font-['Satoshi'] mt-3 italic">All projections are management scenarios based on assumed customer acquisition and expansion rates. Not commitments.</p>
        </RevealDiv>

        {/* Key Assumptions */}
        <RevealDiv delay={0.1} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-[#00e6d3]/20 bg-[#00e6d3]/4">
              <h3 className="font-['Satoshi'] font-bold text-white text-lg mb-4">Key Assumptions</h3>
              <div className="space-y-2">
                {[
                  "10–20 new enterprise customers per year",
                  "Initial ACV of $250K–$500K",
                  "NRR of 130–150%+ through expansion",
                  "Gross margins improve with scale (75% → 85%)",
                  "EBITDA breakeven targeted by Year 3",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check className="text-[#00e6d3] mt-0.5 flex-shrink-0" size={14} />
                    <span className="text-white/60 text-sm font-['Satoshi']">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-[#00e6d3]/20 bg-[#00e6d3]/4">
              <h3 className="font-['Satoshi'] font-bold text-white text-lg mb-4">Target Metrics</h3>
              <div className="space-y-2">
                {[
                  { label: "ARR / FTE at Scale", value: "$200K–$300K+", color: "#00e6d3" },
                  { label: "Burn Multiple", value: "<2x by Y2", color: "#00e6d3" },
                  { label: "Logo Churn Target", value: "5–10%", color: "#00D4FF" },
                  { label: "CAC Payback", value: "6–9 months", color: "#FFD700" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-white/50 text-sm font-['Satoshi']">{item.label}</span>
                    <span className="font-bold text-sm font-['Satoshi']" style={{ color: item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealDiv>

        {/* Unit economics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {unitEcon.map((metric, i) => (
            <RevealDiv key={metric.label} delay={i * 0.07}>
              <div className="p-4 rounded-xl border border-white/10 bg-white/2 text-center hover:border-opacity-50 transition-all"
                style={{ borderColor: `${metric.color}20` }}>
                <metric.icon className="mx-auto mb-2" size={18} style={{ color: metric.color }} />
                <div className="text-xl font-bold font-['Satoshi'] mb-1" style={{ color: metric.color }}>{metric.value}</div>
                <div className="text-white/40 text-xs font-['Satoshi'] uppercase tracking-wider">{metric.label}</div>
              </div>
            </RevealDiv>
          ))}
        </div>

        <RevealDiv delay={0.15} className="mb-4">
          <p className="text-white/30 text-xs font-['Satoshi'] italic text-center mt-4">Target Unit Economics (Modeled, Not Historical). Actual metrics will be reported once we have 12+ months of production cohort data.</p>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 11: VALUATION ANALYSIS
   ══════════════════════════════════════════════════════════════════ */

function ValuationSection() {
  const methodologies = [
    {
      name: "Cost-to-Duplicate",
      range: "$95M – $165M",
      midpoint: "$130M",
      color: "#00e6d3",
      icon: Layers,
      desc: "Direct cost to rebuild the ΔTOM core platform plus 15 vertical/horizontal products, infrastructure, and accumulated know-how.",
      items: [
        { label: "ΔTOM core platform", value: "$15–25M" },
        { label: "ΔTOM Sales Dominator", value: "$8–12M" },
        { label: "ΔTOM Game Console", value: "$15–25M" },
        { label: "PhysioPS / HumanOS", value: "$6–10M" },
        { label: "ClinixAI Healthcare Stack", value: "$3.5–5.5M" },
        { label: "ΔTOM Red Team + Security", value: "$3–5M" },
        { label: "Remaining 9 products", value: "$30–50M" },
        { label: "DevOps, Testing, Integration", value: "$5–10M" },
      ],
    },
    {
      name: "VC Comparable Method",
      range: "$150M – $500M",
      midpoint: "$200M (multi-product premium)",
      color: "#00e6d3",
      icon: BarChart3,
      desc: "Median AI Series A pre-money 2025-2026: $90M (PitchBook). $3.2M closed + live deals command multi-product premium over single-product comps at $1B+.",
      items: [
        { label: "Distyl AI (multi-product)", value: "$1.8B valuation" },
        { label: "Gong (revenue intel)", value: "$4.5B valuation" },
        { label: "Oura (wearable)", value: "$11B valuation" },
        { label: "WHOOP (wearable)", value: "$10.1B valuation" },
        { label: "Nirmata Holdings (15 products)", value: "$150M–$250M ask" },
        { label: "Traction", value: "$3.2M closed + 2 live deals" },
      ],
    },
    {
      name: "Market Comparables",
      range: "$120M – $280M",
      midpoint: "$200M",
      color: "#00D4FF",
      icon: Globe,
      desc: "ClinixAI $4M+ pipeline + $3.2M closed + 2 live ATOM Pro deals ($600K ARR/$1.8M TCV). 15-product platform premium across multiple verticals.",
      items: [
        { label: "ClinixAI pipeline", value: "$4M+ qualified pipeline" },
        { label: "ATOM Professional (2 live)", value: "$600K ARR / $1.8M TCV" },
        { label: "Forward multiple", value: "15–25x" },
        { label: "Active revenue base", value: "$60–100M standalone" },
        { label: "Platform premium (15 products)", value: "+$60–180M" },
      ],
    },
  ];

  return (
    <div id="valuation" className="bg-black py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>Valuation Analysis</SectionLabel>
          <h2 className="font-['Cabinet_Grotesk'] font-bold text-white text-5xl md:text-6xl mb-6">
            Three Lenses. <span className="text-[#00e6d3]">One Reasonable Range.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            $150M–$250M convergence across multiple methods.
          </p>
        </RevealDiv>

        {/* Three methodology cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {methodologies.map((m, i) => (
            <RevealDiv key={m.name} delay={i * 0.15}>
              <div className="p-7 rounded-2xl border h-full flex flex-col"
                style={{ borderColor: `${m.color}25`, background: `linear-gradient(135deg, ${m.color}06, transparent)` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${m.color}15`, border: `1px solid ${m.color}30` }}>
                    <m.icon size={18} style={{ color: m.color }} />
                  </div>
                  <span className="font-['Satoshi'] font-bold text-white text-sm">{m.name}</span>
                </div>
                <div className="mb-2">
                  <div className="text-2xl font-bold font-['Satoshi']" style={{ color: m.color }}>{m.range}</div>
                  <div className="text-white/40 text-xs font-['Satoshi']">Midpoint: {m.midpoint}</div>
                </div>
                <p className="text-white/55 text-sm font-['Satoshi'] leading-relaxed mb-5 flex-1">{m.desc}</p>
                <div className="space-y-1.5">
                  {m.items.map((item) => (
                    <div key={item.label} className="flex justify-between items-center text-xs">
                      <span className="text-white/40 font-['Satoshi']">{item.label}</span>
                      <span className="font-semibold font-['Satoshi']" style={{ color: m.color }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>

        {/* Convergence visualization */}
        <RevealDiv delay={0.3}>
          <div className="p-8 rounded-2xl border border-[#00e6d3]/20 bg-[#00e6d3]/4 text-center mb-12">
            <p className="text-white/40 text-sm font-['Satoshi'] uppercase tracking-widest mb-4">Convergence Zone</p>
            <div className="flex items-center justify-center gap-6 flex-wrap mb-4">
              <span className="text-white/50 text-sm font-['Satoshi']">Cost-to-Duplicate</span>
              <div className="w-8 h-px bg-white/20" />
              <span className="text-white/50 text-sm font-['Satoshi']">VC Method</span>
              <div className="w-8 h-px bg-white/20" />
              <span className="text-white/50 text-sm font-['Satoshi']">Market Comps</span>
            </div>
            <div className="text-6xl font-bold font-['Cabinet_Grotesk'] text-[#00e6d3] mb-2">$150M–$250M</div>
            <p className="text-white/50 text-sm font-['Satoshi']">Three independent analyses converge on $150M–$250M pre-money. Median AI Series A pre-money 2025-2026: $90M (PitchBook).</p>
          </div>
        </RevealDiv>

        {/* Comparables table */}
        <RevealDiv delay={0.2}>
          <h3 className="font-['Satoshi'] font-bold text-white text-2xl mb-6">Market Comparables</h3>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/3">
                  <th className="text-left px-6 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">Company</th>
                  <th className="text-right px-4 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">Capital Raised</th>
                  <th className="text-right px-4 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">Valuation</th>
                  <th className="text-right px-6 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">Products</th>
                </tr>
              </thead>
              <tbody>
                {COMP_TABLE.map((row, i) => (
                  <tr key={row.company}
                    className={`border-b border-white/5 ${row.company === "Nirmata Holdings" ? "bg-[#00e6d3]/5" : i % 2 === 0 ? "bg-transparent" : "bg-white/2"}`}>
                    <td className={`px-6 py-4 font-bold text-sm font-['Satoshi'] ${row.company === "Nirmata Holdings" ? "text-[#00e6d3]" : "text-white/80"}`}>{row.company}</td>
                    <td className="px-4 py-4 text-right text-white/60 text-sm font-['Satoshi']">{row.raised}</td>
                    <td className="px-4 py-4 text-right">
                      <span className={`text-sm font-bold font-['Satoshi'] ${row.company === "Nirmata Holdings" ? "text-[#00e6d3]" : "text-white/60"}`}>{row.valuation}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-white/50 text-sm font-['Satoshi']">{row.products}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 rounded-xl border border-[#00e6d3]/15 bg-[#00e6d3]/3">
            <p className="text-[#00e6d3] text-sm font-bold font-['Satoshi']">The asymmetric opportunity:</p>
            <p className="text-white/60 text-sm font-['Satoshi'] mt-1">We intentionally price at a fraction of late-stage comps to align maximum upside with early investors. Entry at $60M with 15 products in portfolio vs. single-product companies at $1B–$10B+ represents asymmetric risk/reward.</p>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TERM SHEET WRAPPER
   ══════════════════════════════════════════════════════════════════ */

const EQUITY_VEHICLE = {
  id: "equity",
  name: "Equity (Series A Preferred)",
  tagline: "Standard VC Structure",
  description: "Traditional Series A preferred equity with board governance, pro-rata rights, and information rights. Clean cap table entry at $150M–$250M pre-money.",
  minInvest: "$250K",
  features: [
    "1x non-participating liquidation preference",
    "Pro-rata rights in future rounds",
    "Information rights & quarterly reporting",
    "Board observer seat",
    "Broad-based weighted average anti-dilution",
  ],
  riskLevel: "moderate",
  targetReturn: "10-50x",
  lockup: "5-7 years",
  color: "#00e6d3",
};

function TermSheetWrapper() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {!open ? (
        <div className="p-6 rounded-2xl border border-[#00e6d3]/20 bg-[#00e6d3]/4 text-center">
          <p className="text-white/60 text-sm font-['Satoshi'] mb-4">Series A Preferred Equity — $150M–$250M Pre-Money Valuation</p>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00e6d3] via-[#00a7ff] to-[#00a89e] text-white shadow-[0_0_24px_rgba(0,230,211,0.32)] font-bold rounded-xl hover:shadow-[0_0_32px_rgba(0,230,211,0.45)] transition-all font-['Satoshi']"
          >
            <FileText size={16} />
            Open Interactive Term Sheet
          </button>
        </div>
      ) : (
        <TermSheet vehicle={EQUITY_VEHICLE} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 12: INVESTMENT OPPORTUNITY / TERM SHEET
   ══════════════════════════════════════════════════════════════════ */

function InvestmentSection() {
  return (
    <div id="investment" className="bg-black py-32 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#00e6d3]/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>Series A</SectionLabel>
          <h2 className="font-['Cabinet_Grotesk'] font-bold text-white text-5xl md:text-6xl mb-6">
            Investment <span className="text-[#00e6d3]">Opportunity</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            $25M–$50M Series A. $150M–$250M pre-money valuation. Clean cap table.
          </p>
        </RevealDiv>

        {/* Term Sheet Component */}
        <RevealDiv className="mb-16">
          <TermSheetWrapper />
        </RevealDiv>

        {/* Use of Funds */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <RevealDiv delay={0.1}>
            <h3 className="font-['Satoshi'] font-bold text-white text-2xl mb-6">Use of Funds ($20M midpoint)</h3>
            <div className="space-y-3 mb-6">
              {FUNDS_ALLOCATION.map((item, i) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm font-['Satoshi']">{item.name}</span>
                    <span className="font-bold text-sm font-['Satoshi']" style={{ color: item.color }}>{item.amount} ({item.value}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </RevealDiv>

          <RevealDiv delay={0.15}>
            <h3 className="font-['Satoshi'] font-bold text-white text-2xl mb-6">Funds Allocation</h3>
            <ResponsiveContainer width="100%" height={240}>
              <RePieChart>
                <Pie
                  data={FUNDS_ALLOCATION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {FUNDS_ALLOCATION.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }}
                  formatter={(v: any, name: any, props: any) => [
                    `${v}% — ${props.payload.amount}`,
                    props.payload.name,
                  ]}
                />
                <Legend formatter={(v) => <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>{v}</span>} />
              </RePieChart>
            </ResponsiveContainer>
          </RevealDiv>
        </div>

        {/* Milestone roadmap */}
        <RevealDiv delay={0.2}>
          <h3 className="font-['Satoshi'] font-bold text-white text-2xl mb-8">Strategic Milestone Roadmap</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#00e6d3] via-[#00e6d3] to-[#FF6B9D]" />
            <div className="space-y-6">
              {MILESTONES.map((m, i) => (
                <RevealDiv key={m.month} delay={i * 0.1}>
                  <div className="flex items-start gap-6 pl-4">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center z-10 mt-1 flex-shrink-0"
                      style={{ backgroundColor: m.color, border: `2px solid ${m.color}40` }}>
                      <div className="w-2 h-2 rounded-full bg-black" />
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-white/40 text-xs font-bold uppercase tracking-widest font-['Satoshi']">{m.month}</span>
                        <m.icon size={14} style={{ color: m.color }} />
                        <span className="font-['Satoshi'] font-bold text-white text-sm">{m.target}</span>
                      </div>
                    </div>
                  </div>
                </RevealDiv>
              ))}
            </div>
          </div>
        </RevealDiv>

        {/* Long-term vision */}
        <RevealDiv delay={0.4} className="mt-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-xl border border-[#00e6d3]/20 bg-[#00e6d3]/4 text-center">
              <Calendar className="mx-auto mb-3 text-[#00e6d3]" size={24} />
              <div className="text-2xl font-bold font-['Satoshi'] text-[#00e6d3] mb-1">12–18 Months</div>
              <div className="text-white/60 text-sm font-['Satoshi']">Series B readiness with strong ARR traction</div>
            </div>
            <div className="p-6 rounded-xl border border-[#00e6d3]/20 bg-[#00e6d3]/4 text-center">
              <TrendingUp className="mx-auto mb-3 text-[#00e6d3]" size={24} />
              <div className="text-2xl font-bold font-['Satoshi'] text-[#00e6d3] mb-1">Year 3–4</div>
              <div className="text-white/60 text-sm font-['Satoshi']">Path to $100M+ ARR</div>
            </div>
            <div className="p-6 rounded-xl border border-[#FFD700]/20 bg-[#FFD700]/4 text-center">
              <Crown className="mx-auto mb-3 text-[#FFD700]" size={24} />
              <div className="text-2xl font-bold font-['Satoshi'] text-[#FFD700] mb-1">Long-Term</div>
              <div className="text-white/60 text-sm font-['Satoshi']">EBITDA-positive at scale with expanding margins</div>
            </div>
          </div>
        </RevealDiv>

        {/* Hiring plan */}
        <RevealDiv delay={0.3} className="mt-8">
          <div className="p-6 rounded-xl border border-white/10 bg-white/2 flex items-center gap-6 flex-wrap">
            <Users className="text-[#00e6d3] flex-shrink-0" size={24} />
            <div>
              <div className="text-[#00e6d3] font-bold font-['Satoshi']">Hiring Plan</div>
              <div className="text-white/50 text-sm font-['Satoshi']">4 → 45 people in 18 months. Engineering, Sales, Customer Success, and Infrastructure teams.</div>
            </div>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 13: ETHICS & CLOSING
   ══════════════════════════════════════════════════════════════════ */

function EthicsSection() {
  return (
    <div id="ethics" className="bg-black py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 animate-cinematic-gradient opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 2 }}>
        <RevealDiv className="text-center mb-20">
          <SectionLabel>Ethical AI Covenant</SectionLabel>
          <h2 className="font-['Cabinet_Grotesk'] font-bold text-white text-5xl md:text-6xl mb-6">
            Ethics & <span className="text-[#00e6d3]">Principles</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            Not a pledge. A covenant. Philosophically engrained. Contractually enforced. Architecturally implemented.
          </p>
        </RevealDiv>

        {/* Ethics vs competitors comparison */}
        <RevealDiv delay={0.1} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/3 ethics-glow-red">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="text-red-400" size={20} />
                <span className="font-['Satoshi'] font-bold text-red-400 text-lg">Companies That Violated Pledges</span>
              </div>
              <div className="space-y-3">
                {[
                  "Anthropic — Abandoned original safety pledges to compete commercially",
                  "OpenAI — Non-profit mission replaced by $157B for-profit valuation",
                  "Microsoft Copilot — Trains on customer data without explicit consent",
                  "Google Vertex — No IP ownership transfer; Google retains usage rights",
                  "Salesforce Einstein — Customer data used to train shared models",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <p className="text-white/50 text-sm font-['Satoshi']">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-[#00e6d3]/20 bg-[#00e6d3]/3 ethics-glow-teal">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="text-[#00e6d3]" size={20} />
                <span className="font-['Satoshi'] font-bold text-[#00e6d3] text-lg">Nirmata Holdings Covenant</span>
              </div>
              <div className="space-y-3">
                {[
                  "Customer owns 100% of IP — contractual guarantee, no exceptions",
                  "Zero-training guarantee — never trains on customer data, period",
                  "Human-in-the-loop governance for ALL agentic systems",
                  "Transparent vendor matrix — every claim is publicly verifiable",
                  "Data sovereignty — customer controls every byte, always",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check className="text-[#00e6d3] mt-0.5 flex-shrink-0" size={14} />
                    <p className="text-white/70 text-sm font-['Satoshi']">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealDiv>

        {/* 8 pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {ETHICS_PILLARS.map((pillar, i) => (
            <RevealDiv key={pillar.title} delay={i * 0.07}>
              <div className="p-5 rounded-xl border border-[#00e6d3]/15 bg-[#00e6d3]/3 h-full">
                <pillar.icon className="text-[#00e6d3] mb-3" size={20} />
                <h4 className="font-['Satoshi'] font-bold text-white text-sm mb-2">{pillar.title}</h4>
                <p className="text-white/50 text-xs font-['Satoshi'] leading-relaxed">{pillar.desc}</p>
              </div>
            </RevealDiv>
          ))}
        </div>

        {/* Quantum closing */}
        <RevealDiv delay={0.2} className="mb-16">
          <div className="relative p-8 md:p-12 rounded-2xl border border-[#00e6d3]/30 bg-[#00e6d3]/5">
            <Quote className="absolute top-6 left-6 text-[#00e6d3]/20" size={48} />
            <blockquote className="text-white/70 text-lg font-['Satoshi'] leading-relaxed pl-8 md:pl-12 italic mb-6">
              "This quantum-inspired symbiosis of technology, emotion, and ethics is fundamental for humanity to adapt and keep pace with the exponential changes brought by human+AI collaboration, unlocking near-infinite possibilities by harmonizing human creativity and machine intelligence dynamically. Regarding technosocialism versus technofeudalism — technology should democratically empower all individuals with equitable access to resources, innovation, and governance guided by transparency, ethics, and collective responsibility."
            </blockquote>
            <div className="pl-8 md:pl-12">
              <div className="text-[#00e6d3] font-semibold font-['Satoshi']">Nirmata Holdings Founders</div>
            </div>
          </div>
        </RevealDiv>

        {/* Final CTA */}
        <RevealDiv delay={0.3}>
          <div className="text-center p-10 md:p-16 rounded-3xl border border-[#00e6d3]/20 bg-gradient-to-br from-[#00e6d3]/5 to-[#00e6d3]/5">
            <p className="text-[#00e6d3] text-sm font-semibold uppercase tracking-widest font-['Satoshi'] mb-4">The Opportunity</p>
            <h3 className="font-['Cabinet_Grotesk'] font-bold text-white text-3xl md:text-5xl mb-4 leading-tight">
              Invest in the Nervous System<br />of <span className="text-[#00e6d3]">Enterprise AI</span>
            </h3>
            <p className="text-white/50 text-lg font-['Satoshi'] max-w-2xl mx-auto mb-8">
              Series A | $25M–$50M | $150M–$250M Pre-Money | 15 Products | 25/25 Score | $3.2M Just Closed
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <a
                href="mailto:ben@nirmataholdings.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00e6d3] via-[#00a7ff] to-[#00a89e] text-white shadow-[0_0_24px_rgba(0,230,211,0.32)] font-bold rounded-xl hover:shadow-[0_0_32px_rgba(0,230,211,0.45)] transition-all transform hover:scale-105 font-['Satoshi'] text-lg"
              >
                <Mail size={18} />
                Schedule Investor Meeting
              </a>
              <a
                href="/antimatterai_mega_document.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#00e6d3]/40 text-[#00e6d3] rounded-xl hover:bg-[#00e6d3]/10 transition-all font-['Satoshi']"
              >
                <Download size={16} />
                Investor Deep Dive (66 pages)
              </a>
            </div>

            {/* Document downloads */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { label: "Investor Deep Dive", file: "/antimatterai_mega_document.pdf" },
                { label: "State of Disruption", file: "/antimatterai_state_of_disruption.pdf" },
                { label: "Investor Hype Deck", file: "/antimatterai_investor_hype.pdf" },
                { label: "Pitch Deck (PPTX)", file: "/antimatterai_pitch_deck.pptx" },
              ].map((doc) => (
                <a
                  key={doc.label}
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition-all text-sm font-['Satoshi']"
                >
                  <FileText size={14} />
                  {doc.label}
                </a>
              ))}
            </div>
          </div>
        </RevealDiv>

        {/* Market Research Component */}
        <RevealDiv delay={0.4} className="mt-12">
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={() => document.getElementById("market-research-section")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#00e6d3] text-white font-bold rounded-xl hover:shadow-[0_0_32px_rgba(0,230,211,0.45)] transition-all transform hover:scale-105 font-['Satoshi'] text-lg"
            >
              <BarChart3 size={22} />
              View Interactive Market Research
              <ChevronRight size={18} />
            </button>
          </div>
        </RevealDiv>

        {/* Market Research Component */}
        <div id="market-research-section" className="mt-12">
          <RevealDiv delay={0.1}>
            <MarketResearch />
          </RevealDiv>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION: HONEST GAP ANALYSIS
   ══════════════════════════════════════════════════════════════════ */

function HonestGapAnalysis() {
  const gaps = [
    { title: "Early Revenue Stage", desc: "$3.2M closed. 2 ATOM Professional deals live at $25K/mo ($600K ARR / $1.8M TCV). Hundreds of deals in pipeline. Still building first full-year cohort data.", icon: DollarSign, status: "Building" },
    { title: "4 Products in Early Stage", desc: "ΔTOM Game Console, ΔTOM Sales Dominator, PhysioPS/HumanOS, and MoleculeAI are in LIMITED BETA or R&D. Not all 15 products are production-ready.", icon: AlertCircle, status: "In Progress" },
    { title: "First 12-Month Cohort Data", desc: "We are building our first 12-month customer cohort data. NRR, churn, and expansion metrics will mature over the next 2–3 quarters.", icon: LineChart, status: "Building" },
    { title: "Key Hires Needed", desc: "Head of Engineering, Clinical Advisor, and Security Advisor roles are open. These are critical for scaling the next phase.", icon: Users, status: "Hiring" },
  ];

  return (
    <div id="gaps" className="bg-black py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealDiv className="text-center mb-16">
          <SectionLabel>Transparency</SectionLabel>
          <h2 className="font-['Cabinet_Grotesk'] font-bold text-white text-5xl md:text-6xl mb-6">
            Honest <span className="text-[#00e6d3]">Gap Analysis</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            What we don't have yet — and what we're building toward. Transparency builds trust.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gaps.map((gap, i) => (
            <RevealDiv key={gap.title} delay={i * 0.1}>
              <div className="p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/3 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
                    <gap.icon size={18} className="text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-['Satoshi'] font-bold text-white text-sm">{gap.title}</h4>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/15 text-yellow-400 font-semibold font-['Satoshi']">{gap.status}</span>
                </div>
                <p className="text-white/55 text-sm font-['Satoshi'] leading-relaxed">{gap.desc}</p>
              </div>
            </RevealDiv>
          ))}
        </div>

        <RevealDiv delay={0.3} className="mt-10">
          <div className="p-6 rounded-2xl border border-[#00e6d3]/20 bg-[#00e6d3]/3 text-center">
            <p className="text-white/60 text-sm font-['Satoshi']">
              <span className="text-[#00e6d3] font-bold">Why we share this:</span> Investors who back Nirmata Holdings at $150M–$250M pre-money are buying into $3.2M closed, live ARR, hundreds of deals in pipeline, and the 15-product portfolio thesis. We believe radical transparency accelerates trust and alignment.
            </p>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="font-['Satoshi'] font-bold text-white text-2xl mb-3">
              Nirmata <span className="text-[#00e6d3]">Holdings</span>
            </div>
            <p className="text-white/40 text-sm font-['Satoshi'] max-w-xs leading-relaxed mb-5">
              The nervous system of enterprise AI. Building the quantum future of human-machine symbiosis.
            </p>
            <p className="text-white/20 text-xs font-['Satoshi']">
              CONFIDENTIAL — FOR QUALIFIED INVESTORS ONLY<br />
              © 2026 Nirmata Holdings. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest font-['Satoshi'] mb-4">Documents</h4>
            <div className="space-y-2">
              {[
                { label: "Investor Deep Dive", file: "/antimatterai_mega_document.pdf" },
                { label: "State of Disruption", file: "/antimatterai_state_of_disruption.pdf" },
                { label: "Investor Hype Deck", file: "/antimatterai_investor_hype.pdf" },
                { label: "Pitch Deck (PPTX)", file: "/antimatterai_pitch_deck.pptx" },
              ].map((doc) => (
                <a
                  key={doc.label}
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/50 hover:text-[#00e6d3] text-sm transition-colors font-['Satoshi']"
                >
                  <Download size={12} />
                  {doc.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest font-['Satoshi'] mb-4">Contact</h4>
            <div className="space-y-2">
              <a href="mailto:ben@nirmataholdings.com" className="flex items-center gap-2 text-white/50 hover:text-[#00e6d3] text-sm transition-colors font-['Satoshi']">
                <Mail size={12} />
                ben@nirmataholdings.com
              </a>
              <a href="https://www.nirmataholdings.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-[#00e6d3] text-sm transition-colors font-['Satoshi']">
                <Globe size={12} />
                www.nirmataholdings.com
              </a>
              <div className="flex items-center gap-2 text-white/30 text-sm font-['Satoshi']">
                <MapPin size={12} />
                Mars
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-['Satoshi']">
            $3.2M Closed · Active ARR · May 2026 · Series A $25M–$50M · $150M–$250M Pre-Money
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CURSOR GLOW
   ══════════════════════════════════════════════════════════════════ */

function CursorGlow() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return (
    <div
      className="cursor-glow pointer-events-none"
      style={{ left: pos.x, top: pos.y }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN HOME COMPONENT
   ══════════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Global effects */}
      <ScrollProgress />
      <StickyNav />
      <CursorGlow />

      {/* All sections */}
      <HeroSection />
      <QuantumSection />
      <CompanySection />
      <VendorMatrixSection />
      <ProductsSection />
      <DeltaDoctrine />
      <MoatSection />
      <FortressMoat />
      <MarketSection />
      <GTMSection />
      <InvasionPlan />
      <RevenueSection />
      <FinancialsSection />
      <ValuationSection />
      <InvestmentSection />
      <TheAsk />
      <StateOfDisruption />
      <EthicsSection />
      <HonestGapAnalysis />

      {/* Footer */}
      <Footer />

      {/* C1 AI Assistant (floating bottom-right) */}
      <C1Assistant />
    </div>
  );
}
