import React from "react";

/**
 * Ultra-premium dragon-skin frame borders with realistic scale geometry,
 * animated glowing veins, and layered SVG filter effects for organic texture.
 */

/** Horizontal border (top/bottom) — multi-layered realistic dragon skin strip */
export function HorizontalBorder({ height = 40, className = "" }: { height?: number; className?: string }) {
  const id = React.useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 40"
      preserveAspectRatio="none"
      width="100%"
      height={height}
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        {/* Multi-stop energy vein gradient */}
        <linearGradient id={`${id}-vein`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00F0FF" stopOpacity="0" />
          <stop offset="8%" stopColor="#00F0FF" stopOpacity="0.2" />
          <stop offset="20%" stopColor="#B026FF" stopOpacity="0.6" />
          <stop offset="35%" stopColor="#00F0FF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FFF" stopOpacity="0.7" />
          <stop offset="65%" stopColor="#00F0FF" stopOpacity="0.9" />
          <stop offset="80%" stopColor="#B026FF" stopOpacity="0.6" />
          <stop offset="92%" stopColor="#00F0FF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
        </linearGradient>

        {/* Pulsing animated vein gradient */}
        <linearGradient id={`${id}-pulse`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00F0FF" stopOpacity="0">
            <animate attributeName="stopOpacity" values="0;0.4;0" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="30%" stopColor="#B026FF" stopOpacity="0.3">
            <animate attributeName="stopOpacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#FFF" stopOpacity="0.5">
            <animate attributeName="stopOpacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="70%" stopColor="#B026FF" stopOpacity="0.3">
            <animate attributeName="stopOpacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#00F0FF" stopOpacity="0">
            <animate attributeName="stopOpacity" values="0;0.4;0" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        {/* Realistic overlapping scale pattern — resembles actual reptile scales */}
        <pattern id={`${id}-scales`} x="0" y="0" width="20" height="18" patternUnits="userSpaceOnUse">
          {/* Row 1: Primary scales */}
          <path d="M0 9 Q5 1, 10 9 Q15 17, 20 9" fill="none" stroke="#00F0FF" strokeWidth="0.7" opacity="0.5" />
          {/* Row 2: Offset half-scales (creates overlapping look) */}
          <path d="M-10 0 Q-5 8, 0 0" fill="none" stroke="#B026FF" strokeWidth="0.5" opacity="0.3" />
          <path d="M10 0 Q15 8, 20 0" fill="none" stroke="#B026FF" strokeWidth="0.5" opacity="0.3" />
          <path d="M0 18 Q5 10, 10 18" fill="none" stroke="#B026FF" strokeWidth="0.5" opacity="0.3" />
          <path d="M10 18 Q15 10, 20 18" fill="none" stroke="#B026FF" strokeWidth="0.5" opacity="0.3" />
          {/* Scale center highlight dots */}
          <circle cx="10" cy="9" r="0.7" fill="#00F0FF" opacity="0.2" />
          <circle cx="0" cy="0" r="0.5" fill="#B026FF" opacity="0.15" />
          <circle cx="20" cy="0" r="0.5" fill="#B026FF" opacity="0.15" />
          {/* Micro vein lines inside scales */}
          <line x1="5" y1="5" x2="10" y2="9" stroke="#00F0FF" strokeWidth="0.15" opacity="0.2" />
          <line x1="15" y1="5" x2="10" y2="9" stroke="#00F0FF" strokeWidth="0.15" opacity="0.2" />
        </pattern>

        {/* Organic skin texture filter (bump map + specular lighting) */}
        <filter id={`${id}-skin`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06 0.12" numOctaves="5" seed="7" result="noise" />
          <feSpecularLighting in="noise" surfaceScale="3" specularConstant="0.6" specularExponent="20" lightingColor="#445566" result="specular">
            <feDistantLight azimuth="45" elevation="50" />
          </feSpecularLighting>
          <feComposite in="specular" in2="SourceGraphic" operator="in" result="textured" />
          <feBlend in="textured" in2="SourceGraphic" mode="screen" />
        </filter>

        {/* Vein glow filter */}
        <filter id={`${id}-glow`} x="-15%" y="-80%" width="130%" height="260%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Deep inner glow for depth */}
        <filter id={`${id}-depth`} x="-5%" y="-20%" width="110%" height="140%">
          <feGaussianBlur stdDeviation="1" result="soft" />
          <feComposite in="SourceGraphic" in2="soft" operator="over" />
        </filter>
      </defs>

      {/* L1: Dark base band with slight gradient for depth */}
      <rect x="0" y="2" width="600" height="36" fill="rgba(8,6,18,0.75)" rx="4" />
      <rect x="0" y="2" width="600" height="18" fill="rgba(0,240,255,0.02)" rx="4" />

      {/* L2: Realistic skin texture via SVG filter */}
      <rect x="0" y="2" width="600" height="36" filter={`url(#${id}-skin)`} opacity="0.35" rx="4" />

      {/* L3: Overlapping scale pattern — the signature dragon look */}
      <rect x="0" y="0" width="600" height="40" fill={`url(#${id}-scales)`} opacity="0.9" />

      {/* L4: Scale ridge zigzag (top edge) */}
      <path d="M0 6 L6 2 L12 6 L18 2 L24 6 L30 2 L36 6 L42 2 L48 6 L54 2 L60 6 L66 2 L72 6 L78 2 L84 6 L90 2 L96 6 L102 2 L108 6 L114 2 L120 6 L126 2 L132 6 L138 2 L144 6 L150 2 L156 6 L162 2 L168 6 L174 2 L180 6 L186 2 L192 6 L198 2 L204 6 L210 2 L216 6 L222 2 L228 6 L234 2 L240 6 L246 2 L252 6 L258 2 L264 6 L270 2 L276 6 L282 2 L288 6 L294 2 L300 6 L306 2 L312 6 L318 2 L324 6 L330 2 L336 6 L342 2 L348 6 L354 2 L360 6 L366 2 L372 6 L378 2 L384 6 L390 2 L396 6 L402 2 L408 6 L414 2 L420 6 L426 2 L432 6 L438 2 L444 6 L450 2 L456 6 L462 2 L468 6 L474 2 L480 6 L486 2 L492 6 L498 2 L504 6 L510 2 L516 6 L522 2 L528 6 L534 2 L540 6 L546 2 L552 6 L558 2 L564 6 L570 2 L576 6 L582 2 L588 6 L594 2 L600 6" stroke="#00F0FF" strokeWidth="0.5" fill="none" opacity="0.35" filter={`url(#${id}-depth)`} />

      {/* L5: Scale ridge zigzag (bottom edge) */}
      <path d="M0 34 L6 38 L12 34 L18 38 L24 34 L30 38 L36 34 L42 38 L48 34 L54 38 L60 34 L66 38 L72 34 L78 38 L84 34 L90 38 L96 34 L102 38 L108 34 L114 38 L120 34 L126 38 L132 34 L138 38 L144 34 L150 38 L156 34 L162 38 L168 34 L174 38 L180 34 L186 38 L192 34 L198 38 L204 34 L210 38 L216 34 L222 38 L228 34 L234 38 L240 34 L246 38 L252 34 L258 38 L264 34 L270 38 L276 34 L282 38 L288 34 L294 38 L300 34 L306 38 L312 34 L318 38 L324 34 L330 38 L336 34 L342 38 L348 34 L354 38 L360 34 L366 38 L372 34 L378 38 L384 34 L390 38 L396 34 L402 38 L408 34 L414 38 L420 34 L426 38 L432 34 L438 38 L444 34 L450 38 L456 34 L462 38 L468 34 L474 38 L480 34 L486 38 L492 34 L498 38 L504 34 L510 38 L516 34 L522 38 L528 34 L534 38 L540 34 L546 38 L552 34 L558 38 L564 34 L570 38 L576 34 L582 38 L588 34 L594 38 L600 34" stroke="#B026FF" strokeWidth="0.4" fill="none" opacity="0.25" />

      {/* L6: Secondary capillary veins — organic branching */}
      <path d="M0 12 Q30 6,60 12 Q90 18,120 12 Q150 6,180 12 Q210 18,240 12 Q270 6,300 12 Q330 18,360 12 Q390 6,420 12 Q450 18,480 12 Q510 6,540 12 Q570 18,600 12" stroke={`url(#${id}-vein)`} strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M0 28 Q30 34,60 28 Q90 22,120 28 Q150 34,180 28 Q210 22,240 28 Q270 34,300 28 Q330 22,360 28 Q390 34,420 28 Q450 22,480 28 Q510 34,540 28 Q570 22,600 28" stroke={`url(#${id}-vein)`} strokeWidth="0.5" fill="none" opacity="0.4" />

      {/* L7: PRIMARY GLOWING ENERGY VEIN — center artery */}
      <line x1="0" y1="20" x2="600" y2="20" stroke={`url(#${id}-vein)`} strokeWidth="2" filter={`url(#${id}-glow)`} />
      {/* Animated pulse overlay on the vein */}
      <line x1="0" y1="20" x2="600" y2="20" stroke={`url(#${id}-pulse)`} strokeWidth="3" filter={`url(#${id}-glow)`} opacity="0.6" />

      {/* L8: Thin highlight edges for embossed look */}
      <line x1="0" y1="3" x2="600" y2="3" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <line x1="0" y1="37" x2="600" y2="37" stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" />
    </svg>
  );
}

/** Vertical border (left/right) — dragon skin column with animated veins */
export function VerticalBorder({ width = 40, className = "" }: { width?: number; className?: string }) {
  const id = React.useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 600"
      preserveAspectRatio="none"
      width={width}
      height="100%"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={`${id}-vein`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B026FF" stopOpacity="0" />
          <stop offset="8%" stopColor="#B026FF" stopOpacity="0.2" />
          <stop offset="20%" stopColor="#00F0FF" stopOpacity="0.6" />
          <stop offset="35%" stopColor="#B026FF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FFF" stopOpacity="0.6" />
          <stop offset="65%" stopColor="#B026FF" stopOpacity="0.9" />
          <stop offset="80%" stopColor="#00F0FF" stopOpacity="0.6" />
          <stop offset="92%" stopColor="#B026FF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#B026FF" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={`${id}-pulse`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B026FF" stopOpacity="0">
            <animate attributeName="stopOpacity" values="0;0.3;0" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="35%" stopColor="#00F0FF" stopOpacity="0.3">
            <animate attributeName="stopOpacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#FFF" stopOpacity="0.4">
            <animate attributeName="stopOpacity" values="0.4;0.9;0.4" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="65%" stopColor="#00F0FF" stopOpacity="0.3">
            <animate attributeName="stopOpacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#B026FF" stopOpacity="0">
            <animate attributeName="stopOpacity" values="0;0.3;0" dur="4s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        <pattern id={`${id}-vscales`} x="0" y="0" width="18" height="20" patternUnits="userSpaceOnUse">
          <path d="M9 0 Q1 5, 9 10 Q17 15, 9 20" fill="none" stroke="#B026FF" strokeWidth="0.7" opacity="0.5" />
          <path d="M0 10 Q8 15, 0 20" fill="none" stroke="#00F0FF" strokeWidth="0.5" opacity="0.3" />
          <path d="M18 10 Q10 15, 18 20" fill="none" stroke="#00F0FF" strokeWidth="0.5" opacity="0.3" />
          <path d="M0 0 Q8 5, 0 10" fill="none" stroke="#00F0FF" strokeWidth="0.5" opacity="0.3" />
          <path d="M18 0 Q10 5, 18 10" fill="none" stroke="#00F0FF" strokeWidth="0.5" opacity="0.3" />
          <circle cx="9" cy="10" r="0.7" fill="#B026FF" opacity="0.2" />
          <line x1="5" y1="5" x2="9" y2="10" stroke="#B026FF" strokeWidth="0.15" opacity="0.2" />
          <line x1="13" y1="5" x2="9" y2="10" stroke="#B026FF" strokeWidth="0.15" opacity="0.2" />
        </pattern>

        <filter id={`${id}-skin`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.12 0.06" numOctaves="5" seed="13" result="noise" />
          <feSpecularLighting in="noise" surfaceScale="3" specularConstant="0.6" specularExponent="20" lightingColor="#445566" result="specular">
            <feDistantLight azimuth="135" elevation="50" />
          </feSpecularLighting>
          <feComposite in="specular" in2="SourceGraphic" operator="in" result="textured" />
          <feBlend in="textured" in2="SourceGraphic" mode="screen" />
        </filter>

        <filter id={`${id}-glow`} x="-80%" y="-15%" width="260%" height="130%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <rect x="2" y="0" width="36" height="600" fill="rgba(8,6,18,0.75)" rx="4" />
      <rect x="2" y="0" width="18" height="600" fill="rgba(176,38,255,0.02)" rx="4" />
      <rect x="2" y="0" width="36" height="600" filter={`url(#${id}-skin)`} opacity="0.35" rx="4" />
      <rect x="0" y="0" width="40" height="600" fill={`url(#${id}-vscales)`} opacity="0.9" />

      {/* Zigzag scale ridge edges */}
      <path d="M6 0 L2 6 L6 12 L2 18 L6 24 L2 30 L6 36 L2 42 L6 48 L2 54 L6 60 L2 66 L6 72 L2 78 L6 84 L2 90 L6 96 L2 102 L6 108 L2 114 L6 120 L2 126 L6 132 L2 138 L6 144 L2 150 L6 156 L2 162 L6 168 L2 174 L6 180 L2 186 L6 192 L2 198 L6 204 L2 210 L6 216 L2 222 L6 228 L2 234 L6 240 L2 246 L6 252 L2 258 L6 264 L2 270 L6 276 L2 282 L6 288 L2 294 L6 300 L2 306 L6 312 L2 318 L6 324 L2 330 L6 336 L2 342 L6 348 L2 354 L6 360 L2 366 L6 372 L2 378 L6 384 L2 390 L6 396 L2 402 L6 408 L2 414 L6 420 L2 426 L6 432 L2 438 L6 444 L2 450 L6 456 L2 462 L6 468 L2 474 L6 480 L2 486 L6 492 L2 498 L6 504 L2 510 L6 516 L2 522 L6 528 L2 534 L6 540 L2 546 L6 552 L2 558 L6 564 L2 570 L6 576 L2 582 L6 588 L2 594 L6 600" stroke="#B026FF" strokeWidth="0.5" fill="none" opacity="0.35" />
      <path d="M34 0 L38 6 L34 12 L38 18 L34 24 L38 30 L34 36 L38 42 L34 48 L38 54 L34 60 L38 66 L34 72 L38 78 L34 84 L38 90 L34 96 L38 102 L34 108 L38 114 L34 120 L38 126 L34 132 L38 138 L34 144 L38 150 L34 156 L38 162 L34 168 L38 174 L34 180 L38 186 L34 192 L38 198 L34 204 L38 210 L34 216 L38 222 L34 228 L38 234 L34 240 L38 246 L34 252 L38 258 L34 264 L38 270 L34 276 L38 282 L34 288 L38 294 L34 300 L38 306 L34 312 L38 318 L34 324 L38 330 L34 336 L38 342 L34 348 L38 354 L34 360 L38 366 L34 372 L38 378 L34 384 L38 390 L34 396 L38 402 L34 408 L38 414 L34 420 L38 426 L34 432 L38 438 L34 444 L38 450 L34 456 L38 462 L34 468 L38 474 L34 480 L38 486 L34 492 L38 498 L34 504 L38 510 L34 516 L38 522 L34 528 L38 534 L34 540 L38 546 L34 552 L38 558 L34 564 L38 570 L34 576 L38 582 L34 588 L38 594 L34 600" stroke="#00F0FF" strokeWidth="0.4" fill="none" opacity="0.25" />

      {/* Capillary veins */}
      <path d="M12 0 Q6 30,12 60 Q18 90,12 120 Q6 150,12 180 Q18 210,12 240 Q6 270,12 300 Q18 330,12 360 Q6 390,12 420 Q18 450,12 480 Q6 510,12 540 Q18 570,12 600" stroke={`url(#${id}-vein)`} strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M28 0 Q34 30,28 60 Q22 90,28 120 Q34 150,28 180 Q22 210,28 240 Q34 270,28 300 Q22 330,28 360 Q34 390,28 420 Q22 450,28 480 Q34 510,28 540 Q22 570,28 600" stroke={`url(#${id}-vein)`} strokeWidth="0.5" fill="none" opacity="0.4" />

      {/* PRIMARY center artery + animated pulse */}
      <line x1="20" y1="0" x2="20" y2="600" stroke={`url(#${id}-vein)`} strokeWidth="2" filter={`url(#${id}-glow)`} />
      <line x1="20" y1="0" x2="20" y2="600" stroke={`url(#${id}-pulse)`} strokeWidth="3" filter={`url(#${id}-glow)`} opacity="0.6" />

      {/* Embossed edge highlights */}
      <line x1="3" y1="0" x2="3" y2="600" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <line x1="37" y1="0" x2="37" y2="600" stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" />
    </svg>
  );
}

/** Corner ornament — dragon scale rosette with animated glowing dragon eye */
export function CornerOrnament({ size = 56, className = "", rotation = 0 }: { size?: number; className?: string; rotation?: number }) {
  const id = React.useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 56"
      width={size}
      height={size}
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <defs>
        <radialGradient id={`${id}-eye`} cx="12%" cy="12%" r="85%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0.9">
            <animate attributeName="stopOpacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />
          </stop>
          <stop offset="15%" stopColor="#00F0FF" stopOpacity="0.8" />
          <stop offset="40%" stopColor="#B026FF" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#00F0FF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id={`${id}-depth`}>
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        {/* Scale pattern for corner fill */}
        <pattern id={`${id}-cscale`} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 5 Q2.5 0, 5 5 Q7.5 10, 10 5" fill="none" stroke="#00F0FF" strokeWidth="0.4" opacity="0.3" />
        </pattern>
      </defs>

      {/* Corner fill with scale texture */}
      <path d="M0 0 L0 40 Q0 20, 20 20 L40 20 Q20 20, 20 0 L0 0Z" fill="rgba(8,6,18,0.5)" />
      <path d="M0 0 L0 40 Q0 20, 20 20 L40 20 Q20 20, 20 0 L0 0Z" fill={`url(#${id}-cscale)`} />

      {/* Multi-arc scale curves */}
      <path d="M0 0 Q0 28, 28 28 Q28 0, 56 0" fill="none" stroke="#00F0FF" strokeWidth="1.5" opacity="0.6" filter={`url(#${id}-glow)`} />
      <path d="M0 0 Q0 22, 22 22 Q22 0, 44 0" fill="none" stroke="#B026FF" strokeWidth="1" opacity="0.4" filter={`url(#${id}-depth)`} />
      <path d="M0 0 Q0 16, 16 16 Q16 0, 32 0" fill="none" stroke="#00F0FF" strokeWidth="0.8" opacity="0.5" />
      <path d="M0 0 Q0 10, 10 10 Q10 0, 20 0" fill="none" stroke="#B026FF" strokeWidth="0.5" opacity="0.3" />

      {/* Scale ridge details near corner */}
      <path d="M3 18 Q9 14, 18 18" stroke="#00F0FF" strokeWidth="0.4" fill="none" opacity="0.3" />
      <path d="M18 3 Q14 9, 18 18" stroke="#B026FF" strokeWidth="0.4" fill="none" opacity="0.3" />
      <path d="M2 12 Q6 9, 12 12" stroke="#00F0FF" strokeWidth="0.3" fill="none" opacity="0.2" />
      <path d="M12 2 Q9 6, 12 12" stroke="#B026FF" strokeWidth="0.3" fill="none" opacity="0.2" />

      {/* Animated dragon eye — glowing core */}
      <circle cx="7" cy="7" r="5" fill={`url(#${id}-eye)`} filter={`url(#${id}-glow)`} />
      <circle cx="7" cy="7" r="2" fill="#00F0FF" opacity="0.8">
        <animate attributeName="r" values="2;2.5;2" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="7" cy="7" r="1" fill="#FFF" opacity="0.95" />
      {/* Pupil slit */}
      <line x1="7" y1="5" x2="7" y2="9" stroke="#0a0e16" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
