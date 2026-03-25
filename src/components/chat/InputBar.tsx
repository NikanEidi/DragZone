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
  const [menuOpen, setMenuOpen] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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
    e.target.value = "";
    setMenuOpen(false);
  }, [onUpload]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(150, inputRef.current.scrollHeight)}px`;
    }
  }, [input]);

  // Close menu on click outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (menuOpen && !(e.target as HTMLElement).closest('.attach-menu-container')) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', handleOutside);
    return () => window.removeEventListener('mousedown', handleOutside);
  }, [menuOpen]);

  return (
    <div className="relative shrink-0 px-4 pb-4 pt-2 w-full">
      <div className="relative w-full rounded-xl overflow-hidden"
        style={{
          background: "var(--bg-panel)",
          border: `1px solid ${has ? "rgba(0,212,229,0.2)" : "var(--border)"}`,
          transition: "border-color 100ms",
        }}>
        
        {/* Context status */}
        {(isUploading || isContextLoaded) && (
          <div className="absolute top-0 right-4 px-2 py-0.5 rounded-b text-xs z-20 flex items-center gap-1.5"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderTop: "none", fontFamily: "var(--font-mono)" }}>
            <div className={`w-1.5 h-1.5 rounded-full ${isUploading ? 'bg-[var(--purple)]' : 'bg-[var(--cyan)]'}`} />
            <span style={{ fontSize: 9, fontWeight: 500, color: isUploading ? "var(--purple)" : "var(--cyan)" }}>
              {isUploading ? 'PARSING...' : 'CTX SYNCED'}
            </span>
          </div>
        )}

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-1.5 p-2 bg-[rgba(0,0,0,0.15)]" style={{ borderBottom: "1px solid var(--border)" }}>
            {attachments.map(att => (
              <div key={att.id} className="flex items-center gap-1.5 px-2 py-1 rounded text-xs group/item"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                {att.type.startsWith('image/') ? <ImageIcon size={11} /> : <Paperclip size={11} />}
                <span className="max-w-[120px] truncate" style={{ fontSize: 11 }}>{att.name}</span>
                <button 
                  onClick={() => removeAttachment(att.id)}
                  className="ml-0.5 p-0.5 rounded-full hover:bg-white/10 text-white/40 hover:text-red-400 transition-colors"
                >
                  <Plus size={10} style={{ transform: 'rotate(45deg)' }} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input row */}
        <div className="flex items-end gap-2 px-3 py-2.5">
          {/* Attach menu */}
          <div className="relative shrink-0 attach-menu-container">
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center rounded-md hover:bg-white/5 active:scale-95 min-w-[44px] min-h-[44px]"
              style={{ color: menuOpen ? "var(--cyan)" : "var(--text-muted)", transition: "color 100ms" }}>
              <Plus size={20} style={{ transform: menuOpen ? "rotate(45deg)" : "rotate(0)", transition: "transform 150ms" }} />
            </button>
            {menuOpen && (
              <div className="absolute bottom-[calc(100%+8px)] left-0 p-1.5 rounded-lg min-w-[170px] z-[100]"
                style={{ background: "var(--bg-panel)", border: "1px solid var(--border)", boxShadow: "0 -8px 24px rgba(0,0,0,0.5)", animation: "fadeIn 100ms ease-out" }}>
                <button onClick={() => { fileRef.current!.accept = "*/*"; fileRef.current?.click(); }} className="flex items-center gap-2.5 px-3 py-2 rounded-md w-full hover:bg-white/5 active:scale-[0.98]"
                  style={{ color: "var(--text-secondary)", fontSize: 12, fontWeight: 500, transition: "background 100ms" }}>
                  <Plus size={14} className="opacity-60" /> Upload File
                </button>
                <div className="h-px my-1 mx-2" style={{ background: "var(--border)" }} />
                <button onClick={() => { fileRef.current!.accept = "image/*"; fileRef.current?.click(); }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-md w-full hover:bg-white/5 active:scale-[0.98]"
                  style={{ color: "var(--text-secondary)", fontSize: 12, fontWeight: 500, transition: "background 100ms" }}>
                  <ImageIcon size={14} className="opacity-60" /> Add Image
                </button>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" multiple className="hidden" onChange={handleFile} />

          {/* Text area */}
          <div className="flex-1 min-h-[36px] flex flex-col justify-end">
            <textarea
              ref={inputRef} rows={1} value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Message DrafZone..."
              autoComplete="off" autoCorrect="off" spellCheck={false}
              className="w-full bg-transparent outline-none resize-none overflow-y-auto"
              style={{
                fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 400,
                color: "var(--text-primary)", caretColor: "var(--cyan)",
                lineHeight: 1.5, scrollbarWidth: "none",
              }}
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 shrink-0">
            {hasMessages && (
              <button onClick={onShare} className="flex items-center justify-center rounded-md hover:bg-white/5 active:scale-95 min-w-[44px] min-h-[44px]"
                style={{ color: "var(--text-muted)", transition: "color 100ms" }} title="Share">
                <Share2 size={18} />
              </button>
            )}
            <button onClick={send} disabled={!has}
              className="flex items-center justify-center rounded-md active:scale-95 min-w-[44px] min-h-[44px]"
              style={{ background: has ? "rgba(0,212,229,0.1)" : "transparent", color: has ? "var(--cyan)" : "var(--text-muted)", cursor: has ? "pointer" : "default", transition: "background 100ms" }}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}