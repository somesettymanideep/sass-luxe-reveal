import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { VjaHero } from "@/components/site/vja/VjaHero";
import { VjaWhy, VjaServiceGrid, VjaProcess, VjaBeforeAfter } from "@/components/site/vja/VjaServices";
import {
  VjaTestimonials, VjaPackages, VjaExperts, VjaFAQ, VjaBlogs, VjaAreas, VjaBooking, VjaContact, vjaFaqs,
} from "@/components/site/vja/VjaSections";

const URL = "https://sass-elegance-animated.lovable.app/vijayawada-hair-beauty-clinic";
const TITLE = "Best Hair & Beauty Clinic in Vijayawada | SASS Hair & Beauty";
const DESC =
  "SASS Hair & Beauty is a luxury hair & beauty clinic in Vijayawada offering hair spa, keratin, colour, hydra facials, laser treatments, bridal makeup and nail spa. Book on MG Road, Labbipet.";

export const Route = createFileRoute("/vijayawada-hair-beauty-clinic")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SASS Hair & Beauty",
            url: "https://sass-elegance-animated.lovable.app",
            areaServed: "Andhra Pradesh, India",
          },
          {
            "@context": "https://schema.org",
            "@type": "HealthAndBeautyBusiness",
            name: "SASS Hair & Beauty — Vijayawada",
            description: DESC,
            url: URL,
            image: "https://sass-elegance-animated.lovable.app/favicon.png",
            telephone: "+91 72868 11999",
            email: "vijayawada@sasshairbeauty.com",
            priceRange: "₹₹",
            address: {
              "@type": "PostalAddress",
              streetAddress: "2nd Floor, PVP Square, MG Road, Mogalrajapuram, Labbipet",
              addressLocality: "Vijayawada",
              postalCode: "520010",
              addressRegion: "Andhra Pradesh",
              addressCountry: "IN",
            },
            openingHours: "Mo-Su 09:00-21:00",
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "2500" },
            review: [
              {
                "@type": "Review",
                author: { "@type": "Person", name: "Sravani Movva" },
                reviewRating: { "@type": "Rating", ratingValue: "5" },
                reviewBody: "The keratin treatment transformed my hair completely. Truly the best hair clinic in Vijayawada.",
              },
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Salon & Clinic Services",
              itemListElement: [
                "Hair Cut", "Hair Spa", "Hair Colour", "Keratin Treatment", "Hydra Facial",
                "Laser Hair Removal", "Bridal Makeup", "Manicure & Pedicure",
              ].map((s) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: s, areaServed: "Vijayawada" },
              })),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://sass-elegance-animated.lovable.app/" },
              { "@type": "ListItem", position: 2, name: "Hair & Beauty Clinic in Vijayawada", item: URL },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: vjaFaqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]),
      },
    ],
  }),
  component: VijayawadaClinicPage,
});

function VijayawadaClinicPage() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main>
        <VjaHero />
        <VjaWhy />
        <VjaServiceGrid />
        <VjaProcess />
        <VjaBeforeAfter />
        <VjaTestimonials />
        <VjaPackages />
        <VjaExperts />
        <VjaFAQ />
        <VjaBlogs />
        <VjaAreas />
        <VjaBooking />
        <VjaContact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
