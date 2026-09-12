import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  MapPin,
  MessageSquareText,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";
import { format } from "date-fns";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { StatCard } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { getBookings } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal | SASS Hair & Beauty" },
      { name: "description", content: "Manage SASS Hair & Beauty appointments and customer enquiries." },
      { property: "og:title", content: "Admin Portal | SASS Hair & Beauty" },
      { property: "og:description", content: "Manage SASS Hair & Beauty appointments and customer enquiries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPanel,
});

type Booking = {
  id: string;
  name: string | null;
  phone: string | null;
  service: string | null;
  branch: string | null;
  message: string | null;
  status: string | null;
  created_at: string | null;
};

const filters = ["all", "booking", "contact", "consultation"] as const;

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<(typeof filters)[number]>("all");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getBookings();
      setBookings((data ?? []) as Booking[]);
    } catch (fetchError) {
      console.error(fetchError);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    if (username === "sass" && password === "Admin@2026") {
      setIsAuthenticated(true);
      setError("");
      localStorage.setItem("sass_admin_auth", "true");
      return;
    }
    setError("The username or password is incorrect. Please try again.");
  };

  useEffect(() => {
    if (localStorage.getItem("sass_admin_auth") === "true") setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) void fetchBookings();
  }, [isAuthenticated]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("sass_admin_auth");
  };

  const query = searchQuery.toLowerCase();
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.name?.toLowerCase().includes(query) ||
      booking.phone?.includes(searchQuery) ||
      booking.service?.toLowerCase().includes(query);
    return filterType === "all"
      ? matchesSearch
      : matchesSearch && booking.status?.toLowerCase() === filterType;
  });

  const today = new Date().toISOString().split("T")[0];
  const stats = {
    total: bookings.length,
    today: bookings.filter((booking) => booking.created_at?.startsWith(today)).length,
    bookings: bookings.filter((booking) => !booking.status || booking.status === "booking").length,
    leads: bookings.filter((booking) => booking.status === "contact" || booking.status === "consultation").length,
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-admin-canvas font-admin-sans text-admin-ink lg:grid lg:grid-cols-[minmax(320px,0.9fr)_minmax(520px,1.1fr)]">
        <section className="relative hidden overflow-hidden bg-admin-ink p-12 text-admin-canvas lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-[7px] bg-admin-gold text-admin-ink"><Sparkles className="size-5" /></div>
            <div><p className="font-admin-display text-xl font-semibold">SASS</p><p className="text-[10px] font-semibold uppercase text-admin-canvas/45">Hair & Beauty</p></div>
          </div>
          <div className="relative max-w-lg">
            <p className="mb-5 text-xs font-semibold uppercase text-admin-gold">Private administration</p>
            <h1 className="font-admin-display text-5xl font-semibold leading-[1.05] text-admin-surface xl:text-6xl">Your salon,<br />beautifully managed.</h1>
            <p className="mt-6 max-w-md text-base leading-7 text-admin-canvas/55">Review every appointment and enquiry from one focused workspace.</p>
          </div>
          <div className="flex items-center gap-3 border-t border-admin-surface/10 pt-6 text-xs text-admin-canvas/40"><ShieldCheck className="size-4 text-admin-gold" /> Secure administrator access</div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex size-10 items-center justify-center rounded-[7px] bg-admin-ink text-admin-gold"><Sparkles className="size-5" /></div>
              <div><p className="font-admin-display text-xl font-semibold">SASS</p><p className="text-[10px] font-semibold uppercase text-admin-ink/45">Admin portal</p></div>
            </div>
            <p className="text-xs font-semibold uppercase text-admin-gold">Welcome back</p>
            <h2 className="mt-3 font-admin-display text-4xl font-semibold text-admin-ink">Sign in to your workspace</h2>
            <p className="mt-3 text-sm leading-6 text-admin-ink/50">Enter your administrator credentials to continue.</p>

            <form onSubmit={handleLogin} className="mt-9 space-y-5">
              <div>
                <label htmlFor="admin-username" className="mb-2 block text-xs font-semibold text-admin-ink/65">Username</label>
                <div className="relative">
                  <UserRound className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-admin-ink/35" />
                  <input id="admin-username" type="text" value={username} onChange={(event) => { setUsername(event.target.value); setError(""); }} className="h-13 w-full rounded-[7px] border border-admin-ink/15 bg-admin-surface pl-11 pr-4 text-sm text-admin-ink outline-none transition focus:border-admin-gold focus:ring-2 focus:ring-admin-gold/20" placeholder="Enter username" autoComplete="username" required />
                </div>
              </div>
              <div>
                <label htmlFor="admin-password" className="mb-2 block text-xs font-semibold text-admin-ink/65">Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-admin-ink/35" />
                  <input id="admin-password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => { setPassword(event.target.value); setError(""); }} className="h-13 w-full rounded-[7px] border border-admin-ink/15 bg-admin-surface pl-11 pr-12 text-sm text-admin-ink outline-none transition focus:border-admin-gold focus:ring-2 focus:ring-admin-gold/20" placeholder="Enter password" autoComplete="current-password" required />
                  <Button type="button" variant="ghost" size="icon" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-2 top-1/2 -translate-y-1/2 text-admin-ink/45 hover:bg-admin-canvas hover:text-admin-ink">{showPassword ? <EyeOff /> : <Eye />}</Button>
                </div>
              </div>
              {error && <p role="alert" className="rounded-[7px] border border-admin-gold/35 bg-admin-gold/10 px-4 py-3 text-sm font-medium text-admin-ink">{error}</p>}
              <Button type="submit" className="h-13 w-full rounded-[7px] bg-admin-ink font-admin-sans text-sm font-semibold text-admin-surface shadow-none hover:bg-admin-gold hover:text-admin-ink">Secure sign in</Button>
            </form>
            <p className="mt-8 flex items-center justify-center gap-2 text-xs text-admin-ink/35"><ShieldCheck className="size-3.5" /> Protected staff workspace</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-admin-canvas font-admin-sans text-admin-ink lg:flex">
      <AdminSidebar onLogout={handleLogout} />
      <main className="min-w-0 flex-1">
        <header className="border-b border-admin-ink/10 bg-admin-surface px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-admin-gold">Salon operations</p>
              <h1 className="mt-2 font-admin-display text-3xl font-semibold sm:text-4xl">Bookings overview</h1>
              <p className="mt-2 text-sm text-admin-ink/45">Monitor new appointments and customer enquiries.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative block sm:w-72">
                <span className="sr-only">Search bookings</span>
                <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-admin-ink/35" />
                <input type="search" placeholder="Search name, phone or service" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="h-11 w-full rounded-[7px] border border-admin-ink/10 bg-admin-canvas pl-11 pr-4 text-sm outline-none transition focus:border-admin-gold focus:ring-2 focus:ring-admin-gold/20" />
              </label>
              <Button onClick={() => void fetchBookings()} disabled={loading} className="h-11 rounded-[7px] bg-admin-gold px-5 font-admin-sans text-admin-ink shadow-none hover:bg-admin-ink hover:text-admin-surface">
                {loading ? <Loader2 className="animate-spin" /> : <RefreshCw />} Refresh
              </Button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] p-5 sm:p-8 lg:p-10">
          <section aria-label="Booking summary" className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
            <StatCard title="Total leads" value={stats.total} icon={UsersRound} detail="All submitted enquiries" />
            <StatCard title="New today" value={stats.today} icon={Clock3} detail="Received since midnight" />
            <StatCard title="Bookings" value={stats.bookings} icon={CalendarDays} detail="Appointment requests" />
            <StatCard title="Consultations" value={stats.leads} icon={BriefcaseBusiness} detail="Contact and consultation leads" />
          </section>

          <section className="mt-8 overflow-hidden rounded-[7px] border border-admin-ink/10 bg-admin-surface">
            <div className="flex flex-col gap-4 border-b border-admin-ink/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-6">
              <div><h2 className="font-admin-display text-xl font-semibold">Recent enquiries</h2><p className="mt-1 text-xs text-admin-ink/40">{filteredBookings.length} records shown</p></div>
              <div className="flex gap-1 overflow-x-auto rounded-[7px] bg-admin-canvas p-1">
                {filters.map((type) => (
                  <Button key={type} variant="ghost" size="sm" onClick={() => setFilterType(type)} className={`shrink-0 rounded-[7px] px-3 font-admin-sans text-xs capitalize ${filterType === type ? "bg-admin-ink text-admin-surface hover:bg-admin-ink hover:text-admin-surface" : "text-admin-ink/45 hover:bg-admin-surface hover:text-admin-ink"}`}>{type}</Button>
                ))}
              </div>
            </div>

            {loading && bookings.length === 0 ? (
              <div className="flex min-h-72 flex-col items-center justify-center"><Loader2 className="size-6 animate-spin text-admin-gold" /><p className="mt-3 text-sm text-admin-ink/45">Loading enquiries…</p></div>
            ) : filteredBookings.length === 0 ? (
              <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center"><Search className="size-7 text-admin-gold" /><p className="mt-3 font-admin-display text-lg font-semibold">No records found</p><p className="mt-1 text-sm text-admin-ink/40">Try another search or filter.</p></div>
            ) : (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full min-w-[850px] text-left">
                    <thead className="bg-admin-canvas text-[10px] font-semibold uppercase text-admin-ink/40"><tr><th className="px-6 py-4">Customer</th><th className="px-4 py-4">Service</th><th className="px-4 py-4">Branch</th><th className="px-4 py-4">Received</th><th className="px-4 py-4">Status</th><th className="px-6 py-4">Message</th></tr></thead>
                    <tbody className="divide-y divide-admin-ink/10">{filteredBookings.map((booking) => <BookingRow key={booking.id} booking={booking} />)}</tbody>
                  </table>
                </div>
                <div className="divide-y divide-admin-ink/10 md:hidden">{filteredBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)}</div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: string | null }) {
  return <span className="inline-flex rounded-[7px] border border-admin-gold/30 bg-admin-gold/10 px-2.5 py-1 text-[10px] font-bold uppercase text-admin-ink">{status || "Booking"}</span>;
}

function BookingRow({ booking }: { booking: Booking }) {
  return (
    <tr className="transition-colors hover:bg-admin-canvas/60">
      <td className="px-6 py-5"><p className="text-sm font-semibold">{booking.name || "Unknown"}</p>{booking.phone && <a href={`tel:${booking.phone}`} className="mt-1 flex items-center gap-1.5 text-xs text-admin-ink/45 hover:text-admin-gold"><Phone className="size-3" />{booking.phone}</a>}</td>
      <td className="px-4 py-5 text-sm text-admin-ink/65">{booking.service || "General enquiry"}</td>
      <td className="px-4 py-5"><span className="flex items-center gap-1.5 text-xs text-admin-ink/50"><MapPin className="size-3 text-admin-gold" />{booking.branch || "General"}</span></td>
      <td className="px-4 py-5 text-xs text-admin-ink/45">{booking.created_at ? format(new Date(booking.created_at), "dd MMM yyyy") : "N/A"}</td>
      <td className="px-4 py-5"><StatusBadge status={booking.status} /></td>
      <td className="max-w-64 px-6 py-5 text-xs text-admin-ink/45">{booking.message ? <span className="flex gap-2"><MessageSquareText className="mt-0.5 size-3 shrink-0 text-admin-gold" /><span className="line-clamp-2">{booking.message}</span></span> : "—"}</td>
    </tr>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  return (
    <article className="p-5">
      <div className="flex items-start justify-between gap-4"><div><h3 className="font-admin-display text-base font-semibold">{booking.name || "Unknown"}</h3><p className="mt-1 text-xs text-admin-ink/45">{booking.service || "General enquiry"}</p></div><StatusBadge status={booking.status} /></div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-admin-ink/50"><span className="flex items-center gap-1.5"><MapPin className="size-3 text-admin-gold" />{booking.branch || "General"}</span><span className="text-right">{booking.created_at ? format(new Date(booking.created_at), "dd MMM yyyy") : "N/A"}</span></div>
      {booking.phone && <a href={`tel:${booking.phone}`} className="mt-4 flex items-center gap-2 border-t border-admin-ink/10 pt-4 text-sm font-medium hover:text-admin-gold"><Phone className="size-4 text-admin-gold" />{booking.phone}</a>}
      {booking.message && <p className="mt-3 flex gap-2 text-xs leading-5 text-admin-ink/45"><MessageSquareText className="mt-0.5 size-3 shrink-0 text-admin-gold" />{booking.message}</p>}
    </article>
  );
}