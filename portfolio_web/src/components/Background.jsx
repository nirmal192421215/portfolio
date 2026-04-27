import React, { useEffect, useRef } from 'react';

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Layer 1: Foreground (slow, larger) ─────────────────
    const FG_COUNT = 80;
    // ── Layer 2: Background (fast, tiny) ───────────────────
    const BG_COUNT = 120;
    const CONNECTION_DIST = 140;

    const createParticle = (layer) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (layer === 'bg' ? 0.6 : 0.25),
      vy: (Math.random() - 0.5) * (layer === 'bg' ? 0.6 : 0.25),
      size: layer === 'bg' ? Math.random() * 0.8 + 0.3 : Math.random() * 1.6 + 0.8,
      // Hue shifts for color cycling
      hue: Math.random() * 360,
      hueSpeed: (Math.random() - 0.5) * 0.3,
      layer,
    });

    const fgParticles = Array.from({ length: FG_COUNT }, () => createParticle('fg'));
    const bgParticles = Array.from({ length: BG_COUNT }, () => createParticle('bg'));

    // ── Shooting stars ─────────────────────────────────────
    let shootingStars = [];
    const spawnStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width * 0.6,
        y: Math.random() * canvas.height * 0.4,
        vx: 6 + Math.random() * 6,
        vy: 2 + Math.random() * 4,
        life: 1.0,
        length: 80 + Math.random() * 80,
      });
    };
    // Spawn stars at random intervals
    let nextStarIn = 180 + Math.random() * 300;

    const mouse = { x: null, y: null };
    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', onMouseMove);

    const getParticleColor = (p) => {
      // Slowly shift through cyan→violet→rose hues
      const h = ((p.hue + frame * p.hueSpeed * 0.1) % 360 + 360) % 360;
      if (h < 120)      return `hsla(${180 + h * 0.2}, 100%, 70%, 0.9)`;  // Cyan range
      else if (h < 240) return `hsla(${260 + (h - 120) * 0.2}, 80%, 65%, 0.9)`;  // Violet range
      else              return `hsla(${340 + (h - 240) * 0.1}, 90%, 65%, 0.9)`;  // Rose range
    };

    const drawParticleLayer = (particles, alpha = 1) => {
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse interaction — repulsion, attraction, and drawing connections
        if (mouse.x !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 180 && dist > 60) {
            // Repulsion zone
            const force = (180 - dist) / 180 * 1.0;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          } else if (dist < 60 && p.layer === 'fg') {
            // Attraction zone (only foreground particles)
            const force = (60 - dist) / 60 * 0.4;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }

          // Draw connection to mouse for foreground particles
          if (p.layer === 'fg' && dist < 180) { // Increased connection distance to mouse
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            // Significantly increased opacity for mouse lines
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.8 * (1 - dist / 180)})`;
            ctx.lineWidth = 1.5; // Thicker line
            ctx.stroke();
          }
        }

        // Draw connections (only fg layer for performance)
        if (p.layer === 'fg') {
          let connectionCount = 0;
          for (let j = i + 1; j < particles.length; j++) {
            if (connectionCount >= 4) break; // Limit to max 4 connections per particle (changed from 3)
            
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < CONNECTION_DIST) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              // Increased opacity for inter-particle lines
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 * (1 - dist / CONNECTION_DIST)})`;
              ctx.lineWidth = 1.0; // Slightly thicker
              ctx.stroke();
              connectionCount++;
            }
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = getParticleColor(p);
        ctx.globalAlpha = p.layer === 'bg' ? 0.35 * alpha : 0.85 * alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    };

    const drawShootingStars = () => {
      shootingStars = shootingStars.filter(s => s.life > 0);
      shootingStars.forEach(s => {
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.length, s.y - s.length * 0.3);
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.life})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length, s.y - s.length * 0.3);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 * s.life;
        ctx.stroke();
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.015;
      });
    };

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw bg layer (dimmer, no connections)
      drawParticleLayer(bgParticles, 0.5);
      // Draw fg layer (brighter, with connections)
      drawParticleLayer(fgParticles, 1);
      // Shooting stars
      drawShootingStars();

      // Spawn stars
      nextStarIn--;
      if (nextStarIn <= 0) {
        spawnStar();
        nextStarIn = 200 + Math.random() * 350;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050510]">
      {/* ── Nebula Glows ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full blur-[160px] opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, rgba(0,245,255,1), transparent)', transform: 'translate(-30%, -30%)' }}
        />
        <div
          className="absolute top-1/2 right-0 w-[900px] h-[900px] rounded-full blur-[200px] opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,1), transparent)', transform: 'translate(35%, -50%)' }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, rgba(255,45,107,1), transparent)', transform: 'translate(-50%, 30%)' }}
        />
      </div>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default Background;
