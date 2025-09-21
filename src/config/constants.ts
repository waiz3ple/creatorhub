export const APP_CONFIG = {
  name: 'CreatorHub',
  tagline: 'Professional Tool Suite',
  description: 'Enter a link from YouTube, Instagram, LinkedIn, or any supported platform',
  version: '0.1.0',

  // UI Constants
  maxFileSize: 50 * 1024 * 1024, // 50MB
  supportedImageFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
  supportedDocumentFormats: ['pdf', 'doc', 'docx', 'txt'],
  supportedAudioFormats: ['mp3', 'wav', 'flac', 'aac'],
  supportedFontFormats: ['ttf', 'otf', 'woff', 'woff2'],

  // Default values
  defaultCompressionLevel: 80,
  defaultImageQuality: 85,

  // API endpoints (for future use)
  apiEndpoints: {
    upload: '/api/upload',
    convert: '/api/convert',
    download: '/api/download'
  }
};

export const TOOL_DESCRIPTIONS = {
  download: 'Download content from YouTube, LinkedIn, Instagram, and other platforms',
  image: 'Compress, resize, and convert images with advanced algorithms',
  document: 'Convert documents between various formats including Word to PDF',
  audio: 'Transform audio files to MP3, WAV, FLAC and other formats',
  font: 'Convert fonts to web-optimized WOFF format for better performance',
  default: 'Professional file conversion and optimization tools'
};

export const ERROR_MESSAGES = {
  fileTooBig: 'File size exceeds the maximum limit',
  unsupportedFormat: 'File format is not supported',
  uploadFailed: 'Upload failed. Please try again',
  processingFailed: 'Processing failed. Please try again',
  networkError: 'Network error. Please check your connection',
  genericError: 'Something went wrong. Please try again'
};

export const SUCCESS_MESSAGES = {
  uploadSuccess: 'File uploaded successfully',
  processingComplete: 'Processing completed successfully',
  downloadReady: 'Your file is ready for download'
};
