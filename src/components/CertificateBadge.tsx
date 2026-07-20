"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award, ArrowRight } from "lucide-react";
import { practiceData } from "@/data/practice";
import { getSolvedProblems } from "@/lib/tracker";

export default function CertificateBadge({ courseSlug }: { courseSlug: string }) {
  const [state, setState] = useState<"loading" | "earned" | "progress" | "none">("loading");
  const [solved, setSolved] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cp = practiceData.find((c) => c.courseSlug === courseSlug);
    if (!cp || cp.problems.length === 0) {
      setState("none");
      return;
    }
    const s = getSolvedProblems();
    const sc = cp.problems.filter((p) => s.has(p.id)).length;
    setSolved(sc);
    setTotal(cp.problems.length);
    setState(sc === cp.problems.length ? "earned" : "progress");
  }, [courseSlug]);

  if (state === "loading" || state === "none") return null;

  if (state === "earned") {
    return (
      <Link href={"/certificates/" + courseSlug} className="btn btn-primary course-card-start" style={{ display: "inline-flex" }}>
        <Award size={16} /> View Your Certificate
      </Link>
    );
  }

  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
  return (
    <div className="cert-course-hint">
      <Award size={16} style={{ color: "var(--text-muted)" }} />
      <span className="body-sm">
        Solve {total - solved} more problem{total - solved === 1 ? "" : "s"} ({pct}% done) to earn your certificate
      </span>
      <Link href={"/practice/" + courseSlug} className="body-sm" style={{ color: "var(--accent)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
        Practice <ArrowRight size={13} />
      </Link>
    </div>
  );
}
