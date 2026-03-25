export interface ManualSection {
  id: string;
  title: string;
  content: string;
  emoji: string;
  tips?: string[];
}

export interface Manual {
  id: string;
  carrier: string;
  color: string;
  accentColor: string;
  logoEmoji: string;
  sections: ManualSection[];
}
