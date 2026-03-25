import React, { useState } from "react";
import { Plus, MessageSquare, Trash2, ChevronLeft, ChevronRight, Database, Clock, Zap, PanelLeftClose } from "lucide-react";
import dragonDrag from "../../assets/dragon-drag.svg";

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

export function Sidebar({ conversations, activeId, onSelect, onNew, onDelete, open, onClose, collapsed, onToggleCollapse }: Props) {
  const [hovId, setHovId] = useState<string | null>(null);
  const [newHov, setNewHov] = useState(false);

  // Optimized transition for NO LAG
  return (
    <>
      {open && <div className="fixed inset-0 z-40 md:hidden transition-opacity duration-300" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }} onClick={onClose} />}
      <aside className={`
        fixed md:relative z-50 md:z-auto top-0 left-0 h-full
        flex flex-col shrink-0 transition-all duration-300 cubic-bezier(0.2, 1, 0.3, 1)
        liquid-glass overflow-hidden
        ${collapsed ? "w-[80px]" : "w-[clamp(280px,28vw,350px)]"}
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      style={{ willChange: 'width, transform' }}>
        
        {/* ═══ DRAGON SKIN LAYERS — MAXIMUM IMPACT ═══ */}
        {/* Layer 1: Actual dragon SVG — bright and visible */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.18]"
          style={{ backgroundImage: `url(${dragonDrag})`, backgroundSize: "180px auto", backgroundPosition: "center top", backgroundRepeat: "repeat", mixBlendMode: "screen" }} />
        
        {/* Layer 2: Rich dragon leather texture */}
        <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-[0.65] dragon-skin-realistic" />
        
        {/* Layer 3: Visible scale shimmer via SVG pattern */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.15]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath d='M0 10 Q5 0,10 10 Q15 20,20 10' fill='none' stroke='%2300F0FF' stroke-width='0.8' opacity='0.7'/%3E%3Cpath d='M10 0 Q20 5,10 10 Q0 15,10 20' fill='none' stroke='%23B026FF' stroke-width='0.6' opacity='0.5'/%3E%3Ccircle cx='10' cy='10' r='0.8' fill='%2300F0FF' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "20px 20px",
          mixBlendMode: "screen",
        }} />

        {/* Layer 4: DRAMATIC side glow veins — thick and bright */}
        <div className="absolute left-0 top-0 bottom-0 w-[4px] z-[5] pointer-events-none" style={{
          background: "linear-gradient(to bottom, transparent 5%, rgba(0,240,255,0.5) 15%, rgba(176,38,255,0.8) 50%, rgba(0,240,255,0.5) 85%, transparent 95%)",
          boxShadow: "2px 0 15px rgba(0,240,255,0.3), 4px 0 30px rgba(176,38,255,0.15)",
          animation: "veinPulse 4s ease-in-out infinite",
        }} />
        <div className="absolute right-0 top-0 bottom-0 w-[2px] z-[5] pointer-events-none" style={{
          background: "linear-gradient(to bottom, transparent 10%, rgba(0,240,255,0.25) 25%, rgba(176,38,255,0.35) 50%, rgba(0,240,255,0.25) 75%, transparent 90%)",
          boxShadow: "-2px 0 10px rgba(176,38,255,0.1)",
        }} />

        {/* ═══ CONTENT ═══ */}
        <div className="flex flex-col h-full px-[clamp(20px,2.5vw,28px)] py-[clamp(20px,2.5vw,28px)] relative z-10">
          
          {/* Header row */}
          <div className="flex items-center justify-between mb-[clamp(24px,3vw,36px)]">
            <div className="flex items-center gap-[clamp(10px,1.2vw,16px)]">
              <div className="p-2.5 rounded-[12px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden">
                <Database size={18} style={{ color: "#00F0FF" }} />
                {/* Subtle dragon scale pattern behind icon */}
                <div className="absolute inset-0 opacity-20 mix-blend-screen" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12'%3E%3Cpath d='M0 6Q3 0,6 6Q9 12,12 6' fill='none' stroke='%2300F0FF' stroke-width='0.5'/%3E%3C/svg%3E")`,
                  backgroundSize: "12px 12px",
                }} />
              </div>
              {!collapsed && (
                <span className="animate-[fadeIn_0.3s_ease-out] whitespace-nowrap" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "clamp(13px,1.5vw,16px)", fontWeight: 700, letterSpacing: "2px", color: "#E0E0E0" }}>
                  WORKSPACE
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button title="Collapse sidebar" onClick={onToggleCollapse} className="hidden md:flex p-2 rounded-[10px] bg-transparent hover:bg-[rgba(255,255,255,0.05)] active:scale-[0.9] transition-all duration-200 text-[#888] hover:text-[#00F0FF]">
                {collapsed ? <ChevronRight size={18} /> : <PanelLeftClose size={18} />}
              </button>
              <button title="Close sidebar" onClick={onClose} className="md:hidden p-2 rounded-[10px] bg-red-500/10 active:scale-[0.85] transition-all duration-200 border border-red-500/20 text-red-400">
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>

          {/* New session */}
          <button
            onClick={onNew}
            onMouseEnter={() => setNewHov(true)}
            onMouseLeave={() => setNewHov(false)}
            className={`group flex items-center ${collapsed ? 'justify-center' : 'justify-center'} gap-[clamp(10px,1.2vw,14px)] w-full py-[clamp(14px,1.8vw,18px)] rounded-[16px] mb-[clamp(24px,3vw,36px)] transition-all duration-200 ease-out active:scale-[0.98] relative overflow-hidden`}
            style={{
              background: newHov ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${newHov ? "rgba(0,240,255,0.25)" : "rgba(255,255,255,0.05)"}`,
              boxShadow: newHov ? "inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.2), 0 0 20px rgba(0,240,255,0.05)" : "none",
            }}
          >
            {/* Dragon scale shimmer on hover */}
            {newHov && (
              <div className="absolute inset-0 opacity-10 mix-blend-screen animate-[fadeIn_0.3s_ease-out]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M0 8Q4 0,8 8Q12 16,16 8' fill='none' stroke='%2300F0FF' stroke-width='0.6'/%3E%3C/svg%3E")`,
                backgroundSize: "16px 16px",
              }} />
            )}
            <Plus size={18} style={{ color: newHov ? "#00F0FF" : "#888" }} className="transition-colors duration-200 relative z-10" />
            {!collapsed && (
              <span className="relative z-10 animate-[fadeIn_0.3s_ease-out]" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "14px", fontWeight: 600, color: newHov ? "#FFF" : "#888", letterSpacing: "1px", transition: "color 0.2s" }}>
                NEW PROTOCOL
              </span>
            )}
          </button>

          {/* Label */}
          {!collapsed && (
            <div className="flex items-center gap-3 mb-[clamp(12px,1.5vw,18px)] px-2 animate-[fadeIn_0.3s_ease-out]">
              <Clock size={12} style={{ color: "#555" }} />
              <span style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "10px", fontWeight: 600, color: "#555", letterSpacing: "2px" }}>ACTIVE LOGS</span>
              <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(90deg, rgba(0,240,255,0.1), rgba(176,38,255,0.05), transparent)" }} />
            </div>
          )}

          {/* List */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-2 overscroll-contain" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
            {conversations.map((c) => {
              const isA = c.id === activeId;
              const isH = hovId === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => { onSelect(c.id); onClose(); }}
                  onMouseEnter={() => setHovId(c.id)}
                  onMouseLeave={() => setHovId(null)}
                  className="group flex items-center gap-[clamp(12px,1.5vw,16px)] px-[clamp(12px,1.5vw,16px)] py-[clamp(12px,1.5vw,16px)] rounded-[14px] cursor-pointer transition-all duration-200 ease-out active:scale-[0.98] relative overflow-hidden"
                  style={{
                    background: isA ? "rgba(0,240,255,0.06)" : isH ? "rgba(255,255,255,0.02)" : "transparent",
                    border: "1px solid",
                    borderColor: isA ? "rgba(0,240,255,0.15)" : "transparent",
                  }}
                >
                  {/* Active item dragon scale shimmer */}
                  {isA && (
                    <div className="absolute inset-0 opacity-[0.04] mix-blend-screen" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M0 8Q4 0,8 8Q12 16,16 8' fill='none' stroke='%2300F0FF' stroke-width='0.5'/%3E%3C/svg%3E")`,
                      backgroundSize: "16px 16px",
                    }} />
                  )}
                  <div className="flex items-center justify-center shrink-0 relative z-10">
                    <MessageSquare size={16} style={{ color: isA ? "#00F0FF" : "#555" }} className="transition-colors duration-200" />
                  </div>
                  {!collapsed && (
                    <>
                      <div className="flex-1 min-w-0 relative z-10 animate-[fadeIn_0.3s_ease-out]">
                        <div className="truncate" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "14px", fontWeight: 500, color: isA ? "#FFF" : isH ? "#CCC" : "#888", transition: "color 0.2s" }}>
                          {c.title}
                        </div>
                      </div>
                      {isA && (
                        <div className="flex items-center gap-1.5 opacity-60 relative z-10">
                          <Zap size={10} style={{ color: "#B026FF" }} />
                          <span style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "10px", fontWeight: 500, color: "#AAA" }}>{c.count}</span>
                        </div>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); onDelete(c.id); }}
                        className={`relative z-10 p-2 rounded-[8px] transition-all duration-200 hover:bg-red-500/20 active:scale-[0.9] ${isA || isH ? 'opacity-100' : 'opacity-0'}`}
                        style={{ color: "#888" }}
                      >
                        <Trash2 size={14} className="hover:text-red-400" />
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Professional Status Footer */}
          {!collapsed && (
            <div className="pt-[clamp(16px,2vw,24px)] mt-[clamp(12px,1.5vw,20px)] relative animate-[fadeIn_0.3s_ease-out]">
              {/* Footer separator with dragon vein */}
              <div className="absolute top-0 left-0 right-0 h-[1px]" style={{
                background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.15), rgba(176,38,255,0.1), rgba(0,240,255,0.15), transparent)"
              }} />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                  <span style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "11px", fontWeight: 600, color: "#888", letterSpacing: "1px" }}>SYSTEM SECURE</span>
                </div>
                <span style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "10px", fontWeight: 500, color: "#555", letterSpacing: "1px" }}>v2.4.1</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
