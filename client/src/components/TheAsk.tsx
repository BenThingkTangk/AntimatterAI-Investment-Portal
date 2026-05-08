import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Lock, FileText } from "lucide-react";

const SNAPSHOT = [
  { label: "Round", value: "Series A" },
  { label: "Pre-Money", value: "$150M–$250M" },
  { label: "Raise", value: "$25M–$50M" },
  { label: "Lead Allocation", value: "$10M–$20M" },
];

const ACTIONS = [
  {
    title: "Schedule Partner Meeting",
    description: "Book a 30-min call with Ben O'Leary directly. We come prepared. So do you.",
    icon: Calendar,
    color: "#00e6d3",
    href: "mailto:ben@nirmataholdings.com?subject=Partner Meeting Request — Nirmata Holdings Series A",
    cta: "Book a Call",
  },
  {
    title: "Request Data Room Access",
    description: "Mutual NDA → full data room with financial model, legal, IP, and pilot pipeline.",
    icon: Lock,
    color: "#00a7ff",
    href: "mailto:ben@nirmataholdings.com?subject=Data Room Access Request",
    cta: "Request Access",
  },
  {
    title: "Open Interactive Term Sheet",
    description: "Live, interactive Series A term sheet with simulator and VC scoring algorithm.",
    icon: FileText,
    color: "#b987ff",
    href: "#investment",
    cta: "View Term Sheet",
    scroll: true,
  },
];

function WordReveal({ text }: { text: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <p ref={ref} className="text-2xl md:text-3xl lg:text-4xl font-['Cabinet_Grotesk'] font-bold leading-snug text-white max-w-4xl mx-auto">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

function ParticleField() {
  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#00e6d3]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.15,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.08, 0.2, 0.08],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function TheAsk() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const convictionRef = useRef(null);
  const convictionInView = useInView(convictionRef, { once: true, margin: "-60px" });

  return (
    <div id="ask" className="bg-black py-32 px-4 relative overflow-hidden">
      <ParticleField />

      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,230,211,0.06)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(185,135,255,0.04)_0%,transparent_60%)]" />
      </div>

      <div className="max-w-5xl mx-auto relative" ref={headerRef}>
        {/* Section label */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-6 h-px bg-[#00e6d3]" />
            <span className="text-[#00e6d3] text-xs font-semibold tracking-[0.2em] uppercase font-['Satoshi']">Investment</span>
            <div className="w-6 h-px bg-[#00e6d3]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-['Cabinet_Grotesk'] text-white mb-8"
          >
            THE <span className="text-[#00e6d3]">ASK</span>
          </motion.h2>
        </div>

        {/* Hero quote */}
        <div className="text-center mb-20">
          <WordReveal text="This round will close. The question is not whether Nirmata Holdings will reach unicorn status — it's whether you'll be the fund that was in the room when it happened." />
        </div>

        {/* Series A Snapshot */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {SNAPSHOT.map((item, i) => (
            <div
              key={i}
              className="border border-white/10 bg-white/[0.03] rounded-2xl p-5 text-center hover:border-[#00e6d3]/30 transition-colors"
            >
              <p className="text-gray-500 text-xs uppercase tracking-wider font-['Satoshi'] mb-2">{item.label}</p>
              <p className="text-white text-lg md:text-xl font-bold font-['Cabinet_Grotesk']">{item.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Action cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {ACTIONS.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.1 }}
              >
                <div
                  className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 md:p-8 h-full flex flex-col backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05]"
                  style={{ borderColor: `${action.color}15` }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${action.color}40`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${action.color}10`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${action.color}15`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border"
                    style={{ backgroundColor: `${action.color}10`, borderColor: `${action.color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: action.color }} />
                  </div>

                  <h3
                    className="text-lg font-bold font-['Cabinet_Grotesk'] mb-2"
                    style={{ color: action.color }}
                  >
                    {action.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-['Satoshi'] leading-relaxed flex-1 mb-5">
                    {action.description}
                  </p>

                  <a
                    href={action.href}
                    onClick={action.scroll ? (e) => {
                      e.preventDefault();
                      document.getElementById("investment")?.scrollIntoView({ behavior: "smooth" });
                    } : undefined}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold font-['Satoshi'] transition-all duration-300 hover:shadow-lg"
                    style={{
                      backgroundColor: `${action.color}15`,
                      color: action.color,
                      border: `1px solid ${action.color}30`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = `${action.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = `${action.color}15`;
                    }}
                  >
                    {action.cta}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Conviction Statement */}
        <motion.div
          ref={convictionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={convictionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="border border-white/10 bg-white/[0.02] rounded-2xl p-8 md:p-12 text-center relative"
        >
          {/* Giant quotemark */}
          <div className="absolute top-4 left-6 text-[#00e6d3]/10 text-8xl md:text-9xl font-serif leading-none select-none">"</div>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-['Satoshi'] italic max-w-3xl mx-auto relative z-10">
            We're not asking you to take a leap of faith. We're asking you to read the data, look at the markets, and recognize that this is{" "}
            <span className="text-[#00e6d3] font-semibold not-italic">the most logical</span> and{" "}
            <span className="text-[#00e6d3] font-semibold not-italic">the most exciting</span>{" "}
            investment you will see in 2026. The round will close. The only question is whether your name is on it.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-8 h-px bg-[#00e6d3]/40" />
            <span className="text-[#00e6d3] text-xs font-['Satoshi'] font-semibold tracking-wider">BEN O'LEARY, CO-FOUNDER</span>
            <div className="w-8 h-px bg-[#00e6d3]/40" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
