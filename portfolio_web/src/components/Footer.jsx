import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/[0.06] py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <motion.button
              onClick={scrollToTop}
              className="font-display font-black text-xl tracking-tight"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="neon-text">NK</span>
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>.</span>
              <span className="text-white/80">dev</span>
            </motion.button>
            <p className="text-xs font-mono tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Built with Passion in Chennai
            </p>
          </div>

          {/* Copyright & Info */}
          <div className="flex flex-col items-center gap-1">
            <p className="text-[11px] font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
              © {new Date().getFullYear()} Nirmal Kumar N
            </p>
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)' }} />
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-8">
            {[
              { label: 'GitHub', url: 'https://github.com/nirmal192421215' },
              { label: 'LinkedIn', url: 'https://www.linkedin.com/in/nirmalkumar-n/' },
              { label: 'Resume', url: '/resume.pdf' },
              { label: 'Contact', url: 'mailto:nirmalkumar00727@gmail.com' }
            ].map((link) => {
              const isMail = link.url.startsWith('mailto:');
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noopener noreferrer"}
                  className="group relative text-xs font-mono tracking-widest uppercase transition-all duration-300"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  <span className="group-hover:text-white transition-colors duration-300">
                    {link.label}
                  </span>
                  <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#00F5FF] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#00F5FF]" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
