import React, { useState, useEffect } from 'react';
import { TabID } from '../types';
import { AVATAR_URL } from '../data';
import mrLogoTealRemovebg from '../assets/images/mr_logo_teal_removebg.png';
import { 
  Twitter, 
  Linkedin, 
  Instagram,
  Youtube, 
  Moon, 
  Sun, 
  ChevronDown, 
  ArrowUpRight,
  ShieldAlert,
  Terminal,
  FileCheck2,
  Heart,
  FileDown,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { handleDownloadResume } from '../utils';

interface HeaderProps {
  activeTab: TabID;
  setActiveTab: (tab: TabID) => void;
  isSaudiGreenMode: boolean;
  setSaudiGreenMode: (val: boolean) => void;
}

export default function Header({ 
  activeTab, 
  setActiveTab, 
  isSaudiGreenMode, 
  setSaudiGreenMode 
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showStatusAlert, setShowStatusAlert] = useState(false);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('#tab-more')) {
        return;
      }
      setDropdownOpen(false);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [dropdownOpen]);

  const navItems = [
    { id: 'home', label: 'home' },
    { id: 'timeline', label: 'timeline', badge: 5 },
    { id: 'work', label: 'work' },
    { id: 'about', label: 'about' },
    { id: 'story', label: 'story', badge: 3 },
    { id: 'contact', label: 'contact' }
  ];

  const moreLinks = [
    { label: 'Technical Stack', icon: <Terminal className="w-4 h-4 text-emerald-600" />, action: () => { setActiveTab('about'); setDropdownOpen(false); } },
    { label: 'NCA ECC Guidelines', icon: <FileCheck2 className="w-4 h-4 text-emerald-600" />, action: () => { setActiveTab('story'); setDropdownOpen(false); } },
    { label: 'Yanbu Hospital Portal', icon: <ShieldAlert className="w-4 h-4 text-teal-600" />, href: 'https://www.moh.gov.sa', external: true }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b0a0c]/85 backdrop-blur-md border-b border-white/[0.04]">
      <div className="max-w-5xl mx-auto px-2 lg:px-4 py-2.5 lg:py-3 flex items-center justify-between gap-1.5 lg:gap-3 relative">
        
        {/* Mobile Menu Button - 3 bar icon at top left */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-gray-300 hover:text-white hover:bg-white/[0.05] rounded-xl focus:outline-none shrink-0 z-10"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5.5 h-5.5 text-teal-400" /> : <Menu className="w-5.5 h-5.5" />}
        </button>

        {/* Mobile Centered Logo - perfectly centered on mobile browsers in the middle of the page */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center md:hidden cursor-pointer gap-1.5 z-10"
          id="nav-avatar-mobile"
        >
          <img 
            src={mrLogoTealRemovebg} 
            alt="Mubin Roshan Logo" 
            className="h-8 w-auto object-contain transition-transform duration-300 active:scale-95"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Left: Avatar replaced with MR_LOGO fitting the header directly without backgrounds or circles */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="hidden md:flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group select-none outline-none focus:outline-none shrink-0"
          id="nav-avatar"
        >
          <img 
            src={mrLogoTealRemovebg} 
            alt="Mubin Roshan Logo" 
            className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="hidden min-[480px]:block shrink-0">
            <span className="font-serif font-bold text-xs xs:text-sm sm:text-base lg:text-lg xl:text-xl tracking-normal text-white group-hover:text-teal-400 transition-colors whitespace-nowrap">mubin.roshan</span>
            <div className="text-[9px] sm:text-[10px] text-gray-500 font-mono flex items-center gap-1 sm:gap-1.5 mt-0.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0"></span>
              SecOps // Active
            </div>
          </div>
        </div>

        {/* Center: Tabs mimicking vjy.me design exactly but with curved round teal hover boxes */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 xl:gap-2.5 text-[11px] lg:text-xs xl:text-sm justify-center">
          <button 
            id="tab-home"
            tabIndex={0}
            onClick={() => setActiveTab('home')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTab('home'); } }}
            className={`relative px-2 py-1 lg:px-3 lg:py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
              activeTab === 'home' 
                ? 'font-bold text-white bg-teal-600 border-teal-600 shadow-sm shadow-teal-500/10 keep-teal-active' 
                : isSaudiGreenMode 
                  ? 'text-gray-300 border-transparent hover:text-white hover:bg-teal-600/10 hover:border-teal-500/10'
                  : 'text-gray-700 border-transparent hover:text-teal-800 hover:bg-teal-600/10 hover:border-teal-500/10'
            }`}
          >
            home
          </button>

          <button 
            id="tab-timeline"
            tabIndex={0}
            onClick={() => setActiveTab('timeline')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTab('timeline'); } }}
            className={`relative px-2 py-1 lg:px-3 lg:py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
              activeTab === 'timeline' 
                ? 'font-bold text-white bg-teal-600 border-teal-600 shadow-sm shadow-teal-500/10 keep-teal-active' 
                : isSaudiGreenMode 
                  ? 'text-gray-300 border-transparent hover:text-white hover:bg-teal-600/10 hover:border-teal-500/10'
                  : 'text-gray-700 border-transparent hover:text-teal-800 hover:bg-teal-600/10 hover:border-teal-500/10'
            }`}
          >
            timeline
            <span className={`absolute -top-1.5 -right-2 text-[10px] font-bold font-mono px-1.5 py-0.2 rounded-full scale-90 border text-white !text-white ${
              isSaudiGreenMode 
                ? 'bg-[#005639] border-[#00a36c]/40' 
                : 'bg-teal-600 border-teal-600'
            }`}>
              5
            </span>
          </button>

          <button 
            id="tab-work"
            tabIndex={0}
            onClick={() => setActiveTab('work')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTab('work'); } }}
            className={`relative px-2 py-1 lg:px-3 lg:py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
              activeTab === 'work' 
                ? 'font-bold text-white bg-teal-600 border-teal-600 shadow-sm shadow-teal-500/10 keep-teal-active' 
                : isSaudiGreenMode 
                  ? 'text-gray-300 border-transparent hover:text-white hover:bg-teal-600/10 hover:border-teal-500/10'
                  : 'text-gray-700 border-transparent hover:text-teal-800 hover:bg-teal-600/10 hover:border-teal-500/10'
            }`}
          >
            work
          </button>

          <button 
            id="tab-about"
            tabIndex={0}
            onClick={() => setActiveTab('about')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTab('about'); } }}
            className={`relative px-2 py-1 lg:px-3 lg:py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
              activeTab === 'about' 
                ? 'font-bold text-white bg-teal-600 border-teal-600 shadow-sm shadow-teal-500/10 keep-teal-active' 
                : isSaudiGreenMode 
                  ? 'text-gray-300 border-transparent hover:text-white hover:bg-teal-600/10 hover:border-teal-500/10'
                  : 'text-gray-700 border-transparent hover:text-teal-800 hover:bg-teal-600/10 hover:border-teal-500/10'
            }`}
          >
            about
          </button>

          <button 
            id="tab-story"
            tabIndex={0}
            onClick={() => setActiveTab('story')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTab('story'); } }}
            className={`relative px-2 py-1 lg:px-3 lg:py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
              activeTab === 'story' 
                ? 'font-bold text-white bg-teal-600 border-teal-600 shadow-sm shadow-teal-500/10 keep-teal-active' 
                : isSaudiGreenMode 
                  ? 'text-gray-300 border-transparent hover:text-white hover:bg-teal-600/10 hover:border-teal-500/10'
                  : 'text-gray-700 border-transparent hover:text-teal-800 hover:bg-teal-600/10 hover:border-teal-500/10'
            }`}
          >
            story
            <span className={`absolute -top-1.5 -right-2 text-[10px] font-bold font-mono px-1.5 py-0.2 rounded-full scale-90 border text-white !text-white ${
              isSaudiGreenMode 
                ? 'bg-[#005639] border-[#00a36c]/30' 
                : 'bg-teal-600 border-teal-600'
            }`}>
              3
            </span>
          </button>

          <button 
            id="tab-contact"
            tabIndex={0}
            onClick={() => setActiveTab('contact')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTab('contact'); } }}
            className={`relative px-2 py-1 lg:px-3 lg:py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
              activeTab === 'contact' 
                ? 'font-bold text-white bg-teal-600 border-teal-600 shadow-sm shadow-teal-500/10 keep-teal-active' 
                : isSaudiGreenMode 
                  ? 'text-gray-300 border-transparent hover:text-white hover:bg-teal-600/10 hover:border-teal-500/10'
                  : 'text-gray-700 border-transparent hover:text-teal-800 hover:bg-teal-600/10 hover:border-teal-500/10'
            }`}
          >
            contact
          </button>

          {/* More dropdown */}
          <div className="relative">
            <button 
              id="tab-more"
              tabIndex={0}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setDropdownOpen(!dropdownOpen); } }}
              className={`flex items-center gap-1 px-2 py-1 lg:px-3 lg:py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
                dropdownOpen 
                  ? 'font-bold text-white bg-teal-600 border-teal-600 shadow-sm keep-teal-active' 
                  : isSaudiGreenMode 
                    ? 'text-gray-300 border-transparent hover:text-white hover:bg-teal-600/10 hover:border-teal-500/10'
                    : 'text-gray-700 border-transparent hover:text-teal-800 hover:bg-teal-600/10 hover:border-teal-500/10'
              }`}
            >
              more
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute right-0 mt-3 w-64 rounded-2xl bg-white border border-gray-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.15)] z-20 flex flex-col gap-1.5 p-2 focus:outline-none"
                >
                  {moreLinks.map((link, idx) => (
                    <div 
                      key={idx}
                      className="bg-gray-50/70 hover:bg-teal-50/40 border border-gray-100 hover:border-teal-200 rounded-xl p-0.5 transition-all duration-300 shadow-sm hover:shadow"
                    >
                      {link.href ? (
                        <a 
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-xs lg:text-sm text-gray-700 hover:text-teal-800 transition-all font-mono outline-none focus:outline-none"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <span className="flex items-center gap-2">
                            {link.icon}
                            <span>{link.label}</span>
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 hover:text-teal-600" />
                        </a>
                      ) : (
                        <button
                          onClick={link.action}
                          className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-xs lg:text-sm text-gray-700 hover:text-teal-800 transition-all font-mono outline-none focus:outline-none"
                        >
                          {link.icon}
                          <span>{link.label}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <a 
            href="https://www.linkedin.com/in/mubinroshan/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn Profile"
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-[#00a36c]/10 hover:border-[#00a36c]/30 border border-transparent transition-all hidden xl:flex"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a 
            href="https://www.instagram.com/mubin_richu" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram Profile"
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-[#00a36c]/10 hover:border-[#00a36c]/30 border border-transparent transition-all hidden xl:flex"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Twitter Profile"
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-[#00a36c]/10 hover:border-[#00a36c]/30 border border-transparent transition-all hidden xl:flex"
          >
            <Twitter className="w-4 h-4" />
          </a>
          
          {/* Professional Download Resume Button */}
          <button
            id="download-resume-header"
            onClick={handleDownloadResume}
            className="group flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 lg:px-3 lg:py-1.5 rounded-xl border border-white/5 text-[11px] lg:text-xs xl:text-sm font-mono text-gray-300 hover:text-white hover:border-[#00a36c]/40 bg-white/[0.01] hover:bg-[#005639]/10 transition-all duration-300 relative overflow-hidden shrink-0"
            title="Download Mubin Roshan's Resume"
          >
            {/* Ambient green hover leak background */}
            <span className="absolute inset-0 bg-gradient-to-tr from-[#005639]/20 to-[#00a36c]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></span>
            {/* Left accent marker lines */}
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3 bg-[#00a36c] opacity-50 group-hover:h-5 group-hover:bg-[#00a36c] transition-all duration-300"></span>
            
            <FileDown className="w-3.5 h-3.5 text-[#00a36c] group-hover:scale-110 transition-transform duration-300 relative z-10" />
            <span className="relative z-10">resume</span>
          </button>
          
          {/* Saudi Green Glow Aesthetic Mode Switch */}
          <button 
            id="theme-toggler"
            onClick={() => {
              setSaudiGreenMode(!isSaudiGreenMode);
              setShowStatusAlert(true);
              setTimeout(() => setShowStatusAlert(false), 3500);
            }}
            className={`p-1.5 sm:p-2 rounded-xl border transition-all duration-300 ${
              isSaudiGreenMode 
                ? 'bg-brand-green/20 text-emerald-400 border-brand-green/50' 
                : 'bg-white/[0.02] text-gray-400 border-white/5 hover:text-white hover:bg-white/[0.04]'
            }`}
            title="Toggle Saudi Emerald Theme Glow"
          >
            {isSaudiGreenMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Nav Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden border-t border-[#FAF6EB]/10 bg-[#0d5c56] overflow-hidden backdrop-blur-md shadow-xl mobile-nav-container"
          >
            <div className="flex flex-col gap-2 p-4">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setTimeout(() => {
                        setActiveTab(item.id as TabID);
                      }, 250);
                    }}
                    className={`w-full text-left px-5 py-3 rounded-xl border text-sm font-bold transition-all flex items-center justify-between outline-none focus:outline-none ${
                      isActive
                        ? 'text-[#0d5c56] bg-[#FAF6EB] border-[#FAF6EB] shadow-md font-extrabold active'
                        : 'text-white !text-white border-transparent hover:bg-white/[0.08] inactive'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full border badge ${
                        isActive 
                          ? 'bg-[#0d5c56] text-[#FAF6EB] border-[#0d5c56] active-badge' 
                          : 'bg-[#FAF6EB]/20 text-[#FAF6EB] border-[#FAF6EB]/40 inactive-badge'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
              
              <div className="border-t border-[#FAF6EB]/15 pt-3 mt-2">
                <p className="text-[10px] font-mono uppercase text-[#FAF6EB]/60 px-4 mb-2 mobile-section-title">More Resources</p>
                {moreLinks.map((link, idx) => (
                  <div key={idx} className="mb-1.5 last:mb-0">
                    {link.href ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full text-left px-4 py-2.5 rounded-xl border border-transparent text-xs text-[#FAF6EB]/80 hover:text-white hover:bg-[#FAF6EB]/10 font-mono transition-colors mobile-resource-link"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="flex items-center gap-2">
                          {React.cloneElement(link.icon as React.ReactElement, { className: 'w-4 h-4 text-[#FAF6EB] mobile-icon' })}
                          <span>{link.label}</span>
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#FAF6EB]/50 mobile-arrow" />
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setTimeout(() => {
                            if (link.action) link.action();
                          }, 250);
                        }}
                        className="flex items-center gap-2 w-full text-left px-4 py-2.5 rounded-xl border border-transparent text-xs text-[#FAF6EB]/80 hover:text-[#FAF6EB] hover:bg-[#FAF6EB]/10 font-mono transition-colors mobile-resource-link"
                      >
                        {React.cloneElement(link.icon as React.ReactElement, { className: 'w-4 h-4 text-[#FAF6EB] mobile-icon' })}
                        <span>{link.label}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Status Notification on Theme Toggling */}
      <AnimatePresence>
        {showStatusAlert && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#121115] border border-[#005639]/40 text-gray-300 text-xs px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 font-mono"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>
              {isSaudiGreenMode 
                ? 'Emulating rich Saudi Custom Healthcare Ambient glow (#005639).'
                : 'Entering high-contrast Deep-Space Tactical Mode.'
              }
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
