import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home',    href: '#hero' },
  { label: 'About',   href: '#about' },
  { label: 'Skills',  href: '#skills' },
  { label: 'Projects',href: '#projects' },
  { label: 'Certs',   href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState('hero');
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const sections = ['hero','about','skills','projects','certifications','contact'];
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href) => {
    setMenuOpen(false);
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/[0.06] py-3' : 'py-5 bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => go('#hero')}
          className="flex items-center gap-3 glass px-4 py-2 rounded-xl border border-white/10"
          whileHover={{ scale: 1.05, border: '1px solid rgba(0,245,255,0.3)' }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]">
              {/* Animated Hexagon Border */}
              <motion.polygon
                points="20,2 37,11 37,29 20,38 3,29 3,11"
                fill="none"
                stroke="rgba(0,245,255,0.3)"
                strokeWidth="1.5"
              />
              <motion.polygon
                points="20,2 37,11 37,29 20,38 3,29 3,11"
                fill="none"
                stroke="url(#logoGrad)"
                strokeWidth="2"
                strokeDasharray="100"
                animate={{ strokeDashoffset: [200, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              
              {/* NK Letters with Network Nodes */}
              <g stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M11 29 L11 11 L21 29 L21 11" />
                <path d="M28 29 L28 11 M28 20 L33 11 M28 20 L33 29" />
                {/* Joints/Nodes */}
                <circle cx="11" cy="11" r="1.5" fill="#00F5FF" stroke="none" />
                <circle cx="11" cy="29" r="1.5" fill="#00F5FF" stroke="none" />
                <circle cx="21" cy="11" r="1.5" fill="#00F5FF" stroke="none" />
                <circle cx="21" cy="29" r="1.5" fill="#00F5FF" stroke="none" />
                <circle cx="28" cy="11" r="1.5" fill="#00F5FF" stroke="none" />
                <circle cx="28" cy="29" r="1.5" fill="#00F5FF" stroke="none" />
                <circle cx="33" cy="11" r="1.5" fill="#00F5FF" stroke="none" />
                <circle cx="33" cy="29" r="1.5" fill="#00F5FF" stroke="none" />
              </g>

              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stopColor="#00F5FF" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="font-display font-black text-xl tracking-tighter text-white">
              NK<span className="text-[#00F5FF]">.</span>
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">Systems</span>
          </div>
        </motion.button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = active === id;
            return (
              <button
                key={link.label}
                onClick={() => go(link.href)}
                className={`nav-link relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                  isActive ? 'text-[#00F5FF] active' : 'text-white/50 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.15)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 38 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
                {isActive && <span className="nav-active-dot" />}
              </button>
            );
          })}
          <motion.a
            href="/resume.pdf"
            download
            className="btn-primary ml-3 flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white relative z-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Resume ↓</span>
          </motion.a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden relative z-[70] p-2 text-white/70 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-[5px]">
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} className="block w-6 h-0.5 bg-current origin-center" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }} className="block w-6 h-0.5 bg-current" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} className="block w-6 h-0.5 bg-current origin-center" />
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-60 md:hidden flex flex-col items-center justify-center gap-6"
            style={{ background: 'rgba(5,5,16,0.97)', backdropFilter: 'blur(24px)' }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => go(link.href)}
                className={`text-3xl font-display font-bold ${
                  active === link.href.replace('#','') ? 'neon-text' : 'text-white/60'
                }`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              href="/resume.pdf" download
              className="btn-primary mt-2 px-8 py-3 rounded-full text-white font-bold relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <span className="relative z-10">Resume ↓</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
