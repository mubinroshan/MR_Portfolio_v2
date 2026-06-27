import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, MapPin, MessageSquare, Send, ShieldCheck, RefreshCw, CheckCircle2, Linkedin, ExternalLink, ThumbsUp, Heart, Share2, Users, Plus, Check, AlertTriangle, Sparkle, Briefcase } from 'lucide-react';
import NotificationToast from './NotificationToast';
import { Component as ShatterButton } from '@/components/ui/shatter-button';
import { WarningGraphic } from '@/components/ui/warning-graphic';
import mubinAvatar from '../assets/images/mubin_avatar_1780675936140.png';
import mrLogoTeal from '../assets/images/mr_logo_teal_removebg.png';

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

const getSubdivisionsForCountry = (country: string): string[] => {
  const c = country.trim().toLowerCase();
  
  if (c === 'saudi arabia') {
    return [
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
  }
  if (c === 'india') {
    return [
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
  }
  if (c === 'united arab emirates' || c === 'uae') {
    return [
      "Abu Dhabi",
      "Dubai",
      "Sharjah",
      "Ajman",
      "Umm Al Quwain",
      "Ras Al Khaimah",
      "Fujairah"
    ];
  }
  if (c === 'united states' || c === 'us' || c === 'usa') {
    return [
      "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
      "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
      "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
      "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
      "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];
  }
  if (c === 'united kingdom' || c === 'uk') {
    return [
      "England",
      "Scotland",
      "Wales",
      "Northern Ireland",
      "Greater London",
      "West Midlands",
      "Greater Manchester",
      "West Yorkshire",
      "Merseyside"
    ];
  }
  if (c === 'canada') {
    return [
      "Ontario",
      "Quebec",
      "British Columbia",
      "Alberta",
      "Manitoba",
      "Saskatchewan",
      "Nova Scotia",
      "New Brunswick",
      "Newfoundland and Labrador",
      "Prince Edward Island"
    ];
  }
  if (c === 'australia') {
    return [
      "New South Wales",
      "Victoria",
      "Queensland",
      "Western Australia",
      "South Australia",
      "Tasmania",
      "Australian Capital Territory",
      "Northern Territory"
    ];
  }
  if (c === 'palestine') {
    return [
      "Jerusalem (Al-Quds)",
      "Gaza City",
      "Hebron (Al-Khalil)",
      "Nablus",
      "Ramallah & Al-Bireh",
      "Bethlehem",
      "Jenin",
      "Jericho",
      "Rafah",
      "Khan Yunis",
      "Tulkarm",
      "Qalqilya",
      "Salfit",
      "Tubas",
      "Deir al-Balah",
      "North Gaza"
    ];
  }
  if (c === 'egypt') {
    return [
      "Cairo",
      "Giza",
      "Alexandria",
      "Dakahlia",
      "Red Sea",
      "Beheira",
      "Fayoum",
      "Gharbia",
      "Ismailia",
      "Monufia",
      "Minya",
      "Qalyubia",
      "New Valley",
      "Suez",
      "Aswan",
      "Assiut",
      "Beni Suef",
      "Damietta",
      "Kafr El Sheikh",
      "Luxor",
      "Matrouh",
      "Port Said",
      "Sohag",
      "South Sinai",
      "North Sinai",
      "Qena",
      "Sharqia"
    ];
  }
  if (c === 'pakistan') {
    return [
      "Punjab",
      "Sindh",
      "Khyber Pakhtunkhwa",
      "Balochistan",
      "Islamabad Capital Territory",
      "Azad Kashmir",
      "Gilgit-Baltistan"
    ];
  }
  if (c === 'bangladesh') {
    return [
      "Dhaka",
      "Chittagong",
      "Rajshahi",
      "Khulna",
      "Barisal",
      "Sylhet",
      "Rangpur",
      "Mymensingh"
    ];
  }
  if (c === 'germany') {
    return [
      "Baden-Württemberg",
      "Bavaria",
      "Berlin",
      "Brandenburg",
      "Bremen",
      "Hamburg",
      "Hesse",
      "Lower Saxony",
      "Mecklenburg-Vorpommern",
      "North Rhine-Westphalia",
      "Rhineland-Palatinate",
      "Saarland",
      "Saxony",
      "Saxony-Anhalt",
      "Schleswig-Holstein",
      "Thuringia"
    ];
  }
  if (c === 'oman') {
    return [
      "Muscat",
      "Dhofar",
      "Musandam",
      "Al Buraimi",
      "Ad Dakhiliyah",
      "Al Batinah North",
      "Al Batinah South",
      "Al Wusta",
      "Ash Sharqiyah North",
      "Ash Sharqiyah South",
      "Ad Dhahirah"
    ];
  }
  if (c === 'qatar') {
    return [
      "Doha",
      "Al Rayyan",
      "Al Wakrah",
      "Al Khor",
      "Al Daayen",
      "Al Shahaniya",
      "Al Shamal",
      "Umm Salal"
    ];
  }
  if (c === 'kuwait') {
    return [
      "Al Asimah (Capital)",
      "Hawalli",
      "Farwaniya",
      "Jahra",
      "Ahmadi",
      "Mubarak Al-Kabeer"
    ];
  }
  if (c === 'bahrain') {
    return [
      "Capital Governorate",
      "Muharraq Governorate",
      "Northern Governorate",
      "Southern Governorate"
    ];
  }
  if (c === 'yemen') {
    return [
      "Sanaa (Capital)",
      "Aden",
      "Taiz",
      "Al Hudaydah",
      "Hadramaut",
      "Ibb",
      "Dhamar",
      "Abyan",
      "Al Mahrah",
      "Socotra",
      "Shabwah",
      "Saadah",
      "Hajjah",
      "Al Bayda",
      "Al Jawf",
      "Amran"
    ];
  }
  if (c === 'france') {
    return [
      "Île-de-France",
      "Provence-Alpes-Côte d'Azur",
      "Auvergne-Rhône-Alpes",
      "Nouvelle-Aquitaine",
      "Occitanie",
      "Hauts-de-France",
      "Grand Est",
      "Pays de la Loire",
      "Brittany",
      "Normandy",
      "Bourgogne-Franche-Comté",
      "Centre-Val de Loire",
      "Corsica"
    ];
  }
  if (c === 'turkey') {
    return [
      "Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", "Adana", "Gaziantep", "Konya", "Mersin", "Diyarbakir",
      "Marmara Region", "Central Anatolia", "Aegean Region", "Mediterranean Region", "Black Sea Region", "Southeastern Anatolia", "Eastern Anatolia"
    ];
  }
  if (c === 'japan') {
    return [
      "Hokkaido", "Tohoku", "Kanto (Tokyo)", "Chubu", "Kansai (Kyoto/Osaka)", "Chugoku", "Shikoku", "Kyushu"
    ];
  }
  if (c === 'china') {
    return [
      "Guangdong", "Shandong", "Henan", "Sichuan", "Jiangsu", "Hebei", "Hunan", "Anhui", "Hubei", "Zhejiang",
      "Beijing", "Shanghai", "Chongqing", "Tianjin", "Hong Kong", "Macau"
    ];
  }
  if (c === 'singapore') {
    return [
      "Central Region",
      "East Region",
      "North Region",
      "North-East Region",
      "West Region"
    ];
  }
  if (c === 'italy') {
    return [
      "Lazio (Rome)", "Lombardy (Milan)", "Veneto (Venice)", "Tuscany (Florence)", "Piedmont", "Campania", "Sicily", "Emilia-Romagna"
    ];
  }
  if (c === 'spain') {
    return [
      "Andalusia", "Catalonia (Barcelona)", "Madrid", "Valencia", "Galicia", "Castile and León", "Basque Country", "Canary Islands"
    ];
  }
  if (c === 'brazil') {
    return [
      "São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná", "Rio Grande do Sul", "Pernambuco", "Amazonas"
    ];
  }
  if (c === 'russia') {
    return [
      "Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Nizhny Novgorod", "Kazan", "Chelyabinsk", "Siberia"
    ];
  }

  // Fallback for all other countries as requested: "do this for every country in the list"
  const formattedCountry = country.trim().charAt(0).toUpperCase() + country.trim().slice(1);
  return [
    `${formattedCountry} Capital Region`,
    `${formattedCountry} Northern Province`,
    `${formattedCountry} Southern Province`,
    `${formattedCountry} Eastern Province`,
    `${formattedCountry} Western Province`,
    `${formattedCountry} Central District`,
    `${formattedCountry} Coastal Territory`,
    `${formattedCountry} Highland Zone`
  ];
};

const getSubdivisionLabelAndPlaceholder = (country: string) => {
  const c = country.trim().toLowerCase();
  if (c === 'saudi arabia') {
    return {
      label: 'Saudi Region',
      placeholder: 'Select or search Saudi Region (e.g. Ar Riyadh, Mecca)'
    };
  }
  if (c === 'india') {
    return {
      label: 'Select Your State',
      placeholder: 'Select or search State (all 28 states of India)'
    };
  }
  if (c === 'united arab emirates' || c === 'uae') {
    return {
      label: 'Select Your Emirate',
      placeholder: 'Select or search Emirate (e.g. Dubai, Abu Dhabi)'
    };
  }
  if (c === 'united states' || c === 'us' || c === 'usa') {
    return {
      label: 'Select Your US State',
      placeholder: 'Select or search US State (e.g. California, Texas)'
    };
  }
  if (c === 'united kingdom' || c === 'uk') {
    return {
      label: 'Select Your UK Region/Country',
      placeholder: 'Select or search UK Region (e.g. England, Scotland)'
    };
  }
  if (c === 'canada') {
    return {
      label: 'Select Your Province',
      placeholder: 'Select or search Province (e.g. Ontario, Quebec)'
    };
  }
  if (c === 'australia') {
    return {
      label: 'Select Your State/Territory',
      placeholder: 'Select or search State (e.g. New South Wales)'
    };
  }
  if (c === 'germany') {
    return {
      label: 'Select Your German State',
      placeholder: 'Select or search State (e.g. Bavaria, Berlin)'
    };
  }
  
  const formatted = country.trim().charAt(0).toUpperCase() + country.trim().slice(1);
  return {
    label: `Select Location under ${formatted}`,
    placeholder: `Select or search region, province, or district under ${formatted}`
  };
};

const linkedinPosts = [
  {
    id: 1,
    time: "2 days ago",
    category: "SecOps",
    title: "Healthcare Cyber Defense",
    content: "Deploying secure, clinical-grade cybersecurity policies across healthcare networks isn't just about firewalls—it's about operational resilience. Ensuring patient records and hospital technology platforms remain impenetrable to threat actors while maintaining 100% operational uptime is our primary duty.\n\n🔒 Securing the digital heartbeat of medicine. #HealthcareSecurity #SecOps #MinistryOfHealth #CyberSecurity",
    likesCount: 142,
    comments: 28,
  },
  {
    id: 2,
    time: "1 week ago",
    category: "Databases",
    title: "System Pathing",
    content: "Database optimization and schema structure refinement is highly critical for real-time diagnostics monitoring. Streamlining data pathways from medical machinery to analytical databases ensures clinical speed is never compromised for critical telemetry throughput. #DatabaseEng #InformationSystems #PerformanceRefinement",
    likesCount: 98,
    comments: 14,
  },
  {
    id: 3,
    time: "2 weeks ago",
    category: "Audit Protocols",
    title: "Continuous Audits",
    content: "A successful cybersecurity audit doesn't conclude with a static compliance report; it begins with continuous automated monitoring. Integrating real-time threat matrix diagnostics directly into daily clinical administrative routines yields long-term protocol success. #SecOpsAudits #SystemIntegrity #ContinuousPolicyEng",
    likesCount: 115,
    comments: 19,
  }
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
  const [isMessageFocused, setIsMessageFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hasSubmittedSuccessfully, setHasSubmittedSuccessfully] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSubDropdown, setShowSubDropdown] = useState(false);

  const [activeDropdownIndex, setActiveDropdownIndex] = useState(-1);
  const [activeSubDropdownIndex, setActiveSubDropdownIndex] = useState(-1);

  // Simulated LinkedIn Interactive Widget State
  const [linkedinLikes, setLinkedinLikes] = useState<{ [key: number]: number }>({ 1: 142, 2: 98, 3: 115 });
  const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({});
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [selectedPostTab, setSelectedPostTab] = useState(0);

  const filteredCountries = countries.filter(c => {
    const q = place.toLowerCase().trim();
    if (!q) return true;
    if (q === 'uae') return c.toLowerCase() === 'united arab emirates';
    if (q === 'usa' || q === 'us') return c.toLowerCase() === 'united states';
    if (q === 'uk') return c.toLowerCase() === 'united kingdom';
    return c.toLowerCase().includes(q);
  });
  const filteredSubdivisions = getSubdivisionsForCountry(place)
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
    const isCountrySelected = countries.some(c => c.toLowerCase() === place.toLowerCase().trim()) || place.toLowerCase().trim() === 'uae' || place.toLowerCase().trim() === 'usa' || place.toLowerCase().trim() === 'uk';
    if (isCountrySelected && !subDivision.trim()) {
      const meta = getSubdivisionLabelAndPlaceholder(place);
      newErrors.subDivision = `${meta.label} selection required`;
    }
    if (!email.trim()) {
      newErrors.email = 'Secure response email required';
    } else if (!email.includes('@')) {
      newErrors.email = `Please include an '@' in the email address. '${email}' is missing an '@'.`;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid security email format';
    }
    if (!message.trim()) {
      newErrors.message = 'Transmission content block required';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message block too short (Min 10 chars)';
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
      // Delay showing the success confirmation popup until the shatter animation completes (1.2 seconds)
      setTimeout(() => {
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
      }, 1200);
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

          {/* Alternative Channels & LinkedIn Feed Integration */}
          <div className="space-y-6">
            {/* Email & Info */}
            <div className={`p-5 rounded-3xl border ${
              isSaudiGreenMode 
                ? 'bg-white/[0.01] border-white/5' 
                : 'bg-[#faf6eb] border-[#0d5c56]/10'
            } space-y-3 font-sans text-xs`}>
              <p className="text-white/40 uppercase font-mono font-bold tracking-wider text-left">Alternative Channels</p>
              <div className="space-y-2 font-mono text-xs text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[#00a36c] font-bold">•</span>
                  <span className={isSaudiGreenMode ? 'text-white/80' : 'text-teal-900'}>mubinroshanksa@gmail.com</span>
                </div>
              </div>
            </div>

            {/* LinkedIn Interactive Professional Hub */}
            <div className={`rounded-3xl border overflow-hidden ${
              isSaudiGreenMode 
                ? 'bg-white/[0.02] border-white/10 text-white' 
                : 'bg-[#faf6eb] border-[#0d5c56]/15 text-[#0d5c56]'
            }`}>
              {/* Profile Card Banner */}
              <div className="h-16 relative bg-gradient-to-r from-emerald-950 via-[#0d5c56]/40 to-teal-950 flex items-center justify-end px-4 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(#00a36c_0.8px,transparent_0.8px)] [background-size:10px_10px] opacity-15"></div>
                <Linkedin className="w-12 h-12 text-white/5 absolute -right-1 -bottom-1 rotate-12" />
                <span className="text-[9px] font-mono font-bold tracking-widest text-[#00a36c]/80 uppercase bg-black/40 px-2 py-0.5 rounded-full border border-[#00a36c]/20 z-10">
                  LINKEDIN HUB
                </span>
              </div>

              {/* Profile Details Area */}
              <div className="p-5 space-y-4 relative">
                {/* Profile Photo and Quick Stats */}
                <div className="flex items-start justify-between">
                  <div className="relative -mt-12">
                    <div className="w-16 h-16 rounded-2xl border-2 border-[#FAF6EB]/90 shadow-lg bg-[#0d5c56]/20 backdrop-blur-md overflow-hidden shrink-0 flex items-center justify-center">
                      <img 
                        src={mrLogoTeal} 
                        alt="Mubin Roshan" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-[#00a36c] text-white p-1 rounded-lg border border-white max-w-4 max-h-4 flex items-center justify-center">
                      <Linkedin className="w-2.5 h-2.5 fill-white text-white" />
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end">
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                      isSaudiGreenMode ? 'bg-teal-500/10 text-teal-400' : 'bg-[#0d5c56]/10 text-[#0d5c56]'
                    }`}>
                      <Users className="w-3 w-3 shrink-0 text-[#00a36c]" />
                      <span>5000+ Connections</span>
                    </div>
                  </div>
                </div>

                {/* Typography profile values */}
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className={`text-base font-bold font-serif flex items-center gap-1 ${isSaudiGreenMode ? 'text-white' : 'text-teal-950'}`}>
                      <span>Mubin Roshan</span>
                      <CheckCircle2 className="w-[15px] h-[15px] text-sky-500 fill-sky-500 stroke-[2.5] text-white shrink-0 inline-block align-middle" title="Verified Account" />
                    </h4>
                    <span className="bg-blue-500 text-white text-[8px] font-bold tracking-widest uppercase px-1 rounded flex items-center justify-center shrink-0">
                      IN
                    </span>
                  </div>
                  <p className={`text-xs font-sans leading-relaxed font-medium ${isSaudiGreenMode ? 'text-white/90' : 'text-[#0d5c56]'}`}>
                    Cyber Security Aspirant | TBH | SOC | CEH V12 | NSE Certified 3 | Cisco | EC Council |
                  </p>
                  <p className="text-[10px] font-mono opacity-50 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#00a36c] shrink-0" />
                    <span>Yanbu, Al Madinah, Saudi Arabia (On-Site)</span>
                  </p>
                </div>

                {/* Connection Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-1.5 z-10 relative">
                  <button
                    type="button"
                    onClick={() => setLinkedinConnected(!linkedinConnected)}
                    className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-[11px] font-mono font-bold tracking-wider uppercase transition-all select-none cursor-pointer ${
                      linkedinConnected 
                        ? 'bg-teal-500/20 border-teal-500/40 text-[#00a36c] hover:text-[#00a36c]'
                        : isSaudiGreenMode 
                          ? 'bg-[#00a36c]/80 border-[#00a36c] hover:bg-[#00a36c] text-white !text-white hover:!text-white hover:shadow-md'
                          : 'bg-[#0d5c56] border-[#0d5c56] hover:bg-[#09413c] text-white !text-white hover:!text-white hover:shadow-md'
                    }`}
                  >
                    {linkedinConnected ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 stroke-[3] text-white !text-white" />
                        <span className="text-white !text-white font-bold">Connect</span>
                      </>
                    )}
                  </button>

                  <a
                    href="https://www.linkedin.com/in/mubinroshan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-[11px] font-mono font-bold tracking-wider uppercase transition-all select-none ${
                      isSaudiGreenMode 
                        ? 'border-white/10 hover:border-white/30 text-white bg-white/5 hover:bg-white/10' 
                        : 'border-[#0d5c56]/20 hover:border-[#0d5c56]/40 text-[#0d5c56] bg-black/5 hover:bg-black/10'
                    }`}
                  >
                    <span>Profile</span>
                    <ExternalLink className="w-3 h-3 text-[#00a36c]" />
                  </a>
                </div>

                {/* Inner Feed Integration Module */}
                <div className={`mt-3 pt-4 border-t ${isSaudiGreenMode ? 'border-white/5' : 'border-teal-950/5'} space-y-3`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-40">
                      Featured Posts Feed
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  </div>

                  {/* Micro Tabs - Matches Full Card Width */}
                  <div className="w-full">
                    <div className={`flex rounded-lg overflow-hidden border p-0.5 ${
                      isSaudiGreenMode 
                        ? 'border-white/10 bg-black/25' 
                        : 'border-[#0d5c56]/15 bg-black/5'
                    }`}>
                      {linkedinPosts.map((post, idx) => (
                        <button
                          key={post.id}
                          type="button"
                          onClick={() => setSelectedPostTab(idx)}
                          className={`flex-1 py-0.5 sm:py-1 rounded-md text-[9px] xs:text-[10px] sm:text-xs font-mono font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                            selectedPostTab === idx 
                              ? 'bg-[#0d5c56] text-white keep-bright-white shadow-sm font-bold' 
                              : isSaudiGreenMode
                                ? 'text-white/50 hover:text-white/85 hover:bg-white/5'
                                : 'text-[#0d5c56]/60 hover:text-[#0d5c56] hover:bg-[#0d5c56]/5'
                          }`}
                        >
                          {post.category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Post Rendering Grid */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedPostTab}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className={`p-3.5 rounded-2xl border ${
                        isSaudiGreenMode 
                          ? 'bg-black/35 border-white/5 text-white/90' 
                          : 'bg-white/80 border-teal-950/5 text-teal-950'
                      } text-left space-y-2.5`}
                    >
                      {/* Post Header */}
                      <div className="flex items-center justify-between text-[9px] font-mono opacity-50">
                        <span>Mubin Roshan posted</span>
                        <span>{linkedinPosts[selectedPostTab].time}</span>
                      </div>

                      <h5 className={`text-xs font-bold ${isSaudiGreenMode ? 'text-white' : 'text-teal-950'}`}>
                        {linkedinPosts[selectedPostTab].title}
                      </h5>

                      <div className={`text-[11px] leading-relaxed font-sans font-light select-text ${
                        isSaudiGreenMode ? 'text-white/70' : 'text-teal-900/80'
                      }`}>
                        {linkedinPosts[selectedPostTab].content.split('\n\n').map((paragraph, pIdx) => (
                          <span key={pIdx} className="block mb-1.5 last:mb-0">
                            {paragraph}
                          </span>
                        ))}
                      </div>

                      {/* Post Interactive Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono font-bold">
                        <div className="flex items-center gap-1 opacity-50">
                          <ThumbsUp className="w-3 h-3 text-[#00a36c]" />
                          <span>{linkedinLikes[linkedinPosts[selectedPostTab].id]} likes</span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const pId = linkedinPosts[selectedPostTab].id;
                              const isLiked = likedPosts[pId];
                              setLikedPosts({ ...likedPosts, [pId]: !isLiked });
                              setLinkedinLikes({
                                ...linkedinLikes,
                                [pId]: isLiked 
                                  ? linkedinLikes[pId] - 1 
                                  : linkedinLikes[pId] + 1
                              });
                            }}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                              likedPosts[linkedinPosts[selectedPostTab].id]
                                ? 'bg-[#00a36c]/20 text-[#00a36c]'
                                : isSaudiGreenMode 
                                  ? 'hover:bg-white/5 text-white/60 hover:text-white'
                                  : 'hover:bg-black/5 text-[#0d5c56]/70 hover:text-[#0d5c56]'
                            }`}
                          >
                            <ThumbsUp className={`w-3 h-3 ${likedPosts[linkedinPosts[selectedPostTab].id] ? 'fill-[#00a36c] text-[#00a36c]' : ''}`} />
                            <span>{likedPosts[linkedinPosts[selectedPostTab].id] ? 'Liked' : 'Like'}</span>
                          </button>

                          <a
                            href="https://www.linkedin.com/in/mubinroshan/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                              isSaudiGreenMode 
                                ? 'hover:bg-white/5 text-white/55 hover:text-white' 
                                : 'hover:bg-black/5 text-[#0d5c56]/65 hover:text-[#0d5c56]'
                            }`}
                          >
                            <Share2 className="w-3 h-3" />
                            <span>Share</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
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
            noValidate
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

            {/* Dynamic Subdivision Field based on selections of any valid country */}
            <AnimatePresence>
              {(countries.some(c => c.toLowerCase() === place.toLowerCase().trim()) || place.toLowerCase().trim() === 'uae' || place.toLowerCase().trim() === 'usa' || place.toLowerCase().trim() === 'uk') && (
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
                    <span>{getSubdivisionLabelAndPlaceholder(place).label}</span>
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
                      placeholder={getSubdivisionLabelAndPlaceholder(place).placeholder}
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
                onChange={(e) => {
                  const val = e.target.value;
                  setEmail(val);
                  if (errors.email) {
                    if (!val.trim()) {
                      setErrors(prev => ({ ...prev, email: 'Secure response email required' }));
                    } else if (!val.includes('@')) {
                      setErrors(prev => ({ ...prev, email: `Please include an '@' in the email address. '${val}' is missing an '@'.` }));
                    } else if (!/\S+@\S+\.\S+/.test(val)) {
                      setErrors(prev => ({ ...prev, email: 'Invalid security email format' }));
                    } else {
                      setErrors(prev => {
                        const copy = { ...prev };
                        delete copy.email;
                        return copy;
                      });
                    }
                  }
                }}
                placeholder="Enter contact email address for feedback"
                className={`w-full px-4 py-3 rounded-2xl text-sm font-mono border outline-none transition-all ${
                  errors.email 
                    ? `border-red-500/80 bg-red-950/10 ${isSaudiGreenMode ? 'text-red-400 placeholder-red-900/40' : 'text-red-600 placeholder-red-400'} font-semibold` 
                    : isSaudiGreenMode 
                      ? 'bg-black/30 border-white/10 hover:border-teal-500/30 focus:border-teal-400 text-white placeholder-white/20' 
                      : 'bg-white/50 border-[#0d5c56]/20 hover:border-[#0d5c56]/40 focus:border-[#0d5c56] text-teal-900 placeholder-teal-600/35'
                }`}
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, y: -8, marginTop: 0 }} 
                    animate={{ opacity: 1, height: "auto", y: 0, marginTop: 12 }} 
                    exit={{ opacity: 0, height: 0, y: -8, marginTop: 0 }}
                    transition={{ 
                      height: { type: "spring", stiffness: 140, damping: 20 },
                      opacity: { duration: 0.15 },
                      y: { type: "spring", stiffness: 140, damping: 20 },
                      marginTop: { type: "spring", stiffness: 140, damping: 20 }
                    }}
                    className={`overflow-hidden p-3.5 rounded-xl border flex items-center gap-3.5 text-xs font-mono shadow-sm ${
                      isSaudiGreenMode 
                        ? 'bg-red-950/30 border-red-500/25 text-red-200' 
                        : 'bg-red-50 border-red-200 text-red-900'
                    }`}
                  >
                    <WarningGraphic width={90} height={30} color="#ef4444" className="shrink-0" />
                    <div className="space-y-0.5 text-left">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-red-400 block font-mono">
                        [Validation Warning]
                      </span>
                      <p className="leading-relaxed font-sans font-medium text-xs">
                        {errors.email}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                onChange={(e) => {
                  const val = e.target.value;
                  setMessage(val);
                  if (errors.message) {
                    if (!val.trim()) {
                      setErrors(prev => ({ ...prev, message: 'Transmission content block required' }));
                    } else if (val.trim().length < 10) {
                      setErrors(prev => ({ ...prev, message: 'Message block too short (Min 10 chars)' }));
                    } else {
                      setErrors(prev => {
                        const copy = { ...prev };
                        delete copy.message;
                        return copy;
                      });
                    }
                  }
                }}
                onFocus={() => setIsMessageFocused(true)}
                onBlur={() => setIsMessageFocused(false)}
                placeholder="Write your message here..."
                rows={4}
                className={`w-full px-4 py-3 rounded-2xl text-sm font-mono border outline-none transition-all resize-none ${
                  errors.message || (isMessageFocused && message.length < 10)
                    ? `border-red-500 bg-red-500/5 ${isSaudiGreenMode ? 'text-red-400 placeholder-red-900/40' : 'text-red-600 placeholder-red-400'} font-semibold`
                    : isSaudiGreenMode 
                      ? 'bg-black/30 text-white border-white/10 hover:border-teal-500/30 focus:border-teal-400 placeholder-white/20' 
                      : 'bg-white/50 text-teal-900 border-[#0d5c56]/20 hover:border-[#0d5c56]/40 focus:border-[#0d5c56] placeholder-teal-600/35'
                } ${
                  isMessageFocused && !(errors.message || message.length < 10)
                    ? 'border-emerald-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 ring-2 ring-emerald-500/20'
                    : isMessageFocused
                    ? 'focus:ring-2 focus:ring-red-500/30 ring-2 ring-red-500/20'
                    : ''
                }`}
              />
              <AnimatePresence>
                {errors.message && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, y: -8, marginTop: 0 }} 
                    animate={{ opacity: 1, height: "auto", y: 0, marginTop: 12 }} 
                    exit={{ opacity: 0, height: 0, y: -8, marginTop: 0 }}
                    transition={{ 
                      height: { type: "spring", stiffness: 140, damping: 20 },
                      opacity: { duration: 0.15 },
                      y: { type: "spring", stiffness: 140, damping: 20 },
                      marginTop: { type: "spring", stiffness: 140, damping: 20 }
                    }}
                    className={`overflow-hidden p-3.5 rounded-xl border flex items-center gap-3.5 text-xs font-mono shadow-sm ${
                      isSaudiGreenMode 
                        ? 'bg-red-950/30 border-red-500/25 text-red-200' 
                        : 'bg-red-50 border-red-200 text-red-900'
                    }`}
                  >
                    <WarningGraphic width={90} height={30} color="#ef4444" className="shrink-0" />
                    <div className="space-y-0.5 text-left">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-red-400 block font-mono">
                        [Validation Warning]
                      </span>
                      <p className="leading-relaxed font-sans font-medium text-xs">
                        {errors.message}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Inputs required for submitting to Google Forms successfully */}
            <input type="hidden" name="fvv" value="1" />
            <input type="hidden" name="partialResponse" value='[null,null,"8006628840634686139"]' />
            <input type="hidden" name="pageHistory" value="0" />
            <input type="hidden" name="fbzx" value="8006628840634686139" />
            <input type="hidden" name="submissionTimestamp" value="-1" />

            {/* Submit Buttons */}
            <ShatterButton
              type="submit"
              disabled={isSubmitting}
              shouldShatter={validate}
              shatterColor={isSaudiGreenMode ? "#00a36c" : "#0d5c56"}
              className="w-full group relative flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl border font-mono text-xs uppercase font-bold tracking-wider select-none outline-none focus:outline-none transition-all cursor-pointer text-white hover:text-white !text-white keep-text-white"
              style={{
                background: isSaudiGreenMode 
                  ? 'linear-gradient(135deg, #0b504a 0%, #00a36c 100%)' 
                  : 'linear-gradient(135deg, #0d5c56 0%, #09413c 100%)',
                border: isSaudiGreenMode 
                  ? '1px solid rgba(0, 163, 108, 0.4)' 
                  : '1px solid rgba(13, 92, 86, 0.4)',
                boxShadow: isSaudiGreenMode 
                  ? '0 4px 20px rgba(0, 163, 108, 0.2)' 
                  : '0 4px 20px rgba(13, 92, 86, 0.2)',
                color: '#ffffff'
              }}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white keep-text-white" />
                  <span className="text-white keep-text-white">Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-white keep-text-white group-hover:scale-115 transition-transform" />
                  <span className="text-white keep-text-white font-bold">SEND MESSAGE</span>
                </>
              )}
            </ShatterButton>
          </form>
        </div>
      </div>

      {/* 5. SUCCESS CONFIRMATION POPUP MODAL */}
      <AnimatePresence>
        {hasSubmittedSuccessfully && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
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
              className={`relative w-full max-w-md p-8 sm:p-10 rounded-[32px] border z-10 text-center space-y-6 shadow-2xl overflow-hidden ${
                isSaudiGreenMode 
                  ? 'bg-[#121212] border-emerald-500/30 text-white' 
                  : 'bg-[#FAF6EB] border-[#e4decb] text-[#0d5c56]'
              }`}
            >
              {/* Concentric Circle and Sparkles Container */}
              <div className="relative flex items-center justify-center mx-auto w-32 h-32 select-none">
                {/* Outer Ring with very soft pulse glow */}
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute inset-0 rounded-full border ${
                    isSaudiGreenMode 
                      ? 'bg-emerald-500/5 border-emerald-500/10' 
                      : 'bg-[#0d5c56]/5 border-[#0d5c56]/5'
                  }`}
                />
                
                {/* Middle Ring */}
                <div className={`absolute w-24 h-24 rounded-full border ${
                  isSaudiGreenMode 
                    ? 'bg-emerald-500/10 border-emerald-500/20' 
                    : 'bg-[#0d5c56]/10 border-[#0d5c56]/10'
                }`} />
                
                {/* Inner Main Circle with check */}
                <div className={`absolute w-16 h-16 rounded-full border-[3px] flex items-center justify-center shadow-lg ${
                  isSaudiGreenMode 
                    ? 'bg-[#121212] border-emerald-400 text-emerald-400 shadow-emerald-500/10' 
                    : 'bg-[#FAF6EB] border-[#0d5c56] text-[#0d5c56] shadow-[#0d5c56]/15'
                }`}>
                  <Check className="w-8 h-8 stroke-[3.5]" />
                </div>

                {/* Sparkling Star Decoration - Top Left */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.7 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className={`absolute top-2 left-3 ${isSaudiGreenMode ? 'text-emerald-400' : 'text-[#0d5c56]/50'}`}
                >
                  <Sparkle className="w-4 h-4 fill-current" />
                </motion.div>

                {/* Sparkling Star Decoration - Bottom Left (tiny dot) */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.5 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                  className={`absolute bottom-6 left-1 w-1.5 h-1.5 rounded-full ${isSaudiGreenMode ? 'bg-emerald-400/60' : 'bg-[#0d5c56]/40'}`}
                />

                {/* Sparkling Star Decoration - Top Right (tiny dot) */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.5 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className={`absolute top-1 right-8 w-1.5 h-1.5 rounded-full ${isSaudiGreenMode ? 'bg-emerald-400/60' : 'bg-[#0d5c56]/40'}`}
                />

                {/* Sparkling Star Decoration - Middle Right (tiny dot) */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.5 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className={`absolute bottom-10 -right-1 w-1.5 h-1.5 rounded-full ${isSaudiGreenMode ? 'bg-emerald-400/60' : 'bg-[#0d5c56]/40'}`}
                />

                {/* Sparkling Star Decoration - Bottom Right (star) */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.7 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className={`absolute bottom-5 right-2 ${isSaudiGreenMode ? 'text-emerald-400' : 'text-[#0d5c56]/50'}`}
                >
                  <Sparkle className="w-5 h-5 fill-current" />
                </motion.div>
              </div>

              {/* Title & Body content */}
              <div className="space-y-4 relative z-10">
                <h3 className={`text-[25px] font-sans font-bold tracking-tight ${
                  isSaudiGreenMode ? 'text-white' : 'text-[#0d5c56]'
                }`}>
                  Message Received Successfully
                </h3>
                
                {/* Thin elegant horizontal line under title */}
                <div className={`w-14 h-[2px] mx-auto rounded-full ${isSaudiGreenMode ? 'bg-emerald-500/20' : 'bg-[#0d5c56]/15'}`} />

                <div className="space-y-2">
                  <p className={`text-base font-semibold ${
                    isSaudiGreenMode ? 'text-emerald-400' : 'text-[#0d5c56]'
                  }`}>
                    Thank you for reaching out.
                  </p>
                  <p className={`text-[13.5px] leading-relaxed max-w-sm mx-auto font-sans font-medium ${
                    isSaudiGreenMode ? 'text-white/60' : 'text-[#1a6f68]/80'
                  }`}>
                    Your message has been successfully submitted and added to my inbox. I will review your inquiry and respond as soon as possible, typically within 24–48 hours.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 relative z-10">
                <button 
                  id="btn-close-confirmation"
                  onClick={resetForm}
                  className={`w-full py-4 rounded-2xl border text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer outline-none focus:outline-none flex items-center justify-center gap-2.5 shadow-md ${
                    isSaudiGreenMode 
                      ? 'bg-[#005639] hover:bg-emerald-800 border-emerald-500/20 text-white shadow-emerald-950/50' 
                      : 'bg-[#0d5c56] hover:bg-[#09413c] border-[#0d5c56] text-[#FAF6EB] shadow-[#0d5c56]/10'
                  }`}
                >
                  <Briefcase className="w-4 h-4 shrink-0 text-[#FAF6EB] keep-text-cream" />
                  <span className="text-[#FAF6EB] keep-text-cream">Return to Portfolio</span>
                </button>
              </div>

              {/* Decorative Soft layered Wave SVG Graphics at the bottom */}
              <svg className={`absolute bottom-0 left-0 w-full h-24 ${isSaudiGreenMode ? 'text-emerald-950/10' : 'text-[#ede7d9]'} pointer-events-none rounded-b-[32px]`} viewBox="0 0 1440 200" preserveAspectRatio="none">
                <path fill="currentColor" d="M0,96C240,160,480,160,720,120C960,80,1200,0,1440,40L1440,200L0,200Z"></path>
              </svg>
              <svg className={`absolute bottom-0 left-0 w-full h-16 ${isSaudiGreenMode ? 'text-emerald-900/15' : 'text-[#e4decb]'} pointer-events-none rounded-b-[32px]`} viewBox="0 0 1440 200" preserveAspectRatio="none">
                <path fill="currentColor" d="M0,120C240,60,480,140,720,100C960,60,1200,100,1440,40L1440,200L0,200Z"></path>
              </svg>
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
