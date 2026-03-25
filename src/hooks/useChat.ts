// ═══ DRAGZONE — MVC Controller Layer ═══
import { useState, useCallback } from "react";
import type { Message, Conversation, ChatStatus, Attachment } from "../types/chat";

let _counter = 0;
export function uid() {
  return `dz-${++_counter}-${Date.now().toString(36)}`;
}

const INITIAL_CONVS: Conversation[] = [
  { id: "c1", title: "System Initialization", messages: [], createdAt: new Date() },
  {
    id: "c2", title: "Dragon Protocol α-7", createdAt: new Date(Date.now() - 300000),
    messages: [{ id: "m0", role: "assistant", content: "DragZone Cloud Engine initialized. All subsystems nominal. Awaiting operator input.", timestamp: new Date(Date.now() - 300000) }],
  },
];

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVS);
  const [activeId, setActiveId] = useState("c1");
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Accumulated context from uploaded files (PDFs, Images, Code)
  const [activeContext, setActiveContext] = useState<string>("");

  const active = conversations.find((c) => c.id === activeId) || conversations[0];

  const uploadFiles = useCallback(async (files: FileList) => {
    setStatus("connecting");
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append("files", f));

    try {
      const res = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        // Append new context to existing one
        setActiveContext(prev => prev + "\n" + data.context);
        setStatus("idle");
        return true;
      }
    } catch (e) {
      console.error("Upload failed", e);
    }
    setStatus("idle");
    return false;
  }, []);

  const sendMessage = useCallback(async (text: string, attachments?: Attachment[]) => {
    const userMsg: Message = {
      id: uid(), role: "user", content: text, timestamp: new Date(),
      attachments: attachments?.length ? attachments : undefined,
    };

    // 1. Update UI with user message
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

    // 2. Setup Assistant Placeholder
    const botMsgId = uid();
    const botMsg: Message = {
      id: botMsgId, role: "assistant",
      content: "",
      timestamp: new Date(),
    };
    
    setConversations((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, messages: [...c.messages, botMsg] } : c))
    );

    try {
      // 3. POST to Engine Backend
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...active.messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          context: activeContext,
        }),
      });

      if (!response.body) throw new Error("No response body");
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedContent = "";

      // 4. Stream response chunk-by-chunk
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        streamedContent += chunk;

        setConversations((prev) =>
          prev.map((c) =>
            c.id === activeId
              ? {
                  ...c,
                  messages: c.messages.map(m => m.id === botMsgId ? { ...m, content: streamedContent } : m),
                }
              : c
          )
        );
      }
      
      // Clear context after successful transmission
      setActiveContext("");
      setStatus("idle");
    } catch (e) {
      console.error("Chat error:", e);
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? {
                ...c,
                messages: c.messages.map(m => m.id === botMsgId ? { ...m, content: "ERROR: Lost connection to Cyber Dragon engine." } : m),
              }
            : c
        )
      );
      setStatus("idle");
    }
  }, [activeId, active.messages, activeContext]);

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
    sidebarOpen, sidebarCollapsed, activeContext,
    setActiveId, setSidebarOpen, setSidebarCollapsed,
    sendMessage, newConversation, deleteConversation, shareConversation, uploadFiles,
  };
}
