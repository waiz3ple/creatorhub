import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { BaseProps } from '../../types';
import { Button } from '../ui/button';

interface ErrorDisplayProps extends BaseProps {
  error: string;
  type?: 'error' | 'warning' | 'info' | 'success';
  onRetry?: () => void;
  onDismiss?: () => void;
  retryLabel?: string;
  dismissLabel?: string;
}

const typeConfig = {
  error: {
    icon: XCircle,
    bgColor: 'bg-red-50 dark:bg-red-900/10',
    borderColor: 'border-red-200 dark:border-red-800',
    iconColor: 'text-red-600',
    textColor: 'text-red-800 dark:text-red-200'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-amber-50 dark:bg-amber-900/10',
    borderColor: 'border-amber-200 dark:border-amber-800',
    iconColor: 'text-amber-600',
    textColor: 'text-amber-800 dark:text-amber-200'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50 dark:bg-blue-900/10',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-800 dark:text-blue-200'
  },
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50 dark:bg-green-900/10',
    borderColor: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-600',
    textColor: 'text-green-800 dark:text-green-200'
  }
};

export const ErrorDisplay = React.memo<ErrorDisplayProps>(({
  error,
  type = 'error',
  onRetry,
  onDismiss,
  retryLabel = 'Try Again',
  dismissLabel = 'Dismiss',
  className = ''
}) => {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`
        rounded-lg border p-4 ${config.bgColor} ${config.borderColor} ${className}
      `}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`h-5 w-5 mt-0.5 ${config.iconColor}`} />

        <div className="flex-1">
          <p className={`text-sm font-medium ${config.textColor}`}>
            {error}
          </p>

          {(onRetry || onDismiss) && (
            <div className="flex items-center space-x-2 mt-3">
              {onRetry && (
                <Button
                  onClick={onRetry}
                  size="sm"
                  variant="outline"
                  className="h-8 px-3 text-xs"
                >
                  {retryLabel}
                </Button>
              )}
              {onDismiss && (
                <Button
                  onClick={onDismiss}
                  size="sm"
                  variant="ghost"
                  className="h-8 px-3 text-xs"
                >
                  {dismissLabel}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ErrorDisplay.displayName = 'ErrorDisplay';
