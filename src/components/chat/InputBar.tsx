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
          <div className="relative shrink-0 attach-menu-container z-[40]">
            <button 
              onClick={(e) => { e.preventDefault(); setMenuOpen(!menuOpen); }}
              className="flex items-center justify-center rounded-md hover:bg-white/5 active:scale-95 min-w-[44px] min-h-[44px] border border-transparent hover:border-white/10"
              style={{ color: menuOpen ? "var(--cyan)" : "var(--text-muted)", transition: "all 150ms ease" }}
            >
              <Plus size={24} className="pointer-events-none" style={{ transform: menuOpen ? "rotate(45deg)" : "rotate(0)", transition: "transform 200ms cubic-bezier(0.4, 0, 0.2, 1)" }} />
            </button>
            {menuOpen && (
              <div className="absolute bottom-[calc(100%+12px)] left-0 p-1.5 rounded-lg min-w-[190px] z-[9999]"
                style={{ 
                  background: "#161b22", 
                  border: "1px solid var(--purple, #B026FF)", 
                  boxShadow: "0 10px 40px rgba(0,0,0,0.9), 0 0 25px rgba(176,38,255,0.3)",
                  animation: "fadeIn 80ms ease-out" 
                }}>
                <button 
                  onClick={() => { if(fileRef.current) { fileRef.current.accept = "*/*"; fileRef.current.click(); } }} 
                  className="flex items-center gap-3 px-3 py-3 rounded-md w-full hover:bg-[rgba(176,38,255,0.15)] active:scale-[0.98] transition-all duration-75 text-left"
                  style={{ color: "var(--text-primary, #E6EDF3)", fontSize: 13, fontWeight: 600 }}>
                  <Plus size={20} style={{ color: "var(--purple, #B026FF)" }} /> 
                  <span>Upload File</span>
                </button>
                <div className="h-px my-1 mx-2 bg-white/5" />
                <button 
                  onClick={() => { if(fileRef.current) { fileRef.current.accept = "image/*"; fileRef.current.click(); } }}
                  className="flex items-center gap-3 px-3 py-3 rounded-md w-full hover:bg-[rgba(176,38,255,0.15)] active:scale-[0.98] transition-all duration-75 text-left"
                  style={{ color: "var(--text-primary, #E6EDF3)", fontSize: 13, fontWeight: 600 }}>
                  <ImageIcon size={20} style={{ color: "var(--purple, #B026FF)" }} /> 
                  <span>Add Image</span>
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