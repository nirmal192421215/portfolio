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
    const NODE_COUNT = 40;
    const CIRCUIT_COUNT = 15;
    const nodes = [];
    const circuits = [];

    const createNode = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 0.5 + 0.5,
      size: Math.random() * 3 + 2,
      pulse: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? '#00F5FF' : '#7C3AED'
    });

    const createCircuit = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 200 + 100,
      speed: Math.random() * 2 + 1,
      vertical: Math.random() > 0.5,
      opacity: Math.random() * 0.5 + 0.2
    });

    for (let i = 0; i < NODE_COUNT; i++) nodes.push(createNode());
    for (let i = 0; i < CIRCUIT_COUNT; i++) circuits.push(createCircuit());

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e) => {
      mouse.tx = (e.clientX - canvas.width / 2) * 0.05;
      mouse.ty = (e.clientY - canvas.height / 2) * 0.05;
    };
    window.addEventListener('mousemove', onMouseMove);

    const drawGrid = (offsetY, opacity, scale = 1) => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
      ctx.lineWidth = 1;
      
      const spacing = 60 * scale;
      const scrollX = (mouse.x * 0.5) % spacing;
      const scrollY = (offsetY + mouse.y * 0.5) % spacing;

      for (let x = scrollX - spacing; x < canvas.width + spacing; x += spacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = scrollY - spacing; y < canvas.height + spacing; y += spacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();
    };

    const drawCircuits = () => {
      circuits.forEach(c => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 245, 255, ${c.opacity})`;
        ctx.lineWidth = 2;
        
        if (c.vertical) {
          c.y += c.speed;
          if (c.y > canvas.height) c.y = -c.length;
          ctx.moveTo(c.x, c.y);
          ctx.lineTo(c.x, c.y + c.length);
        } else {
          c.x += c.speed;
          if (c.x > canvas.width) c.x = -c.length;
          ctx.moveTo(c.x, c.y);
          ctx.lineTo(c.x + c.length, c.y);
        }
        ctx.stroke();
        
        // Circuit head
        ctx.beginPath();
        ctx.arc(c.vertical ? c.x : c.x + c.length, c.vertical ? c.y + c.length : c.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00F5FF';
        ctx.fill();
      });
    };

    const drawNodes = () => {
      nodes.forEach(n => {
        n.pulse += 0.05;
        const pSize = n.size + Math.sin(n.pulse) * 2;
        const nx = n.x + mouse.x * n.z;
        const ny = n.y + mouse.y * n.z;

        ctx.beginPath();
        ctx.arc(nx, ny, pSize, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = n.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connections
        nodes.forEach(n2 => {
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nx, ny);
            ctx.lineTo(n2.x + mouse.x * n2.z, n2.y + mouse.y * n2.z);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        });
      });
    };

    const draw = () => {
      frame++;
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      mouse.x += (mouse.tx - mouse.x) * 0.1;
      mouse.y += (mouse.ty - mouse.y) * 0.1;

      // Layered Grids
      drawGrid(frame * 0.5, 0.03, 0.8);
      drawGrid(frame * 1, 0.05, 1.2);

      drawCircuits();
      drawNodes();

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
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-[0.15]"
          style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(0,245,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(124,58,237,0.15) 0%, transparent 50%)'
          }}
        />
        {/* Scanning Line */}
        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent opacity-20 animate-scan top-0" />
      </div>
      <style>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default Background;
