import React, { useEffect, useState } from "react";
import { Shield, Cpu, BarChart3, Maximize2, Minimize2, Menu } from "lucide-react";
import { PowerCore } from "../ui-custom/PowerCore";
import { StatusPill } from "../ui-custom/StatusPill";
import { CloudEngine } from "../ui-custom/CloudEngine";
import { DragonGuardian } from "../effects/DragonGuardian";
import type { ChatStatus } from "../../types/chat";

interface Props {
  status: ChatStatus;
  isMax?: boolean;
  onToggleMax?: () => void;
  onToggleSidebar?: () => void;
  onSystemInfo?: () => void;
}

export function Header({ status, isMax, onToggleMax, onToggleSidebar, onSystemInfo }: Props) {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  return (
    <header className={`flex items-center gap-[clamp(8px,1.2vw,16px)] px-[clamp(12px,2vw,24px)] py-[clamp(6px,1vw,12px)] shrink-0 relative transition-all duration-300 ${isMax ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : 'bg-gradient-to-b from-[#111] to-transparent'}`}>
      {/* Bottom edge glow */}
      {!isMax && (
        <div className="absolute bottom-0 left-[3%] right-[3%] h-[1px]" style={{
          background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.2), rgba(176,38,255,0.1), transparent)",
        }} />
      )}

      {/* Toggles */}
      <div className="flex items-center gap-1.5 mr-2">
        <button 
          onClick={onToggleSidebar}
          className="p-2.5 rounded-[12px] bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-[var(--cyan)] transition-all active:scale-90"
          title="Toggle Navigation"
        >
          <Menu size={20} />
        </button>
        <button 
          onClick={onToggleMax}
          className="p-2.5 rounded-[12px] bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-[var(--cyan)] transition-all active:scale-90"
          title={isMax ? "Exit Full Screen" : "Full Screen Mode"}
        >
          {isMax ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>

      <PowerCore onClick={onSystemInfo} />

      <div className="flex flex-col gap-0 min-w-0 relative z-10 w-[clamp(140px,30vw,300px)]">
        <h1 className="truncate pointer-events-none" style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "clamp(16px, 2.8vw, 24px)",
          letterSpacing: "clamp(4px, 0.8vw, 10px)",
          color: "var(--cyan)",
          fontWeight: 700,
          textShadow: "0 0 10px rgba(0,240,255,0.4)",
        }}>
          DRAGZONE
        </h1>
        <div className="flex items-center gap-[clamp(6px,0.8vw,12px)] mt-0.5">
          <div className="flex items-center gap-2 px-2 py-0.5 rounded-[4px] border border-[rgba(0,240,255,0.2)] bg-black/40">
            <div className="w-[4px] h-[4px] rounded-full animate-pulse" style={{ background: "var(--red)", boxShadow: "0 0 6px var(--red)" }} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", color: "var(--cyan)", letterSpacing: "1px" }}>CORE: ONLINE</span>
          </div>
          <span style={{ fontFamily: "monospace", fontSize: 9, color: "#666", letterSpacing: "1px" }}>
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </span>
        </div>
      </div>

      <div className="flex-1" />

      {/* Cloud Engine indicator */}
      <CloudEngine status={status} />

      {/* Desktop pills */}
      <div className="hidden lg:flex items-center gap-[clamp(4px,0.5vw,6px)] relative z-10 mr-[clamp(80px,12vw,160px)]">
        <StatusPill icon={Shield} label="SECURE" color="var(--cyan)" onClick={onSystemInfo} />
        <StatusPill icon={Cpu} label="PURPLE LINK" color="var(--neon-purple)" onClick={onSystemInfo} />
        <StatusPill icon={BarChart3} label="DRAGON" color="var(--red)" onClick={onSystemInfo} />
      </div>

      {/* Dragon Guardian Signature Signature — RESTORED VISIBILITY & REFINED LOWER POSITION */}
      <div className="absolute right-[2%] top-0 bottom-0 pointer-events-none z-20 flex items-center">
        <div className="relative w-[clamp(180px,24vw,340px)] h-full transform translate-y-[28%]">
          <DragonGuardian />
        </div>
      </div>

      {/* Mobile dot — NOW FUNCTIONAL */}
      <button 
        onClick={onSystemInfo}
        className="flex xl:hidden items-center gap-[5px] px-[7px] py-[3px] rounded-full mr-[clamp(80px,12vw,140px)] hover:bg-white/10 active:scale-95 transition-all"
        style={{ background: "rgba(0,240,255,0.05)", border: "1px solid rgba(0,240,255,0.1)" }}>
        <div className="relative">
          <div className="w-[6px] h-[6px] rounded-full" style={{ background: "#00F0FF", boxShadow: "0 0 5px #00F0FF" }} />
          <div className="absolute inset-0 rounded-full animate-[pingOut_2s_ease-out_infinite]" style={{ background: "#00F0FF" }} />
        </div>
        <span className="hidden sm:inline" style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "9px", color: "#8A8A9A" }}>LIVE</span>
      </button>
    </header>
  );
}
