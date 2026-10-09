import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export function DemoBanner({ label = "Portfolio demo template" }: { label?: string }) {
  return (
    <div
      role="status"
      style={{
        background: "#eff6ff",
        borderBottom: "1px solid #bfdbfe",
        color: "#1e40af",
        fontSize: "0.8125rem",
        padding: "0.5rem 1rem",
        textAlign: "center",
      }}
    >
      {label} — mock mode by default; no client data or live credentials.
    </div>
  );
}

export function PageShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <>
      <DemoBanner />
      {(title || subtitle) && (
        <header style={{ padding: "2rem 0 1rem", borderBottom: "1px solid var(--pt-border)" }}>
          <div className="pt-container">
            {title && <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: 700 }}>{title}</h1>}
            {subtitle && (
              <p style={{ margin: "0.5rem 0 0", color: "var(--pt-muted)" }}>{subtitle}</p>
            )}
          </div>
        </header>
      )}
      <main>{children}</main>
    </>
  );
}

const btnBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.625rem 1.25rem",
  borderRadius: "var(--pt-radius)",
  fontWeight: 600,
  fontSize: "0.9375rem",
  cursor: "pointer",
  border: "none",
  textDecoration: "none",
};

export function Button({
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { ...btnBase, background: "var(--pt-accent)", color: "#fff" },
    secondary: {
      ...btnBase,
      background: "var(--pt-surface)",
      color: "var(--pt-text)",
      border: "1px solid var(--pt-border)",
    },
    ghost: { ...btnBase, background: "transparent", color: "var(--pt-accent)" },
  };
  return <button type="button" {...props} style={{ ...styles[variant], ...props.style }} />;
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "0.625rem 0.75rem",
        borderRadius: "var(--pt-radius)",
        border: "1px solid var(--pt-border)",
        fontSize: "1rem",
        boxSizing: "border-box",
        ...props.style,
      }}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{
        width: "100%",
        padding: "0.625rem 0.75rem",
        borderRadius: "var(--pt-radius)",
        border: "1px solid var(--pt-border)",
        fontSize: "1rem",
        minHeight: "6rem",
        boxSizing: "border-box",
        fontFamily: "inherit",
        ...props.style,
      }}
    />
  );
}

export function Label({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.375rem" }}
    >
      {children}
    </label>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: "var(--pt-surface)",
        border: "1px solid var(--pt-border)",
        borderRadius: "var(--pt-radius)",
        padding: "1.25rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
