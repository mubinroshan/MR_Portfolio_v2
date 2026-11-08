import { useState, useEffect } from 'react';
import { Project, ProjectGallerySlot } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Ticket,
  Layers,
  GitBranch,
  Clock,
  BookOpen,
  BarChart3,
  Database,
  Activity,
  Bell,
  ArrowLeftRight,
  FileSpreadsheet,
  ShieldCheck,
  Lock,
  CheckCircle2,
  X,
  ZoomIn,
  Monitor,
  Printer,
  Server,
  ScanLine,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectDetailPageProps {
  project: Project;
  allProjects: Project[];
  onBackToWorks: () => void;
  onSelectProject: (slug: string) => void;
  onContactClick: () => void;
  isSaudiGreenMode?: boolean;
}

interface SampleDevice {
  id: string;
  type: 'workstation' | 'printer' | 'switch' | 'scanner';
  ward: string;
  status: 'Online' | 'Idle' | 'Offline';
  lastSeen: string;
}

const INITIAL_SAMPLE_DEVICES: SampleDevice[] = [
  { id: 'PC-001', type: 'workstation', ward: 'Outpatient Clinic A', status: 'Online', lastSeen: 'Just now' },
  { id: 'Printer-002', type: 'printer', ward: 'Pharmacy Counter', status: 'Online', lastSeen: '12s ago' },
  { id: 'Switch-003', type: 'switch', ward: 'Distribution Closet B', status: 'Online', lastSeen: '4s ago' },
  { id: 'Scanner-004', type: 'scanner', ward: 'Central Supply Desk', status: 'Idle', lastSeen: '2m ago' },
  { id: 'PC-005', type: 'workstation', ward: 'Radiology Reception', status: 'Offline', lastSeen: '14m ago' }
];

function renderFeatureIcon(iconName: string) {
  switch (iconName) {
    case 'Ticket':
      return <Ticket className="w-5 h-5 text-[#00a36c]" />;
    case 'Layers':
      return <Layers className="w-5 h-5 text-[#00a36c]" />;
    case 'GitBranch':
      return <GitBranch className="w-5 h-5 text-[#00a36c]" />;
    case 'Clock':
      return <Clock className="w-5 h-5 text-[#00a36c]" />;
    case 'BookOpen':
      return <BookOpen className="w-5 h-5 text-[#00a36c]" />;
    case 'BarChart3':
      return <BarChart3 className="w-5 h-5 text-[#00a36c]" />;
    case 'Database':
      return <Database className="w-5 h-5 text-[#00a36c]" />;
    case 'Activity':
      return <Activity className="w-5 h-5 text-[#00a36c]" />;
    case 'Bell':
      return <Bell className="w-5 h-5 text-[#00a36c]" />;
    case 'ArrowLeftRight':
      return <ArrowLeftRight className="w-5 h-5 text-[#00a36c]" />;
    case 'FileSpreadsheet':
      return <FileSpreadsheet className="w-5 h-5 text-[#00a36c]" />;
    case 'Lock':
      return <Lock className="w-5 h-5 text-[#00a36c]" />;
    case 'ShieldCheck':
    default:
      return <ShieldCheck className="w-5 h-5 text-[#00a36c]" />;
  }
}

interface BlankImageSlotProps {
  dataSlot: string;
  imageSrc?: string;
  alt: string;
  aspectClass?: string;
  eager?: boolean;
  label?: string;
}

function BlankImageSlot({
  dataSlot,
  imageSrc,
  alt,
  aspectClass = 'aspect-video',
  eager = false,
  label
}: BlankImageSlotProps) {
  // TODO: Replace blank image slot with redacted WEBP screenshot (hero < 200 KB, gallery/section < 150 KB; hide IPs, names, and patient data)
  const hasImage = Boolean(imageSrc && imageSrc.trim().length > 0);

  return (
    <div
      data-slot={dataSlot}
      className={`w-full ${aspectClass} rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] relative flex items-center justify-center`}
    >
      {hasImage ? (
        <img
          src={imageSrc}
          alt={alt}
          width={1280}
          height={720}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="w-full h-full flex flex-col items-center justify-center p-6 select-none bg-gradient-to-br from-[#005639]/10 via-transparent to-[#00a36c]/5"
        >
          {label ? (
            <span className="text-xs font-mono text-white/30 uppercase tracking-widest text-center">
              {label}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}

function YamsLiveStatusDemo({ isSaudiGreenMode }: { isSaudiGreenMode: boolean }) {
  const [devices, setDevices] = useState<SampleDevice[]>(INITIAL_SAMPLE_DEVICES);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const checkPauseState = () => {
      setIsPaused(document.hidden || mediaQuery.matches);
    };

    checkPauseState();
    document.addEventListener('visibilitychange', checkPauseState);
    mediaQuery.addEventListener('change', checkPauseState);

    return () => {
      document.removeEventListener('visibilitychange', checkPauseState);
      mediaQuery.removeEventListener('change', checkPauseState);
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const statuses: SampleDevice['status'][] = ['Online', 'Online', 'Idle', 'Offline'];
    const interval = window.setInterval(() => {
      if (document.hidden) return;
      setDevices((prev) => {
        const next = [...prev];
        const randomIndex = Math.floor(Math.random() * next.length);
        const current = next[randomIndex];
        const nextStatus = statuses[(statuses.indexOf(current.status) + 1) % statuses.length];
        next[randomIndex] = {
          ...current,
          status: nextStatus,
          lastSeen: nextStatus === 'Online' ? 'Just now' : nextStatus === 'Idle' ? '1m ago' : '5m ago'
        };
        return next;
      });
    }, 3500);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const onlineCount = devices.filter((d) => d.status === 'Online').length;
  const idleCount = devices.filter((d) => d.status === 'Idle').length;
  const offlineCount = devices.filter((d) => d.status === 'Offline').length;

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <span className="text-xs font-mono font-semibold text-[#00a36c] uppercase tracking-widest">
            Interactive Telemetry Preview
          </span>
          <h3 className="text-xl font-serif text-white">
            Simulated Endpoint Status Monitor
          </h3>
          <p className="text-xs font-mono text-white/50">
            Demo with sample data. Not connected to any real system.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs tabular-nums">
          <span className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-white">
            Online: <strong>{onlineCount}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-white">
            Idle: <strong>{idleCount}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-white">
            Offline: <strong>{offlineCount}</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {devices.map((device) => {
          const statusClasses =
            device.status === 'Online'
              ? 'text-[#00a36c] border-[#00a36c]/30 bg-[#005639]/15'
              : device.status === 'Idle'
              ? 'text-amber-400 border-amber-500/30 bg-amber-950/20'
              : 'text-rose-400 border-rose-500/30 bg-rose-950/20';

          return (
            <div
              key={device.id}
              className={`rounded-2xl p-4 border transition-colors flex flex-col justify-between gap-3 ${
                isSaudiGreenMode
                  ? 'bg-black/30 border-white/10'
                  : 'bg-white/[0.03] border-white/10'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {device.type === 'workstation' && <Monitor className="w-4 h-4 text-[#00a36c]" />}
                  {device.type === 'printer' && <Printer className="w-4 h-4 text-[#00a36c]" />}
                  {device.type === 'switch' && <Server className="w-4 h-4 text-[#00a36c]" />}
                  {device.type === 'scanner' && <ScanLine className="w-4 h-4 text-[#00a36c]" />}
                  <span className="font-mono text-xs font-bold text-white">{device.id}</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${statusClasses}`}>
                  {device.status}
                </span>
              </div>

              <div className="space-y-0.5">
                <div className="text-xs text-white/70 font-medium">{device.ward}</div>
                <div className="text-[10px] font-mono text-white/40 tabular-nums">
                  Heartbeat: {device.lastSeen}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProjectDetailPage({
  project,
  allProjects,
  onBackToWorks,
  onSelectProject,
  onContactClick,
  isSaudiGreenMode = false
}: ProjectDetailPageProps) {
  const [activeLightboxSlot, setActiveLightboxSlot] = useState<ProjectGallerySlot | null>(null);

  // Scroll to top when opening or switching a project page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [project.slug]);

  // Dynamic per-page Title, Meta Description, and Open Graph tags
  useEffect(() => {
    const previousTitle = document.title;
    const pageTitle = `${project.title} | Mubin Roshan — Clinical Engineering Case Study`;
    const pageDescription = project.tagline || project.description;

    document.title = pageTitle;

    const setMetaTag = (selector: string, attrName: 'name' | 'property', attrValue: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaTag('meta[name="description"]', 'name', 'description', pageDescription);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', pageTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', pageDescription);

    return () => {
      document.title = previousTitle;
    };
  }, [project]);

  // Lightbox Esc key handler
  useEffect(() => {
    if (!activeLightboxSlot) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxSlot(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxSlot]);

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const gallerySlots: ProjectGallerySlot[] =
    project.gallery && project.gallery.length === 6
      ? project.gallery
      : Array.from({ length: 6 }, (_, i) => ({
          alt: `${project.title} screenshot slot ${i + 1}`,
          caption: `System View ${i + 1} (Redacted screenshot slot)`
        }));

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-16 md:space-y-24 pb-20 pt-4"
    >
      {/* 1. BACK LINK */}
      <div>
        <button
          type="button"
          onClick={onBackToWorks}
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 hover:border-[#00a36c]/40 text-xs font-mono text-white hover:text-[#00a36c] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#00a36c]" />
          <span>Back to Portfolio Works</span>
        </button>
      </div>

      {/* 2. HERO SECTION */}
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6 space-y-5">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[#00a36c] font-semibold">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            {project.featured && (
              <>
                <span aria-hidden="true">·</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#005639]/30 text-[#00a36c] border border-[#00a36c]/30 text-[10px]">
                  Featured
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-white/60 leading-relaxed font-light">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1 rounded-xl bg-white/[0.03] border border-white/10 text-white/70"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hero 16:9 Blank Image Slot */}
        <div className="lg:col-span-6">
          {/* TODO: Set project.heroImage in src/data.ts with a redacted 16:9 WEBP screenshot (< 200 KB) */}
          <BlankImageSlot
            dataSlot="project-hero"
            imageSrc={project.heroImage}
            alt={`${project.title} hero overview`}
            aspectClass="aspect-video"
            eager={true}
          />
        </div>
      </header>

      {/* 3. QUICK FACTS STRIP */}
      <section aria-label="Project quick facts" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block">Role</span>
          <span className="text-sm font-semibold text-white block">{project.quickFacts.role}</span>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block">Duration</span>
          <span className="text-sm font-semibold text-white block">{project.quickFacts.duration}</span>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block">Platform</span>
          <span className="text-sm font-semibold text-white block">{project.quickFacts.platform}</span>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block">Status</span>
          <span className="text-sm font-semibold text-[#00a36c] block">{project.quickFacts.status}</span>
        </div>
      </section>

      {/* 4. "BY THE NUMBERS" STRIP */}
      {project.metrics && project.metrics.length > 0 && (
        <section aria-labelledby="by-the-numbers-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 id="by-the-numbers-heading" className="text-xs font-mono uppercase tracking-widest text-[#00a36c] font-bold">
              By the Numbers
            </h2>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${project.metrics.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4`}>
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-between space-y-2"
              >
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#00a36c] tabular-nums">
                  {metric.value}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-white/50">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. STORY SECTIONS */}
      <div className="space-y-20">
        {/* 5A. The Problem (Left text, Right slot on desktop) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00a36c] font-semibold">
              01 · Context & Challenge
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white">The Problem</h2>
            <div className="space-y-4 text-sm sm:text-base text-white/60 leading-relaxed">
              {project.story.problem.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            {/* TODO: Optional problem context image slot (redacted WEBP < 150 KB) */}
            <BlankImageSlot
              dataSlot="project-problem"
              imageSrc={project.story.problemImage}
              alt={`${project.title} problem context`}
              aspectClass="aspect-video"
            />
          </div>
        </section>

        {/* 5B. The Idea (Left slot, Right text on desktop) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            {/* TODO: Optional solution concept image slot (redacted WEBP < 150 KB) */}
            <BlankImageSlot
              dataSlot="project-idea"
              imageSrc={project.story.ideaImage}
              alt={`${project.title} solution concept`}
              aspectClass="aspect-video"
            />
          </div>
          <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00a36c] font-semibold">
              02 · Vision & Approach
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white">The Idea</h2>
            <div className="space-y-4 text-sm sm:text-base text-white/60 leading-relaxed">
              {project.story.idea.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 5C. How I Built It (Vertical Timeline with 3 to 5 milestones) */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00a36c] font-semibold">
              03 · Engineering Execution
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white">How I Built It</h2>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l border-white/15 space-y-8">
            {project.story.buildTimeline.map((milestone, idx) => (
              <div key={idx} className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-6 space-y-2">
                <div
                  aria-hidden="true"
                  className="w-3.5 h-3.5 rounded-full bg-[#00a36c] border-2 border-[#0b0a0c] absolute -left-[31px] sm:-left-[39px] top-7"
                />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-serif font-semibold text-white">
                    {milestone.title}
                  </h3>
                  {milestone.date && (
                    <span className="text-xs font-mono text-[#00a36c] uppercase tracking-wider">
                      {milestone.date}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5D. The System in Action (Feature Cards Grid) */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00a36c] font-semibold">
              04 · Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white">The System in Action</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.story.features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#005639]/20 border border-[#00a36c]/25 flex items-center justify-center">
                    {renderFeatureIcon(feature.icon)}
                  </div>
                  <h3 className="text-base font-serif font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/55 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* TODO: Optional feature screenshot slot (redacted WEBP < 150 KB) */}
                <BlankImageSlot
                  dataSlot={`project-feature-${idx + 1}`}
                  imageSrc={feature.imageSrc}
                  alt={`${feature.title} preview`}
                  aspectClass="aspect-video"
                />
              </div>
            ))}
          </div>

          {/* Optional Simulated Live Status Demo for YAMS */}
          {project.hasLiveStatusDemo && (
            <div className="pt-4">
              <YamsLiveStatusDemo isSaudiGreenMode={isSaudiGreenMode} />
            </div>
          )}
        </section>

        {/* 5E. Architecture (Simple Inline SVG Diagram + Narrative) */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00a36c] font-semibold">
              05 · System Design
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white">Architecture</h2>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="space-y-3 text-sm sm:text-base text-white/60 leading-relaxed">
              {project.story.architectureSummary.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Sanitized Inline SVG Architecture Diagram (No real IPs, hostnames, or network secrets) */}
            <div
              data-slot="project-architecture"
              className="w-full overflow-x-auto py-4"
              aria-label="High-level system architecture diagram"
            >
              <svg
                viewBox="0 0 920 150"
                className="w-full min-w-[680px] h-auto"
                role="img"
                aria-label={`Architecture flow for ${project.title}`}
              >
                <defs>
                  <marker
                    id="arch-arrow"
                    viewBox="0 0 10 10"
                    refX="7"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#00a36c" />
                  </marker>
                </defs>

                {project.story.architectureNodes.slice(0, 4).map((node, idx) => {
                  const x = 15 + idx * 230;
                  return (
                    <g key={idx}>
                      <rect
                        x={x}
                        y={25}
                        width={195}
                        height={100}
                        rx={16}
                        fill="rgba(0, 86, 57, 0.14)"
                        stroke="rgba(0, 163, 108, 0.45)"
                        strokeWidth="1.5"
                      />
                      <text
                        x={x + 97.5}
                        y={66}
                        textAnchor="middle"
                        fill="currentColor"
                        className="text-white font-semibold"
                        fontSize="13"
                      >
                        {node.label}
                      </text>
                      <text
                        x={x + 97.5}
                        y={92}
                        textAnchor="middle"
                        fill="#00a36c"
                        fontSize="11"
                      >
                        {node.sublabel}
                      </text>

                      {idx < project.story.architectureNodes.slice(0, 4).length - 1 && (
                        <line
                          x1={x + 195}
                          y1={75}
                          x2={x + 230}
                          y2={75}
                          stroke="#00a36c"
                          strokeWidth="2"
                          markerEnd="url(#arch-arrow)"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </section>

        {/* 5F. Security and Reliability */}
        <section className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00a36c] font-semibold">
              06 · Defense & Governance
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white">Security and Reliability</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.story.security.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-5 bg-white/[0.02] border border-white/10 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#00a36c] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5G. Impact & 5H. What I Learned and What's Next */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00a36c] font-semibold">
              07 · Operational Outcomes
            </span>
            <h2 className="text-2xl font-serif text-white">Impact</h2>
            <div className="space-y-3 text-sm sm:text-base text-white/60 leading-relaxed">
              {project.story.impactNarrative.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00a36c] font-semibold">
              08 · Retrospective & Roadmap
            </span>
            <h2 className="text-2xl font-serif text-white">What I Learned and What's Next</h2>
            <div className="space-y-3 text-sm sm:text-base text-white/60 leading-relaxed">
              {project.story.learnedAndNext.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 6. TECH STACK CHIPS */}
      {project.technologies && project.technologies.length > 0 && (
        <section aria-labelledby="tech-stack-heading" className="space-y-4">
          <h2 id="tech-stack-heading" className="text-xs font-mono uppercase tracking-widest text-[#00a36c] font-bold">
            Technologies & Tooling
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm font-mono text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 7. GALLERY (6 Blank Image Slots, 3 cols desktop, 2 tablet, 1 mobile + Lightbox) */}
      <section aria-labelledby="gallery-heading" className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00a36c] font-bold">
            Interface Archive
          </span>
          <h2 id="gallery-heading" className="text-2xl sm:text-3xl font-serif text-white">
            System Gallery
          </h2>
          <p className="text-xs text-white/50">
            Click any slot to inspect in full screen. Screenshots are redacted prior to publication to protect hospital privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallerySlots.map((slot, idx) => {
            const hasSrc = Boolean(slot.src && slot.src.trim().length > 0);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveLightboxSlot(slot)}
                aria-label={`Enlarge gallery item ${idx + 1}: ${slot.caption}`}
                className="group text-left bg-white/[0.03] border border-white/10 hover:border-[#00a36c]/40 rounded-3xl p-4 space-y-3 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                {/* TODO: Populate gallery slot in src/data.ts with a redacted WEBP screenshot (< 150 KB) */}
                <div
                  data-slot={`project-gallery-${idx + 1}`}
                  className="w-full aspect-video rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 relative flex items-center justify-center"
                >
                  {hasSrc ? (
                    <img
                      src={slot.src}
                      alt={slot.alt}
                      width={640}
                      height={360}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#005639]/10 via-transparent to-[#00a36c]/5" />
                  )}
                  <div className="absolute bottom-2.5 right-2.5 p-2 rounded-xl bg-black/50 text-white opacity-70 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-[#00a36c]" />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 px-1">
                  <span className="text-xs font-mono text-white/70 group-hover:text-white transition-colors line-clamp-1">
                    {slot.caption}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#00a36c] shrink-0 transition-colors" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 8. NEXT / PREVIOUS PROJECT NAVIGATION + CONTACT ME CTA */}
      <footer className="pt-8 border-t border-white/10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prevProject && (
            <button
              type="button"
              onClick={() => onSelectProject(prevProject.slug)}
              className="group text-left bg-white/[0.03] border border-white/10 hover:border-[#00a36c]/40 rounded-3xl p-6 flex items-center justify-between gap-4 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 flex items-center gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5 text-[#00a36c] transition-transform group-hover:-translate-x-1" />
                  Previous Project
                </span>
                <div className="text-lg font-serif font-semibold text-white group-hover:text-[#00a36c] transition-colors">
                  {prevProject.title}
                </div>
              </div>
            </button>
          )}

          {nextProject && (
            <button
              type="button"
              onClick={() => onSelectProject(nextProject.slug)}
              className="group text-left md:text-right bg-white/[0.03] border border-white/10 hover:border-[#00a36c]/40 rounded-3xl p-6 flex items-center justify-between md:justify-end gap-4 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 flex items-center md:justify-end gap-1.5">
                  Next Project
                  <ArrowRight className="w-3.5 h-3.5 text-[#00a36c] transition-transform group-hover:translate-x-1" />
                </span>
                <div className="text-lg font-serif font-semibold text-white group-hover:text-[#00a36c] transition-colors">
                  {nextProject.title}
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Contact CTA reusing existing contact section */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00a36c] font-bold">
              Interested in Hospital IT & SecOps Architecture?
            </span>
            <h3 className="text-xl font-serif text-white">
              Let's discuss clinical infrastructure or request a walkthrough.
            </h3>
          </div>

          <button
            type="button"
            onClick={onContactClick}
            className="px-6 py-3 rounded-2xl bg-[#005639] hover:bg-[#00704a] text-white keep-text-white font-mono text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            <Mail className="w-4 h-4 keep-text-white" />
            <span className="keep-text-white">Contact me</span>
          </button>
        </div>
      </footer>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeLightboxSlot && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxSlot.caption}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxSlot(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl bg-[#121212] border border-white/15 rounded-3xl p-4 sm:p-6 shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs sm:text-sm font-mono text-white font-medium">
                  {activeLightboxSlot.caption}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveLightboxSlot(null)}
                  aria-label="Close gallery lightbox"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] flex items-center justify-center">
                {activeLightboxSlot.src && activeLightboxSlot.src.trim().length > 0 ? (
                  <img
                    src={activeLightboxSlot.src}
                    alt={activeLightboxSlot.alt}
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="p-8 text-center space-y-2">
                    <div className="text-sm font-serif text-white">
                      {activeLightboxSlot.caption}
                    </div>
                    <p className="text-xs font-mono text-white/50">
                      Blank image slot ready for redacted WEBP screenshot upload (&lt; 150 KB).
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
