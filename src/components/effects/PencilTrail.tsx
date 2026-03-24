import React, { useEffect, useRef } from "react";

export function PencilTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    // Cap pixel ratio at 1.5 for better performance on high-DPI screens
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    interface Spark {
      x: number; y: number; 
      vx: number; vy: number; 
      life: number; maxLife: number; 
      r: number; color: string;
    }
    const sparks: Spark[] = [];

    const handlePointerMove = (e: PointerEvent) => {
      // Apple Pencil pressure detection! Falls back to 0.5 for mouse/finger.
      const pressure = e.pointerType === 'pen' ? Math.max(0.1, e.pressure) : 0.5;
      const isPen = e.pointerType === 'pen';
      
      const count = isPen ? Math.floor(pressure * 5) + 2 : 2;
      
      for(let i=0; i<count; i++) {
        sparks.push({
          x: e.clientX, 
          y: e.clientY,
          vx: (Math.random() - 0.5) * (isPen ? 4 : 2),
          vy: (Math.random() - 0.5) * (isPen ? 4 : 2) + (isPen ? -1 : 0),
          life: 1, 
          maxLife: isPen ? 60 + Math.random() * 40 : 30 + Math.random() * 20,
          r: (isPen ? 2.5 : 1.5) * pressure * (1 + Math.random()),
          color: isPen 
            ? (Math.random() > 0.4 ? '#00F0FF' : '#B026FF') // Cyan and Neon Purple
            : '#00F0FF'
        });
      }
    };

    window.addEventListener("pointermove", handlePointerMove);

    let animId: number;
    const draw = () => {
      // Clear faster instead of blur overlays
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'screen';
      
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.x += p.vx; 
        p.y += p.vy;
        p.life += 1;
        p.vx *= 0.98; // Friction
        p.vy *= 0.98;
        
        if (p.life >= p.maxLife) { sparks.splice(i, 1); continue; }
        
        const ratio = p.life / p.maxLife;
        const alpha = Math.max(0, 1 - ratio);
        const radius = p.r * (1 - ratio);
        
        // Fast rendering (no shadowBlur to save CPU/GPU cycles)
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 2);
        g.addColorStop(0, p.color);
        // Alpha blend properly into transparent
        g.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { 
      window.removeEventListener("pointermove", handlePointerMove); 
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[99999]" 
      style={{ touchAction: 'none' }}
    />
  );
}
