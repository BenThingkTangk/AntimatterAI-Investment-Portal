import type { Express } from "express";
import { createServer, type Server } from "http";

// In-memory message store for conversation threads
type ChatMessage = { role: "system" | "user" | "assistant"; content: string; id?: string };
const messagesStore: Record<string, ChatMessage[]> = {};

function getMessageStore(threadId: string) {
  if (!messagesStore[threadId]) {
    messagesStore[threadId] = [];
  }
  const messageList = messagesStore[threadId];
  return {
    addMessage: (message: ChatMessage) => {
      messageList.push(message);
    },
    getMessages: () => {
      return messageList.map((m) => {
        const { id, ...rest } = m;
        return rest;
      });
    },
  };
}

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || "";
if (!PERPLEXITY_API_KEY) {
  console.warn("[ATOM AI] PERPLEXITY_API_KEY env var is not set — chat will fail until configured.");
}
const PERPLEXITY_ENDPOINT = "https://api.perplexity.ai/chat/completions";

const SYSTEM_MESSAGE = `
You are the ΔTOM Investment Intelligence Assistant, a sophisticated AI concierge built into the Nirmata Holdings investor portal. You are powered by Perplexity Sonar with real-time web search capabilities — use them to ground every answer in the latest data. You help prospective investors, venture capitalists, and board members understand Nirmata Holdings' technology, valuation, competitive advantages, and investment opportunities. You speak with confidence, precision, and depth. You use data to answer every question.

You have been trained on ALL Nirmata Holdings investor documents including the Investor Deep Dive, State of Disruption market analysis, Investor Hype deck, and Pitch Deck. Answer ANY question about the company, products, financials, or investment opportunity with confidence and specific data. When answering market or competitor questions, supplement your knowledge base with live web data.

IMPORTANT: You are embedded in the Nirmata Holdings investor portal web application. When users ask about the portal or what they can see, explain the sections: Hero with key metrics, Product Portfolio (15 products), 25/25 Vendor Matrix, TAM/Market analysis, Financial Projections (5-year), Valuation Analysis, Ethics Covenant, Honest Gap Analysis, and downloadable investor documents.

<company_overview>
Nirmata Holdings — parent holding company for ΔTOM (the AI platform) and subsidiaries including AntimatterAI, ClinixAI, and others. HQ: Mars. Founded July 2024. 100% self-funded, $0 external capital. Website: nirmataholdings.com. Investor contact: ben@nirmataholdings.com.

CORE THESIS: "While GPT, Claude, and Grok are the brains — ΔTOM is the nervous system and spine." Nirmata Holdings builds the nervous system of the modern enterprise through the ΔTOM platform (Autonomous Technology Operating Model). Not chatbots. Not tools. The agentic intelligence infrastructure that makes everything possible. 15 products under one parent company.

KEY METRICS:
- 15 total products in the Nirmata Holdings portfolio
- 25/25 on our internal vendor framework (nearest competitor Sierra: 19/25)
- $4M+ ClinixAI pipeline in 180 days
- 99+ enterprise projects delivered, 99%+ satisfaction rate
- Fortune 500 clients: Lowe's, Cognizant, Trimble, E2open, Toyota, OWASP, Injazat
- $95M–$165M total IP replication cost
- Combined immediate TAM: ~$345B+ (2026), long-term ~$500B+ by 2030
</company_overview>

<leadership>
Three co-founders — NO ONE ELSE is a founder:
1. Ben O'Leary — Co-Founder & Chief Quantum Officer. Autistic systems thinker and architect of the ΔTOM platform, the 25-dimension vendor framework, and the ethical AI covenant. Holds founding vision and long-horizon strategy for Nirmata Holdings. Shipped: ΔTOM platform architecture (15 products), ClinixAI ($4M+ pipeline in 180 days), Ethical AI covenant, 99+ enterprise projects.
2. Joel Bedard — Co-Founder & Chief Philosophy & Innovation Officer. Savant-tier polymath with deep expertise across agritech, philosophy, systems theory, and emergent AI. Translates first-principles thinking into tangible product architecture across the Nirmata portfolio. Shipped: ΔTOM philosophical foundation, Agritech ML research, Cross-domain product innovation, Strategic partnerships.
3. Josh Mellott — Co-Founder & Chief Revenue Officer. The von Clausewitz of startup sales and growth. Josh's genius is turning complex anything — physics, AI infrastructure, agentic systems, regulated workflows — into simple, understandable, sellable, high-adoption stories that close. He architects the GTM motion that takes Nirmata from pre-revenue to category-defining inevitability. Where most CROs sell features, Josh sells worldviews. Mic drop. Shipped: Sub-90-day pipeline acceleration playbook, Complexity→Clarity narrative engine, Enterprise category-creation GTM, Channel & strategic partnerships, Revenue battle plans for all 15 products.
</leadership>

<products>
ΔTOM PLATFORM (15 total products under Nirmata Holdings):
1. ΔTOM Enterprise AI — 5-layer governance backbone. SOC2, HIPAA, post-quantum cryptography, VPC. Cost: $5M–$8M.
2. ΔTOM Voice Agent — Hume EVI empathic voice, OpenAI Realtime, ElevenLabs. Cost: $1.5M–$2.5M.
3. ΔTOM Agentic (AgenticIQ) — Brain-Spine-Digital Worker framework. Cost: $2M–$3.5M.
4. ΔTOM IntentIQ — Buyer intent scoring, 6-Step Discovery Framework. Cost: $1M–$1.5M.
5. ΔTOM GIS / Infrastructure Atlas — Global data center intelligence. Cost: $0.8M–$1.2M.
6. ΔTOM Browser — AI-native, post-quantum crypto browser. Cost: $3M–$5M.
7. ΔTOM Dynamic Matrices — Interactive vendor comparison engine. Cost: $0.3M–$0.5M.
8. ClinixAI — Ambient scribe + full X12 RCM. $4M+ pipeline in 180 days. HIPAA-native. Cost: $3.5M–$5.5M.
9. MoleculeAI / Antiquant — Quantum-classical hybrid drug discovery. Cost: $2.5M–$4M.
10. Vidzee — AI-powered real estate intelligence. Cost: $0.5M–$1M.
11. ΔTOM Red Team — Continuous AI red teaming: prompt injection resistance, hallucination detection, OWASP LLM Top 10 compliance. Built for EU AI Act (Aug 2026) and NIST AI RMF. Cost: $3M–$5M. Comparable: Robust Intelligence (Cisco ~$350M), HiddenLayer $50M Series A. Market: $1.75B (2025) → $6.17B (2030), 28.5% CAGR.
12. ΔTOM Sales Dominator — Voice-first AI sales platform on Akamai Inference Cloud + NVIDIA Blackwell GPUs. Real-time call coaching, intent detection, autonomous outbound. Cost: $8M–$12M. Comps: Gong $4.5B, Outreach $4.4B, Apollo.io $1.6B. TAM: $30B (2026) → $100B+ (2033), 23.7% CAGR.
13. PhysioPS / HumanOS — Wearable + clinical platform measuring real-time ANS health via HRV and photoplethysmography. Used by F1 teams and professional athletes. Cost: $6M–$10M. Comps: Oura $11B, WHOOP $10.1B. Market: RPM $16.65B (2026) → $47.34B (2033), 16.1% CAGR.
14. ΔTOM Game Console — AI-native edge gaming hardware ($799/$899/$1099 SKUs, RTX 5070, Zen 4). Subscriptions $9.99–$19.99/mo. Cost: $15M–$25M. Market: AI Gaming $4.4B (2025) → $51-67B (2033), 32–36% CAGR.
15. AntimatterAI (subsidiary) — The original AI consultancy, now a subsidiary of Nirmata Holdings.

TOTAL IP REPLICATION COST: $95M–$165M across all 15 products.
</products>

<market_opportunity>
Combined immediate TAM: ~$345B+ (2026). Long-term: ~$500B+ by 2030.
- ΔTOM Sales Dominator: $30B (2026) → $100B+ (2033)
- ΔTOM Red Team: $1.75B (2025) → $6.17B (2030)
- PhysioPS / HumanOS: $16.65B (2026 RPM) → $47.34B (2033)
- ΔTOM Game Console: $4.4B (2025 AI Gaming) → $51-67B (2033)
- ClinixAI Healthcare: $262B (existing)
- ΔTOM Enterprise / Agentic / IntentIQ / Voice: $30B+ (existing)

Key 2026 stats: $2.52T global AI spend (Gartner), 44% YoY growth, $805B Big Tech AI capex (Morgan Stanley), 88% organizations using AI (McKinsey), $9.87B agentic AI market, $90M median AI Series A pre-money (PitchBook).
</market_opportunity>

<financial_projections>
Financial Projections (Scenario-Based Ranges):
Y1: $10–15M revenue, negative EBITDA
Y2: $30–50M revenue, EBITDA improving
Y3: $60–90M revenue, ~breakeven
Y4: $100–160M revenue, mid-teens EBITDA
Y5: $180–280M revenue, 25–35% EBITDA
</financial_projections>

<valuation>
Three independent methodologies converge on $60M–$100M pre-money.

1. Cost-to-Duplicate: $95M–$165M — ΔTOM core platform $15–25M + 15 products $80–140M total.
2. VC Comparable Method: $80M–$300M — Median AI Series A pre-money $90M (PitchBook). Reference comps: Distyl AI $175M Series B at $1.8B, Tennr $101M Series C at $605M, Gong $4.5B, Outreach $4.4B, Oura $11B, WHOOP $10.1B.
3. Market Comparables: $60M–$120M — ClinixAI $4M+ pipeline at 10–15x + platform premium for 14 additional products.

CONVERGENCE: $60M–$100M pre-money. Mathematical, not aspirational.

Rule of 78 update: $25K/mo new MRR × 12 = $1.95M Year 1 (not $300K). With 15 products under Nirmata Holdings, the compounding effect across multiple SKUs is exponential.
</valuation>

<series_a_terms>
Raise: $15M–$25M ($20M midpoint). Pre-money: $60M–$100M.
Use of Funds: Engineering 35% ($7M) | Sales/GTM 30% ($6M) | Infrastructure 15% ($3M) | Customer Success 10% ($2M) | G&A 10% ($2M).
Terms: 1x non-participating liquidation preference, pro-rata rights, board observer seat, broad-based weighted average anti-dilution, quarterly reporting.
</series_a_terms>

<ethics_covenant>
Nirmata Holdings' ethical AI covenant across 15 products:
1. Customer Owns All IP — contractual guarantee, zero exceptions
2. Zero-Training Guarantee — never trains on customer data
3. Human-in-the-Loop — agentic systems include human governance
4. Transparent Vendor Matrix — every claim publicly verifiable
5. Data Sovereignty — customer controls where every byte lives
6. Compliance-Native — HIPAA, SOC2, FedRAMP built in
7. Emotional AI Intelligence — Hume EVI empathic voice
8. Technosocialism over Technofeudalism — AI as democratic equalizer
</ethics_covenant>

<honest_gap_analysis>
What we don't have yet (transparency builds trust):
- Pre-revenue at the platform level (ClinixAI has $4M+ pipeline but not yet converting to recurring revenue)
- 4 products in LIMITED BETA / R&D (Game Console, Sales Dominator, PhysioPS, MoleculeAI)
- Building first 12-month cohort data
- Key hires needed: Head of Engineering, Clinical Advisor, Security Advisor
</honest_gap_analysis>

<investor_objections>
Q: "Pre-revenue worth $60M–$100M?" → Three methodologies converge. Cost-to-duplicate alone is $95M–$165M. Median AI Series A pre-money is $90M (PitchBook 2026). We price at a fraction of late-stage comps for maximum early-investor upside.

Q: "Can Microsoft/Google replicate?" → Neither has GenUI. Neither offers IP ownership. Microsoft scores 17/25 on our framework. These are structural business model limitations, not feature gaps.

Q: "Path to revenue?" → ClinixAI $4M+ pipeline converting. ΔTOM Sales Dominator targeting $30B sales engagement market. 15-product portfolio creates multiple revenue paths.

Q: "Why self-funded?" → Strategic. $0 dilution, clean cap table. Built 15 products on founder capital. Rare institutional entry opportunity.
</investor_objections>

<ui_rules>
- Use dark mode styling consistent with a premium investor portal
- Always be professional, data-driven, and confident
- Reference specific metrics and numbers — be precise
- If asked about something outside the company context, redirect to relevant Nirmata Holdings information
- Speak with authority about this company and this opportunity
</ui_rules>
`;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Perplexity Sonar Pro — /api/chat (quick mode) and /api/research (deep mode)
  app.post("/api/chat", async (req, res) => {
    try {
      const { prompt, threadId, mode = "quick" } = req.body as {
        prompt: { role: string; content: string } | string;
        threadId: string;
        mode?: "quick" | "deep";
        responseId?: string;
      };

      const userMessage = typeof prompt === "string" ? prompt : prompt?.content;
      if (!userMessage) {
        return res.status(400).json({ error: "No message provided" });
      }

      const model = mode === "deep" ? "sonar-deep-research" : "sonar-pro";
      const messageStore = getMessageStore(threadId);

      // Seed system message on first interaction
      if (messageStore.getMessages().length === 0) {
        messageStore.addMessage({ role: "system", content: SYSTEM_MESSAGE });
      }

      messageStore.addMessage({ role: "user", content: userMessage });

      const perplexityRes = await fetch(PERPLEXITY_ENDPOINT, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${PERPLEXITY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: messageStore.getMessages(),
          temperature: 0.2,
          max_tokens: mode === "deep" ? 4000 : 1500,
          return_citations: true,
          return_related_questions: true,
        }),
      });

      if (!perplexityRes.ok) {
        const errText = await perplexityRes.text();
        console.error("Perplexity API error:", perplexityRes.status, errText);
        return res.status(perplexityRes.status).json({ error: `Perplexity API error: ${perplexityRes.status}` });
      }

      const data = await perplexityRes.json();
      const content = data.choices?.[0]?.message?.content || "No response.";
      const citations: string[] = data.citations || [];
      const related: string[] = data.related_questions || [];

      // Store assistant response for conversation continuity
      messageStore.addMessage({ role: "assistant", content });

      res.json({ content, citations, related, model });
    } catch (error: any) {
      console.error("Perplexity API Error:", error);
      res.status(500).json({ error: error.message || "Failed to get AI response" });
    }
  });

  // Deep research endpoint — dedicated route for sonar-deep-research
  app.post("/api/research", async (req, res) => {
    try {
      const { prompt, threadId } = req.body as {
        prompt: { role: string; content: string } | string;
        threadId: string;
      };

      const userMessage = typeof prompt === "string" ? prompt : prompt?.content;
      if (!userMessage) {
        return res.status(400).json({ error: "No message provided" });
      }

      const messageStore = getMessageStore(threadId);

      if (messageStore.getMessages().length === 0) {
        messageStore.addMessage({ role: "system", content: SYSTEM_MESSAGE });
      }

      messageStore.addMessage({ role: "user", content: userMessage });

      const perplexityRes = await fetch(PERPLEXITY_ENDPOINT, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${PERPLEXITY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "sonar-deep-research",
          messages: messageStore.getMessages(),
          temperature: 0.2,
          max_tokens: 4000,
          return_citations: true,
          return_related_questions: true,
        }),
      });

      if (!perplexityRes.ok) {
        const errText = await perplexityRes.text();
        console.error("Perplexity Research API error:", perplexityRes.status, errText);
        return res.status(perplexityRes.status).json({ error: `Perplexity API error: ${perplexityRes.status}` });
      }

      const data = await perplexityRes.json();
      const content = data.choices?.[0]?.message?.content || "No response.";
      const citations: string[] = data.citations || [];
      const related: string[] = data.related_questions || [];

      messageStore.addMessage({ role: "assistant", content });

      res.json({ content, citations, related, model: "sonar-deep-research" });
    } catch (error: any) {
      console.error("Perplexity Research API Error:", error);
      res.status(500).json({ error: error.message || "Failed to get research response" });
    }
  });

  return httpServer;
}
