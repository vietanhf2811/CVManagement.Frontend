import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../../../services/authService';
import './Register.css';

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeTerms: false
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid =
    formData.fullName.trim() !== '' &&
    isEmailValid(formData.email) &&
    formData.password.length >= 8 &&
    formData.password === formData.confirmPassword &&
    formData.role !== '' &&
    formData.agreeTerms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    // Mark all as touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      role: true,
      agreeTerms: true
    });

    if (!isFormValid) {
      return;
    }

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: formData.role
    };

    try {
      setSubmitting(true);
      const response = await authService.register(payload);
      console.log('Đăng ký thành công:', response);
      navigate('/login');
    } catch (error: any) {
      console.error('Đăng ký thất bại:', error);
      const errMsg =
        error?.response?.data?.message ||
        'Registration failed. Please try again.';
      setServerError(errMsg);
      alert(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-card-container">
      <section className="register-card">
        <div className="form-heading">
          <span className="form-label">GET STARTED</span>
          <h2>Create your account</h2>
          <p>Join CVManagement and take the next step in your career.</p>
        </div>

        {serverError && (
          <div className="alert alert-danger py-2 mb-3" role="alert" style={{ fontSize: '13px' }}>
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={() => handleBlur('fullName')}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
            {touched.fullName && !formData.fullName.trim() && (
              <small className="error-message text-danger">Full name is required.</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            {touched.email && (!formData.email.trim() || !isEmailValid(formData.email)) && (
              <small className="error-message text-danger">
                Please enter a valid email address.
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Phone number <span className="optional">(Optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={() => handleBlur('phone')}
              placeholder="Enter your phone number"
              autoComplete="tel"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => handleBlur('password')}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              required
            />
            {touched.password && formData.password.length < 8 && (
              <small className="error-message text-danger">
                Password is required and must contain at least 8 characters.
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={() => handleBlur('confirmPassword')}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              required
            />
            {touched.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <small className="error-message text-danger">Passwords do not match.</small>
              )}
          </div>

          <div className="form-group">
            <label htmlFor="role">I want to join as</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              onBlur={() => handleBlur('role')}
              required
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="Candidate">Candidate</option>
              <option value="HR">HR / Recruiter</option>
            </select>
            {touched.role && !formData.role && (
              <small className="error-message text-danger">Please select a role.</small>
            )}
          </div>

          <label className="terms-option">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              onBlur={() => handleBlur('agreeTerms')}
              required
            />
            <span>
              I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
              <Link to="/privacy">Privacy Policy</Link>.
            </span>
          </label>
          {touched.agreeTerms && !formData.agreeTerms && (
            <small className="error-message text-danger mb-3 d-block">
              You must agree to the terms to continue.
            </small>
          )}

          <button className="submit-button" type="submit" disabled={submitting}>
            {submitting ? 'Creating account...' : (
              <>
                Create account <span>→</span>
              </>
            )}
          </button>
        </form>

        <p className="account-prompt">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </div>
  );
};

export default Register;
