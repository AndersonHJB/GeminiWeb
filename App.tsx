
import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { Footer } from './components/Footer';
import { SocialProfile } from './components/SocialProfile';
import { PROJECTS } from './constants';
import { ThemeMode } from './types';
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const ITEMS_PER_PAGE = 6;

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Pagination Logic
  const totalPages = Math.ceil(PROJECTS.length / ITEMS_PER_PAGE);
  const currentProjects = PROJECTS.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of grid
    const grid = document.getElementById('project-grid');
    if (grid) {
      // Offset for header
      const headerOffset = 100;
      const elementPosition = grid.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Scroll visibility logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme changes to HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (mode: ThemeMode) => {
      // Remove manual forcing if system, otherwise force
      if (mode === 'dark') {
        root.classList.add('dark');
      } else if (mode === 'light') {
        root.classList.remove('dark');
      } else {
        // System mode
        if (mediaQuery.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    applyTheme(theme);
    
    // Save to local storage
    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }

    // Listener for system changes when in system mode
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        if (e.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);

  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300 selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-indigo-200">
      
      {/* --- Tech Background System --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* 1. Base Gradient (Light: Subtle Cool White / Dark: Deep Space) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900" />
        
        {/* 2. Dot Matrix Pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.4] dark:opacity-[0.2]" />

        {/* 3. Ambient Glow Orbs (Future/Tech Feel) */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-[100%] blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[4000ms]" />
        
        {/* 4. Horizon Fade Mask (Make bottom fade to clean color) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent dark:from-slate-950" />
      </div>

      {/* Content wrapper with z-index to sit above background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        <main className="flex-grow container mx-auto px-6 pb-12">
          <div id="project-grid" className="scroll-mt-32 min-h-[800px]">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                 <AnimatePresence mode="popLayout">
                    {currentProjects.map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                 </AnimatePresence>
              </div>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mb-20">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-white dark:hover:bg-slate-900 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all backdrop-blur-sm bg-white/50 dark:bg-slate-900/50"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all backdrop-blur-sm ${
                      currentPage === page
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                        : 'bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-white dark:hover:bg-slate-900'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-white dark:hover:bg-slate-900 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all backdrop-blur-sm bg-white/50 dark:bg-slate-900/50"
                aria-label="Next Page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
          
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent mb-12 opacity-50"></div>

          <SocialProfile />
        </main>

        <Footer />

        {/* Floating Navigation Controls */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
          <button
            onClick={scrollToTop}
            className={`p-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-indigo-500/20 transition-all duration-300 transform ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}
            aria-label="回到顶部"
          >
            <ArrowUp className="w-5 h-5" />
          </button>

          <button
            onClick={scrollToBottom}
            className="p-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-indigo-500/20 transition-all duration-300 transform hover:scale-105"
            aria-label="滑到底部"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default App;
