import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Animated Theme Toggle Component
 * 
 * Features:
 * - Smooth morphing animation between sun and moon icons
 * - Background color transitions
 * - Scale and rotation effects on hover
 * - System theme detection support
 * 
 * Uses Framer Motion for smooth animations and next-themes for theme management
 */
export function AnimatedThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300 overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background circle that moves */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 dark:from-indigo-500 dark:to-violet-500 rounded-full"
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          opacity: isDark ? 0 : 0.2,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />

      {/* Sun Icon */}
      <motion.div
        className="relative z-10"
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0 : 1,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-orange-500"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </motion.div>

      {/* Moon Icon */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center"
        initial={false}
        animate={{
          rotate: isDark ? 0 : -180,
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-indigo-400"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </motion.div>

      {/* Floating particles effect */}
      {!isDark && (
        <motion.div
          className="absolute top-1 right-1 w-1 h-1 bg-yellow-300 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5,
          }}
        />
      )}
      
      {isDark && (
        <>
          <motion.div
            className="absolute top-2 left-2 w-0.5 h-0.5 bg-indigo-300 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.2,
            }}
          />
          <motion.div
            className="absolute bottom-2 right-3 w-0.5 h-0.5 bg-violet-300 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1,
            }}
          />
        </>
      )}
    </motion.button>
  );
}