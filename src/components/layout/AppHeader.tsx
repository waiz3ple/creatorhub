import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { ANIMATION_DURATIONS, ANIMATION_VARIANTS } from '../../config/animations';
import { APP_CONFIG } from '../../config/constants';
import { BaseProps } from '../../types';

interface AppHeaderProps extends BaseProps {
  showSubtitle?: boolean;
}

export const AppHeader = React.memo<AppHeaderProps>(({
  className = '',
  showSubtitle = true
}) => {
  return (
    <motion.header
      initial={ANIMATION_VARIANTS.slideDown.initial}
      animate={ANIMATION_VARIANTS.slideDown.animate}
      transition={{ duration: ANIMATION_DURATIONS.slow, delay: 0.1 }}
      className={`pt-16 pb-8 ${className}`}
    >
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center justify-center space-x-3 mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30" />
            <div className="relative p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              {APP_CONFIG.name}
            </h1>
            {showSubtitle && (
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                {APP_CONFIG.tagline}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
});

AppHeader.displayName = 'AppHeader';
