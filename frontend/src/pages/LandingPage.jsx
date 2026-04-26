import React from 'react';
import { Link } from 'react-router-dom';
import screenImg from '../assets/screen.png';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* TopNavBar */}
      <nav className="bg-[#f8f9fa] dark:bg-[#191c1d] docked full-width top-0 z-50 sticky transition-all duration-300 border-b border-transparent shadow-sm">
        <div className="flex justify-between items-center px-8 py-4 w-full max-w-full mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-headline font-bold text-[#006778] dark:text-[#a8eefd] tracking-tight">Akshara</span>
          </div>
          <div className="hidden md:flex items-center gap-6 font-headline tracking-tight">
            {/* Navigation items would go here if defined */}
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-[#006778] dark:text-[#a8eefd] font-medium text-sm hover:bg-[#e7e8e9] dark:hover:bg-[#3f484a] transition-colors duration-300 px-4 py-2 rounded-full hidden sm:block text-center">Login</Link>
            <Link to="/signup" className="hero-gradient text-white font-medium text-sm px-6 py-2.5 rounded-full hover:shadow-ambient transition-all duration-300 transform hover:-translate-y-0.5 text-center">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 px-6 lg:px-12 overflow-hidden">
          <div className="max-w-full mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="z-10 pl-4 lg:pl-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label text-sm mb-6 border border-outline-variant/20">
                <span className="material-symbols-outlined text-[18px] text-primary">auto_awesome</span>
                Powered by Advanced Speech AI
              </div>
              <h1 className="font-headline text-5xl lg:text-7xl font-semibold leading-tight tracking-tight text-on-surface mb-6">
                AI-powered reading fluency, <span className="italic text-primary">word by word.</span>
              </h1>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-10 max-w-lg">
                Get instant, detailed feedback on your reading using advanced speech AI. Results in seconds. Elevate your literacy journey with precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="hero-gradient text-white font-medium text-base px-8 py-4 rounded-full hover:shadow-ambient transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto text-center">
                  Try your first passage free
                </Link>
                <button className="border border-outline-variant/40 text-primary font-medium text-base px-8 py-4 rounded-full hover:bg-surface-container-low transition-all duration-300 w-full sm:w-auto text-center">
                  View a Demo
                </button>
              </div>
            </div>
            <div className="relative z-10 w-full pr-4 lg:pr-12">
              {/* Glassmorphism Abstract Visualization */}
              <div className="relative w-full aspect-square md:aspect-[4/3] rounded-xl overflow-hidden shadow-ambient bg-surface-container-low border border-outline-variant/10 group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed-dim/20 to-transparent mix-blend-multiply"></div>
                <img 
                  alt="Abstract reading concept" 
                  className="object-cover w-full h-full opacity-80 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000" 
                  src={screenImg} 
                />
                {/* Floating UI Elements */}
                <div className="absolute top-8 -left-4 glass-panel rounded-lg p-4 shadow-ambient border border-white/20 transform rotate-[-2deg] hidden md:block w-64">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-tertiary bg-tertiary-fixed rounded-full p-1">check_circle</span>
                    <span className="font-label text-sm font-medium text-on-surface">Perfect Pronunciation</span>
                  </div>
                  <p className="font-headline text-lg italic text-on-surface-variant">"The <span className="text-tertiary bg-tertiary-fixed px-1 rounded-sm">quick</span> brown fox..."</p>
                </div>
                <div className="absolute bottom-12 right-4 glass-panel rounded-lg p-4 shadow-ambient border border-white/20 transform rotate-[3deg] w-56">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label text-xs text-on-surface-variant uppercase tracking-wider">WCPM Score</span>
                    <span className="material-symbols-outlined text-primary text-[16px]">trending_up</span>
                  </div>
                  <div className="font-headline text-3xl font-semibold text-primary">142</div>
                  <div className="w-full bg-surface-variant h-1 rounded-full mt-2 overflow-hidden">
                    <div className="bg-primary h-full w-4/5 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Three Pillars */}
        <section className="py-24 bg-surface-container-low px-6 lg:px-12">
          <div className="max-w-full mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-headline text-4xl font-semibold tracking-tight text-on-surface mb-4">Precision Analysis at Every Level</h2>
              <p className="font-body text-on-surface-variant text-lg">Our multi-layered AI dissects your reading to provide actionable, nuanced feedback.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm hover:shadow-ambient transition-shadow duration-300 group">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center mb-6 text-on-primary-fixed group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined">spellcheck</span>
                </div>
                <h3 className="font-headline text-2xl font-medium text-on-surface mb-3">Word-by-word accuracy</h3>
                <p className="font-body text-on-surface-variant leading-relaxed mb-6">Visualized feedback instantly highlights areas of mastery and friction.</p>
                <div className="font-headline text-lg bg-surface p-4 rounded-lg border border-outline-variant/20 italic">
                  The <span className="text-tertiary bg-tertiary-fixed px-1 rounded-sm">journey</span> <span className="text-secondary bg-secondary-fixed px-1 rounded-sm">begins</span> <span className="text-error bg-error-container px-1 rounded-sm">here</span>.
                </div>
              </div>
              {/* Pillar 2 */}
              <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm hover:shadow-ambient transition-shadow duration-300 group">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center mb-6 text-on-secondary-fixed group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined">graphic_eq</span>
                </div>
                <h3 className="font-headline text-2xl font-medium text-on-surface mb-3">Phoneme-level pronunciation</h3>
                <p className="font-body text-on-surface-variant leading-relaxed mb-6">Deep acoustic analysis using advanced models catches subtleties human ears miss.</p>
                <div className="h-20 bg-surface rounded-lg border border-outline-variant/20 flex items-center justify-center overflow-hidden p-2">
                  <div className="flex items-end h-full gap-1 w-full justify-center opacity-70">
                    <div className="w-1.5 bg-secondary-container h-[20%] rounded-t-sm"></div>
                    <div className="w-1.5 bg-secondary-container h-[40%] rounded-t-sm"></div>
                    <div className="w-1.5 bg-secondary-container h-[80%] rounded-t-sm"></div>
                    <div className="w-1.5 bg-primary h-[60%] rounded-t-sm"></div>
                    <div className="w-1.5 bg-primary h-[90%] rounded-t-sm"></div>
                    <div className="w-1.5 bg-secondary-container h-[30%] rounded-t-sm"></div>
                    <div className="w-1.5 bg-secondary-container h-[50%] rounded-t-sm"></div>
                  </div>
                </div>
              </div>
              {/* Pillar 3 */}
              <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm hover:shadow-ambient transition-shadow duration-300 group">
                <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center mb-6 text-on-tertiary-fixed group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <h3 className="font-headline text-2xl font-medium text-on-surface mb-3">Your reading archetype</h3>
                <p className="font-body text-on-surface-variant leading-relaxed mb-6">Classification based on rhythm, pitch, and pace to personalize your coaching.</p>
                <div className="bg-surface p-4 rounded-lg border border-outline-variant/20 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant">person_search</span>
                  </div>
                  <div>
                    <div className="font-label text-xs text-on-surface-variant uppercase tracking-wider mb-1">Archetype Detected</div>
                    <div className="font-headline text-lg font-medium text-primary">Careful Decoder</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f3f4f5] dark:bg-[#1d2021] w-full mt-auto border-t border-[#bec8cb]/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-8 w-full max-w-full mx-auto gap-6 md:gap-0">
          <div className="text-lg font-headline font-bold text-[#006778]">Akshara</div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="font-body text-sm text-[#40484a] dark:text-[#bec8cb] hover:text-[#006778] dark:hover:text-[#a8eefd] transition-all duration-200" href="#">About</a>
            <a className="font-body text-sm text-[#40484a] dark:text-[#bec8cb] hover:text-[#006778] dark:hover:text-[#a8eefd] transition-all duration-200" href="#">Methodology</a>
            <a className="font-body text-sm text-[#40484a] dark:text-[#bec8cb] hover:text-[#006778] dark:hover:text-[#a8eefd] transition-all duration-200" href="#">Privacy</a>
            <a className="font-body text-sm text-[#40484a] dark:text-[#bec8cb] hover:text-[#006778] dark:hover:text-[#a8eefd] transition-all duration-200" href="#">Terms</a>
            <a className="font-body text-sm text-[#40484a] dark:text-[#bec8cb] hover:text-[#006778] dark:hover:text-[#a8eefd] transition-all duration-200" href="#">Support</a>
          </div>
          <div className="font-body text-sm text-[#40484a] dark:text-[#bec8cb]">
            © 2024 Akshara Reading Fluency. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
