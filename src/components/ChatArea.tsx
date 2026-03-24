import React, { useState, useRef, useEffect, useCallback } from "react";
import { Send, Menu, User, Sparkles, Terminal, ArrowDown, Copy, Check, Activity, Cpu } from "lucide-react";
import { GlassFrame } from "./GlassFrame";
import dragonIcon from "figma:asset/d4e91d23b9ec3a1c291e712a4ea1d27fc6f6fb52.png";

interface Message { id: string; role: "user" | "assistant"; content: string; timestamp: Date; }
interface ChatAreaProps { messages: Message[]; onSend: (t: string) => void; onToggleSidebar: () => void; isTyping: boolean; }

/* ─── Typing dots ─── */
function TypingDots() {
  return (
    <div className="flex items-center gap-[clamp(6px,0.8vw,10px)]">
      <div className="flex items-center gap-[3px]">
        {[0, 1, 2].map(i => (
          <div key={i} className="rounded-full animate-[typingBounce_1.4s_ease-in-out_infinite]"
            style={{ width: "clamp(4px,0.5vw,6px)", height: "clamp(4px,0.5vw,6px)", background: "#A020F0",
              boxShadow: "0 0 6px #A020F0, 0 0 14px rgba(160,32,240,0.25)", animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
      <span className="animate-[textFlicker_2.5s_ease-in-out_infinite]" style={{
        fontFamily: "'Rajdhani',sans-serif", fontSize: "clamp(10px,1.1vw,12px)", color: "#5a4a6a", letterSpacing: "1px"
      }}>Processing...</span>
    </div>
  );
}

/* ─── Waveform ─── */
function Waveform() {
  return (
    <div className="flex items-center gap-[1px] h-[12px]">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="w-[1.5px] rounded-full animate-[waveform_0.8s_ease-in-out_infinite_alternate]"
          style={{ background: "rgba(160,32,240,0.3)", height: `${25 + Math.random() * 75}%`, animationDelay: `${i * 0.04}s` }} />
      ))}
    </div>
  );
}

/* ─── Message Bubble ─── */
function Bubble({ m, idx }: { m: Message; idx: number }) {
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

  const accent = isU ? "#00F3FF" : "#A020F0";
  const accentSoft = isU ? "rgba(0,243,255," : "rgba(160,32,240,";

  return (
    <div
      className={`flex gap-[clamp(8px,1vw,14px)] ${isU ? "justify-end" : "justify-start"}`}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ animation: `messageIn 0.5s cubic-bezier(0.22,1,0.36,1) ${idx * 0.05}s both` }}
    >
      {/* Avatar (assistant) */}
      {!isU && (
        <div className="relative shrink-0 mt-1">
          <div className="rounded-[12px] flex items-center justify-center overflow-hidden"
            style={{
              width: "clamp(32px,3.6vw,40px)", height: "clamp(32px,3.6vw,40px)",
              background: `${accentSoft}0.06)`,
              border: `1.5px solid ${accentSoft}0.15)`,
              boxShadow: `0 0 14px ${accentSoft}0.06), inset 0 1px 0 rgba(255,255,255,0.03)`,
            }}>
            <img src={dragonIcon} alt="" style={{ width: "65%", height: "65%", filter: "drop-shadow(0 0 4px rgba(160,32,240,0.4))" }} />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-[8px] h-[8px] rounded-full"
            style={{ background: "#00F3FF", boxShadow: "0 0 5px #00F3FF", border: "1.5px solid #0a0618" }} />
        </div>
      )}

      {/* Bubble */}
      <div className="group" style={{ maxWidth: "clamp(240px, 72%, 600px)" }}>
        <div className="relative rounded-[18px] overflow-hidden transition-all duration-400"
          style={{
            background: hov ? `${accentSoft}0.06)` : `${accentSoft}0.03)`,
            border: `1.5px solid ${accentSoft}${hov ? "0.15)" : "0.08)"}`,
            borderRadius: isU ? "20px 20px 6px 20px" : "20px 20px 20px 6px",
            boxShadow: hov ? `0 8px 30px ${accentSoft}0.06), inset 0 1px 0 rgba(255,255,255,0.02)` : "inset 0 1px 0 rgba(255,255,255,0.01)",
            transform: hov ? "translateY(-1px)" : "none",
            transition: "all 0.35s ease",
          }}>
          {/* Top edge shine */}
          <div className="absolute top-0 left-[12%] right-[12%] h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${accentSoft}0.15), transparent)` }} />

          <div className="px-[clamp(14px,1.8vw,20px)] py-[clamp(12px,1.4vw,16px)]">
            <p style={{
              fontFamily: "'Rajdhani',sans-serif",
              fontSize: "clamp(13px,1.4vw,16px)",
              lineHeight: "1.8",
              color: isU ? "#c8e8ee" : "#c0b8d0",
              letterSpacing: "0.3px",
            }}>
              {m.content}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-[clamp(14px,1.8vw,20px)] pb-[clamp(8px,1vw,12px)]">
            <div className="flex items-center gap-2">
              <div className="w-[4px] h-[4px] rounded-full" style={{ background: accent, opacity: 0.35 }} />
              <span style={{ fontFamily: "monospace", fontSize: "clamp(8px,0.9vw,10px)", color: "#2a2a3a" }}>
                {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <button onClick={copy}
              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-[8px] transition-all duration-300 hover:bg-white/5 active:scale-90"
              style={{ color: "#3a3a4a", touchAction: "manipulation" }}>
              {copied ? <Check size={10} style={{ color: "#00F3FF" }} /> : <Copy size={10} />}
            </button>
          </div>
        </div>
      </div>

      {/* Avatar (user) */}
      {isU && (
        <div className="shrink-0 mt-1">
          <div className="rounded-[12px] flex items-center justify-center"
            style={{
              width: "clamp(32px,3.6vw,40px)", height: "clamp(32px,3.6vw,40px)",
              background: "rgba(0,243,255,0.04)",
              border: "1.5px solid rgba(0,243,255,0.1)",
              boxShadow: "0 0 10px rgba(0,243,255,0.04), inset 0 1px 0 rgba(255,255,255,0.02)",
            }}>
            <User size={14} style={{ color: "#00F3FF", filter: "drop-shadow(0 0 3px rgba(0,243,255,0.3))" }} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Chat Area ─── */
export function ChatArea({ messages, onSend, onToggleSidebar, isTyping }: ChatAreaProps) {
  const [input, setInput] = useState("");
  const [sendHov, setSendHov] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const onScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowScroll(scrollHeight - scrollTop - clientHeight > 80);
  }, []);

  const send = () => { if (!input.trim()) return; onSend(input.trim()); setInput(""); inputRef.current?.focus(); };
  const has = input.trim().length > 0;

  return (
    <div className="flex-1 flex flex-col min-w-0 p-[clamp(6px,0.8vw,12px)]">
      <GlassFrame className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="flex items-center gap-[clamp(8px,1vw,14px)] px-[clamp(14px,2vw,24px)] py-[clamp(10px,1.3vw,16px)] shrink-0"
          style={{ borderBottom: "1px solid rgba(160,32,240,0.05)" }}>
          <button onClick={onToggleSidebar} className="md:hidden p-[clamp(6px,0.8vw,10px)] rounded-[12px] hover:bg-white/5 active:scale-90 transition-all"
            style={{ color: "#A020F0", touchAction: "manipulation" }}>
            <Menu size={18} />
          </button>
          <div className="p-[6px] rounded-[10px]" style={{ background: "rgba(0,243,255,0.04)", border: "1px solid rgba(0,243,255,0.08)" }}>
            <Terminal size={13} style={{ color: "#00F3FF", filter: "drop-shadow(0 0 5px #00F3FF)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(9px,1.1vw,11px)", letterSpacing: "3px", color: "#7a6a8a" }}>
              NEURAL INTERFACE
            </span>
          </div>
          <Waveform />
          <div className="flex items-center gap-[6px] px-[clamp(8px,1vw,12px)] py-[4px] rounded-full"
            style={{ background: "rgba(0,243,255,0.03)", border: "1px solid rgba(0,243,255,0.06)" }}>
            <div className="relative">
              <div className="w-[6px] h-[6px] rounded-full" style={{ background: "#00F3FF", boxShadow: "0 0 6px #00F3FF" }} />
              <div className="absolute inset-0 rounded-full animate-[pingOut_2s_ease-out_infinite]" style={{ background: "#00F3FF" }} />
            </div>
            <span className="hidden sm:inline" style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "10px", color: "#3a4a4a", letterSpacing: "1px" }}>LIVE</span>
          </div>
        </div>

        {/* Messages area */}
        <div ref={scrollRef} onScroll={onScroll}
          className="flex-1 overflow-y-auto px-[clamp(12px,2vw,28px)] py-[clamp(16px,2.5vw,28px)] space-y-[clamp(14px,2vw,22px)] overscroll-contain"
          style={{ WebkitOverflowScrolling: "touch" }}>
          {/* Empty state */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-[clamp(20px,3vw,36px)]">
              <div className="relative" style={{ perspective: "600px" }}>
                <div className="animate-[dragonFloat_6s_ease-in-out_infinite]" style={{ transformStyle: "preserve-3d" }}>
                  <img src={dragonIcon} alt="Dragon AI"
                    style={{
                      width: "clamp(80px,12vw,120px)", height: "clamp(80px,12vw,120px)",
                      filter: "drop-shadow(0 0 30px rgba(160,32,240,0.4)) drop-shadow(0 0 60px rgba(160,32,240,0.15))"
                    }} />
                </div>
                {/* Orbit ring */}
                <div className="absolute top-1/2 left-1/2 rounded-full animate-[orbitSpin_12s_linear_infinite]"
                  style={{ width: "180%", height: "180%", border: "1px solid rgba(160,32,240,0.06)", transform: "translate(-50%,-50%) rotateX(70deg)" }}>
                  <div className="absolute top-0 left-1/2 w-[6px] h-[6px] rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{ background: "#A020F0", boxShadow: "0 0 8px #A020F0, 0 0 18px rgba(160,32,240,0.3)" }} />
                </div>
                <div className="absolute top-1/2 left-1/2 rounded-full animate-[orbitSpin_18s_linear_infinite_reverse]"
                  style={{ width: "240%", height: "240%", border: "1px solid rgba(0,243,255,0.04)", transform: "translate(-50%,-50%) rotateX(70deg) rotateZ(50deg)" }}>
                  <div className="absolute top-0 left-1/2 w-[4px] h-[4px] rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{ background: "#00F3FF", boxShadow: "0 0 6px #00F3FF" }} />
                </div>
              </div>
              <div className="text-center space-y-[clamp(6px,1vw,12px)]">
                <p style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(10px,1.4vw,14px)", color: "#A020F0", letterSpacing: "5px", textShadow: "0 0 18px rgba(160,32,240,0.25)" }}>
                  DRAGON CORE ACTIVE
                </p>
                <p style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "clamp(12px,1.3vw,14px)", color: "#2a2a3a", letterSpacing: "2px" }}>
                  Initialize neural link to begin transmission
                </p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <Activity size={9} style={{ color: "#5a4a6a" }} />
                  <span style={{ fontFamily: "monospace", fontSize: "clamp(8px,0.9vw,10px)", color: "#1e1e2e", letterSpacing: "1px" }}>
                    LATENCY: 0.003ms &bull; THREADS: 47 &bull; UPTIME: 99.97%
                  </span>
                </div>
              </div>
            </div>
          )}

          {messages.map((m, i) => <Bubble key={m.id} m={m} idx={i} />)}

          {isTyping && (
            <div className="flex gap-[clamp(8px,1vw,14px)] items-start animate-[messageIn_0.4s_cubic-bezier(0.22,1,0.36,1)_both]">
              <div className="rounded-[12px] flex items-center justify-center shrink-0 overflow-hidden"
                style={{ width: "clamp(32px,3.6vw,40px)", height: "clamp(32px,3.6vw,40px)", background: "rgba(160,32,240,0.06)", border: "1.5px solid rgba(160,32,240,0.12)" }}>
                <img src={dragonIcon} alt="" style={{ width: "65%", height: "65%", filter: "drop-shadow(0 0 4px rgba(160,32,240,0.4))", animation: "dragonPulse 1.5s ease-in-out infinite" }} />
              </div>
              <div className="rounded-[16px] px-[clamp(14px,1.8vw,20px)] py-[clamp(10px,1.3vw,14px)]"
                style={{ background: "rgba(160,32,240,0.03)", border: "1.5px solid rgba(160,32,240,0.08)" }}>
                <TypingDots />
              </div>
            </div>
          )}
        </div>

        {/* Scroll to bottom */}
        {showScroll && (
          <button onClick={() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })}
            className="absolute bottom-[clamp(80px,10vw,110px)] right-[clamp(20px,3vw,36px)] z-30 p-[clamp(8px,1vw,12px)] rounded-full transition-all hover:scale-110 active:scale-90 animate-[fadeIn_0.3s_ease-out]"
            style={{ background: "rgba(160,32,240,0.12)", border: "1.5px solid rgba(160,32,240,0.2)", boxShadow: "0 4px 20px rgba(160,32,240,0.1)", color: "#A020F0", touchAction: "manipulation" }}>
            <ArrowDown size={14} />
          </button>
        )}

        {/* ─── INPUT BAR ─── */}
        <div className="relative shrink-0 px-[clamp(12px,2vw,24px)] pb-[clamp(14px,2vw,22px)] pt-[clamp(8px,1vw,12px)]">
          {/* Ambient glow under input */}
          {has && <div className="absolute bottom-3 left-[10%] right-[10%] h-[40px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center bottom, rgba(160,32,240,0.06) 0%, transparent 75%)", filter: "blur(12px)" }} />}

          <div className="relative flex items-center gap-[clamp(8px,1vw,14px)] px-[clamp(14px,1.8vw,22px)] py-[clamp(12px,1.5vw,18px)] rounded-[18px] transition-all duration-500"
            style={{
              background: has ? "rgba(12, 6, 28, 0.65)" : "rgba(10, 5, 22, 0.45)",
              border: `1.5px solid ${has ? "rgba(160,32,240,0.2)" : "rgba(160,32,240,0.05)"}`,
              boxShadow: has
                ? "0 0 35px rgba(160,32,240,0.06), inset 0 0 25px rgba(160,32,240,0.02), inset 0 1px 0 rgba(255,255,255,0.02), 0 8px 30px rgba(0,0,0,0.2)"
                : "inset 0 1px 0 rgba(255,255,255,0.01), 0 4px 16px rgba(0,0,0,0.1)",
            }}>
            {/* Top edge line */}
            <div className="absolute top-0 left-[12%] right-[12%] h-[1px]"
              style={{ background: `linear-gradient(90deg, transparent, rgba(160,32,240,${has ? 0.2 : 0.05}), transparent)`, transition: "all 0.5s" }} />

            <div className="p-[clamp(4px,0.5vw,6px)] rounded-[10px] transition-all duration-500" style={{
              background: has ? "rgba(160,32,240,0.08)" : "transparent",
              border: `1px solid ${has ? "rgba(160,32,240,0.12)" : "transparent"}`,
            }}>
              <Sparkles size={14} style={{
                color: has ? "#A020F0" : "#1a1a2a",
                filter: has ? "drop-shadow(0 0 4px #A020F0)" : "none",
                transition: "all 0.5s",
                animation: has ? "sparkleRotate 4s linear infinite" : "none",
              }} />
            </div>

            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Transmit to Dragon Core..."
              className="flex-1 bg-transparent outline-none min-w-0"
              style={{
                fontFamily: "'Rajdhani',sans-serif",
                fontSize: "clamp(13px,1.5vw,16px)",
                color: "#c0b8cc",
                letterSpacing: "0.5px",
                caretColor: "#A020F0",
                touchAction: "manipulation",
              }}
            />

            <div className="flex items-center gap-[clamp(6px,0.8vw,10px)]">
              {has && (
                <span className="animate-[fadeIn_0.3s_ease-out]" style={{ fontFamily: "monospace", fontSize: "9px", color: "#2a2a3a" }}>
                  {input.length}
                </span>
              )}
              <button
                onClick={send}
                onMouseEnter={() => setSendHov(true)}
                onMouseLeave={() => setSendHov(false)}
                disabled={!has}
                className="relative rounded-[14px] transition-all duration-500 active:scale-90"
                style={{
                  padding: "clamp(10px,1.2vw,14px)",
                  background: has
                    ? sendHov
                      ? "linear-gradient(135deg, rgba(160,32,240,0.3), rgba(0,243,255,0.12))"
                      : "rgba(160,32,240,0.12)"
                    : "rgba(255,255,255,0.015)",
                  border: `1.5px solid ${has ? (sendHov ? "rgba(160,32,240,0.4)" : "rgba(160,32,240,0.18)") : "rgba(255,255,255,0.02)"}`,
                  boxShadow: has && sendHov
                    ? "0 0 30px rgba(160,32,240,0.15), inset 0 0 15px rgba(160,32,240,0.04), 0 4px 16px rgba(0,0,0,0.2)"
                    : "none",
                  transform: sendHov && has ? "translateY(-2px) scale(1.05)" : "none",
                  cursor: has ? "pointer" : "default",
                  touchAction: "manipulation",
                }}>
                {/* Inner shine */}
                {has && <div className="absolute top-[2px] left-[15%] right-[15%] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />}
                <Send size={15} style={{
                  color: has ? "#B050FF" : "#1a1a2a",
                  filter: has ? "drop-shadow(0 0 6px #A020F0)" : "none",
                  transition: "all 0.5s",
                  transform: sendHov && has ? "rotate(-12deg) translateX(1px)" : "rotate(0)",
                }} />
              </button>
            </div>
          </div>
        </div>
      </GlassFrame>
    </div>
  );
}
