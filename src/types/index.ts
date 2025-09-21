import { LucideIcon } from 'lucide-react';

// Common types
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// Tool-related types
export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  hoverColor: string;
  shadowColor: string;
}

export type ToolType = 'download' | 'image' | 'document' | 'audio' | 'font';

// Site configuration for dynamic search
export interface SiteConfig {
  pattern: RegExp;
  icon: React.ReactNode;
  name: string;
  color: string;
  gradient: string;
}

// Modal and consent types
export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ConsentModalProps extends ModalProps {
  onConsent: () => void;
  onDecline: () => void;
  toolName: string;
}

export interface ToolModalProps extends ModalProps {
  toolType: string;
  toolTitle: string;
}

// Component state types
export interface ConsentState {
  isConsented: boolean;
  hasReadTerms: boolean;
  agreedToTerms: boolean;
}

export interface AppState {
  selectedTool: string | null;
  selectedToolTitle: string;
  isToolModalOpen: boolean;
  isConsented: boolean;
}

// Form types
export interface ImageProcessingOptions {
  compressionLevel: number[];
  resizeWidth: string;
  resizeHeight: string;
  outputFormat: string;
}

export interface ProcessingState {
  isLoading: boolean;
  progress: number;
  error: string | null;
}

// Animation types
export interface AnimationConfig {
  initial: Record<string, any>;
  animate: Record<string, any>;
  exit?: Record<string, any>;
  transition?: Record<string, any>;
}

// Event handlers
export type ConsentChangeHandler = (consented: boolean) => void;
export type ToolSelectHandler = (toolId: string, toolTitle: string) => void;
export type FileUploadHandler = (files: File[]) => void;
