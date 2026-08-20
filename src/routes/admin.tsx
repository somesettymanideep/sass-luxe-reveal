import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { 
  Lock, 
  Calendar, 
  Phone, 
  MapPin, 
  User, 
  MessageSquare, 
  Loader2, 
  Search,
  Users,
  Clock,
  Briefcase,
  Eye
} from "lucide-react";
import { LuxeButton } from "@/components/site/LuxeButton";
import { getBookings } from "@/lib/admin.functions";
import { format } from "date-fns";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { StatCard } from "@/components/admin/StatCard";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

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

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      b.phone?.includes(searchQuery) ||
      b.service?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === "all") return matchesSearch;
    return matchesSearch && (b.status?.toLowerCase() === filterType.toLowerCase());
  });

  const stats = {
    total: bookings.length,
    today: bookings.filter(b => {
      if (!b.created_at) return false;
      const today = new Date().toISOString().split('T')[0];
      return b.created_at.startsWith(today);
    }).length,
    bookings: bookings.filter(b => !b.status || b.status === "booking").length,
    leads: bookings.filter(b => b.status === "contact" || b.status === "consultation").length
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink p-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full" />
        
        <div className="w-full max-w-md rounded-[7px] border border-gold/20 bg-card p-10 shadow-luxe relative z-10">
          <div className="text-center mb-10">
            <div className="mx-auto w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
              <Lock className="size-8 text-gold" />
            </div>
            <h1 className="font-display text-4xl text-cream mb-2">Admin Portal</h1>
            <p className="text-cream/50 text-sm tracking-wide uppercase">SASS Hair & Beauty</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gold/80 font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-[7px] border border-gold/10 bg-ink/50 px-5 py-4 text-cream outline-none focus:border-gold transition-all"
                placeholder="Enter username"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gold/80 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[7px] border border-gold/10 bg-ink/50 px-5 py-4 text-cream outline-none focus:border-gold transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-sm text-destructive font-medium text-center">{error}</p>}
            <LuxeButton type="submit" className="w-full py-5 text-sm uppercase tracking-widest mt-4">
              Secure Login
            </LuxeButton>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink text-cream">
      <AdminSidebar onLogout={handleLogout} />
      
      <main className="ml-64 p-10">
        <header className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-display mb-2">Dashboard</h2>
            <p className="text-cream/50 text-sm">Welcome back to SASS management portal</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-cream/40" />
                <input 
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-card border border-gold/10 rounded-[7px] pl-12 pr-6 py-3 text-sm focus:border-gold outline-none w-64 transition-all"
                />
             </div>
             <LuxeButton onClick={fetchBookings} disabled={loading} className="py-3 px-6 text-xs uppercase tracking-widest">
                {loading ? <Loader2 className="size-4 animate-spin" /> : "Refresh"}
             </LuxeButton>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Leads" value={stats.total} icon={Users} />
          <StatCard title="New Today" value={stats.today} icon={Clock} />
          <StatCard title="Bookings" value={stats.bookings} icon={Calendar} />
          <StatCard title="Consultations" value={stats.leads} icon={Briefcase} />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-gold/10 pb-4">
          {["all", "booking", "contact", "consultation"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all ${
                filterType === type 
                  ? "bg-gold text-ink font-bold shadow-gold" 
                  : "text-cream/50 hover:text-gold"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Content Table */}
        <div className="bg-card border border-gold/10 rounded-[7px] overflow-hidden shadow-luxe">
          <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-ink/30 border-b border-gold/10 text-[10px] uppercase tracking-[0.2em] text-gold/60 font-medium">
            <div className="col-span-3">Customer</div>
            <div className="col-span-2">Service</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gold/5">
            {loading && bookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader2 className="size-8 animate-spin text-gold mb-4" />
                <p className="text-cream/60">Retrieving secure data...</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-cream/60">No matching records found.</p>
              </div>
            ) : (
              filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="grid grid-cols-12 gap-4 px-8 py-6 items-center hover:bg-gold/[0.02] transition-colors group"
                >
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-display text-lg shrink-0">
                      {b.name?.[0]}
                    </div>
                    <div>
                      <h4 className="font-medium text-cream">{b.name}</h4>
                      <div className="flex items-center gap-1.5 text-xs text-cream/40 mt-0.5">
                        <Phone className="size-3" />
                        <a href={`tel:${b.phone}`} className="hover:text-gold transition-colors">{b.phone}</a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <span className="text-sm text-cream/70 truncate block">{b.service}</span>
                  </div>

                  <div className="col-span-2 flex items-center gap-2">
                    <MapPin className="size-3.5 text-gold/60" />
                    <span className="text-sm text-cream/70 uppercase tracking-wider text-[11px]">{b.branch}</span>
                  </div>

                  <div className="col-span-2 text-xs text-cream/50">
                    {b.created_at ? format(new Date(b.created_at), "MMM dd, yyyy") : "N/A"}
                  </div>

                  <div className="col-span-2">
                    <span className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-widest border ${
                      b.status === 'contact' 
                        ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' 
                        : b.status === 'consultation'
                        ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                        : 'bg-gold/10 border-gold/20 text-gold'
                    }`}>
                      {b.status || "Booking"}
                    </span>
                  </div>

                  <div className="col-span-1 text-right">
                    <button className="p-2 text-cream/30 hover:text-gold transition-colors opacity-0 group-hover:opacity-100">
                      <Eye className="size-5" />
                    </button>
                  </div>

                  {b.message && (
                    <div className="col-span-12 mt-2 pl-13 flex gap-3 text-sm text-cream/40 italic">
                      <MessageSquare className="size-3.5 shrink-0 mt-1" />
                      <p>"{b.message}"</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
