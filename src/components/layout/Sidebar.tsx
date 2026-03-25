import React, { useState, useCallback } from "react";
import { Plus, MessageSquare, Trash2, ChevronLeft, ChevronRight, Layers, PanelLeftClose } from "lucide-react";

interface Props {
  conversations: { id: string; title: string; count: number }[];
  activeId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar = React.memo(function Sidebar({ conversations, activeId, onSelect, onNew, onDelete, open, onClose, collapsed, onToggleCollapse }: Props) {
  const [hovId, setHovId] = useState<string | null>(null);

  const handleSelect = useCallback((id: string) => {
    onSelect(id);
    onClose();
  }, [onSelect, onClose]);

  const sidebarWidth = collapsed ? 60 : 260;

  return (
    <>
      {/* Mobile overlay — solid bg, no blur */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={onClose}
        />
      )}

      <aside
        className="fixed md:relative z-50 md:z-auto top-0 left-0 h-full flex flex-col shrink-0 overflow-hidden"
        style={{
          width: sidebarWidth,
          background: "var(--bg-panel, rgba(14,17,23,0.95))",
          borderRight: "1px solid var(--border, rgba(255,255,255,0.06))",
          transform: open ? "translateX(0)" : `translateX(-100%)`,
          transition: "transform 100ms ease-out, width 100ms ease-out",
          willChange: "transform",
        }}
      >
        {/* On md+ screens, sidebar is always visible via relative positioning — override transform */}
        <style>{`
          @media (min-width: 768px) {
            aside { transform: translateX(0) !important; }
          }
        `}</style>

        {/* Header */}
        <div className="flex items-center justify-between px-3 py-3 shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 min-w-0">
            <Layers size={16} style={{ color: "var(--cyan, #00D4E5)", flexShrink: 0 }} />
            {!collapsed && (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "1.5px" }}>
                SESSIONS
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {/* Collapse/Expand — visible on ALL screens including iPad */}
            <button
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={onToggleCollapse}
              className="flex items-center justify-center rounded-md hover:bg-white/5 active:scale-90 min-w-[44px] min-h-[44px]"
              style={{ color: "var(--text-secondary)", transition: "background 100ms" }}
            >
              {collapsed ? <ChevronRight size={16} /> : <PanelLeftClose size={16} />}
            </button>
            {/* Close — mobile only */}
            <button
              title="Close sidebar"
              onClick={onClose}
              className="md:hidden flex items-center justify-center rounded-md hover:bg-red-500/10 active:scale-90 min-w-[44px] min-h-[44px]"
              style={{ color: "#F85149", transition: "background 100ms" }}
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>

        {/* New session */}
        <div className="px-2 py-2 shrink-0">
          <button
            onClick={onNew}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg hover:bg-white/5 active:scale-[0.98]"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              transition: "background 100ms, border-color 100ms",
              minHeight: 44,
            }}
          >
            <Plus size={16} />
            {!collapsed && <span style={{ fontSize: 13, fontWeight: 500 }}>New Chat</span>}
          </button>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto px-2 py-1 overscroll-contain" style={{ WebkitOverflowScrolling: "touch" }}>
          {conversations.map((c) => {
            const isActive = c.id === activeId;
            const isHovered = hovId === c.id;
            return (
              <div
                key={c.id}
                onClick={() => handleSelect(c.id)}
                onMouseEnter={() => setHovId(c.id)}
                onMouseLeave={() => setHovId(null)}
                className="group flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer active:scale-[0.98]"
                style={{
                  background: isActive ? "rgba(0,212,229,0.08)" : isHovered ? "rgba(255,255,255,0.03)" : "transparent",
                  borderLeft: isActive ? "2px solid var(--cyan)" : "2px solid transparent",
                  transition: "background 100ms",
                  minHeight: 40,
                }}
              >
                <MessageSquare size={14} style={{ color: isActive ? "var(--cyan)" : "var(--text-muted)", flexShrink: 0 }} />
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate" style={{ fontSize: 13, fontWeight: isActive ? 500 : 400, color: isActive ? "var(--text-primary)" : "var(--text-secondary)" }}>
                      {c.title}
                    </span>
                    <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{c.count}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); onDelete(c.id); }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-red-500/15 active:scale-90 min-w-[28px] min-h-[28px] flex items-center justify-center"
                      style={{ color: "var(--text-muted)", transition: "opacity 100ms" }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Status bar */}
        {!collapsed && (
          <div className="px-3 py-2 shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--cyan)" }} />
                <span style={{ fontSize: 10, fontWeight: 500, color: "var(--text-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.5px" }}>
                  LOCAL · SECURE
                </span>
              </div>
              <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>v3.0</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
});
