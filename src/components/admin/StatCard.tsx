import type { LucideIcon } from "lucide-react";

export function StatCard({ title, value, icon: Icon, detail }: { title: string; value: string | number; icon: LucideIcon; detail?: string }) {
  return (
    <article className="group rounded-[7px] border border-admin-ink/10 bg-admin-surface p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-admin-gold/50 hover:shadow-[0_18px_45px_-30px_var(--admin-ink)]">
      <div className="flex items-start justify-between">
        <p className="font-admin-sans text-xs font-semibold uppercase text-admin-ink/45">{title}</p>
        <div className="flex size-8 items-center justify-center rounded-[7px] bg-admin-gold/10 text-admin-gold">
          <Icon className="size-4" />
        </div>
      </div>
      <p className="mt-6 font-admin-display text-3xl font-semibold text-admin-ink">{value}</p>
      <p className="mt-1 font-admin-sans text-xs text-admin-ink/40">{detail ?? "All submitted enquiries"}</p>
    </article>
  );
}
