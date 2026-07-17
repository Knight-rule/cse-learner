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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('cse-theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="min-h-screen">{children}</main>
        <footer className="border-t border-gray-200 dark:border-dark-700 py-8 dark:bg-dark-900">
          <div className="max-w-7xl mx-auto px-4 text-center text-dark-400 text-sm">
            <p>CSE Learner — Built for Computer Science Students</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
