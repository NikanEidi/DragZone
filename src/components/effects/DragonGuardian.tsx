import React, { useEffect, useRef, useState } from "react";
import dragonHead from "../../assets/dragon-icon.svg";

export function DragonGuardian() {
  const [m, setM] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let af: number;
    const handleMouse = (e: MouseEvent) => {
      cancelAnimationFrame(af);
      af = requestAnimationFrame(() => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        setM({ 
          x: ((e.clientX - cx) / window.innerWidth) * 35, 
          y: ((e.clientY - cy) / window.innerHeight) * 25 
        });
      });
    };

    const handleTilt = (e: DeviceOrientationEvent) => {
      if (!e.gamma || !e.beta) return;
      const tiltX = Math.max(-45, Math.min(45, e.gamma)) / 45; 
      const tiltY = Math.max(-45, Math.min(45, e.beta - 45)) / 45; 
      setM({ x: tiltX * 30, y: tiltY * 20 });
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("deviceorientation", handleTilt, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("deviceorientation", handleTilt);
      cancelAnimationFrame(af);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="w-full h-full pointer-events-none"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Dragon with extremely smooth, fast 3D parallax */}
      <div
        className="relative w-full h-full"
        style={{
          transform: `translate3d(0,0,0) rotateY(${m.x}deg) rotateX(${-m.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.2s ease-out", 
          animation: "dragonFloat 8s ease-in-out infinite",
          willChange: "transform"
        }}
      >
        <img
          src={dragonHead}
          alt="Dragon Guardian"
          className="w-full h-full object-contain"
          style={{
            transform: "translate3d(0,0,40px)",
            filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.8))",
            animation: "dragonPulsePremium 4s ease-in-out infinite",
            willChange: "transform"
          }}
        />
        {/* Ghost reflection 1 - Cyan */}
        <img
          src={dragonHead}
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{
            filter: "blur(8px) brightness(1.5) sepia(1) hue-rotate(180deg) saturate(3)",
            opacity: 0.4,
            transform: "translate3d(0,0,15px) scale(1.1)",
            animation: "dragonPulsePremium 4s ease-in-out 0.1s infinite",
            mixBlendMode: "screen",
            transition: "transform 0.3s ease-out",
            willChange: "transform"
          }}
        />
        {/* Ghost reflection 2 - Neon Purple */}
        <img
          src={dragonHead}
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{
            filter: "blur(10px) brightness(1.5) sepia(1) hue-rotate(280deg) saturate(4)", 
            opacity: 0.3,
            transform: "translate3d(0,0,-20px) scale(1.2)",
            animation: "dragonPulsePremium 4s ease-in-out 0.3s infinite",
            mixBlendMode: "screen",
            transition: "transform 0.4s ease-out",
            willChange: "transform"
          }}
        />
      </div>
    </div>
  );
}
