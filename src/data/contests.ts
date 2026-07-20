import { practiceData } from "./practice";

export interface ContestProblemRef {
  courseSlug: string;
  problemId: string;
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  startsAt: string; // ISO 8601
  problems: ContestProblemRef[];
}

export type ContestStatus = "live" | "upcoming" | "past";

export function getContestStatus(contest: { startsAt: string; durationMinutes: number }, now = Date.now()): ContestStatus {
  const start = new Date(contest.startsAt).getTime();
  const end = start + contest.durationMinutes * 60_000;
  if (now < start) return "upcoming";
  if (now > end) return "past";
  return "live";
}

export function resolveContestProblem(ref: ContestProblemRef) {
  const cp = practiceData.find((c) => c.courseSlug === ref.courseSlug);
  const problem = cp?.problems.find((p) => p.id === ref.problemId);
  return { course: cp, problem };
}

export const contests: Contest[] = [
  {
    id: "july-long-2026",
    title: "July Long Challenge 2026",
    description:
      "Our flagship 15-day contest. Solve problems across data structures, algorithms, systems and databases. Climb the local leaderboard as you go.",
    durationMinutes: 15 * 24 * 60,
    startsAt: "2026-07-10T00:00:00Z",
    problems: [
      { courseSlug: "data-structures", problemId: "ds-1" },
      { courseSlug: "data-structures", problemId: "ds-4" },
      { courseSlug: "algorithms", problemId: "algo-1" },
      { courseSlug: "algorithms", problemId: "algo-3" },
      { courseSlug: "dbms", problemId: "db-2" },
      { courseSlug: "dbms", problemId: "db-3" },
      { courseSlug: "operating-systems", problemId: "os-3" },
    ],
  },
  {
    id: "weekly-42",
    title: "Weekly Contest #42",
    description:
      "A short, fast-paced contest of 5 problems. Perfect for a weekend warm-up. Three days to submit as many as you can.",
    durationMinutes: 3 * 24 * 60,
    startsAt: "2026-07-20T00:00:00Z",
    problems: [
      { courseSlug: "algorithms", problemId: "algo-2" },
      { courseSlug: "algorithms", problemId: "algo-4" },
      { courseSlug: "data-structures", problemId: "ds-2" },
      { courseSlug: "data-structures", problemId: "ds-3" },
      { courseSlug: "operating-systems", problemId: "os-1" },
    ],
  },
  {
    id: "august-cookoff-2026",
    title: "August Cook-Off 2026",
    description:
      "A 24-hour sprint contest. Mark your calendar — problems unlock when the contest begins.",
    durationMinutes: 24 * 60,
    startsAt: "2026-08-02T19:30:00Z",
    problems: [
      { courseSlug: "dbms", problemId: "db-1" },
      { courseSlug: "operating-systems", problemId: "os-2" },
      { courseSlug: "algorithms", problemId: "algo-1" },
      { courseSlug: "data-structures", problemId: "ds-1" },
    ],
  },
  {
    id: "june-lunchtime-2026",
    title: "June Lunchtime 2026",
    description:
      "Our previous lunchtime contest. Results are in — revisit the problems and compare with your local best.",
    durationMinutes: 24 * 60,
    startsAt: "2026-06-20T18:00:00Z",
    problems: [
      { courseSlug: "data-structures", problemId: "ds-1" },
      { courseSlug: "algorithms", problemId: "algo-4" },
      { courseSlug: "dbms", problemId: "db-3" },
    ],
  },
];

export function getContest(id: string): Contest | undefined {
  return contests.find((c) => c.id === id);
}
