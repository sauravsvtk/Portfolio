import { motion } from "framer-motion";

export function ExperienceSection() {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Arizon Systems",
      period: "Jul 2024 - Present",
      status: "Current",
      description: "Leading development of modern web applications using React, Node.js, and cloud technologies. Responsible for architectural decisions, code reviews, and mentoring junior developers.",
      skills: ["React.js", "Node.js", "TypeScript", "Prisma"],
      gradient: "from-indigo-50 to-violet-50 dark:from-slate-700 dark:to-slate-600",
      dotGradient: "from-indigo-500 to-violet-500",
    },
    {
      title: "Flutter Developer",
      company: "Sinnonteq IT Consulting",
      period: "Feb 2022 - Mar 2023",
      status: "Previous",
      description: "Developed cross-platform mobile applications using Flutter and Dart. Collaborated with design teams to implement pixel-perfect UIs and integrated with various APIs.",
      skills: ["Flutter", "Dart", "REST APIs", "Firebase"],
      gradient: "from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-600",
      dotGradient: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Professional journey and key achievements
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-violet-500"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${index % 2 === 1 ? "md:justify-end" : ""}`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r ${exp.dotGradient} rounded-full border-4 border-white dark:border-slate-800 shadow-lg`}></div>
                
                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`bg-gradient-to-br ${exp.gradient} rounded-2xl p-8 shadow-lg border border-indigo-100 dark:border-slate-600`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        exp.status === "Current" 
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                      }`}>
                        {exp.status}
                      </span>
                      <span className="text-slate-600 dark:text-slate-300 font-mono text-sm">{exp.period}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{exp.title}</h3>
                    <h4 className={`text-lg font-semibold mb-4 ${
                      exp.status === "Current" 
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-blue-600 dark:text-blue-400"
                    }`}>
                      {exp.company}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-3 py-1 rounded-full text-sm ${
                            skill === "React.js" ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300" :
                            skill === "Node.js" ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" :
                            skill === "TypeScript" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300" :
                            skill === "Prisma" ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300" :
                            skill === "Flutter" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300" :
                            skill === "Dart" ? "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300" :
                            skill === "REST APIs" ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" :
                            "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
