import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Building2, Cpu, Mic, Globe, Server, Quote } from "lucide-react";

const DEALS = [
  { amount: "$40B", desc: "BlackRock-led acquisition of Aligned Data Centers (Oct 2025) for AI infrastructure", icon: Building2, color: "#00e6d3" },
  { amount: "$30B", desc: "BlackRock + Microsoft + NVIDIA + MGX deploying for AI data center buildout", icon: Server, color: "#00a7ff" },
  { amount: "$10B", desc: "BlackRock weighing investment in upcoming SpaceX IPO", icon: Globe, color: "#b987ff" },
  { amount: "$5.55B", desc: "Cerebras Systems IPO (May 2026) — largest AI infrastructure IPO on record", icon: Cpu, color: "#72f2a1" },
  { amount: "$200B", desc: "Anticipated drain from SpaceX + OpenAI + Anthropic mega-IPOs", icon: TrendingUp, color: "#ffd166" },
  { amount: "$550M", desc: "ElevenLabs Series D led by BlackRock + NVIDIA (AI voice)", icon: Mic, color: "#ff6b8b" },
  { amount: "$1.75B", desc: "Blackstone Digital Infrastructure Trust IPO (May 2026, AI data centers)", icon: Building2, color: "#74c0fc" },
  { amount: "$2.55B", desc: "BlackRock's Preqin acquisition (private credit + AI indexation)", icon: TrendingUp, color: "#00e6d3" },
];

export default function InstitutionalTailwind() {
  const sectionRef = useRef(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div id="tailwind" className="bg-black py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,230,211,0.04)_0%,transparent_70%)]" />
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
            <div className="w-6 h-px bg-[#00e6d3]" />
            <span className="text-[#00e6d3] text-xs font-semibold tracking-[0.2em] uppercase font-['Satoshi']">Market Signal</span>
            <div className="w-6 h-px bg-[#00e6d3]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-['Cabinet_Grotesk'] text-white mb-4"
          >
            THE INSTITUTIONAL <span className="text-[#00e6d3]">TAILWIND</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-lg font-['Satoshi'] max-w-3xl mx-auto"
          >
            The Smart Money Is Already Here
          </motion.p>
        </div>

        {/* Deals grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {DEALS.map((deal, i) => (
            <motion.div
              key={deal.amount + i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="flex items-start gap-4 p-5 border border-white/10 bg-white/[0.03] rounded-2xl backdrop-blur-sm hover:border-white/20 transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${deal.color}12`, border: `1px solid ${deal.color}25` }}
              >
                <deal.icon className="w-5 h-5" style={{ color: deal.color }} />
              </div>
              <div>
                <p className="font-['Cabinet_Grotesk'] font-bold text-2xl text-white mb-1">{deal.amount}</p>
                <p className="text-white/50 text-sm font-['Satoshi'] leading-relaxed">{deal.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="border border-[#72f2a1]/20 bg-[#72f2a1]/[0.03] rounded-2xl p-8 mb-8"
        >
          <Quote className="w-8 h-8 text-[#72f2a1]/40 mb-4" />
          <p className="text-white/80 text-lg font-['Satoshi'] italic leading-relaxed mb-3">
            "Cerebras' $5.55B debut was one of the largest AI infrastructure IPOs on record and a direct signal that the compute buildout trade is very much alive."
          </p>
          <p className="text-[#72f2a1] text-sm font-['Satoshi'] font-semibold">— R136 Ventures Growth Digest</p>
        </motion.div>

        {/* The angle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="border border-[#00e6d3]/20 bg-[#00e6d3]/[0.03] rounded-2xl p-6 text-center"
        >
          <p className="text-white/70 text-sm font-['Satoshi'] leading-relaxed">
            <span className="text-[#00e6d3] font-bold">The Intersection:</span> Nirmata sits at the EXACT convergence BlackRock and the smart money are pouring into — AI infrastructure + edge compute + AI agents + AI governance. We are not adjacent to the thesis. We <em>are</em> the thesis.
          </p>
        </motion.div>

        {/* Sources */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="text-white/20 text-xs font-['Satoshi']">
            Sources: BlackRock Aligned Data Centers — TheStreet (May 2026) · BlackRock + MSFT + NVIDIA $30B — TheStreet · BlackRock SpaceX — The Information (May 18, 2026) · Cerebras IPO — R136 Ventures (May 2026) · ElevenLabs $550M — R136 Ventures (May 2026)
          </p>
        </motion.div>
      </div>
    </div>
  );
}
