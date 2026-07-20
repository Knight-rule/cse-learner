"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Award, Printer, ArrowRight, CheckCircle2 } from "lucide-react";
import { courses } from "@/data/courses";
import { practiceData } from "@/data/practice";
import { getSolvedProblems, getCertificateId, getLearnerName, getCertificates } from "@/lib/tracker";

export default function CertificateViewPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null);
  const [earned, setEarned] = useState(false);
  const [name, setName] = useState("CSE Learner");
  const [date, setDate] = useState("");
  const [certId, setCertId] = useState("");
  const [solvedCount, setSolvedCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    const course = courses.find((c) => c.slug === slug);
    const cp = practiceData.find((c) => c.courseSlug === slug);
    if (!course || !cp) return;
    const t = cp.problems.length;
    const solvedSet = getSolvedProblems();
    const sc = cp.problems.filter((pr) => solvedSet.has(pr.id)).length;
    setTotal(t);
    setSolvedCount(sc);
    const isEarned = t > 0 && sc === t;
    setEarned(isEarned);
    setName(getLearnerName());
    if (isEarned) {
      setCertId(getCertificateId(slug));
      const cert = getCertificates().find((c) => c.courseSlug === slug);
      setDate(cert ? new Date(cert.issuedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
    }
  }, [slug]);

  if (!slug) return null;

  const course = courses.find((c) => c.slug === slug);
  const color = course ? course.color.split(" ")[0] || "#f97316" : "#f97316";

  if (!course) {
    return (
      <div className="section">
        <div className="container text-center">
          <h1 className="heading-lg mb-4">Certificate Not Found</h1>
          <Link href="/certificates" className="btn btn-primary">Back to Certificates</Link>
        </div>
      </div>
    );
  }

  if (!earned) {
    const pct = total > 0 ? Math.round((solvedCount / total) * 100) : 0;
    return (
      <div className="section">
        <div className="container container-sm text-center">
          <div className="breadcrumb justify-center">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <Link href="/certificates">Certificates</Link>
            <ChevronRight size={14} />
            <span>{course.title}</span>
          </div>
          <div className="empty-icon">🔒</div>
          <h1 className="heading-lg mb-4">Certificate Locked</h1>
          <p className="body-md mb-6">
            Solve all {total} practice problems in <strong>{course.title}</strong> to unlock this certificate. You&apos;ve completed {solvedCount}/{total} ({pct}%).
          </p>
          <div className="progress-bar mb-6" style={{ maxWidth: 360, margin: "0 auto 24px" }}>
            <div className="progress-fill" style={{ width: pct + "%" }} />
          </div>
          <Link href={"/practice/" + slug} className="btn btn-primary">
            Continue Practice <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cert-print-page">
      <div className="cert-print-actions no-print">
        <Link href="/certificates" className="practice-toolbar-btn"><ChevronRight size={14} style={{ transform: "rotate(180deg)" }} /> Back</Link>
        <button className="btn btn-primary" onClick={() => window.print()}><Printer size={16} /> Print / Save as PDF</button>
      </div>

      <div className="cert-document" style={{ borderColor: color }}>
        <div className="cert-document-inner" style={{ borderColor: color + "55" }}>
          <div className="cert-logo">
            <span className="cse">CSE</span><span className="learner">Learner</span>
          </div>
          <p className="cert-eyebrow">Certificate of Completion</p>
          <div className="cert-seal" style={{ background: "linear-gradient(135deg, " + color + ", var(--accent-purple))" }}>
            <Award size={30} color="#fff" />
          </div>
          <p className="cert-awarded">This certifies that</p>
          <h1 className="cert-learner-name">{name}</h1>
          <p className="cert-body">
            has successfully completed all practice problems for the course
          </p>
          <h2 className="cert-course" style={{ color }}>{course.title}</h2>
          <div className="cert-meta">
            <div>
              <span className="cert-meta-label">Issue Date</span>
              <span className="cert-meta-value">{date}</span>
            </div>
            <div>
              <span className="cert-meta-label">Certificate ID</span>
              <span className="cert-meta-value">{certId}</span>
            </div>
          </div>
          <div className="cert-sign">
            <div className="cert-sign-line" />
            <span>CSE Learner Academy</span>
          </div>
          <p className="cert-foot">Verify at cse-learner.onrender.com/certificates/{slug}</p>
        </div>
      </div>
    </div>
  );
}
