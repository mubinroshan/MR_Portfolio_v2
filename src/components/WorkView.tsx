import { useState, useEffect } from 'react';
import { Project } from '../types';
import { PROJECTS_DATA } from '../data';
import { 
  Terminal, 
  ShieldCheck, 
  Database, 
  Layers, 
  ArrowUpRight, 
  Code2, 
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle,
  Clock,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import GithubStats from './GithubStats';

const WorkSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
      {[1, 2, 3].map((num) => (
        <div 
          key={num}
          className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 h-[400px] flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-3 w-16 bg-white/10 rounded"></div>
              <div className="h-3 w-10 bg-white/10 rounded"></div>
            </div>
            
            {/* Image mock */}
            <div className="w-full h-36 rounded-2xl bg-white/5 border border-white/10"></div>
            
            {/* Title */}
            <div className="h-5 w-2/3 bg-white/20 rounded mt-2"></div>
            
            {/* Description lines */}
            <div className="space-y-2">
              <div className="h-3.5 w-full bg-white/5 rounded"></div>
              <div className="h-3.5 w-4/5 bg-white/5 rounded"></div>
            </div>
          </div>

          <div className="flex gap-1.5 pt-3">
            <div className="h-4 w-12 bg-white/10 rounded"></div>
            <div className="h-4 w-12 bg-white/10 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface WorkViewProps {
  setSelectedProject: (proj: Project | null) => void;
  isSaudiGreenMode?: boolean;
}

export default function WorkView({ setSelectedProject, isSaudiGreenMode = true }: WorkViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'cyber' | 'analytics'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);
  
  // Interactive Simulator State
  const [simulationNodes, setSimulationNodes] = useState([
    { id: 'ED-PORTAL', name: 'Emergency Admissions Portal', status: 'secure', ip: '192.168.4.11', type: 'web' },
    { id: 'ICU-VENT', name: 'ICU Ventilator Endpoint', status: 'secure', ip: '192.168.10.82', type: 'iot' },
    { id: 'YNH-EMR', name: 'Central Electronic Health Records', status: 'secure', ip: '10.0.12.50', type: 'database' },
    { id: 'LAB-LIS', name: 'Lab Information Server', status: 'vulnerable', ip: '192.168.4.240', type: 'server' },
    { id: 'PHARM-MD', name: 'Pharmacy Med-Dispenser', status: 'secure', ip: '192.168.10.15', type: 'iot' }
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLog, setSimLog] = useState<string[]>(['[SYS] Yanbu Hospital SecOps Terminal active.', '[SYS] Diagnostic loop standing by...']);

  const filteredProjects = PROJECTS_DATA.filter(proj => {
    if (activeTab === 'all') return true;
    if (activeTab === 'cyber') return proj.tags.includes('Cybersecurity');
    if (activeTab === 'analytics') return proj.tags.includes('Data Analysis');
    return true;
  });

  const triggerDiagnosticPenTest = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimLog(prev => [...prev, '[PENTEST] Initiating credential audits and port scans...']);

    // Stage 1
    setTimeout(() => {
      setSimLog(prev => [...prev, '[PENTEST] Port scanning 192.168.4.x VLAN completed. Found open LIS port 3389.']);
      setSimulationNodes(nodes => nodes.map(n => n.id === 'LAB-LIS' ? { ...n, status: 'breached' } : n));
    }, 1200);

    // Stage 2
    setTimeout(() => {
      setSimLog(prev => [...prev, '[ALERT] Lateral movement signature picked up from 192.168.4.240!']);
      setSimulationNodes(nodes => nodes.map(n => n.id === 'YNH-EMR' ? { ...n, status: 'vulnerable' } : n));
    }, 2400);

    // Stage 3 - Clean up
    setTimeout(() => {
      setSimLog(prev => [...prev, '[REMEDIATION] Sentinel EHR Guard intercept. Revoking compromised lab tokens. Host isolated.', '[SYS] Network status: 100% Secure. All clinical firewalls locked.']);
      setSimulationNodes(nodes => nodes.map(n => {
        return { ...n, status: 'secure' };
      }));
      setIsSimulating(false);
    }, 4200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-16 pb-16"
    >
      {/* Visual Header */}
      <div className="pt-6 text-center space-y-3">
        <span className="text-xs font-mono font-semibold text-[#00a36c] tracking-widest uppercase">Portfolio Works</span>
        <motion.h1 
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-serif text-white tracking-tight"
        >
          Clinical Engineering
        </motion.h1>
        <p className="text-sm text-white/50 max-w-lg mx-auto">
          Deep-dive into clinical infrastructure project archives, cyber dashboards, and hospital diagnostic tooling.
        </p>
      </div>

      {/* FILTER TABS */}
      <div className="flex justify-center gap-3.5 pb-4">
        <button 
          id="work-filter-all"
          onClick={() => setActiveTab('all')} 
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold font-mono border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
            activeTab === 'all' 
              ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-500/10 keep-teal-active' 
              : 'bg-transparent border-transparent text-gray-300 hover:bg-teal-600/10 hover:border-teal-500/10 hover:text-white'
          }`}
        >
          All Projects
        </button>
        <button 
          id="work-filter-cyber"
          onClick={() => setActiveTab('cyber')} 
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold font-mono border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
            activeTab === 'cyber' 
              ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-500/10 keep-teal-active' 
              : 'bg-transparent border-transparent text-gray-300 hover:bg-teal-600/10 hover:border-teal-500/10 hover:text-white'
          }`}
        >
          Cybersecurity
        </button>
        <button 
          id="work-filter-analytics"
          onClick={() => setActiveTab('analytics')} 
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold font-mono border transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
            activeTab === 'analytics' 
              ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-500/10 keep-teal-active' 
              : 'bg-transparent border-transparent text-gray-300 hover:bg-teal-600/10 hover:border-teal-500/10 hover:text-white'
          }`}
        >
          Data Intelligence
        </button>
      </div>

      {/* 1. SEAMLESS INTERACTIVE WORK CARDS */}
      {isLoading ? (
        <WorkSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover="hover"
              variants={{
                hover: {
                  y: -6,
                  scale: 1.018,
                  borderColor: 'rgba(0, 163, 108, 0.4)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  transition: { type: 'spring', stiffness: 300, damping: 18 }
                }
              }}
              tabIndex={0}
              onClick={() => setSelectedProject(proj)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(proj); } }}
              className="group cursor-pointer bg-white/[0.03] border border-white/10 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between h-[400px] relative overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold group-hover:text-teal-400 transition-colors">
                    {proj.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-white/[0.02] border border-white/10 rounded-full text-white/40 group-hover:border-[#00a36c]/35 group-hover:text-white transition-all">
                      {proj.year}
                    </span>
                    <motion.div
                      variants={{
                        hover: { x: 2, y: -2, scale: 1.15 }
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="text-white/30 group-hover:text-[#00a36c] transition-colors"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </motion.div>
                  </div>
                </div>

                {/* Large beautifully styled icon tile */}
                <div className="w-full h-36 rounded-2xl overflow-hidden bg-black p-1.5 border border-white/10 group-hover:border-[#00a36c]/25 transition-colors flex items-center justify-center relative">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover rounded-xl group-hover:scale-[1.04] transition-transform duration-500 will-change-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                <h2 className="text-lg font-serif text-white group-hover:text-[#00a36c] transition-colors mt-2">
                  {proj.title}
                </h2>

                <p className="text-xs text-white/50 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              {/* Ambient radial accent flare at the bottom right corner */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#00a36c]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="flex flex-wrap gap-1.5 pt-3 relative z-10">
                {proj.tags.slice(0, 3).map(tag => (
                  <span 
                    key={tag} 
                    className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.01] text-white/40 border border-white/10 group-hover:border-[#00a36c]/20 group-hover:text-teal-400 group-hover:bg-[#00a36c]/5 transition-all duration-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* GitHub telemetry stats and contribution heatmap */}
      <GithubStats isSaudiGreenMode={isSaudiGreenMode} />

      {/* 2. DYNAMICAL CLINICAL NETWORK SECURITY RADAR (Interactive Demo Widget) */}
      <section className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono bg-[#005639]/30 text-[#00a36c] px-2.5 py-0.5 rounded-full border border-brand-green-light/20">
              Interactive SecOps Simulator
            </span>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-xl font-serif text-white"
            >
              YNH Host Topology Auditing
            </motion.h3>
            <p className="text-xs text-white/40">
              Interactive simulated representation of medical terminals live on Yanbu National Hospital servers.
            </p>
          </div>

          <button
            id="btn-simulate"
            onClick={triggerDiagnosticPenTest}
            disabled={isSimulating}
            className={`font-mono text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
              isSimulating 
                ? 'bg-brand-green-light/5 border border-brand-green-light/20 text-[#00a36c] cursor-not-allowed'
                : 'bg-[#005639] hover:bg-[#00704a] text-white !text-white border border-[#005639] hover:scale-105 shadow-md shadow-[#005639]/10 active:scale-95 font-semibold'
            }`}
          >
            {isSimulating ? <RotateCcw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            {isSimulating ? 'Active Intrusion Scanning...' : 'Simulate Penetration Scan'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Active Terminal Topology Node Map */}
          <div className="space-y-4">
            <span className="text-xs font-mono text-gray-500">Live Endpoint Network</span>
            <div className="space-y-2">
              {simulationNodes.map(node => {
                const cardBg = isSaudiGreenMode 
                  ? 'bg-black/30 border-white/[0.02]' 
                  : 'bg-[#0d6b63] border-teal-700/50 shadow-sm';
                const textColor = 'text-white !text-white';
                const secondaryTextColor = isSaudiGreenMode ? 'text-gray-500' : 'text-teal-100/80';
                
                const iconBg = node.status === 'secure' 
                  ? (isSaudiGreenMode ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/10' : 'bg-emerald-800/40 text-white border border-emerald-400/30')
                  : node.status === 'vulnerable'
                  ? (isSaudiGreenMode ? 'bg-amber-950/40 text-amber-500 border border-amber-500/10' : 'bg-amber-800/40 text-white border border-amber-400/30')
                  : (isSaudiGreenMode ? 'bg-rose-950/40 text-rose-400 border border-rose-500/10 animate-pulse' : 'bg-rose-800/40 text-white border border-rose-400/30 animate-pulse');

                const statusBg = node.status === 'secure'
                  ? (isSaudiGreenMode ? 'bg-emerald-950/20 text-emerald-400 border-emerald-500/10' : 'bg-emerald-900/40 text-white border-emerald-400/20')
                  : node.status === 'vulnerable'
                  ? (isSaudiGreenMode ? 'bg-amber-950/20 text-amber-500 border-amber-500/10' : 'bg-amber-900/40 text-white border-amber-400/20')
                  : (isSaudiGreenMode ? 'bg-red-950/20 text-red-400 border-red-500/10 animate-pulse' : 'bg-red-900/40 text-white border-red-400/20 animate-pulse');

                return (
                  <div 
                    key={node.id} 
                    className={`${cardBg} border rounded-xl p-4 flex items-center justify-between transition-all`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${iconBg} keep-text-white`}>
                        {node.type === 'database' ? <Database className="w-4 h-4" /> : node.type === 'iot' ? <Layers className="w-4 h-4" /> : <Terminal className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className={`text-xs font-semibold ${textColor}`}>{node.name}</div>
                        <div className={`text-[10px] ${secondaryTextColor} font-mono flex items-center gap-1`}>
                          <span>{node.ip}</span> | <span className="uppercase text-[9px]">{node.type}</span>
                        </div>
                      </div>
                    </div>

                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${statusBg}`}>
                      {node.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-Time SecOps Diagnostics Terminal Output */}
          <div className="space-y-4">
            <span className="text-xs font-mono text-gray-500">SecOps Terminal Stream</span>
            <div className="bg-black border border-white/5 rounded-2xl p-4 font-mono h-[264px] flex flex-col justify-between overflow-hidden">
              <div className="space-y-2 overflow-y-auto max-h-[190px] pr-2 scrollbar-thin text-[10px] text-gray-400">
                {simLog.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    <span className="text-emerald-500 select-none mr-1">mubin_roshan@ynh-ops$</span>
                    <span className={
                      log.includes('[ALERT]') ? 'text-red-400 font-semibold animate-pulse' :
                      log.includes('[PENTEST]') ? 'text-amber-300' :
                      log.includes('[REMEDIATION]') ? 'text-teal-400 font-medium' : 'text-gray-400'
                    }>{log}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/5 pt-2 flex items-center justify-between text-[9px] text-gray-600">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  SecOps Gateway Connected
                </span>
                <span>Active Core Nodes: 5/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
