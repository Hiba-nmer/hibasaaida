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

    const onClick = () => {
      lastClickTime = performance.now();
    };

    const draw = (now: number) => {
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;
      shootTimer += dt;

      ctx.clearRect(0, 0, w, h);

      // Nebula background
      const nebulas = [
        { cx: 0.25, cy: 0.4, r: 0.5, color: "rgba(120, 40, 80, 0.06)" },
        { cx: 0.72, cy: 0.25, r: 0.4, color: "rgba(80, 40, 120, 0.05)" },
        { cx: 0.5, cy: 0.72, r: 0.5, color: "rgba(100, 30, 70, 0.04)" },
        { cx: 0.15, cy: 0.8, r: 0.32, color: "rgba(90, 50, 130, 0.035)" },
        { cx: 0.85, cy: 0.6, r: 0.35, color: "rgba(130, 40, 90, 0.04)" },
      ];
      const t = now * 0.0001;
      for (const n of nebulas) {
        const ox = Math.sin(t + n.cx * 20) * 20;
        const oy = Math.cos(t * 1.3 + n.cy * 20) * 15;
        const g = ctx.createRadialGradient(
          n.cx * w + ox, n.cy * h + oy, 0,
          n.cx * w + ox, n.cy * h + oy, n.r * w
        );
        g.addColorStop(0, n.color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // Mouse offset for parallax
      const mx = (mouseRef.current.x - centerX) / centerX;
      const my = (mouseRef.current.y - centerY) / centerY;

      // Mouse click burst effect
      const clickAge = now - lastClickTime;
      const clickActive = clickAge < 600;
      const clickWave = clickActive ? Math.sin(clickAge / 600 * Math.PI) * 15 : 0;

      // Draw rotating stars
      for (const star of stars) {
        star.angle += star.speed * dt;

        const parallaxFactor = star.radius / (Math.sqrt(w * w + h * h) / 2);
        const px = mx * parallaxFactor * 60;
        const py = my * parallaxFactor * 60;

        // Click ripple push
        let cpx = 0, cpy = 0;
        if (clickActive) {
          const cdx = Math.cos(star.angle) * star.radius;
          const cdy = Math.sin(star.angle) * star.radius;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy) || 1;
          cpx = (cdx / cdist) * clickWave * parallaxFactor;
          cpy = (cdy / cdist) * clickWave * parallaxFactor;
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
