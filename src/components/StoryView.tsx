import { useState, MouseEvent } from 'react';
import { StoryItem } from '../types';
import { STORIES_DATA } from '../data';
import { getReadingTime } from '../utils';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  ThumbsUp, 
  ChevronRight,
  BookOpen,
  Send,
  Linkedin,
  Paperclip
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StoryViewProps {
  selectedStory: StoryItem | null;
  setSelectedStory: (story: StoryItem | null) => void;
}

export default function StoryView({ selectedStory, setSelectedStory }: StoryViewProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'Cybersecurity' | 'Data Analysis'>('all');
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);

  const filteredStories = STORIES_DATA.filter(story => {
    if (activeFilter === 'all') return true;
    return story.category === activeFilter;
  });

  const toggleLike = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    if (likedArticles.includes(id)) {
      setLikedArticles(prev => prev.filter(aId => aId !== id));
    } else {
      setLikedArticles(prev => [...prev, id]);
    }
  };

  const handleCopyLink = (e: MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-16">
      
      <AnimatePresence mode="wait">
        {!selectedStory ? (
          /* ================= LIST OF ARTICLES VIEW ================= */
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-12"
          >
            {/* Page Header */}
            <div className="pt-6 text-center space-y-3">
              <span className="text-xs font-mono font-semibold text-[#00a36c] tracking-widest uppercase">Articles & Bulletins</span>
              <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">The Story Log</h1>
              <p className="text-sm text-white/50 max-w-lg mx-auto">
                Occasionally, I share detailed case studies on healthcare framework exploits, compliance protocols, and telemetry pipelines.
              </p>

              {/* Decorative Line */}
              <div className="flex items-center justify-center gap-4 py-2 opacity-40">
                <div className="h-px bg-gradient-to-r from-transparent to-white/30 w-16"></div>
                <span className="text-[#00a36c] font-serif text-xs">✦   ✧   ✦</span>
                <div className="h-px bg-gradient-to-l from-transparent to-white/30 w-16"></div>
              </div>

              {/* Filter Tabs & Channel badges */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
                <button 
                  id="story-filter-all"
                  onClick={() => setActiveFilter('all')}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold font-mono border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
                    activeFilter === 'all' 
                      ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-500/10 keep-teal-active' 
                      : 'bg-transparent border-transparent text-gray-300 hover:bg-teal-600/10 hover:border-teal-500/10 hover:text-white'
                  }`}
                >
                  All Bulletins
                </button>
                <button 
                  id="story-filter-cyber"
                  onClick={() => setActiveFilter('Cybersecurity')}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold font-mono border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
                    activeFilter === 'Cybersecurity' 
                      ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-500/10 keep-teal-active' 
                      : 'bg-transparent border-transparent text-gray-300 hover:bg-teal-600/10 hover:border-teal-500/10 hover:text-white'
                  }`}
                >
                  Cybersecurity
                </button>
                <button 
                  id="story-filter-data"
                  onClick={() => setActiveFilter('Data Analysis')}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold font-mono border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
                    activeFilter === 'Data Analysis' 
                      ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-500/10 keep-teal-active' 
                      : 'bg-transparent border-transparent text-gray-300 hover:bg-teal-600/10 hover:border-teal-500/10 hover:text-white'
                  }`}
                >
                  Data Analytics
                </button>
              </div>
            </div>

            {/* Articles List */}
            <div className="space-y-6">
              {filteredStories.map((story) => (
                <motion.div
                  key={story.id}
                  whileHover={{ scale: 1.005 }}
                  onClick={() => setSelectedStory(story)}
                  className="group cursor-pointer bg-white/[0.03] border border-white/10 hover:border-[#00a36c]/40 rounded-2xl p-6 sm:p-8 transition-all hover:bg-white/[0.05]"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono uppercase bg-[#005639]/30 border border-brand-green-light/20 text-[#00a36c] px-2.5 py-0.5 rounded-md">
                          {story.category}
                        </span>
                        <div className="text-[11px] font-mono text-white/40 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {story.date}
                        </div>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-serif text-white group-hover:text-[#00a36c] transition-colors leading-snug">
                        {story.title}
                      </h2>

                      <p className="text-sm text-white/50 leading-relaxed font-light">
                        {story.summary}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center justify-between sm:justify-start w-full sm:w-auto gap-4 self-stretch border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6 text-xs text-white/40">
                      <div className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{getReadingTime(story.content)}</span>
                      </div>

                      {/* Interactive Counters */}
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={(e) => toggleLike(story.id, e)}
                          className={`p-2 rounded-lg border transition-all flex items-center gap-1 ${
                            likedArticles.includes(story.id)
                              ? 'bg-[#005639]/30 text-[#00a36c] border-brand-green-light/30'
                              : 'bg-white/[0.01] text-white/40 border-white/10 hover:text-white'
                          }`}
                          title="Like bulletin"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-mono">{(story.likes || 0) + (likedArticles.includes(story.id) ? 1 : 0)}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* ================= DEEP READING VIEW ================= */
          <motion.div 
            key="reader"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="space-y-8 bg-white/[0.03] rounded-3xl border border-white/10 p-6 sm:p-10 relative overflow-hidden"
          >
            {/* Top Back Action Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <button 
                onClick={() => setSelectedStory(null)}
                className="group flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white transition-colors"
                id="btn-back-stories"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to stories
              </button>

              <div className="flex items-center gap-3">
                <button 
                  onClick={handleCopyLink}
                  className="p-2 bg-white/[0.02] hover:bg-white/[0.04] text-white/40 hover:text-white border border-white/10 rounded-xl transition-all text-xs font-mono flex items-center gap-1.5"
                  title="Copy bulletin link"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                </button>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 bg-white/[0.02] hover:bg-white/[0.04] text-white/40 hover:text-white border border-white/10 rounded-xl transition-all"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Title, Category & Read times */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-xs font-mono text-white/45">
                <span className="text-[#00a36c] font-bold uppercase">{selectedStory.category}</span>
                <span>•</span>
                <span>{selectedStory.date}</span>
                <span>•</span>
                <span>{getReadingTime(selectedStory.content)}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif text-white leading-tight font-extrabold">
                {selectedStory.title}
              </h1>

              {/* Subtitle / summary */}
              <p className="text-base sm:text-lg text-white/50 leading-relaxed font-light">
                {selectedStory.summary}
              </p>
            </div>

            {/* Render Story Content */}
            <div className="prose prose-invert max-w-none text-white/60 font-sans leading-relaxed text-sm sm:text-base border-t border-white/10 pt-8 space-y-6">
              {/* Parse the mock markdown paragraphs */}
              {selectedStory.content.split('\n\n').map((paragraph, index) => {
                const cleanParagraph = paragraph.replaceAll('**', '');
                if (cleanParagraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-lg sm:text-xl font-bold font-mono text-white pt-4 flex items-center gap-2">
                       <span className="text-[#00a36c] select-none">#</span>
                      {cleanParagraph.substring(4)}
                    </h3>
                  );
                }
                if (cleanParagraph.startsWith('1. ') || cleanParagraph.startsWith('- ')) {
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 pl-4 text-white/50">
                      {cleanParagraph.split('\n').map((li, liIdx) => (
                        <li key={liIdx} className="leading-relaxed">
                          {li.replace(/^[-\d\.\s]+/, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="leading-relaxed text-white/60 font-light">
                    {cleanParagraph}
                  </p>
                );
              })}
            </div>

            {/* Newsletter reminder at end of post */}
            <div className="mt-12 bg-[#0B4F43] border border-[#0B4F43]/80 keep-bg-teal rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white keep-bright-white font-mono flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-white keep-bright-white" />
                  Mubin Roshan Bulletin Subscriptions
                </div>
                <p className="text-[11px] text-white keep-bright-white">Stay up to speed with cybersecurity audits and ICU database workflows.</p>
              </div>
              <button 
                onClick={() => setSelectedStory(null)}
                className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black keep-bg-yellow keep-text-black text-xs font-mono font-bold rounded-xl transition-all shadow-md active:scale-95 shrink-0"
              >
                Sign Up Bulletins
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
