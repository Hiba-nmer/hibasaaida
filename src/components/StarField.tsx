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

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 1;

      // Mouse influence offset
      const mx = (mouseX - w / 2) / w;
      const my = (mouseY - h / 2) / h;

      for (const star of stars) {
        star.angle += star.speed;

        // Base position from orbital motion
        const baseX = star.centerX + Math.cos(star.angle) * star.radius;
        const baseY = star.centerY + Math.sin(star.angle) * star.radius * 0.4; // elliptical

        // Mouse parallax - stars shift based on mouse position
        const parallaxStrength = star.radius * 0.05;
        const x = baseX + mx * parallaxStrength;
        const y = baseY + my * parallaxStrength;

        // Skip if off screen
        if (x < -10 || x > w + 10 || y < -10 || y > h + 10) continue;

        // Twinkle
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.4 + 0.6;
        const alpha = star.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
        ctx.fill();

        // Glow for larger stars
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
