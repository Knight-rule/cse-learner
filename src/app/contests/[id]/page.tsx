import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { contests, getContest, resolveContestProblem } from "@/data/contests";
import ContestTakeClient from "./ContestTakeClient";

export function generateStaticParams() {
  return contests.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contest = getContest(id);
  return { title: `${contest?.title || "Contest"} - CSE Learner` };
}

export default async function ContestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contest = getContest(id);

  if (!contest) {
    return (
      <div className="section">
        <div className="container text-center">
          <h1 className="heading-lg mb-4">Contest Not Found</h1>
          <Link href="/contests" className="btn btn-primary">Back to Contests</Link>
        </div>
      </div>
    );
  }

  const resolved = contest.problems.map((ref) => {
    const { problem, course } = resolveContestProblem(ref);
    return {
      courseSlug: ref.courseSlug,
      problemId: ref.problemId,
      title: problem?.title || ref.problemId,
      difficulty: problem?.difficulty || "easy",
      courseTitle: course ? course.courseSlug : ref.courseSlug,
      href: `/practice/${ref.courseSlug}/${ref.problemId}`,
    };
  });

  return (
    <div>
      <div className="section-sm" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <Link href="/contests">Contests</Link>
            <ChevronRight size={14} />
            <span>{contest.title}</span>
          </div>
        </div>
      </div>
      <ContestTakeClient
        contest={{
          id: contest.id,
          title: contest.title,
          description: contest.description,
          durationMinutes: contest.durationMinutes,
          startsAt: contest.startsAt,
        }}
        problems={resolved}
      />
    </div>
  );
}
