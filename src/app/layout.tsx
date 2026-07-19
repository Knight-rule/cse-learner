import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSE Learner - Master Computer Science",
  description: "Interactive learning platform for CSE students. Learn Data Structures, Algorithms, OS, DBMS, Networks, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mesh-bg" />
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
