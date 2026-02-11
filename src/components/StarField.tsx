import { useEffect, useRef } from "react";

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
  width: number;
}

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

    let mouseX = w / 2;
    let mouseY = h / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Stars
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
      "220, 230, 255",   // bright blue-white
      "255, 255, 255",   // pure white
      "255, 240, 250",   // soft pink-white
      "255, 200, 230",   // pink
      "200, 210, 255",   // cool blue
      "255, 220, 240",   // warm pink
      "240, 248, 255",   // alice blue
    ];

    // More stars with varied density
    for (let i = 0; i < 600; i++) {
      const centerX = w / 2 + (Math.random() - 0.5) * w * 0.4;
      const centerY = h / 2 + (Math.random() - 0.5) * h * 0.4;
      stars.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * Math.max(w, h) * 0.7 + 10,
        speed: (Math.random() * 0.0006 + 0.00008) * (Math.random() < 0.5 ? 1 : -1),
        size: Math.random() < 0.05 ? Math.random() * 2.5 + 1.5 : Math.random() * 1.4 + 0.2,
        opacity: Math.random() * 0.9 + 0.1,
        centerX,
        centerY,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: Math.random() * 0.025 + 0.004,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // Shooting stars
    const shootingStars: ShootingStar[] = [];
    let nextShootingTime = 120 + Math.random() * 200;

    const spawnShootingStar = () => {
      const angle = Math.PI * 0.15 + Math.random() * Math.PI * 0.2;
      shootingStars.push({
        x: Math.random() * w * 0.8 + w * 0.1,
        y: Math.random() * h * 0.4,
        length: 80 + Math.random() * 120,
        speed: 8 + Math.random() * 6,
        angle,
        opacity: 1,
        life: 0,
        maxLife: 40 + Math.random() * 30,
        width: 1 + Math.random() * 1.5,
      });
    };

    let time = 0;

    // Draw nebula/milky way - PINK tones
    const drawNebula = (mx: number, my: number) => {
      const px = mx * 25;
      const py = my * 25;

      // Main milky way band - pink gradient diagonal
      const gradient1 = ctx.createLinearGradient(
        w * 0.15 + px, h * 0.85 + py,
        w * 0.85 + px, h * 0.15 + py
      );
      gradient1.addColorStop(0, "rgba(30, 10, 30, 0)");
      gradient1.addColorStop(0.25, "rgba(80, 20, 60, 0.08)");
      gradient1.addColorStop(0.4, "rgba(140, 40, 80, 0.14)");
      gradient1.addColorStop(0.5, "rgba(180, 50, 100, 0.18)");
      gradient1.addColorStop(0.6, "rgba(140, 40, 80, 0.14)");
      gradient1.addColorStop(0.75, "rgba(80, 20, 60, 0.08)");
      gradient1.addColorStop(1, "rgba(30, 10, 30, 0)");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, w, h);

      // Core pink nebula glow
      const nebula1 = ctx.createRadialGradient(
        w * 0.5 + px * 1.5, h * 0.45 + py * 1.5, 0,
        w * 0.5 + px * 1.5, h * 0.45 + py * 1.5, w * 0.4
      );
      nebula1.addColorStop(0, "rgba(220, 60, 120, 0.1)");
      nebula1.addColorStop(0.2, "rgba(180, 40, 100, 0.07)");
      nebula1.addColorStop(0.5, "rgba(120, 25, 70, 0.04)");
      nebula1.addColorStop(1, "rgba(40, 10, 30, 0)");
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, w, h);

      // Secondary pink-magenta cluster
      const nebula2 = ctx.createRadialGradient(
        w * 0.65 + px * 1.2, h * 0.35 + py * 1.2, 0,
        w * 0.65 + px * 1.2, h * 0.35 + py * 1.2, w * 0.28
      );
      nebula2.addColorStop(0, "rgba(200, 50, 130, 0.08)");
      nebula2.addColorStop(0.4, "rgba(150, 30, 90, 0.04)");
      nebula2.addColorStop(1, "rgba(60, 10, 40, 0)");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, w, h);

      // Subtle warm rose dust
      const nebula3 = ctx.createRadialGradient(
        w * 0.3 + px, h * 0.6 + py, 0,
        w * 0.3 + px, h * 0.6 + py, w * 0.22
      );
      nebula3.addColorStop(0, "rgba(200, 80, 100, 0.05)");
      nebula3.addColorStop(0.5, "rgba(150, 50, 70, 0.025)");
      nebula3.addColorStop(1, "rgba(80, 20, 30, 0)");
      ctx.fillStyle = nebula3;
      ctx.fillRect(0, 0, w, h);

      // Faint deep space blue accent (for depth)
      const nebula4 = ctx.createRadialGradient(
        w * 0.75 + px * 0.8, h * 0.6 + py * 0.8, 0,
        w * 0.75 + px * 0.8, h * 0.6 + py * 0.8, w * 0.2
      );
      nebula4.addColorStop(0, "rgba(40, 50, 120, 0.05)");
      nebula4.addColorStop(0.6, "rgba(20, 25, 60, 0.02)");
      nebula4.addColorStop(1, "rgba(10, 10, 30, 0)");
      ctx.fillStyle = nebula4;
      ctx.fillRect(0, 0, w, h);
    };

    const drawShootingStar = (s: ShootingStar) => {
      const progress = s.life / s.maxLife;
      const fadeIn = Math.min(progress * 4, 1);
      const fadeOut = 1 - Math.max((progress - 0.6) / 0.4, 0);
      const alpha = s.opacity * fadeIn * fadeOut;

      const tailX = s.x - Math.cos(s.angle) * s.length * fadeIn;
      const tailY = s.y - Math.sin(s.angle) * s.length * fadeIn * 0.5;

      const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      grad.addColorStop(0, `rgba(255, 180, 220, 0)`);
      grad.addColorStop(0.6, `rgba(255, 200, 230, ${alpha * 0.4})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = s.width;
      ctx.lineCap = "round";
      ctx.stroke();

      // Bright head glow
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.width * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.width * 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 200, 230, ${alpha * 0.15})`;
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 1;

      const mx = (mouseX - w / 2) / w;
      const my = (mouseY - h / 2) / h;

      // Draw nebula background
      drawNebula(mx, my);

      // Draw stars
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

        // Star core
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
        ctx.fill();

        // Glow for brighter stars
        if (star.size > 1.0) {
          ctx.beginPath();
          ctx.arc(x, y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color}, ${alpha * 0.1})`;
          ctx.fill();
        }

        // Cross-hair sparkle for largest stars
        if (star.size > 2.0) {
          const sparkleAlpha = alpha * 0.3;
          ctx.beginPath();
          ctx.moveTo(x - star.size * 4, y);
          ctx.lineTo(x + star.size * 4, y);
          ctx.strokeStyle = `rgba(${star.color}, ${sparkleAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x, y - star.size * 4);
          ctx.lineTo(x, y + star.size * 4);
          ctx.stroke();
        }
      }

      // Shooting stars
      nextShootingTime--;
      if (nextShootingTime <= 0) {
        spawnShootingStar();
        nextShootingTime = 150 + Math.random() * 300;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed * 0.5;
        s.life++;
        drawShootingStar(s);
        if (s.life >= s.maxLife) {
          shootingStars.splice(i, 1);
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
