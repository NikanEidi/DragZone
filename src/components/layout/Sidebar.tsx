import React, { useState } from "react";
import { Plus, MessageSquare, Trash2, ChevronLeft, ChevronRight, Database, Clock, Zap, Menu, Maximize2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  hidden?: boolean;
  isMax?: boolean;
  onToggleMax?: () => void;
}

export const Sidebar = React.memo(function Sidebar({ conversations, activeId, onSelect, onNew, onDelete, open, onClose, collapsed, onToggleCollapse, hidden, isMax, onToggleMax }: Props) {
  const [hovId, setHovId] = useState<string | null>(null);
  const [newHov, setNewHov] = useState(false);

  if (hidden) return null;

  return (
    <>
      <AnimatePresence>
        {open && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 z-40 md:hidden" 
             style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(5px)" }} 
             onClick={onClose} 
           />
        )}
      </AnimatePresence>
      <motion.aside
        layout
        initial={false}
        transition={{ type: "spring", stiffness: 350, damping: 35 }}
        className={`
          fixed md:relative z-50 md:z-auto top-0 left-0 h-full
          flex flex-col shrink-0
          liquid-glass overflow-hidden
          ${isMax ? "w-full" : collapsed ? "w-[80px]" : "w-[clamp(280px,28vw,350px)]"}
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{ willChange: 'transform' }}>
        
        {/* ═══ DRAGON SKIN LAYERS — MAXIMUM IMPACT ═══ */}
        {/* Layer 1: Actual dragon SVG — bright and visible */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.18]"
          style={{ backgroundImage: `url(${dragonDrag})`, backgroundSize: "180px auto", backgroundPosition: "center top", backgroundRepeat: "repeat", mixBlendMode: "screen" }} />
        
        {/* Layer 2: Rich dragon leather texture */}
        <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-[0.65]" 
          style={{ backgroundSize: '200px', backgroundImage: 'url("/src/assets/dragon-drag.svg")' }} />
        
        {/* Layer 3: Visible scale shimmer via SVG pattern */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.15]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath d='M0 10 Q5 0,10 10 Q15 20,20 10' fill='none' stroke='%2300F0FF' stroke-width='0.8' opacity='0.7'/%3E%3Cpath d='M10 0 Q20 5,10 10 Q0 15,10 20' fill='none' stroke='%23B026FF' stroke-width='0.6' opacity='0.5'/%3E%3Ccircle cx='10' cy='10' r='0.8' fill='%2300F0FF' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "20px 20px",
          mixBlendMode: "screen",
        }} />

        {/* ═══ CONTENT ═══ */}
        <div className="flex flex-col h-full px-[clamp(20px,2.5vw,28px)] py-[clamp(20px,2.5vw,28px)] relative z-10">
          
          {/* Header row */}
          <div className="flex items-center justify-between mb-[clamp(24px,3vw,36px)]">
            <div className="flex items-center gap-[clamp(10px,1.2vw,16px)]">
              <button 
                onClick={onNew}
                className="p-2.5 rounded-[12px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden active:scale-95 hover:bg-white/5 transition-all"
              >
                <Database size={18} style={{ color: "var(--cyan)" }} />
                {/* Subtle dragon scale pattern behind icon */}
                <div className="absolute inset-0 opacity-20 mix-blend-screen" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12'%3E%3Cpath d='M0 6Q3 0,6 6Q9 12,12 6' fill='none' stroke='%2300F0FF' stroke-width='0.5'/%3E%3C/svg%3E")`,
                  backgroundSize: "12px 12px",
                }} />
              </button>
              {!collapsed && (
                <span className="animate-[fadeIn_0.3s_ease-out] whitespace-nowrap" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "clamp(13px,1.5vw,16px)", fontWeight: 700, letterSpacing: "2px", color: "#E0E0E0" }}>
                  DRAGZONE
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button 
                title={isMax ? "Exit Full Screen" : "Full Screen Sidebar"}
                onClick={onToggleMax}
                className={`hidden md:flex p-2 rounded-[10px] transition-all duration-200 active:scale-[0.8] ${isMax ? 'bg-[var(--cyan)]/20 border border-[var(--cyan)]/40 text-[var(--cyan)]' : 'bg-transparent text-zinc-500 hover:bg-white/5 hover:text-[var(--cyan)]'}`}
              >
                {isMax ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button 
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"} 
                onClick={onToggleCollapse} 
                className={`hidden md:flex p-2 rounded-[10px] transition-all duration-200 active:scale-[0.85] ${collapsed ? 'bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.3)] text-[#00F0FF]' : 'bg-transparent text-[#888] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#00F0FF]'}`}
              >
                <Menu size={20} />
              </button>
              <button 
                title="Close sidebar" 
                onClick={onClose} 
                className="md:hidden p-2 rounded-[10px] bg-red-500/10 active:scale-[0.85] transition-all duration-200 border border-red-500/20 text-red-400"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>

          {/* New session */}
          <button
            onClick={onNew}
            onMouseEnter={() => setNewHov(true)}
            onMouseLeave={() => setNewHov(false)}
            className={`group flex items-center justify-center gap-[clamp(10px,1.2vw,14px)] w-full py-[clamp(14px,1.8vw,18px)] rounded-[16px] mb-[clamp(24px,3vw,36px)] transition-all duration-200 ease-out active:scale-[0.98] relative overflow-hidden`}
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
                NEW SESSION
              </span>
            )}
          </button>

          {/* Label */}
          {!collapsed && (
            <div className="flex items-center gap-3 mb-[clamp(12px,1.5vw,18px)] px-2 animate-[fadeIn_0.3s_ease-out]">
              <Clock size={12} style={{ color: "#555" }} />
              <span style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "10px", fontWeight: 600, color: "#555", letterSpacing: "2px" }}>HISTORY</span>
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
                  title={collapsed ? c.title : undefined}
                  style={{
                    background: isA ? "rgba(0,240,255,0.12)" : isH ? "rgba(255,255,255,0.03)" : "transparent",
                    border: "1px solid",
                    borderColor: isA ? "rgba(0,240,255,0.3)" : "transparent",
                  }}
                >
                  {/* Active item dragon scale shimmer */}
                  {isA && (
                    <div className="absolute inset-0 opacity-[0.08] mix-blend-screen" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M0 8Q4 0,8 8Q12 16,16 8' fill='none' stroke='%2300F0FF' stroke-width='0.5'/%3E%3C/svg%3E")`,
                      backgroundSize: "16px 16px",
                    }} />
                  )}
                  <div className="flex items-center justify-center shrink-0 relative z-10">
                    <MessageSquare size={16} style={{ color: isA ? "var(--cyan)" : "#555" }} className="transition-colors duration-200" />
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
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          onDelete(c.id); 
                        }}
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

          {/* Bottom links or status */}
          {!collapsed && (
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_6px_var(--cyan)]" />
                    <span className="text-[9px] font-mono text-zinc-500 tracking-wider">SECURED LINK</span>
                </div>
                <span className="text-[9px] font-mono text-zinc-600">v1.2.0</span>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
});
