import {
    Download,
    Facebook,
    FileText,
    Github,
    Globe,
    Image,
    Instagram,
    Linkedin,
    Music2,
    Twitter,
    Type,
    Youtube
} from 'lucide-react';
import { Tool } from '../types';

export const TOOLS: Tool[] = [
  {
    id: 'download',
    title: 'Content Downloader',
    description: 'Download content from various platforms',
    icon: Download,
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'from-blue-600 to-blue-700',
    shadowColor: 'shadow-blue-500/25'
  },
  {
    id: 'image',
    title: 'Image Processor',
    description: 'Compress, resize, and convert images',
    icon: Image,
    color: 'from-emerald-500 to-emerald-600',
    hoverColor: 'from-emerald-600 to-emerald-700',
    shadowColor: 'shadow-emerald-500/25'
  },
  {
    id: 'document',
    title: 'Document Converter',
    description: 'Convert and process documents',
    icon: FileText,
    color: 'from-indigo-500 to-indigo-600',
    hoverColor: 'from-indigo-600 to-indigo-700',
    shadowColor: 'shadow-indigo-500/25'
  },
  {
    id: 'audio',
    title: 'Audio Processor',
    description: 'Convert and process audio files',
    icon: Music2,
    color: 'from-purple-500 to-purple-600',
    hoverColor: 'from-purple-600 to-purple-700',
    shadowColor: 'shadow-purple-500/25'
  },
  {
    id: 'font',
    title: 'Font Optimizer',
    description: 'Convert and optimize web fonts',
    icon: Type,
    color: 'from-orange-500 to-orange-600',
    hoverColor: 'from-orange-600 to-orange-700',
    shadowColor: 'shadow-orange-500/25'
  }
];

// Site configurations - using icon components directly in the consuming components
export const SITE_ICON_MAP = {
  Youtube,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Github,
  Globe
};

export const SITE_PATTERNS = [
  {
    pattern: /youtube\.com|youtu\.be/i,
    iconName: 'Youtube' as const,
    name: 'YouTube',
    color: 'text-red-500',
    gradient: 'from-red-500 to-red-600'
  },
  {
    pattern: /linkedin\.com/i,
    iconName: 'Linkedin' as const,
    name: 'LinkedIn',
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    pattern: /twitter\.com|x\.com/i,
    iconName: 'Twitter' as const,
    name: 'Twitter/X',
    color: 'text-gray-800',
    gradient: 'from-gray-700 to-gray-800'
  },
  {
    pattern: /instagram\.com/i,
    iconName: 'Instagram' as const,
    name: 'Instagram',
    color: 'text-pink-500',
    gradient: 'from-pink-500 to-purple-600'
  },
  {
    pattern: /facebook\.com|fb\.com/i,
    iconName: 'Facebook' as const,
    name: 'Facebook',
    color: 'text-blue-700',
    gradient: 'from-blue-600 to-blue-700'
  },
  {
    pattern: /github\.com/i,
    iconName: 'Github' as const,
    name: 'GitHub',
    color: 'text-gray-800',
    gradient: 'from-gray-600 to-gray-800'
  },
  {
    pattern: /tiktok\.com/i,
    iconName: 'Globe' as const,
    name: 'TikTok',
    color: 'text-pink-600',
    gradient: 'from-pink-500 to-red-500'
  }
];
