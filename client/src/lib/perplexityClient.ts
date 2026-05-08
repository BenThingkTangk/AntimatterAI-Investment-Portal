import { ATOM_AI_SYSTEM_MESSAGE } from "./atomAISystemMessage";

const PERPLEXITY_ENDPOINT = "https://api.perplexity.ai/chat/completions";

export interface ChatResponse {
  content: string;
  citations: string[];
  related: string[];
  model: string;
}

export async function askAtomAI(
  userMessage: string,
  mode: "quick" | "deep" = "quick"
): Promise<ChatResponse> {
  const apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY as string | undefined;

  if (!apiKey) {
    throw new Error(
      "ATOM AI is not configured. Please set VITE_PERPLEXITY_API_KEY."
    );
  }

  const model = mode === "deep" ? "sonar-deep-research" : "sonar-pro";
  const maxTokens = mode === "deep" ? 4000 : 1500;

  const response = await fetch(PERPLEXITY_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: ATOM_AI_SYSTEM_MESSAGE },
        { role: "user", content: userMessage },
      ],
      temperature: 0.2,
      max_tokens: maxTokens,
      search_recency_filter: "month",
      return_citations: true,
      return_related_questions: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Perplexity API error ${response.status}: ${errorText.slice(0, 200)}`);
  }

  const data = await response.json();
  return {
    content: data.choices?.[0]?.message?.content || "No response.",
    citations: data.citations || [],
    related: data.related_questions || [],
    model,
  };
}
