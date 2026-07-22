import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { practiceData } from "@/data/practice";

const BASE = "https://cse-learner.onrender.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = ["", "/about", "/courses", "/practice", "/languages", "/jobs", "/contests", "/discuss", "/certificates", "/leaderboard", "/dashboard", "/ai-mentor", "/contact", "/paths", "/bookmarks"].map((path) => ({
    url: BASE + path,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const coursePages = courses.map((c) => ({
    url: BASE + "/courses/" + c.slug,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const lessonPages = courses.flatMap((c) =>
    c.lessons.map((l) => ({
      url: BASE + "/courses/" + c.slug + "/lessons/" + l.id,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const practicePages = practiceData.flatMap((p) => [
    {
      url: BASE + "/practice/" + p.courseSlug,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...p.problems.map((prob) => ({
      url: BASE + "/practice/" + p.courseSlug + "/" + prob.id,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ]);

  return [...staticPages, ...coursePages, ...lessonPages, ...practicePages];
}
