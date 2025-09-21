import { motion } from 'motion/react';
import React from 'react';
import { ANIMATION_DURATIONS, ANIMATION_VARIANTS } from '../../config/animations';
import { BaseProps } from '../../types';

interface PageLayoutProps extends BaseProps {
  showBackground?: boolean;
}

export const PageLayout = React.memo<PageLayoutProps>(({
  children,
  className = '',
  showBackground = true
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 ${className}`}>
      {/* Ambient Background */}
      {showBackground && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/10 to-cyan-600/10 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-bl from-violet-400/8 to-pink-400/8 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>
      )}

      {/* Main Content */}
      <motion.div
        initial={ANIMATION_VARIANTS.fadeIn.initial}
        animate={ANIMATION_VARIANTS.fadeIn.animate}
        transition={{ duration: ANIMATION_DURATIONS.normal }}
        className="relative z-10 min-h-screen flex flex-col"
      >
        {children}
      </motion.div>
    </div>
  );
});

PageLayout.displayName = 'PageLayout';
