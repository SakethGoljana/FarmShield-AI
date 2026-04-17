import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Diagnose from './pages/Diagnose';
import SoilAnalysis from './pages/SoilAnalysis';
import CropRecommend from './pages/CropRecommend';
import History from './pages/History';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

import AboutUs from './pages/AboutUs';
import Footer from './components/Footer';

// Inner component that applies language class to body
function LanguageBodyClass({ children }) {
  const { lang } = useLanguage();
  useEffect(() => {
    document.body.classList.remove('lang-en', 'lang-hi', 'lang-te');
    document.body.classList.add(`lang-${lang}`);
  }, [lang]);
  return children;
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <AuthProvider>
            <LanguageBodyClass>
              <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)', color: 'var(--text)' }}>
                <Navbar />
                <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Routes>
                    <Route path="/"        element={<Home />} />
                    <Route path="/diagnose" element={<Diagnose />} />
                    <Route path="/soil"    element={<SoilAnalysis />} />
                    <Route path="/crops"   element={<CropRecommend />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/login"   element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/about"   element={<AboutUs />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </LanguageBodyClass>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
