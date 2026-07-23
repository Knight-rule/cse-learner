"use client";

import { useEffect, useRef, useState } from "react";
import { Users, BookOpen, Brain, Trophy } from "lucide-react";

const icons = [Users, BookOpen, Brain, Trophy];

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
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

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  { value: 29, label: "Courses" },
  { value: 123, label: "Lessons" },
  { value: 334, label: "Practice Problems" },
  { value: 1500, label: "Students", suffix: "+" },
];

export default function StatsBar() {
  return (
    <section className="section" style={{ borderBottom: "1px solid var(--border)", padding: "48px 0", marginBottom: 0 }}>
      <div className="container">
        <div className="stats-bar">
          {stats.map((s, i) => (
            <StatItem key={s.label} stat={s} iconIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, iconIndex }: { stat: Stat; iconIndex: number }) {
  const { count, ref } = useCountUp(stat.value);
  const Icon = icons[iconIndex];

  return (
    <div ref={ref} className="stat-item animate-fade-in-up">
      <div className="stat-icon" style={{ color: "var(--accent)" }}>
        <Icon size={24} />
      </div>
      <div className="stat-number">
        {count >= 1000 ? `${Math.round(count / 1000)}K` : count}
        {count >= 1000 ? "+" : stat.suffix || "+"}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}
