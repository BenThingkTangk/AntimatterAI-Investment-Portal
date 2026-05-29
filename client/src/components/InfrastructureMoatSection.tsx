import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Globe, Zap, Shield, Clock, Server, ExternalLink, Quote } from "lucide-react";

const STATS = [
  { label: "96GB GDDR7", sub: "per RTX PRO 6000 Blackwell", icon: Cpu, color: "#00e6d3" },
  { label: "1.63× H100", sub: "throughput per card", icon: Zap, color: "#00a7ff" },
  { label: "4,400+ Nodes", sub: "Akamai edge network", icon: Globe, color: "#b987ff" },
  { label: "86% Cost Cut", sub: "vs AWS / GCP hyperscalers", icon: Server, color: "#72f2a1" },
  { label: "Sub-50ms", sub: "latency for voice agents", icon: Clock, color: "#ffd166" },
  { label: "Private VPC", sub: "on-prem + air-gapped options", icon: Shield, color: "#ff6b8b" },
];

export default function InfrastructureMoatSection() {
  const sectionRef = useRef(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div id="infra-moat" className="bg-black py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,167,255,0.05)_0%,transparent_70%)]" />
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
            <div className="w-6 h-px bg-[#00a7ff]" />
            <span className="text-[#00a7ff] text-xs font-semibold tracking-[0.2em] uppercase font-['Satoshi']">Templeton Unlock</span>
            <div className="w-6 h-px bg-[#00a7ff]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-['Cabinet_Grotesk'] text-white mb-4"
          >
            THE INFRASTRUCTURE <span className="text-[#00a7ff]">MOAT</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-lg font-['Satoshi'] max-w-3xl mx-auto"
          >
            Private Inference. Edge Economics. Sovereign AI.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/50 text-sm font-['Satoshi'] max-w-3xl mx-auto mt-3"
          >
            We do not pay OpenAI margins. We run on Akamai's Blackwell GPU grid — 96GB GDDR7, 1.63× H100 throughput, 4,400+ edge nodes, 86% cost reduction vs hyperscalers.
          </motion.p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="border border-white/10 bg-white/[0.03] rounded-2xl p-5 backdrop-blur-sm text-center hover:border-white/20 transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="text-white font-bold text-lg font-['Cabinet_Grotesk'] mb-1">{stat.label}</p>
              <p className="text-white/40 text-xs font-['Satoshi']">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="border border-[#00a7ff]/20 bg-[#00a7ff]/[0.03] rounded-2xl p-8 mb-8"
        >
          <Quote className="w-8 h-8 text-[#00a7ff]/40 mb-4" />
          <p className="text-white/80 text-lg font-['Satoshi'] italic leading-relaxed mb-4">
            "The infrastructure is the moat. Sales Dominator drives revenue. Red Team hardens the system. The Blackwell + Akamai partnership means we're not building on top of frontier model margins — we're owning the entire compute layer."
          </p>
          <p className="text-[#00a7ff] text-sm font-['Satoshi'] font-semibold">— Templeton-Class Strategic Framing</p>
        </motion.div>

        {/* Demo link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <a
            href="https://atom-akamai.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold font-['Satoshi'] bg-[#00a7ff]/10 border border-[#00a7ff]/30 text-[#00a7ff] hover:bg-[#00a7ff]/20 transition-all duration-300"
          >
            Explore Akamai Infrastructure Demo <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
