import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Navbar } from "@/components/site/Navbar";
import { PageHero } from "@/components/site/PageHero";
import { Story } from "@/components/site/about/Story";
import { Founder } from "@/components/site/about/Founder";
import { Timeline } from "@/components/site/about/Timeline";
import { AboutStats } from "@/components/site/about/AboutStats";
import { AboutBranches } from "@/components/site/about/AboutBranches";
import { Experts } from "@/components/site/Experts";
import { Brands } from "@/components/site/Brands";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import interior from "@/assets/interior.jpg";

const title = "About SASS Hair & Beauty | Our Story, Founder & Journey";
const description =
  "Since 2011 SASS Hair & Beauty has grown from one chair in Vijayawada to three luxury flagships. Meet our founder, our journey and the team behind the craft.";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main>
        <PageHero
          crumb="About"
          eyebrow="About SASS"
          title="Fifteen years of"
          italic="quiet obsession with detail"
          subtitle="A premium hair and beauty house built in Andhra Pradesh — one consultation, one client, one branch at a time."
          image={interior}
        />
        <Story />
        <Founder />
        <Timeline />
        <AboutBranches />
        <AboutStats />
        <Experts />
        <Brands />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
