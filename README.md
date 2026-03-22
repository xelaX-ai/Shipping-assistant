# 📦 Shipping Assistant

AI-асистент для відправки посилок (Нова Пошта + DHL Express).

---

## 🚀 Запуск (дома, в Cursor)

### Крок 1 — Встановіть інструменти

```bash
# Встановіть Node.js якщо немає: https://nodejs.org
# Перевірте:
node -v   # має бути 18+
npm -v
```

### Крок 2 — Отримайте Gemini API ключ (безкоштовно)

1. Відкрийте https://aistudio.google.com/app/apikey
2. Натисніть "Create API key"
3. Скопіюйте ключ

### Крок 3 — Вставте ключ в проект

Відкрийте файл `app.config.ts` і замініть:
```
GEMINI_API_KEY: "YOUR_GEMINI_API_KEY_HERE"
```
на ваш ключ:
```
GEMINI_API_KEY: "AIzaSy..."
```

### Крок 4 — Встановіть залежності та запустіть

```bash
cd shipping-assistant
npm install
npx expo start
```

Відкриється QR-код. Скануйте телефоном через додаток **Expo Go** (встановіть з Play Store).

---

## 📱 Збірка APK (для установки без Expo Go)

### Спосіб А — Через Expo EAS (хмарна збірка, рекомендую)

```bash
# 1. Встановіть EAS CLI
npm install -g eas-cli

# 2. Увійдіть в акаунт Expo (зареєструйтесь на expo.dev)
eas login

# 3. Зберіть APK (зайде ~10 хвилин, збирається в хмарі)
eas build -p android --profile preview

# 4. Скачайте APK за посиланням, яке видасть команда
```

### Спосіб Б — Локальна збірка (потрібен Android Studio)

```bash
npx expo run:android
```

---

## 🗂 Структура проекту

```
shipping-assistant/
├── app/                    # Екрани (expo-router)
│   ├── _layout.tsx         # Навігація + таби
│   ├── index.tsx           # Чат з асистентом
│   └── manuals.tsx         # Перегляд мануалів
├── src/
│   ├── data/
│   │   └── manuals.ts      # ← Ваші мануали тут (редагуйте!)
│   ├── screens/
│   │   ├── ChatScreen.tsx  # UI чату
│   │   └── ManualsScreen.tsx # UI мануалів
│   └── services/
│       └── gemini.ts       # Gemini API
├── app.config.ts           # ← API ключ тут
└── eas.json                # Конфіг збірки APK
```

---

## ✏️ Як додати свій мануал

Відкрийте `src/data/manuals.ts` і додайте новий об'єкт в масив `MANUALS`:

```typescript
{
  id: "fedex",
  carrier: "FedEx",
  color: "#4D148C",
  accentColor: "#FF6200",
  logoEmoji: "🟣",
  sections: [
    {
      id: "fedex_packaging",
      title: "Упаковка",
      emoji: "📦",
      content: `Ваш текст мануалу тут...`,
      tips: ["Порада 1", "Порада 2"]
    }
  ]
}
```

---

## 🔒 Безпека

- API ключ Gemini зберігається локально в `app.config.ts`
- Мануали не містять особистих даних, паролів або акаунтів
- Gemini отримує тільки текст мануалів + питання користувача
- Для production: перенесіть API ключ в змінні середовища `.env`

---

## 🛠 Якщо щось не працює

**"Cannot find module"** → запустіть `npm install` ще раз

**"Invalid API key"** → перевірте ключ в `app.config.ts`, немає пробілів?

**Додаток не відкривається на телефоні** → телефон і комп'ютер в одній Wi-Fi мережі?

**Запитайте Claude в Cursor** — просто опишіть помилку, він виправить.
