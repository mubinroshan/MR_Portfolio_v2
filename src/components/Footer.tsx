import { useState, useEffect } from 'react';
import { TabID } from '../types';
import { Heart, ShieldCheck, Mail, Copy } from 'lucide-react';
import NotificationToast from './NotificationToast';
import mrLogoTealRemovebg from '../assets/images/mr_logo_teal_removebg.png';

interface FooterProps {
  setActiveTab: (tab: TabID) => void;
  isSaudiGreenMode?: boolean;
}

export default function Footer({ setActiveTab, isSaudiGreenMode = true }: FooterProps) {
  const [showToast, setShowToast] = useState(false);
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
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
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
    <footer className="w-full bg-gradient-to-b from-[#042121] via-[#052b2b] to-[#021313] border-t border-teal-500/20 pt-16 pb-8 text-center space-y-8 relative overflow-hidden">
      
      {/* Background Ambience decoration */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#00a36c]/10 blur-3xl rounded-full"></div>

      <div className="max-w-[1360px] mx-auto px-4 lg:px-8 space-y-8 relative">
        
        {/* Centered Avatar and Calligraphy */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative cursor-pointer group" onClick={() => handleNavClick('home')}>
            <img 
              src={mrLogoTealRemovebg} 
              alt="Mubin Roshan Logo" 
              className="relative w-16 h-16 object-contain hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Signature text */}
          <div className="space-y-1">
            <div className="font-serif italic text-3xl text-gray-100 relative group flex items-center justify-center gap-1.5 select-none tracking-wider font-extrabold font-serif">
              <Heart className="w-6 h-6 text-teal-400 fill-current animate-pulse" />
            </div>
            <span className="text-xs font-mono tracking-widest text-teal-400 uppercase">mubin roshan</span>
          </div>
        </div>

        {/* Copy Email Button with copy-code progress animation */}
        <div id="copy-email-section" className="flex justify-center">
          <button
            id="copy-email-btn"
            onClick={copyEmailToClipboard}
            disabled={copied}
            className="relative overflow-hidden flex items-center justify-center bg-white/[0.02] border border-white/5 hover:border-teal-500/30 rounded-2xl px-6.5 py-4 min-w-[320px] sm:min-w-[360px] h-[56px] text-xs sm:text-sm font-mono group cursor-pointer shadow-md focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
            title="Click to copy email address"
          >
            {/* Progress background */}
            <div 
              className="absolute left-0 top-0 bottom-0 bg-teal-500/10 dark:bg-teal-400/10"
              style={{ 
                width: `${progress}%`,
                opacity: copied ? 1 : 0,
                transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />

            {/* Original content - email and icon */}
            <div 
              className="absolute inset-0 flex items-center justify-between px-6.5 h-full w-full"
              style={{
                opacity: copied ? 0 : 1,
                filter: copied ? 'blur(12px)' : 'blur(0px)',
                transform: copied ? 'scale(0.92)' : 'scale(1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: copied ? 'none' : 'auto',
                zIndex: copied ? 0 : 20,
              }}
            >
              <div className="flex items-center gap-3.5">
                <Mail className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform" />
                <span className="text-white !text-white font-medium select-all" style={{ color: '#ffffff' }}>
                  {email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/20 select-none">|</span>
                <Copy className="w-4 h-4 text-white/30 group-hover:text-teal-300" />
              </div>
            </div>

            {/* Confirmation content - Code Copied! */}
            <div 
              className="relative flex items-center gap-3"
              style={{
                opacity: showConfirmation ? 1 : 0,
                filter: showConfirmation ? 'blur(0px)' : 'blur(12px)',
                transform: showConfirmation ? 'scale(1)' : 'scale(1.08)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              <div className="w-6 h-6 bg-teal-500 dark:bg-teal-400 rounded-full flex items-center justify-center">
                <svg 
                  className="w-3.5 h-3.5 text-white dark:text-[#141413]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={3} 
                    d="M5 13l4 4L19 7"
                    style={{
                      strokeDasharray: 24,
                      strokeDashoffset: showConfirmation ? 0 : 24,
                      transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
                    }}
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-white">
                Email Copied!
              </span>
            </div>
          </button>
        </div>

        {/* Gray Sub-Footer Navigation list */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-mono text-white/50">
          {footerLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={link.action}
              className="hover:text-teal-400 transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Copyright */}
        <div className="space-y-1.5 text-sm font-mono text-white/40">
          <p>@MubinRoshan, Cybersecurity & Data Analyst</p>
          <p className="text-xs text-white/30 text-teal-100/50">
            Medina, Saudi Arabia.
          </p>
        </div>

        {/* Build Credits */}
        <div className="pt-4 border-t border-white/10 text-xs text-white/50 mx-auto max-w-sm font-mono flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>Developed with React + Tailwind + Motion</span>
        </div>

      </div>

      {/* Floating toast notification */}
      <NotificationToast 
        show={showToast} 
        message="Copied to Clipboard!" 
        isSaudiGreenMode={isSaudiGreenMode} 
      />

    </footer>
  );
}
