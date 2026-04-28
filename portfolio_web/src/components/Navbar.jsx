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
          className="group flex items-center gap-1.5"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center">
            <span className="font-display font-black text-2xl tracking-tighter text-white">
              NK
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] mx-1 mt-2 shadow-[0_0_8px_#00F5FF]" />
            <span className="font-display font-medium text-2xl tracking-tighter text-white/70 group-hover:text-white transition-colors">
              dev
            </span>
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
