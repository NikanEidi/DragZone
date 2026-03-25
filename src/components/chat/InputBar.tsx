import React, { useState, useRef, useCallback, useEffect } from "react";
import { Send, Paperclip, Share2, Plus, Image as ImageIcon } from "lucide-react";
import type { Attachment } from "../../types/chat";
import { uid } from "../../hooks/useChat";

interface Props {
  onSend: (text: string, attachments?: Attachment[]) => void;
  onUpload: (files: FileList) => Promise<boolean>;
  onShare: () => void;
  hasMessages: boolean;
  isContextLoaded: boolean;
}

export function InputBar({ onSend, onUpload, onShare, hasMessages, isContextLoaded }: Props) {
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [attachHov, setAttachHov] = useState(false);
  const [shareHov, setShareHov] = useState(false);
  const [sendHov, setSendHov] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const has = input.trim().length > 0 || attachments.length > 0;

  const send = useCallback(() => {
    if (!input.trim() && attachments.length === 0) return;
    onSend(input.trim(), attachments.length > 0 ? attachments : undefined);
    setInput(""); setAttachments([]);
    if (inputRef.current) inputRef.current.style.height = 'auto';
    inputRef.current?.focus();
  }, [input, attachments, onSend]);

  const removeAttachment = useCallback((id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  }, []);

  const handleFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setIsUploading(true);
    const success = await onUpload(files);
    if (success) {
      setAttachments(prev => [...prev, ...Array.from(files).map(f => ({ id: uid(), name: f.name, size: f.size, type: f.type }))]);
    }
    setIsUploading(false);
    if (e.target.value) e.target.value = "";
  }, [onUpload]);

  useEffect(() => {
    const textarea = inputRef.current;
    if (!textarea) return;

    const resize = () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(150, textarea.scrollHeight)}px`;
    };

    const rafId = requestAnimationFrame(resize);
    return () => cancelAnimationFrame(rafId);
  }, [input]);

  // Premium glow interaction
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
        if (!glowRef.current) return;
        const rect = glowRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glowRef.current.style.background = isUploading 
            ? `radial-gradient(circle 200px at ${x}px ${y}px, rgba(176,38,255,0.18), transparent 100%)`
            : `radial-gradient(circle 200px at ${x}px ${y}px, rgba(0,240,255,0.1), transparent 100%)`;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isUploading]);

  return (
    <div className="relative shrink-0 px-4 pb-4 pt-2 w-full">
      <div className="relative w-full rounded-xl overflow-hidden shadow-2xl transition-all duration-300"
        style={{
          background: "var(--bg-panel)",
          border: `1px solid ${has ? "rgba(0,212,229,0.3)" : "var(--border)"}`,
          boxShadow: has ? "0 0 30px rgba(0,240,255,0.08)" : "none"
        }}>
        
        {/* Context status */}
        {(isUploading || isContextLoaded) && (
            <div className="absolute top-0 right-6 px-3 py-1 rounded-b-[8px] z-20 flex items-center gap-2 animate-[fadeSlideIn_0.3s_ease-out]"
                 style={{ background: isUploading ? "rgba(176,38,255,0.15)" : "rgba(0,240,255,0.15)", border: isUploading ? "1px solid rgba(176,38,255,0.3)" : "1px solid rgba(0,240,255,0.3)", borderTop: "none" }}>
                <div className={`w-1.5 h-1.5 rounded-full ${isUploading ? 'animate-pulse bg-[var(--neon-purple)]' : 'bg-[var(--cyan)]'}`} />
                <span style={{ fontSize: '10px', fontWeight: 700, color: isUploading ? 'var(--neon-purple)' : 'var(--cyan)', letterSpacing: '1px' }}>
                    {isUploading ? 'PROCESSING...' : 'SYNCED'}
                </span>
            </div>
        )}

        {/* Subtle Inner Glow on Focus */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,240,255,0.05)] to-[rgba(176,38,255,0.05)] pointer-events-none transition-opacity duration-300" style={{ opacity: has ? 1 : 0 }} />

        {/* Professional Matte Dragon Leather Base Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-[0.2]" 
          style={{ backgroundSize: '200px', backgroundImage: 'url("/src/assets/dragon-drag.svg")' }} />

        {/* Dynamic Pointer Glow (Fast CSS) */}
        <div ref={glowRef} className="absolute inset-0 rounded-[24px] pointer-events-none transition-opacity duration-200 mix-blend-screen z-0"
          style={{
            opacity: has || isUploading ? 0.8 : 0.4,
            willChange: 'background, opacity'
          }}
        />

        {/* Attachments Area */}
        {attachments.length > 0 && (
          <div className="relative z-10 flex flex-wrap gap-2.5 p-3 border-b border-white/5 bg-black/40">
            {attachments.map(att => (
              <div key={att.id} className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] group cursor-pointer hover:bg-white/5 transition-all duration-200 ease-out"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                {att.type.startsWith('image/') ? (
                   <ImageIcon size={13} style={{ color: "var(--neon-purple)" }} className="group-hover:text-[var(--cyan)] transition-colors" />
                ) : (
                  <Paperclip size={13} style={{ color: "var(--neon-purple)" }} className="group-hover:text-[var(--cyan)] transition-colors" />
                )}
                <span style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "12px", color: "#E0E0E0", fontWeight: 500 }}>{att.name}</span>
                <button 
                  onClick={() => removeAttachment(att.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-[var(--red)] hover:scale-125"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input layout */}
        <div className="relative z-10 flex items-end gap-[clamp(8px,1.5vw,16px)] px-[clamp(12px,1.5vw,20px)] py-[clamp(10px,1.2vw,14px)]">
          
          {/* Action Menu (Attach) */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => fileRef.current?.click()}
              onMouseEnter={() => setAttachHov(true)}
              onMouseLeave={() => setAttachHov(false)}
              className="p-2.5 rounded-[12px] transition-all duration-200 ease-out active:scale-[0.95] flex items-center justify-center min-w-[40px] min-h-[40px]"
              style={{
                color: attachHov ? "var(--cyan)" : "#555",
              }}
              title="Attach File"
            >
              <Paperclip size={20} />
            </button>
            <button
              onClick={() => { if(fileRef.current) { fileRef.current.accept="image/*"; fileRef.current.click(); } }}
              onMouseEnter={() => setAttachHov(true)}
              onMouseLeave={() => setAttachHov(false)}
              className="p-2.5 rounded-[12px] transition-all duration-200 ease-out active:scale-[0.95] flex items-center justify-center min-w-[40px] min-h-[40px]"
              style={{
                color: attachHov ? "var(--cyan)" : "#555",
              }}
              title="Add Image"
            >
              <ImageIcon size={20} />
            </button>
          </div>
          <input ref={fileRef} type="file" multiple className="hidden" onChange={handleFile} />

          {/* Text area */}
          <div className="flex-1 min-h-[36px] flex flex-col justify-end">
            <textarea
              ref={inputRef} rows={1} value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Message DragZone..."
              autoComplete="off" autoCorrect="off" spellCheck={false}
              className="w-full bg-transparent outline-none resize-none overflow-y-auto relative z-10"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "clamp(15px, 1.6vw, 16px)",
                fontWeight: 400,
                color: "#FFFFFF",
                letterSpacing: "0.2px",
                caretColor: "var(--cyan)",
                lineHeight: "1.5",
                scrollbarWidth: "none",
                WebkitUserSelect: "text",
                userSelect: "text",
                touchAction: "manipulation",
              }}
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 shrink-0">
            {hasMessages && (
              <button
                onClick={onShare}
                onMouseEnter={() => setShareHov(true)}
                onMouseLeave={() => setShareHov(false)}
                className="p-3 rounded-[12px] transition-all duration-200 ease-out active:scale-[0.95] flex items-center justify-center min-w-[44px] min-h-[44px]"
                style={{ color: shareHov ? "var(--neon-purple)" : "#555" }}
                title="Share Context"
              >
                <Share2 size={20} />
              </button>
            )}

            <button
              onClick={send}
              onMouseEnter={() => setSendHov(true)}
              onMouseLeave={() => setSendHov(false)}
              disabled={!has}
              className="p-3 rounded-[12px] transition-all duration-300 ease-out active:scale-[0.95] flex items-center justify-center relative overflow-hidden group min-w-[44px] min-h-[44px]"
              style={{
                background: has ? "rgba(0, 240, 255, 0.12)" : "transparent",
                color: has ? "var(--cyan)" : "#333",
                cursor: has ? "pointer" : "default",
              }}
            >
              <Send size={20} style={{
                transform: sendHov && has ? "translateX(2px) translateY(-2px)" : "translateX(0) translateY(0)",
                transition: "all 0.2s ease-out"
              }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}