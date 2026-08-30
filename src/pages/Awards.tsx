import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import CtaBanner from "@/components/site/CtaBanner";
import Seo from "@/components/site/Seo";

type AwardTier = "GRAND PRIZE" | "1ST PRIZE" | "GOLD" | "SILVER" | "BRONZE" | "WINNER" | "FINALIST" | "OFFICIAL SELECTION" | "HONOURABLE MENTION" | "BEST" | "NO. 1";

type Award = {
  year: string;
  tier: string;
  project?: string;
  title: string;
};

const awards: Award[] = [
  { year: "2024", tier: "Official Selection", project: "ADRIFT", title: "Tokyo Indie Shorts Fest" },
  { year: "2023", tier: "Featured Short", project: "ADRIFT", title: "Short Films Matter" },
  { year: "2024", tier: "Official Selection", project: "ADRIFT", title: "Los Angeles Short Film Awards" },
  { year: "2024", tier: "Official Selection", project: "ADRIFT", title: "New York Film & Cinematography Awards" },
  { year: "2022", tier: "Award Winner", project: "Exploration", title: "NO AR Drone Film Festival, Brazil" },
  { year: "2022", tier: "Finalist", project: "Exploration", title: "Film Editing, Southern California Drone Film Festival" },
  { year: "2022", tier: "Finalist", project: "Exploration", title: "Blue2Blue Drone Film Festival" },
  { year: "2021", tier: "Award Winner", project: "Exploration", title: "Best Showreel, AZDroneFest" },
  { year: "2021", tier: "1st Prize Winner", project: "Duality", title: "DJI SkyPixel 6th Anniversary Aerial Photo & Video Contest" },
  { year: "2021", tier: "Award Winner", project: "Duality", title: "Best Editing, Southern California Drone Film Festival" },
  { year: "2021", tier: "Award Winner", project: "Duality", title: "Thunderbird Drone Film Festival, USA" },
  { year: "2021", tier: "Official Selection", project: "Duality", title: "Video Art and Experimental Film Festival, New York" },
  { year: "2021", tier: "Official Selection", project: "Duality", title: "Defy Film Festival, USA" },
  { year: "2021", tier: "Official Selection", project: "Duality", title: "HollyShorts Monthly Screenings, USA" },
  { year: "2020", tier: "Award Winner", project: "Duality", title: "Best Showreel, AZDroneFest" },
  { year: "2020", tier: "Honourable Mention", project: "Duality", title: "NO AR Drone Film Festival, Brazil" },
  { year: "2020", tier: "Official Selection", project: "Duality", title: "Grace International Film Festival" },
  { year: "2020", tier: "Official Selection", project: "Duality", title: "Icaro International Film Festival" },
  { year: "2020", tier: "Official Selection", project: "Duality", title: "Corti in Cortile International Film Festival, Italy" },
  { year: "2019", tier: "Honourable Mention", title: "International iPhone Photography Awards (IPPA)" },
  { year: "2013", tier: "Grand Prize Winner", title: "Mauritius photo-marathon — and winner of 3 photo categories" },
  { year: "2012", tier: "Best Corporate TV", project: "Noel", title: "Finalist, Orange Global Brand Awards, Paris" },
  { year: "2012", tier: "Best Digital Campaign", title: "Orange Global Brand Awards, Paris" },
  { year: "2011", tier: "Finalist", project: "UBP Corporate Film", title: "Creatives 2011 (Judged in Paris)" },
  { year: "2010", tier: "Gold", project: "Blue Sky", title: "Best Ambient, Creatives 2010 (Judged in Paris)" },
  { year: "2010", tier: "Gold", project: "KFC Zinger", title: "Best Television, Creatives 2010 (Judged in Paris)" },
  { year: "2010", tier: "Finalist", project: "KFC Irresistible Zinger", title: "Outdoor, Creatives 2010 (Judged in Paris)" },
  { year: "2010", tier: "Silver", project: "Blue Sky", title: "Integrated Campaign, Maputo Ad Festival" },
  { year: "2009", tier: "Gold", project: "MCB Green", title: "Best Print, Creatives 2009 (Judged in Paris)" },
  { year: "2009", tier: "Silver", project: "BOI conference", title: "Best Logo & Pack, Creatives 2009 (Judged in Paris)" },
  { year: "2009", tier: "Bronze", project: "Phoenix Beer", title: "Best TV, Creatives 2009 (Judged in Paris)" },
  { year: "2009", tier: "Bronze", project: "Permoglaze, Colour is coming", title: "Outdoor & Ambient Media, The Loeries" },
  { year: "2009", tier: "Best Original Idea", project: "Permoglaze Campaign", title: "Mauritian Creative Awards" },
  { year: "2009", tier: "Gold", project: "Permoglaze Paint", title: "Best Outdoor, Mauritian Creative Awards" },
  { year: "2009", tier: "Gold", project: "MCB, Green", title: "Best Print Campaign, Mauritian Creative Awards" },
  { year: "2009", tier: "Gold", title: "Best Event, Global Equity Conference for Board of Investment" },
  { year: "2009", tier: "Bronze", project: "Phoenix Beer, Our Island", title: "TVC, Mauritian Creative Awards" },
  { year: "2009", tier: "Gold", project: "Permoglaze Paint", title: "Best Integrated Campaign, Maputo Ad Festival" },
  { year: "2009", tier: "Silver", project: "Talia Breast Cancer", title: "Print, Maputo Ad Festival" },
  { year: "2009", tier: "Silver", project: "Permoglaze Paint", title: "Outdoor, Maputo Ad Festival" },
  { year: "2009", tier: "Silver", project: "Permoglaze Paint", title: "TVC, Maputo Ad Festival" },
  { year: "2008", tier: "Gold", project: "Permoglaze Paint", title: "Best Outdoor, Creatives 2008 (Judged in Paris)" },
  { year: "2008", tier: "Gold", project: "Permoglaze", title: "Best TVC, Creatives 2008 (Judged in Paris)" },
  { year: "2008", tier: "Gold", project: "Talia Breast Cancer", title: "Best Print, Creatives 2008 (Judged in Paris)" },
  { year: "2008", tier: "Finalist", project: "Edena Water — Kick", title: "Creatives 2008 (Judged in Paris)" },
  { year: "2007", tier: "Finalist", project: "Rape Crisis TVC", title: "Vuka 2007, South Africa" },
  { year: "2002", tier: "Winner", title: "Roger Garlic Media Awards, Robben Island Museum, Summer Tours" },
  { year: "1998", tier: "Silver", project: "Shell Petroleum", title: "Expo Stand Design, Electra Mining Expo, South Africa" },
  { year: "1996", tier: "Best New Talent", project: "Navaho", title: "5FM Modern Rock Awards, South Africa" },
  { year: "1996", tier: "No. 1", project: "Navaho", title: "Modern Rock Chart — Bronze (single), 5FM, South Africa" },
  { year: "1993", tier: "Winner", title: "Robert Niven Award, Design Faculty — Nelson Mandela Metropolitan University" },
];

const tierAccent = (tier: string) => {
  const t = tier.toLowerCase();
  if (t.includes("grand") || t.includes("1st") || t.includes("gold") || t.includes("best") || t.includes("winner")) return "text-primary";
  if (t.includes("silver") || t.includes("no.")) return "text-primary";
  if (t.includes("bronze")) return "text-primary/70";
  return "text-muted-foreground";
};

// Group by year
const grouped = awards.reduce<Record<string, Award[]>>((acc, a) => {
  (acc[a.year] ||= []).push(a);
  return acc;
}, {});
const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

const totals = {
  total: awards.length,
  finalists: awards.filter((a) => a.tier.toLowerCase().includes("finalist")).length,
  selections: 10,
};

const Awards = () => (
  <>
    <Seo
      title="Awards & Recognition | Elastic Studio"
      description="Three decades of award-winning work — film festival selections, design recognition, and craft honored across continents."
      path="/awards"
    />
    <section className="bg-background py-24">
      <div className="container-x">
        <span className="label-eyebrow">
          <span className="mr-3 inline-block h-px w-8 align-middle bg-primary" />
          Recognition · Craig Murley
        </span>
        <h1 className="mt-8 max-w-[22ch] font-display text-5xl font-extralight leading-[1.05] text-foreground md:text-7xl">
          Three decades of <span className="italic text-primary">award-winning work.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg font-light text-muted-foreground">
          From Cape Town to Paris, Mauritius to New York — a career-spanning record of recognition across advertising, design, film, photography and music.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { n: totals.total, l: "Awards & Honours" },
            { n: totals.finalists, l: "Finalists" },
            { n: totals.selections, l: "Official Selections" },
          ].map((s) => (
            <div key={s.l} className="card-hover-glow rounded-3xl border border-hairline bg-surface p-8">
              <span className="font-display text-5xl font-extralight text-primary">{s.n}</span>
              <p className="mt-3 label-eyebrow">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-surface-2 py-24">
      <div className="container-x">
        <SectionHeading eyebrow="The full record">Every award. Every year.</SectionHeading>
        <div className="mt-14 space-y-16">
          {years.map((year, yi) => (
            <Reveal key={year} delay={yi * 40}>
              <div className="grid gap-8 md:grid-cols-12">
                <div className="md:col-span-3">
                  <span className="font-display text-6xl font-extralight text-primary md:text-7xl">{year}</span>
                </div>
                <ul className="md:col-span-9 divide-y divide-hairline border-y border-hairline">
                  {grouped[year].map((a, i) => (
                    <li key={i} className="flex flex-col gap-2 py-5 md:flex-row md:items-baseline md:gap-6">
                      <span className={`font-display text-xs font-bold uppercase tracking-[0.2em] md:w-56 md:flex-none ${tierAccent(a.tier)}`}>
                        {a.tier}
                      </span>
                      <div className="flex-1">
                        {a.project && (
                          <span className="mr-2 font-display text-base font-medium italic text-foreground">{a.project} —</span>
                        )}
                        <span className="text-sm text-muted-foreground md:text-base">{a.title}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <CtaBanner headline="Want work that earns its own rewards?" />
  </>
);

export default Awards;
