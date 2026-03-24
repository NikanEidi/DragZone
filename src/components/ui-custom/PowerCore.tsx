import React from "react";
import coreImg from "figma:asset/9317dec3d240057a2f1be696f13d7b732ca62087.png";

export function PowerCore() {
  return (
    <div className="relative shrink-0" style={{ width: "clamp(38px,4.5vw,52px)", height: "clamp(38px,4.5vw,52px)" }}>
      {/* Spinning hex ring — multi-color with hardware acceleration */}
      <div className="absolute inset-[-2px] animate-[hexSpin_8s_linear_infinite]" style={{
        clipPath: "polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)",
        background: "conic-gradient(from 0deg, #00F0FF, #4A9BD9, #B026FF, #00F0FF)",
        willChange: 'transform'
      }} />
      <div className="absolute inset-0 overflow-hidden" style={{
        clipPath: "polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)",
        background: "#070b14",
      }}>
        <img src={coreImg} alt="" className="w-full h-full object-cover animate-[coreZoom_12s_ease-in-out_infinite]" style={{ filter: "brightness(1.5) saturate(1.8) hue-rotate(180deg)", willChange: 'transform' }} />
        <div className="absolute inset-0 animate-[pulseGlow_3s_ease-in-out_infinite]" style={{ background: "radial-gradient(circle,transparent 25%,rgba(6,8,16,0.4) 100%)", willChange: 'opacity' }} />
      </div>
      <div className="absolute -inset-3 pointer-events-none animate-[pulseGlow_4s_ease-in-out_infinite]" style={{ background: "radial-gradient(circle,rgba(0,240,255,0.15) 0%,transparent 65%)", willChange: 'opacity' }} />
    </div>
  );
}
