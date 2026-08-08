"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, Zap, Code, BookOpen, Brain, Trophy, Target, GraduationCap, Rocket, Building2, Sparkles } from "lucide-react";
import { courses } from "@/data/courses";
import { companies } from "@/lib/companies";
import FloatingCodeVisual from "@/components/FloatingCodeVisual";
import PremiumStatsBar from "@/components/PremiumStatsBar";
import LearningFeatures from "@/components/LearningFeatures";

const testimonials = [
  { name: "Students & Educators", role: "CSE Community", initials: "CS", quote: "A growing collection of CS learning resources — from data structures to system design. Built by students, for students." },
  { name: "Open Curriculum", role: "Computer Science", initials: "OC", quote: `Structured lessons covering core CSE topics with hands-on code examples and practice problems across ${courses.length}+ subjects.` },
  { name: "Peer Reviewed", role: "Learning Platform", initials: "PR", quote: "Content aligned with standard university curricula. Practice problems with instant feedback to help reinforce concepts." },
];

const faqs = [
  { q: "What is CSE Learner?", a: "CSE Learner is a free, interactive learning platform designed for Computer Science students. We cover Data Structures, Algorithms, OS, DBMS, Networks, Web Development, and programming languages." },
  { q: "Do I need prior experience?", a: "No! Our courses are designed for all levels, from beginners to advanced students preparing for technical interviews." },
  { q: "Are the courses self-paced?", a: "Yes! All content is self-paced. Learn whenever you want, track your progress, and pick up where you left off." },
  { q: "Do I get a certificate?", a: "Yes! Earn certificates as you complete courses and practice challenges. Track your achievements on your dashboard." },
  { q: "Is it really free?", a: "100% free. All courses, practice problems, and features are available at no cost. No hidden fees or premium tiers." },
];

export default function HomePage() {
  return (
    <div>
      {/* ═══════════ HERO ═══════════ */}
      <section className="hero" style={{ position: "relative", overflow: "hidden", minHeight: "90vh", display: "flex", alignItems: "center" }}>
        {/* Depth layer 0: Background gradient mesh */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,94,60,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(166,123,91,0.06) 0%, transparent 50%)",
        }} />

        {/* Depth layer 1: Floating orbs */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: "10%", left: "5%",
            width: 300, height: 300,
            background: "radial-gradient(circle, rgba(139,94,60,0.10), transparent 70%)",
            borderRadius: "50%", filter: "blur(60px)",
            animation: "heroFloat 8s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", bottom: "10%", right: "10%",
            width: 250, height: 250,
            background: "radial-gradient(circle, rgba(166,123,91,0.08), transparent 70%)",
            borderRadius: "50%", filter: "blur(50px)",
            animation: "heroFloat 10s ease-in-out infinite reverse",
          }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="hero-grid">
            <div className="hero-content" style={{ animation: "fadeInUp 0.8s ease-out" }}>
              <span className="badge badge-accent" style={{ marginBottom: 24, display: "inline-flex" }}>
                <Sparkles size={12} /> Welcome to CSE Learner
              </span>
              <h1 className="heading-hero" style={{ marginBottom: 24, lineHeight: 1.1 }}>
                Master <span className="gradient-text">Computer Science</span> with Visual Learning
              </h1>
              <p className="body-lg" style={{ maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>
                Interactive lessons with concept maps, live code examples, and practice problems. Built by CSE students, for CSE students.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/courses" className="btn btn-primary" style={{ fontSize: 16, padding: "14px 28px" }}>
                  Start Learning <ArrowRight size={18} />
                </Link>
                <Link href="/practice" className="btn btn-outline" style={{ fontSize: 16, padding: "14px 28px" }}>
                  Practice Problems
                </Link>
              </div>

              {/* Trust badges */}
              <div className="trust-badges" style={{ display: "flex", gap: 24, marginTop: 40 }}>
                <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                  <BookOpen size={14} /> {courses.length} Courses
                </span>
                <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                  <Code size={14} /> 100% Free
                </span>
                <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                  <Target size={14} /> Interview Ready
                </span>
              </div>
            </div>

            <div style={{ animation: "fadeInUp 0.8s ease-out 0.2s both" }}>
              <FloatingCodeVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <PremiumStatsBar />

      {/* ═══════════ LEARNING FEATURES ═══════════ */}
      <LearningFeatures />

      {/* ═══════════ TOP COMPANIES ═══════════ */}
      <section className="section" style={{ position: "relative" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="badge badge-accent" style={{ display: "inline-flex", marginBottom: 16 }}>
              <Building2 size={14} /> Top Companies
            </span>
            <h2 className="heading-xl" style={{ marginBottom: 16 }}>
              Where Our Students <span className="gradient-text">Work &amp; Intern</span>
            </h2>
            <p className="body-lg" style={{ maxWidth: 500, margin: "0 auto" }}>
              Explore career opportunities at {companies.length}+ top tech companies.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 12,
            marginBottom: 40,
          }}>
            {companies.slice(0, 18).map((company) => (
              <a
                key={company.slug}
                href={company.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 8,
                  padding: "16px 8px",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  textDecoration: "none",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-hover)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  width={40} height={40}
                  style={{ borderRadius: 8, objectFit: "contain", background: "var(--surface)", padding: 4 }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="%23E8DFD8"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="16" font-weight="600" fill="%238B5E3C">${company.name.charAt(0)}</text></svg>`)}`;
                  }}
                />
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", textAlign: "center" }}>{company.name}</span>
              </a>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/jobs" className="btn btn-primary">
              View All {companies.length} Companies <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="badge badge-accent" style={{ display: "inline-flex", marginBottom: 16 }}>About</span>
            <h2 className="heading-xl">What We Offer</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((t) => (
              <div key={t.name} style={{
                padding: 28,
                borderRadius: "var(--radius-xl)",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                position: "relative",
              }}>
                <div style={{
                  fontSize: 48, position: "absolute", top: 16, right: 20,
                  color: "var(--accent)", opacity: 0.15, fontFamily: "'Playfair Display', Georgia, serif",
                  lineHeight: 1,
                }}>&ldquo;</div>
                <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 20, position: "relative", zIndex: 1 }}>
                  {t.quote}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "var(--radius-md)",
                    background: "var(--gradient-soft)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 700, color: "var(--accent)",
                  }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="section">
        <div className="container" style={{ maxWidth: 700 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="badge badge-accent" style={{ display: "inline-flex", marginBottom: 16 }}>FAQs</span>
            <h2 className="heading-xl">Frequently Asked Questions</h2>
          </div>
          {faqs.map((faq, i) => (
            <details key={i} style={{
              marginBottom: 12,
              borderRadius: "var(--radius-lg)",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}>
              <summary style={{
                padding: "18px 24px",
                fontSize: 16, fontWeight: 600,
                color: "var(--text-primary)",
                cursor: "pointer",
                listStyle: "none",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                {faq.q}
                <ChevronRight size={18} style={{ color: "var(--text-muted)", transition: "transform 0.3s", flexShrink: 0 }} />
              </summary>
              <div style={{ padding: "0 24px 18px", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(139,94,60,0.08), rgba(166,123,91,0.08))",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }} />
        <div className="container" style={{ position: "relative", textAlign: "center" }}>
          <span className="badge badge-accent" style={{ display: "inline-flex", marginBottom: 16 }}>Get Started</span>
          <h2 className="heading-xl" style={{ marginBottom: 16 }}>
            Ready to Master CS?
          </h2>
          <p className="body-lg" style={{ maxWidth: 500, margin: "0 auto 32px" }}>
            Start learning with visual diagrams, interactive code, and structured notes — completely free.
          </p>
          <Link href="/courses" className="btn btn-primary" style={{ fontSize: 16, padding: "16px 32px" }}>
            Start Learning <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
