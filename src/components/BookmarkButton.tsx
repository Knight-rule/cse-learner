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

export default function BookmarkButton({ data }: { data: BookmarkData }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("cse-bookmarks") || "[]");
    const key = `${data.slug}-${data.lessonId || "course"}`;
    setBookmarked(bookmarks.some((b: any) => `${b.slug}-${b.lessonId || "course"}` === key));
  }, [data]);

  const toggle = () => {
    const bookmarks = JSON.parse(localStorage.getItem("cse-bookmarks") || "[]");
    const key = `${data.slug}-${data.lessonId || "course"}`;
    const idx = bookmarks.findIndex((b: any) => `${b.slug}-${b.lessonId || "course"}` === key);

    if (idx > -1) {
      bookmarks.splice(idx, 1);
      setBookmarked(false);
    } else {
      bookmarks.push(data);
      setBookmarked(true);
    }
    localStorage.setItem("cse-bookmarks", JSON.stringify(bookmarks));
  };

  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-lg transition-colors ${
        bookmarked ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-400 hover:text-yellow-500"
      }`}
      title={bookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark className="w-5 h-5" fill={bookmarked ? "currentColor" : "none"} />
    </button>
  );
}
