import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Brain, HeartPulse, Atom, Video, Target, Globe, Shield, Cpu,
  ChevronDown, ArrowRight, Check, Zap, Lock, TrendingUp,
  BarChart3, Layers, Network, X, ExternalLink, Eye, Scale, Search, AlertTriangle,
  Play, Pause, DollarSign, Rocket, Crown, Quote, Hammer, Building2, Wrench
} from "lucide-react";
import {
  PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";
import { PerplexityAttribution } from "@/components/PerplexityAttribution";
import TermSheet from "@/components/TermSheet";
import MarketResearch from "@/components/MarketResearch";

/* ─── COMPANY DATA ─── */

const heroStats = [
  { value: 8, label: "Live Products", prefix: "", suffix: "" },
  { value: 700, label: "Combined TAM", prefix: "$", suffix: "B" },
  { value: 100, label: "Self-Funded", prefix: "", suffix: "%" },
  { value: 100, label: "Compute Margin", prefix: "~", suffix: "%" },
];

const products = [
  { name: "AntimatterAI", type: "MRR", desc: "AI Design Studio — GenUI, UX, Agentic AI platform. ~100% margin. Per-user SaaS.", tam: "$50B+", cagr: "34.2%", icon: "brain", url: "https://www.antimatterai.com" },
  { name: "ClinixAI", type: "MRR", desc: "AI Billing Agent — per-claim revenue, automated medical coding & RCM. $45.4B TAM.", tam: "$45.4B", cagr: "25.4%", icon: "heart-pulse", url: "https://www.antimatterai.com/clinix" },
  { name: "MoleculeAI", type: "Acquisition", desc: "Quantum drug discovery — VQE, ADMET profiling. Built to sell to Big Pharma for 8-9 figures.", tam: "$160B", cagr: "23.2%", icon: "atom", url: "https://www.antimatterai.com" },
  { name: "Vidzee", type: "Acquisition", desc: "AI video software for real estate — automates listing video creation at scale.", tam: "$185B", cagr: "16.4%", icon: "video", url: "https://www.antimatterai.com" },
  { name: "ATOM Lead Gen", type: "MRR", desc: "AI SDR agent — cold calls, emails, closes with real-time sentiment analysis.", tam: "$37.5B", cagr: "28.3%", icon: "target", url: "https://www.antimatterai.com/agentic-ai" },
  { name: "ATOM Browser", type: "Hybrid", desc: "AI-native browser challenging Chrome — agent capabilities baked in.", tam: "$76.8B", cagr: "32.8%", icon: "globe", url: "https://www.antimatterai.com" },
  { name: "Red Team ATOM", type: "MRR", desc: "Adversarial AI security testing. SOC2 compliant, post-quantum cryptography.", tam: "$15.2B", cagr: "36.7%", icon: "shield", url: "https://www.antimatterai.com/enterprise-ai" },
  { name: "ATOM LLM", type: "Hybrid", desc: "Proprietary LLM trained on deployment data — moat deepens with every customer.", tam: "$199B", cagr: "43.8%", icon: "cpu", url: "https://www.antimatterai.com/enterprise-ai" },
];

const investmentOptions = [
  { id: "tokenized", name: "Tokenized Equity", tagline: "Fractional, Liquid, Borderless", description: "Blockchain-secured digital equity tokens representing fractional ownership in AntimatterAI. Smart contracts automate distributions, enable 24/7 secondary trading, and provide real-time portfolio transparency.", minInvest: "$50K", features: ["24/7 Secondary Liquidity", "Smart Contract Distributions", "Real-Time Portfolio Dash", "Fractional Ownership Units", "Global Investor Access"], riskLevel: "moderate", targetReturn: "10-50x", lockup: "6 months", color: "#00FFB2" },
  { id: "tranche", name: "Milestone Tranches", tagline: "De-Risked, Milestone-Gated", description: "Capital deployed in structured phases tied to validated business milestones. Each tranche unlocks at progressively higher valuations, reducing downside risk while preserving maximum upside for early conviction.", minInvest: "$250K", features: ["3-Phase Deployment", "Valuation Step-Ups", "Milestone-Gated Releases", "Board Observer Rights", "Anti-Dilution Protection"], riskLevel: "low", targetReturn: "5-25x", lockup: "12-36 months", color: "#7B61FF" },
  { id: "safe", name: "SAFE + Warrant", tagline: "Speed, Simplicity, Upside", description: "Y Combinator-standard SAFE note with attached warrant coverage. Converts at next priced round with valuation cap protection. Warrant provides additional upside without dilution risk.", minInvest: "$100K", features: ["Valuation Cap Protection", "MFN Clause", "Pro-Rata Rights", "Warrant Coverage (20%)", "No Maturity / No Interest"], riskLevel: "moderate", targetReturn: "8-40x", lockup: "Until conversion", color: "#00D4FF" },
  { id: "spv", name: "SPV Co-Invest", tagline: "Institutional Grade, Portfolio Exposure", description: "Special Purpose Vehicle providing concentrated exposure to AntimatterAI's highest-growth portfolio companies. Quarterly NAV reporting, independent administration, and institutional-grade governance.", minInvest: "$500K", features: ["Portfolio Diversification", "Quarterly NAV Reports", "Independent Fund Admin", "Tax-Optimized Structure", "Co-Invest Rights"], riskLevel: "low", targetReturn: "6-20x", lockup: "24 months", color: "#FF6B35" },
  { id: "revenue", name: "Revenue-Based Financing", tagline: "Cash Flow Aligned Returns", description: "Non-dilutive capital with returns tied directly to AntimatterAI's monthly recurring revenue. Investors receive a percentage of MRR until a return cap is met — aligning incentives with real business performance.", minInvest: "$100K", features: ["Non-Dilutive", "Monthly Distributions", "Revenue-Linked Returns", "1.5-3x Return Cap", "No Board Seat Required"], riskLevel: "low", targetReturn: "1.5-3x", lockup: "18-24 months", color: "#FFD700" },
  { id: "convertible", name: "Convertible Note", tagline: "Debt Today, Equity Tomorrow", description: "Interest-bearing debt instrument that converts to preferred equity at the next qualified financing. Includes valuation cap and discount rate for early investor advantage.", minInvest: "$150K", features: ["8% Annual Interest", "20% Conversion Discount", "Valuation Cap", "Qualified Financing Trigger", "Maturity Extension Option"], riskLevel: "low", targetReturn: "5-15x", lockup: "18 months", color: "#E040FB" },
];

const exitPaths = [
  { name: "IPO", timeline: "2027-2028", potential: "$50B+" },
  { name: "Strategic Acquisition", timeline: "2026-2027", potential: "$15-25B" },
  { name: "Portfolio Exits", timeline: "2026-2028", potential: "$2-5B" },
  { name: "Secondary Sale", timeline: "Ongoing", potential: "Market" },
  { name: "SaaS Dividend Recap", timeline: "2027+", potential: "Recurring" },
];

const investorRights = ["Board Observer Seat", "Pro-Rata Rights", "Quarterly Reporting", "Anti-Dilution Protection", "Information Rights", "Major Investor Rights"];

const useOfProceeds = [
  { name: "ATOM Platform & Sales", value: 40, color: "#00FFB2" },
  { name: "Antimatter Center", value: 25, color: "#7B61FF" },
  { name: "ClinixAI & Lead Gen GTM", value: 20, color: "#00D4FF" },
  { name: "LLM & Red Team", value: 15, color: "#FF6B35" },
];

const revenueData = [
  { name: "Monthly Recurring", value: 55, color: "#00FFB2" },
  { name: "Acquisition & Licensing", value: 25, color: "#7B61FF" },
  { name: "Platform + Compute", value: 20, color: "#00D4FF" },
];

const revenueDetails = [
  { label: "Monthly Recurring", pct: 55, color: "#00FFB2", items: ["AntimatterAI SaaS", "ClinixAI Per-Claim", "ATOM Lead Gen", "Red Team Contracts"] },
  { label: "Acquisition & Licensing", pct: 25, color: "#7B61FF", items: ["MoleculeAI → Big Pharma", "Vidzee → PropTech", "IP Licensing"] },
  { label: "Platform + Compute", pct: 20, color: "#00D4FF", items: ["Nervous System Licensing", "Per-User Compute", "ATOM LLM API", "Akamai ~100% Margin"] },
];

/* ─── ATOM SPINE DATA ─── */
const spineNodes = [
  { name: "AntimatterAI", tam: "$50B+", cagr: "34.2%", desc: "AI Design & Agentic Platform", url: "https://www.antimatterai.com", icon: Brain },
  { name: "ClinixAI", tam: "$45.4B", cagr: "25.4%", desc: "Healthcare RCM & Billing AI", url: "https://www.antimatterai.com/clinix", icon: HeartPulse },
  { name: "MoleculeAI", tam: "$160B", cagr: "23.2%", desc: "Quantum Drug Discovery", url: "https://www.antimatterai.com", icon: Atom },
  { name: "Vidzee", tam: "$185B", cagr: "16.4%", desc: "AI Video & PropTech", url: "https://www.antimatterai.com", icon: Video },
  { name: "ATOM Lead Gen", tam: "$37.5B", cagr: "28.3%", desc: "AI Sales Development", url: "https://www.antimatterai.com/agentic-ai", icon: Target },
  { name: "ATOM Browser", tam: "$76.8B", cagr: "32.8%", desc: "AI-Native Browser", url: "https://www.antimatterai.com", icon: Globe },
  { name: "Red Team ATOM", tam: "$15.2B", cagr: "36.7%", desc: "AI Security Testing", url: "https://www.antimatterai.com/enterprise-ai", icon: Shield },
  { name: "ATOM LLM", tam: "$199B", cagr: "43.8%", desc: "Proprietary Language Model", url: "https://www.antimatterai.com/enterprise-ai", icon: Cpu },
];

/* ─── COMPETITIVE WALKTHROUGH DATA ─── */
const walkthroughSteps = [
  {
    num: "01",
    total: "06",
    question: "Can Your Customers Own Their AI?",
    dimension: "IP Ownership",
    answer: "Only Atom offers full customer IP ownership. Every deployment, customization, and trained model — the customer owns it all.",
    bars: [
      { vendor: "Atom", value: 100, isAtom: true },
      { vendor: "Kore.ai", value: 50, isAtom: false },
      { vendor: "IBM watsonx", value: 0, isAtom: false },
      { vendor: "Sierra", value: 0, isAtom: false },
      { vendor: "Google DFCX", value: 0, isAtom: false },
    ],
  },
  {
    num: "02",
    total: "06",
    question: "Can It Run Anywhere?",
    dimension: "Deployment Flexibility",
    answer: "VPC, on-prem, edge, air-gapped, multi-cloud, SaaS. Sierra? SaaS-only. When regulators mandate data sovereignty, Atom is already compliant.",
    bars: [
      { vendor: "Atom", value: 100, isAtom: true },
      { vendor: "Kore.ai", value: 50, isAtom: false },
      { vendor: "IBM watsonx", value: 50, isAtom: false },
      { vendor: "Sierra", value: 20, isAtom: false },
      { vendor: "Amazon Lex", value: 30, isAtom: false },
    ],
  },
  {
    num: "03",
    total: "06",
    question: "Can It Build Its Own Interface?",
    dimension: "GenUI — Generative UI",
    answer: "Atom is the ONLY vendor with GenUI. Dynamic, AI-generated interfaces that adapt in real-time. No other enterprise AI vendor has this. It's not on their roadmap.",
    bars: [
      { vendor: "Atom", value: 100, isAtom: true },
      { vendor: "Kore.ai", value: 0, isAtom: false },
      { vendor: "IBM watsonx", value: 0, isAtom: false },
      { vendor: "Sierra", value: 0, isAtom: false },
      { vendor: "Google DFCX", value: 0, isAtom: false },
    ],
  },
  {
    num: "04",
    total: "06",
    question: "Is It Locked to One Brain?",
    dimension: "Model-Agnostic Architecture",
    answer: "Atom works with any LLM — OpenAI, Anthropic, Google, Meta, or custom models. Google = Google only. Microsoft = Azure only. As models shift, Atom customers are never locked in.",
    bars: [
      { vendor: "Atom", value: 100, isAtom: true },
      { vendor: "Kore.ai", value: 80, isAtom: false },
      { vendor: "IBM watsonx", value: 50, isAtom: false },
      { vendor: "Google DFCX", value: 20, isAtom: false },
      { vendor: "Amazon Lex", value: 20, isAtom: false },
    ],
  },
  {
    num: "05",
    total: "06",
    question: "Is It Ready for Quantum Threats?",
    dimension: "Post-Quantum Cryptography",
    answer: "Only Atom has post-quantum cryptography built in. As quantum computing advances, every other platform's security becomes obsolete. Atom's doesn't.",
    bars: [
      { vendor: "Atom", value: 100, isAtom: true },
      { vendor: "Kore.ai", value: 0, isAtom: false },
      { vendor: "IBM watsonx", value: 0, isAtom: false },
      { vendor: "Sierra", value: 0, isAtom: false },
      { vendor: "Google DFCX", value: 0, isAtom: false },
    ],
  },
  {
    num: "06",
    total: "06",
    question: "The Scoreboard",
    dimension: "25-Dimension Vendor Matrix",
    answer: "Atom 25/25 — an 8-point lead over the nearest competitor. No vendor comes close to full capability coverage.",
    bars: [
      { vendor: "Atom", value: 25, isAtom: true },
      { vendor: "Kore.ai", value: 17, isAtom: false },
      { vendor: "IBM watsonx", value: 16, isAtom: false },
      { vendor: "Cognigy", value: 15, isAtom: false },
      { vendor: "Sierra", value: 13, isAtom: false },
      { vendor: "Google DFCX", value: 12, isAtom: false },
      { vendor: "Amazon Lex", value: 11, isAtom: false },
      { vendor: "Yellow.ai", value: 11, isAtom: false },
      { vendor: "Avaamo", value: 10, isAtom: false },
      { vendor: "LivePerson", value: 8, isAtom: false },
      { vendor: "Nuance", value: 8, isAtom: false },
    ],
  },
];

/* ─── CAPITAL MILESTONES ─── */
const capitalMilestones = [
  { amount: "$5M", target: "10 enterprise pipeline deals", actions: "Hire VP Sales + 10-person BDR team", color: "#00FFB2" },
  { amount: "$15M", target: "$5M+ ARR, 5 enterprise logos", actions: "Gartner engagement, conference circuit, analyst relations", color: "#00D4FF" },
  { amount: "$25M", target: "$15M+ ARR, analyst recognition", actions: "ATOM Browser GA, geographic expansion", color: "#7B61FF" },
  { amount: "$50M", target: "$50M+ ARR, IPO-ready", actions: "Full platform scale, IPO preparation", color: "#E040FB" },
];

/* ─── WHY WE WIN DATA ─── */
const whyWeWinCards = [
  {
    title: "We're Not Scared to Fail",
    desc: "Self-funded to $10.5B. We're not asking because we need money. We're asking because we want to win faster.",
    icon: Rocket,
  },
  {
    title: "100% Capability Coverage",
    desc: "25/25 in every dimension. Nearest competitor: 17/25. An 8-point lead in a 25-point scale is unprecedented.",
    icon: Crown,
  },
  {
    title: "Infinite Capital Efficiency",
    desc: "$0 raised, $10.5B created. Every dollar we deploy will have the same discipline.",
    icon: DollarSign,
  },
  {
    title: "The Consolidation Play",
    desc: "CIOs are reducing AI vendors from 10+ to 2-3. We're the platform that replaces 5 tools with 1.",
    icon: Layers,
  },
];

/* ─── ICON MAP ─── */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain, "heart-pulse": HeartPulse, atom: Atom, video: Video,
  target: Target, globe: Globe, shield: Shield, cpu: Cpu,
};

/* ─── ANIMATED COUNTER ─── */
function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl md:text-5xl font-bold gradient-text">
        {prefix}{count}{suffix}
      </div>
    </div>
  );
}

/* ─── SECTION WRAPPER WITH FADE-IN ─── */
function Section({ children, id, className = "" }: { children: React.ReactNode; id: string; className?: string }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* ─── PARTICLE CANVAS BACKGROUND ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0, 204, 143, ${p.opacity})`;
        ctx!.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(p2.x, p2.y);
            ctx!.strokeStyle = `rgba(0, 204, 143, ${0.08 * (1 - dist / 120)})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ─── TYPE BADGE COLORS ─── */
function TypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    MRR: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Acquisition: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    Hybrid: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${colors[type] || "bg-gray-500/20 text-gray-400"}`}>
      {type}
    </span>
  );
}

/* ─── FORMAT CURRENCY ─── */
function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

/* ─── NAVBAR COMPONENT ─── */
function Navbar({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "navbar-glass py-3" : "py-5 bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 group" data-testid="navbar-logo">
          <img src="/antimatter-logo.svg" alt="AntimatterAI" className="h-7 md:h-8 transition-opacity group-hover:opacity-80" />
        </button>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Story", id: "story" },
            { label: "Thesis", id: "thesis" },
            { label: "Portfolio", id: "portfolio" },
            { label: "Competition", id: "competition" },
            { label: "Research", id: "market-research" },
            { label: "Invest", id: "investment" },
            { label: "Returns", id: "roi" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
              data-testid={`nav-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo("investment")}
          className="px-5 py-2 text-sm font-semibold rounded-lg transition-all hover:brightness-110"
          style={{ background: "linear-gradient(135deg, #00FFB2, #00cc8e)", color: "#0a0e14" }}
          data-testid="nav-invest-now"
        >
          Invest Now
        </button>
      </div>
    </nav>
  );
}

/* ─── ATOM SPINE NODE COMPONENT ─── */
function SpineNode({ node, index, side }: { node: typeof spineNodes[0]; index: number; side: "left" | "right" }) {
  const NodeIcon = node.icon;
  const isLeft = side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className={`flex items-center gap-4 ${isLeft ? "flex-row-reverse text-right" : ""}`}
    >
      <a
        href={node.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block glass rounded-xl p-4 md:p-5 w-[260px] md:w-[300px] animate-node-breathe hover:border-primary/50 transition-colors group cursor-pointer"
        style={{ animationDelay: `${index * 0.3}s` }}
        data-testid={`spine-node-${node.name.toLowerCase().replace(/\s/g, "-")}`}
      >
        <div className={`flex items-center gap-3 mb-2 ${isLeft ? "justify-end" : ""}`}>
          <NodeIcon className="w-5 h-5 text-primary" />
          <h4 className="font-display font-bold text-sm md:text-base text-white">{node.name}</h4>
          <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-primary transition-colors" />
        </div>
        <p className="text-xs text-gray-500 mb-2">{node.desc}</p>
        <div className={`flex gap-4 text-xs ${isLeft ? "justify-end" : ""}`}>
          <span>
            <span className="text-gray-500">TAM: </span>
            <span className="text-primary font-bold">{node.tam}</span>
          </span>
          <span>
            <span className="text-gray-500">CAGR: </span>
            <span className="text-white font-semibold">{node.cagr}</span>
          </span>
        </div>
      </a>
    </motion.div>
  );
}

/* ─── COMPETITIVE WALKTHROUGH COMPONENT ─── */
function CompetitiveWalkthrough() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const STEP_DURATION = 5000;

  useEffect(() => {
    if (!playing) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed % STEP_DURATION) / STEP_DURATION * 100, 100);
      setProgress(pct);
      if (elapsed >= STEP_DURATION) {
        setStep((s) => (s + 1) % walkthroughSteps.length);
        setProgress(0);
      }
    }, 50);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, step]);

  const current = walkthroughSteps[step];
  const isFinal = step === walkthroughSteps.length - 1;
  const maxVal = isFinal ? 25 : 100;

  return (
    <div className="glass rounded-2xl p-6 md:p-10 overflow-hidden">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[#00FFB2] text-sm font-bold">{current.num}/{current.total}</span>
          <span className="text-white/40 text-sm">{current.dimension}</span>
        </div>
        <button
          onClick={() => setPlaying(!playing)}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
        >
          {playing ? <Pause className="w-4 h-4 text-white/60" /> : <Play className="w-4 h-4 text-white/60" />}
        </button>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {current.question}
          </h3>
          <p className="text-white/50 text-base md:text-lg mb-8 max-w-3xl">{current.answer}</p>

          {/* Bars */}
          <div className="space-y-3">
            {current.bars.map((bar, i) => (
              <motion.div
                key={bar.vendor}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex items-center gap-4"
              >
                <span className={`text-sm w-28 shrink-0 text-right ${bar.isAtom ? "text-[#00FFB2] font-bold" : "text-white/50"}`}>
                  {bar.vendor}
                </span>
                <div className="flex-1 h-8 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(bar.value / maxVal) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full"
                    style={{
                      background: bar.isAtom ? "linear-gradient(90deg, #00FFB240, #00FFB2)" : "rgba(255,255,255,0.1)",
                      boxShadow: bar.isAtom ? "0 0 20px rgba(0,255,178,0.3)" : "none",
                    }}
                  />
                </div>
                <span className={`font-mono text-sm w-12 ${bar.isAtom ? "text-[#00FFB2] font-bold" : "text-white/40"}`}>
                  {isFinal ? `${bar.value}/25` : `${bar.value}%`}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-10 flex items-center gap-4">
        <div className="flex gap-2">
          {walkthroughSteps.map((_, i) => (
            <button
              key={i}
              onClick={() => { setStep(i); setProgress(0); }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === step ? "bg-[#00FFB2] scale-125" : "bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
        <div className="flex-1 walkthrough-progress">
          <div className="walkthrough-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN HOME PAGE ─── */
export default function Home() {
  const [expandedOption, setExpandedOption] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [investAmount, setInvestAmount] = useState(500000);
  const [termSheetVehicle, setTermSheetVehicle] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 });

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cursor glow
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  // ROI chart data
  const roiChartData = [
    { year: "Year 0", value: investAmount },
    { year: "Year 1", value: investAmount * 1.8 },
    { year: "Year 2", value: investAmount * 3.2 },
    { year: "Year 3", value: investAmount * 5.5 },
    { year: "Year 4", value: investAmount * 7.8 },
    { year: "Year 5", value: investAmount * 10 },
  ];

  const openTermSheet = useCallback((vehicleId: string) => {
    setExpandedOption(null);
    setTermSheetVehicle(vehicleId);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" onMouseMove={handleMouseMove}>

      {/* Scroll Progress Indicator */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Cursor Glow */}
      <div
        className="cursor-glow hidden md:block"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* ═══════════════════════════════════════════
          STICKY NAVBAR
          ═══════════════════════════════════════════ */}
      <Navbar scrollTo={scrollTo} />

      {/* ════════════════════════════════════════════════════
          1. HERO SECTION
          ════════════════════════════════════════════════════ */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <ParticleCanvas />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,204,143,0.05)_0%,_transparent_70%)] z-[1]" />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium" data-testid="badge-round">
              <Zap className="w-3.5 h-3.5" />
              Series A — $25M-$50M Strategic Growth Round
            </span>
          </motion.div>

          {/* Logo + Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6"
          >
            <img
              src="/antimatter-logo.svg"
              alt="AntimatterAI"
              className="mx-auto h-20 sm:h-28 md:h-36 lg:h-44 mb-6 drop-shadow-[0_0_40px_rgba(0,255,178,0.15)]"
            />
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight gradient-text">
              ANTIMATTER AI
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-medium text-foreground/90 mb-3"
          >
            The Nervous System That Powers AI
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Every AI brain needs a body. We built the nervous system.
          </motion.p>

          {/* Confidence Signal Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mb-10"
          >
            <div className="confidence-bar max-w-3xl mx-auto">
              <span><span className="accent">$10.5B</span> valuation</span>
              <div className="divider" />
              <span><span className="accent">Self-funded</span></span>
              <div className="divider" />
              <span><span className="accent">Zero dilution</span></span>
              <div className="divider" />
              <span><span className="accent">Ready to accelerate</span></span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-12"
          >
            {heroStats.map((stat, i) => (
              <div key={i} data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              data-testid="button-explore-investment"
              onClick={() => scrollTo("investment")}
              className="px-8 py-3.5 bg-primary text-primary-foreground rounded-lg font-semibold text-base hover:brightness-110 transition-all glow-teal"
            >
              Explore Investment
              <ArrowRight className="inline ml-2 w-4 h-4" />
            </button>
            <button
              data-testid="button-view-portfolio"
              onClick={() => scrollTo("portfolio")}
              className="px-8 py-3.5 border border-primary/40 text-primary rounded-lg font-semibold text-base hover:bg-primary/10 transition-all"
            >
              View Portfolio
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <button onClick={() => scrollTo("story")} className="text-muted-foreground hover:text-primary transition-colors" data-testid="button-scroll-down">
            <ChevronDown className="w-6 h-6 animate-bounce-down" />
          </button>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. THE SIMPLE STORY (replaces video)
          ════════════════════════════════════════════════════ */}
      <Section id="story" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden gradient-border-card">
            <div className="animate-cinematic-gradient relative" style={{ minHeight: "520px" }}>
              {/* Glow orbs */}
              <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/10 blur-[80px]" />
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-teal-500/10 blur-[60px]" />

              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-primary/40 animate-float-particle"
                  style={{
                    left: `${15 + i * 10}%`,
                    top: `${60 + (i % 3) * 10}%`,
                    animationDelay: `${i * 0.7}s`,
                    animationDuration: `${4 + i * 0.5}s`,
                  }}
                />
              ))}

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full py-16 md:py-20 px-6 md:px-12 text-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-xs uppercase tracking-[0.4em] text-purple-300/60 mb-4"
                >
                  For Your Mom, Your Barber, and Your Uber Driver
                </motion.p>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-10 gradient-text-purple"
                >
                  The Simple Story
                </motion.h3>

                {/* Animated construction icons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4 mb-10"
                >
                  {[Hammer, ArrowRight, Wrench, ArrowRight, Building2, ArrowRight, Network].map((Icon, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      {Icon === ArrowRight ? (
                        <ArrowRight className="w-4 h-4 text-white/20" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary/60" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Paragraph 1 */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-base md:text-lg text-gray-300/80 leading-relaxed max-w-3xl mb-6"
                >
                  Imagine you're building a house. Most companies sell you a hammer, or a saw, or nails. We built the <span className="text-[#00FFB2] font-medium">skeleton and nervous system</span> that lets you use any tool you want — and we keep adding new tools based on what you actually need to build.
                </motion.p>

                {/* Paragraph 2 */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-base md:text-lg text-gray-300/80 leading-relaxed max-w-3xl mb-6"
                >
                  Some tools we give you monthly (steady income). Some we build custom for your specific house (big projects). Some tools are so good, other construction companies buy them from us (acquisitions). And because we're the <span className="text-[#8587e3] font-medium">nervous system connecting everything</span>, the more you build, the smarter and more valuable we become.
                </motion.p>

                {/* Paragraph 3 */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="text-base md:text-lg text-gray-300/80 leading-relaxed max-w-3xl mb-10"
                >
                  That's ATOM. We're not a product company. We're the platform that <span className="text-white font-medium">evolves with whatever the world needs next</span> — making us nearly impossible to disrupt and infinitely scalable.
                </motion.p>

                {/* Callout */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                  className="px-6 md:px-10 py-5 rounded-xl border border-[#00FFB2]/30 bg-[#00FFB2]/5 glow-teal"
                >
                  <p className="font-display text-lg md:text-xl font-bold text-white">
                    Translation:{" "}
                    <span className="gradient-text">We built the thing that makes all the other AI things work.</span>
                    <br className="hidden md:block" />
                    <span className="text-white/60 font-normal text-base"> And every new customer makes it smarter.</span>
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════
          3. THESIS SECTION
          ════════════════════════════════════════════════════ */}
      <Section id="thesis" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">The Thesis</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>

        <p className="font-display text-2xl md:text-4xl font-bold text-foreground mb-16 leading-tight max-w-4xl">
          Grok, Claude, ChatGPT are the brains.{" "}
          <span className="gradient-text">We built the nervous system.</span>
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Model Agnostic", desc: "Plugs into any LLM — GPT-5, Claude, Grok, Llama, or custom. No lock-in, infinite flexibility.", icon: Network },
            { title: "~100% Compute Margin", desc: "Akamai Cloud partnership delivers near-zero compute costs vs. 40-60% industry standard.", icon: Layers },
            { title: "Demand-Driven", desc: "Every single product originated from a paying customer request. Zero speculative builds.", icon: Target },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="glass glass-hover rounded-xl p-6 md:p-8 transition-all duration-300"
              data-testid={`card-thesis-${i}`}
            >
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center py-6 border-t border-b border-primary/10">
          <p className="text-lg md:text-xl font-medium">
            <span className="text-primary font-bold">$10.5B</span> Liquid Valuation ·{" "}
            <span className="text-primary font-bold">100%</span> Self-Funded ·{" "}
            <span className="text-primary font-bold">8</span> Products ·{" "}
            <span className="text-primary font-bold">7</span> Markets
          </p>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════
          4. PORTFOLIO / PRODUCTS SECTION
          ════════════════════════════════════════════════════ */}
      <Section id="portfolio" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">The Portfolio</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
        <p className="font-display text-2xl md:text-3xl font-bold mb-12">
          8 Products. 7 Markets. <span className="gradient-text">$700B TAM.</span>
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {products.map((product, i) => {
            const Icon = iconMap[product.icon] || Cpu;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="glass glass-hover rounded-xl p-6 transition-all duration-300 group cursor-default"
                data-testid={`card-product-${product.name.toLowerCase().replace(/\s/g, "-")}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg">{product.name}</h3>
                    </div>
                  </div>
                  <TypeBadge type={product.type} />
                </div>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{product.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">TAM:</span>{" "}
                      <span className="text-primary font-semibold">{product.tam}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">CAGR:</span>{" "}
                      <span className="text-foreground font-semibold">{product.cagr}</span>
                    </div>
                  </div>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:text-primary/80 transition-colors"
                    data-testid={`link-explore-${product.name.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    Explore
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════
          5. ATOM SPINE/BRAIN TAM VISUALIZATION
          ════════════════════════════════════════════════════ */}
      <Section id="atom" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">The ATOM Nervous System</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
        <p className="font-display text-2xl md:text-3xl font-bold mb-16">
          One Core. <span className="gradient-text">Eight Extensions.</span>
        </p>

        <div className="relative flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 mb-8"
          >
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center animate-spine-pulse">
              <div className="text-center">
                <Cpu className="w-8 h-8 text-primary mx-auto mb-1" />
                <span className="font-display font-bold text-sm text-primary">ATOM CORE</span>
                <p className="text-[10px] text-gray-500 mt-0.5">Neural Hub</p>
              </div>
            </div>
          </motion.div>

          <div className="relative w-full max-w-3xl">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 rounded-full animate-spine-glow-line" />
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/60 animate-particle-rise"
                style={{ bottom: `${i * 20}%`, animationDelay: `${i * 0.6}s`, animationDuration: `${2.5 + i * 0.3}s` }}
              />
            ))}

            <div className="relative py-4">
              {spineNodes.map((node, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={i} className={`flex items-center mb-8 last:mb-0 ${isLeft ? "justify-start" : "justify-end"}`}>
                    <svg
                      className="absolute pointer-events-none"
                      style={{ left: isLeft ? "0" : "50%", width: "50%", top: `${i * 12.5}%`, height: "40px" }}
                    >
                      <line
                        x1={isLeft ? "80%" : "0%"}
                        y1="50%"
                        x2={isLeft ? "50%" : "50%"}
                        y2="50%"
                        stroke="rgba(0, 255, 178, 0.3)"
                        strokeWidth="1"
                        strokeDasharray="6 4"
                        className="animate-dash"
                      />
                    </svg>
                    <div className={`w-full flex ${isLeft ? "pr-[52%]" : "pl-[52%]"}`}>
                      <SpineNode node={node} index={i} side={isLeft ? "left" : "right"} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-block px-10 py-5 rounded-2xl border border-primary/30 bg-primary/5 glow-teal-strong">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">Combined Addressable Market</p>
              <p className="font-display text-4xl md:text-5xl font-bold gradient-text">$700B+</p>
            </div>
          </motion.div>

          <p className="text-center text-muted-foreground mt-8 max-w-xl mx-auto">
            Customers pick their brain — <span className="text-primary font-medium">we provide the nervous system + spine.</span>
          </p>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════
          6. COMPETITIVE DOMINANCE (Interactive Walkthrough)
          ════════════════════════════════════════════════════ */}
      <Section id="competition" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">Competitive Dominance</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
        <p className="font-display text-2xl md:text-3xl font-bold mb-12">
          Why <span className="gradient-text">Nobody Comes Close</span>
        </p>

        <CompetitiveWalkthrough />
      </Section>

      {/* ════════════════════════════════════════════════════
          7. MARKET RESEARCH & INTELLIGENCE
          ════════════════════════════════════════════════════ */}
      <MarketResearch />

      {/* ════════════════════════════════════════════════════
          8. THE CAPITAL EFFICIENCY THESIS
          ════════════════════════════════════════════════════ */}
      <Section id="capital" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">The Capital Efficiency Thesis</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
        <p className="font-display text-2xl md:text-3xl font-bold mb-16">
          Every Dollar Works <span className="gradient-text">Harder Here</span>
        </p>

        {/* Top metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {[
            { label: "Capital Raised", value: "$0", sub: "Self-funded" },
            { label: "Liquid Valuation", value: "$10.5B", sub: "∞ capital efficiency" },
            { label: "Compute Margin", value: "~100%", sub: "Akamai partnership" },
            { label: "Products Shipping", value: "8", sub: "Demand-driven" },
          ].map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-5 text-center"
            >
              <p className="font-display text-2xl md:text-3xl font-bold gradient-text">{m.value}</p>
              <p className="text-white/70 text-sm font-medium mt-1">{m.label}</p>
              <p className="text-white/30 text-xs mt-0.5">{m.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Milestone-gated deployment */}
        <h3 className="font-display font-bold text-xl mb-8 text-center">Milestone-Gated Capital Deployment</h3>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-[#00FFB2]/40 via-[#7B61FF]/40 to-[#E040FB]/40 -translate-y-1/2" />

          <div className="grid md:grid-cols-4 gap-5">
            {capitalMilestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="flex justify-center mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center relative z-10 border-2"
                    style={{ borderColor: m.color, backgroundColor: `${m.color}15`, boxShadow: `0 0 20px ${m.color}30` }}
                  >
                    <span className="font-display text-sm font-bold" style={{ color: m.color }}>{i + 1}</span>
                  </div>
                </div>
                <div className="glass rounded-xl p-5 text-center">
                  <p className="font-display text-xl font-bold mb-2" style={{ color: m.color }}>{m.amount}</p>
                  <p className="text-white/50 text-xs mb-3 leading-relaxed">{m.actions}</p>
                  <div className="pt-3 border-t border-white/5">
                    <p className="text-[#00FFB2] text-sm font-semibold">{m.target}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Market timing window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="font-display font-bold text-xl mb-6 text-center">Why 2026 Is the Perfect Entry Point</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "Enterprise Consolidation", desc: "CIOs going from 10 AI vendors → 2-3. Full-stack platforms win.", icon: Layers },
              { title: "Regulatory Tailwinds", desc: "GDPR, HIPAA, EU AI Act favor deploy-anywhere architectures.", icon: Shield },
              { title: "LLM Commoditization", desc: "Value shifting to orchestration layer. Model lock-in is a liability.", icon: Brain },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 group hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <c.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-white font-semibold mb-2">{c.title}</h4>
                <p className="text-white/50 text-sm">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Gurley quote */}
          <div className="mt-10 text-center">
            <div className="glass rounded-xl p-6 inline-block max-w-2xl">
              <Quote className="w-6 h-6 text-[#00FFB2]/30 mx-auto mb-3" />
              <p className="text-white/70 italic text-sm md:text-base mb-3">
                "Institutional investors currently display no interest in ventures outside AI."
              </p>
              <p className="text-[#00FFB2] text-sm font-semibold">— Bill Gurley, Benchmark</p>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* ════════════════════════════════════════════════════
          9. WHY WE WIN / FOUNDER CONVICTION
          ════════════════════════════════════════════════════ */}
      <Section id="why-we-win" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">Why We Win</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
        <p className="font-display text-2xl md:text-3xl font-bold mb-12">
          No BS. <span className="gradient-text">Just Facts.</span>
        </p>

        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {whyWeWinCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-xl p-6 md:p-8 border-l-2 border-l-primary transition-all duration-300"
            >
              <card.icon className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-display font-bold text-xl mb-3">{card.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Founder conviction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass rounded-2xl p-8 md:p-12 max-w-3xl mx-auto gradient-border-card">
            <Quote className="w-8 h-8 text-[#00FFB2]/20 mx-auto mb-4" />
            <p className="font-display text-lg md:text-xl lg:text-2xl font-medium text-white/90 italic leading-relaxed mb-4">
              "We're so confident in what we've built, we self-funded to $10.5B before asking for a single dollar. This isn't a startup pitch. This is an invitation to accelerate inevitability."
            </p>
            <div className="h-px w-16 bg-[#00FFB2]/30 mx-auto mb-4" />
            <p className="text-[#00FFB2] font-semibold text-sm">Founder Conviction</p>
          </div>
        </motion.div>
      </Section>

      {/* ════════════════════════════════════════════════════
          10. INVESTMENT MATRIX
          ════════════════════════════════════════════════════ */}
      <Section id="investment" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">Investment Avenues</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <p className="font-display text-2xl md:text-3xl font-bold">
            Choose Your Path to{" "}
            <span className="gradient-text">Asymmetric Returns</span>
          </p>
          <button
            data-testid="button-toggle-comparison"
            onClick={() => setShowComparison(!showComparison)}
            className="px-4 py-2 text-sm border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors text-primary font-medium self-start md:self-auto"
          >
            {showComparison ? "Card View" : "Compare All"}
          </button>
        </div>

        {showComparison ? (
          <div className="overflow-x-auto rounded-xl border border-primary/20">
            <table className="w-full text-sm" data-testid="table-comparison">
              <thead>
                <tr className="border-b border-primary/10">
                  <th className="text-left p-4 font-semibold text-muted-foreground">Vehicle</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Min. Investment</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Target Return</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Lockup</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Risk</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {investmentOptions.map((opt) => (
                  <tr key={opt.id} className="border-b border-primary/5 hover:bg-primary/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: opt.color }} />
                        <span className="font-semibold">{opt.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-primary font-medium">{opt.minInvest}</td>
                    <td className="p-4 font-medium">{opt.targetReturn}</td>
                    <td className="p-4 text-muted-foreground">{opt.lockup}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${opt.riskLevel === "low" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                        {opt.riskLevel}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => openTermSheet(opt.id)}
                        className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-all hover:brightness-110"
                        style={{ backgroundColor: `${opt.color}20`, color: opt.color, border: `1px solid ${opt.color}40` }}
                        data-testid={`button-term-sheet-table-${opt.id}`}
                      >
                        Build Term Sheet →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {investmentOptions.map((opt) => (
              <motion.div
                key={opt.id}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-xl overflow-hidden transition-all duration-300 group"
                data-testid={`card-investment-${opt.id}`}
              >
                <div className="h-1" style={{ backgroundColor: opt.color }} />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: opt.color }} />
                    <h3 className="font-display font-bold text-lg">{opt.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-5">{opt.tagline}</p>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Min. Investment</p>
                      <p className="font-bold text-primary">{opt.minInvest}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Target Return</p>
                      <p className="font-bold">{opt.targetReturn}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Lockup</p>
                      <p className="font-medium text-sm">{opt.lockup}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Risk</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${opt.riskLevel === "low" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                        {opt.riskLevel}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-5">
                    {opt.features.slice(0, 3).map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                    {opt.features.length > 3 && (
                      <p className="text-xs text-primary mt-1">+{opt.features.length - 3} more features</p>
                    )}
                  </div>

                  <button
                    onClick={() => openTermSheet(opt.id)}
                    className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all hover:brightness-110 flex items-center justify-center gap-2"
                    style={{ backgroundColor: `${opt.color}15`, color: opt.color, border: `1px solid ${opt.color}30` }}
                    data-testid={`button-term-sheet-${opt.id}`}
                  >
                    Build Term Sheet
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {expandedOption && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setExpandedOption(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass rounded-2xl max-w-lg w-full p-8 relative border border-primary/20"
              onClick={(e) => e.stopPropagation()}
              data-testid="modal-investment-detail"
            >
              {(() => {
                const opt = investmentOptions.find((o) => o.id === expandedOption);
                if (!opt) return null;
                return (
                  <>
                    <button
                      onClick={() => setExpandedOption(null)}
                      className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="button-close-modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="h-1 rounded-full mb-6 -mx-8 -mt-8" style={{ backgroundColor: opt.color }} />
                    <h3 className="font-display text-2xl font-bold mb-1 mt-2">{opt.name}</h3>
                    <p className="text-primary text-sm mb-4">{opt.tagline}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{opt.description}</p>
                    <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-b border-primary/10">
                      <div>
                        <p className="text-xs text-muted-foreground">Min. Investment</p>
                        <p className="font-bold text-primary">{opt.minInvest}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Target Return</p>
                        <p className="font-bold">{opt.targetReturn}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Lockup</p>
                        <p className="font-bold">{opt.lockup}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-8">
                      {opt.features.map((f, fi) => (
                        <div key={fi} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <button
                      data-testid="button-request-term-sheet"
                      onClick={() => openTermSheet(opt.id)}
                      className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:brightness-110 transition-all glow-teal"
                    >
                      Build Term Sheet →
                    </button>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </Section>

      {/* ════════════════════════════════════════════════════
          11. ROI CALCULATOR SECTION
          ════════════════════════════════════════════════════ */}
      <Section id="roi" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">Model Your Returns</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
        <p className="font-display text-2xl md:text-3xl font-bold mb-12">
          See Your <span className="gradient-text">Potential Upside</span>
        </p>

        <div className="glass rounded-xl p-6 md:p-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm text-muted-foreground font-medium">Investment Amount</label>
            <span className="font-display text-2xl font-bold text-primary" data-testid="text-invest-amount">
              {formatCurrency(investAmount)}
            </span>
          </div>
          <input
            type="range"
            min={25000}
            max={5000000}
            step={25000}
            value={investAmount}
            onChange={(e) => setInvestAmount(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, hsl(168,100%,40%) ${((investAmount - 25000) / (5000000 - 25000)) * 100}%, hsl(220,15%,20%) ${((investAmount - 25000) / (5000000 - 25000)) * 100}%)`
            }}
            data-testid="slider-investment"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>$25K</span>
            <span>$5M</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {[
            { label: "Conservative", multiplier: 3, color: "#00D4FF" },
            { label: "Base Case", multiplier: 10, color: "#00FFB2" },
            { label: "Upside", multiplier: 50, color: "#7B61FF" },
          ].map((scenario) => (
            <div key={scenario.label} className="glass rounded-xl p-6 text-center" data-testid={`card-scenario-${scenario.label.toLowerCase().replace(/\s/g, "-")}`}>
              <p className="text-sm text-muted-foreground mb-2">{scenario.label}</p>
              <p className="font-display text-3xl font-bold mb-1" style={{ color: scenario.color }}>
                {formatCurrency(investAmount * scenario.multiplier)}
              </p>
              <p className="text-xs text-muted-foreground">{scenario.multiplier}x Return</p>
            </div>
          ))}
        </div>

        <div className="glass rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-4">Base Case Projection (10x over 5 years)</p>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={roiChartData}>
              <defs>
                <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00FFB2" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#00FFB2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,15%)" />
              <XAxis dataKey="year" stroke="hsl(0,0%,55%)" fontSize={12} />
              <YAxis stroke="hsl(0,0%,55%)" fontSize={12} tickFormatter={(v: number) => `$${(v / 1000000).toFixed(1)}M`} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(220,15%,8%)", border: "1px solid hsl(180,50%,15%)", borderRadius: "8px", color: "#fff" }}
                formatter={(value: number) => [formatCurrency(value), "Value"]}
              />
              <Area type="monotone" dataKey="value" stroke="#00FFB2" strokeWidth={2} fill="url(#roiGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════
          12. REVENUE ARCHITECTURE SECTION
          ════════════════════════════════════════════════════ */}
      <Section id="revenue" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">Revenue Architecture</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
        <p className="font-display text-2xl md:text-3xl font-bold mb-12">
          Diversified Streams. <span className="gradient-text">Compounding Returns.</span>
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <ResponsiveContainer width={300} height={300}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(220,15%,8%)", border: "1px solid hsl(180,50%,15%)", borderRadius: "8px", color: "#fff" }}
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {revenueDetails.map((stream, i) => (
              <div key={i} className="glass rounded-xl p-5" data-testid={`card-revenue-${i}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stream.color }} />
                  <h4 className="font-semibold">{stream.label}</h4>
                  <span className="ml-auto font-display font-bold text-lg" style={{ color: stream.color }}>{stream.pct}%</span>
                </div>
                <ul className="space-y-1">
                  {stream.items.map((item, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════
          13. EXIT PATHS SECTION
          ════════════════════════════════════════════════════ */}
      <Section id="exits" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">Exit Pathways</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
        <p className="font-display text-2xl md:text-3xl font-bold mb-16">
          Multiple Paths to <span className="gradient-text">Liquidity</span>
        </p>

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent" />
          {exitPaths.map((exit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex items-start gap-6 md:gap-8 mb-10 last:mb-0"
              data-testid={`timeline-exit-${i}`}
            >
              <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center flex-shrink-0 animate-pulse-glow">
                <span className="font-display text-xs md:text-sm font-bold text-primary">{i + 1}</span>
              </div>
              <div className="pt-1 md:pt-3">
                <h4 className="font-display font-bold text-lg mb-1">{exit.name}</h4>
                <div className="flex gap-4 text-sm">
                  <span className="text-muted-foreground">{exit.timeline}</span>
                  <span className="text-primary font-semibold">{exit.potential}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════
          14. AI ETHICS COVENANT
          ════════════════════════════════════════════════════ */}
      <Section id="covenant" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.4em] text-purple-400/60 mb-4"
            >
              AI Ethics, Morals & Responsibility
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl md:text-5xl font-bold mb-4 gradient-text-purple"
            >
              OUR COVENANT
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-gray-400 font-medium"
            >
              Ethics Aren't a Feature. They're the Foundation.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-20 text-center"
          >
            <p className="text-base md:text-lg text-gray-300/80 leading-relaxed italic">
              "While others abandon their pledges when profit calls, we built our ethics into the architecture — not as constraints, but as competitive advantages. Responsible AI isn't a compliance checkbox. It's the nervous system's immune response."
            </p>
          </motion.div>

          <div className="mb-20">
            <h3 className="font-display text-xl md:text-2xl font-bold text-center mb-10">
              <span className="text-gray-500">THE INDUSTRY</span>
              <span className="text-gray-600 mx-4">vs.</span>
              <span className="text-primary">US</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-red-500/20 p-6 md:p-8 ethics-glow-red bg-red-500/[0.02]">
                <div className="flex items-center gap-2 mb-5">
                  <AlertTriangle className="w-5 h-5 text-red-400/70" />
                  <h4 className="font-display font-bold text-red-400/80 uppercase tracking-wider text-sm">The Industry</h4>
                </div>
                <ul className="space-y-4">
                  {[
                    "Pledged safety, then raced to ship without guardrails",
                    "Promised transparency, then black-boxed their models",
                    "Signed ethics charters, then violated them for market share",
                    "Built alignment teams, then dissolved them under pressure",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 text-sm text-red-300/60 leading-relaxed"
                    >
                      <X className="w-4 h-4 text-red-500/50 flex-shrink-0 mt-0.5" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-primary/20 p-6 md:p-8 ethics-glow-teal bg-primary/[0.02]">
                <div className="flex items-center gap-2 mb-5">
                  <Shield className="w-5 h-5 text-primary/70" />
                  <h4 className="font-display font-bold text-primary/80 uppercase tracking-wider text-sm">AntimatterAI</h4>
                </div>
                <ul className="space-y-4">
                  {[
                    "Ethics are architecturally embedded — not bolted on",
                    "Explainable-by-design engineering in every ATOM agent",
                    "Runtime regulation controls that meet audit-grade compliance",
                    "Data provenance secured — every decision is traceable",
                    "Red Team ATOM stress-tests our own systems adversarially",
                    "Post-quantum cryptography protects data sovereignty",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 text-sm text-primary/70 leading-relaxed"
                    >
                      <Check className="w-4 h-4 text-primary/60 flex-shrink-0 mt-0.5" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-20">
            {[
              { title: "Autonomy With Accountability", desc: "Our agents act independently but every action is logged, traceable, and reversible. Autonomy without accountability is chaos.", icon: Eye },
              { title: "Transparency as Architecture", desc: "We don't explain AI after the fact. Explainability is baked into the inference layer. If we can't explain it, we don't ship it.", icon: Search },
              { title: "Human Sovereignty", desc: "AI augments human decision-making, it doesn't replace it. The human is always the final arbiter. Period.", icon: Scale },
              { title: "Adversarial Self-Testing", desc: "Red Team ATOM exists to break our own systems before anyone else can. We are our own most ruthless critic.", icon: Shield },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-xl p-6 md:p-8 border-l-2 transition-all duration-300"
                style={{ borderLeftColor: i % 2 === 0 ? "#8587e3" : "#00FFB2" }}
                data-testid={`card-pillar-${i}`}
              >
                <pillar.icon className="w-7 h-7 mb-4" style={{ color: i % 2 === 0 ? "#8587e3" : "#00FFB2" }} />
                <h4 className="font-display font-bold text-lg mb-3">{pillar.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="font-display text-xl md:text-2xl font-bold text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We don't just build AI.{" "}
              <span className="gradient-text-purple">We build AI that can look humanity in the eye.</span>
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════
          15. FINAL CTA — THE ASK
          ════════════════════════════════════════════════════ */}
      <section id="cta" className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,204,143,0.08)_0%,_transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-primary/60 mb-6">The Ask</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            This Isn't a Startup Pitch.{" "}
            <span className="gradient-text">This Is an Invitation.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
            $10.5B built with zero outside capital. Now we're choosing partners — not seeking lifelines.
          </p>
          <p className="text-base text-muted-foreground mb-10 max-w-xl mx-auto">
            Join the builders who are constructing the nervous system for the next era of intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              data-testid="button-invest-now"
              onClick={() => scrollTo("investment")}
              className="px-12 py-4 bg-primary text-primary-foreground rounded-xl font-display font-bold text-lg hover:brightness-110 transition-all glow-teal-strong"
            >
              Explore Investment Options
            </button>
            <a
              href="mailto:invest@antimatterai.com"
              className="px-12 py-4 border border-primary/40 text-primary rounded-xl font-display font-bold text-lg hover:bg-primary/10 transition-all"
            >
              Contact Us
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            <a href="mailto:invest@antimatterai.com" className="text-primary hover:underline">
              invest@antimatterai.com
            </a>
          </p>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════ */}
      <footer className="border-t border-primary/10 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <img src="/antimatter-logo.svg" alt="AntimatterAI" className="h-5 opacity-50" />
            <p>AntimatterAI, Inc. · Orlando, FL</p>
          </div>
          <PerplexityAttribution />
        </div>
      </footer>

      {/* ════════════════════════════════════════════════════
          TERM SHEET MODAL
          ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {termSheetVehicle && (() => {
          const vehicle = investmentOptions.find((o) => o.id === termSheetVehicle);
          if (!vehicle) return null;
          return (
            <TermSheet
              key={vehicle.id}
              vehicle={vehicle}
              onClose={() => setTermSheetVehicle(null)}
            />
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
