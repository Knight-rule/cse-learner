"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";

interface BookmarkData {
  type: string;
  slug: string;
  lessonId?: string;
  title: string;
  courseTitle: string;
}

function safeGetBookmarks(): Record<string, unknown>[] {
  try {
    return JSON.parse(localStorage.getItem("cse-bookmarks") || "[]");
  } catch {
    return [];
  }
}

export default function BookmarkButton({ data }: { data: BookmarkData }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = safeGetBookmarks();
    const key = `${data.slug}-${data.lessonId || "course"}`;
    setBookmarked(bookmarks.some((b) => `${b.slug}-${b.lessonId || "course"}` === key));
  }, [data.slug, data.lessonId]);

  const toggle = () => {
    const bookmarks = safeGetBookmarks();
    const key = `${data.slug}-${data.lessonId || "course"}`;
    const idx = bookmarks.findIndex((b) => `${b.slug}-${b.lessonId || "course"}` === key);

    if (idx > -1) {
      bookmarks.splice(idx, 1);
      setBookmarked(false);
    } else {
      bookmarks.push(data as unknown as Record<string, unknown>);
      setBookmarked(true);
    }
    try {
      localStorage.setItem("cse-bookmarks", JSON.stringify(bookmarks));
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-lg transition-all duration-200 ${
        bookmarked
          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 scale-110"
          : "bg-gray-100 dark:bg-dark-700 text-gray-400 dark:text-dark-500 hover:text-yellow-500 hover:scale-105"
      }`}
      title={bookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark className="w-5 h-5" fill={bookmarked ? "currentColor" : "none"} />
    </button>
  );
}
