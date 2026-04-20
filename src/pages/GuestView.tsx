import { useState } from "react";
import { Check, Lock } from "lucide-react";
import { useT } from "../components/Theme";
import { Card, FilledBtn, SectionLabel, Divider } from "../components/UI";

interface InfoCardProps {
  rows: [string, string][];
  label: string;
}

export default function GuestView() {
  const t = useT();
  const [tab, setTab] = useState<"before" | "after">("before");
  const [plate, setPlate] = useState("SHC 6712 K");
  const [saved, setSaved] = useState(false);

  const InfoCard = ({ rows, label }: InfoCardProps) => (
    <Card style={{ marginBottom: 16 }}>
      <SectionLabel>{label}</SectionLabel>
      {rows.map(([k, v], i) => (
        <div key={k}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
            <span style={{ fontSize: 13, color: t.onSurfaceVariant }}>{k}</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: t.onSurface }}>{v}</span>
          </div>
          {i < rows.length - 1 && <Divider my={0} />}
        </div>
      ))}
    </Card>
  );

  return (
    <div style={{ padding: "20px 16px", maxWidth: 480, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{
          width: 56, height: 56, background: t.primary, borderRadius: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: t.onPrimary, fontWeight: 700, fontSize: 20, margin: "0 auto 14px",
          boxShadow: t.e2,
        }}>CZ</div>
        <div style={{ fontSize: 22, fontWeight: 500, color: t.onSurface }}>Crestal Zone</div>
        <div style={{ fontSize: 14, color: t.onSurfaceVariant, marginTop: 4 }}>Rivervale Condo carpark access</div>
      </div>

      {/* Segmented tabs */}
      <div style={{
        display: "flex", background: t.surfaceVariant, borderRadius: 50,
        padding: 4, marginBottom: 24, gap: 4,
      }}>
        {([["before", "Before entry"], ["after", "After entry"]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, padding: "9px 16px", borderRadius: 46, border: "none",
            cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: tab === id ? 500 : 400,
            background: tab === id ? t.surface : "transparent",
            color: tab === id ? t.primary : t.onSurfaceVariant,
            boxShadow: tab === id ? t.e1 : "none",
            transition: "background 0.15s, color 0.15s",
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* Before entry */}
      {tab === "before" && (
        <>
          <InfoCard label="Invitation details" rows={[
            ["Invited by", "Sarah Tan (#12-04)"],
            ["Purpose", "Drop-off"],
            ["Valid until", "3:00 PM, 19 Apr 2026"],
          ]} />

          <div style={{
            background: t.primaryContainer, color: t.onPrimaryContainer,
            borderRadius: 12, padding: "12px 16px", fontSize: 13,
            textAlign: "center", marginBottom: 20, fontWeight: 500,
          }}>
            Your vehicle plate is needed for entry
          </div>

          <Card style={{ marginBottom: 20 }}>
            <SectionLabel>Your vehicle plate</SectionLabel>
            <input
              value={plate}
              onChange={e => { setPlate(e.target.value.toUpperCase()); setSaved(false); }}
              style={{
                width: "100%", padding: "16px", borderRadius: 12,
                border: `2px solid ${t.primary}`,
                background: t.surface, color: t.onSurface,
                fontSize: 24, fontFamily: "monospace",
                fontWeight: 500, textAlign: "center", letterSpacing: 4,
                outline: "none", boxSizing: "border-box",
              }}
            />
            <div style={{ fontSize: 12, color: t.onSurfaceVariant, marginTop: 10, textAlign: "center", lineHeight: 1.6 }}>
              Taking a taxi or Grab? Enter the plate from your booking.
            </div>
          </Card>

          <FilledBtn full icon={<Check size={16} />} onClick={() => setSaved(true)}>
            Save plate number
          </FilledBtn>

          {saved && (
            <div style={{
              background: t.primaryContainer, color: t.onPrimaryContainer,
              borderRadius: 12, padding: "10px 16px", fontSize: 13,
              textAlign: "center", marginTop: 12, display: "flex",
              alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              <Check size={14} /> Plate saved successfully!
            </div>
          )}

          <div style={{ fontSize: 12, color: t.onSurfaceVariant, textAlign: "center", marginTop: 20, lineHeight: 1.7 }}>
            The barrier gate will open automatically when your vehicle is detected. This link will lock once you've entered.
          </div>
        </>
      )}

      {/* After entry */}
      {tab === "after" && (
        <>
          <InfoCard label="Entry details" rows={[
            ["Invited by", "Sarah Tan (#12-04)"],
            ["Purpose", "Drop-off"],
            ["Entered at", "2:47 PM, 19 Apr 2026"],
          ]} />

          <div style={{
            background: t.primaryContainer, color: t.onPrimaryContainer,
            borderRadius: 12, padding: "12px 16px", fontSize: 13,
            textAlign: "center", marginBottom: 20, display: "flex",
            alignItems: "center", justifyContent: "center", gap: 8, fontWeight: 500,
          }}>
            <Check size={16} /> Entry confirmed — plate locked
          </div>

          <Card>
            <SectionLabel>Vehicle plate (locked)</SectionLabel>
            <div style={{
              padding: "16px", borderRadius: 12,
              background: t.surfaceVariant, color: t.onSurfaceVariant,
              fontSize: 24, fontFamily: "monospace",
              fontWeight: 500, textAlign: "center", letterSpacing: 4,
            }}>SHC 6712 K</div>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 6, marginTop: 12, fontSize: 12, color: t.onSurfaceVariant,
            }}>
              <Lock size={14} /> This page is now read-only
            </div>
            <Divider my={14} />
            <div style={{ fontSize: 12, color: t.onSurfaceVariant, textAlign: "center", lineHeight: 1.7 }}>
              Need to change your vehicle? Contact Sarah Tan to register a new guest entry.
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
