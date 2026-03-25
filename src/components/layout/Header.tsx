import React, { useEffect, useState, useMemo } from "react";
import type { ChatStatus } from "../../types/chat";
import dragonHead from "../../assets/dragon-icon.svg";

interface Props {
  status: ChatStatus;
}

export const Header = React.memo(function Header({ status }: Props) {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  const statusText = useMemo(() => {
    if (status === "typing") return "PROCESSING";
    if (status === "error") return "ERROR";
    return "READY";
  }, [status]);

  const statusColor = status === "typing" ? "var(--purple, #9D5CFF)" : status === "error" ? "#F85149" : "var(--cyan, #00D4E5)";

  return (
    <header className="flex items-center gap-3 px-4 py-2 shrink-0" style={{ borderBottom: "1px solid var(--border, rgba(255,255,255,0.06))", background: "var(--bg-panel, rgba(14,17,23,0.95))" }}>
      
      {/* Dragon icon — small, clean, acts as system status */}
      <div className="flex items-center justify-center shrink-0" style={{ width: 32, height: 32 }}>
        <img src={dragonHead} alt="DrafZone" style={{ width: 24, height: 24, opacity: 0.9 }} />
      </div>

      {/* Brand */}
      <div className="flex flex-col min-w-0">
        <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 15, fontWeight: 600, color: "var(--text-primary, #E6EDF3)", letterSpacing: "2px" }}>
          DRAFZONE
        </span>
        <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 10, color: "var(--text-muted, #484F58)", letterSpacing: "0.5px" }}>
          LOCAL AI ENGINE
        </span>
      </div>

      <div className="flex-1" />

      {/* System telemetry bar */}
      <div className="hidden sm:flex items-center gap-3" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 10, color: "var(--text-muted, #484F58)" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
          <span style={{ color: statusColor, fontWeight: 500 }}>{statusText}</span>
        </div>
        <span style={{ color: "var(--border)" }}>│</span>
        <span>Llama 3.1</span>
        <span style={{ color: "var(--border)" }}>│</span>
        <span>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
      </div>

      {/* Mobile: compact status dot */}
      <div className="flex sm:hidden items-center gap-1.5 px-2 py-1 rounded" style={{ border: "1px solid var(--border)" }}>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
        <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 9, color: "var(--text-secondary, #8B949E)" }}>{statusText}</span>
      </div>
    </header>
  );
});
