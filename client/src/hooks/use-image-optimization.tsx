import { useState, useEffect, useCallback } from "react";

/**
 * Image Optimization Hook
 * 
 * Provides optimized image loading with:
 * - Responsive image sizing
 * - WebP format detection and fallback
 * - Lazy loading support
 * - Loading states and error handling
 * - Intersection Observer for performance
 */

interface UseImageOptimizationOptions {
  src: string;
  alt: string;
  lazy?: boolean;
  responsive?: boolean;
  quality?: number;
  formats?: string[];
}

interface UseImageOptimizationReturn {
  imageSrc: string;
  isLoading: boolean;
  hasError: boolean;
  imageRef: (node: HTMLImageElement | null) => void;
  preload: () => void;
}

/**
 * Hook for optimized image loading with modern web standards
 */
export function useImageOptimization({
  src,
  alt,
  lazy = true,
  responsive = true,
  quality = 85,
  formats = ['webp', 'jpg', 'png']
}: UseImageOptimizationOptions): UseImageOptimizationReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  /**
   * Check if browser supports WebP format
   */
  const supportsWebP = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }, []);

  /**
   * Generate optimized image URL based on browser capabilities
   */
  const getOptimizedSrc = useCallback(async (originalSrc: string): Promise<string> => {
    // If it's already a data URL or external URL, return as-is
    if (originalSrc.startsWith('data:') || originalSrc.startsWith('http')) {
      return originalSrc;
    }

    // Check WebP support for local images
    const webpSupported = await supportsWebP();
    
    if (webpSupported && formats.includes('webp')) {
      // Try to convert extension to webp
      const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      // Test if WebP version exists
      try {
        const response = await fetch(webpSrc, { method: 'HEAD' });
        if (response.ok) {
          return webpSrc;
        }
      } catch {
        // Fallback to original if WebP version doesn't exist
      }
    }

    return originalSrc;
  }, [formats, supportsWebP]);

  /**
   * Preload image for faster loading
   */
  const preload = useCallback(() => {
    const img = new Image();
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
    };
    
    getOptimizedSrc(src).then((optimizedSrc) => {
      setImageSrc(optimizedSrc);
      img.src = optimizedSrc;
    });
  }, [src, getOptimizedSrc]);

  /**
   * Intersection Observer for lazy loading
   */
  useEffect(() => {
    if (!lazy || !imageRef) {
      if (!lazy) preload();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            preload();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Load images 50px before they come into view
        threshold: 0.1
      }
    );

    observer.observe(imageRef);

    return () => {
      if (imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, lazy, preload]);

  /**
   * Set image ref callback
   */
  const handleImageRef = useCallback((node: HTMLImageElement | null) => {
    if (node) {
      setImageRef(node);
    }
  }, []);

  /**
   * Initialize optimized source on mount
   */
  useEffect(() => {
    getOptimizedSrc(src).then(setImageSrc);
  }, [src, getOptimizedSrc]);

  return {
    imageSrc,
    isLoading,
    hasError,
    imageRef: handleImageRef,
    preload
  };
}

/**
 * Generate responsive image sizes for different screen sizes
 */
export function generateResponsiveSizes(
  baseSrc: string,
  sizes: Array<{ width: number; suffix?: string }>
): string {
  return sizes
    .map(({ width, suffix = `_${width}w` }) => {
      const extension = baseSrc.split('.').pop();
      const baseName = baseSrc.replace(`.${extension}`, '');
      return `${baseName}${suffix}.${extension} ${width}w`;
    })
    .join(', ');
}

/**
 * Get optimal image format based on browser support
 */
export async function getOptimalFormat(src: string): Promise<string> {
  // Check for modern format support
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return src;

  // Test WebP support
  const webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  
  if (webpSupported) {
    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    try {
      const response = await fetch(webpSrc, { method: 'HEAD' });
      if (response.ok) return webpSrc;
    } catch {
      // Fallback to original
    }
  }

  return src;
}