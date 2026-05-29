import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Atom, Mic, Shield, HeartPulse, ExternalLink } from "lucide-react";

const PILLARS = [
  {
    title: "AntimatterAI Core",
    tagline: "The agentic operating layer of the modern enterprise",
    sub: "Not a chatbot. Not a tool. The infrastructure that makes AI think, act, and govern itself.",
    color: "#00e6d3",
    icon: Atom,
    capabilities: [
      "GenUI engine — AI generates its own interfaces",
      "5-layer governance fabric (SOC2, HIPAA, FedRAMP)",
      "Deploy-anywhere runtime (cloud, VPC, on-prem, edge, air-gap)",
      "Agent orchestration spine (Brain-Spine-Worker)",
    ],
    pipeline: "Foundation platform — all products built on this core",
    demo: "https://antimatterai-investor-pitch.vercel.app/#/",
  },
  {
    title: "ATOM Sales Dominator",
    tagline: "Autonomous revenue production",
    sub: "Voice-first AI that prospects, pitches, handles objections, and closes — at human speed, machine scale.",
    color: "#00a7ff",
    icon: Mic,
    capabilities: [
      "Real-time call coaching + autonomous outbound",
      "Akamai Inference Cloud + NVIDIA Blackwell GPUs",
      "Metered Stripe billing — every voice minute at margin we own",
      "Intent detection + War Room deal acceleration",
    ],
    pipeline: "Copious enterprise deals in active close. Demand is staggering.",
    demo: "https://atom-dominator-pro.vercel.app/#/",
    demo2: "https://atom-sales-dominator-ai.vercel.app/",
  },
  {
    title: "ATOM Red Team",
    tagline: "AI governance, adversarial testing, hardening",
    sub: "The compliance backbone for AI-native enterprises. EU AI Act ready. SOC2 / FedRAMP / NIST AI RMF.",
    color: "#ff6b8b",
    icon: Shield,
    capabilities: [
      "Continuous prompt injection resistance testing",
      "Model hallucination detection + jailbreak resistance",
      "OWASP LLM Top 10 compliance automation",
      "EU AI Act (Aug 2026) + NIST AI RMF readiness",
    ],
    pipeline: "Copious deals in regulated industries — defense, finance, healthcare. Demand is staggering.",
    demo: "https://dtom-red-team-command-interface.vercel.app/",
  },
  {
    title: "PhysioPS / HumanOS",
    tagline: "Clinical-grade Autonomic Nervous System intelligence",
    sub: "Real-time ANS health via HRV + photoplethysmography. Built for F1 teams, elite athletes, veterans, and aerotoxicity recovery.",
    color: "#72f2a1",
    icon: HeartPulse,
    capabilities: [
      "Real-time HRV + photoplethysmography analysis",
      "Predictive ANS health scoring for clinical use",
      "F1 / elite athlete performance optimization",
      "Veterans + aerotoxicity recovery protocols",
    ],
    pipeline: "Pre-orders + clinical trial partnerships accumulating. Steve O'Leary (President & COO) leading enterprise rollout.",
    demo: "https://physiopshumanoslivestyleguide.vercel.app/",
  },
];

function PillarCard({ pillar, index }: { pillar: typeof PILLARS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative border border-white/10 bg-white/[0.03] rounded-2xl p-8 backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 group"
      style={{ borderColor: `${pillar.color}20` }}
    >
      {/* Icon + Title */}
      <div className="flex items-start gap-4 mb-5">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${pillar.color}15`, border: `1px solid ${pillar.color}30` }}
        >
          <pillar.icon className="w-7 h-7" style={{ color: pillar.color }} />
        </div>
        <div>
          <h3 className="font-['Cabinet_Grotesk'] font-bold text-white text-xl mb-1">{pillar.title}</h3>
          <p className="text-sm font-['Satoshi'] font-semibold" style={{ color: pillar.color }}>{pillar.tagline}</p>
        </div>
      </div>

      {/* Subhead */}
      <p className="text-white/60 text-sm font-['Satoshi'] mb-5 leading-relaxed">{pillar.sub}</p>

      {/* Capabilities */}
      <div className="space-y-2 mb-5">
        {pillar.capabilities.map((cap) => (
          <div key={cap} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: pillar.color }} />
            <span className="text-white/50 text-xs font-['Satoshi']">{cap}</span>
          </div>
        ))}
      </div>

      {/* Pipeline badge */}
      <div
        className="p-3 rounded-lg mb-5 text-xs font-['Satoshi'] leading-relaxed"
        style={{ background: `${pillar.color}08`, border: `1px solid ${pillar.color}20`, color: `${pillar.color}` }}
      >
        {pillar.pipeline}
      </div>

      {/* Demo buttons */}
      <div className="flex flex-wrap gap-2">
        <a
          href={pillar.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold font-['Satoshi'] transition-all duration-300 hover:scale-[1.03]"
          style={{ background: `${pillar.color}15`, border: `1px solid ${pillar.color}40`, color: pillar.color }}
        >
          Open Live Demo <ExternalLink size={12} />
        </a>
        {pillar.demo2 && (
          <a
            href={pillar.demo2}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold font-['Satoshi'] transition-all duration-300 hover:scale-[1.03]"
            style={{ background: `${pillar.color}08`, border: `1px solid ${pillar.color}20`, color: `${pillar.color}aa` }}
          >
            Alt Demo <ExternalLink size={12} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function FourPillars() {
  const sectionRef = useRef(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div id="pillars" className="bg-black py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,230,211,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative" ref={sectionRef}>
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-6 h-px bg-[#00e6d3]" />
            <span className="text-[#00e6d3] text-xs font-semibold tracking-[0.2em] uppercase font-['Satoshi']">The Operating Layer</span>
            <div className="w-6 h-px bg-[#00e6d3]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-['Cabinet_Grotesk'] text-white mb-4"
          >
            THE FOUR <span className="text-[#00e6d3]">PILLARS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-500 text-lg font-['Satoshi'] max-w-3xl mx-auto"
          >
            4 flagship products under the AntimatterAI core. Each one a category creator. Together, an unassailable platform.
          </motion.p>
        </div>

        {/* Pillar grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.title} pillar={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
