import React, { useEffect, useState } from "react";
import { Shield, Cpu, BarChart3, Wifi } from "lucide-react";
import { PowerCore } from "../ui-custom/PowerCore";
import { StatusPill } from "../ui-custom/StatusPill";
import { CloudEngine } from "../ui-custom/CloudEngine";
import type { ChatStatus } from "../../types/chat";

interface Props {
  status: ChatStatus;
}

export function Header({ status }: Props) {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  return (
    <header className="flex items-center gap-[clamp(8px,1.2vw,16px)] px-[clamp(12px,2vw,24px)] py-[clamp(6px,1vw,12px)] shrink-0 relative bg-gradient-to-b from-[#111] to-transparent">
      {/* Bottom edge glow */}
      <div className="absolute bottom-0 left-[3%] right-[3%] h-[1px]" style={{
        background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.2), rgba(176,38,255,0.1), rgba(240,160,48,0.04), rgba(0,240,255,0.2), transparent)",
      }} />

      <PowerCore />

      <div className="flex flex-col gap-0 min-w-0">
        <h1 className="truncate" style={{
          fontFamily: "'Orbitron',sans-serif",
          fontSize: "clamp(14px, 2.2vw, 20px)",
          letterSpacing: "clamp(4px, 0.6vw, 8px)",
          color: "#F0F0F5",
          textShadow: "0 0 20px rgba(0,240,255,0.3), 0 0 40px rgba(0,240,255,0.1)",
        }}>
          DRAGZONE
        </h1>
        <div className="flex items-center gap-[clamp(4px,0.5vw,8px)]">
          <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "clamp(8px,0.9vw,10px)", letterSpacing: "2px", color: "#8A8A9A" }}>
            PREMIUM ENGINE
          </span>
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="w-[3px] h-[3px] rounded-full" style={{ background: "#00F0FF", boxShadow: "0 0 4px #00F0FF" }} />
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "9px", color: "#5A5A6A" }}>
              {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1" />

      {/* Cloud Engine indicator */}
      <CloudEngine status={status} />

      {/* Desktop pills */}
      <div className="hidden lg:flex items-center gap-[clamp(4px,0.5vw,6px)]">
        <StatusPill icon={Shield} label="SECURE" color="#00F0FF" />
        <StatusPill icon={Cpu} label="LUXURY" color="#B026FF" />
        <StatusPill icon={BarChart3} label="99.99%" color="#F0A030" />
      </div>

      {/* Mobile dot */}
      <div className="flex lg:hidden items-center gap-[5px] px-[7px] py-[3px] rounded-full"
        style={{ background: "rgba(0,240,255,0.05)", border: "1px solid rgba(0,240,255,0.1)" }}>
        <div className="relative">
          <div className="w-[6px] h-[6px] rounded-full" style={{ background: "#00F0FF", boxShadow: "0 0 5px #00F0FF" }} />
          <div className="absolute inset-0 rounded-full animate-[pingOut_2s_ease-out_infinite]" style={{ background: "#00F0FF" }} />
        </div>
        <span className="hidden sm:inline" style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "9px", color: "#8A8A9A" }}>LIVE</span>
      </div>
    </header>
  );
}
