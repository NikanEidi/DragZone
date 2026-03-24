import React, { useState } from "react";
import { User, Copy, Check, Paperclip } from "lucide-react";
import type { Message } from "../../types/chat";
import dragonIcon from "../../assets/dragon-layer.svg";

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
          <div className="px-[clamp(12px,1.6vw,18px)] py-[clamp(10px,1.2vw,14px)]">
            <p style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "clamp(13px,1.35vw,15px)",
              lineHeight: "1.75",
              color: textColor,
              letterSpacing: "0.2px",
            }}>
              {m.content}
            </p>
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
