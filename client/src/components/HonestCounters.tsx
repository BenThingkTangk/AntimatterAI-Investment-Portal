import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface Counter {
  title: string;
  body: string;
  color: "#ffd166" | "#ff6b8b";
}

const COUNTERS: Counter[] = [
  {
    title: "The $200B drain is a future event",
    body: "Markets discount before materializing. Wei Li (BlackRock CIO) said near-term signals are mixed. We use this as context, not certainty.",
    color: "#ffd166",
  },
  {
    title: "OpenAI's IPO timeline is uncertain",
    body: "Their CFO publicly said 'an IPO is not our focus.' The mega-IPO liquidity drain is directional, not dated.",
    color: "#ffd166",
  },
  {
    title: "BofA sell-signal is contrarian, not predictive",
    body: "Median 4-week loss is only −1%. It's a positioning indicator, not a crash predictor.",
    color: "#ff6b8b",
  },
  {
    title: "Sales AI is crowded",
    body: "First-wave AI SDRs had mixed public results. That's exactly why the infrastructure layer (us) matters more than the application layer.",
    color: "#ff6b8b",
  },
  {
    title: "Repricing compresses our multiples too",
    body: "The same repricing that favors ATOM's product thesis also compresses ATOM's fundraising multiples. We accept this trade — output > narrative.",
    color: "#ffd166",
  },
];

function CounterCard({ counter, index }: { counter: Counter; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        className="relative border bg-white/[0.03] rounded-2xl p-6 md:p-7 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05] overflow-hidden"
        style={{ borderColor: `${counter.color}25` }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 50px ${counter.color}08` }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-8 right-8 h-[1px]"
          style={{
            background: `linear-gradient(to right, transparent, ${counter.color}50, transparent)`,
          }}
        />

        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: `${counter.color}15`,
              border: `1px solid ${counter.color}30`,
            }}
          >
            <AlertTriangle size={16} style={{ color: counter.color }} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3
              className="font-[CabinetGrotesk] font-bold text-base text-white mb-2 leading-snug"
              style={{ textShadow: `0 0 20px ${counter.color}20` }}
            >
              {counter.title}
            </h3>
            <p className="font-[Satoshi] text-white/55 text-sm leading-relaxed">
              {counter.body}
            </p>
          </div>

          {/* Index badge */}
          <div
            className="flex-shrink-0 font-mono text-xs opacity-40 mt-0.5"
            style={{ color: counter.color }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HonestCounters() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="counters" className="py-32 relative">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-1/4 w-[480px] h-[480px] rounded-full blur-[130px] opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #ff6b8b, #ffd166)" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#ffd166]/40" />
            <span
              className="font-mono text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border"
              style={{
                color: "#ffd166",
                borderColor: "#ffd16650",
                background: "#ffd16610",
              }}
            >
              Radical Transparency
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#ffd166]/40" />
          </div>

          <h2 className="font-[CabinetGrotesk] font-black text-5xl md:text-6xl text-white tracking-tight mb-5 uppercase">
            What We're Not Hiding
          </h2>
          <p className="font-[Satoshi] text-white/60 text-lg max-w-2xl leading-relaxed">
            VCs respect founders who disclose downside framing.
          </p>
        </motion.div>

        {/* Counter cards */}
        <div className="flex flex-col gap-4">
          {COUNTERS.map((counter, index) => (
            <CounterCard key={index} counter={counter} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
