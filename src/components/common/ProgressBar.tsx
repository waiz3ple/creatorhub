import { motion } from 'motion/react';
import React from 'react';
import { BaseProps } from '../../types';

interface ProgressBarProps extends BaseProps {
  progress: number;
  showPercentage?: boolean;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  size?: 'sm' | 'md' | 'lg';
}

const colorClasses = {
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  purple: 'bg-purple-600',
  orange: 'bg-orange-600'
};

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
};

export const ProgressBar = React.memo<ProgressBarProps>(({
  progress,
  showPercentage = false,
  color = 'blue',
  size = 'md',
  className = ''
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={`w-full ${className}`}>
      <div className={`bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
      {showPercentage && (
        <div className="text-right mt-1">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';
