import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { currentUser, updateUserProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [fileToUpload, setFileToUpload] = useState(null);
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else {
      setDisplayName(currentUser.displayName || '');
      setPhotoURL(currentUser.photoURL || '');
    }
  }, [currentUser, navigate]);

  const compressImageToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 150; // VERY small to ensure it fits in Auth bounds!
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Return a highly compressed Base64 Data URI instead of a Blob
          resolve(canvas.toDataURL('image/jpeg', 0.6));
        };
      };
    });
  };

  const handleFileChange = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      
      // Compress and convert immediately to Base64 String
      const base64String = await compressImageToBase64(file);
      
      // Update preview immediately 
      setPhotoURL(base64String);
      setFileToUpload(base64String); // We hold the string, not a File object!
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      let finalPhotoURL = photoURL;

      if (photoURL && photoURL.startsWith('data:image')) {
        const token = await currentUser.getIdToken();
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/avatar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ base64Image: photoURL })
        });
        
        if (!res.ok) throw new Error('Failed to save avatar to cloud');
        
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        // Safety: if baseUrl is missing or localhost, and we're on a secure site, we might need a better fallback
        // but for now, we just ensure we use the environment variable.
        if (baseUrl) {
          finalPhotoURL = `${baseUrl}/api/auth/avatar/${currentUser.uid}?t=${Date.now()}`;
        }
      }

      await updateUserProfile({ displayName, photoURL: finalPhotoURL });
      
      setFileToUpload(null);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (!currentUser) return null;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }} className="km-fade-in">
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text)' }}>Account Settings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your personal profile and farm preferences</p>
      </div>

      <div className="km-card km-fade-in" style={{ padding: 40, position: 'relative' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40 }}>
          <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--surface)', border: '2px dashed var(--border)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {photoURL ? (
              <img src={photoURL} alt="Avatar Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(displayName || 'User') + '&background=0D8ABC&color=fff'; }} />
            ) : (
              <span style={{ fontSize: 40 }}>👤</span>
            )}
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>{displayName || 'Guest User'}</h2>
            <p style={{ color: 'var(--text-muted)', margin: '4px 0 0 0' }}>{currentUser.email || 'Anonymous Authentication'}</p>
          </div>
        </div>

        {error && <div style={{ background: '#fef2f2', color: '#ef4444', padding: 12, borderRadius: 8, marginBottom: 20, fontSize: '0.9rem', border: '1px solid #fecaca' }}>{error}</div>}
        {message && <div style={{ background: '#f0fdf4', color: '#16a34a', padding: 12, borderRadius: 8, marginBottom: 20, fontSize: '0.9rem', border: '1px solid #bbf7d0' }}>{message}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 24 }}>
          <div>
            <label className="km-label">Display Name</label>
            <input 
              type="text" 
              className="km-input" 
              value={displayName} 
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Ramesh Patel" 
            />
          </div>

          <div>
            <label className="km-label">Profile Image Updater</label>
            <input 
              type="file" 
              accept="image/*"
              className="km-input" 
              onChange={handleFileChange}
              style={{ paddingTop: 12 }}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 8 }}>Select a new image from your device to overwrite your avatar.</p>
          </div>

          <button type="submit" disabled={loading} className="km-btn" style={{ width: '100%', height: 50, fontSize: '1.1rem', marginTop: 16 }}>
            {loading ? 'Saving Changes...' : 'Save Profile Details'}
          </button>
        </form>

        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border)', textAlign: 'right' }}>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
            🚪 Sign Out of Account
          </button>
        </div>
      </div>
    </div>
  );
}
