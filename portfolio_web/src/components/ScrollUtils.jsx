import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Scroll Progress Bar ──────────────────────────────────────────────────────
export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
    />
  );
};

// ── Back to Top Button ───────────────────────────────────────────────────────
export const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setVisible(scrollTop > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="back-to-top relative group"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Progress Ring */}
          <svg className="absolute inset-0 rotate-[-90deg]" width="56" height="56">
            <circle
              cx="28" cy="28" r={radius}
              fill="transparent"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2.5"
            />
            <motion.circle
              cx="28" cy="28" r={radius}
              fill="transparent"
              stroke="#00F5FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress * circumference}
              style={{ filter: 'drop-shadow(0 0 5px #00F5FF)' }}
            />
          </svg>

          {/* Arrow */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-y-[-2px]"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </div>

          <style>{`
            .back-to-top {
              position: fixed;
              bottom: 2rem;
              right: 2rem;
              width: 56px;
              height: 56px;
              border-radius: 50%;
              background: rgba(10, 10, 26, 0.8);
              backdrop-filter: blur(12px);
              border: 1px solid rgba(255, 255, 255, 0.1);
              z-index: 50;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
          `}</style>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
