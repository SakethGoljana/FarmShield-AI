import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function RatingFeedback({ feature }) {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [status, setStatus] = useState(null); // 'idle', 'submitting', 'success', 'error'
  
  const handleRating = (value) => {
    setRating(value);
  };

  const submitFeedback = async (e) => {
    if (e) e.preventDefault();
    setStatus('submitting');
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      await axios.post(`${apiUrl}/api/feedback`, {
        feature,
        rating,
        feedbackText,
        userId: currentUser?.uid || 'anonymous'
      });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="km-card km-fade-in" style={{ padding: 24, textAlign: 'center', marginTop: 32, background: 'var(--surface)' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: 8 }}>✅ Thank you!</p>
        <p style={{ color: 'var(--text-muted)' }}>Your feedback helps us safely calibrate the FarmShield AI engine.</p>
      </div>
    );
  }

  return (
    <div className="km-card km-fade-in" style={{ padding: 32, marginTop: 40, borderTop: '4px solid var(--accent)' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>How accurate was this result?</h3>
      
      {/* Stars UI */}
      <div style={{ display: 'flex', gap: 8, marginBottom: rating <= 2 && rating > 0 ? 20 : 0 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button 
            key={star}
            type="button"
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '2rem', padding: 0,
              color: (hoverRating || rating) >= star ? '#fbbf24' : 'var(--border)',
              transition: 'color 0.2s, transform 0.2s',
              transform: hoverRating === star ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            ★
          </button>
        ))}
      </div>

      {rating > 2 && status !== 'submitting' && (
        <button className="km-btn km-fade-in" onClick={submitFeedback} style={{ marginTop: 20, padding: '10px 24px' }}>
          Submit Rating
        </button>
      )}

      {/* Conditional Feedback form for low rating (<= 2.5 means 1 or 2 stars) */}
      {rating > 0 && rating <= 2 && (
        <form onSubmit={submitFeedback} className="km-fade-in" style={{ display: 'grid', gap: 16 }}>
          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '8px 0' }} />
          <div>
            <label className="km-label" style={{ color: '#ef4444' }}>We're sorry the result wasn't helpful. What went wrong?</label>
            <textarea 
              className="km-input" 
              rows="3" 
              placeholder="e.g. The predicted disease doesn't match the image, or the suggested crop is totally wrong for my region..." 
              value={feedbackText}
              onChange={e => setFeedbackText(e.target.value)}
              required
              style={{ resize: 'vertical' }}
            />
          </div>
          
          {status === 'error' && <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>Network error. Please try again.</p>}
          
          <button type="submit" disabled={status === 'submitting'} className="km-btn" style={{ padding: '12px 24px' }}>
            {status === 'submitting' ? 'Submitting...' : 'Send Feedback'}
          </button>
        </form>
      )}
    </div>
  );
}
