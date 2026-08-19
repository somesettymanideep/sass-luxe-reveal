import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Navbar } from "@/components/site/Navbar";
import { PageHero } from "@/components/site/PageHero";
import { ServicesGrid } from "@/components/site/services/ServicesGrid";
import { Membership } from "@/components/site/Membership";
import { FAQ } from "@/components/site/FAQ";
import { Brands } from "@/components/site/Brands";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import hero from "@/assets/hero.jpg";

const title = "Salon Services | SASS Hair & Beauty Vijayawada, Guntur, Rajahmundry";
const description =
  "Explore SASS Hair & Beauty services — hair cuts, fashion colours, keratin, smoothening, bridal makeup, pedicure, manicure and threading by expert stylists.";

export const Route = createFileRoute("/services")({
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
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main>
        <PageHero
          crumb="Services"
          eyebrow="Our"
          title="Services"
          subtitle="Beauty. Expertise. You. — premium hair, skin and bridal craft across all three SASS salons."
          image={hero}
        />
        <ServicesGrid />
        <Membership />
        <FAQ />
        <Brands />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
