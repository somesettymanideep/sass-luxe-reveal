import { createFileRoute, notFound } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { BranchHero } from "@/components/site/branch/BranchHero";
import {
  BranchWhy,
  BranchServices,
  BranchTransformations,
  BranchTestimonials,
  BranchGallery,
} from "@/components/site/branch/BranchSections";
import {
  BranchConsultation,
  BranchLocation,
  BranchFAQ,
  BranchCTA,
} from "@/components/site/branch/BranchConversion";
import { BranchPackages } from "@/components/site/branch/BranchPackages";
import { getBranch } from "@/lib/branches";

export const Route = createFileRoute("/branches/$city")({
  loader: ({ params }) => {
    const branch = getBranch(params.city);
    if (!branch) throw notFound();
    return { branch };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Branch not found | SASS Hair & Beauty" }, { name: "robots", content: "noindex" }],
      };
    }
    const b = loaderData.branch;
    const title = `Luxury Hair & Beauty Salon in ${b.city} | SASS Hair & Beauty`;
    const description = `Premium hair styling, colour, keratin, bridal makeup and skincare at SASS Hair & Beauty ${b.city}. ${b.address}. Call ${b.phone} to book.`;
    return {
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
            name: `SASS Hair & Beauty — ${b.city}`,
            description,
            address: { "@type": "PostalAddress", streetAddress: b.address, addressLocality: b.city, addressRegion: "Andhra Pradesh", addressCountry: "IN" },
            telephone: b.phone,
            email: b.email,
            openingHours: "Mo-Su 09:00-21:00",
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "5000" },
          }),
        },
      ],
    };
  },
  component: BranchPage,
});

function BranchPage() {
  const { branch } = Route.useLoaderData();

  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main>
        <BranchHero branch={branch} />
        <BranchWhy branch={branch} />
        <BranchServices />
        <BranchTransformations />
        <BranchPackages branch={branch} />
        <BranchTestimonials branch={branch} />
        <BranchGallery slug={branch.slug} />
        <BranchConsultation branch={branch} />
        <BranchLocation branch={branch} />
        <BranchFAQ branch={branch} />
        <BranchCTA branch={branch} />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
