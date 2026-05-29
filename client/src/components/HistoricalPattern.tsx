import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface PatternRow {
  pattern: string;
  earlyFailure: string;
  catchUpWinner: string;
  whatChanged: string;
}

const TABLE_ROWS: PatternRow[] = [
  {
    pattern: "Grocery",
    earlyFailure: "Webvan — $830M raised, bankrupt July 2001",
    catchUpWinner: "Instacart — $10B IPO 2023",
    whatChanged: "Broadband 5%→70%, smartphones, Amazon trust",
  },
  {
    pattern: "Pets",
    earlyFailure: "Pets.com — IPO Feb 2000, ~$300M burned, liquidated 9mo",
    catchUpWinner: "Chewy — $3.35B→$31B",
    whatChanged: "Broadband, Prime, logistics",
  },
  {
    pattern: "Tablet",
    earlyFailure: "GO Corp (1987), Newton (1993)",
    catchUpWinner: "iPad — 450K first week, 19M Y1",
    whatChanged: "ARM chips, flash, App Store, iPhone-trained UX",
  },
];

const COLUMNS = [
  { key: "pattern" as const, label: "Pattern", color: "#00e6d3" },
  { key: "earlyFailure" as const, label: "Early Failure", color: "#ff6b8b" },
  { key: "catchUpWinner" as const, label: "Catch-Up Winner", color: "#72f2a1" },
  { key: "whatChanged" as const, label: "What Changed", color: "#00a7ff" },
];

function TableRow({ row, index }: { row: PatternRow; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.tr
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group border-b border-white/5 last:border-0"
    >
      {COLUMNS.map((col) => (
        <td
          key={col.key}
          className="px-5 py-5 align-top transition-colors duration-300 group-hover:bg-white/[0.02]"
        >
          {col.key === "pattern" ? (
            <span
              className="font-[CabinetGrotesk] font-bold text-base"
              style={{ color: col.color }}
            >
              {row[col.key]}
            </span>
          ) : (
            <span className="font-[Satoshi] text-white/60 text-sm leading-relaxed">
              {row[col.key]}
            </span>
          )}
        </td>
      ))}
    </motion.tr>
  );
}

export default function HistoricalPattern() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const calloutRef = useRef(null);
  const calloutInView = useInView(calloutRef, { once: true, margin: "-60px" });

  return (
    <section id="historical" className="py-32 relative">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #b987ff, #00a7ff)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#b987ff]/40" />
            <span
              className="font-mono text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border"
              style={{
                color: "#b987ff",
                borderColor: "#b987ff50",
                background: "#b987ff10",
              }}
            >
              Pattern Recognition
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#b987ff]/40" />
          </div>

          <h2 className="font-[CabinetGrotesk] font-black text-5xl md:text-6xl text-white tracking-tight mb-5 uppercase">
            The Pattern
          </h2>
          <p className="font-[Satoshi] text-white/60 text-lg max-w-3xl leading-relaxed">
            Sales AI had its Webvan era (2023–24). Its Pets.com era (2024–25). This is the
            Chewy/iPad window.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="border border-white/10 bg-white/[0.03] rounded-2xl backdrop-blur-sm overflow-hidden mb-10"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Column headers */}
              <thead>
                <tr className="border-b border-white/10">
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className="px-5 py-4 text-left"
                    >
                      <span
                        className="font-mono text-xs tracking-[0.15em] uppercase font-semibold"
                        style={{ color: col.color }}
                      >
                        {col.label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Rows */}
              <tbody>
                {TABLE_ROWS.map((row, index) => (
                  <TableRow key={row.pattern} row={row} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Callout */}
        <motion.div
          ref={calloutRef}
          initial={{ opacity: 0, y: 30 }}
          animate={calloutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative border border-[#00e6d3]/20 bg-[#00e6d3]/[0.04] rounded-2xl p-7 md:p-9 backdrop-blur-sm overflow-hidden"
        >
          {/* Decorative top line */}
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#00e6d3]/50 to-transparent" />

          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 mt-1 w-2 h-2 rounded-full"
              style={{ background: "#00e6d3", boxShadow: "0 0 8px #00e6d3" }}
            />
            <p className="font-[Satoshi] text-white/80 text-base md:text-lg leading-relaxed">
              The first-wave AI SDRs had mixed results.{" "}
              <span className="text-white font-semibold">ATOM isn't the first wave.</span>{" "}
              ATOM is the infrastructure layer that makes the next wave work.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
