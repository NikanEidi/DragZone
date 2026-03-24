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

  // Collapsed mini-rail (desktop only)
  if (collapsed) {
    return (
      <aside className="hidden md:flex flex-col items-center w-[80px] shrink-0 py-6 gap-6 relative z-20 liquid-glass overflow-hidden">
        {/* Dragon skin texture overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.12]"
          style={{ backgroundImage: `url(${dragonDrag})`, backgroundSize: "120px auto", backgroundPosition: "center", backgroundRepeat: "repeat", mixBlendMode: "screen" }} />
        <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-[0.4] dragon-skin-realistic" />
        
        <button onClick={onToggleCollapse} className="relative z-10 p-3.5 rounded-[16px] transition-all duration-200 hover:bg-white/5 active:scale-[0.85] mb-2 border border-transparent hover:border-white/10" style={{ color: "#00F0FF" }}>
          <ChevronRight size={22} />
        </button>
        <button onClick={onNew} className="relative z-10 p-4 rounded-[18px] transition-all duration-200 ease-out hover:scale-110 active:scale-[0.85]" 
          style={{ 
            background: "linear-gradient(135deg, rgba(0,240,255,0.15), rgba(176,38,255,0.15))", 
            border: "1px solid rgba(0,240,255,0.3)", 
            color: "#FFF", 
          }}>
          <Plus size={22} />
        </button>
        <div className="w-[30px] h-[1px] my-2" style={{ background: "rgba(255,255,255,0.1)" }} />
        {conversations.slice(0, 8).map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className="relative z-10 p-3.5 rounded-[16px] transition-all duration-200 ease-out hover:scale-110 active:scale-[0.85] group"
            title={c.title}
            style={{
              background: c.id === activeId ? "rgba(0,240,255,0.1)" : "rgba(255,255,255,0.02)",
              border: c.id === activeId ? "1px solid rgba(0,240,255,0.3)" : "1px solid transparent",
              color: c.id === activeId ? "#00F0FF" : "#666",
            }}
          >
            <MessageSquare size={20} className="transition-transform duration-200 group-hover:scale-110" />
            {c.id === activeId && <div className="absolute left-[-10px] top-[20%] bottom-[20%] w-[3px] bg-[#00F0FF] rounded-r-full shadow-[0_0_8px_#00F0FF]" />}
          </button>
        ))}
      </aside>
    );
  }

  return (
    <>
      {open && <div className="fixed inset-0 z-40 md:hidden transition-opacity duration-300" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }} onClick={onClose} />}
      <aside className={`
        fixed md:relative z-50 md:z-auto top-0 left-0 h-full
        w-[clamp(300px,30vw,380px)] flex flex-col shrink-0
        transition-transform duration-300 ease-out liquid-glass overflow-hidden
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      style={{ willChange: 'transform' }}>
        
        {/* ═══ DRAGON SKIN LAYERS ═══ */}
        {/* Layer 1: Actual dragon SVG from UIcomponents as background texture */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.06]"
          style={{ backgroundImage: `url(${dragonDrag})`, backgroundSize: "200px auto", backgroundPosition: "center top", backgroundRepeat: "repeat", mixBlendMode: "screen" }} />
        
        {/* Layer 2: Procedural dragon leather texture */}
        <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-[0.5] dragon-skin-realistic" />
        
        {/* Layer 3: Subtle scale shimmer via SVG pattern */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.08]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath d='M0 12 Q6 0,12 12 Q18 24,24 12' fill='none' stroke='%2300F0FF' stroke-width='0.5' opacity='0.6'/%3E%3Cpath d='M12 0 Q24 6,12 12 Q0 18,12 24' fill='none' stroke='%23B026FF' stroke-width='0.5' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "24px 24px",
          mixBlendMode: "screen",
        }} />

        {/* Layer 4: Side accent glow veins */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] z-[5] pointer-events-none" style={{
          background: "linear-gradient(to bottom, transparent, rgba(0,240,255,0.3) 20%, rgba(176,38,255,0.5) 50%, rgba(0,240,255,0.3) 80%, transparent)",
          boxShadow: "0 0 8px rgba(0,240,255,0.2), 2px 0 12px rgba(176,38,255,0.1)",
        }} />
        <div className="absolute right-0 top-0 bottom-0 w-[1px] z-[5] pointer-events-none" style={{
          background: "linear-gradient(to bottom, transparent, rgba(0,240,255,0.15) 30%, rgba(176,38,255,0.2) 50%, rgba(0,240,255,0.15) 70%, transparent)",
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
              <span style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "clamp(13px,1.5vw,16px)", fontWeight: 700, letterSpacing: "2px", color: "#E0E0E0" }}>
                WORKSPACE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onToggleCollapse} className="hidden md:flex p-2 rounded-[10px] bg-transparent hover:bg-[rgba(255,255,255,0.05)] active:scale-[0.9] transition-all duration-200 text-[#888] hover:text-[#00F0FF]">
                <PanelLeftClose size={18} />
              </button>
              <button onClick={onClose} className="md:hidden p-2 rounded-[10px] bg-red-500/10 active:scale-[0.85] transition-all duration-200 border border-red-500/20 text-red-400">
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>

          {/* New session */}
          <button
            onClick={onNew}
            onMouseEnter={() => setNewHov(true)}
            onMouseLeave={() => setNewHov(false)}
            className="group flex items-center justify-center gap-[clamp(10px,1.2vw,14px)] w-full py-[clamp(14px,1.8vw,18px)] rounded-[16px] mb-[clamp(24px,3vw,36px)] transition-all duration-200 ease-out active:scale-[0.98] relative overflow-hidden"
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
            <span className="relative z-10" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "14px", fontWeight: 600, color: newHov ? "#FFF" : "#888", letterSpacing: "1px", transition: "color 0.2s" }}>
              NEW PROTOCOL
            </span>
          </button>

          {/* Label */}
          <div className="flex items-center gap-3 mb-[clamp(12px,1.5vw,18px)] px-2">
            <Clock size={12} style={{ color: "#555" }} />
            <span style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "10px", fontWeight: 600, color: "#555", letterSpacing: "2px" }}>ACTIVE LOGS</span>
            <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(90deg, rgba(0,240,255,0.1), rgba(176,38,255,0.05), transparent)" }} />
          </div>

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
                  <div className="flex-1 min-w-0 relative z-10">
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
                </div>
              );
            })}
          </div>

          {/* Professional Status Footer */}
          <div className="pt-[clamp(16px,2vw,24px)] mt-[clamp(12px,1.5vw,20px)] relative">
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
        </div>
      </aside>
    </>
  );
}
