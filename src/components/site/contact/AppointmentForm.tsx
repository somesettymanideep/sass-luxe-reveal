import { useState, type FormEvent } from "react";
import { Check, X } from "lucide-react";
import { useDirectionalReveal } from "@/lib/motion";
import { LuxeButton } from "../LuxeButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const branches = ["Vijayawada", "Guntur", "Rajahmundry"];
const services = [
  "Hair Cut & Styling",
  "Fashion Colours",
  "Keratin Treatment",
  "Hair Smoothening",
  "Bridal Makeup",
  "Pedicure & Manicure",
  "Threading",
];

export function AppointmentForm({ 
  embedded = false,
  trigger = null 
}: { 
  embedded?: boolean;
  trigger?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (
      !String(data.get("name") || "").trim() ||
      !String(data.get("phone") || "").trim() ||
      !data.get("service") ||
      !data.get("branch")
    ) {
      setError("Please fill in all required fields.");
      setTimeout(() => setError(""), 1400);
      return;
    }
    setState("loading");
    setTimeout(() => {
      setState("done");
      setTimeout(() => {
        setIsOpen(false);
        setState("idle");
      }, 2000);
    }, 1200);
  };

  const field =
    "peer w-full rounded-xl border border-border bg-card px-4 pb-2.5 pt-6 text-sm outline-none transition-[border-color,box-shadow] duration-400 focus:border-gold focus:shadow-gold";
  const label =
    "pointer-events-none absolute left-4 top-4 text-xs uppercase tracking-[0.16em] text-muted-foreground transition-all duration-300 peer-focus:top-2 peer-focus:text-[0.6rem] peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[0.6rem]";
  const selectCls =
    "w-full appearance-none rounded-xl border border-border bg-card px-4 pb-2.5 pt-6 text-sm outline-none transition-[border-color,box-shadow] duration-400 focus:border-gold focus:shadow-gold";
  const staticLabel =
    "pointer-events-none absolute left-4 top-2 text-[0.6rem] uppercase tracking-[0.16em] text-gold";

  const formContent = (
    <div className={`h-full ${!embedded ? "p-0" : "rounded-[2rem] border border-gold/20 bg-card p-8 shadow-luxe md:p-10"}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="section-eyebrow text-gold">Appointment Request</p>
          <h2 className="mt-2 text-2xl font-display leading-tight md:text-3xl">
            Reserve your chair
          </h2>
        </div>
        {!embedded && (
          <button 
            onClick={() => setIsOpen(false)}
            className="rounded-full border border-gold/20 p-2 text-gold transition-colors hover:bg-gold/10"
          >
            <X className="size-5" />
          </button>
        )}
      </div>
      
      <p className="mt-3 text-sm text-muted-foreground">
        Share a few details and our front desk will confirm your slot within the hour.
      </p>

      <form onSubmit={submit} noValidate className={`mt-8 grid gap-4 md:grid-cols-2 ${error ? "shake" : ""}`}>
        <div className="relative md:col-span-2">
          <input name="name" placeholder=" " className={field} required />
          <span className={label}>Full name</span>
        </div>
        <div className="relative md:col-span-2">
          <input name="phone" inputMode="tel" placeholder=" " className={field} required />
          <span className={label}>Mobile Number</span>
        </div>
        <div className="relative md:col-span-2">
          <select name="service" className={selectCls} required>
            <option value="" disabled selected>Select a Service</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <span className={staticLabel}>Type of Service</span>
        </div>
        <div className="relative md:col-span-2">
          <select name="branch" className={selectCls} required>
            <option value="" disabled selected>Select a Branch</option>
            {branches.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <span className={staticLabel}>Branch</span>
        </div>
        <div className="relative md:col-span-2">
          <textarea name="message" rows={3} placeholder=" " className={field} />
          <span className={label}>Message</span>
        </div>

        {error && <p className="text-xs text-destructive md:col-span-2">{error}</p>}

        <div className="md:col-span-2">
          <LuxeButton type="submit" className="w-full" disabled={state !== "idle"}>
            {state === "idle" && "Book Appointment"}
            {state === "loading" && "Sending…"}
            {state === "done" && (
              <span className="inline-flex items-center gap-2">
                <Check className="size-4" /> Request received
              </span>
            )}
          </LuxeButton>
        </div>
      </form>
    </div>
  );

  if (embedded) {
    return formContent;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-xl border-gold/20 bg-ink/95 p-8 backdrop-blur-2xl sm:rounded-[2rem]">
        <DialogHeader className="sr-only">
          <DialogTitle>Book an Appointment</DialogTitle>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}
