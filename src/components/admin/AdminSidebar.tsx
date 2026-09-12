import { CalendarDays, LayoutDashboard, LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  return (
    <aside className="flex w-full shrink-0 flex-row items-center justify-between bg-admin-ink px-4 py-3 font-admin-sans text-admin-canvas lg:min-h-screen lg:w-60 lg:flex-col lg:items-stretch lg:px-5 lg:py-8">
      <div className="flex items-center gap-3 lg:px-3">
        <div className="flex size-9 items-center justify-center rounded-[7px] bg-admin-gold text-admin-ink">
          <Sparkles className="size-4" />
        </div>
        <div>
          <p className="font-admin-display text-lg font-semibold leading-none">SASS</p>
          <p className="mt-1 text-[10px] font-medium uppercase text-admin-canvas/50">Salon desk</p>
        </div>
      </div>

      <nav className="hidden flex-1 pt-14 lg:block">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase text-admin-canvas/35">Workspace</p>
        <div className="flex items-center gap-3 rounded-[7px] bg-admin-surface/10 px-3 py-3 text-sm font-medium text-admin-surface">
          <LayoutDashboard className="size-5" />
          Overview
        </div>
        <div className="mt-2 flex items-center gap-3 px-3 py-3 text-sm text-admin-canvas/55">
          <CalendarDays className="size-5" /> Bookings
        </div>
      </nav>

      <div className="hidden border-t border-admin-surface/10 pt-5 lg:block">
        <div className="mb-4 flex items-center gap-3 px-2">
          <div className="flex size-9 items-center justify-center rounded-[7px] bg-admin-gold font-admin-display text-xs font-bold text-admin-ink">SA</div>
          <div><p className="text-sm font-medium">Administrator</p><p className="text-xs text-admin-canvas/40">SASS Hair & Beauty</p></div>
        </div>
        <Button
          variant="ghost"
          onClick={onLogout}
          className="h-10 w-full justify-start text-admin-canvas/55 hover:bg-admin-surface/10 hover:text-admin-surface"
        >
          <LogOut /> Sign out
        </Button>
      </div>

      <Button variant="ghost" size="icon" onClick={onLogout} aria-label="Sign out" className="text-admin-canvas hover:bg-admin-surface/10 hover:text-admin-surface lg:hidden"><LogOut /></Button>
    </aside>
  );
}
