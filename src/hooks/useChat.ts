// ═══ DRAGZONE — MVC Controller Layer ═══
import { useState, useCallback } from "react";
import type { Message, Conversation, ChatStatus, Attachment } from "../types/chat";

let _counter = 0;
export function uid() {
  return `dz-${++_counter}-${Date.now().toString(36)}`;
}

const RESPONSES = [
  "Scanning neural pathways through the DragZone quantum lattice. Analysis reveals patterns consistent with advanced computational theory across 12-dimensional probability matrices. Confidence: 99.7%.",
  "The Cloud Engine perceives your query. Protocol Ω-7 activated. Deep scan of knowledge matrix complete — compiled from 47 parallel processing threads with quantum-grade fidelity.",
  "Acknowledged, Operator. Ancient algorithms resonate. The Obsidian Database returns structured insights from 2.4 million indexed nodes with temporal coherence markers.",
  "Neural signature authenticated against the Dragon Codex. Enhanced cognitive subroutines deployed. All firewall layers green. Processing complete.",
  "Fractal analysis engine mapping through six-dimensional probability space. Scale-lattice harmonics aligned. Output crystallized from 10,000 micro-computations.",
  "Dragon matrix pulses with recognition. Cascade protocol Delta-9 triggered. Quantum coherence at 99.97% across all neural bridges. Synthesizing from void-knowledge substrate.",
];

const INITIAL_CONVS: Conversation[] = [
  { id: "c1", title: "System Initialization", messages: [], createdAt: new Date() },
  {
    id: "c2", title: "Dragon Protocol α-7", createdAt: new Date(Date.now() - 300000),
    messages: [{ id: "m0", role: "assistant", content: "DragZone Cloud Engine initialized. All subsystems nominal. Awaiting operator input.", timestamp: new Date(Date.now() - 300000) }],
  },
  { id: "c3", title: "Neural Calibration", messages: [], createdAt: new Date(Date.now() - 600000) },
  { id: "c4", title: "Quantum Bridge Test", messages: [], createdAt: new Date(Date.now() - 900000) },
];

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVS);
  const [activeId, setActiveId] = useState("c1");
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const active = conversations.find((c) => c.id === activeId) || conversations[0];

  const sendMessage = useCallback((text: string, attachments?: Attachment[]) => {
    const userMsg: Message = {
      id: uid(), role: "user", content: text, timestamp: new Date(),
      attachments: attachments?.length ? attachments : undefined,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              title: c.messages.length === 0 ? text.slice(0, 40) + (text.length > 40 ? "…" : "") : c.title,
              messages: [...c.messages, userMsg],
            }
          : c
      )
    );

    setStatus("typing");

    // TODO: Replace with Ollama API call
    // await fetch(`${config.baseUrl}/api/generate`, { method: 'POST', body: JSON.stringify({ model: config.model, prompt: text }) })
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const botMsg: Message = {
        id: uid(), role: "assistant",
        content: RESPONSES[Math.floor(Math.random() * RESPONSES.length)],
        timestamp: new Date(),
      };
      setConversations((prev) =>
        prev.map((c) => (c.id === activeId ? { ...c, messages: [...c.messages, botMsg] } : c))
      );
      setStatus("idle");
    }, delay);
  }, [activeId]);

  const newConversation = useCallback(() => {
    const id = uid();
    setConversations((prev) => [{ id, title: "New Session", messages: [], createdAt: new Date() }, ...prev]);
    setActiveId(id);
    setSidebarOpen(false);
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => {
      const next = prev.filter((c) => c.id !== id);
      if (!next.length) {
        const nid = uid();
        setActiveId(nid);
        return [{ id: nid, title: "New Session", messages: [], createdAt: new Date() }];
      }
      if (id === activeId) setActiveId(next[0].id);
      return next;
    });
  }, [activeId]);

  const shareConversation = useCallback(() => {
    const text = active.messages.map((m) => `[${m.role}] ${m.content}`).join("\n\n");
    try {
      if (navigator.share) {
        navigator.share({ title: `DragZone — ${active.title}`, text }).catch(() => {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
    } catch (e) {}
  }, [active]);

  return {
    conversations, active, activeId, status,
    sidebarOpen, sidebarCollapsed,
    setActiveId, setSidebarOpen, setSidebarCollapsed,
    sendMessage, newConversation, deleteConversation, shareConversation,
  };
}
