import { Icon, type IconName } from "@/components/Icon";
import { StatusPill } from "@/components/StatusPill";

const navItems: Array<{ label: string; icon: IconName; active?: boolean }> = [
  { label: "Overview", icon: "dashboard", active: true },
  { label: "Conversations", icon: "message" },
  { label: "Product catalog", icon: "catalog" },
  { label: "Training inbox", icon: "training" },
  { label: "Supplier desk", icon: "supplier" },
  { label: "License", icon: "license" }
];

const metrics = [
  { label: "Catalog items", value: "248", detail: "Indexed", tone: "text-cyanGlow" },
  { label: "Pending review", value: "06", detail: "Approval queue", tone: "text-violetGlow" },
  { label: "Training health", value: "92%", detail: "Owner verified", tone: "text-mint" }
];

export function AutoChatDashboardPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className="dashboard-shell relative mx-auto w-full max-w-3xl" aria-label="Illustrative AutoChat dashboard preview">
      <div className="dashboard-glow dashboard-glow-one" aria-hidden="true" />
      <div className="dashboard-glow dashboard-glow-two" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[1.6rem] border border-white/[0.12] bg-[#080d1b]/95 shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] bg-white/[0.025] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-solar/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
            <Icon name="lock" className="h-3.5 w-3.5" />
            Local desktop pilot
          </div>
        </div>

        <div className="grid min-h-[430px] grid-cols-1 sm:grid-cols-[150px_1fr]">
          <aside className="hidden border-r border-white/[0.08] bg-black/10 p-3 sm:block">
            <div className="mb-5 flex items-center gap-2 px-2 py-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-cyanGlow to-electric font-display text-xs font-bold text-slate-950 shadow-glow">
                A
              </span>
              <div>
                <p className="text-xs font-semibold text-white">AutoChat</p>
                <p className="text-[9px] uppercase tracking-[0.14em] text-slate-600">Control room</p>
              </div>
            </div>
            <div className="space-y-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[10px] transition ${
                    item.active
                      ? "border border-cyanGlow/20 bg-cyanGlow/[0.09] text-cyan-100"
                      : "text-slate-500"
                  }`}
                >
                  <Icon name={item.icon} className="h-3.5 w-3.5" />
                  {item.label}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-mint/15 bg-mint/[0.06] p-3">
              <p className="text-[9px] uppercase tracking-[0.14em] text-slate-500">System</p>
              <p className="mt-1.5 flex items-center gap-1.5 text-[10px] font-medium text-mint">
                <span className="status-dot h-1.5 w-1.5 rounded-full bg-mint" />
                All services ready
              </p>
            </div>
          </aside>

          <div className="min-w-0 p-4 sm:p-5">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyanGlow">Workspace overview</p>
                <h3 className="mt-1.5 font-display text-lg font-semibold text-white sm:text-xl">Good morning, operator.</h3>
                <p className="mt-1 text-[11px] text-slate-500">Your customer support workflow is ready.</p>
              </div>
              <StatusPill tone="mint">WhatsApp connected</StatusPill>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-3">
                  <p className="truncate text-[9px] text-slate-500">{metric.label}</p>
                  <p className={`mt-2 font-display text-lg font-semibold sm:text-xl ${metric.tone}`}>{metric.value}</p>
                  <p className="mt-0.5 hidden text-[9px] text-slate-600 min-[420px]:block">{metric.detail}</p>
                </div>
              ))}
            </div>

            <div className={`mt-3 grid gap-3 ${compact ? "" : "lg:grid-cols-[1.2fr_0.8fr]"}`}>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-violetGlow/15 text-xs font-semibold text-violet-100">AK</span>
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-semibold text-white">Ayesha Khan</p>
                      <p className="truncate text-[9px] text-slate-600">Product availability inquiry</p>
                    </div>
                  </div>
                  <StatusPill tone="violet" dot={false}>Approval mode</StatusPill>
                </div>
                <div className="mt-3 rounded-xl rounded-tl-sm bg-white/[0.055] p-3 text-[10px] leading-4 text-slate-300">
                  Is the blue variant available, and can it be delivered this week?
                </div>
                <div className="mt-2.5 rounded-xl border border-cyanGlow/15 bg-cyanGlow/[0.065] p-3">
                  <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-cyanGlow">
                    <Icon name="spark" className="h-3 w-3" /> AI draft ready
                  </div>
                  <p className="mt-2 text-[10px] leading-4 text-slate-300">
                    The blue variant is in stock. I can help confirm delivery details before the order is finalized.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <span className="rounded-md bg-cyanGlow px-2.5 py-1 text-[9px] font-bold text-slate-950">Approve</span>
                    <span className="rounded-md border border-white/10 px-2.5 py-1 text-[9px] font-medium text-slate-400">Edit draft</span>
                  </div>
                </div>
              </div>

              {!compact ? (
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3.5">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-semibold text-white">Workflow modules</p>
                      <Icon name="workflow" className="h-3.5 w-3.5 text-cyanGlow" />
                    </div>
                    <div className="mt-3 grid gap-2">
                      {["Product catalog", "Training inbox", "Supplier desk", "Voice transcription"].map((item, index) => (
                        <div key={item} className="flex items-center gap-2 text-[9px] text-slate-400">
                          <span className={`h-1.5 w-1.5 rounded-full ${index === 1 ? "bg-violetGlow" : "bg-mint"}`} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-solar/15 bg-solar/[0.05] p-3.5">
                    <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-solar">
                      <Icon name="license" className="h-3.5 w-3.5" /> License section
                    </div>
                    <p className="mt-2 text-[10px] leading-4 text-slate-400">Pilot activation and NEWCOM voucher support are available in-app.</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
