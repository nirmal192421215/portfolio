import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Motion values for smooth physics-based movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the outer rings to create a "lag" effect
  const ring1X = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ring1Y = useSpring(mouseY, { stiffness: 150, damping: 20 });
  
  const ring2X = useSpring(mouseX, { stiffness: 80, damping: 15 });
  const ring2Y = useSpring(mouseY, { stiffness: 80, damping: 15 });

  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const onClick = (e) => {
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 1000);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('click', onClick);

    const handleHoverEnter = () => setIsHovering(true);
    const handleHoverLeave = () => setIsHovering(false);

    const updateInteractives = () => {
      const interactives = document.querySelectorAll('a, button, [data-cursor], .glass-card, .hex');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverEnter);
        el.addEventListener('mouseleave', handleHoverLeave);
      });
    };
    updateInteractives();

    const observer = new MutationObserver(updateInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('click', onClick);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000]">
      {/* ── Ring 2: Distant lag trail ── */}
      <motion.div
        className="absolute top-0 left-0 w-12 h-12 rounded-full border border-violet-500/20"
        style={{
          x: ring2X,
          y: ring2Y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isClicking ? 0 : 1,
        }}
      />

      {/* ── Ring 1: Main trailing ring ── */}
      <motion.div
        className="absolute top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/40 shadow-[0_0_15px_rgba(0,245,255,0.15)]"
        style={{
          x: ring1X,
          y: ring1Y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          width: isHovering ? 60 : 32,
          height: isHovering ? 60 : 32,
          borderColor: isHovering ? 'rgba(124, 58, 237, 0.5)' : 'rgba(0, 245, 255, 0.4)',
          backgroundColor: isHovering ? 'rgba(124, 58, 237, 0.05)' : 'rgba(0, 245, 255, 0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />

      {/* ── Core Dot ── */}
      <motion.div
        className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full z-50"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          background: isHovering ? '#FF2D6B' : '#00F5FF',
          boxShadow: isHovering 
            ? '0 0 15px #FF2D6B, 0 0 30px #FF2D6B' 
            : '0 0 15px #00F5FF, 0 0 30px #00F5FF',
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 1.5 : 1,
        }}
      />

      {/* ── Click Ripples ── */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 6, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 w-4 h-4 rounded-full border border-cyan-400 shadow-[0_0_20px_#00F5FF]"
            style={{ 
              left: ripple.x, 
              top: ripple.y,
              translateX: '-50%',
              translateY: '-50%',
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
      
      {/* ── Subtle Glitch Lines on Hover ── */}
      {isHovering && (
        <motion.div
          className="absolute w-px h-10 bg-cyan-400/30"
          style={{ x: mouseX, y: mouseY, translateX: 30, translateY: -20 }}
          animate={{ height: [0, 20, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        />
      )}
    </div>
  );
};

export default CustomCursor;

