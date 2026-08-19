import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Navbar } from "@/components/site/Navbar";
import { PageHero } from "@/components/site/PageHero";
import { ContactInfo } from "@/components/site/contact/ContactInfo";
import { AppointmentForm } from "@/components/site/contact/AppointmentForm";
import { Branches } from "@/components/site/contact/Branches";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import bridal from "@/assets/bridal.jpg";

const title = "Contact SASS Hair & Beauty | Book in Vijayawada, Guntur, Rajahmundry";
const description =
  "Call, WhatsApp or book online with SASS Hair & Beauty. Branch addresses, directions, working hours and appointment requests for all three luxury salons.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main>
        <PageHero
          crumb="Contact"
          eyebrow="Contact & Booking"
          title="Let's plan"
          italic="your next transformation"
          subtitle="Appointments, bridal consultations and branch details across Vijayawada, Guntur and Rajahmundry."
          image={bridal}
          hideCircle
        />
        <section id="book" className="bg-background py-24 md:py-32">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-6 lg:grid-cols-12 lg:px-10">
            <div className="lg:col-span-6">
              <AppointmentForm />
            </div>
            <div className="lg:col-span-6">
              <ContactInfo />
            </div>
          </div>
        </section>
        <Branches />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
