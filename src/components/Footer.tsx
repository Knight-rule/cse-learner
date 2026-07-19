import Link from "next/link";
import { BookOpen, Code, Brain, Home, Bookmark } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="nav-logo" style={{ fontSize: 24 }}>
              <span className="cse">CSE</span>
              <span className="learner">Learner</span>
            </Link>
            <p>
              Free interactive learning platform for Computer Science students. Master Data Structures, Algorithms, OS, DBMS, Networks, and more.
            </p>
          </div>
          <div>
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/courses">About</Link></li>
              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li><Link href="/courses">All Courses</Link></li>
              <li><Link href="/languages">Languages</Link></li>
              <li><Link href="/playground">Playground</Link></li>
              <li><Link href="/quiz">Quiz Center</Link></li>
              <li><Link href="/bookmarks">Bookmarks</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-links footer-contact">
              <li>support@cselearner.com</li>
              <li>Built for Computer Science Students</li>
              <li>Free &amp; Open Learning Platform</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">&copy; 2026 CSE Learner. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#" aria-label="GitHub">GH</a>
            <a href="#" aria-label="Twitter">X</a>
            <a href="#" aria-label="LinkedIn">in</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
