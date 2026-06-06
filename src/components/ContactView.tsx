import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, MapPin, MessageSquare, Send, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';
import NotificationToast from './NotificationToast';

const countries = [
  "Palestine",
  "Saudi Arabia",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

const saudiRegions = [
  "Ar Riyadh",
  "Mecca",
  "Al Madinah",
  "Eastern Province",
  "Al-Qassim",
  "Asir",
  "Tabuk",
  "Hail",
  "Northern Borders",
  "Jazan",
  "Najran",
  "Al-Bahah",
  "Al-Jawf"
];

const indiaStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

interface ContactViewProps {
  isSaudiGreenMode?: boolean;
}

export default function ContactView({ isSaudiGreenMode = true }: ContactViewProps) {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [subDivision, setSubDivision] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hasSubmittedSuccessfully, setHasSubmittedSuccessfully] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSubDropdown, setShowSubDropdown] = useState(false);

  const [activeDropdownIndex, setActiveDropdownIndex] = useState(-1);
  const [activeSubDropdownIndex, setActiveSubDropdownIndex] = useState(-1);

  const filteredCountries = countries.filter(c => c.toLowerCase().includes(place.toLowerCase()));
  const filteredSubdivisions = (place.toLowerCase().trim() === 'saudi arabia' ? saudiRegions : indiaStates)
    .filter(sub => sub.toLowerCase().includes(subDivision.toLowerCase()));

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const subDropdownRef = useRef<HTMLDivElement>(null);
  
  // Ref to track if submitting flow was initiated to prevent triggering onLoad on initial page render
  const submitInitiatedRef = useRef(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setActiveDropdownIndex(-1);
      }
      if (subDropdownRef.current && !subDropdownRef.current.contains(event.target as Node)) {
        setShowSubDropdown(false);
        setActiveSubDropdownIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (activeDropdownIndex >= 0) {
      const el = document.getElementById(`country-item-${activeDropdownIndex}`);
      if (el) {
        el.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeDropdownIndex]);

  useEffect(() => {
    if (activeSubDropdownIndex >= 0) {
      const el = document.getElementById(`subdivision-item-${activeSubDropdownIndex}`);
      if (el) {
        el.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeSubDropdownIndex]);

  const handlePlaceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setShowDropdown(true);
        setActiveDropdownIndex(0);
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveDropdownIndex((prev) => 
        prev < filteredCountries.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveDropdownIndex((prev) => 
        prev > 0 ? prev - 1 : filteredCountries.length - 1
      );
    } else if (e.key === 'Enter') {
      if (activeDropdownIndex >= 0 && activeDropdownIndex < filteredCountries.length) {
        e.preventDefault();
        setPlace(filteredCountries[activeDropdownIndex]);
        setSubDivision('');
        setShowDropdown(false);
        setActiveDropdownIndex(-1);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setActiveDropdownIndex(-1);
    }
  };

  const handleSubDivisionKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSubDropdown) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setShowSubDropdown(true);
        setActiveSubDropdownIndex(0);
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSubDropdownIndex((prev) => 
        prev < filteredSubdivisions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSubDropdownIndex((prev) => 
        prev > 0 ? prev - 1 : filteredSubdivisions.length - 1
      );
    } else if (e.key === 'Enter') {
      if (activeSubDropdownIndex >= 0 && activeSubDropdownIndex < filteredSubdivisions.length) {
        e.preventDefault();
        setSubDivision(filteredSubdivisions[activeSubDropdownIndex]);
        setShowSubDropdown(false);
        setActiveSubDropdownIndex(-1);
      }
    } else if (e.key === 'Escape') {
      setShowSubDropdown(false);
      setActiveSubDropdownIndex(-1);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Name identifier required';
    if (!place.trim()) newErrors.place = 'Place location details required';
    if ((place.toLowerCase() === 'saudi arabia' || place.toLowerCase() === 'india') && !subDivision.trim()) {
      newErrors.subDivision = place.toLowerCase() === 'saudi arabia' ? 'Saudi Region selection required' : 'State selection required';
    }
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
      setSubDivision('');
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
              <span className="text-xs font-mono uppercase tracking-wider text-[#00a36c] font-bold">Send me a message</span>
            </div>

            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-mono text-white/70 uppercase font-semibold">
                <User className="w-3.5 h-3.5 text-[#00a36c]" />
                <span>Name</span>
                <span className="text-red-500/80 font-bold">*</span>
              </label>
              <input 
                type="text"
                name="entry.830196533"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
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
            <div className="space-y-1.5 relative text-left z-30" ref={dropdownRef}>
              <label className="flex items-center gap-1.5 text-xs font-mono text-white/70 uppercase font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#00a36c]" />
                <span>Location / Place</span>
                <span className="text-red-500/80 font-bold">*</span>
              </label>
              <div className="relative">
                {/* Google Forms mapped entry transmission (Aggregated cleanly so either Country or Country - District/Region is sent perfectly) */}
                <input 
                  type="hidden" 
                  name="entry.1993612319" 
                  value={subDivision ? `${place} - ${subDivision}` : place} 
                />
                <input 
                  type="text"
                  value={place}
                  onChange={(e) => {
                    setPlace(e.target.value);
                    setSubDivision('');
                    setShowDropdown(true);
                    setActiveDropdownIndex(-1);
                  }}
                  onFocus={() => {
                    setShowDropdown(true);
                    setActiveDropdownIndex(-1);
                  }}
                  onKeyDown={handlePlaceKeyDown}
                  placeholder="Where are you writing from? (City / Org)"
                  className={`w-full px-4 py-3 rounded-2xl text-sm font-mono border outline-none transition-all ${
                    errors.place ? 'border-red-500/60 bg-red-950/10 text-red-100 placeholder-red-900' :
                    isSaudiGreenMode 
                      ? 'bg-black/30 border-white/10 hover:border-teal-500/30 focus:border-teal-400 text-white placeholder-white/20' 
                      : 'bg-white/50 border-[#0d5c56]/20 hover:border-[#0d5c56]/40 focus:border-[#0d5c56] text-teal-900 placeholder-teal-600/35'
                  }`}
                />
                
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.12 }}
                      className={`absolute top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto z-40 rounded-2xl border shadow-xl ${
                        isSaudiGreenMode 
                          ? 'bg-black border-white/15 text-white' 
                          : 'bg-[#faf6eb] border-[#0d5c56]/20 text-teal-950'
                      }`}
                    >
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country, idx) => {
                          const isHighlighted = idx === activeDropdownIndex;
                          return (
                            <button
                              id={`country-item-${idx}`}
                              key={country}
                              type="button"
                              onClick={() => {
                                setPlace(country);
                                setSubDivision('');
                                setShowDropdown(false);
                                setActiveDropdownIndex(-1);
                              }}
                              onMouseEnter={() => setActiveDropdownIndex(idx)}
                              className={`w-full text-left px-4 py-2.5 text-xs font-mono transition-all border-b border-white/[0.04] last:border-b-0 ${
                                isHighlighted
                                  ? isSaudiGreenMode 
                                    ? 'bg-teal-500/25 text-white border-l-2 border-teal-400 font-bold' 
                                    : 'bg-[#0d5c56]/20 text-teal-950 font-bold border-l-2 border-[#0d5c56]'
                                  : isSaudiGreenMode 
                                    ? 'hover:bg-teal-500/15 text-gray-300 hover:text-teal-300' 
                                    : 'hover:bg-[#0d5c56]/10 text-teal-900 hover:text-[#0d5c56]'
                              }`}
                            >
                              {country}
                            </button>
                          );
                        })
                      ) : (
                        <div className="px-4 py-3 text-xs font-mono opacity-50">
                          Country not found
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {errors.place && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] font-mono text-red-400 pl-1">{errors.place}</motion.p>
              )}
            </div>

            {/* Dynamic Subdivision Field based on selections of Saudi Arabia or India */}
            <AnimatePresence>
              {(place.toLowerCase().trim() === 'saudi arabia' || place.toLowerCase().trim() === 'india') && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-1.5 relative text-left z-20" 
                  ref={subDropdownRef}
                >
                  <label className="flex items-center gap-1.5 text-xs font-mono text-white/70 uppercase font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#00a36c]" />
                    <span>{place.toLowerCase().trim() === 'saudi arabia' ? 'Saudi Region' : 'Select Your State'}</span>
                    <span className="text-red-500/80 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="text"
                      value={subDivision}
                      onChange={(e) => {
                        setSubDivision(e.target.value);
                        setShowSubDropdown(true);
                        setActiveSubDropdownIndex(-1);
                      }}
                      onFocus={() => {
                        setShowSubDropdown(true);
                        setActiveSubDropdownIndex(-1);
                      }}
                      onKeyDown={handleSubDivisionKeyDown}
                      placeholder={place.toLowerCase().trim() === 'saudi arabia' ? "Select or search Saudi Region (e.g. Ar Riyadh, Mecca)" : "Select or search State (all 28 states of India)"}
                      className={`w-full px-4 py-3 rounded-2xl text-sm font-mono border outline-none transition-all ${
                        errors.subDivision ? 'border-red-500/60 bg-red-950/10 text-red-100 placeholder-red-900' :
                        isSaudiGreenMode 
                          ? 'bg-black/30 border-white/10 hover:border-teal-500/30 focus:border-teal-400 text-white placeholder-white/20' 
                          : 'bg-white/50 border-[#0d5c56]/20 hover:border-[#0d5c56]/40 focus:border-[#0d5c56] text-teal-900 placeholder-teal-600/35'
                      }`}
                    />
                    
                    {showSubDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.12 }}
                        className={`absolute top-full left-0 right-0 mt-1 max-h-56 overflow-y-auto z-40 rounded-2xl border shadow-xl ${
                          isSaudiGreenMode 
                            ? 'bg-black border-white/15 text-white' 
                            : 'bg-[#faf6eb] border-[#0d5c56]/20 text-teal-950'
                        }`}
                      >
                        {filteredSubdivisions.length > 0 ? (
                          filteredSubdivisions.map((subName, idx) => {
                            const isHighlighted = idx === activeSubDropdownIndex;
                            return (
                              <button
                                id={`subdivision-item-${idx}`}
                                key={subName}
                                type="button"
                                onClick={() => {
                                  setSubDivision(subName);
                                  setShowSubDropdown(false);
                                  setActiveSubDropdownIndex(-1);
                                }}
                                onMouseEnter={() => setActiveSubDropdownIndex(idx)}
                                className={`w-full text-left px-4 py-2.5 text-xs font-mono transition-all border-b border-white/[0.04] last:border-b-0 ${
                                  isHighlighted
                                    ? isSaudiGreenMode 
                                      ? 'bg-teal-500/25 text-white border-l-2 border-teal-400 font-bold' 
                                      : 'bg-[#0d5c56]/20 text-teal-950 font-bold border-l-2 border-[#0d5c56]'
                                    : isSaudiGreenMode 
                                      ? 'hover:bg-teal-500/15 text-gray-300 hover:text-teal-300' 
                                      : 'hover:bg-[#0d5c56]/10 text-teal-900 hover:text-[#0d5c56]'
                                }`}
                              >
                                {subName}
                              </button>
                            );
                          })
                        ) : (
                          <div className="px-4 py-3 text-xs font-mono opacity-50">
                            No regions or states match your filter
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                  {errors.subDivision && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] font-mono text-red-400 pl-1">{errors.subDivision}</motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-mono text-white/70 uppercase font-semibold">
                <Mail className="w-3.5 h-3.5 text-[#00a36c]" />
                <span>Email</span>
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
                <span>YOUR MESSAGE</span>
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
              className={`w-full group relative flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl border font-mono text-xs uppercase font-bold tracking-wider select-none outline-none focus:outline-none transition-all cursor-pointer text-white hover:text-white !text-white keep-text-white ${
                isSubmitting ? 'bg-teal-850 border-teal-500/20 text-teal-400 cursor-not-allowed opacity-80' :
                isSaudiGreenMode 
                  ? 'bg-teal-600 border-[#00a36c]/40 hover:border-[#00a36c] hover:bg-teal-700 text-white hover:shadow-[0_4px_20px_rgba(0,163,108,0.2)]'
                  : 'bg-[#0d5c56] border-[#0d5c56] hover:bg-[#09413c] text-white hover:shadow-lg font-bold'
              }`}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white keep-text-white" />
                  <span className="text-white keep-text-white">Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-white keep-text-white group-hover:scale-115 transition-transform" />
                  <span className="text-white keep-text-white font-bold">Your Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* 5. SUCCESS CONFIRMATION POPUP MODAL */}
      <AnimatePresence>
        {hasSubmittedSuccessfully && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Background Dim Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            ></motion.div>

            {/* Floating Confirmation Popup Panel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 25 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className={`relative w-full max-w-md p-6 sm:p-8 rounded-3xl border z-10 text-center space-y-6 shadow-2xl ${
                isSaudiGreenMode 
                  ? 'bg-[#121212] border-emerald-500/30 text-white' 
                  : 'bg-[#FAF6EB] border-[#0d5c56]/30 text-[#0d5c56]'
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                isSaudiGreenMode 
                  ? 'bg-emerald-500/10 text-emerald-400' 
                  : 'bg-[#0d5c56]/10 text-[#0d5c56]'
              }`}>
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className={`text-2xl font-serif font-extrabold tracking-tight ${
                  isSaudiGreenMode ? 'text-white' : 'text-[#0d5c56]'
                }`}>
                  Message Sent Successfully
                </h3>
                <p className={`text-xs font-mono uppercase tracking-widest font-bold ${
                  isSaudiGreenMode ? 'text-emerald-400' : 'text-amber-600'
                }`}>
                  Confirmation Complete
                </p>
                <p className={`text-sm leading-relaxed ${
                  isSaudiGreenMode ? 'text-white/60' : 'text-[#1a6f68]'
                }`}>
                  Thank you! Your message has been successfully registered in Mubin's database. Expected response times are under 24 hours.
                </p>
              </div>

              <button 
                id="btn-close-confirmation"
                onClick={resetForm}
                className={`w-full py-3.5 rounded-xl border text-xs font-mono font-bold tracking-widest uppercase transition-all cursor-pointer outline-none focus:outline-none ${
                  isSaudiGreenMode 
                    ? 'bg-[#005639] hover:bg-emerald-800 border-emerald-500/20 text-white' 
                    : 'bg-[#0d5c56] hover:bg-[#09413c] border-[#0d5c56] text-[#FAF6EB]'
                }`}
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. FLOATING CONFIRMATION TOAST */}
      <NotificationToast 
        show={showToast} 
        message="Dispatch successfully transmitted!" 
        isSaudiGreenMode={isSaudiGreenMode} 
      />
    </div>
  );
}
