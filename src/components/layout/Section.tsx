import { motion } from 'motion/react';
import React from 'react';
import { ANIMATION_DURATIONS, ANIMATION_VARIANTS } from '../../config/animations';
import { BaseProps } from '../../types';

interface SectionProps extends BaseProps {
  title?: string;
  subtitle?: string;
  delay?: number;
  variant?: 'slideUp' | 'fadeIn' | 'scaleIn';
}

export const Section = React.memo<SectionProps>(({
  children,
  className = '',
  title,
  subtitle,
  delay = 0,
  variant = 'slideUp'
}) => {
  const animationVariant = ANIMATION_VARIANTS[variant];

  return (
    <motion.section
      initial={animationVariant.initial}
      animate={animationVariant.animate}
      transition={{
        duration: ANIMATION_DURATIONS.slow,
        delay
      }}
      className={className}
    >
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </motion.section>
  );
});

Section.displayName = 'Section';
