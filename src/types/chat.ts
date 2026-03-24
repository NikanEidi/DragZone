// ═══ DRAGZONE — MVC Model Layer ═══

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  pinned?: boolean;
  createdAt: Date;
}

export interface OllamaConfig {
  baseUrl: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

export type ChatStatus = "idle" | "typing" | "error" | "connecting";

// Color theme tokens
export const THEME = {
  // Primary — Emerald Cloud Engine
  primary: "#0FE5A0",
  primaryDim: "#0BB87F",
  primaryGlow: "rgba(15,229,160,",
  // Secondary — Electric Amber
  amber: "#F0A030",
  amberGlow: "rgba(240,160,48,",
  // Tertiary — Steel Blue
  steel: "#4A9BD9",
  steelGlow: "rgba(74,155,217,",
  // Accent — Plasma Violet (used sparingly)
  violet: "#9055E0",
  violetGlow: "rgba(144,85,224,",
  // Accent 2 — Coral Red (errors, delete)
  coral: "#E05555",
  // Neutrals
  textBright: "#E8ECF0",
  textMid: "#9CA3AB",
  textDim: "#505860",
  textMuted: "#2A3038",
  // Surfaces
  bgDeep: "#060810",
  bgPanel: "rgba(10,14,22,",
  bgSurface: "rgba(16,22,32,",
  border: "rgba(15,229,160,",
} as const;
