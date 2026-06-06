import { useState, useEffect } from 'react';
import { TabID, Project, StoryItem } from './types';
import Header from './components/Header';
import HomeView from './components/HomeView';
import TimelineView from './components/TimelineView';
import WorkView from './components/WorkView';
import AboutView from './components/AboutView';
import StoryView from './components/StoryView';
import ContactView from './components/ContactView';
import Footer from './components/Footer';
import ProjectDetailsModal from './components/ProjectDetailsModal';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabID>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);
  const [isSaudiGreenMode, setSaudiGreenMode] = useState<boolean>(false);
  const [isScrollingFromNav, setIsScrollingFromNav] = useState<boolean>(false);

  // Scroll tracking for long-form views
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Helper method to scroll to section smoothly on nav click
  const handleTabChange = (tab: TabID) => {
    setActiveTab(tab);
    // If swapping away, clean deep-read selection state
    if (tab !== 'story') {
      setSelectedStory(null);
    }

    const element = document.getElementById(tab);
    if (element) {
      setIsScrollingFromNav(true);
      const headerOffset = 90; // Height of the sticky navigation header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Resume scrollspy tracker once smoothly scrolled
      setTimeout(() => {
        setIsScrollingFromNav(false);
      }, 1000);
    }
  };

  // Scroll spy effect using a robust IntersectionObserver
  useEffect(() => {
    if (isScrollingFromNav) return;

    const sections = ['home', 'timeline', 'work', 'about', 'story', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-110px 0px -55% 0px', // focused window in viewport
      threshold: 0.12
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the entry that has crossed into the viewport
      const activeEntry = entries.find((entry) => entry.isIntersecting);
      if (activeEntry) {
        setActiveTab(activeEntry.target.id as TabID);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [isScrollingFromNav]);

  return (
    <div className={`min-h-screen flex flex-col justify-between relative transition-all duration-500 ${
      isSaudiGreenMode 
        ? 'bg-[#0b0a0c] text-gray-100' 
        : 'bg-[#FAF6EB] text-[#0d5c56] theme-cream'
    }`}>
      
      {/* Scroll progress indicator line */}
      <motion.div
        id="scroll-progress-line"
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-[#00a36c] to-emerald-300 origin-left z-[100]"
        style={{ scaleX }}
      />
      
      {/* 1. LAYERED AMBIENT LIGHT LEAKS */}
      <div className="absolute inset-0 select-none overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 inset-x-0 h-[800px] grid-overlay opacity-30"></div>
        {/* Left Leak (affected by Saudi Green Toggle) */}
        <div className={`absolute top-[-100px] left-[-200px] w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full blur-[160px] opacity-70 transition-all duration-1000 ${
          isSaudiGreenMode 
            ? 'bg-gradient-to-tr from-[#005639]/30 to-emerald-500/10' 
            : 'bg-gradient-to-tr from-amber-500/10 to-transparent'
        }`}></div>
        
        {/* Right Leak (Secondary subtle neon blue/violet leak) */}
        <div className="absolute top-[200px] right-[-150px] w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full bg-indigo-500/[0.04] blur-[150px] opacity-60"></div>
      </div>

      {/* 2. NAVIGATION BAR */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        isSaudiGreenMode={isSaudiGreenMode}
        setSaudiGreenMode={setSaudiGreenMode}
      />

      {/* 3. MAIN SCROLL-SPY STACKED CONTENT */}
      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 w-full z-10 pt-4 space-y-24 md:space-y-32">
        <section id="home" className="scroll-mt-24">
          <HomeView 
            setActiveTab={handleTabChange}
            setSelectedProject={setSelectedProject}
            setSelectedStory={(story) => {
              setSelectedStory(story);
              handleTabChange('story');
            }}
          />
        </section>

        <section id="timeline" className="scroll-mt-24 pt-12 border-t border-white/[0.04]">
          <TimelineView />
        </section>

        <section id="work" className="scroll-mt-24 pt-12 border-t border-white/[0.04]">
          <WorkView setSelectedProject={setSelectedProject} isSaudiGreenMode={isSaudiGreenMode} />
        </section>

        <section id="about" className="scroll-mt-24 pt-12 border-t border-white/[0.04]">
          <AboutView isSaudiGreenMode={isSaudiGreenMode} />
        </section>

        <section id="story" className="scroll-mt-24 pt-12 border-t border-white/[0.04]">
          <StoryView 
            selectedStory={selectedStory} 
            setSelectedStory={setSelectedStory} 
          />
        </section>

        <section id="contact" className="scroll-mt-24 pt-12 border-t border-white/[0.04]">
          <ContactView isSaudiGreenMode={isSaudiGreenMode} />
        </section>
      </main>

      {/* 4. FOOTER */}
      <Footer 
        isSaudiGreenMode={isSaudiGreenMode}
        setActiveTab={handleTabChange} 
      />

      {/* 5. PORTFOLIO WORK DETAILS OVERLAY DRAWER */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
