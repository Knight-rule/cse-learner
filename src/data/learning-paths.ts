export interface LearningPathCourse {
  slug: string;
  order: number;
  required: boolean;
  estimatedHours: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  targetAudience: string;
  estimatedTotalHours: number;
  courses: LearningPathCourse[];
}

export const learningPaths: LearningPath[] = [
  {
    id: "cs-fundamentals",
    title: "CS Fundamentals (Year 1)",
    description: "Core computer science concepts every student must master. Covers programming basics, data structures, and computer organization.",
    icon: "🏗️",
    color: "from-blue-500 to-cyan-600",
    targetAudience: "1st Year / Beginners",
    estimatedTotalHours: 120,
    courses: [
      { slug: "python", order: 1, required: true, estimatedHours: 20 },
      { slug: "c", order: 2, required: true, estimatedHours: 25 },
      { slug: "data-structures", order: 3, required: true, estimatedHours: 30 },
      { slug: "algorithms", order: 4, required: true, estimatedHours: 25 },
      { slug: "computer-organization", order: 5, required: true, estimatedHours: 20 },
    ],
  },
  {
    id: "core-systems",
    title: "Core Systems (Year 2)",
    description: "Operating systems, databases, networks — the backbone of all software. Essential for systems programming and backend roles.",
    icon: "⚙️",
    color: "from-amber-500 to-orange-600",
    targetAudience: "2nd Year / Intermediate",
    estimatedTotalHours: 140,
    courses: [
      { slug: "operating-systems", order: 1, required: true, estimatedHours: 30 },
      { slug: "dbms", order: 2, required: true, estimatedHours: 25 },
      { slug: "computer-networks", order: 3, required: true, estimatedHours: 30 },
      { slug: "cpp", order: 4, required: false, estimatedHours: 20 },
      { slug: "software-engineering", order: 5, required: true, estimatedHours: 20 },
      { slug: "system-design", order: 6, required: false, estimatedHours: 15 },
    ],
  },
  {
    id: "advanced-specialization",
    title: "Advanced Specialization (Year 3-4)",
    description: "Pick your track: AI/ML, Web, Mobile, Security, or Cloud. Deep-dive into cutting-edge fields.",
    icon: "🚀",
    color: "from-purple-500 to-pink-600",
    targetAudience: "3rd-4th Year / Advanced",
    estimatedTotalHours: 200,
    courses: [
      { slug: "machine-learning", order: 1, required: false, estimatedHours: 35 },
      { slug: "deep-learning", order: 2, required: false, estimatedHours: 30 },
      { slug: "web-development", order: 3, required: false, estimatedHours: 30 },
      { slug: "mobile-development", order: 4, required: false, estimatedHours: 25 },
      { slug: "cyber-security", order: 5, required: false, estimatedHours: 30 },
      { slug: "cloud-computing", order: 6, required: false, estimatedHours: 25 },
      { slug: "devops", order: 7, required: false, estimatedHours: 25 },
    ],
  },
  {
    id: "interview-prep",
    title: "Interview Preparation",
    description: "Crack coding interviews at top companies. Problem-solving patterns, system design, and behavioral prep.",
    icon: "🎯",
    color: "from-red-500 to-rose-600",
    targetAudience: "Final Year / Job Seekers",
    estimatedTotalHours: 80,
    courses: [
      { slug: "data-structures", order: 1, required: true, estimatedHours: 15 },
      { slug: "algorithms", order: 2, required: true, estimatedHours: 20 },
      { slug: "system-design", order: 3, required: true, estimatedHours: 25 },
      { slug: "competitive-programming", order: 4, required: false, estimatedHours: 20 },
    ],
  },
  {
    id: "web-fullstack",
    title: "Full-Stack Web Developer",
    description: "From HTML to production deployment. Build complete web applications with modern tooling.",
    icon: "🌐",
    color: "from-emerald-500 to-teal-600",
    targetAudience: "Aspiring Web Developers",
    estimatedTotalHours: 100,
    courses: [
      { slug: "web-development", order: 1, required: true, estimatedHours: 30 },
      { slug: "javascript", order: 2, required: true, estimatedHours: 20 },
      { slug: "python", order: 3, required: false, estimatedHours: 15 },
      { slug: "dbms", order: 4, required: true, estimatedHours: 20 },
      { slug: "devops", order: 5, required: false, estimatedHours: 15 },
    ],
  },
  {
    id: "ai-ml-engineer",
    title: "AI/ML Engineer",
    description: "Mathematics, ML algorithms, deep learning frameworks, and MLOps. Build intelligent systems.",
    icon: "🤖",
    color: "from-violet-500 to-indigo-600",
    targetAudience: "AI/ML Aspirants",
    estimatedTotalHours: 150,
    courses: [
      { slug: "python", order: 1, required: true, estimatedHours: 20 },
      { slug: "data-science", order: 2, required: true, estimatedHours: 25 },
      { slug: "machine-learning", order: 3, required: true, estimatedHours: 35 },
      { slug: "deep-learning", order: 4, required: true, estimatedHours: 30 },
      { slug: "data-structures", order: 5, required: false, estimatedHours: 15 },
      { slug: "algorithms", order: 6, required: false, estimatedHours: 15 },
      { slug: "cloud-computing", order: 7, required: false, estimatedHours: 10 },
    ],
  },
];

export function getLearningPath(id: string): LearningPath | undefined {
  return learningPaths.find((p) => p.id === id);
}

export function getCoursesInPath(pathId: string): string[] {
  const path = getLearningPath(pathId);
  if (!path) return [];
  return path.courses.map((c) => c.slug);
}

export function getPathsForCourse(courseSlug: string): LearningPath[] {
  return learningPaths.filter((path) =>
    path.courses.some((c) => c.slug === courseSlug)
  );
}