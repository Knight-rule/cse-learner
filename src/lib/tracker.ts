import { SRSCard, createSRSCard, calculateSM2, getDueCards, getSRSStats } from "./srs";

export interface Activity {
  id: string;
  type: "practice" | "lesson" | "course_start";
  title: string;
  courseSlug: string;
  score?: number;
  language?: string;
  timestamp: number;
}

export interface LearnerStats {
  coursesStarted: string[];
  codeRuns: number;
  lessonsViewed: number;
  activities: Activity[];
  dailyActivity: Record<string, number>; // YYYY-MM-DD -> count
  lastActiveDate: string; // YYYY-MM-DD
  currentStreak: number;
  longestStreak: number;
}

const STORAGE_KEY = "cse-learner-data";
const SRS_STORAGE_KEY = "cse-learner-srs";

function getData(): LearnerStats {
  if (typeof window === "undefined") {
    return { coursesStarted: [], codeRuns: 0, lessonsViewed: 0, activities: [], dailyActivity: {}, lastActiveDate: "", currentStreak: 0, longestStreak: 0 };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migration for existing data
      return {
        coursesStarted: parsed.coursesStarted || [],
        codeRuns: parsed.codeRuns || 0,
        lessonsViewed: parsed.lessonsViewed || 0,
        activities: parsed.activities || [],
        dailyActivity: parsed.dailyActivity || {},
        lastActiveDate: parsed.lastActiveDate || "",
        currentStreak: parsed.currentStreak || 0,
        longestStreak: parsed.longestStreak || 0,
      };
    }
  } catch {}
  return { coursesStarted: [], codeRuns: 0, lessonsViewed: 0, activities: [], dailyActivity: {}, lastActiveDate: "", currentStreak: 0, longestStreak: 0 };
}

function saveData(data: LearnerStats) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function getSRSData(): SRSCard[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SRS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveSRSData(cards: SRSCard[]) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(cards)); } catch {}
}

function getTodayString(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

function updateDailyActivity(data: LearnerStats) {
  const today = getTodayString();
  if (data.lastActiveDate === today) return data;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  // Increment today's count
  data.dailyActivity[today] = (data.dailyActivity[today] || 0) + 1;

  // Calculate streak
  if (data.lastActiveDate === yesterdayStr) {
    data.currentStreak += 1;
  } else if (data.lastActiveDate !== today) {
    data.currentStreak = 1;
  }
  data.longestStreak = Math.max(data.longestStreak, data.currentStreak);
  data.lastActiveDate = today;

  return data;
}

function addActivity(activity: Omit<Activity, "id" | "timestamp">) {
  const data = getData();
  data.activities.unshift({
    ...activity,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    timestamp: Date.now(),
  });
  if (data.activities.length > 100) data.activities = data.activities.slice(0, 100);
  updateDailyActivity(data);
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

export function getStreak(): { current: number; longest: number } {
  const data = getData();
  // Check if streak is broken (not active today or yesterday)
  const today = getTodayString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  let current = data.currentStreak;
  if (data.lastActiveDate !== today && data.lastActiveDate !== yesterdayStr) {
    current = 0;
  }
  return { current, longest: data.longestStreak };
}

export function getHeatmapData(days = 365): { date: string; count: number }[] {
  const data = getData();
  const result: { date: string; count: number }[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    result.push({ date: dateStr, count: data.dailyActivity[dateStr] || 0 });
  }
  return result;
}

// SRS Functions
export function getSRSCards(): SRSCard[] {
  return getSRSData();
}

export function getOrCreateSRSCard(questionId: string, courseSlug: string): SRSCard {
  const cards = getSRSData();
  let card = cards.find((c) => c.id === `${courseSlug}-${questionId}`);
  if (!card) {
    card = createSRSCard(questionId, courseSlug);
    cards.push(card);
    saveSRSData(cards);
  }
  return card;
}

export function reviewSRSCard(questionId: string, courseSlug: string, quality: 0 | 1 | 2 | 3 | 4 | 5) {
  const cards = getSRSData();
  const index = cards.findIndex((c) => c.id === `${courseSlug}-${questionId}`);
  if (index === -1) return null;

  const result = calculateSM2(cards[index], quality);
  cards[index] = result.card;
  saveSRSData(cards);
  return result;
}

export function getDueSRSCards(courseSlug?: string): SRSCard[] {
  const cards = getSRSData();
  let due = getDueCards(cards);
  if (courseSlug) due = due.filter((c) => c.courseSlug === courseSlug);
  return due;
}

export function getSRSStatsForCourse(courseSlug: string) {
  const cards = getSRSData().filter((c) => c.courseSlug === courseSlug);
  return getSRSStats(cards);
}

export function getAllSRSStats() {
  return getSRSStats(getSRSData());
}