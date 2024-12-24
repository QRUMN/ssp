import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FuturisticLayout } from './components/layout/FuturisticLayout';
import { Landing } from './pages/Landing';
import { Join } from './pages/Join';
import { FreeJawnOnboarding } from './pages/FreeJawnOnboarding';
import { PaidOnboarding } from './pages/PaidOnboarding';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { Community } from './pages/Community';
import { Profile } from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { initializeTheme } from './lib/theme';

export default function App() {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="animate-fade-in">
          <Routes>
            <Route path="/join" element={<Join />} />
            <Route 
              path="/onboarding/free-jawn" 
              element={
                <ProtectedRoute>
                  <FreeJawnOnboarding />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/onboarding/paid" 
              element={
                <ProtectedRoute>
                  <PaidOnboarding />
                </ProtectedRoute>
              } 
            />
            <Route element={<FuturisticLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/community" element={<Community />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}