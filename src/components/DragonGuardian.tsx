import React, { useEffect, useRef, useState } from "react";
import dragonHead from "figma:asset/399c1536d7179899acf08cb0ca594c7cf6739472.png";

export function DragonGuardian() {
  const [m, setM] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      setM({ x: ((e.clientX - cx) / window.innerWidth) * 10, y: ((e.clientY - cy) / window.innerHeight) * 6 });
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <div ref={ref} className="absolute -top-3 -right-1 md:-top-5 md:-right-3 lg:-top-6 lg:-right-4 z-50 pointer-events-none"
      style={{ width: "clamp(100px, 16vw, 200px)", height: "clamp(100px, 16vw, 200px)", perspective: "800px" }}>
      {/* Aura rings */}
      {[0, 1, 2].map(i => (
        <div key={i} className="absolute rounded-full" style={{
          width: `${140 + i * 30}%`, height: `${140 + i * 30}%`,
          top: `${-20 - i * 15}%`, left: `${-20 - i * 15}%`,
          border: `1px solid rgba(160,32,240,${0.1 - i * 0.025})`,
          animation: `ringPulse ${3 + i}s ease-in-out ${i * 0.4}s infinite`,
        }} />
      ))}
      {/* 3D dragon */}
      <div className="relative w-full h-full" style={{
        transform: `rotateY(${m.x}deg) rotateX(${-m.y}deg)`,
        transformStyle: "preserve-3d", transition: "transform 0.25s ease-out",
        animation: "dragonFloat 6s ease-in-out infinite",
      }}>
        <img src={dragonHead} alt="Dragon" className="w-full h-full object-contain animate-[dragonPulse_3.5s_ease-in-out_infinite]" style={{ transform: "translateZ(25px)" }} />
        <img src={dragonHead} alt="" className="absolute inset-0 w-full h-full object-contain" style={{ filter: "blur(10px) brightness(2)", opacity: 0.08, transform: "translateZ(8px) scale(1.06)", animation: "dragonPulse 3.5s ease-in-out 0.3s infinite" }} />
      </div>
    </div>
  );
}
