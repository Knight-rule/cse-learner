"use client";

import { useEffect } from "react";
import { trackLessonView, trackCourseStart } from "@/lib/tracker";

export default function LessonTracker({ courseSlug, courseTitle, lessonTitle }: { courseSlug: string; courseTitle: string; lessonTitle: string }) {
  useEffect(() => {
    trackCourseStart(courseSlug, courseTitle);
    trackLessonView(courseSlug, lessonTitle);
  }, [courseSlug, courseTitle, lessonTitle]);

  return null;
}
