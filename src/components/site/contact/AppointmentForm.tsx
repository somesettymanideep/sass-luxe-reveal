import { useState, type FormEvent } from "react";
import {
  Check,
  X,
  Loader2,
  Sparkles,
  User,
  Phone,
  Scissors,
  MapPin,
  Mail,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import { LuxeButton } from "../LuxeButton";
import { createBooking } from "@/lib/bookings.functions";
import { createContact } from "@/lib/admin.functions";
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
  "Facial",
  "Bridal Makeup",
  "Pedicure & Manicure",
  "Threading",
];

export function AppointmentForm({
  embedded = false,
  trigger = null,
  type = "booking",
}: {
  embedded?: boolean;
  trigger?: React.ReactNode;
  type?: "booking" | "contact";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (type === "booking") {
      data.service = String(formData.get("service") || "");
      data.branch = String(formData.get("branch") || "");

      if (!data.name || !data.phone || !data.service || !data.branch) {
        setError("Please fill in all required fields.");
        setTimeout(() => setError(""), 2000);
        return;
      }
    } else {
      data.email = String(formData.get("email") || "").trim();
      data.subject = "Contact Form Submission";

      if (!data.name || !data.phone) {
        setError("Please share your name and phone number.");
        setTimeout(() => setError(""), 2000);
        return;
      }
    }

    setState("loading");
    try {
      if (type === "booking") {
        await createBooking({ data });
      } else {
        await createContact({ data });
      }
      setState("done");
      setTimeout(() => {
        setIsOpen(false);
        setState("idle");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setState("idle");
    }
  };

  const formContent = (
    <div
      className={`relative w-full ${
        !embedded
          ? "flex flex-col max-h-[92dvh] sm:max-h-[88vh] overflow-y-auto overflow-x-hidden no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden p-4.5 sm:p-6 md:p-7 text-cream"
          : "rounded-[2rem] border border-gold/20 bg-card p-6 md:p-10 text-foreground"
      }`}
      style={!embedded ? { scrollbarWidth: "none", msOverflowStyle: "none" } : undefined}
    >
      {/* Ambient background glows for luxury look */}
      {!embedded && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <div className="absolute -right-12 -top-12 size-40 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -left-12 -bottom-12 size-40 rounded-full bg-gold-soft/10 blur-3xl" />
        </div>
      )}

      {/* Header */}
      <div
        className={`relative z-10 flex items-start justify-between gap-3 border-b border-gold/15 shrink-0 ${
          !embedded ? "pb-3 sm:pb-3.5" : "pb-5"
        }`}
      >
        <div className="min-w-0 pr-1">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[0.62rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
            <Sparkles className="size-2.5 sm:size-3 text-gold shrink-0" />
            <span>{type === "booking" ? "Priority Reservation" : "Salon Concierge"}</span>
          </div>
          <h2
            className={`mt-1 font-display font-semibold tracking-tight leading-tight ${
              !embedded ? "text-lg sm:text-2xl md:text-[1.75rem]" : "text-2xl md:text-3xl"
            }`}
          >
            {type === "booking" ? (
              <>
                Reserve your <span className="italic text-gold-gradient">chair</span>
              </>
            ) : (
              "Get in touch"
            )}
          </h2>
          <p
            className={`mt-0.5 text-xs sm:text-sm leading-relaxed ${
              !embedded ? "text-cream/70" : "text-muted-foreground/90"
            }`}
          >
            {type === "booking"
              ? "Select your preferred service and location. We'll confirm your slot promptly."
              : "Share a few details and our team will get back to you shortly."}
          </p>
        </div>

        {!embedded && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close modal"
            className="grid size-8 sm:size-9 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/5 text-gold transition-all duration-300 hover:scale-105 hover:border-gold hover:bg-gold hover:text-ink cursor-pointer focus:outline-none"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Form */}
      <form
        onSubmit={submit}
        noValidate
        className={`relative z-10 w-full overflow-x-hidden ${
          !embedded
            ? "mt-3 sm:mt-4 grid gap-2.5 sm:gap-3 sm:grid-cols-2"
            : "mt-6 grid gap-4 sm:grid-cols-2"
        }`}
      >
        {/* Full Name */}
        <div className="sm:col-span-1">
          <label className="mb-1 flex items-center gap-1.5 text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-gold">
            <User className="size-3 text-gold shrink-0" />
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="e.g. Priya Sharma"
            required
            className={`w-full rounded-xl border border-gold/20 px-3 text-xs sm:text-sm outline-none transition-all duration-300 hover:border-gold/40 focus:border-gold focus:ring-1 focus:ring-gold/30 ${
              !embedded
                ? "h-9.5 sm:h-10.5 bg-ink/75 text-cream placeholder:text-cream/35 focus:bg-ink"
                : "py-2.5 bg-background text-foreground placeholder:text-muted-foreground/50"
            }`}
          />
        </div>

        {/* Mobile Number */}
        <div className="sm:col-span-1">
          <label className="mb-1 flex items-center gap-1.5 text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-gold">
            <Phone className="size-3 text-gold shrink-0" />
            Mobile Number <span className="text-gold">*</span>
          </label>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            placeholder="+91 98765 43210"
            required
            className={`w-full rounded-xl border border-gold/20 px-3 text-xs sm:text-sm outline-none transition-all duration-300 hover:border-gold/40 focus:border-gold focus:ring-1 focus:ring-gold/30 ${
              !embedded
                ? "h-9.5 sm:h-10.5 bg-ink/75 text-cream placeholder:text-cream/35 focus:bg-ink"
                : "py-2.5 bg-background text-foreground placeholder:text-muted-foreground/50"
            }`}
          />
        </div>

        {type === "booking" ? (
          <>
            {/* Type of Service */}
            <div className="sm:col-span-1">
              <label className="mb-1 flex items-center gap-1.5 text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-gold">
                <Scissors className="size-3 text-gold shrink-0" />
                Select Service <span className="text-gold">*</span>
              </label>
              <div className="relative">
                <select
                  name="service"
                  defaultValue=""
                  required
                  className={`w-full appearance-none rounded-xl border border-gold/20 pl-3 pr-8 text-xs sm:text-sm outline-none transition-all duration-300 hover:border-gold/40 focus:border-gold focus:ring-1 focus:ring-gold/30 cursor-pointer text-ellipsis overflow-hidden ${
                    !embedded
                      ? "h-9.5 sm:h-10.5 bg-ink/75 text-cream focus:bg-ink"
                      : "py-2.5 bg-background text-foreground"
                  }`}
                >
                  <option value="" disabled className={!embedded ? "bg-ink text-cream/40" : ""}>
                    Choose a service
                  </option>
                  {services.map((s) => (
                    <option key={s} value={s} className={!embedded ? "bg-ink text-cream py-1.5" : ""}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gold/70 shrink-0" />
              </div>
            </div>

            {/* Select Branch */}
            <div className="sm:col-span-1">
              <label className="mb-1 flex items-center gap-1.5 text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-gold">
                <MapPin className="size-3 text-gold shrink-0" />
                Select Branch <span className="text-gold">*</span>
              </label>
              <div className="relative">
                <select
                  name="branch"
                  defaultValue=""
                  required
                  className={`w-full appearance-none rounded-xl border border-gold/20 pl-3 pr-8 text-xs sm:text-sm outline-none transition-all duration-300 hover:border-gold/40 focus:border-gold focus:ring-1 focus:ring-gold/30 cursor-pointer text-ellipsis overflow-hidden ${
                    !embedded
                      ? "h-9.5 sm:h-10.5 bg-ink/75 text-cream focus:bg-ink"
                      : "py-2.5 bg-background text-foreground"
                  }`}
                >
                  <option value="" disabled className={!embedded ? "bg-ink text-cream/40" : ""}>
                    Choose salon location
                  </option>
                  {branches.map((b) => (
                    <option key={b} value={b} className={!embedded ? "bg-ink text-cream py-1.5" : ""}>
                      {b} Flagship
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gold/70 shrink-0" />
              </div>
            </div>
          </>
        ) : (
          /* Email for Contact type */
          <div className="sm:col-span-2">
            <label className="mb-1 flex items-center gap-1.5 text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-gold">
              <Mail className="size-3 text-gold shrink-0" />
              Email Address (Optional)
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className={`w-full rounded-xl border border-gold/20 px-3 text-xs sm:text-sm outline-none transition-all duration-300 hover:border-gold/40 focus:border-gold focus:ring-1 focus:ring-gold/30 ${
                !embedded
                  ? "h-9.5 sm:h-10.5 bg-ink/75 text-cream placeholder:text-cream/35 focus:bg-ink"
                  : "py-2.5 bg-background text-foreground placeholder:text-muted-foreground/50"
              }`}
            />
          </div>
        )}

        {/* Special Request / Message */}
        <div className="col-span-full">
          <label className="mb-1 flex items-center gap-1.5 text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-gold">
            <MessageSquare className="size-3 text-gold shrink-0" />
            {type === "booking" ? "Special Requests & Preferred Time (Optional)" : "Your Message"}
          </label>
          <textarea
            name="message"
            rows={2}
            placeholder={
              type === "booking"
                ? "Preferred date/time or styling details..."
                : "Tell us how we can help you..."
            }
            className={`w-full min-h-[46px] sm:min-h-[54px] rounded-xl border border-gold/20 px-3 py-1.5 text-xs sm:text-sm outline-none transition-all duration-300 hover:border-gold/40 focus:border-gold focus:ring-1 focus:ring-gold/30 resize-none ${
              !embedded
                ? "bg-ink/75 text-cream placeholder:text-cream/35 focus:bg-ink"
                : "bg-background text-foreground placeholder:text-muted-foreground/50"
            }`}
          />
        </div>

        {/* Error message alert */}
        {error && (
          <div className="col-span-full rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-xs text-destructive flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-destructive animate-ping shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="col-span-full pt-0.5">
          <LuxeButton
            type="submit"
            className="w-full py-2.5 sm:py-3 text-xs font-semibold uppercase tracking-[0.16em]"
            disabled={state !== "idle"}
          >
            {state === "idle" && (type === "booking" ? "Confirm Appointment Request" : "Send Message")}
            {state === "loading" && (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="size-3.5 animate-spin text-ink" /> Processing Reservation…
              </span>
            )}
            {state === "done" && (
              <span className="inline-flex items-center gap-2 text-ink">
                <Check className="size-3.5 text-ink" /> Reservation Received!
              </span>
            )}
          </LuxeButton>
        </div>

        {/* Trust Badges */}
        <div className="col-span-full flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1 pt-0.5 text-[0.62rem] sm:text-[0.68rem] text-cream/55">
          <span className="inline-flex items-center gap-1">
            <Check className="size-2.5 sm:size-3 text-gold shrink-0" /> Free Consultation
          </span>
          <span className="text-gold/40">•</span>
          <span className="inline-flex items-center gap-1">
            <Check className="size-2.5 sm:size-3 text-gold shrink-0" /> Pay at Salon
          </span>
          <span className="text-gold/40">•</span>
          <span className="inline-flex items-center gap-1">
            <Check className="size-2.5 sm:size-3 text-gold shrink-0" /> Instant Confirmation
          </span>
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
      <DialogContent className="max-w-xl border-gold/20 bg-ink/95 p-6 backdrop-blur-2xl sm:rounded-[2rem] sm:p-8 w-[95vw] md:w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-90 data-[state=open]:zoom-in-90 duration-500">
        <DialogHeader className="sr-only">
          <DialogTitle>Book an Appointment</DialogTitle>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}
