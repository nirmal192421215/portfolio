import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

/* ── Animated counter ──────────────────────────────────── */
const Counter = ({ to, suffix = '', label }) => {
  const ref = useRef(null);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(to / 60);
    const timer = setInterval(() => {
      start = Math.min(start + step, to);
      if (ref.current) ref.current.textContent = start + suffix;
      if (start >= to) clearInterval(timer);
    }, 24);
    return () => clearInterval(timer);
  }, [to, suffix]);

  return (
    <div className="flex flex-col items-center gap-1">
      <span
        ref={ref}
        className="font-display font-black neon-text leading-none"
        style={{ fontSize: 'clamp(1.3rem, 5vw, 2.4rem)' }}
      >
        0{suffix}
      </span>
      <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-widest text-center" style={{ color: 'rgba(255,255,255,0.35)' }}>
        {label}
      </span>
    </div>
  );
};

/* ── Clean Name ────────────────────────────────────────── */
const HeroName = () => (
  <span className="neon-text">Nirmal kumar N</span>
);

/* ── Floating gradient orb ─────────────────────────────── */
const HeroOrb = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Primary orb behind headline */}
    <motion.div
      className="absolute rounded-full blur-[120px]"
      style={{
        width: 600, height: 600,
        left: '50%', top: '40%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(0,245,255,0.08) 0%, rgba(124,58,237,0.06) 50%, transparent 70%)',
      }}
      animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Secondary accent orb */}
    <motion.div
      className="absolute rounded-full blur-[90px]"
      style={{
        width: 300, height: 300,
        right: '10%', bottom: '20%',
        background: 'radial-gradient(circle, rgba(255,45,107,0.06), transparent 70%)',
      }}
      animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
    />
  </div>
);

const Hero = () => {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-12 sm:pt-0 sm:pb-0">
      <HeroOrb />

      <div className="relative z-10 section-container text-center px-4 flex flex-col items-center justify-center flex-1 w-full">
        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2 glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[8px] sm:text-xs mb-8 sm:mb-10 max-w-full"
          style={{ color: 'rgba(255,255,255,0.55)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="truncate">Available for opportunities · Chennai, India</span>
        </motion.div>

        {/* Headline with glitch */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="font-display font-black leading-[1.05] mb-3 sm:mb-4 px-2"
            style={{ fontSize: 'clamp(2rem, 9vw, 6rem)' }}
          >
            <span className="text-white">Hi, I'm </span>
            <br className="sm:hidden" />
            <HeroName />
          </h1>
          <div
            className="font-display font-bold mb-4 sm:mb-6 flex items-center justify-center text-center px-4 w-full"
            style={{ fontSize: 'clamp(1rem, 5vw, 2.2rem)', minHeight: '2.2rem', color: 'rgba(255,255,255,0.85)' }}
          >
            <TypeAnimation
              sequence={[
                'Full Stack Dev', 2000,
                'AI integrated web application', 2000,
                'Real-time Systems', 2000,
                'Problem Solver', 2000,
              ]}
              wrapper="span"
              repeat={Infinity}
              className="cyan-text text-glow-cyan"
            />
          </div>
        </motion.div>

        {/* Sub */}
        <motion.p
          className="max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4 text-center text-sm sm:text-base"
          style={{ color: 'rgba(255,255,255,0.48)', fontSize: 'clamp(0.88rem, 2.5vw, 1.05rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          B.Tech IT student from SIMATS Engineering building intelligent applications — from AI wellness systems to gamified learning platforms, powered by React, Node.js, Python, and Java.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 w-full px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.92 }}
        >
          <motion.button
            onClick={() => go('projects')}
            className="btn-primary w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-white text-sm relative z-10 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Projects <span>→</span>
            </span>
          </motion.button>
          <motion.button
            onClick={() => go('contact')}
            className="btn-outline w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-white/80 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            Contact Me
          </motion.button>
          <motion.a
            href="/resume.pdf"
            download
            className="btn-ghost w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-white/80 text-sm flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            Resume ↓
          </motion.a>
        </motion.div>

        {/* ── Animated Stats ── */}
        <motion.div
          className="grid grid-cols-3 gap-4 sm:flex sm:items-center sm:justify-center sm:gap-16 px-4 sm:px-4 mt-8 mb-4 w-full max-w-xs sm:max-w-none mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex flex-col items-center">
            <Counter to={2} suffix="+" label="Projects" />
          </div>
          <div className="hidden sm:block w-px h-10 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="flex flex-col items-center">
            <Counter to={5} label="Certs" />
          </div>
          <div className="hidden sm:block w-px h-10 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="flex flex-col items-center">
            <Counter to={2026} label="Since" />
          </div>
        </motion.div>

        {/* Scroll indicator - desktop only */}
        <motion.div
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
          style={{ color: 'rgba(255,255,255,0.25)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase">scroll</span>
          <motion.div
            className="w-px h-9 rounded-full"
            style={{ background: 'linear-gradient(to bottom, #00F5FF, transparent)' }}
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
