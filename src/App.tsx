import React from "react";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { ChatArea } from "./components/chat/ChatArea";
import { useSwipeable } from 'react-swipeable';
import { useChat } from "./hooks/useChat";

export default function App() {
  const {
    conversations, active, activeId, status,
    sidebarOpen, sidebarCollapsed, activeContext,
    setActiveId, setSidebarOpen, setSidebarCollapsed,
    sendMessage, newConversation, deleteConversation, shareConversation, uploadFiles,
  } = useChat();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setSidebarOpen(false),
    onSwipedRight: () => setSidebarOpen(true),
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  return (
    <div {...swipeHandlers} className="h-[100dvh] w-screen overflow-hidden relative" style={{ background: "#0e1117" }}>
      {/* Single subtle gradient — no continuous animations */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,240,255,0.04) 0%, transparent 60%)"
      }} />

      {/* App layout — zero decorative borders, zero particles */}
      <div className="relative z-10 flex flex-col h-full">
        <Header status={status} />
        <div className="flex flex-1 min-h-0 relative">
          <Sidebar
            conversations={conversations.map(c => ({ id: c.id, title: c.title, count: c.messages.length }))}
            activeId={activeId}
            onSelect={setActiveId}
            onNew={newConversation}
            onDelete={deleteConversation}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(p => !p)}
          />
          <ChatArea
            messages={active.messages}
            status={status}
            contextActive={!!activeContext}
            onSend={sendMessage}
            onUpload={uploadFiles}
            onShare={shareConversation}
            onToggleSidebar={() => setSidebarOpen(true)}
          />
        </div>
      </div>

      {/* Lean global styles — no heavy imports, no continuous keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        :root {
          --font-ui: 'Inter', -apple-system, system-ui, sans-serif;
          --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
          --cyan: #00F0FF;
          --purple: #B026FF;
          --purple-glow: rgba(176, 38, 255, 0.4);
          --cyan-glow: rgba(0, 240, 255, 0.4);
          --bg-panel: #0a0c10;
          --bg-surface: #0e1117;
          --bg-panel: rgba(14, 17, 23, 0.95);
          --bg-surface: rgba(22, 27, 34, 0.9);
          --border: rgba(255,255,255,0.06);
          --text-primary: #E6EDF3;
          --text-secondary: #8B949E;
          --text-muted: #484F58;
        }

        * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
        html, body {
          -webkit-text-size-adjust: 100%;
          overscroll-behavior-y: none;
          font-family: var(--font-ui);
        }
        input, button, textarea { touch-action: manipulation; font-family: var(--font-ui); }
        textarea { -webkit-user-select: text; user-select: text; }
        textarea:focus { outline: none; }
        * { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.08) transparent; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
        input::placeholder, textarea::placeholder { color: var(--text-muted) !important; }

        /* Only functional keyframes — no continuous loops */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes messageIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseGlow { 0%, 100% { opacity: 0.8; text-shadow: 0 0 10px var(--cyan-glow); } 50% { opacity: 1; text-shadow: 0 0 20px var(--cyan-glow); } }
        @keyframes typingBounce { 0%,100% { transform: translateY(0) scale(0.7); opacity: 0.3; } 50% { transform: translateY(-4px) scale(1); opacity: 1; } }

        @supports (height: 100dvh) { .h-\\[100dvh\\] { height: 100dvh; } }
      `}</style>
    </div>
  );
}