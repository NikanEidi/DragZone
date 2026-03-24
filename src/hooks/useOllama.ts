// ═══ DRAGZONE — Ollama Integration Stub ═══
// Replace mock with real Ollama calls when ready.

import { useState, useCallback } from "react";
import type { OllamaConfig } from "../types/chat";

const DEFAULT_CONFIG: OllamaConfig = {
  baseUrl: "http://localhost:11434",
  model: "llama3",
  temperature: 0.7,
  maxTokens: 2048,
};

export function useOllama() {
  const [config, setConfig] = useState<OllamaConfig>(DEFAULT_CONFIG);
  const [connected, setConnected] = useState(false);

  const testConnection = useCallback(async () => {
    try {
      // TODO: Uncomment when Ollama is running
      // const res = await fetch(`${config.baseUrl}/api/tags`);
      // if (res.ok) { setConnected(true); return true; }
      setConnected(false);
      return false;
    } catch {
      setConnected(false);
      return false;
    }
  }, [config.baseUrl]);

  const generate = useCallback(async (prompt: string): Promise<string> => {
    // TODO: Replace with real Ollama streaming
    // const res = await fetch(`${config.baseUrl}/api/generate`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ model: config.model, prompt, options: { temperature: config.temperature, num_predict: config.maxTokens } }),
    // });
    // const data = await res.json();
    // return data.response;
    return "Ollama integration ready. Connect your local instance to begin.";
  }, [config]);

  return { config, setConfig, connected, testConnection, generate };
}
