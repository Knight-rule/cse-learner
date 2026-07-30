import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Have questions or suggestions? Get in touch with the CSE Learner team.",
  openGraph: { title: "Contact Us | CSE Learner", description: "Get in touch with the CSE Learner team." },
  twitter: { title: "Contact Us | CSE Learner", description: "Get in touch with the CSE Learner team." },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
