import React from "react";
import dragonIcon from "figma:asset/d4e91d23b9ec3a1c291e712a4ea1d27fc6f6fb52.png";

export function TypingIndicator() {
  return (
    <div className="flex gap-[clamp(8px,1vw,14px)] items-start animate-[messageIn_0.4s_cubic-bezier(0.22,1,0.36,1)_both]">
      <div className="rounded-[10px] flex items-center justify-center shrink-0 overflow-hidden"
        style={{ width: "clamp(30px,3.2vw,36px)", height: "clamp(30px,3.2vw,36px)", background: "rgba(15,229,160,0.05)", border: "1px solid rgba(15,229,160,0.1)" }}>
        <img src={dragonIcon} alt="" style={{ width: "60%", height: "60%", filter: "drop-shadow(0 0 3px rgba(15,229,160,0.3))", animation: "dragonPulseGreen 1.5s ease-in-out infinite" }} />
      </div>
      <div className="rounded-[12px] px-[clamp(14px,1.6vw,18px)] py-[clamp(10px,1.2vw,14px)]"
        style={{ background: "rgba(15,229,160,0.03)", border: "1px solid rgba(15,229,160,0.06)" }}>
        <div className="flex items-center gap-[clamp(6px,0.7vw,10px)]">
          <div className="flex items-center gap-[3px]">
            {[0, 1, 2].map(i => (
              <div key={i} className="rounded-full animate-[typingBounce_1.4s_ease-in-out_infinite]"
                style={{ width: "clamp(4px,0.45vw,5px)", height: "clamp(4px,0.45vw,5px)", background: "#0FE5A0",
                  boxShadow: "0 0 5px #0FE5A0", animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
          <span className="animate-[textFlicker_2.5s_ease-in-out_infinite]" style={{
            fontFamily: "'Exo 2',sans-serif", fontSize: "clamp(10px,1vw,12px)", color: "#3A5048", letterSpacing: "1px"
          }}>Processing...</span>
        </div>
      </div>
    </div>
  );
}
