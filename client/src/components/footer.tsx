import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Saurav S
            </h3>
            <p className="text-slate-400 mt-2">Engineering Simplicity. Delivering Impact.</p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-6 mb-8"
          >
            <motion.a
              whileHover={{ scale: 1.1, rotate: 5 }}
              href="mailto:sauravsvtk@gmail.com"
              className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors duration-300"
            >
              <i className="fas fa-envelope"></i>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, rotate: -5 }}
              href="https://github.com/sauravsvtk"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors duration-300"
            >
              <i className="fab fa-github"></i>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, rotate: 5 }}
              href="https://linkedin.com/in/saurav-s-vtk"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
            >
              <i className="fab fa-linkedin"></i>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-slate-800 pt-8"
          >
            <p className="text-slate-400">&copy; 2024 Saurav S. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
