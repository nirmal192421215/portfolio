import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

/* ── IST Availability Status ────────────────────────── */
const AvailabilityBadge = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      // Convert to IST (UTC+5:30)
      const istOffset = 5 * 60 + 30;
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const ist = new Date(utc + istOffset * 60000);
      const hour = ist.getHours();
      setStatus(hour >= 8 && hour < 22 ? 'online' : 'away');
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, []);

  if (!status) return null;
  const isOnline = status === 'online';

  return (
    <motion.div
      className="inline-flex items-center gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[10px] sm:text-xs"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: isOnline ? 'rgba(0,255,136,0.08)' : 'rgba(124,58,237,0.1)',
        border: `1px solid ${isOnline ? 'rgba(0,255,136,0.25)' : 'rgba(124,58,237,0.3)'}`,
        color: isOnline ? '#00FF88' : '#A78BFA',
      }}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{
          background: isOnline ? '#00FF88' : '#A78BFA',
          boxShadow: `0 0 8px ${isOnline ? '#00FF88' : '#A78BFA'}`,
          animation: isOnline ? 'pulse-dot 1.5s infinite' : 'none',
        }}
      />
      {isOnline ? '🟢 Available Now · IST' : '🌙 Offline · Back Tomorrow'}
    </motion.div>
  );
};

/* ── Location Radar ─────────────────────────────────── */
const RadarPing = () => (
  <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
    {[0, 1, 2].map(i => (
      <motion.div
        key={i}
        className="absolute rounded-full border"
        style={{ borderColor: 'rgba(0,245,255,0.4)' }}
        initial={{ width: 8, height: 8, opacity: 0.9 }}
        animate={{ width: 48, height: 48, opacity: 0 }}
        transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }}
      />
    ))}
    <div
      className="w-2.5 h-2.5 rounded-full z-10 relative"
      style={{ background: '#00F5FF', boxShadow: '0 0 10px #00F5FF' }}
    />
  </div>
);

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/nirmal192421215',
    color: '#E2E8F0',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'Email',
    url: 'mailto:nirmalkumar00727@gmail.com',
    color: '#00F5FF',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/nirmalkumar-n/',
    color: '#0A66C2',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/919342626096',
    color: '#25D366',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

const validate = {
  name:    (v) => v.trim().length >= 2,
  email:   (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  message: (v) => v.trim().length >= 10,
};

const Field = ({ label, name, type = 'text', rows, value, onChange, touched }) => {
  const isValid   = touched && validate[name]?.(value);
  const isInvalid = touched && !validate[name]?.(value);
  const Tag = rows ? 'textarea' : 'input';

  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-widest mb-2"
        style={{ color: 'rgba(255,255,255,0.45)' }}>
        {label}
      </label>
      <Tag
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={name === 'name' ? 'John Doe' : name === 'email' ? 'you@example.com' : 'Tell me about your project…'}
        className={`form-input w-full px-4 py-3 rounded-xl text-sm ${
          isValid ? 'valid' : isInvalid ? 'invalid' : ''
        } ${rows ? 'resize-none' : ''}`}
      />
      {isInvalid && (
        <p className="font-mono text-[11px] mt-1.5" style={{ color: 'rgba(255,45,107,0.8)' }}>
          {name === 'name' ? 'At least 2 characters' : name === 'email' ? 'Enter a valid email' : 'At least 10 characters'}
        </p>
      )}
    </div>
  );
};

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Contact = () => {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    emailjs.init('Pa3KjH-MhypG5_676');
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!validate.name(form.name) || !validate.email(form.email) || !validate.message(form.message)) return;
    setSending(true);

    const payload = {
      service_id: 'service_5g9q80l',
      template_id: 'template_zoypfo6',
      user_id: 'Pa3KjH-MhypG5_676',
      template_params: {
        name: form.name,
        email: form.email,
        message: form.message
      }
    };

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        if (res.ok) {
          console.log('Email sent successfully!');
          setSending(false);
          setSent(true);
          setForm({ name: '', email: '', message: '' });
        } else {
          const errText = await res.text();
          throw new Error(errText);
        }
      })
      .catch((error) => {
        setSending(false);
        console.error('EmailJS Direct Error:', error.message);
        alert(`Failed to send: ${error.message}`);
      });
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-32 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-56 opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #00F5FF, transparent)' }} />

      <div className="section-container">
        <motion.div className="flex items-center gap-3 mb-4"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="font-mono text-sm" style={{ color: '#00F5FF' }}>05.</span>
          <span className="font-mono text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>Contact</span>
        </motion.div>

        <motion.h2
          className="font-display font-black text-white mb-3 leading-tight"
          style={{ fontSize: 'clamp(1.8rem, 7vw, 3rem)' }}
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Let's <span className="neon-text">Connect</span>
        </motion.h2>
        <motion.p className="mb-6 max-w-md" style={{ color: 'rgba(255,255,255,0.45)' }}
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Got a project, an opportunity, or just want to chat? My inbox is always open.
        </motion.p>

        {/* Live Availability Badge */}
        <motion.div className="mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <AvailabilityBadge />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* LEFT */}
          <div>
            {/* Email */}
            <motion.div className="glass-card gradient-border rounded-2xl p-5 mb-4"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Email</p>
              <a href="mailto:nirmalkumar00727@gmail.com"
                className="font-semibold hover:underline break-all text-sm sm:text-base"
                style={{ color: '#00F5FF' }}>
                nirmalkumar00727@gmail.com
              </a>
            </motion.div>

            {/* Location with radar */}
            <motion.div className="glass-card gradient-border rounded-2xl p-5 mb-4"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>Location</p>
              <div className="flex items-center gap-4">
                <RadarPing />
                <div>
                  <p className="font-semibold text-white">Chennai, Tamil Nadu</p>
                  <p className="font-mono text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>India 🇮🇳 · IST (UTC+5:30)</p>
                </div>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div className="glass-card gradient-border rounded-2xl p-5 mb-6"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Phone / WhatsApp</p>
              <a href="tel:+919342626096" className="font-semibold hover:underline text-sm sm:text-base" style={{ color: '#7C3AED' }}>
                +91 93426 26096
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div className="flex flex-wrap gap-3"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {socials.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target={s.name !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  title={s.name}
                  className="w-12 h-12 glass rounded-xl flex items-center justify-center"
                  style={{ color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.09)' }}
                  whileHover={{
                    scale: 1.15, y: -4,
                    color: s.color,
                    borderColor: `${s.color}50`,
                    boxShadow: `0 0 20px ${s.color}30`,
                  }}
                  whileTap={{ scale: 0.93 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT – form */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {sent ? (
              <motion.div
                className="glass-card gradient-border rounded-2xl p-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="font-display font-bold text-white text-xl mb-2">Message Sent!</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Thanks for reaching out. I'll get back to you soon.</p>
                <button onClick={() => setSent(false)} className="mt-6 font-mono text-sm" style={{ color: '#00F5FF' }}>
                  Send another →
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="glass-card gradient-border rounded-2xl p-6 sm:p-8 space-y-5" noValidate>
                <Field label="Your Name"  name="name"    value={form.name}    onChange={handleChange} touched={touched.name} />
                <Field label="Email"      name="email"   type="email" value={form.email}   onChange={handleChange} touched={touched.email} />
                <Field label="Message"    name="message" rows={5}     value={form.message} onChange={handleChange} touched={touched.message} />
                <motion.button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full py-3.5 rounded-xl text-white font-semibold text-sm relative z-10 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative z-10">{sending ? '✨ Sending…' : '🚀 Send Message'}</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
