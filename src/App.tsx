import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

// Theme
import { Ctx, LIGHT, DARK } from "./components/Theme";

// Layout & Components
import { NAV_ITEMS, DrawerContent } from "./components/Layout";

// Pages
import GuestView from "./pages/GuestView";
import ResidentPortal from "./pages/ResidentPortal";
import OperatorDashboard from "./pages/OperatorDashboard";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [page, setPage]       = useState("operator");
  const [drawer, setDrawer]   = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 860 : false
  );

  const t = isDark ? DARK : LIGHT;

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 860);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const navigate = (id: string) => { setPage(id); setDrawer(false); };
  const toggleDark = () => setIsDark(d => !d);

  const sidebarWidth = collapsed ? 68 : 270;

  return (
    <Ctx.Provider value={t}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        input, select, button, textarea { font-family: 'Roboto', sans-serif; }
      `}</style>

      <div style={{
        display: "flex", height: "100vh", overflow: "hidden",
        background: t.background,
        fontFamily: "'Roboto', sans-serif", color: t.onSurface,
      }}>

        {/* Desktop sidebar */}
        {!isMobile && (
          <aside style={{
            width: sidebarWidth, flexShrink: 0, background: t.surface,
            borderRight: `1px solid ${t.outlineVariant}`, overflowY: "auto",
            transition: "width 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
            overflowX: "hidden",
          }}>
            <DrawerContent page={page} navigate={navigate} isDark={isDark} toggleDark={toggleDark} collapsed={collapsed} setCollapsed={setCollapsed} />
          </aside>
        )}

        {/* Mobile drawer scrim */}
        {isMobile && drawer && (
          <div onClick={() => setDrawer(false)} style={{
            position: "fixed", inset: 0, background: t.scrim, zIndex: 100,
          }} />
        )}

        {/* Mobile drawer */}
        {isMobile && (
          <div style={{
            position: "fixed", top: 0, left: drawer ? 0 : -290, bottom: 0,
            width: 280, background: t.surface, zIndex: 101,
            boxShadow: drawer ? t.e3 : "none", overflowY: "auto",
            transition: "left 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          }}>
            <DrawerContent page={page} navigate={navigate} isDark={isDark} toggleDark={toggleDark} collapsed={false} setCollapsed={() => {}} />
          </div>
        )}

        {/* Main area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

          {/* Top app bar */}
          <header style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "0 16px", height: 60, flexShrink: 0,
            background: t.surface, borderBottom: `1px solid ${t.outlineVariant}`,
            boxShadow: t.e1,
          }}>
            {isMobile && (
              <button onClick={() => setDrawer(d => !d)} style={{ background: "none", border: "none", cursor: "pointer", color: t.onSurface, display: "flex", padding: 8, borderRadius: "50%" }}>
                <Menu size={22} />
              </button>
            )}

            {isMobile ? (
              <>
                <div style={{ width: 28, height: 28, background: t.primary, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: t.onPrimary, fontWeight: 700, fontSize: 12 }}>CZ</div>
                <span style={{ fontSize: 16, fontWeight: 500, color: t.onSurface }}>
                  {NAV_ITEMS.find(n => n.id === page)?.label}
                </span>
              </>
            ) : (
              <>
                <span style={{ fontSize: 17, fontWeight: 500, color: t.onSurface }}>
                  {NAV_ITEMS.find(n => n.id === page)?.label}
                </span>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.primary }} />
                  <span style={{ fontSize: 12, color: t.onSurfaceVariant }}>Rivervale Condo — Gates A, B online</span>
                </div>
              </>
            )}

          </header>

          {/* Page content */}
          <main style={{ flex: 1, overflowY: "auto" }}>
            {page === "guest"    && <GuestView />}
            {page === "resident" && <ResidentPortal />}
            {page === "operator" && <OperatorDashboard />}
          </main>
        </div>
      </div>
    </Ctx.Provider>
  );
}
