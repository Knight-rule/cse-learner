import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Courses",
  description: "Explore 29+ computer science courses from Data Structures to AI. Master DSA, OS, DBMS, Networks, and more with interactive lessons.",
  openGraph: { title: "All CS Courses | CSE Learner", description: "Explore 29+ computer science courses." },
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
