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

    const stars: { x: number; y: number; r: number; speed: number; opacity: number; pink: boolean; twinkleSpeed: number; twinkleOffset: number }[] = [];

    for (let i = 0; i < 200; i++) {
      const pink = Math.random() < 0.4;
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.7 + 0.3,
        pink,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // Shooting stars
    const shootingStars: { x: number; y: number; len: number; speed: number; opacity: number; active: boolean }[] = [];

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.5,
        len: Math.random() * 80 + 40,
        speed: Math.random() * 6 + 4,
        opacity: 1,
        active: true,
      });
    };

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 1;

      // Draw stars
      for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        const alpha = star.opacity * twinkle;

        if (star.pink) {
          ctx.fillStyle = `hsla(330, 85%, 65%, ${alpha})`;
          ctx.shadowColor = `hsla(330, 85%, 65%, ${alpha * 0.5})`;
          ctx.shadowBlur = star.r * 3;
        } else {
          ctx.fillStyle = `hsla(0, 0%, 100%, ${alpha})`;
          ctx.shadowColor = `hsla(0, 0%, 100%, ${alpha * 0.3})`;
          ctx.shadowBlur = star.r * 2;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();

        // Slow drift
        star.y += star.speed * 0.2;
        if (star.y > h + 5) {
          star.y = -5;
          star.x = Math.random() * w;
        }
      }

      ctx.shadowBlur = 0;

      // Shooting stars
      if (Math.random() < 0.003) spawnShootingStar();

      for (const ss of shootingStars) {
        if (!ss.active) continue;
        const gradient = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.len, ss.y - ss.len * 0.4);
        gradient.addColorStop(0, `hsla(330, 85%, 70%, ${ss.opacity})`);
        gradient.addColorStop(1, `hsla(330, 85%, 70%, 0)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.len, ss.y - ss.len * 0.4);
        ctx.stroke();

        ss.x += ss.speed;
        ss.y += ss.speed * 0.4;
        ss.opacity -= 0.015;
        if (ss.opacity <= 0) ss.active = false;
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
