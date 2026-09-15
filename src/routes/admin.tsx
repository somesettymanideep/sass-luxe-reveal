import { useEffect, useState, useMemo, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Calendar,
  Clock,
  Phone,
  MapPin,
  Search,
  RefreshCw,
  Loader2,
  KeyRound,
  UserRound,
  Eye,
  EyeOff,
  ShieldCheck,
  Mail,
  MessageSquareText,
  CheckCircle2,
  Clock3,
  Plus,
  Download,
  Trash2,
  ExternalLink,
  Filter,
  X,
  Sparkles,
  UsersRound,
  CalendarDays,
  BriefcaseBusiness,
} from "lucide-react";
import { format } from "date-fns";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { StatCard } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { getBookings, updateBookingStatus, deleteBooking } from "@/lib/admin.functions";
import { createBooking } from "@/lib/bookings.functions";
import logoUrl from "@/assets/sass-logo-custom.png?url";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

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

type RawBooking = {
  id: string;
  name: string | null;
  phone: string | null;
  service: string | null;
  branch: string | null;
  message: string | null;
  status: string | null;
  created_at: string | null;
};

export interface ParsedAppointment {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  branch: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  notes: string;
  created_at: string;
  raw: RawBooking;
}

const sampleBookings: ParsedAppointment[] = [
  {
    id: "sample-1",
    name: "Priya Sharma",
    phone: "+91 98765 43210",
    email: "priya.sharma@example.com",
    service: "Keratin Treatment",
    branch: "Vijayawada",
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    appointmentTime: "11:00 AM",
    status: "confirmed",
    notes: "Prefers senior stylist. Inquiring about post-treatment hair care serum.",
    created_at: new Date().toISOString(),
    raw: {
      id: "sample-1",
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      service: "Keratin Treatment",
      branch: "Vijayawada",
      message: "Prefers senior stylist. Inquiring about post-treatment hair care serum.",
      status: "confirmed",
      created_at: new Date().toISOString(),
    },
  },
  {
    id: "sample-2",
    name: "Ananya Reddy",
    phone: "+91 91234 56789",
    email: "ananya.reddy@example.com",
    service: "Bridal Makeup",
    branch: "Guntur",
    appointmentDate: new Date(Date.now() + 172800000).toISOString().split("T")[0],
    appointmentTime: "10:00 AM",
    status: "pending",
    notes: "Muhurtham makeup trial session with saree draping and hair setting.",
    created_at: new Date().toISOString(),
    raw: {
      id: "sample-2",
      name: "Ananya Reddy",
      phone: "+91 91234 56789",
      service: "Bridal Makeup",
      branch: "Guntur",
      message: "Muhurtham makeup trial session with saree draping and hair setting.",
      status: "pending",
      created_at: new Date().toISOString(),
    },
  },
  {
    id: "sample-3",
    name: "Kavitha Rao",
    phone: "+91 99887 76655",
    email: "kavitha.rao@example.com",
    service: "Hair Colouring & Hair Spa",
    branch: "Rajahmundry",
    appointmentDate: new Date(Date.now() + 259200000).toISOString().split("T")[0],
    appointmentTime: "02:30 PM",
    status: "confirmed",
    notes: "Looking for subtle caramel highlights on dark brown hair.",
    created_at: new Date().toISOString(),
    raw: {
      id: "sample-3",
      name: "Kavitha Rao",
      phone: "+91 99887 76655",
      service: "Hair Colouring & Hair Spa",
      branch: "Rajahmundry",
      message: "Looking for subtle caramel highlights on dark brown hair.",
      status: "confirmed",
      created_at: new Date().toISOString(),
    },
  },
  {
    id: "sample-4",
    name: "Rajesh Varma",
    phone: "+91 88776 65544",
    email: "rajesh.v@example.com",
    service: "Men's Grooming & Haircut",
    branch: "Vijayawada",
    appointmentDate: new Date().toISOString().split("T")[0],
    appointmentTime: "05:00 PM",
    status: "completed",
    notes: "Classic fade and hot-towel beard styling.",
    created_at: new Date().toISOString(),
    raw: {
      id: "sample-4",
      name: "Rajesh Varma",
      phone: "+91 88776 65544",
      service: "Men's Grooming & Haircut",
      branch: "Vijayawada",
      message: "Classic fade and hot-towel beard styling.",
      status: "completed",
      created_at: new Date().toISOString(),
    },
  },
];

function parseBooking(raw: RawBooking): ParsedAppointment {
  let date = "";
  let time = "";
  let email = "";
  let notes = "";

  if (raw.message) {
    try {
      const parsed = JSON.parse(raw.message);
      if (typeof parsed === "object" && parsed !== null) {
        date = parsed.date || "";
        time = parsed.time || "";
        email = parsed.email || "";
        notes = parsed.notes || "";
      }
    } catch {
      // Legacy formatted message string
      const text = raw.message;
      const dateMatch = text.match(/\b\d{4}-\d{2}-\d{2}\b/);
      const timeMatch = text.match(/\b\d{1,2}:\d{2}(?:\s?[AP]M)?\b/i);
      if (dateMatch) date = dateMatch[0];
      if (timeMatch) time = timeMatch[0];
      notes = text.replace(dateMatch ? dateMatch[0] : "", "").replace(timeMatch ? timeMatch[0] : "", "").trim();
    }
  }

  // Fallback for appointment date if not explicitly scheduled
  if (!date && raw.created_at) {
    date = raw.created_at.split("T")[0];
  }

  return {
    id: raw.id,
    name: raw.name || "Valued Client",
    phone: raw.phone || "—",
    email: email || "—",
    service: raw.service || "Salon Service",
    branch: raw.branch || "General",
    appointmentDate: date,
    appointmentTime: time || "Flexible Slot",
    status: (raw.status || "pending").toLowerCase(),
    notes: notes,
    created_at: raw.created_at || new Date().toISOString(),
    raw,
  };
}

const filterTabs = ["all", "confirmed", "pending", "completed", "consultation"] as const;

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [rawBookings, setRawBookings] = useState<RawBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<(typeof filterTabs)[number]>("all");
  const [selectedAppointment, setSelectedAppointment] = useState<ParsedAppointment | null>(null);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);

  // Authentication check
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("sass_admin_auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if ((cleanUser === "sass" || cleanUser === "admin") && cleanPass === "Admin@2026") {
      setIsAuthenticated(true);
      setError("");
      if (typeof window !== "undefined") {
        localStorage.setItem("sass_admin_auth", "true");
      }
      return;
    }
    setError("Invalid username or password. Default credentials: sass / Admin@2026");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("sass_admin_auth");
    }
  };

  const autofillCredentials = () => {
    setUsername("sass");
    setPassword("Admin@2026");
    setError("");
  };

  // Fetch Bookings from Supabase + Local Storage backup
  const fetchBookings = async () => {
    setLoading(true);
    try {
      // 1. Try server function
      let serverData: RawBooking[] = [];
      try {
        const res = await getBookings();
        if (res && Array.isArray(res)) {
          serverData = res as RawBooking[];
        }
      } catch (err) {
        console.warn("Supabase fetch unavailable, relying on local storage backup:", err);
      }

      // 2. Read local submissions
      let localData: RawBooking[] = [];
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("sass_local_bookings");
          if (stored) {
            localData = JSON.parse(stored);
          }
        } catch (e) {
          console.error("Failed to parse local bookings", e);
        }
      }

      // Merge and deduplicate by id
      const combinedMap = new Map<string, RawBooking>();
      for (const item of serverData) {
        combinedMap.set(item.id, item);
      }
      for (const item of localData) {
        if (!combinedMap.has(item.id)) {
          combinedMap.set(item.id, item);
        }
      }

      const combined = Array.from(combinedMap.values());
      setRawBookings(combined);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      void fetchBookings();
    }
  }, [isAuthenticated]);

  // Convert raw bookings to structured appointments
  const appointments: ParsedAppointment[] = useMemo(() => {
    if (rawBookings.length === 0) {
      return sampleBookings;
    }
    return rawBookings.map(parseBooking);
  }, [rawBookings]);

  // Filter & Search
  const filteredAppointments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return appointments.filter((app) => {
      const matchesSearch =
        !query ||
        app.name.toLowerCase().includes(query) ||
        app.phone.toLowerCase().includes(query) ||
        app.email.toLowerCase().includes(query) ||
        app.service.toLowerCase().includes(query) ||
        app.branch.toLowerCase().includes(query) ||
        app.appointmentDate.includes(query);

      if (!matchesSearch) return false;

      if (activeTab === "all") return true;
      if (activeTab === "consultation") {
        return (
          app.status === "consultation" ||
          app.service.toLowerCase().includes("consultation") ||
          app.notes.toLowerCase().includes("consultation")
        );
      }
      return app.status.toLowerCase() === activeTab;
    });
  }, [appointments, searchQuery, activeTab]);

  // Status Updater
  const handleStatusChange = async (appointmentId: string, newStatus: string) => {
    // 1. Optimistic state update
    setRawBookings((prev) =>
      prev.map((b) => (b.id === appointmentId ? { ...b, status: newStatus } : b))
    );

    if (selectedAppointment && selectedAppointment.id === appointmentId) {
      setSelectedAppointment((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    // 2. Update local storage
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("sass_local_bookings");
        if (stored) {
          const list: RawBooking[] = JSON.parse(stored);
          const updated = list.map((b) =>
            b.id === appointmentId ? { ...b, status: newStatus } : b
          );
          localStorage.setItem("sass_local_bookings", JSON.stringify(updated));
        }
      } catch (err) {
        console.error(err);
      }
    }

    // 3. Update Supabase if real UUID
    if (!appointmentId.startsWith("sample-") && !appointmentId.startsWith("local-")) {
      try {
        await updateBookingStatus({ data: { id: appointmentId, status: newStatus } });
      } catch (err) {
        console.warn("Could not update status on server:", err);
      }
    }
  };

  // Delete / Archive Appointment
  const handleDeleteAppointment = async (appointmentId: string) => {
    if (!confirm("Are you sure you want to remove this appointment record?")) return;

    setRawBookings((prev) => prev.filter((b) => b.id !== appointmentId));
    if (selectedAppointment?.id === appointmentId) {
      setSelectedAppointment(null);
    }

    // Update local storage
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("sass_local_bookings");
        if (stored) {
          const list: RawBooking[] = JSON.parse(stored);
          const updated = list.filter((b) => b.id !== appointmentId);
          localStorage.setItem("sass_local_bookings", JSON.stringify(updated));
        }
      } catch (err) {
        console.error(err);
      }
    }

    // Supabase delete
    if (!appointmentId.startsWith("sample-") && !appointmentId.startsWith("local-")) {
      try {
        await deleteBooking({ data: { id: appointmentId } });
      } catch (err) {
        console.warn("Could not delete from server:", err);
      }
    }
  };

  // Export appointments as CSV
  const handleExportCSV = () => {
    const headers = [
      "Client Name",
      "Phone",
      "Email",
      "Service",
      "Branch",
      "Appointment Date",
      "Appointment Time",
      "Status",
      "Notes",
      "Booked At",
    ];

    const rows = filteredAppointments.map((a) => [
      `"${a.name.replace(/"/g, '""')}"`,
      `"${a.phone}"`,
      `"${a.email}"`,
      `"${a.service.replace(/"/g, '""')}"`,
      `"${a.branch}"`,
      `"${a.appointmentDate}"`,
      `"${a.appointmentTime}"`,
      `"${a.status}"`,
      `"${a.notes.replace(/"/g, '""')}"`,
      `"${a.created_at}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `sass-appointments-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats
  const todayDateStr = new Date().toISOString().split("T")[0];
  const stats = {
    total: appointments.length,
    today: appointments.filter((a) => a.appointmentDate === todayDateStr || a.created_at.startsWith(todayDateStr)).length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    pending: appointments.filter((a) => a.status === "pending").length,
  };

  /* =========================================================================
     1. ADMIN LOGIN VIEW WITH OFFICIAL BRAND LOGO
     ========================================================================= */
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-admin-canvas font-admin-sans text-admin-ink lg:grid lg:grid-cols-[minmax(340px,0.9fr)_minmax(520px,1.1fr)]">
        {/* Left Presentation Banner (Desktop) */}
        <section className="relative hidden overflow-hidden bg-admin-ink p-12 text-admin-canvas lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={logoUrl}
              alt="SASS Hair & Beauty"
              className="h-11 w-auto object-contain"
            />
            <span className="rounded-[5px] border border-admin-gold/40 bg-admin-gold/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-admin-gold">
              Admin Portal
            </span>
          </div>

          <div className="relative max-w-lg">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-admin-gold">
              Salons Management Desk
            </p>
            <h1 className="font-admin-display text-5xl font-semibold leading-[1.08] text-admin-surface xl:text-6xl">
              Appointments, booked with elegance.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-admin-canvas/60">
              Complete oversight of booked appointment dates, time slots, customer contacts, and branch reservations in Vijayawada, Guntur & Rajahmundry.
            </p>
          </div>

          <div className="flex items-center gap-3 border-t border-admin-surface/10 pt-6 text-xs text-admin-canvas/40">
            <ShieldCheck className="size-4 text-admin-gold" />
            Authorized staff and concierge access only
          </div>
        </section>

        {/* Right Login Card */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
          <div className="w-full max-w-md">
            {/* Brand Logo for Mobile & Header */}
            <div className="mb-8 flex flex-col items-center text-center">
              <img
                src={logoUrl}
                alt="SASS Hair & Beauty"
                className="h-14 w-auto object-contain drop-shadow-sm mb-4"
              />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-admin-gold/30 bg-admin-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-admin-gold">
                <ShieldCheck className="size-3 text-admin-gold" />
                Salon Administration
              </span>
              <h2 className="mt-4 font-admin-display text-3xl font-semibold text-admin-ink">
                Admin Sign In
              </h2>
              <p className="mt-2 text-sm text-admin-ink/55">
                Sign in to manage booked appointments and enquiries.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-username"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-admin-ink/70"
                >
                  Username
                </label>
                <div className="relative">
                  <UserRound className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-admin-ink/40" />
                  <input
                    id="admin-username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                    className="h-12 w-full rounded-[7px] border border-admin-ink/15 bg-admin-surface pl-11 pr-4 text-sm text-admin-ink outline-none transition focus:border-admin-gold focus:ring-2 focus:ring-admin-gold/20"
                    placeholder="Enter username (sass)"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="admin-password"
                    className="block text-xs font-semibold uppercase tracking-wider text-admin-ink/70"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={autofillCredentials}
                    className="text-[11px] font-medium text-admin-gold hover:underline"
                  >
                    Use Demo Login
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-admin-ink/40" />
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    className="h-12 w-full rounded-[7px] border border-admin-ink/15 bg-admin-surface pl-11 pr-12 text-sm text-admin-ink outline-none transition focus:border-admin-gold focus:ring-2 focus:ring-admin-gold/20"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-ink/40 hover:text-admin-ink p-1"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-[7px] border border-destructive/30 bg-destructive/10 p-3 text-xs font-medium text-destructive">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="h-12 w-full rounded-[7px] bg-admin-ink font-admin-sans text-sm font-semibold text-admin-surface shadow-md hover:bg-admin-gold hover:text-admin-ink transition"
              >
                Secure Sign In
              </Button>
            </form>

            <div className="mt-8 rounded-[7px] border border-admin-ink/10 bg-admin-surface p-3.5 text-center">
              <p className="text-xs text-admin-ink/60">
                Staff credentials hint: <strong className="text-admin-ink">sass</strong> /{" "}
                <strong className="text-admin-ink">Admin@2026</strong>
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* =========================================================================
     2. ADMIN DASHBOARD VIEW (APPOINTMENTS WITH DATE, TIME, CLIENT DETAILS)
     ========================================================================= */
  return (
    <div className="min-h-screen bg-admin-canvas font-admin-sans text-admin-ink lg:flex">
      {/* Sidebar with Official Brand Logo */}
      <AdminSidebar onLogout={handleLogout} />

      <main className="min-w-0 flex-1">
        {/* Top Header */}
        <header className="border-b border-admin-ink/10 bg-admin-surface px-5 py-6 sm:px-8 lg:px-10 lg:py-7">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={logoUrl}
                alt="SASS Hair & Beauty"
                className="h-10 w-auto object-contain lg:hidden"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-admin-gold">
                    Appointments & Bookings Desk
                  </span>
                  <span className="rounded-full bg-admin-gold/15 px-2 py-0.5 text-[10px] font-semibold text-admin-gold border border-admin-gold/30">
                    Live
                  </span>
                </div>
                <h1 className="mt-1 font-admin-display text-2xl font-bold sm:text-3xl">
                  Client Appointments
                </h1>
                <p className="mt-1 text-xs text-admin-ink/50">
                  Real-time schedule with booked dates, time slots, and client contact details across all salons.
                </p>
              </div>
            </div>

            {/* Actions: Search, Add Appointment, Refresh */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-admin-ink/40" />
                <input
                  type="search"
                  placeholder="Search client, phone, date..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-[7px] border border-admin-ink/10 bg-admin-canvas pl-10 pr-3 text-xs outline-none transition focus:border-admin-gold focus:ring-1 focus:ring-admin-gold/30"
                />
              </div>

              <Button
                onClick={() => setIsNewBookingOpen(true)}
                className="h-10 gap-1.5 rounded-[7px] bg-admin-ink px-4 text-xs font-semibold text-admin-surface hover:bg-admin-gold hover:text-admin-ink shadow-none"
              >
                <Plus className="size-3.5" />
                Add Appointment
              </Button>

              <Button
                onClick={handleExportCSV}
                variant="outline"
                className="h-10 gap-1.5 rounded-[7px] border-admin-ink/15 px-3.5 text-xs text-admin-ink hover:bg-admin-canvas"
                title="Export appointments to CSV"
              >
                <Download className="size-3.5" />
                <span className="hidden sm:inline">Export</span>
              </Button>

              <Button
                onClick={() => void fetchBookings()}
                disabled={loading}
                variant="outline"
                className="h-10 gap-1.5 rounded-[7px] border-admin-ink/15 px-3.5 text-xs text-admin-ink hover:bg-admin-canvas"
                title="Refresh booking list"
              >
                <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="mx-auto max-w-[1500px] p-5 sm:p-8 lg:p-10 space-y-8">
          {/* Quick Stats Grid */}
          <section aria-label="Appointments summary" className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
            <StatCard
              title="Total Bookings"
              value={stats.total}
              icon={CalendarDays}
              detail="Total appointments registered"
            />
            <StatCard
              title="Today's Schedule"
              value={stats.today}
              icon={Clock3}
              detail="Appointments scheduled today"
            />
            <StatCard
              title="Confirmed"
              value={stats.confirmed}
              icon={CheckCircle2}
              detail="Ready for salon chair"
            />
            <StatCard
              title="Pending Review"
              value={stats.pending}
              icon={UsersRound}
              detail="Awaiting slot confirmation"
            />
          </section>

          {/* Bookings Table Container */}
          <section className="overflow-hidden rounded-[8px] border border-admin-ink/10 bg-admin-surface shadow-sm">
            {/* Table Header Controls */}
            <div className="flex flex-col gap-4 border-b border-admin-ink/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
              <div>
                <h2 className="font-admin-display text-lg font-semibold">
                  Booked Appointments Schedule
                </h2>
                <p className="text-xs text-admin-ink/45">
                  Showing {filteredAppointments.length} appointment{filteredAppointments.length === 1 ? "" : "s"}
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex gap-1 overflow-x-auto rounded-[7px] bg-admin-canvas p-1">
                {filterTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`shrink-0 rounded-[5px] px-3 py-1.5 text-xs font-medium capitalize transition ${
                      activeTab === tab
                        ? "bg-admin-ink text-admin-surface font-semibold shadow-xs"
                        : "text-admin-ink/50 hover:text-admin-ink"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Table */}
            {loading && appointments.length === 0 ? (
              <div className="flex min-h-72 flex-col items-center justify-center">
                <Loader2 className="size-6 animate-spin text-admin-gold" />
                <p className="mt-3 text-sm text-admin-ink/50">Fetching booked appointments...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
                <Search className="size-8 text-admin-gold mb-2" />
                <p className="font-admin-display text-lg font-semibold">No appointments found</p>
                <p className="mt-1 text-sm text-admin-ink/40 max-w-sm">
                  No appointments match the current search or tab filter. Try changing your query or click "Add Appointment".
                </p>
              </div>
            ) : (
              <>
                {/* Desktop View */}
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full text-left">
                    <thead className="bg-admin-canvas/80 text-[10px] font-bold uppercase tracking-wider text-admin-ink/50 border-b border-admin-ink/10">
                      <tr>
                        <th className="px-6 py-3.5">Client Details</th>
                        <th className="px-4 py-3.5">Service & Branch</th>
                        <th className="px-4 py-3.5">Appointment Date & Time</th>
                        <th className="px-4 py-3.5">Status</th>
                        <th className="px-4 py-3.5">Notes</th>
                        <th className="px-6 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-admin-ink/10">
                      {filteredAppointments.map((app) => (
                        <tr
                          key={app.id}
                          className="transition-colors hover:bg-admin-canvas/40 group"
                        >
                          {/* Client Details */}
                          <td className="px-6 py-4.5">
                            <div className="flex items-center gap-3">
                              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-admin-gold/15 text-xs font-bold text-admin-ink">
                                {app.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-admin-ink">{app.name}</p>
                                <div className="mt-0.5 flex items-center gap-3 text-xs text-admin-ink/55">
                                  <a
                                    href={`tel:${app.phone}`}
                                    className="flex items-center gap-1 hover:text-admin-gold"
                                    title="Call client"
                                  >
                                    <Phone className="size-3" />
                                    {app.phone}
                                  </a>
                                  {app.phone && app.phone !== "—" && (
                                    <a
                                      href={`https://wa.me/${app.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                                        `Hello ${app.name}, regarding your appointment at SASS Hair & Beauty on ${app.appointmentDate} at ${app.appointmentTime}...`
                                      )}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-emerald-600 hover:text-emerald-500"
                                      title="Chat on WhatsApp"
                                    >
                                      <WhatsAppIcon className="size-3.5" />
                                    </a>
                                  )}
                                </div>
                                {app.email && app.email !== "—" && (
                                  <p className="mt-0.5 text-[11px] text-admin-ink/40 flex items-center gap-1">
                                    <Mail className="size-2.5" />
                                    {app.email}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Service & Branch */}
                          <td className="px-4 py-4.5">
                            <p className="text-sm font-medium text-admin-ink">{app.service}</p>
                            <span className="mt-1 inline-flex items-center gap-1 text-xs text-admin-ink/55">
                              <MapPin className="size-3 text-admin-gold" />
                              {app.branch}
                            </span>
                          </td>

                          {/* Appointment Date & Time */}
                          <td className="px-4 py-4.5">
                            <div className="flex flex-col gap-1">
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-admin-ink">
                                <Calendar className="size-3.5 text-admin-gold" />
                                {formatAppointmentDate(app.appointmentDate)}
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-admin-gold bg-admin-gold/10 px-2 py-0.5 rounded-[4px] w-fit">
                                <Clock className="size-3" />
                                {app.appointmentTime}
                              </span>
                              <span className="text-[10px] text-admin-ink/35">
                                Booked: {format(new Date(app.created_at), "dd MMM yyyy")}
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-4.5">
                            <select
                              value={app.status}
                              onChange={(e) => void handleStatusChange(app.id, e.target.value)}
                              className={`rounded-[5px] border px-2.5 py-1 text-xs font-semibold capitalize outline-none cursor-pointer ${getStatusBadgeClasses(
                                app.status
                              )}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>

                          {/* Notes */}
                          <td className="max-w-xs px-4 py-4.5 text-xs text-admin-ink/50">
                            {app.notes ? (
                              <p className="line-clamp-2" title={app.notes}>
                                {app.notes}
                              </p>
                            ) : (
                              <span className="text-admin-ink/30">—</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedAppointment(app)}
                                className="h-8 px-2.5 text-xs font-medium text-admin-ink hover:bg-admin-gold/15 hover:text-admin-gold"
                              >
                                View Details
                              </Button>
                              <button
                                onClick={() => void handleDeleteAppointment(app.id)}
                                className="p-1.5 text-admin-ink/30 hover:text-destructive transition rounded"
                                title="Delete appointment"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="divide-y divide-admin-ink/10 md:hidden">
                  {filteredAppointments.map((app) => (
                    <article key={app.id} className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-sm text-admin-ink">{app.name}</h3>
                          <p className="text-xs text-admin-ink/60">{app.service}</p>
                        </div>
                        <select
                          value={app.status}
                          onChange={(e) => void handleStatusChange(app.id, e.target.value)}
                          className={`rounded-[5px] border px-2 py-0.5 text-[11px] font-semibold capitalize ${getStatusBadgeClasses(
                            app.status
                          )}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      {/* Date & Time Highlights */}
                      <div className="flex flex-wrap items-center gap-2 rounded-[6px] bg-admin-canvas p-2.5 text-xs">
                        <span className="inline-flex items-center gap-1 font-semibold text-admin-ink">
                          <Calendar className="size-3 text-admin-gold" />
                          {formatAppointmentDate(app.appointmentDate)}
                        </span>
                        <span className="text-admin-ink/30">•</span>
                        <span className="inline-flex items-center gap-1 font-medium text-admin-gold">
                          <Clock className="size-3" />
                          {app.appointmentTime}
                        </span>
                        <span className="text-admin-ink/30">•</span>
                        <span className="inline-flex items-center gap-1 text-admin-ink/60">
                          <MapPin className="size-3 text-admin-gold" />
                          {app.branch}
                        </span>
                      </div>

                      {/* Contact & Actions */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <div className="flex items-center gap-3">
                          <a
                            href={`tel:${app.phone}`}
                            className="flex items-center gap-1 font-medium text-admin-ink hover:text-admin-gold"
                          >
                            <Phone className="size-3" />
                            {app.phone}
                          </a>
                          {app.phone && app.phone !== "—" && (
                            <a
                              href={`https://wa.me/${app.phone.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-600"
                            >
                              <WhatsAppIcon className="size-3.5" />
                            </a>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedAppointment(app)}
                          className="h-7 text-xs text-admin-gold"
                        >
                          View Details
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      {/* =====================================================================
          3. CLIENT DETAILS MODAL
          ===================================================================== */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-[10px] border border-admin-gold/30 bg-admin-surface p-6 shadow-2xl animate-in fade-in zoom-in-95">
            {/* Close Button */}
            <button
              onClick={() => setSelectedAppointment(null)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-admin-ink/40 hover:bg-admin-canvas hover:text-admin-ink"
            >
              <X className="size-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 border-b border-admin-ink/10 pb-4">
              <div className="flex size-11 items-center justify-center rounded-full bg-admin-gold/20 text-admin-ink font-bold text-lg">
                {selectedAppointment.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-admin-display text-xl font-bold">{selectedAppointment.name}</h3>
                <p className="text-xs text-admin-ink/50">
                  Appointment ID: {selectedAppointment.id.slice(0, 8)} • Booked on{" "}
                  {format(new Date(selectedAppointment.created_at), "dd MMM yyyy")}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="mt-5 space-y-4 text-xs">
              {/* Scheduled Date & Time Card */}
              <div className="rounded-[8px] border border-admin-gold/30 bg-admin-gold/10 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-admin-gold">
                  Scheduled Appointment
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-admin-ink">
                    <Calendar className="size-4 text-admin-gold" />
                    <span>{formatAppointmentDate(selectedAppointment.appointmentDate)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-[5px] bg-admin-gold text-admin-ink px-2.5 py-1 text-xs font-bold">
                    <Clock className="size-3.5" />
                    <span>{selectedAppointment.appointmentTime}</span>
                  </div>
                </div>
              </div>

              {/* Service & Branch */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[7px] border border-admin-ink/10 bg-admin-canvas p-3">
                  <p className="text-[10px] font-semibold uppercase text-admin-ink/45">Service</p>
                  <p className="mt-1 text-sm font-semibold text-admin-ink">{selectedAppointment.service}</p>
                </div>
                <div className="rounded-[7px] border border-admin-ink/10 bg-admin-canvas p-3">
                  <p className="text-[10px] font-semibold uppercase text-admin-ink/45">Branch</p>
                  <p className="mt-1 text-sm font-semibold text-admin-ink flex items-center gap-1">
                    <MapPin className="size-3.5 text-admin-gold" />
                    {selectedAppointment.branch}
                  </p>
                </div>
              </div>

              {/* Client Contact Info */}
              <div className="rounded-[7px] border border-admin-ink/10 bg-admin-canvas p-3 space-y-2">
                <p className="text-[10px] font-semibold uppercase text-admin-ink/45">Client Contact</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-admin-ink">{selectedAppointment.phone}</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${selectedAppointment.phone}`}
                      className="rounded-[5px] border border-admin-ink/20 bg-admin-surface px-2.5 py-1 text-[11px] font-medium text-admin-ink hover:border-admin-gold"
                    >
                      Call
                    </a>
                    {selectedAppointment.phone && (
                      <a
                        href={`https://wa.me/${selectedAppointment.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                          `Hello ${selectedAppointment.name}, this is SASS Hair & Beauty regarding your appointment on ${selectedAppointment.appointmentDate} at ${selectedAppointment.appointmentTime}.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-[5px] bg-emerald-600 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-emerald-500 flex items-center gap-1"
                      >
                        <WhatsAppIcon className="size-3 text-white" />
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
                {selectedAppointment.email && selectedAppointment.email !== "—" && (
                  <p className="text-xs text-admin-ink/60 flex items-center gap-1.5 pt-1 border-t border-admin-ink/10">
                    <Mail className="size-3 text-admin-gold" />
                    {selectedAppointment.email}
                  </p>
                )}
              </div>

              {/* Special Requests / Notes */}
              <div className="rounded-[7px] border border-admin-ink/10 bg-admin-canvas p-3">
                <p className="text-[10px] font-semibold uppercase text-admin-ink/45">Special Requests & Notes</p>
                <p className="mt-1 text-xs text-admin-ink/70 leading-relaxed whitespace-pre-wrap">
                  {selectedAppointment.notes || "No additional notes provided by client."}
                </p>
              </div>

              {/* Status Selector */}
              <div className="flex items-center justify-between border-t border-admin-ink/10 pt-4">
                <span className="font-medium text-admin-ink/70">Update Appointment Status:</span>
                <select
                  value={selectedAppointment.status}
                  onChange={(e) => void handleStatusChange(selectedAppointment.id, e.target.value)}
                  className={`rounded-[6px] border px-3 py-1.5 text-xs font-semibold capitalize ${getStatusBadgeClasses(
                    selectedAppointment.status
                  )}`}
                >
                  <option value="pending">Pending Review</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          4. ADD NEW APPOINTMENT MODAL (WALK-IN / PHONE APPOINTMENTS)
          ===================================================================== */}
      {isNewBookingOpen && (
        <NewAppointmentModal
          onClose={() => setIsNewBookingOpen(false)}
          onAdded={(newBooking) => {
            setRawBookings((prev) => [newBooking, ...prev]);
            setIsNewBookingOpen(false);
          }}
        />
      )}
    </div>
  );
}

/* ===========================================================================
   HELPER COMPONENTS & UTILITIES
   =========================================================================== */

function formatAppointmentDate(dateStr: string): string {
  if (!dateStr) return "Not scheduled";
  try {
    const d = new Date(dateStr + "T00:00:00");
    if (isNaN(d.getTime())) return dateStr;
    return format(d, "dd MMM yyyy");
  } catch {
    return dateStr;
  }
}

function getStatusBadgeClasses(status: string): string {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "border-emerald-600/30 bg-emerald-500/10 text-emerald-700";
    case "completed":
      return "border-blue-600/30 bg-blue-500/10 text-blue-700";
    case "cancelled":
      return "border-rose-600/30 bg-rose-500/10 text-rose-700";
    case "pending":
    default:
      return "border-admin-gold/40 bg-admin-gold/15 text-admin-ink";
  }
}

function NewAppointmentModal({
  onClose,
  onAdded,
}: {
  onClose: () => void;
  onAdded: (booking: RawBooking) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Hair Cut & Styling");
  const [branch, setBranch] = useState("Vijayawada");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("11:00 AM");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setLoading(true);
    const structuredMessage = JSON.stringify({
      date,
      time,
      email: email.trim() || null,
      notes: notes.trim() || null,
    });

    const newRaw: RawBooking = {
      id: `local-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      service,
      branch,
      message: structuredMessage,
      status: "confirmed",
      created_at: new Date().toISOString(),
    };

    // Save in local storage
    if (typeof window !== "undefined") {
      try {
        const stored = JSON.parse(localStorage.getItem("sass_local_bookings") || "[]");
        stored.unshift(newRaw);
        localStorage.setItem("sass_local_bookings", JSON.stringify(stored));
      } catch (err) {
        console.error(err);
      }
    }

    // Try saving to backend
    try {
      await createBooking({
        data: {
          name: newRaw.name!,
          phone: newRaw.phone!,
          service: newRaw.service!,
          branch: newRaw.branch!,
          date,
          time,
          email: email.trim() || undefined,
          message: notes.trim() || undefined,
        },
      });
    } catch (err) {
      console.warn("Saved to local storage, backend unavailable:", err);
    } finally {
      setLoading(false);
      onAdded(newRaw);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-[10px] border border-admin-gold/30 bg-admin-surface p-6 shadow-2xl animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-admin-ink/40 hover:bg-admin-canvas hover:text-admin-ink"
        >
          <X className="size-5" />
        </button>

        <h3 className="font-admin-display text-xl font-bold">New Salon Appointment</h3>
        <p className="mt-1 text-xs text-admin-ink/50">
          Book an appointment for a walk-in or phone customer.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block font-semibold text-admin-ink/70">Client Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Sneha Patel"
                className="h-9 w-full rounded-[6px] border border-admin-ink/15 bg-admin-canvas px-3 text-xs outline-none focus:border-admin-gold"
              />
            </div>
            <div>
              <label className="mb-1 block font-semibold text-admin-ink/70">Phone Number *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="+91 98765 43210"
                className="h-9 w-full rounded-[6px] border border-admin-ink/15 bg-admin-canvas px-3 text-xs outline-none focus:border-admin-gold"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-admin-ink/70">Email Address (Optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@example.com"
              className="h-9 w-full rounded-[6px] border border-admin-ink/15 bg-admin-canvas px-3 text-xs outline-none focus:border-admin-gold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block font-semibold text-admin-ink/70">Service *</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="h-9 w-full rounded-[6px] border border-admin-ink/15 bg-admin-canvas px-2.5 text-xs outline-none focus:border-admin-gold"
              >
                <option>Hair Cut & Styling</option>
                <option>Hair Colouring</option>
                <option>Keratin Treatment</option>
                <option>Hair Smoothening</option>
                <option>Bridal Makeup</option>
                <option>Facial</option>
                <option>Pedicure & Manicure</option>
                <option>Men's Grooming</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block font-semibold text-admin-ink/70">Branch *</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="h-9 w-full rounded-[6px] border border-admin-ink/15 bg-admin-canvas px-2.5 text-xs outline-none focus:border-admin-gold"
              >
                <option value="Vijayawada">Vijayawada</option>
                <option value="Guntur">Guntur</option>
                <option value="Rajahmundry">Rajahmundry</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block font-semibold text-admin-ink/70">Appointment Date *</label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
                required
                className="h-9 w-full rounded-[6px] border border-admin-ink/15 bg-admin-canvas px-2.5 text-xs outline-none focus:border-admin-gold"
              />
            </div>
            <div>
              <label className="mb-1 block font-semibold text-admin-ink/70">Time Slot *</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-9 w-full rounded-[6px] border border-admin-ink/15 bg-admin-canvas px-2.5 text-xs outline-none focus:border-admin-gold"
              >
                {[
                  "10:00 AM",
                  "11:00 AM",
                  "12:00 PM",
                  "01:00 PM",
                  "02:00 PM",
                  "03:00 PM",
                  "04:00 PM",
                  "05:00 PM",
                  "06:00 PM",
                  "07:00 PM",
                  "08:00 PM",
                ].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-admin-ink/70">Notes / Preferences</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Special stylist requests, hair texture notes, etc."
              className="w-full rounded-[6px] border border-admin-ink/15 bg-admin-canvas p-2 text-xs outline-none focus:border-admin-gold resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-admin-ink/10">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-9 px-4 text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="h-9 bg-admin-ink px-4 text-xs font-semibold text-admin-surface hover:bg-admin-gold hover:text-admin-ink"
            >
              {loading ? <Loader2 className="size-3.5 animate-spin" /> : "Confirm Appointment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}