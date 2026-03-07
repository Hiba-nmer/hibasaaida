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
    let w = 0, h = 0;

    // Stars orbit around the center of the screen
    interface Star {
      angle: number;
      radius: number;
      speed: number;
      size: number;
      brightness: number;
      twinkleSpeed: number;
      color: [number, number, number];
    }

    interface ShootingStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: [number, number, number];
    }

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let centerX = 0, centerY = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      centerX = w / 2;
      centerY = h / 2;
      mouseRef.current = { x: centerX, y: centerY };
      initStars();
    };

    const initStars = () => {
      const maxR = Math.sqrt(w * w + h * h) / 2 * 1.3;
      const count = Math.floor((w * h) / 300);
      stars = [];
      for (let i = 0; i < count; i++) {
        const rnd = Math.random();
        let color: [number, number, number];
        if (rnd < 0.1) color = [255, 170, 210];
        else if (rnd < 0.2) color = [190, 170, 255];
        else if (rnd < 0.35) color = [170, 200, 255];
        else color = [235, 235, 255];

        const radius = Math.random() * maxR;
        // Very slow gentle rotation
        const baseSpeed = 0.000008 + Math.random() * 0.000015;
        const speed = baseSpeed * (1 + 80 / (radius + 100));

        stars.push({
          angle: Math.random() * Math.PI * 2,
          radius,
          speed,
          size: Math.random() * 1.2 + 0.2,
          brightness: Math.random() * 0.5 + 0.5,
          twinkleSpeed: Math.random() * 3 + 1,
          color,
        });
      }
    };

    const spawnShootingStar = (): ShootingStar => {
      const side = Math.floor(Math.random() * 2);
      let x: number, y: number;
      if (side === 0) {
        x = Math.random() * w;
        y = -5;
      } else {
        x = w + 5;
        y = Math.random() * h * 0.5;
      }
      const angle = Math.PI * 0.6 + Math.random() * 0.5;
      const speed = 4 + Math.random() * 6;
      return {
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 40 + Math.random() * 60,
        size: Math.random() * 1.5 + 0.8,
        color: Math.random() > 0.3 ? [255, 255, 255] : [255, 190, 220],
      };
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    let lastTime = performance.now();
    let shootTimer = 0;
    let lastClickTime = 0;
    let clickX = 0, clickY = 0;

    const onClick = (e: MouseEvent) => {
      lastClickTime = performance.now();
      clickX = e.clientX;
      clickY = e.clientY;
    };

      // Mouse click burst effect - push stars away from click point
      const clickAge = now - lastClickTime;
      const clickActive = clickAge < 800;
      const clickProgress = clickAge / 800;
      const clickWave = clickActive ? Math.sin(clickProgress * Math.PI) : 0;

      // Draw rotating stars
      for (const star of stars) {
        star.angle += star.speed * dt;

        const parallaxFactor = star.radius / (Math.sqrt(w * w + h * h) / 2);
        const px = mx * parallaxFactor * 120;
        const py = my * parallaxFactor * 120;

        const baseX = centerX + Math.cos(star.angle) * star.radius + px;
        const baseY = centerY + Math.sin(star.angle) * star.radius + py;

        // Click ripple - push stars away from click position
        let cpx = 0, cpy = 0;
        if (clickActive) {
          const dx = baseX - clickX;
          const dy = baseY - clickY;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const maxDist = 400;
          const strength = Math.max(0, 1 - dist / maxDist) * clickWave * 50;
          cpx = (dx / dist) * strength;
          cpy = (dy / dist) * strength;
        }

        const sx = centerX + Math.cos(star.angle) * star.radius + px + cpx;
        const sy = centerY + Math.sin(star.angle) * star.radius + py + cpy;

        // Skip if off screen
        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue;

        const twinkle = star.brightness + Math.sin(now * 0.001 * star.twinkleSpeed) * 0.2;
        const alpha = Math.max(0.3, Math.min(1, twinkle));
        const [r, g, b] = star.color;

        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }

      // Shooting stars
      if (shootTimer > 2000 + Math.random() * 3000) {
        shootingStars.push(spawnShootingStar());
        shootTimer = 0;
      }

      shootingStars = shootingStars.filter(s => s.life < s.maxLife);
      for (const s of shootingStars) {
        s.x += s.vx * dt * 0.06;
        s.y += s.vy * dt * 0.06;
        s.life++;

        const progress = s.life / s.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : Math.max(0, 1 - (progress - 0.3) / 0.7);
        const [r, g, b] = s.color;

        // Tail
        const tailLen = 6;
        for (let i = 0; i < tailLen; i++) {
          const ta = alpha * (1 - i / tailLen) * 0.6;
          const tx = s.x - s.vx * i * 0.8;
          const ty = s.y - s.vy * i * 0.8;
          ctx.beginPath();
          ctx.arc(tx, ty, s.size * (1 - i / tailLen * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${ta})`;
          ctx.fill();
        }

        // Head
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    animationId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
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
