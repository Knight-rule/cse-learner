import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, CheckCircle, Clock, BookOpen, ArrowLeft, Lock, Target } from "lucide-react";
import { learningPaths, getLearningPath, getCoursesInPath } from "@/data/learning-paths";
import { courses } from "@/data/courses";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const path = getLearningPath(resolvedParams.id);
  if (!path) return { title: "Path Not Found" };
  return {
    title: `${path.title} | Learning Paths | CSE Learner`,
    description: path.description,
  };
}

export async function generateStaticParams() {
  return learningPaths.map((path) => ({ id: path.id }));
}

export default async function LearningPathDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const path = getLearningPath(resolvedParams.id);

  if (!path) notFound();

  const courseSlugs = getCoursesInPath(path.id);
  const pathCourses = courseSlugs
    .map((slug) => courses.find((c) => c.slug === slug))
    .filter(Boolean);

  const totalHours = pathCourses.reduce((sum, c) => sum + (c?.lessons.length || 0) * 0.5, 0); // rough estimate

  return (
    <div className="section">
      <div className="container">
        <Link href="/paths" className="inline-flex items-center gap-2 text-text-muted hover:text-accent-primary mb-8 transition-colors">
          <ArrowLeft size={16} />
          Back to Paths
        </Link>

        <div className="mb-12">
          <div style={{ width: 64, height: 64, borderRadius: "var(--radius-lg)", background: path.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, marginBottom: 16 }}>
            {path.icon}
          </div>
          <h1 className="heading-xl mb-4">{path.title}</h1>
          <p className="body-lg text-text-muted max-w-2xl">{path.description}</p>
        </div>

        <div className="flex flex-wrap gap-6 mb-12 glass-card p-6">
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span className="font-medium">~{path.estimatedTotalHours} hours</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen size={18} />
            <span className="font-medium">{path.courses.length} courses</span>
          </div>
          <div className="flex items-center gap-2">
            <Target size={18} />
            <span className="font-medium">{path.targetAudience}</span>
          </div>
        </div>

        <h2 className="heading-md mb-6">Course Sequence</h2>

        <div className="space-y-4">
          {path.courses.map((courseInfo, index) => {
            const course = courses.find((c) => c.slug === courseInfo.slug);
            const isRequired = courseInfo.required !== false;
            return (
              <Link
                key={courseInfo.slug}
                href={course ? `/courses/${course.slug}` : "#"}
                className="flex items-center gap-6 glass-card p-6 group transition-all hover:border-accent-primary/50"
                style={{ opacity: course ? 1 : 0.5 }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg" style={{ background: "var(--gradient)" }}>
                  {courseInfo.order}
                </div>

                {course && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span style={{ fontSize: 24 }}>{course.icon}</span>
                      <h3 className="heading-sm group-hover:text-accent-primary transition-colors">{course.title}</h3>
                      {!isRequired && (
                        <span className="px-2 py-0.5 text-xs rounded-full glass-card text-text-muted">Optional</span>
                      )}
                    </div>
                    <p className="body-sm text-text-muted line-clamp-2">{course.description}</p>
                  </div>
                )}

                {!course && (
                  <div className="flex-1 min-w-0 text-text-muted">
                    <p className="body-sm">Course not found: {courseInfo.slug}</p>
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {courseInfo.estimatedHours}h
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} />
                    {course?.lessons.length || 0} lessons
                  </span>
                  {course && (
                    <ChevronRight size={18} className="group-hover:text-accent-primary transition-colors" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 glass-card p-8 text-center">
          <h3 className="heading-md mb-4">Ready to Start?</h3>
          <p className="body-md text-text-muted mb-6 max-w-lg mx-auto">
            Begin with Course 1 and progress sequentially. Track your completion on the
            <Link href="/dashboard" className="text-accent-primary hover:underline">Dashboard</Link>.
          </p>
          <Link
            href={pathCourses[0] ? `/courses/${pathCourses[0].slug}` : "/courses"}
            className="btn btn-primary inline-flex"
          >
            Start Learning <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}