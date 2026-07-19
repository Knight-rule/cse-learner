import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: 32 }}>
        <div style={{ fontSize: 80, marginBottom: 24, lineHeight: 1 }}>🔍</div>
        <h2 className="heading-xl mb-4" style={{ fontSize: 48 }}>404</h2>
        <p className="body-lg mb-8" style={{ maxWidth: 420, margin: "0 auto 32px" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary" style={{ padding: "12px 32px" }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
