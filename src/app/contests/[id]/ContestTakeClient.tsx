"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Trophy, Clock, CheckCircle2, Circle, Flag, ExternalLink, Lock } from "lucide-react";
import { getContestStatus, type ContestStatus } from "@/data/contests";
import { getSolvedProblems, saveContestResult, getContestResult } from "@/lib/tracker";

export interface ContestProblemView {
  courseSlug: string;
  problemId: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  courseTitle: string;
  href: string;
}

export interface ContestView {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  startsAt: string;
}

function formatRemaining(ms: number): string {
  if (ms <= 0) return "0s";
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m ${sec}s`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}

const STATUS_LABEL: Record<ContestStatus, string> = {
  live: "Live Now",
  upcoming: "Starts Soon",
  past: "Ended",
};

export default function ContestTakeClient({ contest, problems }: { contest: ContestView; problems: ContestProblemView[] }) {
  const [now, setNow] = useState<number>(() => Date.now());
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const status = useMemo(() => getContestStatus(contest, now), [contest, now]);
  const start = new Date(contest.startsAt).getTime();
  const end = start + contest.durationMinutes * 60_000;
  const remaining = status === "live" ? end - now : start - now;

  const solved = useMemo(() => {
    const set = getSolvedProblems();
    return problems.filter((p) => set.has(p.problemId)).length;
  }, [problems, now, done]);

  const saved = getContestResult(contest.id);
  const best = saved ? saved.solved : 0;

  const finish = () => {
    saveContestResult({ contestId: contest.id, solved, total: problems.length, completedAt: Date.now() });
    setDone(true);
  };

  return (
    <div className="section">
      <div className="container container-narrow">
        <div className="contest-detail-head">
          <div>
            <span className={`contest-badge contest-${status}`}>{STATUS_LABEL[status]}</span>
            <h1 className="heading-lg mt-3">{contest.title}</h1>
            <p className="contest-desc mt-2">{contest.description}</p>
          </div>
          {status !== "past" && (
            <div className="contest-timer">
              <Clock size={16} />
              <span>{status === "live" ? "Ends in" : "Starts in"}</span>
              <strong>{formatRemaining(remaining)}</strong>
            </div>
          )}
        </div>

        <div className="contest-progress-card">
          <div className="contest-progress-row">
            <span>
              <Trophy size={16} /> Solved {solved} / {problems.length}
            </span>
            <span className="contest-meta">
              {best > 0 ? `Best: ${best} / ${problems.length}` : "Not attempted yet"}
            </span>
          </div>
          <div className="practice-progress">
            <div className="practice-progress-bar" style={{ width: `${(solved / problems.length) * 100}%` }} />
          </div>
        </div>

        {status === "upcoming" ? (
          <div className="contest-locked">
            <Lock size={28} />
            <p>Problems unlock when the contest begins. Check back {formatRemaining(remaining)}.</p>
          </div>
        ) : (
          <>
            <div className="contest-problems">
              {problems.map((p, i) => {
                const isSolved = getSolvedProblems().has(p.problemId);
                return (
                  <div key={p.problemId} className="contest-problem-row">
                    <span className="contest-problem-num">{String(i + 1).padStart(2, "0")}</span>
                    {isSolved ? (
                      <CheckCircle2 size={18} className="text-green" />
                    ) : (
                      <Circle size={18} className="text-muted" />
                    )}
                    <div className="contest-problem-info">
                      <Link href={p.href} className="contest-problem-link">
                        {p.title}
                      </Link>
                      <span className="contest-problem-sub">
                        {p.courseTitle} · <span className={`diff diff-${p.difficulty}`}>{p.difficulty}</span>
                      </span>
                    </div>
                    <Link href={p.href} className="btn btn-outline btn-sm" style={{ display: "inline-flex" }}>
                      Solve <ExternalLink size={14} className="ml-1" />
                    </Link>
                  </div>
                );
              })}
            </div>

            {status !== "past" && (
              <div className="contest-actions">
                <button className="btn btn-primary" onClick={finish}>
                  <Flag size={16} className="mr-2" /> Finish &amp; Save Result
                </button>
                {done && <span className="contest-saved">Result saved ✓</span>}
              </div>
            )}

            {status === "past" && saved && (
              <div className="contest-past-result">
                You solved <strong>{saved.solved}</strong> of {saved.total} problems in this contest.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
