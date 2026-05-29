import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import { TrendingDown, Wallet, Scissors, Activity, Quote } from "lucide-react";

// ─── Macro signal cards ───────────────────────────────────────────────────────
const MACRO_SIGNALS = [
  {
    value: "$200B",
    label: "IPO Liquidity Drain",
    source:
      "Per Wei Li / BlackRock CIO, Khaleej Times, May 28 2026",
    icon: TrendingDown,
    color: "#ffd166",
  },
  {
    value: "3.9%",
    label: "Fund Manager Cash",
    source:
      "Per BofA Global Fund Manager Survey, May 2026. Contrarian sell signal — biggest drop since Feb 2024",
    icon: Wallet,
    color: "#00a7ff",
  },
  {
    value: "56%",
    label: "CFOs Citing Cost-Cut",
    source: "Per Gartner CFO Agenda, 2026",
    icon: Scissors,
    color: "#b987ff",
  },
];

// ─── Radial dial dimensions ───────────────────────────────────────────────────
const DIMENSIONS = [
  { key: "Macro",    score: 93, color: "#72f2a1", fill: "#72f2a1" },
  { key: "Buyer",   score: 88, color: "#00a7ff", fill: "#00a7ff" },
  { key: "Capital", score: 81, color: "#ffd166", fill: "#ffd166" },
  { key: "Stack",   score: 95, color: "#00e6d3", fill: "#00e6d3" },
  { key: "Comp Gap",score: 78, color: "#b987ff", fill: "#b987ff" },
];

// Build radial data — each ring is a separate bar; value drives arc length
const buildChartData = () =>
  DIMENSIONS.map((d) => ({
    name: d.key,
    value: d.score,
    fill: d.fill,
  }));

// ─── Custom center label rendered as absolute overlay ─────────────────────────
function DialCenter() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
      {/* nudge up slightly so it sits in the arc center */}
      <div className="mt-4 text-center">
        <p className="text-[#00e6d3] text-[10px] font-semibold tracking-[0.18em] uppercase font-['Satoshi'] mb-1">
          Launch Window
        </p>
        <p className="font-['Cabinet_Grotesk'] font-black text-white leading-none"
           style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          87%
        </p>
        <p className="text-white/40 text-xs font-['Satoshi'] tracking-widest uppercase mt-1">
          Open
        </p>
      </div>
    </div>
  );
}

// ─── Score pill card ──────────────────────────────────────────────────────────
function ScoreCard({
  dim,
  index,
}: {
  dim: (typeof DIMENSIONS)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.07 }}
      className="flex items-center gap-3 px-4 py-3 border border-white/10 bg-white/[0.03] rounded-2xl backdrop-blur-sm"
    >
      {/* color dot */}
      <div
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{ background: dim.color, boxShadow: `0 0 8px ${dim.color}80` }}
      />
      <span className="font-['Satoshi'] text-white/70 text-sm flex-1">
        {dim.key}
      </span>
      <span
        className="font-['JetBrains_Mono'] font-bold text-base"
        style={{ color: dim.color }}
      >
        {dim.score}
      </span>
      {/* mini bar */}
      <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${dim.score}%`, background: dim.color }}
        />
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ConvergenceDial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const dialRef = useRef<HTMLDivElement>(null);
  const dialInView = useInView(dialRef, { once: true, margin: "-80px" });

  const chartData = buildChartData();

  return (
    <div
      id="convergence"
      className="bg-black py-32 px-4 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(ellipse_at_center,rgba(0,230,211,0.05)_0%,transparent_65%)]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_top_right,rgba(185,135,255,0.04)_0%,transparent_60%)]" />
      </div>

      <div className="max-w-6xl mx-auto relative" ref={sectionRef}>
        {/* ── Section label + heading ── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-6 h-px bg-[#00e6d3]" />
            <span className="text-[#00e6d3] text-xs font-semibold tracking-[0.2em] uppercase font-['Satoshi']">
              Convergence Signal
            </span>
            <div className="w-6 h-px bg-[#00e6d3]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-['Cabinet_Grotesk'] text-white mb-4"
          >
            THE{" "}
            <span className="text-[#00e6d3]">CONVERGENCE</span> DIAL
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-lg font-['Satoshi'] max-w-2xl mx-auto"
          >
            Five independent signal dimensions. One composite launch window.
          </motion.p>
        </div>

        {/* ── Macro signal cards (3-column) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {MACRO_SIGNALS.map((sig, i) => (
            <motion.div
              key={sig.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-6 border border-white/10 bg-white/[0.03] rounded-2xl backdrop-blur-sm hover:border-white/20 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${sig.color}12`,
                    border: `1px solid ${sig.color}30`,
                  }}
                >
                  <sig.icon className="w-5 h-5" style={{ color: sig.color }} />
                </div>
                <Activity
                  className="w-4 h-4 text-white/10 group-hover:text-white/20 transition-colors"
                />
              </div>

              <p
                className="font-['Cabinet_Grotesk'] font-black text-4xl mb-1"
                style={{ color: sig.color }}
              >
                {sig.value}
              </p>
              <p className="font-['Satoshi'] font-semibold text-white text-base mb-2">
                {sig.label}
              </p>
              <p className="font-['Satoshi'] text-white/35 text-xs leading-relaxed">
                {sig.source}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Convergence Dial ── */}
        <div
          ref={dialRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16"
        >
          {/* Radial chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={dialInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative"
          >
            {/* Chart wrapper — semicircle gauge */}
            <div className="relative w-full" style={{ paddingBottom: "56%" }}>
              <div className="absolute inset-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="90%"
                    innerRadius="30%"
                    outerRadius="100%"
                    startAngle={180}
                    endAngle={0}
                    data={chartData}
                    barSize={14}
                    barGap={4}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      angleAxisId={0}
                      tick={false}
                    />
                    {chartData.map((entry, index) => (
                      <RadialBar
                        key={entry.name}
                        dataKey="value"
                        angleAxisId={0}
                        data={[entry]}
                        fill={entry.fill}
                        background={{ fill: "rgba(255,255,255,0.04)" }}
                        cornerRadius={6}
                        isAnimationActive={dialInView}
                        animationBegin={index * 120}
                        animationDuration={900}
                        animationEasing="ease-out"
                      />
                    ))}
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>

              {/* Center label overlay */}
              <DialCenter />
            </div>

            {/* Legend row */}
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {DIMENSIONS.map((dim) => (
                <div key={dim.key} className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: dim.color }}
                  />
                  <span className="font-['Satoshi'] text-white/50 text-xs">
                    {dim.key}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Score cards column */}
          <div className="flex flex-col gap-3">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={dialInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-['Satoshi'] text-white/40 text-xs tracking-[0.15em] uppercase mb-2"
            >
              Dimension Scores
            </motion.p>
            {DIMENSIONS.map((dim, i) => (
              <ScoreCard key={dim.key} dim={dim} index={i} />
            ))}

            {/* Composite score */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-2 flex items-center justify-between px-4 py-3 border border-[#00e6d3]/25 bg-[#00e6d3]/[0.05] rounded-2xl backdrop-blur-sm"
            >
              <span className="font-['Satoshi'] text-[#00e6d3] text-sm font-semibold">
                Composite Launch Window
              </span>
              <span className="font-['Cabinet_Grotesk'] font-black text-[#00e6d3] text-2xl">
                87%
              </span>
            </motion.div>
          </div>
        </div>

        {/* ── Callout quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="border border-[#00e6d3]/20 bg-[#00e6d3]/[0.04] rounded-2xl p-8 text-center relative overflow-hidden"
        >
          {/* Subtle teal glow behind text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-20 bg-[#00e6d3]/10 blur-3xl rounded-full" />
          </div>

          <Quote className="w-8 h-8 text-[#00e6d3]/30 mx-auto mb-4" />
          <p className="font-['Cabinet_Grotesk'] font-bold text-2xl md:text-3xl text-white relative z-10">
            "A probability field just collapsed in our favor."
          </p>
        </motion.div>
      </div>
    </div>
  );
}
