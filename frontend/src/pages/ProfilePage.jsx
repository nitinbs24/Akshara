import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-surface text-on-surface">Loading...</div>;
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center bg-surface text-on-surface">Please log in to view your profile.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col font-body bg-surface text-on-surface">
      {/* TopNavBar */}
      <nav className="bg-[#f8f9fa] dark:bg-[#191c1d] border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-8 py-4 w-full max-w-full mx-auto">
          <Link to="/" className="text-2xl font-headline font-bold text-[#006778] dark:text-[#a8eefd] tracking-tight">
            Akshara
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/practice" className="text-[#40484a] dark:text-[#bec8cb] hover:bg-[#e7e8e9] dark:hover:bg-[#3f484a] transition-colors duration-300 font-headline text-lg tracking-tight px-3 py-1 rounded-DEFAULT">
              Practice
            </Link>
            <Link to="/history" className="text-[#40484a] dark:text-[#bec8cb] hover:bg-[#e7e8e9] dark:hover:bg-[#3f484a] transition-colors duration-300 font-headline text-lg tracking-tight px-3 py-1 rounded-DEFAULT">
              History
            </Link>
            <Link to="/progress" className="text-[#40484a] dark:text-[#bec8cb] hover:bg-[#e7e8e9] dark:hover:bg-[#3f484a] transition-colors duration-300 font-headline text-lg tracking-tight px-3 py-1 rounded-DEFAULT">
              Progress
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/profile" className="p-2 rounded-full hover:bg-[#e7e8e9] dark:hover:bg-[#3f484a] transition-colors duration-300 text-[#006778] font-bold border-b-2 border-[#006778] active:scale-95 transition-transform duration-200">
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center py-16 px-6 md:px-12 w-full max-w-full mx-auto">
        <div className="w-full max-w-2xl">
          <h1 className="font-headline text-4xl md:text-5xl text-on-surface tracking-tight mb-2 text-center md:text-left">Student Profile</h1>
          <p className="font-body text-on-surface-variant text-lg mb-12 text-center md:text-left">Manage your academic identity.</p>
          
          <div className="glass-panel rounded-xl p-8 md:p-12 shadow-sm relative overflow-hidden border border-outline-variant/10">
            {/* Decorative subtle gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed opacity-20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
              <div className="w-32 h-32 rounded-full bg-surface-container-high flex items-center justify-center text-primary overflow-hidden border-4 border-surface-container-lowest shadow-sm">
                <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>face</span>
              </div>
              <div className="flex flex-col items-center md:items-start pt-2">
                <h2 className="font-headline text-3xl font-semibold text-on-surface tracking-tight mb-1">{user.full_name}</h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant text-sm font-label mb-4">
                  <span className="material-symbols-outlined text-sm">school</span>
                  {user.level}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between py-4 group hover:bg-surface-container-low rounded-lg transition-colors px-4 -mx-4 cursor-default">
                <div className="font-label text-on-surface-variant text-sm mb-1 md:mb-0 w-1/3">Full Name</div>
                <div className="font-body text-on-surface font-medium w-2/3">{user.full_name}</div>
              </div>
              <div className="flex flex-col md:flex-row justify-between py-4 group hover:bg-surface-container-low rounded-lg transition-colors px-4 -mx-4 cursor-default">
                <div className="font-label text-on-surface-variant text-sm mb-1 md:mb-0 w-1/3">Email Address</div>
                <div className="font-body text-on-surface font-medium w-2/3">{user.email}</div>
              </div>
              <div className="flex flex-col md:flex-row justify-between py-4 group hover:bg-surface-container-low rounded-lg transition-colors px-4 -mx-4 cursor-default">
                <div className="font-label text-on-surface-variant text-sm mb-1 md:mb-0 w-1/3">Date of Birth</div>
                <div className="font-body text-on-surface font-medium w-2/3">{user.dob}</div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-outline-variant/20 flex justify-center md:justify-end">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-8 py-3 rounded-full border border-outline-variant/20 text-error hover:bg-error-container/50 transition-colors font-label font-medium bg-transparent"
              >
                <span className="material-symbols-outlined">logout</span>
                Logout
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#f3f4f5] dark:bg-[#1d2021] w-full mt-auto border-t border-[#bec8cb]/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-8 w-full max-w-full mx-auto">
          <div className="text-lg font-headline font-bold text-[#006778] mb-4 md:mb-0">
            Akshara
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0 font-body text-sm">
            <a className="text-[#40484a] dark:text-[#bec8cb] hover:text-[#006778] dark:hover:text-[#a8eefd] transition-all duration-200" href="#">About</a>
            <a className="text-[#40484a] dark:text-[#bec8cb] hover:text-[#006778] dark:hover:text-[#a8eefd] transition-all duration-200" href="#">Methodology</a>
            <a className="text-[#40484a] dark:text-[#bec8cb] hover:text-[#006778] dark:hover:text-[#a8eefd] transition-all duration-200" href="#">Privacy</a>
            <a className="text-[#40484a] dark:text-[#bec8cb] hover:text-[#006778] dark:hover:text-[#a8eefd] transition-all duration-200" href="#">Terms</a>
            <a className="text-[#40484a] dark:text-[#bec8cb] hover:text-[#006778] dark:hover:text-[#a8eefd] transition-all duration-200" href="#">Support</a>
          </div>
          <div className="text-[#40484a] dark:text-[#bec8cb] font-body text-sm">
            © 2024 Akshara Reading Fluency. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
