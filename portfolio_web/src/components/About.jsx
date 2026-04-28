import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/* ── Count-up hook ─────────────────────────────────────────── */
const useCountUp = (target, duration = 1500) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const num = parseInt(target, 10);
        if (isNaN(num)) { setValue(target); return; }
        let start = 0;
        const step = Math.ceil(num / (duration / 16));
        const id = setInterval(() => {
          start += step;
          if (start >= num) { clearInterval(id); setValue(num); }
          else setValue(start);
        }, 16);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return { value, ref };
};

/* ── 3D Tilt card ──────────────────────────────────────────── */
const TiltCard = ({ children }) => {
  const cardRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy = (e.clientY - rect.top)  / rect.height - 0.5;
    rx.set(cy * -14);
    ry.set(cx * 14);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

/* ── Stats ─────────────────────────────────────────────────── */
const stats = [
  { raw: '2',  suffix: '+', label: 'Hackathons' },
  { raw: '5',  suffix: '+', label: 'Projects Built' },
  { raw: '4',  suffix: '+', label: 'Certifications' },
  { raw: '3',  suffix: '+', label: 'AI Integrations' },
];

/* ── Timeline ──────────────────────────────────────────────── */
const timeline = [
  { year: '2024', event: 'Started B.Tech IT',        detail: 'Began journey at SIMATS Engineering, Thandalam.' },
  { year: '2025', event: 'Mastering Java',           detail: 'Started deep dive into Java and backend logic (Sep 2025).' },
  { year: '2026', event: 'Built Krythion',            detail: 'Launched gamified AI learning platform (Jan 2026).' },
  { year: '2026', event: 'Built MindMeter',           detail: 'Developed AI cognitive wellness system (Mar 2026).' },
  { year: '2026', event: 'Hackathon Streak',         detail: 'Participated in 1st and 2nd major hackathons.' },
  { year: '2028', event: 'Engineering Graduate',     detail: 'Ready to innovate the tech world (Estimated Graduation).' },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ── Stat item with count-up ───────────────────────────────── */
const StatItem = ({ stat, index }) => {
  const { value, ref } = useCountUp(stat.raw);
  return (
    <motion.div
      ref={ref}
      className="glass-card gradient-border rounded-2xl p-6 text-center"
      variants={fadeUp}
      custom={index * 0.15}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ scale: 1.04 }}
    >
      <div className="font-display font-black neon-text mb-1"
        style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
        {stat.raw === '∞' ? '∞' : value}{stat.suffix}
      </div>
      <div className="font-mono text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {stat.label}
      </div>
    </motion.div>
  );
};

/* ── About ─────────────────────────────────────────────────── */
const About = () => {
  const timelineRef = useRef(null);

  return (
    <section id="about" className="py-20 lg:py-32 relative">
      {/* bg glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />

      <div className="section-container">
        {/* Label */}
        <motion.div className="flex items-center gap-3 mb-4"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="font-mono text-sm" style={{ color: '#00F5FF' }}>01.</span>
          <span className="font-mono text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>About Me</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT */}
          <div>
            <motion.h2
              className="font-display font-black text-white mb-6 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              A builder who loves{' '}
              <span className="neon-text">turning ideas into reality</span>
            </motion.h2>

            <div className="space-y-4 mb-12">
              {[
                "I'm Nirmal Kumar N, a B.Tech Information Technology student from SIMATS Engineering, Thandalam. Coming from Chennai, I'm passionate about the intersection of AI and real-world problem solving.",
                "I started my engineering journey in 2024. In September 2025, I began mastering Java, which evolved into building comprehensive systems like MindMeter and Krythion in early 2026.",
                "I actively participate in hackathons to ship fast and stay sharp, constantly learning new tools and frameworks to solve complex challenges.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp} custom={i * 0.4}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Timeline */}
            <motion.h3
              className="font-display font-bold text-white text-lg mb-6"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              Journey So Far
            </motion.h3>

            <div ref={timelineRef} className="relative ml-2 space-y-8">
              {/* Animated connector line */}
              <motion.div
                className="absolute left-0 top-0 w-px"
                style={{
                  background: 'linear-gradient(to bottom, #00F5FF, #7C3AED, rgba(255,45,107,0))',
                  originY: 0,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: 'easeOut' }}
              />

              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  className="relative pl-8"
                  variants={fadeUp} custom={i * 0.15}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-[-4px] top-1.5 w-2.5 h-2.5 rounded-full"
                    style={{
                      background: '#00F5FF',
                      boxShadow: '0 0 12px #00F5FF, 0 0 24px rgba(0,245,255,0.4)',
                    }}
                  />
                  <div className="font-mono text-xs mb-1" style={{ color: '#00F5FF' }}>{item.year}</div>
                  <div className="font-semibold text-white text-sm mb-1">{item.event}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.detail}</div>
                </motion.div>
              ))}
            </div>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2 mt-10"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              {[
                { icon: '📍', label: 'Chennai, India' },
                { icon: '🎓', label: 'SIMATS Engineering' },
                { icon: '🤖', label: 'AI Enthusiast' },
                { icon: '⚡', label: 'Java Developer' },
              ].map((tag) => (
                <span
                  key={tag.label}
                  className="glass flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  {tag.icon} {tag.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT */}
          <div className="space-y-5 lg:sticky lg:top-28">
            {/* Stats grid with count-up */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <StatItem key={stat.label} stat={stat} index={i} />
              ))}
            </div>

            {/* 3D tilt bio card */}
            <TiltCard>
              <div
                className="glass-card gradient-border rounded-2xl p-6"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))' }}
                  >
                    🧠
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Continuous Learner</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Learning by shipping — from 2024 till 2028, my focus is on mastering AI and full-stack development.
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Second tilt card */}
            <TiltCard>
              <div className="glass-card gradient-border rounded-2xl p-6" style={{ transformStyle: 'preserve-3d' }}>
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(255,45,107,0.15), rgba(124,58,237,0.15))' }}
                  >
                    🚀
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Impact Driven</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Built MindMeter and Krythion in 2026 to solve real-world cognitive and educational challenges.
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
