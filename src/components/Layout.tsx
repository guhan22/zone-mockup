import { ReactNode } from "react";
import { Sun, Moon, ChevronLeft, ChevronRight, Activity, Home, Smartphone, LucideIcon } from "lucide-react";
import { useT } from "./Theme";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "operator", label: "Operator dashboard", icon: Activity },
  { id: "resident", label: "Resident portal",    icon: Home },
  { id: "guest",    label: "Guest self-service", icon: Smartphone },
];

interface DrawerContentProps {
  page: string;
  navigate: (id: string) => void;
  isDark: boolean;
  toggleDark: () => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function DrawerContent({ page, navigate, isDark, toggleDark, collapsed, setCollapsed }: DrawerContentProps) {
  const t = useT();

  if (collapsed) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", padding: "12px 0", gap: 4 }}>
        <div style={{
          width: 38, height: 38, background: t.primary, borderRadius: 11,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: t.onPrimary, fontWeight: 700, fontSize: 14, boxShadow: t.e1,
          marginBottom: 16,
        }}>CZ</div>

        <button onClick={() => setCollapsed(false)} title="Expand sidebar" style={{
          width: 44, height: 44, borderRadius: 22, border: "none", cursor: "pointer",
          background: t.surfaceVariant, color: t.onSurfaceVariant,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 8,
        }}>
          <ChevronRight size={18} />
        </button>

        <nav style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: "100%" }}>
          {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
            const active = page === id;
            return (
              <button key={id} onClick={() => navigate(id)} title={label} style={{
                width: 44, height: 44, borderRadius: 22, border: "none", cursor: "pointer",
                background: active ? t.secondaryContainer : "transparent",
                color: active ? t.onSecondaryContainer : t.onSurfaceVariant,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon size={20} />
              </button>
            );
          })}
        </nav>

        <button onClick={toggleDark} title={isDark ? "Light mode" : "Dark mode"} style={{
          width: 44, height: 44, borderRadius: 22, border: "none", cursor: "pointer",
          background: "transparent", color: t.onSurfaceVariant,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "8px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 14px 24px 20px" }}>
        <div style={{
          width: 38, height: 38, background: t.primary, borderRadius: 11,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: t.onPrimary, fontWeight: 700, fontSize: 14, boxShadow: t.e1,
          flexShrink: 0,
        }}>CZ</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: t.onSurface }}>Crestal Zone</div>
          <div style={{ fontSize: 11, color: t.onSurfaceVariant }}>Rivervale Condo</div>
        </div>
        <button onClick={() => setCollapsed(true)} title="Collapse sidebar" style={{
          width: 32, height: 32, borderRadius: 16, border: "none", cursor: "pointer",
          background: "transparent", color: t.onSurfaceVariant, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ChevronLeft size={18} />
        </button>
      </div>

      <nav style={{ flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.2, textTransform: "uppercase", color: t.onSurfaceVariant, padding: "4px 20px 8px" }}>Views</div>
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = page === id;
          return (
            <button key={id} onClick={() => navigate(id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 14,
              padding: "13px 20px", border: "none", cursor: "pointer",
              background: active ? t.secondaryContainer : "transparent",
              color: active ? t.onSecondaryContainer : t.onSurfaceVariant,
              borderRadius: "0 50px 50px 0", fontFamily: "inherit",
              fontSize: 14, fontWeight: active ? 500 : 400,
              textAlign: "left", marginBottom: 2, marginRight: 14,
            }}>
              <Icon size={20} />{label}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "12px 14px" }}>
        <button onClick={toggleDark} style={{
          width: "100%", display: "flex", alignItems: "center", gap: 10,
          padding: "10px 16px", border: `1px solid ${t.outlineVariant}`,
          borderRadius: 50, cursor: "pointer",
          background: t.surfaceVariant, color: t.onSurfaceVariant,
          fontFamily: "inherit", fontSize: 13,
        }}>
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          {isDark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </div>
  );
}
