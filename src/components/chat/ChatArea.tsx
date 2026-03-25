import React, { useRef, useEffect, useCallback, useState } from "react";
import { Menu, Terminal, ArrowDown, ShieldCheck, Copy, Check, Download, Upload } from "lucide-react";
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
  isMax?: boolean;
  hidden?: boolean;
  onSystemInfo?: () => void;
}

export function ChatArea({ messages, status, contextActive, onSend, onUpload, onShare, onToggleSidebar, isMax, hidden, onSystemInfo }: Props) {
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
    const t = e.currentTarget;
    if (!t) return;
    setShowScroll(t.scrollHeight - t.scrollTop - t.clientHeight > 150);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); if (e.dataTransfer.types.includes('Files')) setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }, []);
  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) await onUpload(e.dataTransfer.files);
  }, [onUpload]);

  if (hidden) return null;

  return (
    <div 
      className={`flex-1 flex flex-col min-w-0 relative z-10 transition-all duration-300 ${isDragging ? 'bg-[var(--cyan)]/5' : ''} ${isMax ? 'rounded-0' : 'liquid-glass shadow-[0_15px_40px_rgba(0,0,0,0.8)]'}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drop overlay — lightweight */}
      {isDragging && (
        <div className="absolute inset-0 z-50 flex items-center justify-center m-2 rounded-lg pointer-events-none"
          style={{ background: "rgba(14,17,23,0.85)", border: "2px dashed var(--cyan)" }}>
          <div className="flex flex-col items-center gap-3">
            <Upload size={36} style={{ color: "var(--cyan)" }} />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "0.5px" }}>Drop files to parse</span>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>PDF · Excel · Word · Images</span>
          </div>
        </div>
      )}

      {/* Subdued internal gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,240,255,0.015)] to-[rgba(176,38,255,0.015)] pointer-events-none z-0" />

      {/* Header - Sleek & Professional */}
      <div className="flex items-center gap-[clamp(12px,1.5vw,20px)] px-[clamp(20px,2.5vw,32px)] py-[clamp(16px,2vw,24px)] shrink-0 relative overflow-hidden z-10 border-b border-white/5 bg-black/40">
        
        {/* Subtle top edge highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <button 
          onClick={onSystemInfo}
          className="p-2.5 rounded-[10px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-90 ml-2 md:ml-0"
        >
          <Terminal size={16} style={{ color: "var(--cyan)" }} />
        </button>
        
        <span className="flex-1" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "clamp(15px,1.8vw,18px)", fontWeight: 700, letterSpacing: "1px", color: "#FFFFFF" }}>
          DRAGZONE <span style={{ color: "#333", fontWeight: 400, margin: "0 6px" }}>/</span> <span style={{ color: "var(--neon-purple)", fontSize: "0.9em", textShadow: "0 0 8px rgba(176,38,255,0.3)" }}>ENCRYPTED LINK</span>
        </span>
      </div>

      {/* Messages — Virtualized */}
      <div className="flex-1 min-h-0 relative">
        {messages.length === 0 ? (
          <div className="h-full overflow-y-auto px-[clamp(16px,2.5vw,32px)] py-[clamp(20px,2.5vw,32px)] pb-[180px]">
             <EmptyState />
             {status === "typing" && (
               <div className="mt-8">
                 <TypingIndicator />
               </div>
             )}
          </div>
        ) : (
          <Virtuoso
            ref={virtuosoRef}
            data={messages}
            initialTopMostItemIndex={messages.length - 1}
            className="h-full w-full"
            style={{ WebkitOverflowScrolling: "touch" }}
            onScroll={onScroll}
            components={{
              Footer: () => (
                <div className="px-4 pb-[160px] pt-4">
                  {status === "typing" && <TypingIndicator />}
                </div>
              ),
              Header: () => <div className="h-4" />
            }}
            itemContent={(index, m) => (
              <div className="px-4 py-1.5">
                <MessageBubble message={m} index={index} key={m.id} />
              </div>
            )}
          />
        )}
      </div>

      {/* Scroll to bottom */}
      {showScroll && (
        <button onClick={() => virtuosoRef.current?.scrollToIndex({ index: messages.length - 1, align: 'end', behavior: 'smooth' })}
          className="absolute bottom-[140px] right-4 z-30 flex items-center justify-center rounded-lg hover:bg-white/5 active:scale-95 min-w-[44px] min-h-[44px]"
          style={{ background: "var(--bg-panel)", border: "1px solid var(--border)", color: "var(--text-secondary)", transition: "background 100ms" }}>
          <ArrowDown size={16} />
        </button>
      )}

      {/* Input */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <InputBar onSend={onSend} onUpload={onUpload} onShare={onShare} hasMessages={messages.length > 0} isContextLoaded={contextActive} />
      </div>
    </div>
  );
}
