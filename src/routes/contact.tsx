import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "@/components/site/Header";
import { ContactHero } from "@/components/site/ContactHero";
import { ContactBody } from "@/components/site/ContactBody";
import { Footer } from "@/components/site/Footer";

const TITLE = "Contact SASS Hair & Beauty | Vijayawada, Guntur, Rajahmundry";
const DESCRIPTION =
  "Get in touch with SASS Hair & Beauty. Call, WhatsApp or email us, or visit our luxury salons in Vijayawada, Guntur and Rajahmundry. Open Mon-Sun.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

function ContactPage() {
  useReveal();

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <ContactHero />
        <ContactBody />
      </main>
      <Footer />
    </div>
  );
}
