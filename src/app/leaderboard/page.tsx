"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Trophy, Flame, CheckCircle2, Award, Medal } from "lucide-react";
import { practiceData } from "@/data/practice";
import { courses } from "@/data/courses";
import { getSolvedProblems, getStreak, getStats, getCertificates } from "@/lib/tracker";

interface Row {
  courseSlug: string;
  title: string;
  solved: number;
  total: number;
}

export default function LeaderboardPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [totals, setTotals] = useState({ solved: 0, total: 0 });
  const [streak, setStreak] = useState({ current: 0, longest: 0 });
  const [coursesStarted, setCoursesStarted] = useState(0);
  const [certs, setCerts] = useState(0);

  useEffect(() => {
    const solved = getSolvedProblems();
    const built: Row[] = practiceData.map((cp) => {
      const course = courses.find((c) => c.slug === cp.courseSlug);
      const s = cp.problems.filter((p) => solved.has(p.id)).length;
      return { courseSlug: cp.courseSlug, title: course?.title || cp.courseSlug, solved: s, total: cp.problems.length };
    });
    built.sort((a, b) => b.solved - a.solved || b.total - a.total);
    setRows(built);
    setTotals({
      solved: built.reduce((acc, r) => acc + r.solved, 0),
      total: built.reduce((acc, r) => acc + r.total, 0),
    });
    setStreak(getStreak());
    setCoursesStarted(getStats().coursesStarted.length);
    setCerts(getCertificates().length);
  }, []);

  return (
    <div className="section">
      <div className="container container-narrow">
        <div className="page-head">
          <span className="eyebrow">
            <Trophy size={14} /> Rankings
          </span>
          <h1 className="heading-xl">Leaderboard</h1>
          <p className="lede">
            Your standings across every course. Solve more problems to climb the board. Global, multi-user rankings
            would require an account — these are your local achievements on this device.
          </p>
        </div>

        <div className="lb-stats">
          <div className="lb-stat-card">
            <CheckCircle2 size={20} className="text-green" />
            <strong>{totals.solved}</strong>
            <span>Problems Solved</span>
          </div>
          <div className="lb-stat-card">
            <Flame size={20} className="text-accent" />
            <strong>{streak.current}</strong>
            <span>Day Streak</span>
          </div>
          <div className="lb-stat-card">
            <Trophy size={20} className="text-purple" />
            <strong>{coursesStarted}</strong>
            <span>Courses Started</span>
          </div>
          <div className="lb-stat-card">
            <Award size={20} className="text-green" />
            <strong>{certs}</strong>
            <span>Certificates</span>
          </div>
        </div>

        <div className="lb-table">
          <div className="lb-row lb-head">
            <span className="lb-rank">#</span>
            <span className="lb-course">Course</span>
            <span className="lb-score">Solved</span>
            <span className="lb-bar">Progress</span>
          </div>
          {rows.map((r, i) => (
            <Link key={r.courseSlug} href={`/practice/${r.courseSlug}`} className="lb-row">
              <span className="lb-rank">
                {i < 3 ? <Medal size={16} className={i === 0 ? "text-gold" : i === 1 ? "text-silver" : "text-bronze"} /> : i + 1}
              </span>
              <span className="lb-course">{r.title}</span>
              <span className="lb-score">{r.solved}/{r.total}</span>
              <span className="lb-bar">
                <div className="practice-progress">
                  <div
                    className="practice-progress-bar"
                    style={{ width: `${r.total ? (r.solved / r.total) * 100 : 0}%` }}
                  />
                </div>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
