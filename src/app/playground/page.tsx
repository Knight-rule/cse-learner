import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Playground from "@/components/Playground";

export const metadata = {
  title: "Code Playground - CSE Learner",
  description: "Write and run code directly in the browser — Python, JavaScript, C, and C++",
};

export default function PlaygroundPage() {
  return (
    <div>
      <div className="section-sm" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>Playground</span>
          </div>
          <h1 className="heading-lg mb-2">
            Code <span className="gradient-text">Playground</span>
          </h1>
          <p className="body-md">
            Write, run, and test code in your browser. Python &amp; JavaScript run locally. C &amp; C++ compile in the cloud.
          </p>
        </div>
      </div>
      <Playground />
    </div>
  );
}
