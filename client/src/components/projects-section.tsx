import { motion } from "framer-motion";

export function ProjectsSection() {
  const projects = [
    {
      title: "React Native OCR Scanner",
      description: "Advanced OCR scanning application built with React Native, featuring real-time text recognition, document processing, and cloud synchronization capabilities.",
      image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tags: ["React Native", "OCR", "Machine Learning", "Firebase"],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      title: "Enhanced Express Monitor",
      description: "Comprehensive monitoring solution for Express.js applications with real-time metrics, performance analytics, and alerting system for production environments.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tags: ["Express.js", "React", "WebSocket", "Redis"],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      title: "Full-Stack E-Commerce Platform",
      description: "Modern e-commerce solution with advanced features including payment integration, inventory management, and real-time analytics dashboard.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tags: ["React", "Node.js", "Prisma", "Stripe"],
      demoUrl: "#",
      codeUrl: "#",
    },
  ];

  const getTagColor = (tag: string) => {
    const colors = {
      "React Native": "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
      "OCR": "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
      "Machine Learning": "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
      "Firebase": "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300",
      "Express.js": "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
      "React": "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
      "WebSocket": "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
      "Redis": "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
      "Node.js": "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
      "Prisma": "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
      "Stripe": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
    };
    return colors[tag as keyof typeof colors] || "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300";
  };

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Showcasing innovative solutions and technical expertise
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              <div className="overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded-md text-xs ${getTagColor(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.codeUrl}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-center text-sm font-medium"
                  >
                    <i className="fab fa-github mr-2"></i>View Code
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.demoUrl}
                    className="flex-1 border border-indigo-600 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg hover:bg-indigo-600 hover:text-white dark:hover:text-white transition-all duration-300 text-center text-sm font-medium"
                  >
                    <i className="fas fa-external-link-alt mr-2"></i>Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-full hover:shadow-lg transition-all duration-300 group"
          >
            <span className="mr-2">View All Projects</span>
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
