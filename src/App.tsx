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
import QuizView from './components/QuizView';
import { ShieldCheck, Award, X } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabID>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);
  const [isSaudiGreenMode, setSaudiGreenMode] = useState<boolean>(false);
  const [isScrollingFromNav, setIsScrollingFromNav] = useState<boolean>(false);
  const [showQuizOnboarding, setShowQuizOnboarding] = useState<boolean>(false);

  // Scroll tracking for long-form views
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Show cybersecurity onboarding assessment popup on website load
  useEffect(() => {
    const hasSeen = sessionStorage.getItem('hasSeenCybersecurityQuizOnboarding');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setShowQuizOnboarding(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Helper method to scroll to section smoothly on nav click
  const handleTabChange = (tab: TabID) => {
    setActiveTab(tab);
    // If swapping away, clean deep-read selection state
    if (tab !== 'story') {
      setSelectedStory(null);
    }

    if (tab === 'quiz') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
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
    if (isScrollingFromNav || activeTab === 'quiz') return;

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
  }, [isScrollingFromNav, activeTab]);

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

      {/* 3. MAIN CONTENT (SCROLL-SPY STACKED OR QUIZ) */}
      <main className="flex-grow max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full z-10 pt-4 pb-16">
        {activeTab === 'quiz' ? (
          <QuizView 
            isSaudiGreenMode={isSaudiGreenMode} 
            onGoBack={() => handleTabChange('home')} 
          />
        ) : (
          <div className="space-y-24 md:space-y-32">
            <section id="home" className="scroll-mt-24">
              <HomeView 
                setActiveTab={handleTabChange}
                setSelectedProject={setSelectedProject}
                setSelectedStory={(story) => {
                  setSelectedStory(story);
                  handleTabChange('story');
                }}
                isSaudiGreenMode={isSaudiGreenMode}
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
          </div>
        )}
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

      {/* 6. SYSTEM ON-LOAD CYBERSECURITY READINESS POPUP */}
      <AnimatePresence>
        {showQuizOnboarding && (
          <div className="fixed inset-0 bg-black/80 z-[110] flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={`max-w-lg w-full p-6 sm:p-8 rounded-3xl border shadow-2xl relative ${
                isSaudiGreenMode 
                  ? 'bg-[#121115] border-emerald-500/20 text-white' 
                  : 'bg-white border-teal-100 text-[#0d5c56]'
              }`}
            >
              <button
                onClick={() => {
                  sessionStorage.setItem('hasSeenCybersecurityQuizOnboarding', 'true');
                  setShowQuizOnboarding(false);
                }}
                className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors focus:outline-none ${
                  isSaudiGreenMode ? 'text-gray-400 hover:text-white hover:bg-white/[0.05]' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                }`}
                aria-label="Close message"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl ${
                    isSaudiGreenMode ? 'bg-[#005639]/30 text-emerald-400' : 'bg-teal-50 text-teal-700'
                  }`}>
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl font-sans tracking-tight">
                    Ready to Test Your Cybersecurity Skills?
                  </h3>
                </div>

                <p className={`text-sm leading-relaxed ${
                  isSaudiGreenMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Take the Cyber Security Readiness Assessment and evaluate your knowledge across ethical hacking, network security, threat detection, and cybersecurity fundamentals.
                </p>

                <div className={`flex items-start gap-3 p-4 rounded-xl border ${
                  isSaudiGreenMode 
                    ? 'bg-[#005639]/10 border-emerald-500/20 text-emerald-300' 
                    : 'bg-amber-50/50 border-amber-200 text-amber-800'
                }`}>
                  <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold leading-normal">
                    Receive a personalized certificate upon successful completion.
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      sessionStorage.setItem('hasSeenCybersecurityQuizOnboarding', 'true');
                      setShowQuizOnboarding(false);
                      handleTabChange('quiz');
                    }}
                    className={`w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-1.5 keep-text-cream ${
                      isSaudiGreenMode 
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400' 
                        : 'bg-teal-600 hover:bg-teal-700'
                    }`}
                  >
                    <span className="keep-text-cream">Take the Quiz Now</span>
                  </button>
                  <button
                    onClick={() => {
                      sessionStorage.setItem('hasSeenCybersecurityQuizOnboarding', 'true');
                      setShowQuizOnboarding(false);
                    }}
                    className={`w-full sm:w-1/3 py-3 rounded-xl text-sm font-semibold transition-all border focus:outline-none ${
                      isSaudiGreenMode 
                        ? 'bg-transparent border-white/10 hover:bg-white/[0.04] text-gray-400' 
                        : 'bg-transparent border-gray-200 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
