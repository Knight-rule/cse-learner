import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { courses } from "@/data/courses";
import { practiceData } from "@/data/practice";
import PracticeCourseClient from "./PracticeCourseClient";

export function generateStaticParams() {
  return practiceData.map((cp) => ({ slug: cp.courseSlug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  return { title: `${course?.title || "Course"} Practice - CSE Learner` };
}

export default async function PracticeCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  const cp = practiceData.find((p) => p.courseSlug === slug);

  if (!course || !cp) {
    return (
      <div className="section">
        <div className="container text-center">
          <h1 className="heading-lg mb-4">Course Not Found</h1>
          <Link href="/practice" className="btn btn-primary">Back to Practice</Link>
        </div>
      </div>
    );
  }

  return (
    <PracticeCourseClient
      slug={slug}
      courseTitle={course.title}
      courseIcon={course.icon}
      courseColor={course.color}
      problems={cp.problems}
    />
  );
}
