import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Mic, Sparkles, Layers, TrendingUp } from "lucide-react";

const PLAYS = [
  {
    number: 1,
    title: "Lock design partners",
    description:
      "That turn output into proof — 2 anchor accounts, measure pipeline generated, report publicly",
    icon: Target,
    color: "#00e6d3",
  },
  {
    number: 2,
    title: "Ship voice into production",
    description:
      "Cross sub-800ms threshold. Already done. ~300ms TTFB live.",
    icon: Mic,
    color: "#00a7ff",
  },
  {
    number: 3,
    title: "Name the category — Revenue AI OS",
    description:
      "Before Gong fully owns it. We are arriving the week the category finished naming the thing we already built.",
    icon: Sparkles,
    color: "#ffd166",
  },
  {
    number: 4,
    title: "Run AntimatterAI on the same board, quietly",
    description:
      "Every ATOM deployment lays the AntimatterAI substrate. Parallel build, shared infrastructure.",
    icon: Layers,
    color: "#b987ff",
  },
  {
    number: 5,
    title: "Capitalize off output, not narrative",
    description:
      "Position for repricing that compresses pre-revenue names. We price on outcomes.",
    icon: TrendingUp,
    color: "#72f2a1",
  },
];

function PlayCard({ play, index }: { play: (typeof PLAYS)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = play.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="relative border border-white/10 bg-white/[0.03] rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05]">
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 40px ${play.color}10` }}
        />

        <div className="flex items-start gap-5">
          {/* Number badge */}
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-mono text-sm font-bold"
            style={{
              background: `${play.color}18`,
              border: `1px solid ${play.color}40`,
              color: play.color,
            }}
          >
            {String(play.number).padStart(2, "0")}
          </div>

          {/* Icon */}
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${play.color}15`, border: `1px solid ${play.color}30` }}
          >
            <Icon size={18} style={{ color: play.color }} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3
              className="font-[CabinetGrotesk] font-bold text-lg text-white mb-2 leading-snug"
            >
              {play.title}
            </h3>
            <p className="font-[Satoshi] text-white/60 text-sm leading-relaxed">
              {play.description}
            </p>
          </div>
        </div>

        {/* Accent line */}
        <div
          className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full opacity-60"
          style={{ background: play.color }}
        />
      </div>
    </motion.div>
  );
}

export default function FivePlays() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="five-plays" className="py-32 relative">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #00e6d3, #00a7ff)" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#00e6d3]/40" />
            <span
              className="font-mono text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border"
              style={{
                color: "#00e6d3",
                borderColor: "#00e6d350",
                background: "#00e6d310",
              }}
            >
              Execution Roadmap
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#00e6d3]/40" />
          </div>

          <h2 className="font-[CabinetGrotesk] font-black text-5xl md:text-6xl text-white tracking-tight mb-5 uppercase">
            The Five Plays
          </h2>
          <p className="font-[Satoshi] text-white/60 text-lg max-w-2xl leading-relaxed">
            The next $1T company is a software company priced on outcomes. ATOM is priced on
            outcomes from day one.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {PLAYS.map((play, index) => (
            <PlayCard key={play.number} play={play} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
