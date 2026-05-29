import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const DOCTRINES = [
  { product: "ΔTOM Sales Dominator", text: "doesn't help your sales team. It replaces the ones who aren't closing." },
  { product: "Red Team ΔTOM", text: "doesn't find your vulnerabilities. It finds them before nation-state actors do." },
  { product: "HumanOS", text: "doesn't track your health. It predicts and prevents the version of you that gets sick." },
  { product: "AntimatterAI", text: "isn't a startup. It's the intelligence layer the Fortune 500 forgot to build." },
  { product: "ΔTOM Voice Agent", text: "doesn't answer your phones. It closes your deals at 3am." },
  { product: "ΔTOM Lead Gen", text: "doesn't find leads. It finds the ones who are already thinking about buying." },
  { product: "ΔTOM Prospect Engine", text: "doesn't qualify leads. It eliminates the ones that were never going to close." },
  { product: "ΔTOM Quantum Layer", text: "isn't a security tool. It's a post-quantum immune system for your enterprise." },
  { product: "ΔTOM Industrial", text: "doesn't automate factories. It turns manufacturing floors into thinking organisms." },
  { product: "ΔTOM FinanceOS", text: "doesn't process transactions. It rewrites the rules of capital allocation in real time." },
  { product: "ΔTOM EdgeOS", text: "doesn't deploy AI to the edge. It puts a supercomputer in every device on earth." },
  { product: "Akamai + Blackwell", text: "isn't a partnership. It's a 4,400-node nervous system running at 86% of hyperscaler cost." },
  { product: "PhysioPS", text: "doesn't tell veterans they're broken. It shows them, in real-time biometric data, exactly what's recoverable." },
  { product: "ATOM Sales Dominator", text: "runs on metered Stripe billing — every voice minute, phone reveal, and War Room credit billed at margin we own." },
  { product: "The ΔTOM Doctrine", text: "We don't pitch potential. We pitch scarcity. The demand is interstellar. The constraint is capital." },
];

function DoctrineCard({ doctrine, index }: { doctrine: typeof DOCTRINES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;

  return (
    <div className={`flex items-start gap-6 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:gap-10`}>
      {/* Card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="md:w-[48%] w-full group"
      >
        <div className="relative border border-white/10 bg-white/[0.03] rounded-2xl p-6 md:p-8 backdrop-blur-sm hover:border-[#00e6d3]/30 hover:bg-white/[0.05] transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,230,211,0.08)]">
          {/* Index badge */}
          <div className="absolute -top-3 left-6 px-3 py-1 bg-[#00e6d3]/10 border border-[#00e6d3]/30 rounded-full">
            <span className="text-[#00e6d3] text-xs font-bold font-['JetBrains_Mono'] tracking-wider">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <p className="text-lg md:text-xl leading-relaxed font-['Satoshi'] text-gray-300 mt-2">
            <span className="font-['Cabinet_Grotesk'] font-bold text-[#00e6d3]">{doctrine.product}</span>{" "}
            {doctrine.text}
          </p>
        </div>
      </motion.div>

      {/* Timeline connector */}
      <div className="hidden md:flex flex-col items-center w-[4%] shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-3 h-3 rounded-full bg-[#00e6d3] shadow-[0_0_12px_rgba(0,230,211,0.6)]"
        />
        {index < DOCTRINES.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-px h-16 bg-gradient-to-b from-[#00e6d3]/40 to-transparent origin-top"
          />
        )}
      </div>

      {/* Spacer for alternating side */}
      <div className="hidden md:block md:w-[48%]" />
    </div>
  );
}

function ScrollProgress() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progressPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={ref} className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2">
      <div className="w-1 h-40 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-[#00e6d3] to-[#00a7ff] rounded-full"
          style={{ height: progressPercent.get ? `${Math.min(100, Math.max(0, progressPercent.get()))}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function DeltaDoctrine() {
  const sectionRef = useRef(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div id="doctrine" className="bg-black py-32 px-4 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,230,211,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-5xl mx-auto relative" ref={sectionRef}>
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-6 h-px bg-[#00e6d3]" />
            <span className="text-[#00e6d3] text-xs font-semibold tracking-[0.2em] uppercase font-['Satoshi']">Manifesto</span>
            <div className="w-6 h-px bg-[#00e6d3]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-['Cabinet_Grotesk'] text-white mb-4"
          >
            THE <span className="text-[#00e6d3]">Δ</span> DOCTRINE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-500 text-lg font-['Satoshi']"
          >
            15 Lines. 4 Pillars. 1 Inevitability.
          </motion.p>
        </div>

        {/* Doctrine timeline */}
        <div className="space-y-6 md:space-y-2">
          {DOCTRINES.map((d, i) => (
            <DoctrineCard key={i} doctrine={d} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
