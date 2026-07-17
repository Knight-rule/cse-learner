import Link from "next/link";
import { ChevronRight, Code, Play } from "lucide-react";

const languages = [
  {
    slug: "python",
    name: "Python",
    icon: "🐍",
    color: "from-yellow-400 to-yellow-600",
    description: "Simple, powerful, and versatile. Great for beginners, data science, and AI.",
    useCases: ["Web Development", "Data Science", "AI/ML", "Automation", "Scripting"],
    difficulty: "Beginner-Friendly",
  },
  {
    slug: "java",
    name: "Java",
    icon: "☕",
    color: "from-red-500 to-red-700",
    description: "Enterprise-grade, platform-independent language powering large systems.",
    useCases: ["Enterprise Apps", "Android", "Web Services", "Big Data"],
    difficulty: "Intermediate",
  },
  {
    slug: "c-cpp",
    name: "C & C++",
    icon: "⚙️",
    color: "from-blue-500 to-indigo-600",
    description: "Low-level control, maximum performance. The foundation of modern computing.",
    useCases: ["Systems Programming", "Game Dev", "OS", "Embedded", "Competitive Programming"],
    difficulty: "Intermediate-Advanced",
  },
  {
    slug: "javascript",
    name: "JavaScript",
    icon: "📜",
    color: "from-yellow-400 to-amber-500",
    description: "The language of the web. Full-stack with Node.js and modern frameworks.",
    useCases: ["Web Frontend", "Backend (Node.js)", "Mobile (React Native)", "Desktop (Electron)"],
    difficulty: "Beginner-Friendly",
  },
];

const difficultyColors: Record<string, string> = {
  "Beginner-Friendly": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  "Intermediate": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
  "Intermediate-Advanced": "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
  "Advanced": "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
};

export default function LanguagesPage() {
  return (
    <div className="py-12 dark:bg-dark-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-dark-400 dark:text-dark-500 text-sm mb-6">
          <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span>Programming Languages</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/20 rounded-full px-4 py-1.5 text-sm font-medium text-primary-700 dark:text-primary-300 mb-4">
            <Code className="w-4 h-4" /> Programming Languages
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Learn to <span className="gradient-text">Code</span>
          </h1>
          <p className="text-dark-500 dark:text-dark-400 text-lg max-w-2xl">
            Master the most important programming languages for computer science. Each course includes hands-on examples and quizzes.
          </p>
        </div>

        {/* Languages Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {languages.map((lang) => (
            <Link
              key={lang.slug}
              href={`/courses/${lang.slug}`}
              className="group relative bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
            >
              {/* Color bar */}
              <div className={`h-2 bg-gradient-to-r ${lang.color}`} />

              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${lang.color} flex items-center justify-center text-3xl shadow-lg`}>
                    {lang.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[lang.difficulty] || "bg-gray-100 text-gray-700"}`}>
                    {lang.difficulty}
                  </span>
                </div>

                <h2 className="text-2xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {lang.name}
                </h2>
                <p className="text-dark-500 dark:text-dark-400 mb-6">{lang.description}</p>

                {/* Use Cases */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {lang.useCases.map((uc) => (
                    <span key={uc} className="bg-dark-50 dark:bg-dark-700 text-dark-600 dark:text-dark-300 px-3 py-1 rounded-full text-xs font-medium">
                      {uc}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium group-hover:gap-3 transition-all">
                  <Play className="w-4 h-4" />
                  Start Learning
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm overflow-hidden">
              <thead className="bg-dark-50 dark:bg-dark-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark-600 dark:text-dark-300">Language</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark-600 dark:text-dark-300">Typing</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark-600 dark:text-dark-300">Paradigm</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark-600 dark:text-dark-300">Compiled/Interpreted</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark-600 dark:text-dark-300">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-dark-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-dark-700/50">
                  <td className="px-6 py-4 font-medium">🐍 Python</td>
                  <td className="px-6 py-4 text-dark-500 dark:text-dark-400">Dynamic</td>
                  <td className="px-6 py-4 text-dark-500 dark:text-dark-400">Multi-paradigm</td>
                  <td className="px-6 py-4 text-dark-500 dark:text-dark-400">Interpreted</td>
                  <td className="px-6 py-4 text-dark-500 dark:text-dark-400">AI, Data Science, Scripting</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-dark-700/50">
                  <td className="px-6 py-4 font-medium">☕ Java</td>
                  <td className="px-6 py-4 text-dark-500 dark:text-dark-400">Static</td>
                  <td className="px-6 py-4 text-dark-500 dark:text-dark-400">OOP</td>
                  <td className="px-6 py-4 text-dark-500 dark:text-dark-400">Compiled (JVM)</td>
                  <td className="px-6 py-4 text-dark-500 dark:text-dark-400">Enterprise, Android</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-dark-700/50">
                  <td className="px-6 py-4 font-medium">⚙️ C/C++</td>
                  <td className="px-6 py-4 text-dark-500 dark:text-dark-400">Static</td>
                  <td className="px-6 py-4 text-dark-500 dark:text-dark-400">Procedural / OOP</td>
                  <td className="px-6 py-4 text-dark-500 dark:text-dark-400">Compiled</td>
                  <td className="px-6 py-4 text-dark-500 dark:text-dark-400">Systems, Game Dev, OS</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-dark-700/50">
                  <td className="px-6 py-4 font-medium">📜 JavaScript</td>
                  <td className="px-6 py-4 text-dark-500 dark:text-dark-400">Dynamic</td>
                  <td className="px-6 py-4 text-dark-500 dark:text-dark-400">Multi-paradigm</td>
                  <td className="px-6 py-4 text-dark-500 dark:text-dark-400">Interpreted (JIT)</td>
                  <td className="px-6 py-4 text-dark-500 dark:text-dark-400">Web (Frontend + Backend)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
