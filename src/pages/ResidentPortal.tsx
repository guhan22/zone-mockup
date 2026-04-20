import { useState, CSSProperties } from "react";
import { Car, UserPlus, Users, History, Edit2, Trash2, Plus, X, RefreshCw, LogIn, LogOut } from "lucide-react";
import { useT } from "../components/Theme";
import { Card, FilledBtn, OutlinedBtn, TonalBtn, Chip, Divider } from "../components/UI";

type TabType = "vehicles" | "register" | "guests" | "history";

interface ResidentVehicle {
  plate: string;
  car: string;
  date: string;
}

export default function ResidentPortal() {
  const t = useT();
  const [tab, setTab] = useState<TabType>("vehicles");
  const tabs = [
    { id: "vehicles", label: "My vehicles",    icon: <Car size={15} /> },
    { id: "register", label: "Register guest", icon: <UserPlus size={15} /> },
    { id: "guests",   label: "Active guests",  icon: <Users size={15} /> },
    { id: "history",  label: "History",        icon: <History size={15} /> },
  ] as const;

  const inputSt: CSSProperties = {
    width: "100%", padding: "11px 14px", borderRadius: 8,
    border: `1px solid ${t.outline}`, background: t.surface,
    color: t.onSurface, fontSize: 13, fontFamily: "inherit",
    outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ padding: "20px", maxWidth: 820 }}>
      {/* Profile */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 500, color: t.onSurface }}>Sarah Tan</div>
          <div style={{ fontSize: 13, color: t.onSurfaceVariant }}>Unit #12-04 · Rivervale Condo</div>
        </div>
        <div style={{
          width: 46, height: 46, borderRadius: "50%",
          background: t.primaryContainer, color: t.onPrimaryContainer,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 500, fontSize: 16,
        }}>ST</div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: `1px solid ${t.outlineVariant}`, marginBottom: 24, overflowX: "auto" }}>
        {tabs.map(({ id, label, icon }) => (
          <button key={id} onClick={() => setTab(id as TabType)} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "10px 20px",
            border: "none", background: "none", cursor: "pointer",
            color: tab === id ? t.primary : t.onSurfaceVariant,
            fontWeight: tab === id ? 500 : 400, fontSize: 13,
            borderBottom: `2px solid ${tab === id ? t.primary : "transparent"}`,
            fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0,
          }}>
            {icon}{label}
          </button>
        ))}
      </div>

      {/* My vehicles */}
      {tab === "vehicles" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 14 }}>
            {([
              { plate: "SBA 3017 G", car: "Toyota Camry", date: "14 Jan 2026" },
              { plate: "SJP 8842 M", car: "Honda Vezel",  date: "3 Mar 2026" },
            ] as ResidentVehicle[]).map(v => (
              <Card key={v.plate}>
                <div style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 500, color: t.onSurface, marginBottom: 4 }}>{v.plate}</div>
                <div style={{ fontSize: 12, color: t.onSurfaceVariant }}>{v.car} · Added {v.date}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                  <OutlinedBtn small icon={<Edit2 size={12} />}>Edit</OutlinedBtn>
                  <OutlinedBtn small danger icon={<Trash2 size={12} />}>Remove</OutlinedBtn>
                </div>
              </Card>
            ))}
            <div style={{
              borderRadius: 16, border: `2px dashed ${t.outlineVariant}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              minHeight: 110, cursor: "pointer", background: t.surfaceContainerHigh,
            }}>
              <span style={{ color: t.onSurfaceVariant, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                <Plus size={16} /> Add vehicle
              </span>
            </div>
          </div>
          <div style={{ fontSize: 12, color: t.onSurfaceVariant, marginTop: 12 }}>
            Your unit is allocated 3 vehicle slots. 1 slot remaining.
          </div>
        </div>
      )}

      {/* Register guest */}
      {tab === "register" && (
        <Card>
          <div style={{ fontSize: 16, fontWeight: 500, color: t.onSurface, marginBottom: 20 }}>Register a guest</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { label: "Guest name",    ph: "e.g. John Lee" },
              { label: "Guest mobile",  ph: "+65 9XXX XXXX" },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontSize: 12, color: t.onSurfaceVariant, display: "block", marginBottom: 6 }}>{f.label}</label>
                <input placeholder={f.ph} style={{ ...inputSt }} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 12, color: t.onSurfaceVariant, display: "block", marginBottom: 6 }}>Vehicle plate (if known)</label>
              <input placeholder="e.g. SHA 9182 A" style={{ ...inputSt, fontFamily: "monospace" }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: t.onSurfaceVariant, display: "block", marginBottom: 6 }}>Purpose</label>
              <select style={{ ...inputSt }}>
                <option>Visit</option><option>Drop-off</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: t.onSurfaceVariant, display: "block", marginBottom: 6 }}>Valid from</label>
              <input type="datetime-local" defaultValue="2026-04-19T14:00" style={{ ...inputSt }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: t.onSurfaceVariant, display: "block", marginBottom: 6 }}>Valid until</label>
              <input type="datetime-local" defaultValue="2026-04-19T18:00" style={{ ...inputSt }} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontSize: 12, color: t.onSurfaceVariant, display: "block", marginBottom: 6 }}>Notes (optional)</label>
              <input placeholder="e.g. Friend visiting for dinner" style={{ ...inputSt }} />
            </div>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, fontSize: 12,
            color: t.onSurfaceVariant, marginTop: 16, padding: "10px 14px",
            background: t.surfaceVariant, borderRadius: 10,
          }}>
            <div style={{ width: 18, height: 18, background: "#25D366", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" fill="white" width={11} height={11}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg>
            </div>
            Guest will receive a WhatsApp message with a self-service link to update their vehicle plate.
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
            <OutlinedBtn>Cancel</OutlinedBtn>
            <FilledBtn icon={<UserPlus size={15} />}>Register guest</FilledBtn>
          </div>
        </Card>
      )}

      {/* Active guests */}
      {tab === "guests" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: t.onSurface }}>Active guests</div>
            <Chip label="3 active" bg={t.primaryContainer} color={t.onPrimaryContainer} />
          </div>
          {[
            { plate: "SHA 9182 A", name: "John Lee",  purpose: "Visit",           until: "6:00 PM today", st: "active" },
            { plate: null,         name: "Mei Ling",  purpose: "Drop-off (taxi)", until: "3:00 PM today", st: "pending" },
            { plate: "SDG 1199 M", name: "David Koh", purpose: "Visit",           until: "9:00 PM today", st: "entered" },
          ].map((g, i) => (
            <Card key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 500, color: g.plate ? t.onSurface : t.onSurfaceVariant, fontStyle: g.plate ? "normal" : "italic", marginBottom: 4 }}>
                    {g.plate || "Plate pending"}
                  </div>
                  <div style={{ fontSize: 13, color: t.onSurfaceVariant }}>{g.name} · {g.purpose}</div>
                  <div style={{ fontSize: 12, color: t.onSurfaceVariant, marginTop: 2 }}>Valid until {g.until}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, flexShrink: 0 }}>
                  <Chip
                    label={g.st === "active" ? "Active" : g.st === "pending" ? "Awaiting plate" : "Entered 2:14 PM"}
                    bg={g.st === "active" ? t.primaryContainer : g.st === "pending" ? "#E8F0FE" : "#EAF2FB"}
                    color={g.st === "active" ? t.onPrimaryContainer : g.st === "pending" ? "#1A3A6B" : "#0C3D6E"}
                  />
                  {g.st === "pending"
                    ? <TonalBtn small icon={<RefreshCw size={12} />}>Resend</TonalBtn>
                    : <OutlinedBtn small danger icon={<X size={12} />}>Revoke</OutlinedBtn>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* History */}
      {tab === "history" && (
        <div>
          <div style={{ fontSize: 16, fontWeight: 500, color: t.onSurface, marginBottom: 16 }}>History</div>
          {[
            { plate: "SBA 3017 G", type: "Resident", action: "Entry", gate: "Gate A", unit: "#12-04",          time: "2:47 PM", denied: false },
            { plate: "SHA 9182 A", type: "Guest",    action: "Entry", gate: "Gate A", unit: "Guest of #08-11", time: "2:14 PM", denied: false },
            { plate: "SLG 2190 B", type: "Unknown",  action: "Denied",gate: "Gate A", unit: "—",              time: "2:02 PM", denied: true },
            { plate: "SGP 5501 H", type: "Resident", action: "Exit",  gate: "Gate C", unit: "#03-07",         time: "1:46 PM", denied: false },
          ].map((e, i) => (
            <Card key={i} style={{ marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 21,
                  background: e.denied ? t.errorContainer : t.primaryContainer,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  {e.action === "Exit" ? <LogOut size={18} color={t.primary} /> : <LogIn size={18} color={e.denied ? t.error : t.primary} />}
                </div>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 500, color: t.onSurface }}>{e.plate}</div>
                  <div style={{ fontSize: 12, color: t.onSurfaceVariant }}>{e.type} · {e.unit}</div>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 12, color: t.onSurfaceVariant, marginBottom: 4 }}>{e.time} · {e.gate}</div>
                <Chip label={e.action} bg={e.denied ? t.errorContainer : t.primaryContainer} color={e.denied ? t.error : t.onPrimaryContainer} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
