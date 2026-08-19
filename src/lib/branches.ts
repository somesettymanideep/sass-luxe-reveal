import vijayawada from "@/assets/branch-vijayawada.jpg";
import guntur from "@/assets/branch-guntur.jpg";
import rajahmundryAsset from "@/assets/rajahmundry-bridge.jpg.asset.json";

export interface Branch {
  slug: string;
  city: string;
  tag: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  image: string;
  q: string;
  mapEmbed: string;
  intro: string;
  highlights: string[];
}

export const branches: Branch[] = [
  {
    slug: "vijayawada",
    city: "Vijayawada",
    tag: "Flagship & bridal suite",
    address: "2nd Floor, PVP Square, MG Road, Mogalrajapuram, Labbipet, Vijayawada 520010",
    phone: "+91 72868 11999",
    email: "vijayawada@sasshairbeauty.com",
    hours: "Monday – Sunday · 9:00 AM – 9:00 PM",
    image: vijayawada,
    q: "SASS hair and beauty PVP Square MG Road Vijayawada",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61207.488515262055!2d80.56650304863281!3d16.502452700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fbe0e42abaa1%3A0xc9060a3286b543a7!2sSASS%20hair%20and%20beauty!5e0!3m2!1sen!2sin!4v1786008105215!5m2!1sen!2sin",
    intro:
      "Our flagship address on MG Road — a full-floor luxury salon with a private bridal suite, dedicated colour bar and senior stylist consultation lounge.",
    highlights: [
      "Private bridal suite with makeup & draping team",
      "Senior stylist precision cuts",
      "Global colour & balayage bar",
      "Keratin, botox and smoothening treatments",
      "Luxury manicure & pedicure lounge",
    ],
  },
  {
    slug: "guntur",
    city: "Guntur",
    tag: "Colour lab & academy",
    address: "1st Floor, Phoenix Mall, Srinivasarao Pet, Guntur 522004",
    phone: "+91 89071 11999",
    email: "guntur@sasshairbeauty.com",
    hours: "Monday – Sunday · 9:30 AM – 9:00 PM",
    image: guntur,
    q: "SASS hair and beauty Phoenix Mall Guntur",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61273.93483576873!2d80.36059484863281!3d16.291187500000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a75ebbed2925b%3A0x436c9dfb0d921422!2sSASS%20hair%20and%20beauty!5e0!3m2!1sen!2sin!4v1786008032944!5m2!1sen!2sin",
    intro:
      "The Guntur studio is our colour laboratory and training academy — where fashion shades, creative highlights and technical education come together.",
    highlights: [
      "Fashion colour & creative highlights",
      "Colour correction specialists",
      "Hair spa & scalp therapies",
      "Party and occasion makeup",
      "SASS academy training studio",
    ],
  },
  {
    slug: "rajahmundry",
    city: "Rajahmundry",
    tag: "Hair & skin studio",
    address: "Prasaditya Mall, Ave Appa Rao Road, Venkateswara Nagar, Rajamahendravaram 533103",
    phone: "+91 95502 81116",
    email: "rajahmundry@sasshairbeauty.com",
    hours: "Monday – Sunday · 9:30 AM – 8:30 PM",
    image: rajahmundryAsset.url,
    q: "SASS Hair and beauty Prasaditya Mall Rajahmundry",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61043.02376963011!2d81.7256108486328!3d17.014397700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37a377219a19f9%3A0x83a2fe53a7870d21!2sSass%20Hair%20and%20beauty!5e0!3m2!1sen!2sin!4v1786008220424!5m2!1sen!2sin",
    intro:
      "A calm hair and skin studio on Danavaipeta Main Road, built around personalised consultations, premium treatments and unhurried service.",
    highlights: [
      "Signature haircuts & styling",
      "Keratin and smoothening treatments",
      "Advanced facials & skin care",
      "Threading and waxing studio",
      "Bridal & pre-wedding packages",
    ],
  },
];

export const getBranch = (slug: string) => branches.find((b) => b.slug === slug);
