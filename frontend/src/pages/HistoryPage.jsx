import React from 'react';
import { Link } from 'react-router-dom';

const HistoryPage = () => {
  const historyEntries = [
    {
      id: 1,
      date: "October 24, 2023",
      title: "The Great Gatsby - Chapter 1",
      author: "F. Scott Fitzgerald",
      level: "C1",
      wpm: 142,
      accuracy: 98.5,
      status: "fluent"
    },
    {
      id: 2,
      date: "October 21, 2023",
      title: "Meditations - Book II",
      author: "Marcus Aurelius",
      level: "C2",
      wpm: 118,
      accuracy: 89.2,
      status: "hesitation"
    },
    {
      id: 3,
      date: "October 15, 2023",
      title: "The Origin of Species - Intro",
      author: "Charles Darwin",
      level: "B2",
      wpm: 135,
      accuracy: 94.1,
      status: "fluent"
    },
    {
      id: 4,
      date: "October 02, 2023",
      title: "Critique of Pure Reason",
      author: "Immanuel Kant",
      level: "C2+",
      wpm: 95,
      accuracy: 78.4,
      status: "error"
    }
  ];

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

  return (
    <div className="bg-background text-on-surface font-body antialiased min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 bg-[#f8f9fa] dark:bg-[#191c1d] w-full border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-8 py-4 w-full max-w-7xl mx-auto">
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

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 lg:px-24 max-w-7xl mx-auto w-full">
        {/* Editorial Header */}
        <header className="mb-12 max-w-2xl">
          <h1 className="font-headline text-5xl md:text-6xl text-on-surface tracking-tight leading-tight mb-4">
            Reading Archive
          </h1>
          <p className="font-body text-lg text-on-surface-variant leading-relaxed">
            Review past recitations to track your phonetic precision and fluency progression over time.
          </p>
        </header>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between bg-surface-container-low p-4 rounded-xl">
          <div className="relative w-full md:w-96 group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="w-full bg-surface-container-highest border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg pl-12 pr-4 py-3 text-on-surface placeholder-outline transition-all" 
              placeholder="Search titles or dates..." 
              type="text"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button className="px-4 py-2 rounded-full border border-outline-variant/30 text-on-surface-variant text-sm font-bold hover:bg-surface-container-highest transition-colors whitespace-nowrap">
              Last 30 Days
            </button>
            <button className="px-4 py-2 rounded-full bg-surface-container-highest text-primary text-sm font-bold transition-colors whitespace-nowrap shadow-sm">
              Highest Accuracy
            </button>
            <button className="px-4 py-2 rounded-full border border-outline-variant/30 text-on-surface-variant text-sm font-bold hover:bg-surface-container-highest transition-colors whitespace-nowrap flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="flex flex-col gap-4">
          {historyEntries.map((entry) => (
            <div key={entry.id} className="group relative flex flex-col lg:flex-row lg:items-center justify-between p-6 bg-surface-container-lowest rounded-xl hover:bg-surface-container-low transition-colors duration-300 gap-6 shadow-sm overflow-hidden border border-outline-variant/5">
              {/* Subtle left accent bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusColor(entry.status)} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="flex-1">
                <p className="font-body text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider mb-1">{entry.date}</p>
                <h3 className="font-headline text-2xl text-on-surface font-medium leading-snug">{entry.title}</h3>
                <p className="font-body text-sm text-on-surface-variant mt-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  {entry.author}
                </p>
              </div>

              <div className="flex flex-wrap lg:flex-nowrap items-center gap-6 lg:gap-10 bg-surface md:bg-transparent p-4 md:p-0 rounded-lg">
                <div className="flex flex-col items-start lg:items-end w-16">
                  <span className="text-xs text-on-surface-variant uppercase tracking-tighter mb-1">Level</span>
                  <span className="font-body text-sm font-bold text-on-surface border border-outline-variant/30 rounded px-2 py-0.5">{entry.level}</span>
                </div>
                <div className="flex flex-col items-start lg:items-end w-24">
                  <span className="text-xs text-on-surface-variant uppercase tracking-tighter mb-1">Pacing</span>
                  <span className="font-headline text-2xl text-on-surface tracking-tight">
                    <span className="text-primary font-semibold">{entry.wpm}</span> <span className="text-sm font-body text-on-surface-variant">WPM</span>
                  </span>
                </div>
                <div className="flex flex-col items-start lg:items-end w-24">
                  <span className="text-xs text-on-surface-variant uppercase tracking-tighter mb-1">Precision</span>
                  <span className={`px-2 py-1 ${getAccuracyBadge(entry.accuracy, entry.status)} rounded-sm text-sm font-bold w-full text-center lg:text-right`}>
                    {entry.accuracy}%
                  </span>
                </div>
              </div>

              <div className="mt-4 lg:mt-0 lg:ml-4 border-t lg:border-t-0 lg:border-l border-outline-variant/20 pt-4 lg:pt-0 lg:pl-6 flex justify-end">
                <Link 
                  to={`/results`}
                  className="text-primary font-bold text-sm hover:bg-surface-container-highest px-6 py-2.5 rounded-full transition-colors flex items-center gap-2 w-full lg:w-auto justify-center"
                >
                  Analyze
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 flex justify-center">
          <button className="font-headline italic text-xl text-primary hover:text-primary-container transition-colors relative group">
            Peruse Earlier Volumes
            <span className="absolute w-full h-[1px] bg-outline-variant/50 left-0 -bottom-1 group-hover:bg-primary transition-colors"></span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;
