import React, { useEffect, useRef } from "react";

export function CloudVape() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;

    interface Cloud {
      x: number; y: number; r: number; vx: number; vy: number;
      opacity: number; life: number; max: number; hue: number;
      rotation: number; spinSpeed: number;
    }

    const clouds: Cloud[] = [];

    function resize() {
      // Lower DPR to 1 to drastically improve fill-rate performance
      const dpr = Math.min(window.devicePixelRatio || 1, 1);
      w = canvas!.offsetWidth;
      h = canvas!.offsetHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn() {
      if (clouds.length > 20) return;
      const fromBottom = Math.random() > 0.2;
      clouds.push({
        x: Math.random() * w,
        y: fromBottom ? h + 50 : Math.random() * h,
        r: 60 + Math.random() * 150,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.6,
        opacity: 0,
        life: 0,
        max: 500 + Math.random() * 400,
        hue: Math.random() > 0.5 ? 185 + Math.random() * 15 : 275 + Math.random() * 20, // Cyan or Neon Purple
        rotation: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.01,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      ctx!.globalCompositeOperation = "screen";

      for (let i = clouds.length - 1; i >= 0; i--) {
        const c = clouds[i];
        c.x += c.vx;
        c.y += c.vy;
        c.life++;
        c.r += 0.05;
        c.rotation += c.spinSpeed;

        const ratio = c.life / c.max;
        const fadeIn = Math.min(ratio * 5, 1);
        const fadeOut = ratio > 0.5 ? 1 - (ratio - 0.5) / 0.5 : 1;
        c.opacity = fadeIn * fadeOut * 0.15; 

        ctx!.save();
        ctx!.translate(c.x, c.y);
        
        // Fast rendering mode, no explicit rotations needed for radial gradient unless textured
        const g = ctx!.createRadialGradient(0, 0, 0, 0, 0, c.r);
        g.addColorStop(0, `hsla(${c.hue}, 100%, 80%, ${c.opacity})`);
        g.addColorStop(0.3, `hsla(${c.hue}, 80%, 50%, ${c.opacity * 0.8})`);
        g.addColorStop(0.7, `hsla(${c.hue}, 100%, 20%, ${c.opacity * 0.3})`);
        g.addColorStop(1, `hsla(${c.hue}, 100%, 10%, 0)`);

        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(0, 0, c.r, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();

        if (c.life >= c.max) clouds.splice(i, 1);
      }

      if (Math.random() < 0.05) spawn(); 
      animId = requestAnimationFrame(draw);
    }

    resize();
    for (let i = 0; i < 10; i++) spawn();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[2]" style={{ opacity: 0.8, filter: "contrast(1.2) brightness(1.2)", willChange: 'transform' }} />;
}
