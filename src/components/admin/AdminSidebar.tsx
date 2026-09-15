import { CalendarDays, LayoutDashboard, LogOut, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import logoUrl from "@/assets/sass-logo-custom.png?url";

export function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  return (
    <aside className="flex w-full shrink-0 flex-row items-center justify-between bg-admin-ink px-4 py-3 font-admin-sans text-admin-canvas lg:min-h-screen lg:w-64 lg:flex-col lg:items-stretch lg:px-5 lg:py-8">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 lg:px-2">
        <Link to="/" className="shrink-0 transition-opacity hover:opacity-85" title="View SASS Website">
          <img src={logoUrl} alt="SASS Hair & Beauty" className="h-9 w-auto object-contain" />
        </Link>
        <span className="rounded-[5px] border border-admin-gold/40 bg-admin-gold/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-admin-gold">
          Admin
        </span>
      </div>

      <nav className="hidden flex-1 pt-10 lg:block space-y-1.5">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-admin-canvas/35">Workspace</p>
        <Link
          to="/admin"
          className="flex items-center gap-3 rounded-[7px] bg-admin-gold text-admin-ink px-3.5 py-3 text-sm font-semibold transition"
        >
          <LayoutDashboard className="size-4.5" />
          Dashboard
        </Link>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-[7px] px-3.5 py-2.5 text-sm text-admin-canvas/60 transition hover:bg-admin-surface/10 hover:text-admin-surface"
        >
          <span className="flex items-center gap-3">
            <ExternalLink className="size-4" />
            View Live Site
          </span>
        </a>
      </nav>

      <div className="hidden border-t border-admin-surface/10 pt-5 lg:block">
        <div className="mb-4 flex items-center gap-3 px-2">
          <div className="flex size-9 items-center justify-center rounded-[7px] bg-admin-gold font-admin-display text-xs font-bold text-admin-ink">
            SA
          </div>
          <div>
            <p className="text-sm font-medium">Administrator</p>
            <p className="text-xs text-admin-canvas/40">SASS Hair & Beauty</p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={onLogout}
          className="h-10 w-full justify-start gap-2.5 text-admin-canvas/55 hover:bg-admin-surface/10 hover:text-admin-surface"
        >
          <LogOut className="size-4" /> Sign out
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onLogout}
        aria-label="Sign out"
        className="text-admin-canvas hover:bg-admin-surface/10 hover:text-admin-surface lg:hidden"
      >
        <LogOut className="size-4" />
      </Button>
    </aside>
  );
}
