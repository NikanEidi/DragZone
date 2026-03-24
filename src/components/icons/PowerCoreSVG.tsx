import React from "react";

/**
 * Animated hexagonal power core — replaces the PNG figma asset.
 * Pure SVG with CSS animations for a premium rotating hex indicator.
 */
export function PowerCoreSVG({ size = 48, className = "" }: { size?: number; className?: string }) {
  const id = React.useId();
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      {/* Outer animated ring */}
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        className="absolute inset-0"
        style={{ animation: "hexSpin 8s linear infinite", willChange: "transform" }}
      >
        <defs>
          <linearGradient id={`${id}-ring`} gradientTransform="rotate(0)">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="33%" stopColor="#4A9BD9" />
            <stop offset="66%" stopColor="#B026FF" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>
        </defs>
        <polygon
          points="50,2 93,27 93,73 50,98 7,73 7,27"
          fill="none"
          stroke={`url(#${id}-ring)`}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>

      {/* Inner hex with dragon eye pattern */}
      <svg viewBox="0 0 100 100" width="100%" height="100%" className="absolute inset-0">
        <defs>
          <radialGradient id={`${id}-core`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0A1628" />
            <stop offset="60%" stopColor="#070B14" />
            <stop offset="100%" stopColor="#040408" />
          </radialGradient>
          <radialGradient id={`${id}-eye`} cx="50%" cy="40%" r="40%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#B026FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <clipPath id={`${id}-hex`}>
          <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" />
        </clipPath>
        <g clipPath={`url(#${id}-hex)`}>
          <rect width="100" height="100" fill={`url(#${id}-core)`} />
          {/* Animated energy pulse */}
          <circle cx="50" cy="50" r="25" fill={`url(#${id}-eye)`} style={{ animation: "pulseGlow 3s ease-in-out infinite", willChange: "opacity" }} />
          {/* Circuit lines */}
          <line x1="30" y1="50" x2="70" y2="50" stroke="#00F0FF" strokeWidth="0.5" opacity="0.3" />
          <line x1="50" y1="30" x2="50" y2="70" stroke="#B026FF" strokeWidth="0.5" opacity="0.3" />
          <line x1="35" y1="35" x2="65" y2="65" stroke="#00F0FF" strokeWidth="0.3" opacity="0.2" />
          <line x1="65" y1="35" x2="35" y2="65" stroke="#B026FF" strokeWidth="0.3" opacity="0.2" />
          {/* Center dot */}
          <circle cx="50" cy="50" r="4" fill="#00F0FF" opacity="0.6" />
          <circle cx="50" cy="50" r="2" fill="#FFF" opacity="0.8" />
        </g>
      </svg>

      {/* Ambient glow */}
      <div
        className="absolute -inset-3 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,240,255,0.12) 0%, transparent 65%)",
          animation: "pulseGlow 4s ease-in-out infinite",
          willChange: "opacity",
        }}
      />
    </div>
  );
}
