import React, { useRef, useEffect, useCallback, useState } from "react";
import { Menu, Terminal, ArrowDown, ShieldCheck } from "lucide-react";
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { EmptyState } from "./EmptyState";
import { InputBar } from "./InputBar";
import type { Message, ChatStatus, Attachment } from "../../types/chat";

interface Props {
  messages: Message[];
  status: ChatStatus;
  contextActive: boolean;
  onSend: (text: string, attachments?: Attachment[]) => void;
  onUpload: (files: FileList) => Promise<boolean>;
  onShare: () => void;
  onToggleSidebar: () => void;
}

export function ChatArea({ messages, status, contextActive, onSend, onUpload, onShare, onToggleSidebar }: Props) {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [showScroll, setShowScroll] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        virtuosoRef.current?.scrollToIndex({ index: messages.length - 1, align: 'end', behavior: 'smooth' });
      }, 50);
    }
  }, [messages.length, status]);

  const onScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
    const target = e.currentTarget;
    if (!target) return;
    const { scrollTop, scrollHeight, clientHeight } = target;
    setShowScroll(scrollHeight - scrollTop - clientHeight > 150);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.types.includes('Files')) setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await onUpload(e.dataTransfer.files);
    }
  }, [onUpload]);

  return (
    <div 
      className={`flex-1 flex flex-col min-w-0 relative z-10 liquid-glass shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-colors duration-300 ${isDragging ? 'bg-[#00F0FF]/5' : ''}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      
      {/* Drag & Drop Overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0e16]/80 backdrop-blur-sm border-2 border-dashed border-[#00F0FF]/50 rounded-[20px] m-4 pointer-events-none">
          <div className="flex flex-col items-center gap-4 p-8 rounded-[20px] bg-[#00F0FF]/10 border border-[#00F0FF]/20 shadow-[0_0_40px_rgba(0,240,255,0.2)]">
            <div className="p-4 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] animate-bounce">
              <ShieldCheck size={48} />
            </div>
            <h3 className="text-xl font-bold text-[#E0E0E0] tracking-wide uppercase font-['system-ui']">Drop Files to Omni-Parse</h3>
            <p className="text-[#00F0FF] text-sm opacity-80">Supports PDF, CSV, Excel, PPTX, Docx, Images</p>
          </div>
        </div>
      )}

      {/* Subdued internal gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,240,255,0.015)] to-[rgba(176,38,255,0.015)] pointer-events-none z-0" />

      {/* Deep Matte Realistic Dragon Leather */}
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay dragon-skin-realistic" />

      {/* Header - Sleek & Professional */}
      <div className="flex items-center gap-[clamp(12px,1.5vw,20px)] px-[clamp(20px,2.5vw,32px)] py-[clamp(16px,2vw,24px)] shrink-0 relative overflow-hidden z-10 border-b border-[rgba(255,255,255,0.04)] bg-[rgba(0,0,0,0.2)]">
        
        {/* Subtle top edge highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />
        
        <button onClick={onToggleSidebar} className="md:hidden p-2 rounded-[10px] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] active:scale-[0.9] transition-all duration-200 border border-[rgba(255,255,255,0.05)] text-[#888] hover:text-[#00F0FF]">
          <Menu size={20} />
        </button>
        
        <div className="p-2.5 rounded-[10px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <Terminal size={16} style={{ color: "#00F0FF" }} />
        </div>
        
        <span className="flex-1" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "clamp(15px,1.8vw,18px)", fontWeight: 600, letterSpacing: "1px", color: "#E0E0E0" }}>
          DRAGZONE <span style={{ color: "#555", fontWeight: 400, margin: "0 6px" }}>/</span> <span style={{ color: "#888", fontSize: "0.9em" }}>Encrypted Link</span>
        </span>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]">
          <ShieldCheck size={14} style={{ color: "#00F0FF" }} />
          <span className="hidden sm:inline" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "11px", fontWeight: 600, color: "#888", letterSpacing: "1px" }}>SECURE</span>
        </div>
      </div>

      {/* Messages Area - Virtualized for buttery smooth scroll & render */}
      <div className="flex-1 min-h-0 relative z-10">
        {messages.length === 0 ? (
          <div className="h-full overflow-y-auto px-[clamp(16px,2.5vw,32px)] py-[clamp(20px,2.5vw,32px)] pb-[180px]">
             <EmptyState />
          </div>
        ) : (
          <Virtuoso
            ref={virtuosoRef}
            data={messages}
            initialTopMostItemIndex={messages.length - 1}
            className="h-full w-full custom-scrollbar"
            style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
            onScroll={onScroll}
            components={{
              Footer: () => (
                <div className="px-[clamp(16px,2.5vw,32px)] pb-[180px] pt-[clamp(20px,2.5vw,32px)]">
                  {status === "typing" && <TypingIndicator />}
                </div>
              ),
              Header: () => <div className="h-[clamp(20px,2.5vw,32px)]" />
            }}
            itemContent={(index, m) => (
              <div className="px-[clamp(16px,2.5vw,32px)] py-[clamp(10px,1.2vw,16px)]">
                <MessageBubble message={m} index={index} key={m.id} />
              </div>
            )}
          />
        )}
      </div>

      {/* Scroll btn */}
      {showScroll && (
        <button onClick={() => virtuosoRef.current?.scrollToIndex({ index: messages.length - 1, align: 'end', behavior: 'smooth' })}
          className="absolute bottom-[clamp(140px,16vw,160px)] right-[clamp(24px,3vw,40px)] z-30 p-3 rounded-[12px] transition-all duration-200 hover:scale-[1.05] active:scale-[0.95] flex items-center justify-center min-w-[44px] min-h-[44px]"
          style={{ background: "rgba(0,240,255,0.08)", border: "1px solid rgba(0,240,255,0.2)", boxShadow: "0 8px 24px rgba(0,0,0,0.6)", color: "#888", backdropFilter: "blur(10px)" }}>
          <ArrowDown size={20} className="hover:text-[#00F0FF] transition-colors" />
        </button>
      )}

      {/* Input Base */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <InputBar 
          onSend={onSend} 
          onUpload={onUpload}
          onShare={onShare} 
          hasMessages={messages.length > 0} 
          isContextLoaded={contextActive}
        />
      </div>
    </div>
  );
}
