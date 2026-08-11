import React, { useState, useEffect } from 'react';

export type ImageCategory = 'hotel' | 'destination' | 'experience' | 'avatar' | 'general';

interface SafeImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
  alt: string;
  category?: ImageCategory;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string; // e.g. "aspect-video", "aspect-square", "h-48", etc.
}

const FALLBACK_IMAGES: Record<ImageCategory, string> = {
  hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  destination: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  experience: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  general: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
};

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  category = 'general',
  className = '',
  containerClassName = '',
  aspectRatio = '',
  ...props
}) => {
  const fallbackUrl = FALLBACK_IMAGES[category] || FALLBACK_IMAGES.general;

  // Validate initial URL
  const isValidUrl = (url?: string | null): boolean => {
    if (!url || typeof url !== 'string') return false;
    const trimmed = url.trim();
    if (trimmed.length === 0) return false;
    return trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:') || trimmed.startsWith('/');
  };

  const initialSrc = isValidUrl(src) ? (src as string) : fallbackUrl;

  const [imgSrc, setImgSrc] = useState<string>(initialSrc);
  const [hasError, setHasError] = useState<boolean>(!isValidUrl(src));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Update state if src prop changes
  useEffect(() => {
    if (isValidUrl(src)) {
      setImgSrc(src as string);
      setHasError(false);
      setIsLoading(true);
    } else {
      setImgSrc(fallbackUrl);
      setHasError(true);
      setIsLoading(false);
    }
  }, [src, fallbackUrl]);

  const handleError = () => {
    if (imgSrc !== fallbackUrl) {
      console.warn(`[SafeImage] Failed to load image: "${imgSrc}". Switching to fallback.`);
      setImgSrc(fallbackUrl);
      setHasError(true);
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800 ${aspectRatio} ${containerClassName}`}>
      {/* Animated Skeleton Loading State */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse z-10 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-6 h-6 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin opacity-40"></div>
        </div>
      )}

      {/* Actual Image Tag */}
      <img
        src={imgSrc}
        alt={alt || 'Accessible travel image'}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
