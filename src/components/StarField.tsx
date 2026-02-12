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

    // Stars - more realistic with blue-white dominant colors
    const stars: {
      angle: number;
      radius: number;
      speed: number;
      size: number;
      opacity: number;
      centerX: number;
      centerY: number;
      r: number;
      g: number;
      b: number;
      twinkleSpeed: number;
      twinkleOffset: number;
    }[] = [];

    // Realistic star colors: blue-white, white, warm white, blue
    const starColors = [
      { r: 180, g: 200, b: 255 }, // blue-white (most common)
      { r: 200, g: 215, b: 255 }, // light blue
      { r: 255, g: 255, b: 255 }, // pure white
      { r: 220, g: 230, b: 255 }, // cool white
      { r: 140, g: 170, b: 255 }, // blue
      { r: 100, g: 140, b: 255 }, // deeper blue
      { r: 255, g: 240, b: 230 }, // warm white (rare)
    ];

    for (let i = 0; i < 300; i++) {
      const centerX = w / 2 + (Math.random() - 0.5) * w * 0.3;
      const centerY = h / 2 + (Math.random() - 0.5) * h * 0.3;
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      // Mostly tiny stars, few bright ones
      const sizeRoll = Math.random();
      let size: number;
      if (sizeRoll < 0.7) size = Math.random() * 0.8 + 0.3; // tiny
      else if (sizeRoll < 0.92) size = Math.random() * 1.2 + 0.8; // medium
      else size = Math.random() * 1.8 + 1.5; // bright

      stars.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * Math.max(w, h) * 0.65 + 20,
        speed: (Math.random() * 0.0004 + 0.00005) * (Math.random() < 0.5 ? 1 : -1),
        size,
        opacity: Math.random() * 0.8 + 0.2,
        centerX,
        centerY,
        ...color,
        twinkleSpeed: Math.random() * 0.02 + 0.003,
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
        y: Math.random() * h * 0.3,
        length: 100 + Math.random() * 150,
        speed: 10 + Math.random() * 8,
        angle,
        opacity: 1,
        life: 0,
        maxLife: 35 + Math.random() * 25,
        width: 1 + Math.random() * 1.2,
      });
    };

    let time = 0;

    // Draw nebula - subtle elegant pink tones
    const drawNebula = (mx: number, my: number) => {
      const px = mx * 20;
      const py = my * 20;

      // Main milky way band
      const gradient1 = ctx.createLinearGradient(
        w * 0.1 + px, h * 0.9 + py,
        w * 0.9 + px, h * 0.1 + py
      );
      gradient1.addColorStop(0, "rgba(20, 8, 30, 0)");
      gradient1.addColorStop(0.3, "rgba(60, 15, 50, 0.06)");
      gradient1.addColorStop(0.45, "rgba(100, 25, 70, 0.1)");
      gradient1.addColorStop(0.5, "rgba(130, 35, 80, 0.12)");
      gradient1.addColorStop(0.55, "rgba(100, 25, 70, 0.1)");
      gradient1.addColorStop(0.7, "rgba(60, 15, 50, 0.06)");
      gradient1.addColorStop(1, "rgba(20, 8, 30, 0)");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, w, h);

      // Core nebula glow
      const nebula1 = ctx.createRadialGradient(
        w * 0.5 + px * 1.3, h * 0.42 + py * 1.3, 0,
        w * 0.5 + px * 1.3, h * 0.42 + py * 1.3, w * 0.35
      );
      nebula1.addColorStop(0, "rgba(180, 50, 100, 0.07)");
      nebula1.addColorStop(0.3, "rgba(120, 30, 70, 0.04)");
      nebula1.addColorStop(0.7, "rgba(60, 15, 40, 0.02)");
      nebula1.addColorStop(1, "rgba(20, 5, 15, 0)");
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, w, h);

      // Deep blue accent for space depth
      const nebula2 = ctx.createRadialGradient(
        w * 0.7 + px * 0.8, h * 0.55 + py * 0.8, 0,
        w * 0.7 + px * 0.8, h * 0.55 + py * 0.8, w * 0.25
      );
      nebula2.addColorStop(0, "rgba(30, 40, 100, 0.04)");
      nebula2.addColorStop(0.5, "rgba(15, 20, 60, 0.02)");
      nebula2.addColorStop(1, "rgba(5, 8, 20, 0)");
      ctx.fillStyle = nebula2;
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
      grad.addColorStop(0, `rgba(180, 200, 255, 0)`);
      grad.addColorStop(0.5, `rgba(200, 210, 255, ${alpha * 0.3})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = s.width;
      ctx.lineCap = "round";
      ctx.stroke();

      // Head glow
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.width * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.width * 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 200, 255, ${alpha * 0.12})`;
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 1;

      const mx = (mouseX - w / 2) / w;
      const my = (mouseY - h / 2) / h;

      drawNebula(mx, my);

      // Draw stars with sharp rendering
      for (const star of stars) {
        star.angle += star.speed;

        const baseX = star.centerX + Math.cos(star.angle) * star.radius;
        const baseY = star.centerY + Math.sin(star.angle) * star.radius * 0.35;

        const parallaxStrength = star.radius * 0.04;
        const x = baseX + mx * parallaxStrength;
        const y = baseY + my * parallaxStrength;

        if (x < -10 || x > w + 10 || y < -10 || y > h + 10) continue;

        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.35 + 0.65;
        const alpha = star.opacity * twinkle;

        // Sharp star point
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.r}, ${star.g}, ${star.b}, ${alpha})`;
        ctx.fill();

        // Soft glow halo for medium+ stars
        if (star.size > 0.8) {
          ctx.beginPath();
          ctx.arc(x, y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.r}, ${star.g}, ${star.b}, ${alpha * 0.08})`;
          ctx.fill();
        }

        // Cross sparkle for bright stars
        if (star.size > 1.5) {
          const sLen = star.size * 5;
          const sparkleAlpha = alpha * 0.25;
          ctx.strokeStyle = `rgba(${star.r}, ${star.g}, ${star.b}, ${sparkleAlpha})`;
          ctx.lineWidth = 0.4;

          ctx.beginPath();
          ctx.moveTo(x - sLen, y);
          ctx.lineTo(x + sLen, y);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(x, y - sLen);
          ctx.lineTo(x, y + sLen);
          ctx.stroke();

          // Diagonal sparkle for largest
          if (star.size > 2.0) {
            const dLen = sLen * 0.6;
            ctx.beginPath();
            ctx.moveTo(x - dLen, y - dLen);
            ctx.lineTo(x + dLen, y + dLen);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x + dLen, y - dLen);
            ctx.lineTo(x - dLen, y + dLen);
            ctx.stroke();
          }
        }
      }

      // Shooting stars
      nextShootingTime--;
      if (nextShootingTime <= 0) {
        spawnShootingStar();
        nextShootingTime = 180 + Math.random() * 350;
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
