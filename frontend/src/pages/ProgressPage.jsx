import React from 'react';
import { Link } from 'react-router-dom';

const ProgressPage = () => {
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

      <main className="flex-grow w-full max-w-screen-xl mx-auto px-6 py-12 md:py-16 space-y-20">
        {/* Page Header */}
        <header className="mb-12">
          <h1 className="font-headline text-5xl md:text-6xl text-on-surface tracking-tight mb-4">Your Progress</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">Tracking your journey through fluency, precision, and comprehension. Consistent practice is refining your reading profile.</p>
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
                <span className="font-headline text-5xl text-on-surface">142</span>
                <div className="flex items-center text-tertiary bg-tertiary-fixed/30 px-2 py-0.5 rounded-sm text-sm font-medium">
                  <span className="material-symbols-outlined text-[16px] mr-1">trending_up</span>
                  +12
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <span className="font-label text-sm text-on-surface-variant uppercase tracking-widest">Avg Accuracy</span>
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-headline text-5xl text-on-surface">94%</span>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <span className="font-label text-sm text-on-surface-variant uppercase tracking-widest">Sessions</span>
                <span className="material-symbols-outlined text-primary text-xl">library_books</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-headline text-5xl text-on-surface">28</span>
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
                <p className="text-sm text-on-surface-variant">Started at A2</p>
              </div>
            </div>
          </div>
        </section>

        {/* Fluency Velocity Chart */}
        <section>
          <div className="bg-surface-container-low rounded-xl p-8 lg:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="font-headline text-3xl text-on-surface">Fluency Velocity</h2>
                <p className="text-on-surface-variant mt-1">Words Correct Per Minute (WCPM) over time</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 rounded-full text-sm font-medium bg-primary text-on-primary transition-colors">Last 7 sessions</button>
                <button className="px-4 py-2 rounded-full text-sm font-medium bg-surface-container-highest text-on-surface hover:bg-surface-dim transition-colors border border-outline-variant/20">Last 30 days</button>
              </div>
            </div>
            <div className="relative w-full h-72 bg-surface-container-lowest rounded-lg border border-outline-variant/20 overflow-hidden flex items-end">
              <div className="absolute left-4 top-4 bottom-8 flex flex-col justify-between text-xs text-on-surface-variant z-10 opacity-50">
                <span>160</span>
                <span>140</span>
                <span>120</span>
                <span>100</span>
              </div>
              <div className="absolute left-12 right-0 top-1/2 border-t border-dashed border-outline-variant/50 flex items-center z-10 opacity-30">
                <span className="absolute right-4 -top-5 text-xs text-on-surface-variant bg-surface-container-lowest px-1 rounded">Global Avg (130)</span>
              </div>
              <svg className="absolute inset-0 left-12 bottom-8 w-[calc(100%-3rem)] h-[calc(100%-2rem)] z-10" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,80 L20,70 L40,65 L60,40 L80,30 L100,10" fill="none" stroke="#004e59" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                <circle cx="0" cy="80" fill="#ffffff" r="1.5" stroke="#004e59" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <circle cx="20" cy="70" fill="#ffffff" r="1.5" stroke="#004e59" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <circle cx="40" cy="65" fill="#ffffff" r="1.5" stroke="#004e59" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <circle cx="60" cy="40" fill="#ffffff" r="1.5" stroke="#004e59" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <circle cx="80" cy="30" fill="#ffffff" r="1.5" stroke="#004e59" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <circle cx="100" cy="10" fill="#004e59" r="2" stroke="#ffffff" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </div>
        </section>

        {/* Reading Archetypes */}
        <section>
          <h2 className="font-headline text-3xl text-on-surface mb-6">Reading Archetypes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-surface-container-low rounded-xl p-6 border border-transparent hover:border-outline-variant/10 transition-colors">
              <p className="text-xs text-on-surface-variant mb-2">Oct 12 · The Tell-Tale Heart</p>
              <div className="inline-flex items-center px-3 py-1 rounded-sm bg-secondary-fixed/50 text-secondary mb-3">
                <span className="font-medium text-sm">Careful Decoder</span>
              </div>
              <p className="text-sm text-on-surface-variant">High accuracy, focus on pronunciation.</p>
            </div>
            <div className="bg-surface-container-low rounded-xl p-6 border border-transparent hover:border-outline-variant/10 transition-colors">
              <p className="text-xs text-on-surface-variant mb-2">Oct 19 · History of Silk</p>
              <div className="inline-flex items-center px-3 py-1 rounded-sm bg-tertiary-fixed/50 text-tertiary mb-3">
                <span className="font-medium text-sm">Fluent Reader</span>
              </div>
              <p className="text-sm text-on-surface-variant">Excellent rhythm bridging natural pauses.</p>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-6 relative shadow-sm border border-primary/20">
              <div className="absolute top-4 right-4 flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </div>
              <p className="text-xs text-on-surface-variant mb-2">Today · Cellular Biology</p>
              <div className="inline-flex items-center px-3 py-1 rounded-sm bg-tertiary-fixed text-tertiary mb-3">
                <span className="font-bold text-sm">Fluent Reader</span>
              </div>
              <p className="text-sm text-on-surface-variant">Maintained pace despite dense terminology.</p>
            </div>
          </div>
        </section>

        {/* Precision Analysis */}
        <section className="pb-12">
          <div className="bg-surface-container-low rounded-xl p-8 lg:p-10 flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3 flex flex-col justify-center">
              <h2 className="font-headline text-3xl text-on-surface mb-4">Precision Analysis</h2>
              <p className="text-on-surface-variant mb-8">Granular look at word-level outcomes.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-on-surface">
                  <span className="w-3 h-3 rounded-sm bg-tertiary mr-3"></span> Correct
                </li>
                <li className="flex items-center text-sm text-on-surface">
                  <span className="w-3 h-3 rounded-sm bg-error mr-3"></span> Wrong / Skipped
                </li>
              </ul>
            </div>
            <div className="lg:w-2/3 h-80 flex items-end justify-around pb-8 relative pt-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-6">
              {[75, 80, 70, 85, 85, 90].map((h, i) => (
                <div key={i} className="w-12 flex flex-col justify-end group cursor-pointer" style={{height: `${h}%`}}>
                  <div className="w-full bg-error h-[10%] rounded-t-sm"></div>
                  <div className="w-full bg-tertiary h-[90%] rounded-b-sm"></div>
                  <span className="absolute bottom-2 text-xs text-on-surface-variant -ml-1">S{21+i}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f3f4f5] dark:bg-[#1f2324] border-t border-outline-variant/10 py-12 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-screen-2xl mx-auto gap-6 opacity-80">
          <span className="font-headline text-lg font-semibold text-[#006778]">Akshara</span>
          <div className="flex gap-6 font-body text-xs text-[#40484a]">
            <Link to="#">About Us</Link>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProgressPage;
