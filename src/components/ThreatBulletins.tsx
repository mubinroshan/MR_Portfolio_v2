import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  ExternalLink, 
  ChevronRight, 
  RefreshCw, 
  Globe, 
  AlertCircle, 
  TrendingUp,
  ArrowLeft,
  User,
  Clock,
  Sparkles,
  BookOpen,
  Share2,
  Check
} from 'lucide-react';

export interface HNStory {
  id: number;
  title: string;
  by: string;
  time: number; // Unix timestamp in seconds
  url: string;
  score: number;
}

const DEFAULT_STORIES: HNStory[] = [
  {
    id: 999101,
    title: "LLMs are eroding my software engineering career and I don't know what to do",
    by: "poisonfountain",
    time: Math.floor(Date.now() / 1000) - 3600 * 2, // 2 hours ago
    url: "https://human-in-the-loop.bearblog.dev/llms-are-eroding-my-programming-career/",
    score: 426
  },
  {
    id: 999102,
    title: "The OnlyFans Economy of American AI",
    by: "growth_hawk",
    time: Math.floor(Date.now() / 1000) - 3600 * 5, // 5 hours ago
    url: "https://thebrowser.example.com/onlyfans-economy-american-ai",
    score: 86
  },
  {
    id: 999103,
    title: "Global Supply Chain Breach Exposes Multi-Factor Authentication Secrets",
    by: "sec_inspector",
    time: Math.floor(Date.now() / 1000) - 3600 * 8, // 8 hours ago
    url: "https://cybersecurity-news.example.com/supply-chain-mfa-breach",
    score: 342
  },
  {
    id: 999104,
    title: "Vector Database Indexing: Optimizing High-Dimensional Semantic Search",
    by: "data_architect",
    time: Math.floor(Date.now() / 1000) - 3600 * 12, // 12 hours ago
    url: "https://data-engineering.example.com/vector-db-indexing-opt",
    score: 189
  }
];

interface ThreatBulletinsProps {
  isSaudiGreenMode?: boolean;
}

export default function ThreatBulletins({ isSaudiGreenMode = false }: ThreatBulletinsProps) {
  const [stories, setStories] = useState<HNStory[]>(DEFAULT_STORIES);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeStoryId, setActiveStoryId] = useState<number | null>(null);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  
  const articleRef = useRef<HTMLDivElement>(null);

  const fetchHackerNews = async (isManual = false) => {
    if (isManual || stories.length === 0) {
      setLoading(true);
    }
    setError(null);
    try {
      // 1. Fetch top story IDs from Hacker News Firebase API
      const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      if (!res.ok) {
        throw new Error('Failed to retrieve top story IDs.');
      }
      const ids: number[] = await res.json();
      
      // Slice the top 15 so we have a few extra in case some don't have valid URLs
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
      
      // Filter out nulls, non-story types, and items without URLs (which we use for reference)
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
      console.error("Hacker News API fetch failed, keeping offline stories hook alive.", err);
      // Only set UI error if there are no default stories present
      if (stories.length === 0) {
        setError(err.message || 'Unable to load live bulletins. Please check connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHackerNews();
  }, []);

  // Set up reading progress tracking when active story is displayed
  useEffect(() => {
    if (activeStoryId === null) {
      setScrollPercent(0);
      return;
    }

    const handleScroll = () => {
      const element = articleRef.current;
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      
      // Calculate how far down the user has scrolled through the article element
      const elementHeight = element.scrollHeight;
      const elementTop = rect.top + scrollTop;
      
      // Start tracking scroll relative to the element top
      const scrollOffset = scrollTop + windowHeight - elementTop;
      const totalRange = elementHeight;
      
      if (totalRange <= windowHeight) {
        // If the article is short can fit within viewport, set to 100%
        setScrollPercent(100);
        return;
      }
      
      // Calculate ratio based on window scroll progress
      // (Scroll position from top / total scrollable height of page)
      const storyScrollTop = scrollTop - elementTop + (windowHeight / 2);
      const denominator = elementHeight - (windowHeight / 2);
      
      if (storyScrollTop <= 0) {
        setScrollPercent(0);
      } else if (storyScrollTop >= denominator) {
        setScrollPercent(100);
      } else {
        const percent = (storyScrollTop / denominator) * 100;
        setScrollPercent(Math.min(Math.max(percent, 0), 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial compute
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStoryId]);

  const activeStory = stories.find(s => s.id === activeStoryId);

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
      t.includes('phish') ||
      t.includes('credential') ||
      t.includes('dns') ||
      t.includes('firewall');
      
    if (isSec) return 'Cybersecurity';
    return 'Data Analysis';
  };

  // Helper to approximate reading content length for estimation style
  const getApproxReadingTime = (id: number): string => {
    // Generate a steady but deterministic reading time based on the ID
    const mins = (id % 3) + 3;
    return `${mins} min read`;
  };

  // Generate extremely rich, professional cybersecurity/data essays written from the portfolio owner's research perspective
  const generateArticleContent = (story: HNStory) => {
    const category = getDynamicCategory(story.title);
    const domain = getDomain(story.url);
    const title = story.title;
    
    if (category === 'Cybersecurity') {
      return [
        {
          type: 'h2',
          content: 'I. Field Incident Review & Technical Briefing'
        },
        {
          type: 'p',
          content: `The incident report highlighted in "${title}" (originally referenced via ${domain}) represents a critical escalation within key identity boundaries and operational infrastructure endpoints. Across modern network routing configurations, a significant vulnerability surface has expanded between container gateway proxies and backend state store servers.`
        },
        {
          type: 'p',
          content: `Historically, systems designed for high scalability assumed internal communication channels were implicitly secure. However, as modern cloud orchestration environments scale, malicious payloads can leverage minor parsing inconsistencies to bypass external validation filters entirely. For security teams globally, tracking these specific vulnerability signatures is crucial for maintaining real-time incident defense.`
        },
        {
          type: 'h2',
          content: 'II. Exploit Mechanics & Parsing Flaws'
        },
        {
          type: 'p',
          content: `At the code level, these systemic bypasses often originate in how reverse proxies (like NGINX, HAProxy, or custom-built Envoys) decode incoming URL fragments relative to upstream API controllers. When a malicious boundary payload bypasses Edge sanitization workflows, it is injected directly into internal headers.`
        },
        {
          type: 'p',
          content: `Below, I have written a diagnostic template to audit internal listener nodes, scanning for socket anomalies and analyzing SSH/TLS authentication records:`
        },
        {
          type: 'code',
          content: `# Identify all listening network interfaces, checking for unmapped ports
sudo netstat -tulpn | grep -Ei 'listening|established'

# Query central system auth logs for anomalous privilege escalation attempts
tail -n 120 /var/log/auth.log | grep -Ei 'fail|blocked|root|invalid user'`
        },
        {
          type: 'p',
          content: `Once horizontal penetration is achieved, automated tooling routinely scans memory buffers to extract raw database credentials, insecure configuration keys, and transient ENV values. Security hygiene requires that all internal system transport protocols operate on isolated network blocks with strict packet inspection.`
        },
        {
          type: 'h2',
          content: 'III. Cybersecurity Countermeasures & Architectures'
        },
        {
          type: 'p',
          content: `Restoring integrity within compromised clusters demands combined state inspections and client-side credential gating. Based on standard vulnerability management protocols, we recommend immediate execution of the following strategic mitigations:`
        },
        {
          type: 'p',
          content: `• Deploy Zero-Trust Microsegmentation: Establish locked virtual networks separating microservices so lateral compromise becomes effectively impossible.\n• Gateway Input Sanitization: Re-configure reverse proxy parsing routines to drop headers containing non-canonical ASCII characters or nested sequences.\n• Automated Integrity Verification: Implement automated CI pipeline checks to ensure signed image hashes match exactly before container runtime deployment.`
        },
        {
          type: 'quote',
          content: `“Active posture monitoring is not a localized shield, but a continuous diagnostic feedback loop. System visibility represents over half of the defensive equation.” — Clinical Cybersecurity Lab`
        },
        {
          type: 'p',
          content: `In summary, reports like this emphasize that modern application defense cannot rely on perimeter checks. Rigorous static input verification paired with end-to-end transport encryption forms the core of resilient distributed architectures.`
        }
      ];
    } else {
      // Data Analysis / Data Engineering essay
      return [
        {
          type: 'h2',
          content: 'I. Data Infrastructure Evolution & Pipeline Challenges'
        },
        {
          type: 'p',
          content: `The development highlighted in "${title}" (first cataloged source at ${domain}) marks a major milestone in high-performance data processing pipelines and distributed memory schemas. Achieving real-time analytics with millions of concurrent messages demands continuous optimization of active concurrency models.`
        },
        {
          type: 'p',
          content: `In standard microservice clusters, systems frequently stumble when dealing with asynchronous state variation. When storage engines must read and write high-volume updates under heavy load, data fragmentation and scheduling bottlenecks routinely emerge, degrading client responsiveness and inflating storage costs.`
        },
        {
          type: 'h2',
          content: 'II. Pipeline Optimization & Concurrency Deep Dive'
        },
        {
          type: 'p',
          content: `Resolving throughput spikes requires engineers to build non-blocking batch buffers on the ingestion layer. By queueing active inputs before disk-write execution, database lock contentions drop by order of magnitudes.`
        },
        {
          type: 'p',
          content: `Here is a robust, thread-safe asynchronous batching utility that I wrote to illustrate this concept in TypeScript, featuring automated flush boundaries:`
        },
        {
          type: 'code',
          content: `// Dynamic thread-safe queue buffer for microsecond high-volume ingestion
export class TelemetryBatcher<T> {
  private bufferQueue: T[] = [];
  private batchLimit = 250;
  private timer: NodeJS.Timeout | null = null;

  constructor(private onFlush: (batch: T[]) => void, private intervalMs = 1500) {}

  public insert(item: T): void {
    this.bufferQueue.push(item);
    if (this.bufferQueue.length >= this.batchLimit) {
      this.flushNow();
    } else if (!this.timer) {
      this.timer = setTimeout(() => this.flushNow(), this.intervalMs);
    }
  }

  private flushNow(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.bufferQueue.length === 0) return;
    const currentBatch = [...this.bufferQueue];
    this.bufferQueue = [];
    this.onFlush(currentBatch);
  }
}`
        },
        {
          type: 'p',
          content: `This queue strategy shifts the performance curve from disk I/O limits directly to available memory speeds. On modern cloud VMs, this reduces latency overheads from hundreds of milliseconds down to sub-microsecond levels.`
        },
        {
          type: 'h2',
          content: 'III. Scalability and Schema Diagnostics'
        },
        {
          type: 'p',
          content: `To build elegant pipeline monitors, technical leads should implement the following recommendations:`
        },
        {
          type: 'p',
          content: `• Validate Schema Integrity: Enforce structural parameters right at the edge gateway before records penetrate active ingestion streams.\n• Standardize Analytical Formats: Leverage column-oriented structures (like Parquet or ORC) instead of legacy row-based text logs for long-term cold archives.\n• Telemetry Alerts: Configure active notifications calibrated to tracking data-ingestion delay spikes, spotting upstream latency trends proactively.`
        },
        {
          type: 'quote',
          content: `“Perfect software scale is achieved not by purchasing more raw compute, but by arranging isolated execution streams into independent, stateless pipelines.”`
        },
        {
          type: 'p',
          content: `Studying systemic updates like "${title}" broadens our engineering scope. Implementing clean concurrency workflows allows our analytical software to scale efficiently to meet future needs.`
        }
      ];
    }
  };

  const handleShare = (story: HNStory) => {
    try {
      navigator.clipboard.writeText(story.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // Color classes mapping according to cream theme (#FAF6EB, text #0d5c56 / #0B4F43, secondary text #566F6A)
  // or dark green mode (#0b0a0c, text white, secondary text text-white/50)
  const isCream = !isSaudiGreenMode;

  return (
    <div className="space-y-6">
      <AnimatePresence mode="popLayout">
        <motion.div
          key="list-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          {/* Loading Skeleton state */}
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3, 4].map((index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isCream 
                      ? 'bg-transparent border-[#0d5c56]/15' 
                      : 'bg-white/[0.01] border-white/5'
                  }`}
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="h-4 bg-[#0B4F43]/10 dark:bg-white/10 rounded w-24"></div>
                      <div className="h-4 bg-[#0B4F43]/10 dark:bg-white/10 rounded w-32"></div>
                    </div>
                    <div className="h-6 bg-[#0B4F43]/15 dark:bg-white/15 rounded w-11/12 md:w-3/4"></div>
                    <div className="h-4 bg-[#0B4F43]/10 dark:bg-white/10 rounded w-1/2"></div>
                  </div>
                  <div className="flex items-center gap-2 self-start md:self-center">
                    <div className="h-7 bg-[#0B4F43]/10 dark:bg-white/10 rounded-md w-20"></div>
                    <div className="h-10 w-10 bg-[#0B4F43]/10 dark:bg-white/10 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            /* Error fallbacks and Retry CTA */
            <div className={`p-8 rounded-2xl border text-center flex flex-col items-center justify-center space-y-4 ${
              isCream ? 'bg-transparent border-red-500/20' : 'bg-red-500/[0.02] border-red-500/20'
            }`}>
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div className="space-y-1">
                <h4 className={`text-sm font-semibold font-sans ${isCream ? 'text-[#0B4F43]' : 'text-white'}`}>Live News Feed Unavailable</h4>
                <p className="text-xs text-white/50 max-w-md">{error}</p>
              </div>
              <button 
                onClick={fetchHackerNews}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-xl border transition-all shadow-md active:scale-95 ${
                  isCream 
                    ? 'border-[#0B4F43]/20 bg-[#FAF6EB] hover:bg-[#F5EFE1]' 
                    : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-white'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                Retry Fetch
              </button>
            </div>
          ) : (
            /* Loop hacker news stories cleanly and beautifully */
            stories.map((story) => {
              const category = getDynamicCategory(story.title);
              const readingTime = getApproxReadingTime(story.id);
              const formattedDate = new Date(story.time * 1000).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              });
              const isExpanded = activeStoryId === story.id;

              return (
                <motion.div
                  key={story.id}
                  layout="position"
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`rounded-2xl border transition-all duration-300 outline-none p-6 flex flex-col gap-4 cursor-pointer ${
                    isExpanded 
                      ? isCream 
                        ? 'bg-transparent border-[#0D5C56]/20 shadow-xl' 
                        : 'bg-transparent border-white/10 shadow-2xl text-gray-100'
                      : isCream 
                        ? 'bg-transparent border-[#0d5c56]/15 hover:border-[#0d5c56]/30 hover:bg-[#0B4F43]/5' 
                        : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-teal-400'
                  }`}
                  onClick={() => {
                    if (!isExpanded) {
                      setActiveStoryId(story.id);
                    } else {
                      setActiveStoryId(null);
                    }
                  }}
                  tabIndex={0}
                  onKeyDown={(e) => { 
                    if (e.key === 'Enter' || e.key === ' ') { 
                      e.preventDefault(); 
                      if (!isExpanded) {
                        setActiveStoryId(story.id);
                      } else {
                        setActiveStoryId(null);
                      }
                    } 
                  }}
                >
                  {/* UNIFIED HEADER (Screenshot 1 top styling) */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full text-left">
                    <div className="space-y-2 flex-1 min-w-0 select-text">
                      {/* Top Header metadata info */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono opacity-80">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400 opacity-70" />
                          {formattedDate}
                        </span>
                        <span>•</span>
                        <span className="text-[#00a36c] font-semibold uppercase">{category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-bold">
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                          {story.score} points
                        </span>
                      </div>

                      {/* Dynamic Title with serif typography */}
                      <h3 
                        onClick={(e) => {
                          if (isExpanded) {
                            e.stopPropagation();
                            setActiveStoryId(null);
                          }
                        }}
                        className={`text-xl sm:text-2xl font-serif font-bold leading-snug transition-colors hover:text-emerald-500 ${
                          isCream ? 'text-[#0B4F43]' : 'text-white'
                        }`}
                      >
                        {story.title}
                      </h3>

                      {/* Origin Domain references */}
                      <p className="text-xs font-mono opacity-60 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Source: <strong className="font-sans">{getDomain(story.url)}</strong></span>
                        <span>•</span>
                        <span>By: <strong className="text-[#00a36c]">{story.by}</strong></span>
                      </p>
                    </div>

                    {/* Expand right element blocks */}
                    <div className="flex items-center gap-2.5 self-start md:self-center transition-all bg-transparent shrink-0">
                      <span className={`text-xs font-mono py-1 px-2.5 rounded-md border ${
                        isCream 
                          ? 'border-[#0B4F43]/10 bg-[#0B4F43]/5 text-[#0B4F43]' 
                          : 'border-white/10 bg-white/[0.04] text-gray-300'
                      }`}>
                        {readingTime}
                      </span>
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isExpanded) {
                            setActiveStoryId(null);
                          } else {
                            setActiveStoryId(story.id);
                          }
                        }}
                        className={`p-2 rounded-full border transition-all keep-text-white ${
                          isCream 
                            ? 'bg-[#0B4F43] border-[#0B4F43] hover:bg-[#063c33]' 
                            : 'bg-white/10 border-white/10 hover:bg-white/20'
                        }`}
                      >
                        <ChevronRight 
                          className={`w-4 h-4 transition-transform duration-500 ease-in-out text-white keep-text-white shrink-0 ${
                            isExpanded ? '-rotate-90' : 'rotate-90'
                          }`}
                          stroke="#ffffff"
                        />
                      </div>
                    </div>
                  </div>

                  {/* COLLAPSIBLE SITE PREVIEW SECTION (Screenshot 2 bottom part) */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full overflow-hidden flex flex-col gap-5 text-left mt-2"
                      >
                        {/* Divider */}
                        <div className="border-t border-[#0b4f43]/10 dark:border-white/15 pt-4 w-full"></div>

                        {/* Browser address bar decoration */}
                        <div 
                          onClick={(e) => e.stopPropagation()}
                          className={`w-full rounded-2xl p-3 flex flex-row items-center justify-between gap-4 border ${
                            isCream 
                              ? 'bg-[#FAF6EB]/40 border-[#0b4f43]/15' 
                              : 'bg-[#151515] border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Globe className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span 
                              className={`text-xs sm:text-sm font-mono truncate select-all text-left ${
                                isCream ? 'text-[#0b4f43]' : 'text-emerald-400'
                              }`}
                              title={story.url}
                            >
                              {story.url}
                            </span>
                          </div>
                          <a 
                            href={story.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 select-none shadow-sm active:scale-95 text-white keep-text-white hover:opacity-90 ${
                              isCream
                                ? 'bg-[#0B4F43]'
                                : 'bg-[#00a36c]'
                            }`}
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-white keep-text-white" stroke="#ffffff" />
                            <span className="text-white keep-text-white">Open External</span>
                          </a>
                        </div>

                        {/* Responsive Iframe viewer container */}
                        <div 
                          onClick={(e) => e.stopPropagation()}
                          className="w-full relative rounded-3xl overflow-hidden border border-black/[0.08] shadow-inner bg-[#1e1625] h-[600px] flex flex-col justify-between"
                        >
                          <iframe 
                            src={story.url}
                            title={story.title}
                            className="w-full flex-1 border-0"
                            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                            loading="lazy"
                          />
                          
                          {/* Highly polished static note warning yellow card with AlertCircle warning icon */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#FFFAEB] border border-[#FEF3C7] shadow-xl md:shadow-2xl rounded-xl py-2 px-4 flex items-center gap-2 select-none z-10 w-[90%] sm:w-fit max-w-lg overflow-hidden">
                            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" strokeWidth={2.5} />
                            <div className="overflow-hidden w-full relative">
                              <div className="animate-alert-scroll-continuous whitespace-nowrap text-[10px] sm:text-xs font-semibold text-[#78350f] font-sans tracking-wide">
                                <span className="pr-12 inline-block">
                                  Note: If the site refuses to load below due to security policies, click <strong className="text-amber-700 font-extrabold underline">Open External</strong> to read directly.
                                </span>
                                <span className="pr-12 inline-block">
                                  Note: If the site refuses to load below due to security policies, click <strong className="text-amber-700 font-extrabold underline">Open External</strong> to read directly.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
