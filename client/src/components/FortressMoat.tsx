import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Database, Layers, Shield, Heart, Gamepad2, User } from "lucide-react";

const ACCENT_COLORS = ["#00e6d3", "#00a7ff", "#b987ff", "#72f2a1", "#ff6b8b", "#ffd166", "#00e6d3"];

const MOAT_LAYERS = [
  {
    name: "The ΔTOM Intelligence Flywheel",
    description: "Every product deployed adds behavioral, physiological, and commercial data to the ΔTOM core. The more products deployed, the smarter every product becomes. Compounding intelligence moat with no ceiling.",
    icon: Zap,
  },
  {
    name: "Cross-Vertical Data Monopoly",
    description: "No competitor has access to a dataset connecting enterprise sales behavior, physiological performance, gaming reflexes, and cybersecurity response patterns. Unrepayable at any price.",
    icon: Database,
  },
  {
    name: "Vertical Integration at 15 Layers",
    description: "$50.3B enterprise AI platform market by 2030. Nirmata doesn't compete for a slice — it occupies the stack. Customer never leaves without losing the entire intelligence loop.",
    icon: Layers,
  },
  {
    name: "The Navy SEAL Doctrine of Build",
    description: "Mission-critical execution standards. Every product designed to 'lives depend on this.' Zero-failure tolerance no VC-backed Silicon Valley competitor can replicate through capital.",
    icon: Shield,
  },
  {
    name: "Regulatory Moat in Healthcare",
    description: "ClinixAI and RRG.bio operate in the most regulated, most defensible sectors. First-mover regulatory relationships in AI clinical decision support and stem cell therapy are years-long advantages.",
    icon: Heart,
  },
  {
    name: "Hardware Lock-In via ΔTOM Gaming Console",
    description: "Once a gamer's behavioral DNA is encoded in the console's AI model, switching to Sony or Microsoft means starting from zero. AI gaming market: $66.84B by 2035 at 32% CAGR.",
    icon: Gamepad2,
  },
  {
    name: "The Founder as Unfair Advantage",
    description: "A former Navy SEAL building AI products for enterprise, defense, and consumer markets. 207 AI unicorns minted since 2024 — none with this story. The founder is the moat.",
    icon: User,
  },
];

function MoatCard({ layer, index }: { layer: typeof MOAT_LAYERS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const color = ACCENT_COLORS[index];
  const Icon = layer.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        className="relative border border-white/10 bg-white/[0.03] rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05]"
        style={{ borderColor: `${color}15` }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `${color}50`;
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${color}12`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `${color}15`;
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        <div className="flex items-start gap-5">
          {/* Number + Icon */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center border"
              style={{ backgroundColor: `${color}10`, borderColor: `${color}30` }}
            >
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <span
              className="text-xs font-bold font-['JetBrains_Mono'] tracking-wider"
              style={{ color }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3
              className="text-lg md:text-xl font-bold font-['Cabinet_Grotesk'] mb-2"
              style={{ color }}
            >
              {layer.name}
            </h3>
            <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed font-['Satoshi']">
              {layer.description}
            </p>
          </div>
        </div>

        {/* Connecting line to next layer */}
        {index < MOAT_LAYERS.length - 1 && (
          <div className="hidden md:block absolute -bottom-4 left-[2.25rem] w-px h-4 bg-gradient-to-b from-white/10 to-transparent" />
        )}
      </div>
    </motion.div>
  );
}

export default function FortressMoat() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <div id="fortress" className="bg-black py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,rgba(0,167,255,0.04)_0%,transparent_60%)]" />
      </div>

      <div className="max-w-4xl mx-auto relative" ref={headerRef}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-6 h-px bg-[#00e6d3]" />
            <span className="text-[#00e6d3] text-xs font-semibold tracking-[0.2em] uppercase font-['Satoshi']">Defensibility</span>
            <div className="w-6 h-px bg-[#00e6d3]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-['Cabinet_Grotesk'] text-white mb-4"
          >
            THE <span className="text-[#00e6d3]">FORTRESS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-2xl md:text-3xl font-['Cabinet_Grotesk'] text-gray-400 mb-3"
          >
            Why No One Can Follow
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-500 text-base font-['Satoshi'] max-w-2xl mx-auto"
          >
            VCs are no longer funding first-movers. They are funding fortresses. Here is ours.
          </motion.p>
        </div>

        {/* Moat layers */}
        <div className="space-y-4">
          {MOAT_LAYERS.map((layer, i) => (
            <MoatCard key={i} layer={layer} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
