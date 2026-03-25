import React, { useState, useCallback } from "react";
import { User, Copy, Check, Paperclip, Download } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Message } from "../../types/chat";
import dragonIcon from "../../assets/dragon-layer.svg";

function downloadSnippet(code: string, language: string) {
  try {
    const extMap: Record<string, string> = {
      typescript: 'ts', javascript: 'js', python: 'py', 
      json: 'json', yaml: 'yml', html: 'html', css: 'css',
      bash: 'sh', shell: 'sh', markdown: 'md', java: 'java'
    };
    
    const ext = extMap[language.toLowerCase()] || 'txt';
    const filename = `dz_${language}_${Date.now()}.${ext}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("DRAGZONE_DOWNLOAD_ERROR:", err);
  }
}

interface Props {
  message: Message;
  index: number;
}

export const MessageBubble = React.memo(function MessageBubble({ message: m, index }: Props) {
  const [copied, setCopied] = useState(false);
  const [hov, setHov] = useState(false);
  const isU = m.role === "user";

  const copy = () => { 
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(m.content).catch(() => {}); 
      }
    } catch (e) {}
    setCopied(true); 
    setTimeout(() => setCopied(false), 2000); 
  };

  const accent = isU ? "var(--neon-purple-rgb)" : "var(--cyan-rgb)";

  return (
    <div
      className={`flex gap-[clamp(8px,1vw,14px)] ${isU ? "justify-end" : "justify-start"}`}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ animation: `messageIn 0.3s cubic-bezier(0.19,1,0.22,1) ${index * 0.03}s both`, willChange: 'transform, opacity' }}
    >
      {/* Assistant avatar */}
      {!isU && (
        <div className="relative shrink-0 mt-1">
          <div className="rounded-[10px] flex items-center justify-center overflow-hidden transition-all duration-200"
            style={{
              width: "clamp(30px,3.2vw,36px)", height: "clamp(30px,3.2vw,36px)",
              background: `rgba(${accent}, 0.05)`,
              border: `1px solid rgba(${accent}, 0.2)`,
              boxShadow: `0 0 10px rgba(${accent}, 0.1)`,
            }}>
            <img src={dragonIcon} alt="" style={{ width: "60%", height: "60%", filter: `drop-shadow(0 0 3px rgba(${accent}, 0.4))` }} />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-[7px] h-[7px] rounded-full" style={{ background: `rgb(${accent})`, boxShadow: `0 0 6px rgb(${accent})`, border: "1.5px solid #0a0e16" }} />
        </div>
      )}

      {/* Bubble */}
      <div className="group" style={{ maxWidth: "clamp(240px, 72%, 580px)" }}>
        <div className="relative rounded-[14px] overflow-hidden transition-all duration-200 ease-out shadow-lg"
          style={{
            background: hov ? `rgba(${accent}, 0.1)` : `rgba(${accent}, 0.04)`,
            border: `1px solid rgba(${accent}, ${hov ? "0.3" : "0.15"})`,
            borderRadius: isU ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
            boxShadow: hov ? `0 6px 24px rgba(${accent}, 0.15)` : "none",
            transform: hov ? "translateY(-1px)" : "none",
            willChange: "transform, background-color"
          }}>
          {/* Edge highlight */}
          <div className="absolute top-0 left-[10%] right-[10%] h-[1px]" style={{ background: `linear-gradient(90deg, transparent, rgba(${accent}, 0.4), transparent)` }} />

          {/* Copy Button Top Right */}
          <button onClick={copy} className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 p-1.5 rounded-[8px] transition-all duration-200 hover:bg-white/10 active:scale-95"
            style={{ color: "#888", touchAction: "manipulation" }}>
            {copied ? <Check size={12} style={{ color: "var(--cyan)" }} /> : <Copy size={12} />}
          </button>

          {/* Attachments */}
          {m.attachments && m.attachments.length > 0 && (
            <div className="px-[clamp(12px,1.6vw,18px)] pt-[clamp(10px,1.2vw,14px)] flex flex-wrap gap-2">
              {m.attachments.map((att) => (
                <div key={att.id} className="flex items-center gap-1.5 px-2.5 py-1 rounded-[8px]"
                  style={{ background: "rgba(176,38,255,0.05)", border: "1px solid rgba(176,38,255,0.15)" }}>
                  <div className="w-1 h-1 rounded-full bg-[var(--red)]" />
                  <Paperclip size={9} style={{ color: "var(--neon-purple)" }} />
                  <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "10px", color: "#E0E0E0" }}>{att.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="px-[clamp(12px,1.6vw,18px)] py-[clamp(10px,1.2vw,14px)]" style={{ color: "var(--text-primary)" }}>
            {isU ? (
              <p style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "clamp(13px,1.35vw,15px)",
                lineHeight: "1.75",
                letterSpacing: "0.2px",
                whiteSpace: "pre-wrap"
              }}>
                {m.content}
              </p>
            ) : (
              <div className="markdown-body" style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "clamp(13px,1.35vw,15px)",
                lineHeight: "1.75",
                letterSpacing: "0.2px",
              }}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({node, inline, className, children, ...props}: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      const language = match ? match[1] : '';
                      const codeString = String(children).replace(/\n$/, '');
                      
                      const [copiedLocal, setCopiedLocal] = React.useState(false);
                      const handleCopy = () => {
                          navigator.clipboard.writeText(codeString);
                          setCopiedLocal(true);
                          setTimeout(() => setCopiedLocal(false), 2000);
                      };

                      if (!inline && match) {
                        return (
                          <div className="my-4 rounded-[12px] overflow-hidden border border-[rgba(255,10,10,0.15)] shadow-2xl bg-black">
                            {/* CodeFrame Header - CYBER DRAGON STYLE */}
                            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#050505]">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[var(--red)] shadow-[0_0_6px_var(--red)]" />
                                    <span className="text-[10px] font-mono text-[var(--cyan)] uppercase tracking-[2px] px-2 py-0.5 rounded-[4px] bg-[var(--cyan)]/10 border border-[var(--cyan)]/20">
                                        {language}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                      onClick={handleCopy}
                                      className="p-1.5 rounded-[6px] hover:bg-white/10 text-zinc-400 hover:text-[var(--cyan)] transition-all duration-200 active:scale-90"
                                      title="Copy Code"
                                    >
                                        {copiedLocal ? <Check size={14} style={{ color: "var(--cyan)" }} /> : <Copy size={14} />}
                                    </button>
                                    <button 
                                      onClick={() => downloadSnippet(codeString, language)}
                                      className="p-1.5 rounded-[6px] hover:bg-white/10 text-zinc-400 hover:text-[var(--neon-purple)] transition-all duration-200 active:scale-90"
                                      title="Download Snippet"
                                    >
                                        <Download size={14} />
                                    </button>
                                </div>
                            </div>
                            {/* CodeFrame Body */}
                            <div className="overflow-auto text-[13px] sm:text-[14px] max-h-[500px]" style={{ scrollbarWidth: "thin", scrollbarColor: "#333 #0d1117" }}>
                                <SyntaxHighlighter
                                  style={vscDarkPlus}
                                  language={language}
                                  PreTag="div"
                                  customStyle={{ margin: 0, background: '#000', padding: '16px', borderRadius: '0' }}
                                  {...props}
                                >
                                  {codeString}
                                </SyntaxHighlighter>
                            </div>
                          </div>
                        );
                      }
                      
                      // Inline code
                      return (
                        <code className="px-1.5 py-0.5 rounded-[6px] bg-[var(--cyan)]/10 text-[var(--cyan)] font-mono text-[0.9em] border border-[var(--cyan)]/20" {...props}>
                          {children}
                        </code>
                      );
                    },
                    
                    table: ({node, ...props}) => <div className="overflow-x-auto my-4"><table className="w-full text-left border-collapse border border-white/10" {...props} /></div>,
                    th: ({node, ...props}) => <th className="p-3 bg-white/5 border border-white/10 font-semibold text-[var(--cyan)]" {...props} />,
                    td: ({node, ...props}) => <td className="p-3 border border-white/10" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc ml-6 my-2 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal ml-6 my-2 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className="pl-1" {...props} />,
                    h1: ({node, ...props}) => {
                      const text = String(props.children);
                      if (text.toLowerCase().includes('quiz')) {
                        return (
                          <div className="relative my-8 p-6 rounded-[16px] overflow-hidden border border-[var(--cyan)]/30 bg-[var(--cyan)]/5 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent" />
                            <h1 className="text-2xl font-black italic tracking-tighter text-[var(--cyan)]" {...props} />
                          </div>
                        );
                      }
                      return <h1 className="text-xl font-bold mt-6 mb-3 text-[var(--cyan)]" {...props} />
                    },
                    h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-5 mb-2 text-white border-b border-white/5 pb-1" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-md font-semibold mt-4 mb-2 text-white" {...props} />,
                    p: ({node, ...props}) => {
                      const text = String(props.children);
                      if (text.toLowerCase().startsWith('note:')) {
                        return (
                          <div className="relative my-4 p-4 rounded-[12px] overflow-hidden border border-[var(--neon-purple)]/30 bg-[var(--neon-purple)]/5 shadow-[0_0_20px_rgba(176,38,255,0.1)]">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--neon-purple)] to-transparent" />
                            <p className="mb-0 text-white" {...props} />
                          </div>
                        );
                      }
                      return <p className="mb-4 last:mb-0" {...props} />;
                    },
                    a: ({node, ...props}) => <a className="text-[var(--cyan)] hover:text-white underline decoration-[var(--cyan)]/30 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
                  }}
                >
                  {m.content}
                </ReactMarkdown>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-[clamp(12px,1.6vw,18px)] pb-[clamp(8px,0.9vw,10px)]">
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-[3px] rounded-full" style={{ background: `rgb(${accent})`, opacity: 0.5 }} />
              <span style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "clamp(8px,0.8vw,9px)", color: "#666" }}>
                {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* User avatar */}
      {isU && (
        <div className="shrink-0 mt-1">
          <div className="rounded-[10px] flex items-center justify-center transition-all duration-200"
            style={{
              width: "clamp(30px,3.2vw,36px)", height: "clamp(30px,3.2vw,36px)",
              background: `rgba(${accent}, 0.12)`,
              border: `1px solid rgba(${accent}, 0.3)`,
              boxShadow: `0 0 10px rgba(${accent}, 0.1)`,
            }}>
            <User size={13} style={{ color: `rgb(${accent})`, filter: `drop-shadow(0 0 3px rgba(${accent}, 0.4))` }} />
          </div>
        </div>
      )}
    </div>
  );
});
