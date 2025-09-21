import { useCallback, useEffect, useState } from 'react';
import { SITE_ICON_MAP, SITE_PATTERNS } from '../config/tools';

interface DetectedSite {
  iconName: keyof typeof SITE_ICON_MAP;
  name: string;
  color: string;
  gradient: string;
}

export const useSiteDetection = (url: string) => {
  const [detectedSite, setDetectedSite] = useState<DetectedSite | null>(null);

  useEffect(() => {
    if (url.trim()) {
      const detected = SITE_PATTERNS.find(config => config.pattern.test(url));
      if (detected) {
        setDetectedSite({
          iconName: detected.iconName,
          name: detected.name,
          color: detected.color,
          gradient: detected.gradient
        });
      } else {
        setDetectedSite(null);
      }
    } else {
      setDetectedSite(null);
    }
  }, [url]);

  const getSiteIcon = useCallback((iconName: keyof typeof SITE_ICON_MAP) => {
    return SITE_ICON_MAP[iconName];
  }, []);

  return {
    detectedSite,
    getSiteIcon
  };
};
