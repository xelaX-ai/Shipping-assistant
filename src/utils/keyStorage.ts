const STORAGE_KEY = "gemini_api_keys";
const ACTIVE_KEY_INDEX = "gemini_active_key_index";
const SLOTS = 5;

export interface KeySlot {
  label: string;
  key: string;
}

export function getDefaultSlots(): KeySlot[] {
  return Array.from({ length: SLOTS }, (_, i) => ({
    label: `Акаунт ${i + 1}`,
    key: "",
  }));
}

export function loadSlots(): KeySlot[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultSlots();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === SLOTS) return parsed;
    return getDefaultSlots();
  } catch {
    return getDefaultSlots();
  }
}

export function saveSlots(slots: KeySlot[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
}

export function loadActiveIndex(): number {
  try {
    const raw = localStorage.getItem(ACTIVE_KEY_INDEX);
    if (raw === null) return 0;
    const idx = parseInt(raw, 10);
    return isNaN(idx) ? 0 : idx;
  } catch {
    return 0;
  }
}

export function saveActiveIndex(index: number): void {
  localStorage.setItem(ACTIVE_KEY_INDEX, String(index));
}

export function getActiveKey(): string {
  const slots = loadSlots();
  const idx = loadActiveIndex();
  return slots[idx]?.key ?? "";
}
