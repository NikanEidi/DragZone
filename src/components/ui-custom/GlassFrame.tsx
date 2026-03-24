import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  accent?: string; // hex color
  intensity?: "low" | "mid" | "high";
  noScales?: boolean;
}

/**
 * Premium glass-morphism frame with dragon-scale SVG borders.
 * Replaced PNG figma:asset imports with pure CSS/SVG scale patterns.
 */
export function GlassFrame({
  children, className = "", accent = "#00F0FF",
  intensity = "mid", noScales = false,
}: Props) {
  const alphas = { low: { border: "06", glow: "04", inner: "08" }, mid: { border: "0a", glow: "08", inner: "10" }, high: { border: "12", glow: "0f", inner: "18" } };
  const a = alphas[intensity];

  // Inline SVG scale pattern as data URI
  const scalePatternH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='8' viewBox='0 0 20 8'%3E%3Cpath d='M0 4Q5 0 10 4Q15 8 20 4' fill='none' stroke='${encodeURIComponent(accent)}' stroke-width='1.5' opacity='0.6'/%3E%3C/svg%3E")`;
  const scalePatternV = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='20' viewBox='0 0 8 20'%3E%3Cpath d='M4 0Q0 5 4 10Q8 15 4 20' fill='none' stroke='${encodeURIComponent(accent)}' stroke-width='1.5' opacity='0.6'/%3E%3C/svg%3E")`;

  return (
    <div className={`relative rounded-[16px] ${className}`}>
      {/* L1: Outer glow stroke */}
      <div className="absolute -inset-[1px] rounded-[17px] pointer-events-none" style={{
        background: `linear-gradient(145deg, ${accent}${a.border}, transparent 35%, ${accent}05 55%, transparent 75%, ${accent}${a.border})`,
        boxShadow: `0 0 20px ${accent}${a.glow}`,
      }} />

      {/* L2: Scale borders — pure SVG patterns */}
      {!noScales && (
        <>
          <div className="absolute left-0 top-[14px] bottom-[14px] w-[8px] z-20 pointer-events-none" style={{ backgroundImage: scalePatternV, backgroundRepeat: "repeat-y", backgroundSize: "8px auto", filter: `drop-shadow(0 0 5px ${accent}) drop-shadow(0 0 10px ${accent}60)`, opacity: 0.7 }} />
          <div className="absolute right-0 top-[14px] bottom-[14px] w-[8px] z-20 pointer-events-none" style={{ backgroundImage: scalePatternV, backgroundRepeat: "repeat-y", backgroundSize: "8px auto", transform: "scaleX(-1)", filter: `drop-shadow(0 0 5px ${accent}) drop-shadow(0 0 10px ${accent}60)`, opacity: 0.7 }} />
          <div className="absolute bottom-0 left-[14px] right-[14px] h-[8px] z-20 pointer-events-none" style={{ backgroundImage: scalePatternH, backgroundRepeat: "repeat-x", backgroundSize: "auto 8px", filter: `drop-shadow(0 0 5px ${accent}) drop-shadow(0 0 10px ${accent}60)`, opacity: 0.7 }} />
          <div className="absolute top-0 left-[14px] right-[14px] h-[8px] z-20 pointer-events-none" style={{ backgroundImage: scalePatternH, backgroundRepeat: "repeat-x", backgroundSize: "auto 8px", transform: "scaleY(-1)", filter: `drop-shadow(0 0 5px ${accent}) drop-shadow(0 0 10px ${accent}60)`, opacity: 0.7 }} />
        </>
      )}

      {/* L3: Inner stroke */}
      <div className="absolute inset-[2px] rounded-[14px] pointer-events-none z-10" style={{
        border: `1px solid ${accent}${a.inner}`,
        boxShadow: `inset 0 0 16px ${accent}04`,
      }} />

      {/* L4: Glass */}
      <div className="absolute inset-0 rounded-[16px]" style={{
        background: "rgba(8,12,20,0.58)",
        backdropFilter: "blur(24px) saturate(1.15)",
        WebkitBackdropFilter: "blur(24px) saturate(1.15)",
        border: `1px solid ${accent}06`,
      }} />

      {/* L5: Edge highlight */}
      <div className="absolute top-[2px] left-[12%] right-[12%] h-[1px] z-10 pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, ${accent}20, transparent)` }} />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
