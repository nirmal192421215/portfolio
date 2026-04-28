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
    const STAR_COUNT = 150;
    const stars = [];
    const rippleRadius = { current: 0, target: 0 };
    
    // Grid settings
    const gridSize = 40;
    const gridTilt = { x: 0, y: 0 };

    const createStar = () => ({
      x: (Math.random() - 0.5) * canvas.width * 2,
      y: (Math.random() - 0.5) * canvas.height * 2,
      z: Math.random() * canvas.width,
      pz: 0,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#00F5FF' : '#7C3AED'
    });

    for (let i = 0; i < STAR_COUNT; i++) stars.push(createStar());

    const mouse = { x: canvas.width / 2, y: canvas.height / 2, active: false };
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      gridTilt.x = (e.clientY / canvas.height - 0.5) * 40;
      gridTilt.y = (e.clientX / canvas.width - 0.5) * -40;
    };
    const onMouseDown = () => {
      rippleRadius.target = 500;
      setTimeout(() => rippleRadius.target = 0, 500);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);

    const drawGrid = () => {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(gridTilt.x * Math.PI / 180);
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.05)';
      ctx.lineWidth = 0.5;

      for (let x = -canvas.width; x < canvas.width; x += gridSize) {
        ctx.moveTo(x, -canvas.height);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = -canvas.height; y < canvas.height; y += gridSize) {
        ctx.moveTo(-canvas.width, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();
      ctx.restore();
    };

    const drawStars = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const speed = mouse.active ? 8 : 2;

      stars.forEach(s => {
        s.z -= speed;
        if (s.z <= 0) {
          s.z = canvas.width;
          s.x = (Math.random() - 0.5) * canvas.width * 2;
          s.y = (Math.random() - 0.5) * canvas.height * 2;
        }

        const x = (s.x / s.z) * canvas.width + centerX;
        const y = (s.y / s.z) * canvas.height + centerY;
        const rad = (1 - s.z / canvas.width) * s.size * 2;

        if (s.pz > 0) {
          const px = (s.x / s.pz) * canvas.width + centerX;
          const py = (s.y / s.pz) * canvas.height + centerY;

          ctx.beginPath();
          ctx.strokeStyle = s.color;
          ctx.globalAlpha = (1 - s.z / canvas.width) * 0.8;
          ctx.lineWidth = rad;
          ctx.moveTo(x, y);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
        s.pz = s.z;
      });
      ctx.globalAlpha = 1;
    };

    const drawRipple = () => {
      rippleRadius.current += (rippleRadius.target - rippleRadius.current) * 0.1;
      if (rippleRadius.current > 1) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, rippleRadius.current, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 245, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const draw = () => {
      frame++;
      ctx.fillStyle = 'rgba(5, 5, 16, 0.3)'; // Trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      drawStars();
      drawRipple();

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050510] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-[0.1]"
          style={{ background: 'radial-gradient(circle at center, rgba(0,245,255,0.2) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full opacity-[0.05]"
          style={{ backgroundImage: 'linear-gradient(rgba(0,245,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
        />
      </div>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default Background;
