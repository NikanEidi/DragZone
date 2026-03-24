import React from "react";
import { Activity } from "lucide-react";
import dragonIcon from "figma:asset/d4e91d23b9ec3a1c291e712a4ea1d27fc6f6fb52.png";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-[clamp(16px,2.5vw,32px)] px-4">
      <div className="relative" style={{ perspective: "600px" }}>
        <div className="animate-[dragonFloat_7s_ease-in-out_infinite]" style={{ transformStyle: "preserve-3d" }}>
          <img src={dragonIcon} alt="DragZone" style={{
            width: "clamp(72px,10vw,110px)", height: "clamp(72px,10vw,110px)",
            filter: "drop-shadow(0 0 25px rgba(15,229,160,0.35)) drop-shadow(0 0 50px rgba(15,229,160,0.1))",
          }} />
        </div>
        {/* Orbit rings — multi-color */}
        <div className="absolute top-1/2 left-1/2 rounded-full animate-[orbitSpin_14s_linear_infinite]"
          style={{ width: "180%", height: "180%", border: "1px solid rgba(15,229,160,0.05)", transform: "translate(-50%,-50%) rotateX(70deg)" }}>
          <div className="absolute top-0 left-1/2 w-[5px] h-[5px] rounded-full -translate-x-1/2 -translate-y-1/2" style={{ background: "#0FE5A0", boxShadow: "0 0 8px #0FE5A0" }} />
        </div>
        <div className="absolute top-1/2 left-1/2 rounded-full animate-[orbitSpin_20s_linear_infinite_reverse]"
          style={{ width: "240%", height: "240%", border: "1px solid rgba(240,160,48,0.04)", transform: "translate(-50%,-50%) rotateX(70deg) rotateZ(55deg)" }}>
          <div className="absolute top-0 left-1/2 w-[3px] h-[3px] rounded-full -translate-x-1/2 -translate-y-1/2" style={{ background: "#F0A030", boxShadow: "0 0 6px #F0A030" }} />
        </div>
        <div className="absolute top-1/2 left-1/2 rounded-full animate-[orbitSpin_26s_linear_infinite]"
          style={{ width: "300%", height: "300%", border: "1px solid rgba(74,155,217,0.03)", transform: "translate(-50%,-50%) rotateX(70deg) rotateZ(110deg)" }}>
          <div className="absolute top-0 left-1/2 w-[2px] h-[2px] rounded-full -translate-x-1/2 -translate-y-1/2" style={{ background: "#4A9BD9", boxShadow: "0 0 5px #4A9BD9" }} />
        </div>
      </div>
      <div className="text-center space-y-[clamp(4px,0.8vw,10px)]">
        <p style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(10px,1.3vw,14px)", color: "#0FE5A0", letterSpacing: "5px", textShadow: "0 0 15px rgba(15,229,160,0.2)" }}>
          DRAGZONE ACTIVE
        </p>
        <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "clamp(11px,1.2vw,13px)", color: "#505860", letterSpacing: "1px" }}>
          Initialize neural link to begin transmission
        </p>
        <div className="flex items-center justify-center gap-2 mt-1">
          <Activity size={8} style={{ color: "#3A5048" }} />
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "clamp(7px,0.8vw,9px)", color: "#2A3038", letterSpacing: "0.5px" }}>
            LATENCY 0.003ms &bull; CORES 47 &bull; UPTIME 99.97%
          </span>
        </div>
      </div>
    </div>
  );
}
