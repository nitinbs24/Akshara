import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const data = await authApi.login(email, password);
      login(data.access_token);
      navigate('/practice');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Header */}
      <header className="w-full bg-surface-container-low py-6 px-8 flex justify-center items-center sticky top-0 z-50 border-b border-outline-variant/10">
        <Link to="/" className="text-2xl font-headline font-bold text-primary tracking-tight">Akshara</Link>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
        {/* Abstract Glass Background Elements */}
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-primary-fixed opacity-30 rounded-full blur-[100px] z-0"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-secondary-fixed opacity-30 rounded-full blur-[120px] z-0"></div>

        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl p-10 md:p-14 z-10 relative overflow-hidden shadow-sm">
          {/* Glass/Tonal Separation layer */}
          <div className="absolute inset-0 bg-surface-container-low opacity-50 z-[-1] pointer-events-none rounded-xl"></div>
          
          <div className="text-center mb-10">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-on-surface mb-3 tracking-tight">Welcome Back</h1>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed">Continue your literary journey.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error-container text-error text-sm rounded-lg border border-error/20">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-label text-sm text-on-surface-variant font-medium" htmlFor="email">Email address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">mail</span>
                <input 
                  className="w-full bg-surface-container-highest text-on-surface font-body text-base rounded-lg py-4 pl-12 pr-4 border-b-2 border-transparent focus:border-primary focus:ring-0 focus:outline-none transition-colors" 
                  id="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  required 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block font-label text-sm text-on-surface-variant font-medium" htmlFor="password">Password</label>
                <a className="font-label text-sm text-primary hover:text-primary-container transition-colors" href="#">Forgot password?</a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">lock</span>
                <input 
                  className="w-full bg-surface-container-highest text-on-surface font-body text-base rounded-lg py-4 pl-12 pr-4 border-b-2 border-transparent focus:border-primary focus:ring-0 focus:outline-none transition-colors" 
                  id="password" 
                  name="password" 
                  placeholder="Enter your password" 
                  required 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                className="w-full bg-gradient-to-br from-primary to-primary-container text-white font-label text-base font-semibold rounded-full py-4 px-8 hover:opacity-90 transition-opacity flex justify-center items-center gap-2 disabled:opacity-50" 
                type="submit"
                disabled={isLoading}
              >
                <span>{isLoading ? 'Logging in...' : 'Login'}</span>
                {!isLoading && <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="font-body text-base text-on-surface-variant">
              Don't have an account? <Link className="text-primary font-semibold hover:underline decoration-primary/50 underline-offset-4" to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low text-primary font-body text-sm flex flex-col md:flex-row justify-between items-center px-12 py-8 w-full border-t border-outline-variant/20 mt-auto">
        <div className="text-lg font-headline font-bold text-primary mb-4 md:mb-0">Akshara</div>
        <nav className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">About</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Methodology</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Privacy</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Terms</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Support</a>
        </nav>
        <div className="text-on-surface-variant">© 2024 Akshara Reading Fluency. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default LoginPage;
