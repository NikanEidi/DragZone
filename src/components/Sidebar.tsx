import React, { useState } from "react";
import { Plus, MessageSquare, Trash2, ChevronLeft, Database, Clock, Zap } from "lucide-react";
import { GlassFrame } from "./GlassFrame";

interface SidebarProps {
  conversations: { id: string; title: string; count: number }[];
  activeId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ conversations, activeId, onSelect, onNew, onDelete, open, onClose }: SidebarProps) {
  const [hovId, setHovId] = useState<string | null>(null);
  const [newHov, setNewHov] = useState(false);

  return (
    <>
      {open && <div className="fixed inset-0 z-40 md:hidden" style={{ background: "rgba(3,2,8,0.88)", backdropFilter: "blur(6px)" }} onClick={onClose} />}
      <aside className={`
        fixed md:relative z-50 md:z-auto top-0 left-0 h-full
        w-[clamp(260px,28vw,300px)] flex flex-col shrink-0
        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${open ? "translate-x-0 opacity-100" : "-translate-x-full md:translate-x-0 md:opacity-100 opacity-0"}
      `}>
        <div className="h-full p-[clamp(6px,0.8vw,12px)]">
          <GlassFrame className="h-full flex flex-col">
            <div className="flex flex-col h-full px-[clamp(14px,1.8vw,22px)] py-[clamp(14px,1.8vw,20px)]">
              {/* Header */}
              <div className="flex items-center justify-between mb-[clamp(14px,2vw,22px)]">
                <div className="flex items-center gap-[clamp(6px,0.8vw,10px)]">
                  <div className="p-[6px] rounded-[10px]" style={{ background: "rgba(160,32,240,0.08)", border: "1px solid rgba(160,32,240,0.12)" }}>
                    <Database size={13} style={{ color: "#A020F0", filter: "drop-shadow(0 0 4px #A020F0)" }} />
                  </div>
                  <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(9px,1.1vw,11px)", letterSpacing: "3px", color: "#B050FF", textShadow: "0 0 12px rgba(160,32,240,0.35)" }}>
                    ARCHIVES
                  </span>
                </div>
                <button onClick={onClose} className="md:hidden p-2 rounded-xl active:scale-90 transition-all" style={{ color: "#555", touchAction: "manipulation" }}>
                  <ChevronLeft size={16} />
                </button>
              </div>

              {/* New Chat Button */}
              <button
                onClick={onNew}
                onMouseEnter={() => setNewHov(true)}
                onMouseLeave={() => setNewHov(false)}
                className="group flex items-center justify-center gap-[clamp(8px,1vw,12px)] w-full py-[clamp(12px,1.5vw,16px)] rounded-[14px] mb-[clamp(14px,1.8vw,20px)] transition-all duration-500 active:scale-[0.96]"
                style={{
                  background: newHov ? "linear-gradient(135deg, rgba(160,32,240,0.14), rgba(0,243,255,0.06))" : "rgba(160,32,240,0.04)",
                  border: `1.5px solid ${newHov ? "rgba(160,32,240,0.35)" : "rgba(160,32,240,0.08)"}`,
                  boxShadow: newHov ? "0 0 25px rgba(160,32,240,0.1), inset 0 1px 0 rgba(255,255,255,0.03)" : "inset 0 1px 0 rgba(255,255,255,0.02)",
                  touchAction: "manipulation",
                }}
              >
                <div className="p-1.5 rounded-[8px] transition-all duration-300" style={{
                  background: newHov ? "rgba(0,243,255,0.12)" : "rgba(0,243,255,0.04)",
                  border: `1px solid ${newHov ? "rgba(0,243,255,0.2)" : "rgba(0,243,255,0.06)"}`,
                }}>
                  <Plus size={13} style={{ color: newHov ? "#00F3FF" : "#335", filter: newHov ? "drop-shadow(0 0 4px #00F3FF)" : "none", transition: "all 0.3s" }} />
                </div>
                <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "clamp(12px,1.3vw,14px)", color: newHov ? "#ddd" : "#555", letterSpacing: "2.5px", transition: "color 0.3s" }}>
                  NEW SESSION
                </span>
              </button>

              {/* Section label */}
              <div className="flex items-center gap-2 mb-[clamp(8px,1vw,12px)] px-1">
                <Clock size={9} style={{ color: "#2a2a3a" }} />
                <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "9px", color: "#2a2a3a", letterSpacing: "2px" }}>RECENT</span>
                <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(90deg, rgba(160,32,240,0.08), transparent)" }} />
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto space-y-[clamp(3px,0.4vw,5px)] pr-1 overscroll-contain" style={{ WebkitOverflowScrolling: "touch" }}>
                {conversations.map((c, idx) => {
                  const isA = c.id === activeId;
                  const isH = hovId === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => { onSelect(c.id); onClose(); }}
                      onMouseEnter={() => setHovId(c.id)}
                      onMouseLeave={() => setHovId(null)}
                      className="group flex items-center gap-[clamp(8px,1vw,12px)] px-[clamp(10px,1.2vw,14px)] py-[clamp(10px,1.2vw,14px)] rounded-[12px] cursor-pointer transition-all duration-300 active:scale-[0.97]"
                      style={{
                        background: isA ? "linear-gradient(135deg, rgba(160,32,240,0.1), rgba(160,32,240,0.04))" : isH ? "rgba(255,255,255,0.015)" : "transparent",
                        border: isA ? "1px solid rgba(160,32,240,0.18)" : "1px solid transparent",
                        boxShadow: isA ? "0 0 20px rgba(160,32,240,0.05), inset 0 0 15px rgba(160,32,240,0.03)" : "none",
                        touchAction: "manipulation",
                        animation: `fadeSlideIn 0.35s ease-out ${idx * 0.04}s both`,
                      }}
                    >
                      {/* Icon */}
                      <div className="w-[clamp(28px,3.2vw,34px)] h-[clamp(28px,3.2vw,34px)] rounded-[10px] flex items-center justify-center shrink-0 transition-all duration-300" style={{
                        background: isA ? "rgba(160,32,240,0.12)" : "rgba(255,255,255,0.015)",
                        border: `1px solid ${isA ? "rgba(160,32,240,0.2)" : "rgba(255,255,255,0.02)"}`,
                        boxShadow: isA ? "0 0 10px rgba(160,32,240,0.08)" : "none",
                      }}>
                        <MessageSquare size={12} style={{ color: isA ? "#B050FF" : "#2a2a3a", filter: isA ? "drop-shadow(0 0 3px #A020F0)" : "none", transition: "all 0.3s" }} />
                      </div>
                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="truncate" style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "clamp(12px,1.3vw,14px)", color: isA ? "#d8d0e8" : isH ? "#888" : "#555", transition: "color 0.3s" }}>
                          {c.title}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Zap size={7} style={{ color: isA ? "#A020F0" : "#1a1a2a" }} />
                          <span style={{ fontFamily: "monospace", fontSize: "9px", color: isA ? "#5a4a6a" : "#1a1a2a" }}>{c.count} messages</span>
                        </div>
                      </div>
                      {/* Delete */}
                      <button
                        onClick={(e) => { e.stopPropagation(); onDelete(c.id); }}
                        className="opacity-0 group-hover:opacity-100 p-[clamp(4px,0.5vw,7px)] rounded-[8px] transition-all duration-300 hover:bg-red-500/10 active:scale-90"
                        style={{ color: "#3a3a4a", touchAction: "manipulation" }}
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="pt-[clamp(10px,1.2vw,16px)] mt-[clamp(8px,1vw,12px)]" style={{ borderTop: "1px solid rgba(160,32,240,0.05)" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-[7px] h-[7px] rounded-full" style={{ background: "#00F3FF", boxShadow: "0 0 6px #00F3FF, 0 0 12px rgba(0,243,255,0.3)" }} />
                      <div className="absolute inset-0 rounded-full animate-[pingOut_2s_ease-out_infinite]" style={{ background: "#00F3FF" }} />
                    </div>
                    <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "10px", color: "#2a2a3a", letterSpacing: "2px" }}>SYSTEM ACTIVE</span>
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: "8px", color: "#1a1a2a" }}>v3.2.1</span>
                </div>
                {/* Activity bars */}
                <div className="flex items-end gap-[2px] h-[14px] mt-2">
                  {[0.3, 0.6, 0.9, 0.4, 0.8, 0.5, 0.7, 0.3, 0.9, 0.6, 0.4, 0.8].map((v, i) => (
                    <div key={i} className="flex-1 rounded-sm animate-[barPulse_2.5s_ease-in-out_infinite]" style={{
                      height: `${v * 100}%`,
                      background: `linear-gradient(to top, rgba(160,32,240,${0.08 + v * 0.12}), rgba(0,243,255,${0.04 + v * 0.06}))`,
                      animationDelay: `${i * 0.12}s`,
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </GlassFrame>
        </div>
      </aside>
    </>
  );
}
