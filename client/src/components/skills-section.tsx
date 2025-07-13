import { motion } from "framer-motion";

/**
 * Skills Section Component
 * 
 * Features:
 * - Technical skills with animated progress bars
 * - 3D card effects with hover interactions
 * - Soft skills displayed in elegant cards
 * - Gradient backgrounds and icon animations
 * - Staggered entrance animations for visual appeal
 * 
 * Skills are organized into technical and soft skill categories
 * Each skill has custom styling and animation timing
 */
export function SkillsSection() {
  // Technical skills with proficiency levels and custom gradients
  const technicalSkills = [
    { name: "React.js", icon: "fab fa-react", level: 90, gradient: "from-indigo-500 to-violet-500" },
    { name: "React Native", icon: "fab fa-react", level: 85, gradient: "from-blue-500 to-cyan-500" },
    { name: "Node.js", icon: "fab fa-node-js", level: 80, gradient: "from-green-500 to-emerald-500" },
    { name: "Flutter", icon: "fab fa-flutter", level: 75, gradient: "from-blue-400 to-blue-600" },
    { name: "JavaScript", icon: "fab fa-js-square", level: 92, gradient: "from-yellow-500 to-orange-500" },
    { name: "SQL", icon: "fas fa-database", level: 78, gradient: "from-purple-500 to-indigo-500" },
    { name: "Git", icon: "fab fa-git-alt", level: 88, gradient: "from-gray-600 to-gray-800" },
    { name: "Prisma", icon: "fas fa-cogs", level: 72, gradient: "from-teal-500 to-cyan-500" },
  ];

  // Soft skills with descriptions and matching gradients
  const softSkills = [
    { name: "Quick Learner", icon: "fas fa-bolt", description: "Rapidly adapts to new technologies", gradient: "from-indigo-500 to-violet-500" },
    { name: "Problem Solving", icon: "fas fa-puzzle-piece", description: "Creative solution development", gradient: "from-emerald-500 to-green-500" },
    { name: "Collaboration", icon: "fas fa-users", description: "Effective team player", gradient: "from-blue-500 to-cyan-500" },
    { name: "Leadership", icon: "fas fa-crown", description: "Guides teams to success", gradient: "from-violet-500 to-purple-500" },
    { name: "Time Management", icon: "fas fa-clock", description: "Efficient project delivery", gradient: "from-amber-500 to-orange-500" },
  ];

  return (
    <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks
          </p>
        </motion.div>

        {/* Technical Skills */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center text-slate-900 dark:text-white">Technical Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {technicalSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 10 }}
                viewport={{ once: true }}
                className="skill-card group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform transition-all duration-300 border border-slate-200 dark:border-slate-700"
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${skill.gradient} rounded-xl flex items-center justify-center text-white text-2xl group-hover:rotate-12 transition-transform duration-300`}>
                    <i className={skill.icon}></i>
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{skill.name}</h4>
                  <div className="mt-3 bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                      className={`bg-gradient-to-r ${skill.gradient} h-2 rounded-full transition-all duration-1000`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center text-slate-900 dark:text-white">Soft Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${skill.gradient} rounded-lg flex items-center justify-center text-white`}>
                    <i className={skill.icon}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{skill.name}</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">{skill.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
