import { useState } from 'react';
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

  // Scroll tracking for long-form views
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Helper renderer to swap active tabs with fluid exit/entrance transitions
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView 
            setActiveTab={setActiveTab}
            setSelectedProject={setSelectedProject}
            setSelectedStory={(story) => {
              setSelectedStory(story);
              setActiveTab('story');
            }}
          />
        );
      case 'timeline':
        return <TimelineView />;
      case 'work':
        return <WorkView setSelectedProject={setSelectedProject} isSaudiGreenMode={isSaudiGreenMode} />;
      case 'about':
        return <AboutView isSaudiGreenMode={isSaudiGreenMode} />;
      case 'story':
        return (
          <StoryView 
            selectedStory={selectedStory} 
            setSelectedStory={setSelectedStory} 
          />
        );
      case 'contact':
        return <ContactView isSaudiGreenMode={isSaudiGreenMode} />;
      default:
        return (
          <HomeView 
            setActiveTab={setActiveTab}
            setSelectedProject={setSelectedProject}
            setSelectedStory={(story) => {
              setSelectedStory(story);
              setActiveTab('story');
            }}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-brand-green/30 selection:text-emerald-300 relative transition-all duration-500 ${
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
      
      {/* 1. LAYERED AMBIENT LIGHT LEAKS (Emulating vjy.me design style perfectly) */}
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
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // If swapping away from Story tab, clean deep-read selection state
          if (tab !== 'story') setSelectedStory(null);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        isSaudiGreenMode={isSaudiGreenMode}
        setSaudiGreenMode={setSaudiGreenMode}
      />

      {/* 3. MAIN TAB CONTENT */}
      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 w-full z-10 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. FOOTER */}
      <Footer 
        isSaudiGreenMode={isSaudiGreenMode}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'story') setSelectedStory(null);
        }} 
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
