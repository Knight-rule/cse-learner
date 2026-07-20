import Link from "next/link";
import { ChevronRight, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { courses, getCourse } from "@/data/courses";
import { notFound } from "next/navigation";
import LessonContent from "@/components/LessonContent";
import LessonTracker from "@/components/LessonTracker";

export function generateStaticParams() {
  const params: { slug: string; id: string }[] = [];
  courses.forEach((c) => {
    c.lessons.forEach((l) => {
      params.push({ slug: c.slug, id: l.id });
    });
  });
  return params;
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const lessonIndex = course.lessons.findIndex((l) => l.id === id);
  if (lessonIndex === -1) notFound();

  const lesson = course.lessons[lessonIndex];
  const prevLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null;

  return (
    <div className="section">
      <LessonTracker courseSlug={course.slug} courseTitle={course.title} lessonTitle={lesson.title} />
      <div className="container-sm">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <Link href="/courses">Courses</Link>
          <ChevronRight size={14} />
          <Link href={"/courses/" + course.slug}>{course.title}</Link>
          <ChevronRight size={14} />
          <span>{lesson.title}</span>
        </div>

        {course.notesUrl && (
          <div style={{ marginBottom: 24 }}>
            <a
              href={course.notesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, padding: "6px 14px" }}
            >
              <ExternalLink size={14} /> View Notes on NotesLink
            </a>
          </div>
        )}

        <LessonContent
          lesson={lesson}
          course={{ slug: course.slug, title: course.title }}
          lessonIndex={lessonIndex}
          totalLessons={course.lessons.length}
        />

        <div className="flex items-center justify-between pt-8 border-t" style={{ marginTop: 48 }}>
          {prevLesson ? (
            <Link href={"/courses/" + course.slug + "/lessons/" + prevLesson.id} className="flex items-center gap-3" style={{ color: "var(--text-secondary)" }}>
              <ArrowLeft size={16} />
              <div>
                <div className="body-sm">Previous</div>
                <div className="heading-sm" style={{ fontSize: 15 }}>{prevLesson.title}</div>
              </div>
            </Link>
          ) : <div />}
          {nextLesson ? (
            <Link href={"/courses/" + course.slug + "/lessons/" + nextLesson.id} className="flex items-center gap-3 text-right" style={{ color: "var(--text-secondary)" }}>
              <div>
                <div className="body-sm">Next</div>
                <div className="heading-sm" style={{ fontSize: 15 }}>{nextLesson.title}</div>
              </div>
              <ArrowRight size={16} />
            </Link>
          ) : (
            <Link href={"/practice/" + course.slug} className="btn btn-primary">
              Start Practice <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
