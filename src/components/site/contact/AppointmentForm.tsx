import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { useDirectionalReveal } from "@/lib/motion";
import { LuxeButton } from "../LuxeButton";

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

export function AppointmentForm() {
  const ref = useDirectionalReveal<HTMLDivElement>("left", { selector: ".af-inner" });
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!String(data.get("name") || "").trim() || !String(data.get("phone") || "").trim()) {
      setError("Please share your name and phone number.");
      setTimeout(() => setError(""), 1400);
      return;
    }
    setState("loading");
    setTimeout(() => setState("done"), 1200);
  };

  const field =
    "peer w-full rounded-xl border border-border bg-card px-4 pb-2.5 pt-6 text-sm outline-none transition-[border-color,box-shadow] duration-400 focus:border-gold focus:shadow-gold";
  const label =
    "pointer-events-none absolute left-4 top-4 text-xs uppercase tracking-[0.16em] text-muted-foreground transition-all duration-300 peer-focus:top-2 peer-focus:text-[0.6rem] peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[0.6rem]";
  const selectCls =
    "w-full appearance-none rounded-xl border border-border bg-card px-4 pb-2.5 pt-6 text-sm outline-none transition-[border-color,box-shadow] duration-400 focus:border-gold focus:shadow-gold";
  const staticLabel =
    "pointer-events-none absolute left-4 top-2 text-[0.6rem] uppercase tracking-[0.16em] text-gold";

  return (
    <div ref={ref} className="h-full">
      <div className="af-inner h-full rounded-[2rem] border border-gold/20 bg-card p-8 shadow-luxe md:p-10">
        <p className="section-eyebrow text-gold">Appointment Request</p>
        <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.06]">
          Reserve your chair
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Share a few details and our front desk will confirm your slot within the hour.
        </p>

        <form onSubmit={submit} noValidate className={`mt-10 grid gap-4 md:grid-cols-2 ${error ? "shake" : ""}`}>
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
            <textarea name="message" rows={4} placeholder=" " className={field} />
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
    </div>
  );
}
