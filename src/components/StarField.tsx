import { useEffect, useRef } from "react";

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    interface Star {
      x: number;
      y: number;
      size: number;
      brightness: number;
      orbitRadius: number;
      orbitSpeed: number;
      orbitAngle: number;
      centerX: number;
      centerY: number;
      color: [number, number, number];
    }

    let stars: Star[] = [];
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      mouseRef.current = { x: w / 2, y: h / 2 };
      init();
    };

    const init = () => {
      const count = Math.floor((w * h) / 350);
      stars = [];
      for (let i = 0; i < count; i++) {
        const cx = Math.random() * w;
        const cy = Math.random() * h;
        const r = Math.random();
        let color: [number, number, number];
        if (r < 0.12) color = [255, 170, 210];
        else if (r < 0.22) color = [190, 170, 255];
        else if (r < 0.38) color = [170, 200, 255];
        else color = [240, 240, 255];

        stars.push({
          x: cx,
          y: cy,
          size: Math.random() * 1.1 + 0.2,
          brightness: Math.random() * 0.5 + 0.5,
          orbitRadius: Math.random() * 1.5 + 0.3,
          orbitSpeed: (Math.random() - 0.5) * 0.002,
          orbitAngle: Math.random() * Math.PI * 2,
          centerX: cx,
          centerY: cy,
          color,
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const draw = () => {
      time++;
      ctx.clearRect(0, 0, w, h);

      // Background nebula - subtle pink/violet clouds
      const nebulas = [
        { cx: 0.25, cy: 0.4, r: 0.45, color: "rgba(120, 40, 80, 0.07)" },
        { cx: 0.7, cy: 0.25, r: 0.35, color: "rgba(80, 40, 120, 0.05)" },
        { cx: 0.5, cy: 0.7, r: 0.5, color: "rgba(100, 30, 70, 0.04)" },
        { cx: 0.15, cy: 0.8, r: 0.3, color: "rgba(90, 50, 130, 0.04)" },
        { cx: 0.85, cy: 0.65, r: 0.35, color: "rgba(130, 40, 90, 0.05)" },
      ];

      for (const n of nebulas) {
        // Slight drift based on time
        const ox = Math.sin(time * 0.0003 + n.cx * 10) * 15;
        const oy = Math.cos(time * 0.0004 + n.cy * 10) * 10;
        const g = ctx.createRadialGradient(
          n.cx * w + ox, n.cy * h + oy, 0,
          n.cx * w + ox, n.cy * h + oy, n.r * w
        );
        g.addColorStop(0, n.color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // Mouse influence
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const star of stars) {
        // Circular orbit
        star.orbitAngle += star.orbitSpeed;
        const ox = Math.cos(star.orbitAngle) * star.orbitRadius;
        const oy = Math.sin(star.orbitAngle) * star.orbitRadius;

        // Mouse parallax - stars shift away from cursor gently
        const dx = star.centerX - mx;
        const dy = star.centerY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 500) * 8;
        const px = (dx / (dist || 1)) * influence;
        const py = (dy / (dist || 1)) * influence;

        star.x = star.centerX + ox + px;
        star.y = star.centerY + oy + py;

        // Twinkle
        const twinkle = star.brightness + Math.sin(time * 0.02 * star.orbitSpeed * 100 + star.centerX) * 0.2;
        const alpha = Math.max(0.25, Math.min(1, twinkle));
        const [r, g, b] = star.color;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default StarField;
