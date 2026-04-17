import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import RatingFeedback from '../components/RatingFeedback';

function SoilAnalysis() {
  const { getToken } = useAuth();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({ N: '', P: '', K: '', ph: '', temperature: '', humidity: '', rainfall: '' });
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [fetchingLoc, setFetchingLoc] = useState(false);

  const fetchLocationData = () => {
    setFetchingLoc(true);
    if (!navigator.geolocation) { alert("Geolocation not supported"); setFetchingLoc(false); return; }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const res = await axios.get(`${apiUrl}/api/weather/current?lat=${latitude}&lon=${longitude}`);
        const w = res.data.data;
        setFormData(prev => ({ ...prev, temperature: w.temperature, humidity: w.humidity, rainfall: w.rainfall || 100 }));
        setReport(null);
      } catch { alert("Failed to fetch weather. Enter values manually."); }
      finally { setFetchingLoc(false); }
    }, () => { alert("Location denied."); setFetchingLoc(false); });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const res = await axios.post(`${apiUrl}/api/soil/analyze?lang=${lang}`, formData, {
        headers: { 'Authorization': token ? `Bearer ${token}` : '' }
      });
      setReport(res.data.data);
    } catch (error) {
      alert(error.response?.data?.message || 'Analysis failed. Make sure all backends are running.');
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (s) => s >= 70 ? '#22c55e' : s >= 40 ? '#f59e0b' : '#ef4444';
  const scoreLabel = (s) => {
      if (lang === 'hi') {
          return s >= 85 ? 'उत्कृष्ट' : s >= 70 ? 'अच्छा' : s >= 40 ? 'ध्यान देने योग्य' : 'गंभीर';
      }
      return s >= 85 ? 'Excellent' : s >= 70 ? 'Good' : s >= 40 ? 'Needs Attention' : 'Critical';
  };

  // Basic manual translation of labels
  const getTranslatedLabel = (key, defaultEn) => {
      if (lang === 'en') return defaultEn;
      const translations = {
          'N': 'नाइट्रोजन (N)',
          'P': 'फॉस्फोरस (P)',
          'K': 'पोटेशियम (K)',
          'ph': 'pH स्तर',
          'temperature': 'तापमान (°C)',
          'humidity': 'नमी (%)',
          'rainfall': 'वर्षा (मिमी)'
      };
      return translations[key] || defaultEn;
  };

  // Optional: translates the crop name to Hindi roughly if needed, otherwise uses the original
  const getTranslatedCropName = (cropName) => {
      if (lang === 'hi') {
          const map = {
             'apple': 'सेब', 'banana': 'केला', 'blackgram': 'उड़द दाल', 'chickpea': 'चना',
             'coconut': 'नारियल', 'coffee': 'कॉफी', 'cotton': 'कपास', 'grapes': 'अंगूर',
             'jute': 'जूट', 'kidneybeans': 'राजमा', 'lentil': 'मसूर दाल', 'maize': 'मक्का',
             'mango': 'आम', 'mothbeans': 'मोठ दाल', 'mungbean': 'मूंग दाल', 'muskmelon': 'खरबूजा',
             'orange': 'संतरा', 'papaya': 'पपीता', 'pigeonpeas': 'अरहर की दाल', 'pomegranate': 'अनार',
             'rice': 'धान', 'watermelon': 'तरबूज'
          };
          // Try exact match lowercase
          const ln = cropName?.toLowerCase() || '';
          if (map[ln]) return map[ln];
      }
      return cropName;
  }

  return (
    <div className="km-grid-bg" style={{ minHeight: 'calc(100vh - 64px)', padding: '40px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 40 }} className="km-fade-in">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
            {t('soil.title')}
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>{t('soil.subtitle')}</p>
        </div>

        {/* Input Form */}
        <div className="km-card km-fade-in" style={{ padding: 32, marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontWeight: 700 }}>{t('soil.inputTitle')}</h3>
            <button type="button" onClick={fetchLocationData} disabled={fetchingLoc} className="km-badge"
              style={{ border: 'none', cursor: 'pointer' }}>
              {fetchingLoc ? t('soil.locating') : t('soil.autoFill')}
            </button>
          </div>

          <form onSubmit={handleAnalyze}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 20 }}>
              {[
                { key: 'N', label: 'Nitrogen (N)', placeholder: '0-140' },
                { key: 'P', label: 'Phosphorus (P)', placeholder: '5-145' },
                { key: 'K', label: 'Potassium (K)', placeholder: '5-205' },
                { key: 'ph', label: 'pH Level', placeholder: '3.5-9.9' },
                { key: 'temperature', label: 'Temp (°C)', placeholder: 'Auto' },
                { key: 'humidity', label: 'Humidity (%)', placeholder: 'Auto' },
                { key: 'rainfall', label: 'Rainfall (mm)', placeholder: 'Auto' },
              ].map(f => (
                <div key={f.key}>
                  <label className="km-label">{getTranslatedLabel(f.key, f.label)}</label>
                  <input type="number" step="0.1" className="km-input" name={f.key} placeholder={f.placeholder}
                    value={formData[f.key]} onChange={handleChange} required />
                </div>
              ))}
            </div>
            <button type="submit" disabled={loading} className="km-btn" style={{ width: '100%', height: 52 }}>
              {loading ? t('soil.analyzingBtn') : t('soil.runAnalysis')}
            </button>
          </form>
        </div>

        {/* Results */}
        {report && (
          <div className="km-fade-in" style={{ display: 'grid', gap: 24 }}>

            {/* Row 1: Health Score + pH */}
            <div className="km-responsive-grid-280">
              
              {/* Health Score Card */}
              <div className="km-card" style={{ padding: 32, textAlign: 'center' }}>
                <p className="km-label">{t('soil.overallHealth')}</p>
                <div className="health-score-circle" style={{
                  width: 120, height: 120, borderRadius: '50%', margin: '16px auto',
                  border: `6px solid ${scoreColor(report.healthScore)}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column',
                  boxShadow: `0 0 30px ${scoreColor(report.healthScore)}30`
                }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 800, color: scoreColor(report.healthScore) }}>{report.healthScore}</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-dim)' }}>/100</span>
                </div>
                <p style={{ fontWeight: 700, color: scoreColor(report.healthScore), fontSize: '1rem' }}>{scoreLabel(report.healthScore)}</p>
              </div>

              {/* pH Assessment */}
              <div className="km-card" style={{ padding: 32 }}>
                <p className="km-label">{t('soil.phAssessment')}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${report.phAssessment.color}20`, fontSize: 22
                  }}>⚗️</div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>pH {formData.ph}</p>
                    <p style={{ color: report.phAssessment.color, fontWeight: 600, fontSize: '0.85rem' }}>{report.phAssessment.label}</p>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-muted)', padding: 14, background: 'var(--surface)', borderRadius: 12 }}>
                  {report.phAssessment.advice}
                </p>
              </div>
            </div>

            {/* Row 2: Nutrient Gauges */}
            <div className="km-card" style={{ padding: 32 }}>
              <p className="km-label" style={{ marginBottom: 20 }}>{t('soil.nutrientProfile')}</p>
              <div className="km-responsive-grid-200" style={{ gap: 20 }}>
                {['N', 'P', 'K'].map(key => {
                  const nutrient = report.nutrients[key];
                  const val = formData[key];
                  const namesEn = { N: 'Nitrogen', P: 'Phosphorus', K: 'Potassium' };
                  const namesHi = { N: 'नाइट्रोजन', P: 'फॉस्फोरस', K: 'पोटेशियम' };
                  const nameStr = lang === 'hi' ? namesHi[key] : namesEn[key];
                  
                  return (
                    <div key={key} style={{ padding: 20, borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontWeight: 700 }}>{nameStr} ({key})</span>
                        <span style={{
                          padding: '3px 10px', borderRadius: 99, fontSize: '0.7rem', fontWeight: 700,
                          background: `${nutrient.color}20`, color: nutrient.color
                        }}>{nutrient.status}</span>
                      </div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: nutrient.color, marginBottom: 8 }}>{val} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-dim)' }}>kg/ha</span></div>
                      <div className="km-progress-track">
                        <div className="km-progress-fill" style={{ width: `${Math.min(100, (val / 140) * 100)}%`, background: nutrient.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Row 3: Fertilizer Plan */}
            <div className="km-card" style={{ padding: 32, borderLeft: '4px solid var(--accent)' }}>
              <p className="km-label" style={{ marginBottom: 16 }}>{t('soil.fertilizerPlan')}</p>
              <div style={{ display: 'grid', gap: 16 }}>
                {report.fertilizerTips.map((tip, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 12, padding: '16px', borderRadius: 12, background: 'var(--surface)',
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{ fontSize: '1.2rem', flexShrink: 0 }}>📍</div>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.6, margin: 0, color: 'var(--text)' }}>{tip.replace(/^(?:🟢|🟡|🔴|✅|⚠️|📊)\s*/u, '')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 4: Recommended Crops */}
            <div className="km-card" style={{ padding: 32 }}>
              <p className="km-label" style={{ marginBottom: 16 }}>{t('soil.topCrops')}</p>
              
              {/* Primary match with details */}
              {report.detailedCrops && report.detailedCrops.length > 0 && (
                <div style={{ 
                  marginBottom: 24, padding: 24, borderRadius: 20, 
                  background: 'var(--accent-glow)', border: '2px solid var(--accent)',
                  position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ fontSize: 40 }}>🥇</div>
                      <div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, textTransform: 'capitalize', marginBottom: 4 }}>
                            {getTranslatedCropName(report.detailedCrops[0].crop)}
                        </h3>
                          {t('soil.aiMatchConf')} <strong style={{ color: 'var(--accent)' }}>{report.detailedCrops[0].confidence}%</strong>
                      </div>
                    </div>
                    <div className="km-badge">{t('soil.topMatch')}</div>
                  </div>

                  {/* Optimal Conditions for Primary Match */}
                  <div style={{ marginTop: 20, position: 'relative', zIndex: 1 }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
                      {t('soil.targetStandards')}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
                      {[
                        { icon: '🟢', label: lang==='en'?'Nitrogen':'नाइट्रोजन', value: `${report.detailedCrops[0].optimal.N} kg/ha` },
                        { icon: '🟡', label: lang==='en'?'Phosphorus':'फ़ॉस्फोरस', value: `${report.detailedCrops[0].optimal.P} kg/ha` },
                        { icon: '🔴', label: lang==='en'?'Potassium':'पोटेशियम', value: `${report.detailedCrops[0].optimal.K} kg/ha` },
                        { icon: '🌡️', label: lang==='en'?'Temperature':'तापमान', value: report.detailedCrops[0].optimal.temp },
                        { icon: '💧', label: lang==='en'?'Humidity':'नमी', value: report.detailedCrops[0].optimal.humidity },
                        { icon: '⚗️', label: 'pH', value: report.detailedCrops[0].optimal.ph },
                        { icon: '☔', label: lang==='en'?'Rainfall':'वर्षा', value: report.detailedCrops[0].optimal.rainfall },
                        { icon: '📅', label: lang==='en'?'Season':'मौसम', value: report.detailedCrops[0].optimal.season },
                      ].map(row => (
                        <div key={row.label} style={{
                          padding: '10px 14px', borderRadius: 12,
                          background: 'var(--surface)', border: '1px solid var(--border)',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                            <span style={{ fontSize: 13 }}>{row.icon}</span>
                            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-dim)' }}>{row.label}</span>
                          </div>
                          <p style={{ fontWeight: 700, fontSize: '0.85rem' }}>{row.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Other matches */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                {report.topCrops.slice(1).map((crop, i) => (
                  <div key={i} style={{
                    padding: 24, borderRadius: 16, textAlign: 'center',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    transition: 'all 0.3s'
                  }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{i === 0 ? '🥈' : '🥉'}</div>
                    <p style={{ fontWeight: 800, fontSize: '1.1rem', textTransform: 'capitalize' }}>
                        {getTranslatedCropName(crop)}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 4 }}>{t('soil.altSelection')}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Render Rating & Feedback post-result */}
            <RatingFeedback feature="Soil Analysis" />
          </div>
        )}
      </div>
    </div>
  );
}

export default SoilAnalysis;
