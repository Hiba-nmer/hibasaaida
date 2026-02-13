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
    let mouseX = w / 2, mouseY = h / 2;

    const handleMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener("mousemove", handleMouseMove);

    // Mixed blue-white + pink stars
    const starColors = [
      { r: 200, g: 220, b: 255 }, // blue-white
      { r: 180, g: 200, b: 255 }, // light blue
      { r: 255, g: 255, b: 255 }, // white
      { r: 140, g: 180, b: 255 }, // blue
      { r: 255, g: 180, b: 220 }, // pink
      { r: 255, g: 150, b: 200 }, // deep pink
      { r: 230, g: 160, b: 210 }, // soft pink
      { r: 220, g: 230, b: 255 }, // cool white
    ];

    const stars: {
      angle: number; radius: number; speed: number; size: number; opacity: number;
      centerX: number; centerY: number; r: number; g: number; b: number;
      twinkleSpeed: number; twinkleOffset: number;
    }[] = [];

    for (let i = 0; i < 280; i++) {
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      const roll = Math.random();
      const size = roll < 0.55 ? Math.random() * 0.7 + 0.3
        : roll < 0.85 ? Math.random() * 1.2 + 0.8
        : Math.random() * 2.0 + 1.5;

      stars.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * Math.max(w, h) * 0.6 + 30,
        speed: (Math.random() * 0.0003 + 0.00006) * (Math.random() < 0.5 ? 1 : -1),
        size, opacity: Math.random() * 0.7 + 0.3,
        centerX: w / 2 + (Math.random() - 0.5) * w * 0.4,
        centerY: h / 2 + (Math.random() - 0.5) * h * 0.4,
        ...color,
        twinkleSpeed: Math.random() * 0.018 + 0.003,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    interface ShootingStar {
      x: number; y: number; length: number; speed: number;
      angle: number; opacity: number; life: number; maxLife: number; width: number;
    }
    const shootingStars: ShootingStar[] = [];
    let nextShoot = 150 + Math.random() * 250;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time++;
      const mx = (mouseX - w / 2) / w;
      const my = (mouseY - h / 2) / h;

      // Nebula glow
      const px = mx * 15, py = my * 15;
      const g1 = ctx.createLinearGradient(w * 0.1 + px, h * 0.9 + py, w * 0.9 + px, h * 0.1 + py);
      g1.addColorStop(0, "rgba(20, 8, 30, 0)");
      g1.addColorStop(0.4, "rgba(80, 20, 60, 0.07)");
      g1.addColorStop(0.6, "rgba(80, 20, 60, 0.07)");
      g1.addColorStop(1, "rgba(20, 8, 30, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        s.angle += s.speed;
        const bx = s.centerX + Math.cos(s.angle) * s.radius;
        const by = s.centerY + Math.sin(s.angle) * s.radius * 0.35;
        const pStr = s.radius * 0.035;
        const x = bx + mx * pStr;
        const y = by + my * pStr;
        if (x < -5 || x > w + 5 || y < -5 || y > h + 5) continue;

        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.3 + 0.7;
        const alpha = s.opacity * twinkle;

        // Sharp core - no blur
        ctx.beginPath();
        ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.r}, ${s.g}, ${s.b}, ${alpha})`;
        ctx.fill();

        // Soft glow halo
        if (s.size > 0.7) {
          ctx.beginPath();
          ctx.arc(x, y, s.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.r}, ${s.g}, ${s.b}, ${alpha * 0.05})`;
          ctx.fill();
        }

        // Cross sparkle for bright stars
        if (s.size > 1.4) {
          const len = s.size * 5;
          ctx.strokeStyle = `rgba(${s.r}, ${s.g}, ${s.b}, ${alpha * 0.35})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath(); ctx.moveTo(x - len, y); ctx.lineTo(x + len, y); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(x, y - len); ctx.lineTo(x, y + len); ctx.stroke();
        }
      }

      // Shooting stars
      nextShoot--;
      if (nextShoot <= 0) {
        shootingStars.push({
          x: Math.random() * w * 0.8 + w * 0.1, y: Math.random() * h * 0.3,
          length: 100 + Math.random() * 120, speed: 12 + Math.random() * 8,
          angle: Math.PI * 0.15 + Math.random() * 0.2 * Math.PI,
          opacity: 1, life: 0, maxLife: 30 + Math.random() * 20, width: 1 + Math.random(),
        });
        nextShoot = 200 + Math.random() * 400;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed * 0.5;
        ss.life++;
        const p = ss.life / ss.maxLife;
        const a = ss.opacity * Math.min(p * 4, 1) * (1 - Math.max((p - 0.6) / 0.4, 0));
        const tx = ss.x - Math.cos(ss.angle) * ss.length * Math.min(p * 4, 1);
        const ty = ss.y - Math.sin(ss.angle) * ss.length * Math.min(p * 4, 1) * 0.5;
        const grad = ctx.createLinearGradient(tx, ty, ss.x, ss.y);
        grad.addColorStop(0, `rgba(255, 180, 220, 0)`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${a})`);
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grad; ctx.lineWidth = ss.width; ctx.lineCap = "round"; ctx.stroke();
        ctx.beginPath(); ctx.arc(ss.x, ss.y, ss.width * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${a * 0.8})`; ctx.fill();
        if (ss.life >= ss.maxLife) shootingStars.splice(i, 1);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener("resize", handleResize); window.removeEventListener("mousemove", handleMouseMove); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ background: "transparent" }} />;
};

export default StarField;
