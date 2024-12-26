import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FuturisticLayout } from './components/layout/FuturisticLayout';
import { Landing } from './pages/Landing';
import { Join } from './pages/Join';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { Community } from './pages/Community';
import { Profile } from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { initializeTheme } from './lib/theme';
import { ThemeProvider } from './contexts/ThemeContext';
import { AdminLogin } from './pages/admin/Login';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminLayout } from './components/layouts/AdminLayout';
import { ProtectedAdminRoute } from './components/admin/ProtectedAdminRoute';
import { UsersPage } from './pages/admin/Users';
import { EventsPage } from './pages/admin/Events';
import { AnalyticsPage } from './pages/admin/Analytics';

export default function App() {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <div className="animate-fade-in">
            <Routes>
              <Route path="/join" element={<Join />} />
              <Route 
                path="/onboarding" 
                element={
                  <ProtectedRoute>
                    <Onboarding />
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
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                } />
                <Route path="users" element={
                  <ProtectedAdminRoute requiredPermission="manage_users">
                    <UsersPage />
                  </ProtectedAdminRoute>
                } />
                <Route path="events" element={
                  <ProtectedAdminRoute requiredPermission="manage_events">
                    <EventsPage />
                  </ProtectedAdminRoute>
                } />
                <Route path="analytics" element={
                  <ProtectedAdminRoute requiredPermission="view_analytics">
                    <AnalyticsPage />
                  </ProtectedAdminRoute>
                } />
                <Route path="settings" element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                } />
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}