import React from "react";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { ChatArea } from "./components/chat/ChatArea";
import { DragonGuardian } from "./components/effects/DragonGuardian";
import { ParticleField } from "./components/effects/ParticleField";
import { CloudVape } from "./components/effects/CloudVape";
import { useChat } from "./hooks/useChat";
import { HorizontalBorder, VerticalBorder, CornerOrnament } from "./components/icons/DragonBorderSVG";
import dragonDrag from "./assets/dragon-drag.svg";

export default function App() {
  const {
    conversations, active, activeId, status,
    sidebarOpen, sidebarCollapsed,
    setActiveId, setSidebarOpen, setSidebarCollapsed,
    sendMessage, newConversation, deleteConversation, shareConversation,
  } = useChat();

  return (
    <div className="h-[100dvh] w-screen overflow-hidden relative selection:bg-[#B026FF]/40 selection:text-[#FFFFFF]" style={{ background: "#030306" }}>

      {/* ═══ MULTI-LAYER BACKGROUND SYSTEM ═══ */}
      
      {/* Deep space base */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 120% 100% at 50% 50%, #0a0818 0%, #050308 40%, #020204 100%)"
      }} />

      {/* Animated Cyber-Aurora — large slow-moving color blobs */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(circle at 20% 25%, rgba(0,240,255,0.12) 0%, transparent 50%),
          radial-gradient(circle at 80% 65%, rgba(176,38,255,0.12) 0%, transparent 50%),
          radial-gradient(circle at 50% 90%, rgba(0,240,255,0.06) 0%, transparent 40%),
          radial-gradient(circle at 10% 80%, rgba(176,38,255,0.06) 0%, transparent 35%)
        `,
        animation: 'auroraBreathe 12s ease-in-out infinite alternate'
      }} />

      {/* Subtle dragon-skin background texture over everything */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay" style={{
        backgroundImage: `url(${dragonDrag})`,
        backgroundSize: "350px auto",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
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
      <div className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-overlay dragon-skin-base hidden sm:block" />

      {/* Deep cinematic vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(ellipse 130% 130% at 50% 50%, transparent 25%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.95) 100%)`,
      }} />

      {/* Canvas effects */}
      <div className="opacity-60 mix-blend-screen"><ParticleField /></div>
      <div className="opacity-50 mix-blend-screen"><CloudVape /></div>

      {/* ═══ DRAGON SKIN FRAME BORDERS (Hidden on mobile to save screen space & GPU) ═══ */}
      <div className="absolute top-0 left-0 right-0 z-[60] pointer-events-none dragon-skin-frame-h hidden sm:block">
        <HorizontalBorder height={44} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-[60] pointer-events-none dragon-skin-frame-h hidden sm:block" style={{ transform: 'scaleY(-1)' }}>
        <HorizontalBorder height={44} />
      </div>
      <div className="absolute top-0 bottom-0 left-0 z-[60] pointer-events-none dragon-skin-frame-v hidden sm:block">
        <VerticalBorder width={44} />
      </div>
      <div className="absolute top-0 bottom-0 right-0 z-[60] pointer-events-none dragon-skin-frame-v hidden sm:block" style={{ transform: 'scaleX(-1)' }}>
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

      {/* ═══ AMBIENT GLOW behind borders ═══ */}
      <div className="absolute top-0 left-0 right-0 h-[80px] z-[59] pointer-events-none hidden sm:block" style={{
        background: "linear-gradient(to bottom, rgba(0,240,255,0.06), transparent)",
        animation: "veinPulse 4s ease-in-out infinite"
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-[80px] z-[59] pointer-events-none hidden sm:block" style={{
        background: "linear-gradient(to top, rgba(176,38,255,0.06), transparent)",
        animation: "veinPulse 5s ease-in-out 1s infinite"
      }} />
      <div className="absolute top-0 bottom-0 left-0 w-[80px] z-[59] pointer-events-none hidden sm:block" style={{
        background: "linear-gradient(to right, rgba(176,38,255,0.06), transparent)",
        animation: "veinPulse 5s ease-in-out 0.5s infinite"
      }} />
      <div className="absolute top-0 bottom-0 right-0 w-[80px] z-[59] pointer-events-none hidden sm:block" style={{
        background: "linear-gradient(to left, rgba(0,240,255,0.06), transparent)",
        animation: "veinPulse 4s ease-in-out 1.5s infinite"
      }} />

      {/* ═══ APP LAYOUT ═══ */}
      <div className="relative z-10 flex flex-col h-full pl-[2px] pr-[2px] sm:pl-[44px] sm:pr-[44px] md:pl-[52px] md:pr-[52px] pt-[2px] sm:pt-[44px] md:pt-[52px] pb-[4px] sm:pb-[44px] md:pb-[52px]">
        <Header status={status} />
        <div className="flex flex-1 min-h-0 relative px-[2px] sm:px-[clamp(8px,1vw,16px)] pb-[clamp(2px,1vw,16px)] gap-[clamp(4px,1vw,16px)]">
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

      {/* ═══ GLOBAL STYLES ═══ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Share+Tech+Mono&display=swap');

        * { -webkit-tap-highlight-color: transparent; }
        html, body {
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
          overscroll-behavior-y: none; /* Native app feel for iPad */
        }
        input, button, textarea { touch-action: manipulation; }
        textarea { -webkit-user-select: text; user-select: text; }
        textarea:focus { outline: none; }
        * { scrollbar-width: none; }
        ::-webkit-scrollbar { width: 0; display: none; }
        input::placeholder, textarea::placeholder { color: #555 !important; }

        /* --- PREMIUM SMOKED LIQUID GLASS --- */
        .liquid-glass {
          background: rgba(10, 10, 14, 0.72);
          backdrop-filter: blur(40px) saturate(130%);
          -webkit-backdrop-filter: blur(40px) saturate(130%);
          border-radius: 20px;
          border: 1px solid rgba(0,240,255,0.08);
          box-shadow: 
            inset 0 1px 1px rgba(255,255,255,0.06),
            inset 0 -1px 1px rgba(176,38,255,0.04),
            0 25px 50px rgba(0,0,0,0.8),
            0 0 40px rgba(0,240,255,0.03);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease-out;
        }
        @media (hover: hover) and (pointer: fine) {
          .liquid-glass:hover {
            border-color: rgba(0,240,255,0.12);
            box-shadow: 
              inset 0 1px 1px rgba(255,255,255,0.08),
              inset 0 -1px 1px rgba(176,38,255,0.06),
              0 25px 50px rgba(0,0,0,0.8),
              0 0 60px rgba(0,240,255,0.05),
              0 0 100px rgba(176,38,255,0.03);
          }
        }

        /* --- DRAGON LEATHER TEXTURE --- */
        .dragon-skin-realistic {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='s'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='4' seed='7'/%3E%3CfeSpecularLighting surfaceScale='6' specularConstant='0.9' specularExponent='15' lighting-color='%23667788'%3E%3CfeDistantLight azimuth='45' elevation='45'/%3E%3C/feSpecularLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23s)' opacity='0.2'/%3E%3C/svg%3E");
          background-size: 300px 300px;
        }
        .dragon-skin-base {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='s'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.01' numOctaves='4' seed='13'/%3E%3CfeSpecularLighting surfaceScale='5' specularConstant='1' specularExponent='12' lighting-color='%23889'%3E%3CfeDistantLight azimuth='90' elevation='40'/%3E%3C/feSpecularLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23s)' opacity='0.35'/%3E%3C/svg%3E");
          background-size: 400px 400px;
        }

        /* ═══ ANIMATIONS ═══ */
        @keyframes auroraBreathe {
          0% { transform: scale(1) translate(0, 0); opacity: 0.7; }
          33% { transform: scale(1.05) translate(-2%, 1%); opacity: 1; }
          66% { transform: scale(1.02) translate(1%, -2%); opacity: 0.8; }
          100% { transform: scale(1) translate(2%, -1%); opacity: 0.7; }
        }
        @keyframes dragonFloat {
          0%,100% { transform: translate3d(0,0,0) rotateY(0); }
          30% { transform: translate3d(0,-6px,0) rotateY(1.5deg); }
          70% { transform: translate3d(0,3px,0) rotateY(-0.8deg); }
        }
        @keyframes dragonPulsePremium {
          0%,100% { filter: drop-shadow(0 0 10px rgba(0,240,255,0.25)) drop-shadow(0 0 20px rgba(176,38,255,0.2)); }
          50% { filter: drop-shadow(0 0 15px rgba(0,240,255,0.4)) drop-shadow(0 0 25px rgba(176,38,255,0.35)); }
        }
        @keyframes hexSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulseGlow { 0%,100% { opacity: 0.25; } 50% { opacity: 0.6; } }
        @keyframes typingBounce { 0%,100% { transform: translate3d(0,0,0) scale(0.7); opacity: 0.2; } 50% { transform: translate3d(0,-5px,0) scale(1.15); opacity: 1; } }
        @keyframes messageIn { from { opacity: 0; transform: translate3d(0,14px,0) scale(0.97); } to { opacity: 1; transform: translate3d(0,0,0) scale(1); } }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translate3d(-8px,0,0); } to { opacity: 1; transform: translate3d(0,0,0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pingOut { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(3); opacity: 0; } }
        @keyframes waveform { 0% { height: 12%; } 100% { height: 85%; } }
        @keyframes orbitSpin { from { transform: translate(-50%,-50%) rotateX(70deg) rotate(0deg); } to { transform: translate(-50%,-50%) rotateX(70deg) rotate(360deg); } }
        @keyframes coreZoom { 0%,100% { transform: scale(1); } 50% { transform: scale(1.18); } }
        @keyframes textFlicker { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }

        /* Dragon skin frame animations */
        @keyframes veinPulse {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(0,240,255,0.2)); }
          50% { filter: drop-shadow(0 0 12px rgba(0,240,255,0.4)) drop-shadow(0 0 20px rgba(176,38,255,0.2)); }
        }
        .dragon-skin-frame-h { animation: veinPulse 4s ease-in-out infinite; will-change: filter; }
        .dragon-skin-frame-v { animation: veinPulse 5s ease-in-out 1s infinite; will-change: filter; }

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