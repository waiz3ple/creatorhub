import { ArrowRight, Download, Facebook, Github, Globe, Instagram, Linkedin, Sparkles, Twitter, Youtube } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { memo, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SiteConfig {
  pattern: RegExp;
  icon: React.ReactNode;
  name: string;
  color: string;
  gradient: string;
}

const siteConfigs: SiteConfig[] = [
  {
    pattern: /youtube\.com|youtu\.be/i,
    icon: <Youtube className="h-5 w-5" />,
    name: 'YouTube',
    color: 'text-red-500',
    gradient: 'from-red-500 to-red-600'
  },
  {
    pattern: /linkedin\.com/i,
    icon: <Linkedin className="h-5 w-5" />,
    name: 'LinkedIn',
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    pattern: /twitter\.com|x\.com/i,
    icon: <Twitter className="h-5 w-5" />,
    name: 'Twitter/X',
    color: 'text-blue-400',
    gradient: 'from-blue-400 to-blue-500'
  },
  {
    pattern: /instagram\.com/i,
    icon: <Instagram className="h-5 w-5" />,
    name: 'Instagram',
    color: 'text-pink-500',
    gradient: 'from-pink-500 to-purple-600'
  },
  {
    pattern: /facebook\.com|fb\.com/i,
    icon: <Facebook className="h-5 w-5" />,
    name: 'Facebook',
    color: 'text-blue-500',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    pattern: /github\.com/i,
    icon: <Github className="h-5 w-5" />,
    name: 'GitHub',
    color: 'text-gray-800 dark:text-gray-200',
    gradient: 'from-gray-700 to-gray-800'
  }
];

interface DynamicSearchBarProps {
  isConsented?: boolean;
}

const DynamicSearchBar = memo<DynamicSearchBarProps>(({ isConsented = true }) => {
  const [url, setUrl] = useState('');
  const [detectedSite, setDetectedSite] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (url.trim()) {
      const detected = siteConfigs.find(config => config.pattern.test(url));
      setDetectedSite(detected || null);
    } else {
      setDetectedSite(null);
    }
  }, [url]);

  const handleDownload = async () => {
    if (!url.trim()) return;

    if (!isConsented) {
      // Scroll to footer to show consent checkbox
      const footer = document.querySelector('footer');
      footer?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsLoading(true);
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);

    // Show success message (in a real app, this would trigger actual download)
    alert(`Download started for: ${detectedSite?.name || 'website'} content`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        className="relative"
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Main Search Container */}
        <div className="relative group">
          {/* Background glow effect */}
          <div className={`
            absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20
            rounded-2xl blur-xl transition-opacity duration-300
            ${isFocused ? 'opacity-100' : 'opacity-0'}
          `} />

          {/* Search input container */}
          <div className="relative flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">

            {/* URL Input */}
            <div className="flex-1 relative">
              <Input
                type="url"
                placeholder="Paste any URL here - YouTube, Instagram, LinkedIn, TikTok..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="h-16 bg-transparent border-0 text-lg placeholder:text-gray-400 focus:ring-0 focus:outline-none pl-6 pr-20"
              />

              {/* Site detection indicator */}
              <AnimatePresence>
                {detectedSite && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2"
                  >
                    <div className={`
                      flex items-center space-x-3 px-3 py-2 rounded-xl
                      bg-gradient-to-r ${detectedSite.gradient} shadow-lg
                    `}>
                      <div className="text-white">
                        {detectedSite.icon}
                      </div>
                      <span className="text-white font-medium text-sm hidden sm:block">
                        {detectedSite.name}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Download Button */}
            <div className="p-2">
              <Button
                onClick={handleDownload}
                disabled={!url.trim() || isLoading}
                className={`
                  h-12 px-6 rounded-xl font-medium transition-all duration-300
                  ${detectedSite
                    ? `bg-gradient-to-r ${detectedSite.gradient} hover:shadow-lg ${isConsented ? 'hover:scale-105' : ''} text-white`
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                  }
                  ${!isConsented ? 'opacity-75' : ''}
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  shadow-lg hover:shadow-xl
                `}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="hidden sm:block">Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:block">Download</span>
                    <ArrowRight className="h-4 w-4 sm:hidden" />
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Detection feedback */}
        <AnimatePresence>
          {detectedSite && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.1 }}
              className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
            >
              <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200/50 dark:border-gray-700/50">
                <Globe className="h-4 w-4" />
                <span>Ready to download from {detectedSite.name}</span>
                <Sparkles className="h-4 w-4 text-amber-500" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Supported platforms hint */}
        {!url && !isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Supported platforms:
            </p>
            <div className="flex items-center justify-center space-x-4 flex-wrap gap-2">
              {siteConfigs.map((site, index) => (
                <motion.div
                  key={site.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 rounded-lg px-3 py-2 border border-gray-200/30 dark:border-gray-700/30"
                >
                  <div className={site.color}>
                    {site.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {site.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
});

DynamicSearchBar.displayName = 'DynamicSearchBar';

export { DynamicSearchBar };
