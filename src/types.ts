export type TabID = 'home' | 'timeline' | 'work' | 'about' | 'story' | 'contact' | 'quiz';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  year: string;
  image: string;
  tags: string[];
  badge?: 'WIP' | 'BETA' | 'NEW' | 'RELEASE' | 'PRODUCTION';
  demoUrl?: string;
  githubUrl?: string;
  metrics?: { label: string; value: string }[];
  technologies?: string[];
  challenges?: string[];
  impact?: string;
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
