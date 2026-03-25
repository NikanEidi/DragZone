import React, { useEffect, useState } from "react";
import { Shield, Cpu, BarChart3, Wifi } from "lucide-react";
import { PowerCore } from "../ui-custom/PowerCore";
import { StatusPill } from "../ui-custom/StatusPill";
import { CloudEngine } from "../ui-custom/CloudEngine";
import { DragonGuardian } from "../effects/DragonGuardian";
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

      <div className="flex flex-col gap-0 min-w-0 relative z-10 w-[clamp(140px,30vw,300px)]">
        <h1 className="truncate pointer-events-none" style={{
          fontFamily: "'Share Tech Mono', monospace, 'JetBrains Mono', source-code-pro",
          fontSize: "clamp(16px, 2.8vw, 24px)",
          letterSpacing: "clamp(4px, 0.8vw, 10px)",
          color: "#00F0FF",
          fontWeight: 700,
          textShadow: "0 0 10px rgba(0,240,255,0.4), 0 0 20px rgba(0,240,255,0.15)",
          animation: "pulseGlow 4s ease-in-out infinite"
        }}>
          DRAFZONE
        </h1>
        <div className="flex items-center gap-[clamp(6px,0.8vw,12px)] mt-0.5">
          <div className="flex items-center gap-2 px-2 py-0.5 rounded-[4px] border border-[rgba(0,240,255,0.15)] bg-[rgba(0,240,255,0.05)] shadow-[inset_0_0_8px_rgba(0,240,255,0.1)]">
            <div className="w-[4px] h-[4px] rounded-full animate-pulse" style={{ background: "#00F0FF", boxShadow: "0 0 6px #00F0FF" }} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", color: "#00F0FF", letterSpacing: "1px" }}>LOCAL ENGINE: ONLINE</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 opacity-60">
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "10px", color: "#8A8A9A" }}>
              {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1" />

      {/* Cloud Engine indicator */}
      <CloudEngine status={status} />

      {/* Desktop pills */}
      <div className="hidden lg:flex items-center gap-[clamp(4px,0.5vw,6px)] relative z-10 mr-[clamp(60px,10vw,120px)]">
        <StatusPill icon={Shield} label="SECURE" color="#00F0FF" />
        <StatusPill icon={Cpu} label="LUXURY" color="#B026FF" />
        <StatusPill icon={BarChart3} label="99.99%" color="#F0A030" />
      </div>

      {/* Dragon Guardian Signature Overlap */}
      <div className="absolute right-0 top-0 bottom-0 pointer-events-none z-20 flex items-center justify-end pr-[clamp(10px,2vw,24px)]">
        <div className="relative w-[clamp(80px,12vw,140px)] h-[clamp(80px,12vw,140px)] transform translate-y-[20%]">
          <DragonGuardian />
        </div>
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
