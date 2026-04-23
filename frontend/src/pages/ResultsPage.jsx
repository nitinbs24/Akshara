import React from 'react';
import { Link } from 'react-router-dom';

const ResultsPage = () => {
  // Mock data matching the design
  const heatmapData = [
    { text: "In", status: "fluent" },
    { text: "my", status: "fluent" },
    { text: "younger", status: "fluent" },
    { text: "and", status: "fluent" },
    { text: "more", status: "fluent" },
    { text: "vulnerable", status: "hesitation" },
    { text: "years", status: "fluent" },
    { text: "my", status: "fluent" },
    { text: "father", status: "fluent" },
    { text: "gave", status: "fluent" },
    { text: "me", status: "fluent" },
    { text: "some", status: "fluent" },
    { text: "advice", status: "fluent" },
    { text: "that", status: "fluent" },
    { text: "I've", status: "fluent" },
    { text: "been", status: "fluent" },
    { text: "turning", status: "fluent" },
    { text: "over", status: "fluent" },
    { text: "in", status: "fluent" },
    { text: "my", status: "fluent" },
    { text: "mind", status: "fluent" },
    { text: "ever", status: "fluent" },
    { text: "since.", status: "fluent" },
  ];

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
        {/* Left Column: Primary Analysis */}
        <div className="flex-grow flex flex-col gap-8 md:w-2/3">
          <header className="mb-4">
            <h1 className="font-headline text-5xl font-bold tracking-tight text-on-surface mb-2">Analysis: The Great Gatsby</h1>
            <p className="font-body text-lg text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-outline">calendar_today</span> October 24, 2023 
              <span className="mx-2 text-outline-variant">•</span>
              <span className="material-symbols-outlined text-outline">timer</span> 1:45
            </p>
          </header>

          {/* Fluency Heatmap Card */}
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
                {/* Manual Error Example for Tooltip demo */}
                <div className="relative inline-block group/tooltip cursor-pointer">
                  <span className="text-error bg-error-container rounded-sm px-1 font-bold underline decoration-error underline-offset-4">advantages</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-10 pointer-events-none">
                    <div className="bg-inverse-surface text-inverse-on-surface text-sm rounded-lg py-2 px-3 shadow-lg flex flex-col gap-1">
                      <span className="font-semibold text-error-container text-xs uppercase tracking-wider">Phoneme Error</span>
                      <span className="font-mono">Target: /dʒ/</span>
                      <span className="font-mono text-outline-variant">Found: /tʃ/</span>
                    </div>
                    <div className="w-3 h-3 bg-inverse-surface rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex gap-6 text-sm font-medium text-on-surface-variant border-t border-outline-variant/20 pt-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-tertiary-fixed border border-tertiary/20"></div> Fluent</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-secondary-fixed border border-secondary/20"></div> Hesitation</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-error-container border border-error/20"></div> Mispronounced</div>
            </div>
          </section>

          {/* Reading Velocity Chart Mockup */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm hover:bg-surface-container-low transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline text-3xl font-semibold">Reading Velocity</h2>
              <div className="flex items-center gap-6 text-right">
                <div className="hidden sm:flex flex-col text-xs font-medium text-on-surface-variant gap-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-0.5 bg-primary rounded"></div> Current Session
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-0.5 border-t-2 border-dashed border-outline rounded"></div> Historical Avg (135)
                  </div>
                </div>
                <div>
                  <span className="text-4xl font-bold text-primary font-headline">142</span>
                  <span className="text-sm font-medium text-on-surface-variant uppercase tracking-wider ml-1">WCPM</span>
                </div>
              </div>
            </div>
            {/* Visual Mockup Chart */}
            <div className="relative h-64 w-full border-b border-l border-outline-variant/30 mt-4 pb-2 pl-2">
              <div className="absolute -left-8 top-0 text-xs text-outline font-mono opacity-50">160</div>
              <div className="absolute -left-8 top-2/4 text-xs text-outline font-mono opacity-50">120</div>
              <div className="absolute -bottom-6 left-1/4 text-xs text-outline font-mono opacity-50">Q1</div>
              <div className="absolute -bottom-6 right-0 text-xs text-outline font-mono opacity-50">End</div>
              <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#004e59" />
                    <stop offset="100%" stopColor="#176774" />
                  </linearGradient>
                  <linearGradient id="areaGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#176774" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#176774" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0,75 Q 250,85 500,75 T 1000,70" fill="none" opacity="0.3" stroke="#6f797c" strokeDasharray="8,8" strokeWidth="2" />
                <path d="M 0,150 C 250,110 500,140 750,70 C 850,40 1000,20 1000,20 L 1000,200 L 0,200 Z" fill="url(#areaGrad)" />
                <path d="M 0,150 C 250,110 500,140 750,70 C 850,40 1000,20 1000,20" fill="none" stroke="url(#lineGrad)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                <circle cx="1000" cy="20" fill="#ffffff" r="6" stroke="#176774" strokeWidth="3" />
              </svg>
            </div>
          </section>
        </div>

        {/* Right Column: Context & Coaching */}
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
              <p className="font-body text-base leading-relaxed text-on-surface-variant">
                Your pace is excellent, but we noticed some hesitation on aspirated consonants. Focus on the flow of the Gatsby passage next time to improve your natural rhythm.
              </p>
              <button className="mt-6 w-full py-3 px-6 rounded-full hero-gradient text-white font-medium tracking-wide hover:opacity-90 transition-opacity flex justify-center items-center gap-2">
                Review Audio <span className="material-symbols-outlined text-sm">play_arrow</span>
              </button>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-8 hover:bg-surface-container-highest transition-colors duration-300 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-headline text-2xl font-semibold text-on-surface">Reading Profile</h3>
              <span className="material-symbols-outlined text-outline-variant">badge</span>
            </div>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-surface-container-lowest text-primary text-sm font-bold uppercase tracking-wider rounded border border-outline-variant/20 mb-2">
                The Careful Decoder
              </span>
            </div>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              You prioritize accuracy and phonetic precision, which is a strong foundation. Next, we can work on increasing your reading flow.
            </p>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-[#f3f4f5] dark:bg-[#191c1d] border-t border-outline-variant/10 py-12 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-screen-2xl mx-auto gap-6 opacity-80">
          <div className="flex items-center gap-4">
            <span className="font-headline text-lg font-semibold text-[#006778]">Akshara</span>
            <span className="font-body text-xs text-[#40484a]">© 2024 Akshara. Cultivating digital literacy.</span>
          </div>
          <div className="flex flex-wrap gap-6 font-body text-xs">
            <Link to="#" className="text-[#40484a] hover:text-[#006778]">About Us</Link>
            <Link to="#" className="text-[#40484a] hover:text-[#006778]">Privacy Policy</Link>
            <Link to="#" className="text-[#40484a] hover:text-[#006778]">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResultsPage;
