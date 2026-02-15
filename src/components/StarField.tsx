import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  speed: number;
  color: [number, number, number];
}

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let stars: Star[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 400);
      stars = Array.from({ length: count }, () => {
        const r = Math.random();
        let color: [number, number, number];
        if (r < 0.15) {
          color = [255, 180, 220]; // pink
        } else if (r < 0.25) {
          color = [200, 180, 255]; // violet
        } else if (r < 0.4) {
          color = [180, 200, 255]; // blue-white
        } else {
          color = [255, 255, 255];
        }
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.2 + 0.3,
          brightness: Math.random() * 0.6 + 0.4,
          speed: Math.random() * 0.15 + 0.02,
          color,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Nebula layers
      const g1 = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.5, 0,
        canvas.width * 0.3, canvas.height * 0.5, canvas.width * 0.5
      );
      g1.addColorStop(0, "rgba(180, 60, 120, 0.06)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const g2 = ctx.createRadialGradient(
        canvas.width * 0.7, canvas.height * 0.3, 0,
        canvas.width * 0.7, canvas.height * 0.3, canvas.width * 0.4
      );
      g2.addColorStop(0, "rgba(120, 60, 180, 0.04)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      for (const star of stars) {
        // Subtle twinkle
        const twinkle = star.brightness + Math.sin(Date.now() * star.speed * 0.01) * 0.15;
        const alpha = Math.max(0.2, Math.min(1, twinkle));
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

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
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
