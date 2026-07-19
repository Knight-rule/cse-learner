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
    <div className="premium-vibrant-design">
      {/* Vibrant Premium Hero Section */}
      <section className="premium-hero vibrant">
        <div className="premium-container">
          <div className="premium-hero-content">
            <div className="premium-caption mb-4" style={{ color: '#ff6b6b', fontWeight: '700' }}>🚀 Learn. Code. Grow.</div>
            <h1 className="premium-hero-title">
              Master Computer Science
              <span className="block" style={{ color: '#4ecdc4' }}>One Topic at a Time</span>
            </h1>
            <p className="premium-hero-subtitle">
              Build real-world skills, crack technical interviews, and level up your coding game with interactive lessons, quizzes, and hands-on projects!
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/courses"
                className="premium-btn"
                style={{ 
                  background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
                  boxShadow: '0 8px 24px rgba(255, 107, 107, 0.3)',
                  borderRadius: '12px'
                }}
              >
                🚀 Start Learning Now →
              </Link>
              <Link
                href="/quiz"
                className="premium-btn secondary"
                style={{ 
                  borderColor: '#ffb347',
                  color: '#ffb347',
                  background: 'rgba(255, 179, 71, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                🧠 Quick Quiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vibrant Features Section */}
      <section className="py-20 bg-white">
        <div className="premium-container">
          <div className="text-center mb-16">
            <div className="premium-caption mb-4" style={{ color: '#9c27b0' }}>🔥 Hot Features</div>
            <h2 className="premium-heading lg mb-4">
              Why You'll <span style={{ color: '#ff6b6b' }}>Love</span> This Platform
            </h2>
            <p className="premium-body text-light max-w-2xl mx-auto">
              Experience learning that's engaging, interactive, and designed for success in tech interviews!
            </p>
          </div>
          <div className="premium-features-grid">
            {features.map((f) => {
              const Icon = f.icon;
              const colors = ['rgba(255, 107, 107, 0.1)', 'rgba(78, 205, 196, 0.1)', 'rgba(155, 39, 176, 0.1)', 'rgba(255, 179, 71, 0.1)'];
              return (
                <div key={f.title} className="premium-feature-card">
                  <div className="premium-feature-icon" style={{ background: colors[Math.floor(Math.random() * colors.length)] }}>
                    <Icon style={{ color: colors[Math.floor(Math.random() * colors.length)].replace('0.1', '0.8') }} />                  </div>
                  <h3 className="premium-heading sm mb-2" style={{ color: '#1d1d1f' }}>{f.title}</h3>
                  <p className="premium-body text-light text-sm" style={{ color: '#48484a' }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vibrant Courses Section */}
      <section className="py-20 bg-light">
        <div className="premium-container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="premium-heading lg mb-2">
                Dive into <span style={{ color: '#ff6b6b' }}>CS Mastery</span>
              </h2>
              <p className="premium-body text-light">
                From fundamentals to advanced topics - all in one place!
              </p>
            </div>
            <Link href="/courses" className="premium-btn secondary" style={{ 
              background: 'rgba(255, 107, 107, 0.1)',
              borderColor: '#ff6b6b',
              color: '#ff6b6b'
            }}>
              🎓 Explore All Courses
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const colors = course.color.split(' ');
              const gradients = [
                'linear-gradient(135deg, #ff6b6b, #ff8e53)',
                'linear-gradient(135deg, #4ecdc4, #45b7aa)',
                'linear-gradient(135deg, #9c27b0, #8e24aa)',
                'linear-gradient(135deg, #ffb347, #ffa726)',
                'linear-gradient(135deg, #42a5f5, #2196f3)',
                'linear-gradient(135deg, #66bb6a, #4caf50)'
              ];
              return (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="premium-course-card"
                  style={{ 
                    '--course-color-start': colors[0], 
                    '--course-color-end': colors[1] 
                  } as any}
                >
                  <div className="premium-course-thumbnail">
                    <span style={{ fontSize: '48px', animation: 'pulse 2s infinite' }}>{course.icon}</span>
                  </div>
                  <div className="premium-course-content">
                    <h3 className="premium-heading sm mb-2" style={{ color: '#1d1d1f' }}>{course.title}</h3>
                    <p className="premium-body text-light text-sm mb-4" style={{ color: '#48484a' }}>{course.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-light" style={{ color: '#86868b' }}>{course.lessons.length} lessons</span>
                      <span className="text-blue font-medium flex items-center gap-1" style={{ color: '#ff6b6b' }}>
                        🚀 Start <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vibrant CTA Section */}
      <section className="py-20">
        <div className="premium-container">
          <div className="premium-cta" style={{ 
            background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #ffb347)',
            boxShadow: '0 20px 48px rgba(255, 107, 107, 0.3)'
          }}>
            <div className="premium-cta-content">
              <h2 className="premium-cta-title" style={{ color: 'white' }}>
                🚀 Ready to Code Your Success?
              </h2>
              <p className="premium-cta-subtitle" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                Join thousands of students mastering CS concepts and landing their dream tech jobs!
              </p>
              <Link
                href="/courses"
                className="premium-btn"
                style={{ 
                  background: 'white',
                  color: '#ff6b6b',
                  fontWeight: '700',
                  borderRadius: '12px'
                }}
              >
                🎯 Start Learning Journey →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
