"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Trophy, Clock, Calendar, ChevronRight } from "lucide-react";
import { contests, getContestStatus, type Contest, type ContestStatus } from "@/data/contests";

function formatRemaining(ms: number): string {
  if (ms <= 0) return "now";
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  const sec = s % 60;
  return `${m}m ${sec}s`;
}

const STATUS_LABEL: Record<ContestStatus, string> = {
  live: "Live",
  upcoming: "Upcoming",
  past: "Past",
};

function ContestCard({ contest, now }: { contest: Contest; now: number }) {
  const status = getContestStatus(contest, now);
  const start = new Date(contest.startsAt).getTime();
  const end = start + contest.durationMinutes * 60_000;
  const remaining = status === "live" ? end - now : start - now;

  return (
    <Link href={`/contests/${contest.id}`} className="contest-card">
      <div className="contest-card-top">
        <span className={`contest-badge contest-${status}`}>{STATUS_LABEL[status]}</span>
        <span className="contest-meta">
          <Clock size={14} /> {contest.durationMinutes >= 1440
            ? `${Math.round(contest.durationMinutes / 1440)} days`
            : `${Math.round(contest.durationMinutes / 60)} hrs`}
        </span>
      </div>
      <h3 className="heading-sm contest-title">{contest.title}</h3>
      <p className="contest-desc">{contest.description}</p>
      <div className="contest-card-bottom">
        <span className="contest-meta">
          <Trophy size={14} /> {contest.problems.length} problems
        </span>
        <span className="contest-countdown">
          {status === "live" ? "Ends in " : status === "upcoming" ? "Starts in " : ""}
          {status !== "past" && formatRemaining(remaining)}
          {status === "past" && (
            <span className="contest-meta">
              <Calendar size={14} /> Ended
            </span>
          )}
        </span>
        <ChevronRight size={16} className="contest-arrow" />
      </div>
    </Link>
  );
}

export default function ContestsPage() {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const order: ContestStatus[] = ["live", "upcoming", "past"];
  const sorted = [...contests].sort(
    (a, b) => order.indexOf(getContestStatus(a, now)) - order.indexOf(getContestStatus(b, now))
  );

  return (
    <div className="section">
      <div className="container">
        <div className="page-head">
          <span className="eyebrow">
            <Trophy size={14} /> Competitions
          </span>
          <h1 className="heading-xl">Contests</h1>
          <p className="lede">
            Timed problem sets inspired by CodeChef. Join a live contest, race the clock, and track how many problems
            you solve. Your results are saved locally on this device.
          </p>
        </div>

        <div className="contest-grid">
          {sorted.map((c) => (
            <ContestCard key={c.id} contest={c} now={now} />
          ))}
        </div>
      </div>
    </div>
  );
}
