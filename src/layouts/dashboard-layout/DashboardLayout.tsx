import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './DashboardLayout.css';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h1>CV Management</h1>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="dashboard-body">
        <aside className="sidebar">
          <nav>
            <NavLink
              to="/candidate/dashboard"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/candidate/profile"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              My Profile
            </NavLink>

            <NavLink
              to="/candidate/applications"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              My Applications
            </NavLink>
          </nav>
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
