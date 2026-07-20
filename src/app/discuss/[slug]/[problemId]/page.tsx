import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { courses } from "@/data/courses";
import { practiceData } from "@/data/practice";
import DiscussClient from "./DiscussClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; problemId: string }> }) {
  const { slug, problemId } = await params;
  const cp = practiceData.find((p) => p.courseSlug === slug);
  const problem = cp?.problems.find((p) => p.id === problemId);
  return { title: `Discuss: ${problem?.title || "Problem"} - CSE Learner` };
}

export default async function DiscussProblemPage({ params }: { params: Promise<{ slug: string; problemId: string }> }) {
  const { slug, problemId } = await params;
  const course = courses.find((c) => c.slug === slug);
  const cp = practiceData.find((p) => p.courseSlug === slug);
  const problem = cp?.problems.find((p) => p.id === problemId);

  if (!course || !cp || !problem) {
    return (
      <div className="section">
        <div className="container text-center">
          <h1 className="heading-lg mb-4">Problem Not Found</h1>
          <Link href="/discuss" className="btn btn-primary">Back to Discuss</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="section-sm" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <Link href="/discuss">Discuss</Link>
            <ChevronRight size={14} />
            <Link href={`/practice/${slug}`}>{course.title}</Link>
            <ChevronRight size={14} />
            <span>{problem.title}</span>
          </div>
        </div>
      </div>
      <DiscussClient courseSlug={slug} problemId={problemId} problemTitle={problem.title} />
    </div>
  );
}
