import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Preloader } from "@/components/site/Preloader";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { WhyChoose } from "@/components/site/WhyChoose";
import { Services } from "@/components/site/Services";
import { Gallery } from "@/components/site/Gallery";
import { Bridal } from "@/components/site/Bridal";
import { SplitBanner } from "@/components/site/SplitBanner";
import { Testimonials } from "@/components/site/Testimonials";
import { Stats } from "@/components/site/Stats";

import { Brands } from "@/components/site/Brands";
import { Membership } from "@/components/site/Membership";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";

const title = "SASS Hair & Beauty | Luxury Salon in Vijayawada, Guntur & Rajahmundry";
const description =
  "Premium hair, bridal and beauty studio with flagship salons in Vijayawada, Guntur and Rajahmundry. Couture colour, precision cutting and bridal artistry.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HairSalon",
          name: "SASS Hair & Beauty",
          description,
          priceRange: "₹₹₹",
          areaServed: ["Vijayawada", "Guntur", "Rajahmundry"],
          telephone: "+91 72868 11999",
          address: [
            {
              "@type": "PostalAddress",
              streetAddress: "2nd Floor, PVP Square, MG Road, Mogalrajapuram, Labbipet",
              addressLocality: "Vijayawada",
              addressRegion: "Andhra Pradesh",
              addressCountry: "IN",
            },
          ],
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "2140" },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <SplitBanner />
        <Services />
        <Gallery />
        <WhyChoose />
        <Contact />
        <FAQ />
        <Bridal />
        <Testimonials />
        <Stats />
        <Brands />
        <Membership />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
