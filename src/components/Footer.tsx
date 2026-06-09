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
  
  const handleNavClick = (tab: TabID) => {
    setActiveTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
            
            {/* Left Column: Contact and Social Links */}
            <div className="flex flex-col space-y-6 text-left items-start lg:col-span-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">Contact</h3>
                <p className="text-sm font-sans text-white/70">Medina, Saudi Arabia</p>
                <p className="text-xs font-mono text-[#00a36c] mt-1 uppercase tracking-wider">Cybersecurity & Data Analyst</p>
              </div>

              {/* Email Button with premium copy engine */}
              <div id="copy-email-section" className="w-full max-w-[245px] sm:max-w-[265px] md:max-w-[285px]">
                <button
                  id="copy-email-btn"
                  onClick={copyEmailToClipboard}
                  disabled={copied}
                  className="relative overflow-hidden flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-teal-400/30 rounded-xl px-4 py-2 w-full h-[42px] sm:h-[46px] font-mono group cursor-pointer shadow-sm transition-all text-left"
                  title="Click to copy email address"
                >
                  {/* Progress background */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 bg-teal-500/15"
                    style={{ 
                      width: `${progress}%`,
                      opacity: copied ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                  {/* Normal Content */}
                  <div 
                    className="absolute inset-x-0 top-0 bottom-0 flex items-center justify-between px-4 h-full"
                    style={{
                      opacity: copied ? 0 : 1,
                      transform: copied ? 'scale(0.95)' : 'scale(1)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span className="text-white hover:text-teal-300 transition-colors font-semibold whitespace-nowrap text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px]">{email}</span>
                    <Copy className="w-3.5 h-3.5 text-white/40 group-hover:text-teal-400 shrink-0 ml-2" />
                  </div>
                  {/* Saved Content */}
                  <div 
                    className="absolute inset-x-0 flex items-center justify-center gap-2"
                    style={{
                      opacity: showConfirmation ? 1 : 0,
                      transform: showConfirmation ? 'scale(1)' : 'scale(1.05)',
                      transition: 'all 0.4s ease',
                    }}
                  >
                    <div className="w-4 h-4 bg-teal-400 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-teal-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-[13px] md:text-sm lg:text-[16px] font-bold text-white">Copied!</span>
                  </div>
                </button>
              </div>

              {/* Vertical Social Links inspired directly by the reference image */}
              <div className="flex flex-col space-y-2.5 border-t border-white/5 pt-5 w-full max-w-[240px]">
                <a 
                  href="https://www.linkedin.com/in/mubinroshan/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm font-sans text-white/60 hover:text-teal-400 transition-colors flex items-center justify-between group"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-teal-500/50 group-hover:text-[#00a36c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </a>
                <a 
                  href="https://github.com/mubinroshan" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm font-sans text-white/60 hover:text-teal-400 transition-colors flex items-center justify-between group"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-teal-500/50 group-hover:text-[#00a36c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </a>
                <a 
                  href="https://www.instagram.com/mubin_richu" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm font-sans text-white/60 hover:text-teal-400 transition-colors flex items-center justify-between group"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-teal-500/50 group-hover:text-[#00a36c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </a>
                <a 
                  href="https://x.com/mubinroshan" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm font-sans text-white/60 hover:text-teal-400 transition-colors flex items-center justify-between group"
                >
                  <span>X Account</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-teal-500/50 group-hover:text-[#00a36c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </a>
              </div>
            </div>

            {/* Center Column: Big name branding & capsule buttons */}
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-7 pt-4 lg:pt-2">
              <div className="space-y-2 max-w-lg">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-teal-200 tracking-tight leading-none uppercase">
                  Mubin Roshan
                </h2>
                <p className="font-serif italic text-base sm:text-lg text-teal-300">
                  Where Security Meets Intelligence
                </p>
              </div>

              {/* Styled Pill Actions matching the golf reference buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
                {/* Active Bright green Pill */}
                <button
                  onClick={handleDownloadResume}
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#00a36c] text-white hover:bg-[#008d5c] hover:text-white font-bold text-[11px] sm:text-xs md:text-sm tracking-wider uppercase rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#00a36c]/10 hover:shadow-[#00a36c]/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span className="text-white hover:text-white">Download Resume</span>
                  <span className="text-sm font-bold text-white">→</span>
                </button>

                {/* Second Dark Green Outlined Pill */}
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#071f1e]/60 text-white hover:text-white border border-teal-500/20 hover:border-teal-400/40 hover:bg-[#0c2f2d]/80 font-bold text-[11px] sm:text-xs md:text-sm tracking-wider uppercase rounded-full flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span className="text-white hover:text-white">Let's connect</span>
                  <span className="text-sm font-bold text-white">→</span>
                </button>
              </div>
            </div>

            {/* Right Column: Dynamic Site Navigation Index */}
            <div className="flex flex-col space-y-4 text-left lg:items-end lg:text-right w-full lg:col-span-3">
              <div className="w-full">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4 lg:text-right">Explore</h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-3 font-sans text-sm text-white/70">
                  {footerLinks.map((link, idx) => (
                    <button
                      key={idx}
                      onClick={link.action}
                      className="hover:text-teal-400 transition-colors cursor-pointer text-left lg:text-right capitalize font-medium"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
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
