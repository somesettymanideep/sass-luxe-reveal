import { LayoutDashboard, CalendarDays, Phone, MessageSquare, LogOut, Search } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  return (
    <aside className="w-64 h-screen bg-card border-r border-gold/10 flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h1 className="font-display text-2xl tracking-tight text-cream">
          SASS <span className="text-gold">Admin</span>
        </h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link to="/sass-luxe-reveal/admin" className="flex items-center gap-3 px-4 py-3 rounded-[7px] text-cream/70 hover:bg-gold/10 hover:text-gold transition-all [&.active]:bg-gold/10 [&.active]:text-gold">
          <LayoutDashboard className="size-5" />
          Dashboard
        </Link>
        <Link to="/sass-luxe-reveal/admin" className="flex items-center gap-3 px-4 py-3 rounded-[7px] text-cream/70 hover:bg-gold/10 hover:text-gold transition-all">
          <CalendarDays className="size-5" />
          Bookings
        </Link>
      </nav>

      <div className="p-4 border-t border-gold/10">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-[7px] text-cream/70 hover:bg-destructive/10 hover:text-destructive transition-all"
        >
          <LogOut className="size-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
