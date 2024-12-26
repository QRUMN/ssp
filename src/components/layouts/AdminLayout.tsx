import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

export function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
    }
    // TODO: Validate token with backend
  }, [navigate]);

  return <Outlet />;
}
