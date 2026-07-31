import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { TwinBanners } from "@/components/site/TwinBanners";
import { WhyChoose } from "@/components/site/WhyChoose";
import { Transformations } from "@/components/site/Transformations";
import { Stats } from "@/components/site/Stats";
import { Testimonials } from "@/components/site/Testimonials";
import { Faq } from "@/components/site/Faq";
import { InstagramGallery } from "@/components/site/InstagramGallery";
import { CtaSection } from "@/components/site/CtaSection";
import { Footer } from "@/components/site/Footer";

const TITLE = "SASS Hair & Beauty | Luxury Salon in Vijayawada, Guntur";
const DESCRIPTION =
  "Andhra Pradesh's premium salon chain for hair, colour, keratin, bridal makeup, skincare and men's grooming. Book at Vijayawada, Guntur or Rajahmundry.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <TwinBanners />
        <WhyChoose />
        <Transformations />
        <Stats />
        <Testimonials />
        <Faq />
        <InstagramGallery />
        <CtaSection />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HairSalon",
            name: "SASS Hair & Beauty",
            description: DESCRIPTION,
            priceRange: "₹₹₹",
            telephone: "+91 90000 00000",
            areaServed: ["Vijayawada", "Guntur", "Rajahmundry"],
            address: [
              { "@type": "PostalAddress", addressLocality: "Vijayawada", addressRegion: "Andhra Pradesh", addressCountry: "IN" },
              { "@type": "PostalAddress", addressLocality: "Guntur", addressRegion: "Andhra Pradesh", addressCountry: "IN" },
              { "@type": "PostalAddress", addressLocality: "Rajahmundry", addressRegion: "Andhra Pradesh", addressCountry: "IN" },
            ],
            openingHours: "Mo-Su 10:00-21:00",
          }),
        }}
      />
    </div>
  );
}
