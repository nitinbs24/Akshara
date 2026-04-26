import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { evaluationApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ProgressPage = () => {
  const { token } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await evaluationApi.getHistory(token);
        setHistory(data);
      } catch (err) {
        console.error('Error fetching history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [token]);

  // Derived Metrics
  const currentWpm = history.length > 0 
    ? Math.round(history[0].data.diagnostic_profile.acoustic.articulation_rate * 60) 
    : 0;
  
  const avgAccuracy = history.length > 0
    ? Math.round(history.reduce((acc, entry) => acc + entry.data.diagnostic_profile.linguistic.metrics.accuracy_percentage, 0) / history.length)
    : 0;

  const getPoints = () => {
    if (history.length < 2) return "M 0,80 L 100,80";
    const points = history.slice(0, 6).reverse().map((entry, i) => {
      const wpm = entry.data.diagnostic_profile.acoustic.articulation_rate * 60;
      const x = i * (100 / (Math.min(history.length, 6) - 1));
      const y = 100 - (wpm / 200) * 100; // Normalized to 200 WPM max
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface font-body antialiased min-h-screen flex flex-col">
      {/* TopNavBar */}
      <nav className="bg-[#f8f9fa] dark:bg-[#191c1d] sticky top-0 z-50 shadow-sm border-b border-surface-container-low">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
          <Link to="/" className="font-headline text-2xl font-bold italic text-[#006778] dark:text-[#a8eefd]">
            Akshara
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link to="/practice" className="font-body text-[#40484a] dark:text-[#bec8cb] font-medium hover:text-[#004e59] transition-all">Practice</Link>
            <Link to="/history" className="font-body text-[#40484a] dark:text-[#bec8cb] font-medium hover:text-[#004e59] transition-all">History</Link>
            <Link to="/progress" className="font-body text-[#006778] dark:text-[#a8eefd] font-bold border-b-2 border-[#006778] pb-1 transition-all">Progress</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant hover:opacity-80 transition-opacity">
               <span className="material-symbols-outlined text-4xl text-primary">account_circle</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow w-full max-w-full mx-auto px-6 py-12 md:py-16 space-y-20">
        <header className="mb-12">
          <h1 className="font-headline text-5xl md:text-6xl text-on-surface tracking-tight mb-4">Your Progress</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">Tracking your journey through fluency, precision, and comprehension.</p>
        </header>

        {/* Summary Stat Cards */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container-low rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <span className="font-label text-sm text-on-surface-variant uppercase tracking-widest">Current WCPM</span>
                <span className="material-symbols-outlined text-primary text-xl">speed</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-headline text-5xl text-on-surface">{currentWpm}</span>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <span className="font-label text-sm text-on-surface-variant uppercase tracking-widest">Avg Accuracy</span>
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-headline text-5xl text-on-surface">{avgAccuracy}%</span>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <span className="font-label text-sm text-on-surface-variant uppercase tracking-widest">Sessions</span>
                <span className="material-symbols-outlined text-primary text-xl">library_books</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-headline text-5xl text-on-surface">{history.length}</span>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-6 relative overflow-hidden group flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <span className="font-label text-sm text-on-surface-variant uppercase tracking-widest">CEFR Level</span>
                <span className="material-symbols-outlined text-primary text-xl">military_tech</span>
              </div>
              <div>
                <div className="inline-flex items-center justify-center bg-primary text-on-primary font-headline text-3xl px-4 py-1 rounded-md mb-2">B2</div>
              </div>
            </div>
          </div>
        </section>

        {/* Fluency Velocity Chart */}
        <section>
          <div className="bg-surface-container-low rounded-xl p-8 lg:p-10">
            <h2 className="font-headline text-3xl text-on-surface mb-8">Fluency Velocity</h2>
            <div className="relative w-full h-72 bg-surface-container-lowest rounded-lg border border-outline-variant/20 overflow-hidden flex items-end">
              <div className="absolute left-4 top-4 bottom-8 flex flex-col justify-between text-xs text-on-surface-variant z-10 opacity-50">
                <span>200</span>
                <span>100</span>
                <span>0</span>
              </div>
              <svg className="absolute inset-0 left-12 bottom-8 w-[calc(100%-3rem)] h-[calc(100%-2rem)] z-10" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d={getPoints()} fill="none" stroke="#004e59" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </div>
        </section>

        {/* Reading Archetypes Timeline */}
        <section className="pb-12">
          <h2 className="font-headline text-3xl text-on-surface mb-6">Recent Archetypes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {history.slice(0, 3).map((entry, i) => (
              <div key={i} className="bg-surface-container-low rounded-xl p-6 border border-transparent hover:border-outline-variant/10 transition-colors">
                <p className="text-xs text-on-surface-variant mb-2">{new Date(entry.timestamp).toLocaleDateString()}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-sm bg-tertiary-fixed text-tertiary mb-3">
                  <span className="font-bold text-sm">{entry.data.diagnostic_profile.acoustic.reading_archetype}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProgressPage;
