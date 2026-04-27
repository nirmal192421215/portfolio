import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      // Inner dot snaps instantly
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const onClick = (e) => {
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 800);
    };

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    // ── Lerp Logic ──────────────────────────────────────────
    // 80ms lag at 60fps is roughly 4-5 frames. 
    // Lerp factor 0.15 is about 80-100ms response time.
    let rafId;
    const follow = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

      ringEl.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      
      rafId = requestAnimationFrame(follow);
    };
    rafId = requestAnimationFrame(follow);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onClick);

    const updateInteractives = () => {
      const interactives = document.querySelectorAll('a, button, [data-cursor]');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    updateInteractives();

    const observer = new MutationObserver(updateInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onClick);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Inner Dot: 5px solid #00f5ff, snap instantly */}
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-[5px] h-[5px] bg-[#00f5ff] rounded-full pointer-events-none z-[10000]" 
        style={{ boxShadow: '0 0 10px #00f5ff' }}
      />
      
      {/* Outer Ring: 36px, border 1.5px #00f5ff, 80ms lerp */}
      <motion.div 
        ref={ringRef} 
        className="fixed top-0 left-0 rounded-full border-[1.5px] border-[#00f5ff] pointer-events-none z-[9999] flex items-center justify-center"
        animate={{
          width: isHovering ? 52 : 36,
          height: isHovering ? 52 : 36,
          backgroundColor: isHovering ? 'rgba(0,245,255,0.1)' : 'rgba(0,245,255,0)',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      />

      {/* Burst Ripple */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="fixed pointer-events-none z-[9998] border-2 border-[#00f5ff] rounded-full w-10 h-10"
            style={{ left: ripple.x - 20, top: ripple.y - 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
