import React, { useState } from "react";
import { DragWrapper } from "../assets/DragonAssets";
import { Terminal, FilePlus2, Play, Download, Settings2 } from "lucide-react";
import type { AgentCommand } from "../../hooks/useDragonAgent";

/**
 * Props for the ActionSidebar
 * @interface ActionSidebarProps
 */
interface ActionSidebarProps {
  /** Callback to open the file upload modal */
  onOpenUpload: () => void;
  /** Function to trigger specific workflows */
  onTriggerCommand: (cmd: AgentCommand) => void;
  /** Number of active context files injected */
  contextCount: number;
}

/**
 * The tools panel dedicated to AI Agent triggers and context management.
 * Uses the Drag.svg wrapper for all primary buttons.
 * 
 * @param {ActionSidebarProps} props
 * @returns {JSX.Element}
 */
export function ActionSidebar({ onOpenUpload, onTriggerCommand, contextCount }: ActionSidebarProps) {
  return (
    <aside className="w-[280px] shrink-0 border-r border-[#A020F0]/20 bg-black/40 backdrop-blur-sm p-4 flex flex-col gap-6 h-full overflow-y-auto hidden md:flex">
      
      {/* Header */}
      <div className="flex items-center gap-2 text-[#00F3FF] border-b border-[#A020F0]/30 pb-3">
        <Terminal size={18} />
        <h2 className="font-pixel text-[10px] tracking-widest leading-loose">Command<br/>Center</h2>
      </div>

      {/* Context Injection */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
          <span>ACTIVE_CONTEXT</span>
          <span className="text-[#00F3FF]">[{contextCount} FILES]</span>
        </div>
        
        <DragWrapper onClick={onOpenUpload}>
          <FilePlus2 size={16} />
          <span>INJECT DATA</span>
        </DragWrapper>
      </div>

      {/* Agent Workflows */}
      <div className="flex flex-col gap-3 mt-4">
        <div className="text-[10px] font-mono text-gray-400 uppercase">
          Agent Workflows
        </div>
        
        <DragWrapper onClick={() => onTriggerCommand('#workflow')}>
          <Play size={16} />
          <span>EXECUTE CORE</span>
        </DragWrapper>

        <DragWrapper onClick={() => onTriggerCommand('#quiz')}>
          <Settings2 size={16} />
          <span>GENERATE QUIZ</span>
        </DragWrapper>

        <DragWrapper onClick={() => onTriggerCommand('#note')}>
          <Download size={16} />
          <span>EXPORT SYLLABUS</span>
        </DragWrapper>
      </div>

      {/* Terminal Output Mock */}
      <div className="mt-auto flex flex-col gap-2">
        <div className="text-[10px] font-mono text-[#A020F0]/60 uppercase border-b border-[#A020F0]/20 pb-1">
          System Log
        </div>
        <div className="bg-black/80 rounded border border-[#A020F0]/20 p-2 h-32 overflow-hidden flex flex-col gap-1 text-[10px] font-mono">
          <span className="text-gray-500">{">"} INIT DRAGZONE</span>
          <span className="text-gray-500">{">"} AWAITING INPUT...</span>
          <span className="text-[#00F3FF] animate-pulse">_</span>
        </div>
      </div>

    </aside>
  );
}
