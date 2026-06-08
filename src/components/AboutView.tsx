import { useState } from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  MapPin, 
  Mail, 
  Award,
  Cpu,
  Lock,
  Database,
  Code2,
  BarChart4,
  FileDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { handleDownloadResume } from '../utils';

interface Skill {
  name: string;
  level: number;
  iconName: 'lock' | 'shield' | 'terminal' | 'code' | 'database' | 'cpu' | 'chart';
  description: string;
  practicalUse: string;
}

interface AuxiliaryTool {
  name: string;
  detail: string;
  status: string;
}

const CYBER_SKILLS: Skill[] = [
  {
    name: 'Network Security & Hardening',
    level: 92,
    iconName: 'lock',
    description: 'Isolation protocols, security partition planning, and VLAN border rule definition.',
    practicalUse: 'Configured secure clinical VLANs, isolated hemodialysis networks, and hardened firewalls at YNH to prevent unauthorized lateral traversal.'
  },
  {
    name: 'Threat & Vulnerability Analysis',
    level: 88,
    iconName: 'shield',
    description: 'Dynamic host vulnerability scanning, risk profiling, policy-conformance reports, and security modeling audits.',
    practicalUse: 'Executed extensive scanning sweeps and credential hardening audits in lockstep with the Saudi National Cybersecurity Authority (NCA ECC) guidelines.'
  },
  {
    name: 'Incident Response & SecOps',
    level: 85,
    iconName: 'terminal',
    description: 'Telemetry monitoring streams, immediate machine quarantine, signature rulesets construction, and threat containment.',
    practicalUse: 'Configured immediate security quarantine procedures and constructed Snort intrusion detection profiles to isolate anomalies in medical-critical servers.'
  }
];

const DATA_SKILLS: Skill[] = [
  {
    name: 'Python Scripting & Analytics',
    level: 90,
    iconName: 'code',
    description: 'Data wrangling pipelines, automated logging scripts, predictive statistical parsing, and regular mathematical model evaluations.',
    practicalUse: 'Scripted automated ETL pipelines that ingest daily admission logs, cleanses null telemetry records, and extracts disease trends.'
  },
  {
    name: 'SQL Server & Database Querying',
    level: 94,
    iconName: 'database',
    description: 'Highly complex queries, indexing structures, read replication configurations, and Common Table Expressions (CTEs).',
    practicalUse: 'Engineered optimized read-only queries with index alignment to prevent SQL server deadlocking bottlenecks on live patient record pipelines.'
  },
  {
    name: 'Machine Learning & Predictive Forecasting',
    level: 83,
    iconName: 'cpu',
    description: 'Time-series predictive models, regression formulations, feature engineering sets, and predictive statistical analytics.',
    practicalUse: 'Developed statistical time-series prediction models (SARIMA) to forecast emergency room admissions and bed vacancies 24 hours in advance.'
  },
  {
    name: 'Data Visualization (Tableau/D3)',
    level: 88,
    iconName: 'chart',
    description: 'Dynamic reporting grids, medical status visualizations, intuitive graphs mapping, and administrative intelligence feeds.',
    practicalUse: 'Created interactive Tableau capacity monitors displayed across administration rooms to reduce patient intake bottlenecks.'
  }
];

const AUXILIARY_STACK: AuxiliaryTool[] = [
  { name: 'Snort IDS', detail: 'Signature logic & VLAN sniff rules', status: 'SecOps Standard' },
  { name: 'pfSense Firewall', detail: 'VLAN boundary routing matrices', status: 'Infrastructure' },
  { name: 'Wireshark PCAPs', detail: 'Deep clinical protocol diagnostic captures', status: 'Deconstructing Threats' },
  { name: 'Nmap & Metasploit', detail: 'System vulnerability testing audits', status: 'SecOps Audit' },
  { name: 'Pandas & NumPy', detail: 'Medical telemetry pipeline processing', status: 'Data Science' },
  { name: 'Apache Airflow', detail: 'ETL orchestration pipelines scheduling', status: 'Orchestration' },
  { name: 'HL7 & DICOM Standard', detail: 'EHR records electronic transit standards', status: 'Health Compliant' },
  { name: 'Docker Virtual Setup', detail: 'Threat quarantine sandbox hypervisors', status: 'Deployment' },
  { name: 'Git & Versioning', detail: 'Secure version tracking operations', status: 'Vetted Code' }
];

interface AboutViewProps {
  isSaudiGreenMode?: boolean;
}

export default function AboutView({ isSaudiGreenMode = true }: AboutViewProps) {
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<'cyber' | 'data'>('cyber');
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(CYBER_SKILLS[0]);
  const [hoveredTool, setHoveredTool] = useState<AuxiliaryTool | null>(null);

  const activeSkills = selectedSkillCategory === 'cyber' ? CYBER_SKILLS : DATA_SKILLS;

  const renderSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'lock': return <Lock className="w-4 h-4 text-[#00a36c]" />;
      case 'shield': return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'terminal': return <Terminal className="w-4 h-4 text-teal-400" />;
      case 'code': return <Code2 className="w-4 h-4 text-emerald-400" />;
      case 'database': return <Database className="w-4 h-4 text-teal-400" />;
      case 'cpu': return <Cpu className="w-4 h-4 text-[#00a36c]" />;
      case 'chart': return <BarChart4 className="w-4 h-4 text-indigo-400" />;
      default: return <Terminal className="w-4 h-4" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-16 pb-16"
    >
      {/* 1. TITLE AND HEADER */}
      <div className="pt-6 text-center space-y-4">
        <span className="text-xs font-mono font-semibold text-[#00a36c] tracking-widest uppercase">The Analyst Path</span>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl font-serif text-white tracking-tight"
        >
          About Mubin
        </motion.h1>
        <p className="text-sm text-white/50 max-w-md mx-auto">
          Securing patient futures, cleaning medical databases, and scripting defenses at Yanbu National Hospital.
        </p>
        
        {/* Playful and Premium Download Resume (CV) button inside About section */}
        <div className="flex justify-center pt-2">
          <button
            id="download-resume-about"
            tabIndex={0}
            onClick={handleDownloadResume}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleDownloadResume(); } }}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-[#00a36c]/30 text-xs font-mono text-emerald-300 hover:text-white bg-[#005639]/15 hover:bg-[#005639]/30 transition-all duration-300 relative overflow-hidden shadow-lg shadow-emerald-950/20 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
          >
            {/* Soft inner green light leak */}
            <span className="absolute inset-0 bg-gradient-to-tr from-[#005639]/30 to-[#00a36c]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></span>
            
            {/* Fine left-stretching accent line */}
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3 bg-[#00a36c] opacity-60 group-hover:h-full transition-all duration-300"></span>

            <FileDown className="w-4 h-4 text-[#00a36c] group-hover:scale-125 transition-transform duration-300 relative z-10" />
            <span className="relative z-10 font-semibold uppercase tracking-wider">Download Resume (CV)</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 py-1 opacity-20">
          <div className="h-px bg-white w-20"></div>
          <span className="text-xs">✦</span>
          <div className="h-px bg-white w-20"></div>
        </div>
      </div>



      {/* 2.5 INTERACTIVE SKILLS SECTION */}
      <section className="space-y-8 bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle decorative glow in the corner */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#005639]/10 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono tracking-widest text-[#00a36c] font-bold">Capacitance Radii</span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-2xl font-serif text-white tracking-tight"
            >
              Technical Proficiency & SecOps Capabilities
            </motion.h2>
            <p className="text-xs text-white/40">Select a category or hover over skills for hospital analytics deployment briefings.</p>
          </div>
          
          {/* Category Toggle Tabs - FORCED WHITE TEXT ON ACTIVE BUTTONS */}
          <div className="flex bg-black p-1 rounded-xl border border-white/10 self-start md:self-auto select-none">
            <button 
              tabIndex={0}
              onClick={() => {
                setSelectedSkillCategory('cyber');
                setHoveredSkill(CYBER_SKILLS[0]);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedSkillCategory('cyber');
                  setHoveredSkill(CYBER_SKILLS[0]);
                }
              }}
              className={`px-4 py-2 text-xs font-mono rounded-lg transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
                selectedSkillCategory === 'cyber' 
                  ? 'bg-[#005639] border border-[#005639] !text-white font-medium shadow-md' 
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Cybersecurity
            </button>
            <button 
              tabIndex={0}
              onClick={() => {
                setSelectedSkillCategory('data');
                setHoveredSkill(DATA_SKILLS[0]);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedSkillCategory('data');
                  setHoveredSkill(DATA_SKILLS[0]);
                }
              }}
              className={`px-4 py-2 text-xs font-mono rounded-lg transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
                selectedSkillCategory === 'data' 
                  ? 'bg-[#005639] border border-[#005639] !text-white font-medium shadow-md' 
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Data Intelligence
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Active Skill List with Animated Progress Bars (7 columns) */}
          <div className="md:col-span-7 space-y-4 flex flex-col justify-center">
            {activeSkills.map((skill) => (
              <div 
                key={skill.name} 
                tabIndex={0}
                onMouseEnter={() => setHoveredSkill(skill)}
                onFocus={() => setHoveredSkill(skill)}
                onClick={() => setHoveredSkill(skill)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setHoveredSkill(skill); } }}
                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
                  hoveredSkill?.name === skill.name 
                    ? 'bg-[#005639]/10 border-[#00a36c]/40 shadow-lg' 
                    : 'bg-black/20 border-white/5 hover:border-white/10 hover:bg-black/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-black/40 rounded-lg text-[#00a36c]">
                      {renderSkillIcon(skill.iconName)}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-white tracking-tight">{skill.name}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#00a36c]">{skill.level}%</span>
                </div>

                {/* Progressive Meter */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#005639] to-[#00a36c] rounded-full"
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Diagnostic Feed Terminal (5 columns) */}
          <div className="md:col-span-5 h-full">
            <div className="bg-black border border-white/10 rounded-2xl p-5 flex flex-col justify-between min-h-[294px] h-full relative overflow-hidden shadow-inner">
              {/* Scanline overlay effect mimicking real SecOps dashboard */}
              <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none"></div>
              
              <div className="space-y-4 relative z-10 flex-grow">
                <div className="flex items-center justify-between text-[10px] font-mono text-white/30 border-b border-white/5 pb-2">
                  <span>YNH_ANALYST_DECRIC_DEVMAP</span>
                  <span>STATUS: SECURE</span>
                </div>

                <AnimatePresence mode="wait">
                  {hoveredSkill ? (
                    <motion.div 
                      key={hoveredSkill.name}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 text-[10px] font-mono">NODE IDENT:</span>
                        <span className="text-[10px] font-mono uppercase bg-[#005639]/30 text-brand-green-light px-2 py-0.5 rounded border border-brand-green-light/25">
                          {hoveredSkill.name}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono text-[#00a36c] uppercase">Operational Target:</div>
                        <p className="text-[11px] text-white/70 leading-relaxed font-sans font-light">
                          {hoveredSkill.description}
                        </p>
                      </div>

                      <div className="space-y-1 pt-1">
                        <div className="text-[10px] font-mono text-[#00a36c] uppercase">Hospital Duty Case:</div>
                        <p className="text-[11px] text-emerald-100/90 leading-relaxed font-sans font-light bg-[#005639]/15 p-3 rounded-xl border border-[#005639]/20">
                          {hoveredSkill.practicalUse}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="fallback"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-8 text-center space-y-2"
                    >
                      <Terminal className="w-8 h-8 text-[#00a36c]/40 mx-auto animate-pulse" />
                      <p className="text-[#00a36c]/40 text-xs font-mono">
                        Awaiting telemetry focus. Hover/tap any key capability node to output diagnostic deployment metrics.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-4 border-t border-white/5 mt-4 text-[9px] font-mono text-white/20 flex justify-between items-center z-10">
                <span>© MOH SecOps level-1 vetting</span>
                <span className="w-2 h-2 rounded-full bg-[#00a36c] animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>

        {/* 2.6 ADVANCED AUXILIARY TOOL CLOUD - REMOVED overflow-hidden TO PREVENT HOVER TIP CLIPPING */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="space-y-1">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#00a36c] font-bold">Auxiliary Stack & Standards</h3>
            <p className="text-xs text-white/40">Hover over auxiliary modules to view role specification details.</p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {AUXILIARY_STACK.map(tool => (
              <div 
                key={tool.name}
                className="group relative"
                onMouseEnter={() => setHoveredTool(tool)}
                onMouseLeave={() => setHoveredTool(null)}
              >
                <span className="inline-block text-xs font-mono px-3 py-1.5 bg-black/40 text-white/60 border border-white/10 hover:border-[#00a36c]/40 hover:text-white rounded-xl transition-all duration-300">
                  {tool.name}
                </span>

                {/* Micro Hover detail flag */}
                {hoveredTool?.name === tool.name && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-black border border-[#00a36c]/30 rounded-lg p-2.5 text-center text-[10px] font-mono shadow-2xl z-20 pointer-events-none">
                    <span className="text-[10px] text-white block mb-1 font-sans leading-tight">{tool.detail}</span>
                    <span className="text-[8px] uppercase tracking-widest bg-[#005639]/50 text-brand-green-light px-1.5 py-0.2 rounded border border-[#005639]/25">{tool.status}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROFESSIONAL PERSPECTIVE BIO PARAGRAPHS */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
        {/* Left column info */}
        <div className="md:col-span-4 space-y-4 font-mono text-xs text-white/40">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#00a36c]" />
            <span>Yanbu, Saudi Arabia</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#00a36c]" />
            <span>mubinroshanksa@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00a36c]" />
            <span>SecOps Level Certifications</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#00a36c]" />
            <span>Ministry of Health (MOH)</span>
          </div>
        </div>

        {/* Right column detailed bio */}
        <div className="md:col-span-8 space-y-6 text-sm text-white/65 leading-relaxed font-light">
          <p>
            I am a double-disciplined <strong className="text-white font-semibold">Cybersecurity Analyst</strong> and <strong className="text-white font-semibold">Healthcare Data Analyst</strong> currently operating in the central health sector at <strong className="text-[#00a36c] font-semibold">Yanbu National Hospital</strong>, Saudi Arabia. My day-to-day focuses on defending valuable Electronic Health Records (EMR) and analyzing patient intake telemetry pipelines.
          </p>
          <p>
            I believe that hospital security is a crucial patient safety standard. Healthcare servers store highly confidential user transactions and labs telemetry. In an landscape of increasingly sophisticated threat vector campaigns, maintaining rigorous, zero-trust endpoint logging is no longer optional—it is a baseline compliance.
          </p>
          <p>
            On the data side, I transform complex data sheets and patient intake log arrays into responsive executive Tableau monitors and optimized query tables. This work helps hospital medical directors identify busy bed periods, predict supply bottle-necks, and optimize emergency shifts with predictive analytics.
          </p>
          <p>
            When I am not writing security configurations, audit lines, or cleaning database queues, I dedicate my hours to writing technical guides detailing clinical hardware vulnerabilities and threat reports on Substack.
          </p>
        </div>
      </section>



    </motion.div>
  );
}
