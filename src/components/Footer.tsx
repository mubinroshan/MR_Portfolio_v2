import { useState, useEffect } from 'react';
import { TabID } from '../types';
import { Heart, ShieldCheck, Mail, Copy, ArrowUpRight } from 'lucide-react';
import NotificationToast from './NotificationToast';
import { handleDownloadResume } from '../utils';

interface FooterProps {
  setActiveTab: (tab: TabID) => void;
  isSaudiGreenMode?: boolean;
}

export default function Footer({ setActiveTab, isSaudiGreenMode = true }: FooterProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Copied to Clipboard!");
  const [copied, setCopied] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Download states for satisfying resume download feedback
  const [downloading, setDownloading] = useState(false);
  const [showDownloadConf, setShowDownloadConf] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const email = "mubinroshanksa@gmail.com";
  const duration = 4000;

  useEffect(() => {
    if (copied) {
      // Delay showing confirmation to allow blur-out animation
      const showTimer = setTimeout(() => {
        setShowConfirmation(true);
      }, 400);

      setProgress(0);
      const startTime = Date.now();
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);
        
        if (elapsed >= duration) {
          clearInterval(interval);
          setShowConfirmation(false);
          setTimeout(() => {
            setCopied(false);
            setProgress(0);
          }, 400);
        }
      }, 16);

      return () => {
        clearInterval(interval);
        clearTimeout(showTimer);
      };
    }
  }, [copied]);

  // Satisfying download progress loop simulating download and checking it off
  useEffect(() => {
    if (downloading) {
      const showTimer = setTimeout(() => {
        setShowDownloadConf(true);
      }, 400);

      setDownloadProgress(0);
      const startTime = Date.now();
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setDownloadProgress(newProgress);
        
        if (elapsed >= duration) {
          clearInterval(interval);
          setShowDownloadConf(false);
          setTimeout(() => {
            setDownloading(false);
            setDownloadProgress(0);
          }, 400);
        }
      }, 16);

      return () => {
        clearInterval(interval);
        clearTimeout(showTimer);
      };
    }
  }, [downloading]);
  
  const handleNavClick = (tab: TabID) => {
    setActiveTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onDownloadResumeClick = () => {
    if (downloading) return;
    setDownloading(true);
    handleDownloadResume();
    
    setToastMessage("Resume PDF download initiated successfully!");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch (err) {
      // Fallback for when Clipboard API is blocked
      const text = document.createElement('textarea');
      text.value = email;
      text.style.position = 'fixed';
      text.style.left = '-9999px';
      text.style.top = '-9999px';
      document.body.appendChild(text);
      text.focus();
      text.select();
      document.execCommand('copy');
      document.body.removeChild(text);
    }
    setToastMessage("Copied to Clipboard!");
    setCopied(true);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  };

  const footerLinks = [
    { label: 'timeline', action: () => handleNavClick('timeline') },
    { label: 'projects', action: () => handleNavClick('work') },
    { label: 'about', action: () => handleNavClick('about') },
    { label: 'story', action: () => handleNavClick('story') },
    { label: 'contact', action: () => handleNavClick('contact') },
    { label: 'secops audits', action: () => handleNavClick('story') }
  ];

  return (
    <div className={`w-full relative overflow-visible pt-16 mt-16 md:mt-24 transition-colors duration-500 ${
      isSaudiGreenMode ? 'bg-[#0b0a0c]' : 'bg-[#FAF6EB]'
    }`}>
      
      {/* Curved Container Wrapper */}
      <footer className="w-full bg-[#051616] pt-12 lg:pt-24 pb-10 relative overflow-visible rounded-t-[36px] sm:rounded-t-[48px] md:rounded-t-[64px] shadow-[0_-12px_44px_rgba(0,0,0,0.15)] border-t border-teal-500/10">
        
        {/* Dynamic Contour Lines Overlay (Topographical Contour aesthetics) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] sm:opacity-[0.05] stroke-teal-500" viewBox="0 0 1000 400" preserveAspectRatio="none">
          <path d="M -100,200 Q 200,100 500,300 T 1100,150" fill="none" strokeWidth="1.5" />
          <path d="M -100,250 Q 200,140 500,340 T 1100,190" fill="none" strokeWidth="1.5" />
          <path d="M -100,300 Q 200,180 500,380 T 1100,230" fill="none" strokeWidth="1.5" />
          <path d="M 300,-100 Q 600,200 900,-50 T 1200,100" fill="none" strokeWidth="1.5" />
          <path d="M 250,-100 Q 550,240 850,-10 T 1150,140" fill="none" strokeWidth="1.5" />
          <path d="M 200,-100 Q 500,280 800,30 T 1100,180" fill="none" strokeWidth="1.5" />
        </svg>

        {/* absolute top-center Logo Star (half-inside, half-outside) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative group cursor-pointer" onClick={() => handleNavClick('home')}>
            <img 
              src="/favicon.png" 
              alt="Mubin Roshan Star Logo" 
              className="relative w-20 h-20 sm:w-26 sm:h-26 md:w-32 md:h-32 object-contain hover:rotate-12 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Main Footer Inner Container */}
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 relative overflow-visible">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start align-top relative z-10 pt-8 sm:pt-12">
            
            {/* Left Column: Connect and Social links inside a same-size premium beige card */}
            <div className="flex flex-col text-left items-start lg:col-span-3 lg:justify-self-start w-full">
              <div className="w-full lg:w-[285px] lg:mr-auto bg-[#FAF6EB] text-[#051616] p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#0d5c56]/15 hover:border-[#0d5c56]/30 transition-all duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-[#051616] tracking-tight text-left">
                  Connect
                </h3>
                
                {/* Clean partial/half divider line */}
                <div className="w-1/2 h-[1.5px] bg-[#051616]/15 my-3.5 mr-auto" />
                
                {/* Email Section inside the card */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono uppercase text-[#051616]/60 block mb-1.5 font-bold tracking-wider">Email</span>
                  <div id="copy-email-section" className="w-full">
                    <button
                      id="copy-email-btn"
                      onClick={copyEmailToClipboard}
                      disabled={copied}
                      className="relative overflow-hidden flex items-center justify-between bg-white border border-[#0d5c56]/15 hover:border-[#00a36c]/40 rounded-xl px-3 py-1.5 w-full h-[38px] font-mono group cursor-pointer shadow-sm transition-all text-left"
                      title="Click to copy email address"
                    >
                      {/* Progress background */}
                      <div 
                        className="absolute left-0 top-0 bottom-0 bg-[#0d5c56]/10"
                        style={{ 
                          width: `${progress}%`,
                          opacity: copied ? 1 : 0,
                          transition: 'opacity 0.3s ease',
                        }}
                      />
                      {/* Normal Content */}
                      <div 
                        className="absolute inset-x-0 top-0 bottom-0 flex items-center justify-between px-3 h-full"
                        style={{
                          opacity: copied ? 0 : 1,
                          transform: copied ? 'scale(0.95)' : 'scale(1)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <span className="text-[#051616] hover:text-[#00a36c] transition-colors font-semibold whitespace-nowrap text-[10px] sm:text-[11px] md:text-[12px] lg:text-[11px] xl:text-[11px] mr-1">{email}</span>
                        <Copy className="w-3.5 h-3.5 text-[#051616]/40 group-hover:text-[#00a36c] shrink-0 ml-1" />
                      </div>
                      {/* Saved Content */}
                      <div 
                        className="absolute inset-x-0 flex items-center justify-center gap-1"
                        style={{
                          opacity: showConfirmation ? 1 : 0,
                          transform: showConfirmation ? 'scale(1)' : 'scale(1.05)',
                          transition: 'all 0.4s ease',
                        }}
                      >
                        <div className="w-3.5 h-3.5 bg-[#00a36c] rounded-full flex items-center justify-center shrink-0">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[11px] font-bold text-[#051616]">Copied!</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Vertical Social Links inside the card */}
                <div className="flex flex-col space-y-2.5 border-t border-[#051616]/10 pt-4 w-full">
                  <a 
                    href="https://www.linkedin.com/in/mubinroshan/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-sans text-[#051616]/85 hover:text-[#00a36c] transition-colors flex items-center justify-between group"
                  >
                    <span className="font-medium">LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#051616]/30 group-hover:text-[#00a36c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </a>
                  <a 
                    href="https://github.com/mubinroshan" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-sans text-[#051616]/85 hover:text-[#00a36c] transition-colors flex items-center justify-between group"
                  >
                    <span className="font-medium">GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#051616]/30 group-hover:text-[#00a36c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </a>
                  <a 
                    href="https://www.instagram.com/mubin_richu" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-sans text-[#051616]/85 hover:text-[#00a36c] transition-colors flex items-center justify-between group"
                  >
                    <span className="font-medium">Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#051616]/30 group-hover:text-[#00a36c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </a>
                  <a 
                    href="https://x.com/mubinroshan" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-sans text-[#051616]/85 hover:text-[#00a36c] transition-colors flex items-center justify-between group"
                  >
                    <span className="font-medium">X Account</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#051616]/30 group-hover:text-[#00a36c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </a>
                </div>
              </div>
            </div>

            {/* Middle Column: Dynamic Site Navigation Index inside a same-size premium beige card */}
            <div className="flex flex-col text-left items-start w-full lg:col-span-3">
              <div className="w-full lg:w-[285px] lg:mr-auto bg-[#FAF6EB] text-[#051616] p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#0d5c56]/15 hover:border-[#0d5c56]/30 transition-all duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-[#051616] tracking-tight text-left">
                  Explore
                </h3>
                
                {/* Clean partial/half divider line */}
                <div className="w-1/2 h-[1.5px] bg-[#051616]/15 my-3.5 mr-auto" />
                
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-3 font-sans text-sm text-[#051616]/85">
                  {footerLinks.map((link, idx) => (
                    <button
                      key={idx}
                      onClick={link.action}
                      className="hover:text-[#00a36c] transition-colors cursor-pointer text-left capitalize font-medium transition-all hover:translate-x-1 duration-200"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Big name branding & capsule actions in matching system beige */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-end text-center lg:text-right space-y-7 pt-4 lg:pt-2 lg:justify-self-end w-full">
              <div className="space-y-2 max-w-lg">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#FAF6EB] tracking-tight leading-none uppercase whitespace-nowrap">
                  Mubin Roshan
                </h2>
                <p className="font-serif italic text-base sm:text-lg text-[#FAF6EB]/75">
                  Where Security Meets Intelligence
                </p>
              </div>

              {/* Styled Pill Actions matching the golf reference buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-3.5 w-full sm:w-auto">
                {/* Active Bright green Pill with download loading animation */}
                <button
                  onClick={onDownloadResumeClick}
                  disabled={downloading}
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#00a36c] text-[#FAF6EB] hover:bg-[#008d5c] font-bold text-[11px] sm:text-xs md:text-sm tracking-wider uppercase rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#00a36c]/10 hover:shadow-[#00a36c]/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer h-[48px] sm:h-[50px] relative overflow-hidden"
                >
                  {/* Progress background */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 bg-white/20"
                    style={{ 
                      width: `${downloadProgress}%`,
                      opacity: downloading ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                  
                  {/* Normal Content */}
                  <div 
                    className="flex items-center justify-center gap-2 transition-all duration-300 h-full w-full"
                    style={{
                      opacity: downloading ? 0 : 1,
                      transform: downloading ? 'scale(0.95)' : 'scale(1)',
                    }}
                  >
                    <span className="text-[#FAF6EB] hover:text-[#FAF6EB]">Download Resume</span>
                    <span className="text-sm font-bold text-[#FAF6EB]">→</span>
                  </div>

                  {/* Downloaded Confirmation Content */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center gap-2"
                    style={{
                      opacity: showDownloadConf ? 1 : 0,
                      transform: showDownloadConf ? 'scale(1)' : 'scale(1.05)',
                      transition: 'all 0.4s ease',
                    }}
                  >
                    <div className="w-4 h-4 bg-[#FAF6EB] text-[#00a36c] rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-[#00a36c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[11px] sm:text-xs md:text-sm font-bold text-[#FAF6EB]">Downloaded!</span>
                  </div>
                </button>

                {/* Second Dark Green Outlined Pill with system-matching beige text color */}
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#071f1e]/60 text-[#FAF6EB] hover:text-[#FAF6EB] border border-teal-500/20 hover:border-teal-400/40 hover:bg-[#0c2f2d]/80 font-bold text-[11px] sm:text-xs md:text-sm tracking-wider uppercase rounded-full flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer h-[48px] sm:h-[50px]"
                >
                  <span className="text-[#FAF6EB] hover:text-[#FAF6EB]">Let's connect</span>
                  <span className="text-sm font-bold text-[#FAF6EB]">→</span>
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Footer Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5 mt-16 relative z-10 w-full">
            {/* Left: Security and framework tags */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-white/40">
              <ShieldCheck className="w-4 h-4 text-[#00a36c]" />
              <span>Developed with React, Tailwind & motion</span>
            </div>

            {/* Right: The Cream legal info capsule pill from the reference design */}
            <div className="bg-[#FAF6EB] text-[#0d5c56] px-5 py-2 rounded-full text-[11px] sm:text-xs md:text-sm lg:text-[15px] font-bold tracking-wide shadow-md flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border border-[#0d5c56]/10 shrink-0">
              <button 
                onClick={() => { 
                  setToastMessage("Cookies are managed secure and offline."); 
                  setShowToast(true); 
                  setTimeout(() => setShowToast(false), 2500); 
                }} 
                className="hover:underline transition-all cursor-pointer"
              >
                Cookies policy
              </button>
              <span className="text-[#0d5c56]/20 select-none">|</span>
              <button 
                onClick={() => { 
                  setToastMessage("End-to-end data encryption is active."); 
                  setShowToast(true); 
                  setTimeout(() => setShowToast(false), 2500); 
                }} 
                className="hover:underline transition-all cursor-pointer"
              >
                Privacy policy
              </button>
              <span className="text-[#0d5c56]/20 select-none">|</span>
              <span className="select-none">© {new Date().getFullYear()}</span>
            </div>
          </div>

        </div>

        {/* Floating toast notification wrapper */}
        <NotificationToast 
          show={showToast} 
          message={toastMessage} 
          isSaudiGreenMode={isSaudiGreenMode} 
        />

      </footer>
    </div>
  );
}
