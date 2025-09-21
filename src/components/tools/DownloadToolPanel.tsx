import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  Download, 
  Youtube, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook, 
  Github, 
  Globe,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SiteConfig {
  pattern: RegExp;
  icon: React.ReactNode;
  name: string;
  color: string;
  supportedFormats: string[];
}

const siteConfigs: SiteConfig[] = [
  {
    pattern: /youtube\.com|youtu\.be/i,
    icon: <Youtube className="h-6 w-6" />,
    name: 'YouTube',
    color: 'text-red-500',
    supportedFormats: ['MP4', 'MP3', 'WEBM']
  },
  {
    pattern: /linkedin\.com/i,
    icon: <Linkedin className="h-6 w-6" />,
    name: 'LinkedIn',
    color: 'text-blue-600',
    supportedFormats: ['MP4', 'JPG']
  },
  {
    pattern: /twitter\.com|x\.com/i,
    icon: <Twitter className="h-6 w-6" />,
    name: 'Twitter/X',
    color: 'text-blue-400',
    supportedFormats: ['MP4', 'JPG', 'GIF']
  },
  {
    pattern: /instagram\.com/i,
    icon: <Instagram className="h-6 w-6" />,
    name: 'Instagram',
    color: 'text-pink-500',
    supportedFormats: ['MP4', 'JPG', 'MP3']
  },
  {
    pattern: /facebook\.com|fb\.com/i,
    icon: <Facebook className="h-6 w-6" />,
    name: 'Facebook',
    color: 'text-blue-500',
    supportedFormats: ['MP4', 'JPG']
  },
  {
    pattern: /github\.com/i,
    icon: <Github className="h-6 w-6" />,
    name: 'GitHub',
    color: 'text-gray-800 dark:text-gray-200',
    supportedFormats: ['ZIP', 'TAR.GZ']
  }
];

export function DownloadToolPanel() {
  const [url, setUrl] = useState('');
  const [detectedSite, setDetectedSite] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [downloadHistory, setDownloadHistory] = useState<Array<{
    url: string;
    site: string;
    format: string;
    status: 'completed' | 'processing' | 'failed';
    timestamp: Date;
  }>>([]);

  useEffect(() => {
    if (url.trim()) {
      const detected = siteConfigs.find(config => config.pattern.test(url));
      setDetectedSite(detected || null);
      if (detected && detected.supportedFormats.length > 0) {
        setSelectedFormat(detected.supportedFormats[0]);
      }
    } else {
      setDetectedSite(null);
      setSelectedFormat('');
    }
  }, [url]);

  const handleDownload = async () => {
    if (!url.trim() || !selectedFormat) return;
    
    setIsLoading(true);
    
    // Add to history with processing status
    const newDownload = {
      url: url,
      site: detectedSite?.name || 'Unknown',
      format: selectedFormat,
      status: 'processing' as const,
      timestamp: new Date()
    };
    setDownloadHistory(prev => [newDownload, ...prev]);
    
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update status to completed
    setDownloadHistory(prev => 
      prev.map((item, index) => 
        index === 0 ? { ...item, status: 'completed' } : item
      )
    );
    
    setIsLoading(false);
    
    // Reset form
    setUrl('');
    setSelectedFormat('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* URL Input Section */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="download-url" className="text-base font-medium">
            Content URL
          </Label>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Paste a link from supported platforms to download content
          </p>
        </div>
        
        <div className="relative">
          <Input
            id="download-url"
            type="url"
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pr-16 h-12"
          />
          
          <AnimatePresence>
            {detectedSite && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <div className={`flex items-center space-x-2 ${detectedSite.color}`}>
                  {detectedSite.icon}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {detectedSite && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Detected: {detectedSite.name}
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              {detectedSite.supportedFormats.length} formats available
            </Badge>
          </motion.div>
        )}
      </div>

      {/* Format Selection */}
      {detectedSite && detectedSite.supportedFormats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <Label className="text-base font-medium">Output Format</Label>
          <div className="grid grid-cols-3 gap-3">
            {detectedSite.supportedFormats.map((format) => (
              <Button
                key={format}
                variant={selectedFormat === format ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFormat(format)}
                className="h-10"
              >
                {format}
              </Button>
            ))}
          </div>
        </motion.div>
      )}

      <Separator />

      {/* Download Button */}
      <Button
        onClick={handleDownload}
        disabled={!url.trim() || !selectedFormat || isLoading}
        className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        size="lg"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Processing Download...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Start Download</span>
          </div>
        )}
      </Button>

      {/* Download History */}
      {downloadHistory.length > 0 && (
        <>
          <Separator />
          <div className="space-y-3">
            <Label className="text-base font-medium">Recent Downloads</Label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {downloadHistory.slice(0, 5).map((item, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      {getStatusIcon(item.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.site} • {item.format}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {item.url}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 ml-2">
                      {item.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Supported Platforms */}
      <Card className="p-4 bg-gray-50 dark:bg-gray-800/50">
        <h4 className="font-medium mb-3 text-sm">Supported Platforms</h4>
        <div className="grid grid-cols-3 gap-3">
          {siteConfigs.map((site, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <div className={site.color}>
                {site.icon}
              </div>
              <span className="font-medium">{site.name}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}