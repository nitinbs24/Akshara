import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { passagesApi } from '../services/api';

const ReadingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [passage, setPassage] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPassage = async () => {
      try {
        const data = await passagesApi.getPassage(id);
        setPassage(data);
      } catch (err) {
        console.error('Error fetching passage:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPassage();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!passage) {
    return <div className="min-h-screen flex items-center justify-center">Passage not found.</div>;
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleProcess = () => {
    console.log("Processing recording...");
    navigate('/results'); 
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col antialiased">
      {/* TopNavBar */}
      <nav className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50 border-b border-outline-variant/10 shadow-sm">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-[1440px] mx-auto">
          <Link to="/" className="text-2xl font-bold font-headline text-primary tracking-tight">
            Akshara
          </Link>
          <div className="hidden md:flex gap-8 items-center font-headline text-lg font-medium tracking-tight">
            <Link to="/practice" className="text-primary font-semibold border-b-2 border-primary pb-1">
              Practice
            </Link>
            <Link to="/history" className="text-on-surface-variant font-body hover:text-primary transition-colors">
              History
            </Link>
            <Link to="/progress" className="text-on-surface-variant font-body hover:text-primary transition-colors">
              Progress
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/profile" className="text-primary hover:text-primary-container transition-colors p-1">
              <span className="material-symbols-outlined text-3xl">account_circle</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-grow relative pb-40 flex flex-col items-center w-full px-4 sm:px-8">
        {/* Background Layering for Depth */}
        <div className="absolute inset-0 bg-surface-container-low -z-10 h-[409px] w-full rounded-b-[4rem] opacity-50"></div>
        
        {/* Editorial Context Header */}
        <header className="max-w-2xl text-center mt-16 mb-12">
          <span className="font-label text-sm uppercase tracking-[0.15em] font-bold text-on-surface-variant">{passage.cefr_level}</span>
          <h1 className="font-headline text-4xl md:text-5xl text-on-surface mt-4 mb-2 tracking-tight">{passage.title}</h1>
          <p className="font-body text-base text-on-surface-variant">{passage.author || "Anonymous"}</p>
        </header>

        {/* Reading Canvas */}
        <article className="bg-surface-container-lowest rounded-[2rem] pt-16 pb-20 pl-12 pr-20 md:pl-24 md:pr-32 max-w-4xl w-full shadow-[0_48px_80px_rgba(25,28,29,0.05)] relative z-10 transition-transform duration-500 hover:-translate-y-1">
          <div className="font-headline text-xl md:text-2xl leading-[1.8] text-on-surface space-y-8 tracking-tight selection:bg-tertiary-fixed selection:text-tertiary">
            {/* Split content by newlines if it's a single string, or handle array */}
            {Array.isArray(passage.text) 
              ? passage.text.map((paragraph, index) => <p key={index}>{paragraph}</p>)
              : passage.text.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)
            }
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary-container/30 to-transparent rounded-full mb-8"></div>
        </article>

        {/* Floating Action Controls */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-surface-container-lowest/80 backdrop-blur-[24px] rounded-full p-3 shadow-[0_32px_64px_rgba(25,28,29,0.08)] border border-outline-variant/20 flex items-center gap-4">
            <button className="font-label text-primary font-medium px-5 py-3 hover:bg-surface-container-highest rounded-full transition-colors flex items-center gap-2 group">
              <span className="material-symbols-outlined text-xl group-hover:-rotate-90 transition-transform duration-300">restart_alt</span>
              <span>Restart</span>
            </button>
            
            <button 
              onClick={toggleRecording}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-primary-fixed ${
                isRecording 
                  ? 'bg-error text-white animate-pulse shadow-[0_8px_16px_rgba(186,26,26,0.25)]' 
                  : 'hero-gradient text-white shadow-[0_8px_16px_rgba(0,78,89,0.25)] hover:scale-105'
              }`}
            >
              <span className="material-symbols-outlined text-[32px] group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isRecording ? 'stop' : 'mic'}
              </span>
            </button>
            
            <button 
              onClick={handleProcess}
              className="font-label text-primary font-medium px-5 py-3 border border-outline-variant/30 rounded-full hover:bg-surface-container-low transition-colors flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              <span>Process</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReadingPage;
