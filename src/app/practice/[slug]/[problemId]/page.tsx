import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { courses } from "@/data/courses";
import { practiceData } from "@/data/practice";
import PracticeClient from "./PracticeClient";

export function generateStaticParams() {
  const params: { slug: string; problemId: string }[] = [];
  practiceData.forEach((cp) => {
    cp.problems.forEach((p) => {
      params.push({ slug: cp.courseSlug, problemId: p.id });
    });
  });
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; problemId: string }> }) {
  const { slug, problemId } = await params;
  const course = courses.find((c) => c.slug === slug);
  const cp = practiceData.find((p) => p.courseSlug === slug);
  const problem = cp?.problems.find((p) => p.id === problemId);
  return { title: `${problem?.title || "Problem"} - ${course?.title || "Practice"} - CSE Learner` };
}

export default async function PracticeProblemPage({ params }: { params: Promise<{ slug: string; problemId: string }> }) {
  const { slug, problemId } = await params;
  const course = courses.find((c) => c.slug === slug);
  const cp = practiceData.find((p) => p.courseSlug === slug);
  const problem = cp?.problems.find((p) => p.id === problemId);

  if (!course || !cp || !problem) {
    return (
      <div className="section">
        <div className="container text-center">
          <h1 className="heading-lg mb-4">Problem Not Found</h1>
          <Link href="/practice" className="btn btn-primary">Back to Practice</Link>
        </div>
      </div>
    );
  }

  const problemIndex = cp.problems.findIndex((p) => p.id === problemId);

  const prevId = problemIndex > 0 ? cp.problems[problemIndex - 1]?.id : null;
  const nextId = problemIndex < cp.problems.length - 1 ? cp.problems[problemIndex + 1]?.id : null;

  return (
    <div>
      <div className="section-sm" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <Link href="/practice">Practice</Link>
            <ChevronRight size={14} />
            <Link href={`/practice/${slug}`}>{course.title}</Link>
            <ChevronRight size={14} />
            <span>{problem.title}</span>
          </div>
        </div>
      </div>
      <PracticeClient problem={problem} courseSlug={slug} problemIndex={problemIndex} totalProblems={cp.problems.length} prevId={prevId} nextId={nextId} />
    </div>
  );
}
