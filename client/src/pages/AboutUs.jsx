import React, { useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

const TEAM = [
  {
    name: 'Saketh Goljana',
    role: 'Lead AI Engineer',
    bio: 'Architect of the FarmShield core models. PhD in Computer Vision.',
    img: '/images/saketh.jpeg',
    resume: '/resumes/saketh_resume.pdf'
  },
  {
    name: 'David Chen',
    role: 'Full Stack Developer',
    bio: 'Bridging the backend neural nets with high-fidelity React interfaces.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    resume: '/resumes/david_resume.pdf'
  },
  {
    name: 'Hemanth Kuppili',
    role: 'Agronomy Specialist',
    bio: 'Ensuring our ML matches real-world Indian agricultural standards.',
    img: '/images/hemanth.jpeg',
    resume: '/resumes/hemanth_resume.pdf'
  },
  {
    name: 'Elena Rodriguez',
    role: 'UI/UX Designer',
    bio: 'Crafting pixel-perfect, accessible agricultural interfaces.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=250&fit=crop',
    resume: '/resumes/elena_resume.pdf'
  },
  {
    name: 'Marcus Johnson',
    role: 'Backend Systems',
    bio: 'Scaling the Node and Python endpoints to handle thousands of scans.',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=450&fit=crop',
    resume: '/resumes/marcus_resume.pdf'
  },
  {
    name: 'Priya Sharma',
    role: 'Data Scientist',
    bio: 'Optimizing and augmenting our 70+ disease datasets for zero bias.',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
    resume: '/resumes/priya_resume.pdf'
  }
];

export default function AboutUs() {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      await axios.post(`${apiUrl}/api/contact`, formData);
      setStatus({ type: 'success', text: 'Thank you! Your message has been sent successfully.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', text: 'Failed to send message. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="km-grid-bg" style={{ minHeight: 'calc(100vh - 64px)', padding: '60px 24px', overflowX: 'hidden' }}>

      {/* Header Section */}
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', marginBottom: 80 }}>
        <h1 className="km-fade-in" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.02em' }}>
          {lang === 'en' ? 'Meet the ' : ''}
          <span className="km-gradient-text" style={{ paddingBottom: 10, display: 'inline-block' }}>
            {lang === 'en' ? 'Innovators' : t('nav.aboutUs')}
          </span>
        </h1>
        <p className="km-fade-in" style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: 700, margin: '0 auto', lineHeight: 1.6, animationDelay: '0.1s' }}>
          We are a team of passionate engineers, designers, and agricultural experts dedicated to democratizing AI for farmers worldwide.
        </p>
      </div>

      {/* Unique Creative Team Grid: Pinterest Masonry Layout */}
      <div style={{ maxWidth: 1200, margin: '0 auto', columns: '3 300px', columnGap: 32, paddingBottom: 50, marginBottom: 60 }}>
        {TEAM.map((member, i) => (
          <div key={i} className="cyber-card km-fade-in" style={{
            display: 'flex', flexDirection: 'column', textAlign: 'left',
            animationDelay: `${0.1 * i + 0.2}s`,
            marginBottom: 32, breakInside: 'avoid',
            boxShadow: '0 15px 35px rgba(0,0,0,0.15)', overflow: 'hidden'
          }}>
            {/* Pinterest Style Bleed Image Container */}
            <div style={{ width: '100%', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <img src={member.img} alt={member.name} style={{
                width: '100%', display: 'block',
                objectFit: 'cover',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>

            <div style={{ padding: 24 }}>
              <h3 className="cyber-text-glow" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>{member.name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>{member.role}</p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 24, flex: 1, fontSize: '0.95rem' }}>{member.bio}</p>

              {/* Resume Button mapped to member.resume */}
              <a
                href={member.resume || '#'}
                download
                className="cyber-btn"
                style={{ width: '100%', padding: '12px', textAlign: 'center', fontSize: '0.85rem', letterSpacing: '1px', textDecoration: 'none', display: 'block' }}
              >
                Download Resume
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px' }}>
        <div className="cyber-card km-fade-in" style={{ padding: '40px clamp(20px, 5vw, 60px)', animationDelay: '0.8s' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: 10 }}>Get in Touch</h2>
            <p style={{ color: 'var(--text-muted)' }}>Have a question or want to collaborate? Send us a message.</p>
          </div>

          {status && (
            <div style={{
              padding: 16, borderRadius: 12, marginBottom: 24,
              background: status.type === 'success' ? 'var(--accent-glow)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${status.type === 'success' ? 'var(--border-strong)' : 'rgba(239, 68, 68, 0.3)'}`,
              color: status.type === 'success' ? 'var(--accent)' : '#ef4444',
              fontWeight: 600, textAlign: 'center'
            }}>
              {status.text}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              <div>
                <label className="km-label">Full Name</label>
                <input type="text" className="km-input" placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div>
                <label className="km-label">Email Address</label>
                <input type="email" className="km-input" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
              </div>
            </div>

            <div>
              <label className="km-label">Message</label>
              <textarea
                className="km-input"
                rows="5"
                placeholder="How can we help you?"
                style={{ resize: 'vertical' }}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="cyber-btn" disabled={loading} style={{ height: 56, fontSize: '1.1rem', marginTop: 10 }}>
              {loading ? 'Sending...' : 'Send Message 🚀'}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
