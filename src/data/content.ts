import case1 from "@/assets/hero-whohire-new.jpg";
import case2 from "@/assets/case-2-new.jpg";
import case3 from "@/assets/case-3.jpg";
import work1 from "@/assets/work-whohire-1-new.jpg";
import dadDaughterHero from "@/assets/dad-daughter-hero.mp4";

import ddBrandPage from "@/assets/dad-daughter/brand-page.jpg";
import ddVanBack from "@/assets/dad-daughter/van-back.png";
import ddPolo from "@/assets/dad-daughter/polo.png";
import ddRamTruck from "@/assets/dad-daughter/ram-truck.png";
import fsBrand1 from "@/assets/finalspark/brand-1.png";
import fsBrand2 from "@/assets/finalspark/brand-2.png";
import fsBrand3 from "@/assets/finalspark/brand-3.png";
import fsBrand4 from "@/assets/finalspark/brand-4.png";
import whLogoTitle from "@/assets/whohire/logo-title.mp4";
import whDudaCareer from "@/assets/whohire/duda-career.mp4";
import ingeniaAgriculture from "@/assets/ingenia/enhancing-agriculture.png";

export type WorkMedia =
  | string
  | { type: "image"; src: string; fit?: "cover" | "contain" }
  | { type: "video"; src: string; poster?: string; hasAudio?: boolean; title?: string };

export type CaseCategory = "brand design" | "Video";

type CaseItem = {
  slug: string;
  name: string;
  industry: string;
  outcome: string;
  category: CaseCategory;
  challenge?: string;
  approach?: string[];
  image: WorkMedia;
  workImages: WorkMedia[];
};

const video3: WorkMedia = { type: "video", src: "https://vimeo.com/447510954" };
const placeholderA: WorkMedia = "https://images.unsplash.com/photo-1529612700005-e35377bf1415?w=1600&q=80";
const placeholderB: WorkMedia = "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1600&q=80";
const placeholderC: WorkMedia = "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1600&q=80";
const placeholderD: WorkMedia = "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1600&q=80";
const placeholderE: WorkMedia = "https://images.unsplash.com/photo-1542435503-956c469947f6?w=1600&q=80";
const placeholderF: WorkMedia = "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=1600&q=80";
const placeholderG: WorkMedia = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=80";
const placeholderH: WorkMedia = "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1600&q=80";
const placeholderI: WorkMedia = "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=1600&q=80";
const placeholderJ: WorkMedia = "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1600&q=80";
const placeholderK: WorkMedia = "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?w=1600&q=80";
const placeholderL: WorkMedia = "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?w=1600&q=80";
const placeholderM: WorkMedia = "https://images.unsplash.com/photo-1633354931133-027bda9311d3?w=1600&q=80";
const placeholderN: WorkMedia = "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1600&q=80";
const placeholderO: WorkMedia = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80";
const placeholderP: WorkMedia = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80";
const placeholderQ: WorkMedia = "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80";
const placeholderR: WorkMedia = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80";
const placeholderS: WorkMedia = "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=80";
const placeholderT: WorkMedia = "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80";
const placeholderU: WorkMedia = "https://images.unsplash.com/photo-1503602642458-232111445657?w=1600&q=80";
const placeholderV: WorkMedia = "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80";
const placeholderW: WorkMedia = "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1600&q=80";

export const cases: CaseItem[] = [
  { 
    slug: "client-a", 
    name: "WhoHire", 
    industry: "Tech Startup", 
    category: "brand design",
    outcome: "Evolving a startup brand to be unique and to dominate this business sector.",
    challenge: "Our clients had acquired a small but interesting company called HireWho.AI. The initial idea behind the technology was good, however, the look and app experience was very outdated and felt like a distant tech company in a people-oriented business. Our job was to make this amazing platform feel like one of the team. ", 
    approach: [
      "We found out that whohire.com was available and set up a rebrand, still using the element of the owl from the old logo but creating a much friendlier brand and UI experience. ",
      "We've been working for three years on the evolution of this app, which has now become an industry leader. We've also helped the business to make it easy to white label the platform - with modular design that can be updated with another brand.",
      "We're continually helping to refine the UI/UX as well as brand elements with the intention to make this the absolute leader in the category."
    ],
    image: case1, 
    workImages: [work1, video3, { type: "video", src: whLogoTitle }] 
  },
  { 
    slug: "client-b", 
    name: "INGENIA", 
    industry: "BUSINESS GROUP", 
    category: "Video",
    outcome: "Share a new brand and vision for a group of companies across Mauritius and Africa",
    challenge: "The client came to us with a beautiful new logo and brand design for a company and brand that had existed for over 50 years in Mauritius as The Mauritius Chemical and Fertilizer Industry Limited (MCFI).\n\nOur challenge was to share the new vision and brand identity that went beyond the original business - with a new brand film, animation style and various social media pieces.\n\nThe business works across many industries, and needed a vision to get everyone from current employees, business stakeholders and even government to buy into this new, challenging, exciting vision.",
    approach: [
      "We started, as we always do, by listening and doing research. Working very closely with their design agency in Mauritius, we created a brand film that captured the spirit of this new brand without throwing away any of the brand equity that had been built over 50 years. ",
      "The result was a huge buy-in from all parties and a new excitement about the evolution of their purpose. The new clean and modern brand feeling now follows every project that they embark on. This project was a great challenge and very rewarding. "
    ],
    image: { type: "video", src: "https://vimeo.com/1082326499" }, 
    workImages: [{ type: "video", src: "https://vimeo.com/1221825315", hasAudio: false }, ingeniaAgriculture] 
  },
  { 
    slug: "client-c", 
    name: "Dad & Daughter", 
    industry: "Consumer Brand", 
    category: "brand design",
    outcome: "A complete rebrand for a family owned American home services company.",
    challenge: "The client came to us with a strong challenge: \"I want this to be recognizable from the moon.\" He also wanted to have the feeling of a team, as his aim is to build a business that will help to turn his technicians into wealthy people. We also had two very strong competitors in his service area, and we needed to find a way to be distinct. ",
    approach: [
      "We started, as we always do, by listening. Discovery sessions with leadership and the advertising agency. The strategy of the family-owned business was already in place but needed the brand and logo designed to communicate this.",
      "The Dad & Daughter Garage Door Service brand mark captures the company’s unique story and competitive strength. The illustration of the father and daughter communicates partnership, equality, and shared leadership - honoring his hands-on installation expertise and her university-educated business acumen.",
      "The badge shape conveys craftsmanship, structure, and reliability, while remaining practical for uniforms, vehicles, and signage. Read the full story."
    ],
    image: { type: "video", src: dadDaughterHero }, 
    workImages: [ddBrandPage, ddVanBack, { type: "image", src: ddPolo, fit: "contain" }, { type: "image", src: ddRamTruck, fit: "contain" }] 
  },
  { 
    slug: "client-d", 
    name: "FinalSpark", 
    industry: "Biotech", 
    category: "brand design",
    outcome: "Create a complete visual language for an exciting new Swiss biotech startup.",
    challenge: "Our Swiss client is breaking new ground and creating technology that can have massive benefits for us and our planet. The name and logo were already in place, and our challenge was to create a visual identity, something unique, so that they were separated from three giant competitors. We were also tasked with creating the website that could explain this technology and invite researchers, investors, and partners.",
    image: { type: "video", src: "https://vimeo.com/1221763576" }, 
    approach: [
      "After researching the competitors in this very specialized field, we found a space that hadn't been claimed yet.",
      "With AI-created visuals and a bold color palette, we created this world for Final Spark. Everything is about energy, connection, and evolution. This look goes all the way through the website, online store, and the many presentations they create.",
      "They have picked up many investors, partners and research universities for testing. We really enjoyed the new world this opened up. What a great challenge!"
    ],
    workImages: [
      { type: "image", src: fsBrand1, fit: "contain" },
      { type: "image", src: fsBrand2, fit: "contain" },
      { type: "image", src: fsBrand3, fit: "contain" },
      { type: "image", src: fsBrand4, fit: "contain" },
    ] 

  },
];

export const articles = [
  { slug: "founder-brand-plan", date: "September 30, 2026", title: "Everyone agrees the founder is the brand. Almost nobody has a plan.", excerpt: "Founders are the most trusted voice a brand has, and most of them are winging it. Here is how to turn a good intention into a voice, a system and a schedule." },
  { slug: "great-is-the-new-average", date: "September 29, 2026", title: "Great is the new average", excerpt: "When everyone's work is good, what makes yours worth choosing?" },
  { slug: "machines-reading-your-brand", date: "September 16, 2026", title: "The machines are reading your brand. Most of them are bored.", excerpt: "More and more first impressions now happen inside an AI-generated answer - assembled by something that has read everything about you and felt nothing. It either repeats you or it doesn't." },
  { slug: "ai-brand-was-already-vague", date: "September 9, 2026", title: "Feed a vague brand to a brilliant machine, and it gets vague at scale.", excerpt: "AI didn't make your brand generic — it made it legible. Feed a vague brand to an averaging machine and it hands you back, at scale, exactly how vague it always was." },
  { slug: "ai-brand-strategy-90-seconds", date: "September 2, 2026", title: "AI Can Build Your Brand Strategy in 90 Seconds. That's the Problem, Not the Pitch.", excerpt: "The mechanical middle of brand strategy just went free. That's exactly why the thinking behind it is worth more, not less." },
  { slug: "dad-and-daughter-rebrand", date: "June 14, 2026", title: "The thinking behind the Rebrand - Owning a headspace.", excerpt: "Solid is good. But solid doesn't make people stop scrolling, point at a van, and say \"I want them.\" How a Tennessee garage door company became a brand built to travel." },
  { slug: "lessons-from-33-briefs", date: "April 02, 2026", title: "What I learned from 33 award-winning brand briefs", excerpt: "The difference between a good brief and a great one is rarely the words. It's the questions that came before them." },
  { slug: "your-website-is-your-brand", date: "March 18, 2026", title: "Why your website is your most important brand decision", excerpt: "It's the one place every customer eventually lands. Treat it like the front door it is." },
  { slug: "logo-vs-brand", date: "February 27, 2026", title: "The difference between a logo and a brand", excerpt: "A logo is a signature. A brand is everything that signature means by the time someone reads it." },
  { slug: "founder-voice", date: "February 04, 2026", title: "Founders, your brand and company culture are often the shadow of your character.", excerpt: "The companies that win are the ones unafraid to sound like a person wrote the words." },
];

export const services = [
  {
    slug: "brand-launch",
    title: "Brand Launch",
    short: "For founders starting from zero. We build the full brand system.",
    audience: "For founders, startups, and businesses without a brand — or who have outgrown the one they started with.",
    outcome: "You walk away with a complete brand system: positioning, identity, voice, and the assets to take it to market.",
    includes: ["Brand strategy & positioning", "Naming (where required)", "Logo, identity & visual system", "Voice & messaging framework", "Launch-ready website & assets"],
  },
  {
    slug: "brand-evolution",
    title: "Brand Evolution",
    short: "For businesses ready to grow into who they've become.",
    audience: "For established businesses whose brand no longer reflects the company they've built — or the one they're becoming.",
    outcome: "A sharper, more confident brand that fits where you are now and points clearly to where you're going.",
    includes: ["Brand audit & diagnostic", "Repositioning & narrative", "Identity refresh or rebuild", "Rollout system & guidelines", "Internal & external launch support"],
  },
  {
    slug: "brand-strategy",
    title: "Brand Strategy",
    short: "The thinking before the design. Positioning, voice, and direction.",
    audience: "For teams who need clarity before craft — internal or external — and a brief everyone can build from.",
    outcome: "A strategic foundation: positioning, audience, voice, and the brief that makes everything else possible.",
    includes: ["Stakeholder & market research", "Audience definition", "Positioning & narrative", "Voice & tone framework", "Creative brief & roadmap"],
  },
];

export const testimonials = [
  {
    quote:
      "Craig is a great branding guy. He just didn't rush to create the visual but first spent time to understood the business and goals. Inquired about the customer, problem and about the solution. He is methodical. Great value!",
    attribution: "CEO · Wisran, USA",
  },
  {
    quote:
      "Craig is an absolute pleasure to work with! His professionalism and thorough work ethic is outstanding. The quality of the work he has (and is) doing for us has been exceptional.",
    attribution: "Webber Insurance Services, Australia",
  },
  {
    quote:
      "Working with Elastic Studio has been an incredible experience for me and my team! Craig's superpower is to help his clients create a 1-Page Brand Universe. He then delivers that vision at a higher level than could be imagined.",
    attribution: "Founder · Success is Voluntary Podcast, USA",
  },
  {
    quote:
      "Craig is the best art designer I've ever worked with. You won't find anyone more creative, energetic and professional than Craig. Hire him already, you just can't go wrong!",
    attribution: "Director · Thewarthogstore, Laos",
  },
  {
    quote:
      "Excellent personal service coupled with a thorough knowledge and understanding of the tech industry and how to present to the world in the digital age.",
    attribution: "Founder · Gareth James Landscapes, UK",
  },
  {
    quote:
      "Craig is a highly dependable true professional. He has produced totally high quality banner for our website. We definitely want to work with him in near future, again.",
    attribution: "Zenvita Architecture, Japan",
  },
  {
    quote:
      "Truly creative designs that have taken time and thought to produce. A delightful design journey full of good communication and customer understanding.",
    attribution: "Marketing Executive · NEST Management Ltd, UK",
  },
  {
    quote:
      "Craig was a pleasure to work with and I would recommend him to others. Communication was fantastic, work was completed in a timely manner and to a high standard. You will not be disappointed if you hire his services.",
    attribution: "Editor · Huntbikes.com, Australia",
  },
  {
    quote:
      "Working with Craig on a project is always simple, enlightening and great fun. He goes far beyond what you might expect and delights with his impact on whatever creative you may have asked for.",
    attribution: "Senior Partner · Elevate Human Potential, USA",
  },
  {
    quote:
      "Craig is a talented team leader who is always willing to help and go the extra mile, and has moreover demonstrated very sound skills in managing clients' relationships.",
    attribution: "Executive Creative Director · Circus Advertising, Mauritius",
  },
  {
    quote:
      "Excellent, prompt, friendly and responsive. Craig is a pleasure to work with.",
    attribution: "Director · JB Leadership Ltd, USA",
  },
  {
    quote:
      "Craig did an amazing job for RhinoOutlet. He really went above and beyond to make sure my artwork looks great. I felt like he really gave me my money's worth. Thanks Craig!",
    attribution: "Founder · RhinoOutlet, USA",
  },
  {
    quote:
      "Friendly and professional approach to my brand request. Excellent customer service. Delightful to work with.",
    attribution: "Founder · Imelda Moyano Property Investment, UK",
  },
];
