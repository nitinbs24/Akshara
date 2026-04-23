import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const data = await authApi.register(formData.email, formData.password);
      login(data.access_token);
      navigate('/practice');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body min-h-screen flex flex-col antialiased">
      {/* Header */}
      <header className="bg-surface-bright flex justify-between items-center px-8 py-6 w-full max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-headline font-bold text-primary tracking-tight">Akshara</Link>
        <div>
          <Link to="/login" className="text-primary font-body text-sm font-medium hover:text-primary-container transition-colors duration-200">Login</Link>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl flex flex-col lg:flex-row bg-surface-container-low rounded-xl overflow-hidden relative z-10" style={{ boxShadow: '0 24px 64px -12px rgba(25, 28, 29, 0.06)' }}>
          {/* Left Side: Editorial Image/Quote */}
          <div className="hidden lg:flex lg:w-1/2 relative bg-surface-container-low flex-col justify-between p-12 overflow-hidden">
            {/* Decorative Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-90 z-0"></div>
            <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
            <div className="relative z-10 flex flex-col h-full justify-center">
              <h2 className="font-headline text-white text-4xl leading-tight mb-6 tracking-tight">Begin the Journey to Reading Fluency.</h2>
              <p className="font-body text-on-primary-container text-lg leading-relaxed max-w-sm">
                Experience the synthesis of traditional academic prestige and modern AI precision.
              </p>
            </div>
          </div>

          {/* Right Side: Registration Form */}
          <div className="w-full lg:w-1/2 bg-surface-container-lowest p-8 sm:p-12 z-10">
            <div className="mb-8">
              <h1 className="font-headline text-3xl font-bold text-on-surface mb-2 tracking-tight">Get Started</h1>
              <p className="font-body text-on-surface-variant text-sm">Create your Akshara account today.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-error-container text-error text-sm rounded-lg border border-error/20">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block font-label text-sm font-medium text-on-surface-variant mb-1" htmlFor="fullName">Full Name</label>
                <div className="relative">
                  <input 
                    className="w-full bg-surface-container-highest border-b-2 border-transparent focus:border-primary text-on-surface font-body rounded-t-DEFAULT px-4 py-3 outline-none transition-colors duration-200" 
                    id="fullName" 
                    name="fullName" 
                    placeholder="Jane Doe" 
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              {/* Date of Birth */}
              <div>
                <label className="block font-label text-sm font-medium text-on-surface-variant mb-1" htmlFor="dob">Date of Birth</label>
                <div className="relative">
                  <input 
                    className="w-full bg-surface-container-highest border-b-2 border-transparent focus:border-primary text-on-surface font-body rounded-t-DEFAULT px-4 py-3 outline-none transition-colors duration-200 text-on-surface-variant focus:text-on-surface" 
                    id="dob" 
                    name="dob" 
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              {/* Email */}
              <div>
                <label className="block font-label text-sm font-medium text-on-surface-variant mb-1" htmlFor="email">Email</label>
                <div className="relative">
                  <input 
                    className="w-full bg-surface-container-highest border-b-2 border-transparent focus:border-primary text-on-surface font-body rounded-t-DEFAULT px-4 py-3 outline-none transition-colors duration-200" 
                    id="email" 
                    name="email" 
                    placeholder="jane@example.com" 
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              {/* Password */}
              <div>
                <label className="block font-label text-sm font-medium text-on-surface-variant mb-1" htmlFor="password">Password</label>
                <div className="relative">
                  <input 
                    className="w-full bg-surface-container-highest border-b-2 border-transparent focus:border-primary text-on-surface font-body rounded-t-DEFAULT px-4 py-3 outline-none transition-colors duration-200" 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              {/* Re-enter Password */}
              <div>
                <label className="block font-label text-sm font-medium text-on-surface-variant mb-1" htmlFor="confirmPassword">Re-enter Password</label>
                <div className="relative">
                  <input 
                    className="w-full bg-surface-container-highest border-b-2 border-transparent focus:border-primary text-on-surface font-body rounded-t-DEFAULT px-4 py-3 outline-none transition-colors duration-200" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    placeholder="••••••••" 
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              {/* Actions */}
              <div className="pt-4">
                <button 
                  className="w-full bg-gradient-to-br from-primary to-primary-container text-white font-body font-bold py-4 px-6 rounded-full hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low text-primary font-body text-sm w-full mt-auto flex flex-col md:flex-row justify-between items-center px-12 py-8 transition-all duration-200">
        <div className="text-lg font-headline font-bold text-primary mb-4 md:mb-0">Akshara</div>
        <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
          <a className="text-on-surface-variant hover:text-primary transition-all duration-200" href="#">About</a>
          <a className="text-on-surface-variant hover:text-primary transition-all duration-200" href="#">Methodology</a>
          <a className="text-on-surface-variant hover:text-primary transition-all duration-200" href="#">Privacy</a>
          <a className="text-on-surface-variant hover:text-primary transition-all duration-200" href="#">Terms</a>
          <a className="text-on-surface-variant hover:text-primary transition-all duration-200" href="#">Support</a>
        </div>
        <div className="text-on-surface-variant">© 2024 Akshara Reading Fluency. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default SignupPage;
