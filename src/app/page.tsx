import Link from "next/link";
import { ArrowRight, ChevronRight, Users, GraduationCap, BookOpen, Trophy, Zap, Target, Award, Globe, Laptop, Briefcase } from "lucide-react";
import { courses } from "@/data/courses";

const features = [
  { icon: "🎓", title: "Expert Led Learning", desc: "Lessons designed by CS professionals and educators." },
  { icon: "💻", title: "Hands On Projects", desc: "Build real projects with practical code examples." },
  { icon: "📜", title: "Learn Certification", desc: "Earn certificates as you complete each course." },
  { icon: "⏱️", title: "Flexible Learning", desc: "Study at your own pace, anytime, anywhere." },
  { icon: "📚", title: "Up to Date Curriculum", desc: "Content aligned with current industry standards." },
  { icon: "🚀", title: "Career & Networking", desc: "Prepare for interviews and connect with peers." },
];

const testimonials = [
  { name: "Sarah Mitchell", role: "Software Engineer", initials: "SM", quote: "CSE Learner helped me ace my data structures interview. The interactive quizzes and code examples are incredibly useful." },
  { name: "James Carter", role: "CS Student", initials: "JC", quote: "Best free platform for learning algorithms. The step-by-step lessons made complex topics easy to understand." },
  { name: "Amina Hassan", role: "Backend Developer", initials: "AH", quote: "I went from struggling with OS concepts to confidently explaining process scheduling. Highly recommend!" },
];

const stats = [
  { icon: "👨‍🎓", value: "10K+", label: "Students" },
  { icon: "👩‍🏫", value: "50+", label: "Mentors" },
  { icon: "📖", value: "200+", label: "Lessons" },
  { icon: "🏆", value: "5K+", label: "Certificates" },
];

const faqs = [
  { q: "What is CSE Learner?", a: "CSE Learner is a free, interactive learning platform designed for Computer Science students. We cover Data Structures, Algorithms, OS, DBMS, Networks, Web Development, and programming languages." },
  { q: "Do I need prior experience?", a: "No! Our courses are designed for all levels, from beginners to advanced students preparing for technical interviews." },
  { q: "Are the courses self-paced?", a: "Yes! All content is self-paced. Learn whenever you want, track your progress, and pick up where you left off." },
  { q: "Do I get a certificate?", a: "Yes! Earn certificates as you complete courses and pass quizzes. Track your achievements on your dashboard." },
  { q: "Is it really free?", a: "100% free. All courses, quizzes, and features are available at no cost. No hidden fees or premium tiers." },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content animate-fade-in-up">
              <span className="badge badge-accent" style={{ marginBottom: 24, display: "inline-flex" }}>
                <Zap size={12} /> Welcome to CSE Learner
              </span>
              <h1 className="heading-hero mb-6">
                Empowering the Future with <span className="gradient-text">CS Education</span>
              </h1>
              <p className="body-lg mb-8" style={{ maxWidth: 520 }}>
                Interactive lessons, real code examples, and quizzes to help CSE students master fundamentals and crack technical interviews.
              </p>
              <div className="flex gap-4" style={{ flexWrap: "wrap" }}>
                <Link href="/courses" className="btn btn-primary">
                  Free Trial <ArrowRight size={16} />
                </Link>
                <Link href="/courses" className="btn btn-outline">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="hero-visual animate-fade-in-up delay-2">
              <div className="hero-image-placeholder">
                {"{ code }"}
              </div>
              <div className="hero-float" style={{ top: "10%", right: "5%", animationDelay: "0s" }}>{"</>"}</div>
              <div className="hero-float" style={{ bottom: "15%", left: "0%", animationDelay: "2s" }}>{"{ }"}</div>
              <div className="hero-float" style={{ top: "50%", right: "-5%", animationDelay: "4s" }}>[]</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="section-sm" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="stats-bar">
            {stats.map((s) => (
              <div key={s.label} className="stat-item animate-fade-in-up">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-number">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div className="animate-fade-in-up">
              <span className="badge badge-accent mb-4" style={{ display: "inline-flex" }}>About CSE Learner</span>
              <h2 className="heading-xl mb-4">
                Empowering Minds, Transforming the Future
              </h2>
              <p className="body-lg mb-6">
                We provide structured, interactive courses that help computer science students build strong foundations and excel in their careers.
              </p>
              <ul style={{ listStyle: "none", marginBottom: 32 }}>
                {["Comprehensive CSE curriculum from basics to advanced", "Interactive code examples and hands-on practice", "Quizzes with instant feedback to track your progress"].map((item) => (
                  <li key={item} style={{ padding: "8px 0", fontSize: 15, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/courses" className="btn btn-primary">
                Discover More <ArrowRight size={16} />
              </Link>
            </div>
            <div className="animate-fade-in-up delay-2">
              <div className="hero-image-placeholder" style={{ maxWidth: "100%", aspectRatio: "4/3" }}>
                🎓
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-4" style={{ display: "inline-flex" }}>Featured Class</span>
            <h2 className="heading-xl mb-4">
              Innovate &amp; Learn <span className="gradient-text">Featured CS Courses</span>
            </h2>
            <p className="body-lg mx-auto" style={{ maxWidth: 560 }}>
              From fundamentals to advanced topics — master the skills that matter most.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {courses.slice(0, 3).map((course) => {
              const colors = course.color.split(" ");
              const instructorNames = ["Dr. Emily Carter", "Michael Chen", "David Richardson"];
              const instructorRoles = ["CS Research Scientist", "Algorithms Expert", "Systems Architect"];
              const idx = courses.indexOf(course);
              return (
                <div key={course.slug} className="course-card-aiv glass-card-glow">
                  <div className="course-price gradient-text">Free</div>
                  <h3 className="course-title">{course.title}</h3>
                  <ul className="course-features">
                    {course.lessons.slice(0, 3).map((l) => (
                      <li key={l.id}>{l.title}</li>
                    ))}
                  </ul>
                  <div className="course-instructor">
                    <div className="instructor-avatar">{instructorNames[idx]?.[0] || "I"}</div>
                    <div>
                      <div className="instructor-name">{instructorNames[idx]}</div>
                      <div className="instructor-role">{instructorRoles[idx]}</div>
                    </div>
                  </div>
                  <Link href={"/courses/" + course.slug} className="btn btn-primary w-full justify-center" style={{ marginTop: 20 }}>
                    Start Learning <ChevronRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="text-center" style={{ marginTop: 40 }}>
            <Link href="/courses" className="btn btn-outline">
              View All Courses <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-4" style={{ display: "inline-flex" }}>Why Choose Us</span>
            <h2 className="heading-xl mb-4">
              Elevate Your CS Skills with the Best
            </h2>
          </div>
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-item">
                <div className="feature-icon-wrap">{f.icon}</div>
                <h3 className="heading-sm mb-2">{f.title}</h3>
                <p className="body-md">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-4" style={{ display: "inline-flex" }}>Testimonials</span>
            <h2 className="heading-xl mb-4">Real Stories, Real Impact</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card">
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-sm">
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-4" style={{ display: "inline-flex" }}>FAQs</span>
            <h2 className="heading-xl mb-4">Frequently Asked Questions</h2>
          </div>
          {faqs.map((faq, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-question">{faq.q}</summary>
              <div className="faq-answer">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container">
          <div className="cta-section">
            <span className="badge badge-accent mb-4" style={{ display: "inline-flex", position: "relative", zIndex: 2 }}>Get Started</span>
            <h2 className="heading-xl mb-4" style={{ position: "relative", zIndex: 2 }}>
              CS is the Future. Be a Part of It!
            </h2>
            <p className="body-lg mb-8 mx-auto" style={{ maxWidth: 500, position: "relative", zIndex: 2 }}>
              Join thousands of students mastering computer science concepts and landing their dream tech jobs.
            </p>
            <Link href="/courses" className="btn btn-primary" style={{ position: "relative", zIndex: 2 }}>
              Join Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
