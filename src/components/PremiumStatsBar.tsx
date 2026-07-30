"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Code, Brain, Trophy, Sparkles, TrendingUp } from "lucide-react";
import { courses } from "@/data/courses";
import { practiceData } from "@/data/practice";

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(target);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setCount(0);
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const totalProblems = practiceData.reduce((sum, c) => sum + c.problems.length, 0);
const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);

const stats = [
  { value: courses.length, label: "Courses", icon: BookOpen, color: "#f97316" },
  { value: totalLessons, label: "Lessons", icon: Code, color: "#a855f7" },
  { value: totalProblems, label: "Practice Problems", icon: Brain, color: "#3b82f6" },
  { value: 60, label: "Hours of Content", suffix: "+", icon: Trophy, color: "#10b981" },
];

export default function PremiumStatsBar() {
  return (
    <section style={{
      position: "relative",
      padding: "60px 0",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent, rgba(249,115,22,0.03), transparent)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
        }}>
          {stats.map((s, i) => {
            const { count, ref } = useCountUp(s.value);
            const Icon = s.icon;
            return (
              <div key={s.label} ref={ref} style={{
                textAlign: "center",
                padding: "32px 20px",
                borderRadius: "var(--radius-xl)",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Top gradient line */}
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
                  {count >= 1000 ? `${Math.round(count / 1000)}K` : count}
                  {count >= 1000 ? "+" : s.suffix || "+"}
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
