export interface LearningPathCourse {
  slug: string;
  order: number;
  required: boolean;
  estimatedHours: number;
  comingSoon?: boolean;
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
    id: "zero-to-placement",
    title: "Zero to Placement (Complete Roadmap)",
    description: "From absolute beginner to placement-ready. Follow this single track to master Python, C, Data Structures, Algorithms, OS, DBMS, Networks, and interview patterns — everything you need to crack TCS, Infosys, Wipro, and product company interviews.",
    icon: "🎯",
    color: "from-rose-500 to-pink-600",
    targetAudience: "1st-4th Year / All Students",
    estimatedTotalHours: 300,
    courses: [
      { slug: "python", order: 1, required: true, estimatedHours: 20 },
      { slug: "c-language", order: 2, required: true, estimatedHours: 25 },
      { slug: "c-pointers-memory", order: 3, required: true, estimatedHours: 10 },
      { slug: "data-structures", order: 4, required: true, estimatedHours: 30 },
      { slug: "algorithms", order: 5, required: true, estimatedHours: 25 },
      { slug: "operating-systems", order: 6, required: true, estimatedHours: 30 },
      { slug: "dbms", order: 7, required: true, estimatedHours: 25 },
      { slug: "computer-networks", order: 8, required: true, estimatedHours: 25 },
      { slug: "sql-mastery", order: 9, required: false, estimatedHours: 10 },
      { slug: "oop", order: 10, required: true, estimatedHours: 15 },
      { slug: "interview-dsa-patterns", order: 11, required: false, estimatedHours: 20, comingSoon: true },
    ],
  },
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
      { slug: "c-language", order: 2, required: true, estimatedHours: 25 },
      { slug: "data-structures", order: 3, required: true, estimatedHours: 30 },
      { slug: "algorithms", order: 4, required: true, estimatedHours: 25 },
      { slug: "computer-architecture", order: 5, required: true, estimatedHours: 20 },
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
      { slug: "system-design", order: 6, required: false, estimatedHours: 15, comingSoon: true },
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
      { slug: "mobile-development", order: 4, required: false, estimatedHours: 25, comingSoon: true },
      { slug: "cyber-security", order: 5, required: false, estimatedHours: 30, comingSoon: true },
      { slug: "cloud-computing", order: 6, required: false, estimatedHours: 25, comingSoon: true },
      { slug: "devops", order: 7, required: false, estimatedHours: 25, comingSoon: true },
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
      { slug: "system-design", order: 3, required: true, estimatedHours: 25, comingSoon: true },
      { slug: "competitive-programming", order: 4, required: false, estimatedHours: 20, comingSoon: true },
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
      { slug: "devops", order: 5, required: false, estimatedHours: 15, comingSoon: true },
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
      { slug: "data-science", order: 2, required: true, estimatedHours: 25, comingSoon: true },
      { slug: "machine-learning", order: 3, required: true, estimatedHours: 35 },
      { slug: "deep-learning", order: 4, required: true, estimatedHours: 30 },
      { slug: "data-structures", order: 5, required: false, estimatedHours: 15 },
      { slug: "algorithms", order: 6, required: false, estimatedHours: 15 },
      { slug: "cloud-computing", order: 7, required: false, estimatedHours: 10, comingSoon: true },
    ],
  },
  {
    id: "cyber-security",
    title: "Cybersecurity Specialist",
    description: "Master ethical hacking, network security, cryptography, and incident response. Protect systems from cyber threats and become a security professional.",
    icon: "🛡️",
    color: "from-red-500 to-orange-600",
    targetAudience: "Security Enthusiants / 2nd-4th Year",
    estimatedTotalHours: 180,
    courses: [
      { slug: "python", order: 1, required: true, estimatedHours: 20 },
      { slug: "computer-networks", order: 2, required: true, estimatedHours: 30 },
      { slug: "operating-systems", order: 3, required: true, estimatedHours: 25 },
      { slug: "cyber-security", order: 4, required: true, estimatedHours: 40, comingSoon: true },
      { slug: "cryptography", order: 5, required: true, estimatedHours: 25, comingSoon: true },
      { slug: "ethical-hacking", order: 6, required: false, estimatedHours: 25, comingSoon: true },
      { slug: "cloud-computing", order: 7, required: false, estimatedHours: 15, comingSoon: true },
    ],
  },
  {
    id: "data-science",
    title: "Data Science & Analytics",
    description: "From statistics to machine learning. Analyze data, build predictive models, and extract insights using Python, SQL, and modern tools.",
    icon: "📊",
    color: "from-cyan-500 to-blue-600",
    targetAudience: "Data Enthusiants / 2nd-4th Year",
    estimatedTotalHours: 160,
    courses: [
      { slug: "python", order: 1, required: true, estimatedHours: 20 },
      { slug: "data-science", order: 2, required: true, estimatedHours: 35, comingSoon: true },
      { slug: "sql-mastery", order: 3, required: true, estimatedHours: 15 },
      { slug: "machine-learning", order: 4, required: true, estimatedHours: 35 },
      { slug: "data-structures", order: 5, required: false, estimatedHours: 15 },
      { slug: "deep-learning", order: 6, required: false, estimatedHours: 25, comingSoon: true },
      { slug: "cloud-computing", order: 7, required: false, estimatedHours: 15, comingSoon: true },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Engineer",
    description: "Master cloud platforms (AWS, Azure, GCP), containerization, CI/CD pipelines, and infrastructure automation. Build and deploy at scale.",
    icon: "☁️",
    color: "from-sky-500 to-indigo-600",
    targetAudience: "Backend / Infra Aspirants",
    estimatedTotalHours: 140,
    courses: [
      { slug: "python", order: 1, required: true, estimatedHours: 20 },
      { slug: "linux", order: 2, required: true, estimatedHours: 20, comingSoon: true },
      { slug: "computer-networks", order: 3, required: true, estimatedHours: 25 },
      { slug: "cloud-computing", order: 4, required: true, estimatedHours: 35, comingSoon: true },
      { slug: "devops", order: 5, required: true, estimatedHours: 30, comingSoon: true },
      { slug: "docker", order: 6, required: false, estimatedHours: 15, comingSoon: true },
      { slug: "kubernetes", order: 7, required: false, estimatedHours: 15, comingSoon: true },
    ],
  },
  {
    id: "mobile-development",
    title: "Mobile App Developer",
    description: "Build native and cross-platform mobile apps for iOS and Android. Master React Native, Flutter, or native development.",
    icon: "📱",
    color: "from-teal-500 to-green-600",
    targetAudience: "Mobile Dev Aspirants",
    estimatedTotalHours: 120,
    courses: [
      { slug: "python", order: 1, required: true, estimatedHours: 15 },
      { slug: "javascript", order: 2, required: true, estimatedHours: 20 },
      { slug: "react-native", order: 3, required: true, estimatedHours: 30, comingSoon: true },
      { slug: "flutter", order: 4, required: false, estimatedHours: 30, comingSoon: true },
      { slug: "mobile-development", order: 5, required: true, estimatedHours: 25, comingSoon: true },
    ],
  },
  {
    id: "game-development",
    title: "Game Developer",
    description: "Create 2D and 3D games using Unity, Unreal Engine, or custom engines. Learn game physics, rendering, and player engagement.",
    icon: "🎮",
    color: "from-pink-500 to-purple-600",
    targetAudience: "Gaming Enthusiasts",
    estimatedTotalHours: 150,
    courses: [
      { slug: "python", order: 1, required: true, estimatedHours: 15 },
      { slug: "cpp", order: 2, required: true, estimatedHours: 25 },
      { slug: "data-structures", order: 3, required: true, estimatedHours: 20 },
      { slug: "game-development", order: 4, required: true, estimatedHours: 40, comingSoon: true },
      { slug: "computer-graphics", order: 5, required: false, estimatedHours: 30, comingSoon: true },
      { slug: "ai-for-games", order: 6, required: false, estimatedHours: 20, comingSoon: true },
    ],
  },
  {
    id: "blockchain-web3",
    title: "Blockchain & Web3 Developer",
    description: "Build decentralized applications, smart contracts, and understand distributed ledger technology. The future of the internet.",
    icon: "⛓️",
    color: "from-yellow-500 to-amber-600",
    targetAudience: "Web3 Enthusiants",
    estimatedTotalHours: 100,
    courses: [
      { slug: "python", order: 1, required: true, estimatedHours: 15 },
      { slug: "javascript", order: 2, required: true, estimatedHours: 20 },
      { slug: "web-development", order: 3, required: true, estimatedHours: 25 },
      { slug: "blockchain", order: 4, required: true, estimatedHours: 25, comingSoon: true },
      { slug: "smart-contracts", order: 5, required: true, estimatedHours: 15, comingSoon: true },
    ],
  },
  {
    id: "systems-programmer",
    title: "Systems Programmer",
    description: "Low-level programming in C/C++, memory management, OS internals, and compiler design. Build systems software and embedded devices.",
    icon: "🔧",
    color: "from-gray-500 to-slate-600",
    targetAudience: "Systems Programming Fans",
    estimatedTotalHours: 180,
    courses: [
      { slug: "c-language", order: 1, required: true, estimatedHours: 25 },
      { slug: "cpp", order: 2, required: true, estimatedHours: 25 },
      { slug: "operating-systems", order: 3, required: true, estimatedHours: 30 },
      { slug: "computer-architecture", order: 4, required: true, estimatedHours: 25 },
      { slug: "data-structures", order: 5, required: true, estimatedHours: 25 },
      { slug: "algorithms", order: 6, required: true, estimatedHours: 25 },
      { slug: "compiler-design", order: 7, required: false, estimatedHours: 25, comingSoon: true },
    ],
  },
  {
    id: "iot-embedded",
    title: "IoT & Embedded Systems",
    description: "Program microcontrollers, design IoT solutions, and build smart devices. Connect the physical world to the digital.",
    icon: "🔌",
    color: "from-lime-500 to-green-600",
    targetAudience: "Hardware / IoT Enthusiasts",
    estimatedTotalHours: 120,
    courses: [
      { slug: "c-language", order: 1, required: true, estimatedHours: 25 },
      { slug: "python", order: 2, required: true, estimatedHours: 15 },
      { slug: "computer-architecture", order: 3, required: true, estimatedHours: 20 },
      { slug: "computer-networks", order: 4, required: true, estimatedHours: 25 },
      { slug: "embedded-systems", order: 5, required: true, estimatedHours: 35, comingSoon: true },
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
