"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Award, ArrowRight, Pencil, Lock } from "lucide-react";
import { courses } from "@/data/courses";
import { practiceData } from "@/data/practice";
import { getSolvedProblems, awardCertificate, getCertificates, getLearnerName, setLearnerName } from "@/lib/tracker";

interface CourseProgress {
  slug: string;
  title: string;
  icon: string;
  color: string;
  total: number;
  solved: number;
  earned: boolean;
}

export default function CertificatesPage() {
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [certs, setCerts] = useState<{ courseSlug: string; title: string; issuedAt: number }[]>([]);
  const [name, setName] = useState("CSE Learner");
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");

  useEffect(() => {
    const s = getSolvedProblems();
    setSolved(s);
    const earned = getCertificates();
    setCerts(earned);
    const n = getLearnerName();
    setName(n);
    setNameDraft(n);
  }, []);

  const progress = useMemo<CourseProgress[]>(() => {
    return practiceData
      .map((cp) => {
        const course = courses.find((c) => c.slug === cp.courseSlug);
        if (!course) return null;
        const total = cp.problems.length;
        const solvedCount = cp.problems.filter((p) => solved.has(p.id)).length;
        const earned = total > 0 && solvedCount === total;
        if (earned) awardCertificate(cp.courseSlug, course.title);
        return {
          slug: cp.courseSlug,
          title: course.title,
          icon: course.icon,
          color: course.color.split(" ")[0] || "#f97316",
          total,
          solved: solvedCount,
          earned,
        } as CourseProgress;
      })
      .filter((c): c is CourseProgress => c !== null);
  }, [solved]);

  const earned = progress.filter((p) => p.earned);
  const inProgress = progress.filter((p) => !p.earned && p.solved > 0).sort((a, b) => b.solved / b.total - a.solved / a.total);
  const notStarted = progress.filter((p) => p.solved === 0);

  const saveName = () => {
    setLearnerName(nameDraft);
    setName(nameDraft.trim() || "CSE Learner");
    setEditingName(false);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <span>Certificates</span>
        </div>

        <span className="badge badge-accent mb-4" style={{ display: "inline-flex" }}><Award size={14} /> Certificates</span>
        <h1 className="heading-xl mb-4">
          Your <span className="gradient-text">Certificates</span>
        </h1>
        <p className="body-lg mb-8" style={{ maxWidth: 600 }}>
          Earn a certificate of completion for every course by solving all its practice problems. Showcase your CS mastery.
        </p>

        {/* Learner name */}
        <div className="cert-name-bar">
          <div className="flex items-center gap-3">
            <div className="cert-avatar">{name.charAt(0).toUpperCase()}</div>
            {editingName ? (
              <div className="flex items-center gap-2">
                <input
                  className="cert-name-input"
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveName()}
                  autoFocus
                />
                <button className="practice-toolbar-btn" onClick={saveName}>Save</button>
                <button className="practice-toolbar-btn" onClick={() => { setEditingName(false); setNameDraft(name); }}>Cancel</button>
              </div>
            ) : (
              <div>
                <p className="heading-sm">{name}</p>
                <p className="body-sm">{earned.length} certificate{earned.length === 1 ? "" : "s"} earned</p>
              </div>
            )}
          </div>
          {!editingName && (
            <button className="practice-toolbar-btn" onClick={() => setEditingName(true)}>
              <Pencil size={14} /> Edit Name
            </button>
          )}
        </div>

        {earned.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🎓</div>
            <h2 className="heading-md mb-2">No certificates yet</h2>
            <p className="body-md mb-6" style={{ maxWidth: 420, margin: "0 auto 24px" }}>
              Solve every practice problem in a course to unlock its certificate. Pick a course below to get started.
            </p>
          </div>
        )}

        {/* Earned certificates */}
        {earned.length > 0 && (
          <div className="mb-12">
            <h2 className="heading-md mb-6 flex items-center gap-2"><Award size={20} style={{ color: "var(--accent)" }} /> Earned Certificates</h2>
            <div className="cert-grid">
              {earned.map((c) => (
                <div key={c.slug} className="cert-card" style={{ borderColor: c.color + "55" }}>
                  <div className="cert-card-top" style={{ background: "linear-gradient(135deg, " + c.color + "22, transparent)" }}>
                    <span style={{ fontSize: 34 }}>{c.icon}</span>
                    <Award size={22} style={{ color: c.color }} />
                  </div>
                  <span className="badge badge-green" style={{ fontSize: 10, marginBottom: 8 }}>Completed</span>
                  <h3 className="heading-sm">{c.title}</h3>
                  <p className="body-sm mb-4">Certificate of Completion</p>
                  <Link href={"/certificates/" + c.slug} className="btn btn-primary course-card-start">
                    View &amp; Print
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* In progress */}
        {inProgress.length > 0 && (
          <div className="mb-12">
            <h2 className="heading-md mb-6">In Progress</h2>
            <div className="lesson-list">
              {inProgress.map((c) => {
                const pct = Math.round((c.solved / c.total) * 100);
                return (
                  <div key={c.slug} className="cert-progress-row">
                    <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: c.color + "20", color: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                      {c.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="heading-sm">{c.title}</h3>
                        <span className="body-sm">{c.solved}/{c.total} · {pct}%</span>
                      </div>
                      <div className="progress-bar mt-2">
                        <div className="progress-fill" style={{ width: pct + "%" }} />
                      </div>
                    </div>
                    <Link href={"/practice/" + c.slug} className="btn btn-outline btn-sm" style={{ display: "inline-flex" }}>
                      Continue <ArrowRight size={14} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Not started */}
        {notStarted.length > 0 && (
          <div>
            <h2 className="heading-md mb-6 flex items-center gap-2"><Lock size={18} style={{ color: "var(--text-muted)" }} /> Start a Course</h2>
            <div className="cert-grid">
              {notStarted.map((c) => (
                <Link key={c.slug} href={"/practice/" + c.slug} className="cert-card cert-card-locked" style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="cert-card-top">
                    <span style={{ fontSize: 34, opacity: 0.7 }}>{c.icon}</span>
                    <Lock size={20} style={{ color: "var(--text-muted)" }} />
                  </div>
                  <h3 className="heading-sm">{c.title}</h3>
                  <p className="body-sm">{c.total} problems to solve</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
