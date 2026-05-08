import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Crosshair, Anchor, Castle, RotateCcw } from "lucide-react";

const PHASES = [
  {
    phase: 1,
    name: "BEACHHEAD",
    timeline: "Months 1–12",
    color: "#00e6d3",
    icon: Crosshair,
    leads: "ΔTOM Sales Dominator + Red Team ΔTOM",
    target: "Mid-market B2B (100–1,000 employees), $24K–$60K ARR contracts",
    distribution: "Direct enterprise sales, HubSpot/Salesforce/Akamai partnerships, PLG for SMB",
    stat: "81% of sales teams already implementing AI — buyer is ready",
  },
  {
    phase: 2,
    name: "BRIDGEHEAD",
    timeline: "Months 12–36",
    color: "#00a7ff",
    icon: Anchor,
    leads: "ΔTOM Voice Agent (standalone), ClinixAI, ΔTOM Gaming Console pre-orders, HumanOS B2B",
    target: "$12.06B conversational AI market saturated with demand",
    distribution: "Health systems, telehealth platforms, corporate wellness, sports franchises, gov/military",
    stat: "67% of Fortune 500 already running AI voice systems",
  },
  {
    phase: 3,
    name: "FORTRESS",
    timeline: "Months 36–60",
    color: "#b987ff",
    icon: Castle,
    leads: "RRG.bio clinical trials → therapeutic licensing, ΔTOM Quantum Layer",
    target: "$240B cybersecurity market with mandatory enterprise quantum security",
    distribution: "International expansion (APAC + EU GDPR-compliant)",
    stat: "International AI adoption fastest in APAC; EU regulatory premium pricing",
  },
];

const MILESTONES = [
  { month: 6, label: "First Revenue" },
  { month: 12, label: "Beachhead Secured" },
  { month: 24, label: "Multi-Vertical" },
  { month: 36, label: "Bridgehead Complete" },
  { month: 60, label: "Fortress Built" },
];

function PhaseCard({ phase, index }: { phase: typeof PHASES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = phase.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 min-w-[280px]"
    >
      <div
        className="relative border border-white/10 bg-white/[0.03] rounded-2xl p-6 md:p-8 h-full backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05]"
        style={{ borderColor: `${phase.color}20` }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `${phase.color}50`;
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 50px ${phase.color}10`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `${phase.color}20`;
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        {/* Phase badge */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border"
            style={{ backgroundColor: `${phase.color}10`, borderColor: `${phase.color}30` }}
          >
            <Icon className="w-5 h-5" style={{ color: phase.color }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-bold font-['JetBrains_Mono'] tracking-wider"
                style={{ color: phase.color }}
              >
                PHASE {phase.phase}
              </span>
            </div>
            <h3
              className="text-xl font-bold font-['Cabinet_Grotesk']"
              style={{ color: phase.color }}
            >
              {phase.name}
            </h3>
          </div>
        </div>

        <p className="text-[11px] text-gray-500 font-['JetBrains_Mono'] tracking-wider mb-4">{phase.timeline}</p>

        <div className="space-y-3 text-sm font-['Satoshi']">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Lead Products</p>
            <p className="text-gray-300">{phase.leads}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Target</p>
            <p className="text-gray-300">{phase.target}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Distribution</p>
            <p className="text-gray-300">{phase.distribution}</p>
          </div>
        </div>

        {/* Key stat callout */}
        <div
          className="mt-5 px-4 py-3 rounded-xl border text-sm font-['Satoshi'] font-medium"
          style={{ backgroundColor: `${phase.color}08`, borderColor: `${phase.color}20`, color: phase.color }}
        >
          "{phase.stat}"
        </div>
      </div>
    </motion.div>
  );
}

function InvasionTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.3"] });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="mt-16 relative">
      <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00e6d3] via-[#00a7ff] to-[#b987ff] rounded-full"
          style={{ width: lineWidth }}
        />
      </div>

      {/* Milestones */}
      <div className="relative mt-4 flex justify-between">
        {MILESTONES.map((m, i) => {
          const leftPercent = (m.month / 60) * 100;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="flex flex-col items-center"
              style={{ position: "absolute", left: `${leftPercent}%`, transform: "translateX(-50%)" }}
            >
              <div className="w-2 h-2 rounded-full bg-white/30 mb-1" />
              <span className="text-[10px] font-['JetBrains_Mono'] text-gray-500 whitespace-nowrap">M{m.month}</span>
              <span className="text-[10px] font-['Satoshi'] text-gray-600 whitespace-nowrap hidden sm:block">{m.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function InvasionPlan() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const flywheelRef = useRef(null);
  const flywheelInView = useInView(flywheelRef, { once: true, margin: "-60px" });

  return (
    <div id="invasion" className="bg-black py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,230,211,0.04)_0%,transparent_70%)]" />
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(185,135,255,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-6xl mx-auto relative" ref={headerRef}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-6 h-px bg-[#00e6d3]" />
            <span className="text-[#00e6d3] text-xs font-semibold tracking-[0.2em] uppercase font-['Satoshi']">Go-to-Market</span>
            <div className="w-6 h-px bg-[#00e6d3]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-['Cabinet_Grotesk'] text-white mb-3"
          >
            THE <span className="text-[#00e6d3]">INVASION</span> PLAN
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-gray-500 text-lg font-['Satoshi'] mb-1"
          >
            Simultaneous Vertical Capture
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-600 text-sm font-['Satoshi']"
          >
            Beachhead → Bridgehead → Fortress. The 60-month battle plan.
          </motion.p>
        </div>

        {/* Phase cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PHASES.map((phase, i) => (
            <PhaseCard key={i} phase={phase} index={i} />
          ))}
        </div>

        {/* Flywheel callout */}
        <motion.div
          ref={flywheelRef}
          initial={{ opacity: 0, y: 30 }}
          animate={flywheelInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 border border-[#00e6d3]/20 bg-[#00e6d3]/[0.03] rounded-2xl p-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <RotateCcw className="w-5 h-5 text-[#00e6d3]" />
            <span className="text-[#00e6d3] text-sm font-bold font-['Cabinet_Grotesk'] tracking-wider uppercase">ΔTOM Flywheel</span>
          </div>
          <p className="text-gray-300 text-base md:text-lg font-['Satoshi'] leading-relaxed max-w-3xl mx-auto">
            Every customer who buys ΔTOM Sales Dominator becomes a candidate for ΔTOM Voice, Red Team, and Lead Gen.{" "}
            <span className="text-[#00e6d3] font-semibold">LTV compounds geometrically.</span>{" "}
            CAC amortized across 5–7 products per enterprise account.
          </p>
        </motion.div>

        {/* Invasion timeline */}
        <InvasionTimeline />
      </div>
    </div>
  );
}
