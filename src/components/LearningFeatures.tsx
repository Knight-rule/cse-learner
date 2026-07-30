"use client";

import { useRef, useEffect, useState } from "react";

const features = [
  {
    icon: "📊",
    title: "Visual Concept Maps",
    desc: "Every topic broken down into interconnected concept graphs. See how data structures, algorithms, and systems link together.",
    color: "#f97316",
  },
  {
    icon: "🧩",
    title: "Interactive Diagrams",
    desc: "Hover over nodes to explore relationships. Click to dive deeper into each concept with real code examples.",
    color: "#a855f7",
  },
  {
    icon: "💻",
    title: "Live Code Examples",
    desc: "Every lesson includes runnable code. Copy, edit, and test examples directly in your browser.",
    color: "#3b82f6",
  },
  {
    icon: "📝",
    title: "Structured Notes",
    desc: "University-level notes with clear explanations, diagrams, and interview-ready insights for each topic.",
    color: "#10b981",
  },
  {
    icon: "🎯",
    title: "Practice Problems",
    desc: "From basics to advanced — solve problems with instant feedback and track your progress.",
    color: "#ec4899",
  },
  {
    icon: "🧠",
    title: "Spaced Repetition",
    desc: "Smart review system that schedules concept reviews at optimal intervals for long-term retention.",
    color: "#f97316",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        padding: 32,
        borderRadius: "var(--radius-xl)",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
      }}
    >
      {/* Corner glow */}
      <div style={{
        position: "absolute", top: -20, right: -20,
        width: 80, height: 80,
        background: `radial-gradient(circle, ${feature.color}12, transparent)`,
        borderRadius: "50%",
      }} />

      <div style={{
        width: 56, height: 56, borderRadius: "var(--radius-lg)",
        background: `${feature.color}10`,
        border: `1px solid ${feature.color}20`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 26, marginBottom: 20,
      }}>
        {feature.icon}
      </div>

      <h3 style={{
        fontSize: 18, fontWeight: 700, color: "var(--text-primary)",
        marginBottom: 10,
      }}>{feature.title}</h3>

      <p style={{
        fontSize: 14, color: "var(--text-secondary)",
        lineHeight: 1.7,
      }}>{feature.desc}</p>
    </div>
  );
}

export default function LearningFeatures() {
  return (
    <section className="section" style={{ position: "relative" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="badge badge-accent" style={{ display: "inline-flex", marginBottom: 16 }}>
            How We Teach
          </span>
          <h2 className="heading-xl" style={{ marginBottom: 16 }}>
            Learn <span className="gradient-text">Visually</span>, Build <span className="gradient-text">Practically</span>
          </h2>
          <p className="body-lg" style={{ maxWidth: 560, margin: "0 auto" }}>
            Not just text and code. We use concept maps, interactive diagrams, and structured notes to help you truly understand.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}>
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
