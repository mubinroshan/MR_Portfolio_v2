import { useState } from 'react';
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
  
  const handleNavClick = (tab: TabID) => {
    setActiveTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('mubinroshanksa@gmail.com');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
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

      <div className="max-w-5xl mx-auto px-4 space-y-8 relative">
        
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
              Secure <Heart className="w-5 h-5 text-teal-400 fill-current animate-pulse" />
            </div>
            <span className="text-xs font-mono tracking-widest text-teal-400 uppercase">mubin roshan</span>
          </div>
        </div>

        {/* Copy Email Button */}
        <div id="copy-email-section" className="flex justify-center">
          <button
            id="copy-email-btn"
            onClick={copyEmailToClipboard}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/[0.02] hover:bg-teal-500/10 border border-white/5 hover:border-teal-500/30 text-white/60 hover:text-white transition-all text-xs font-mono group cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
            title="Click to copy email address"
          >
            <Mail className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
            <span className={!isSaudiGreenMode ? "text-white !text-white opacity-100" : ""}>mubinroshanksa@gmail.com</span>
            <span className="text-white/20">|</span>
            <Copy className="w-3.5 h-3.5 text-white/30 group-hover:text-teal-300" />
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
