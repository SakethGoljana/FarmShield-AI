import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

function History() {
  const { currentUser, getToken } = useAuth();
  const { t, lang } = useLanguage();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const token = await getToken();
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        // Note: History route must eventually support returning language translated descriptions if fetched from db.
        // For now, doing frontend mapping wherever needed.
        const res = await axios.get(`${apiUrl}/api/history?lang=${lang}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(res.data.data || []);
      } catch (err) {
        console.error('History fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [currentUser, lang]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const deleteRecord = async (id) => {
    const confirmationMsg = lang === 'en' ? 'Are you sure you want to delete this record?' : 'क्या आप वाकई इस रिकॉर्ड को हटाना चाहते हैं?';
    if (!window.confirm(confirmationMsg)) return;
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      await axios.delete(`${apiUrl}/api/history/${id}`);
      setHistory(history.filter(h => h._id !== id));
    } catch (err) { alert(lang === 'en' ? 'Failed to delete.' : 'हटाने में विफल।'); }
  };

  if (!currentUser) {
    return (
      <div className="km-grid-bg" style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div className="km-card km-fade-in" style={{ maxWidth: 450, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🔒</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 12 }}>
              {t('history.secureTitle')}
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
              {t('history.secureDesc')}
          </p>
        </div>
      </div>
    );
  }

  // Translation Helpers
  const getTranslatedLabel = (key, defaultEn) => {
      if (lang === 'en') return defaultEn;
      const translations = {
          'N': 'नाइट्रोजन (N)', 'P': 'फॉस्फोरस (P)', 'K': 'पोटेशियम (K)', 'pH': 'pH स्तर',
      };
      return translations[key] || defaultEn;
  };

  return (
    <div className="km-grid-bg" style={{ minHeight: 'calc(100vh - 64px)', padding: '60px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 50 }} className="km-fade-in">
          <span className="km-badge" style={{ marginBottom: 12 }}>{t('history.badge')}</span>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
            {t('history.title')} <span className="km-gradient-text">{t('history.titleHighlight')}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
              {t('history.subtitle')}
          </p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 100 }}>
            <div className="km-pulse" style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--accent)' }}></div>
          </div>
        ) : history.length === 0 ? (
          <div className="km-card" style={{ padding: 80, textAlign: 'center', color: 'var(--text-dim)', borderStyle: 'dashed' }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🧺</div>
            <h3 style={{ color: 'var(--text)', marginBottom: 8 }}>{t('history.emptyTitle')}</h3>
            <p>{t('history.emptyDesc')}</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 32, position: 'relative' }}>
            {/* Timeline Vertical Line (Desktop only) */}
            <div className="hidden md:block" style={{ position: 'absolute', left: 50, top: 0, bottom: 0, width: 2, background: 'var(--border)', zIndex: 0 }}></div>

            {history.map((record, idx) => (
              <div key={record._id || idx} className="km-fade-in" style={{ 
                  display: 'flex', gap: 32, animationDelay: `${idx * 0.1}s`, position: 'relative'
              }}>
                {/* Timeline Dot */}
                <div className="hidden md:flex" style={{ 
                    width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-card)', 
                    border: '4px solid var(--accent)', zIndex: 1, alignItems: 'center', justifyContent: 'center',
                    marginTop: 20
                }}></div>

                <div className="km-card" style={{ 
                    flex: 1, display: 'flex', gap: 24, padding: 24, alignItems: 'center', 
                    flexWrap: 'wrap', overflow: 'hidden'
                }}>
                  {record.imageUrl && (
                    <div style={{ position: 'relative', width: 140, height: 140, borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)' }}>
                      <img 
                          src={record.imageUrl} 
                          alt="Scan" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      {!record.isHealthy && <div style={{ position: 'absolute', top: 8, left: 8, background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: 6, fontSize: '0.65rem', fontWeight: 700 }}>{t('history.diseased')}</div>}
                    </div>
                  )}

                  {!record.imageUrl && record.soilData && (
                    <div style={{ width: 140, height: 140, borderRadius: 16, background: 'var(--surface)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, border: '1px solid var(--border)', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>{record.soilData.pH}</div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>{t('history.soilPh')}</div>
                      <div style={{ fontSize: '1.2rem' }}>🧪</div>
                    </div>
                  )}

                  <div style={{ flex: 1, minWidth: 250 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <h4 style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--text)' }}>
                        {record.displayName || t('history.soilChemical')}
                      </h4>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
                      {record.soilData ? (
                        <>
                          <div style={{ fontSize: '0.85rem' }}><span style={{ color: 'var(--text-muted)' }}>N:</span> <strong>{record.soilData.N}</strong></div>
                          <div style={{ fontSize: '0.85rem' }}><span style={{ color: 'var(--text-muted)' }}>P:</span> <strong>{record.soilData.P}</strong></div>
                          <div style={{ fontSize: '0.85rem' }}><span style={{ color: 'var(--text-muted)' }}>K:</span> <strong>{record.soilData.K}</strong></div>
                        </>
                      ) : (
                        <div style={{ fontSize: '0.85rem' }}><span style={{ color: 'var(--text-muted)' }}>{t('history.confidence')}</span> <strong style={{ color: 'var(--accent)' }}>{Math.round(record.confidence * 100)}%</strong></div>
                      )}
                    </div>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', background: 'var(--surface)', display: 'inline-block', padding: '4px 10px', borderRadius: 6 }}>
                      {t('history.logged')} {new Date(record.createdAt).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                     <button className="km-btn" style={{ padding: '8px 16px', fontSize: '0.8rem', background: expandedId === record._id ? 'var(--accent)' : 'var(--surface)', color: expandedId === record._id ? 'white' : 'var(--text)', border: '1px solid var(--border)' }} onClick={() => toggleExpand(record._id)}>
                        {expandedId === record._id ? t('history.closeReport') : t('history.fullReport')}
                     </button>
                     <button onClick={() => deleteRecord(record._id)} style={{ color: '#ef4444', background: 'none', border: 'none', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer' }}>{t('history.delete')}</button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === (record._id) && (
                  <div className="km-fade-in" style={{ 
                    marginTop: -16, padding: 24, borderRadius: '0 0 24px 24px', 
                    background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderTop: 'none',
                    marginLeft: 64
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
                      <div>
                        <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 8 }}>{t('history.detailedFindings')}</p>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{record.soilAdvice || (record.remedySuggested && record.remedySuggested.join(', ')) || t('history.noAdvice')}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 8 }}>{t('history.aiRecommendations')}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {record.cropRecommendations && record.cropRecommendations.length > 0 ? (
                            record.cropRecommendations.map(c => <span key={c} className="km-badge" style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}>{c}</span>)
                          ) : t('history.seasonalCrops')}
                        </div>
                      </div>
                    </div>

                    {record.weatherAtTime && (
                      <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                        <div style={{ fontSize: '0.8rem' }}><span style={{ color: 'var(--text-muted)' }}>{t('history.temp')}</span> <strong>{record.weatherAtTime.temperature}°C</strong></div>
                        <div style={{ fontSize: '0.8rem' }}><span style={{ color: 'var(--text-muted)' }}>{t('history.humidityShort')}</span> <strong>{record.weatherAtTime.humidity}%</strong></div>
                        <div style={{ fontSize: '0.8rem' }}><span style={{ color: 'var(--text-muted)' }}>{t('history.rainfallShort')}</span> <strong>{record.weatherAtTime.rainfall}mm</strong></div>
                        {record.location && <div style={{ fontSize: '0.8rem' }}><span style={{ color: 'var(--text-muted)' }}>{t('history.locationShort')}</span> <strong>{record.location.district}</strong></div>}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
