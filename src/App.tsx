import React from "react";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { ChatArea } from "./components/chat/ChatArea";
import { DragonGuardian } from "./components/effects/DragonGuardian";
import { ParticleField } from "./components/effects/ParticleField";
import { CloudVape } from "./components/effects/CloudVape";
import { useChat } from "./hooks/useChat";
import { HorizontalBorder, VerticalBorder, CornerOrnament } from "./components/icons/DragonBorderSVG";

export default function App() {
  const {
    conversations, active, activeId, status,
    sidebarOpen, sidebarCollapsed,
    setActiveId, setSidebarOpen, setSidebarCollapsed,
    sendMessage, newConversation, deleteConversation, shareConversation,
  } = useChat();

  return (
    <div className="h-[100dvh] w-screen overflow-hidden relative selection:bg-[#B026FF]/40 selection:text-[#FFFFFF]" style={{ background: "#040406" }}>
      {/* ═══ GLOBAL EFFECTS ═══ */}

      {/* ═══ BACKGROUND SYSTEM ═══ */}
      
      {/* 1. Ambient Cyber-Aurora (Slow moving Cyan/Purple glows) */}
      <div className="absolute inset-0 pointer-events-none opacity-80" style={{
        background: `
          radial-gradient(circle at 15% 30%, rgba(0,240,255,0.08) 0%, transparent 45%),
          radial-gradient(circle at 85% 70%, rgba(176,38,255,0.08) 0%, transparent 45%),
          radial-gradient(circle at 50% 50%, rgba(0,240,255,0.03) 0%, transparent 60%)
        `,
        animation: 'auroraBreathe 15s ease-in-out infinite alternate'
      }} />

      {/* 2. Professional Cyber Blueprint Grid */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-[0.4]" style={{
        backgroundImage: `
          linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)'
      }} />

      {/* 3. Deep Vignette for focus */}
      <div className="absolute inset-0 pointer-events-none will-change-[opacity]" style={{
        backgroundImage: `radial-gradient(ellipse 140% 140% at 50% 50%, transparent 30%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.98) 100%)`,
      }} />

      {/* 4. Premium Dark Leather / Dragon Skin Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.18] mix-blend-overlay dragon-skin-base" />

      {/* 5. Optimized Canvas Effects */}
      <div className="opacity-50 mix-blend-screen"><ParticleField /></div>
      <div className="opacity-40 mix-blend-screen"><CloudVape /></div>

      {/* ═══ DRAGON SKIN FRAME BORDERS ═══ */}
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 z-[60] pointer-events-none dragon-skin-frame-h">
        <HorizontalBorder height={40} />
      </div>
      
      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 z-[60] pointer-events-none dragon-skin-frame-h" style={{ transform: 'scaleY(-1)' }}>
        <HorizontalBorder height={40} />
      </div>
      
      {/* Left Border */}
      <div className="absolute top-0 bottom-0 left-0 z-[60] pointer-events-none dragon-skin-frame-v">
        <VerticalBorder width={40} />
      </div>
      
      {/* Right Border */}
      <div className="absolute top-0 bottom-0 right-0 z-[60] pointer-events-none dragon-skin-frame-v" style={{ transform: 'scaleX(-1)' }}>
        <VerticalBorder width={40} />
      </div>

      {/* Dragon Eye Corner Ornaments */}
      <div className="absolute top-0 left-0 z-[62] pointer-events-none">
        <CornerOrnament size={60} rotation={0} />
      </div>
      <div className="absolute top-0 right-0 z-[62] pointer-events-none">
        <CornerOrnament size={60} rotation={90} />
      </div>
      <div className="absolute bottom-0 right-0 z-[62] pointer-events-none">
        <CornerOrnament size={60} rotation={180} />
      </div>
      <div className="absolute bottom-0 left-0 z-[62] pointer-events-none">
        <CornerOrnament size={60} rotation={270} />
      </div>

      {/* ═══ APP LAYOUT ═══ */}
      <div className="relative z-10 flex flex-col h-full pl-[12px] pr-[12px] sm:pl-[40px] sm:pr-[40px] md:pl-[48px] md:pr-[48px] pt-[12px] sm:pt-[40px] md:pt-[48px] pb-[12px] sm:pb-[40px] md:pb-[48px]">
        <Header status={status} />
        <div className="flex flex-1 min-h-0 relative px-[4px] sm:px-[clamp(8px,1vw,16px)] pb-[clamp(4px,1vw,16px)] gap-[clamp(4px,1vw,16px)]">
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
            onSend={sendMessage}
            onShare={shareConversation}
            onToggleSidebar={() => setSidebarOpen(true)}
          />
          <DragonGuardian />
        </div>
      </div>

      {/* ═══ GLOBAL KEYFRAMES & STYLES ═══ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Share+Tech+Mono&display=swap');

        * { -webkit-tap-highlight-color: transparent; }
        html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
        input, button, textarea { touch-action: manipulation; }
        textarea { -webkit-user-select: text; user-select: text; }
        textarea:focus { outline: none; }

        * { scrollbar-width: none; scrollbar-color: rgba(176,38,255,0.4) transparent; }
        ::-webkit-scrollbar { width: 0px; display: none; }

        input::placeholder, textarea::placeholder { color: #666 !important; font-family: system-ui, -apple-system, sans-serif; letter-spacing: 0.5px; }

        /* --- PROFESSIONAL SMOKED LIQUID GLASS --- */
        .liquid-glass {
          background: rgba(15, 15, 18, 0.65);
          backdrop-filter: blur(30px) saturate(120%);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.08),
            0 20px 40px rgba(0, 0, 0, 0.7);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease-out;
        }

        /* --- SUBTLE MATTE DRAGON LEATHER --- */
        .dragon-skin-realistic {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='skin'%3E%3CfeTurbulence type='cellular' baseFrequency='0.015' numOctaves='3' result='cells'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 4 -1' in='cells' result='contrast'/%3E%3CfeSpecularLighting in='contrast' surfaceScale='5' specularConstant='0.8' specularExponent='15' lighting-color='%23666677' result='light'%3E%3CfeDistantLight azimuth='45' elevation='40'/%3E%3C/feSpecularLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23skin)' opacity='0.15'/%3E%3C/svg%3E");
          background-size: 300px 300px;
        }

        /* App-level background variant of the leather for extra depth */
        .dragon-skin-base {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='skin'%3E%3CfeTurbulence type='cellular' baseFrequency='0.01' numOctaves='3' result='cells'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 -0.5' in='cells' result='contrast'/%3E%3CfeSpecularLighting in='contrast' surfaceScale='4' specularConstant='1' specularExponent='12' lighting-color='%23888899' result='light'%3E%3CfeDistantLight azimuth='90' elevation='35'/%3E%3C/feSpecularLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23skin)' opacity='0.3'/%3E%3C/svg%3E");
          background-size: 400px 400px;
        }

        /* Hardware Accelerated Animations */
        @keyframes auroraBreathe {
          0% { transform: scale(1) translate(0, 0); opacity: 0.6; }
          50% { transform: scale(1.05) translate(-2%, 2%); opacity: 0.9; }
          100% { transform: scale(1) translate(2%, -2%); opacity: 0.6; }
        }

        @keyframes dragonFloat {
          0%,100% { transform: translate3d(0,0,0) rotateY(0); }
          30% { transform: translate3d(0,-4px,0) rotateY(1deg); }
          70% { transform: translate3d(0,2px,0) rotateY(-0.5deg); }
        }
        @keyframes dragonPulsePremium {
          0%,100% { filter: drop-shadow(0 0 8px rgba(0,240,255,0.2)) drop-shadow(0 0 15px rgba(176,38,255,0.2)); }
          50% { filter: drop-shadow(0 0 12px rgba(0,240,255,0.3)) drop-shadow(0 0 20px rgba(176,38,255,0.3)); }
        }
        @keyframes hexSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulseGlow { 0%,100% { opacity: 0.2; } 50% { opacity: 0.5; } }
        @keyframes typingBounce { 0%,100% { transform: translate3d(0,0,0) scale(0.7); opacity: 0.2; } 50% { transform: translate3d(0,-4px,0) scale(1.1); opacity: 1; } }
        @keyframes messageIn { from { opacity: 0; transform: translate3d(0,12px,0) scale(0.98); } to { opacity: 1; transform: translate3d(0,0,0) scale(1); } }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translate3d(-6px,0,0); } to { opacity: 1; transform: translate3d(0,0,0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pingOut { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(3); opacity: 0; } }
        @keyframes waveform { 0% { height: 12%; } 100% { height: 85%; } }
        @keyframes orbitSpin { from { transform: translate(-50%,-50%) rotateX(70deg) rotate(0deg); } to { transform: translate(-50%,-50%) rotateX(70deg) rotate(360deg); } }
        @keyframes coreZoom { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }

        /* Dragon skin frame border animations */
        @keyframes veinPulse {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(0,240,255,0.15)); }
          50% { filter: drop-shadow(0 0 8px rgba(0,240,255,0.3)) drop-shadow(0 0 12px rgba(176,38,255,0.15)); }
        }
        .dragon-skin-frame-h {
          animation: veinPulse 4s ease-in-out infinite;
          will-change: filter;
        }
        .dragon-skin-frame-v {
          animation: veinPulse 5s ease-in-out 1s infinite;
          will-change: filter;
        }

        .graffiti-text {
          font-family: 'Yu Mincho', 'Hiragino Mincho ProN', 'MS PMincho', serif;
          font-weight: 900;
          font-style: italic;
          background: linear-gradient(135deg, #00F0FF, #B026FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @supports (height: 100dvh) { .h-\\[100dvh\\] { height: 100dvh; } }
      `}</style>
    </div>
  );
}