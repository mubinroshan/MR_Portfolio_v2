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
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function TimelineView() {
  const [filter, setFilter] = useState<'all' | 'career' | 'certification'>('all');

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
      className="max-w-5xl mx-auto space-y-16 pb-20"
    >
      {/* Page Title with sleek layout resembling ref image 5 */}
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
        <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
          The linear log of notable achievements, cybersecurity defenses, and analytical audits implemented so far.
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-5 py-3 opacity-50">
          <div className="h-px bg-gradient-to-r from-transparent to-white/30 w-24"></div>
          <span className="text-[#00a36c] font-serif text-sm">✦   ✧   ✦</span>
          <div className="h-px bg-gradient-to-l from-transparent to-white/30 w-24"></div>
        </div>

        {/* Channels/Pill filters mimicking Twitter/LinkedIn/Instagram pill container */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
          <button 
            id="filter-all"
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold font-mono border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
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
            className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold font-mono border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
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
            className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold font-mono border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
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
      <div className="relative pt-10 pl-6 sm:pl-0 sm:mx-auto">
        {/* Continuous vertical timeline axis */}
        <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00a36c]/60 via-white/15 to-transparent"></div>

        <div className="space-y-16">
          {filteredTimeline.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div 
                key={item.id}
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
                <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 top-2 z-10">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 w-6 h-6 rounded-full bg-teal-500/20 blur-md scale-150 animate-pulse"></div>
                    <div className="w-5 h-5 rounded-full bg-[#0a0a0a] border-2 border-teal-500 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-teal-400"></div>
                    </div>
                  </div>
                </div>

                {/* 3. Card detail side */}
                <div className="sm:w-[44%] pl-12 sm:pl-0 relative w-full">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    tabIndex={0}
                    className="bg-white/[0.03] border border-white/10 rounded-3xl hover:border-teal-500/40 hover:bg-white/[0.05] p-8 sm:p-9 transition-all duration-300 shadow-xl space-y-5 outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    {/* Badge Category pill */}
                    <div className="flex flex-wrap gap-2.5">
                      <span className={`text-[10px] sm:text-xs uppercase tracking-wider px-3 py-1 rounded-md font-mono font-semibold border ${
                        item.category === 'career' ? 'bg-[#005639]/30 text-[#00a36c] border-brand-green-light/35' :
                        item.category === 'certification' ? 'bg-amber-950/20 text-amber-400 border-amber-800/30 font-bold' :
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
                    <h3 className="text-xl sm:text-2xl font-serif text-white hover:text-teal-300 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-gray-300 leading-relaxed font-sans font-light">
                      {item.description}
                    </p>

                    {/* Details Bullet breakdown if provided */}
                    {item.details && item.details.length > 0 && (
                      <div className="border-t border-white/[0.06] pt-4 mt-3 space-y-3">
                        {item.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-3 text-sm sm:text-base text-gray-400">
                             <span className="text-teal-400 font-extrabold mt-0.5">•</span>
                             <span className="leading-relaxed font-light">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
