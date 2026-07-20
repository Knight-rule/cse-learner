import Link from "next/link";
import { ChevronRight, ArrowRight, BookOpen, Code, Brain, Users, Trophy, Target } from "lucide-react";

const team = [
  { name: "Built by Students", role: "For Students", icon: "👩‍💻" },
  { name: "Open Source", role: "Community Driven", icon: "🌍" },
  { name: "Always Free", role: "No Hidden Fees", icon: "🎯" },
];

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <span>About</span>
        </div>

        {/* Hero */}
        <div className="text-center mb-16">
          <span className="badge badge-accent mb-4" style={{ display: "inline-flex" }}>About Us</span>
          <h1 className="heading-xl mb-4">
            Empowering Minds, <span className="gradient-text">Transforming the Future</span>
          </h1>
          <p className="body-lg mx-auto" style={{ maxWidth: 600 }}>
            CSE Learner was created with one mission: make high-quality computer science education accessible to every student, everywhere.
          </p>
        </div>

        {/* Mission */}
        <div className="about-mission-grid" style={{ marginBottom: 100 }}>
          <div>
            <span className="badge badge-accent mb-4" style={{ display: "inline-flex" }}>Our Mission</span>
            <h2 className="heading-lg mb-4">Why We Built This</h2>
            <p className="body-lg mb-6">
              As CS students ourselves, we know how hard it is to find quality, free resources for learning data structures, algorithms, and core CS concepts. Most platforms lock content behind paywalls or scatter it across dozens of sites.
            </p>
            <p className="body-md">
              We built CSE Learner to be the one place where any student can learn, practice, and master the fundamentals — completely free.
            </p>
          </div>
          <div style={{
            width: "100%", aspectRatio: "4/3", borderRadius: "var(--radius-2xl)",
            background: "linear-gradient(135deg, rgba(249, 115, 22, 0.08), rgba(168, 85, 247, 0.08))",
            border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72
          }}>
            🎯
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-4" style={{ display: "inline-flex" }}>Our Values</span>
            <h2 className="heading-xl mb-4">What Drives Us</h2>
          </div>
          <div className="features-grid">
            {[
              { icon: <BookOpen size={28} />, title: "Quality Content", desc: "Every lesson is carefully crafted with clear explanations, real code examples, and practical exercises." },
              { icon: <Code size={28} />, title: "Learn by Doing", desc: "Interactive code examples and practice problems ensure you actually understand the concepts, not just memorize them." },
              { icon: <Brain size={28} />, title: "Interview Ready", desc: "Our curriculum is aligned with what top tech companies ask in their coding interviews." },
              { icon: <Users size={28} />, title: "Student First", desc: "Built by students, for students. We understand the struggles and design for them." },
              { icon: <Trophy size={28} />, title: "Track Progress", desc: "Dashboards, bookmarks, and certificates help you see how far you've come." },
              { icon: <Target size={28} />, title: "Always Free", desc: "No premium tiers, no paywalls. Every feature is available to everyone." },
            ].map((v) => (
              <div key={v.title} className="feature-item">
                <div className="feature-icon-wrap" style={{ color: "var(--accent)" }}>{v.icon}</div>
                <h3 className="heading-sm mb-2">{v.title}</h3>
                <p className="body-md">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section">
          <h2 className="heading-lg mb-4" style={{ position: "relative", zIndex: 2 }}>Ready to Start Learning?</h2>
          <p className="body-lg mb-6 mx-auto" style={{ maxWidth: 480, position: "relative", zIndex: 2 }}>
            Join thousands of students already mastering computer science.
          </p>
          <Link href="/courses" className="btn btn-primary" style={{ position: "relative", zIndex: 2 }}>
            Browse Courses <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
