import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { User, Mail, MapPin, MessageSquare, Send, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';
import NotificationToast from './NotificationToast';

interface ContactViewProps {
  isSaudiGreenMode?: boolean;
}

export default function ContactView({ isSaudiGreenMode = true }: ContactViewProps) {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hasSubmittedSuccessfully, setHasSubmittedSuccessfully] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Ref to track if submitting flow was initiated to prevent triggering onLoad on initial page render
  const submitInitiatedRef = useRef(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Name identifier required';
    if (!place.trim()) newErrors.place = 'Place location details required';
    if (!email.trim()) {
      newErrors.email = 'Secure response email required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid security email format';
    }
    if (!message.trim()) {
      newErrors.message = 'Transmission content block required';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message block too brief (Min 10 chars)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!validate()) {
      e.preventDefault();
      return;
    }
    setIsSubmitting(true);
    submitInitiatedRef.current = true;
  };

  const handleIframeLoad = () => {
    if (submitInitiatedRef.current) {
      setIsSubmitting(false);
      setShowToast(true);
      setHasSubmittedSuccessfully(true);
      setName('');
      setPlace('');
      setEmail('');
      setMessage('');
      submitInitiatedRef.current = false;
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  const resetForm = () => {
    setHasSubmittedSuccessfully(false);
    setErrors({});
  };

  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto">
      {/* 1. Header with Motion */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono font-semibold text-[#00a36c] tracking-widest uppercase">
          SECURE SECOPS COMMUNICATOR
        </span>
        <motion.h1 
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-serif text-white tracking-tight"
        >
          Contact Mubin Roshan
        </motion.h1>
        <p className="text-sm text-white/50 max-w-lg mx-auto">
          Need database cleaning, cybersecurity architecture advisory, or hospital technology security analysis? Send an encrypted dispatch.
        </p>
      </div>

      {/* Hidden iframe that intercepts the Google Form post response to remain seamlessly on page */}
      <iframe 
        name="hidden_iframe" 
        id="hidden_iframe" 
        ref={iframeRef}
        style={{ display: 'none' }} 
        onLoad={handleIframeLoad}
        title="Form Dispatch Gateway"
      ></iframe>

      {/* Layout Split: Left details, Right form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Diagnostics and Metadata */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`p-6 rounded-3xl border ${
            isSaudiGreenMode 
              ? 'bg-white/[0.02] border-white/10' 
              : 'bg-[#0d5c56]/5 border-[#0d5c56]/15'
          } space-y-6 font-mono text-xs`}>
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-[#00a36c]">Operational Integrity Link</h4>
                <p className="text-[10px] text-white/40">Secure routing via Google Forms gateway</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-white/40 uppercase tracking-wider block mb-1">Response Guarantee</span>
                <p className="text-white/80 leading-relaxed font-sans text-sm font-light">
                  All security dispatches are scanned for clinical validation. Expected response times remain under 24 hours.
                </p>
              </div>

              <div>
                <span className="text-white/40 uppercase tracking-wider block mb-1">Analyst Core</span>
                <p className="text-white/80 leading-relaxed text-sm font-light font-sans">
                  Mubin Roshan • Yanbu National Hospital, Ministry of Health
                </p>
              </div>

              <div>
                <span className="text-white/40 uppercase tracking-wider block mb-1">Encrypted Payload Data</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] uppercase font-bold text-emerald-400">SSL Transmission Enforced</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border font-sans text-xs ${
            isSaudiGreenMode 
              ? 'bg-white/[0.01] border-white/5' 
              : 'bg-[#faf6eb] border-[#0d5c56]/10'
          } space-y-3`}>
            <p className="text-white/40 uppercase font-mono font-bold tracking-wider">Alternative Channels</p>
            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#00a36c]">•</span>
                <span className="text-white/80">mubinroshanksa@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#00a36c]">•</span>
                <a href="https://www.linkedin.com/in/mubinroshan/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
                  linkedin.com/in/mubinroshan
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Secure Contact Form */}
        <div className="lg:col-span-7">
          {hasSubmittedSuccessfully ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-10 rounded-3xl border text-center space-y-6 ${
                isSaudiGreenMode 
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-50' 
                  : 'bg-[#FAF6EB] border-[#0d5c56]/30 text-[#0d5c56]'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-[#00a36c] flex items-center justify-center mx-auto scale-110">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif text-white tracking-tight">Dispatch Transmitted</h3>
                <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">Secure Signal Route Completed</p>
                <p className="text-sm text-white/60 max-w-md mx-auto pt-2">
                  Thank you! Your contact message has successfully registered in Mubin's secure Google database.
                </p>
              </div>

              <button 
                onClick={resetForm}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-teal-500/30 text-xs font-mono hover:bg-teal-500/10 text-teal-300 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Submit Another Dispatch
              </button>
            </motion.div>
          ) : (
            <form
              ref={formRef}
              id="mG61Hd"
              action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSctLGCtnUdgzT4vV2S2s-7HJsZXGCZj6ApkBOBySwbmPht8tQ/formResponse"
              target="hidden_iframe"
              method="POST"
              onSubmit={handleSubmit}
              className={`p-6 sm:p-8 rounded-3xl border ${
                isSaudiGreenMode 
                  ? 'bg-white/[0.02] border-white/10' 
                  : 'bg-[#FAF6EB] border-[#0d5c56]/15'
              } space-y-6`}
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#00a36c] font-bold">Secure Payload Parameters</span>
                <span className="text-[10px] font-mono text-white/30 bg-black/40 px-2 py-0.5 rounded-md border border-white/5">YNH Link 0.1</span>
              </div>

              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-mono text-white/70 uppercase font-semibold">
                  <User className="w-3.5 h-3.5 text-[#00a36c]" />
                  <span>Name Ident</span>
                  <span className="text-red-500/80 font-bold">*</span>
                </label>
                <input 
                  type="text"
                  name="entry.830196533"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your system identifier / full name"
                  className={`w-full px-4 py-3 rounded-2xl text-sm font-mono border outline-none transition-all ${
                    errors.name ? 'border-red-500/60 bg-red-950/10 text-red-100 placeholder-red-900' :
                    isSaudiGreenMode 
                      ? 'bg-black/30 border-white/10 hover:border-teal-500/30 focus:border-teal-400 text-white placeholder-white/20' 
                      : 'bg-white/50 border-[#0d5c56]/20 hover:border-[#0d5c56]/40 focus:border-[#0d5c56] text-teal-900 placeholder-teal-600/35'
                  }`}
                />
                {errors.name && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] font-mono text-red-400 pl-1">{errors.name}</motion.p>
                )}
              </div>

              {/* Place Field */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-mono text-white/70 uppercase font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#00a36c]" />
                  <span>Location / Place</span>
                  <span className="text-red-500/80 font-bold">*</span>
                </label>
                <input 
                  type="text"
                  name="entry.1993612319"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="Where are you writing from? (City / Org)"
                  className={`w-full px-4 py-3 rounded-2xl text-sm font-mono border outline-none transition-all ${
                    errors.place ? 'border-red-500/60 bg-red-950/10 text-red-100 placeholder-red-900' :
                    isSaudiGreenMode 
                      ? 'bg-black/30 border-white/10 hover:border-teal-500/30 focus:border-teal-400 text-white placeholder-white/20' 
                      : 'bg-white/50 border-[#0d5c56]/20 hover:border-[#0d5c56]/40 focus:border-[#0d5c56] text-teal-900 placeholder-teal-600/35'
                  }`}
                />
                {errors.place && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] font-mono text-red-400 pl-1">{errors.place}</motion.p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-mono text-white/70 uppercase font-semibold">
                  <Mail className="w-3.5 h-3.5 text-[#00a36c]" />
                  <span>Secure Email</span>
                  <span className="text-red-500/80 font-bold">*</span>
                </label>
                <input 
                  type="email"
                  name="entry.193799992"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter contact email address for feedback"
                  className={`w-full px-4 py-3 rounded-2xl text-sm font-mono border outline-none transition-all ${
                    errors.email ? 'border-red-500/60 bg-red-950/10 text-red-100 placeholder-red-900' :
                    isSaudiGreenMode 
                      ? 'bg-black/30 border-white/10 hover:border-teal-500/30 focus:border-teal-400 text-white placeholder-white/20' 
                      : 'bg-white/50 border-[#0d5c56]/20 hover:border-[#0d5c56]/40 focus:border-[#0d5c56] text-teal-900 placeholder-teal-600/35'
                  }`}
                />
                {errors.email && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] font-mono text-red-400 pl-1">{errors.email}</motion.p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-mono text-white/70 uppercase font-semibold">
                  <MessageSquare className="w-3.5 h-3.5 text-[#00a36c]" />
                  <span>Your Dispatch Message</span>
                  <span className="text-red-500/80 font-bold">*</span>
                </label>
                <textarea 
                  name="entry.2041270531"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write clear operational requirements or inquiry text here..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-2xl text-sm font-mono border outline-none transition-all resize-none ${
                    errors.message ? 'border-red-500/60 bg-red-950/10 text-red-100 placeholder-red-900' :
                    isSaudiGreenMode 
                      ? 'bg-black/30 border-white/10 hover:border-teal-500/30 focus:border-teal-400 text-white placeholder-white/20' 
                      : 'bg-white/50 border-[#0d5c56]/20 hover:border-[#0d5c56]/40 focus:border-[#0d5c56] text-teal-900 placeholder-teal-600/35'
                  }`}
                />
                {errors.message && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] font-mono text-red-400 pl-1">{errors.message}</motion.p>
                )}
              </div>

              {/* Inputs required for submitting to Google Forms successfully */}
              <input type="hidden" name="fvv" value="1" />
              <input type="hidden" name="partialResponse" value='[null,null,"8006628840634686139"]' />
              <input type="hidden" name="pageHistory" value="0" />
              <input type="hidden" name="fbzx" value="8006628840634686139" />
              <input type="hidden" name="submissionTimestamp" value="-1" />

              {/* Submit Buttons */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full group relative flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl border font-mono text-xs uppercase font-bold tracking-wider select-none outline-none focus:outline-none transition-all cursor-pointer ${
                  isSubmitting ? 'bg-teal-850 border-teal-500/20 text-teal-400 cursor-not-allowed opacity-80' :
                  isSaudiGreenMode 
                    ? 'bg-teal-900/40 border-[#00a36c]/40 hover:border-[#00a36c] hover:bg-[#005639]/30 text-emerald-300 hover:text-white hover:shadow-[0_4px_20px_rgba(0,163,108,0.2)]'
                    : 'bg-[#0d5c56] border-[#0d5c56] hover:bg-[#09413c] text-white hover:shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>Transmitting Dispatch...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#00a36c] group-hover:scale-115 transition-transform" />
                    <span>Transmit Encrypted Dispatch</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 5. FLOATING CONFIRMATION TOAST */}
      <NotificationToast 
        show={showToast} 
        message="Dispatch successfully transmitted!" 
        isSaudiGreenMode={isSaudiGreenMode} 
      />
    </div>
  );
}
