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
      <body className={`${inter.className} classic-layout`}>
        <Navbar />
        <main className="min-h-screen classic-main">{children}</main>
        <footer className="bg-gray-800 text-gray-300 py-8">
          <div className="container mx-auto px-4 text-center text-sm">
            <p>CSE Learner — Built for Computer Science Students</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
