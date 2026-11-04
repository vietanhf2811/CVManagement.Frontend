import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../../../services/authService';
import './Login.css';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      await authService.login({ email, password });
      navigate('/candidate/dashboard');
    } catch (err: any) {
      console.error('Login failed:', err);
      // For now if endpoint returns error or is not ready yet, log it
      setErrorMessage(
        err?.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-card-container">
      <section className="login-card">
        <div className="form-heading">
          <span className="form-label">WELCOME BACK</span>
          <h2>Sign in to your account</h2>
          <p>Enter your details to access your workspace.</p>
        </div>

        {errorMessage && (
          <div className="alert alert-danger py-2 mb-3" role="alert" style={{ fontSize: '13px' }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-options">
            <label className="remember-option">
              <input
                type="checkbox"
                name="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>

            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : (
              <>
                Sign in <span>→</span>
              </>
            )}
          </button>
        </form>

        <div className="divider">
          <span></span>
          <p>OR</p>
          <span></span>
        </div>

        <p className="account-prompt">
          Don't have an account?{' '}
          <Link to="/register">Create an account</Link>
        </p>

        <p className="security-note">
          Your career journey starts here.
        </p>
      </section>
    </div>
  );
};

export default Login;
