import { ReactNode, CSSProperties } from "react";
import { useT } from "./Theme";

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function Card({ children, style }: CardProps) {
  const t = useT();
  return (
    <div style={{
      background: t.surfaceContainer, borderRadius: 16,
      padding: "16px 20px", boxShadow: t.e1, ...style,
    }}>
      {children}
    </div>
  );
}

interface BtnProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  full?: boolean;
  small?: boolean;
  danger?: boolean;
}

export function FilledBtn({ children, onClick, icon, full, small, danger }: BtnProps) {
  const t = useT();
  return (
    <button onClick={onClick} style={{
      background: danger ? t.error : t.primary,
      color: danger ? t.onError : t.onPrimary,
      border: "none", borderRadius: 50,
      padding: small ? "6px 18px" : "10px 24px",
      fontSize: small ? 12 : 14, fontWeight: 500, cursor: "pointer",
      display: "flex", alignItems: "center", gap: 8,
      fontFamily: "inherit", width: full ? "100%" : "auto",
      justifyContent: "center",
    }}>
      {icon}{children}
    </button>
  );
}

export function OutlinedBtn({ children, onClick, icon, full, small, danger }: BtnProps) {
  const t = useT();
  return (
    <button onClick={onClick} style={{
      background: "transparent",
      color: danger ? t.error : t.primary,
      border: `1px solid ${danger ? t.error : t.outline}`,
      borderRadius: 50, padding: small ? "5px 16px" : "9px 24px",
      fontSize: small ? 12 : 14, fontWeight: 500, cursor: "pointer",
      display: "flex", alignItems: "center", gap: 6,
      fontFamily: "inherit", width: full ? "100%" : "auto",
      justifyContent: "center",
    }}>
      {icon}{children}
    </button>
  );
}

export function TonalBtn({ children, onClick, icon, full, small }: BtnProps) {
  const t = useT();
  return (
    <button onClick={onClick} style={{
      background: t.secondaryContainer, color: t.onSecondaryContainer,
      border: "none", borderRadius: 50,
      padding: small ? "5px 16px" : "9px 24px",
      fontSize: small ? 12 : 14, fontWeight: 500, cursor: "pointer",
      display: "flex", alignItems: "center", gap: 6,
      fontFamily: "inherit", width: full ? "100%" : "auto",
      justifyContent: "center",
    }}>
      {icon}{children}
    </button>
  );
}

interface ChipProps {
  label: string;
  bg?: string;
  color?: string;
}

export function Chip({ label, bg, color }: ChipProps) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      background: bg, color,
      borderRadius: 8, padding: "3px 10px",
      fontSize: 11, fontWeight: 500, whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

interface DividerProps {
  my?: number;
}

export function Divider({ my = 6 }: DividerProps) {
  const t = useT();
  return <div style={{ height: 1, background: t.outlineVariant, margin: `${my}px 0` }} />;
}

interface SectionLabelProps {
  children: ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  const t = useT();
  return (
    <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.2, textTransform: "uppercase", color: t.primary, marginBottom: 10 }}>
      {children}
    </div>
  );
}
