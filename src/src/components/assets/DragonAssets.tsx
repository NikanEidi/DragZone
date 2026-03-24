import React from "react";

/**
 * Placeholder utility to render SVGs. 
 * Replace the img sources below with your actual `/assets/layer_1.svg` etc.
 * Currently, they use styled divs as visual fallbacks so the UI looks complete out of the box.
 */

interface AssetProps {
  className?: string;
}

/**
 * Renders 'Layer 1.svg' - The massive pulsing Dragon Head guardian.
 * Expected to be placed absolute top-right.
 */
export function DragonHead({ className = "" }: AssetProps) {
  return (
    <div className={`pointer-events-none select-none z-50 mix-blend-screen drop-shadow-[0_0_20px_rgba(160,32,240,0.9)] ${className}`}>
      {/* REPLACE WITH: <img src="/assets/Layer 1.svg" alt="Dragon Guardian" className="w-full h-full object-contain" /> */}
      <div className="w-64 h-64 bg-gradient-to-br from-[#A020F0] to-[#00F3FF] rounded-full opacity-20 blur-3xl animate-pulse" />
    </div>
  );
}

/**
 * Renders 'LeftS.svg' - The left pillar of the main shell.
 */
export function LeftPillar({ className = "" }: AssetProps) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      {/* REPLACE WITH: <img src="/assets/LeftS.svg" className="w-full h-full object-cover" /> */}
      <div className="w-full h-full border-r-[3px] border-[#A020F0]/50 shadow-[5px_0_15px_rgba(160,32,240,0.2)] bg-black/60" />
    </div>
  );
}

/**
 * Renders 'Rights.svg' - The right pillar of the main shell.
 */
export function RightPillar({ className = "" }: AssetProps) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      {/* REPLACE WITH: <img src="/assets/Rights.svg" className="w-full h-full object-cover" /> */}
      <div className="w-full h-full border-l-[3px] border-[#00F3FF]/50 shadow-[-5px_0_15px_rgba(0,243,255,0.2)] bg-black/60" />
    </div>
  );
}

/**
 * Renders 'DOWN Left to right.svg' - The bottom base structure.
 */
export function BottomFrame({ className = "" }: AssetProps) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      {/* REPLACE WITH: <img src="/assets/DOWN Left to right.svg" className="w-full h-full object-cover" /> */}
      <div className="w-full h-full border-t-[3px] border-b-[3px] border-y-[#A020F0]/30 bg-gradient-to-r from-[#A020F0]/10 via-[#00F3FF]/10 to-[#A020F0]/10" />
    </div>
  );
}

/**
 * Renders 'Current Screen.svg' - The master background for the central UI area.
 */
export function ScreenFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* REPLACE WITH: <div className="absolute inset-0 bg-[url('/assets/Current Screen.svg')] bg-cover bg-center opacity-30 pointer-events-none" /> */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md pointer-events-none rounded-sm border border-[#A020F0]/20 shadow-[inset_0_0_50px_rgba(0,0,0,0.9)]" />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}

/**
 * Renders 'Vectorize10.svg' - The main breathing logo in the TopNav.
 */
export function CoreScaleLogo({ className = "" }: AssetProps) {
  return (
    <div className={`pointer-events-none select-none flex items-center justify-center ${className}`}>
      {/* REPLACE WITH: <img src="/assets/Vectorize10.svg" className="w-full h-full animate-pulse" /> */}
      <div className="w-8 h-8 rotate-45 border-2 border-[#00F3FF] shadow-[0_0_10px_#00F3FF] bg-[#A020F0]/20 flex items-center justify-center">
        <div className="w-3 h-3 bg-[#A020F0] shadow-[0_0_10px_#A020F0] animate-pulse" />
      </div>
    </div>
  );
}

/**
 * Wraps action buttons using 'Drag.svg' as the visual base.
 */
export function DragWrapper({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`relative group overflow-hidden ${className} transition-all duration-300 active:scale-95`}
    >
      {/* REPLACE WITH: <img src="/assets/Drag.svg" className="absolute inset-0 w-full h-full object-fill opacity-50 group-hover:opacity-100 transition-opacity" /> */}
      <div className="absolute inset-0 border border-[#A020F0] bg-[#A020F0]/10 group-hover:border-[#00F3FF] group-hover:bg-[#00F3FF]/20 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.6)] transition-all duration-300 skew-x-[-10deg]" />
      <div className="relative z-10 font-mono text-sm tracking-widest text-[#A020F0] group-hover:text-[#00F3FF] transition-colors duration-300 px-6 py-3 flex items-center justify-center gap-2">
        {children}
      </div>
    </button>
  );
}
