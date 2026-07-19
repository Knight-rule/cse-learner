import Link from "next/link";
import { ArrowRight, BookOpen, Code, Brain, Zap, ChevronRight } from "lucide-react";
import { courses } from "@/data/courses";

const features = [
  { icon: BookOpen, title: "Structured Courses", desc: "Core CSE topics with detailed, progressive lessons.", color: "var(--accent-cyan)" },
  { icon: Code, title: "Code Examples", desc: "Every lesson includes practical, runnable code snippets.", color: "var(--accent-purple)" },
  { icon: Brain, title: "Interactive Quizzes", desc: "Test your knowledge with instant feedback and scoring.", color: "var(--accent-pink)" },
  { icon: Zap, title: "Learn at Your Pace", desc: "Track progress and move through topics at your speed.", color: "var(--accent-amber)" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-float" style={{ top: "15%", left: "8%", animationDelay: "0s" }}>{"{ }"}</div>
        <div className="hero-float" style={{ top: "25%", right: "10%", animationDelay: "2s" }}>{"/>"}</div>
        <div className="hero-float" style={{ bottom: "20%", left: "15%", animationDelay: "4s" }}>{"</>"}</div>
        <div className="hero-float" style={{ bottom: "30%", right: "12%", animationDelay: "1s" }}>{"[]"}</div>

        <div className="container">
          <div className="hero-badge animate-fade-in-up">
            <Zap size={14} /> Free Learning Platform
          </div>
          <h1 className="hero-title animate-fade-in-up animate-delay-1">
            Master<br />
            <span className="gradient-text">Computer Science</span>
          </h1>
          <p className="hero-sub animate-fade-in-up animate-delay-2">
            Interactive lessons, real code examples, and quizzes to help CSE students ace their courses and crack technical interviews.
          </p>
          <div className="hero-actions animate-fade-in-up animate-delay-3">
            <Link href="/courses" className="btn btn-primary">
              Start Learning <ArrowRight size={16} />
            </Link>
            <Link href="/quiz" className="btn btn-secondary">
              Quick Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">
              Everything You <span className="gradient-text">Need</span>
            </h2>
            <p className="body-lg" style={{ maxWidth: 520, margin: "0 auto" }}>
              A complete learning platform designed for CSE students
            </p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className={"feature-card animate-fade-in-up animate-delay-" + (i + 1)}>
                  <div className="feature-icon" style={{ background: f.color + "15" }}>
                    <Icon size={22} style={{ color: f.color }} />
                  </div>
                  <h3 className="heading-sm mb-2">{f.title}</h3>
                  <p className="body-md">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="heading-lg mb-2">
                Core <span className="gradient-text">Courses</span>
              </h2>
              <p className="body-md">Master the fundamentals of CS</p>
            </div>
            <Link href="/courses" className="btn btn-secondary" style={{ display: "inline-flex" }}>
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="courses-grid">
            {courses.slice(0, 6).map((course) => {
              const colors = course.color.split(" ");
              return (
                <Link
                  key={course.slug}
                  href={"/courses/" + course.slug}
                  className="course-card glow-border"
                >
                  <div
                    className="course-thumb"
                    style={{ background: "linear-gradient(135deg, " + colors[0] + ", " + (colors[1] || colors[0]) + ")" }}
                  >
                    <span>{course.icon}</span>
                  </div>
                  <div className="course-body">
                    <h3 className="heading-sm mb-2">{course.title}</h3>
                    <p className="body-md" style={{ marginBottom: 16 }}>{course.description}</p>
                    <div className="course-meta">
                      <span className="body-sm">{course.lessons.length} lessons</span>
                      <span className="badge badge-cyan">
                        Start <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta">
            <h2 className="heading-lg mb-4" style={{ position: "relative", zIndex: 2 }}>
              Ready to Code Your Success?
            </h2>
            <p className="body-lg mb-6" style={{ position: "relative", zIndex: 2, maxWidth: 480, margin: "0 auto 32px" }}>
              Join thousands of students mastering CS concepts and landing their dream tech jobs.
            </p>
            <Link
              href="/courses"
              className="btn btn-primary"
              style={{ position: "relative", zIndex: 2 }}
            >
              Start Learning Journey <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
