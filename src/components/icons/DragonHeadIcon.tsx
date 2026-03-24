import React from "react";

interface Props {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  glow?: boolean;
  color?: string;
}

/**
 * Premium vector Dragon Head icon — crafted from the UIcomponents/Frame/Icon.svg aesthetic.
 * Lightweight inline SVG replacement for the heavy Vectornator-generated PNGs.
 */
export function DragonHeadIcon({ size = 64, className = "", style, glow = true, color }: Props) {
  const id = React.useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 160"
      width={size}
      height={size}
      className={className}
      style={style}
      fill="none"
    >
      <defs>
        {/* Main gradient */}
        <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color || "#00F0FF"} />
          <stop offset="50%" stopColor={color || "#B026FF"} />
          <stop offset="100%" stopColor={color || "#00F0FF"} />
        </linearGradient>
        {/* Glow filter */}
        {glow && (
          <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
        {/* Inner detail gradient */}
        <linearGradient id={`${id}-inner`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1A0A2E" />
          <stop offset="100%" stopColor="#2D1B4E" />
        </linearGradient>
        <radialGradient id={`${id}-eye`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="60%" stopColor="#00F0FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#B026FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Dragon head silhouette — stylized profile facing right */}
      <g filter={glow ? `url(#${id}-glow)` : undefined}>
        {/* Main head shape */}
        <path
          d="M80 12 C95 8, 120 15, 138 35 C148 47, 152 60, 148 78 C146 88, 140 96, 130 102 L125 105 C128 112, 126 120, 120 128 C114 136, 100 142, 88 148 C78 152, 65 150, 55 145 C48 141, 42 135, 38 127 C34 119, 32 110, 34 100 C30 98, 24 92, 20 84 C16 76, 15 66, 18 56 C21 46, 28 38, 38 32 C42 30, 48 28, 52 25 C58 20, 66 14, 80 12Z"
          fill={`url(#${id}-inner})`}
          stroke={`url(#${id}-grad)`}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Horn — upper left */}
        <path
          d="M72 16 C68 4, 58 2, 48 8 C56 6, 62 10, 66 18"
          stroke={`url(#${id}-grad)`}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Horn — upper right */}
        <path
          d="M98 14 C106 2, 118 0, 128 6 C120 4, 110 8, 104 16"
          stroke={`url(#${id}-grad)`}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Eye */}
        <ellipse cx="90" cy="56" rx="10" ry="9" fill={`url(#${id}-eye)`} />
        <ellipse cx="92" cy="54" rx="3" ry="4" fill="#00F0FF" opacity="0.9" />

        {/* Snout ridges */}
        <path
          d="M120 68 C128 62, 140 60, 148 64"
          stroke={`url(#${id}-grad)`}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M118 76 C126 72, 136 71, 144 74"
          stroke={`url(#${id}-grad)`}
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Jaw line */}
        <path
          d="M55 100 C62 112, 74 118, 88 122 C100 126, 112 124, 122 118"
          stroke={`url(#${id}-grad)`}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Scales pattern — decorative lines on cheek */}
        <path d="M68 70 C72 74, 78 76, 84 74" stroke={`url(#${id}-grad)`} strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M64 80 C70 84, 78 86, 86 82" stroke={`url(#${id}-grad)`} strokeWidth="1" fill="none" opacity="0.3" />
        <path d="M62 90 C70 94, 80 95, 90 90" stroke={`url(#${id}-grad)`} strokeWidth="1" fill="none" opacity="0.25" />

        {/* Nostril */}
        <circle cx="134" cy="70" r="3" fill={color || "#B026FF"} opacity="0.6" />

        {/* Neck spines */}
        <path
          d="M42 32 L36 22 L46 28 M48 28 L40 16 L52 24 M56 24 L50 12 L60 20"
          stroke={`url(#${id}-grad)`}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Chin whisker / tendril */}
        <path
          d="M65 120 C58 132, 50 140, 40 146"
          stroke={`url(#${id}-grad)`}
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path
          d="M75 126 C70 136, 62 144, 52 150"
          stroke={`url(#${id}-grad)`}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />
      </g>
    </svg>
  );
}
