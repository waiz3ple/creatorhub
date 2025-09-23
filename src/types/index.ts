import { LucideIcon } from 'lucide-react';

/**
 * Tool configuration interface
 */
export interface Tool {
  /** Unique identifier for the tool */
  id: string;
  /** Display title of the tool */
  title: string;
  /** Brief description of the tool's functionality */
  description: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Gradient color classes for the tool card */
  color: string;
  /** Hover gradient color classes */
  hoverColor: string;
  /** Shadow color classes */
  shadowColor: string;
  /** Optional category for grouping tools */
  category?: string;
  /** Whether the tool is currently available */
  isAvailable?: boolean;
}

/**
 * Tool modal state interface
 */
export interface ToolModalState {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Currently selected tool ID */
  selectedToolId: string | null;
  /** Currently selected tool title */
  selectedToolTitle: string;
}

/**
 * Search result interface for DynamicSearchBar
 */
export interface SearchResult {
  /** Type of the search result */
  type: 'url' | 'tool' | 'suggestion';
  /** Display text */
  text: string;
  /** Associated icon */
  icon?: LucideIcon;
  /** Action to perform when selected */
  action?: () => void;
  /** URL for url type results */
  url?: string;
}

/**
 * Site configuration for URL detection
 */
export interface SiteConfig {
  /** RegExp pattern to match URLs */
  pattern: RegExp;
  /** Icon to display for this site */
  icon: React.ReactNode;
  /** Display name of the site */
  name: string;
}

/**
 * Common component props
 */
export interface BaseComponentProps {
  /** Additional CSS classes */
  className?: string;
  /** Children elements */
  children?: React.ReactNode;
}

/**
 * API response types
 */
export interface ApiResponse<T = any> {
  /** Whether the request was successful */
  success: boolean;
  /** Response data */
  data?: T;
  /** Error message if unsuccessful */
  error?: string;
  /** Additional metadata */
  meta?: Record<string, any>;
}

/**
 * Loading state interface
 */
export interface LoadingState {
  /** Whether currently loading */
  isLoading: boolean;
  /** Loading message */
  message?: string;
  /** Progress percentage (0-100) */
  progress?: number;
}

/**
 * Error state interface
 */
export interface ErrorState {
  /** Whether there's an error */
  hasError: boolean;
  /** Error message */
  message?: string;
  /** Error code */
  code?: string | number;
  /** Additional error details */
  details?: Record<string, any>;
}

/**
 * File processing interfaces
 */
export interface FileInfo {
  /** File name */
  name: string;
  /** File size in bytes */
  size: number;
  /** MIME type */
  type: string;
  /** Last modified timestamp */
  lastModified: number;
}

export interface ProcessingOptions {
  /** Output format */
  format?: string;
  /** Quality setting (0-100) */
  quality?: number;
  /** Compression level */
  compression?: number;
  /** Additional options */
  [key: string]: any;
}

/**
 * Theme and appearance types
 */
export type Theme = 'light' | 'dark' | 'system';

export type ColorScheme =
  | 'emerald'
  | 'indigo'
  | 'purple'
  | 'orange'
  | 'blue'
  | 'pink'
  | 'cyan';

/**
 * Utility types
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
