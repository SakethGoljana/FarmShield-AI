import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import RatingFeedback from '../components/RatingFeedback';

const SUPPORTED_PLANTS = [
  'Apple', 'Bell_pepper', 'Blueberry', 'Cassava', 'Cherry', 'Coffee',
  'Corn', 'Grape', 'Orange', 'Peach', 'Potato', 'Raspberry',
  'Rice', 'Rose', 'Soybean', 'Squash', 'Strawberry', 'Sugarcane',
  'Tomato', 'Watermelon'
];

function Diagnose() {
  const { getToken } = useAuth();
  const { t, lang } = useLanguage();
  const [plantType, setPlantType] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [fallbackWarning, setFallbackWarning] = useState(null);

  // "Other" plant request
  const [isOther, setIsOther] = useState(false);
  const [otherName, setOtherName] = useState('');
  const [otherSubmitted, setOtherSubmitted] = useState(false);

  const handlePlantSelect = (value) => {
    if (value === 'other') {
      setIsOther(true);
      setPlantType('');
      setResult(null);
      setFallbackWarning(null);
    } else {
      setIsOther(false);
      setPlantType(value);
      setResult(null);
      setFallbackWarning(null);
      setOtherSubmitted(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setFallbackWarning(null);
    }
  };

  const handleUpload = async () => {
    if (!image || !plantType) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('plant_type', plantType);

    try {
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const res = await axios.post(`${apiUrl}/api/diagnosis/upload?lang=${lang}`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      
      const resultData = {
        ...res.data.data,
        confidence: res.data.data?.confidence ?? res.data.confidence
      };
      setResult(resultData);
      
      if (res.data.fallback_used) {
        setFallbackWarning(res.data.fallback_message);
      } else if (res.data.data?.low_confidence || res.data.data?.warning) {
        setFallbackWarning(res.data.data.warning || 'Low confidence — this crop may not be supported.');
      } else {
        setFallbackWarning(null);
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 503) {
         alert('🤖 System warming up! Please wait 20 seconds and try again.');
      } else {
         alert(err.response?.data?.message || 'Inference failed. Check backends.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtherSubmit = () => {
    if (!otherName.trim() || !image) return;
    setOtherSubmitted(true);
  };

  const getTranslatedPlantName = (plant) => {
    const translations = {
      'Apple': 'सेब', 'Bell_pepper': 'शिमला मिर्च', 'Blueberry': 'ब्लूबेरी',
      'Cassava': 'कसावा', 'Cherry': 'चेरी', 'Coffee': 'कॉफी', 'Corn': 'मक्का',
      'Grape': 'अंगूर', 'Orange': 'संतरा', 'Peach': 'आड़ू', 'Potato': 'आलू',
      'Raspberry': 'रसभरी', 'Rice': 'धान', 'Rose': 'गुलाब', 'Soybean': 'सोयाबीन',
      'Squash': 'स्क्वैश', 'Strawberry': 'स्ट्रॉबेरी', 'Sugarcane': 'गन्ना',
      'Tomato': 'टमाटर', 'Watermelon': 'तरबूज'
    };
    return lang === 'hi' ? translations[plant] || plant.replace(/_/g, ' ') : plant.replace(/_/g, ' ');
  };

  return (
    <div className="km-grid-bg" style={{ minHeight: 'calc(100vh - 64px)', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 40 }} className="km-fade-in">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
            {t('diagnose.title')}
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>{t('diagnose.subtitle')}</p>
        </div>

        {/* Step 1: Plant Selector */}
        <div className="km-card km-fade-in" style={{ padding: 32, marginBottom: 24 }}>
          <label className="km-label">{t('diagnose.step1')}</label>
          <div className="km-responsive-grid-130" style={{ marginTop: 12 }}>
            {SUPPORTED_PLANTS.map(plant => (
              <button
                key={plant}
                onClick={() => handlePlantSelect(plant)}
                style={{
                  padding: '10px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 600,
                  border: plantType === plant ? '2px solid var(--accent)' : '1px solid var(--border)',
                  background: plantType === plant ? 'var(--accent-glow)' : 'var(--surface)',
                  color: plantType === plant ? 'var(--accent)' : 'var(--text-muted)',
                  cursor: 'pointer', transition: 'all 0.2s',
                  textTransform: 'capitalize'
                }}
              >
                {getTranslatedPlantName(plant)}
              </button>
            ))}
            <button
              onClick={() => handlePlantSelect('other')}
              style={{
                padding: '10px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 600,
                border: isOther ? '2px solid #f59e0b' : '1px solid var(--border)',
                background: isOther ? 'rgba(245, 158, 11, 0.15)' : 'var(--surface)',
                color: isOther ? '#f59e0b' : 'var(--text-dim)',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              🌱 {t('diagnose.other')}
            </button>
          </div>
        </div>

        {/* "Other" Plant Request Flow */}
        {isOther && (
          <div className="km-card km-fade-in" style={{ padding: 32, marginBottom: 24, borderColor: 'rgba(245, 158, 11, 0.4)' }}>
            {otherSubmitted ? (
              <div style={{ textAlign: 'center', padding: 20 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📬</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>
                  {t('diagnose.otherSuccessTitle')}: "<span style={{ color: '#f59e0b' }}>{otherName}</span>"
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 500, margin: '0 auto' }}>
                  {t('diagnose.otherSuccessMsg1')} <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{otherName}</span> {t('diagnose.otherSuccessMsg2')}
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <span style={{ fontSize: 24 }}>🌱</span>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>{t('diagnose.otherTitle')}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {t('diagnose.otherDesc')}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: 16 }}>
                  <div>
                    <label className="km-label">{t('diagnose.otherPlantName')}</label>
                    <input
                      type="text"
                      className="km-input"
                      placeholder={t('diagnose.otherPlaceholder')}
                      value={otherName}
                      onChange={(e) => setOtherName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="km-label">{t('diagnose.step2')}</label>
                    <label style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      height: 160, border: '2px dashed var(--border)', borderRadius: 16,
                      cursor: 'pointer', background: 'var(--surface)', overflow: 'hidden'
                    }}>
                      {preview ? (
                        <img src={preview} alt="Preview" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ color: 'var(--text-dim)' }}>📸 {t('diagnose.uploadImg')}</span>
                      )}
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>

                  <button
                    onClick={handleOtherSubmit}
                    disabled={!otherName.trim() || !image}
                    className="km-btn"
                    style={{ background: '#f59e0b', height: 50 }}
                  >
                    {t('diagnose.otherSubmitBtn')}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 2: Image Upload (only for supported plants) */}
        {plantType && !isOther && (
          <div className="km-card km-fade-in" style={{ padding: 40, animationDelay: '0.1s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div className="km-badge">{t('diagnose.scanning')} {getTranslatedPlantName(plantType)}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', maxWidth: 500, position: 'relative' }}>
                <label className="km-scan" style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  width: '100%', border: '2px dashed var(--border)',
                  borderRadius: 24, cursor: 'pointer', background: 'var(--surface)',
                  overflow: 'hidden', transition: 'all 0.3s ease', position: 'relative'
                }}>
                  {preview ? (
                    <img src={preview} alt="Preview" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 48, marginBottom: 16 }}>📸</div>
                      <p style={{ fontWeight: 600, color: 'var(--text)' }}>{t('diagnose.uploadImg')}</p>
                    </div>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  
                  {loading && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexDirection: 'column', gap: 16, zIndex: 10
                    }}>
                      <div className="km-pulse" style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--accent)', opacity: 0.6 }} />
                      <span style={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>{t('diagnose.analyzing')}</span>
                    </div>
                  )}
                </label>
              </div>

              <button
                onClick={handleUpload}
                disabled={!image || loading}
                className="km-btn"
                style={{ marginTop: 32, width: '100%', maxWidth: 500, height: 56, fontSize: '1.1rem' }}
              >
                {loading ? t('diagnose.analyzing') : t('diagnose.button')}
              </button>

              {fallbackWarning && (
                <div style={{
                  marginTop: 24, width: '100%', maxWidth: 500,
                  padding: 16, borderRadius: 12, background: 'rgba(234, 179, 8, 0.1)',
                  borderLeft: '4px solid #eab308'
                }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <span>⚠️</span>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 500 }}>{fallbackWarning}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="km-fade-in" style={{ marginTop: 40, animationDelay: '0.2s' }}>
            <div className="km-card" style={{ padding: 32 }}>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 20,
                  background: result.isHealthy ? 'var(--accent-glow)' : 'rgba(239, 68, 68, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32, border: '1px solid var(--border)', flexShrink: 0
                }}>
                  {result.isHealthy ? '✅' : '🔴'}
                </div>
                
                <div style={{ flex: 1, minWidth: 260 }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>
                    {result.displayName}
                  </h3>
                  
                  {result.confidence != null && (
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span className="km-label" style={{ marginBottom: 0 }}>{t('diagnose.confidence')}</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)' }}>{Math.round(result.confidence * 100)}%</span>
                      </div>
                      <div className="km-progress-track">
                        <div className="km-progress-fill" style={{ width: `${Math.round(result.confidence * 100)}%` }} />
                      </div>
                    </div>
                  )}

                  <div style={{ padding: 20, borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 16, color: 'var(--text)', borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
                      {result.isHealthy ? t('diagnose.observationDetails') : t('diagnose.recommendedRemedies')}
                    </h4>
                    
                    <div style={{ display: 'grid', gap: 16 }}>
                      {result.remedySuggested?.map((rem, idx) => (
                        <div key={idx} style={{
                          display: 'flex', gap: 16, 
                          padding: '16px', background: 'var(--bg-card)',
                          borderRadius: 12, border: '1px solid var(--border)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                        }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: '50%',
                            background: 'var(--accent-glow)', color: 'var(--accent)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 800, fontSize: '0.85rem', flexShrink: 0
                          }}>
                            {idx + 1}
                          </div>
                          <p style={{ 
                            fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)', 
                            margin: 0, opacity: 0.9 
                          }}>
                            {rem}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Render Rating & Feedback post-result */}
            <RatingFeedback feature="Diagnosis" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Diagnose;
