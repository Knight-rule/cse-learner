import Link from "next/link";
import { ChevronRight, Code, Play } from "lucide-react";

const languages = [
  {
    slug: "python",
    name: "Python",
    icon: "🐍",
    gradient: "linear-gradient(135deg, #facc15, #eab308)",
    description: "Simple, powerful, and versatile. Great for beginners, data science, and AI.",
    useCases: ["Web Development", "Data Science", "AI/ML", "Automation", "Scripting"],
    difficulty: "Beginner-Friendly",
    typing: "Dynamic",
    paradigm: "Multi-paradigm",
    compiled: "Interpreted",
    bestFor: "AI, Data Science, Scripting",
  },
  {
    slug: "java",
    name: "Java",
    icon: "☕",
    gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
    description: "Enterprise-grade, platform-independent language powering large systems.",
    useCases: ["Enterprise Apps", "Android", "Web Services", "Big Data"],
    difficulty: "Intermediate",
    typing: "Static",
    paradigm: "OOP",
    compiled: "Compiled (JVM)",
    bestFor: "Enterprise, Android",
  },
  {
    slug: "c-cpp",
    name: "C & C++",
    icon: "⚙️",
    gradient: "linear-gradient(135deg, #3b82f6, #4f46e5)",
    description: "Low-level control, maximum performance. The foundation of modern computing.",
    useCases: ["Systems Programming", "Game Dev", "OS", "Embedded", "Competitive Programming"],
    difficulty: "Intermediate-Advanced",
    typing: "Static",
    paradigm: "Procedural / OOP",
    compiled: "Compiled",
    bestFor: "Systems, Game Dev, OS",
  },
  {
    slug: "javascript",
    name: "JavaScript",
    icon: "📜",
    gradient: "linear-gradient(135deg, #facc15, #f59e0b)",
    description: "The language of the web. Full-stack with Node.js and modern frameworks.",
    useCases: ["Web Frontend", "Backend (Node.js)", "Mobile (React Native)", "Desktop (Electron)"],
    difficulty: "Beginner-Friendly",
    typing: "Dynamic",
    paradigm: "Multi-paradigm",
    compiled: "Interpreted (JIT)",
    bestFor: "Web (Frontend + Backend)",
  },
];

const difficultyBadge: Record<string, string> = {
  "Beginner-Friendly": "badge-green",
  "Intermediate": "badge-amber",
  "Intermediate-Advanced": "badge-purple",
};

export default function LanguagesPage() {
  return (
    <div className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <span>Programming Languages</span>
        </div>

        <div className="mb-12">
          <span className="badge badge-cyan mb-4" style={{ display: "inline-flex", marginBottom: 16 }}>
            <Code size={14} /> Programming Languages
          </span>
          <h1 className="heading-xl mb-4">
            Learn to <span className="gradient-text">Code</span>
          </h1>
          <p className="body-lg" style={{ maxWidth: 560 }}>
            Master the most important programming languages for computer science.
          </p>
        </div>

        <div className="grid grid-2" style={{ gap: 24 }}>
          {languages.map((lang) => (
            <Link
              key={lang.slug}
              href={"/courses/" + lang.slug}
              className="glass glow-border"
              style={{ overflow: "hidden", display: "block" }}
            >
              <div style={{ height: 4, background: lang.gradient }} />
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "var(--radius-lg)",
                      background: lang.gradient,
                      fontSize: 32,
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    {lang.icon}
                  </div>
                  <span className={"badge " + (difficultyBadge[lang.difficulty] || "badge-cyan")}>
                    {lang.difficulty}
                  </span>
                </div>

                <h2 className="heading-md mb-2">{lang.name}</h2>
                <p className="body-md mb-6">{lang.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {lang.useCases.map((uc) => (
                    <span key={uc} className="badge" style={{ background: "var(--surface)", color: "var(--text-secondary)" }}>
                      {uc}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2" style={{ color: "var(--accent-cyan)", fontWeight: 600, fontSize: 14 }}>
                  <Play size={14} />
                  Start Learning
                  <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-12">
          <h2 className="heading-lg text-center mb-8">Quick Comparison</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Language</th>
                  <th>Typing</th>
                  <th>Paradigm</th>
                  <th>Compiled/Interpreted</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                {languages.map((l) => (
                  <tr key={l.slug}>
                    <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{l.icon} {l.name}</td>
                    <td>{l.typing}</td>
                    <td>{l.paradigm}</td>
                    <td>{l.compiled}</td>
                    <td>{l.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
