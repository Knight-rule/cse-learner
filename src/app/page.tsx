import Link from "next/link";
import { ArrowRight, BookOpen, Code, Brain, Zap, ChevronRight } from "lucide-react";
import { courses } from "@/data/courses";

const features = [
  { icon: BookOpen, title: "Structured Courses", desc: "6 core CSE topics with detailed lessons" },
  { icon: Code, title: "Code Examples", desc: "Every lesson includes practical code snippets" },
  { icon: Brain, title: "Interactive Quizzes", desc: "Test your knowledge with instant feedback" },
  { icon: Zap, title: "Learn at Your Pace", desc: "Progress through topics at your own speed" },
];

export default function HomePage() {
  return (
    <div className="premium-design">
      {/* Premium Hero Section */}
      <section className="premium-hero">
        <div className="premium-container">
          <div className="premium-hero-content">
            <div className="premium-caption">Free Learning Platform</div>
            <h1 className="premium-hero-title">
              Master Computer Science
              <span className="block text-blue">One Topic at a Time</span>
            </h1>
            <p className="premium-hero-subtitle">
              Interactive lessons, real code examples, and quizzes to help CSE students
              ace their courses and crack technical interviews.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/courses"
                className="premium-btn"
              >
                Start Learning →
              </Link>
              <Link
                href="/quiz"
                className="premium-btn secondary"
              >
                Take a Quiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 bg-white">
        <div className="premium-container">
          <div className="text-center mb-16">
            <div className="premium-caption mb-4">Platform Features</div>
            <h2 className="premium-heading lg">Everything You Need</h2>
            <p className="premium-body text-light max-w-2xl mx-auto">
              A complete learning platform designed for CSE students
            </p>
          </div>
          <div className="premium-features-grid">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="premium-feature-card">
                  <div className="premium-feature-icon">
                    <Icon />
                  </div>
                  <h3 className="premium-heading sm mb-2">{f.title}</h3>
                  <p className="premium-body text-light text-sm">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Courses Section */}
      <section className="py-20 bg-light">
        <div className="premium-container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="premium-heading lg mb-2">Core Courses</h2>
              <p className="premium-body text-light">Master the fundamentals of CS</p>
            </div>
            <Link href="/courses" className="premium-btn secondary">
              View All Courses
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="premium-course-card"
                style={{ '--course-color-start': course.color.split(' ')[0], '--course-color-end': course.color.split(' ')[1] } as any}
              >
                <div className="premium-course-thumbnail">
                  {course.icon}
                </div>
                <div className="premium-course-content">
                  <h3 className="premium-heading sm mb-2 group-hover:text-blue transition-colors">{course.title}</h3>
                  <p className="premium-body text-light text-sm mb-4">{course.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-light">{course.lessons.length} lessons</span>
                    <span className="text-blue font-medium flex items-center gap-1">
                      Start →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-20">
        <div className="premium-container">
          <div className="premium-cta">
            <div className="premium-cta-content">
              <h2 className="premium-cta-title">Ready to Level Up?</h2>
              <p className="premium-cta-subtitle">
                Start with any course and track your progress. All content is free and open.
              </p>
              <Link
                href="/courses"
                className="premium-btn"
                style={{ background: 'white', color: '#007aff' }}
              >
                Browse All Courses →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
