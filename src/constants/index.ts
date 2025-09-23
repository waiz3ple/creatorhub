import { Code, FileText, Globe, Image, Music2, Palette, Type, Zap } from 'lucide-react';
import { ColorScheme, Tool } from '../types';

export const APP_CONFIG = {
  name: 'CreatorHub',
  version: '1.0.0',
  description: 'Your ultimate toolkit for content creation and processing',
  author: 'CreatorHub Team',
  url: 'https://creatorhub.com',
} as const;

export const COLOR_SCHEMES: Record<ColorScheme, {
  gradient: string;
  hoverGradient: string;
  shadow: string;
}> = {
  emerald: {
    gradient: 'from-emerald-500 to-emerald-600',
    hoverGradient: 'from-emerald-600 to-emerald-700',
    shadow: 'shadow-emerald-500/25',
  },
  indigo: {
    gradient: 'from-indigo-500 to-indigo-600',
    hoverGradient: 'from-indigo-600 to-indigo-700',
    shadow: 'shadow-indigo-500/25',
  },
  purple: {
    gradient: 'from-purple-500 to-purple-600',
    hoverGradient: 'from-purple-600 to-purple-700',
    shadow: 'shadow-purple-500/25',
  },
  orange: {
    gradient: 'from-orange-500 to-orange-600',
    hoverGradient: 'from-orange-600 to-orange-700',
    shadow: 'shadow-orange-500/25',
  },
  blue: {
    gradient: 'from-blue-500 to-blue-600',
    hoverGradient: 'from-blue-600 to-blue-700',
    shadow: 'shadow-blue-500/25',
  },
  pink: {
    gradient: 'from-pink-500 to-pink-600',
    hoverGradient: 'from-pink-600 to-pink-700',
    shadow: 'shadow-pink-500/25',
  },
  cyan: {
    gradient: 'from-cyan-500 to-cyan-600',
    hoverGradient: 'from-cyan-600 to-cyan-700',
    shadow: 'shadow-cyan-500/25',
  },
} as const;

export const TOOLS: Tool[] = [
  {
    id: 'image',
    title: 'Image Processor',
    description: 'Compress, resize, and convert images with advanced optimization',
    icon: Image,
    color: COLOR_SCHEMES.emerald.gradient,
    hoverColor: COLOR_SCHEMES.emerald.hoverGradient,
    shadowColor: COLOR_SCHEMES.emerald.shadow,
    category: 'media',
    isAvailable: true,
  },
  {
    id: 'document',
    title: 'Document Converter',
    description: 'Convert and process documents across multiple formats',
    icon: FileText,
    color: COLOR_SCHEMES.indigo.gradient,
    hoverColor: COLOR_SCHEMES.indigo.hoverGradient,
    shadowColor: COLOR_SCHEMES.indigo.shadow,
    category: 'productivity',
    isAvailable: true,
  },
  {
    id: 'audio',
    title: 'Audio Processor',
    description: 'Convert, compress, and enhance audio files',
    icon: Music2,
    color: COLOR_SCHEMES.purple.gradient,
    hoverColor: COLOR_SCHEMES.purple.hoverGradient,
    shadowColor: COLOR_SCHEMES.purple.shadow,
    category: 'media',
    isAvailable: true,
  },
  {
    id: 'font',
    title: 'Font Optimizer',
    description: 'Convert and optimize web fonts for better performance',
    icon: Type,
    color: COLOR_SCHEMES.orange.gradient,
    hoverColor: COLOR_SCHEMES.orange.hoverGradient,
    shadowColor: COLOR_SCHEMES.orange.shadow,
    category: 'design',
    isAvailable: true,
  },
] as const;

export const TOOL_CATEGORIES = {
  media: { name: 'Media', icon: Palette },
  productivity: { name: 'Productivity', icon: Zap },
  design: { name: 'Design', icon: Code },
  utility: { name: 'Utility', icon: Globe },
} as const;

export const ANIMATION_CONFIG = {
  duration: { fast: 0.2, normal: 0.3, slow: 0.5 },
  easing: { ease: [0.4, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    easeInOut: [0.4, 0, 0.2, 1],
  },

  // Common delays
  delay: {
    none: 0,
    short: 0.1,
    medium: 0.2,
    long: 0.3,
  },
} as const;

/**
 * UI Configuration
 */
export const UI_CONFIG = {
  // Breakpoints (matching Tailwind)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Common sizes
  sizes: {
    headerHeight: '80px',
    footerHeight: '60px',
    sidebarWidth: '280px',
    containerMaxWidth: '1200px',
  },

  // Z-index scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
} as const;

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
  retries: 3,
  endpoints: {
    upload: '/upload',
    process: '/process',
    download: '/download',
    status: '/status',
  },
} as const;

export const FILE_LIMITS = {
  maxFileSize: {
    image: 50 * 1024 * 1024,
    document: 25 * 1024 * 1024,
    audio: 100 * 1024 * 1024,
    font: 10 * 1024 * 1024,
  },
  supportedTypes: {
    image: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff'],
    document: ['.pdf', '.docx', '.doc', '.txt', '.rtf', '.odt'],
    audio: ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.m4a'],
    font: ['.ttf', '.otf', '.woff', '.woff2', '.eot'],
  },

  // Processing limits
  maxConcurrentUploads: 5,
  maxBatchSize: 20,
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  generic: 'An unexpected error occurred. Please try again.',
  network: 'Network error. Please check your connection and try again.',
  fileSize: 'File size exceeds the maximum limit.',
  fileType: 'File type is not supported.',
  upload: 'Failed to upload file. Please try again.',
  processing: 'Failed to process file. Please try again.',
  download: 'Failed to download file. Please try again.',
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  upload: 'File uploaded successfully!',
  processing: 'File processed successfully!',
  download: 'File downloaded successfully!',
  saved: 'Settings saved successfully!',
} as const;
