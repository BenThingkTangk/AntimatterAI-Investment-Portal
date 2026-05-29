import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Atom, Mic, Globe, HeartPulse, ExternalLink } from "lucide-react";

interface DemoLink {
  href: string;
  label: string;
}

interface Game {
  number: string;
  title: string;
  tagline: string;
  sub: string;
  color: string;
  icon: React.ElementType;
  capabilities: string[];
  pipeline: string;
  demos: DemoLink[];
}

const GAMES: Game[] = [
  {
    number: "01",
    title: "ATOM",
    tagline: "Revenue AI OS — Cash engine · First mover",
    sub: "They observe deals. We run them. They sit on top of the rep. ATOM is the rep.",
    color: "#00a7ff",
    icon: Mic,
    capabilities: [
      "Real-time call coaching + autonomous outbound",
      "Akamai Blackwell GPUs (sub-50ms voice)",
      "Metered Stripe billing — margin we own",
      "AI governance + EU AI Act readiness (Red Team)",
    ],
    pipeline: "Copious enterprise deals in active close. 2 ATOM Pro deals at $25K/mo converting.",
    demos: [
      { href: "https://atom-dominator-pro.vercel.app/#/", label: "ATOM Dominator Pro" },
      { href: "https://atom-sales-dominator-ai.vercel.app/", label: "ATOM Sales AI" },
      { href: "https://dtom-red-team-command-interface.vercel.app/", label: "Red Team Command Interface" },
      { href: "https://atom-red-team-architecture.vercel.app/", label: "Red Team Architecture" },
      { href: "https://atom-red-team-investor-pitch.vercel.app/", label: "Red Team Investor Pitch" },
      { href: "https://atom-red-team-investor-pitch-zp6c.vercel.app/", label: "Red Team Pitch v2" },
      { href: "https://www.antimatterai.com/demos/atom-red-team", label: "Red Team Public Demo" },
      { href: "https://akamai-blackwell-gpu-atom.vercel.app/", label: "Akamai + Blackwell GPU" },
    ],
  },
  {
    number: "02",
    title: "AntimatterAI",
    tagline: "Multi-modal AI platform — The moat",
    sub: "Not a chatbot. Not a tool. The infrastructure that makes AI think, act, and govern itself. Every ATOM deployment lays the AntimatterAI substrate.",
    color: "#00e6d3",
    icon: Atom,
    capabilities: [
      "GenUI engine — AI generates its own interfaces",
      "5-layer governance fabric (SOC2 HIPAA FedRAMP)",
      "Deploy-anywhere runtime (cloud VPC on-prem edge air-gap)",
      "Agent orchestration spine (Brain-Spine-Worker)",
    ],
    pipeline: "Foundation platform — all products built on this core",
    demos: [
      { href: "https://antimatterai-investor-pitch.vercel.app/#/", label: "AntimatterAI Platform" },
    ],
  },
  {
    number: "03",
    title: "ANS",
    tagline: "Federated AI infrastructure — The long position",
    sub: "Customer data stays on customer infra. Only weights move. Deterministic scoring with full audit trail.",
    color: "#b987ff",
    icon: Globe,
    capabilities: [
      "Federated learning across enterprise deployments",
      "Edge inference on Akamai 4400+ node grid",
      "Private VPC + air-gapped sovereign AI",
      "Network effects compound — every deployment makes every deployment smarter",
    ],
    pipeline: "Infrastructure play — monetizes as ATOM scales",
    demos: [
      { href: "https://ans-akamai-ai-edge.vercel.app/", label: "ANS on Akamai AI Edge" },
      { href: "https://atom-akamai.vercel.app", label: "ATOM × Akamai" },
    ],
  },
];

const BONUS = {
  title: "PhysioPS / HumanOS",
  tagline: "Health intelligence vertical sitting on the AntimatterAI substrate",
  sub: "Clinical-grade ANS intelligence. F1, veterans, athletes. Steve O'Leary leading enterprise rollout.",
  color: "#72f2a1",
  icon: HeartPulse,
  demos: [
    { href: "https://physiopshumanoslivestyleguide.vercel.app/", label: "PhysioPS Style Guide" },
    { href: "https://humanos-ans-diagnostic.vercel.app/#/", label: "HumanOS ANS Diagnostic" },
    { href: "https://physiops-humanos-evidence.vercel.app/#/", label: "Evidence Platform" },
    { href: "https://physio-ps-site.vercel.app/", label: "PhysioPS Site" },
    { href: "https://physiops-kse-proposal.vercel.app/#/", label: "KSE Proposal" },
    { href: "https://humanos-mobile.vercel.app/", label: "HumanOS Mobile" },
    { href: "https://physio-ps-x-welltory.vercel.app/", label: "PhysioPS × Welltory" },
  ],
};

function GameCard({ game, index }: { game: Game; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative border border-white/10 bg-white/[0.03] rounded-2xl p-8 backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 group"
      style={{ borderColor: `${game.color}20` }}
    >
      {/* Game number watermark */}
      <div
        className="absolute top-6 right-8 font-['JetBrains_Mono'] font-bold text-7xl select-none pointer-events-none"
        style={{ color: `${game.color}08` }}
      >
        {game.number}
      </div>

      {/* Game label + Icon + Title */}
      <div className="flex items-start gap-4 mb-5">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${game.color}15`, border: `1px solid ${game.color}30` }}
        >
          <game.icon className="w-7 h-7" style={{ color: game.color }} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-['JetBrains_Mono'] text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: `${game.color}80` }}
            >
              Game {game.number}
            </span>
          </div>
          <h3 className="font-['Cabinet_Grotesk'] font-bold text-white text-2xl mb-1">
            {game.title}
          </h3>
          <p className="text-sm font-['Satoshi'] font-semibold" style={{ color: game.color }}>
            {game.tagline}
          </p>
        </div>
      </div>

      {/* Subhead */}
      <p className="text-white/60 text-sm font-['Satoshi'] mb-5 leading-relaxed">{game.sub}</p>

      {/* Capabilities */}
      <div className="space-y-2 mb-5">
        {game.capabilities.map((cap) => (
          <div key={cap} className="flex items-start gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
              style={{ background: game.color }}
            />
            <span className="text-white/50 text-xs font-['Satoshi']">{cap}</span>
          </div>
        ))}
      </div>

      {/* Pipeline badge */}
      <div
        className="p-3 rounded-lg mb-5 text-xs font-['Satoshi'] leading-relaxed"
        style={{
          background: `${game.color}08`,
          border: `1px solid ${game.color}20`,
          color: game.color,
        }}
      >
        {game.pipeline}
      </div>

      {/* Demo links */}
      {game.demos.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {game.demos.map((d, i) => (
            <a
              key={d.href}
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold font-['Satoshi'] transition-all duration-300 hover:scale-[1.03]"
              style={
                i === 0
                  ? {
                      background: `${game.color}15`,
                      border: `1px solid ${game.color}40`,
                      color: game.color,
                    }
                  : {
                      background: `${game.color}08`,
                      border: `1px solid ${game.color}20`,
                      color: `${game.color}aa`,
                    }
              }
            >
              {d.label} <ExternalLink size={12} />
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function BonusCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative border border-white/10 bg-white/[0.03] rounded-2xl p-6 backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 flex flex-col md:flex-row md:items-center gap-5"
      style={{ borderColor: `${BONUS.color}20` }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${BONUS.color}15`, border: `1px solid ${BONUS.color}30` }}
      >
        <BONUS.icon className="w-6 h-6" style={{ color: BONUS.color }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-2 mb-1">
          <h4 className="font-['Cabinet_Grotesk'] font-bold text-white text-lg">
            {BONUS.title}
          </h4>
          <span
            className="text-xs font-['Satoshi'] font-semibold"
            style={{ color: BONUS.color }}
          >
            {BONUS.tagline}
          </span>
        </div>
        <p className="text-white/50 text-xs font-['Satoshi'] leading-relaxed">{BONUS.sub}</p>
      </div>

      {/* Demo links */}
      <div className="flex flex-wrap gap-2 shrink-0 justify-end max-w-[420px]">
        {BONUS.demos.map((d) => (
          <a
            key={d.href}
            href={d.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold font-['Satoshi'] transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: `${BONUS.color}12`,
              border: `1px solid ${BONUS.color}35`,
              color: BONUS.color,
            }}
          >
            {d.label} <ExternalLink size={10} />
          </a>
        ))}
      </div>
    </motion.div>
  );
}

export default function ThreeGames() {
  const sectionRef = useRef(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div id="pillars" className="bg-black py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,163,255,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-4xl mx-auto relative" ref={sectionRef}>
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-6 h-px bg-[#00a7ff]" />
            <span className="text-[#00a7ff] text-xs font-semibold tracking-[0.2em] uppercase font-['Satoshi']">
              Holding Structure
            </span>
            <div className="w-6 h-px bg-[#00a7ff]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-['Cabinet_Grotesk'] text-white mb-4"
          >
            ONE BOARD.{" "}
            <span className="text-[#00a7ff]">THREE GAMES.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-500 text-lg font-['Satoshi'] max-w-3xl mx-auto"
          >
            Nirmata is one chess engine running three games on the same board. ATOM is the move.
            Antimatter is the parallel build. ANS is the long position.
          </motion.p>
        </div>

        {/* Game cards — full width, stacked */}
        <div className="flex flex-col gap-6 mb-6">
          {GAMES.map((g, i) => (
            <GameCard key={g.title} game={g} index={i} />
          ))}
        </div>

        {/* Bonus row */}
        <BonusCard />
      </div>
    </div>
  );
}
