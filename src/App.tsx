import React from "react";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { ChatArea } from "./components/chat/ChatArea";
import { ParticleField } from "./components/effects/ParticleField";
import { CloudVape } from "./components/effects/CloudVape";
import { useSwipeable } from 'react-swipeable';
import { useChat } from "./hooks/useChat";
import { HorizontalBorder, VerticalBorder, CornerOrnament } from "./components/icons/DragonBorderSVG";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Plus } from "lucide-react";
import dragonDrag from "./assets/dragon-drag.svg";

export default function App() {
  const {
    conversations, active, activeId, status,
    sidebarOpen, sidebarCollapsed, activeContext,
    setActiveId, setSidebarOpen, setSidebarCollapsed,
    sendMessage, newConversation, deleteConversation, shareConversation, uploadFiles,
  } = useChat();

  const [layoutMode, setLayoutMode] = React.useState<'normal' | 'chat-full' | 'sidebar-full'>('normal');
  const [showSystemInfo, setShowSystemInfo] = React.useState(false);

  // Memoize handlers to improve INP
  const swipeHandlers = React.useMemo(() => ({
    onSwipedLeft: () => setSidebarOpen(false),
    onSwipedRight: () => setSidebarOpen(true),
    trackMouse: false,
    preventScrollOnSwipe: true,
  }), [setSidebarOpen]);

  const swipeProps = useSwipeable(swipeHandlers);

  const isChatMax = layoutMode === 'chat-full';
  const isSidebarMax = layoutMode === 'sidebar-full';
  const isAnyMax = isChatMax || isSidebarMax;

  return (
    <div {...swipeProps} className="h-dvh w-screen overflow-hidden relative selection:bg-[var(--neon-purple)]/40 selection:text-[#FFFFFF]" style={{ background: "var(--bg-black)" }}>

      {/* ═══ MULTI-LAYER BACKGROUND SYSTEM ═══ */}
      
      {/* Deep space base */}
      <div className="absolute inset-0" style={{
        background: "var(--bg-black)"
      }} />

      {/* Animated Cyber-Aurora — large slow-moving color blobs */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(circle at 20% 25%, rgba(0,240,255,0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 65%, rgba(176,38,255,0.15) 0%, transparent 50%),
          radial-gradient(circle at 50% 90%, rgba(0,240,255,0.08) 0%, transparent 40%),
          radial-gradient(circle at 10% 80%, rgba(176,38,255,0.08) 0%, transparent 35%)
        `,
        animation: 'auroraBreathe 12s ease-in-out infinite alternate'
      }} />

      {/* Subtle dragon-skin background texture over everything */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.2] mix-blend-overlay" style={{
        backgroundImage: `url(${dragonDrag})`,
        backgroundSize: "350px auto",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        filter: "invert(0.5) sepia(1) saturate(5) hue-rotate(180deg)"
      }} />

      {/* Blueprint grid — clean cyberpunk feel */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-[0.06]" style={{
        backgroundImage: `
          linear-gradient(rgba(0,240,255,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,240,255,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)'
      }} />

      {/* Dragon leather texture with specular lighting (Hidden on mobile to save GPU) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.35] mix-blend-overlay dragon-skin-base hidden sm:block" />

      {/* Deep cinematic vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(ellipse 130% 130% at 50% 50%, transparent 25%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,1) 100%)`,
      }} />

      {/* Canvas effects */}
      <div className="opacity-60 mix-blend-screen"><ParticleField /></div>
      <div className="opacity-50 mix-blend-screen"><CloudVape /></div>

      {/* ═══ DRAGON SKIN FRAME BORDERS (Hidden when maximized or on mobile) ═══ */}
      {!isAnyMax && (
        <>
          <div className="absolute top-0 left-0 right-0 z-[60] pointer-events-none hidden sm:block">
            <HorizontalBorder height={44} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-[60] pointer-events-none hidden sm:block" style={{ transform: 'scaleY(-1)' }}>
            <HorizontalBorder height={44} />
          </div>
          <div className="absolute top-0 bottom-0 left-0 z-[60] pointer-events-none hidden sm:block">
            <VerticalBorder width={44} />
          </div>
          <div className="absolute top-0 bottom-0 right-0 z-[60] pointer-events-none hidden sm:block" style={{ transform: 'scaleX(-1)' }}>
            <VerticalBorder width={44} />
          </div>

          {/* Dragon Eye Corner Ornaments */}
          <div className="absolute top-0 left-0 z-[62] pointer-events-none hidden sm:block">
            <CornerOrnament size={64} rotation={0} />
          </div>
          <div className="absolute top-0 right-0 z-[62] pointer-events-none hidden sm:block">
            <CornerOrnament size={64} rotation={90} />
          </div>
          <div className="absolute bottom-0 right-0 z-[62] pointer-events-none hidden sm:block">
            <CornerOrnament size={64} rotation={180} />
          </div>
          <div className="absolute bottom-0 left-0 z-[62] pointer-events-none hidden sm:block">
            <CornerOrnament size={64} rotation={270} />
          </div>

          {/* AMBIENT GLOW behind borders */}
          <div className="absolute top-0 left-0 right-0 h-[80px] z-[59] pointer-events-none hidden sm:block" style={{
            background: "linear-gradient(to bottom, rgba(0,240,255,0.06), transparent)",
          }} />
          <div className="absolute bottom-0 left-0 right-0 h-[80px] z-[59] pointer-events-none hidden sm:block" style={{
            background: "linear-gradient(to top, rgba(176,38,255,0.06), transparent)",
          }} />
        </>
      )}

      {/* ═══ APP LAYOUT ═══ */}
      <div className={`relative z-10 flex flex-col h-full transition-all duration-500 ease-in-out ${isAnyMax ? 'p-0' : 'pl-[2px] pr-[2px] sm:pl-[44px] sm:pr-[44px] md:pl-[52px] md:pr-[52px] pt-[2px] sm:pt-[44px] md:pt-[52px] pb-[4px] sm:pb-[44px] md:pb-[52px]'}`}>
        <Header 
          status={status} 
          isMax={isChatMax}
          onToggleMax={() => setLayoutMode(prev => prev === 'chat-full' ? 'normal' : 'chat-full')}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onSystemInfo={() => setShowSystemInfo(true)}
        />
        <div className="flex flex-1 min-h-0 relative px-[2px] sm:px-[clamp(8px,1vw,16px)] pb-[clamp(2px,1vw,16px)] gap-[clamp(4px,1vw,16px)]">
          <Sidebar
            conversations={conversations.map(c => ({ id: c.id, title: c.title, count: c.messages.length }))}
            activeId={activeId}
            onSelect={(id) => { setActiveId(id); if(isSidebarMax) setLayoutMode('normal'); }}
            onNew={newConversation}
            onDelete={deleteConversation}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(p => !p)}
            hidden={isChatMax}
            isMax={isSidebarMax}
            onToggleMax={() => setLayoutMode(prev => prev === 'sidebar-full' ? 'normal' : 'sidebar-full')}
          />
          <ChatArea
            messages={active.messages}
            status={status}
            contextActive={!!activeContext}
            onSend={sendMessage}
            onUpload={uploadFiles}
            onShare={shareConversation}
            onToggleSidebar={() => setSidebarOpen(true)}
            onSystemInfo={() => setShowSystemInfo(true)}
            isMax={isChatMax}
            hidden={isSidebarMax}
          />
        </div>
      </div>

      {/* ═══ PREMIUM SYSTEM STATUS OVERLAY ═══ */}
      <AnimatePresence>
        {showSystemInfo && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl"
              onClick={() => setShowSystemInfo(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-[10%] sm:inset-[20%] z-[210] liquid-glass border border-[var(--cyan)]/30 rounded-[24px] flex flex-col p-8 overflow-hidden"
            >
               {/* Hex grid bg */}
               <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 0L40 10V30L20 40L0 30V10L20 0Z' fill='none' stroke='%2300F0FF' stroke-width='0.5'/%3E%3C/svg%3E")`,
                 backgroundSize: '40px 40px'
               }} />

               <div className="flex items-center justify-between mb-8 relative z-10">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-[14px] bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 flex items-center justify-center">
                     <ShieldCheck className="text-[var(--cyan)]" />
                   </div>
                   <div>
                     <h2 className="text-2xl font-black tracking-tight text-white uppercase italic">System: DragZone_Core</h2>
                     <p className="text-[var(--cyan)] text-xs font-mono uppercase tracking-widest">v1.1.0-STABLE | ENCRYPTED LINK</p>
                   </div>
                 </div>
                 <button onClick={() => setShowSystemInfo(false)} className="p-2 rounded-full hover:bg-white/10 text-zinc-500 transition-colors">
                   <Plus style={{ transform: 'rotate(45deg)' }} />
                 </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                 {[
                   { label: 'Ollama Engine', status: status === 'typing' ? 'BUSY' : 'READY', color: 'var(--cyan)' },
                   { label: 'Security Layer', status: 'ACTIVE', color: 'var(--red)' },
                   { label: 'Neural Buffer', status: '98% SYNC', color: 'var(--neon-purple)' },
                   { label: 'Memory Leak', status: '0.00%', color: 'var(--red)' }
                 ].map((mod, i) => (
                   <div key={i} className="p-4 rounded-[16px] bg-white/5 border border-white/5 flex items-center justify-between group hover:border-[var(--cyan)]/30 transition-all">
                     <span className="text-zinc-400 font-medium">{mod.label}</span>
                     <span className="font-mono text-[10px] px-2 py-1 rounded-[4px]" style={{ background: `${mod.color}20`, color: mod.color, border: `1px solid ${mod.color}40` }}>
                       {mod.status}
                     </span>
                   </div>
                 ))}
               </div>

               <div className="mt-auto pt-8 border-t border-white/5 relative z-10">
                 <div className="flex justify-between items-end">
                    <div className="space-y-2">
                       <p className="text-[10px] text-zinc-500 font-mono tracking-tighter">LATENCY: 24ms | UPTIME: 142:12:08</p>
                       <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 2, repeat: Infinity }}
                            className="h-full w-full bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent" 
                          />
                       </div>
                    </div>
                    <button onClick={() => setShowSystemInfo(false)} className="px-6 py-2 rounded-[10px] bg-[var(--cyan)] text-black font-bold uppercase tracking-widest text-xs hover:brightness-110 active:scale-95 transition-all">
                       Acknowledge
                    </button>
                 </div>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}