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
  const [sendHov, setSendHov] = useState(false);
  const [attachHov, setAttachHov] = useState(false);
  const [shareHov, setShareHov] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const barRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const has = input.trim().length > 0 || attachments.length > 0;

  const send = useCallback(() => {
    if (!input.trim() && attachments.length === 0) return;
    onSend(input.trim(), attachments.length > 0 ? attachments : undefined);
    setInput("");
    setAttachments([]);
    if (inputRef.current) inputRef.current.style.height = 'auto';
    inputRef.current?.focus();
  }, [input, attachments, onSend]);

  const handleFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    const success = await onUpload(files);
    
    if (success) {
      const newAtts: Attachment[] = Array.from(files).map(f => ({
        id: uid(), name: f.name, size: f.size, type: f.type,
      }));
      setAttachments(prev => [...prev, ...newAtts]);
    }
    
    setIsUploading(false);
    e.target.value = "";
    setMenuOpen(false);
  }, [onUpload]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(150, inputRef.current.scrollHeight)}px`;
    }
  }, [input]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!barRef.current || !glowRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glowRef.current.style.background = `radial-gradient(circle 120px at ${x}% ${y}%, rgba(255,255,255,0.08), transparent 100%)`;
  }, []);

  return (
    <div className="relative shrink-0 px-[clamp(12px,2vw,32px)] pb-[clamp(12px,2vw,24px)] pt-[16px] w-full"
      onPointerMove={handlePointerMove}
    >
      <div 
        ref={barRef}
        className="relative w-full rounded-[24px] overflow-hidden transition-all duration-300 ease-out"
        style={{
          background: has 
            ? "rgba(22, 22, 28, 0.75)" 
            : "rgba(18, 18, 22, 0.65)",
          backdropFilter: "blur(30px) saturate(120%)",
          border: has 
            ? "1px solid rgba(0, 240, 255, 0.2)" 
            : "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: has ? `
            inset 0 1px 1px rgba(255,255,255,0.08),
            0 15px 30px rgba(0,0,0,0.8),
            0 0 15px rgba(0, 240, 255, 0.1)
          ` : `
            inset 0 1px 1px rgba(255,255,255,0.05),
            0 10px 25px rgba(0,0,0,0.6)
          `,
          transform: has ? "translateY(-2px)" : "translateY(0)"
        }}
      >
        {/* Status indicator for Context */}
        {(isUploading || isContextLoaded) && (
            <div className="absolute top-0 right-6 px-3 py-1 rounded-b-[8px] z-20 flex items-center gap-2 animate-[fadeSlideIn_0.3s_ease-out]"
                 style={{ background: isUploading ? "rgba(176,38,255,0.1)" : "rgba(0,240,255,0.1)", border: isUploading ? "1px solid rgba(176,38,255,0.2)" : "1px solid rgba(0,240,255,0.2)", borderTop: "none" }}>
                <div className={`w-1.5 h-1.5 rounded-full ${isUploading ? 'animate-pulse bg-[#B026FF]' : 'bg-[#00F0FF]'}`} />
                <span style={{ fontSize: '10px', fontWeight: 600, color: isUploading ? '#B026FF' : '#00F0FF', letterSpacing: '1px' }}>
                    {isUploading ? 'PROCESSING CONTEXT...' : 'CONTEXT SYNCED'}
                </span>
            </div>
        )}

        {/* Subtle Inner Glow on Focus */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,240,255,0.03)] to-[rgba(176,38,255,0.03)] pointer-events-none opacity-0 transition-opacity duration-300" style={{ opacity: has ? 1 : 0 }} />

        {/* Professional Matte Dragon Leather Base */}
        <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-[0.2] dragon-skin-realistic" />

        {/* Dynamic Pointer Glow (Fast CSS) - Professional, subtle */}
        <div ref={glowRef} className="absolute inset-0 rounded-[24px] pointer-events-none transition-opacity duration-200 mix-blend-screen z-0"
          style={{
            background: isUploading 
                ? `radial-gradient(circle 120px at 50% 50%, rgba(176,38,255,0.15), transparent 100%)`
                : `radial-gradient(circle 120px at 50% 50%, rgba(255,255,255,0.08), transparent 100%)`,
            opacity: has || isUploading ? 0.8 : 0.4,
            willChange: 'background, opacity'
          }}
        />

        {/* Attachments Area */}
        {attachments.length > 0 && (
          <div className="relative z-10 flex flex-wrap gap-2.5 p-3 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.2)]">
            {attachments.map(att => (
              <div key={att.id} className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] group cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-all duration-200 ease-out"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                {att.type.startsWith('image/') ? (
                  <ImageIcon size={13} style={{ color: "#888" }} className="group-hover:text-[#00F0FF] transition-colors" />
                ) : (
                  <Paperclip size={13} style={{ color: "#888" }} className="group-hover:text-[#00F0FF] transition-colors" />
                )}
                <span style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "12px", color: "#CCC", fontWeight: 500 }}>{att.name}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1" style={{ fontSize: "14px", color: "#FF4444" }}>&times;</span>
              </div>
            ))}
          </div>
        )}

        {/* Input layout */}
        <div className="relative z-10 flex items-end gap-[clamp(8px,1.5vw,16px)] px-[clamp(12px,1.5vw,20px)] py-[clamp(10px,1.2vw,14px)]">
          
          {/* Action Menu (Attach) */}
          <div className="relative shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              onMouseEnter={() => setAttachHov(true)}
              onMouseLeave={() => setAttachHov(false)}
              className="p-2.5 rounded-[12px] transition-all duration-200 ease-out active:scale-[0.95] flex items-center justify-center"
              style={{
                background: menuOpen ? "rgba(255,255,255,0.08)" : "transparent",
                color: attachHov || menuOpen ? "#00F0FF" : "#666",
              }}
            >
              <Plus size={20} style={{ 
                transform: menuOpen ? "rotate(45deg)" : "rotate(0)", 
                transition: "transform 0.2s ease-out",
              }} />
            </button>
            
            {/* Pop-up attach menu */}
            {menuOpen && (
              <div className="absolute bottom-[calc(100%+16px)] left-0 p-2 rounded-[16px] flex flex-col gap-1 min-w-[160px] animate-[fadeIn_0.2s_ease-out] liquid-glass shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <button onClick={() => fileRef.current?.click()} className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-[rgba(255,255,255,0.05)] active:scale-[0.98] text-[#CCC] font-['system-ui'] text-[13px] font-medium transition-all duration-200">
                  <Paperclip size={16} color="#888" /> Upload File
                </button>
                <div className="h-[1px] bg-[rgba(255,255,255,0.05)] my-0.5 mx-2" />
                <button onClick={() => { if(fileRef.current) { fileRef.current.accept="image/*"; fileRef.current.click(); } }} className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-[rgba(255,255,255,0.05)] active:scale-[0.98] text-[#CCC] font-['system-ui'] text-[13px] font-medium transition-all duration-200">
                  <ImageIcon size={16} color="#888" /> Add Image
                </button>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" multiple className="hidden" onChange={handleFile} />

          {/* Text Input area (Auto-resizing native feel) */}
          <div className="flex-1 flex flex-col justify-end min-h-[40px] py-1 relative">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Message Dragzone..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              className="w-full bg-transparent outline-none resize-none overflow-y-auto relative z-10"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "clamp(15px, 1.6vw, 16px)",
                fontWeight: 400,
                color: "#E0E0E0",
                letterSpacing: "0.2px",
                caretColor: "#00F0FF",
                lineHeight: "1.5",
                scrollbarWidth: "none",
                WebkitUserSelect: "text",
                userSelect: "text",
                touchAction: "manipulation",
              }}
            />
          </div>

          {/* Action Buttons Right */}
          <div className="flex items-center gap-2 shrink-0 relative z-10">
            {hasMessages && (
              <button
                onClick={onShare}
                onMouseEnter={() => setShareHov(true)}
                onMouseLeave={() => setShareHov(false)}
                className="p-2.5 rounded-[12px] transition-all duration-200 ease-out active:scale-[0.95] flex items-center justify-center"
                style={{ color: shareHov ? "#4A9BD9" : "#666" }}
                title="Share Context"
              >
                <Share2 size={18} />
              </button>
            )}

            <button
              onClick={send}
              onMouseEnter={() => setSendHov(true)}
              onMouseLeave={() => setSendHov(false)}
              disabled={!has}
              className="p-2.5 rounded-[12px] transition-all duration-300 ease-out active:scale-[0.95] flex items-center justify-center relative overflow-hidden group"
              style={{
                background: has ? "rgba(0, 240, 255, 0.1)" : "transparent",
                color: has ? "#00F0FF" : "#444",
                cursor: has ? "pointer" : "default",
              }}
            >
              <Send size={18} style={{
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