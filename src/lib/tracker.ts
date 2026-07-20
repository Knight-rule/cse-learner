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
  certificates: Certificate[];
}

export interface Certificate {
  courseSlug: string;
  title: string;
  issuedAt: number;
}

const STORAGE_KEY = "cse-learner-data";
const SRS_STORAGE_KEY = "cse-learner-srs";
const NAME_KEY = "cse-learner-name";

function getData(): LearnerStats {
  if (typeof window === "undefined") {
    return { coursesStarted: [], codeRuns: 0, lessonsViewed: 0, activities: [], dailyActivity: {}, lastActiveDate: "", currentStreak: 0, longestStreak: 0, certificates: [] };
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
        certificates: parsed.certificates || [],
      };
    }
  } catch {}
  return { coursesStarted: [], codeRuns: 0, lessonsViewed: 0, activities: [], dailyActivity: {}, lastActiveDate: "", currentStreak: 0, longestStreak: 0, certificates: [] };
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

// Practice solved tracking
export function markPracticeSolved(problemId: string) {
  const data = getData();
  const key = "solved:" + problemId;
  if (!data.dailyActivity[key]) {
    data.dailyActivity[key] = 1;
    data.codeRuns++;
    saveData(data);
  }
}

export function isPracticeSolved(problemId: string): boolean {
  const data = getData();
  return !!data.dailyActivity["solved:" + problemId];
}

export function getSolvedProblems(): Set<string> {
  const data = getData();
  const solved = new Set<string>();
  for (const k of Object.keys(data.dailyActivity)) {
    if (k.startsWith("solved:")) solved.add(k.slice(7));
  }
  return solved;
}

// Certificate tracking
export function awardCertificate(courseSlug: string, title: string): void {
  const data = getData();
  if (data.certificates.some((c) => c.courseSlug === courseSlug)) return;
  data.certificates.push({ courseSlug, title, issuedAt: Date.now() });
  saveData(data);
}

export function getCertificates(): Certificate[] {
  return getData().certificates;
}

export function hasCertificate(courseSlug: string): boolean {
  return getData().certificates.some((c) => c.courseSlug === courseSlug);
}

export function getCertificateId(courseSlug: string): string {
  const cert = getData().certificates.find((c) => c.courseSlug === courseSlug);
  const seed = cert ? cert.issuedAt : Date.now();
  return "CSEL-" + courseSlug.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12) + "-" + seed.toString(36).toUpperCase().slice(-6);
}

// Contest results
export interface ContestResult {
  contestId: string;
  solved: number;
  total: number;
  completedAt: number;
}

const CONTESTS_KEY = "cse-learner-contests";

export function saveContestResult(result: ContestResult): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(CONTESTS_KEY);
    const all: ContestResult[] = raw ? JSON.parse(raw) : [];
    const idx = all.findIndex((r) => r.contestId === result.contestId);
    if (idx === -1) all.push(result);
    else if (result.solved > all[idx].solved || result.completedAt > all[idx].completedAt) all[idx] = result;
    localStorage.setItem(CONTESTS_KEY, JSON.stringify(all));
  } catch {}
}

export function getContestResults(): ContestResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CONTESTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getContestResult(contestId: string): ContestResult | undefined {
  return getContestResults().find((r) => r.contestId === contestId);
}

// Learner name (used on certificates)
export function getLearnerName(): string {
  if (typeof window === "undefined") return "CSE Learner";
  try {
    return localStorage.getItem(NAME_KEY) || "CSE Learner";
  } catch {
    return "CSE Learner";
  }
}

export function setLearnerName(name: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(NAME_KEY, name.trim() || "CSE Learner");
  } catch {}
}