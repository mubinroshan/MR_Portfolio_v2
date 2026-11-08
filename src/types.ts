export type TabID = 'home' | 'timeline' | 'work' | 'about' | 'story' | 'contact' | 'quiz';

export type ProjectFilterCategory = 'cyber' | 'analytics' | 'healthcare-it';

export interface ProjectMilestone {
  title: string;
  description: string;
  date?: string;
}

export interface ProjectFeatureCard {
  icon: string;
  title: string;
  description: string;
  imageSrc?: string;
}

export interface ProjectArchitectureNode {
  label: string;
  sublabel: string;
}

export interface ProjectStory {
  problem: string[];
  problemImage?: string;
  idea: string[];
  ideaImage?: string;
  buildTimeline: ProjectMilestone[];
  features: ProjectFeatureCard[];
  architectureSummary: string[];
  architectureNodes: ProjectArchitectureNode[];
  architectureImage?: string;
  security: string[];
  impactNarrative: string[];
  learnedAndNext: string[];
}

export interface ProjectGallerySlot {
  src?: string;
  alt: string;
  caption: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  filterCategories?: ProjectFilterCategory[];
  featured?: boolean;
  tagline: string;
  description: string;
  longDescription?: string;
  year: string;
  image: string;
  heroImage?: string;
  tags: string[];
  badge?: 'WIP' | 'BETA' | 'NEW' | 'RELEASE' | 'PRODUCTION' | 'FEATURED';
  demoUrl?: string;
  githubUrl?: string;
  quickFacts: {
    role: string;
    duration: string;
    platform: string;
    status: string;
  };
  metrics?: { label: string; value: string }[];
  technologies?: string[];
  challenges?: string[];
  impact?: string;
  story: ProjectStory;
  gallery?: ProjectGallerySlot[];
  hasLiveStatusDemo?: boolean;
}

export interface TimelineItem {
  id: string;
  date: string;
  category: 'career' | 'achievement' | 'certification' | 'project';
  tags: string[];
  title: string;
  description: string;
  details?: string[];
  imageUrl?: string;
}

export interface StoryItem {
  id: string;
  date: string;
  category: 'Cybersecurity' | 'Data Analysis' | 'Hospital Devlog' | 'Career';
  title: string;
  summary: string;
  readTime: string;
  content: string; // Markdown structure
  likes: number;
}
