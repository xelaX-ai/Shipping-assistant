import Constants from "expo-constants";
import { buildManualContext, SYSTEM_PROMPT } from "../data/manuals";

const API_KEY = Constants.expoConfig?.extra?.GEMINI_API_KEY;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export async function askGemini(
  question: string,
  history: Message[]
): Promise<string> {
  if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
    return "⚠️ API ключ не налаштовано.\n\nОтримати безкоштовно: https://console.groq.com";
  }

  const manualContext = buildManualContext();
  const systemInstruction = `${SYSTEM_PROMPT}\n\nМАНУАЛИ КОМПАНІЇ:\n${manualContext}`;

  const recentHistory = history
    .filter((msg) => msg.id !== "welcome")
    .slice(-20);

  const messages = [
    { role: "system", content: systemInstruction },
    ...recentHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    { role: "user", content: question },
  ];

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.1,
        max_tokens: 4096,
        top_p: 0.8,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Groq API error:", error);
      return `Помилка API: ${error.error?.message || "Невідома помилка"}`;
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      return "Не вдалося отримати відповідь. Спробуйте ще раз.";
    }

    return text;
  } catch (error) {
    console.error("Network error:", error);
    return "Помилка мережі. Перевірте підключення до інтернету.";
  }
}
