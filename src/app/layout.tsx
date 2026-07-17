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
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-dark-400 text-sm">
            <p>CSE Learner — Built for Computer Science Students</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
