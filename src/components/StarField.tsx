import { useEffect, useRef } from "react";

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Mouse position (center by default)
    let mouseX = w / 2;
    let mouseY = h / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Stars with orbital properties
    const stars: {
      angle: number;
      radius: number;
      speed: number;
      size: number;
      opacity: number;
      centerX: number;
      centerY: number;
      color: string;
      twinkleSpeed: number;
      twinkleOffset: number;
    }[] = [];

    const colors = [
      "200, 220, 255",   // blue-white
      "255, 255, 255",   // white
      "220, 200, 255",   // lavender
      "255, 200, 220",   // pinkish
      "180, 200, 255",   // cool blue
      "255, 230, 200",   // warm
    ];

    for (let i = 0; i < 400; i++) {
      const centerX = w / 2 + (Math.random() - 0.5) * w * 0.3;
      const centerY = h / 2 + (Math.random() - 0.5) * h * 0.3;
      stars.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * Math.max(w, h) * 0.6 + 20,
        speed: (Math.random() * 0.0008 + 0.0001) * (Math.random() < 0.5 ? 1 : -1),
        size: Math.random() * 1.8 + 0.3,
        opacity: Math.random() * 0.8 + 0.2,
        centerX,
        centerY,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: Math.random() * 0.03 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    // Draw nebula/milky way effect
    const drawNebula = (mx: number, my: number) => {
      const parallaxX = mx * 30;
      const parallaxY = my * 30;

      // Central milky way band - diagonal bright band
      const gradient1 = ctx.createLinearGradient(
        w * 0.2 + parallaxX, h * 0.8 + parallaxY,
        w * 0.8 + parallaxX, h * 0.2 + parallaxY
      );
      gradient1.addColorStop(0, "rgba(40, 20, 80, 0)");
      gradient1.addColorStop(0.3, "rgba(60, 30, 100, 0.15)");
      gradient1.addColorStop(0.45, "rgba(80, 50, 130, 0.25)");
      gradient1.addColorStop(0.5, "rgba(100, 70, 160, 0.3)");
      gradient1.addColorStop(0.55, "rgba(80, 50, 130, 0.25)");
      gradient1.addColorStop(0.7, "rgba(60, 30, 100, 0.15)");
      gradient1.addColorStop(1, "rgba(40, 20, 80, 0)");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, w, h);

      // Pink/magenta nebula cluster
      const nebula1 = ctx.createRadialGradient(
        w * 0.45 + parallaxX * 1.5, h * 0.45 + parallaxY * 1.5, 0,
        w * 0.45 + parallaxX * 1.5, h * 0.45 + parallaxY * 1.5, w * 0.35
      );
      nebula1.addColorStop(0, "rgba(180, 60, 120, 0.12)");
      nebula1.addColorStop(0.3, "rgba(140, 40, 100, 0.08)");
      nebula1.addColorStop(0.6, "rgba(100, 30, 80, 0.04)");
      nebula1.addColorStop(1, "rgba(60, 20, 60, 0)");
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, w, h);

      // Blue nebula area
      const nebula2 = ctx.createRadialGradient(
        w * 0.6 + parallaxX * 1.2, h * 0.35 + parallaxY * 1.2, 0,
        w * 0.6 + parallaxX * 1.2, h * 0.35 + parallaxY * 1.2, w * 0.3
      );
      nebula2.addColorStop(0, "rgba(40, 60, 160, 0.1)");
      nebula2.addColorStop(0.4, "rgba(30, 40, 120, 0.06)");
      nebula2.addColorStop(1, "rgba(20, 20, 80, 0)");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, w, h);

      // Warm orange/brown dust
      const nebula3 = ctx.createRadialGradient(
        w * 0.35 + parallaxX, h * 0.55 + parallaxY, 0,
        w * 0.35 + parallaxX, h * 0.55 + parallaxY, w * 0.25
      );
      nebula3.addColorStop(0, "rgba(120, 60, 30, 0.06)");
      nebula3.addColorStop(0.5, "rgba(80, 40, 20, 0.03)");
      nebula3.addColorStop(1, "rgba(40, 20, 10, 0)");
      ctx.fillStyle = nebula3;
      ctx.fillRect(0, 0, w, h);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 1;

      const mx = (mouseX - w / 2) / w;
      const my = (mouseY - h / 2) / h;

      // Draw nebula background
      drawNebula(mx, my);

      for (const star of stars) {
        star.angle += star.speed;

        const baseX = star.centerX + Math.cos(star.angle) * star.radius;
        const baseY = star.centerY + Math.sin(star.angle) * star.radius * 0.4;

        const parallaxStrength = star.radius * 0.05;
        const x = baseX + mx * parallaxStrength;
        const y = baseY + my * parallaxStrength;

        if (x < -10 || x > w + 10 || y < -10 || y > h + 10) continue;

        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.4 + 0.6;
        const alpha = star.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
        ctx.fill();

        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(x, y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color}, ${alpha * 0.15})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
};

export default StarField;
