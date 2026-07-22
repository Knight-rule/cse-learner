import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cse-learner.onrender.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CSE Learner - Master Computer Science",
    template: "%s | CSE Learner",
  },
  description: "Free interactive learning platform for CSE students. Learn Data Structures, Algorithms, OS, DBMS, Networks, and more with hands-on practice, certificates, and AI-powered mentoring.",
  keywords: ["CSE", "computer science", "data structures", "algorithms", "programming", "DSA", "OS", "DBMS", "networks", "coding practice", "interview preparation"],
  authors: [{ name: "CSE Learner" }],
  creator: "CSE Learner",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "CSE Learner",
    title: "CSE Learner - Master Computer Science",
    description: "Free interactive learning platform for CSE students. Practice problems, certificates, AI mentoring, and more.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CSE Learner" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSE Learner - Master Computer Science",
    description: "Free interactive learning platform for CSE students.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="mesh-bg" />
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
