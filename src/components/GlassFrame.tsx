import React from "react";
import leftScales from "figma:asset/72ef9ba9c3fe7532bcac8261fdd9f80d49e9c5ea.png";
import rightScales from "figma:asset/57c3753959b3d37b4e1391d15d015be7d1e0db65.png";
import bottomScales from "figma:asset/6ca909935ac1dce0483657090f1a53e2a4196d6c.png";

interface Props {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable 3D-layered glass frame with dragon-scale borders.
 * Multi-stroke effect: outer glow → scale texture → inner stroke → glass.
 */
export function GlassFrame({ children, className = "", glowColor = "#A020F0", style }: Props) {
  return (
    <div className={`relative rounded-[20px] ${className}`} style={style}>
      {/* === LAYER 1: Outer glow border === */}
      <div className="absolute -inset-[1px] rounded-[21px] pointer-events-none" style={{
        background: `linear-gradient(135deg, ${glowColor}18, transparent 40%, ${glowColor}0a 60%, transparent 80%, ${glowColor}15)`,
        boxShadow: `0 0 25px ${glowColor}10, 0 0 60px ${glowColor}05`,
      }} />

      {/* === LAYER 2: Scale texture borders with neon leakage === */}
      <div className="absolute left-0 top-[16px] bottom-[16px] w-[10px] z-20 pointer-events-none rounded-l-[20px] overflow-hidden" style={{
        backgroundImage: `url(${leftScales})`, backgroundRepeat: "repeat-y", backgroundSize: "10px auto",
        filter: `drop-shadow(0 0 6px ${glowColor}) drop-shadow(0 0 12px ${glowColor}80)`,
      }} />
      <div className="absolute right-0 top-[16px] bottom-[16px] w-[10px] z-20 pointer-events-none rounded-r-[20px] overflow-hidden" style={{
        backgroundImage: `url(${rightScales})`, backgroundRepeat: "repeat-y", backgroundSize: "10px auto",
        filter: `drop-shadow(0 0 6px ${glowColor}) drop-shadow(0 0 12px ${glowColor}80)`,
      }} />
      <div className="absolute bottom-0 left-[16px] right-[16px] h-[10px] z-20 pointer-events-none" style={{
        backgroundImage: `url(${bottomScales})`, backgroundRepeat: "repeat-x", backgroundSize: "auto 10px",
        filter: `drop-shadow(0 0 6px ${glowColor}) drop-shadow(0 0 12px ${glowColor}80)`,
      }} />
      <div className="absolute top-0 left-[16px] right-[16px] h-[10px] z-20 pointer-events-none" style={{
        backgroundImage: `url(${bottomScales})`, backgroundRepeat: "repeat-x", backgroundSize: "auto 10px",
        transform: "scaleY(-1)",
        filter: `drop-shadow(0 0 6px ${glowColor}) drop-shadow(0 0 12px ${glowColor}80)`,
      }} />

      {/* === LAYER 3: Inner stroke (1px crisp line) === */}
      <div className="absolute inset-[3px] rounded-[17px] pointer-events-none z-10" style={{
        border: `1px solid ${glowColor}15`,
        boxShadow: `inset 0 0 20px ${glowColor}06`,
      }} />

      {/* === LAYER 4: Glass surface === */}
      <div className="absolute inset-0 rounded-[20px]" style={{
        background: "rgba(10, 6, 22, 0.55)",
        backdropFilter: "blur(28px) saturate(1.2)",
        WebkitBackdropFilter: "blur(28px) saturate(1.2)",
        border: `1px solid ${glowColor}0a`,
      }} />

      {/* === LAYER 5: Top edge highlight === */}
      <div className="absolute top-[3px] left-[15%] right-[15%] h-[1px] z-10 pointer-events-none" style={{
        background: `linear-gradient(90deg, transparent, ${glowColor}30, transparent)`,
      }} />
      {/* Bottom inner light */}
      <div className="absolute bottom-[3px] left-[20%] right-[20%] h-[1px] z-10 pointer-events-none" style={{
        background: `linear-gradient(90deg, transparent, ${glowColor}10, transparent)`,
      }} />

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
