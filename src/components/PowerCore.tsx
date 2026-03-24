import React from "react";
import coreImg from "figma:asset/9317dec3d240057a2f1be696f13d7b732ca62087.png";

export function PowerCore() {
  const size = "clamp(40px, 5vw, 56px)";
  return (
    <div className="relative shrink-0" style={{ width: size, height: size, perspective: "500px" }}>
      {/* Outer spinning hex */}
      <div className="absolute inset-[-3px] animate-[hexSpin_8s_linear_infinite]"
        style={{ clipPath: "polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)", background: "conic-gradient(from 0deg,#A020F0,#00F3FF,#A020F0,#7B2FBE,#00F3FF,#A020F0)" }} />
      {/* Inner hex image */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)", background: "#08041a" }}>
        <img src={coreImg} alt="" className="w-full h-full object-cover animate-[coreZoom_10s_ease-in-out_infinite]" style={{ filter: "brightness(1.3) saturate(1.4)" }} />
        <div className="absolute inset-0 animate-[pulseGlow_2.5s_ease-in-out_infinite]" style={{ background: "radial-gradient(circle,transparent 20%,rgba(5,0,15,0.4) 100%)" }} />
      </div>
      {/* Glow aura */}
      <div className="absolute -inset-4 pointer-events-none animate-[pulseGlow_3s_ease-in-out_infinite]" style={{ background: "radial-gradient(circle,rgba(160,32,240,0.15) 0%,transparent 70%)" }} />
    </div>
  );
}
