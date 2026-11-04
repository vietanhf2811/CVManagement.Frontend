import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth-layout/AuthLayout';
import DashboardLayout from './layouts/dashboard-layout/DashboardLayout';
import Login from './features/auth/pages/login/Login';
import Register from './features/auth/pages/register/Register';
import Dashboard from './features/candidate/pages/dashboard/Dashboard';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Candidate Dashboard routes */}
        <Route path="/candidate" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/candidate/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="profile"
            element={
              <div style={{ padding: '12px' }}>
                <h2>My Profile</h2>
                <p>Profile management coming soon...</p>
              </div>
            }
          />
          <Route
            path="applications"
            element={
              <div style={{ padding: '12px' }}>
                <h2>My Applications</h2>
                <p>Application tracker coming soon...</p>
              </div>
            }
          />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
