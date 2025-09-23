import { LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  hoverColor: string;
  shadowColor: string;
  category?: string;
  isAvailable?: boolean;
}

export interface ToolModalState {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Currently selected tool ID */
  selectedToolId: string | null;
  /** Currently selected tool title */
  selectedToolTitle: string;
}

export interface SearchResult {
  type: 'url' | 'tool' | 'suggestion';
  text: string;
  icon?: LucideIcon;
  action?: () => void;
  url?: string;
}

export interface SiteConfig {
  pattern: RegExp;
  icon: React.ReactNode;
  name: string;
}

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: Record<string, any>;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: string | number;
  details?: Record<string, any>;
}

export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface ProcessingOptions {
  format?: string;
  quality?: number;
  compression?: number;
  [key: string]: any;
}

export type Theme = 'light' | 'dark' | 'system';

export type ColorScheme =
  | 'emerald'
  | 'indigo'
  | 'purple'
  | 'orange'
  | 'blue'
  | 'pink'
  | 'cyan';

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
