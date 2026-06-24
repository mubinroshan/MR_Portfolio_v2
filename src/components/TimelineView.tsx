import { TimelineItem } from '../types';
import { TIMELINE_DATA } from '../data';
import { 
  Briefcase, 
  Award, 
  FileCode, 
  Calendar,
  Twitter,
  Linkedin,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  X,
  ZoomIn
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

const TimelineSkeleton = () => {
  return (
    <div className="space-y-16 animate-pulse w-full">
      {[1, 2, 3].map((num) => {
        const isLeft = num % 2 === 0;
        return (
          <div 
            key={num}
            className={`relative flex flex-col sm:flex-row items-start sm:justify-between w-full ${
              isLeft ? 'sm:flex-row-reverse' : ''
            }`}
          >
            {/* Date skeleton */}
            <div className={`sm:w-[44%] text-left ${isLeft ? 'sm:text-left' : 'sm:text-right'} pl-7 sm:pl-0 pb-3 sm:pb-0`}>
              <div className="inline-flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-white/10"></div>
                <div className="h-4 w-28 bg-white/10 rounded"></div>
              </div>
            </div>

            {/* Line center dot */}
            <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-2 z-10">
              <div className="w-5 h-5 rounded-full bg-white/10 border-2 border-white/20"></div>
            </div>

            {/* Card Skeleton */}
            <div className="sm:w-[44%] pl-7 sm:pl-0 relative w-full">
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-9 space-y-4">
                {/* Badge tags */}
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-white/10 rounded"></div>
                  <div className="h-5 w-12 bg-white/5 rounded"></div>
                </div>
                {/* Title */}
                <div className="h-6 w-3/4 bg-white/20 rounded"></div>
                {/* Description lines */}
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-full bg-white/5 rounded"></div>
                  <div className="h-4 w-5/6 bg-white/5 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const TimelineCard = ({ item, onImageClick }: { item: TimelineItem; onImageClick: (src: string, title: string) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mobileHeight, setMobileHeight] = useState<string | number>('auto');

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !contentRef.current) return;
      
      const isMobile = window.innerWidth < 640;
      if (!isMobile) {
        setMobileHeight('auto');
        return;
      }

      // Measured width of the card container on the phone screen
      const width = containerRef.current.getBoundingClientRect().width;
      
      // scrollHeight of the inner content wrapper
      const contentHeight = contentRef.current.scrollHeight;
      
      // Vertical padding inside: p-8 is 2rem/32px on top and bottom, totaling 64px padding
      const totalPadding = 64; 
      const naturalHeight = contentHeight + totalPadding;

      if (naturalHeight > width) {
        // Content exceeds a perfect square, let it expand naturally so all text is 100% visible
        setMobileHeight('auto');
      } else {
        // Content fits perfectly, force it into a correct 1:1 aspect-ratio square
        setMobileHeight(width);
      }
    };

    // Run measurement on mount with a safe render delay, and register resize listeners
    const timer = setTimeout(handleResize, 150);
    window.addEventListener('resize', handleResize);
    
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [item]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ height: mobileHeight }}
      whileHover={{ scale: 1.02 }}
      tabIndex={0}
      className="bg-white/[0.03] border border-white/10 rounded-3xl hover:border-teal-500/40 hover:bg-white/[0.05] p-8 sm:p-9 transition-all duration-300 shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black flex flex-col justify-center"
    >
      <div ref={contentRef} className="space-y-5 w-full">
        {item.imageUrl && (
          <div 
            onClick={() => onImageClick(item.imageUrl!, item.title)}
            className="w-full overflow-hidden rounded-2xl mb-4 border border-white/10 bg-black/30 flex items-center justify-center p-2 cursor-zoom-in relative group"
            title="Click to view full certificate"
          >
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-auto max-h-[350px] object-contain select-none pointer-events-none group-hover:scale-[1.02] transition-transform duration-300 rounded-lg"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.opacity = "0.35";
              }}
            />
            {/* Hover overlay badge */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 rounded-2xl">
              <div className="bg-teal-600/90 hover:bg-teal-500 text-white font-mono text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>View Full Certificate</span>
              </div>
            </div>
          </div>
        )}
        {/* Badge Category pill */}
        <div className="flex flex-wrap gap-2.5">
          <span className={`text-[10px] sm:text-xs uppercase tracking-wider px-3 py-1 rounded-md font-mono font-semibold border ${
            item.category === 'career' ? 'bg-[#005639]/30 text-[#00a36c] border-brand-green-light/35' :
            item.category === 'certification' ? 'bg-amber-950/20 text-amber-400 border-amber-800/30' :
            'bg-blue-950/20 text-blue-400 border-blue-900/30'
          }`}>
            {item.category}
          </span>
          {item.tags.map(tag => (
            <span key={tag} className="text-xs font-mono text-white/50 bg-white/[0.02] border border-white/10 px-2.5 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-serif text-white hover:text-teal-300 transition-colors leading-snug text-left">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-base text-gray-300 leading-relaxed font-sans font-light text-left">
          {item.description}
        </p>

        {/* Details Bullet breakdown if provided */}
        {item.details && item.details.length > 0 && (
          <div className="border-t border-white/[0.06] pt-4 mt-3 space-y-3">
            {item.details.map((detail, dIdx) => (
              <div key={dIdx} className="flex items-start gap-3 text-sm sm:text-base text-gray-400 text-left">
                 <span className="text-teal-400 font-extrabold mt-0.5">•</span>
                 <span className="leading-relaxed font-light text-left">{detail}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const MobileTimelineCard = ({ item, onImageClick }: { item: TimelineItem; onImageClick: (src: string, title: string) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Split tags and count remaining ones if exist
  const displayedTags = item.tags.slice(0, 2);
  const extraCount = item.tags.length - displayedTags.length;

  return (
    <div className="bg-[#F5EFE1] dark:bg-white/[0.03] border border-[#0d5c56]/15 dark:border-white/10 rounded-2xl p-5 shadow-sm transition-all duration-300 w-full text-left">
      <div className="space-y-4 w-full">
        {item.imageUrl && (
          <div 
            onClick={() => onImageClick(item.imageUrl!, item.title)}
            className="w-full overflow-hidden rounded-xl mb-3 border border-[#0d5c56]/15 dark:border-white/10 bg-[#FAF6EB]/40 dark:bg-black/30 flex items-center justify-center p-1.5 animate-fade-in cursor-zoom-in relative group"
            title="Tap to view full certificate"
          >
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-auto max-h-[280px] object-contain select-none pointer-events-none rounded-lg group-hover:scale-[1.01] transition-transform duration-300"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.opacity = "0.35";
              }}
            />
            {/* Quick interactive indicator on mobile */}
            <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/60 shadow-md">
              <ZoomIn className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        )}
        {/* Row of tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Category */}
          <span className={`text-[9px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded ${
            item.category === 'career' ? 'bg-[#0d5c56]/10 dark:bg-[#005639]/30 text-[#0d5c56] dark:text-[#00a36c]' :
            item.category === 'certification' ? 'bg-amber-600/10 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400' :
            'bg-blue-600/10 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400'
          }`}>
            {item.category}
          </span>

          {/* Tags */}
          {displayedTags.map(tag => (
            <span key={tag} className="text-[11px] font-mono text-[#0d5c56]/70 dark:text-white/50 bg-[#FAF6EB]/40 dark:bg-white/[0.02] px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}

          {/* Plus symbol container */}
          {extraCount > 0 && (
            <span className="text-[11px] font-mono text-gray-500 dark:text-white/40 bg-[#FAF6EB]/20 dark:bg-white/[0.04] border border-[#0d5c56]/10 dark:border-white/10 px-1.5 py-0.5 rounded">
              +{extraCount}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-extrabold text-[#0d5c56] dark:text-white leading-snug">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-sans font-light">
          {item.description}
        </p>

        {/* View Details clickable button */}
        <button
          id={`expand-btn-${item.id}`}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between border-t border-[#0d5c56]/10 dark:border-white/10 pt-3 mt-1 text-xs font-semibold text-[#0d5c56] dark:text-teal-400 hover:text-[#00a36c] dark:hover:text-teal-300 transition-colors tracking-wide"
        >
          <span>View Details</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-[#0d5c56] dark:text-teal-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#0d5c56] dark:text-teal-400" />
          )}
        </button>

        {/* Bullet details expanded content */}
        <AnimatePresence initial={false}>
          {isExpanded && item.details && item.details.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-3 space-y-2.5 border-t border-dashed border-[#0d5c56]/10 dark:border-white/10 mt-1">
                {item.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    <span className="text-[#00a36c] dark:text-teal-400 font-extrabold select-none mt-0.5">•</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function TimelineView() {
  const [filter, setFilter] = useState<'all' | 'career' | 'certification'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Escape key handler to close full-screen certificate preview
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredTimeline = TIMELINE_DATA.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-[1360px] mx-auto space-y-12 pb-20"
    >
      {/* Page Title */}
      <div className="text-center space-y-5 pt-8">
        <motion.h1 
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-5xl md:text-6xl font-serif text-white font-extrabold tracking-tight relative inline-block"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-200 to-white">
            Timeline
          </span>
        </motion.h1>
        <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed px-4">
          The linear log of notable achievements, cybersecurity defenses, and analytical audits implemented so far.
        </p>

        {/* Decorative Divider: Three emerald/teal solid diamonds aligned elegantly */}
        <div className="flex items-center justify-center gap-2 py-2">
          <span className="text-[#00a36c] dark:text-teal-400 text-xs text-opacity-80">◆</span>
          <span className="text-[#00a36c] dark:text-teal-400 text-xs text-opacity-80">◆</span>
          <span className="text-[#00a36c] dark:text-teal-400 text-xs text-opacity-80">◆</span>
        </div>

        {/* Channels/Pill filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3 px-4">
          <button 
            id="filter-all"
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold font-mono border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
              filter === 'all' 
                ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-500/10 keep-teal-active' 
                : 'bg-transparent border-transparent text-gray-300 hover:bg-teal-600/10 hover:border-teal-600/20 hover:text-white'
            }`}
          >
            All Logs
          </button>
          <button 
            id="filter-career"
            onClick={() => setFilter('career')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold font-mono border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
              filter === 'career' 
                ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-500/10 keep-teal-active' 
                : 'bg-transparent border-transparent text-gray-300 hover:bg-teal-600/10 hover:border-teal-600/20 hover:text-white'
            }`}
          >
            Career Milestones
          </button>
          <button 
            id="filter-certifications"
            onClick={() => setFilter('certification')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold font-mono border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
              filter === 'certification' 
                ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-500/10 keep-teal-active' 
                : 'bg-transparent border-transparent text-gray-300 hover:bg-teal-600/10 hover:border-teal-600/20 hover:text-white'
            }`}
          >
            Certificates
          </button>
        </div>
      </div>

      {/* Main Track container */}
      <div className="relative pt-6 pl-4 pr-4 sm:pl-0 sm:pr-0 sm:mx-auto">
        {/* Continuous vertical timeline axis: left-4 on mobile, sm:left-1/2 on desktop */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00a36c]/65 via-[#0d5c56]/15 dark:via-white/10 to-transparent"></div>

        <div className="space-y-12 sm:space-y-16">
          {isLoading ? (
            <TimelineSkeleton />
          ) : (
            <>
              {/* DESKTOP VIEW (sm:block hidden) */}
              <div className="hidden sm:block space-y-16">
                {filteredTimeline.map((item, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <motion.div 
                      key={`desktop-${item.id}`}
                      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5 }}
                      className={`relative flex flex-col sm:flex-row items-start sm:justify-between w-full ${
                        isLeft ? 'sm:flex-row-reverse' : ''
                      }`}
                    >
                      {/* 1. Date label side (Desktop Left/Right layout) */}
                      <div className={`sm:w-[44%] text-left ${isLeft ? 'sm:text-left' : 'sm:text-right'} pl-12 sm:pl-0 pb-3 sm:pb-0`}>
                        <div className={`inline-flex items-center gap-2.5 text-sm sm:text-base font-semibold font-mono text-white/50`}>
                          <Calendar className="w-4 h-4 text-teal-400" />
                          <span>{item.date}</span>
                        </div>
                      </div>

                      {/* 2. Absolute center dot indicator on the line */}
                      <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-2 z-10">
                        <div className="relative flex items-center justify-center">
                          <div className="absolute inset-0 w-6 h-6 rounded-full bg-teal-500/20 blur-md scale-150 animate-pulse"></div>
                          <div className="w-5 h-5 rounded-full bg-[#0a0a0a] border-2 border-teal-500 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-teal-400"></div>
                          </div>
                        </div>
                      </div>

                      {/* 3. Card detail side */}
                      <div className="sm:w-[44%] pl-12 sm:pl-0 relative w-full">
                        <TimelineCard item={item} onImageClick={(src, title) => setPreviewImage({ src, title })} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* MOBILE VIEW (block sm:hidden) */}
              <div className="block sm:hidden space-y-10">
                {filteredTimeline.map((item) => (
                  <motion.div
                    key={`mobile-${item.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4 }}
                    className="relative pl-7"
                  >
                    {/* Double-ring node centered precisely on the main vertical timeline axis */}
                    <div className="absolute left-0 -translate-x-[11px] top-1 z-10">
                      <div className="w-5 h-5 rounded-full bg-[#FAF6EB] dark:bg-[#0b0a0c] border-2 border-[#00a36c] dark:border-teal-500 flex items-center justify-center shadow-sm">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#00a36c] dark:bg-teal-400"></div>
                      </div>
                    </div>

                    {/* Left inline date with calendar icon horizontally adjacent to the dot */}
                    <div className="flex items-center gap-2.5 mb-3 text-xs sm:text-sm font-semibold font-mono text-[#0d5c56]/80 dark:text-white/60">
                      <Calendar className="w-4 h-4 text-[#000a36c] dark:text-teal-400" />
                      <span>{item.date}</span>
                    </div>

                    {/* Light-theme and Dark-theme adaptive Collapsible mobile card */}
                    <MobileTimelineCard item={item} onImageClick={(src, title) => setPreviewImage({ src, title })} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* FULL-SCREEN CERTIFICATE PREVIEW MODAL */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#041614] backdrop-blur-md overflow-y-auto"
            onClick={() => setPreviewImage(null)}
          >
            {/* Background design patterns and elegant lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              {/* Rich radial gradient glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,110,103,0.18)_0%,rgba(4,22,20,0.98)_100%)]" />
              
              {/* Technical cyber grids */}
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(13,92,86,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(13,92,86,0.12)_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              {/* Glowing decorative circles & orbital paths */}
              <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full border border-teal-500/10" />
              <div className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] rounded-full border border-teal-500/5" />
              <div className="absolute -bottom-[15%] -right-[15%] w-[60vw] h-[60vw] rounded-full border border-teal-500/10" />
              <div className="absolute -bottom-[15%] -right-[15%] w-[40vw] h-[40vw] rounded-full border border-teal-500/5" />
              
              {/* Tech aesthetic framing crosshair lines */}
              <div className="absolute top-8 left-8 w-16 h-[2px] bg-teal-500/20" />
              <div className="absolute top-8 left-8 w-[2px] h-16 bg-teal-500/20" />
              
              <div className="absolute top-8 right-8 w-16 h-[2px] bg-teal-500/20" />
              <div className="absolute top-8 right-8 w-[2px] h-16 bg-teal-500/20" />
              
              <div className="absolute bottom-8 left-8 w-16 h-[2px] bg-teal-500/20" />
              <div className="absolute bottom-8 left-8 w-[2px] h-16 bg-teal-500/20" />
              
              <div className="absolute bottom-8 right-8 w-16 h-[2px] bg-teal-500/20" />
              <div className="absolute bottom-8 right-8 w-[2px] h-16 bg-teal-500/20" />
            </div>

            {/* Centering wrapper that handles heights gracefully */}
            <div className="min-h-full w-full flex items-center justify-center p-4 sm:p-6 md:p-8 relative z-10">
              {/* Modal Inner Container */}
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="relative max-w-4xl w-full flex flex-col items-center justify-center gap-6 text-center animate-fade-in"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Main Certificate Card - Image on top, Title underneath inside a beige styled card */}
                <div className="w-full bg-[#FAF6EB] border border-[#0d5c56]/20 rounded-2xl shadow-2xl p-3 sm:p-5 flex flex-col gap-4">
                  {/* Certificate Image Frame */}
                  <div className="relative w-full max-h-[50vh] flex justify-center items-center overflow-auto bg-black/5 rounded-xl p-1 border border-[#0d5c56]/10">
                    <img
                      src={previewImage.src}
                      alt={previewImage.title}
                      className="max-w-full max-h-[45vh] object-contain rounded-lg select-none shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Card description details under the image */}
                  <div className="bg-[#F5EFE1] rounded-xl p-4 border border-[#0d5c56]/15 text-center">
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-[#0d5c56]/80 tracking-widest uppercase mb-1 block">
                      {previewImage.title.toLowerCase().includes('cisco') ? 'CISCO SECURITY CERTIFIED' : 
                       previewImage.title.toLowerCase().includes('tryhackme') ? 'TRYHACKME SECURITY CERTIFIED' : 
                       'VERIFIED SECURITY CERTIFICATION'}
                    </span>
                    <h2 className="text-base sm:text-lg md:text-xl font-serif text-[#051616] font-extrabold tracking-tight select-none uppercase">
                      {previewImage.title}
                    </h2>
                    <p className="text-[10px] sm:text-xs text-[#051616]/60 font-mono mt-1">Verified Professional Security Credential</p>
                  </div>
                </div>

                {/* Close Button UI - Styled with System Beige BG and Teal text/icon */}
                <div className="flex items-center gap-4">
                  <button
                    id="close-preview-btn"
                    onClick={() => setPreviewImage(null)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF6EB] hover:bg-[#ebdcb9] border border-[#0d5c56]/25 text-[#0d5c56] hover:text-[#0c4e49] font-mono text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-md"
                  >
                    <X className="w-4 h-4 text-[#0d5c56]" />
                    <span>Close View</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
