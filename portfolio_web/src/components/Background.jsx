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
    const FG_COUNT = 90;
    const BG_COUNT = 140;
    const CONNECTION_DIST = 150;

    // Parallax & Drift state
    const parallax = { x: 0, y: 0 };
    const targetParallax = { x: 0, y: 0 };
    const driftSpeed = 0.15; // Space drift speed

    // Data pulse state
    let pulses = [];

    const createParticle = (layer) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (layer === 'bg' ? 0.3 : 0.15),
      vy: (Math.random() - 0.5) * (layer === 'bg' ? 0.3 : 0.15),
      size: layer === 'bg' ? Math.random() * 1.0 + 0.4 : Math.random() * 2.0 + 1.0,
      hue: Math.random() * 360,
      hueSpeed: (Math.random() - 0.5) * 0.4,
      twinkleSpeed: Math.random() * 0.07 + 0.02,
      twinkleOffset: Math.random() * Math.PI * 2,
      layer,
    });

    const fgParticles = Array.from({ length: FG_COUNT }, () => createParticle('fg'));
    const bgParticles = Array.from({ length: BG_COUNT }, () => createParticle('bg'));

    // ── Shooting stars ─────────────────────────────────────
    let shootingStars = [];
    const spawnStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: -100, // Spawn from top for space travel feel
        vx: (Math.random() - 0.5) * 2,
        vy: 5 + Math.random() * 10,
        life: 1.0,
        length: 100 + Math.random() * 100,
      });
    };
    let nextStarIn = 120 + Math.random() * 250;

    const mouse = { x: null, y: null };
    const onMouseMove = (e) => { 
      mouse.x = e.clientX; 
      mouse.y = e.clientY; 
      targetParallax.x = (e.clientX - window.innerWidth / 2) * 0.1;
      targetParallax.y = (e.clientY - window.innerHeight / 2) * 0.1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const getParticleColor = (p, alphaMult = 1) => {
      const h = ((p.hue + frame * p.hueSpeed * 0.1) % 360 + 360) % 360;
      const twinkle = (Math.sin(frame * p.twinkleSpeed + p.twinkleOffset) + 1) / 2;
      const opacity = (p.layer === 'bg' ? 0.2 : 0.6) + (twinkle * 0.2);
      
      if (h < 120)      return `hsla(${180 + h * 0.2}, 100%, 80%, ${opacity * alphaMult})`;
      else if (h < 240) return `hsla(${260 + (h - 120) * 0.2}, 90%, 75%, ${opacity * alphaMult})`;
      else              return `hsla(${340 + (h - 240) * 0.1}, 100%, 75%, ${opacity * alphaMult})`;
    };

    const drawParticleLayer = (particles, alpha = 1, parallaxScale = 1) => {
      particles.forEach((p, i) => {
        // Space travel drift (downwards)
        p.y += driftSpeed * parallaxScale;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const ex = p.x + parallax.x * parallaxScale;
        const ey = p.y + parallax.y * parallaxScale;

        if (mouse.x !== null) {
          const dx = ex - mouse.x;
          const dy = ey - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 200 && dist > 60) {
            const force = (200 - dist) / 200 * 1.2;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          } else if (dist < 60 && p.layer === 'fg') {
            const force = (60 - dist) / 60 * 0.5;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }

          if (p.layer === 'fg' && dist < 180) {
            ctx.beginPath();
            ctx.moveTo(ex, ey);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.4 * (1 - dist / 180)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        if (p.layer === 'fg') {
          let connectionCount = 0;
          for (let j = i + 1; j < particles.length; j++) {
            if (connectionCount >= 3) break;
            
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < CONNECTION_DIST) {
              const ex2 = p2.x + parallax.x * parallaxScale;
              const ey2 = p2.y + parallax.y * parallaxScale;

              ctx.beginPath();
              // Animated Flowing Line Dash
              ctx.setLineDash([5, 15]);
              ctx.lineDashOffset = -frame * 0.5; 
              ctx.moveTo(ex, ey);
              ctx.lineTo(ex2, ey2);
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - dist / CONNECTION_DIST)})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
              ctx.setLineDash([]); // Reset
              connectionCount++;

              if (frame % 50 === 0 && Math.random() < 0.004) {
                pulses.push({
                  p1: p, p2: p2,
                  progress: 0,
                  speed: 0.007 + Math.random() * 0.012,
                  color: getParticleColor(p, 1)
                });
              }
            }
          }
        }

        ctx.beginPath();
        ctx.arc(ex, ey, p.size, 0, Math.PI * 2);
        ctx.fillStyle = getParticleColor(p, alpha);
        ctx.fill();

        // Subtle Mouse Aura highlight (reduced)
        if (mouse.x !== null) {
          const dx = ex - mouse.x;
          const dy = ey - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.arc(ex, ey, p.size * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 245, 255, ${(120 - dist) / 120 * 0.2})`;
            ctx.fill();
          }
        }
      });
    };

    const drawPulses = () => {
      pulses = pulses.filter(pulse => pulse.progress < 1);
      pulses.forEach(pulse => {
        pulse.progress += pulse.speed;
        const px = pulse.p1.x + (pulse.p2.x - pulse.p1.x) * pulse.progress + parallax.x;
        const py = pulse.p1.y + (pulse.p2.y - pulse.p1.y) * pulse.progress + parallax.y;
        
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = pulse.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const drawShootingStars = () => {
      shootingStars = shootingStars.filter(s => s.life > 0);
      shootingStars.forEach(s => {
        const sx = s.x + parallax.x * 0.6;
        const sy = s.y + parallax.y * 0.6;
        const grad = ctx.createLinearGradient(sx, sy, sx - s.length * 0.2, sy - s.length);
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.life})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx - s.length * 0.2, sy - s.length);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 * s.life;
        ctx.stroke();
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.01;
      });
    };

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      parallax.x += (targetParallax.x - parallax.x) * 0.08;
      parallax.y += (targetParallax.y - parallax.y) * 0.08;

      drawParticleLayer(bgParticles, 0.4, 0.4);
      drawParticleLayer(fgParticles, 1, 1);
      drawPulses();
      drawShootingStars();

      nextStarIn--;
      if (nextStarIn <= 0) {
        spawnStar();
        nextStarIn = 150 + Math.random() * 300;
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
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050510] overflow-hidden">
      {/* ── Nebula Glows (Reduced Intensity) ───────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[140px] opacity-[0.05] animate-pulse"
          style={{ background: 'radial-gradient(circle, rgba(0,245,255,1), transparent)', transform: 'translate(-20%, -20%)' }}
        />
        <div
          className="absolute top-1/2 right-0 w-[1000px] h-[1000px] rounded-full blur-[180px] opacity-[0.04] animate-pulse"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,1), transparent)', transform: 'translate(25%, -40%)', animationDelay: '1.5s' }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-[700px] h-[700px] rounded-full blur-[120px] opacity-[0.03] animate-pulse"
          style={{ background: 'radial-gradient(circle, rgba(255,45,107,1), transparent)', transform: 'translate(-50%, 20%)', animationDelay: '3s' }}
        />
      </div>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default Background;
