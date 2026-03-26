import { buildManualContext, SYSTEM_PROMPT } from "../data/manuals";
import { getActiveKey } from "../utils/keyStorage";

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

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
  const API_KEY = getActiveKey();

  if (!API_KEY) {
    return "⚠️ API ключ не налаштовано.\n\nНатисни ⚙️ в правому верхньому куті та введи Gemini API ключ.\n\nОтримати безкоштовно: https://aistudio.google.com/app/apikey";
  }

  const manualContext = buildManualContext();
  const systemInstruction = `${SYSTEM_PROMPT}\n\nМАНУАЛИ КОМПАНІЇ:\n${manualContext}`;

  const recentHistory = history
    .filter((msg) => msg.id !== "welcome")
    .slice(-20);

  const historyContents = recentHistory.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  while (historyContents.length > 0 && historyContents[0].role === "model") {
    historyContents.shift();
  }

  const contents = [
    ...historyContents,
    { role: "user", parts: [{ text: question }] },
  ];

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemInstruction }] },
        contents,
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 8192,
          topP: 0.8,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Gemini API error:", error);
      return `Помилка API: ${error.error?.message || "Невідома помилка"}`;
    }

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts;

    if (!parts || parts.length === 0) {
      return "Не вдалося отримати відповідь. Спробуйте ще раз.";
    }

    const fullText = parts
      .map((item: { text?: string }) => item.text || "")
      .filter(Boolean)
      .join("\n");

    return fullText || "Не вдалося отримати відповідь. Спробуйте ще раз.";
  } catch (error) {
    console.error("Network error:", error);
    return "Помилка мережі. Перевірте підключення до інтернету.";
  }
}
