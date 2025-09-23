import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

import { AudioToolPanel } from './tools/AudioToolPanel';
import { DocumentToolPanel } from './tools/DocumentToolPanel';
import { FontToolPanel } from './tools/FontToolPanel';
import { ImageToolPanel } from './tools/ImageToolPanel';

interface ToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolType: string;
  toolTitle: string;
}

export function ToolModal({ isOpen, onClose, toolType, toolTitle }: ToolModalProps) {
  const getToolDescription = (type: string) => {
    switch (type) {
      case 'image':
        return 'Compress, resize, and convert images with advanced algorithms';
      case 'document':
        return 'Convert documents between various formats including Word to PDF';
      case 'audio':
        return 'Transform audio files to MP3, WAV, FLAC and other formats';
      case 'font':
        return 'Convert fonts to web-optimized WOFF format for better performance';
      default:
        return 'Professional file conversion and optimization tools';
    }
  };

  const renderToolPanel = () => {
    switch (toolType) {
      case 'image':
        return <ImageToolPanel />;
      case 'document':
        return <DocumentToolPanel />;
      case 'audio':
        return <AudioToolPanel />;
      case 'font':
        return <FontToolPanel />;
      default:
        return <div>Tool not found</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {toolTitle}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {getToolDescription(toolType)}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          {renderToolPanel()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
