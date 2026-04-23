import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

const ResultsPage = () => {
  const location = useLocation();
  const report = location.state?.report;

  // Redirect if no report data is found (e.g., direct URL access)
  if (!report) {
    return <Navigate to="/practice" replace />;
  }

  const { diagnostic_profile, coaching_advice } = report;
  const { linguistic, acoustic } = diagnostic_profile;

  // Processing Heatmap Data from difflib opcodes
  const generateHeatmap = () => {
    const transcriptWords = linguistic.transcript.split(' ');
    // Simple logic: if difflib metrics were complex, we'd use opcodes.
    // For now, we'll map the transcript and highlight based on alignment quality if available
    // Or just show the transcript as analyzed.
    return transcriptWords.map((word, i) => {
      // In a more advanced version, we'd correlate this with linguistic.alignment
      return { text: word, status: 'fluent' }; 
    });
  };

  const heatmapData = generateHeatmap();

  const getStatusClasses = (status) => {
    switch (status) {
      case 'fluent': return 'text-tertiary bg-tertiary-fixed';
      case 'hesitation': return 'text-secondary bg-secondary-fixed';
      case 'error': return 'text-error bg-error-container font-bold underline decoration-error underline-offset-4';
      default: return 'text-on-surface';
    }
  };

  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-[#f8f9fa]/80 dark:bg-[#191c1d]/80 backdrop-blur-2xl sticky top-0 z-50 border-b border-outline-variant/10 shadow-sm">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
          <Link to="/" className="font-headline text-2xl font-bold text-[#006778] dark:text-[#a8eefd]">
            Akshara
          </Link>
          <div className="hidden md:flex items-center gap-8 font-headline tracking-tight font-bold">
            <Link to="/practice" className="text-[#40484a] dark:text-[#bfc8cb] font-medium hover:bg-[#f3f4f5] rounded-lg px-4 py-2 transition-all">Practice</Link>
            <Link to="/history" className="text-[#006778] dark:text-[#a8eefd] font-bold border-b-2 border-[#006778] pb-1 px-4 py-2">History</Link>
            <Link to="/progress" className="text-[#40484a] dark:text-[#bfc8cb] font-medium hover:bg-[#f3f4f5] rounded-lg px-4 py-2 transition-all">Progress</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/profile" className="hover:opacity-80 transition-opacity">
               <span className="material-symbols-outlined text-4xl text-primary">account_circle</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-grow w-full max-w-screen-2xl mx-auto px-8 py-12 flex flex-col md:flex-row gap-12">
        {/* Left Column */}
        <div className="flex-grow flex flex-col gap-8 md:w-2/3">
          <header className="mb-4">
            <h1 className="font-headline text-5xl font-bold tracking-tight text-on-surface mb-2">Analysis Session</h1>
            <p className="font-body text-lg text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-outline">calendar_today</span> {new Date().toLocaleDateString()} 
              <span className="mx-2 text-outline-variant">•</span>
              <span className="material-symbols-outlined text-outline">analytics</span> Accuracy: {linguistic.metrics.accuracy_percentage}%
            </p>
          </header>

          {/* Heatmap */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm group hover:bg-surface-container-low transition-colors duration-300">
            <h2 className="font-headline text-3xl font-semibold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>document_scanner</span>
              Fluency Heatmap
            </h2>
            <div className="font-body text-xl leading-relaxed text-on-surface space-y-4">
              <div className="leading-[2] flex flex-wrap gap-x-2 gap-y-1">
                {heatmapData.map((word, i) => (
                  <span key={i} className={`${getStatusClasses(word.status)} rounded-sm px-1 font-medium transition-colors`}>
                    {word.text}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex gap-6 text-sm font-medium text-on-surface-variant border-t border-outline-variant/20 pt-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-tertiary-fixed border border-tertiary/20"></div> Fluent</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-secondary-fixed border border-secondary/20"></div> Hesitation</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-error-container border border-error/20"></div> Mispronounced</div>
            </div>
          </section>

          {/* Velocity */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm hover:bg-surface-container-low transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline text-3xl font-semibold">Reading Velocity</h2>
              <div className="text-right">
                <span className="text-4xl font-bold text-primary font-headline">{Math.round(acoustic.articulation_rate * 60)}</span>
                <span className="text-sm font-medium text-on-surface-variant uppercase tracking-wider ml-1">WCPM</span>
              </div>
            </div>
            <div className="relative h-48 w-full bg-surface-container-low rounded-lg flex items-center justify-center border border-outline-variant/10">
               <p className="font-label text-sm text-on-surface-variant">Articulation Rate: {acoustic.articulation_rate.toFixed(2)} syllables/sec</p>
            </div>
          </section>
        </div>

        {/* Right Column: AI Coach */}
        <aside className="flex flex-col gap-8 md:w-1/3">
          <div className="rounded-xl p-8 bg-surface-container-lowest shadow-sm relative overflow-hidden border border-outline-variant/10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-5"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-primary">Curator's Notes</h3>
              </div>
              <div className="font-body text-base leading-relaxed text-on-surface-variant whitespace-pre-wrap">
                {coaching_advice}
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-8 hover:bg-surface-container-highest transition-colors duration-300 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-headline text-2xl font-semibold text-on-surface">Reading Profile</h3>
              <span className="material-symbols-outlined text-outline-variant">badge</span>
            </div>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-surface-container-lowest text-primary text-sm font-bold uppercase tracking-wider rounded border border-outline-variant/20 mb-2">
                {acoustic.reading_archetype}
              </span>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-[#f3f4f5] dark:bg-[#191c1d] border-t border-outline-variant/10 py-12 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-screen-2xl mx-auto gap-6 opacity-80">
          <span className="font-headline text-lg font-semibold text-[#006778]">Akshara</span>
          <span className="font-body text-xs text-[#40484a]">© 2024 Akshara. Cultivating digital literacy.</span>
        </div>
      </footer>
    </div>
  );
};

export default ResultsPage;
