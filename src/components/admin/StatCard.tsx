export function StatCard({ title, value, icon: Icon }: { title: string, value: string | number, icon: any }) {
  return (
    <div className="rounded-[7px] border border-gold/10 bg-card p-6 flex items-center gap-4">
      <div className="p-3 bg-gold/10 rounded-[7px] text-gold">
        <Icon className="size-6" />
      </div>
      <div>
        <p className="text-xs text-cream/50 uppercase tracking-widest">{title}</p>
        <h3 className="text-2xl font-display mt-1">{value}</h3>
      </div>
    </div>
  );
}
