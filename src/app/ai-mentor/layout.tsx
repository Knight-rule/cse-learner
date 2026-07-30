import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Mentor",
  description: "Your CS study buddy. Ask anything about computer science concepts, code, debugging, or algorithms.",
  openGraph: { title: "AI Mentor | CSE Learner", description: "AI-powered CS study assistant. Ask anything about concepts, coding, and debugging." },
  twitter: { card: "summary_large_image", title: "AI Mentor | CSE Learner", description: "AI-powered CS study assistant." },
};

export default function AIMentorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
