import React from "react";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  color: string;
  pulse?: boolean;
  onClick?: () => void;
}

export function StatusPill({ icon: Icon, label, color, pulse, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-[5px] px-[clamp(8px,0.9vw,12px)] py-[3px] rounded-full transition-all duration-300 hover:scale-105 cursor-pointer active:scale-95 select-none"
      style={{ background: `${color}08`, border: `1px solid ${color}15` }}
    >
      <div className="relative">
        <Icon size={10} style={{ color, filter: `drop-shadow(0 0 3px ${color})` }} />
        {pulse && (
          <div className="absolute inset-0 animate-[pingOut_2.5s_ease-out_infinite]" style={{ background: color, borderRadius: "50%" }} />
        )}
      </div>
      <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "9px", color: "#8A9098", letterSpacing: "1px" }}>{label}</span>
    </div>
  );
}
