import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const pathRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="loading-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Animated background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,245,255,0.06) 0%, transparent 70%)',
          }}
        />

        {/* SVG Logo with stroke draw animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hex background */}
            <motion.polygon
              points="40,4 74,22 74,58 40,76 6,58 6,22"
              stroke="url(#grad)"
              strokeWidth="2"
              fill="rgba(0,245,255,0.05)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
            {/* N letter strokes */}
            <motion.path
              d="M26 54 L26 26 L54 54 L54 26"
              stroke="url(#grad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.4 }}
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00F5FF" />
                <stop offset="50%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#FF2D6B" />
              </linearGradient>
            </defs>
          </svg>

          {/* Outer ring pulse */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '1px solid rgba(0,245,255,0.2)' }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center"
        >
          <p
            className="font-mono text-xs tracking-[0.3em] uppercase mb-2"
            style={{ color: 'rgba(0,245,255,0.6)' }}
          >
            Loading Portfolio
          </p>
          <h1 className="font-display text-2xl font-bold neon-text">
            Nirmal Kumar N
          </h1>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="mt-10 h-px rounded-full overflow-hidden"
          style={{ width: 180, background: 'rgba(255,255,255,0.08)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #00F5FF, #7C3AED)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.4, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
