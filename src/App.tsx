import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { TabID, Project, StoryItem } from './types';
import { PROJECTS_DATA } from './data';
import Header from './components/Header';
import HomeView from './components/HomeView';
import TimelineView from './components/TimelineView';
import WorkView from './components/WorkView';
import AboutView from './components/AboutView';
import StoryView from './components/StoryView';
import ContactView from './components/ContactView';
import Footer from './components/Footer';
import QuizView from './components/QuizView';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

const ProjectDetailPage = lazy(() => import('./components/ProjectDetailPage'));

const DEFAULT_TITLE = 'Mubin Roshan | Clinical Cybersecurity & Healthcare Data Analyst';
const DEFAULT_DESCRIPTION =
  'SecOps & Healthcare Data Analytics Portfolio of Mubin Roshan at Yanbu National Hospital — Clinical Infrastructure, Endpoint Defense, and Hospital IT Systems.';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabID>('home');
  const [pathname, setPathname] = useState<string>(() => window.location.pathname || '/');
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);
  const [isSaudiGreenMode, setSaudiGreenMode] = useState<boolean>(false);
  const [isScrollingFromNav, setIsScrollingFromNav] = useState<boolean>(false);

  const savedScrollYRef = useRef<number | null>(null);
  const pendingScrollTargetRef = useRef<{ type: 'y'; value: number } | { type: 'section'; id: string } | null>(null);

  // Scroll tracking for long-form views
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsScrollingFromNav(true);
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setTimeout(() => {
        setIsScrollingFromNav(false);
      }, 1000);
    }
  };

  // Browser back/forward button listener
  useEffect(() => {
    const handlePopState = () => {
      const nextPath = window.location.pathname || '/';
      setPathname(nextPath);

      if (nextPath === '/' || nextPath === '/index.html') {
        setActiveTab('work');
        if (savedScrollYRef.current !== null) {
          pendingScrollTargetRef.current = { type: 'y', value: savedScrollYRef.current };
        } else {
          pendingScrollTargetRef.current = { type: 'section', id: 'work' };
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Execute pending scroll restoration after returning to '/'
  useEffect(() => {
    const isHomeRoute = pathname === '/' || pathname === '' || pathname === '/index.html';
    if (!isHomeRoute || !pendingScrollTargetRef.current) return;

    const target = pendingScrollTargetRef.current;
    pendingScrollTargetRef.current = null;

    const timer = window.setTimeout(() => {
      if (target.type === 'y') {
        window.scrollTo({ top: target.value, behavior: 'instant' as ScrollBehavior });
      } else {
        scrollToSection(target.id);
      }
    }, 60);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  // Restore default document title & meta when on home route
  useEffect(() => {
    const isHomeRoute = pathname === '/' || pathname === '' || pathname === '/index.html';
    if (!isHomeRoute) return;

    document.title = DEFAULT_TITLE;
    const setMeta = (selector: string, content: string) => {
      const el = document.head.querySelector<HTMLMetaElement>(selector);
      if (el) el.setAttribute('content', content);
    };
    setMeta('meta[name="description"]', DEFAULT_DESCRIPTION);
    setMeta('meta[property="og:title"]', DEFAULT_TITLE);
    setMeta('meta[property="og:description"]', DEFAULT_DESCRIPTION);
  }, [pathname]);

  // Open a project full page from a card click
  const handleOpenProject = (proj: Project) => {
    savedScrollYRef.current = window.scrollY;
    const nextUrl = `/projects/${proj.slug}`;
    window.history.pushState({ projectSlug: proj.slug }, '', nextUrl);
    setPathname(nextUrl);
  };

  // Switch between projects via Next/Prev links on the project detail page
  const handleSelectProjectBySlug = (slug: string) => {
    const nextUrl = `/projects/${slug}`;
    window.history.pushState({ projectSlug: slug }, '', nextUrl);
    setPathname(nextUrl);
  };

  // Return to Portfolio Works section and restore scroll position
  const handleBackToWorks = () => {
    window.history.pushState(null, '', '/');
    setPathname('/');
    setActiveTab('work');
    if (savedScrollYRef.current !== null) {
      pendingScrollTargetRef.current = { type: 'y', value: savedScrollYRef.current };
    } else {
      pendingScrollTargetRef.current = { type: 'section', id: 'work' };
    }
  };

  // Helper method to scroll to section smoothly on nav click
  const handleTabChange = (tab: TabID) => {
    setActiveTab(tab);
    if (tab !== 'story') {
      setSelectedStory(null);
    }

    const isHomeRoute = pathname === '/' || pathname === '' || pathname === '/index.html';
    if (!isHomeRoute) {
      window.history.pushState(null, '', '/');
      setPathname('/');
      if (tab === 'quiz') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        pendingScrollTargetRef.current = { type: 'section', id: tab };
      }
      return;
    }

    if (tab === 'quiz') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    scrollToSection(tab);
  };

  // Scroll spy effect using a robust IntersectionObserver
  useEffect(() => {
    const isHomeRoute = pathname === '/' || pathname === '' || pathname === '/index.html';
    if (!isHomeRoute || isScrollingFromNav || activeTab === 'quiz') return;

    const sections = ['home', 'timeline', 'work', 'about', 'story', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-110px 0px -55% 0px',
      threshold: 0.12
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
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
  }, [isScrollingFromNav, activeTab, pathname]);

  // Route matching
  const normalizedPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const isHomeRoute = normalizedPath === '/' || normalizedPath === '' || normalizedPath === '/index.html';
  const projectSlugMatch = normalizedPath.startsWith('/projects/')
    ? normalizedPath.replace('/projects/', '').trim()
    : null;
  const matchedProject = projectSlugMatch
    ? PROJECTS_DATA.find((p) => p.slug === projectSlugMatch) || null
    : null;
  const isNotFound = !isHomeRoute && !matchedProject;

  useEffect(() => {
    if (isNotFound) {
      document.title = '404 — Page Not Found | Mubin Roshan';
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [isNotFound]);

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
        activeTab={isHomeRoute ? activeTab : 'work'} 
        setActiveTab={handleTabChange}
        isSaudiGreenMode={isSaudiGreenMode}
        setSaudiGreenMode={setSaudiGreenMode}
      />

      {/* 3. MAIN CONTENT (HOME, PROJECT FULL PAGE, QUIZ, OR 404) */}
      <main className="flex-grow max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full z-10 pt-4 pb-16">
        {matchedProject ? (
          <Suspense
            fallback={
              <div className="py-24 text-center">
                <span className="text-xs font-mono uppercase tracking-widest text-[#00a36c] animate-pulse">
                  Loading Case Study...
                </span>
              </div>
            }
          >
            <ProjectDetailPage
              project={matchedProject}
              allProjects={PROJECTS_DATA}
              onBackToWorks={handleBackToWorks}
              onSelectProject={handleSelectProjectBySlug}
              onContactClick={() => handleTabChange('contact')}
              isSaudiGreenMode={isSaudiGreenMode}
            />
          </Suspense>
        ) : isNotFound ? (
          <section className="py-20 sm:py-28 flex items-center justify-center">
            <div className="max-w-lg w-full bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-12 text-center space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-[#005639]/20 border border-[#00a36c]/30 flex items-center justify-center mx-auto">
                <ShieldAlert className="w-7 h-7 text-[#00a36c]" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#00a36c] font-bold">
                  Error 404 · Route Not Found
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                  Page Not Found
                </h1>
                <p className="text-xs sm:text-sm text-white/55 leading-relaxed">
                  The requested URL does not match any clinical engineering archive or portfolio route.
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    window.history.pushState(null, '', '/');
                    setPathname('/');
                    setActiveTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#005639] hover:bg-[#00704a] text-white keep-text-white font-mono text-xs sm:text-sm font-semibold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400"
                >
                  <ArrowLeft className="w-4 h-4 keep-text-white" />
                  <span className="keep-text-white">Back to home</span>
                </button>
              </div>
            </div>
          </section>
        ) : activeTab === 'quiz' ? (
          <QuizView 
            isSaudiGreenMode={isSaudiGreenMode} 
            onGoBack={() => handleTabChange('home')} 
          />
        ) : (
          <div className="space-y-24 md:space-y-32">
            <section id="home" className="scroll-mt-24">
              <HomeView 
                setActiveTab={handleTabChange}
                onSelectProject={handleOpenProject}
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
              <WorkView onSelectProject={handleOpenProject} isSaudiGreenMode={isSaudiGreenMode} />
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

    </div>
  );
}
