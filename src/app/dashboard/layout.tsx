import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Track your CSE learning progress, enrolled courses, and practice activity.",
  openGraph: { title: "Dashboard | CSE Learner", description: "Track your CSE learning progress and course activity." },
  twitter: { title: "Dashboard | CSE Learner", description: "Track your CSE learning progress." },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
