import React, { useState, useCallback } from "react";
import { User, Copy, Check, Paperclip, Download } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Message } from "../../types/chat";
import dragonIcon from "../../assets/dragon-layer.svg";

function downloadSnippet(code: string, language: string) {
  const extMap: Record<string, string> = {
    typescript: 'ts', javascript: 'js', python: 'py',
    json: 'json', yaml: 'yml', html: 'html', css: 'css',
    bash: 'sh', shell: 'sh', markdown: 'md', java: 'java'
  };
  const ext = extMap[language.toLowerCase()] || 'txt';
  let baseName = 'snippet';
  const firstLine = code.trim().split('\n')[0].toLowerCase();
  if (firstLine.includes('class ') || firstLine.includes('function ')) {
    const match = firstLine.match(/(class|function)\s+([a-zA-Z0-9_]+)/);
    if (match?.[2]) baseName = match[2];
  } else if (code.includes('---')) baseName = 'workflow_config';
  else if (code.length > 50) baseName = 'dragon_logic';

  const blob = new Blob([code], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `${baseName}-${Date.now()}.${ext}`;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

interface Props { message: Message; index: number; }

export const MessageBubble = React.memo(function MessageBubble({ message: m, index }: Props) {
  const [copied, setCopied] = useState(false);
  const isU = m.role === "user";

  const copy = useCallback(() => {
    try { navigator.clipboard?.writeText(m.content).catch(() => {}); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [m.content]);

  return (
    <div
      className={`flex gap-2.5 ${isU ? "justify-end" : "justify-start"}`}
      style={{ animation: `messageIn 200ms ease-out ${Math.min(index * 20, 200)}ms both` }}
    >
      {/* AI avatar */}
      {!isU && (
        <div className="shrink-0 mt-0.5 flex items-start">
          <div className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{ background: "rgba(0,212,229,0.08)", border: "1px solid rgba(0,212,229,0.15)" }}>
            <img src={dragonIcon} alt="" style={{ width: 16, height: 16, opacity: 0.85 }} />
          </div>
        </div>
      )}

      {/* Bubble */}
      <div className="group" style={{ maxWidth: "min(600px, 78%)" }}>
        <div className="rounded-lg overflow-hidden"
          style={{
            background: isU ? "rgba(0,212,229,0.06)" : "rgba(255,255,255,0.02)",
            border: `1px solid ${isU ? "rgba(0,212,229,0.12)" : "var(--border, rgba(255,255,255,0.06))"}`,
          }}>

          {/* Attachments */}
          {m.attachments?.length > 0 && (
            <div className="px-3 pt-2.5 flex flex-wrap gap-1.5">
              {m.attachments.map((att) => (
                <div key={att.id} className="flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                  style={{ background: "rgba(157,92,255,0.08)", border: "1px solid rgba(157,92,255,0.15)", color: "var(--text-secondary)" }}>
                  <Paperclip size={9} /> {att.name}
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="px-3 py-2.5" style={{ color: "var(--text-primary, #E6EDF3)" }}>
            {isU ? (
              <p style={{ fontFamily: "var(--font-ui)", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{m.content}</p>
            ) : (
              <div className="markdown-body" style={{ fontFamily: "var(--font-ui)", fontSize: 14, lineHeight: 1.65 }}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({node, inline, className, children, ...props}: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      const language = match ? match[1] : '';
                      const codeString = String(children).replace(/\n$/, '');
                      if (!inline && match) {
                        return (
                          <div className="my-3 rounded-md overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                            <div className="flex items-center justify-between px-3 py-1.5" style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid var(--border)" }}>
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--cyan)", fontWeight: 500 }}>{language}</span>
                              <div className="flex gap-1">
                                <button onClick={() => navigator.clipboard.writeText(codeString)} className="p-1 rounded hover:bg-white/5 min-w-[28px] min-h-[28px] flex items-center justify-center"
                                  style={{ color: "var(--text-muted)", transition: "background 100ms" }} title="Copy">
                                  <Copy size={12} />
                                </button>
                                <button onClick={() => downloadSnippet(codeString, language)} className="p-1 rounded hover:bg-white/5 min-w-[28px] min-h-[28px] flex items-center justify-center"
                                  style={{ color: "var(--text-muted)", transition: "background 100ms" }} title="Download">
                                  <Download size={12} />
                                </button>
                              </div>
                            </div>
                            <div className="overflow-auto max-h-[400px]">
                              <SyntaxHighlighter style={vscDarkPlus} language={language} PreTag="div"
                                customStyle={{ margin: 0, background: '#0d1117', padding: '12px', borderRadius: 0, fontSize: 13 }} {...props}>
                                {codeString}
                              </SyntaxHighlighter>
                            </div>
                          </div>
                        );
                      }
                      return <code className="px-1 py-0.5 rounded text-[0.88em]" style={{ background: "rgba(0,212,229,0.08)", color: "var(--cyan)", fontFamily: "var(--font-mono)" }} {...props}>{children}</code>;
                    },
                    table: ({node, ...props}) => <div className="overflow-x-auto my-3 rounded" style={{ border: "1px solid var(--border)" }}><table className="w-full text-left text-sm border-collapse" {...props} /></div>,
                    th: ({node, ...props}) => <th className="px-3 py-2 font-medium" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid var(--border)", color: "var(--cyan)", fontSize: 12 }} {...props} />,
                    td: ({node, ...props}) => <td className="px-3 py-2" style={{ borderBottom: "1px solid var(--border)", fontSize: 13 }} {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc ml-5 my-2 space-y-0.5" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal ml-5 my-2 space-y-0.5" {...props} />,
                    li: ({node, ...props}) => <li style={{ fontSize: 14 }} {...props} />,
                    h1: ({node, ...props}) => {
                      const text = String(props.children);
                      if (text.toLowerCase().includes('quiz')) {
                        return (
                          <div className="my-4 p-4 rounded-lg" style={{ background: "rgba(0,212,229,0.06)", border: "1px solid rgba(0,212,229,0.15)" }}>
                            <h1 className="text-lg font-bold" style={{ color: "var(--cyan)" }} {...props} />
                          </div>
                        );
                      }
                      return <h1 className="text-lg font-bold mt-4 mb-2" style={{ color: "var(--text-primary)" }} {...props} />;
                    },
                    h2: ({node, ...props}) => <h2 className="text-base font-semibold mt-4 mb-1.5" style={{ color: "var(--text-primary)", borderBottom: "1px solid var(--border)", paddingBottom: 4 }} {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-sm font-semibold mt-3 mb-1" style={{ color: "var(--text-primary)" }} {...props} />,
                    p: ({node, ...props}) => {
                      const text = String(props.children);
                      if (text.toLowerCase().startsWith('note:')) {
                        return (
                          <div className="my-3 px-3 py-2.5 rounded-md" style={{ background: "rgba(157,92,255,0.06)", borderLeft: "2px solid var(--purple)" }}>
                            <p className="mb-0" style={{ color: "var(--text-primary)", fontSize: 13 }} {...props} />
                          </div>
                        );
                      }
                      return <p className="mb-3 last:mb-0" {...props} />;
                    },
                    a: ({node, ...props}) => <a className="underline" style={{ color: "var(--cyan)", textUnderlineOffset: 2 }} target="_blank" rel="noopener noreferrer" {...props} />,
                  }}
                >
                  {m.content}
                </ReactMarkdown>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-3 pb-2">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>
              {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
            <button onClick={copy} className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/5 active:scale-90"
              style={{ color: "var(--text-muted)", transition: "opacity 100ms" }}>
              {copied ? <Check size={10} style={{ color: "var(--cyan)" }} /> : <Copy size={10} />}
            </button>
          </div>
        </div>
      </div>

      {/* User avatar */}
      {isU && (
        <div className="shrink-0 mt-0.5">
          <div className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{ background: "rgba(0,212,229,0.06)", border: "1px solid var(--border)" }}>
            <User size={12} style={{ color: "var(--text-secondary)" }} />
          </div>
        </div>
      )}
    </div>
  );
});
