import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedThemeToggle } from "@/components/ui/animated-theme-toggle";

/**
 * Navigation Bar Component
 * 
 * Features:
 * - Fixed position navigation with backdrop blur effect
 * - Responsive design with mobile hamburger menu
 * - Smooth scroll navigation to page sections
 * - Animated theme toggle button
 * - Gradient brand text with hover effects
 * 
 * The navbar uses Framer Motion for entrance animations and smooth transitions
 */
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation menu items configuration
  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  /**
   * Smoothly scrolls to a specific section and closes mobile menu
   * @param href - The section ID to scroll to (e.g., "#about")
   */
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Saurav S
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="nav-link hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Animated Theme Toggle */}
            <AnimatedThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block py-2 px-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
