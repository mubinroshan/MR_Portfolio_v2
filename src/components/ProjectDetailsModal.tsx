import { Project } from '../types';
import { 
  X, 
  Github, 
  ExternalLink, 
  ShieldCheck, 
  Database,
  BarChart4,
  ArrowRight,
  AlertTriangle,
  Award,
  Terminal
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Dim Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      ></motion.div>

      {/* Floating Center Panel Drawer */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        className="relative bg-[#0a0a0a]/95 border border-white/10 rounded-3xl w-full max-w-2xl h-[90vh] sm:h-auto max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl p-6 sm:p-8 z-10 space-y-6"
      >
        {/* Header toolbar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-[#00a36c] uppercase tracking-widest leading-none font-bold">
              Project Specification
            </span>
            <h2 className="text-2xl font-serif text-white font-extrabold leading-tight">
              {project.title}
            </h2>
          </div>
          <button 
            id="btn-close-project"
            onClick={onClose}
            className="p-2 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 rounded-xl text-white/40 hover:text-white transition-all"
            title="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Big Graphic Frame */}
        <div className="w-full h-48 sm:h-64 rounded-2xl bg-black border border-white/10 overflow-hidden flex items-center justify-center">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Detailed Metrics Panel */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-3 bg-white/[0.02] border border-white/10 rounded-2xl p-4 text-center">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-wide">
                  {m.label}
                </div>
                <div className="text-base sm:text-lg font-mono font-bold text-[#00a36c]">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Long Text description and features list */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-bold text-white/40 flex items-center gap-1.5 uppercase">
            <ShieldCheck className="w-4 h-4 text-[#00a36c]" />
            Vulnerability Core Report
          </h3>
          <p className="text-sm text-white/70 leading-relaxed font-light">
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Technologies Used Section */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-white/40 flex items-center gap-1.5 uppercase">
              <Terminal className="w-4 h-4 text-[#00a36c]" />
              Core Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span 
                  key={tech} 
                  className="text-[11px] font-mono px-3 py-1 bg-white/[0.02] hover:bg-[#005639]/10 text-emerald-300 border border-white/10 hover:border-[#00a36c]/40 rounded-xl transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Challenges Faced Section */}
        {project.challenges && project.challenges.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-white/40 flex items-center gap-1.5 uppercase">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Technical Risk Challenges
            </h3>
            <div className="space-y-2.5">
              {project.challenges.map((challenge, index) => (
                <div 
                  key={index} 
                  className="flex gap-3 items-start bg-white/[0.01] border border-white/10 rounded-2xl p-4 text-xs leading-relaxed text-white/70 hover:border-white/20 transition-all"
                >
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 leading-none mt-0.5">
                    0{index + 1}
                  </span>
                  <span className="font-light">{challenge}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Impact or Outcome Section */}
        {project.impact && (
          <div className="relative overflow-hidden bg-gradient-to-r from-[#005639]/10 to-transparent border border-[#005639]/30 rounded-2xl p-5 space-y-2.5 shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00a36c]/5 blur-2xl rounded-full pointer-events-none"></div>
            <h3 className="text-xs font-mono font-bold text-white/50 flex items-center gap-1.5 uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#00a36c]" />
              Strategic Outcome & Impact
            </h3>
            <p className="text-xs leading-relaxed text-emerald-100/80 font-light pr-4">
              {project.impact}
            </p>
          </div>
        )}

        {/* Tags Block */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="text-[9px] font-mono text-brand-green-light bg-[#005639]/30 border border-brand-green-light/20 px-2.5 py-0.8 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Bottom actions links */}
        <div className="flex items-center gap-4 border-t border-white/10 pt-6 flex-wrap">
          <a
            href={project.demoUrl || '#'}
            className="bg-[#005639] hover:bg-[#00704a] text-white keep-text-white px-5 py-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
          >
            Launch Live Portal
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href={project.githubUrl || '#'}
            className="bg-white/[0.02] hover:bg-white/[0.05] text-white border border-white/10 px-5 py-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
          >
            Review Audit Source
            <Github className="w-3.5 h-3.5 text-white/40" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
