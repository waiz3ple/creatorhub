import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { BaseProps } from '../../types';

interface LoadingSpinnerProps extends BaseProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  overlay?: boolean;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8'
};

export const LoadingSpinner = React.memo<LoadingSpinnerProps>(({
  size = 'md',
  message,
  overlay = false,
  className = ''
}) => {
  const content = (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className={`${sizeClasses[size]} text-blue-600`} />
      </motion.div>
      {message && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {message}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
          {content}
        </div>
      </div>
    );
  }

  return content;
});

LoadingSpinner.displayName = 'LoadingSpinner';
