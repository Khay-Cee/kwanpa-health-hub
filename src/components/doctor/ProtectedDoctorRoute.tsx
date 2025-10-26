import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

/**
 * Protects doctor routes by checking localStorage 'doctor' key.
 * If not present, redirects to /doctor/login and shows a toast.
 */
const isDoctorAuthenticated = () => {
  try {
    const raw = localStorage.getItem('doctor');
    if (!raw) return false;
    const doc = JSON.parse(raw);
    return !!(doc && doc.authenticated);
  } catch (e) {
    return false;
  }
};

export const ProtectedDoctorRoute: React.FC = () => {
  const location = useLocation();
  if (!isDoctorAuthenticated()) {
    // show toast
    toast.error('Please login to access doctor portal');
    return <Navigate to="/doctor/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedDoctorRoute;
