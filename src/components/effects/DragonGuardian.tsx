import React from "react";
import dragonHead from "../../assets/dragon-icon.svg";

export function DragonGuardian() {
  return (
    <div className="w-full h-full pointer-events-none">
      {/* ═══ STATIC DRAGON GUARDIAN — VECTORIZED FIDELITY ═══ */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main Dragon Head — VECTORIZED FOCUS */}
        <img
          src={dragonHead}
          alt="Dragon Guardian"
          className="w-full h-full object-contain scale-[1.9]"
          style={{
            transform: "translate3d(0,0,30px)",
            objectPosition: "70% 40%",
            filter: "brightness(1.1) saturate(1.4) drop-shadow(0 0 30px rgba(0,240,255,0.5))",
            opacity: 1,
            imageRendering: "crisp-edges"
          }}
        />

        {/* Core Hear Pulse - STATIC RED GLOW */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full blur-[40px] opacity-[0.2] mix-blend-screen"
          style={{ 
            background: "var(--red)", 
            transform: "translate3d(0,0,10px)",
          }} />
      </div>
    </div>
  );
}
