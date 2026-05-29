import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mic, Shield, HeartPulse, Zap } from "lucide-react";

const COLUMNS = [
  {
    title: "ATOM Sales Dominator",
    icon: Mic,
    color: "#00a7ff",
    status: "Active Close",
    lines: [
      "Copious enterprise deals in active close",
      "2 ATOM Professional ($25K/mo) closing this quarter",
      "Pipeline crossing multi-million in qualified opportunity",
      "Metered Stripe billing — margin ownership at scale",
    ],
  },
  {
    title: "ATOM Red Team",
    icon: Shield,
    color: "#ff6b8b",
    status: "Regulated Demand",
    lines: [
      "Copious deals in regulated industries",
      "Defense, finance, healthcare verticals active",
      "EU AI Act general provisions Aug 2026; high-risk enforcement Dec 2027",
      "Buyers are racing the clock — compliance is non-optional",
    ],
  },
  {
    title: "PhysioPS / HumanOS",
    icon: HeartPulse,
    color: "#72f2a1",
    status: "Accumulating",
    lines: [
      "Clinical pre-orders accumulating",
      "Elite athletic programs + F1 partnerships",
      "Veterans groups + aerotoxicity recovery",
      "Steve O'Leary (President & COO) running enterprise rollout",
    ],
  },
];

export default function DemandCurve() {
  const sectionRef = useRef(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div id="demand" className="bg-black py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,107,139,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-6xl mx-auto relative" ref={sectionRef}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-6 h-px bg-[#ffd166]" />
            <span className="text-[#ffd166] text-xs font-semibold tracking-[0.2em] uppercase font-['Satoshi']">Demand Signal</span>
            <div className="w-6 h-px bg-[#ffd166]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-['Cabinet_Grotesk'] text-white mb-4"
          >
            THE DEMAND <span className="text-[#ffd166]">CURVE</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-lg font-['Satoshi']"
          >
            We are not pitching potential. We are pitching scarcity.
          </motion.p>
        </div>

        {/* 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {COLUMNS.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 backdrop-blur-sm"
              style={{ borderColor: `${col.color}20` }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${col.color}15`, border: `1px solid ${col.color}30` }}
                >
                  <col.icon className="w-5 h-5" style={{ color: col.color }} />
                </div>
                <div>
                  <h3 className="font-['Cabinet_Grotesk'] font-bold text-white text-sm">{col.title}</h3>
                  <span
                    className="text-xs font-['Satoshi'] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${col.color}15`, color: col.color }}
                  >
                    {col.status}
                  </span>
                </div>
              </div>

              {/* Lines */}
              <div className="space-y-3">
                {col.lines.map((line) => (
                  <div key={line} className="flex items-start gap-2">
                    <Zap className="w-3 h-3 mt-1 shrink-0" style={{ color: col.color }} />
                    <span className="text-white/50 text-xs font-['Satoshi'] leading-relaxed">{line}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Killer line */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center p-8 border border-[#ffd166]/20 bg-[#ffd166]/[0.03] rounded-2xl"
        >
          <p className="text-white text-xl md:text-2xl font-['Cabinet_Grotesk'] font-bold">
            The demand is <span className="text-[#ffd166]">interstellar</span>. The constraint is <span className="text-[#ff6b8b]">capital</span>. The window is <span className="text-[#00e6d3]">now</span>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
