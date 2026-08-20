import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock, LogOut, Calendar, Phone, MapPin, User, MessageSquare, Loader2 } from "lucide-react";
import { LuxeButton } from "@/components/site/LuxeButton";
import { getBookings } from "@/lib/admin.functions";
import { format } from "date-fns";

export const Route = createFileRoute("/admin")({
  component: AdminPanel,
});

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "sass" && password === "Admin@2026") {
      setIsAuthenticated(true);
      setError("");
      localStorage.setItem("sass_admin_auth", "true");
    } else {
      setError("Invalid credentials");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("sass_admin_auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getBookings();
      setBookings(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("sass_admin_auth");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink p-6">
        <div className="w-full max-w-md rounded-[7px] border border-gold/20 bg-card p-8 shadow-luxe">
          <div className="text-center">
            <Lock className="mx-auto size-12 text-gold" />
            <h1 className="mt-4 font-display text-3xl text-cream">Admin Login</h1>
            <p className="mt-2 text-cream/60">Access SASS management portal</p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-gold">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full rounded-[7px] border border-border bg-ink px-4 py-3 text-cream outline-none focus:border-gold"
                required
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-gold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-[7px] border border-border bg-ink px-4 py-3 text-cream outline-none focus:border-gold"
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <LuxeButton type="submit" className="w-full py-4">
              Login
            </LuxeButton>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink text-cream">
      <nav className="border-b border-gold/20 bg-card/50 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <h1 className="font-display text-2xl tracking-tight">
            SASS <span className="text-gold">Admin</span>
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-cream/70 hover:text-gold"
          >
            <LogOut className="size-4" /> Logout
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-[1400px] px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-display">Submissions</h2>
            <p className="text-cream/60 mt-1">Bookings, Consultations, and Inquiries</p>
          </div>
          <button 
            onClick={fetchBookings}
            disabled={loading}
            className="text-gold hover:underline text-sm flex items-center gap-2"
          >
            {loading && <Loader2 className="size-3 animate-spin" />} Refresh
          </button>
        </div>

        <div className="grid gap-6">
          {loading && bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 border border-gold/10 rounded-[7px] bg-card">
              <Loader2 className="size-8 animate-spin text-gold mb-4" />
              <p className="text-cream/60">Loading submissions...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 border border-gold/10 rounded-[7px] bg-card text-center">
              <p className="text-cream/60">No submissions found yet.</p>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="group relative overflow-hidden rounded-[7px] border border-gold/10 bg-card p-6 transition-all hover:border-gold/30 hover:shadow-luxe"
              >
                <div className="absolute left-0 top-0 h-full w-[3px] bg-gold-gradient opacity-0 transition-opacity group-hover:opacity-100" />
                
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <div className="flex items-center gap-2">
                        <User className="size-4 text-gold" />
                        <span className="font-display text-lg">{b.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="size-4 text-gold" />
                        <a href={`tel:${b.phone}`} className="text-sm hover:text-gold transition-colors">{b.phone}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 text-gold" />
                        <span className="text-sm text-cream/70">{b.branch}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <div className="rounded-full bg-gold/10 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-gold border border-gold/20">
                        {b.status || "Booking"}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-cream/50">
                        <Calendar className="size-3" />
                        {b.created_at ? format(new Date(b.created_at), "MMM d, yyyy · h:mm a") : "N/A"}
                      </div>
                      <div className="text-sm">
                        <span className="text-gold/60 uppercase text-[0.65rem] tracking-wider mr-2">Service:</span>
                        {b.service}
                      </div>
                    </div>

                    {b.message && (
                      <div className="mt-4 flex gap-3 rounded-[7px] bg-ink/30 p-4 border border-gold/5">
                        <MessageSquare className="size-4 text-gold/50 shrink-0 mt-1" />
                        <p className="text-sm text-cream/80 leading-relaxed italic">
                          "{b.message}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
