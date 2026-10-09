import Link from "next/link";

const links = [
  { href: "/", label: "Overview" },
  { href: "/before", label: "Before (intentionally weak)" },
  { href: "/after", label: "After (hardened)" },
  { href: "/report", label: "Audit report" },
];

export function AuditNav() {
  return (
    <nav className="audit-nav no-print" aria-label="Audit demo sections">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          style={{
            padding: "0.5rem 0.75rem",
            borderRadius: "var(--pt-radius)",
            border: "1px solid var(--pt-border)",
            textDecoration: "none",
            color: "var(--pt-text)",
            fontSize: "0.875rem",
            background: "var(--pt-surface)",
          }}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
