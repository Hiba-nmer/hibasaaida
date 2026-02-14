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

    // Simple dot colors - pink and blue-white like the original
    const starColors = [
      { r: 255, g: 120, b: 180 },  // pink
      { r: 255, g: 140, b: 190 },  // light pink
      { r: 255, g: 100, b: 160 },  // hot pink
      { r: 200, g: 140, b: 255 },  // purple
      { r: 140, g: 160, b: 255 },  // blue
      { r: 180, g: 200, b: 255 },  // light blue
      { r: 255, g: 180, b: 210 },  // soft pink
      { r: 220, g: 180, b: 255 },  // lavender
    ];

    const stars: {
      angle: number; radius: number; speed: number; size: number; opacity: number;
      centerX: number; centerY: number; r: number; g: number; b: number;
    }[] = [];

    for (let i = 0; i < 300; i++) {
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      stars.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * Math.max(w, h) * 0.7 + 50,
        speed: (Math.random() * 0.002 + 0.0005) * (Math.random() < 0.5 ? 1 : -1),
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        centerX: w / 2 + (Math.random() - 0.5) * w * 0.5,
        centerY: h / 2 + (Math.random() - 0.5) * h * 0.5,
        ...color,
      });
    }

    // Shooting stars
    interface ShootingStar {
      x: number; y: number; length: number; speed: number;
      angle: number; opacity: number; life: number; maxLife: number; width: number;
    }
    const shootingStars: ShootingStar[] = [];
    let nextShoot = 100 + Math.random() * 200;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = (mouseX - w / 2) / w;
      const my = (mouseY - h / 2) / h;

      for (const s of stars) {
        // Circular orbital movement
        s.angle += s.speed;
        const bx = s.centerX + Math.cos(s.angle) * s.radius;
        const by = s.centerY + Math.sin(s.angle) * s.radius * 0.6;
        const pStr = s.radius * 0.04;
        const x = bx + mx * pStr;
        const y = by + my * pStr;
        if (x < -10 || x > w + 10 || y < -10 || y > h + 10) continue;

        // Simple bright dot — no sparkle, no glow
        ctx.beginPath();
        ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.r}, ${s.g}, ${s.b}, ${s.opacity})`;
        ctx.fill();
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
        nextShoot = 150 + Math.random() * 350;
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
