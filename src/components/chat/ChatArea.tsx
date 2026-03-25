import React, { useRef, useEffect, useCallback, useState } from "react";
import { Menu, Terminal, ArrowDown, Upload } from "lucide-react";
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

export const ChatArea = React.memo(function ChatArea({ messages, status, contextActive, onSend, onUpload, onShare, onToggleSidebar }: Props) {
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

  return (
    <div
      className={`flex-1 flex flex-col min-w-0 relative ${isDragging ? 'ring-1 ring-[var(--cyan)]' : ''}`}
      style={{ background: "var(--bg-surface, rgba(22,27,34,0.9))" }}
      onDragOver={handleDragOver} onDragEnter={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
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

      {/* Chat sub-header */}
      <div className="flex items-center gap-3 px-4 py-2.5 shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
        <button onClick={onToggleSidebar} className="md:hidden flex items-center justify-center rounded-md hover:bg-white/5 active:scale-90 min-w-[44px] min-h-[44px]"
          style={{ color: "var(--text-secondary)" }}>
          <Menu size={18} />
        </button>
        <Terminal size={14} style={{ color: "var(--cyan)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", letterSpacing: "0.5px" }}>
          TERMINAL
        </span>
        <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          {contextActive ? "· CONTEXT LOADED" : ""}
        </span>
      </div>

      {/* Messages — Virtualized */}
      <div className="flex-1 min-h-0 relative">
        {messages.length === 0 ? (
          <div className="h-full overflow-y-auto px-4 py-6 pb-[160px]">
            <EmptyState />
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
});
