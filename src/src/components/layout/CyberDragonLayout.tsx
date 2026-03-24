import React, { useState } from "react";
import { DragonHead, LeftPillar, RightPillar, BottomFrame, ScreenFrame } from "../assets/DragonAssets";
import { TopNavigation } from "./TopNavigation";
import { ActionSidebar } from "./ActionSidebar";
import { FileUploadModal } from "../modals/FileUploadModal";
import { useDragonAgent } from "../../hooks/useDragonAgent";

/**
 * Props for CyberDragonLayout
 * @interface CyberDragonLayoutProps
 */
interface CyberDragonLayoutProps {
  /** The child component (typically the user's Chatbox) to be injected into the central frame */
  children: React.ReactNode;
}

/**
 * The Master Shell of the Cyber Dragon Web App.
 * Orchestrates the SVGs, backgrounds, TopNav, Sidebar, and the injection slot for the Chatbox.
 * 
 * @param {CyberDragonLayoutProps} props
 * @returns {JSX.Element}
 */
export function CyberDragonLayout({ children }: CyberDragonLayoutProps) {
  const { 
    status, 
    connectionHealth, 
    activeContextFiles, 
    isUploading, 
    handleFileUpload, 
    triggerAgentCommand 
  } = useDragonAgent();

  const [isUploadModalOpen, setUploadModalOpen] = useState(false);

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden flex flex-col font-mono selection:bg-[#A020F0]/40 selection:text-[#00F3FF]">
      
      {/* --- GLOBAL STYLES & BACKGROUND --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=JetBrains+Mono:wght@400;700&display=swap');
        .font-pixel { font-family: 'Press Start 2P', cursive; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        .bg-charcoal-leather {
          background-color: #0a0a0a;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Base Leather Background */}
      <div className="absolute inset-0 bg-charcoal-leather pointer-events-none z-0" />
      
      {/* Top Right Dragon Guardian */}
      <DragonHead className="absolute top-[-20px] right-[-20px]" />

      {/* --- UI LAYER --- */}
      <div className="relative z-10 flex flex-col h-full w-full">
        
        <TopNavigation status={status} connectionHealth={connectionHealth} />

        {/* Main Interface Wrapper */}
        <div className="relative flex-1 flex flex-col md:flex-row m-[clamp(8px,2vw,24px)] mb-0 overflow-hidden">
          
          {/* Structural Pillars (Hidden on very small mobile) */}
          <LeftPillar className="hidden md:block absolute left-0 top-0 bottom-12 w-[clamp(20px,3vw,40px)] z-20" />
          <RightPillar className="hidden md:block absolute right-0 top-0 bottom-12 w-[clamp(20px,3vw,40px)] z-20" />
          
          {/* Structural Bottom Frame */}
          <BottomFrame className="absolute bottom-0 left-0 right-0 h-12 z-20" />

          {/* Central Screen Area (Constrained by pillars) */}
          <ScreenFrame className="absolute inset-0 md:inset-x-[clamp(20px,3vw,40px)] bottom-12 z-10">
            <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
              
              <ActionSidebar 
                onOpenUpload={() => setUploadModalOpen(true)}
                onTriggerCommand={triggerAgentCommand}
                contextCount={activeContextFiles.length}
              />

              {/* CHATBOX INJECTION SLOT */}
              <main className="flex-1 relative flex flex-col min-w-0 min-h-0 bg-black/60 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] border-l border-[#A020F0]/20">
                {children}
              </main>

            </div>
          </ScreenFrame>
        </div>
      </div>

      {/* --- MODALS --- */}
      <FileUploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setUploadModalOpen(false)} 
        onUpload={handleFileUpload}
        isUploading={isUploading}
      />

    </div>
  );
}
