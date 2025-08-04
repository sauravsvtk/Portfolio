import { motion } from "framer-motion";

/**
 * Page Loader Component
 * 
 * Provides a full-screen loading animation for initial page loads
 * Features:
 * - Smooth fade-in/out animations
 * - Professional brand presentation
 * - Dark/light theme support
 * - Responsive design
 * - Logo animation with gradient text effect
 */

interface PageLoaderProps {
  isLoading?: boolean;
  onComplete?: () => void;
}

export function PageLoader({ isLoading = true, onComplete }: PageLoaderProps) {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900"
      role="progressbar"
      aria-label="Loading website content"
    >
      {/* Background blur effect */}
      <div className="absolute inset-0 backdrop-blur-sm" />
      
      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
            SS
          </h1>
        </motion.div>

        {/* Loading text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-xl text-slate-600 dark:text-slate-300 font-medium mb-2">
            Saurav S
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading portfolio...
          </p>
        </motion.div>

        {/* Animated progress indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, delay: 0.8 }}
          className="mt-8 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"
          style={{ width: "120px" }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
              className={`absolute w-2 h-2 bg-indigo-400 dark:bg-violet-400 rounded-full opacity-30`}
              style={{
                left: `${20 + i * 12}%`,
                top: `${30 + i * 8}%`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Minimal Page Loader for faster subsequent loads
 */
export function MinimalLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full"
      />
    </div>
  );
}