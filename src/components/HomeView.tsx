import { useState, useEffect } from 'react';
import { Project, StoryItem, TabID } from '../types';
import { PROJECTS_DATA, STORIES_DATA, TIMELINE_DATA } from '../data';
import { getReadingTime } from '../utils';
import { 
  ArrowRight, 
  Shield, 
  Terminal, 
  Database,
  Lock,
  ChevronRight,
  ArrowUpRight,
  FileCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Search,
  X
} from 'lucide-react';
import { motion } from 'motion/react';
import ProjectInsights from './ProjectInsights';

interface HomeViewProps {
  setActiveTab: (tab: TabID) => void;
  setSelectedProject: (proj: Project | null) => void;
  setSelectedStory: (story: StoryItem | null) => void;
}

export default function HomeView({ 
  setActiveTab, 
  setSelectedProject, 
  setSelectedStory 
}: HomeViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [greeting, setGreeting] = useState('Good Evening');

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  // Custom Certifications / Tech Badges list mimicking the logos row in the reference UI
  const credentials = [
    { name: 'CompTIA Security+', category: 'Security' },
    { name: 'Python Analytics', category: 'Data' },
    { name: 'SQL Server', category: 'Database' },
    { name: 'NCA ECC 1:2018', category: 'Compliance' },
    { name: 'Tableau Desktop', category: 'BI' },
    { name: 'HL7 Medical Standards', category: 'Healthcare' }
  ];

  // Search logic
  const normalizedQuery = searchQuery.toLowerCase().trim();
  const isSearching = normalizedQuery.length > 0;

  const filteredProjects = PROJECTS_DATA.filter(proj => 
    proj.title.toLowerCase().includes(normalizedQuery) ||
    proj.description.toLowerCase().includes(normalizedQuery) ||
    proj.category.toLowerCase().includes(normalizedQuery) ||
    proj.tags.some(tag => tag.toLowerCase().includes(normalizedQuery)) ||
    proj.technologies.some(tech => tech.toLowerCase().includes(normalizedQuery))
  );

  const filteredTimeline = TIMELINE_DATA.filter(item => 
    item.title.toLowerCase().includes(normalizedQuery) ||
    item.description.toLowerCase().includes(normalizedQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(normalizedQuery)) ||
    item.details.some(detail => detail.toLowerCase().includes(normalizedQuery))
  );

  const filteredStories = STORIES_DATA.filter(story => 
    story.title.toLowerCase().includes(normalizedQuery) ||
    story.summary.toLowerCase().includes(normalizedQuery) ||
    story.category.toLowerCase().includes(normalizedQuery) ||
    story.content.toLowerCase().includes(normalizedQuery)
  );

  const totalResults = filteredProjects.length + filteredTimeline.length + filteredStories.length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-20 pb-16"
    >
      {/* 1. HERO SECTION */}
      <section className="space-y-6 pt-4 md:pt-8">
        {/* Social Row Handles */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono text-gray-400">
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#00a36c] flex items-center gap-1 transition-colors">
            <span className="text-[#00a36c]/60">//</span> Twitter
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#00a36c] flex items-center gap-1 transition-colors">
            <span className="text-[#00a36c]/60">//</span> LinkedIn
          </a>
          <a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-[#00a36c] flex items-center gap-1 transition-colors">
            <span className="text-[#00a36c]/60">//</span> GitHub
          </a>
          <a href="mailto:mubinroshanksa@gmail.com" className="hover:text-[#00a36c] flex items-center gap-1 transition-colors">
            <span className="text-[#00a36c]/60">//</span> Email
          </a>
        </div>

        {/* Big clean bold typography matching Artistic Flair exactly */}
        <div id="home-greeting-container" className="flex flex-col gap-1.5 pt-2 pb-5">
          <span className="font-sans font-bold tracking-tighter text-2xl sm:text-3xl text-teal-400">
            Hey {greeting}!
          </span>

          <span className="text-[#00a36c] font-mono text-[13px] tracking-widest uppercase font-bold">Cyber Security & Data Analyst</span>
          
          <motion.h1 
            id="home-main-headline"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[56px] sm:text-[80px] md:text-[112px] font-bold tracking-tighter leading-[0.95] text-white"
          >
            Mubin<br className="hidden md:inline"/> Roshan
          </motion.h1>

          <p className="mt-6 text-white/50 text-lg md:text-xl leading-relaxed max-w-xl font-light">
            Protecting digital frontiers at <span className="text-white hover:text-[#00a36c] transition-colors">Yanbu National Hospital</span>. Bridging the gap between complex data streams and clinical security protocols.
          </p>

          {/* Interactive Search Bar across portfolio */}
          <div className="pt-4 max-w-2xl relative">
            <div className="relative group/search">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within/search:text-[#00a36c] transition-colors" />
              </span>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects & professional keywords (e.g., Security+, SQL, Python, HL7...)"
                className="w-full bg-white/[0.03] border border-white/10 group-hover/search:border-white/20 focus:border-[#00a36c] focus:ring-1 focus:ring-[#00a36c]/40 rounded-2xl pl-12 pr-10 py-3.5 text-base text-white placeholder-white/30 focus:outline-none transition-all duration-300 font-sans shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            {isSearching && (
              <div className="flex items-center gap-2 mt-2.5 px-1 animate-fadeIn">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00a36c] animate-pulse"></span>
                <span className="text-xs font-mono text-[#00a36c]">
                  Active Telemetry Filter: Found {totalResults} match{totalResults === 1 ? '' : 'es'} across portfolio
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Credentials and Certifications Row (logo line simulation with auto-scroll) */}
        <div className="pt-4 border-t border-white/10 relative overflow-hidden select-none">
          {/* Edge gradient overlays for smooth fade-out */}
          <div className="absolute inset-y-0 left-0 w-12 md:w-24 marquee-fade-left z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-12 md:w-24 marquee-fade-right z-10 pointer-events-none"></div>

          <div className="animate-marquee py-2 whitespace-nowrap">
            {/* First Set of Credentials */}
            {credentials.map((cred, idx) => (
              <div 
                key={`orig-${idx}`} 
                className="flex items-center gap-2 group cursor-default shrink-0"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#005639] group-hover:bg-[#00a36c] transition-colors"></div>
                <span className="text-xs font-mono font-medium text-white/40 group-hover:text-white/80 transition-colors uppercase tracking-wider">
                  {cred.name}
                </span>
                <span className="text-[9px] bg-white/[0.02] text-white/30 px-1.5 py-0.5 rounded border border-white/10 uppercase">
                  {cred.category}
                </span>
              </div>
            ))}
            {/* Second Set of Credentials (Cloned for seamless wrapping) */}
            {credentials.map((cred, idx) => (
              <div 
                key={`clone-${idx}`} 
                className="flex items-center gap-2 group cursor-default shrink-0"
                aria-hidden="true"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#005639] group-hover:bg-[#00a36c] transition-colors"></div>
                <span className="text-xs font-mono font-medium text-white/40 group-hover:text-white/80 transition-colors uppercase tracking-wider">
                  {cred.name}
                </span>
                <span className="text-[9px] bg-white/[0.02] text-white/30 px-1.5 py-0.5 rounded border border-white/10 uppercase">
                  {cred.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isSearching ? (
        /* ================= SEARCH RESULTS GRID ================= */
        <section className="space-y-12 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-[#00a36c] tracking-widest uppercase font-bold">Search Index Results</span>
              <h2 className="text-2xl font-serif text-white tracking-tight mt-1">
                Matching Assets ({totalResults})
              </h2>
            </div>
            <button 
              onClick={() => setSearchQuery('')}
              className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-mono transition-colors flex items-center gap-1.5 text-white/75 border border-white/10"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filter</span>
            </button>
          </div>

          {totalResults === 0 ? (
            <div className="text-center py-16 px-6 bg-white/[0.01] border border-white/5 rounded-3xl space-y-4 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-red-950/20 text-red-400 border border-red-500/10 flex items-center justify-center mx-auto">
                <Search className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">No direct matches</h4>
                <p className="text-xs text-white/40 leading-relaxed font-sans font-light">
                  No assets match "<span className="text-emerald-400">{searchQuery}</span>". Try querying one of these keywords:
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Security+', 'Python', 'SQL Server', 'NCA ECC', 'HL7', 'Bed Management', 'Threat'].map((term) => (
                  <button 
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1.5 bg-[#005639]/10 hover:bg-[#005639]/30 border border-[#00a36c]/20 rounded-xl text-xs font-mono text-emerald-300 transition-all duration-300"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Projects Category */}
              {filteredProjects.length > 0 && (
                <div className="space-y-4">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#00a36c] font-bold block">
                    Matching Projects ({filteredProjects.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredProjects.map((proj) => (
                      <motion.div
                        key={proj.id}
                        whileHover={{ scale: 1.02 }}
                        tabIndex={0}
                        onClick={() => setSelectedProject(proj)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(proj); } }}
                        className="group cursor-pointer bg-white/[0.03] border border-white/10 hover:border-[#00a36c]/40 rounded-3xl p-6 transition-all hover:bg-white/[0.05] flex flex-col justify-between min-h-[340px] relative overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        <div>
                          <span className="text-[10px] text-white/40 font-mono tracking-wide block uppercase mb-1">{proj.category}</span>
                          <h3 className="font-sans font-semibold text-white group-hover:text-[#00a36c] transition-colors leading-snug flex items-center justify-between">
                            {proj.title}
                            <ArrowUpRight className="w-4 h-4 text-[#00a36c]" />
                          </h3>
                          <p className="text-xs text-white/50 line-clamp-3 mt-3 leading-relaxed font-light">
                            {proj.description}
                          </p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                          {proj.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[9px] bg-white/[0.02] text-emerald-400 px-2 py-0.5 rounded border border-white/5 font-mono">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Professional Experience & Certs Category */}
              {filteredTimeline.length > 0 && (
                <div className="space-y-4">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#00a36c] font-bold block">
                    Matching Experience & Certifications ({filteredTimeline.length})
                  </span>
                  <div className="space-y-4">
                    {filteredTimeline.map((item) => (
                      <div 
                        key={item.id}
                        className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                      >
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[9px] uppercase font-mono bg-[#005639]/30 text-emerald-400 border border-[#00a36c]/20 px-2.5 py-0.5 rounded-md font-semibold">
                              {item.category}
                            </span>
                            <span className="text-xs font-mono text-white/30">{item.date}</span>
                          </div>
                          <h4 className="text-sm font-semibold text-white tracking-tight">{item.title}</h4>
                          <p className="text-xs text-white/50 leading-relaxed max-w-3xl font-light">
                            {item.description}
                          </p>
                          {item.details && item.details.length > 0 && (
                            <ul className="list-disc list-inside space-y-1 pl-1 pt-1.5 text-[11px] text-white/30 font-light font-sans">
                              {item.details.map((detail, dIdx) => (
                                <li key={dIdx}>{detail}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 shrink-0 h-fit">
                          {item.tags.map(tag => (
                            <span key={tag} className="text-[9px] bg-white/5 text-emerald-400/80 px-2 py-0.5 rounded border border-white/5 font-mono">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bulletins / Insights Category */}
              {filteredStories.length > 0 && (
                <div className="space-y-4">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#00a36c] font-bold block">
                    Matching Stories & Bulletins ({filteredStories.length})
                  </span>
                  <div className="space-y-3">
                    {filteredStories.map((story) => (
                      <div
                        key={story.id}
                        onClick={() => setSelectedStory(story)}
                        className="group cursor-pointer p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00a36c]/30 hover:bg-white/[0.04] transition-all flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] text-[#00a36c] font-bold uppercase font-mono">{story.category} • {story.date}</span>
                          <h4 className="text-sm font-serif font-bold text-white group-hover:text-[#00a36c] transition-colors">
                            {story.title}
                          </h4>
                          <p className="text-xs text-white/40 line-clamp-1 font-light">{story.summary}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#00a36c] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      ) : (
        /* ================= STANDARD HERO GRID ================= */
        <>
          {/* 2. CURRENT PROJECTS GRID (Inspired by vjy.me card grid) */}
          <section className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#00a36c] font-bold">Showcase Grid</span>
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="text-2xl font-serif text-white tracking-tight mt-1"
                >
                  Current Projects
                </motion.h2>
              </div>
              <button 
                id="view-all-projects-btn"
                tabIndex={0}
                onClick={() => setActiveTab('work')} 
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTab('work'); } }}
                className="group flex items-center gap-1.5 text-xs font-mono text-[#00a36c] hover:text-[#00a36c]/80 transition-colors focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none rounded-md px-1.5 py-0.5"
              >
                All Works 
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROJECTS_DATA.map((proj, idx) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  tabIndex={0}
                  onClick={() => setSelectedProject(proj)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(proj); } }}
                  className="group cursor-pointer bg-white/[0.03] border border-white/10 hover:border-brand-green/40 rounded-3xl p-6 transition-all hover:bg-white/[0.05] flex flex-col justify-between min-h-[380px] relative overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {/* Corner Glow Leak */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  {/* Status Pill Badge */}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-white/40 font-mono tracking-wide">
                      {proj.category.split(' ')[0]}
                    </span>
                    {proj.badge && (
                      <span className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                        proj.badge === 'RELEASE' ? 'bg-[#005639]/30 text-[#00a36c] border-[#005639]/50' :
                        proj.badge === 'PRODUCTION' ? 'bg-indigo-950/40 text-indigo-300 border-indigo-500/20' :
                        'bg-amber-950/40 text-amber-300 border-amber-500/20'
                      }`}>
                        {proj.badge}
                      </span>
                    )}
                  </div>

                  {/* Visual Avatar of App/Project */}
                  <div className="my-6 flex justify-center">
                    <div className="relative w-36 h-36 rounded-[2rem] bg-black p-1.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-xl border border-white/10">
                      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/[0.02] to-transparent"></div>
                      <img 
                        src={proj.image} 
                        alt={proj.title} 
                        className="w-full h-full rounded-[1.8rem] object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-1">
                    <h3 className="font-sans font-semibold text-white group-hover:text-[#00a36c] transition-colors leading-snug flex items-center justify-between">
                      {proj.title}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#00a36c]" />
                    </h3>
                    <div className="flex items-center justify-between text-xs font-mono text-white/40">
                      <span>Mubin Roshan</span>
                      <span>{proj.year}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 3. RECENT STORIES / DEVLOGS FEED */}
          <section className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#00a36c] font-bold">Threat Bulletins</span>
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="text-2xl font-serif text-white tracking-tight mt-1"
                >
                  Recent Stories
                </motion.h2>
              </div>
              <button 
                id="view-all-stories-btn"
                tabIndex={0}
                onClick={() => setActiveTab('story')} 
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTab('story'); } }}
                className="group flex items-center gap-1.5 text-xs font-mono text-[#00a36c] hover:text-[#00a36c]/80 transition-colors focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none rounded-md px-1.5 py-0.5"
              >
                All Stories
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="space-y-4">
              {STORIES_DATA.map((story) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  tabIndex={0}
                  onClick={() => setSelectedStory(story)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedStory(story); } }}
                  className="group cursor-pointer p-6 rounded-2xl hover:bg-white/[0.03] border border-transparent hover:border-white/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                >
                  <div className="space-y-2">
                    {/* Meta details */}
                    <div className="flex items-center gap-3 text-xs font-mono text-white/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-white/30" />
                        {story.date}
                      </span>
                      <span>•</span>
                      <span className="text-[#00a36c] font-semibold uppercase">{story.category}</span>
                    </div>
                    {/* Serif Title */}
                    <h3 className="text-xl font-serif text-white group-hover:text-emerald-300 transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-sm text-white/50 max-w-3xl line-clamp-2 leading-relaxed">
                      {story.summary}
                    </p>
                  </div>

                  {/* Right Arrow link */}
                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <span className="text-xs font-mono text-white/40 group-hover:text-white/70 transition-colors bg-white/[0.02] px-2.5 py-1 rounded-md border border-white/10 animate-fadeIn">
                      {getReadingTime(story.content)}
                    </span>
                    <div className="p-2 rounded-full bg-white/[0.02] border border-white/5 text-white/30 group-hover:text-[#00a36c] group-hover:bg-[#005639]/30 group-hover:border-brand-green/30 transition-all">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 4. CLINICAL BULLETIN SUBSTACK EMAIL BOX */}
          <section>
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="relative rounded-3xl p-8 bg-white/[0.03] border border-white/10 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
            >
              {/* Neon Leak */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-[#005639]/10 blur-3xl rounded-full" />
              
              <div className="flex items-center gap-5 relative">
                <div className="p-4 rounded-2xl bg-[#005639]/20 text-[#00a36c] border border-brand-green/30">
                  <Shield className="w-8 h-8 animate-pulse text-[#00a36c]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-[#005639]/30 text-[#00a36c] rounded-lg">SUBSTACK BULLETIN</span>
                    <span className="w-2 h-2 rounded-full bg-[#00a36c] animate-ping"></span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white leading-snug">
                    Clinical CyberSec Bulletins
                  </h3>
                  <p className="text-xs text-white/40 max-w-sm">
                    Join 1,200+ healthcare administrators receiving my analytical security vulnerability briefs.
                  </p>
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 relative">
                <input 
                  type="email" 
                  placeholder="Enter clinical or personal email" 
                  className="bg-black/40 border border-white/10 focus:border-brand-green/60 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-colors w-full sm:w-64 font-mono"
                />
                <button className="bg-[#005639] hover:bg-[#00704a] text-white keep-text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg flex items-center justify-center gap-2 font-mono hover:scale-105 active:scale-95">
                  <span className="keep-text-white text-white">Secure Join</span>
                  <ArrowRight className="w-4 h-4 text-white keep-text-white" />
                </button>
              </div>
            </motion.div>
          </section>

          {/* 5. PROJECT INSIGHTS BAR CHART (D3) */}
          <section id="project-insights-chart-section" className="pt-2 animate-fadeIn">
            <ProjectInsights />
          </section>
        </>
      )}

    </motion.div>
  );
}
