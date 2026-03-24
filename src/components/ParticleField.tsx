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

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.offsetWidth;
      h = canvas!.offsetHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn() {
      if (ps.length > 60) return;
      ps.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: -0.1 - Math.random() * 0.2,
        s: 0.5 + Math.random() * 1.5,
        life: 0, max: 400 + Math.random() * 500,
        hue: Math.random() > 0.5 ? 275 : 185,
        pulse: 0, ps: 0.015 + Math.random() * 0.02,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x; const dy = ps[i].y - ps[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            const a = (1 - d / 100) * 0.04;
            ctx!.beginPath();
            ctx!.strokeStyle = `hsla(275,80%,55%,${a})`;
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
        const alpha = Math.min(r * 6, 1) * (r > 0.8 ? 1 - (r - 0.8) / 0.2 : 1);
        const sz = p.s * (1 + Math.sin(p.pulse) * 0.25);
        const g = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz * 5);
        g.addColorStop(0, `hsla(${p.hue},80%,60%,${alpha * 0.12})`);
        g.addColorStop(1, "transparent");
        ctx!.fillStyle = g;
        ctx!.fillRect(p.x - sz * 5, p.y - sz * 5, sz * 10, sz * 10);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hue},80%,65%,${alpha * 0.7})`;
        ctx!.fill();
        if (p.life >= p.max || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) ps.splice(i, 1);
      }
      if (Math.random() < 0.06) spawn();
      animId = requestAnimationFrame(draw);
    }

    resize();
    for (let i = 0; i < 30; i++) spawn();
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.5 }} />;
}
