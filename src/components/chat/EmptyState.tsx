import React from "react";
import dragonIcon from "../../assets/dragon-layer.svg";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-4">
      <img src={dragonIcon} alt="DrafZone" style={{ width: 64, height: 64, opacity: 0.3 }} />
      <div className="text-center space-y-1.5">
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--cyan)", letterSpacing: "3px", fontWeight: 600 }}>
          DRAFZONE READY
        </p>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--text-muted)" }}>
          Send a message or drop files to begin
        </p>
      </div>
    </div>
  );
}
