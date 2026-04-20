import { useState, useEffect } from "react";
import { Check, X, Eye, Wifi, Search, Users } from "lucide-react";
import { useT } from "../components/Theme";
import { Card, TonalBtn, OutlinedBtn, Chip, Divider } from "../components/UI";

interface Event {
  plate: string;
  gate: string;
  conf: number;
  status: "pending" | "matched" | "denied";
  time: string;
  unit?: string;
  label?: string;
  note?: string;
}

interface Gate {
  name: string;
  online: boolean;
}

export default function OperatorDashboard() {
  const t = useT();
  const [feedTab, setFeedTab] = useState<"live" | "history" | "alerts">("live");
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 860 : false
  );

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 860);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const events: Event[] = [
    { plate: "SJK 4821 D", gate: "Gate A (entry)", conf: 87, status: "pending", time: "12s ago" },
    { plate: "SBA 3017 G", gate: "Gate A (entry)", conf: 96, unit: "#12-04",          status: "matched", label: "Resident — auto-opened", time: "1m ago" },
    { plate: "SHA 9182 A", gate: "Gate A (entry)", conf: 93, unit: "Guest of #08-11", status: "matched", label: "Guest — auto-opened",    time: "4m ago" },
    { plate: "SHB 7744 E", gate: "Gate B (entry)", conf: 72, status: "pending", time: "5m ago" },
    { plate: "SLG 2190 B", gate: "Gate A (entry)", conf: 91, status: "denied",  label: "Denied — unregistered", note: 'Ahmad R. · "No matching unit"', time: "12m ago" },
    { plate: "SGP 5501 H", gate: "Gate B (exit)",  conf: 98, unit: "#03-07",    status: "matched", label: "Resident — auto-opened", time: "18m ago" },
  ];

  const ss = (s: Event["status"]) => ({
    matched: { bg: t.primaryContainer, color: t.onPrimaryContainer },
    pending: { bg: "#E8F0FE", color: "#1A3A6B" },
    denied:  { bg: t.errorContainer, color: t.error },
  }[s]);

  const bl = (s: Event["status"]) => ({ matched: t.primary, pending: "#2563EB", denied: t.error }[s]);

  return (
    <div style={{ padding: isMobile ? "12px" : "20px" }}>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Entries today",    val: 147, color: t.primary },
          { label: "Exits today",      val: 132, color: t.onSurface },
          { label: "Pending review",   val: 3,   color: "#2563EB" },
          { label: "Manual overrides", val: 5,   color: t.onSurface },
        ].map(s => (
          <Card key={s.label}>
            <div style={{ fontSize: 12, color: t.onSurfaceVariant, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 30, fontWeight: 500, color: s.color }}>{s.val}</div>
          </Card>
        ))}
      </div>

      <div style={{ 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row", 
        gap: 16, 
        alignItems: "start" 
      }}>
        {/* Feed */}
        <div style={{ flex: 1, width: "100%", minWidth: 0 }}>
          <div style={{ 
            display: "flex", 
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between", 
            alignItems: isMobile ? "stretch" : "center", 
            borderBottom: `1px solid ${t.outlineVariant}`, 
            marginBottom: 16, 
            gap: isMobile ? 12 : 16 
          }}>
            <div style={{ display: "flex", overflowX: "auto" }}>
              {([["live", "Live feed"], ["history", "History"], ["alerts", "Alerts"]] as const).map(([id, label]) => (
                <button key={id} onClick={() => setFeedTab(id)} style={{
                  fontSize: 13, padding: "8px 18px", color: feedTab === id ? t.primary : t.onSurfaceVariant,
                  background: "none", border: "none", borderBottom: `2px solid ${feedTab === id ? t.primary : "transparent"}`,
                  cursor: "pointer", fontWeight: feedTab === id ? 500 : 400, fontFamily: "inherit",
                  whiteSpace: "nowrap"
                }}>
                  {label}
                </button>
              ))}
            </div>
            
            <div style={{ position: "relative", marginBottom: 6, width: isMobile ? "100%" : 200 }}>
              <input placeholder="Search plates..." style={{
                width: "100%", padding: "7px 12px 7px 34px",
                borderRadius: 8, border: `1px solid ${t.outlineVariant}`,
                background: t.surfaceVariant, fontSize: 12, color: t.onSurface,
                outline: "none", boxSizing: "border-box", fontFamily: "inherit",
              }} />
              <Search size={14} color={t.onSurfaceVariant} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {events.map((ev, i) => {
              const style = ss(ev.status);
              return (
                <div key={i} style={{
                  background: t.surfaceContainer, borderRadius: 14,
                  padding: 14, borderLeft: `3px solid ${bl(ev.status)}`,
                  boxShadow: t.e1,
                }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{
                      width: 80, height: 46, borderRadius: 8, background: t.surfaceVariant,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, fontFamily: "monospace", color: t.onSurfaceVariant, flexShrink: 0,
                    }}>
                      {ev.plate}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 500, color: t.onSurface }}>{ev.plate}</div>
                          <div style={{ fontSize: 12, color: t.onSurfaceVariant, marginTop: 2 }}>
                            {ev.gate}{ev.unit ? ` · ${ev.unit}` : ""} · {ev.conf}% confidence
                          </div>
                        </div>
                        <span style={{ fontSize: 11, color: t.onSurfaceVariant, flexShrink: 0, marginLeft: 8 }}>{ev.time}</span>
                      </div>
                      {ev.label && <div style={{ marginTop: 8 }}><Chip label={ev.label} bg={style.bg} color={style.color} /></div>}
                      {ev.note  && <div style={{ fontSize: 11, color: t.onSurfaceVariant, marginTop: 6 }}>{ev.note}</div>}
                      {ev.status === "pending" && (
                        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                          <TonalBtn small icon={<Check size={12} />}>Allow</TonalBtn>
                          <OutlinedBtn small danger icon={<X size={12} />}>Deny</OutlinedBtn>
                          <OutlinedBtn small icon={<Eye size={12} />}>View image</OutlinedBtn>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side panels */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: 14, 
          width: isMobile ? "100%" : "280px",
          marginTop: isMobile ? 12 : 0
        }}>
          <Card>
            <div style={{ fontSize: 14, fontWeight: 500, color: t.onSurface, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <Wifi size={16} color={t.primary} /> Gate status
            </div>
            {([
              { name: "Gate A (main entry)", online: true },
              { name: "Gate B (side entry)", online: true },
              { name: "Gate C (exit only)",  online: false },
            ] as Gate[]).map((g, i, arr) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
                  <span style={{ fontSize: 13, color: t.onSurface }}>{g.name}</span>
                  <Chip label={g.online ? "Online" : "Idle"} bg={g.online ? t.primaryContainer : t.surfaceVariant} color={g.online ? t.onPrimaryContainer : t.onSurfaceVariant} />
                </div>
                {i < arr.length - 1 && <Divider my={0} />}
              </div>
            ))}
          </Card>

          <Card>
            <div style={{ fontSize: 14, fontWeight: 500, color: t.onSurface, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <Users size={16} color={t.primary} /> Active guests (2 hrs)
            </div>
            {[
              { plate: "SHA 9182 A", unit: "#08-11 · Visit" },
              { plate: "SJH 6623 C", unit: "#15-02 · Drop-off" },
              { plate: "SDG 1199 M", unit: "#04-18 · Visit" },
              { plate: "Pending…",   unit: "#11-06 · Taxi", pending: true },
            ].map((g, i, arr) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0" }}>
                  <span style={{ fontFamily: "monospace", fontSize: 12, color: g.pending ? t.onSurfaceVariant : t.onSurface, fontStyle: g.pending ? "italic" : "normal" }}>{g.plate}</span>
                  <span style={{ fontSize: 12, color: t.onSurfaceVariant }}>{g.unit}</span>
                </div>
                {i < arr.length - 1 && <Divider my={0} />}
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
