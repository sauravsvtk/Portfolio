import { motion } from "framer-motion";

/**
 * Loading Skeleton Component
 * 
 * Provides animated loading placeholders for different content types
 * Uses shimmer animation and proper semantic structure
 * Adapts to dark/light themes automatically
 */

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

/**
 * Base Skeleton Component
 * Creates animated loading placeholder with shimmer effect
 */
export function Skeleton({ 
  className = "", 
  variant = "rectangular", 
  width = "100%", 
  height = "20px",
  animate = true 
}: SkeletonProps) {
  const baseClasses = "bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 relative overflow-hidden";
  
  const variantClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg"
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${animate ? 'animate-pulse' : ''}`}
      style={style}
      role="presentation"
      aria-label="Loading..."
    >
      {animate && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-slate-500/20 animate-shimmer" />
      )}
    </div>
  );
}

/**
 * Hero Section Loading Skeleton
 * Matches the exact layout of the hero section for seamless loading experience
 */
export function HeroSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900"></div>
      
      {/* Floating Elements Skeleton */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-200/50 dark:bg-indigo-800/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-40"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-violet-200/50 dark:bg-violet-800/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-40"
        />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Avatar Skeleton */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <Skeleton 
            variant="circular" 
            width={128} 
            height={128} 
            className="md:w-40 md:h-40 ring-4 ring-white dark:ring-slate-700 shadow-2xl"
          />
        </motion.div>

        {/* Name Skeleton */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 flex justify-center"
        >
          <Skeleton width={300} height={60} className="md:w-96 md:h-20" />
        </motion.div>

        {/* Tagline Skeleton */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <Skeleton width={250} height={32} className="md:w-80" />
        </motion.div>

        {/* CTA Buttons Skeleton */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 sm:mb-20"
        >
          <Skeleton width={160} height={48} className="rounded-full" />
          <Skeleton width={160} height={48} className="rounded-full" />
        </motion.div>

        {/* Scroll Indicator Skeleton */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex justify-center"
        >
          <div className="flex flex-col items-center">
            <Skeleton width={120} height={20} className="mb-2" />
            <Skeleton width={24} height={24} className="rounded-full" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/**
 * Text Loading Skeleton
 * For individual text elements with various sizes
 */
export function TextSkeleton({ 
  lines = 1, 
  className = "",
  lineHeight = "20px",
  gap = "8px" 
}: { 
  lines?: number; 
  className?: string;
  lineHeight?: string;
  gap?: string;
}) {
  return (
    <div className={`space-y-${gap} ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height={lineHeight}
          width={index === lines - 1 && lines > 1 ? "75%" : "100%"}
        />
      ))}
    </div>
  );
}

/**
 * Card Loading Skeleton
 * For card-based layouts with consistent spacing
 */
export function CardSkeleton({ 
  className = "",
  showImage = true,
  showTitle = true,
  showDescription = true 
}: {
  className?: string;
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
}) {
  return (
    <div className={`p-6 border border-slate-200 dark:border-slate-700 rounded-lg ${className}`}>
      {showImage && (
        <Skeleton width="100%" height={200} className="mb-4" />
      )}
      {showTitle && (
        <Skeleton width="75%" height={24} className="mb-3" />
      )}
      {showDescription && (
        <TextSkeleton lines={3} lineHeight="16px" />
      )}
    </div>
  );
}