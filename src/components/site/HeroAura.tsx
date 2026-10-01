import { useEffect, useRef } from "react";

/**
 * Ethereal Golden Aura — magical mouse-follow layer for the hero.
 *
 * Layers:
 *  1. Canvas stardust: golden particles trail the cursor, twinkle, and fade;
 *     ambient dust drifts across the hero at all times.
 *  2. Two large blurred gold light pools that pulse slowly (CSS).
 *  3. A handful of twinkling sparkle nodes (CSS).
 *
 * The existing cursor-anchored `gold-glow` gradient remains in the hero and
 * sits underneath this layer. Respects prefers-reduced-motion (static only).
 */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  twinkle: number;
  ambient: boolean;
};

const MAX_PARTICLES = 220;
const AMBIENT_COUNT = 26;

const HeroAura = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    if (!canvas || !hero) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const primary =
      getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() ||
      "36 91% 55%";
    const gold = (alpha: number) => `hsl(${primary} / ${alpha})`;
    const warm = (alpha: number) => `hsl(48 100% 78% / ${alpha})`;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles: Particle[] = [];

    // Pre-rendered glow sprite (soft radial gold) for cheap, pretty particles.
    const sprite = document.createElement("canvas");
    const SPRITE = 64;
    sprite.width = SPRITE;
    sprite.height = SPRITE;
    const sctx = sprite.getContext("2d");
    if (sctx) {
      const g = sctx.createRadialGradient(SPRITE / 2, SPRITE / 2, 0, SPRITE / 2, SPRITE / 2, SPRITE / 2);
      g.addColorStop(0, "rgba(255, 236, 190, 1)");
      g.addColorStop(0.25, "rgba(245, 190, 90, 0.85)");
      g.addColorStop(0.6, "rgba(220, 150, 50, 0.28)");
      g.addColorStop(1, "rgba(220, 150, 50, 0)");
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, SPRITE, SPRITE);
    }

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const spawnAmbient = (initial = false) => {
      particles.push({
        x: Math.random() * width,
        y: initial ? Math.random() * height : height + 10,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(0.08 + Math.random() * 0.22),
        size: 1 + Math.random() * 2.2,
        life: 0,
        maxLife: 400 + Math.random() * 500,
        twinkle: Math.random() * Math.PI * 2,
        ambient: true,
      });
    };
    for (let i = 0; i < AMBIENT_COUNT; i++) spawnAmbient(true);

    const spawnBurst = (x: number, y: number, count: number) => {
      for (let i = 0; i < count && particles.length < MAX_PARTICLES; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 1.4;
        particles.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.35,
          size: 1.2 + Math.random() * 3.4,
          life: 0,
          maxLife: 45 + Math.random() * 55,
          twinkle: Math.random() * Math.PI * 2,
          ambient: false,
        });
      }
    };

    // Smoothed cursor position for the trailing comet glow.
    const cursor = { x: -1000, y: -1000, sx: -1000, sy: -1000, active: false };

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      cursor.x = e.clientX - rect.left;
      cursor.y = e.clientY - rect.top;
      if (!cursor.active) {
        cursor.sx = cursor.x;
        cursor.sy = cursor.y;
        cursor.active = true;
      }
      spawnBurst(cursor.x, cursor.y, 4);
    };
    const onLeave = () => {
      cursor.active = false;
      cursor.x = -1000;
      cursor.y = -1000;
    };

    const step = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      // Trailing comet glow that eases toward the cursor.
      if (cursor.active) {
        cursor.sx += (cursor.x - cursor.sx) * 0.12;
        cursor.sy += (cursor.y - cursor.sy) * 0.12;
        const glow = ctx.createRadialGradient(cursor.sx, cursor.sy, 0, cursor.sx, cursor.sy, 130);
        glow.addColorStop(0, gold(0.16));
        glow.addColorStop(0.4, gold(0.06));
        glow.addColorStop(1, gold(0));
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cursor.sx, cursor.sy, 130, 0, Math.PI * 2);
        ctx.fill();
        // Hot core
        const core = ctx.createRadialGradient(cursor.sx, cursor.sy, 0, cursor.sx, cursor.sy, 26);
        core.addColorStop(0, warm(0.35));
        core.addColorStop(1, warm(0));
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(cursor.sx, cursor.sy, 26, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 1;
        p.twinkle += 0.08;
        p.x += p.vx;
        p.y += p.vy;
        if (!p.ambient) {
          p.vx *= 0.985;
          p.vy = p.vy * 0.985 + 0.004;
        }

        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio >= 1 || p.y < -20 || p.x < -20 || p.x > width + 20) {
          particles.splice(i, 1);
          if (p.ambient) spawnAmbient();
          continue;
        }

        const fadeIn = Math.min(1, lifeRatio * 6);
        const fadeOut = 1 - lifeRatio;
        const alpha = 0.55 * fadeIn * fadeOut * (0.6 + 0.4 * Math.sin(p.twinkle));
        if (alpha <= 0.01) continue;

        const drawSize = p.size * 4;
        ctx.globalAlpha = alpha;
        ctx.drawImage(sprite, p.x - drawSize / 2, p.y - drawSize / 2, drawSize, drawSize);
        if (p.size > 2.6) {
          ctx.globalAlpha = alpha * 0.9;
          ctx.fillStyle = warm(alpha);
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.6, p.size * 0.28), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onVisibility = () => {
      running = !document.hidden;
      if (running && !raf) raf = requestAnimationFrame(step);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(hero);
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Drifting gold light pools */}
      <div className="absolute -left-[10%] -top-[20%] h-[60vw] w-[60vw] rounded-full bg-[hsl(var(--primary)/0.09)] blur-[120px] aura-pulse" />
      <div className="absolute -bottom-[15%] -right-[5%] h-[45vw] w-[45vw] rounded-full bg-[hsl(var(--primary)/0.06)] blur-[140px] aura-pulse aura-pulse-slow" />

      {/* Twinkling sparkle nodes */}
      <div className="aura-sparkle left-[12%] top-[18%]" />
      <div className="aura-sparkle left-[28%] top-[64%] aura-delay-1" />
      <div className="aura-sparkle left-[46%] top-[10%] aura-delay-2" />
      <div className="aura-sparkle left-[63%] top-[72%]" />
      <div className="aura-sparkle left-[78%] top-[26%] aura-delay-1" />
      <div className="aura-sparkle left-[88%] top-[58%] aura-delay-2" />
      <div className="aura-sparkle left-[7%] top-[84%] aura-delay-2" />
      <div className="aura-sparkle left-[54%] top-[38%] aura-delay-1" />

      {/* Stardust canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default HeroAura;
