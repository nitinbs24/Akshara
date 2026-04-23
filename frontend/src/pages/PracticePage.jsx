import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PracticePage = () => {
  const [passages, setPassages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState('A1');
  const [selectedCategory, setSelectedCategory] = useState('Literature');

  const difficulties = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const categories = ['Literature', 'Science', 'History', 'News', 'Creative'];

  // Placeholder data matching the design
  const dummyPassages = [
    {
      id: 1,
      title: 'The Last Leaf',
      difficulty: 'A1',
      category: 'Literature',
      description: 'A timeless story of hope and sacrifice in Greenwich Village, focusing on an ailing young woman and an old artist.'
    },
    {
      id: 2,
      title: 'The Great Gatsby - Chapter 1',
      difficulty: 'B2',
      category: 'Literature',
      description: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since."
    },
    {
      id: 3,
      title: 'Quantum Entanglement Overview',
      difficulty: 'C1',
      category: 'Science',
      description: 'An advanced exploration of the physical phenomenon that occurs when a group of particles are generated, interact, or share spatial proximity.'
    },
    {
      id: 4,
      title: 'The Fall of Rome',
      difficulty: 'B1',
      category: 'History',
      description: 'Examining the myriad internal and external factors that contributed to the gradual collapse of the Western Roman Empire.'
    },
    {
      id: 5,
      title: 'Global Tech Trends 2024',
      difficulty: 'A2',
      category: 'News',
      description: 'A summary of the most impactful technological advancements expected to shape our daily lives in the coming year.'
    }
  ];

  useEffect(() => {
    // In a real app, we'd fetch from /passages
    // For now, using the dummy data to match the UI design
    setPassages(dummyPassages);
    setLoading(false);
  }, []);

  const filteredPassages = passages.filter(p => 
    p.difficulty === selectedDifficulty || p.category === selectedCategory
  );

  return (
    <div className="bg-surface text-on-surface font-body antialiased min-h-screen flex flex-col">
      {/* TopNavBar */}
      <nav className="hidden md:flex bg-surface-bright border-b border-outline-variant/10 sticky top-0 z-50">
        <div className="flex justify-between items-center px-8 py-4 w-full max-w-[1440px] mx-auto">
          <Link to="/" className="font-headline text-2xl font-bold italic text-primary">Akshara</Link>
          <div className="flex items-center gap-8">
            <Link to="/practice" className="text-primary font-bold border-b-2 border-primary pb-1 font-body text-sm">Practice</Link>
            <Link to="/history" className="text-on-surface-variant font-medium font-body text-sm hover:text-primary transition-colors">History</Link>
            <Link to="/progress" className="text-on-surface-variant font-medium font-body text-sm hover:text-primary transition-colors">Progress</Link>
          </div>
          <div className="flex items-center gap-4 text-primary">
            <Link to="/profile" className="hover:text-primary-container transition-colors">
              <span className="material-symbols-outlined text-[28px]">account_circle</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-8 py-12 md:py-20 gap-16">
        {/* Header Section */}
        <header className="flex flex-col gap-6 max-w-3xl">
          <h1 className="font-headline text-5xl md:text-6xl font-semibold tracking-tight text-on-surface">Choose Your Passage</h1>
          <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl">
            Select a text that challenges your reading fluency. Cultivate your articulation with precision.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-10 lg:sticky lg:top-24">
            {/* Difficulty Filter */}
            <div className="flex flex-col gap-4">
              <h3 className="font-headline text-2xl font-medium tracking-tight text-on-surface">Difficulty</h3>
              <div className="flex flex-wrap gap-3">
                {difficulties.map(level => (
                  <button 
                    key={level}
                    onClick={() => setSelectedDifficulty(level)}
                    className={`px-4 py-2 rounded-full font-label text-sm font-semibold transition-all duration-200 ${
                      selectedDifficulty === level 
                        ? 'bg-primary text-white shadow-sm' 
                        : 'bg-surface-container-lowest border border-outline-variant/20 text-primary hover:bg-surface-container-high'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col gap-4">
              <h3 className="font-headline text-2xl font-medium tracking-tight text-on-surface">Category</h3>
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg font-label text-sm font-medium transition-colors duration-200 group ${
                      selectedCategory === cat 
                        ? 'bg-surface-container-low text-on-surface' 
                        : 'bg-transparent hover:bg-surface-container-low text-on-surface-variant'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`material-symbols-outlined text-primary text-[20px] transition-opacity ${
                      selectedCategory === cat ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                    }`}>check</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Passage Grid */}
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {passages.map((p, index) => (
              <article key={p.id} className="bg-surface-container-lowest rounded-xl p-6 flex flex-col gap-6 group hover:bg-surface-container-low transition-colors duration-300 relative overflow-hidden shadow-sm">
                <div className="flex justify-between items-start">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-sm font-label text-xs font-bold tracking-wider uppercase ${
                    index % 2 === 0 ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-surface-container-high text-on-surface'
                  }`}>
                    {p.category}
                  </span>
                  <span className="font-label text-sm font-semibold text-primary">{p.difficulty}</span>
                </div>
                <div className="flex flex-col gap-3 flex-grow">
                  <h2 className="font-headline text-2xl font-semibold leading-tight text-on-surface group-hover:text-primary transition-colors">{p.title}</h2>
                  <p className="font-body text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="pt-4 mt-auto">
                  <Link 
                    to={`/reading/${p.id}`}
                    className={`w-full block text-center font-label text-sm font-semibold py-3 px-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    index === 0 
                      ? 'hero-gradient text-white shadow-sm hover:shadow-md hover:-translate-y-0.5' 
                      : 'bg-transparent border border-outline-variant/20 text-primary hover:bg-surface-container-highest'
                  }`}>
                    Start Reading
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 md:hidden bg-surface-bright shadow-[0_-4px_32px_rgba(25,28,29,0.04)] rounded-t-2xl">
        <Link to="/practice" className="flex flex-col items-center justify-center text-primary bg-surface-container-low rounded-xl px-6 py-2">
          <span className="material-symbols-outlined text-[24px]">auto_stories</span>
          <span className="font-label text-xs font-semibold mt-1">Practice</span>
        </Link>
        <Link to="/history" className="flex flex-col items-center justify-center text-on-surface-variant px-6 py-2">
          <span className="material-symbols-outlined text-[24px]">history</span>
          <span className="font-label text-xs font-semibold mt-1">History</span>
        </Link>
        <Link to="/progress" className="flex flex-col items-center justify-center text-on-surface-variant px-6 py-2">
          <span className="material-symbols-outlined text-[24px]">insights</span>
          <span className="font-label text-xs font-semibold mt-1">Progress</span>
        </Link>
      </nav>
    </div>
  );
};

export default PracticePage;
