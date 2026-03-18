import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { X, Send, FileText, ToggleLeft, ToggleRight, ChevronDown } from "lucide-react";

/* ─── TYPES ─── */
interface TermSheetProps {
  vehicle: {
    id: string;
    name: string;
    tagline: string;
    description: string;
    minInvest: string;
    features: string[];
    riskLevel: string;
    targetReturn: string;
    lockup: string;
    color: string;
  };
  onClose: () => void;
}

interface TermSheetFormData {
  investorName: string;
  investorEntity: string;
  investmentAmount: string;
  valuationCap: string;
  discountRate: string;
  boardSeat: string;
  proRata: boolean;
  antiDilution: string;
  informationRights: boolean;
  additionalNotes: string;
}

/* ─── VEHICLE-SPECIFIC TERMS ─── */
const vehicleTerms: Record<string, { title: string; sections: { heading: string; items: string[] }[] }> = {
  tokenized: {
    title: "Tokenized Equity — Digital Securities Offering",
    sections: [
      {
        heading: "Token Structure",
        items: [
          "Token Type: ERC-1404 Restricted Security Token",
          "Blockchain: Ethereum L2 (Polygon PoS) with Ethereum L1 settlement",
          "Token Standard: Compliant with SEC Regulation D, Rule 506(c)",
          "Custodian: Anchorage Digital (qualified custodian)",
        ],
      },
      {
        heading: "Distribution & Liquidity",
        items: [
          "Distribution Schedule: Quarterly dividend-equivalent distributions via smart contract",
          "Secondary Market: tZERO ATS or INX regulated secondary trading",
          "Lock-Up: 6-month holding period per SEC Reg D requirements",
          "Transfer Restrictions: KYC/AML-verified wallets only; smart contract enforced",
        ],
      },
      {
        heading: "Governance",
        items: [
          "Voting Rights: 1 token = 1 vote on designated matters",
          "Real-Time Dashboard: NAV, distributions, governance proposals accessible 24/7",
          "Smart Contract Auditor: OpenZeppelin or CertiK",
        ],
      },
    ],
  },
  tranche: {
    title: "Milestone Tranches — Structured Phase Deployment",
    sections: [
      {
        heading: "Phase Definitions",
        items: [
          "Phase 1 (40% of capital): Product-market fit validation — 3+ paying enterprise clients, $500K ARR milestone",
          "Phase 2 (35% of capital): Growth acceleration — $2M ARR, 3 products generating revenue",
          "Phase 3 (25% of capital): Scale & expansion — $10M ARR, IPO readiness milestones met",
        ],
      },
      {
        heading: "Milestone Criteria & Valuation Step-Ups",
        items: [
          "Phase 1→2 Step-Up: 1.5x valuation increase upon Phase 1 milestone achievement",
          "Phase 2→3 Step-Up: 2.0x valuation increase upon Phase 2 milestone achievement",
          "Verification: Independent third-party audit of milestone claims",
          "Grace Period: 90-day cure period for missed milestones before tranche renegotiation",
        ],
      },
      {
        heading: "Investor Protections",
        items: [
          "Undeployed Capital: Held in escrow with independent fund administrator",
          "Clawback: Pro-rata return of undeployed capital if milestones permanently unmet",
          "Reporting: Monthly progress reports; quarterly financial statements",
        ],
      },
    ],
  },
  safe: {
    title: "SAFE + Warrant — Y Combinator Standard with Warrant Coverage",
    sections: [
      {
        heading: "SAFE Terms",
        items: [
          "Instrument: Post-Money SAFE (Y Combinator standard)",
          "Conversion: Converts to Preferred Stock at next Qualified Financing",
          "MFN (Most Favored Nation): Investor receives most favorable terms of any subsequent SAFE",
          "No Maturity Date; No Interest Accrual",
        ],
      },
      {
        heading: "Warrant Coverage",
        items: [
          "Warrant Coverage: 20% of SAFE investment amount",
          "Exercise Period: 7 years from issuance",
          "Exercise Price: Valuation cap price at SAFE conversion",
          "Warrant Type: Detachable; exercisable independently of SAFE conversion",
        ],
      },
      {
        heading: "Conversion Mechanics",
        items: [
          "Qualified Financing: Minimum $5M equity raise",
          "Conversion Price: Lower of (a) Valuation Cap or (b) Discount to next round price",
          "Pro-Rata: Right to participate in subsequent rounds up to ownership maintenance",
        ],
      },
    ],
  },
  spv: {
    title: "SPV Co-Investment — Institutional Portfolio Vehicle",
    sections: [
      {
        heading: "Vehicle Structure",
        items: [
          "Entity: Delaware LLC (SPV) managed by AntimatterAI Capital Management",
          "Management Fee: 2.0% annually on committed capital",
          "Carried Interest: 20% above 8% preferred return (hurdle rate)",
          "Fund Administrator: Carta Fund Admin or Juniper Square",
        ],
      },
      {
        heading: "Reporting & Governance",
        items: [
          "NAV Reporting: Quarterly Net Asset Value statements",
          "Annual Audit: Performed by independent Big 4 / regional CPA firm",
          "K-1 Distribution: Annual Schedule K-1 for tax reporting",
          "LPAC: Limited Partner Advisory Committee for investors >$1M",
        ],
      },
      {
        heading: "Portfolio Allocation",
        items: [
          "Concentrated exposure across AntimatterAI portfolio companies",
          "Co-Investment rights in follow-on rounds",
          "Diversification across MRR, Acquisition, and Hybrid monetization models",
        ],
      },
    ],
  },
  revenue: {
    title: "Revenue-Based Financing — Cash Flow-Aligned Returns",
    sections: [
      {
        heading: "Revenue Share Structure",
        items: [
          "Revenue Share: 5-8% of Monthly Recurring Revenue (MRR)",
          "Return Cap: 1.5x-3.0x of invested capital (negotiable based on amount)",
          "Payment Frequency: Monthly, within 15 business days of month-end",
          "Minimum Monthly Payment: 1% of outstanding balance",
        ],
      },
      {
        heading: "Revenue Tracking",
        items: [
          "Revenue Verification: Real-time dashboard access to Stripe/billing metrics",
          "Audit Rights: Annual third-party revenue verification",
          "Reporting: Monthly MRR reports with cohort analysis",
        ],
      },
      {
        heading: "Protections",
        items: [
          "Non-Dilutive: No equity conversion; pure revenue-share instrument",
          "Acceleration Clause: Full repayment upon change of control at 1.0x remaining balance",
          "Subordination: Senior to equity; subordinate to secured debt",
        ],
      },
    ],
  },
  convertible: {
    title: "Convertible Note — Interest-Bearing Debt with Equity Upside",
    sections: [
      {
        heading: "Note Terms",
        items: [
          "Interest Rate: 8% per annum (simple interest)",
          "Maturity: 24 months from issuance",
          "Conversion Discount: 20% to next qualified financing price",
          "Qualified Financing Threshold: $5M minimum equity raise",
        ],
      },
      {
        heading: "Conversion Mechanics",
        items: [
          "Automatic Conversion: Upon Qualified Financing at lower of cap or discount",
          "Optional Conversion: At maturity, investor may convert at cap or demand repayment",
          "Maturity Extension: Mutual 12-month extension option",
          "Conversion Security: Series A Preferred Stock with standard preferences",
        ],
      },
      {
        heading: "Investor Protections",
        items: [
          "Change of Control: 2.0x repayment premium upon acquisition before conversion",
          "Negative Covenants: Restrictions on additional debt, dividends, asset sales",
          "Information Rights: Monthly financial reports; annual audited statements",
        ],
      },
    ],
  },
};

/* ─── DEFAULT FORM VALUES ─── */
const getDefaultFormData = (vehicleId: string): TermSheetFormData => {
  const defaults: Partial<TermSheetFormData> = {};
  switch (vehicleId) {
    case "safe":
      defaults.valuationCap = "$50,000,000";
      defaults.discountRate = "20%";
      break;
    case "convertible":
      defaults.valuationCap = "$50,000,000";
      defaults.discountRate = "20%";
      break;
    case "tokenized":
      defaults.valuationCap = "$50,000,000";
      defaults.discountRate = "";
      break;
    default:
      defaults.valuationCap = "";
      defaults.discountRate = "";
  }
  return {
    investorName: "",
    investorEntity: "",
    investmentAmount: "",
    valuationCap: defaults.valuationCap || "",
    discountRate: defaults.discountRate || "",
    boardSeat: "None",
    proRata: true,
    antiDilution: "Broad-Based Weighted Average",
    informationRights: true,
    additionalNotes: "",
    ...defaults,
  };
};

/* ─── FORMAT MAILTO BODY ─── */
function buildMailtoBody(vehicle: TermSheetProps["vehicle"], form: TermSheetFormData): string {
  const lines = [
    `TERM SHEET — ${vehicle.name.toUpperCase()}`,
    `AntimatterAI, Inc. — Series A Strategic Growth Round`,
    ``,
    `--- INVESTOR INFORMATION ---`,
    `Investor Name: ${form.investorName || "(Not Provided)"}`,
    `Investor Entity: ${form.investorEntity || "(Not Provided)"}`,
    `Investment Amount: ${form.investmentAmount || "(Not Provided)"}`,
    ``,
    `--- PROPOSED TERMS ---`,
    `Vehicle: ${vehicle.name}`,
    form.valuationCap ? `Valuation Cap: ${form.valuationCap}` : null,
    form.discountRate ? `Discount Rate: ${form.discountRate}` : null,
    `Board Seat Preference: ${form.boardSeat}`,
    `Pro-Rata Rights: ${form.proRata ? "Yes" : "No"}`,
    `Anti-Dilution: ${form.antiDilution}`,
    `Information Rights: ${form.informationRights ? "Yes" : "No"}`,
    ``,
    `--- VEHICLE DETAILS ---`,
    `Min. Investment: ${vehicle.minInvest}`,
    `Target Return: ${vehicle.targetReturn}`,
    `Lock-Up Period: ${vehicle.lockup}`,
    ``,
    form.additionalNotes ? `--- ADDITIONAL NOTES ---\n${form.additionalNotes}` : null,
    ``,
    `--- GENERATED VIA ANTIMATTERAI INVESTOR PORTAL ---`,
    `Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
  ]
    .filter(Boolean)
    .join("\n");
  return lines;
}

/* ─── TOGGLE COMPONENT ─── */
function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="flex items-center gap-3 w-full text-left"
      data-testid={`toggle-${label.toLowerCase().replace(/\s/g, "-")}`}
    >
      {value ? (
        <ToggleRight className="w-7 h-7 text-[#00FFB2] flex-shrink-0" />
      ) : (
        <ToggleLeft className="w-7 h-7 text-gray-500 flex-shrink-0" />
      )}
      <span className="text-sm text-gray-300">{label}</span>
    </button>
  );
}

/* ─── MAIN TERM SHEET COMPONENT ─── */
export default function TermSheet({ vehicle, onClose }: TermSheetProps) {
  const [form, setForm] = useState<TermSheetFormData>(getDefaultFormData(vehicle.id));
  const [sent, setSent] = useState(false);

  const updateField = useCallback(
    (field: keyof TermSheetFormData, value: string | boolean) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSend = useCallback(() => {
    const subject = encodeURIComponent(`Term Sheet Interest — ${vehicle.name} — ${form.investorEntity || form.investorName || "Investor"}`);
    const body = encodeURIComponent(buildMailtoBody(vehicle, form));
    window.open(`mailto:invest@antimatterai.com?subject=${subject}&body=${body}`, "_self");
    setSent(true);
  }, [vehicle, form]);

  const terms = vehicleTerms[vehicle.id];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      data-testid="modal-term-sheet"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl mx-4 my-8 md:my-12 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, hsl(220,15%,8%) 0%, hsl(220,20%,4%) 100%)",
          border: `1px solid ${vehicle.color}33`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top color bar */}
        <div className="h-1" style={{ background: `linear-gradient(90deg, ${vehicle.color}, ${vehicle.color}88, transparent)` }} />

        {/* Header */}
        <div className="px-6 md:px-10 pt-8 pb-6 border-b border-white/5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5" style={{ color: vehicle.color }} />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: vehicle.color }}>
                  Interactive Term Sheet
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
                {vehicle.name}
              </h2>
              <p className="text-gray-400 text-sm">{vehicle.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
              data-testid="button-close-term-sheet"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="px-6 md:px-10 py-8">
          {/* Company Info */}
          <div className="mb-8 p-5 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs mb-1">Company</p>
                <p className="text-white font-semibold">AntimatterAI, Inc.</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Round</p>
                <p className="text-white font-semibold">Series A</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Target Raise</p>
                <p className="font-semibold" style={{ color: vehicle.color }}>$25M–$50M</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Jurisdiction</p>
                <p className="text-white font-semibold">Delaware, USA</p>
              </div>
            </div>
          </div>

          {/* Non-editable vehicle terms */}
          {terms && (
            <div className="mb-10">
              <h3 className="font-display text-lg font-bold text-white mb-5 flex items-center gap-2">
                <div className="w-1.5 h-5 rounded-full" style={{ backgroundColor: vehicle.color }} />
                {terms.title}
              </h3>
              <div className="space-y-5">
                {terms.sections.map((section, si) => (
                  <div key={si} className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">{section.heading}</h4>
                    <ul className="space-y-2">
                      {section.items.map((item, ii) => (
                        <li key={ii} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: vehicle.color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Editable Fields */}
          <div className="mb-10">
            <h3 className="font-display text-lg font-bold text-white mb-5 flex items-center gap-2">
              <div className="w-1.5 h-5 rounded-full" style={{ backgroundColor: vehicle.color }} />
              Your Investment Terms
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Investor Name */}
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Investor Name *</label>
                <input
                  type="text"
                  value={form.investorName}
                  onChange={(e) => updateField("investorName", e.target.value)}
                  placeholder="Full legal name"
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#00FFB2]/50 transition-colors"
                  data-testid="input-investor-name"
                />
              </div>

              {/* Investor Entity */}
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Investor Entity</label>
                <input
                  type="text"
                  value={form.investorEntity}
                  onChange={(e) => updateField("investorEntity", e.target.value)}
                  placeholder="LLC, LP, or Trust name"
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#00FFB2]/50 transition-colors"
                  data-testid="input-investor-entity"
                />
              </div>

              {/* Investment Amount */}
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Investment Amount *</label>
                <input
                  type="text"
                  value={form.investmentAmount}
                  onChange={(e) => updateField("investmentAmount", e.target.value)}
                  placeholder={`Minimum: ${vehicle.minInvest}`}
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#00FFB2]/50 transition-colors"
                  data-testid="input-investment-amount"
                />
              </div>

              {/* Valuation Cap */}
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Proposed Valuation Cap</label>
                <input
                  type="text"
                  value={form.valuationCap}
                  onChange={(e) => updateField("valuationCap", e.target.value)}
                  placeholder="e.g., $50,000,000"
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#00FFB2]/50 transition-colors"
                  data-testid="input-valuation-cap"
                />
              </div>

              {/* Discount Rate */}
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Proposed Discount Rate</label>
                <input
                  type="text"
                  value={form.discountRate}
                  onChange={(e) => updateField("discountRate", e.target.value)}
                  placeholder="e.g., 20%"
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#00FFB2]/50 transition-colors"
                  data-testid="input-discount-rate"
                />
              </div>

              {/* Board Seat */}
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Board Seat Preference</label>
                <div className="relative">
                  <select
                    value={form.boardSeat}
                    onChange={(e) => updateField("boardSeat", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00FFB2]/50 transition-colors appearance-none cursor-pointer"
                    data-testid="select-board-seat"
                  >
                    <option value="None" className="bg-gray-900">None</option>
                    <option value="Observer" className="bg-gray-900">Observer</option>
                    <option value="Full" className="bg-gray-900">Full Board Seat</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Anti-Dilution */}
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Anti-Dilution Protection</label>
                <div className="relative">
                  <select
                    value={form.antiDilution}
                    onChange={(e) => updateField("antiDilution", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00FFB2]/50 transition-colors appearance-none cursor-pointer"
                    data-testid="select-anti-dilution"
                  >
                    <option value="Broad-Based Weighted Average" className="bg-gray-900">Broad-Based Weighted Average</option>
                    <option value="Full Ratchet" className="bg-gray-900">Full Ratchet</option>
                    <option value="None" className="bg-gray-900">None</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-4 py-2">
                <Toggle value={form.proRata} onChange={(v) => updateField("proRata", v)} label="Pro-Rata Rights" />
                <Toggle value={form.informationRights} onChange={(v) => updateField("informationRights", v)} label="Information Rights" />
              </div>

              {/* Additional Notes */}
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Additional Notes</label>
                <textarea
                  value={form.additionalNotes}
                  onChange={(e) => updateField("additionalNotes", e.target.value)}
                  placeholder="Any additional terms, questions, or considerations..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#00FFB2]/50 transition-colors resize-none"
                  data-testid="textarea-additional-notes"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={handleSend}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm transition-all hover:brightness-110"
              style={{
                background: `linear-gradient(135deg, ${vehicle.color}, ${vehicle.color}cc)`,
                color: "#0a0e14",
              }}
              data-testid="button-send-term-sheet"
            >
              <Send className="w-4 h-4" />
              {sent ? "Sent! — Check Your Email Client" : "Send to AntimatterAI"}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-4 rounded-xl font-semibold text-sm border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
              data-testid="button-cancel-term-sheet"
            >
              Cancel
            </button>
          </div>

          {/* PDF Note */}
          <p className="text-xs text-gray-600 text-center">
            PDF export coming soon — use Send to submit your term sheet to <span style={{ color: vehicle.color }}>invest@antimatterai.com</span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
