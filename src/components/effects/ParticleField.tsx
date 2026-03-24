import React, { useEffect, useRef } from "react";

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;

    interface P {
      x: number; y: number; vx: number; vy: number;
      s: number; life: number; max: number;
      hue: number; pulse: number; ps: number;
    }

    const ps: P[] = [];
    const HUES = [185, 280, 190, 275, 180]; // Cyan to Neon Purple ranges

    function resize() {
      // Limit to 1.5 dpr for performance
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas!.offsetWidth; h = canvas!.offsetHeight;
      canvas!.width = w * dpr; canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn() {
      if (ps.length > 40) return; // Reduced max count slightly for performance
      ps.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2, vy: -0.08 - Math.random() * 0.15,
        s: 0.4 + Math.random() * 1.2, life: 0, max: 400 + Math.random() * 400,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
        pulse: 0, ps: 0.012 + Math.random() * 0.02,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx!.beginPath();
            ctx!.strokeStyle = `hsla(185,100%,50%,${(1 - d / 90) * 0.03})`;
            ctx!.lineWidth = 0.3;
            ctx!.moveTo(ps[i].x, ps[i].y);
            ctx!.lineTo(ps[j].x, ps[j].y);
            ctx!.stroke();
          }
        }
      }
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.x += p.vx; p.y += p.vy; p.life++; p.pulse += p.ps;
        const r = p.life / p.max;
        const alpha = Math.min(r * 5, 1) * (r > 0.8 ? 1 - (r - 0.8) / 0.2 : 1);
        const sz = p.s * (1 + Math.sin(p.pulse) * 0.2);
        
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hue},100%,60%,${alpha * 0.8})`;
        ctx!.fill();
        
        if (p.life >= p.max || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) ps.splice(i, 1);
      }
      if (Math.random() < 0.05) spawn();
      animId = requestAnimationFrame(draw);
    }

    resize();
    for (let i = 0; i < 20; i++) spawn();
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  // Use will-change to optimize compositing
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.45, willChange: 'transform' }} />;
}
