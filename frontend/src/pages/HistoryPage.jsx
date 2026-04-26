import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { evaluationApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const HistoryPage = () => {
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

  const getStatus = (accuracy) => {
    if (accuracy >= 95) return 'fluent';
    if (accuracy >= 85) return 'hesitation';
    return 'error';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'fluent': return 'bg-tertiary';
      case 'hesitation': return 'bg-secondary';
      case 'error': return 'bg-error';
      default: return 'bg-outline';
    }
  };

  const getAccuracyBadge = (accuracy, status) => {
    switch (status) {
      case 'fluent': return 'bg-tertiary-fixed text-tertiary';
      case 'hesitation': return 'bg-secondary-fixed text-secondary';
      case 'error': return 'bg-error-container text-error';
      default: return 'bg-surface-container-high text-on-surface';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface font-body antialiased min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 bg-[#f8f9fa] dark:bg-[#191c1d] w-full border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-8 py-4 w-full max-w-full mx-auto">
          <Link to="/" className="font-headline text-2xl font-bold italic text-[#006778] dark:text-[#a8eefd]">
            Akshara
          </Link>
          <nav className="hidden md:flex gap-8 items-center">
            <Link to="/practice" className="text-[#40484a] dark:text-[#bec8cb] font-medium hover:text-[#176774] transition-all duration-300 px-4 py-2">
              Practice
            </Link>
            <Link to="/history" className="text-[#006778] dark:text-[#a8eefd] font-bold border-b-2 border-[#006778] pb-1 px-4 py-2">
              History
            </Link>
            <Link to="/progress" className="text-[#40484a] dark:text-[#bec8cb] font-medium hover:text-[#176774] transition-all duration-300 px-4 py-2">
              Progress
            </Link>
          </nav>
          <div className="flex items-center">
            <Link to="/profile" className="text-[#006778] dark:text-[#a8eefd] hover:bg-surface-container-highest transition-all duration-300 flex items-center justify-center p-2 rounded-full">
              <span className="material-symbols-outlined text-[28px]">account_circle</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-12 lg:px-24 max-w-full mx-auto w-full">
        <header className="mb-12 max-w-2xl">
          <h1 className="font-headline text-5xl md:text-6xl text-on-surface tracking-tight leading-tight mb-4">
            Reading Archive
          </h1>
          <p className="font-body text-lg text-on-surface-variant leading-relaxed">
            Review past recitations to track your phonetic precision and fluency progression over time.
          </p>
        </header>

        {history.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-low rounded-xl">
             <p className="font-body text-on-surface-variant">Your archive is empty. Start practicing to see your sessions here!</p>
             <Link to="/practice" className="mt-4 inline-block text-primary font-bold hover:underline">Go to Practice</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {history.map((entry) => {
              const accuracy = entry.data.diagnostic_profile.linguistic.metrics.accuracy_percentage;
              const wpm = Math.round(entry.data.diagnostic_profile.acoustic.articulation_rate * 60);
              const status = getStatus(accuracy);
              
              return (
                <div key={entry._id} className="group relative flex flex-col lg:flex-row lg:items-center justify-between p-6 bg-surface-container-lowest rounded-xl hover:bg-surface-container-low transition-colors duration-300 gap-6 shadow-sm overflow-hidden border border-outline-variant/5">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusColor(status)} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  
                  <div className="flex-1">
                    <p className="font-body text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider mb-1">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </p>
                    <h3 className="font-headline text-2xl text-on-surface font-medium leading-snug">Session Analysis</h3>
                    <p className="font-body text-sm text-on-surface-variant mt-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">menu_book</span>
                      Reading Performance
                    </p>
                  </div>

                  <div className="flex flex-wrap lg:flex-nowrap items-center gap-6 lg:gap-10 bg-surface md:bg-transparent p-4 md:p-0 rounded-lg">
                    <div className="flex flex-col items-start lg:items-end w-24">
                      <span className="text-xs text-on-surface-variant uppercase tracking-tighter mb-1">Pacing</span>
                      <span className="font-headline text-2xl text-on-surface tracking-tight">
                        <span className="text-primary font-semibold">{wpm}</span> <span className="text-sm font-body text-on-surface-variant">WPM</span>
                      </span>
                    </div>
                    <div className="flex flex-col items-start lg:items-end w-24">
                      <span className="text-xs text-on-surface-variant uppercase tracking-tighter mb-1">Precision</span>
                      <span className={`px-2 py-1 ${getAccuracyBadge(accuracy, status)} rounded-sm text-sm font-bold w-full text-center lg:text-right`}>
                        {accuracy}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 lg:ml-4 border-t lg:border-t-0 lg:border-l border-outline-variant/20 pt-4 lg:pt-0 lg:pl-6 flex justify-end">
                    <Link 
                      to={`/results`}
                      state={{ report: entry.data }}
                      className="text-primary font-bold text-sm hover:bg-surface-container-highest px-6 py-2.5 rounded-full transition-colors flex items-center gap-2 w-full lg:w-auto justify-center"
                    >
                      Analyze
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default HistoryPage;
