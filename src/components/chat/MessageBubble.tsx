import React, { useState } from "react";
import { User, Copy, Check, Paperclip, Download } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Message } from "../../types/chat";
import dragonIcon from "../../assets/dragon-layer.svg";

function downloadSnippet(code: string, language: string) {
  // Map common languages to extensions
  const extMap: Record<string, string> = {
    typescript: 'ts', javascript: 'js', python: 'py', 
    json: 'json', yaml: 'yml', html: 'html', css: 'css',
    bash: 'sh', shell: 'sh'
  };
  
  const ext = extMap[language.toLowerCase()] || 'txt';
  const filename = `snippet-${Date.now()}.${ext}`;
  
  const blob = new Blob([code], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

interface Props {
  message: Message;
  index: number;
}

export function MessageBubble({ message: m, index }: Props) {
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

  const accent = isU ? "#4A9BD9" : "#00F0FF";
  const textColor = isU ? "#C8D8E8" : "#E0E0E0";

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
              background: "rgba(0,240,255,0.05)",
              border: "1px solid rgba(0,240,255,0.2)",
              boxShadow: "0 0 10px rgba(0,240,255,0.1)",
            }}>
            <img src={dragonIcon} alt="" style={{ width: "60%", height: "60%", filter: "drop-shadow(0 0 3px rgba(0,240,255,0.4))" }} />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-[7px] h-[7px] rounded-full" style={{ background: "#00F0FF", boxShadow: "0 0 6px #00F0FF", border: "1.5px solid #0a0e16" }} />
        </div>
      )}

      {/* Bubble */}
      <div className="group" style={{ maxWidth: "clamp(240px, 72%, 580px)" }}>
        <div className="relative rounded-[14px] overflow-hidden transition-all duration-200 ease-out"
          style={{
            background: hov ? `${accent}0f` : `${accent}05`,
            border: `1px solid ${accent}${hov ? "33" : "15"}`,
            borderRadius: isU ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
            boxShadow: hov ? `0 6px 24px ${accent}15` : "none",
            transform: hov ? "translateY(-1px)" : "none",
            willChange: "transform, background-color"
          }}>
          {/* Edge highlight */}
          <div className="absolute top-0 left-[10%] right-[10%] h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${accent}33, transparent)` }} />

          {/* Attachments */}
          {m.attachments && m.attachments.length > 0 && (
            <div className="px-[clamp(12px,1.6vw,18px)] pt-[clamp(10px,1.2vw,14px)] flex flex-wrap gap-2">
              {m.attachments.map((att) => (
                <div key={att.id} className="flex items-center gap-1.5 px-2.5 py-1 rounded-[8px]"
                  style={{ background: "rgba(176,38,255,0.1)", border: "1px solid rgba(176,38,255,0.2)" }}>
                  <Paperclip size={9} style={{ color: "#B026FF" }} />
                  <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "10px", color: "#E0E0E0" }}>{att.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="px-[clamp(12px,1.6vw,18px)] py-[clamp(10px,1.2vw,14px)]" style={{ color: textColor }}>
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
                    // Override code rendering for the premium CodeFrame
                    code({node, inline, className, children, ...props}: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      const language = match ? match[1] : '';
                      const codeString = String(children).replace(/\n$/, '');
                      
                      if (!inline && match) {
                        return (
                          <div className="my-4 rounded-[12px] overflow-hidden border border-[#333] shadow-lg liquid-glass-dark">
                            {/* CodeFrame Header */}
                            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-[#333]">
                                <span className="text-xs font-mono text-[#00F0FF] lowercase px-2 py-0.5 rounded-[4px] bg-[#00F0FF]/10 border border-[#00F0FF]/20">
                                    {language}
                                </span>
                                <div className="flex gap-2">
                                    <button 
                                      onClick={() => {
                                        navigator.clipboard.writeText(codeString);
                                        // Visual feedback would require local state here, simplified for inline component
                                      }}
                                      className="p-1.5 rounded-[6px] hover:bg-white/10 text-zinc-400 hover:text-[#00F0FF] transition-colors"
                                      title="Copy Code"
                                    >
                                        <Copy size={14} />
                                    </button>
                                    <button 
                                      onClick={() => downloadSnippet(codeString, language)}
                                      className="p-1.5 rounded-[6px] hover:bg-white/10 text-zinc-400 hover:text-[#B026FF] transition-colors"
                                      title="Download Snippet"
                                    >
                                        <Download size={14} />
                                    </button>
                                </div>
                            </div>
                            {/* CodeFrame Body */}
                            <div className="overflow-x-auto text-[13px] sm:text-[14px]">
                                <SyntaxHighlighter
                                  style={vscDarkPlus}
                                  language={language}
                                  PreTag="div"
                                  customStyle={{ margin: 0, background: '#0d1117', padding: '16px', borderRadius: '0' }}
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
                        <code className="px-1.5 py-0.5 rounded-[6px] bg-[#00F0FF]/10 text-[#00F0FF] font-mono text-[0.9em] border border-[#00F0FF]/20" {...props}>
                          {children}
                        </code>
                      );
                    },
                    
                    // Table styles for CSV data
                    table: ({node, ...props}) => <div className="overflow-x-auto my-4"><table className="w-full text-left border-collapse border border-[rgba(255,255,255,0.1)]" {...props} /></div>,
                    th: ({node, ...props}) => <th className="p-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] font-semibold text-[#00F0FF]" {...props} />,
                    td: ({node, ...props}) => <td className="p-3 border border-[rgba(255,255,255,0.1)]" {...props} />,
                    
                    // List styles
                    ul: ({node, ...props}) => <ul className="list-disc ml-6 my-2 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal ml-6 my-2 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className="pl-1" {...props} />,
                    
                    // Header styles
                    h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-6 mb-3 text-[#00F0FF]" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-5 mb-2 text-[#E0E0E0]" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-md font-semibold mt-4 mb-2 text-[#E0E0E0]" {...props} />,
                    
                    // Standard blocks
                    p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                    a: ({node, ...props}) => <a className="text-[#4A9BD9] hover:text-[#00F0FF] underline decoration-[#00F0FF]/30 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
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
              <div className="w-[3px] h-[3px] rounded-full" style={{ background: accent, opacity: 0.5 }} />
              <span style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "clamp(8px,0.8vw,9px)", color: "#666" }}>
                {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <button onClick={copy} className="opacity-0 group-hover:opacity-100 p-1 rounded-[6px] transition-all duration-200 hover:bg-white/10 active:scale-90"
              style={{ color: "#888", touchAction: "manipulation" }}>
              {copied ? <Check size={9} style={{ color: "#00F0FF" }} /> : <Copy size={9} />}
            </button>
          </div>
        </div>
      </div>

      {/* User avatar */}
      {isU && (
        <div className="shrink-0 mt-1">
          <div className="rounded-[10px] flex items-center justify-center transition-all duration-200"
            style={{
              width: "clamp(30px,3.2vw,36px)", height: "clamp(30px,3.2vw,36px)",
              background: "rgba(74,155,217,0.08)",
              border: "1px solid rgba(74,155,217,0.2)",
            }}>
            <User size={13} style={{ color: "#4A9BD9", filter: "drop-shadow(0 0 3px rgba(74,155,217,0.4))" }} />
          </div>
        </div>
      )}
    </div>
  );
}
