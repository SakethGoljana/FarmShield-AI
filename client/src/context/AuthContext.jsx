import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/firebase';
import { 
  onAuthStateChanged, GoogleAuthProvider, signInWithPopup, 
  RecaptchaVerifier, signInWithPhoneNumber, signOut,
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signInAnonymously, updateProfile
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const syncUserWithBackend = async (user) => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (err) {
      console.error('Failed to sync user with backend:', err);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      await syncUserWithBackend(res.user);
      return res;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      await syncUserWithBackend(res.user);
      return res;
    } catch (error) {
      console.error("Email Login Error:", error);
      throw error;
    }
  };

  const registerWithEmail = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await syncUserWithBackend(res.user);
      return res;
    } catch (error) {
      console.error("Email Signup Error:", error);
      throw error;
    }
  };

  const loginAsGuest = async () => {
    try {
      const res = await signInAnonymously(auth);
      await syncUserWithBackend(res.user);
      return res;
    } catch (error) {
      console.error("Guest Sign-In Error:", error);
      throw error;
    }
  };

  const setupRecaptcha = (buttonId) => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, buttonId, {
      size: 'invisible',
    });
  };

  const loginWithPhone = async (phoneNumber) => {
    const appVerifier = window.recaptchaVerifier;
    return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  };

  const logout = () => signOut(auth);

  const getToken = async () => auth.currentUser?.getIdToken() || null;

  const updateUserProfile = async (updates) => {
    if (!auth.currentUser) throw new Error("No authenticated user");
    await updateProfile(auth.currentUser, updates);
    // Refresh local state to trigger rerenders across the UI
    setCurrentUser(Object.assign({}, auth.currentUser));
    await syncUserWithBackend(auth.currentUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Sync just in case they reloaded page and data changed elsewhere
        await syncUserWithBackend(user);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    loginAsGuest,
    loginWithPhone,
    setupRecaptcha,
    updateUserProfile,
    logout,
    getToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
