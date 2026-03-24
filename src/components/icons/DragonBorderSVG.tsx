import React from "react";

/**
 * ULTRA-PREMIUM dragon-skin frame borders.
 * High-contrast, deeply textured, with animated energy veins.
 */

export function HorizontalBorder({ height = 44, className = "" }: { height?: number; className?: string }) {
  const id = React.useId();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 44" preserveAspectRatio="none"
      width="100%" height={height} className={className} style={{ display: "block" }}>
      <defs>
        {/* Bright energy vein */}
        <linearGradient id={`${id}-v`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00F0FF" stopOpacity="0" />
          <stop offset="12%" stopColor="#00F0FF" stopOpacity="0.5" />
          <stop offset="30%" stopColor="#B026FF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#00F0FF" stopOpacity="1" />
          <stop offset="70%" stopColor="#B026FF" stopOpacity="0.9" />
          <stop offset="88%" stopColor="#00F0FF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
        </linearGradient>
        {/* Animated pulse */}
        <linearGradient id={`${id}-p`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00F0FF" stopOpacity="0">
            <animate attributeName="stopOpacity" values="0;0.6;0" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#FFF" stopOpacity="0.3">
            <animate attributeName="stopOpacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#B026FF" stopOpacity="0">
            <animate attributeName="stopOpacity" values="0;0.6;0" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
        {/* Dense overlapping dragon scales */}
        <pattern id={`${id}-s`} width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 7Q3.5 0,7 7Q10.5 14,14 7" fill="none" stroke="#00F0FF" strokeWidth="0.9" opacity="0.6"/>
          <path d="M7 0Q10.5 7,14 0" fill="none" stroke="#B026FF" strokeWidth="0.7" opacity="0.45"/>
          <path d="M0 0Q3.5 7,7 0" fill="none" stroke="#B026FF" strokeWidth="0.7" opacity="0.45"/>
          <path d="M0 14Q3.5 7,7 14" fill="none" stroke="#00F0FF" strokeWidth="0.5" opacity="0.3"/>
          <path d="M7 14Q10.5 7,14 14" fill="none" stroke="#00F0FF" strokeWidth="0.5" opacity="0.3"/>
          <circle cx="7" cy="7" r="1" fill="#00F0FF" opacity="0.35"/>
          <line x1="3" y1="3" x2="7" y2="7" stroke="#00F0FF" strokeWidth="0.2" opacity="0.3"/>
          <line x1="11" y1="3" x2="7" y2="7" stroke="#B026FF" strokeWidth="0.2" opacity="0.3"/>
        </pattern>
        {/* Organic bump texture */}
        <filter id={`${id}-t`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.1" numOctaves="5" seed="42"/>
          <feSpecularLighting surfaceScale="4" specularConstant="0.8" specularExponent="18" lightingColor="#5588aa">
            <feDistantLight azimuth="45" elevation="55"/>
          </feSpecularLighting>
          <feComposite in2="SourceGraphic" operator="in"/>
        </filter>
        {/* Bright glow */}
        <filter id={`${id}-g`} x="-10%" y="-100%" width="120%" height="300%">
          <feGaussianBlur stdDeviation="3"/>
          <feComposite in="SourceGraphic" operator="over"/>
        </filter>
      </defs>

      {/* Base dark band with blue-purple gradient */}
      <rect x="0" y="0" width="800" height="44" rx="3"
        fill="linear-gradient(rgba(8,4,20,0.9), rgba(12,8,28,0.85))" />
      <rect x="0" y="0" width="800" height="22" rx="3" fill="rgba(0,240,255,0.04)"/>
      <rect x="0" y="22" width="800" height="22" rx="3" fill="rgba(176,38,255,0.03)"/>

      {/* Organic texture layer */}
      <rect x="0" y="0" width="800" height="44" filter={`url(#${id}-t)`} opacity="0.5" rx="3"/>

      {/* Dragon scale pattern — HIGH OPACITY for visibility */}
      <rect x="0" y="0" width="800" height="44" fill={`url(#${id}-s)`}/>

      {/* Serrated scale edges - top */}
      <path d="M0 4L5 0L10 4L15 0L20 4L25 0L30 4L35 0L40 4L45 0L50 4L55 0L60 4L65 0L70 4L75 0L80 4L85 0L90 4L95 0L100 4L105 0L110 4L115 0L120 4L125 0L130 4L135 0L140 4L145 0L150 4L155 0L160 4L165 0L170 4L175 0L180 4L185 0L190 4L195 0L200 4L205 0L210 4L215 0L220 4L225 0L230 4L235 0L240 4L245 0L250 4L255 0L260 4L265 0L270 4L275 0L280 4L285 0L290 4L295 0L300 4L305 0L310 4L315 0L320 4L325 0L330 4L335 0L340 4L345 0L350 4L355 0L360 4L365 0L370 4L375 0L380 4L385 0L390 4L395 0L400 4L405 0L410 4L415 0L420 4L425 0L430 4L435 0L440 4L445 0L450 4L455 0L460 4L465 0L470 4L475 0L480 4L485 0L490 4L495 0L500 4L505 0L510 4L515 0L520 4L525 0L530 4L535 0L540 4L545 0L550 4L555 0L560 4L565 0L570 4L575 0L580 4L585 0L590 4L595 0L600 4L605 0L610 4L615 0L620 4L625 0L630 4L635 0L640 4L645 0L650 4L655 0L660 4L665 0L670 4L675 0L680 4L685 0L690 4L695 0L700 4L705 0L710 4L715 0L720 4L725 0L730 4L735 0L740 4L745 0L750 4L755 0L760 4L765 0L770 4L775 0L780 4L785 0L790 4L795 0L800 4"
        stroke="#00F0FF" strokeWidth="0.8" fill="none" opacity="0.6"/>
      {/* Serrated scale edges - bottom */}
      <path d="M0 40L5 44L10 40L15 44L20 40L25 44L30 40L35 44L40 40L45 44L50 40L55 44L60 40L65 44L70 40L75 44L80 40L85 44L90 40L95 44L100 40L105 44L110 40L115 44L120 40L125 44L130 40L135 44L140 40L145 44L150 40L155 44L160 40L165 44L170 40L175 44L180 40L185 44L190 40L195 44L200 40L205 44L210 40L215 44L220 40L225 44L230 40L235 44L240 40L245 44L250 40L255 44L260 40L265 44L270 40L275 44L280 40L285 44L290 40L295 44L300 40L305 44L310 40L315 44L320 40L325 44L330 40L335 44L340 40L345 44L350 40L355 44L360 40L365 44L370 40L375 44L380 40L385 44L390 40L395 44L400 40L405 44L410 40L415 44L420 40L425 44L430 40L435 44L440 40L445 44L450 40L455 44L460 40L465 44L470 40L475 44L480 40L485 44L490 40L495 44L500 40L505 44L510 40L515 44L520 40L525 44L530 40L535 44L540 40L545 44L550 40L555 44L560 40L565 44L570 40L575 44L580 40L585 44L590 40L595 44L600 40L605 44L610 40L615 44L620 40L625 44L630 40L635 44L640 40L645 44L650 40L655 44L660 40L665 44L670 40L675 44L680 40L685 44L690 40L695 44L700 40L705 44L710 40L715 44L720 40L725 44L730 40L735 44L740 40L745 44L750 40L755 44L760 40L765 44L770 40L775 44L780 40L785 44L790 40L795 44L800 40"
        stroke="#B026FF" strokeWidth="0.6" fill="none" opacity="0.45"/>

      {/* Capillary veins */}
      <path d="M0 11Q40 5,80 11Q120 17,160 11Q200 5,240 11Q280 17,320 11Q360 5,400 11Q440 17,480 11Q520 5,560 11Q600 17,640 11Q680 5,720 11Q760 17,800 11" stroke={`url(#${id}-v)`} strokeWidth="0.8" fill="none" opacity="0.7"/>
      <path d="M0 33Q40 39,80 33Q120 27,160 33Q200 39,240 33Q280 27,320 33Q360 39,400 33Q440 27,480 33Q520 39,560 33Q600 27,640 33Q680 39,720 33Q760 27,800 33" stroke={`url(#${id}-v)`} strokeWidth="0.8" fill="none" opacity="0.6"/>

      {/* PRIMARY GLOWING ARTERY */}
      <line x1="0" y1="22" x2="800" y2="22" stroke={`url(#${id}-v)`} strokeWidth="2.5" filter={`url(#${id}-g)`}/>
      <line x1="0" y1="22" x2="800" y2="22" stroke={`url(#${id}-p)`} strokeWidth="4" filter={`url(#${id}-g)`} opacity="0.7"/>

      {/* Embossed edge highlights */}
      <line x1="0" y1="1" x2="800" y2="1" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6"/>
      <line x1="0" y1="43" x2="800" y2="43" stroke="rgba(0,0,0,0.6)" strokeWidth="0.6"/>

      {/* Inner track lines */}
      <line x1="0" y1="8" x2="800" y2="8" stroke="rgba(0,240,255,0.08)" strokeWidth="0.3"/>
      <line x1="0" y1="36" x2="800" y2="36" stroke="rgba(176,38,255,0.06)" strokeWidth="0.3"/>
    </svg>
  );
}

export function VerticalBorder({ width = 44, className = "" }: { width?: number; className?: string }) {
  const id = React.useId();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 800" preserveAspectRatio="none"
      width={width} height="100%" className={className} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`${id}-v`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B026FF" stopOpacity="0"/>
          <stop offset="12%" stopColor="#B026FF" stopOpacity="0.5"/>
          <stop offset="30%" stopColor="#00F0FF" stopOpacity="0.9"/>
          <stop offset="50%" stopColor="#B026FF" stopOpacity="1"/>
          <stop offset="70%" stopColor="#00F0FF" stopOpacity="0.9"/>
          <stop offset="88%" stopColor="#B026FF" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#B026FF" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id={`${id}-p`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B026FF" stopOpacity="0">
            <animate attributeName="stopOpacity" values="0;0.5;0" dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="50%" stopColor="#FFF" stopOpacity="0.3">
            <animate attributeName="stopOpacity" values="0.3;0.9;0.3" dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#00F0FF" stopOpacity="0">
            <animate attributeName="stopOpacity" values="0;0.5;0" dur="4s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>
        <pattern id={`${id}-s`} width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M7 0Q0 3.5,7 7Q14 10.5,7 14" fill="none" stroke="#B026FF" strokeWidth="0.9" opacity="0.6"/>
          <path d="M0 7Q7 10.5,0 14" fill="none" stroke="#00F0FF" strokeWidth="0.7" opacity="0.45"/>
          <path d="M14 7Q7 10.5,14 14" fill="none" stroke="#00F0FF" strokeWidth="0.7" opacity="0.45"/>
          <path d="M0 0Q7 3.5,0 7" fill="none" stroke="#B026FF" strokeWidth="0.5" opacity="0.3"/>
          <path d="M14 0Q7 3.5,14 7" fill="none" stroke="#B026FF" strokeWidth="0.5" opacity="0.3"/>
          <circle cx="7" cy="7" r="1" fill="#B026FF" opacity="0.35"/>
          <line x1="3" y1="3" x2="7" y2="7" stroke="#B026FF" strokeWidth="0.2" opacity="0.3"/>
          <line x1="11" y1="3" x2="7" y2="7" stroke="#00F0FF" strokeWidth="0.2" opacity="0.3"/>
        </pattern>
        <filter id={`${id}-t`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.1 0.05" numOctaves="5" seed="99"/>
          <feSpecularLighting surfaceScale="4" specularConstant="0.8" specularExponent="18" lightingColor="#5588aa">
            <feDistantLight azimuth="135" elevation="55"/>
          </feSpecularLighting>
          <feComposite in2="SourceGraphic" operator="in"/>
        </filter>
        <filter id={`${id}-g`} x="-100%" y="-10%" width="300%" height="120%">
          <feGaussianBlur stdDeviation="3"/>
          <feComposite in="SourceGraphic" operator="over"/>
        </filter>
      </defs>

      <rect x="0" y="0" width="44" height="800" rx="3" fill="rgba(8,4,20,0.9)"/>
      <rect x="0" y="0" width="22" height="800" rx="3" fill="rgba(176,38,255,0.04)"/>
      <rect x="22" y="0" width="22" height="800" rx="3" fill="rgba(0,240,255,0.03)"/>
      <rect x="0" y="0" width="44" height="800" filter={`url(#${id}-t)`} opacity="0.5" rx="3"/>
      <rect x="0" y="0" width="44" height="800" fill={`url(#${id}-s)`}/>

      {/* Serrated edges */}
      <path d="M4 0L0 5L4 10L0 15L4 20L0 25L4 30L0 35L4 40L0 45L4 50L0 55L4 60L0 65L4 70L0 75L4 80L0 85L4 90L0 95L4 100L0 105L4 110L0 115L4 120L0 125L4 130L0 135L4 140L0 145L4 150L0 155L4 160L0 165L4 170L0 175L4 180L0 185L4 190L0 195L4 200L0 205L4 210L0 215L4 220L0 225L4 230L0 235L4 240L0 245L4 250L0 255L4 260L0 265L4 270L0 275L4 280L0 285L4 290L0 295L4 300L0 305L4 310L0 315L4 320L0 325L4 330L0 335L4 340L0 345L4 350L0 355L4 360L0 365L4 370L0 375L4 380L0 385L4 390L0 395L4 400L0 405L4 410L0 415L4 420L0 425L4 430L0 435L4 440L0 445L4 450L0 455L4 460L0 465L4 470L0 475L4 480L0 485L4 490L0 495L4 500L0 505L4 510L0 515L4 520L0 525L4 530L0 535L4 540L0 545L4 550L0 555L4 560L0 565L4 570L0 575L4 580L0 585L4 590L0 595L4 600L0 605L4 610L0 615L4 620L0 625L4 630L0 635L4 640L0 645L4 650L0 655L4 660L0 665L4 670L0 675L4 680L0 685L4 690L0 695L4 700L0 705L4 710L0 715L4 720L0 725L4 730L0 735L4 740L0 745L4 750L0 755L4 760L0 765L4 770L0 775L4 780L0 785L4 790L0 795L4 800"
        stroke="#B026FF" strokeWidth="0.8" fill="none" opacity="0.6"/>
      <path d="M40 0L44 5L40 10L44 15L40 20L44 25L40 30L44 35L40 40L44 45L40 50L44 55L40 60L44 65L40 70L44 75L40 80L44 85L40 90L44 95L40 100L44 105L40 110L44 115L40 120L44 125L40 130L44 135L40 140L44 145L40 150L44 155L40 160L44 165L40 170L44 175L40 180L44 185L40 190L44 195L40 200L44 205L40 210L44 215L40 220L44 225L40 230L44 235L40 240L44 245L40 250L44 255L40 260L44 265L40 270L44 275L40 280L44 285L40 290L44 295L40 300L44 305L40 310L44 315L40 320L44 325L40 330L44 335L40 340L44 345L40 350L44 355L40 360L44 365L40 370L44 375L40 380L44 385L40 390L44 395L40 400L44 405L40 410L44 415L40 420L44 425L40 430L44 435L40 440L44 445L40 450L44 455L40 460L44 465L40 470L44 475L40 480L44 485L40 490L44 495L40 500L44 505L40 510L44 515L40 520L44 525L40 530L44 535L40 540L44 545L40 550L44 555L40 560L44 565L40 570L44 575L40 580L44 585L40 590L44 595L40 600L44 605L40 610L44 615L40 620L44 625L40 630L44 635L40 640L44 645L40 650L44 655L40 660L44 665L40 670L44 675L40 680L44 685L40 690L44 695L40 700L44 705L40 710L44 715L40 720L44 725L40 730L44 735L40 740L44 745L40 750L44 755L40 760L44 765L40 770L44 775L40 780L44 785L40 790L44 795L40 800"
        stroke="#00F0FF" strokeWidth="0.6" fill="none" opacity="0.45"/>

      <path d="M11 0Q5 40,11 80Q17 120,11 160Q5 200,11 240Q17 280,11 320Q5 360,11 400Q17 440,11 480Q5 520,11 560Q17 600,11 640Q5 680,11 720Q17 760,11 800" stroke={`url(#${id}-v)`} strokeWidth="0.8" fill="none" opacity="0.7"/>
      <path d="M33 0Q39 40,33 80Q27 120,33 160Q39 200,33 240Q27 280,33 320Q39 360,33 400Q27 440,33 480Q39 520,33 560Q27 600,33 640Q39 680,33 720Q27 760,33 800" stroke={`url(#${id}-v)`} strokeWidth="0.8" fill="none" opacity="0.6"/>

      <line x1="22" y1="0" x2="22" y2="800" stroke={`url(#${id}-v)`} strokeWidth="2.5" filter={`url(#${id}-g)`}/>
      <line x1="22" y1="0" x2="22" y2="800" stroke={`url(#${id}-p)`} strokeWidth="4" filter={`url(#${id}-g)`} opacity="0.7"/>

      <line x1="1" y1="0" x2="1" y2="800" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6"/>
      <line x1="43" y1="0" x2="43" y2="800" stroke="rgba(0,0,0,0.6)" strokeWidth="0.6"/>
    </svg>
  );
}

export function CornerOrnament({ size = 64, className = "", rotation = 0 }: { size?: number; className?: string; rotation?: number }) {
  const id = React.useId();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size}
      className={className} style={{ transform: `rotate(${rotation}deg)` }}>
      <defs>
        <radialGradient id={`${id}-e`} cx="12%" cy="12%" r="90%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="1">
            <animate attributeName="stopOpacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
          </stop>
          <stop offset="20%" stopColor="#00F0FF" stopOpacity="0.9"/>
          <stop offset="50%" stopColor="#B026FF" stopOpacity="0.5"/>
          <stop offset="80%" stopColor="#00F0FF" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <filter id={`${id}-g`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4"/><feComposite in="SourceGraphic" operator="over"/>
        </filter>
        <pattern id={`${id}-cs`} width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 4Q2 0,4 4Q6 8,8 4" fill="none" stroke="#00F0FF" strokeWidth="0.5" opacity="0.5"/>
        </pattern>
      </defs>
      {/* Corner fill */}
      <path d="M0 0L0 48Q0 24,24 24L48 24Q24 24,24 0Z" fill="rgba(8,4,20,0.7)"/>
      <path d="M0 0L0 48Q0 24,24 24L48 24Q24 24,24 0Z" fill={`url(#${id}-cs)`}/>
      {/* Scale arcs */}
      <path d="M0 0Q0 36,36 36Q36 0,64 0" fill="none" stroke="#00F0FF" strokeWidth="2" opacity="0.7" filter={`url(#${id}-g)`}/>
      <path d="M0 0Q0 28,28 28Q28 0,52 0" fill="none" stroke="#B026FF" strokeWidth="1.2" opacity="0.5"/>
      <path d="M0 0Q0 20,20 20Q20 0,40 0" fill="none" stroke="#00F0FF" strokeWidth="0.9" opacity="0.6"/>
      <path d="M0 0Q0 12,12 12Q12 0,24 0" fill="none" stroke="#B026FF" strokeWidth="0.6" opacity="0.4"/>
      {/* Scale details */}
      <path d="M4 22Q12 17,22 22" stroke="#00F0FF" strokeWidth="0.5" fill="none" opacity="0.4"/>
      <path d="M22 4Q17 12,22 22" stroke="#B026FF" strokeWidth="0.5" fill="none" opacity="0.4"/>
      <path d="M3 14Q8 10,14 14" stroke="#00F0FF" strokeWidth="0.4" fill="none" opacity="0.3"/>
      <path d="M14 3Q10 8,14 14" stroke="#B026FF" strokeWidth="0.4" fill="none" opacity="0.3"/>
      {/* DRAGON EYE — animated pulsing core with slit pupil */}
      <circle cx="8" cy="8" r="7" fill={`url(#${id}-e)`} filter={`url(#${id}-g)`}/>
      <circle cx="8" cy="8" r="3.5" fill="#00F0FF" opacity="0.85">
        <animate attributeName="r" values="3.5;4;3.5" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="8" cy="8" r="1.5" fill="#FFF" opacity="0.95"/>
      <line x1="8" y1="5" x2="8" y2="11" stroke="#0a0610" strokeWidth="1" strokeLinecap="round" opacity="0.8"/>
    </svg>
  );
}
