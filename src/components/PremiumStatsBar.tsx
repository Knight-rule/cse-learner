"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Code, Brain, Trophy } from "lucide-react";
import { courses } from "@/data/courses";
import { practiceData } from "@/data/practice";

const totalProblems = practiceData.reduce((sum, c) => sum + c.problems.length, 0);
const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);

const stats = [
  { value: courses.length, label: "Courses", icon: BookOpen, color: "#f97316" },
  { value: totalLessons, label: "Lessons", icon: Code, color: "#a855f7" },
  { value: totalProblems, label: "Practice Problems", icon: Brain, color: "#3b82f6" },
  { value: 60, label: "Hours of Content", suffix: "+", icon: Trophy, color: "#10b981" },
];

function formatValue(value: number, suffix?: string) {
  const display = value >= 1000 ? `${Math.round(value / 1000)}K` : String(value);
  const plus = value >= 1000 ? "+" : suffix || "+";
  return display + plus;
}

export default function PremiumStatsBar() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setVisible(true); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{
      position: "relative",
      padding: "60px 0",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent, rgba(249,115,22,0.03), transparent)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative" }}>
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
            gap: 20,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} style={{
                textAlign: "center",
                padding: "32px 20px",
                borderRadius: "var(--radius-xl)",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: "20%", right: "20%", height: 2,
                  background: `linear-gradient(90deg, transparent, ${s.color}44, transparent)`,
                }} />

                <div style={{
                  width: 48, height: 48, borderRadius: "var(--radius-lg)",
                  background: `${s.color}12`,
                  border: `1px solid ${s.color}22`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                  color: s.color,
                }}>
                  <Icon size={22} />
                </div>

                <div style={{
                  fontSize: "clamp(32px, 4vw, 44px)",
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.1,
                  marginBottom: 8,
                }}>
                  {formatValue(s.value, s.suffix)}
                </div>

                <div style={{
                  fontSize: 14, fontWeight: 500,
                  color: "var(--text-secondary)",
                }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
