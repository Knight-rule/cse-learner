"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, BookOpen } from "lucide-react";
import { courses } from "@/data/courses";

const courseCategories: Record<string, { label: string; slugs: string[] }> = {
  "all": { label: "All", slugs: [] },
  "core-cs": {
    label: "Core CS",
    slugs: ["data-structures", "algorithms", "computer-architecture", "discrete-structures", "digital-system-design", "automata-formal-languages", "probability-statistics"],
  },
  "systems": {
    label: "Systems",
    slugs: ["operating-systems", "dbms", "computer-networks", "compiler-design", "distributed-os", "hpc", "multicore-programming"],
  },
  "programming": {
    label: "Programming",
    slugs: ["python", "java", "c-language", "cpp", "javascript", "oop"],
  },
  "ai-ml": {
    label: "AI & ML",
    slugs: ["artificial-intelligence", "machine-learning", "data-mining-warehousing", "image-processing"],
  },
  "software-dev": {
    label: "Software Dev",
    slugs: ["web-development", "software-engineering", "software-project-management"],
  },
  "advanced": {
    label: "Advanced",
    slugs: ["advanced-microprocessor", "industry-4-0"],
  },
};

const categoryKeys = Object.keys(courseCategories);

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? courses
    : courses.filter((c) => courseCategories[activeCategory].slugs.includes(c.slug));

  return (
    <div className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <span>Courses</span>
        </div>

        <div className="mb-12">
          <span className="badge badge-accent mb-4" style={{ display: "inline-flex" }}>All Courses</span>
          <h1 className="heading-xl mb-4">
            Explore Our <span className="gradient-text">CS Courses</span>
          </h1>
          <p className="body-lg" style={{ maxWidth: 560 }}>
            Choose a topic and start learning. Each course includes structured lessons and code examples.
          </p>
        </div>

        <div className="filter-bar" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={"btn " + (activeCategory === key ? "btn-primary" : "btn-secondary")}
              style={{ fontSize: 14, padding: "8px 16px" }}
            >
              {courseCategories[key].label}
              {key !== "all" && <span style={{ opacity: 0.6, marginLeft: 4 }}>({courseCategories[key].slugs.length})</span>}
            </button>
          ))}
        </div>

        <div className="courses-grid">
          {filtered.map((course) => {
            const colors = course.color.split(" ");
            return (
              <div key={course.slug} className="course-card-vertical glass-card-glow">
                <Link
                  href={"/courses/" + course.slug}
                  style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", height: "100%" }}
                >
                  <div className="course-card-vertical-icon" style={{ background: "linear-gradient(135deg, " + colors[0] + ", " + (colors[1] || colors[0]) + ")" }}>
                    {course.icon}
                  </div>
                  <h2 className="course-title">{course.title}</h2>
                  <p className="body-md course-card-desc">{course.description}</p>
                  <div className="course-card-meta">
                    <span><BookOpen size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 5 }} />{course.lessons.length} lessons</span>
                  </div>
                </Link>
                <Link href={"/courses/" + course.slug} className="btn btn-primary course-card-start">
                  Start <ChevronRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
