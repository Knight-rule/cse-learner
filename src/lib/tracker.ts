export interface Activity {
  id: string;
  type: "quiz" | "practice" | "lesson" | "course_start";
  title: string;
  courseSlug: string;
  score?: number;
  language?: string;
  timestamp: number;
}

export interface LearnerStats {
  coursesStarted: string[];
  quizzesTaken: number;
  totalScore: number;
  totalQuestions: number;
  codeRuns: number;
  lessonsViewed: number;
  activities: Activity[];
}

const STORAGE_KEY = "cse-learner-data";

function getData(): LearnerStats {
  if (typeof window === "undefined") {
    return { coursesStarted: [], quizzesTaken: 0, totalScore: 0, totalQuestions: 0, codeRuns: 0, lessonsViewed: 0, activities: [] };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { coursesStarted: [], quizzesTaken: 0, totalScore: 0, totalQuestions: 0, codeRuns: 0, lessonsViewed: 0, activities: [] };
}

function saveData(data: LearnerStats) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function addActivity(activity: Omit<Activity, "id" | "timestamp">) {
  const data = getData();
  data.activities.unshift({
    ...activity,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    timestamp: Date.now(),
  });
  if (data.activities.length > 100) data.activities = data.activities.slice(0, 100);
  saveData(data);
}

export function trackCourseStart(courseSlug: string, courseTitle: string) {
  const data = getData();
  if (!data.coursesStarted.includes(courseSlug)) {
    data.coursesStarted.push(courseSlug);
  }
  saveData(data);
  addActivity({ type: "course_start", title: courseTitle, courseSlug });
}

export function trackLessonView(courseSlug: string, lessonTitle: string) {
  const data = getData();
  data.lessonsViewed++;
  saveData(data);
  addActivity({ type: "lesson", title: lessonTitle, courseSlug });
}

export function trackQuizComplete(courseSlug: string, quizTitle: string, score: number, total: number) {
  const data = getData();
  data.quizzesTaken++;
  data.totalScore += score;
  data.totalQuestions += total;
  saveData(data);
  addActivity({ type: "quiz", title: quizTitle, courseSlug, score });
}

export function trackCodeRun(courseSlug: string, language: string) {
  const data = getData();
  data.codeRuns++;
  saveData(data);
  addActivity({ type: "practice", title: `Ran ${language} code`, courseSlug, language });
}

export function getStats(): LearnerStats {
  return getData();
}

export function getRecentActivity(limit = 10): Activity[] {
  return getData().activities.slice(0, limit);
}

export function getAvgScore(): number {
  const data = getData();
  if (data.totalQuestions === 0) return 0;
  return Math.round((data.totalScore / data.totalQuestions) * 100);
}
