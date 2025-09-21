import React from 'react';
import { BaseProps } from '../../types';

interface ContainerProps extends BaseProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  center?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl'
};

export const Container = React.memo<ContainerProps>(({
  children,
  className = '',
  maxWidth = '4xl',
  center = true
}) => {
  const centerClass = center ? 'mx-auto' : '';

  return (
    <div className={`container px-6 ${maxWidthClasses[maxWidth]} ${centerClass} ${className}`}>
      {children}
    </div>
  );
});

Container.displayName = 'Container';
