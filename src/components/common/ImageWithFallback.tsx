import { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
}

export function ImageWithFallback({ src, alt, fallback, className, ...props }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return fallback || (
      <div className={`bg-gray-100 rounded flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">Failed to load</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
