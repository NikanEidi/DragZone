import React from "react";
import { Cloud, Zap } from "lucide-react";

interface Props {
  status: "idle" | "typing" | "error" | "connecting";
}

export function CloudEngine({ status }: Props) {
  const isActive = status === "typing";
  const color = status === "error" ? "#E05555" : "#00F0FF";

  return (
    <div className="flex items-center gap-[clamp(5px,0.6vw,8px)] px-[clamp(8px,1vw,14px)] py-[clamp(4px,0.5vw,6px)] rounded-[10px] select-none"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}33`,
        boxShadow: isActive ? `0 0 15px ${color}20` : "none",
        transition: "all 0.2s ease",
      }}>
      <div className="relative">
        <Cloud size={14} style={{ color, filter: `drop-shadow(0 0 4px ${color})`, transition: "all 0.2s" }} />
        {isActive && (
          <div className="absolute inset-0 animate-[pingOut_2s_ease-out_infinite] will-change-[transform,opacity]" style={{ color }} >
            <Cloud size={14} style={{ color }} />
          </div>
        )}
      </div>
      <span style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "clamp(8px,0.9vw,10px)", color: "#F0F0F5", letterSpacing: "1px", fontWeight: 600 }}>
        {status === "typing" ? "PROCESSING" : status === "error" ? "ERROR" : "CLOUD ENGINE"}
      </span>
      <Zap size={8} style={{ color: isActive ? "#B026FF" : "#505860", filter: isActive ? "drop-shadow(0 0 4px #B026FF)" : "none", transition: "all 0.2s", animation: isActive ? "sparkleRotate 2s linear infinite" : "none" }} />
    </div>
  );
}
