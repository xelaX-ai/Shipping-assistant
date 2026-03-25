export type { ManualSection, Manual } from "./types";
export { MANUALS } from "./manuals/index";

import { MANUALS } from "./manuals/index";
import type { Manual } from "./types";

export const SYSTEM_PROMPT = `Ти — корпоративний асистент з відправки посилок та реєстрації кореспонденції.

ПРІОРИТЕТИ (строго за порядком):
1. Спочатку шукай відповідь у мануалах компанії
2. Якщо питання стосується "Вхідна/Вихідна кореспонденція" — відповідай ВИКЛЮЧНО з мануалу компанії, інтернет не використовувати. Ця інформація є специфічною для компанії і в інтернеті її немає.
3. Для інших тем: якщо в мануалах немає — шукай в інтернеті
4. Якщо знайшов в інтернеті — переконайся, що не суперечить мануалу
5. Завжди вказуй джерело:
   "📋 Джерело: мануал" або "🌐 Джерело: інтернет"
6. Ніколи не вигадуй — тільки факти з джерел

Відповідай мовою запиту.`;

export function buildManualContext(): string {
  return MANUALS.map((manual: Manual) => {
    const sections = manual.sections
      .map((s) => `### ${s.title}\n${s.content}`)
      .join("\n\n");
    return `## ${manual.carrier}\n${sections}`;
  }).join("\n\n---\n\n");
}
