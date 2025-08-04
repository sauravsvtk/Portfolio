import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import profileImage from "@assets/1703661175013_1754277741925.jpeg";

/**
 * Hero Section Component
 * 
 * Main landing section featuring:
 * - Animated typing effect with rotating phrases
 * - Floating background elements with motion
 * - Professional avatar with glow effect
 * - Call-to-action buttons with hover animations
 * - Interactive scroll indicator
 * 
 * Uses Framer Motion for all animations and transitions
 * Implements a custom typing effect with phrase rotation
 */
export function HeroSection() {
  // Typing animation state management
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Phrases to cycle through in the typing animation
  const phrases = [
    "Engineering Simplicity. Delivering Impact.",
    "Full-Stack Developer",
    "React & React Native Expert", 
    "Building Amazing Experiences"
  ];

  /**
   * Typing animation effect that cycles through phrases
   * Creates a realistic typing/deleting animation with variable speeds
   */
  useEffect(() => {
    const phrase = phrases[phraseIndex];
    const timeout = setTimeout(() => {
      if (isDeleting) {
        // Deleting characters - faster speed
        setCurrentPhrase(phrase.substring(0, currentPhrase.length - 1));
        if (currentPhrase === "") {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      } else {
        // Typing characters - slower speed for realism
        setCurrentPhrase(phrase.substring(0, currentPhrase.length + 1));
        if (currentPhrase === phrase) {
          // Pause before starting to delete
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 100); // Faster deletion, slower typing

    return () => clearTimeout(timeout);
  }, [currentPhrase, phraseIndex, isDeleting, phrases]);

  /**
   * Smooth scroll navigation to any page section
   * @param href - The section ID to scroll to (e.g., "#about")
   */
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900"></div>
      
      {/* Floating Elements */}
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
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-200 dark:bg-indigo-800/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70"
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
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-violet-200 dark:bg-violet-800/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70"
        />
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute top-1/2 right-1/3 w-20 h-20 bg-amber-200 dark:bg-amber-800/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70"
        />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <img
            src={profileImage}
            alt="Saurav S Profile Picture"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-2xl ring-4 ring-white dark:ring-slate-700 animate-glow"
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent"
        >
          Saurav S
        </motion.h1>

        {/* Animated Tagline */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 h-16 flex items-center justify-center"
        >
          <span className="font-mono">{currentPhrase}</span>
          <span className="animate-typing ml-1">|</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 sm:mb-20"
        >
          <button
            onClick={() => scrollToSection("#projects")}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 group"
          >
            <span>View My Work</span>
            <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
          </button>
          <button
            onClick={() => scrollToSection("#contact")}
            className="inline-flex items-center px-8 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-full hover:bg-indigo-600 hover:text-white dark:hover:text-white transition-all duration-300"
          >
            <span>Get in Touch</span>
            <i className="fas fa-envelope ml-2"></i>
          </button>
        </motion.div>

        {/* Scroll Indicator - centered below CTA buttons with proper spacing */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex justify-center"
        >
          <motion.button
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => scrollToSection("#about")}
            className="flex flex-col items-center text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 group p-4 rounded-lg hover:bg-white/10 dark:hover:bg-slate-800/30"
          >
            <span className="text-xs sm:text-sm mb-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300 font-medium">
              Scroll to explore
            </span>
            <i className="fas fa-chevron-down text-lg sm:text-xl"></i>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
