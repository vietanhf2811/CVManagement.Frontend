import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './AuthLayout.css';

export const AuthLayout: React.FC = () => {
  return (
    <div className="auth-page">
      <aside className="brand-panel">
        <Link className="brand" to="/login">
          <span className="brand-icon">CV</span>
          <span className="brand-name">CVManagement</span>
        </Link>

        <div className="brand-content">
          <span className="eyebrow">YOUR CAREER, YOUR FUTURE</span>

          <h1>Build your future with confidence.</h1>

          <p>
            Manage your CV, discover new opportunities,
            and connect with the right people.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">01</span>
              <div>
                <h3>Manage your CV</h3>
                <p>Keep your career profile organized.</p>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">02</span>
              <div>
                <h3>Discover opportunities</h3>
                <p>Find opportunities that fit your goals.</p>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">03</span>
              <div>
                <h3>Grow your career</h3>
                <p>Take the next step in your journey.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="brand-footer">
          © 2026 CVManagement. All rights reserved.
        </div>
      </aside>

      <main className="auth-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
