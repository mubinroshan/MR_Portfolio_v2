import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw, 
  Globe, 
  AlertCircle, 
  TrendingUp,
  BookOpen
} from 'lucide-react';

export interface HNStory {
  id: number;
  title: string;
  by: string;
  time: number; // Unix timestamp in seconds
  url: string;
  score: number;
}

interface ThreatBulletinsProps {
  isSaudiGreenMode?: boolean;
}

export default function ThreatBulletins({ isSaudiGreenMode = false }: ThreatBulletinsProps) {
  const [stories, setStories] = useState<HNStory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedStoryId, setExpandedStoryId] = useState<number | null>(null);

  const fetchHackerNews = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch top story IDs from Hacker News Firebase API
      const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      if (!res.ok) {
        throw new Error('Failed to retrieve top story IDs.');
      }
      const ids: number[] = await res.json();
      
      // Slice the first 12 results (we fetch a few more so we can filter and get 4 solid stories with URLs)
      const topIds = ids.slice(0, 15);
      
      // 2. Fetch details for each item concurrently
      const detailsPromises = topIds.map(async (id) => {
        try {
          const detailRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          if (!detailRes.ok) return null;
          return await detailRes.json();
        } catch {
          return null;
        }
      });

      const results = await Promise.all(detailsPromises);
      
      // Filter out nulls, non-story types, and items without URLs (since we need them for the embedded reader)
      const validStories: HNStory[] = results
        .filter((item): item is HNStory => 
          item !== null && 
          item.type === 'story' && 
          typeof item.url === 'string' && 
          item.url.trim() !== ''
        )
        // Take 4 results
        .slice(0, 4);

      if (validStories.length === 0) {
        throw new Error('No stories with valid URLs found.');
      }

      setStories(validStories);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Unable to load live bulletins. Please check connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHackerNews();
  }, []);

  const getDomain = (urlStr: string): string => {
    try {
      return new URL(urlStr).hostname.replace('www.', '');
    } catch {
      return urlStr;
    }
  };

  // Dynamically map HN articles to Cybersecurity / Data Analytics based on title contents
  const getDynamicCategory = (title: string): 'Cybersecurity' | 'Data Analysis' => {
    const t = title.toLowerCase();
    const isSec = 
      t.includes('security') || 
      t.includes('hack') || 
      t.includes('exploit') || 
      t.includes('vulnerab') || 
      t.includes('cyber') || 
      t.includes('cve') || 
      t.includes('leak') || 
      t.includes('auth') || 
      t.includes('attack') || 
      t.includes('malware') || 
      t.includes('ransomware') || 
      t.includes('protect') || 
      t.includes('defense') || 
      t.includes('encrypt') || 
      t.includes('phish');
      
    if (isSec) return 'Cybersecurity';
    return 'Data Analysis';
  };

  // Helper to approximate reading content length for estimation style
  const getApproxReadingTime = (id: number): string => {
    // Generate a steady but deterministic reading time based on the ID
    const mins = (id % 4) + 2;
    return `${mins} min read`;
  };

  const handleCardClick = (storyId: number) => {
    setExpandedStoryId(expandedStoryId === storyId ? null : storyId);
  };

  return (
    <div className="space-y-6">
      
      {/* Loading Skeleton State */}
      {loading && (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3, 4].map((index) => (
            <div 
              key={index} 
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <div className="h-4 bg-white/10 rounded w-24"></div>
                  <div className="h-4 bg-white/10 rounded w-32"></div>
                </div>
                <div className="h-6 bg-white/15 rounded w-11/12 md:w-3/4"></div>
                <div className="h-4 bg-white/10 rounded w-1/2"></div>
              </div>
              <div className="flex items-center gap-2 self-start md:self-center">
                <div className="h-7 bg-white/10 rounded-md w-20"></div>
                <div className="h-10 w-10 bg-white/10 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="p-8 rounded-2xl border border-red-500/20 bg-red-500/[0.02] flex flex-col items-center justify-center text-center space-y-4">
          <AlertCircle className="w-8 h-8 text-red-400" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold font-sans text-white">Live News Feed Unavailable</h4>
            <p className="text-xs text-white/50 max-w-md">{error}</p>
          </div>
          <button 
            onClick={fetchHackerNews}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-white transition-all shadow-md active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Fetch
          </button>
        </div>
      )}

      {/* Stories/Bulletins list */}
      {!loading && !error && (
        <div className="space-y-5">
          <AnimatePresence initial={false}>
            {stories.map((story) => {
              const category = getDynamicCategory(story.title);
              const isExpanded = expandedStoryId === story.id;
              const formattedDate = new Date(story.time * 1000).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              });

              return (
                <motion.div
                  key={story.id}
                  layout="position"
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className={`group rounded-2xl border transition-all flex flex-col p-6 overflow-hidden ${
                    isExpanded 
                      ? 'bg-white/[0.04] border-[#00a36c]/40 shadow-lg shadow-[#00a36c]/5' 
                      : 'hover:bg-white/[0.02] border-transparent hover:border-white/10 shadow-none'
                  }`}
                >
                  {/* Card Main Body */}
                  <div 
                    tabIndex={0}
                    onClick={() => handleCardClick(story.id)}
                    onKeyDown={(e) => { 
                      if (e.key === 'Enter' || e.key === ' ') { 
                        e.preventDefault(); 
                        handleCardClick(story.id); 
                      } 
                    }}
                    className="cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 outline-none select-none"
                  >
                    <div className="space-y-2.5 flex-1">
                      {/* Metadata Header Row */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-white/40">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-white/25" />
                          {formattedDate}
                        </span>
                        <span>•</span>
                        <span className="text-[#00a36c] font-semibold uppercase">{category}</span>
                        <span>•</span>
                        <span className="bg-white/[0.03] border border-white/10 text-white/50 px-1.5 py-0.5 rounded flex items-center gap-1.5">
                          <TrendingUp className="w-3 h-3 text-[#00a36c]" />
                          {story.score} points
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-serif text-white group-hover:text-emerald-300 transition-colors leading-snug">
                        {story.title}
                      </h3>

                      {/* Detail overview (domain name and author) */}
                      <p className="text-xs font-mono text-white/50 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-[#00a36c]/70" />
                        <span>Source: <strong className="text-white/70 font-sans">{getDomain(story.url)}</strong></span>
                        <span className="opacity-40">•</span>
                        <span>By: <strong className="text-[#00a36c]">{story.by}</strong></span>
                      </p>
                    </div>

                    {/* Right indicators */}
                    <div className="flex items-center gap-2 self-start md:self-center transition-all">
                      <span className="text-xs font-mono text-white/40 group-hover:text-white/70 transition-colors bg-white/[0.02] px-2.5 py-1 rounded-md border border-white/10">
                        {getApproxReadingTime(story.id)}
                      </span>
                      <div className={`p-2 rounded-full border transition-all ${
                        isExpanded 
                          ? 'text-[#00a36c] bg-[#005639]/30 border-brand-green/30 rotate-180' 
                          : 'bg-white/[0.02] border-white/5 text-white/30 group-hover:text-[#00a36c] group-hover:bg-[#005639]/20 group-hover:border-[#00a36c]/30'
                      }`}>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Embedded Reader Accordion */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 mt-5 border-t border-white/10 space-y-4">
                          {/* Control Bar */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/40 p-3.5 px-4 rounded-xl border border-white/5 font-mono text-xs text-white/60">
                            <div className="flex items-center gap-2 truncate">
                              <Globe className="w-4 h-4 text-[#00a36c] shrink-0" />
                              <span className="truncate max-w-sm sm:max-w-md md:max-w-lg text-[#00a36c] font-semibold">{story.url}</span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <a 
                                href={story.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 hover:text-white text-[#00a36c] transition-colors bg-white/[0.03] border border-white/10 px-2.5 py-1.5 rounded-lg active:scale-95"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Open External</span>
                              </a>
                            </div>
                          </div>

                          {/* Iframe Frame Box */}
                          <div 
                            className="relative w-full h-[400px] sm:h-[480px] md:h-[580px] rounded-xl overflow-hidden bg-white/5 border border-white/10"
                            style={{ 
                              // Apply filtering to iframe's container to blend white backgrounds with the cream theme
                              filter: 'contrast(98%) sepia(2%)' 
                            }}
                          >
                            <iframe 
                              src={story.url} 
                              title={story.title}
                              className="w-full h-full border-0 bg-white"
                              sandbox="allow-scripts allow-same-origin allow-popups"
                              referrerPolicy="no-referrer"
                            />
                            
                            {/* Seamless instructions note */}
                            <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-white/10 text-center pointer-events-none">
                              <p className="text-[11px] text-white/50 font-sans">
                                💡 Note: If the site refuses to load below due to security policies, click <strong className="text-emerald-300">Open External</strong> to read directly.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
