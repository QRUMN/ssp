import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { adminAuth } from '../../services/adminAuth';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

export function ProtectedAdminRoute({ children, requiredPermission }: ProtectedAdminRouteProps) {
  const location = useLocation();

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (!adminAuth.isAuthenticated()) {
        await adminAuth.refreshToken();
      }
    };

    checkAndRefreshToken();
  }, []);

  if (!adminAuth.isAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requiredPermission && !adminAuth.hasPermission(requiredPermission)) {
    return <Navigate to="/admin/unauthorized" replace />;
  }

  return <>{children}</>;
}
