import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Layers, Mic, BookOpen, Shield } from "lucide-react";

const LAYERS = [
  {
    number: 1,
    title: "Lead Generation Engine",
    description:
      "250M+ contact graph, buyer-intent scoring, deterministic ranking. Not spray-and-pray. Precision targeting.",
    color: "#00e6d3",
    icon: Target,
  },
  {
    number: 2,
    title: "Campaign Orchestration",
    description:
      "Multi-channel state machine, priced on pipeline not seats. Email, voice, social — coordinated.",
    color: "#00a7ff",
    icon: Layers,
  },
  {
    number: 3,
    title: "Voice Agent + Red Team",
    description:
      "Hume EVI 3, ~300ms TTFB, 500-800ms round trip, live objection handling. Red Team simulates buyer CFO/procurement/security.",
    color: "#ff6b8b",
    icon: Mic,
  },
  {
    number: 4,
    title: "Warbook + Knowledge Layer",
    description:
      "Per-account dossier with live news, hires, filings, infra changes, competitive signal. Every call is informed.",
    color: "#ffd166",
    icon: BookOpen,
  },
  {
    number: 5,
    title: "Deterministic Scoring + Federated Edge",
    description:
      "Customer data stays on customer infra. Only weights move. Deterministic scoring with full audit trail.",
    color: "#b987ff",
    icon: Shield,
  },
];

const METRICS = [
  {
    value: "−42%",
    label: "Deal Velocity Improvement vs baseline SDR pipeline",
    color: "#00e6d3",
  },
  {
    value: "3.6×",
    label: "Account Surface Coverage Compression",
    color: "#00a7ff",
  },
  {
    value: "~300ms",
    label: "Voice TTFB (Time to First Byte)",
    color: "#ff6b8b",
  },
];

function LayerCard({
  layer,
  index,
  isLast,
}: {
  layer: (typeof LAYERS)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="relative flex gap-6">
      {/* Timeline column */}
      <div className="flex flex-col items-center shrink-0 w-12">
        {/* Number node */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-['JetBrains_Mono'] font-bold text-sm"
          style={{
            background: `${layer.color}18`,
            border: `2px solid ${layer.color}60`,
            color: layer.color,
            boxShadow: `0 0 18px ${layer.color}25`,
          }}
        >
          {String(layer.number).padStart(2, "0")}
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={inView ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12 + 0.3, ease: "easeOut" }}
            className="flex-1 w-px origin-top mt-1"
            style={{
              background: `linear-gradient(to bottom, ${layer.color}50, ${LAYERS[index + 1].color}30)`,
              minHeight: "2rem",
            }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 32 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.12 + 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 mb-6 border border-white/10 bg-white/[0.03] rounded-2xl backdrop-blur-sm p-6 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 group"
        style={{ borderColor: `${layer.color}22` }}
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
            style={{
              background: `${layer.color}14`,
              border: `1px solid ${layer.color}35`,
            }}
          >
            <layer.icon className="w-5 h-5" style={{ color: layer.color }} />
          </div>

          {/* Text */}
          <div>
            <h3
              className="font-['Cabinet_Grotesk'] font-bold text-white text-lg mb-2 group-hover:opacity-90 transition-opacity"
            >
              {layer.title}
            </h3>
            <p className="text-white/55 text-sm font-['Satoshi'] leading-relaxed">
              {layer.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MetricCard({
  metric,
  index,
}: {
  metric: (typeof METRICS)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 border border-white/10 bg-white/[0.03] rounded-2xl backdrop-blur-sm p-8 text-center hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500"
      style={{ borderColor: `${metric.color}22` }}
    >
      <div
        className="font-['JetBrains_Mono'] font-bold text-4xl md:text-5xl mb-3 tracking-tight"
        style={{ color: metric.color }}
      >
        {metric.value}
      </div>
      <p className="text-white/45 text-xs font-['Satoshi'] leading-relaxed max-w-[180px] mx-auto">
        {metric.label}
      </p>
    </motion.div>
  );
}

export default function AtomFiveLayers() {
  const sectionRef = useRef(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div id="atom-layers" className="bg-black py-32 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,167,255,0.05)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(185,135,255,0.04)_0%,transparent_70%)]" />
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
              Revenue AI OS
            </span>
            <div className="w-6 h-px bg-[#00a7ff]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-['Cabinet_Grotesk'] text-white mb-5"
          >
            ATOM'S FIVE{" "}
            <span className="text-[#00a7ff]">LAYERS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-500 text-lg font-['Satoshi'] max-w-2xl mx-auto leading-relaxed"
          >
            Pipeline generated. Deals closed. Revenue attributed. Priced on outcome.
          </motion.p>
        </div>

        {/* Layers timeline */}
        <div className="mb-16">
          {LAYERS.map((layer, i) => (
            <LayerCard
              key={layer.number}
              layer={layer}
              index={i}
              isLast={i === LAYERS.length - 1}
            />
          ))}
        </div>

        {/* Key metrics row */}
        <div className="flex flex-col sm:flex-row gap-4">
          {METRICS.map((metric, i) => (
            <MetricCard key={metric.value} metric={metric} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
