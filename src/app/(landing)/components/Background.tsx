"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  id: number;
  radius: number;
  trailPositions: { x: number; y: number }[];
  maxTrail: number;
  lifeGlow: number;
  phase: number;
  update: (bounds: { w: number; h: number }, time: number) => void;
  resetVelocity: () => void;
  draw: (ctx: CanvasRenderingContext2D, time: number) => void;
}

// Move class outside of component
class MeteorParticle implements Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  id: number;
  radius: number;
  trailPositions: { x: number; y: number }[];
  maxTrail: number;
  lifeGlow: number;
  phase: number;

  constructor(x: number, y: number, vx: number, vy: number, id: number) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.id = id;
    this.radius = 2.2;
    this.trailPositions = [];
    this.maxTrail = 25;
    this.lifeGlow = 0.7 + Math.random() * 0.5;
    this.phase = Math.random() * Math.PI * 2;
  }

  update(bounds: { w: number; h: number }, time: number) {
    // apply velocity
    this.x += this.vx;
    this.y += this.vy;

    // wrap-around effect - meteor shower style (reappear on opposite side)
    // Creates infinite streaming chains
    if (this.x < -50) {
      this.x = bounds.w + 30;
      this.y = Math.random() * bounds.h;
      this.resetVelocity();
    }
    if (this.x > bounds.w + 50) {
      this.x = -30;
      this.y = Math.random() * bounds.h;
      this.resetVelocity();
    }
    if (this.y < -50) {
      this.y = bounds.h + 30;
      this.x = Math.random() * bounds.w;
      this.resetVelocity();
    }
    if (this.y > bounds.h + 50) {
      this.y = -30;
      this.x = Math.random() * bounds.w;
      this.resetVelocity();
    }

    // store trail for elegant motion blur
    this.trailPositions.unshift({ x: this.x, y: this.y });
    if (this.trailPositions.length > this.maxTrail) {
      this.trailPositions.pop();
    }

    // subtle sinusoidal drift for organic elegance
    this.vx += Math.sin(time * 0.0008 + this.phase) * 0.003;
    this.vy += Math.cos(time * 0.0009 + this.id) * 0.003;

    // speed limit for smoothness
    const maxSpeed = 1.8;
    const minSpeed = 0.6;
    const spd = Math.hypot(this.vx, this.vy);
    if (spd > maxSpeed) {
      this.vx = (this.vx / spd) * maxSpeed;
      this.vy = (this.vy / spd) * maxSpeed;
    }
    if (spd < minSpeed && spd > 0) {
      this.vx = (this.vx / spd) * minSpeed;
      this.vy = (this.vy / spd) * minSpeed;
    }

    // pulsating glow based on sine wave
    this.lifeGlow = 0.6 + 0.3 * Math.sin(time * 0.002 + this.id);
  }

  resetVelocity() {
    // meteor-like diagonal direction bias (elegant streaks)
    const angle = Math.random() * Math.PI * 0.5 + 0.2;
    const speed = 0.9 + Math.random() * 0.9;
    this.vx = Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -0.8);
    this.vy = Math.sin(angle) * speed + 0.3;
    // ensure variety
    if (Math.random() > 0.6) this.vx *= -1;
  }

  draw(ctx: CanvasRenderingContext2D, time: number) {
    // draw trail first (meteor tail elegance)
    if (this.trailPositions.length > 1) {
      for (let i = 0; i < this.trailPositions.length - 1; i++) {
        const t1 = this.trailPositions[i];
        const t2 = this.trailPositions[i + 1];
        if (!t1 || !t2) continue;
        const alpha = 0.25 * (1 - i / this.maxTrail) * this.lifeGlow;
        ctx.beginPath();
        ctx.moveTo(t1.x, t1.y);
        ctx.lineTo(t2.x, t2.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
        ctx.lineWidth = 1.5 * (1 - i / this.maxTrail) + 0.6;
        ctx.stroke();
      }
    }

    // draw core particle with elegant glow
    const rad = this.radius + 0.5 * Math.sin(time * 0.0032 + this.id);
    ctx.beginPath();
    ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);

    // gradient for premium white metallic look
    const grad = ctx.createRadialGradient(
      this.x - 1,
      this.y - 1,
      1,
      this.x,
      this.y,
      rad + 1,
    );
    grad.addColorStop(0, `rgba(255, 255, 255, 0.95)`);
    grad.addColorStop(0.6, `rgba(230, 230, 245, 0.8)`);
    grad.addColorStop(1, `rgba(200, 200, 220, 0.4)`);
    ctx.fillStyle = grad;
    ctx.fill();

    // add inner bright core
    ctx.beginPath();
    ctx.arc(this.x - 0.8, this.y - 0.8, rad * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
    ctx.fill();

    // subtle outer glow
    ctx.shadowBlur = 8;
    ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const globalTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number, height: number;

    // ------------------------------
    // Create elegant chain connections between particles
    // Based on proximity + directional flow (meteor shower network)
    // ------------------------------
    function drawChainConnections(
      particles: Particle[],
      ctx: CanvasRenderingContext2D,
      time: number,
    ) {
      const len = particles.length;
      const maxDistance = 100; // reduced even more
      const minDistance = 50;

      for (let i = 0; i < len; i += 2) {
        // only every other particle
        const p1 = particles[i];
        // only check next 2 particles
        for (let j = i + 1; j < Math.min(i + 3, len); j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance && dist > minDistance) {
            const intensity = 1 - dist / maxDistance;
            const pulse =
              0.6 + 0.15 * Math.sin(time * 0.0006 + (p1.id + p2.id) * 0.3);
            let alpha = 0.1 * intensity + 0.05 * pulse;
            alpha = Math.min(0.2, Math.max(0.02, alpha));

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            const lineGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            lineGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
            lineGrad.addColorStop(1, `rgba(210, 210, 235, ${alpha * 0.4})`);
            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = 0.5 + intensity * 0.5;
            ctx.stroke();
          }
        }
      }
    }

    // Sparkles for meteor shower effect
    function drawMeteorShowerSparkles(
      particles: Particle[],
      ctx: CanvasRenderingContext2D,
    ) {
      for (let i = 0; i < particles.length; i += 4) {
        const p = particles[i];
        if (Math.random() < 0.04) {
          ctx.beginPath();
          ctx.arc(
            p.x + (Math.random() - 0.5) * 8,
            p.y + (Math.random() - 0.5) * 8,
            0.8,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = `rgba(255, 255, 255, 0.25)`;
          ctx.fill();
        }
      }
    }

    // ------------------------------
    // Initialize particles with meteor-like flow
    // Particles have directional bias to create "rain chain"
    // ------------------------------
    function initMeteorParticles(
      count: number,
      w: number,
      h: number,
    ): Particle[] {
      const particlesArray: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = -50 + Math.random() * h * 0.3; // start from top
        // meteor shower: diagonal downward flow from top-right to bottom-left
        const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.4; // -45 deg with less variation
        const speed = 1.2 + Math.random() * 0.6; // faster for meteor effect
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed + 0.4; // downward bias
        particlesArray.push(new MeteorParticle(x, y, vx, vy, i));
      }
      return particlesArray;
    }

    // ------------------------------
    // Background: minimal black with subtle gradient & star field (tesla minimal)
    // ------------------------------
    function drawBackground(
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      time: number,
    ) {
      // deep black base
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      // elegant subtle noise / dust (micro stars)
      for (let i = 0; i < 180; i++) {
        if (i % 2 === 0) continue;
        const sx = (i * 1311) % w;
        const sy = (i * 2537) % h;
        ctx.beginPath();
        ctx.arc(
          sx,
          sy,
          0.6 + Math.sin(time * 0.0004 + i) * 0.2,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${0.08 + Math.sin(time * 0.0003 + i) * 0.04})`;
        ctx.fill();
      }

      // faint diagonal light rays (tesla signature)
      ctx.save();
      ctx.globalAlpha = 0.03;
      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.moveTo(w * 0.2 + i * 40, 0);
        ctx.lineTo(w * 0.1 + i * 35, h);
        ctx.lineTo(w * 0.15 + i * 38, h);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }
      ctx.restore();
    }

    // Minimal dynamic chains for clean meteor shower effect
    function drawDynamicChains(
      particles: Particle[],
      ctx: CanvasRenderingContext2D,
      time: number,
    ) {
      const len = particles.length;
      // only every 3rd particle for very minimal connections
      for (let step = 0; step < len - 1; step += 3) {
        const pA = particles[step];
        const pB = particles[step + 1];
        const dist = Math.hypot(pA.x - pB.x, pA.y - pB.y);
        if (dist < 100) {
          const pulseAlpha = 0.05 + 0.03 * Math.sin(time * 0.0008 + step);
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${pulseAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // ------------------------------
    // Main animation loop - Tesla elegance meteor chain network
    // ------------------------------
    let globalTime = 0;

    function animate(timestamp: number) {
      if (!ctx) return;
      globalTime = timestamp || performance.now();
      globalTimeRef.current = globalTime;

      // resize handling dynamic
      if (width !== window.innerWidth || height !== window.innerHeight) {
        width = window.innerWidth;
        height = window.innerHeight;
        if (canvas) {
          canvas.width = width;
          canvas.height = height;
        }
        // reinitialize particles to fit new dimensions elegantly
        particlesRef.current = initMeteorParticles(35, width, height);
      }

      // clear and draw background
      drawBackground(ctx, width, height, globalTime);

      // update all meteor particles
      const bounds = { w: width, h: height };
      for (const p of particlesRef.current) {
        p.update(bounds, globalTime);
      }

      // draw main chain connections (Tesla neural web)
      drawChainConnections(particlesRef.current, ctx, globalTime);

      // draw additional meteor shower sparkles
      drawMeteorShowerSparkles(particlesRef.current, ctx);

      // draw particles (nodes) on top with elegant trails
      for (const p of particlesRef.current) {
        p.draw(ctx, globalTime);
      }

      // final elegant white noise mist (very subtle)
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
      ctx.fillRect(0, 0, width, height);

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    // ------------------------------
    // Setup canvas and start simulation
    // ------------------------------
    function setup() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
      // 35 particles for clean meteor shower effect
      particlesRef.current = initMeteorParticles(35, width, height);
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    setup();

    const handleResize = () => {
      // resize handled inside animate for smoothness
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
      if (particlesRef.current.length > 0) {
        // adjust positions proportionally
        for (const p of particlesRef.current) {
          if (p.x > width) p.x = width - 20;
          if (p.y > height) p.y = height - 20;
          if (p.x < 0) p.x = 20;
          if (p.y < 0) p.y = 20;
        }
      } else {
        particlesRef.current = initMeteorParticles(68, width, height);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="teslaCanvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "block",
        zIndex: -1,
      }}
    />
  );
};

export default Background;
