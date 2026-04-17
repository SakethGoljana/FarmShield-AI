import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import RatingFeedback from '../components/RatingFeedback';

function CropRecommend() {
  const { getToken } = useAuth();
  const { t, lang } = useLanguage();
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [fetchingLoc, setFetchingLoc] = useState(false);
  const [coords, setCoords] = useState(null);
  const [soilData, setSoilData] = useState({ N: '50', P: '40', K: '40', pH: '6.5' });

  const fetchLocation = () => {
    setFetchingLoc(true);
    if (!navigator.geolocation) { alert(lang==='en'?"Geolocation not supported":"जियोलोकेशन समर्थित नहीं है"); setFetchingLoc(false); return; }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lon: longitude });
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const res = await axios.get(`${apiUrl}/api/weather/current?lat=${latitude}&lon=${longitude}`);
        const { city, country } = res.data.data;
        setLocation(`${city}, ${country}`);
      } catch { alert(lang==='en'?"Could not detect location.":"स्थान का पता नहीं चल सका।"); }
      finally { setFetchingLoc(false); }
    }, () => { alert(lang==='en'?"Location permission denied.":"स्थान अनुमति अस्वीकृत।"); setFetchingLoc(false); });
  };

  const handleMatch = async () => {
    if (!location) return;
    setLoading(true);
    setResult(null);
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const payload = {
        N: parseFloat(soilData.N) || 50,
        P: parseFloat(soilData.P) || 40,
        K: parseFloat(soilData.K) || 40,
        pH: parseFloat(soilData.pH) || 6.5
      };
      if (coords) { payload.lat = coords.lat; payload.lon = coords.lon; }
      else { payload.city = location; }

      const token = await getToken();
      const res = await axios.post(`${apiUrl}/api/crops/recommend?lang=${lang}`, payload, {
        headers: { Authorization: token ? `Bearer ${token}` : '' }
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || (lang==='en'?'Failed to get crop match. Is the server running?':'फसल मैच प्राप्त करने में विफल।'));
    } finally { setLoading(false); }
  };

  const detailed = result?.detailed || [];
  const weather = result?.weather;

  // Translation helpers
  const getTranslatedLabel = (key, defaultEn) => {
      if (lang === 'en') return defaultEn;
      const map = {
          'N': 'नाइट्रोजन (N)', 'P': 'फॉस्फोरस (P)', 'K': 'पोटेशियम (K)', 'pH': 'pH स्तर',
      };
      return map[key] || defaultEn;
  };
  
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
          const ln = cropName?.toLowerCase() || '';
          if (map[ln]) return map[ln];
      }
      return cropName;
  };

  const getTranslatedWeatherAttr = (attr) => {
      if (lang === 'en') return attr;
      const map = { 'Temperature': 'तापमान', 'Humidity': 'नमी', 'Rainfall': 'वर्षा', 'Season': 'मौसम' };
      return map[attr] || attr;
  };

  return (
    <div className="km-grid-bg" style={{ minHeight: 'calc(100vh - 64px)', padding: '40px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }} className="km-fade-in">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
            {t('crops.title')}
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>{t('crops.subtitle')}</p>
        </div>

        {/* Input Card */}
        <div className="km-card km-fade-in" style={{ padding: 32, marginBottom: 32 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label className="km-label" style={{ marginBottom: 0 }}>{t('crops.cityLabel')}</label>
              <button onClick={fetchLocation} disabled={fetchingLoc}
                style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
                {fetchingLoc ? t('crops.detecting') : t('crops.autoDetect')}
              </button>
            </div>
            <input type="text" placeholder={t('crops.cityPlaceholder')}
              className="km-input" value={location} onChange={e => { setLocation(e.target.value); setCoords(null); }} />
          </div>

          <label className="km-label">{t('crops.soilNPK')}</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 12, marginTop: 8, marginBottom: 24 }}>
            {[
              { key: 'N', label: 'Nitrogen (N)' },
              { key: 'P', label: 'Phosphorus (P)' },
              { key: 'K', label: 'Potassium (K)' },
              { key: 'pH', label: 'pH' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-dim)', display: 'block', marginBottom: 4 }}>
                    {getTranslatedLabel(f.key, f.label)}
                </label>
                <input type="number" step="0.1" className="km-input" style={{ fontSize: '0.9rem' }}
                  value={soilData[f.key]} onChange={e => setSoilData({...soilData, [f.key]: e.target.value})} />
              </div>
            ))}
          </div>

          <button onClick={handleMatch} disabled={!location || loading} className="km-btn" style={{ width: '100%', height: 52 }}>
            {loading ? t('crops.findingBtn') : t('crops.findBtn')}
          </button>
        </div>

        {/* Results */}
        {detailed.length > 0 && (
          <div className="km-fade-in">

            {/* Weather */}
            {weather && (
              <div className="km-card" style={{ padding: 24, marginBottom: 24 }}>
                <p className="km-label">{t('crops.liveClimate')} — {weather.city}</p>
                <div style={{ display: 'flex', gap: 20, marginTop: 12, flexWrap: 'wrap' }}>
                  {[ 
                    { i: '🌡️', l: 'Temperature', v: `${weather.temperature}°C` },
                    { i: '💧', l: 'Humidity', v: `${weather.humidity}%` },
                    { i: '☔', l: 'Rainfall', v: `${weather.rainfall} mm` },
                  ].map(x => (
                    <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRadius: 12, background: 'var(--surface)' }}>
                      <span style={{ fontSize: 20 }}>{x.i}</span>
                      <div><p style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{getTranslatedWeatherAttr(x.l)}</p><p style={{ fontWeight: 700 }}>{x.v}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Crop Cards */}
            <div style={{ display: 'grid', gap: 24 }}>
              {detailed.map((item, idx) => (
                <div key={idx} className="km-card" style={{
                  padding: 28,
                  border: idx === 0 ? '2px solid var(--accent)' : '1px solid var(--border)',
                  background: idx === 0 ? 'var(--accent-glow)' : 'var(--bg-card)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                    
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ fontSize: 36 }}>{idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}</div>
                      <div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, textTransform: 'capitalize', marginBottom: 4 }}>
                            {getTranslatedCropName(item.crop)}
                        </h3>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {t('crops.aiConfidence')} <strong style={{ color: 'var(--accent)' }}>{item.confidence}%</strong>
                        </span>
                      </div>
                    </div>

                    {idx === 0 && <div className="km-badge">{t('crops.bestMatch')}</div>}
                  </div>

                  {/* Optimal Growing Conditions */}
                  {item.optimal && Object.keys(item.optimal).length > 0 && (
                    <div style={{ marginTop: 20 }}>
                      <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
                        {t('crops.optimalConditions')}
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
                        {[
                          { icon: '🟢', label: 'Nitrogen', value: `${item.optimal.N} kg/ha` },
                          { icon: '🟡', label: 'Phosphorus', value: `${item.optimal.P} kg/ha` },
                          { icon: '🔴', label: 'Potassium', value: `${item.optimal.K} kg/ha` },
                          { icon: '🌡️', label: 'Temperature', value: item.optimal.temp },
                          { icon: '💧', label: 'Humidity', value: item.optimal.humidity },
                          { icon: '⚗️', label: 'pH', value: item.optimal.ph },
                          { icon: '☔', label: 'Rainfall', value: item.optimal.rainfall },
                          { icon: '📅', label: 'Season', value: item.optimal.season },
                        ].map(row => (
                          <div key={row.label} style={{
                            padding: '10px 14px', borderRadius: 12,
                            background: 'var(--surface)', border: '1px solid var(--border)',
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                              <span style={{ fontSize: 14 }}>{row.icon}</span>
                              <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-dim)' }}>
                                  {getTranslatedLabel(row.label, row.label) !== row.label ? getTranslatedLabel(row.label, row.label) : getTranslatedWeatherAttr(row.label)}
                              </span>
                            </div>
                            <p style={{ fontWeight: 700, fontSize: '0.88rem' }}>{row.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Render Rating & Feedback post-result */}
            <RatingFeedback feature="Crop Match" />
          </div>
        )}
      </div>
    </div>
  );
}

export default CropRecommend;
