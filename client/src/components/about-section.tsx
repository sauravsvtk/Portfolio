import { motion } from "framer-motion";

/**
 * About Section Component
 * 
 * Features:
 * - Personal introduction and professional summary
 * - Contact information cards with hover effects
 * - Social media links with animated interactions
 * - Responsive grid layout with image and content
 * - Smooth scroll-triggered animations
 * 
 * All animations are powered by Framer Motion with viewport-based triggers
 */
export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-slate-50 dark:bg-slate-700/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Software Engineer</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Passionate full-stack developer with expertise in modern web and mobile technologies. 
                I specialize in creating efficient, scalable solutions using React, React Native, and Node.js. 
                Based in Calicut, Kerala, I bring a unique blend of technical skills and creative problem-solving 
                to every project.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <i className="fas fa-map-marker-alt text-indigo-600 dark:text-indigo-400"></i>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Location</p>
                    <p className="text-slate-600 dark:text-slate-300">Calicut, Kerala</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <i className="fas fa-envelope text-violet-600 dark:text-violet-400"></i>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Email</p>
                    <p className="text-slate-600 dark:text-slate-300">sauravsvtk@gmail.com</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                href="https://github.com/sauravsvtk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                <i className="fab fa-github text-xl"></i>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: -5 }}
                href="https://linkedin.com/in/saurav-s-vtk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </motion.a>
            </div>
          </motion.div>

          {/* Developer workspace image */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:order-first"
          >
            <img
              src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Modern developer workspace"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
